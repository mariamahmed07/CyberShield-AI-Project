# 🛡️ CyberShield AI

### Explainable AI for Phishing Detection

CyberShield AI is an AI-powered phishing detection system designed to help users identify suspicious emails and messages **and understand why they may be dangerous**.

Instead of only showing a phishing warning, CyberShield AI provides a **risk score, risk level, detected signals, detection breakdown, and a recommended action**.

> **Detect the threat. Understand the reason. Take the right action.**

---

## 🚨 The Problem

Phishing attacks often use:

* Urgent messages
* Fake links
* Requests for passwords or sensitive information
* Impersonation
* Fear and pressure

A message can look trustworthy while actually being designed to steal information.

Traditional detection can tell users that something is suspicious, but users may not understand **why**.

CyberShield AI focuses on both **detection and explanation**.

---

## 💡 Our Solution

CyberShield AI analyzes the content of a suspicious email or message and provides:

* 🎯 **Phishing Risk Score**
* 🚦 **Risk Level** — LOW / MEDIUM / HIGH
* 🔍 **Threat Type**
* 🚨 **Phishing Signals**
* ✅ **Safe Signals**
* 📊 **Detection Breakdown**
* 💡 **Explainable AI Results**
* 🛡️ **Recommended Action**

The goal is to make AI security results easier to understand, especially for non-technical users.

---

## ⚙️ How It Works

```text
User
  │
  ▼
Suspicious Email / Message
  │
  ▼
React Frontend
  │
  ▼
FastAPI REST API
  │
  ▼
Text Vectorization
  │
  ▼
Machine Learning Model
  │
  ▼
Risk Analysis
  │
  ▼
Explainable Result
  │
  ▼
Risk Score + Signals + Recommendation
```

---

## 🧠 Explainable AI

CyberShield AI is designed to answer three simple questions:

### 1. Is the message suspicious?

The system provides a risk score and risk level.

### 2. Why is it suspicious?

The interface displays the signals detected during the analysis.

### 3. What should I do?

The system provides a clear recommendation to help the user take a safer action.

This makes the system more understandable than simply showing:

> "This message is phishing."

---

## 🖥️ Features

### Risk Score

Provides an easy-to-understand score representing the detected risk.

### Risk Level

The result is grouped into:

* 🟢 LOW
* 🟡 MEDIUM
* 🔴 HIGH

### Phishing Signals

Shows suspicious patterns detected in the message.

### Safe Signals

Shows signals that may indicate that the message does not contain major suspicious patterns.

### Detection Breakdown

Provides a visual breakdown of different detection areas.

### Recommended Action

Gives the user a simple next step instead of leaving them with only a warning.

---

## 🛠️ Technology Stack

### Frontend

* React
* TypeScript
* Vite
* Tailwind CSS

### Backend

* Python
* FastAPI
* Uvicorn

### Machine Learning

* Trained phishing detection model
* Text vectorization
* Joblib

### Deployment

* Railway

---

## 📁 Project Structure

```text
CyberShield-AI-Project/
│
├── frontend/
│   ├── public/
│   │
│   ├── src/
│   │   ├── components/
│   │   │   ├── About.tsx
│   │   │   ├── AnalysisResultView.tsx
│   │   │   ├── DetectionBreakdown.tsx
│   │   │   ├── ExplainableAI.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Header.tsx
│   │   │   ├── Hero.tsx
│   │   │   ├── HowItWorks.tsx
│   │   │   ├── PrototypeNotice.tsx
│   │   │   ├── RecommendedAction.tsx
│   │   │   ├── RiskScoreDial.tsx
│   │   │   └── ThreatAnalyzer.tsx
│   │   │
│   │   ├── analysisEngine.ts
│   │   ├── demoExamples.ts
│   │   ├── types.ts
│   │   ├── App.tsx
│   │   ├── index.css
│   │   └── main.tsx
│   │
│   ├── package.json
│   ├── vite.config.ts
│   └── ...
│
├── backend/
│   ├── main.py
│   ├── cybershield_model.joblib
│   ├── cybershield_vectorizer.joblib
│   └── requirements.txt
│
├── README.md
└── vercel.json
```

---

## 🔌 API

CyberShield AI provides a REST API for analyzing messages.

### Endpoint

```text
POST /api/analyze
```

### Request

```json
{
  "text": "Your email or message goes here"
}
```

### Example Response

```json
{
  "riskScore": 85,
  "riskLevel": "HIGH",
  "threatType": "Phishing",
  "riskMessage": "Strong phishing indicators were detected.",
  "phishingSignals": [
    "Urgent language",
    "Suspicious request"
  ],
  "safeSignals": [],
  "recommendation": "Verify the sender before taking any action."
}
```

*The exact response fields may vary depending on the analyzed message.*

---

## 🚀 Running the Project Locally

### 1. Clone the repository

```bash
git clone https://github.com/mariamahmed07/CyberShield-AI-Project.git
```

```bash
cd CyberShield-AI-Project
```

---

### 2. Run the Backend

```bash
cd backend
```

Install the requirements:

```bash
pip install -r requirements.txt
```

Start the API:

```bash
uvicorn main:app --reload
```

The backend will normally be available at:

```text
http://127.0.0.1:8000
```

API documentation:

```text
http://127.0.0.1:8000/docs
```

---

### 3. Run the Frontend

Open a new terminal:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
VITE_API_URL=http://127.0.0.1:8000
```

Then start the development server:

```bash
npm run dev
```

---

## 🌐 Live Demo

### Frontend

[CyberShield AI Live Demo](https://cybershield-ai-project-production.up.railway.app/?utm_source=chatgpt.com)

### Backend API

[CyberShield AI API](https://cybershield-ai-project-production-c06c.up.railway.app/?utm_source=chatgpt.com)

### API Documentation

[Swagger API Documentation](https://cybershield-ai-project-production-c06c.up.railway.app/docs?utm_source=chatgpt.com)

---

## 🔐 Safety & Responsible Use

CyberShield AI is designed as a security assistance tool.

Its results should not be treated as a perfect guarantee that a message is safe or malicious.

Users should still:

* Verify the sender
* Avoid suspicious links
* Never share passwords through unexpected messages
* Be careful with urgent requests
* Use additional security tools when needed

> **AI should help people make safer decisions — not create false confidence.**

---

## 🔮 Future Improvements

Possible future improvements include:

* 🌐 Browser extension
* 📧 Real-time email integration
* 🌍 Multilingual phishing detection
* 🛡️ Detection of additional cyber threats
* 📊 Organization security dashboards
* 🔄 Continuous model improvement
* ⚡ Real-time message analysis

These are future goals and are not presented as currently implemented features.

---

## 🎯 Why CyberShield AI?

CyberShield AI focuses on a simple idea:

**Detection is useful.
Explanation is better.
Action makes it practical.**

By combining machine learning with an understandable interface, CyberShield AI aims to make phishing detection easier for everyday users.

---

## 👩‍💻 Project

**CyberShield AI**

Explainable AI for Phishing Detection

GitHub:

[CyberShield AI — GitHub Repository](https://github.com/mariamahmed07/CyberShield-AI-Project?utm_source=chatgpt.com)

---

## 📄 License

This project is developed for educational and competition purposes.
