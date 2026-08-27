import { RotateCcw, Tag } from 'lucide-react';

import type { AnalysisResult } from '@/types';

import RiskScoreDial from './RiskScoreDial';
import ExplainableAI from './ExplainableAI';
import RecommendedAction from './RecommendedAction';
import DetectionBreakdown from './DetectionBreakdown';


interface Props {
  result: AnalysisResult;
  onAnalyzeAnother: () => void;
}


const RISK_CHIP = {
  LOW: 'bg-emerald-400/15 text-emerald-300 border-emerald-400/40',

  MEDIUM:
    'bg-amber-400/15 text-amber-300 border-amber-400/40',

  HIGH:
    'bg-red-400/15 text-red-300 border-red-400/40',
};


export default function AnalysisResultView({
  result,
  onAnalyzeAnother,
}: Props) {

  const {
    score,
    riskLevel,
    threatType,
    riskMessage,
  } = result;


  return (
    <section className="px-5 py-6 sm:px-8">

      <div className="mx-auto max-w-5xl animate-fade-in-up">

        {/* ==================================================
            Main Result Card
        ================================================== */}

        <div className="glass-strong rounded-2xl p-6 shadow-soft sm:p-8">

          <div className="mb-5 flex items-center justify-between">

            <div className="flex items-center gap-2">

              <h2 className="text-xl font-semibold text-white sm:text-2xl">
                Analysis Result
              </h2>

              <span
                className="
                  inline-flex
                  items-center
                  gap-1
                  rounded-full
                  border
                  border-cyan-400/30
                  bg-cyan-400/10
                  px-2.5
                  py-0.5
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.14em]
                  text-cyan-300
                "
              >

                <Tag className="h-3 w-3" />

                Demo Analysis

              </span>

            </div>

          </div>


          {/* ==================================================
              Score + Risk Information
          ================================================== */}

          <div
            className="
              grid
              items-center
              gap-6
              sm:grid-cols-[auto,1fr]
              sm:gap-8
            "
          >

            <div className="flex justify-center">

              <RiskScoreDial
                score={score}
                riskLevel={riskLevel}
                size={180}
              />

            </div>


            <div
              className="
                flex
                flex-col
                items-center
                text-center
                sm:items-start
                sm:text-left
              "
            >

              <span
                className={`
                  inline-flex
                  items-center
                  gap-1.5
                  rounded-full
                  border
                  px-3
                  py-1
                  text-xs
                  font-bold
                  uppercase
                  tracking-[0.18em]
                  ${RISK_CHIP[riskLevel]}
                `}
              >

                {riskLevel} RISK

              </span>


              <p className="mt-3 text-sm text-steel-400">

                Threat Type:{' '}

                <span className="font-semibold text-white">

                  {threatType}

                </span>

              </p>


              <p className="mt-2 max-w-md text-sm leading-relaxed text-steel-300">

                {riskMessage}

              </p>

            </div>

          </div>

        </div>


        {/* ==================================================
            Explainable AI
        ================================================== */}

        <div className="mt-6">

          <ExplainableAI
            phishingSignals={
              result.phishingSignals
            }

            safeSignals={
              result.safeSignals
            }
          />

        </div>


        {/* ==================================================
            Recommended Action
        ================================================== */}

        <div className="mt-6">

          <RecommendedAction
            riskLevel={riskLevel}
            text={result.recommendation}
          />

        </div>


        {/* ==================================================
            Detection Breakdown
        ================================================== */}

        <div className="mt-6">

          <DetectionBreakdown
            breakdown={result.breakdown}
          />

        </div>


        {/* ==================================================
            Analyze Another
        ================================================== */}

        <div className="mt-8 flex justify-center">

          <button
            onClick={onAnalyzeAnother}
            className="
              inline-flex
              items-center
              gap-2
              rounded-lg
              border
              border-cyan-400/30
              bg-cyan-400/10
              px-5
              py-2.5
              text-sm
              font-semibold
              text-cyan-200
              transition
              hover:bg-cyan-400/20
              hover:shadow-cyan-glow
            "
          >

            <RotateCcw className="h-4 w-4" />

            Analyze Another Threat

          </button>

        </div>

      </div>

    </section>
  );
}