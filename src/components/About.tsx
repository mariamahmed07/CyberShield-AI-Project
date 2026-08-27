import { Eye } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="px-5 py-14 sm:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <span className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-xl border border-cyan-400/25 bg-cyan-400/10 text-cyan-300">
          <Eye className="h-6 w-6" />
        </span>
        <h2 className="text-2xl font-bold text-white sm:text-3xl">
          From Threat Detection to Threat Understanding
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-steel-300 sm:text-base">
          CyberShield AI explores how Explainable AI can make phishing detection
          more understandable and actionable for everyday users. The goal is not
          only to identify suspicious content, but to help users understand the
          warning and make safer decisions.
        </p>
      </div>
    </section>
  );
}
