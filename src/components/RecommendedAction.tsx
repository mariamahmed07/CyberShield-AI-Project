import {
  ShieldCheck,
  ShieldAlert,
  ShieldQuestion,
} from 'lucide-react';

import type {
  RiskLevel,
} from '@/types';


interface Props {
  riskLevel: RiskLevel;
  text: string;
}


const STYLES = {

  LOW: {
    Icon: ShieldCheck,
    border:
      'border-emerald-400/30',
    iconBg:
      'bg-emerald-400/10 text-emerald-300 border-emerald-400/30',
    accent:
      'text-emerald-300',
  },

  MEDIUM: {
    Icon: ShieldQuestion,
    border:
      'border-amber-400/30',
    iconBg:
      'bg-amber-400/10 text-amber-300 border-amber-400/30',
    accent:
      'text-amber-300',
  },

  HIGH: {
    Icon: ShieldAlert,
    border:
      'border-red-400/30',
    iconBg:
      'bg-red-400/10 text-red-300 border-red-400/30',
    accent:
      'text-red-300',
  },

};


export default function RecommendedAction({
  riskLevel,
  text,
}: Props) {

  const {
    Icon,
    border,
    iconBg,
    accent,
  } = STYLES[riskLevel];


  return (

    <div
      className={`
        glass-strong
        rounded-2xl
        border
        ${border}
        p-6
        shadow-soft
        sm:p-8
      `}
    >

      <div
        className="
          flex
          items-start
          gap-4
        "
      >

        <span
          className={`
            grid
            h-12
            w-12
            shrink-0
            place-items-center
            rounded-xl
            border
            ${iconBg}
          `}
        >

          <Icon className="h-6 w-6" />

        </span>


        <div>

          <h2
            className={`
              text-xs
              font-semibold
              uppercase
              tracking-[0.18em]
              ${accent}
            `}
          >

            Recommended Action

          </h2>


          <p
            className="
              mt-2
              text-base
              font-medium
              leading-relaxed
              text-white
              sm:text-lg
            "
          >

            {text}

          </p>

        </div>

      </div>

    </div>

  );
}