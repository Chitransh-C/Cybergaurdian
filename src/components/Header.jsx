import React, { useState } from 'react';
import { Shield, Terminal, Award, Zap, HelpCircle, RotateCcw, Check, Sparkles } from 'lucide-react';

export default function Header({ xp, completedBadgesCount, onResetLab }) {
  const [showCheatsheet, setShowCheatsheet] = useState(false);

  return (
    <>
      <header className="border-b border-cyan-500/20 bg-slate-950/70 backdrop-blur-xl px-4 py-2.5 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo & Brand Identity */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="p-2 rounded-xl bg-gradient-to-br from-cyan-500/20 via-blue-500/20 to-emerald-500/10 border border-cyan-400/40 text-cyan-400 shadow-[0_0_15px_rgba(0,240,255,0.3)]">
                <Shield className="w-5 h-5 text-cyan-300" />
              </div>
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 status-dot-active border-2 border-slate-950"></span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base font-bold tracking-tight text-white flex items-center gap-1.5 font-display">
                  Cyber<span className="text-cyan-400">Guardian</span>
                </h1>
                <span className="chamfer-tag px-2 py-0.5 text-[10px] font-mono font-bold bg-cyan-950 text-cyan-400 border border-cyan-500/40">
                  MVP LAB
                </span>
              </div>
              <p className="text-[11px] text-slate-400 flex items-center gap-2">
                <span>AI Cybersecurity Sandbox</span>
                <span className="text-slate-600">•</span>
                <span className="text-emerald-400 font-mono">100% In-Browser Safe</span>
              </p>
            </div>
          </div>

          {/* Gamification Stats: XP, Badges & Operator Status */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-3 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-800 font-mono text-xs">
              <div className="flex items-center gap-1.5 text-amber-400">
                <Zap className="w-4 h-4 text-amber-400 fill-amber-400/20" />
                <span className="font-bold text-slate-100">{xp}</span>
                <span className="text-slate-400 text-[11px]">XP</span>
              </div>

              <div className="h-3 w-px bg-slate-700"></div>

              <div className="flex items-center gap-1.5 text-cyan-400">
                <Award className="w-4 h-4 text-cyan-400" />
                <span className="font-bold text-slate-100">{completedBadgesCount}</span>
                <span className="text-slate-400 text-[11px]">Badges</span>
              </div>
            </div>

            {/* Actions: Cheatsheet & Reset */}
            <button
              onClick={() => setShowCheatsheet(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 hover:border-cyan-500/40 transition-all"
            >
              <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
              <span>Cheatsheet</span>
            </button>

            <button
              onClick={onResetLab}
              title="Reset Virtual Filesystem"
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-400 hover:text-rose-300 bg-slate-900/60 hover:bg-rose-950/40 border border-slate-800 hover:border-rose-500/30 transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Reset Lab</span>
            </button>
          </div>
        </div>
      </header>

      {/* Cheatsheet Modal */}
      {showCheatsheet && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="glass-panel border-gradient max-w-2xl w-full max-h-[85vh] flex flex-col overflow-hidden">
            <div className="p-4 border-b border-cyan-500/20 bg-slate-950/80 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-cyan-400" />
                <h3 className="font-bold text-slate-100 text-sm">Linux Cyber Command Cheatsheet</h3>
              </div>
              <button
                onClick={() => setShowCheatsheet(false)}
                className="text-slate-400 hover:text-white text-xs px-2 py-1 rounded bg-slate-800"
              >
                Close (ESC)
              </button>
            </div>

            <div className="p-4 overflow-y-auto space-y-4 text-xs font-mono">
              <div className="space-y-1">
                <div className="text-cyan-400 font-bold uppercase text-[11px]">Navigation</div>
                <div className="grid grid-cols-2 gap-2 text-slate-300">
                  <div className="p-2 rounded bg-slate-900/80 border border-slate-800"><span className="text-emerald-400">pwd</span> - Print working directory</div>
                  <div className="p-2 rounded bg-slate-900/80 border border-slate-800"><span className="text-emerald-400">ls -la</span> - List all files with permissions</div>
                  <div className="p-2 rounded bg-slate-900/80 border border-slate-800"><span className="text-emerald-400">cd &lt;dir&gt;</span> - Change directory</div>
                  <div className="p-2 rounded bg-slate-900/80 border border-slate-800"><span className="text-emerald-400">mkdir -p</span> - Create nested folder tree</div>
                </div>
              </div>

              <div className="space-y-1">
                <div className="text-cyan-400 font-bold uppercase text-[11px]">Inspection & Search</div>
                <div className="grid grid-cols-2 gap-2 text-slate-300">
                  <div className="p-2 rounded bg-slate-900/80 border border-slate-800"><span className="text-emerald-400">cat &lt;file&gt;</span> - View whole file contents</div>
                  <div className="p-2 rounded bg-slate-900/80 border border-slate-800"><span className="text-emerald-400">head -n 5</span> - View first 5 lines</div>
                  <div className="p-2 rounded bg-slate-900/80 border border-slate-800"><span className="text-emerald-400">grep "str" &lt;f&gt;</span> - Search pattern in file</div>
                  <div className="p-2 rounded bg-slate-900/80 border border-slate-800"><span className="text-emerald-400">find / -name "*.log"</span> - Find files recursively</div>
                </div>
              </div>

              <div className="space-y-1">
                <div className="text-cyan-400 font-bold uppercase text-[11px]">Permissions & Security</div>
                <div className="grid grid-cols-2 gap-2 text-slate-300">
                  <div className="p-2 rounded bg-slate-900/80 border border-slate-800"><span className="text-emerald-400">chmod 644</span> - Owner RW, Others R</div>
                  <div className="p-2 rounded bg-slate-900/80 border border-slate-800"><span className="text-emerald-400">chmod +x</span> - Make executable</div>
                  <div className="p-2 rounded bg-slate-900/80 border border-slate-800"><span className="text-emerald-400">ps aux</span> - View all running processes</div>
                  <div className="p-2 rounded bg-slate-900/80 border border-slate-800"><span className="text-emerald-400">kill &lt;PID&gt;</span> - Stop rogue process</div>
                </div>
              </div>

              <div className="space-y-1">
                <div className="text-cyan-400 font-bold uppercase text-[11px]">Piping & Redirection</div>
                <div className="p-2 rounded bg-slate-900/80 border border-slate-800 text-slate-300">
                  <span className="text-amber-400">cat /var/log/auth.log | grep Failed | wc -l</span><br/>
                  Pipes stdout of cat into grep, then into wc to count brute force login attempts!
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
