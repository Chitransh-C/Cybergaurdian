import React from 'react';
import { Award, X } from 'lucide-react';

export default function CertificateModal({ course, user, onClose }) {
  if (!course) return null;

  const issued = new Date().toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  const cadet = user?.name || 'Cadet';

  const download = () => {
    const lines = [
      'CyberGuardian Certificate of Completion',
      `Cadet: ${cadet}`,
      `Course: ${course.title}`,
      `Issued: ${issued}`,
      `Modules: ${course.modules.map((mod) => mod.title).join('; ')}`,
      'Scope: isolated classroom simulations only.'
    ];
    const blob = new Blob([lines.join('\n')], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `cyberguardian-${course.id}-certificate.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="w-full max-w-xl rounded-3xl border border-emerald-400/40 bg-[#0a0f1d] p-6 sm:p-8 shadow-[0_0_40px_rgba(16,185,129,0.25)]">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 border border-emerald-400/40 text-emerald-300 flex items-center justify-center">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[10px] font-mono uppercase tracking-wider text-emerald-400">Course complete</div>
              <h2 className="text-xl font-bold text-white">Certificate of Completion</h2>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-white" aria-label="Close certificate">
            <X className="w-5 h-5" />
          </button>
        </div>
        <p className="mt-6 text-sm text-slate-300 leading-relaxed">
          {cadet} finished every module in <span className="text-white font-semibold">{course.title}</span> on {issued}. Each exercise stayed inside the browser sandbox.
        </p>
        <ul className="mt-4 space-y-1 text-xs text-slate-400">
          {course.modules.map((mod) => (
            <li key={mod.id}>✓ {mod.badge} — {mod.title}</li>
          ))}
        </ul>
        <button onClick={download} className="clay-pill-btn mt-6 px-4 py-2.5 rounded-xl text-xs font-bold">
          Download certificate
        </button>
      </div>
    </div>
  );
}
