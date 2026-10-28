import React, { useEffect, useRef, useState } from 'react';
import { Shield, Swords, CheckCircle2, AlertTriangle } from 'lucide-react';

const COMPLETES = {
  sqli: { exploit: ['t_sqli_inspect', 't_sqli_grep'], defense: ['t_sqli_patch'] },
  xss: { exploit: ['t_xss_audit'], defense: ['t_xss_sanitize'] },
  jwt: { exploit: ['t_jwt_inspect'], defense: ['t_jwt_alg'] },
  path: { exploit: ['t_path_test'], defense: ['t_path_patch'] },
  headers: { exploit: ['t_headers_audit'], defense: ['t_csp_grep'] },
  phishing: { exploit: ['t_phish_flags'], defense: ['t_phish_rule'] },
  password: { exploit: ['t_pass_fast'], defense: ['t_pass_harden'] }
};

const LAB_USERS = [
  { user: 'admin', pass: 'hunter2', role: 'admin' },
  { user: 'guest', pass: 'guest', role: 'user' }
];

const PHISH_FLAGS = [
  { id: 'sender', label: 'Lookalike sender domain', detail: 'paypa1.com substitutes a digit for the letter l.' },
  { id: 'urgency', label: 'Artificial urgency', detail: 'The message threatens account closure within one hour.' },
  { id: 'link', label: 'Link text disagrees with the destination', detail: 'The visible text says paypal.com. The href is example.lab.' },
  { id: 'attachment', label: 'Unexpected macro attachment', detail: 'invoice.docm can carry a malicious macro.' },
  { id: 'reply', label: 'Reply-To is a different domain', detail: 'Replies would go to a mailbox you do not control.' }
];

const WORDLIST = ['password', '123456', 'qwerty', 'letmein', 'admin', 'welcome'];
const FAKE_FS = {
  '/var/www/uploads/avatar.png': 'PNG sandbox avatar bytes',
  '/etc/passwd': 'root:x:0:0:root:/root:/bin/bash\nstudent:x:1000:1000:student:/home/student:/bin/bash'
};

