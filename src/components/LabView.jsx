import React, { useState, useMemo, useEffect } from 'react';
import { 
  ArrowLeft, 
  Terminal, 
  Bot, 
  Award, 
  RotateCcw, 
  Layers, 
  ChevronRight, 
  ChevronLeft,
  Maximize2,
  Minimize2,
  Sparkles,
  HelpCircle,
  X,
  Shield,
  FolderTree,
  CheckCircle,
  Lock,
  Play,
  FileText,
  KeyRound,
  Search,
  Cpu,
  Radio,
  BookOpen
} from 'lucide-react';
import TaskGuide from './TaskGuide';
import TerminalView from './TerminalView';
import AiMentor from './AiMentor';
import DefensePlayground from './DefensePlayground';

const MODULE_ICONS = {
  1: FolderTree,
  2: FileText,
  3: KeyRound,
  4: Search,
  5: Cpu,
  6: Radio
};

export default function LabView({
  course,
  activeModuleIndex,
  onSelectModule,
  taskStatus,
  moduleCompletionStatus,
  vfs,
  onCommandRun,
  onBackToDashboard,
  onResetLab,
  onOpenTheory
}) {
  const [isCurriculumDrawerOpen, setIsCurriculumDrawerOpen] = useState(false);
  const [activeLeftTab, setActiveLeftTab] = useState('guide'); // 'guide' | 'ai'
  const [activeHintCommand, setActiveHintCommand] = useState('');
  const [workspace, setWorkspace] = useState('terminal');

  const currentModule = course.modules[activeModuleIndex];

  useEffect(() => {
    setWorkspace(currentModule.playground ? 'playground' : 'terminal');
  }, [currentModule.id, currentModule.playground]);

  const currentActiveTask = useMemo(() => {
    return currentModule.tasks.find(t => !taskStatus[t.id]) || null;
  }, [currentModule, taskStatus]);

  const hasNext = activeModuleIndex < course.modules.length - 1;
  const hasPrev = activeModuleIndex > 0;

  const completedModulesCount = course.modules.filter(m => moduleCompletionStatus[m.id]).length;
  const trackPercent = Math.round((completedModulesCount / course.modules.length) * 100);

  return (
    <div className="flex-1 flex flex-col h-screen overflow-hidden bg-[#070b14] text-slate-100">
      {/* 1. TOP SECONDARY TACTICAL SANDBOX BAR */}
      <header className="px-4 py-2.5 bg-[#0a0f1d] border-b border-white/[0.08] flex items-center justify-between text-xs font-mono shadow-md z-20 flex-shrink-0">
        {/* Left: Operational Breadcrumbs */}
        <div className="flex items-center gap-2 sm:gap-3 overflow-hidden">
          <button
            onClick={onBackToDashboard}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#161b2a] hover:bg-white/[0.08] text-slate-300 hover:text-white border border-white/[0.08] transition-colors flex-shrink-0"
            title="Return to Dashboard"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-emerald-400" />
            <span className="font-semibold font-sans text-xs">Dashboard</span>
          </button>

          <span className="text-slate-600 hidden sm:inline">/</span>

          <span className="text-slate-400 hidden md:inline truncate font-mono text-[11px]">
            {course.title}
          </span>

          <span className="text-slate-600 hidden md:inline">/</span>

          <div className="flex items-center gap-2 truncate">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-950/60 text-emerald-300 font-bold border border-emerald-500/30 text-[11px] truncate flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Mod 0{currentModule.number}: {currentModule.title}
            </span>
          </div>
        </div>

        {/* Right: Sandbox Status & Tools */}
        <div className="flex items-center gap-2.5 flex-shrink-0">
          {/* Review Theory Briefing Button */}
          <button
            onClick={onOpenTheory}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#161b2a] hover:bg-white/[0.08] border border-amber-500/30 text-xs font-sans font-medium text-amber-300 transition-colors shadow-sm"
            title="Review Module Defense Theory Briefing"
          >
            <BookOpen className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Theory Briefing</span>
          </button>

          {/* Curriculum Drawer Toggle */}
          <button
            onClick={() => setIsCurriculumDrawerOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#161b2a] hover:bg-white/[0.08] border border-white/[0.1] text-xs font-sans font-medium text-slate-200 transition-colors shadow-sm"
            title="Open Curriculum Track"
          >
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            <span>Curriculum ({completedModulesCount}/{course.modules.length})</span>
          </button>

          {/* AI Mentor Quick Toggle */}
          <button
            onClick={() => setActiveLeftTab(activeLeftTab === 'ai' ? 'guide' : 'ai')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-sans font-medium transition-colors ${
              activeLeftTab === 'ai'
                ? 'bg-cyan-950/70 border-cyan-500/50 text-cyan-300 shadow-[0_0_12px_rgba(6,182,212,0.3)]'
                : 'bg-[#161b2a] hover:bg-white/[0.08] border-white/[0.1] text-slate-300'
            }`}
            title="Toggle Socratic AI Mentor"
          >
            <Bot className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">GuardianAI</span>
          </button>

          {/* Reset Sandbox */}
          <button
            onClick={onResetLab}
            className="p-2 text-slate-400 hover:text-rose-300 hover:bg-rose-950/30 rounded-xl border border-white/[0.06] hover:border-rose-500/30 transition-colors"
            title="Reset Virtual Filesystem"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* 2. MAIN TWO-PANE PROFESSIONAL SPLIT WORKSPACE */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-3 p-3 overflow-hidden">
        {/* LEFT PANE: Mission Guide OR Socratic AI Tutor (5 cols on lg) */}
        <section className="col-span-12 lg:col-span-5 h-full flex flex-col overflow-hidden clay-card rounded-2xl border border-white/10 shadow-xl">
          {/* Left Pane Tab Switcher */}
          <div className="flex items-center justify-between p-2.5 bg-[#090e1c] border-b border-white/[0.08] flex-shrink-0">
            <div className="flex bg-[#161b2a] p-1 rounded-xl border border-white/[0.06]">
              <button
                onClick={() => setActiveLeftTab('guide')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeLeftTab === 'guide'
                    ? 'clay-tag text-emerald-300 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Mission Directives
              </button>

              <button
                onClick={() => setActiveLeftTab('ai')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  activeLeftTab === 'ai'
                    ? 'clay-tag text-cyan-300 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Bot className="w-3.5 h-3.5" />
                <span>GuardianAI Tutor</span>
              </button>
            </div>

            {/* Next / Prev Navigation */}
            <div className="flex items-center gap-1 text-[11px] font-mono">
              <button
                disabled={!hasPrev}
                onClick={() => {
                  if (hasPrev) {
                    onSelectModule(activeModuleIndex - 1);
                    setActiveHintCommand('');
                  }
                }}
                className={`px-2.5 py-1 rounded-lg border text-xs transition-colors ${
                  hasPrev
                    ? 'bg-[#161b2a] hover:bg-white/[0.08] text-slate-300 border-white/[0.08]'
                    : 'bg-transparent text-slate-600 border-transparent cursor-not-allowed'
                }`}
                title="Previous Module"
              >
                ← Prev
              </button>

              <button
                disabled={!hasNext}
                onClick={() => {
                  if (hasNext) {
                    onSelectModule(activeModuleIndex + 1);
                    setActiveHintCommand('');
                  }
                }}
                className={`px-2.5 py-1 rounded-lg border text-xs transition-colors ${
                  hasNext
                    ? 'bg-[#161b2a] hover:bg-white/[0.08] text-emerald-400 border-emerald-500/30'
                    : 'bg-transparent text-slate-600 border-transparent cursor-not-allowed'
                }`}
                title="Next Module"
              >
                Next →
              </button>
            </div>
          </div>

          {/* Left Pane Active Tab Content */}
          <div className="flex-1 overflow-hidden">
            {activeLeftTab === 'guide' ? (
              <TaskGuide
                module={currentModule}
                taskStatus={taskStatus}
                onSelectHint={(cmd) => setActiveHintCommand(cmd)}
                onNextModule={() => {
                  if (hasNext) {
                    onSelectModule(activeModuleIndex + 1);
                    setActiveHintCommand('');
                  }
                }}
                onPrevModule={() => {
                  if (hasPrev) {
                    onSelectModule(activeModuleIndex - 1);
                    setActiveHintCommand('');
                  }
                }}
                hasNext={hasNext}
                hasPrev={hasPrev}
                isModuleCompleted={!!moduleCompletionStatus[currentModule.id]}
              />
            ) : (
              <AiMentor
                currentModule={currentModule}
                activeTask={currentActiveTask}
                onInsertCommand={(cmd) => setActiveHintCommand(cmd)}
              />
            )}
          </div>
        </section>

        {/* RIGHT PANE: Massive Full-Height Terminal Sandbox (7 cols on lg) */}
        <section className="col-span-12 lg:col-span-7 h-full flex flex-col overflow-hidden rounded-2xl border border-white/10 shadow-2xl bg-[#02050e]">
          {currentModule.playground && (
            <div className="flex items-center gap-2 px-3 py-2 border-b border-white/10 bg-[#0a0f1d] flex-shrink-0">
              <button
                onClick={() => setWorkspace('playground')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold ${workspace === 'playground' ? 'bg-emerald-950/70 text-emerald-200 border border-emerald-500/40' : 'text-slate-400'}`}
              >
                Defense Playground
              </button>
              <button
                onClick={() => setWorkspace('terminal')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold ${workspace === 'terminal' ? 'bg-cyan-950/70 text-cyan-200 border border-cyan-500/40' : 'text-slate-400'}`}
              >
                Terminal
              </button>
            </div>
          )}
          <div className="flex-1 min-h-0 overflow-hidden">
            {currentModule.playground && workspace === 'playground' ? (
              <DefensePlayground
                key={currentModule.id}
                kind={currentModule.playground}
                taskStatus={taskStatus}
                onCommandRun={onCommandRun}
              />
            ) : (
              <TerminalView
                vfs={vfs}
                onCommandRun={onCommandRun}
                activeTaskHint={activeHintCommand || (currentActiveTask ? currentActiveTask.commandHint : '')}
              />
            )}
          </div>
        </section>
      </div>

      {/* 3. SLIDE-OUT CURRICULUM DRAWER OVERLAY */}
      {isCurriculumDrawerOpen && (
        <div className="fixed inset-0 z-50 flex animate-fadeIn">
          {/* Backdrop Blur */}
          <div 
            className="fixed inset-0 bg-black/75 backdrop-blur-md"
            onClick={() => setIsCurriculumDrawerOpen(false)}
          />

          {/* Drawer Panel */}
          <div className="relative w-full max-w-md bg-[#0a0f1d] border-r border-white/10 h-full shadow-2xl flex flex-col z-10 animate-slideRight">
            {/* Drawer Header */}
            <div className="p-5 border-b border-white/[0.08] bg-[#0e1321] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs font-mono font-bold tracking-wider text-emerald-400 uppercase">
                    CURRICULUM TRACK 01
                  </h3>
                  <h4 className="text-sm font-bold text-white">
                    {course.title}
                  </h4>
                </div>
              </div>

              <button
                onClick={() => setIsCurriculumDrawerOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.08] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Overall Track Progress */}
            <div className="p-5 border-b border-white/[0.06] bg-[#090e1c] space-y-2">
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="text-slate-400">Track Mastery Progress</span>
                <span className="text-emerald-400 font-bold">{trackPercent}% Complete</span>
              </div>
              <div className="w-full bg-[#161b2a] rounded-full h-2 overflow-hidden border border-white/[0.06]">
                <div 
                  className="bg-emerald-400 h-full rounded-full transition-all duration-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]"
                  style={{ width: `${trackPercent}%` }}
                />
              </div>
            </div>

            {/* Modules List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
              {course.modules.map((mod, index) => {
                const isActive = index === activeModuleIndex;
                const isDone = !!moduleCompletionStatus[mod.id];
                const IconComponent = MODULE_ICONS[mod.number] || FolderTree;

                return (
                  <button
                    key={mod.id}
                    onClick={() => {
                      onSelectModule(index);
                      setActiveHintCommand('');
                      setIsCurriculumDrawerOpen(false);
                    }}
                    className={`w-full text-left p-3.5 rounded-2xl transition-all relative group flex items-start gap-3.5 border ${
                      isActive
                        ? 'bg-[#161b2a] border-cyan-500/60 shadow-[0_0_20px_rgba(6,182,212,0.2)] ring-1 ring-cyan-500/40'
                        : isDone
                        ? 'bg-[#0e1321] border-emerald-500/30 hover:border-emerald-500/50'
                        : 'bg-[#090e1c] border-white/[0.06] hover:border-white/20'
                    }`}
                  >
                    <div className={`p-2.5 rounded-xl mt-0.5 flex-shrink-0 border ${
                      isActive
                        ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                        : isDone
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                        : 'bg-slate-900 text-slate-500 border-white/[0.06]'
                    }`}>
                      <IconComponent className="w-4 h-4" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <span className="text-[10px] font-mono uppercase font-bold text-slate-400">
                          Module 0{mod.number}
                        </span>
                        {isDone ? (
                          <span className="text-[10px] font-mono text-emerald-400 font-bold flex items-center gap-1">
                            <CheckCircle className="w-3 h-3" /> VERIFIED
                          </span>
                        ) : isActive ? (
                          <span className="text-[10px] font-mono text-cyan-300 font-bold flex items-center gap-1 animate-pulse">
                            <Play className="w-2.5 h-2.5 fill-current" /> ACTIVE
                          </span>
                        ) : (
                          <span className="text-[10px] font-mono text-slate-500 flex items-center gap-1">
                            <Lock className="w-2.5 h-2.5" /> LOCKED
                          </span>
                        )}
                      </div>

                      <h5 className="text-xs font-bold text-white group-hover:text-emerald-300 transition-colors truncate">
                        {mod.title}
                      </h5>

                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/[0.06] text-[10px] font-mono text-slate-400">
                        <span>{mod.tasks.length} Directives</span>
                        <span className="text-amber-400 font-semibold">+{mod.tasks.length * 100} XP</span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
