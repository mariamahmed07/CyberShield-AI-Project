import {
  Keyboard,
  Cpu,
  Brain,
  Eye,
  Gauge,
  FileOutput,
  ArrowDown,
} from 'lucide-react';

const STEPS = [
  { label: 'Input', Icon: Keyboard, desc: 'Suspicious message or URL' },
  { label: 'Feature Extraction', Icon: Cpu, desc: 'Language & URL features' },
  { label: 'Machine Learning + NLP', Icon: Brain, desc: 'Pattern recognition' },
  { label: 'Risk Assessment', Icon: Gauge, desc: 'Demo risk score' },
  { label: 'Explainable AI', Icon: Eye, desc: 'Indicator highlights' },
  { label: 'User-Friendly Result', Icon: FileOutput, desc: 'Clear recommendation' },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="px-5 py-14 sm:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">How It Works</h2>
          <p className="mt-2 text-sm text-steel-300">
            A proposed explainable phishing detection workflow.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {STEPS.map((s, i) => (
            <div key={s.label} className="contents">
              <div className="glass animate-fade-in-up rounded-xl p-4 text-center" style={{ animationDelay: `${i * 80}ms`, animationFillMode: 'both' }}>
                <span className="mx-auto mb-3 grid h-11 w-11 place-items-center rounded-lg border border-cyan-400/25 bg-cyan-400/10 text-cyan-300">
                  <s.Icon className="h-5 w-5" />
                </span>
                <p className="text-sm font-semibold text-white">{s.label}</p>
                <p className="mt-1 text-[11px] leading-relaxed text-steel-400">
                  {s.desc}
                </p>
              </div>
              {i < STEPS.length - 1 && (
                <div className="hidden items-center justify-center lg:flex">
                  <ArrowDown className="h-4 w-4 -rotate-90 text-cyan-400/50" />
                </div>
              )}
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-xs font-medium uppercase tracking-[0.16em] text-steel-500">
          Proposed system architecture
        </p>
      </div>

      <TechnologyCards />
    </section>
  );
}

const TECH = [
  {
    Icon: Brain,
    title: 'Machine Learning',
    desc: 'Identifies suspicious patterns from phishing and legitimate examples.',
  },
  {
    Icon: Cpu,
    title: 'Natural Language Processing',
    desc: 'Analyzes message language and contextual indicators.',
  },
  {
    Icon: Eye,
    title: 'Explainable AI',
    desc: 'Shows the factors behind the system\'s assessment.',
  },
  {
    Icon: Gauge,
    title: 'Cybersecurity',
    desc: 'Transforms analysis into safer user decisions.',
  },
];

function TechnologyCards() {
  return (
    <div className="mx-auto mt-12 max-w-5xl">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {TECH.map((t) => (
          <div
            key={t.title}
            className="glass rounded-xl p-5 transition hover:border-cyan-400/30 hover:shadow-cyan-glow"
          >
            <span className="mb-3 grid h-10 w-10 place-items-center rounded-lg border border-cyan-400/25 bg-cyan-400/10 text-cyan-300">
              <t.Icon className="h-5 w-5" />
            </span>
            <h3 className="text-sm font-semibold text-white">{t.title}</h3>
            <p className="mt-1.5 text-xs leading-relaxed text-steel-300">
              {t.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