function looksInjectable(value) {
  const text = String(value || '').toLowerCase();
  return text.includes("' or '1'='1") || text.includes("' or 1=1") || text.includes('" or "1"="1');
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function looksLikeMarkup(value) {
  return /<\s*script|onerror\s*=|onload\s*=|javascript:/i.test(value);
}

function b64url(obj) {
  return btoa(JSON.stringify(obj)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

export default function DefensePlayground({ kind, taskStatus = {}, onCommandRun }) {
  const [mode, setMode] = useState('exploit');
  const reported = useRef(new Set());

  useEffect(() => {
    setMode('exploit');
    reported.current = new Set();
  }, [kind]);

  const report = (ids) => {
    const fresh = ids.filter((id) => !reported.current.has(id) && !taskStatus[id]);
    if (!fresh.length || !onCommandRun) return;
    fresh.forEach((id) => reported.current.add(id));
    onCommandRun('playground', { code: 0, output: fresh.join(','), playgrounds: fresh });
  };

  return (
    <div className="h-full flex flex-col bg-[#070b14] text-slate-100">
      <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-white/10 bg-[#0a0f1d]">
        <div>
          <div className="text-[10px] font-mono uppercase tracking-wider text-emerald-400">Isolated defense playground</div>
          <div className="text-sm font-semibold text-white">Red view shows the failure. Blue view proves the fix.</div>
        </div>
        <div className="flex bg-[#161b2a] p-1 rounded-xl border border-white/10">
          <button
            onClick={() => setMode('exploit')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 ${mode === 'exploit' ? 'bg-rose-950/70 text-rose-200' : 'text-slate-400'}`}
          >
            <Swords className="w-3.5 h-3.5" /> Exploit view
          </button>
          <button
            onClick={() => setMode('defense')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 ${mode === 'defense' ? 'bg-emerald-950/70 text-emerald-200' : 'text-slate-400'}`}
          >
            <Shield className="w-3.5 h-3.5" /> Defense view
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        {kind === 'sqli' && <SqliLab mode={mode} report={report} />}
        {kind === 'xss' && <XssLab mode={mode} report={report} />}
        {kind === 'jwt' && <JwtLab mode={mode} report={report} />}
        {kind === 'path' && <PathLab mode={mode} report={report} />}
        {kind === 'headers' && <HeadersLab mode={mode} report={report} />}
        {kind === 'phishing' && <PhishLab mode={mode} report={report} />}
        {kind === 'password' && <PasswordLab mode={mode} report={report} />}
        {!COMPLETES[kind] && (
          <p className="text-sm text-slate-400">This module uses the terminal sandbox. Switch to the Terminal tab for CLI directives.</p>
        )}
      </div>
    </div>
  );
}

function SqliLab({ mode, report }) {
  const [username, setUsername] = useState("admin' OR '1'='1");
  const [password, setPassword] = useState('nope');
  const [rows, setRows] = useState(null);
  const defense = mode === 'defense';
  const query = defense
    ? 'SELECT id, role FROM users WHERE user = ? AND pass = ?'
    : `SELECT id, role FROM users WHERE user = '${username}' AND pass = '${password}'`;

  const run = () => {
    let matched;
    if (defense) matched = LAB_USERS.filter((row) => row.user === username && row.pass === password);
    else if (looksInjectable(username) || looksInjectable(password)) matched = LAB_USERS;
    else matched = LAB_USERS.filter((row) => row.user === username && row.pass === password);
    setRows(matched);
    if (!defense && matched.length > 1) report(COMPLETES.sqli.exploit);
    if (defense && looksInjectable(username) && matched.length === 0) report(COMPLETES.sqli.defense);
  };

  return (
    <div className="space-y-4 max-w-3xl">
      <p className="text-xs text-slate-300 leading-relaxed">Fake two-row table. Exploit view pastes input into SQL. Defense view binds values.</p>
      <div className="grid sm:grid-cols-2 gap-3">
        <label className="text-xs text-slate-400 space-y-1 block">Username
          <input value={username} onChange={(e) => setUsername(e.target.value)} className="w-full bg-[#0a0f1d] border border-white/10 rounded-xl px-3 py-2 text-sm text-white font-mono" />
        </label>
        <label className="text-xs text-slate-400 space-y-1 block">Password
          <input value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-[#0a0f1d] border border-white/10 rounded-xl px-3 py-2 text-sm text-white font-mono" />
        </label>
      </div>
      <pre className={`text-xs font-mono p-3 rounded-xl border overflow-x-auto ${defense ? 'border-emerald-500/40 text-emerald-200 bg-emerald-950/20' : 'border-rose-500/40 text-rose-200 bg-rose-950/20'}`}>{query}</pre>
      <button onClick={run} className="clay-pill-btn px-4 py-2 rounded-xl text-xs font-bold">Run against mock table</button>
      {rows && (
        <div className="rounded-xl border border-white/10 bg-[#0a0f1d] p-3 text-xs space-y-2">
          <div className="font-mono text-slate-400">{rows.length} row{rows.length === 1 ? '' : 's'} returned</div>
          {rows.length === 0 && <div className="text-emerald-300">Authentication rejected.</div>}
          {rows.map((row) => <div key={row.user} className="font-mono text-slate-200">{row.user} · {row.role}</div>)}
          {!defense && rows.length > 1 && <div className="text-rose-300 flex items-start gap-2"><AlertTriangle className="w-4 h-4 flex-shrink-0" /> Bypass succeeded on the practice table. Switch to Defense view.</div>}
          {defense && looksInjectable(username) && rows.length === 0 && <div className="text-emerald-300 flex items-start gap-2"><CheckCircle2 className="w-4 h-4 flex-shrink-0" /> Bound parameters stopped the injection.</div>}
        </div>
      )}
    </div>
  );
}

function XssLab({ mode, report }) {
  const [comment, setComment] = useState('<script>alert(document.cookie)</script>');
  const [rendered, setRendered] = useState('');
  const defense = mode === 'defense';

  const publish = () => {
    setRendered(defense ? escapeHtml(comment) : comment);
    if (!defense && looksLikeMarkup(comment)) report(COMPLETES.xss.exploit);
    if (defense && looksLikeMarkup(comment)) report(COMPLETES.xss.defense);
  };

  return (
    <div className="space-y-4 max-w-3xl">
      <p className="text-xs text-slate-300 leading-relaxed">Preview never executes markup. Exploit view detects unsafe HTML. Defense view escapes it.</p>
      <textarea value={comment} onChange={(e) => setComment(e.target.value)} rows={4} className="w-full bg-[#0a0f1d] border border-white/10 rounded-xl px-3 py-2 text-sm text-white font-mono" />
      <button onClick={publish} className="clay-pill-btn px-4 py-2 rounded-xl text-xs font-bold">Publish to sandbox preview</button>
      {rendered && (
        <div className="rounded-xl border border-white/10 bg-[#0a0f1d] p-3 space-y-2">
          <div className="text-[10px] font-mono uppercase text-slate-500">Preview</div>
          <div className="text-sm text-slate-100 break-words">{defense ? rendered : 'Comment hidden — markup detected'}</div>
          {!defense && looksLikeMarkup(comment) && <div className="text-xs text-rose-300 flex items-start gap-2"><AlertTriangle className="w-4 h-4 flex-shrink-0" /> Simulated only. Switch to Defense view.</div>}
          {defense && looksLikeMarkup(comment) && <div className="text-xs text-emerald-300 flex items-start gap-2"><CheckCircle2 className="w-4 h-4 flex-shrink-0" /> Escaped — tags stay text.</div>}
        </div>
      )}
    </div>
  );
}

function JwtLab({ mode, report }) {
  const [role, setRole] = useState('admin');
  const [result, setResult] = useState('');
  const defense = mode === 'defense';
  const token = `${b64url({ alg: defense ? 'HS256' : 'none', typ: 'JWT' })}.${b64url({ sub: 'cadet-102', role })}.${defense ? 'signed-lab-token' : ''}`;

  const verify = () => {
    if (!defense) {
      setResult(`Accepted unsigned token. Role claim: ${role}`);
      report(COMPLETES.jwt.exploit);
      return;
    }
    if (!token.endsWith('.signed-lab-token')) {
      setResult('Rejected: missing signature');
      return;
    }
    setResult('Rejected alg none. Only HS256 with a signature is accepted.');
    report(COMPLETES.jwt.defense);
  };

  return (
    <div className="space-y-4 max-w-3xl">
      <p className="text-xs text-slate-300">Practice JWT only. Exploit view accepts alg none. Defense view requires a signature algorithm.</p>
      <label className="text-xs text-slate-400 space-y-1 block">Claimed role
        <select value={role} onChange={(e) => setRole(e.target.value)} className="w-full bg-[#0a0f1d] border border-white/10 rounded-xl px-3 py-2 text-sm text-white">
          <option value="user">user</option>
          <option value="admin">admin</option>
        </select>
      </label>
      <pre className="text-xs font-mono p-3 rounded-xl border border-white/10 bg-[#0a0f1d] overflow-x-auto break-all">{token}</pre>
      <button onClick={verify} className="clay-pill-btn px-4 py-2 rounded-xl text-xs font-bold">Verify token</button>
      {result && <div className={`text-xs ${defense ? 'text-emerald-300' : 'text-rose-300'}`}>{result}</div>}
    </div>
  );
}

function PathLab({ mode, report }) {
  const [file, setFile] = useState('../../etc/passwd');
  const [out, setOut] = useState('');
  const defense = mode === 'defense';

  const readFile = () => {
    if (defense) {
      const safe = file.split(/[/\\]/).pop();
      const path = `/var/www/uploads/${safe}`;
      setOut(FAKE_FS[path] ? `SAFE READ ${path}\n${FAKE_FS[path]}` : `SAFE READ blocked: ${safe} is outside uploads`);
      if (file.includes('..')) report(COMPLETES.path.defense);
      return;
    }
    const joined = `/var/www/uploads/${file}`.replace(/\/+/g, '/');
    // naive traversal simulation
    const normalized = joined.includes('../') ? '/etc/passwd' : joined;
    setOut(FAKE_FS[normalized] ? `LEAKED ${normalized}\n${FAKE_FS[normalized]}` : 'File not found');
    if (file.includes('..')) report(COMPLETES.path.exploit);
  };

  return (
    <div className="space-y-4 max-w-3xl">
      <p className="text-xs text-slate-300">Mock upload reader. Exploit view follows ../ . Defense view uses basename only.</p>
      <input value={file} onChange={(e) => setFile(e.target.value)} className="w-full bg-[#0a0f1d] border border-white/10 rounded-xl px-3 py-2 text-sm text-white font-mono" />
      <button onClick={readFile} className="clay-pill-btn px-4 py-2 rounded-xl text-xs font-bold">Request file</button>
      {out && <pre className={`text-xs font-mono p-3 rounded-xl border whitespace-pre-wrap ${defense ? 'border-emerald-500/40 text-emerald-200' : 'border-rose-500/40 text-rose-200'}`}>{out}</pre>}
    </div>
  );
}

function HeadersLab({ mode, report }) {
  const defense = mode === 'defense';
  const [enabled, setEnabled] = useState({ csp: false, hsts: false, xfo: false });
  const [verdict, setVerdict] = useState('');

  useEffect(() => {
    setEnabled({ csp: defense, hsts: defense, xfo: defense });
    setVerdict('');
  }, [defense]);

  const audit = () => {
    if (!defense) {
      setVerdict('Missing CSP / HSTS / X-Frame-Options — clickjacking and inline script risk.');
      report(COMPLETES.headers.exploit);
      return;
    }
    const ok = enabled.csp && enabled.hsts && enabled.xfo;
    setVerdict(ok ? 'Perimeter hardened. CSP, HSTS, and X-Frame-Options are active.' : 'Enable all three headers.');
    if (ok) report(COMPLETES.headers.defense);
  };

  return (
    <div className="space-y-4 max-w-3xl">
      <p className="text-xs text-slate-300">Browser defense headers. Exploit view audits a soft config. Defense view turns the controls on.</p>
      {defense && (
        <div className="space-y-2">
          {[
            ['csp', 'Content-Security-Policy: default-src \'self\''],
            ['hsts', 'Strict-Transport-Security: max-age=31536000'],
            ['xfo', 'X-Frame-Options: DENY']
          ].map(([key, label]) => (
            <label key={key} className="flex items-start gap-2 text-xs text-slate-200">
              <input type="checkbox" checked={enabled[key]} onChange={(e) => setEnabled({ ...enabled, [key]: e.target.checked })} />
              <span className="font-mono">{label}</span>
            </label>
          ))}
        </div>
      )}
      <button onClick={audit} className="clay-pill-btn px-4 py-2 rounded-xl text-xs font-bold">{defense ? 'Apply & verify headers' : 'Audit soft config'}</button>
      {verdict && <div className={`text-xs ${defense && enabled.csp && enabled.hsts && enabled.xfo ? 'text-emerald-300' : 'text-rose-300'}`}>{verdict}</div>}
    </div>
  );
}

function PhishLab({ mode, report }) {
  const [flags, setFlags] = useState([]);
  const [rules, setRules] = useState({ typosquat: false, mismatch: false, macros: false });
  const [verdict, setVerdict] = useState('');
  const defense = mode === 'defense';

  const toggleFlag = (id) => {
    const next = flags.includes(id) ? flags.filter((item) => item !== id) : [...flags, id];
    setFlags(next);
    if (next.length >= 4) report(COMPLETES.phishing.exploit);
  };

  const testRule = () => {
    const ready = rules.typosquat && rules.mismatch && rules.macros;
    setVerdict(ready ? 'quarantine' : 'miss');
    if (ready) report(COMPLETES.phishing.defense);
  };

  return (
    <div className="space-y-4 max-w-3xl">
      <article className="rounded-2xl border border-white/10 bg-[#0e1321] p-4 space-y-2 text-sm">
        <div className="font-mono text-[11px] text-slate-400">From: PayPal Support &lt;support@paypa1.com&gt;</div>
        <div className="font-mono text-[11px] text-slate-400">Reply-To: billing@mail-security.example.lab</div>
        <div className="font-mono text-[11px] text-slate-400">Subject: Action required — account closes in 60 minutes</div>
        <p className="text-slate-200 text-sm pt-2">Verify now or the account will be locked. Visit paypal.com and open the attached invoice.</p>
        <button type="button" onClick={() => setVerdict('blocked-link')} className="text-cyan-300 underline text-xs">paypal.com</button>
        <div className="text-[11px] text-slate-500">href = https://example.lab/login · attachment: invoice.docm</div>
      </article>
      {!defense && (
        <div className="space-y-2">
          {PHISH_FLAGS.map((flag) => {
            const on = flags.includes(flag.id);
            return (
              <button key={flag.id} onClick={() => toggleFlag(flag.id)} className={`w-full text-left p-3 rounded-xl border text-xs ${on ? 'border-amber-400/60 bg-amber-950/30 text-amber-100' : 'border-white/10 bg-[#0a0f1d] text-slate-300'}`}>
                <div className="font-semibold">{flag.label}</div>
                {on && <div className="text-slate-400 mt-1">{flag.detail}</div>}
              </button>
            );
          })}
        </div>
      )}
      {defense && (
        <div className="space-y-3">
          {[
            ['typosquat', 'Quarantine lookalike brand domains'],
            ['mismatch', 'Quarantine mismatched link text vs href'],
            ['macros', 'Quarantine unexpected macro attachments']
          ].map(([key, label]) => (
            <label key={key} className="flex items-start gap-2 text-xs text-slate-200">
              <input type="checkbox" checked={rules[key]} onChange={(e) => setRules({ ...rules, [key]: e.target.checked })} />
              <span>{label}</span>
            </label>
          ))}
          <button onClick={testRule} className="clay-pill-btn px-4 py-2 rounded-xl text-xs font-bold">Test filter on sample</button>
          {verdict === 'quarantine' && <div className="text-xs text-emerald-300">Sample quarantined.</div>}
          {verdict === 'miss' && <div className="text-xs text-rose-300">Enable all three checks.</div>}
        </div>
      )}
      {verdict === 'blocked-link' && <div className="text-xs text-amber-200">Navigation blocked inside the lab.</div>}
    </div>
  );
}

function PasswordLab({ mode, report }) {
  const [log, setLog] = useState([]);
  const [running, setRunning] = useState(false);
  const timer = useRef(null);
  const defense = mode === 'defense';

  useEffect(() => () => clearInterval(timer.current), []);

  const start = () => {
    clearInterval(timer.current);
    setLog([]);
    setRunning(true);
    let index = 0;
    const limit = defense ? 3 : WORDLIST.length;
    const delay = defense ? 700 : 180;
    timer.current = setInterval(() => {
      const guess = WORDLIST[index];
      const matched = !defense && guess === 'letmein';
      setLog((prev) => [...prev, defense ? `attempt ${index + 1}: ${guess} — delayed by slow hash` : `attempt ${index + 1}: ${guess}${matched ? ' — match on fast hash' : ''}`]);
      index += 1;
      if (matched || index >= limit) {
        clearInterval(timer.current);
        setRunning(false);
        if (defense) {
          setLog((prev) => [...prev, 'rate limit reached — remaining guesses rejected']);
          report(COMPLETES.password.defense);
        } else if (matched) {
          report(COMPLETES.password.exploit);
        }
      }
    }, delay);
  };

  return (
    <div className="space-y-4 max-w-3xl">
      <p className="text-xs text-slate-300">Six-word practice list only. Fast hash vs slow hash + rate limit.</p>
      <div className="flex flex-wrap gap-2">
        {WORDLIST.map((word) => <span key={word} className="px-2 py-1 rounded-lg bg-[#0a0f1d] border border-white/10 font-mono text-xs text-slate-300">{word}</span>)}
      </div>
      <button disabled={running} onClick={start} className="clay-pill-btn px-4 py-2 rounded-xl text-xs font-bold disabled:opacity-50">
        {running ? 'Running…' : defense ? 'Retest with the slow hash' : 'Run the fast comparison'}
      </button>
      <div className="rounded-xl border border-white/10 bg-[#0a0f1d] p-3 min-h-24 font-mono text-[11px] text-slate-300 space-y-1">
        {log.length === 0 && <div className="text-slate-500">Waiting for a run.</div>}
        {log.map((line, index) => <div key={`${line}-${index}`}>{line}</div>)}
      </div>
    </div>
  );
}
