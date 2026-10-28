import React, { useState } from 'react';
import { 
  Shield, 
  Terminal, 
  Award, 
  Zap, 
  CheckCircle, 
  ArrowRight, 
  Clock, 
  Flame, 
  Play, 
  Lock, 
  Compass, 
  FileCode, 
  ShieldAlert, 
  Search, 
  Radio,
  Cpu,
  Layers,
  Sparkles,
  ExternalLink,
  Bot
} from 'lucide-react';
import { ALL_COURSES } from '../data/courses';

const BADGE_ICONS = {
  'Pathfinder': Compass,
  'File Surgeon': FileCode,
  'Permission Sentinel': ShieldAlert,
  'Log Detective': Search,
  'Process Terminator': Zap,
  'Network Sentinel': Radio
};

export default function Dashboard({
  user,
  xp,
  moduleCompletionStatus,
  onLaunchLab,
  onSelectModule,
  onNavigate
}) {
  const [trackId, setTrackId] = useState('course-linux-basics');
  const linuxCourse = ALL_COURSES.find((course) => course.id === trackId) || ALL_COURSES[0];
  const completedModulesCount = linuxCourse.modules.filter(m => moduleCompletionStatus[m.id]).length;
  const progressPercent = Math.round((completedModulesCount / linuxCourse.modules.length) * 100);

  // Find next module to resume
  const nextModuleIndex = linuxCourse.modules.findIndex(m => !moduleCompletionStatus[m.id]);
  const currentResumeIndex = nextModuleIndex === -1 ? 0 : nextModuleIndex;
  const currentResumeModule = linuxCourse.modules[currentResumeIndex];

  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      {/* 1. CADET STATUS HERO BANNER (Tactile Clay + Frosted Glass) */}
      <section className="clay-card rounded-3xl p-6 sm:p-8 relative overflow-hidden border border-white/10 shadow-2xl">
        {/* Ambient Glow Orbs */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center relative z-10">
          {/* Left: Cadet Showcase & Telemetry (7 cols) */}
          <div className="lg:col-span-7 flex flex-col sm:flex-row items-start sm:items-center gap-6">
            {/* Claymorphic Avatar Frame */}
            <div className="relative group flex-shrink-0">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl p-1 bg-[#161b2a] border-2 border-emerald-400/50 shadow-[0_8px_30px_rgba(16,185,129,0.3)] relative overflow-hidden flex items-center justify-center">
                <img
                  src="/stitch_assets/cadet_avatar.png"
                  alt="Agent Neo"
                  className="w-full h-full object-cover rounded-2xl"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/stitch_assets/shield_emblem.png';
                  }}
                />
              </div>
              <span className="absolute -bottom-1 -right-1 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-slate-900"></span>
              </span>
            </div>

            {/* Identity & Vital Statistics */}
            <div className="flex-1 space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-[10px] uppercase px-2.5 py-0.5 rounded-full bg-[#161b2a] text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5 font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  {user?.clearance || 'LEVEL 1 // CADET DEFENDER'}
                </span>
                <span className="font-mono text-[10px] px-2.5 py-0.5 rounded-full bg-cyan-950/40 text-cyan-400 border border-cyan-500/30">
                  ACTIVE_NODE: VM-EU-WEST-09
                </span>
              </div>

              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-display flex items-center gap-2">
                  <span>Welcome back, {user ? user.name : 'Agent Neo'}</span>
                  <CheckCircle className="w-6 h-6 text-emerald-400 fill-emerald-400/20" />
                </h1>
                <p className="text-xs text-slate-400 mt-1">
                  Defensive telemetry initialized. Live honeypot feeds stable and in-browser microVM sandbox primed for triage.
                </p>
              </div>

              {/* Stats Bar Row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
                <div className="bg-[#090e1c]/80 p-3 rounded-2xl border border-white/[0.06] shadow-inner">
                  <span className="font-mono text-[10px] text-slate-400 block uppercase">Defense XP</span>
                  <div className="text-base font-bold font-mono text-white mt-0.5">
                    {xp} <span className="text-xs text-slate-500 font-normal">/ 1,000</span>
                  </div>
                  <div className="w-full bg-[#1a1f2e] h-1.5 rounded-full mt-2 overflow-hidden">
                    <div 
                      className="bg-emerald-400 h-full rounded-full transition-all duration-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" 
                      style={{ width: `${Math.min(100, Math.round((xp / 1000) * 100))}%` }}
                    ></div>
                  </div>
                </div>

                <div className="bg-[#090e1c]/80 p-3 rounded-2xl border border-white/[0.06] shadow-inner">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] text-slate-400 uppercase">Daily Streak</span>
                    <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400/20" />
                  </div>
                  <div className="text-base font-bold font-mono text-amber-400 mt-0.5">5 Days</div>
                  <div className="flex gap-1 mt-2">
                    {['M', 'T', 'W', 'T', 'F'].map((d, i) => (
                      <span key={i} className="w-3 h-1.5 rounded-full bg-emerald-400" title={`Defended Day ${i+1}`}></span>
                    ))}
                  </div>
                </div>

                <div className="bg-[#090e1c]/80 p-3 rounded-2xl border border-white/[0.06] shadow-inner">
                  <span className="font-mono text-[10px] text-slate-400 block uppercase">Modules Done</span>
                  <div className="text-base font-bold font-mono text-emerald-400 mt-0.5">
                    {completedModulesCount} / {linuxCourse.modules.length}
                  </div>
                  <span className="font-mono text-[9px] text-emerald-400 block mt-1 flex items-center gap-1">
                    <CheckCircle className="w-2.5 h-2.5" /> Zero-Leak Verified
                  </span>
                </div>

                <div className="bg-[#090e1c]/80 p-3 rounded-2xl border border-white/[0.06] shadow-inner">
                  <span className="font-mono text-[10px] text-slate-400 block uppercase">Skill Hashes</span>
                  <div className="text-base font-bold font-mono text-cyan-400 mt-0.5">
                    {completedModulesCount} Issued
                  </div>
                  <span className="font-mono text-[9px] text-slate-400 block mt-1">ED25519 Signed</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Active Lab CTA Pod (5 cols) */}
          <div className="lg:col-span-5 bg-[#161b2a]/90 border border-white/[0.1] rounded-2xl p-5 sm:p-6 flex flex-col justify-between space-y-4 shadow-xl backdrop-blur-md">
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-400"></span>
                </span>
                <span className="font-mono text-xs text-cyan-400 font-bold tracking-wider">
                  EPHEMERAL MICROVM ACTIVE
                </span>
              </div>
              <span className="font-mono text-xs text-slate-400">TTL: 42m 18s</span>
            </div>

            <div className="space-y-1.5">
              <span className="font-mono text-[10px] uppercase tracking-wider text-slate-400">
                ACTIVE LAB ENVIRONMENT
              </span>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span>{currentResumeModule.title}</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-[10px] border border-emerald-500/30">
                  Module 0{currentResumeModule.number}
                </span>
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {currentResumeModule.description}
              </p>
            </div>

            {/* Big Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-1">
              <button
                onClick={() => onLaunchLab(currentResumeIndex, linuxCourse.id)}
                className="flex-1 clay-pill-btn py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(16,185,129,0.4)]"
              >
                <Terminal className="w-4 h-4" />
                <span>Resume Active Lab</span>
              </button>
              <button
                onClick={() => onLaunchLab(currentResumeIndex, linuxCourse.id)}
                className="px-4 py-3 rounded-xl bg-[#090e1c] hover:bg-white/[0.06] border border-white/[0.1] text-xs font-semibold text-slate-200 flex items-center justify-center gap-2 transition-colors"
              >
                <img
                  src="/stitch_assets/ai_mentor_avatar.png"
                  alt="EOS"
                  className="w-5 h-5 rounded-full object-cover border border-cyan-400/50"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/stitch_assets/shield_emblem.png';
                  }}
                />
                <span>Socratic Notes</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CONNECTED NODE ROADMAP — TRACK 01 (LINUX FUNDAMENTALS) */}
      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="clay-tag px-2.5 py-0.5 rounded-full text-[10px] font-mono text-emerald-400 font-bold uppercase">
                ACTIVE CURRICULUM JOURNEY
              </span>
              <span className="text-xs text-slate-400 font-mono">MITRE ATT&CK Mapped</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1 font-display">
              {linuxCourse.title}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-400 font-mono">
              Overall Progress: <strong className="text-emerald-400 font-bold">{progressPercent}%</strong>
            </span>
            <div className="w-28 sm:w-36 bg-[#161b2a] h-2 rounded-full overflow-hidden border border-white/[0.08]">
              <div 
                className="bg-emerald-400 h-full rounded-full transition-all duration-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]" 
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-1">
          {ALL_COURSES.map((course) => {
            const done = course.modules.filter((mod) => moduleCompletionStatus[mod.id]).length;
            const active = course.id === linuxCourse.id;
            return (
              <button
                key={course.id}
                onClick={() => setTrackId(course.id)}
                className={`flex-shrink-0 px-3 py-2 rounded-xl border text-left ${active ? 'border-emerald-400/60 bg-emerald-950/40' : 'border-white/10 bg-[#0e1321]'}`}
              >
                <div className="text-xs font-semibold text-white">{course.title}</div>
                <div className="text-[10px] font-mono text-slate-400 mt-1">{done}/{course.modules.length} modules</div>
              </button>
            );
          })}
        </div>

        {/* Node Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {linuxCourse.modules.map((mod, index) => {
            const isCompleted = moduleCompletionStatus[mod.id];
            const isCurrent = index === currentResumeIndex;
            const badgeTitle = typeof mod.badge === 'object' ? mod.badge?.title : mod.badge;
            const Icon = BADGE_ICONS[badgeTitle] || Shield;

            return (
              <div
                key={mod.id}
                onClick={() => onLaunchLab(index, linuxCourse.id)}
                className={`group rounded-3xl p-6 transition-all duration-200 cursor-pointer relative overflow-hidden border ${
                  isCompleted
                    ? 'bg-[#0e1321]/90 border-emerald-500/40 hover:border-emerald-400 shadow-[0_4px_24px_rgba(16,185,129,0.15)]'
                    : isCurrent
                    ? 'bg-[#161b2a]/95 border-cyan-500/60 hover:border-cyan-400 shadow-[0_4px_30px_rgba(6,182,212,0.25)] ring-1 ring-cyan-500/40'
                    : 'bg-[#090e1c]/80 border-white/[0.08] hover:border-white/20 opacity-80'
                }`}
              >
                {/* Node Status Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-[10px] text-slate-400 uppercase font-semibold">
                    MODULE 0{mod.number}
                  </span>
                  {isCompleted ? (
                    <span className="inline-flex items-center gap-1 font-mono text-[10px] text-emerald-400 bg-emerald-950/60 border border-emerald-500/40 px-2 py-0.5 rounded-full font-bold">
                      <CheckCircle className="w-3 h-3" /> VERIFIED
                    </span>
                  ) : isCurrent ? (
                    <span className="inline-flex items-center gap-1 font-mono text-[10px] text-cyan-300 bg-cyan-950/60 border border-cyan-500/40 px-2 py-0.5 rounded-full font-bold animate-pulse">
                      <Play className="w-2.5 h-2.5 fill-current" /> IN PROGRESS
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 font-mono text-[10px] text-slate-400 bg-slate-900 border border-white/[0.06] px-2 py-0.5 rounded-full">
                      <Lock className="w-2.5 h-2.5" /> LOCKED
                    </span>
                  )}
                </div>

                {/* Badge Icon & Title */}
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-2xl p-0.5 flex-shrink-0 flex items-center justify-center border shadow-lg ${
                    isCompleted
                      ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400'
                      : isCurrent
                      ? 'bg-cyan-500/10 border-cyan-500/40 text-cyan-300'
                      : 'bg-slate-900 border-white/[0.06] text-slate-500'
                  }`}>
                    <Icon className="w-6 h-6" />
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors">
                      {mod.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                      {mod.description}
                    </p>
                  </div>
                </div>

                {/* Footer Details: Tasks count & XP reward */}
                <div className="flex items-center justify-between pt-5 mt-5 border-t border-white/[0.06] font-mono text-xs">
                  <span className="text-slate-400 text-[11px]">
                    {mod.tasks.length} Defense Directives
                  </span>
                  <span className={`font-bold flex items-center gap-1 ${
                    isCompleted ? 'text-emerald-400' : 'text-amber-400'
                  }`}>
                    <Zap className="w-3.5 h-3.5" />
                    +{mod.tasks.length * 100} XP
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. AI MENTOR EOS GUIDANCE & CRYPTO VAULT PODS */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Socratic Mentor Briefing (7 cols) */}
        <div className="lg:col-span-7 clay-card rounded-3xl p-6 sm:p-7 space-y-4 border border-white/10 shadow-xl">
          <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl overflow-hidden border border-cyan-400/50 p-0.5 bg-slate-900">
                <img
                  src="/stitch_assets/ai_mentor_avatar.png"
                  alt="GuardianAI EOS"
                  className="w-full h-full object-cover rounded-xl"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/stitch_assets/shield_emblem.png';
                  }}
                />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white font-mono flex items-center gap-2">
                  <span>GUARDIAN AI // EOS SOCRATIC MENTOR</span>
                  <span className="text-[9px] px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                    DIALECTIC ENGINE
                  </span>
                </h3>
                <p className="text-[11px] text-slate-400">Guiding defense reasoning without giving away direct answers</p>
              </div>
            </div>
          </div>

          <div className="bg-[#090e1c] p-4 rounded-2xl border border-white/[0.06] text-slate-300 text-xs leading-relaxed space-y-2">
            <p className="italic text-cyan-200">
              "Cadet Neo, excellent telemetry on Module 0{currentResumeModule.number}. Before issuing commands like <code className="text-emerald-400 font-mono bg-slate-900 px-1.5 py-0.5 rounded">chmod</code> or <code className="text-emerald-400 font-mono bg-slate-900 px-1.5 py-0.5 rounded">kill</code>, remember to inspect the underlying file descriptors and parent process IDs (PPID). How does a process know which user owns its socket?"
            </p>
          </div>

          {/* Quick Inquiry Chips */}
          <div className="space-y-2 pt-1">
            <span className="text-[10px] font-mono uppercase text-slate-400 font-semibold">
              QUICK SOCRATIC INQUIRIES:
            </span>
            <div className="flex flex-wrap gap-2">
              {[
                'Why inspect PPID before killing a daemon?',
                'How does grep exit status work with pipelines?',
                'What is the security risk of SUID binaries?'
              ].map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => onLaunchLab(currentResumeIndex, linuxCourse.id)}
                  className="px-3 py-1.5 rounded-full bg-[#161b2a] hover:bg-emerald-950/40 border border-white/[0.08] hover:border-emerald-500/40 text-[11px] text-slate-300 hover:text-emerald-300 transition-all font-mono"
                >
                  💬 {q}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Cryptographic Vault Box Pod (5 cols) */}
        <div className="lg:col-span-5 clay-card rounded-3xl p-6 sm:p-7 flex flex-col justify-between space-y-5 border border-white/10 shadow-xl">
          <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
            <span className="font-mono text-xs text-amber-400 font-bold uppercase tracking-wider">
              CRYPTOGRAPHIC VAULT & ARMORY
            </span>
            <span className="font-mono text-[10px] text-slate-400">ED25519 SIGNATURES</span>
          </div>

          <div className="flex items-center gap-5">
            <div className="w-20 h-20 rounded-2xl overflow-hidden border border-amber-400/40 p-1 bg-slate-900 flex-shrink-0 shadow-[0_0_20px_rgba(245,158,11,0.2)]">
              <img
                src="/stitch_assets/vault_box.png"
                alt="Cryptographic Vault"
                className="w-full h-full object-cover rounded-xl"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/stitch_assets/shield_emblem.png';
                }}
              />
            </div>

            <div className="space-y-1">
              <h4 className="text-base font-bold text-white">Root Sentinel Badges</h4>
              <p className="text-xs text-slate-400">
                You have collected <strong className="text-emerald-400">{completedModulesCount}</strong> verifiable defense credentials on the public ledger.
              </p>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={() => onNavigate && onNavigate('profile')}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500/20 to-emerald-500/20 hover:from-amber-500/30 hover:to-emerald-500/30 border border-amber-500/40 text-xs font-mono font-bold text-amber-300 flex items-center justify-center gap-2 transition-all"
            >
              <Award className="w-4 h-4 text-amber-400" />
              <span>Inspect Cadet Armory & Skill Radar →</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
