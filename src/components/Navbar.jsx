import React from 'react';
import { Shield, Terminal, Award, Zap, User, LogOut, BookOpen, Layers, Database } from 'lucide-react';

export default function Navbar({
  currentPage,
  onNavigate,
  user,
  onOpenAuth,
  onLogout,
  xp,
  badgesCount,
  dbStatus
}) {
  return (
    <header className="border-b border-white/[0.08] bg-[#090e1c]/90 backdrop-blur-xl px-4 sm:px-8 py-3 sticky top-0 z-40 shadow-[0_4px_24px_rgba(0,0,0,0.6)]">
      <div className="max-w-[1500px] mx-auto flex items-center justify-between">
        {/* Clean Logo */}
        <div 
          onClick={() => onNavigate('landing')}
          className="flex items-center gap-3 cursor-pointer group flex-shrink-0"
        >
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-400 to-cyan-400 p-[1.5px] shadow-[0_0_15px_rgba(16,185,129,0.35)] group-hover:shadow-[0_0_20px_rgba(16,185,129,0.6)] transition-all">
            <div className="w-full h-full bg-[#0a0f1d] rounded-[10px] flex items-center justify-center">
              <Shield className="w-4 h-4 text-emerald-400" />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-base font-bold tracking-tight text-white font-display group-hover:text-emerald-300 transition-colors">
              Cyber<span className="text-emerald-400">Guardian</span>
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          </div>
        </div>

        {/* Clean, Uncluttered Center Navigation */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8">
          <button
            onClick={() => onNavigate('dashboard')}
            className={`text-xs font-semibold tracking-wide transition-all py-1 relative ${
              currentPage === 'dashboard'
                ? 'text-emerald-400 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Dashboard
            {currentPage === 'dashboard' && (
              <span className="absolute -bottom-3 left-0 right-0 h-0.5 bg-emerald-400 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>
            )}
          </button>

          <button
            onClick={() => onNavigate('catalog')}
            className={`text-xs font-semibold tracking-wide transition-all py-1 relative ${
              currentPage === 'catalog'
                ? 'text-emerald-400 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Curriculum Tracks
            {currentPage === 'catalog' && (
              <span className="absolute -bottom-3 left-0 right-0 h-0.5 bg-emerald-400 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>
            )}
          </button>

          <button
            onClick={() => onNavigate('profile')}
            className={`text-xs font-semibold tracking-wide transition-all py-1 relative ${
              currentPage === 'profile'
                ? 'text-emerald-400 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Armory & Badges
            {currentPage === 'profile' && (
              <span className="absolute -bottom-3 left-0 right-0 h-0.5 bg-emerald-400 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>
            )}
          </button>

          <button
            onClick={() => onNavigate('lab')}
            className={`text-xs font-semibold tracking-wide transition-all py-1 relative flex items-center gap-1.5 ${
              currentPage === 'lab'
                ? 'text-emerald-400 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Terminal className="w-3.5 h-3.5 text-emerald-400" />
            <span>Terminal Lab</span>
            {currentPage === 'lab' && (
              <span className="absolute -bottom-3 left-0 right-0 h-0.5 bg-emerald-400 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>
            )}
          </button>
        </nav>

        {/* Clean Right Actions */}
        <div className="flex items-center gap-3 flex-shrink-0">
          {/* MySQL Database Status Indicator */}
          <div 
            className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[11px] font-mono transition-all ${
              dbStatus?.connected
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.15)]'
                : 'bg-amber-500/10 border-amber-500/30 text-amber-400'
            }`}
            title={dbStatus?.connected ? `Connected to MySQL ${dbStatus.version || '8.4'} @ 127.0.0.1:3306 (cyberguardian)` : 'Database offline'}
          >
            <Database className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse"></span>
            <span className="font-semibold tracking-wider">
              {dbStatus?.connected ? 'MYSQL: ONLINE' : 'MYSQL: LOCAL'}
            </span>
          </div>

          {user ? (
            <div className="flex items-center gap-3">
              {/* Clean XP Counter */}
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#161b2a] border border-white/[0.08] font-mono text-xs">
                <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400/20" />
                <span className="font-bold text-white">{xp}</span>
                <span className="text-[10px] text-slate-400">XP</span>
              </div>

              {/* Compact User Pill */}
              <div 
                onClick={() => onNavigate('profile')}
                className="flex items-center gap-2 pl-1 pr-3 py-1 rounded-full bg-[#161b2a] hover:bg-white/[0.08] border border-white/[0.08] cursor-pointer transition-colors"
                title="Cadet Profile"
              >
                <div className="w-6 h-6 rounded-full overflow-hidden border border-emerald-400/60 p-0.5 bg-slate-900 flex-shrink-0">
                  <img
                    src="/stitch_assets/cadet_avatar.png"
                    alt={user.name}
                    className="w-full h-full object-cover rounded-full"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/stitch_assets/shield_emblem.png';
                    }}
                  />
                </div>
                <span className="text-xs font-semibold text-slate-200 hidden sm:inline">
                  {user.name}
                </span>
              </div>

              {/* Sign Out */}
              <button
                onClick={onLogout}
                title="Sign Out"
                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-950/30 transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <button
                onClick={() => onOpenAuth('login')}
                className="text-xs font-semibold text-slate-300 hover:text-white transition-colors"
              >
                Sign In
              </button>
              <button
                onClick={() => onOpenAuth('signup')}
                className="clay-pill-btn text-xs py-1.5 px-4 rounded-xl font-bold"
              >
                Enlist Free
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
