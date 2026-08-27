import { useRef } from 'react';
import { ScanSearch, Trash2, Loader2, ShieldAlert } from 'lucide-react';
import type { DemoExample } from '@/types';

interface Props {
  value: string;
  onChange: (v: string) => void;
  onAnalyze: () => void;
  onClear: () => void;
  isAnalyzing: boolean;
  examples: DemoExample[];
}

export default function ThreatAnalyzer({
  value,
  onChange,
  onAnalyze,
  onClear,
  isAnalyzing,
  examples,
}: Props) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleExample = (text: string) => {
    onChange(text);
    textareaRef.current?.focus();
  };

  const canAnalyze = value.trim().length > 0 && !isAnalyzing;

  return (
    <section id="analyzer" className="px-5 py-8 sm:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="glass-strong relative overflow-hidden rounded-2xl p-6 shadow-soft sm:p-8">
          <div className="mb-1 flex items-center gap-2">
            <ScanSearch className="h-5 w-5 text-cyan-300" />
            <h2 className="text-xl font-semibold text-white sm:text-2xl">
              Analyze a Threat
            </h2>
          </div>
          <p className="mb-5 text-sm text-steel-300">
            Paste a suspicious message or URL and analyze its potential phishing
            indicators.
          </p>

          <div className="relative">
            <textarea
              ref={textareaRef}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder="Paste a suspicious message or URL here..."
              rows={6}
              disabled={isAnalyzing}
              className="w-full resize-y rounded-xl border hairline bg-navy-950/60 px-4 py-3.5 font-mono text-sm leading-relaxed text-steel-100 placeholder:text-steel-500 transition focus:border-cyan-400/50 focus:bg-navy-950/80 disabled:opacity-60"
              aria-label="Suspicious message or URL input"
            />
            {isAnalyzing && (
              <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-xl">
                <div className="scan-line absolute inset-x-0 h-16 animate-scan" />
              </div>
            )}
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <button
              onClick={onAnalyze}
              disabled={!canAnalyze}
              className="inline-flex items-center gap-2 rounded-lg bg-cyan-400 px-5 py-2.5 text-sm font-semibold text-navy-950 shadow-cyan-glow transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Analyzing threat indicators...
                </>
              ) : (
                <>
                  <ScanSearch className="h-4 w-4" />
                  Analyze Threat
                </>
              )}
            </button>
            <button
              onClick={onClear}
              disabled={isAnalyzing}
              className="inline-flex items-center gap-2 rounded-lg border hairline bg-navy-800/40 px-4 py-2.5 text-sm font-medium text-steel-200 transition hover:bg-navy-700/60 disabled:opacity-40"
            >
              <Trash2 className="h-4 w-4" />
              Clear
            </button>
            <span className="ml-auto inline-flex items-center gap-1.5 text-xs text-steel-400">
              <ShieldAlert className="h-3.5 w-3.5 text-cyan-400/60" />
              Demo analysis • Prototype only
            </span>
          </div>
        </div>

        {/* Demo examples */}
        <div className="mt-8">
          <h3 className="mb-4 text-center text-lg font-semibold text-white">
            Try a Demo
          </h3>
          <div className="grid gap-4 sm:grid-cols-3">
            {examples.map((ex) => (
              <DemoCard key={ex.id} example={ex} onClick={() => handleExample(ex.text)} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function DemoCard({
  example,
  onClick,
}: {
  example: DemoExample;
  onClick: () => void;
}) {
  const styles = {
    LOW: {
      ring: 'border-emerald-400/30 hover:border-emerald-400/60',
      chip: 'bg-emerald-400/15 text-emerald-300 border-emerald-400/30',
      dot: 'bg-emerald-400',
    },
    MEDIUM: {
      ring: 'border-amber-400/30 hover:border-amber-400/60',
      chip: 'bg-amber-400/15 text-amber-300 border-amber-400/30',
      dot: 'bg-amber-400',
    },
    HIGH: {
      ring: 'border-red-400/30 hover:border-red-400/60',
      chip: 'bg-red-400/15 text-red-300 border-red-400/30',
      dot: 'bg-red-400',
    },
  }[example.riskLevel];

  return (
    <button
      onClick={onClick}
      className={`group glass rounded-xl border ${styles.ring} p-4 text-left transition hover:shadow-cyan-glow`}
    >
      <div className="mb-2 flex items-center justify-between">
        <span
          className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] ${styles.chip}`}
        >
          <span className={`h-1.5 w-1.5 rounded-full ${styles.dot}`} />
          {example.label}
        </span>
      </div>
      <p className="line-clamp-3 text-xs leading-relaxed text-steel-300">
        {example.text}
      </p>
      <span className="mt-3 inline-block text-xs font-medium text-cyan-300 opacity-0 transition group-hover:opacity-100">
        Load example →
      </span>
    </button>
  );
}
