import React from 'react';
import { 
  Shield, 
  Terminal, 
  Cpu, 
  Lock, 
  ArrowRight, 
  CheckCircle2, 
  Award, 
  Zap, 
  Compass, 
  Sparkles, 
  BookOpen, 
  Layers,
  ChevronRight,
  Globe,
  Radio,
  FileCode,
  AlertTriangle,
  HelpCircle,
  Play,
  Check,
  XCircle,
  Eye,
  Activity,
  Server
} from 'lucide-react';
import { ALL_COURSES } from '../data/courses';

export default function LandingPage({ onNavigate, onOpenAuth, user }) {
  return (
    <div className="min-h-screen bg-[#0a0f1d] text-slate-100 flex flex-col font-sans selection:bg-emerald-500/30 selection:text-emerald-300">
      {/* ========================================================================= */}
      {/* HERO SECTION WITH CLAYMORPHIC & GLASSMORPHIC 3D FUSION                    */}
      {/* ========================================================================= */}
      <section className="relative w-full pt-12 pb-24 md:pt-16 md:pb-32 overflow-hidden">
        {/* Deep Ambient Cyber Backlights */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[1100px] h-[550px] bg-gradient-to-b from-emerald-500/15 via-cyan-500/10 to-transparent blur-[140px] rounded-full pointer-events-none"></div>
        <div className="absolute top-96 -left-32 w-[480px] h-[480px] bg-emerald-500/10 blur-[150px] rounded-full pointer-events-none"></div>
        <div className="absolute top-80 -right-32 w-[520px] h-[520px] bg-cyan-500/15 blur-[160px] rounded-full pointer-events-none"></div>

        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 relative z-10 flex flex-col items-center text-center">
          {/* Tactile Eyebrow Clay Tag */}
          <div className="clay-tag inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full mb-6">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#10b981] animate-ping"></span>
            <span className="font-mono text-xs text-emerald-400 font-semibold tracking-wider uppercase">
              ⚡ SAFE, AIRGAPPED SANDBOX LABS • SOCRATIC AI TUTOR
            </span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-[11px] font-bold">
              NIST SP 800-181
            </span>
          </div>

          {/* Main Hero Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[64px] lg:leading-[72px] font-extrabold max-w-5xl tracking-tight text-white mb-6 font-display">
            Stop Memorizing Definitions. <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-teal-300 drop-shadow-[0_4px_16px_rgba(16,185,129,0.3)]">
              Master Real-World Cyber Defense
            </span>{' '}
            in Zero-Risk Sandboxes.
          </h1>

          {/* Hero Subtitle */}
          <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-3xl mb-8 leading-relaxed">
            CyberGuardian bridges the gap between passive textbook theory and practical cyber resilience. Witness live exploit mechanics firsthand in ephemeral microVM enclaves and write verifiable production defenses guided by our dialectic AI mentor.
          </p>

          {/* Tactile Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
            <button
              onClick={() => onNavigate(user ? 'dashboard' : 'lab')}
              className="clay-pill-btn inline-flex items-center gap-2.5 px-8 py-4 rounded-full text-sm sm:text-base font-bold tracking-tight shadow-[0_12px_32px_rgba(16,185,129,0.4)]"
            >
              <Terminal className="w-5 h-5" />
              <span>{user ? 'Open Defense Dashboard' : 'Launch Practice Sandbox (Free)'}</span>
            </button>

            <button
              onClick={() => {
                const el = document.getElementById('curriculum-section');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="clay-secondary-btn inline-flex items-center gap-2 px-7 py-4 rounded-full text-sm sm:text-base font-semibold"
            >
              <Compass className="w-5 h-5 text-cyan-400" />
              <span>Explore Defense Curriculum</span>
            </button>
          </div>

          {/* Frosted Glass Metrics Banner */}
          <div className="w-full max-w-5xl grid grid-cols-2 lg:grid-cols-4 gap-3 p-3 rounded-3xl clay-card mb-12">
            <div className="flex flex-col items-center justify-center p-4 bg-slate-900/60 rounded-2xl border border-white/[0.04]">
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 drop-shadow-[0_0_12px_rgba(16,185,129,0.4)]">100%</div>
              <div className="font-mono text-[11px] text-slate-400 uppercase tracking-wider mt-1 text-center font-medium">Airgapped In-Memory</div>
            </div>
            <div className="flex flex-col items-center justify-center p-4 bg-slate-900/60 rounded-2xl border border-white/[0.04]">
              <div className="text-2xl sm:text-3xl font-extrabold text-cyan-400 drop-shadow-[0_0_12px_rgba(6,182,212,0.4)]">6 Modules</div>
              <div className="font-mono text-[11px] text-slate-400 uppercase tracking-wider mt-1 text-center font-medium">Hands-On Linux Lab</div>
            </div>
            <div className="flex flex-col items-center justify-center p-4 bg-slate-900/60 rounded-2xl border border-white/[0.04]">
              <div className="text-2xl sm:text-3xl font-extrabold text-teal-300 drop-shadow-[0_0_12px_rgba(45,212,191,0.4)]">24/7</div>
              <div className="font-mono text-[11px] text-slate-400 uppercase tracking-wider mt-1 text-center font-medium">AI Socratic Mentor</div>
            </div>
            <div className="flex flex-col items-center justify-center p-4 bg-slate-900/60 rounded-2xl border border-white/[0.04]">
              <div className="text-2xl sm:text-3xl font-extrabold text-indigo-400 drop-shadow-[0_0_12px_rgba(129,140,248,0.4)]">0.0 ms</div>
              <div className="font-mono text-[11px] text-slate-400 uppercase tracking-wider mt-1 text-center font-medium">Host Exposure Boundary</div>
            </div>
          </div>

          {/* HERO 3D SHOWCASE: 3D CITADEL WITH TACTILE PODS */}
          <div className="w-full max-w-6xl mb-12">
            <div className="clay-card-glow rounded-3xl p-3 md:p-5 relative overflow-hidden group">
              <div className="absolute -top-24 left-1/3 w-80 h-80 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none"></div>
              
              <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                <img 
                  src="/stitch_assets/hero_citadel.png" 
                  alt="CyberGuardian AI Cyber Defense Citadel in 3D Claymorphism and Glassmorphism" 
                  className="w-full h-auto object-cover max-h-[560px] transform group-hover:scale-[1.01] transition-transform duration-700" 
                />

                {/* Floating Glass Badges */}
                <div className="absolute top-4 left-4 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full clay-tag bg-slate-950/80 text-white font-mono text-xs">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                  <span>ISOMETRIC REFRACTIVE CITADEL</span>
                </div>

                <div className="absolute bottom-4 right-4 hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-full clay-card bg-slate-900/90 text-emerald-300 font-mono text-xs">
                  <Shield className="w-4 h-4 text-cyan-400" />
                  <span>AIRGAP LEVEL 4 VERIFIED</span>
                </div>
              </div>
            </div>
          </div>

          {/* DUAL 3D FEATURE PODS: SHIELD EMBLEM & SANDBOX CUBE */}
          <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-6 mb-16 text-left">
            {/* Pod 1: Defense Shield */}
            <div className="clay-card rounded-3xl p-6 relative flex flex-col sm:flex-row items-center gap-6 overflow-hidden group hover:border-emerald-500/40 transition-all">
              <div className="absolute -top-16 -left-16 w-40 h-40 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none"></div>
              <div className="relative flex-shrink-0 w-32 h-32 md:w-36 md:h-36 rounded-2xl clay-inset-panel p-2 flex items-center justify-center">
                <img 
                  src="/stitch_assets/shield_emblem.png" 
                  alt="Tactile clay cyber defense shield emblem with frosted glass rings" 
                  className="w-full h-full object-contain rounded-xl drop-shadow-[0_8px_20px_rgba(16,185,129,0.4)] group-hover:scale-105 transition-transform duration-500" 
                />
              </div>
              <div className="flex-1 flex flex-col justify-center">
                <div className="clay-tag inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-emerald-400 font-mono text-xs w-fit mb-2 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  ACTIVE TELEMETRY SHIELD
                </div>
                <h3 className="text-xl font-bold text-white mb-1.5 font-display">Tactile Shielding Core</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Dialectic real-time reasoning active inside every lab enclave. Intercepts exploit payloads without blunt spoilered code answers.
                </p>
                <div className="flex items-center gap-3 mt-3 font-mono text-xs text-slate-400">
                  <span className="text-emerald-400 font-semibold">DIALECTIC LATENCY &lt; 40ms</span>
                  <span>•</span>
                  <span>SOCRATIC AGENT v2.8</span>
                </div>
              </div>
            </div>

            {/* Pod 2: Sandbox Cube */}
            <div className="clay-card rounded-3xl p-6 relative flex flex-col sm:flex-row items-center gap-6 overflow-hidden group hover:border-cyan-500/40 transition-all">
              <div className="absolute -bottom-16 -right-16 w-40 h-40 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none"></div>
              <div className="relative flex-shrink-0 w-32 h-32 md:w-36 md:h-36 rounded-2xl clay-inset-panel p-2 flex items-center justify-center">
                <img 
                  src="/stitch_assets/sandbox_cube.png" 
                  alt="3D claymorphic isolated sandbox cube with glowing defensive firewall layers" 
                  className="w-full h-full object-contain rounded-xl drop-shadow-[0_8px_20px_rgba(6,182,212,0.4)] group-hover:scale-105 transition-transform duration-500" 
                />
              </div>
              <div className="flex-1 flex flex-col justify-center">
                <div className="clay-tag inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-cyan-400 font-mono text-xs w-fit mb-2 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
                  ZERO-BLAST AIRGAP SANDBOX
                </div>
                <h3 className="text-xl font-bold text-white mb-1.5 font-display">Zero-Blast Sandbox Cube</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Airgapped disposable in-memory POSIX system instantiated on demand. Execute adversarial malware and triage attacks with zero host exposure.
                </p>
                <div className="flex items-center gap-3 mt-3 font-mono text-xs text-slate-400">
                  <span className="text-cyan-400 font-semibold">ISOLATION: 100% IN-BROWSER</span>
                  <span>•</span>
                  <span>KERNEL INIT &lt; 100ms</span>
                </div>
              </div>
            </div>
          </div>

          {/* INTERACTIVE TERMINAL PREVIEW & ADVERSARY STREAM */}
          <div className="w-full max-w-6xl rounded-3xl clay-card p-4 shadow-2xl text-left relative">
            <div className="w-full flex items-center justify-between px-5 py-3 rounded-2xl bg-slate-900/80 border border-white/[0.06]">
              <div className="flex items-center gap-3">
                <div className="flex gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-500/90 shadow-[0_0_8px_rgba(248,113,113,0.6)]"></span>
                  <span className="w-3 h-3 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.6)]"></span>
                  <span className="w-3 h-3 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.6)]"></span>
                </div>
                <span className="font-mono text-xs text-slate-400 ml-2">
                  cyberguardian-sandbox // session: <span className="text-emerald-400 font-semibold">node_posix_#8921-active</span>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="clay-tag inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-mono text-xs text-cyan-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
                  FIREWALL: ACTIVE
                </span>
                <span className="clay-tag inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-mono text-xs text-emerald-400 font-bold">
                  SOCRATIC AI: ACTIVE
                </span>
              </div>
            </div>

            {/* Terminal Body Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 p-2 mt-3 rounded-2xl bg-[#040814]/90">
              {/* Left: Adversary Payload Telemetry */}
              <div className="lg:col-span-6 flex flex-col rounded-2xl clay-inset-panel p-4 font-mono text-xs">
                <div className="flex items-center justify-between pb-2 mb-3 bg-slate-900/80 px-3 py-2 rounded-xl border border-white/[0.04]">
                  <span className="text-rose-400 font-semibold flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-rose-400" />
                    ADVERSARY INGRESS DETECTED
                  </span>
                  <span className="text-slate-400 text-[11px]">CVE-2023-38606 // SQLi+PrivEsc</span>
                </div>
                <div className="space-y-2 text-slate-300">
                  <p><span className="text-cyan-400 font-semibold">[02:14:19.402] INGRESS_TAP:</span> POST /api/v1/auth/session HTTP/1.1</p>
                  <p className="text-rose-300 font-semibold">[02:14:19.418] PAYLOAD: <span className="bg-slate-900 px-2 py-0.5 rounded text-rose-400 border border-rose-500/20">' UNION SELECT 1, user_role, pass_hash FROM auth_users WHERE admin=1 -- -</span></p>
                  <p className="text-slate-400">[02:14:19.422] Target Node: <span className="text-slate-200 font-mono">sandbox://svc-backend-auth:3000</span></p>
                  
                  <div className="p-3 my-2 rounded-xl bg-slate-950/80 border border-white/[0.04] text-slate-200 font-mono">
                    <span className="text-cyan-400">// auth.ts:42 vulnerable query formulation</span><br />
                    <span className="text-rose-400 line-through font-mono">
                      {"const query = `SELECT * FROM users WHERE email = '${req.body.email}'`;"}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-[11px] text-slate-400 pt-1">
                    <span className="px-2 py-0.5 rounded-full clay-tag text-cyan-400">EPHEMERAL RUNTIME</span>
                    <span>SANDBOX ISOLATED DAEMON 0.9.1</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 flex items-center justify-between text-xs bg-slate-900/60 p-2.5 rounded-xl border border-white/[0.04]">
                  <span className="text-slate-400">Isolated Memory Sandbox Heap:</span>
                  <span className="text-emerald-400 font-bold">14.2 MB / 128 MB</span>
                </div>
              </div>

              {/* Right: Socratic AI Defense Advice & Live Patch */}
              <div className="lg:col-span-6 flex flex-col justify-between rounded-2xl clay-inset-panel p-4">
                <div>
                  <div className="flex items-center justify-between pb-2 mb-3 bg-slate-900/80 px-3 py-2 rounded-xl border border-white/[0.04]">
                    <span className="text-emerald-400 font-semibold flex items-center gap-1.5 text-xs">
                      <Sparkles className="w-4 h-4 text-emerald-400" />
                      SOCRATIC DEFENSE ADVISOR
                    </span>
                    <span className="text-slate-400 font-mono text-[11px]">DIALECTIC ENGINE</span>
                  </div>

                  {/* Prompt */}
                  <div className="p-3.5 rounded-xl bg-slate-900 text-slate-200 mb-3 flex gap-3 items-start border border-emerald-500/20 shadow-sm">
                    <HelpCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-medium text-white leading-relaxed">
                        "Notice the string concatenation in <code className="font-mono text-cyan-400 bg-slate-950 px-1.5 py-0.5 rounded">auth.ts:42</code>. What happens to the SQL lexical parser when <code className="text-rose-400 font-mono bg-slate-950 px-1 py-0.5 rounded">' UNION SELECT</code> is parsed as grammar instead of scalar data?"
                      </p>
                      <p className="text-[11px] text-slate-400 mt-2">
                        💡 Hint: Use parameterized query bindings to force the driver to isolate execution instructions from untrusted arguments.
                      </p>
                    </div>
                  </div>

                  {/* Patch Diff */}
                  <div className="rounded-xl bg-slate-950 p-3 font-mono text-xs text-slate-200 mb-3 border border-white/[0.05]">
                    <div className="flex justify-between items-center mb-1.5 text-slate-400">
                      <span className="uppercase tracking-wider text-[11px]">DEFENSE PROPOSED PATCH</span>
                      <span className="text-emerald-400 font-semibold">DIFF +2 / -1</span>
                    </div>
                    <p className="text-emerald-400 font-mono leading-relaxed">
                      {"+ const query = 'SELECT id, email, role FROM users WHERE email = $1';"}<br />
                      {"+ const result = await pool.query(query, [req.body.email]);"}
                    </p>
                  </div>
                </div>

                {/* Mitigation Bar */}
                <div className="p-3 rounded-xl bg-slate-900 flex flex-col sm:flex-row items-center justify-between gap-3 border border-white/[0.06]">
                  <div className="flex items-center gap-2.5">
                    <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#10b981]"></span>
                    <div>
                      <div className="text-xs font-bold text-emerald-400 uppercase tracking-wide">SECURED: RE-TEST VERIFIED</div>
                      <div className="font-mono text-[11px] text-slate-400">0 rows leaked • Defense Invariant Holds</div>
                    </div>
                  </div>
                  <button 
                    onClick={() => onNavigate('lab')}
                    className="clay-pill-btn px-4 py-2 rounded-xl text-xs font-bold shadow-md w-full sm:w-auto"
                  >
                    Open Live Lab Environment
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* PARADIGM SHIFT: SIDE-BY-SIDE CONTRAST (THE REALITY CHECK)                */}
      {/* ========================================================================= */}
      <section className="w-full py-20 bg-slate-950/70 border-t border-b border-slate-900 relative">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="clay-tag inline-block px-3.5 py-1 rounded-full text-cyan-400 font-mono text-xs font-semibold uppercase tracking-widest mb-3">
              Architectural Paradigm Shift
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white font-display mb-4">
              Why Traditional Cyber Education Leaves You Vulnerable
            </h2>
            <p className="text-base md:text-lg text-slate-300">
              Memorizing CVE numbers and clicking through multiple-choice questions doesn't prepare you for an active threat. CyberGuardian replaces passive retention with reflexive, verified defense.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* The Passive Approach */}
            <div className="flex flex-col p-6 sm:p-8 rounded-3xl clay-card border border-rose-500/20 relative overflow-hidden">
              <div className="flex items-center gap-3.5 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-rose-500/15 border border-rose-500/30 flex items-center justify-center text-rose-400 shadow-[inset_0_1px_2px_rgba(255,255,255,0.1)]">
                  <XCircle className="w-6 h-6" />
                </div>
                <div>
                  <span className="font-mono text-xs text-rose-400 uppercase font-semibold">The Passive Approach</span>
                  <h3 className="text-xl font-bold text-white font-display">Textbook Theory & Static Exams</h3>
                </div>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-slate-300 flex-1">
                <div className="flex items-start gap-3 p-3.5 rounded-2xl clay-inset-panel">
                  <XCircle className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-medium">Rote Term Memorization</strong>
                    Recite the CIA Triad and ISO clauses without ever inspecting a corrupt TCP packet or hunting rogue processes in memory.
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-2xl clay-inset-panel">
                  <XCircle className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-medium">Fear of Breaking Systems</strong>
                    Students are prevented from experimenting because live operating systems and networks can be permanently compromised.
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-2xl clay-inset-panel">
                  <XCircle className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-medium">Offense Without Defense</strong>
                    CTFs teach script-kiddie exploitation tactics without teaching how to write patches, harden configs, or enforce least-privilege.
                  </div>
                </div>
              </div>
            </div>

            {/* The CyberGuardian Method */}
            <div className="flex flex-col p-6 sm:p-8 rounded-3xl clay-card border border-emerald-500/30 relative overflow-hidden">
              <div className="flex items-center gap-3.5 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-[inset_0_1px_2px_rgba(255,255,255,0.1)]">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <span className="font-mono text-xs text-emerald-400 uppercase font-semibold">The CyberGuardian Standard</span>
                  <h3 className="text-xl font-bold text-white font-display">Reflexive, Hands-On Triage</h3>
                </div>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-slate-300 flex-1">
                <div className="flex items-start gap-3 p-3.5 rounded-2xl clay-inset-panel">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-medium">Authentic POSIX Command Line</strong>
                    Navigate realistic directory trees, parse auth logs with pipes (`grep | wc`), inspect process PIDs, and terminate live threats.
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-2xl clay-inset-panel">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-medium">100% In-Browser Isolation</strong>
                    Zero VMs to download, zero Docker setup, and zero host network exposure. Safe experimentation for colleges and beginners.
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-2xl clay-inset-panel">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-medium">Socratic AI Mentorship</strong>
                    GuardianAI evaluates your terminal commands in real time, explaining *why* permissions are vulnerable and guiding remediation.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* CURRICULUM TRACKS SHOWCASE                                                */}
      {/* ========================================================================= */}
      <section id="curriculum-section" className="py-24 px-4 sm:px-6 relative">
        <div className="max-w-[1440px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="clay-tag inline-block px-3.5 py-1 rounded-full text-emerald-400 font-mono text-xs font-semibold uppercase tracking-widest mb-3">
                Structured Career Curriculum
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white font-display">
                Defense Learning Tracks
              </h2>
              <p className="text-sm text-slate-400 mt-1 max-w-xl">
                Master the fundamental skills required for blue team operations, SOC triage, and secure development.
              </p>
            </div>

            <button
              onClick={() => onNavigate(user ? 'dashboard' : 'lab')}
              className="mt-4 md:mt-0 clay-pill-btn px-6 py-2.5 rounded-full text-xs font-bold"
            >
              <span>{user ? 'View Learning Dashboard' : 'Start Linux Track 01'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ALL_COURSES.map((course, idx) => {
              const isAvailable = course.status === 'AVAILABLE';

              return (
                <div
                  key={course.id}
                  className={`clay-card rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all ${
                    isAvailable ? 'border-emerald-500/40 hover:border-emerald-500 shadow-[0_0_30px_rgba(16,185,129,0.12)]' : 'opacity-85'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-mono text-xs uppercase tracking-wider text-slate-400 font-semibold">
                        TRACK 0{idx + 1} • {course.category}
                      </span>
                      {isAvailable ? (
                        <span className="clay-tag px-3 py-1 rounded-full text-emerald-400 font-mono text-xs font-bold flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                          LIVE & INTERACTIVE
                        </span>
                      ) : (
                        <span className="clay-tag px-3 py-1 rounded-full text-amber-400 font-mono text-xs font-bold">
                          CURRICULUM PREVIEW
                        </span>
                      )}
                    </div>

                    <h3 className="text-2xl font-bold text-white font-display mb-2">
                      {course.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                      {course.tagline}
                    </p>

                    {/* Skill Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {course.skills.map((s, i) => (
                        <span 
                          key={i}
                          className="px-2.5 py-1 rounded-lg text-xs font-mono bg-slate-900 border border-slate-800 text-slate-300"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                    <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
                      <span>{course.totalModules} Modules</span>
                      <span>•</span>
                      <span>{course.estimatedTime}</span>
                      <span>•</span>
                      <span className="text-amber-400 flex items-center gap-1">
                        <Zap className="w-3.5 h-3.5 fill-amber-400/20" />
                        {course.xpReward} XP
                      </span>
                    </div>

                    {isAvailable ? (
                      <button
                        onClick={() => onNavigate('lab')}
                        className="clay-pill-btn px-5 py-2 rounded-full text-xs font-bold flex items-center gap-1.5"
                      >
                        <span>Launch Lab</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    ) : (
                      <span className="text-xs font-mono text-slate-500">
                        In Preparation
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* GUARDIANAI SOCRATIC MENTOR SPOTLIGHT (3D ROBOT AVATAR)                    */}
      {/* ========================================================================= */}
      <section className="py-20 px-4 sm:px-6 bg-slate-950/80 border-t border-b border-slate-900 relative">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 flex justify-center">
            <div className="clay-card-glow rounded-3xl p-4 max-w-sm w-full relative">
              <div className="rounded-2xl overflow-hidden clay-inset-panel p-2">
                <img 
                  src="/stitch_assets/ai_mentor_avatar.png" 
                  alt="3D claymorphic cyber defense AI robot mentor avatar" 
                  className="w-full h-auto object-cover rounded-xl drop-shadow-[0_12px_24px_rgba(16,185,129,0.35)]" 
                />
              </div>
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 clay-tag px-4 py-1 rounded-full text-xs font-mono font-bold text-emerald-300">
                GUARDIAN-AI v2.8
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="clay-tag inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-emerald-400 font-mono text-xs font-semibold uppercase">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              Socratic Pedagogical Architecture
            </div>

            <h2 className="text-3xl md:text-5xl font-extrabold text-white font-display">
              An AI Tutor That Refuses to Spoil the Solution.
            </h2>

            <p className="text-sm md:text-base text-slate-300 leading-relaxed">
              Standard AI assistants give away code snippets immediately, destroying critical thinking. GuardianAI is hardwired with ethical Socratic guardrails: it diagnoses your terminal state, poses leading questions, and helps you form the mental models needed to identify and patch security vulnerabilities.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl clay-inset-panel">
                <h4 className="text-sm font-bold text-emerald-400 flex items-center gap-2 mb-1">
                  <CheckCircle2 className="w-4 h-4" />
                  Context-Aware Ingestion
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Monitors active terminal commands, parsed files, and process lists without manual prompt engineering.
                </p>
              </div>

              <div className="p-4 rounded-2xl clay-inset-panel">
                <h4 className="text-sm font-bold text-cyan-400 flex items-center gap-2 mb-1">
                  <CheckCircle2 className="w-4 h-4" />
                  Strict Ethical Boundary
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Refuses to generate offensive exploit payloads targeting external production IPs or domains.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* ETHICAL SECURITY CREED (3D VAULT BOX)                                     */}
      {/* ========================================================================= */}
      <section className="py-24 px-4 sm:px-6 relative">
        <div className="max-w-[1440px] mx-auto">
          <div className="clay-card-glow rounded-3xl p-8 sm:p-12 relative overflow-hidden flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <div className="flex-shrink-0 w-44 h-44 sm:w-56 sm:h-56 clay-inset-panel rounded-3xl p-3 flex items-center justify-center">
              <img 
                src="/stitch_assets/vault_box.png" 
                alt="3D claymorphic cyber vault safe box" 
                className="w-full h-full object-contain rounded-2xl drop-shadow-[0_12px_24px_rgba(16,185,129,0.35)]" 
              />
            </div>

            <div className="flex-1 text-left space-y-4">
              <span className="clay-tag inline-block px-3.5 py-1 rounded-full text-emerald-400 font-mono text-xs font-semibold uppercase">
                Ethical Defense Mandate
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-display">
                Built for Responsible Security Training.
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                CyberGuardian adheres to responsible disclosure principles and international educational standards. Every command and simulation operates within an in-memory client sandbox without outbound exploit connectivity. Suitable for university labs, developer onboarding, and security enthusiasts.
              </p>
              <div className="pt-2 flex flex-wrap gap-4">
                <button
                  onClick={() => onNavigate('lab')}
                  className="clay-pill-btn px-6 py-3 rounded-full text-xs font-bold"
                >
                  Enter Zero-Risk Sandbox
                </button>
                <button
                  onClick={() => onNavigate('dashboard')}
                  className="clay-secondary-btn px-6 py-3 rounded-full text-xs font-semibold"
                >
                  Cadet Dashboard
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Global Footer */}
      <footer className="mt-auto border-t border-slate-900 bg-slate-950 px-4 sm:px-6 py-8">
        <div className="max-w-[1440px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 font-mono">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-emerald-400" />
            <span className="text-white font-bold font-display">CyberGuardian Platform</span>
            <span>— AI Cybersecurity Defense Academy</span>
          </div>
          <div>
            100% In-Browser In-Memory POSIX Sandbox • Zero Host Exploit Risk
          </div>
        </div>
      </footer>
    </div>
  );
}
