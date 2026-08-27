import { ShieldCheck, Menu, X } from 'lucide-react';
import { useState } from 'react';

const NAV = [
  { label: 'Dashboard', href: '#dashboard' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'About', href: '#about' },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b hairline bg-navy-950/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3.5 sm:px-8">
        <a href="#dashboard" className="group flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-lg border border-cyan-400/30 bg-cyan-400/10 shadow-cyan-glow transition group-hover:bg-cyan-400/20">
            <ShieldCheck className="h-5 w-5 text-cyan-300" strokeWidth={2.2} />
          </span>
          <span className="flex flex-col leading-none">
            <span className="text-[15px] font-semibold tracking-tight text-white">
              CyberShield AI
            </span>
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-steel-400">
              Explainable Phishing Detection
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((n) => (
            <a
              key={n.label}
              href={n.href}
              className="rounded-md px-3.5 py-2 text-sm font-medium text-steel-200 transition hover:bg-cyan-400/10 hover:text-white"
            >
              {n.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <span className="rounded-full border border-cyan-400/40 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-cyan-300 shadow-cyan-glow">
            Proof of Concept
          </span>
        </div>

        <button
          className="grid h-9 w-9 place-items-center rounded-md border hairline text-steel-200 md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t hairline bg-navy-900/95 px-5 py-3 md:hidden">
          <nav className="flex flex-col gap-1">
            {NAV.map((n) => (
              <a
                key={n.label}
                href={n.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2.5 text-sm font-medium text-steel-200 hover:bg-cyan-400/10 hover:text-white"
              >
                {n.label}
              </a>
            ))}
            <span className="mt-1 inline-flex w-fit rounded-full border border-cyan-400/40 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-cyan-300">
              Proof of Concept
            </span>
          </nav>
        </div>
      )}
    </header>
  );
}
