import {
  Link2,
  AlertTriangle,
  KeyRound,
  BadgeCheck,
  Info,
} from 'lucide-react';

import type { PhishingSignal } from '@/types';


interface Props {
  phishingSignals: PhishingSignal[];
  safeSignals: PhishingSignal[];
}


// ============================================================
// Icon Map
// ============================================================

const ICON_MAP: Record<
  string,
  React.ComponentType<{
    className?: string;
  }>
> = {

  account: KeyRound,

  link: Link2,

  click: Link2,

  hours: AlertTriangle,

  urgent: AlertTriangle,

  bank: KeyRound,

  verify: KeyRound,

  login: KeyRound,

  password: KeyRound,
};


// ============================================================
// Get Icon
// ============================================================

function getIcon(
  feature: string
): React.ComponentType<{
  className?: string;
}> {

  const key = feature.toLowerCase();

  for (
    const [name, Icon]
    of Object.entries(ICON_MAP)
  ) {

    if (key.includes(name)) {

      return Icon;

    }

  }

  return Info;
}


// ============================================================
// Component
// ============================================================

export default function ExplainableAI({
  phishingSignals,
  safeSignals,
}: Props) {

  const hasSignals =
    phishingSignals.length > 0 ||
    safeSignals.length > 0;


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

      {/* ======================================================
          Header
      ====================================================== */}

      <div className="mb-1">

        <h2
          className="
            text-2xl
            font-bold
            text-white
            sm:text-3xl
          "
        >
          Why was this flagged?
        </h2>

      </div>


      <p className="mb-6 text-sm text-steel-300">

        These are the strongest features that influenced
        the AI model's prediction.

      </p>


      {/* ======================================================
          No Signals
      ====================================================== */}

      {!hasSignals ? (

        <div
          className="
            rounded-xl
            border
            hairline
            bg-navy-950/40
            p-6
            text-center
          "
        >

          <BadgeCheck
            className="
              mx-auto
              mb-2
              h-8
              w-8
              text-emerald-400/70
            "
          />

          <p className="text-sm text-steel-300">

            No significant indicators were detected.

          </p>

        </div>

      ) : (

        <div className="space-y-8">

          {/* ==================================================
              Phishing Signals
          ================================================== */}

          {phishingSignals.length > 0 && (

            <div>

              <div className="mb-4">

                <h3 className="text-lg font-semibold text-white">

                  Phishing Signals

                </h3>

                <p className="mt-1 text-xs text-steel-400">

                  Features pushing the prediction toward phishing

                </p>

              </div>


              <div className="grid gap-4 sm:grid-cols-2">

                {phishingSignals.map(
                  (signal, index) => {

                    const Icon =
                      getIcon(signal.feature);

                    return (

                      <div
                        key={`${signal.feature}-${index}`}
                        className="
                          group
                          rounded-xl
                          border
                          hairline
                          bg-navy-900/40
                          p-4
                          transition
                          hover:border-cyan-400/30
                          hover:bg-navy-850/60
                        "
                      >

                        <div className="flex items-center gap-3">

                          <span
                            className="
                              grid
                              h-10
                              w-10
                              shrink-0
                              place-items-center
                              rounded-lg
                              border
                              border-cyan-400/25
                              bg-cyan-400/10
                              text-cyan-300
                            "
                          >

                            <Icon className="h-5 w-5" />

                          </span>


                          <div className="min-w-0 flex-1">

                            <p
                              className="
                                font-mono
                                text-sm
                                text-white
                              "
                            >
                              {signal.feature}
                            </p>


                            <p
                              className="
                                mt-1
                                font-mono
                                text-sm
                                font-bold
                                text-cyan-300
                              "
                            >
                              +{signal.contribution.toFixed(4)}
                            </p>

                          </div>

                        </div>

                      </div>

                    );

                  }
                )}

              </div>

            </div>

          )}


          {/* ==================================================
              Safe Signals
          ================================================== */}

          {safeSignals.length > 0 && (

            <div>

              <div className="mb-4">

                <h3 className="text-lg font-semibold text-white">

                  Safe Signals

                </h3>

                <p className="mt-1 text-xs text-steel-400">

                  Features pushing the prediction toward safe

                </p>

              </div>


              <div className="grid gap-4 sm:grid-cols-2">

                {safeSignals.map(
                  (signal, index) => {

                    const Icon =
                      getIcon(signal.feature);

                    return (

                      <div
                        key={`${signal.feature}-${index}`}
                        className="
                          group
                          rounded-xl
                          border
                          hairline
                          bg-navy-900/40
                          p-4
                          transition
                          hover:border-emerald-400/30
                          hover:bg-navy-850/60
                        "
                      >

                        <div className="flex items-center gap-3">

                          <span
                            className="
                              grid
                              h-10
                              w-10
                              shrink-0
                              place-items-center
                              rounded-lg
                              border
                              border-emerald-400/25
                              bg-emerald-400/10
                              text-emerald-300
                            "
                          >

                            <Icon className="h-5 w-5" />

                          </span>


                          <div className="min-w-0 flex-1">

                            <p
                              className="
                                font-mono
                                text-sm
                                text-white
                              "
                            >
                              {signal.feature}
                            </p>


                            <p
                              className="
                                mt-1
                                font-mono
                                text-sm
                                font-bold
                                text-emerald-300
                              "
                            >
                              {signal.contribution.toFixed(4)}
                            </p>

                          </div>

                        </div>

                      </div>

                    );

                  }
                )}

              </div>

            </div>

          )}


          {/* ==================================================
              Explanation
          ================================================== */}

          <div
            className="
              rounded-xl
              border
              hairline
              bg-navy-950/40
              p-4
            "
          >

            <p
              className="
                text-xs
                leading-relaxed
                text-steel-400
              "
            >

              <strong className="text-steel-300">

                How to read this:

              </strong>{' '}

              Positive contributions push the prediction
              toward phishing, while negative contributions
              push it toward safe.

            </p>

          </div>

        </div>

      )}

    </div>

  );
}
}