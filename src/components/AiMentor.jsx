import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, Sparkles, X, Minimize2, Maximize2, ShieldAlert, CornerDownLeft, RefreshCw } from 'lucide-react';
import api from '../services/api';
import { answerLocally } from '../../shared/guardian-engine.js';

const KNOWLEDGE_BASE = {
  navigation: "In Linux, navigation is based on a single tree root `/`. Always keep in mind that `.` refers to your current directory, `..` represents the parent directory, and `~` is shorthand for your user home folder (`/home/student`). Knowing where you are with `pwd` prevents accidental modifications to critical system paths.",
  permissions: "Permissions are structured into Owner, Group, and Others. Each entity has Read (4), Write (2), and Execute (1). `chmod 777` grants read, write, and execute to every entity on the system, which allows any unprivileged attacker or rogue process to overwrite binaries, inject malware, or alter logs. Standard security practices mandate the Principle of Least Privilege: use `644` for normal files, `600` for credentials/keys, and `755` for executables.",
  pipes: "The pipe operator `|` connects the standard output (stdout) of the preceding command directly into the standard input (stdin) of the following command. The redirection operator `>` writes output to a file (overwriting existing content), while `>>` appends new lines without deleting the original data.",
  logs: "Authentication logs such as `/var/log/auth.log` track all SSH handshakes, sudo executions, and PAM authentications. When investigating brute-force attempts, searching for `Failed password for invalid user` identifies automated credential stuffing and dictionary attacks against your server.",
  processes: "`ps aux` reveals all running processes. Key red flags include: processes consuming unusually high CPU (>90%), binaries executing from temporary directories like `/tmp` or `/dev/shm`, unusual network outbound connections, or obfuscated filenames like `.xmrig_miner`.",
  network: "Network diagnostics allow you to audit local endpoints. `ifconfig` or `ip a` reveals your assigned network interface IP address, `ping` measures ICMP connectivity and latency, and `curl -I` retrieves HTTP response headers to verify if firewalls and security policies are enforced."
};

