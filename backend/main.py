from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import os
import re


# ============================================================
# CyberShield AI Backend
# ============================================================

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

MODEL_PATH = os.path.join(
    BASE_DIR,
    "cybershield_model.joblib"
)

VECTORIZER_PATH = os.path.join(
    BASE_DIR,
    "cybershield_vectorizer.joblib"
)


# ============================================================
# Load Model + Vectorizer
# ============================================================

try:
    model = joblib.load(MODEL_PATH)
    vectorizer = joblib.load(VECTORIZER_PATH)

    print("✅ Model loaded successfully")
    print("✅ Vectorizer loaded successfully")

except Exception as e:
    print(f"❌ Failed to load model/vectorizer: {e}")
    raise


# ============================================================
# FastAPI
# ============================================================

app = FastAPI(
    title="CyberShield AI API",
    description="AI-powered phishing email detection API",
    version="1.0.0"
)


# ============================================================
# CORS
# ============================================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ============================================================
# Request Model
# ============================================================

class EmailRequest(BaseModel):
    text: str


# ============================================================
# Root / Health Check
# ============================================================

@app.get("/")
def root():
    return {
        "status": "online",
        "message": "CyberShield AI Backend is running 🛡️"
    }


@app.get("/health")
def health():
    return {
        "status": "healthy",
        "model_loaded": model is not None,
        "vectorizer_loaded": vectorizer is not None
    }


# ============================================================
# Explainable AI
# ============================================================

def get_explanation(features):

    """
    Explain the Logistic Regression prediction using
    feature contribution:

        contribution = TF-IDF value × model coefficient

    Positive contribution  -> phishing
    Negative contribution  -> safe
    """

    # Model must have coefficients
    if not hasattr(model, "coef_"):
        return [], []

    try:

        feature_names = vectorizer.get_feature_names_out()

        coefficients = model.coef_[0]

        feature_values = features.toarray()[0]

        contributions = feature_values * coefficients

        phishing_signals = []
        safe_signals = []

        for index, contribution in enumerate(contributions):

            feature_name = feature_names[index]

            # Ignore zero contribution features
            if contribution > 0:

                phishing_signals.append({
                    "feature": feature_name,
                    "contribution": round(
                        float(contribution),
                        4
                    )
                })

            elif contribution < 0:

                safe_signals.append({
                    "feature": feature_name,
                    "contribution": round(
                        float(contribution),
                        4
                    )
                })

        # Strongest phishing signals
        phishing_signals = sorted(
            phishing_signals,
            key=lambda x: x["contribution"],
            reverse=True
        )[:5]

        # Strongest safe signals
        safe_signals = sorted(
            safe_signals,
            key=lambda x: x["contribution"]
        )[:5]

        return phishing_signals, safe_signals

    except Exception as e:

        print(f"❌ Explainability error: {e}")

        return [], []


# ============================================================
# Detection Breakdown
# ============================================================

def calculate_detection_breakdown(
    text,
    phishing_probability
):

    text_lower = text.lower()

    # ========================================================
    # AI SCORE
    # ========================================================

    ai_score = round(
        phishing_probability * 100
    )


    # ========================================================
    # URL ANALYSIS
    # ========================================================

    url_score = 10

    urls = re.findall(
        r"https?://[^\s]+",
        text_lower
    )

    if urls:
        url_score += 45

    suspicious_url_words = [
        "verify",
        "login",
        "secure",
        "account",
        "click",
        "bank",
        "link"
    ]

    url_matches = sum(
        1
        for word in suspicious_url_words
        if word in text_lower
    )

    url_score += min(
        url_matches * 7,
        35
    )

    url_score = min(
        url_score,
        100
    )


    # ========================================================
    # LANGUAGE ANALYSIS
    # ========================================================

    language_score = 10

    urgency_words = [
        "urgent",
        "immediately",
        "asap",
        "warning",
        "alert",
        "suspended",
        "blocked",
        "expire",
        "expired"
    ]

    urgency_matches = sum(
        1
        for word in urgency_words
        if word in text_lower
    )

    language_score += min(
        urgency_matches * 10,
        60
    )

    if "24 hours" in text_lower:
        language_score += 15

    language_score = min(
        language_score,
        100
    )


    # ========================================================
    # BEHAVIORAL INDICATORS
    # ========================================================

    behavioral_score = 10

    action_words = [
        "click",
        "verify",
        "confirm",
        "login",
        "update",
        "download",
        "send"
    ]

    action_matches = sum(
        1
        for word in action_words
        if word in text_lower
    )

    behavioral_score += min(
        action_matches * 10,
        60
    )

    sensitive_words = [
        "password",
        "identity",
        "account",
        "credit card",
        "bank",
        "payment"
    ]

    if any(
        word in text_lower
        for word in sensitive_words
    ):
        behavioral_score += 20

    behavioral_score = min(
        behavioral_score,
        100
    )


    # ========================================================
    # PHISHING PATTERNS
    # ========================================================

    patterns_score = 10

    patterns = [
        "verify your",
        "verify",
        "account",
        "suspended",
        "click this link",
        "clicking this link",
        "click link",
        "24 hours",
        "urgent",
        "bank",
        "confirm your identity",
        "security alert"
    ]

    pattern_matches = sum(
        1
        for pattern in patterns
        if pattern in text_lower
    )

    patterns_score += min(
        pattern_matches * 10,
        80
    )

    patterns_score = min(
        patterns_score,
        100
    )


    # ========================================================
    # Combine Heuristics + AI
    # ========================================================

    breakdown = {

        "url": round(
            (url_score * 0.75)
            + (ai_score * 0.25)
        ),

        "language": round(
            (language_score * 0.75)
            + (ai_score * 0.25)
        ),

        "behavioral": round(
            (behavioral_score * 0.75)
            + (ai_score * 0.25)
        ),

        "patterns": round(
            (patterns_score * 0.75)
            + (ai_score * 0.25)
        )
    }

    return breakdown


