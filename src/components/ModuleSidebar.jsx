import React from 'react';
import { 
  FolderTree, 
  FileText, 
  KeyRound, 
  Search, 
  Cpu, 
  Network, 
  CheckCircle, 
  Lock, 
  ChevronRight,
  Shield,
  Award
} from 'lucide-react';

const MODULE_ICONS = {
  1: FolderTree,
  2: FileText,
  3: KeyRound,
  4: Search,
  5: Cpu,
  6: Network
};

export default function ModuleSidebar({
  modules,
  activeModuleIndex,
  onSelectModule,
  moduleCompletionStatus
}) {
  const completedCount = modules.filter(m => moduleCompletionStatus[m.id]).length;
  const coursePercent = Math.round((completedCount / modules.length) * 100);

  return (
    <div className="glass-panel border-gradient flex flex-col h-full overflow-hidden">
      {/* Sidebar Header */}
      <div className="p-4 border-b border-cyan-500/15 bg-slate-950/40">
        <div className="flex items-center gap-2 mb-2">
          <div className="p-1.5 rounded-lg bg-cyan-950/70 border border-cyan-500/30 text-cyan-400">
            <Shield className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-mono font-bold tracking-wider text-cyan-400 uppercase">
              Curriculum Track
            </h3>
            <h4 className="text-sm font-bold text-slate-100 leading-tight">
              Linux Basics & Cyber CLI
            </h4>
          </div>
        </div>

        {/* Global Progress Track */}
        <div className="mt-3">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-1">
            <span>Overall Progress</span>
            <span className="text-cyan-400 font-semibold">{coursePercent}%</span>
          </div>
          <div className="w-full bg-slate-900/80 rounded-full h-1.5 overflow-hidden border border-slate-800">
            <div 
              className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-emerald-400 transition-all duration-500"
              style={{ width: `${coursePercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Modules List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {modules.map((mod, index) => {
          const isActive = index === activeModuleIndex;
          const isDone = !!moduleCompletionStatus[mod.id];
          const IconComponent = MODULE_ICONS[mod.number] || FolderTree;

          return (
            <button
              key={mod.id}
              onClick={() => onSelectModule(index)}
              className={`w-full text-left p-3 rounded-xl transition-all relative group flex items-start gap-3 border ${
                isActive
                  ? 'bg-slate-900/90 border-cyan-500/50 shadow-[0_0_20px_rgba(0,240,255,0.12)]'
                  : isDone
                    ? 'bg-emerald-950/20 border-emerald-500/20 hover:border-emerald-500/40'
                    : 'bg-slate-950/40 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/40'
              }`}
            >
              <div className={`p-2 rounded-lg mt-0.5 transition-colors ${
                isActive
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  : isDone
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : 'bg-slate-900 text-slate-400 border border-slate-800'
              }`}>
                <IconComponent className="w-4 h-4" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1">
                  <span className="text-[10px] font-mono uppercase font-bold text-slate-400">
                    Module 0{mod.number}
                  </span>
                  {isDone ? (
                    <span className="flex items-center gap-1 text-[10px] font-mono text-emerald-400 font-semibold">
                      <CheckCircle className="w-3 h-3" />
                      DONE
                    </span>
                  ) : isActive ? (
                    <span className="flex items-center gap-1 text-[10px] font-mono text-cyan-400 font-semibold animate-pulse">
                      ACTIVE
                    </span>
                  ) : null}
                </div>

                <div className={`text-xs font-semibold truncate mt-0.5 ${isActive ? 'text-cyan-200' : 'text-slate-200'}`}>
                  {mod.title}
                </div>

                <div className="flex items-center gap-1 mt-1 text-[11px] text-slate-400">
                  <Award className="w-3 h-3 text-amber-400/80" />
                  <span className="truncate">{mod.badge}</span>
                </div>
              </div>

              <ChevronRight className={`w-4 h-4 mt-2 transition-transform ${
                isActive ? 'text-cyan-400 translate-x-0.5' : 'text-slate-600 group-hover:text-slate-400'
              }`} />
            </button>
          );
        })}
      </div>

      {/* Footer System Status */}
      <div className="p-3 border-t border-slate-800/80 bg-slate-950/60 text-xs font-mono text-slate-400 flex items-center justify-between">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 status-dot-active"></span>
          <span>CLIENT SANDBOX</span>
        </span>
        <span className="text-[11px] text-slate-500">6/6 AVAILABLE</span>
      </div>
    </div>
  );
}
