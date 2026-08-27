import { ShieldCheck } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t hairline px-5 py-10 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-center text-center">
          <span className="grid h-10 w-10 place-items-center rounded-lg border border-cyan-400/30 bg-cyan-400/10 text-cyan-300">
            <ShieldCheck className="h-5 w-5" />
          </span>
          <p className="mt-3 text-base font-semibold text-white">
            CyberShield AI
          </p>
          <p className="mt-1 text-sm text-steel-300">
            Explainable AI for Phishing Detection
          </p>
          <p className="mt-1 text-sm font-medium text-cyan-300/80">
            Detect. Explain. Protect.
          </p>
          <p className="mt-4 text-[11px] font-medium uppercase tracking-[0.16em] text-steel-500">
            Academic Competition • Proof of Concept
          </p>
        </div>
      </div>
    </footer>
  );
}
