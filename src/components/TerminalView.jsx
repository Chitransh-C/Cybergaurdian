import React, { useEffect, useRef, useState } from 'react';
import { Terminal } from '@xterm/xterm';
import { FitAddon } from '@xterm/addon-fit';
import { Terminal as TerminalIcon, Maximize2, Minimize2, Trash2, Copy, Play, Check } from 'lucide-react';

export default function TerminalView({ vfs, onCommandRun, activeTaskHint }) {
  const terminalRef = useRef(null);
  const xtermInstance = useRef(null);
  const fitAddonInstance = useRef(null);
  const currentLineRef = useRef('');
  const historyIndexRef = useRef(-1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!terminalRef.current) return;

    // Initialize Xterm
    const term = new Terminal({
      theme: {
        background: '#02050e',
        foreground: '#e2e8f0',
        cursor: '#00f0ff',
        cursorAccent: '#02050e',
        selectionBackground: 'rgba(0, 240, 255, 0.3)',
        black: '#0f172a',
        red: '#ff3366',
        green: '#00ff9d',
        yellow: '#f59e0b',
        blue: '#38bdf8',
        magenta: '#c084fc',
        cyan: '#00f0ff',
        white: '#f8fafc',
        brightBlack: '#475569',
        brightRed: '#fb7185',
        brightGreen: '#4ade80',
        brightYellow: '#fbbf24',
        brightBlue: '#60a5fa',
        brightMagenta: '#e879f9',
        brightCyan: '#67e8f9',
        brightWhite: '#ffffff'
      },
      fontFamily: "'Fira Code', 'JetBrains Mono', monospace",
      fontSize: 14,
      lineHeight: 1.35,
      cursorBlink: true,
      cursorStyle: 'block',
      scrollback: 1000,
      convertEol: true
    });

    const fitAddon = new FitAddon();
    term.loadAddon(fitAddon);
    term.open(terminalRef.current);
    fitAddon.fit();

    xtermInstance.current = term;
    fitAddonInstance.current = fitAddon;

    // Welcome banner in terminal
    term.writeln('\x1b[1;36m┌──────────────────────────────────────────────────────────┐\x1b[0m');
    term.writeln('\x1b[1;36m│\x1b[0m \x1b[1;32m● CYBERGUARDIAN DEFENSE LAB\x1b[0m — \x1b[1;37mVirtual POSIX Sandbox v1.0\x1b[0m \x1b[1;36m│\x1b[0m');
    term.writeln('\x1b[1;36m│\x1b[0m \x1b[90mZero-Risk In-Memory Environment • Safe Cyber Simulator \x1b[0m \x1b[1;36m│\x1b[0m');
    term.writeln('\x1b[1;36m└──────────────────────────────────────────────────────────┘\x1b[0m');
    term.writeln('\x1b[90mType \x1b[1;33mhelp\x1b[0m\x1b[90m to view commands, or follow your active mission objectives.\x1b[0m\r\n');

    const prompt = () => {
      term.write(vfs.getPrompt());
      currentLineRef.current = '';
    };

    prompt();

    // Keystroke handler
    term.onData(data => {
      // Enter
      if (data === '\r') {
        term.write('\r\n');
        const cmd = currentLineRef.current;
        if (cmd.trim()) {
          const res = vfs.execute(cmd);
          if (res.output) {
            term.writeln(res.output);
          }
          if (onCommandRun) {
            onCommandRun(cmd, res);
          }
        }
        historyIndexRef.current = -1;
        prompt();
      }
      // Backspace
      else if (data === '\x7f' || data === '\b') {
        if (currentLineRef.current.length > 0) {
          currentLineRef.current = currentLineRef.current.slice(0, -1);
          term.write('\b \b');
        }
      }
      // Ctrl + C (SIGINT)
      else if (data === '\x03') {
        term.write('^C\r\n');
        historyIndexRef.current = -1;
        prompt();
      }
      // Ctrl + L (Clear screen)
      else if (data === '\x0c') {
        term.clear();
        prompt();
      }
      // Tab (Autocompletion)
      else if (data === '\t') {
        const matches = vfs.getAutocompletions(currentLineRef.current);
        if (matches.length === 1) {
          const tokens = currentLineRef.current.split(' ');
          tokens[tokens.length - 1] = matches[0];
          const newCmd = tokens.join(' ');
          const diff = newCmd.slice(currentLineRef.current.length);
          currentLineRef.current = newCmd;
          term.write(diff);
        } else if (matches.length > 1) {
          term.write('\r\n\x1b[90m' + matches.join('  ') + '\x1b[0m\r\n');
          term.write(vfs.getPrompt() + currentLineRef.current);
        }
      }
      // Arrow Up (History)
      else if (data === '\x1b[A') {
        const hist = vfs.commandHistory;
        if (hist.length > 0) {
          if (historyIndexRef.current === -1) {
            historyIndexRef.current = hist.length - 1;
          } else if (historyIndexRef.current > 0) {
            historyIndexRef.current--;
          }
          const prevCmd = hist[historyIndexRef.current];
          // Clear current line on screen
          while (currentLineRef.current.length > 0) {
            term.write('\b \b');
            currentLineRef.current = currentLineRef.current.slice(0, -1);
          }
          currentLineRef.current = prevCmd;
          term.write(prevCmd);
        }
      }
      // Arrow Down (History)
      else if (data === '\x1b[B') {
        const hist = vfs.commandHistory;
        if (historyIndexRef.current !== -1) {
          if (historyIndexRef.current < hist.length - 1) {
            historyIndexRef.current++;
            const nextCmd = hist[historyIndexRef.current];
            while (currentLineRef.current.length > 0) {
              term.write('\b \b');
              currentLineRef.current = currentLineRef.current.slice(0, -1);
            }
            currentLineRef.current = nextCmd;
            term.write(nextCmd);
          } else {
            historyIndexRef.current = -1;
            while (currentLineRef.current.length > 0) {
              term.write('\b \b');
              currentLineRef.current = currentLineRef.current.slice(0, -1);
            }
          }
        }
      }
      // Printable characters
      else if (data >= ' ' && data <= '~') {
        currentLineRef.current += data;
        term.write(data);
      }
    });

    const resizeObserver = new ResizeObserver(() => {
      try {
        fitAddon.fit();
      } catch (e) {
        // Ignore fit error if unmounted
      }
    });

    if (terminalRef.current) {
      resizeObserver.observe(terminalRef.current);
    }

    const handleResize = () => {
      try {
        fitAddon.fit();
      } catch (e) {}
    };
    window.addEventListener('resize', handleResize);

    // Initial delayed fit to guarantee proper dimensions
    setTimeout(() => {
      try {
        fitAddon.fit();
      } catch (e) {}
    }, 150);

    return () => {
      window.removeEventListener('resize', handleResize);
      resizeObserver.disconnect();
      term.dispose();
    };
  }, [vfs]);

  const handleClear = () => {
    if (xtermInstance.current) {
      xtermInstance.current.clear();
      xtermInstance.current.write(vfs.getPrompt());
      currentLineRef.current = '';
    }
  };

  const handleInsertHint = (cmdText) => {
    if (!xtermInstance.current) return;
    const term = xtermInstance.current;
    while (currentLineRef.current.length > 0) {
      term.write('\b \b');
      currentLineRef.current = currentLineRef.current.slice(0, -1);
    }
    currentLineRef.current = cmdText;
    term.write(cmdText);
    term.focus();
  };

  const handleCopyClipboard = () => {
    if (activeTaskHint) {
      navigator.clipboard.writeText(activeTaskHint);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  return (
    <div className={`terminal-shell flex flex-col ${isFullscreen ? 'fixed inset-4 z-50' : 'h-full min-h-[460px]'}`}>
      {/* Terminal Titlebar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-950/90 border-b border-cyan-500/20">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
          </div>

          <div className="h-4 w-px bg-slate-800 mx-1"></div>

          <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
            <TerminalIcon className="w-3.5 h-3.5 text-cyan-400" />
            <span className="font-semibold text-slate-200">bash</span>
            <span className="text-slate-500">•</span>
            <span className="text-slate-400">student@sandbox-node</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Quick paste button if there is an active hint */}
          {activeTaskHint && (
            <button
              onClick={() => handleInsertHint(activeTaskHint)}
              title="Insert recommended command into terminal"
              className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono font-medium rounded bg-cyan-950/70 text-cyan-300 border border-cyan-500/30 hover:bg-cyan-900/60 transition-colors"
            >
              <Play className="w-3 h-3 flex-shrink-0" />
              <span className="truncate max-w-[120px] sm:max-w-[180px]">Paste: {activeTaskHint}</span>
            </button>
          )}

          <button
            onClick={handleClear}
            title="Clear terminal"
            className="p-1.5 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => {
              setIsFullscreen(!isFullscreen);
              setTimeout(() => fitAddonInstance.current?.fit(), 100);
            }}
            title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
            className="p-1.5 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded transition-colors"
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Terminal Canvas Container */}
      <div 
        ref={terminalRef} 
        className="flex-1 w-full bg-[#02050e] p-1 cursor-text"
        onClick={() => xtermInstance.current?.focus()}
      />

      {/* Terminal Footer Bar */}
      <div className="flex items-center justify-between px-3 py-1.5 bg-slate-950/80 border-t border-slate-800/80 text-[11px] font-mono text-slate-400">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-emerald-400 font-medium">SANDBOX ONLINE</span>
          </span>
          <span className="text-slate-600">|</span>
          <span className="text-slate-400">ISOLATION: 100% IN-BROWSER</span>
        </div>
        <div className="flex items-center gap-3 text-slate-500">
          <span>TAB: Autocomplete</span>
          <span>•</span>
          <span>↑/↓: History</span>
          <span>•</span>
          <span>Ctrl+L: Clear</span>
        </div>
      </div>
    </div>
  );
}
