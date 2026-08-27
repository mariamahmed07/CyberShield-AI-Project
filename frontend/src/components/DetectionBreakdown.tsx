import {
  useEffect,
  useRef,
  useState,
} from 'react';

import {
  Link2,
  MessageSquare,
  Activity,
  Fish,
} from 'lucide-react';

import type {
  DetectionBreakdown as Breakdown,
} from '@/types';


interface Props {
  breakdown: Breakdown;
}


const ITEMS: {
  key: keyof Breakdown;
  label: string;
  Icon: React.ComponentType<{
    className?: string;
  }>;
}[] = [

  {
    key: 'url',
    label: 'URL Analysis',
    Icon: Link2,
  },

  {
    key: 'language',
    label: 'Language Analysis',
    Icon: MessageSquare,
  },

  {
    key: 'behavioral',
    label: 'Behavioral Indicators',
    Icon: Activity,
  },

  {
    key: 'patterns',
    label: 'Phishing Patterns',
    Icon: Fish,
  },

];


// ============================================================
// Progress Bar
// ============================================================

function Bar({
  value,
  delay,
}: {
  value: number;
  delay: number;
}) {

  const [width, setWidth] =
    useState(0);

  const ref =
    useRef<HTMLDivElement>(null);


  useEffect(() => {

    const element =
      ref.current;

    if (!element) return;


    const observer =
      new IntersectionObserver(
        (entries) => {

          if (
            entries[0].isIntersecting
          ) {

            setTimeout(
              () => {

                setWidth(
                  Math.max(
                    0,
                    Math.min(
                      value,
                      100
                    )
                  )
                );

              },
              delay
            );


            observer.disconnect();

          }

        },
        {
          threshold: 0.3,
        }
      );


    observer.observe(element);


    return () =>
      observer.disconnect();

  }, [value, delay]);


  return (

    <div
      ref={ref}
      className="
        h-2
        w-full
        overflow-hidden
        rounded-full
        bg-navy-950/60
      "
    >

      <div
        className="
          h-full
          rounded-full
          bg-gradient-to-r
          from-cyan-500
          to-cyan-300
          transition-[width]
          duration-1000
          ease-out
        "
        style={{
          width: `${width}%`,

          boxShadow:
            '0 0 12px rgba(34, 211, 238, 0.5)',
        }}
      />

    </div>

  );
}


// ============================================================
// Component
// ============================================================

export default function DetectionBreakdown({
  breakdown,
}: Props) {

  return (

    <div
      className="
        glass-strong
        rounded-2xl
        p-6
        shadow-soft
        sm:p-8
      "
    >

      <div
        className="
          mb-5
          flex
          items-center
          justify-between
          gap-3
        "
      >

        <h2
          className="
            text-xl
            font-semibold
            text-white
            sm:text-2xl
          "
        >

          Detection Breakdown

        </h2>

      </div>


      <div className="grid gap-5 sm:grid-cols-2">

        {ITEMS.map(
          (item, index) => {

            const value =
              breakdown[item.key] ?? 0;


            return (

              <div key={item.key}>

                <div
                  className="
                    mb-2
                    flex
                    items-center
                    justify-between
                  "
                >

                  <span
                    className="
                      flex
                      items-center
                      gap-2
                      text-sm
                      font-medium
                      text-steel-200
                    "
                  >

                    <item.Icon
                      className="
                        h-4
                        w-4
                        text-cyan-300
                      "
                    />

                    {item.label}

                  </span>


                  <span
                    className="
                      font-mono
                      text-xs
                      text-steel-400
                    "
                  >

                    {value}%

                  </span>

                </div>


                <Bar
                  value={value}
                  delay={index * 120}
                />

              </div>

            );

          }
        )}

      </div>


      <p
        className="
          mt-5
          text-xs
          text-steel-500
        "
      >

        Conceptual prototype indicators —
        not measured model performance.

      </p>

    </div>

  );
}