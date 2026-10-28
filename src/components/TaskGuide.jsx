import React, { useState } from 'react';
import { CheckCircle2, Circle, HelpCircle, ChevronRight, BookOpen, ShieldCheck, Award, Terminal as TerminalIcon, Sparkles } from 'lucide-react';

export default function TaskGuide({
  module,
  taskStatus,
  onSelectHint,
  onNextModule,
  onPrevModule,
  hasNext,
  hasPrev,
  isModuleCompleted
}) {
  const [expandedHint, setExpandedHint] = useState(null);
  const [activeTab, setActiveTab] = useState('tasks'); // 'tasks' | 'theory'

  const toggleHint = (taskId) => {
    setExpandedHint(expandedHint === taskId ? null : taskId);
  };

  const completedCount = module.tasks.filter(t => taskStatus[t.id]).length;
  const progressPercent = Math.round((completedCount / module.tasks.length) * 100);

  return (
    <div className="clay-card rounded-2xl flex flex-col h-full overflow-hidden border border-white/10 shadow-xl">
      {/* Module Header */}
      <div className="p-4 border-b border-white/[0.08] bg-[#090e1c]/80">
        <div className="flex items-center justify-between mb-1.5">
          <div className="flex items-center gap-2">
            <span className="clay-tag px-2.5 py-0.5 text-[10px] font-mono font-bold text-emerald-400">
              MODULE 0{module.number}
            </span>
            <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              Badge: <span className="text-amber-300 font-semibold">{typeof module.badge === 'object' ? module.badge?.title : module.badge}</span>
            </span>
          </div>

          <div className="text-xs font-mono text-emerald-400 font-semibold">
            {completedCount}/{module.tasks.length} Directives Completed
          </div>
        </div>

        <h2 className="text-base sm:text-lg font-bold text-white tracking-tight flex items-center gap-2 font-display">
          {module.title}
        </h2>
        <p className="text-xs text-slate-400 mt-1 line-clamp-2">
          {module.description}
        </p>

        {/* Progress Bar */}
        <div className="w-full bg-[#161b2a] rounded-full h-1.5 mt-3 overflow-hidden border border-white/[0.06]">
          <div 
            className="h-full bg-gradient-to-r from-emerald-500 to-cyan-400 transition-all duration-500 shadow-[0_0_8px_rgba(16,185,129,0.7)]"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Tab Switcher */}
        <div className="flex gap-2 mt-3 pt-2 border-t border-white/[0.06]">
          <button
            onClick={() => setActiveTab('tasks')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'tasks'
                ? 'clay-tag text-emerald-300 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Mission Directives ({completedCount}/{module.tasks.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('theory')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'theory'
                ? 'clay-tag text-cyan-300 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Defense Theory</span>
          </button>

          <div className="ml-auto flex items-center gap-1 text-[11px] font-mono">
            {hasPrev && (
              <button
                onClick={onPrevModule}
                className="px-2 py-0.5 rounded bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors border border-white/[0.06]"
              >
                ← Prev
              </button>
            )}
            {hasNext && (
              <button
                onClick={onNextModule}
                className="px-2 py-0.5 rounded bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors border border-white/[0.06]"
              >
                Next →
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Tab Contents Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#0a0f1d]/50">
        {activeTab === 'tasks' ? (
          <div className="space-y-2.5">
            {module.tasks.map((task, idx) => {
              const isDone = taskStatus[task.id];
              const isHintOpen = expandedHint === task.id;

              return (
                <div
                  key={task.id}
                  className={`p-3 rounded-xl border transition-all ${
                    isDone
                      ? 'bg-[#090e1c] border-emerald-500/40 text-slate-300'
                      : 'bg-[#161b2a]/90 border-white/[0.08] text-white hover:border-cyan-500/40'
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    <div className="mt-0.5 flex-shrink-0">
                      {isDone ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 fill-emerald-400/20" />
                      ) : (
                        <Circle className="w-4 h-4 text-cyan-400" />
                      )}
                    </div>

                    <div className="flex-1 text-xs">
                      <div className="flex items-center justify-between">
                        <span className={`font-semibold ${isDone ? 'line-through text-slate-500' : 'text-slate-100'}`}>
                          {idx + 1}. {task.text}
                        </span>

                        <button
                          onClick={() => toggleHint(task.id)}
                          className="text-[10px] font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1 ml-2 flex-shrink-0"
                        >
                          <HelpCircle className="w-3 h-3" />
                          <span>{isHintOpen ? 'Hide Hint' : 'Hint'}</span>
                        </button>
                      </div>

                      {/* Hint Reveal Drawer */}
                      {isHintOpen && (
                        <div className="mt-2.5 p-2.5 rounded-lg bg-[#090e1c] border border-cyan-500/30 text-[11px] text-cyan-200 space-y-1.5 animate-fadeIn">
                          <p>{task.hint}</p>
                          <div className="flex items-center justify-between pt-1 font-mono text-[10px]">
                            <span className="text-slate-400">Target Command:</span>
                            <button
                              onClick={() => onSelectHint(task.commandHint)}
                              className="px-2 py-0.5 rounded bg-cyan-950/80 hover:bg-cyan-900 text-cyan-300 border border-cyan-500/40 font-bold"
                            >
                              Insert: {task.commandHint}
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-xs text-slate-300 space-y-3 leading-relaxed">
            <div className="p-3.5 rounded-xl bg-[#090e1c] border border-white/[0.08]">
              <h4 className="font-bold text-emerald-300 font-mono mb-1.5 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                Defensive Mission Context
              </h4>
              <p>{module.theory}</p>
            </div>
            <div className="p-3.5 rounded-xl bg-[#161b2a] border border-white/[0.06] font-mono text-[11px] text-slate-300">
              <span className="text-cyan-400 font-bold block mb-1">RECOMMENDED SYNTAX TOOLKIT:</span>
              <ul className="list-disc list-inside space-y-1 text-slate-400">
                {module.tasks.map((t, i) => (
                  <li key={i}><code className="text-emerald-300">{t.commandHint}</code></li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
