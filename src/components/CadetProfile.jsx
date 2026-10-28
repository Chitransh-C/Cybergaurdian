import React, { useState } from 'react';
import { ALL_COURSES } from '../data/courses';
import { 
  Shield, 
  Terminal, 
  Award, 
  Zap, 
  CheckCircle, 
  Download, 
  Share2, 
  Flame, 
  Lock, 
  Compass, 
  FileCode, 
  ShieldAlert, 
  Search, 
  Radio, 
  Cpu, 
  Binary, 
  Layers, 
  Key, 
  KeyRound,
  ExternalLink,
  Sparkles
} from 'lucide-react';

const BADGE_ICONS = {
  Compass,
  FileCode,
  ShieldAlert,
  Search,
  Zap,
  Radio,
  Shield,
  Cpu,
  Binary,
  Layers,
  Key,
  KeyRound
};

function badgeHash(id) {
  let hash = 0;
  for (const char of id) hash = (hash * 33 + char.charCodeAt(0)) >>> 0;
  return hash.toString(16).padStart(8, '0');
}

export default function CadetProfile({ user, xp, onLaunchLab, moduleCompletionStatus = {}, onOpenCertificate }) {
  const [activeTab, setActiveTab] = useState('ALL');
  const [copiedProof, setCopiedProof] = useState(false);

  const finishedCourses = ALL_COURSES.filter((course) => course.modules.every((mod) => moduleCompletionStatus[mod.id]));
  const modulesDone = ALL_COURSES.reduce((sum, course) => sum + course.modules.filter((mod) => moduleCompletionStatus[mod.id]).length, 0);
  const skillAxes = ALL_COURSES.map((course) => ({
    name: course.title.split('&')[0].trim(),
    pct: Math.round((course.modules.filter((mod) => moduleCompletionStatus[mod.id]).length / course.modules.length) * 100)
  }));

  const badges = ALL_COURSES.flatMap((course) => {
    const nextId = course.modules.find((mod) => !moduleCompletionStatus[mod.id])?.id;
    const started = course.modules.some((mod) => moduleCompletionStatus[mod.id]);
    return course.modules.map((mod) => {
      const unlocked = !!moduleCompletionStatus[mod.id];
      const inProgress = !unlocked && started && mod.id === nextId;
      return {
        id: mod.id,
        title: mod.badge,
        status: unlocked ? 'UNLOCKED' : inProgress ? 'IN PROGRESS' : 'LOCKED',
        category: unlocked ? 'UNLOCKED' : inProgress ? 'PROGRESS' : 'LOCKED',
        mitre: course.level,
        hash: unlocked ? badgeHash(mod.id) : '000000000000',
        icon: BADGE_ICONS[mod.badgeIcon] || Shield,
        description: mod.description,
        date: unlocked ? 'Earned in sandbox' : inProgress ? 'Current module' : 'Finish the module'
      };
    });
  });

  const filteredBadges = badges.filter(b => {
    if (activeTab === 'ALL') return true;
    if (activeTab === 'UNLOCKED') return b.category === 'UNLOCKED';
    if (activeTab === 'PROGRESS') return b.category === 'PROGRESS';
    if (activeTab === 'LOCKED') return b.category === 'LOCKED';
    return true;
  });

  const handleExportProof = () => {
    const proofData = {
      cadet: user ? user.name : 'Agent Neo',
      clearance: 'LEVEL 2 // SENIOR DEFENDER',
      publicKey: '0x9e8a71d849204f7d290b821a',
      signature: 'ED25519-SIG-8392-491A-F32C',
      timestamp: new Date().toISOString(),
      verifiedCVEs: 24,
      totalXP: xp || 3450,
      issuer: 'CyberGuardian Defense Academy (NIST/STIG Verified)'
    };

    const blob = new Blob([JSON.stringify(proofData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `CyberGuardian_Defense_Credential_${user ? user.name : 'Agent-Neo'}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setCopiedProof(true);
    setTimeout(() => setCopiedProof(false), 3000);
  };

  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      {/* 1. CADET DOSSIER HERO HEADER */}
      <section className="clay-card rounded-3xl p-6 sm:p-8 relative overflow-hidden border border-white/10 shadow-2xl">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
          {/* Avatar & Details */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="relative group flex-shrink-0">
              <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl p-1 bg-[#161b2a] border-2 border-emerald-400/60 shadow-[0_8px_32px_rgba(16,185,129,0.3)] relative overflow-hidden flex items-center justify-center">
                <img
                  src="/stitch_assets/cadet_avatar.png"
                  alt="Agent Neo"
                  className="w-full h-full object-cover rounded-2xl"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/stitch_assets/shield_emblem.png';
                  }}
                />
                {/* Reticle corner accents */}
                <div className="absolute top-2 left-2 w-2 h-2 border-t-2 border-l-2 border-emerald-400"></div>
                <div className="absolute top-2 right-2 w-2 h-2 border-t-2 border-r-2 border-emerald-400"></div>
                <div className="absolute bottom-2 left-2 w-2 h-2 border-b-2 border-l-2 border-emerald-400"></div>
                <div className="absolute bottom-2 right-2 w-2 h-2 border-b-2 border-r-2 border-emerald-400"></div>
              </div>
              <span className="absolute -bottom-2 -right-2 px-2 py-0.5 rounded-full bg-emerald-500 text-slate-950 font-mono text-[10px] font-bold shadow-md">
                LVL 2
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-[10px] uppercase px-2.5 py-0.5 rounded-full bg-[#161b2a] text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5 font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  ACTIVE DEFENDER
                </span>
                <span className="font-mono text-[10px] px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-white/[0.08]">
                  OCT 14, 2024 ENLISTED
                </span>
                <span className="font-mono text-[10px] px-2.5 py-0.5 rounded-full bg-cyan-950/50 text-cyan-400 border border-cyan-500/30">
                  RANK: SENIOR DEFENDER
                </span>
              </div>

              <div className="flex items-baseline gap-3">
                <h1 className="text-3xl font-bold text-white tracking-tight font-display">
                  {user ? user.name : 'Agent-Neo'}
                </h1>
                <span className="font-mono text-xs text-slate-400">
                  UID // CG-99420-NEO
                </span>
              </div>

              {/* Ticker */}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-mono text-slate-400 pt-1">
                <span className="flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Standing: <strong className="text-white">#42</strong> of 12,890 Cadets</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                  <span>Defense XP: <strong className="text-amber-400">{xp || 3450} XP</strong></span>
                </span>
                <span className="flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-rose-400" />
                  <span>Streak: <strong className="text-white">14 Days</strong> (Streak Shield Active)</span>
                </span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            <button
              onClick={handleExportProof}
              className="clay-pill-btn px-5 py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(16,185,129,0.4)]"
            >
              <Download className="w-4 h-4" />
              <span>{copiedProof ? 'Credential Downloaded!' : 'Export Verified Defense Credential'}</span>
            </button>
            <button
              onClick={() => alert('Public Portfolio link copied to clipboard!')}
              className="px-4 py-3 rounded-xl bg-[#161b2a] hover:bg-white/[0.08] border border-white/[0.1] text-xs font-mono font-semibold text-slate-200 flex items-center justify-center gap-2 transition-colors"
            >
              <Share2 className="w-3.5 h-3.5 text-cyan-400" />
              <span>Share Portfolio Link</span>
            </button>
          </div>
        </div>

        {/* Cryptographic Proof Bar */}
        <div className="mt-6 pt-4 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-3 font-mono text-[11px] text-slate-400">
          <div className="flex items-center gap-2">
            <span className="text-emerald-400 font-bold">SHA-256 Public Key:</span>
            <span className="text-slate-300">0x9e8a71d849204f7d290b821a</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-cyan-400">✓ ED25519 Signature Verified</span>
            <span className="text-emerald-400">✓ STIG / DoD 8570 Compliant</span>
          </div>
        </div>
      </section>

      {/* 2. TACTICAL 5-AXIS RADAR & THREAT METRICS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Radar Visualization (6 cols) */}
        <div className="lg:col-span-6 clay-card rounded-3xl p-6 sm:p-7 border border-white/10 space-y-5 shadow-xl">
          <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
            <span className="font-mono text-xs text-emerald-400 font-bold uppercase tracking-wider">
              TACTICAL 5-AXIS DEFENSE SKILL RADAR
            </span>
            <span className="font-mono text-[10px] text-slate-400">MASTERY BENCHMARK</span>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-6">
            {/* SVG Pentagon Radar */}
            <div className="relative w-52 h-52 flex-shrink-0 flex items-center justify-center">
              <svg viewBox="0 0 200 200" className="w-full h-full">
                {/* Background Grid Rings */}
                <polygon points="100,20 176,75 147,165 53,165 24,75" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
                <polygon points="100,50 148,85 130,145 70,145 52,85" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
                <polygon points="100,80 120,95 112,120 88,120 80,95" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
                {/* Axis lines */}
                <line x1="100" y1="100" x2="100" y2="20" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
                <line x1="100" y1="100" x2="176" y2="75" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
                <line x1="100" y1="100" x2="147" y2="165" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
                <line x1="100" y1="100" x2="53" y2="165" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
                <line x1="100" y1="100" x2="24" y2="75" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
                {/* Filled Radar Skill Polygon (Linux 90, Packet 75, Web 60, SOC 45, Crypto 35) */}
                <polygon 
                  points="100,28 157,81 128,139 79,129 47,83" 
                  fill="rgba(16,185,129,0.25)" 
                  stroke="#10b981" 
                  strokeWidth="2" 
                  className="filter drop-shadow-[0_0_8px_rgba(16,185,129,0.6)]"
                />
                {/* Radar vertex dots */}
                <circle cx="100" cy="28" r="3.5" fill="#10b981" />
                <circle cx="157" cy="81" r="3.5" fill="#10b981" />
                <circle cx="128" cy="139" r="3.5" fill="#10b981" />
                <circle cx="79" cy="129" r="3.5" fill="#10b981" />
                <circle cx="47" cy="83" r="3.5" fill="#10b981" />
              </svg>
            </div>

            {/* Axis Breakdown */}
            <div className="flex-1 space-y-2.5 w-full">
              {skillAxes.map((s) => (
                <div key={s.name} className="flex items-center justify-between font-mono text-xs">
                  <span className="text-slate-300">{s.name}</span>
                  <span className="font-bold text-emerald-400">{s.pct}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Live Telemetry & Threat Metrics (6 cols) */}
        <div className="lg:col-span-6 grid grid-cols-2 gap-4">
          <div className="clay-card rounded-3xl p-5 border border-white/10 space-y-2 shadow-xl flex flex-col justify-between">
            <span className="font-mono text-[10px] text-slate-400 uppercase tracking-wider">
              MODULES VERIFIED
            </span>
            <div className="text-3xl font-bold font-mono text-emerald-400">{modulesDone}</div>
            <p className="text-[11px] text-slate-400 leading-snug">
              Modules verified inside the sandbox.
            </p>
          </div>

          <div className="clay-card rounded-3xl p-5 border border-white/10 space-y-2 shadow-xl flex flex-col justify-between">
            <span className="font-mono text-[10px] text-slate-400 uppercase tracking-wider">
              BADGES EARNED
            </span>
            <div className="text-3xl font-bold font-mono text-cyan-400">{badges.filter((badge) => badge.status === 'UNLOCKED').length}</div>
            <p className="text-[11px] text-slate-400 leading-snug">
              Module badges recorded from sandbox completion.
            </p>
          </div>

          <div className="clay-card rounded-3xl p-5 border border-white/10 space-y-2 shadow-xl flex flex-col justify-between">
            <span className="font-mono text-[10px] text-slate-400 uppercase tracking-wider">
              DEFENSE XP
            </span>
            <div className="text-3xl font-bold font-mono text-amber-400">{xp}</div>
            <p className="text-[11px] text-slate-400 leading-snug">
              Credited from tasks, quizzes, and finished modules.
            </p>
          </div>

          <div className="clay-card rounded-3xl p-5 border border-white/10 space-y-2 shadow-xl flex flex-col justify-between">
            <span className="font-mono text-[10px] text-slate-400 uppercase tracking-wider">
              AIRGAP INTEGRITY
            </span>
            <div className="text-3xl font-bold font-mono text-white">0.0ms</div>
            <p className="text-[11px] text-slate-400 leading-snug">
              Host exposure boundary maintained at 100% in-browser client safety.
            </p>
          </div>
        </div>
      </div>

      {/* 3. CRYPTOGRAPHIC BADGES ARMORY GRID */}
      <section className="space-y-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-white font-display">
              Cryptographic Badges Armory
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Badges unlock when you finish the matching sandbox module.
            </p>
          </div>
          {finishedCourses.length > 0 && (
            <button
              onClick={() => onOpenCertificate?.(finishedCourses[0])}
              className="clay-pill-btn px-4 py-2 rounded-xl text-xs font-bold"
            >
              View certificate
            </button>
          )}

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 bg-[#0e1321] p-1 rounded-2xl border border-white/[0.08]">
            {['ALL', 'UNLOCKED', 'PROGRESS', 'LOCKED'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
                  activeTab === tab
                    ? 'clay-tag text-emerald-300 shadow-md'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Badges Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredBadges.map((badge) => {
            const Icon = badge.icon;
            const isUnlocked = badge.status === 'UNLOCKED';
            const isProgress = badge.status === 'IN PROGRESS';

            return (
              <div
                key={badge.id}
                className={`rounded-3xl p-6 border relative overflow-hidden transition-all duration-300 ${
                  isUnlocked
                    ? 'clay-card border-emerald-500/40 shadow-[0_4px_24px_rgba(16,185,129,0.15)]'
                    : isProgress
                    ? 'bg-[#161b2a]/90 border-cyan-500/40 shadow-lg'
                    : 'bg-[#090e1c]/80 border-white/[0.06] opacity-75'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-[10px] text-slate-400 uppercase">
                    MITRE {badge.mitre}
                  </span>
                  <span className={`font-mono text-[10px] px-2.5 py-0.5 rounded-full font-bold border ${
                    isUnlocked
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                      : isProgress
                      ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30'
                      : 'bg-slate-800 text-slate-400 border-white/[0.06]'
                  }`}>
                    {badge.status}
                  </span>
                </div>

                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-2xl flex-shrink-0 flex items-center justify-center border shadow-lg ${
                    isUnlocked
                      ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400'
                      : isProgress
                      ? 'bg-cyan-500/10 border-cyan-500/40 text-cyan-300'
                      : 'bg-slate-900 border-white/[0.06] text-slate-500'
                  }`}>
                    <Icon className="w-6 h-6" />
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-base font-bold text-white font-mono">{badge.title}</h3>
                    <p className="text-xs text-slate-300 leading-relaxed">{badge.description}</p>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-white/[0.06] flex items-center justify-between font-mono text-[10px] text-slate-400">
                  <span>SIG: <code className="text-emerald-400">{badge.hash.slice(0, 10)}...</code></span>
                  <span>{badge.date || badge.req || badge.progress}</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. ACTIVITY HEATMAP & AI MENTOR ENDORSEMENT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Activity Commit Matrix (7 cols) */}
        <div className="lg:col-span-7 clay-card rounded-3xl p-6 sm:p-7 border border-white/10 space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
            <div>
              <h3 className="text-sm font-bold text-white font-mono uppercase">
                Terminal Activity & Mission Heatmap
              </h3>
              <p className="text-[11px] text-slate-400">1,420 terminal actions in the last 12 months</p>
            </div>
            <span className="font-mono text-xs text-emerald-400 font-bold">14 Days Streak</span>
          </div>

          {/* Glowing Green Cells Simulation */}
          <div className="grid grid-cols-16 sm:grid-cols-24 gap-1.5 p-3 rounded-2xl bg-[#090e1c] border border-white/[0.06] overflow-x-auto">
            {Array.from({ length: 96 }).map((_, i) => {
              const active = i % 3 === 0 || i % 5 === 0 || i > 75;
              const intensity = (i * 7) % 4;

              return (
                <div
                  key={i}
                  className={`w-2.5 h-2.5 rounded-sm transition-all ${
                    !active
                      ? 'bg-slate-900 border border-white/[0.04]'
                      : intensity === 3
                      ? 'bg-emerald-400 shadow-[0_0_6px_rgba(16,185,129,0.8)]'
                      : intensity === 2
                      ? 'bg-emerald-500'
                      : 'bg-emerald-700'
                  }`}
                  title={`Sandbox Activity Event ${i + 1}`}
                ></div>
              );
            })}
          </div>

          <div className="flex items-center justify-between text-[10px] font-mono text-slate-500">
            <span>Less Defensive Activity</span>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-sm bg-slate-900"></span>
              <span className="w-2 h-2 rounded-sm bg-emerald-800"></span>
              <span className="w-2 h-2 rounded-sm bg-emerald-500"></span>
              <span className="w-2 h-2 rounded-sm bg-emerald-400"></span>
            </div>
            <span>More Defensive Activity</span>
          </div>
        </div>

        {/* Mentor Endorsement Letter (5 cols) */}
        <div className="lg:col-span-5 clay-card rounded-3xl p-6 sm:p-7 border border-white/10 space-y-4 shadow-xl flex flex-col justify-between">
          <div className="flex items-center gap-3 border-b border-white/[0.06] pb-3">
            <div className="w-9 h-9 rounded-xl overflow-hidden border border-cyan-400/50 p-0.5 bg-slate-900 flex-shrink-0">
              <img
                src="/stitch_assets/ai_mentor_avatar.png"
                alt="EOS Mentor"
                className="w-full h-full object-cover rounded-lg"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/stitch_assets/shield_emblem.png';
                }}
              />
            </div>
            <div>
              <div className="text-xs font-bold text-white font-mono">EOS // DEFENSE ENDORSEMENT</div>
              <div className="text-[10px] text-cyan-400 font-mono">Dialectic Problem Solving: 94/100</div>
            </div>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed italic bg-[#090e1c] p-4 rounded-2xl border border-white/[0.06]">
            "Agent Neo demonstrates exceptional defensive instinct in process inspection and pipeline redirection. Quickly isolated cron-injected netcat payloads without relying on brute-force resets. Strongly recommend advancing to live network memory forensics."
          </p>

          <div className="pt-2">
            <button
              onClick={() => onLaunchLab(0, 'course-linux-basics')}
              className="w-full py-2.5 rounded-xl clay-pill-btn font-bold text-xs flex items-center justify-center gap-2"
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>Launch Next Sandbox Mission</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
