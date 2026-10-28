import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowLeft, 
  Terminal, 
  BookOpen, 
  Shield, 
  Award, 
  Zap, 
  CheckCircle2, 
  Play, 
  Sparkles, 
  AlertTriangle, 
  Code, 
  HelpCircle, 
  ChevronRight, 
  Layers,
  Compass,
  FileCode,
  ShieldAlert,
  Search,
  Radio,
  Cpu,
  Check
} from 'lucide-react';

const MODULE_THEORY_DETAILS = {
  'mod-1': {
    threatScenario: "During an active cyber intrusion or forensic audit, incident responders must quickly orient themselves on compromised Linux servers without relying on a GUI desktop. Attackers frequently conceal backdoor web shells and payloads inside hidden dotfiles (e.g. `.system_daemon` or `.bash_profile`). Mastering filesystem hierarchy and path orientation prevents catastrophic mistakes and exposes hidden threats.",
    mitreTactic: "MITRE ATT&CK: T1083 (File and Directory Discovery)",
    keyConcepts: [
      {
        title: "The Single Root Tree (/)",
        desc: "Unlike Windows with drive letters (C:\\, D:\\), Linux mounts every partition, drive, and virtual device under a single unified root directory: /."
      },
      {
        title: "Path Shorthands (. vs .. vs ~)",
        desc: "'.' represents the current directory. '..' refers to the parent directory one level up. '~' is the current user's home folder (/home/student)."
      },
      {
        title: "Hidden Dotfiles & Persistence",
        desc: "Files starting with a period (like .env or .bash_history) are hidden from normal 'ls'. Attackers use this to hide backdoor staging scripts."
      }
    ],
    syntaxCards: [
      { cmd: 'pwd', name: 'Print Working Directory', usage: 'pwd', explanation: 'Outputs your absolute pathname starting from root (/home/student).' },
      { cmd: 'ls -la', name: 'List All Detailed', usage: 'ls -la [path]', explanation: '-l shows permissions, owner, size, date. -a reveals hidden dotfiles.' },
      { cmd: 'cd <path>', name: 'Change Directory', usage: 'cd ~/defense/audit', explanation: 'Navigates relative to current path or using absolute paths.' },
      { cmd: 'mkdir -p <dir>', name: 'Make Parent Directories', usage: 'mkdir -p a/b/c', explanation: '-p creates parent directories without throwing errors if they exist.' }
    ],
    knowledgeCheck: {
      question: "Which command reveals hidden backdoor dotfiles along with their permission octals?",
      options: [
        { text: "ls -la", correct: true, explanation: "Correct! -a shows all files including hidden dotfiles, and -l displays full permission details." },
        { text: "pwd", correct: false, explanation: "Incorrect. pwd only outputs your current working directory path." },
        { text: "cd ..", correct: false, explanation: "Incorrect. cd .. moves one directory up." },
        { text: "mkdir -p", correct: false, explanation: "Incorrect. mkdir -p creates directories." }
      ]
    }
  },
  'mod-2': {
    threatScenario: "When conducting digital incident response, preserving evidentiary integrity is paramount. Opening suspect logs or malware samples with graphical editors can alter timestamps (mtime/atime) or crash memory. Blue team defenders use lightweight, non-destructive stream readers like cat, head, and tail to inspect records safely.",
    mitreTactic: "MITRE ATT&CK: T1005 (Data from Local System)",
    keyConcepts: [
      {
        title: "Everything is a File",
        desc: "In POSIX systems, devices, sockets, logs, and processes are accessed via file descriptors. Inspecting files safely is the foundation of defense."
      },
      {
        title: "Stream Reading (head vs tail)",
        desc: "Use 'head -n 5' to inspect headers, and 'tail -n 10' to inspect recent attack entries without loading massive gigabyte log files into memory."
      },
      {
        title: "Evidence Duplication (cp)",
        desc: "Always duplicate raw incident logs into a forensic analysis directory before running analysis scripts to prevent data loss."
      }
    ],
    syntaxCards: [
      { cmd: 'cat <file>', name: 'Concatenate & Read', usage: 'cat /var/log/auth.log', explanation: 'Streams entire file content directly to standard output.' },
      { cmd: 'head -n <N>', name: 'Top N Lines', usage: 'head -n 3 /var/log/auth.log', explanation: 'Inspects the earliest recorded events without loading the rest.' },
      { cmd: 'tail -n <N>', name: 'Bottom N Lines', usage: 'tail -n 20 /var/log/auth.log', explanation: 'Inspects the most recent attack events logged by daemons.' },
      { cmd: 'cp <src> <dst>', name: 'Preserve Copy', usage: 'cp /var/log/auth.log ~/evidence.log', explanation: 'Preserves raw evidence for chain-of-custody verification.' }
    ],
    knowledgeCheck: {
      question: "Why do defenders avoid opening large multi-gigabyte server logs with heavy text editors?",
      options: [
        { text: "It can corrupt timestamps, exhaust system RAM, or crash the server", correct: true, explanation: "Correct! Lightweight stream readers like head/tail preserve system stability and evidence integrity." },
        { text: "Text editors automatically delete logs", correct: false, explanation: "Incorrect. Editors don't delete logs automatically, but they can alter timestamps or crash." },
        { text: "Linux forbids text editors from opening files", correct: false, explanation: "Incorrect. Editors can be opened, but it's dangerous on live production systems." }
      ]
    }
  },
  'mod-3': {
    threatScenario: "Improper access control (CWE-732) is one of the leading root causes of server compromise. Attackers scan Linux servers for files with world-writable permissions (chmod 777) or misconfigured SUID binaries to escalate their privileges from an unprivileged user directly to root (Ring 0).",
    mitreTactic: "MITRE ATT&CK: T1548.001 (Setuid and Setgid Abuse)",
    keyConcepts: [
      {
        title: "The Three Entity Tiers (u / g / o)",
        desc: "Permissions are evaluated in strict order: Owner (User), Group Members, and Others (World)."
      },
      {
        title: "Octal Notation (r=4, w=2, x=1)",
        desc: "Read is 4, Write is 2, Execute is 1. Standard secure file mode is 644 (rw-r--r--). Executable mode is 755 (rwxr-xr-x)."
      },
      {
        title: "The Danger of chmod 777",
        desc: "chmod 777 gives every user and rogue process write access, allowing attackers to overwrite scripts and execute arbitrary commands."
      }
    ],
    syntaxCards: [
      { cmd: 'ls -l <file>', name: 'Inspect Octal String', usage: 'ls -l /secret/flag.txt', explanation: 'Reads the 10-character mode string (-rwxr-xr-x) and ownership.' },
      { cmd: 'chmod 644 <file>', name: 'Least Privilege Mode', usage: 'chmod 644 /secret/flag.txt', explanation: 'Owner can read/write; group and others can only read.' },
      { cmd: 'chmod +x <file>', name: 'Make Executable', usage: 'chmod +x ~/scanner.py', explanation: 'Grants execute permissions to run automation scripts.' }
    ],
    knowledgeCheck: {
      question: "What does chmod 644 grant on a sensitive configuration file?",
      options: [
        { text: "Owner read & write; group and others read-only", correct: true, explanation: "Correct! 6 (4+2 = rw) for owner, 4 (r) for group, 4 (r) for others." },
        { text: "Full read, write, execute for everyone", correct: false, explanation: "Incorrect. That would be chmod 777." },
        { text: "Only root can read the file", correct: false, explanation: "Incorrect. That would be chmod 600 or 400." }
      ]
    }
  },
  'mod-4': {
    threatScenario: "Enterprise servers record millions of log lines every day. Defenders cannot review logs manually line-by-line. Using grep (Global Regular Expression Print) and Unix command pipelines (|), security analysts isolate automated SSH brute-force bots, anomalous authentication spikes, and unauthorized sudo escalations in seconds.",
    mitreTactic: "MITRE ATT&CK: T1110 (Brute Force Credential Access)",
    keyConcepts: [
      {
        title: "Pattern Matching with grep",
        desc: "grep searches through lines of text for specific strings or regular expressions, suppressing all unneeded noise."
      },
      {
        title: "The Pipe (|) Conduit",
        desc: "Pipes chain utilities: the standard output (stdout) of command 1 flows directly into the standard input (stdin) of command 2."
      },
      {
        title: "Output Redirection (> vs >>)",
        desc: "'>' overwrites a destination report file, while '>>' appends new forensic findings without destroying existing data."
      }
    ],
    syntaxCards: [
      { cmd: 'grep "pattern" <file>', name: 'Pattern Filtering', usage: 'grep "Failed" /var/log/auth.log', explanation: 'Filters only lines matching the attack signature.' },
      { cmd: 'cmd1 | cmd2', name: 'Command Chaining', usage: 'cat auth.log | grep Failed | wc -l', explanation: 'Counts total failed authentication attack events.' },
      { cmd: 'cmd > file', name: 'Write Forensic Report', usage: 'grep Failed auth.log > report.txt', explanation: 'Redirects filtered output into a persistent incident report.' }
    ],
    knowledgeCheck: {
      question: "Which pipe pipeline counts the exact number of failed login attempts in auth.log?",
      options: [
        { text: "cat /var/log/auth.log | grep Failed | wc -l", correct: true, explanation: "Correct! Streams the file, isolates 'Failed' lines, and wc -l counts the lines." },
        { text: "pwd | chmod 777", correct: false, explanation: "Incorrect. That has nothing to do with log counting." },
        { text: "touch /var/log/auth.log", correct: false, explanation: "Incorrect. touch only creates or touches a file." }
      ]
    }
  },
  'mod-5': {
    threatScenario: "Adversaries often inject malicious background daemons (such as crypto miners like xmrig, reverse TCP shells, or unauthorized listener bots) and persist them using cron jobs. Blue team defenders must inspect process tables, identify Parent Process IDs (PPID), and terminate rogue signals cleanly without crashing critical operating system daemons.",
    mitreTactic: "MITRE ATT&CK: T1059 (Command and Scripting Interpreter) & T1053 (Scheduled Task/Job)",
    keyConcepts: [
      {
        title: "Process Trees & PPID Hierarchy",
        desc: "Every process is spawned by a parent (PPID). If you kill a child process without isolating the parent daemon or cron schedule, it immediately respawns."
      },
      {
        title: "Process Inspection (ps aux)",
        desc: "ps aux reveals PID, user, %CPU, %MEM, and the exact CLI arguments used to launch the binary."
      },
      {
        title: "Signals (SIGTERM 15 vs SIGKILL 9)",
        desc: "kill -15 requests graceful termination; kill -9 forces immediate kernel-level termination of unresponsive rogue payloads."
      }
    ],
    syntaxCards: [
      { cmd: 'ps aux', name: 'Audit Active Processes', usage: 'ps aux | grep miner', explanation: 'Lists all running processes across all users with CPU/memory usage.' },
      { cmd: 'kill -9 <PID>', name: 'Force Terminate', usage: 'kill -9 1337', explanation: 'Sends SIGKILL to force-terminate an unauthorized malicious PID.' },
      { cmd: 'crontab -l', name: 'Audit Scheduled Tasks', usage: 'crontab -l', explanation: 'Audits scheduled cron tasks that may auto-respawn persistence payloads.' }
    ],
    knowledgeCheck: {
      question: "Why might a terminated rogue miner process immediately respawn after being killed?",
      options: [
        { text: "A parent daemon or scheduled cron job is re-launching it", correct: true, explanation: "Correct! Always inspect PPID and scheduled cron entries to eradicate persistence." },
        { text: "Linux processes can never be killed", correct: false, explanation: "Incorrect. kill -9 terminates any process, but cron can respawn it." },
        { text: "The RAM has a hardware virus", correct: false, explanation: "Incorrect. Process respawning is handled by software supervisors or cron." }
      ]
    }
  },
  'mod-6': {
    threatScenario: "Compromised servers often open rogue listening ports to communicate with Command and Control (C2) servers or exfiltrate sensitive data. Defensive administrators audit local network sockets using netstat, ifconfig, and ping to detect unauthorized network bindings and firewall bypasses.",
    mitreTactic: "MITRE ATT&CK: T1049 (System Network Connections Discovery)",
    keyConcepts: [
      {
        title: "Interface Auditing (ifconfig / ip a)",
        desc: "Examine IP addresses, MAC addresses, and network subnet masks to verify perimeter exposure."
      },
      {
        title: "Network Probing (ping)",
        desc: "Tests ICMP connectivity and packet round-trip latency to defensive gateway endpoints."
      },
      {
        title: "HTTP Inspection (curl -I)",
        desc: "Fetches remote HTTP header status codes to audit web firewalls and reverse proxies."
      }
    ],
    syntaxCards: [
      { cmd: 'ifconfig', name: 'Interface Configuration', usage: 'ifconfig eth0', explanation: 'Displays assigned IPv4 address and network interface state.' },
      { cmd: 'ping -c <N> <host>', name: 'ICMP Echo Test', usage: 'ping -c 3 127.0.0.1', explanation: 'Sends N test packets to verify network routing and latency.' },
      { cmd: 'curl -I <URL>', name: 'Inspect HTTP Headers', usage: 'curl -I http://localhost:8080', explanation: 'Retrieves server response headers without downloading full payload bodies.' }
    ],
    knowledgeCheck: {
      question: "Which command retrieves HTTP response headers to verify if an endpoint is responding?",
      options: [
        { text: "curl -I <URL>", correct: true, explanation: "Correct! The -I flag performs a HEAD request to inspect HTTP response headers." },
        { text: "mkdir -p", correct: false, explanation: "Incorrect. That creates directory folders." },
        { text: "chmod 600", correct: false, explanation: "Incorrect. That modifies file permissions." }
      ]
    }
  },
  'mod-web-1': {
    threatScenario: "SQL Injection (CWE-89) remains one of the most destructive web application vulnerabilities in history. Attackers manipulate backend database queries by appending SQL syntax via unsanitized input fields. A successful injection can bypass authentication, dump customer tables, alter account balances, or even execute operating system commands via database xp_cmdshell extensions.",
    mitreTactic: "MITRE ATT&CK: T1190 (Exploit Public-Facing Application)",
    keyConcepts: [
      {
        title: "Dynamic String Concatenation Flaw",
        desc: "Constructing SQL queries using string addition ($query = 'SELECT * FROM users WHERE user = ' + input) allows user input to break out of data context into executable code context."
      },
      {
        title: "Boolean Tautology (' OR '1'='1)",
        desc: "Injecting logic that always evaluates to true forces the query to return matching database rows regardless of passwords."
      },
      {
        title: "Parameterized Prepared Statements",
        desc: "Separates SQL logic from data parameters. The database engine pre-compiles query structure before binding user values, making injection mathematically impossible."
      }
    ],
    syntaxCards: [
      { cmd: 'cat login.php', name: 'Source Inspection', usage: 'cat /var/www/html/vulnerable_app/login.php', explanation: 'Examine raw database query string construction.' },
      { cmd: 'grep "SELECT" <file>', name: 'Query Signature Audit', usage: 'grep "SELECT" login.php', explanation: 'Filter for raw database queries lacking prepared statements.' },
      { cmd: '$pdo->prepare()', name: 'Parameterized Query', usage: 'cat login_secure.php', explanation: 'Uses parameter placeholders (:u, :p) to immunize the application.' }
    ],
    knowledgeCheck: {
      question: "Why do parameterized prepared statements definitively prevent SQL Injection?",
      options: [
        { text: "The database engine compiles query structure before binding parameters as pure data", correct: true, explanation: "Correct! User parameters are treated purely as literal values, never executable syntax." },
        { text: "Prepared statements encrypt the MySQL database", correct: false, explanation: "Incorrect. Prepared statements separate code and data, but do not encrypt tables." },
        { text: "They block all single quotes automatically", correct: false, explanation: "Incorrect. They handle quotes cleanly without needing ad-hoc string filtering." }
      ]
    }
  },
  'mod-web-2': {
    threatScenario: "Cross-Site Scripting (CWE-79) enables attackers to execute client-side scripts inside the browser sessions of legitimate visitors. Attackers abuse unescaped user comments or search bars to steal session cookies (document.cookie), redirect users to credential harvesting phishing portals, or perform actions on their behalf.",
    mitreTactic: "MITRE ATT&CK: T1059.007 (JavaScript Execution)",
    keyConcepts: [
      {
        title: "The innerHTML Trap",
        desc: "Assigning untrusted text directly to element.innerHTML forces the browser DOM to evaluate any embedded <script> tags as executable code."
      },
      {
        title: "Cookie Theft & Session Hijacking",
        desc: "Scripts that read document.cookie can transmit sensitive session identifiers to an external adversary server via fetch or image beacons."
      },
      {
        title: "Context-Aware Sanitization",
        desc: "Using battle-tested sanitizers like DOMPurify strips malicious execution tags while safely preserving allowed markup."
      }
    ],
    syntaxCards: [
      { cmd: 'cat comment.js', name: 'DOM Handler Audit', usage: 'cat comment.js', explanation: 'Identify direct assignment to innerHTML.' },
      { cmd: 'DOMPurify.sanitize()', name: 'Safe DOM Cleaner', usage: 'cat comment_secure.js', explanation: 'Removes dangerous tags and event handlers (onload, onerror).' }
    ],
    knowledgeCheck: {
      question: "Which DOM property assignment is vulnerable to Cross-Site Scripting when handling user input?",
      options: [
        { text: "element.innerHTML = userInput", correct: true, explanation: "Correct! innerHTML parses and executes any HTML/script tags contained in the string." },
        { text: "element.textContent = userInput", correct: false, explanation: "Incorrect. textContent treats input as plain text and is safe from XSS." },
        { text: "element.setAttribute('id', 'safe')", correct: false, explanation: "Incorrect. Setting a safe attribute does not parse script tags." }
      ]
    }
  },
  'mod-web-3': {
    threatScenario: "Stateless JSON Web Tokens (JWT) are commonly deployed for microservice authentication. When server-side verifiers misconfigure token decoders to accept the 'none' signature algorithm, attackers can forge valid administrative tokens by simply modifying the payload and omitting the signature entirely.",
    mitreTactic: "MITRE ATT&CK: T1552 (Unsecured Credentials)",
    keyConcepts: [
      {
        title: "JWT Tripartite Anatomy",
        desc: "A JWT consists of 3 Base64URL sections: Header (algorithm), Payload (claims like user and role), and Signature."
      },
      {
        title: "The 'alg': 'none' Catastrophe",
        desc: "Some libraries allow tokens to specify 'none' for testing. If enabled in production, the server skips cryptographic verification altogether."
      },
      {
        title: "Strict Algorithm Whitelisting",
        desc: "Servers must strictly enforce known cryptographic algorithms (e.g. HS256, RS256) and reject any unrecognized header."
      }
    ],
    syntaxCards: [
      { cmd: 'cat auth_header.txt', name: 'Inspect Token', usage: 'cat auth_header.txt', explanation: 'Inspect decoded JWT header segments.' },
      { cmd: 'grep "none" <file>', name: 'Algorithm Audit', usage: 'grep "none" auth_header.txt', explanation: 'Search for insecure unsigned algorithm declarations.' }
    ],
    knowledgeCheck: {
      question: "What danger arises if a server accepts JWT tokens with 'alg': 'none'?",
      options: [
        { text: "Attackers can forge arbitrary administrative tokens without knowing the secret key", correct: true, explanation: "Correct! The server trusts the payload without verifying any digital signature." },
        { text: "The server CPU usage spikes to 100%", correct: false, explanation: "Incorrect. Algorithm 'none' takes less CPU, but creates an auth bypass." },
        { text: "The database deletes all user records", correct: false, explanation: "Incorrect. It bypasses authorization, but does not wipe data." }
      ]
    }
  },
  'mod-web-4': {
    threatScenario: "Path Traversal (CWE-22) occurs when user-supplied file paths are passed directly into filesystem APIs without containment. By appending dot-dot-slash sequence indicators (../../), attackers escape restricted web uploads directories to view /etc/passwd, configuration secrets, or private keys.",
    mitreTactic: "MITRE ATT&CK: T1083 (File and Directory Discovery)",
    keyConcepts: [
      {
        title: "Directory Boundary Escape",
        desc: "Each '../' moves up one directory level. Even if an endpoint expects 'avatar.png', supplying '../../etc/passwd' navigates out of the webroot."
      },
      {
        title: "Null-Byte & Encoding Bypasses",
        desc: "Attackers often use URL encoding (%2e%2e%2f) to circumvent naive string blacklists."
      },
      {
        title: "path.basename Whitelisting",
        desc: "Stripping directory paths using path.basename(input) ensures only the filename is accessed within a fixed directory sandbox."
      }
    ],
    syntaxCards: [
      { cmd: 'cat server.js', name: 'Inspect Endpoint', usage: 'cat server.js', explanation: 'Identify direct concatenation into fs.readFile.' },
      { cmd: 'path.basename()', name: 'Filename Extraction', usage: 'cat server_secure.js', explanation: 'Enforces pure filename isolation without path elements.' }
    ],
    knowledgeCheck: {
      question: "How does path.basename('foo/../../etc/passwd') protect against directory traversal?",
      options: [
        { text: "It discards all parent directory paths and extracts only 'passwd'", correct: true, explanation: "Correct! It isolates the terminal filename, preventing traversal outside target folders." },
        { text: "It encrypts the target file with AES-256", correct: false, explanation: "Incorrect. It is a path manipulation utility, not an encryptor." },
        { text: "It deletes the file from disk", correct: false, explanation: "Incorrect. It does not touch filesystem contents." }
      ]
    }
  },
  'mod-web-5': {
    threatScenario: "Security Misconfiguration (OWASP A05) is the most widespread vulnerability across modern clouds. Web servers running without defense headers expose users to clickjacking, protocol downgrade attacks, and malicious script execution from rogue CDN domains.",
    mitreTactic: "MITRE ATT&CK: T1562 (Impair Defenses)",
    keyConcepts: [
      {
        title: "Content-Security-Policy (CSP)",
        desc: "Defines approved sources of content (scripts, images, stylesheets). Restricts unauthorized script injection."
      },
      {
        title: "Strict-Transport-Security (HSTS)",
        desc: "Enforces HTTPS connections and prevents SSL stripping / downgrade attacks."
      },
      {
        title: "X-Frame-Options: DENY",
        desc: "Prevents other malicious websites from framing your application inside an invisible <iframe> to steal clicks."
      }
    ],
    syntaxCards: [
      { cmd: 'cat security_headers.conf', name: 'Audit Headers', usage: 'cat /etc/nginx/security_headers.conf', explanation: 'Inspect perimeter HTTP defense directives.' },
      { cmd: 'grep "CSP" <file>', name: 'Filter Directives', usage: 'grep "Content-Security-Policy" security_headers.conf', explanation: 'Verify active script source whitelists.' }
    ],
    knowledgeCheck: {
      question: "Which HTTP header prevents an application from being framed inside malicious clickjacking iframes?",
      options: [
        { text: "X-Frame-Options: DENY", correct: true, explanation: "Correct! Instructs browsers to reject rendering the page in any <frame> or <iframe>." },
        { text: "Accept: application/json", correct: false, explanation: "Incorrect. Accept indicates client MIME type preferences." },
        { text: "User-Agent: Mozilla/5.0", correct: false, explanation: "Incorrect. User-Agent identifies the browser client." }
      ]
    }
  },
  'mod-net-1': {
    threatScenario: "Denial of Service (DoS) attacks target availability—one of the core pillars of the CIA security triad. In a TCP SYN Flood, an adversary transmits millions of spoofed SYN packets to port 80. The server allocates socket memory and waits for ACK replies that never arrive, exhausting kernel memory and dropping legitimate user requests.",
    mitreTactic: "MITRE ATT&CK: T1498 (Network Denial of Service)",
    keyConcepts: [
      {
        title: "The 3-Way Handshake Steps",
        desc: "1. Client sends SYN (Synchronize). 2. Server replies SYN-ACK. 3. Client sends ACK (Acknowledge) to establish the socket."
      },
      {
        title: "The SYN_RECV Backlog State",
        desc: "Between receiving SYN and ACK, sockets remain in SYN_RECV. Operating systems have a finite maximum queue size (somaxconn)."
      },
      {
        title: "SYN Cookie Mitigation",
        desc: "Defensive kernels encode connection state into the initial sequence number, eliminating memory allocation until the final ACK arrives."
      }
    ],
    syntaxCards: [
      { cmd: 'cat syn_flood.log', name: 'Audit Packet Log', usage: 'cat /var/log/network/syn_flood.log', explanation: 'Inspect recorded half-open connection attempts.' },
      { cmd: 'grep "SYN_RECV" <file> | wc -l', name: 'Count Floods', usage: 'grep SYN_RECV syn_flood.log | wc -l', explanation: 'Measure the intensity of incoming half-open socket requests.' }
    ],
    knowledgeCheck: {
      question: "What state does a server socket enter after receiving a TCP SYN packet while awaiting the final ACK?",
      options: [
        { text: "SYN_RECV", correct: true, explanation: "Correct! The server holds socket state in SYN_RECV until the client sends ACK or timeout expires." },
        { text: "ESTABLISHED", correct: false, explanation: "Incorrect. ESTABLISHED is only reached after the final ACK." },
        { text: "TIME_WAIT", correct: false, explanation: "Incorrect. TIME_WAIT is a connection termination state." }
      ]
    }
  },
  'mod-net-2': {
    threatScenario: "Network sniffing on unencrypted links exposes cleartext credentials to anyone on the same broadcast domain or malicious WiFi access point. Security analysts capture packets in PCAP format and reconstruct application streams to uncover compromised credentials.",
    mitreTactic: "MITRE ATT&CK: T1040 (Network Sniffing)",
    keyConcepts: [
      {
        title: "Plaintext vs Encrypted Transport",
        desc: "Protocols like HTTP, FTP, and Telnet transmit passwords in plaintext. TLS/HTTPS encrypts payloads using asymmetric handshakes."
      },
      {
        title: "Packet Filtering & Stream Reassembly",
        desc: "Isolates application layer frames (Layer 7) from transport headers to reconstruct POST bodies."
      }
    ],
    syntaxCards: [
      { cmd: 'cat capture_summary.txt', name: 'Review Packet Flow', usage: 'cat ~/pcaps/capture_summary.txt', explanation: 'Inspect captured frames across network interfaces.' },
      { cmd: 'grep "password=" <file>', name: 'Credential Isolation', usage: 'grep "password=" capture_summary.txt', explanation: 'Search payload streams for leaked cleartext authentication tokens.' }
    ],
    knowledgeCheck: {
      question: "Why does unencrypted HTTP pose a severe security risk on shared local networks?",
      options: [
        { text: "Anyone on the network path can read passwords and session cookies in plaintext", correct: true, explanation: "Correct! Without TLS encryption, packet sniffers capture full credentials in flight." },
        { text: "It causes computers to overheat", correct: false, explanation: "Incorrect. Protocol encryption affects security, not physical hardware temperature." },
        { text: "HTTP only works on localhost", correct: false, explanation: "Incorrect. HTTP functions across all network routers." }
      ]
    }
  },
  'mod-net-3': {
    threatScenario: "Address Resolution Protocol (ARP) translates 32-bit IP addresses into 48-bit MAC addresses. Because ARP lacks authentication, an attacker can broadcast fake gratuitous ARP messages claiming to own the IP of the default gateway (10.0.0.1). All client traffic is redirected through the adversary machine (Man-In-The-Middle).",
    mitreTactic: "MITRE ATT&CK: T1557.002 (ARP Cache Poisoning)",
    keyConcepts: [
      {
        title: "Gratuitous ARP Exploitation",
        desc: "Hosts update their ARP tables whenever receiving an ARP reply, even if they never sent a query."
      },
      {
        title: "Duplicate MAC Indicator",
        desc: "When two different IP addresses (or the gateway) resolve to the attacker's physical hardware address, an ARP spoofing attack is underway."
      },
      {
        title: "Dynamic ARP Inspection (DAI)",
        desc: "Managed switches inspect ARP packets against a DHCP snooping database and drop unauthorized replies."
      }
    ],
    syntaxCards: [
      { cmd: 'cat arp_cache.txt', name: 'Inspect ARP Table', usage: 'cat ~/pcaps/arp_cache.txt', explanation: 'Examine active IP-to-MAC hardware bindings.' },
      { cmd: 'grep "10.0.0.1" <file>', name: 'Gateway Collision Audit', usage: 'grep "10.0.0.1" arp_cache.txt', explanation: 'Detect duplicate MAC entries claiming gateway identity.' }
    ],
    knowledgeCheck: {
      question: "What clear anomaly in an ARP table indicates an active ARP cache poisoning attack?",
      options: [
        { text: "The default gateway IP maps to a duplicate MAC address used by another host", correct: true, explanation: "Correct! Two different devices claiming the same MAC address is the signature of ARP spoofing." },
        { text: "The IP address starts with 192", correct: false, explanation: "Incorrect. 192.168.0.0/16 is standard private IP space." },
        { text: "All packets are transmitted over UDP", correct: false, explanation: "Incorrect. ARP operates at Layer 2 (Data Link)." }
      ]
    }
  },
  'mod-net-4': {
    threatScenario: "DNS is universally allowed through corporate firewalls (UDP port 53). Attackers abuse this by encoding stolen data into subdomains of an attacker-controlled domain (e.g. `dXNlcj1hZG1pbj...c2beacon.net`). When the victim resolves the query, the recursive DNS server forwards the stolen data straight to the adversary's authoritative nameserver.",
    mitreTactic: "MITRE ATT&CK: T1071.004 (DNS Tunneling)",
    keyConcepts: [
      {
        title: "Covert Channels over DNS",
        desc: "Firewalls typically inspection-exempt DNS queries, allowing bidirectional C2 communication and exfiltration."
      },
      {
        title: "High-Entropy Subdomain Signatures",
        desc: "Legitimate domains have human-readable names. Tunneling queries feature high randomness and Base64 padding (length > 50 chars)."
      },
      {
        title: "DNS Rate Limiting & RPZ",
        desc: "Response Policy Zones (RPZ) and anomaly detection flag sudden spikes in unique subdomain lookups."
      }
    ],
    syntaxCards: [
      { cmd: 'cat dns_queries.log', name: 'Inspect Query Stream', usage: 'cat /var/log/network/dns_queries.log', explanation: 'Audit outbound DNS requests from endpoints.' },
      { cmd: 'grep "c2beacon" <file>', name: 'Isolate Malicious Domains', usage: 'grep "c2beacon" dns_queries.log', explanation: 'Extract encoded exfiltration queries.' }
    ],
    knowledgeCheck: {
      question: "Why do attackers utilize DNS tunneling for data exfiltration?",
      options: [
        { text: "Firewalls typically permit outbound UDP 53 DNS traffic without inspecting subdomain payload entropy", correct: true, explanation: "Correct! DNS queries traverse boundary firewalls to recursive resolvers unimpeded." },
        { text: "DNS transfers files faster than gigabit Ethernet", correct: false, explanation: "Incorrect. DNS is high latency and slow, but offers stealth." },
        { text: "DNS automatically cracks passwords", correct: false, explanation: "Incorrect. DNS only resolves names to IP addresses." }
      ]
    }
  },
  'mod-soc-1': {
    threatScenario: "Security Information and Event Management (SIEM) engines ingest gigabytes of syslog, auditd, and firewall telemetry every hour. SOC analysts must quickly filter noise, identify correlated events, and prioritize CRITICAL severity incidents before attackers complete lateral movement.",
    mitreTactic: "MITRE ATT&CK: T1078 (Valid Accounts & Alert Triage)",
    keyConcepts: [
      {
        title: "Alert Severity Hierarchy",
        desc: "Events are ranked INFO (telemetry), LOW/MEDIUM (policy deviation), HIGH (threat detected), CRITICAL (active data loss or encryption in progress)."
      },
      {
        title: "Event Correlation",
        desc: "Connecting 5 failed SSH logins followed by 1 successful login and immediate sudo execution triggers elevated triage priority."
      }
    ],
    syntaxCards: [
      { cmd: 'cat alerts.json', name: 'Stream SIEM Telemetry', usage: 'cat /var/log/siem/alerts.json', explanation: 'Review raw structured SIEM telemetry alerts.' },
      { cmd: 'grep "CRITICAL" <file>', name: 'Isolate Critical Incidents', usage: 'grep "CRITICAL" alerts.json', explanation: 'Focus triage queue on high-impact emergency threats.' }
    ],
    knowledgeCheck: {
      question: "What is the primary objective of alert triage in a Security Operations Center?",
      options: [
        { text: "Prioritize high-severity threats while eliminating false positive noise", correct: true, explanation: "Correct! Triage ensures analysts dedicate attention to true positive high-impact emergencies." },
        { text: "Delete all system logs to free up disk space", correct: false, explanation: "Incorrect. Deleting logs destroys critical evidence." },
        { text: "Reboot every computer in the organization", correct: false, explanation: "Incorrect. Mass reboots destroy volatile RAM evidence." }
      ]
    }
  },
  'mod-soc-2': {
    threatScenario: "Ransomware operators communicate with their Command and Control (C2) servers via periodic network beacons to receive encryption keys and command instructions. Identifying beaconing patterns in outbound traffic is the critical window to isolate infected machines before widespread encryption strikes.",
    mitreTactic: "MITRE ATT&CK: T1486 (Data Encrypted for Impact) & T1071 (Application Layer Protocol)",
    keyConcepts: [
      {
        title: "Beacon Regularity & Jitter",
        desc: "Automated beacons fire at regular intervals (e.g. every 60s). Attackers add randomized 'jitter' (±10%) to evade simple interval filters."
      },
      {
        title: "Egress Filtering",
        desc: "Monitoring outbound POST requests to unknown external IP addresses exposes active C2 channels."
      }
    ],
    syntaxCards: [
      { cmd: 'cat c2_egress.log', name: 'Analyze Egress Log', usage: 'cat /var/log/siem/c2_egress.log', explanation: 'Inspect outbound HTTP requests for regular heartbeat patterns.' },
      { cmd: 'grep "203.0.113.88" <file>', name: 'Isolate Adversary IP', usage: 'grep "203.0.113.88" c2_egress.log', explanation: 'Extract the C2 controller IP for immediate firewall blocking.' }
    ],
    knowledgeCheck: {
      question: "What characteristic indicates that outbound network traffic is an automated C2 beacon?",
      options: [
        { text: "Requests recur at fixed or semi-regular intervals (jitter) to an unrecognized external IP", correct: true, explanation: "Correct! Predictable periodic check-ins indicate automated software beaconing." },
        { text: "The network cable is green", correct: false, explanation: "Incorrect. Cable color is completely irrelevant." },
        { text: "The user is browsing Wikipedia", correct: false, explanation: "Incorrect. Legitimate user web browsing shows sporadic, irregular request bursts." }
      ]
    }
  },
  'mod-soc-3': {
    threatScenario: "When responding to sophisticated intrusions, SOC analysts reconstruct the entire timeline using the Cyber Kill Chain and MITRE ATT&CK framework. Understanding whether the adversary is in the Delivery, Exploitation, or Exfiltration stage dictates whether containment, eradication, or forensic capture is prioritized.",
    mitreTactic: "MITRE ATT&CK: Enterprise Framework Matrix",
    keyConcepts: [
      {
        title: "Lockheed Martin 7-Phase Kill Chain",
        desc: "Reconnaissance -> Weaponization -> Delivery -> Exploitation -> Installation -> Command & Control (C2) -> Actions on Objectives."
      },
      {
        title: "Breaking the Chain",
        desc: "Disrupting any single link in the kill chain halts the entire attack progression and prevents adversary objectives."
      }
    ],
    syntaxCards: [
      { cmd: 'cat kill_chain.txt', name: 'Incident Timeline', usage: 'cat ~/defense/kill_chain_incident_104.txt', explanation: 'Read documented phases of the security incident.' },
      { cmd: 'grep "T1" <file>', name: 'Extract MITRE Codes', usage: 'grep "T1" kill_chain_incident_104.txt', explanation: 'Filter for standardized MITRE technique references.' }
    ],
    knowledgeCheck: {
      question: "What happens to a cyber attack if the defense successfully blocks the 'Exploitation' phase?",
      options: [
        { text: "The attack chain is broken, preventing the adversary from installing payloads or achieving objectives", correct: true, explanation: "Correct! Severing any phase prevents the attacker from moving to downstream phases." },
        { text: "The attacker automatically wins the engagement", correct: false, explanation: "Incorrect. Blocking exploitation prevents adversary success." },
        { text: "The server must be reformatted immediately", correct: false, explanation: "Incorrect. If exploitation was blocked, the server was not compromised." }
      ]
    }
  },
  'mod-soc-4': {
    threatScenario: "Modern malware frequently operates purely in-memory (fileless malware) using Process Hollowing (T1055.012). The attacker launches a legitimate Windows or Linux process (like svchost or bash), unmaps its legitimate code, and injects malicious shellcode. Antivirus tools scanning disk files find nothing, but volatile RAM memory dumps reveal the hollowed process.",
    mitreTactic: "MITRE ATT&CK: T1055 (Process Injection)",
    keyConcepts: [
      {
        title: "Process Hollowing Mechanics",
        desc: "A legitimate executable is suspended at startup; its memory space is overwritten with malicious code and resumed."
      },
      {
        title: "Volatility Memory Triage",
        desc: "Tools like Volatility analyze RAM dumps, inspecting process handles, thread counts, and parent-child hierarchy discrepancies."
      }
    ],
    syntaxCards: [
      { cmd: 'cat volatility_pslist.txt', name: 'Review Process Dump', usage: 'cat /var/log/siem/volatility_pslist.txt', explanation: 'Inspect memory snapshot process list.' },
      { cmd: 'grep "4492" <file>', name: 'Isolate Injected PID', usage: 'grep "4492" volatility_pslist.txt', explanation: 'Locate the anomalous svchost instance with mismatched threads and parent ID.' }
    ],
    knowledgeCheck: {
      question: "Why does Process Hollowing successfully evade conventional disk-based antivirus scanners?",
      options: [
        { text: "The malicious code lives strictly in volatile RAM memory inside a legitimate process binary", correct: true, explanation: "Correct! The disk binary is completely benign; the malicious payload exists purely in memory." },
        { text: "Antivirus software does not work on Mondays", correct: false, explanation: "Incorrect. Antivirus runs continuously." },
        { text: "The attacker changes the filename to 'notepad.exe'", correct: false, explanation: "Incorrect. Simply renaming a file does not evade signature scans." }
      ]
    }
  },
  'mod-soc-5': {
    threatScenario: "Once a compromised machine is discovered, the SOC response team must initiate rapid containment to prevent lateral movement (NIST SP 800-61). Network quarantine policies isolate the host from production subnets, revoke active session tokens, and preserve forensic artifacts for root cause analysis.",
    mitreTactic: "NIST SP 800-61: Incident Handling & Containment",
    keyConcepts: [
      {
        title: "Host Isolation vs Powering Off",
        desc: "Never pull the power cord immediately—this destroys critical volatile RAM evidence! Isolate the host logically via network quarantine."
      },
      {
        title: "Credential Revocation",
        desc: "Immediately invalidate Kerberos/JWT tokens and reset credentials of all accounts active on the host."
      },
      {
        title: "Post-Incident Eradication",
        desc: "Rebuild the system from verified golden images rather than trying to manually 'clean' compromised binaries."
      }
    ],
    syntaxCards: [
      { cmd: 'cat containment_policy.conf', name: 'Inspect Policy', usage: 'cat /etc/security/containment_policy.conf', explanation: 'Verify host isolation and credential revocation rules.' },
      { cmd: 'grep "QUARANTINED" <file>', name: 'Verify Isolation', usage: 'grep "STATUS=QUARANTINED" containment_policy.conf', explanation: 'Confirm active network quarantine enforcement.' }
    ],
    knowledgeCheck: {
      question: "Why should defenders logically isolate an infected machine on the network rather than immediately powering it off?",
      options: [
        { text: "Powering off destroys critical volatile RAM memory evidence (active processes, injected code, network sockets)", correct: true, explanation: "Correct! RAM is volatile. Logical network isolation prevents lateral spread while preserving forensics." },
        { text: "Powering off the machine deletes the hard drive", correct: false, explanation: "Incorrect. Hard drives are non-volatile and retain data when powered down." },
        { text: "Computers cannot be turned off during an audit", correct: false, explanation: "Incorrect. They can be turned off, but doing so destroys volatile evidence." }
      ]
    }
  }
};

