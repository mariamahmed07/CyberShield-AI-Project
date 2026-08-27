import { Sparkles, ArrowDown } from 'lucide-react';

export default function Hero() {
  return (
    <section id="dashboard" className="relative px-5 pt-12 pb-6 sm:px-8 sm:pt-16">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-center text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/25 bg-cyan-400/5 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-cyan-300">
            <Sparkles className="h-3.5 w-3.5" />
            AI × Cybersecurity × User Awareness
          </span>

          <h1 className="mt-5 text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl md:text-6xl">
            Detect. <span className="text-gradient">Explain.</span> Protect.
          </h1>

          <p className="mt-4 max-w-2xl text-base text-steel-300 sm:text-lg">
            Analyze suspicious messages and URLs with an explainable AI-powered
            threat assessment.
          </p>

          <p className="mt-2 text-sm font-medium text-cyan-300/80">
            From Threat Detection to Threat Understanding
          </p>

          <a
            href="#analyzer"
            className="mt-7 inline-flex items-center gap-2 rounded-lg border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-200 transition hover:bg-cyan-400/20 hover:shadow-cyan-glow"
          >
            Start Analyzing
            <ArrowDown className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
