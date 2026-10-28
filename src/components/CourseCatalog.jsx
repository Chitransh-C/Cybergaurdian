import React, { useState } from 'react';
import { 
  Shield, 
  Terminal, 
  Award, 
  Zap, 
  CheckCircle, 
  ArrowRight, 
  Play, 
  Lock, 
  BookOpen, 
  Layers, 
  Compass, 
  Search, 
  Radio, 
  Cpu, 
  Binary, 
  ChevronDown, 
  ChevronUp, 
  Flame, 
  Sparkles,
  ShieldCheck,
  ExternalLink
} from 'lucide-react';
import { ALL_COURSES } from '../data/courses';

const TRACK_TO_COURSE = {
  'course-linux-basics': 'course-linux-basics',
  'course-web-defense': 'course-web-security',
  'course-network-forensics': 'course-network-defense',
  'course-soc-incident': 'course-soc-triage',
  'course-cryptography': 'course-human-defense'
};

export default function CourseCatalog({ onLaunchLab, onSelectModule, moduleCompletionStatus }) {
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [activeTier, setActiveTier] = useState('ALL');
  const [expandedSyllabus, setExpandedSyllabus] = useState(true);

  const linuxCourse = ALL_COURSES[0];

  const tracks = [
    {
      id: 'course-linux-basics',
      number: '01',
      title: 'Linux Fundamentals for Cyber Defense',
      tag: 'ACTIVE ENROLLMENT',
      modulesCount: 6,
      badgeTitle: 'Root Sentinel',
      badgeIcon: Shield,
      tier: 'CADET',
      category: 'LINUX',
      status: 'ACTIVE',
      mitre: 'T1059, T1057, T1068',
      description: 'Master kernel memory inspection, POSIX permission architecture, and live forensic CLI triage in a zero-risk client-side sandbox before advancing to perimeter defenses.',
      syllabus: [
        { num: '01', title: 'Filesystem Navigation & Path Traversal', xp: '+100 XP', done: true },
        { num: '02', title: 'File Inspection & Binary Headers', xp: '+150 XP', done: true },
        { num: '03', title: 'Permissions, SUID & Access Control', xp: '+200 XP', done: true },
        { num: '04', title: 'Log Grep, Sed & Pipeline Filtering', xp: '+200 XP', done: true },
        { num: '05', title: 'Process Triage & Malicious Signal Termination', xp: '+200 XP', done: false, active: true },
        { num: '06', title: 'Local Network Recon & Netstat Triage', xp: '+250 XP', done: false, locked: true },
      ]
    },
    {
      id: 'course-web-defense',
      number: '02',
      title: 'Web Application Security & OWASP Top 10',
      tag: 'ENROLLMENT READY',
      modulesCount: 8,
      badgeTitle: 'Web Shield',
      badgeIcon: Layers,
      tier: 'CADET',
      category: 'WEB',
      status: 'AVAILABLE',
      mitre: 'T1190, T1059.007',
      description: 'Mitigate parameterized SQL injection flaws, harden Cross-Site Scripting (XSS) input sanitization filters, and defuse SSRF cloud metadata egress channels.',
      syllabus: [
        { num: '01', title: 'HTTP Headers, Cookies & SameSite Directives', xp: '+150 XP' },
        { num: '02', title: 'SQL Injection Defusal & Prepared Statements', xp: '+200 XP' },
        { num: '03', title: 'Stored & Reflected XSS Neutralization', xp: '+200 XP' },
        { num: '04', title: 'SSRF Cloud IMDS Egress Containment', xp: '+250 XP' },
      ]
    },
    {
      id: 'course-network-forensics',
      number: '03',
      title: 'Network Packet Forensics & Wireshark Triage',
      tag: 'AVAILABLE',
      modulesCount: 6,
      badgeTitle: 'Packet Warden',
      badgeIcon: Radio,
      tier: 'SPECIALIST',
      category: 'NETWORK',
      status: 'AVAILABLE',
      mitre: 'T1040, T1049',
      description: 'Dissect real-world PCAP packet traces, isolate rogue ARP poisoning broadcasts, reconstruct TCP streams, and author Snort/Suricata IDS detection rules.',
      syllabus: [
        { num: '01', title: 'Ethernet & IP Header Bitwise Dissection', xp: '+150 XP' },
        { num: '02', title: 'ARP Cache Poisoning & Man-in-the-Middle Isolation', xp: '+200 XP' },
        { num: '03', title: 'SYN Flood & DDoS Volumetric Containment', xp: '+250 XP' },
      ]
    },
    {
      id: 'course-soc-incident',
      number: '04',
      title: 'SOC Incident Response & Blue Team Operations',
      tag: 'SPECIALIST TIER',
      modulesCount: 10,
      badgeTitle: 'Blue Team Aegis',
      badgeIcon: Cpu,
      tier: 'SPECIALIST',
      category: 'SOC',
      status: 'AVAILABLE',
      mitre: 'T1078, T1086',
      description: 'Execute SIEM query pipelines across millions of security logs, hunt living-off-the-land binaries (LOLBins), and orchestrate rapid host quarantine protocols.',
      syllabus: [
        { num: '01', title: 'Auth.log Brute-Force Extraction & IP Quarantine', xp: '+200 XP' },
        { num: '02', title: 'Ransomware Canary Traps & Lateral Movement Triage', xp: '+300 XP' },
      ]
    },
    {
      id: 'course-cryptography',
      number: '05',
      title: 'Phishing, Social Engineering & Password Defense',
      tag: 'ENROLLMENT READY',
      modulesCount: 2,
      badgeTitle: 'Hash Warden',
      badgeIcon: Binary,
      tier: 'CADET',
      category: 'CRYPTO',
      status: 'AVAILABLE',
      mitre: 'T1566, T1110',
      description: 'Mark deceptive cues in a sample message, write quarantine filters, and compare fast hashes against slow salted hashes with rate limits.',
      syllabus: [
        { num: '01', title: 'Phishing Email & Domain Analyzer', xp: '+200 XP' },
        { num: '02', title: 'Password Hashing & Guessing Limits', xp: '+200 XP' },
      ]
    }
  ];

  const filteredTracks = tracks.filter(t => {
    const matchesCat = activeCategory === 'ALL' || t.category === activeCategory;
    const matchesTier = activeTier === 'ALL' || t.tier === activeTier;
    return matchesCat && matchesTier;
  });

  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      {/* 1. HERO HEADER & SYSTEM MATRIX OVERVIEW */}
      <section className="clay-card rounded-3xl p-6 sm:p-10 relative overflow-hidden border border-white/10 shadow-2xl">
        <div className="absolute -right-24 -top-24 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -left-24 -bottom-24 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col gap-4">
          <div className="flex items-center gap-3 flex-wrap">
            <div className="px-3 py-1 rounded-full bg-[#090e1c] border border-emerald-500/30 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="font-mono text-xs text-emerald-400 font-bold">
                SYS.CURRICULUM // PATHWAY MATRIX v2.4
              </span>
            </div>
            <span className="font-mono text-xs text-slate-400">
              ENCLAVE SPEC: RFC-9122 CLIENT-SIDE ISOLATED
            </span>
          </div>

          <div className="max-w-4xl space-y-2">
            <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight font-display">
              DEFENSE CURRICULUM & CYBER WARFARE PATHWAYS
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Zero-risk browser sandboxes guided by Socratic GuardianAI. Choose your defense specialization, master real-world defensive tactics, and forge verifiable blue-team credentials.
            </p>
          </div>

          {/* Quick Stats Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-4 border-t border-white/[0.08]">
            <div className="bg-[#090e1c]/80 p-3 rounded-2xl border border-white/[0.06] text-center">
              <span className="font-mono text-lg font-bold text-emerald-400">5</span>
              <span className="block font-mono text-[10px] text-slate-400 uppercase mt-0.5">Active Pathways</span>
            </div>
            <div className="bg-[#090e1c]/80 p-3 rounded-2xl border border-white/[0.06] text-center">
              <span className="font-mono text-lg font-bold text-cyan-400">32</span>
              <span className="block font-mono text-[10px] text-slate-400 uppercase mt-0.5">Interactive Labs</span>
            </div>
            <div className="bg-[#090e1c]/80 p-3 rounded-2xl border border-white/[0.06] text-center">
              <span className="font-mono text-lg font-bold text-amber-400">14</span>
              <span className="block font-mono text-[10px] text-slate-400 uppercase mt-0.5">Crypto Badges</span>
            </div>
            <div className="bg-[#090e1c]/80 p-3 rounded-2xl border border-white/[0.06] text-center">
              <span className="font-mono text-lg font-bold text-white">100%</span>
              <span className="block font-mono text-[10px] text-slate-400 uppercase mt-0.5">Zero-Risk VFS</span>
            </div>
            <div className="bg-[#090e1c]/80 p-3 rounded-2xl border border-white/[0.06] text-center col-span-2 sm:col-span-1">
              <span className="font-mono text-lg font-bold text-emerald-400">0.0ms</span>
              <span className="block font-mono text-[10px] text-slate-400 uppercase mt-0.5">Host Risk</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FILTER & TRACK MATRIX TOOLBAR */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#0e1321] p-3 rounded-2xl border border-white/[0.08]">
        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {[
            { id: 'ALL', label: 'ALL PATHWAYS (5)' },
            { id: 'LINUX', label: 'LINUX & SYSTEMS' },
            { id: 'WEB', label: 'WEB DEFENSE' },
            { id: 'NETWORK', label: 'NETWORK FORENSICS' },
            { id: 'SOC', label: 'SOC INCIDENT' },
            { id: 'CRYPTO', label: 'CRYPTOGRAPHY' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold transition-all ${
                activeCategory === cat.id
                  ? 'clay-tag text-emerald-300 shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Difficulty Tier Selector */}
        <div className="flex items-center gap-1.5 bg-[#090e1c] p-1 rounded-xl border border-white/[0.06]">
          {['ALL', 'CADET', 'SPECIALIST', 'ELITE'].map((tier) => (
            <button
              key={tier}
              onClick={() => setActiveTier(tier)}
              className={`px-3 py-1 rounded-lg text-[11px] font-mono font-bold transition-all ${
                activeTier === tier
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {tier}
            </button>
          ))}
        </div>
      </div>

      {/* 3. TWO-COLUMN LAYOUT: TRACKS MATRIX (70%) + CADET DEFENSE RADAR (30%) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Pathways Column (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {filteredTracks.map((track) => {
            const Icon = track.badgeIcon;
            const isFeatured = track.id === 'course-linux-basics';

            return (
              <div
                key={track.id}
                className={`rounded-3xl border p-6 sm:p-7 relative overflow-hidden transition-all duration-300 ${
                  isFeatured
                    ? 'clay-card border-emerald-500/50 shadow-[0_4px_30px_rgba(16,185,129,0.18)] ring-1 ring-emerald-500/30'
                    : 'bg-[#0e1321]/90 border-white/[0.08] hover:border-white/20'
                }`}
              >
                {/* Track Card Header */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.06] pb-4 mb-5">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-bold text-emerald-400 uppercase tracking-wider">
                      TRACK {track.number}
                    </span>
                    <span className={`font-mono text-[10px] px-2.5 py-0.5 rounded-full border ${
                      isFeatured
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                        : 'bg-slate-800 text-slate-300 border-white/[0.06]'
                    }`}>
                      {track.tag}
                    </span>
                  </div>

                  <span className="font-mono text-xs text-slate-400">
                    MITRE: {track.mitre}
                  </span>
                </div>

                {/* Track Body */}
                <div className="flex flex-col sm:flex-row items-start gap-5">
                  <div className={`w-14 h-14 rounded-2xl flex-shrink-0 flex items-center justify-center border shadow-xl ${
                    isFeatured
                      ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400'
                      : 'bg-[#161b2a] border-white/[0.08] text-slate-400'
                  }`}>
                    <Icon className="w-7 h-7" />
                  </div>

                  <div className="space-y-2 flex-1">
                    <h3 className="text-xl font-bold text-white font-display">
                      {track.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {track.description}
                    </p>

                    <div className="flex flex-wrap gap-4 text-xs font-mono text-slate-400 pt-2">
                      <span>⚡ {track.modulesCount} Interactive Modules</span>
                      <span>🛡️ Badge: <strong className="text-emerald-400">{track.badgeTitle}</strong></span>
                      <span>🎯 Level: <strong className="text-white">{track.tier}</strong></span>
                    </div>
                  </div>
                </div>

                {/* Interactive Syllabus Drawer (For Featured Track) */}
                {isFeatured && (
                  <div className="mt-6 pt-6 border-t border-white/[0.06] space-y-4">
                    <div 
                      onClick={() => setExpandedSyllabus(!expandedSyllabus)}
                      className="flex items-center justify-between cursor-pointer text-xs font-mono text-emerald-300 hover:text-emerald-200"
                    >
                      <span className="font-bold flex items-center gap-1.5">
                        <Terminal className="w-4 h-4 text-emerald-400" />
                        <span>Interactive Syllabus Breakdown (6 Modules)</span>
                      </span>
                      {expandedSyllabus ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>

                    {expandedSyllabus && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                        {track.syllabus.map((m, idx) => (
                          <div
                            key={m.num}
                            onClick={() => onLaunchLab(idx, TRACK_TO_COURSE[track.id] || 'course-linux-basics')}
                            className={`p-3 rounded-2xl border text-xs cursor-pointer transition-all flex items-center justify-between ${
                              m.done
                                ? 'bg-[#090e1c] border-emerald-500/40 text-slate-200 hover:border-emerald-300'
                                : m.active
                                ? 'bg-cyan-950/40 border-cyan-500/60 text-cyan-200 hover:border-cyan-400'
                                : 'bg-[#090e1c]/60 border-white/[0.06] text-slate-400'
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-[10px] text-slate-500">0{m.num}</span>
                              <span className="font-medium text-[11px] truncate">{m.title}</span>
                            </div>
                            <span className="font-mono text-[10px] text-emerald-400 font-bold ml-2">
                              {m.done ? '✓' : m.xp}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Action CTA Row */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 pt-5 border-t border-white/[0.06]">
                  <span className="font-mono text-[11px] text-slate-400">
                    {isFeatured ? 'Ready in isolated browser terminal' : 'Enclave curriculum ready'}
                  </span>

                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    {isFeatured ? (
                      <button
                        onClick={() => onLaunchLab(0, TRACK_TO_COURSE[track.id] || track.id)}
                        className="w-full sm:w-auto clay-pill-btn px-6 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(16,185,129,0.4)]"
                      >
                        <Play className="w-3.5 h-3.5 fill-current" />
                        <span>ENTER SANDBOX LAB →</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => onLaunchLab(0, TRACK_TO_COURSE[track.id] || track.id)}
                        className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#161b2a] hover:bg-white/[0.08] border border-white/[0.1] text-xs font-mono font-semibold text-slate-300 transition-colors"
                      >
                        Enter Sandbox Lab
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Side Panel: Cadet Defense Radar & AI Mentor (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Radar & Mastery Matrix */}
          <div className="clay-card rounded-3xl p-6 border border-white/10 space-y-5 shadow-xl">
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
              <span className="font-mono text-xs text-emerald-400 font-bold uppercase tracking-wider">
                CADET DEFENSE RADAR
              </span>
              <span className="font-mono text-[10px] text-slate-400">5-AXIS DOMAINS</span>
            </div>

            <div className="space-y-3.5">
              {[
                { domain: 'Linux & Kernel Systems', pct: 85, rank: 'Advanced' },
                { domain: 'Network Forensics', pct: 40, rank: 'Intermediate' },
                { domain: 'Web App Defense', pct: 25, rank: 'Novice' },
                { domain: 'SOC Operations', pct: 15, rank: 'Novice' },
                { domain: 'Cryptography', pct: 10, rank: 'Initiate' },
              ].map((skill) => (
                <div key={skill.domain} className="space-y-1">
                  <div className="flex justify-between font-mono text-xs">
                    <span className="text-slate-300">{skill.domain}</span>
                    <span className="text-emerald-400 font-bold">{skill.pct}%</span>
                  </div>
                  <div className="w-full bg-[#090e1c] h-1.5 rounded-full overflow-hidden border border-white/[0.06]">
                    <div
                      className="bg-gradient-to-r from-emerald-500 to-cyan-400 h-full rounded-full"
                      style={{ width: `${skill.pct}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Mission Pod */}
          <div className="clay-card rounded-3xl p-6 border border-white/10 space-y-4 shadow-xl">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
              <span className="font-mono text-[10px] uppercase text-cyan-400 font-bold">
                RECOMMENDED ACTIVE DRILL
              </span>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-2xl overflow-hidden border border-cyan-400/40 p-0.5 bg-slate-900 flex-shrink-0">
                <img
                  src="/stitch_assets/sandbox_cube.png"
                  alt="Sandbox Cube"
                  className="w-full h-full object-cover rounded-xl"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/stitch_assets/shield_emblem.png';
                  }}
                />
              </div>

              <div>
                <h4 className="text-sm font-bold text-white">Mod 05: Process Triage</h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  Isolate rogue netcat sockets injected into cron jobs before daemons respawn.
                </p>
              </div>
            </div>

            <button
              onClick={() => onLaunchLab(4, 'course-linux-basics')}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 hover:from-cyan-500/30 hover:to-emerald-500/30 border border-cyan-500/40 text-xs font-mono font-bold text-cyan-300 flex items-center justify-center gap-2 transition-all"
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>Launch Sandbox 05 →</span>
            </button>
          </div>

          {/* Socratic Mentor EOS Bubble */}
          <div className="clay-card rounded-3xl p-6 border border-white/10 space-y-3 shadow-xl">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl overflow-hidden border border-emerald-400/50 p-0.5 bg-slate-900 flex-shrink-0">
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
                <div className="text-xs font-bold text-white font-mono">EOS // DEFENSE DEBRIEF</div>
                <div className="text-[10px] text-emerald-400 font-mono">Independent Problem Solving: 94/100</div>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed italic bg-[#090e1c] p-3 rounded-2xl border border-white/[0.06]">
              "Cadet Neo, excellent progress on pipeline grep. Remember: in sandbox 05, inspect PPID relations before issuing kill -9 so child daemons cannot respawn. Ready when you are!"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