function theoryForModule(mod) {
  if (MODULE_THEORY_DETAILS[mod.id]) return MODULE_THEORY_DETAILS[mod.id];
  return {
    mitreTactic: 'Isolated classroom lab',
    threatScenario: mod.briefing,
    keyConcepts: [
      { title: 'What fails', desc: mod.description },
      { title: 'What you practice', desc: 'Confirm the weakness in the sandbox, then apply the defensive control and run the same check again.' },
      { title: 'What stays out of scope', desc: 'These exercises never touch a real system, inbox, or password database.' }
    ],
    syntaxCards: (mod.commandReference || []).map((item) => ({
      cmd: item.cmd,
      name: item.cmd,
      usage: item.cmd,
      explanation: item.desc
    })),
    knowledgeCheck: {
      question: `How do you know the defense for "${mod.title}" is in place?`,
      options: [
        { text: 'The same lab input fails after the patch, and the exercise never leaves the sandbox', correct: true, explanation: 'A fix is verified when the previously successful lab case is rejected.' },
        { text: 'The attack still succeeds, so the patch is optional', correct: false, explanation: 'If the lab attack still succeeds, the control is not working.' },
        { text: 'By trying the attack on a live site you do not own', correct: false, explanation: 'CyberGuardian labs stay inside the sandbox.' }
      ]
    }
  };
}

