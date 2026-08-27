import { FlaskConical } from 'lucide-react';

export default function PrototypeNotice() {
  return (
    <section className="px-5 py-10 sm:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="rounded-xl border border-cyan-400/20 bg-cyan-400/5 p-5 sm:p-6">
          <div className="flex items-start gap-3">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-cyan-400/30 bg-cyan-400/10 text-cyan-300">
              <FlaskConical className="h-5 w-5" />
            </span>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-cyan-300">
                Proof of Concept
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-steel-200">
                CyberShield AI is a competition prototype demonstrating a proposed
                explainable phishing detection workflow. The current analysis uses
                predefined demo indicators and rules. It is not a validated
                real-world security engine.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
