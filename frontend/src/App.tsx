import {
  useCallback,
  useRef,
  useState,
} from 'react';

import Header from '@/components/Header';
import Hero from '@/components/Hero';
import ThreatAnalyzer from '@/components/ThreatAnalyzer';
import AnalysisResultView from '@/components/AnalysisResultView';
import HowItWorks from '@/components/HowItWorks';
import PrototypeNotice from '@/components/PrototypeNotice';
import About from '@/components/About';
import Footer from '@/components/Footer';

import { DEMO_EXAMPLES } from '@/demoExamples';

const API_URL = import.meta.env.VITE_API_URL?.replace(/\/$/, '') ?? '';

import type {
  AnalysisResult,
} from '@/types';


export default function App() {

  const [input, setInput] =
    useState('');

  const [isAnalyzing, setIsAnalyzing] =
    useState(false);

  const [result, setResult] =
    useState<AnalysisResult | null>(null);


  const resultRef =
    useRef<HTMLDivElement>(null);

  const analyzerRef =
    useRef<HTMLTextAreaElement>(null);


  // ==========================================================
  // Scroll To Result
  // ==========================================================

  const scrollToResult = () => {

    setTimeout(() => {

      resultRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });

    }, 80);

  };


  // ==========================================================
  // Analyze Email
  // ==========================================================

  const handleAnalyze =
    useCallback(
      async () => {

        if (!input.trim()) {

          return;

        }


        setIsAnalyzing(true);

        setResult(null);


        try {

          const response =
            await fetch(
              `${API_URL}/api/analyze`,
              {
                method: 'POST',

                headers: {
                  'Content-Type':
                    'application/json',

                  Accept:
                    'application/json',
                },

                body: JSON.stringify({
                  text: input,
                }),
              }
            );


          if (!response.ok) {

            throw new Error(
              `Analysis failed with status ${response.status}`
            );

          }


          const data =
            await response.json();


          console.log(
            'CyberShield AI Response:',
            data
          );


          // ====================================================
          // API Error
          // ====================================================

          if (data.error) {

            throw new Error(
              data.error
            );

          }


          // ====================================================
          // Frontend Result
          // ====================================================

          const res: AnalysisResult = {

            score:
              data.riskScore ?? 0,


            riskLevel:
              data.riskLevel ?? 'LOW',


            threatType:
              data.threatType ??
              'No major threat detected',


            riskMessage:
              data.riskMessage ??
              (
                data.riskLevel === 'HIGH'
                  ? 'Strong phishing indicators were detected.'
                  : data.riskLevel === 'MEDIUM'
                    ? 'Some suspicious indicators were detected.'
                    : 'No major suspicious indicators were detected.'
              ),


            indicators: [],


            phishingSignals:
              Array.isArray(
                data.phishingSignals
              )
                ? data.phishingSignals
                : [],


            safeSignals:
              Array.isArray(
                data.safeSignals
              )
                ? data.safeSignals
                : [],


            recommendation:
              data.recommendation ??
              'Verify the sender before taking any action.',


            breakdown: {

              url:
                data.detectionBreakdown?.url ??
                0,

              language:
                data.detectionBreakdown?.language ??
                0,

              behavioral:
                data.detectionBreakdown?.behavioral ??
                0,

              patterns:
                data.detectionBreakdown?.patterns ??
                0,

            },


            analyzedText:
              data.analyzedText ??
              input,

          };


          setResult(res);

        } catch (error) {

          console.error(
            'CyberShield AI Error:',
            error
          );


          alert(
            'Unable to connect to CyberShield AI backend. Check the backend URL and try again.'
          );

        } finally {

          setIsAnalyzing(false);

          scrollToResult();

        }

      },
      [input]
    );


  // ==========================================================
  // Clear
  // ==========================================================

  const handleClear =
    useCallback(
      () => {

        setInput('');

        setResult(null);


        setTimeout(() => {

          analyzerRef.current?.focus();

        }, 50);

      },
      []
    );


  // ==========================================================
  // Analyze Another
  // ==========================================================

  const handleAnalyzeAnother =
    useCallback(
      () => {

        setResult(null);


        setTimeout(() => {

          analyzerRef.current?.focus();


          document
            .getElementById('analyzer')
            ?.scrollIntoView({
              behavior: 'smooth',
              block: 'start',
            });

        }, 60);

      },
      []
    );


  // ==========================================================
  // UI
  // ==========================================================

  return (

    <div className="app-backdrop min-h-screen">

      <Header />


      <main>

        <Hero />


        <ThreatAnalyzer
          value={input}

          onChange={setInput}

          onAnalyze={handleAnalyze}

          onClear={handleClear}

          isAnalyzing={isAnalyzing}

          examples={DEMO_EXAMPLES}
        />


        {/* ==================================================
            Analysis Result
        ================================================== */}

        <div ref={resultRef}>

          {result && (

            <AnalysisResultView
              result={result}
              onAnalyzeAnother={
                handleAnalyzeAnother
              }
            />

          )}

        </div>


        <PrototypeNotice />

        <HowItWorks />

        <About />

      </main>


      <Footer />

    </div>

  );
}