# ============================================================
# Analyze Email
# ============================================================

@app.post("/api/analyze")
def analyze_email(request: EmailRequest):

    # ========================================================
    # Clean Input
    # ========================================================

    text = request.text.strip()

    if not text:

        return {
            "error": "Email text cannot be empty."
        }


    # ========================================================
    # Convert Text → TF-IDF
    # ========================================================

    try:

        features = vectorizer.transform([text])

    except Exception as e:

        print(f"❌ Vectorization error: {e}")

        return {
            "error": "Unable to process email text."
        }


    # ========================================================
    # AI Prediction
    # ========================================================

    try:

        prediction = model.predict(features)[0]

        probabilities = model.predict_proba(features)[0]

        safe_probability = float(
            probabilities[0]
        )

        phishing_probability = float(
            probabilities[1]
        )

    except Exception as e:

        print(f"❌ Prediction error: {e}")

        return {
            "error": "Unable to analyze email."
        }


    # ========================================================
    # Risk Score
    # ========================================================

    risk_score = round(
        phishing_probability * 100
    )


    # Make sure score stays between 0 and 100
    risk_score = max(
        0,
        min(
            risk_score,
            100
        )
    )


    # ========================================================
    # Risk Level
    # ========================================================

    if risk_score <= 30:

        risk_level = "LOW"

        threat_type = (
            "No major threat detected"
        )

        risk_message = (
            "No major suspicious indicators "
            "were detected."
        )

    elif risk_score <= 70:

        risk_level = "MEDIUM"

        threat_type = (
            "Suspicious Activity"
        )

        risk_message = (
            "Some suspicious indicators "
            "were detected."
        )

    else:

        risk_level = "HIGH"

        threat_type = "Phishing"

        risk_message = (
            "Strong phishing indicators "
            "were detected."
        )


    # ========================================================
    # Prediction Label
    # ========================================================

    if int(prediction) == 1:

        prediction_label = (
            "Phishing Email"
        )

    else:

        prediction_label = (
            "Safe Email"
        )


    # ========================================================
    # Recommendation
    # ========================================================

    if risk_level == "HIGH":

        recommendation = (
            "Do not click links or share "
            "sensitive information. "
            "Verify the sender through an "
            "official channel."
        )

    elif risk_level == "MEDIUM":

        recommendation = (
            "Proceed with caution. Verify "
            "the sender and destination "
            "before taking action."
        )

    else:

        recommendation = (
            "No major phishing indicators "
            "were detected. Continue to "
            "stay cautious."
        )


    # ========================================================
    # Explainable AI
    # ========================================================

    # IMPORTANT:
    # get_explanation() accepts ONE argument only.

    phishing_signals, safe_signals = (
        get_explanation(features)
    )


    # ========================================================
    # Detection Breakdown
    # ========================================================

    detection_breakdown = (
        calculate_detection_breakdown(
            text,
            phishing_probability
        )
    )


    # ========================================================
    # Final API Response
    # ========================================================

    return {

        # ----------------------------------------------------
        # Main Prediction
        # ----------------------------------------------------

        "prediction": prediction_label,

        # ----------------------------------------------------
        # Probabilities
        # ----------------------------------------------------

        "phishingProbability": round(
            phishing_probability * 100,
            2
        ),

        "safeProbability": round(
            safe_probability * 100,
            2
        ),

        # ----------------------------------------------------
        # Risk
        # ----------------------------------------------------

        "riskScore": risk_score,

        "riskLevel": risk_level,

        "threatType": threat_type,

        "riskMessage": risk_message,

        # ----------------------------------------------------
        # Recommendation
        # ----------------------------------------------------

        "recommendation": recommendation,

        # ----------------------------------------------------
        # Original Text
        # ----------------------------------------------------

        "analyzedText": text,

        # ----------------------------------------------------
        # Explainability
        # ----------------------------------------------------

        "phishingSignals": phishing_signals,

        "safeSignals": safe_signals,

        # ----------------------------------------------------
        # Detection Breakdown
        # ----------------------------------------------------

        "detectionBreakdown": detection_breakdown
    }