export default function AiMentor({ currentModule, activeTask, onInsertCommand }) {
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: `Greetings, Defender. I am EOS // GuardianAI, your Socratic defense mentor. I monitor your live POSIX commands and can explain kernel internals, discuss defense trade-offs, or provide dialectic guidance for Module 0${currentModule.number}: "${currentModule.title}".`
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const lastModuleRef = useRef(currentModule.number);

  useEffect(() => {
    if (lastModuleRef.current === currentModule.number) return;
    lastModuleRef.current = currentModule.number;
    setMessages((prev) => [
      ...prev,
      {
        sender: 'ai',
        text: `Switched context to Module 0${currentModule.number}: ${currentModule.title}. Ask me for hints on any step or ask about relevant security mechanics.`
      }
    ]);
  }, [currentModule.number, currentModule.title]);

  const handleSend = async (textToSend = input) => {
    const query = textToSend.trim();
    if (!query) return;

    const userMsg = { sender: 'user', text: query };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    const context = {
      message: query,
      moduleTitle: currentModule.title,
      taskText: activeTask?.text || '',
      taskHint: activeTask?.hint || ''
    };

    let reply = await api.askMentor(context);
    if (!reply?.text) {
      const local = answerLocally(context);
      if (!local.refused && activeTask && /hint|help|stuck|step/i.test(query)) {
        local.text = `For "${activeTask.text}": ${activeTask.hint} What would you check to know the step actually changed the system?`;
      } else if (!local.refused && !activeTask && /hint|help|stuck/i.test(query)) {
        local.text = 'Every task in this module is already complete. Move to the next module, or ask why the defense works.';
      } else if (!local.refused && KNOWLEDGE_BASE.pipes && /pipe|redirect/i.test(query)) {
        local.text = KNOWLEDGE_BASE.pipes;
      }
      reply = local;
    }

    setMessages(prev => [...prev, { sender: 'ai', text: reply.text, refused: !!reply.refused }]);
    setIsTyping(false);
  };

  const quickPrompts = [
    'Give me a hint for this step',
    'Why is chmod 777 dangerous?',
    'Difference between > and >>',
    'How does grep spot attacks?'
  ];

  if (isCollapsed) {
    return (
      <button
        onClick={() => setIsCollapsed(false)}
        className="fixed bottom-5 right-5 z-40 flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[#0e1321] border border-cyan-500/50 shadow-[0_0_25px_rgba(6,182,212,0.3)] text-cyan-300 font-semibold text-xs hover:scale-105 transition-all backdrop-blur-xl"
      >
        <div className="w-5 h-5 rounded-full overflow-hidden border border-cyan-400">
          <img src="/stitch_assets/ai_mentor_avatar.png" alt="EOS" className="w-full h-full object-cover" />
        </div>
        <span>GuardianAI EOS</span>
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
      </button>
    );
  }

  return (
    <div className="clay-card rounded-2xl flex flex-col h-full overflow-hidden border border-white/10 shadow-xl">
      {/* Mentor Header */}
      <div className="p-3.5 border-b border-white/[0.08] bg-[#090e1c]/80 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl overflow-hidden border border-cyan-400/50 p-0.5 bg-slate-900 shadow-sm flex-shrink-0">
            <img
              src="/stitch_assets/ai_mentor_avatar.png"
              alt="EOS"
              className="w-full h-full object-cover rounded-lg"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/stitch_assets/shield_emblem.png';
              }}
            />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-white font-mono">EOS // GUARDIAN AI</span>
              <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold">
                SOCRATIC
              </span>
            </div>
            <div className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              <span>Guardrails Enforced • Dialectic Tutor</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setMessages([messages[0]])}
            title="Reset conversation"
            className="p-1 text-slate-400 hover:text-slate-200 rounded"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setIsCollapsed(true)}
            title="Minimize"
            className="p-1 text-slate-400 hover:text-slate-200 rounded"
          >
            <Minimize2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-3.5 space-y-3 text-xs bg-[#0a0f1d]/50">
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div
              className={`max-w-[90%] p-3 rounded-2xl leading-relaxed text-xs ${
                m.sender === 'user'
                  ? 'bg-cyan-950/60 text-cyan-200 border border-cyan-500/40 rounded-tr-none shadow-md'
                  : 'bg-[#161b2a]/90 text-slate-200 border border-white/[0.08] rounded-tl-none shadow-md'
              }`}
            >
              {m.refused && <ShieldAlert className="w-3.5 h-3.5 text-amber-300 inline mr-1" />}
              {m.text}
            </div>
            <span className="text-[9px] font-mono text-slate-500 mt-1 px-1">
              {m.sender === 'user' ? 'You' : 'GuardianAI'}
            </span>
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-1.5 text-xs text-slate-400 bg-[#161b2a] px-3 py-2 rounded-2xl border border-white/[0.06] w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce"></span>
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce delay-100"></span>
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce delay-200"></span>
            <span className="text-[10px] font-mono text-slate-400 ml-1">Analyzing defense concepts...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Prompts */}
      <div className="px-3 py-2 border-t border-white/[0.06] bg-[#090e1c] flex items-center gap-1.5 overflow-x-auto scrollbar-none">
        {quickPrompts.map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(prompt)}
            className="flex-shrink-0 px-2.5 py-1 rounded-full bg-[#161b2a] hover:bg-emerald-950/40 border border-white/[0.08] hover:border-emerald-500/40 text-[10px] font-mono text-slate-300 hover:text-emerald-300 transition-colors whitespace-nowrap"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="p-3 border-t border-white/[0.08] bg-[#090e1c] flex items-center gap-2"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask GuardianAI about commands or safety..."
          className="flex-1 bg-[#0e1321] border border-white/[0.12] rounded-xl px-3 py-2 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all shadow-inner"
        />
        <button
          type="submit"
          className="clay-pill-btn p-2 rounded-xl text-slate-950 font-bold transition-all"
        >
          <Send className="w-4 h-4 text-slate-950" />
        </button>
      </form>
    </div>
  );
}
