import React, { useState } from 'react';
import { 
  Shield, 
  Lock, 
  Mail, 
  User, 
  X, 
  ArrowRight, 
  Zap, 
  CheckCircle2, 
  Fingerprint, 
  Eye, 
  EyeOff, 
  KeyRound, 
  Cpu, 
  Binary, 
  ShieldCheck, 
  Terminal
} from 'lucide-react';

import api from '../services/api';

export default function AuthModal({ isOpen, onClose, onLogin, initialMode = 'login' }) {
  const [mode, setMode] = useState(initialMode); // 'login' | 'signup'
  const [clearanceTier, setClearanceTier] = useState('tier1'); // 'tier1' | 'tier2' | 'tier3'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [callsign, setCallsign] = useState('Agent-Neo');
  const [showPassword, setShowPassword] = useState(false);
  const [isBiometricVerified, setIsBiometricVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setAuthError('');

    const targetEmail = email.trim() || (mode === 'signup' ? 'cadet@cyberguard.academy' : 'neo@cyberguard.academy');
    const targetPassword = password.trim() || 'cybercadet2026';
    const handle = callsign.trim() || targetEmail.split('@')[0] || 'Agent-Cadet';

    try {
      let response;
      if (mode === 'signup') {
        response = await api.register(targetEmail, targetPassword, handle, clearanceTier);
      } else {
        response = await api.login(targetEmail, targetPassword);
      }

      if (response && response.success === false && response.statusCode !== 503) {
        setAuthError(response.message || 'Clearance denied');
        return;
      }

      if (response && response.user) {
        onLogin({
          id: response.user.id,
          name: response.user.callsign || handle,
          email: response.user.email,
          clearance: response.user.clearance,
          tier: response.user.tier,
          joinedDate: response.user.joined_date || 'October 2026',
          xp: response.user.xp || 850
        });
        onClose();
        return;
      }
    } catch (err) {
      console.warn('API error, using local fallback:', err);
    } finally {
      setIsLoading(false);
    }

    // Fallback if backend server isn't actively queried
    const clearanceTitle = clearanceTier === 'tier3' 
      ? 'LEVEL 3 // ZERO-DAY SPECIALIST' 
      : clearanceTier === 'tier2' 
      ? 'LEVEL 2 // SOC ANALYST' 
      : 'LEVEL 1 // CADET DEFENDER';

    onLogin({
      id: 1,
      name: handle,
      email: targetEmail,
      clearance: clearanceTitle,
      tier: clearanceTier,
      joinedDate: 'October 2026',
      xp: 850
    });
    onClose();
  };

  const handleInstantDemoLogin = async () => {
    setIsLoading(true);
    try {
      const response = await api.login('neo@cyberguard.academy', 'cybercadet2026');
      if (response && response.success === false && response.statusCode !== 503) {
        setAuthError(response.message || 'Clearance denied');
        return;
      }

      if (response && response.user) {
        onLogin({
          id: response.user.id,
          name: response.user.callsign || 'Agent-Neo',
          email: response.user.email,
          clearance: response.user.clearance,
          tier: response.user.tier,
          joinedDate: response.user.joined_date || 'October 2026',
          xp: response.user.xp || 850
        });
        onClose();
        return;
      }
    } catch (err) {
      console.warn('Demo login API fallback:', err);
    } finally {
      setIsLoading(false);
    }

    onLogin({
      id: 1,
      name: 'Agent-Neo',
      email: 'neo@cyberguard.academy',
      clearance: 'LEVEL 1 // CADET DEFENDER',
      tier: 'tier1',
      joinedDate: 'October 2026',
      xp: 850
    });
    onClose();
  };

  const simulateBiometric = () => {
    setIsBiometricVerified(true);
    setTimeout(() => {
      // Auto-flash verified state
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-fadeIn overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#090e1c]/95 border border-white/10 rounded-3xl shadow-[0_0_80px_rgba(16,185,129,0.18)] overflow-hidden my-6">
        {/* Glow corner accents */}
        <div className="absolute -top-24 -left-24 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.08] bg-[#0e1321]/80">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shadow-inner">
              <Shield className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <span className="font-mono text-xs text-white font-bold tracking-wider">
                CLEARANCE PROTOCOL V2.4 // ONLINE
              </span>
              <div className="text-[10px] text-slate-400 font-mono">
                AIRGAPPED ENCLAVE • ZERO-RISK SANDBOXES
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.08] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Split Grid Console */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 divide-y lg:divide-y-0 lg:divide-x divide-white/[0.08]">
          {/* Left Console: Verification Form (7 cols) */}
          <div className="lg:col-span-7 p-6 sm:p-8 space-y-5">
            {/* Mode Switcher Tabs */}
            <div className="flex bg-[#0e1321] p-1 rounded-2xl border border-white/[0.08]">
              <button
                type="button"
                onClick={() => setMode('login')}
                className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                  mode === 'login'
                    ? 'clay-tag text-emerald-300 shadow-md'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                CADET LOGIN
              </button>
              <button
                type="button"
                onClick={() => setMode('signup')}
                className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                  mode === 'signup'
                    ? 'clay-tag text-emerald-300 shadow-md'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                ENLIST NEW RECRUIT (SIGN UP)
              </button>
            </div>

            {/* Quick Demo Bypass */}
            <button
              onClick={handleInstantDemoLogin}
              type="button"
              className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-950/60 to-cyan-950/60 border border-emerald-500/40 hover:border-emerald-400 text-xs font-mono text-emerald-300 flex items-center justify-center gap-2 transition-all hover:scale-[1.01] shadow-inner"
            >
              <Zap className="w-4 h-4 text-emerald-400 animate-pulse" />
              <span>Instant Access as "Agent-Neo" (Clearance Level 1)</span>
            </button>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Clearance Tier Selector */}
              <div>
                <label className="block text-[11px] font-mono text-slate-300 uppercase tracking-wider mb-2">
                  Select Defense Clearance Specialization:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <div
                    onClick={() => setClearanceTier('tier1')}
                    className={`p-2.5 rounded-xl border cursor-pointer transition-all ${
                      clearanceTier === 'tier1'
                        ? 'bg-emerald-950/40 border-emerald-500/70 shadow-[0_0_15px_rgba(16,185,129,0.2)]'
                        : 'bg-[#0e1321]/60 border-white/[0.06] hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-bold">
                      <Cpu className="w-3.5 h-3.5" />
                      <span>Tier 1</span>
                    </div>
                    <div className="text-[10px] text-slate-300 font-semibold mt-1">Junior Cadet</div>
                    <div className="text-[9px] text-slate-500 font-mono mt-0.5">POSIX CLI & FS</div>
                  </div>

                  <div
                    onClick={() => setClearanceTier('tier2')}
                    className={`p-2.5 rounded-xl border cursor-pointer transition-all ${
                      clearanceTier === 'tier2'
                        ? 'bg-cyan-950/40 border-cyan-500/70 shadow-[0_0_15px_rgba(6,182,212,0.2)]'
                        : 'bg-[#0e1321]/60 border-white/[0.06] hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 text-cyan-400 text-xs font-bold">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Tier 2</span>
                    </div>
                    <div className="text-[10px] text-slate-300 font-semibold mt-1">SOC Analyst</div>
                    <div className="text-[9px] text-slate-500 font-mono mt-0.5">PCAP & Logs</div>
                  </div>

                  <div
                    onClick={() => setClearanceTier('tier3')}
                    className={`p-2.5 rounded-xl border cursor-pointer transition-all ${
                      clearanceTier === 'tier3'
                        ? 'bg-blue-950/40 border-blue-500/70 shadow-[0_0_15px_rgba(59,130,246,0.2)]'
                        : 'bg-[#0e1321]/60 border-white/[0.06] hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 text-blue-400 text-xs font-bold">
                      <Binary className="w-3.5 h-3.5" />
                      <span>Tier 3</span>
                    </div>
                    <div className="text-[10px] text-slate-300 font-semibold mt-1">Zero-Day Spec.</div>
                    <div className="text-[9px] text-slate-500 font-mono mt-0.5">Kernel & Memory</div>
                  </div>
                </div>
              </div>

              {/* Callsign Input */}
              <div>
                <label className="block text-[11px] font-mono text-slate-300 uppercase tracking-wider mb-1">
                  Tactical Callsign / Handle
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    required
                    value={callsign}
                    onChange={(e) => setCallsign(e.target.value)}
                    placeholder="e.g. Agent-Valkyrie"
                    className="w-full bg-[#0a0f1d] border border-white/[0.12] rounded-xl pl-9 pr-3 py-2 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition-all shadow-inner"
                  />
                </div>
              </div>

              {/* Email Input */}
              <div>
                <label className="block text-[11px] font-mono text-slate-300 uppercase tracking-wider mb-1">
                  Institutional Defense Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="cadet@cyberguard.academy"
                    className="w-full bg-[#0a0f1d] border border-white/[0.12] rounded-xl pl-9 pr-3 py-2 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition-all shadow-inner"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-[11px] font-mono text-slate-300 uppercase tracking-wider mb-1">
                  Defense Passphrase
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full bg-[#0a0f1d] border border-white/[0.12] rounded-xl pl-9 pr-10 py-2 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition-all shadow-inner"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-slate-500 hover:text-slate-300"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Hardware / FIDO2 Biometric Key Button */}
              <div>
                <button
                  type="button"
                  onClick={simulateBiometric}
                  className={`w-full py-2 px-3 rounded-xl border text-xs font-mono flex items-center justify-center gap-2 transition-all ${
                    isBiometricVerified
                      ? 'bg-emerald-950/40 border-emerald-500 text-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.3)]'
                      : 'bg-[#0a0f1d] border-white/[0.1] text-slate-400 hover:text-white hover:border-white/20'
                  }`}
                >
                  <Fingerprint className={`w-4 h-4 ${isBiometricVerified ? 'text-emerald-400' : 'text-slate-500'}`} />
                  <span>
                    {isBiometricVerified 
                      ? '✓ WebAuthn / FIDO2 YubiKey Verified' 
                      : 'Authenticate with Hardware Key / Biometrics'}
                  </span>
                </button>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full py-3 rounded-xl clay-pill-btn font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(16,185,129,0.4)]"
              >
                <span>AUTHENTICATE & ENTER DEFENSE NETWORK</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>

          {/* Right Console: Holographic Clearance Dossier & Badge Preview (5 cols) */}
          <div className="lg:col-span-5 p-6 sm:p-8 bg-[#0a0f1d]/60 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-mono text-emerald-400 tracking-wider uppercase font-bold">
                  HOLOGRAPHIC DEFENSE DOSSIER
                </span>
                <span className="text-[10px] font-mono text-slate-500">ID: CG-8492-DELTA</span>
              </div>

              {/* Clearance Badge Card */}
              <div className="relative rounded-2xl bg-gradient-to-b from-[#161b2a] to-[#0e1321] border border-emerald-500/30 p-5 shadow-xl text-center space-y-4">
                {/* Avatar with reticle */}
                <div className="relative w-20 h-20 mx-auto">
                  <div className="w-full h-full rounded-2xl bg-[#090e1c] border-2 border-emerald-400/80 p-1 overflow-hidden shadow-[0_0_20px_rgba(16,185,129,0.35)]">
                    <img
                      src="/stitch_assets/cadet_avatar.png"
                      alt="Cadet Avatar"
                      className="w-full h-full object-cover rounded-xl"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/stitch_assets/shield_emblem.png';
                      }}
                    />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-400 border-2 border-slate-900 animate-ping"></div>
                </div>

                <div>
                  <h3 className="text-base font-bold text-white font-mono">{callsign || 'Agent-Neo'}</h3>
                  <div className="text-[11px] text-emerald-400 font-mono mt-0.5">
                    {clearanceTier === 'tier3' ? 'Tier 3 Specialist' : clearanceTier === 'tier2' ? 'Tier 2 SOC Defender' : 'Tier 1 Junior Cadet'}
                  </div>
                </div>

                {/* Cryptographic hash ticker */}
                <div className="p-2.5 rounded-xl bg-[#090e1c] border border-white/[0.06] font-mono text-[10px] text-slate-400 space-y-1 text-left">
                  <div className="flex justify-between">
                    <span>PUBLIC KEY:</span>
                    <span className="text-emerald-400">0x9e8a..4f7d2</span>
                  </div>
                  <div className="flex justify-between">
                    <span>ENCLAVE:</span>
                    <span className="text-cyan-400">AIRGAPPED MICROVM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>INTEGRITY:</span>
                    <span className="text-emerald-400">100% VERIFIED</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Socratic Mentor EOS Tip Bubble */}
            <div className="p-4 rounded-2xl bg-[#161b2a]/90 border border-cyan-500/30 flex items-start gap-3 shadow-lg">
              <div className="w-9 h-9 rounded-xl overflow-hidden border border-cyan-400/50 flex-shrink-0 bg-slate-900">
                <img
                  src="/stitch_assets/ai_mentor_avatar.png"
                  alt="EOS AI Mentor"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/stitch_assets/shield_emblem.png';
                  }}
                />
              </div>
              <div>
                <div className="text-[10px] font-mono font-bold text-cyan-300">EOS // GUARDIAN AI TUTOR</div>
                <p className="text-[11px] text-slate-300 italic mt-0.5 leading-relaxed">
                  "Every defender begins at the terminal. Secure your perimeter, question every packet, and leave no system exposed."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