export default function TheoryView({
  course,
  moduleIndex,
  onStartPractice,
  onBackToDashboard,
  onSelectModule,
  onQuizAnswer
}) {
  const currentModule = course.modules[moduleIndex];
  const theoryData = theoryForModule(currentModule);
  
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const recorded = useRef(false);

  useEffect(() => {
    setSelectedAnswer(null);
    setShowFeedback(false);
    recorded.current = false;
  }, [currentModule.id]);

  const handleSelectAnswer = (idx) => {
    if (showFeedback) return;
    setSelectedAnswer(idx);
    setShowFeedback(true);
    if (!recorded.current) {
      recorded.current = true;
      onQuizAnswer?.(theoryData.knowledgeCheck.options[idx].correct);
    }
  };

  return (
    <div className="flex-1 max-w-[1440px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8 animate-fadeIn">
      {/* 1. TOP BREADCRUMBS & ACTION HEADER */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] pb-4">
        <div className="flex items-center gap-2 sm:gap-3 text-xs font-mono">
          <button
            onClick={onBackToDashboard}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#161b2a] hover:bg-white/[0.08] text-slate-300 hover:text-white border border-white/[0.08] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-emerald-400" />
            <span className="font-sans font-semibold">Dashboard</span>
          </button>
          <span className="text-slate-600">/</span>
          <span className="text-slate-400 hidden sm:inline">{course.title}</span>
          <span className="text-slate-600 hidden sm:inline">/</span>
          <span className="text-emerald-400 font-bold">
            Module 0{currentModule.number}: Defense Briefing
          </span>
        </div>

        {/* Quick Launch CTA */}
        <div className="flex items-center gap-3">
          <button
            onClick={onStartPractice}
            className="clay-pill-btn px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 shadow-[0_4px_16px_rgba(16,185,129,0.35)]"
          >
            <Terminal className="w-4 h-4" />
            <span>Launch Practice Sandbox →</span>
          </button>
        </div>
      </div>

      {/* 2. HERO DEFENSE BRIEFING CARD */}
      <section className="clay-card rounded-3xl p-6 sm:p-8 relative overflow-hidden border border-white/10 shadow-2xl">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="clay-tag px-3 py-1 rounded-full text-[10px] font-mono font-bold text-emerald-400 tracking-wider uppercase">
              MODULE 0{currentModule.number} // DEFENSE THEORY BRIEFING
            </span>
            <span className="px-3 py-1 rounded-full bg-cyan-950/50 text-cyan-300 border border-cyan-500/30 text-[10px] font-mono">
              {theoryData.mitreTactic}
            </span>
            <span className="px-3 py-1 rounded-full bg-amber-950/40 text-amber-300 border border-amber-500/30 text-[10px] font-mono flex items-center gap-1">
              <Award className="w-3 h-3" />
              <span>Reward: {currentModule.badge} (+{currentModule.tasks.length * 100} XP)</span>
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-display">
            {currentModule.title}
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-4xl">
            {currentModule.description}
          </p>

          {/* Real-World Threat Scenario Box */}
          <div className="mt-4 p-5 rounded-2xl bg-[#090e1c]/90 border border-emerald-500/30 text-xs sm:text-sm text-slate-200 leading-relaxed space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 font-mono font-bold text-xs uppercase tracking-wide">
              <Shield className="w-4 h-4" />
              <span>Real-World Threat Scenario & Defensive Rationale:</span>
            </div>
            <p className="text-slate-300">
              {theoryData.threatScenario}
            </p>
          </div>
        </div>
      </section>

      {/* 3. CORE CONCEPTS & MENTAL MODELS */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
          <h2 className="text-lg font-bold text-white font-mono uppercase tracking-wider">
            Core Security Concepts & Mental Models
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {theoryData.keyConcepts.map((concept, idx) => (
            <div
              key={idx}
              className="clay-card rounded-2xl p-5 border border-white/10 space-y-2.5 shadow-lg flex flex-col justify-between"
            >
              <div className="space-y-2">
                <span className="font-mono text-[10px] text-cyan-400 font-bold uppercase">
                  Concept 0{idx + 1}
                </span>
                <h3 className="text-base font-bold text-white">
                  {concept.title}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {concept.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. DEFENSIVE CLI SYNTAX TOOLKIT */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <h2 className="text-lg font-bold text-white font-mono uppercase tracking-wider">
            Defensive Command Syntax Reference
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {theoryData.syntaxCards.map((tool, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-[#090e1c] border border-white/[0.08] hover:border-emerald-500/40 transition-all space-y-2"
            >
              <div className="flex items-center justify-between">
                <code className="text-xs font-mono font-bold text-emerald-400 px-2 py-0.5 rounded bg-slate-900 border border-emerald-500/30">
                  {tool.usage}
                </code>
                <span className="font-mono text-[10px] text-slate-400 uppercase">
                  {tool.name}
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {tool.explanation}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. PRE-FLIGHT KNOWLEDGE CHECK (INTERACTIVE QUIZ) */}
      <section className="clay-card rounded-3xl p-6 sm:p-7 border border-white/10 shadow-xl space-y-4">
        <div className="flex items-center gap-2.5 border-b border-white/[0.06] pb-3">
          <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 flex items-center justify-center">
            <HelpCircle className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white font-mono uppercase">
              Pre-Flight Concept Check
            </h3>
            <p className="text-[11px] text-slate-400">Test your mental model before executing live CLI commands</p>
          </div>
        </div>

        <div className="space-y-3 pt-1">
          <p className="text-sm font-semibold text-slate-200">
            {theoryData.knowledgeCheck.question}
          </p>

          <div className="space-y-2">
            {theoryData.knowledgeCheck.options.map((option, idx) => {
              const isSelected = selectedAnswer === idx;
              const isCorrect = option.correct;

              return (
                <div
                  key={idx}
                  onClick={() => handleSelectAnswer(idx)}
                  className={`p-3.5 rounded-2xl border text-xs cursor-pointer transition-all flex items-start gap-3 ${
                    showFeedback && isSelected
                      ? isCorrect
                        ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200 shadow-[0_0_15px_rgba(16,185,129,0.25)]'
                        : 'bg-rose-950/60 border-rose-500 text-rose-200'
                      : showFeedback && isCorrect
                      ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
                      : 'bg-[#090e1c] border-white/[0.08] hover:border-white/20 text-slate-300'
                  }`}
                >
                  <div className="mt-0.5 w-4 h-4 rounded-full border border-current flex items-center justify-center flex-shrink-0 text-[10px]">
                    {showFeedback && isSelected ? (isCorrect ? '✓' : '✗') : idx + 1}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">{option.text}</div>
                    {showFeedback && (isSelected || isCorrect) && (
                      <div className="text-[11px] mt-1 text-slate-400 font-mono">
                        {option.explanation}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. LAUNCH TERMINAL PRACTICAL LAB FOOTER */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-3xl bg-gradient-to-r from-[#0e1321] to-[#161b2a] border border-emerald-500/40 shadow-2xl">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span className="font-mono text-xs font-bold text-emerald-400 uppercase">
              SANDBOX ISOLATION PRIMED
            </span>
          </div>
          <h4 className="text-base font-bold text-white mt-1">
            Ready to test your defensive skills in the live terminal?
          </h4>
          <p className="text-xs text-slate-400">
            {currentModule.tasks.length} mission directives waiting for execution in POSIX Virtual Filesystem.
          </p>
        </div>

        <button
          onClick={onStartPractice}
          className="clay-pill-btn px-8 py-3.5 rounded-2xl font-bold text-sm flex items-center gap-2 shadow-[0_6px_24px_rgba(16,185,129,0.4)] whitespace-nowrap"
        >
          <Terminal className="w-5 h-5" />
          <span>Launch Practical Lab Sandbox →</span>
        </button>
      </div>
    </div>
  );
}
