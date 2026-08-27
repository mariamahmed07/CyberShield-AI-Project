import {
  useEffect,
  useRef,
  useState,
} from 'react';


interface Props {
  score: number;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  size?: number;
}


const RISK_COLORS = {

  LOW: {
    stroke: '#22d3ee',
    glow: 'rgba(34, 211, 238, 0.5)',
  },

  MEDIUM: {
    stroke: '#fbbf24',
    glow: 'rgba(251, 191, 36, 0.5)',
  },

  HIGH: {
    stroke: '#f87171',
    glow: 'rgba(248, 113, 113, 0.55)',
  },

};


export default function RiskScoreDial({
  score,
  riskLevel,
  size = 180,
}: Props) {

  const [animated, setAnimated] =
    useState(0);

  const ref =
    useRef<number | null>(null);


  useEffect(() => {

    setAnimated(0);

    const start =
      performance.now();

    const duration = 1100;


    const tick = (now: number) => {

      const t =
        Math.min(
          1,
          (now - start) / duration
        );

      const eased =
        1 - Math.pow(
          1 - t,
          3
        );

      setAnimated(
        Math.round(
          score * eased
        )
      );


      if (t < 1) {

        ref.current =
          requestAnimationFrame(tick);

      }

    };


    ref.current =
      requestAnimationFrame(tick);


    return () => {

      if (ref.current) {

        cancelAnimationFrame(
          ref.current
        );

      }

    };

  }, [score]);


  const stroke = 10;

  const radius =
    (size - stroke) / 2;

  const circumference =
    2 * Math.PI * radius;

  const offset =
    circumference -
    (animated / 100) *
      circumference;

  const color =
    RISK_COLORS[riskLevel];


  return (

    <div
      className="
        relative
        flex
        flex-col
        items-center
        justify-center
      "
      style={{
        width: size,
        height: size,
      }}
    >

      <svg
        width={size}
        height={size}
        className="-rotate-90"
      >

        {/* Background */}

        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(94, 166, 220, 0.12)"
          strokeWidth={stroke}
        />


        {/* Progress */}

        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color.stroke}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{
            transition:
              'stroke 0.4s ease',

            filter:
              `drop-shadow(0 0 8px ${color.glow})`,
          }}
        />

      </svg>


      <div
        className="
          absolute
          inset-0
          flex
          flex-col
          items-center
          justify-center
        "
      >

        <span
          className="
            font-mono
            text-5xl
            font-bold
            tabular-nums
          "
          style={{
            color: color.stroke,

            textShadow:
              `0 0 24px ${color.glow}`,
          }}
        >

          {animated}

        </span>


        <span
          className="
            font-mono
            text-sm
            text-steel-400
          "
        >

          / 100

        </span>

      </div>

    </div>

  );
}