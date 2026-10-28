export const INITIAL_COURSES = [
  {
    id: 'course-linux-basics',
    title: 'Linux Fundamentals for Cyber Defense',
    tagline: 'Master the command line operating system powering over 90% of global security tooling and servers.',
    category: 'Foundations',
    level: 'Beginner',
    estimatedTime: '45 mins',
    totalModules: 6,
    xpReward: 850,
    status: 'AVAILABLE',
    color: 'cyan',
    icon: 'terminal',
    skills: ['Bash CLI', 'Filesystem Navigation', 'Permission Octals', 'Grep & Pipes', 'Process Triage', 'Network Recon'],
    modules: [
      {
        id: 'mod-1',
        moduleNumber: 1,
        title: 'Filesystem Navigation & Orientation',
        badge: 'Pathfinder',
        badgeIcon: 'Compass',
        description: 'Learn how to orient yourself inside a Linux directory tree, navigate paths, and reveal hidden files.',
        briefing: 'In cybersecurity operations, whether you are responding to an incident or auditing a server, you must be able to orient yourself quickly without a graphical desktop.',
        commandReference: [
          { cmd: 'pwd', desc: 'Print Working Directory: displays your exact absolute location.' },
          { cmd: 'ls', desc: 'List files and directories in current location.' },
          { cmd: 'ls -la', desc: 'Detailed listing including hidden files (.dotfiles) and permissions.' },
          { cmd: 'cd <path>', desc: 'Change current directory. Use .. to go up one level.' },
          { cmd: 'mkdir -p <dir>', desc: 'Create directory paths and parent folders if needed.' }
        ],
        tasks: [
          { id: 't1_pwd', text: 'Determine your current working directory using pwd', commandHint: 'pwd', hint: 'Type "pwd" and hit Enter.' },
          { id: 't1_ls_la', text: 'Reveal hidden dotfiles and detailed permissions using ls -la', commandHint: 'ls -la', hint: 'Use flags "-la".' },
          { id: 't1_mkdir', text: 'Create a dedicated security workspace: mkdir -p ~/defense/audit', commandHint: 'mkdir -p ~/defense/audit', hint: 'Build nested folders.' },
          { id: 't1_cd', text: 'Navigate into your new audit workspace using cd ~/defense/audit', commandHint: 'cd ~/defense/audit', hint: 'Change directory.' }
        ]
      },
      {
        id: 'mod-2',
        moduleNumber: 2,
        title: 'File Creation, Inspection & Backup',
        badge: 'File Surgeon',
        badgeIcon: 'FileCode',
        description: 'Master non-destructive file inspection, creating incident logs, and copying digital evidence.',
        briefing: 'The core Unix philosophy is: "Everything is a file". When investigating security incidents, opening a huge log file in an editor can corrupt timestamps.',
        commandReference: [
          { cmd: 'touch <file>', desc: 'Create a new blank file or refresh timestamp.' },
          { cmd: 'cat <file>', desc: 'Concatenate and display entire contents of a file.' },
          { cmd: 'head -n <lines>', desc: 'View only the first N lines of a file.' },
          { cmd: 'tail -n <lines>', desc: 'View the last N lines (used for real-time monitoring).' },
          { cmd: 'cp <src> <dst>', desc: 'Copy a file safely to another destination.' }
        ],
        tasks: [
          { id: 't2_touch', text: 'Initialize investigation notes file: touch incident.txt', commandHint: 'touch incident.txt', hint: 'Run touch incident.txt.' },
          { id: 't2_cat', text: 'Examine system auth log using cat /var/log/auth.log', commandHint: 'cat /var/log/auth.log', hint: 'View server SSH auth records.' },
          { id: 't2_head', text: 'Extract first 3 lines of the log: head -n 3 /var/log/auth.log', commandHint: 'head -n 3 /var/log/auth.log', hint: 'Use head -n 3.' },
          { id: 't2_cp', text: 'Create forensic backup copy: cp /var/log/auth.log ~/evidence_auth.log', commandHint: 'cp /var/log/auth.log ~/evidence_auth.log', hint: 'Preserve evidence.' }
        ]
      },
      {
        id: 'mod-3',
        moduleNumber: 3,
        title: 'Linux Permissions, Modes & Access Control',
        badge: 'Permission Sentinel',
        badgeIcon: 'ShieldAlert',
        description: 'Understand the rwx permission model, octal notation, and securing sensitive files.',
        briefing: 'Improper file permissions are one of the most common causes of data breaches and privilege escalation (CWE-732).',
        commandReference: [
          { cmd: 'ls -l <file>', desc: 'Inspect the 10-character permission string.' },
          { cmd: 'chmod 644 <file>', desc: 'Owner read/write; group and others read-only.' },
          { cmd: 'chmod +x <script>', desc: 'Add execute permission to make script runnable.' }
        ],
        tasks: [
          { id: 't3_ls_l', text: 'Inspect locked permissions on /secret/classified_flag.txt', commandHint: 'ls -l /secret/classified_flag.txt', hint: 'Inspect permissions.' },
          { id: 't3_chmod_flag', text: 'Grant read access using octal permissions: chmod 644 /secret/classified_flag.txt', commandHint: 'chmod 644 /secret/classified_flag.txt', hint: 'Run chmod 644.' },
          { id: 't3_cat_flag', text: 'Read the unlocked classified flag: cat /secret/classified_flag.txt', commandHint: 'cat /secret/classified_flag.txt', hint: 'Extract token.' },
          { id: 't3_chmod_x', text: 'Make python network scanner executable: chmod +x ~/projects/network_scanner.py', commandHint: 'chmod +x ~/projects/network_scanner.py', hint: 'Add execute flag.' }
        ]
      },
      {
        id: 'mod-4',
        moduleNumber: 4,
        title: 'Log Analysis, Grep & Pipeline Redirection',
        badge: 'Log Detective',
        badgeIcon: 'Search',
        description: 'Search through thousands of log lines using grep, pipe output, and write forensic reports.',
        briefing: 'Real security logs contain millions of lines. You cannot read them manually. Master grep, pipes, and redirection.',
        commandReference: [
          { cmd: 'grep "pattern" <file>', desc: 'Search for exact or regex pattern matches inside a file.' },
          { cmd: 'cmd1 | cmd2', desc: 'Pipe output of cmd1 directly into stdin of cmd2.' },
          { cmd: 'cmd > file', desc: 'Redirect stdout to file.' }
        ],
        tasks: [
          { id: 't4_grep', text: 'Filter auth log for failed logins using grep "Failed"', commandHint: 'grep "Failed" /var/log/auth.log', hint: 'Run grep Failed.' },
          { id: 't4_pipe_wc', text: 'Count total failed attack attempts: cat /var/log/auth.log | grep Failed | wc -l', commandHint: 'cat /var/log/auth.log | grep Failed | wc -l', hint: 'Chain with pipe.' },
          { id: 't4_redirect', text: 'Export detected attacks: grep "Failed" /var/log/auth.log > ~/attacks.txt', commandHint: 'grep "Failed" /var/log/auth.log > ~/attacks.txt', hint: 'Redirect output.' },
          { id: 't4_find', text: 'Discover log files under /var: find /var -name "*.log"', commandHint: 'find /var -name "*.log"', hint: 'Find logs.' }
        ]
      },
      {
        id: 'mod-5',
        moduleNumber: 5,
        title: 'Process Triage & Threat Termination',
        badge: 'Process Terminator',
        badgeIcon: 'Zap',
        description: 'Discover rogue background services, cryptominers, and terminate unauthorized processes.',
        briefing: 'When an attacker compromises a server, they often deploy malicious processes such as cryptominers or reverse shells.',
        commandReference: [
          { cmd: 'ps aux', desc: 'Displays snapshot of all running processes.' },
          { cmd: 'kill <PID>', desc: 'Terminate specific process ID.' },
          { cmd: 'free -m', desc: 'Displays RAM memory statistics.' }
        ],
        tasks: [
          { id: 't5_ps', text: 'Inspect all running processes using ps aux', commandHint: 'ps aux', hint: 'Run ps aux.' },
          { id: 't5_find_rogue', text: 'Locate rogue cryptominer taking 94% CPU (PID 1337)', commandHint: 'ps aux | grep miner', hint: 'Spot PID 1337.' },
          { id: 't5_kill', text: 'Neutralize unauthorized cryptominer: kill 1337', commandHint: 'kill 1337', hint: 'Kill process 1337.' },
          { id: 't5_sysinfo', text: 'Verify memory and OS architecture with free -m and uname -a', commandHint: 'uname -a', hint: 'System info.' }
        ]
      },
      {
        id: 'mod-6',
        moduleNumber: 6,
        title: 'Network Reconnaissance & Diagnostics',
        badge: 'Network Sentinel',
        badgeIcon: 'Radio',
        description: 'Audit network interfaces, verify gateway connectivity, and test local security endpoints.',
        briefing: 'Network awareness is fundamental to defense. Audit interfaces, gateway ping latency, and curl headers.',
        commandReference: [
          { cmd: 'ifconfig', desc: 'Display active network interface IP addresses.' },
          { cmd: 'ping -c <count> <host>', desc: 'Test ICMP reachability and measure packet round trip.' },
          { cmd: 'curl -I <url>', desc: 'Fetch HTTP response headers.' }
        ],
        tasks: [
          { id: 't6_ifconfig', text: 'Inspect active network interfaces: ifconfig', commandHint: 'ifconfig', hint: 'Run ifconfig.' },
          { id: 't6_ping', text: 'Test ICMP latency to security gateway: ping -c 3 10.0.0.1', commandHint: 'ping -c 3 10.0.0.1', hint: 'Send 3 pings.' },
          { id: 't6_curl', text: 'Audit HTTP defense headers: curl -I http://10.0.0.1/status', commandHint: 'curl -I http://10.0.0.1/status', hint: 'Inspect headers.' },
          { id: 't6_whoami', text: 'Verify your final operator identity: whoami', commandHint: 'whoami', hint: 'Type whoami.' }
        ]
      }
    ]
  },
  {
    id: 'course-web-security',
    title: 'Web Application Security & OWASP Top 10',
    tagline: 'Safely exploit and remediate SQL Injection, Cross-Site Scripting (XSS), and Broken Authentication.',
    category: 'Offense & Defense',
    level: 'Intermediate',
    estimatedTime: '1 hr 15 mins',
    totalModules: 5,
    xpReward: 1200,
    status: 'AVAILABLE',
    color: 'emerald',
    icon: 'globe',
    skills: ['SQL Injection', 'Reflected XSS', 'DOM Purify', 'Parameterized Queries', 'Session Hijacking'],
    modules: [
      {
        id: 'mod-web-1',
        moduleNumber: 1,
        title: 'SQL Injection (SQLi) Identification & Parameterization',
        badge: 'SQLi Shield',
        badgeIcon: 'ShieldAlert',
        description: 'Analyze how unchecked user input corrupts relational SQL queries and implement secure parameterized prepared statements.',
        briefing: 'SQL Injection (CWE-89) occurs when untrusted user input is directly concatenated into a dynamic SQL query string without sanitization. Attackers inject boolean logic such as \' OR \'1\'=\'1 to bypass authentication gates.',
        commandReference: [
          { cmd: 'cat <file>', desc: 'Inspect source code for direct string concatenation.' },
          { cmd: 'grep -i "SELECT" <file>', desc: 'Search for vulnerable SQL statements.' }
        ],
        tasks: [
          { id: 't_sqli_inspect', text: 'Inspect the vulnerable authentication script: cat /var/www/html/vulnerable_app/login.php', commandHint: 'cat /var/www/html/vulnerable_app/login.php', hint: 'Run cat /var/www/html/vulnerable_app/login.php.' },
          { id: 't_sqli_grep', text: 'Locate the concatenated SQL statement using grep "SELECT" /var/www/html/vulnerable_app/login.php', commandHint: 'grep "SELECT" /var/www/html/vulnerable_app/login.php', hint: 'Type grep "SELECT".' },
          { id: 't_sqli_patch', text: 'Review the secure parameterized implementation: cat /var/www/html/vulnerable_app/login_secure.php', commandHint: 'cat /var/www/html/vulnerable_app/login_secure.php', hint: 'Inspect the secure patch.' }
        ]
      },
      {
        id: 'mod-web-2',
        moduleNumber: 2,
        title: 'Cross-Site Scripting (XSS) & DOM Sanitization',
        badge: 'XSS Neutralizer',
        badgeIcon: 'FileCode',
        description: 'Examine how unsafe innerHTML assignments trigger client-side script execution and apply DOMPurify sanitization.',
        briefing: 'Cross-Site Scripting (CWE-79) allows adversaries to inject malicious JavaScript into web applications viewed by other users to steal session tokens.',
        commandReference: [
          { cmd: 'cat <file>', desc: 'Inspect client-side JavaScript for unsafe innerHTML operations.' },
          { cmd: 'grep "DOMPurify" <file>', desc: 'Verify HTML sanitization routines.' }
        ],
        tasks: [
          { id: 't_xss_audit', text: 'Inspect the vulnerable comment handler: cat /var/www/html/vulnerable_app/comment.js', commandHint: 'cat /var/www/html/vulnerable_app/comment.js', hint: 'Examine unsafe innerHTML.' },
          { id: 't_xss_sanitize', text: 'Confirm DOMPurify sanitization in patched version: grep "DOMPurify" /var/www/html/vulnerable_app/comment_secure.js', commandHint: 'grep "DOMPurify" /var/www/html/vulnerable_app/comment_secure.js', hint: 'Verify DOMPurify.' }
        ]
      },
      {
        id: 'mod-web-3',
        moduleNumber: 3,
        title: 'Broken Authentication & JWT Integrity',
        badge: 'Token Guardian',
        badgeIcon: 'Shield',
        description: 'Identify insecure JWT signature algorithms (alg: none) and audit stateless credential integrity.',
        briefing: 'JSON Web Tokens (JWT) misconfigured with "alg": "none" allow attackers to forge administrative claims without signature keys.',
        commandReference: [
          { cmd: 'cat <file>', desc: 'Inspect intercepted authorization headers and tokens.' },
          { cmd: 'grep "none" <file>', desc: 'Detect unsigned algorithm bypass vectors.' }
        ],
        tasks: [
          { id: 't_jwt_inspect', text: 'Examine leaked authentication token header: cat /var/www/html/vulnerable_app/auth_header.txt', commandHint: 'cat /var/www/html/vulnerable_app/auth_header.txt', hint: 'Inspect JWT header.' },
          { id: 't_jwt_alg', text: 'Verify algorithm bypass risk: grep "none" /var/www/html/vulnerable_app/auth_header.txt', commandHint: 'grep "none" /var/www/html/vulnerable_app/auth_header.txt', hint: 'Filter for none.' }
        ]
      },
      {
        id: 'mod-web-4',
        moduleNumber: 4,
        title: 'Path Traversal & Arbitrary File Access (CWE-22)',
        badge: 'Path Sentinel',
        badgeIcon: 'Compass',
        description: 'Detect directory dot-dot-slash (../../) bypasses and implement strict filename basename isolation.',
        briefing: 'Path Traversal occurs when user input is concatenated into filesystem access APIs without basename whitelisting.',
        commandReference: [
          { cmd: 'cat <file>', desc: 'Examine server file routing controllers.' },
          { cmd: 'grep "basename" <file>', desc: 'Verify path sanitization defenses.' }
        ],
        tasks: [
          { id: 't_path_test', text: 'Inspect vulnerable filesystem endpoint: cat /var/www/html/vulnerable_app/server.js', commandHint: 'cat /var/www/html/vulnerable_app/server.js', hint: 'Examine path traversal.' },
          { id: 't_path_patch', text: 'Audit secured path isolation patch: cat /var/www/html/vulnerable_app/server_secure.js', commandHint: 'cat /var/www/html/vulnerable_app/server_secure.js', hint: 'Verify basename patch.' }
        ]
      },
      {
        id: 'mod-web-5',
        moduleNumber: 5,
        title: 'Security Misconfiguration & Header Hardening',
        badge: 'Citadel Architect',
        badgeIcon: 'Shield',
        description: 'Audit Content-Security-Policy (CSP), Strict-Transport-Security (HSTS), and X-Frame-Options.',
        briefing: 'HTTP defense headers instruct modern web browsers to block clickjacking, enforce HTTPS, and restrict unauthorized scripts.',
        commandReference: [
          { cmd: 'cat <file>', desc: 'Inspect web server defense configuration files.' },
          { cmd: 'grep "Content-Security-Policy" <file>', desc: 'Verify active CSP header rules.' }
        ],
        tasks: [
          { id: 't_headers_audit', text: 'Inspect NGINX perimeter defense headers: cat /etc/nginx/security_headers.conf', commandHint: 'cat /etc/nginx/security_headers.conf', hint: 'View headers config.' },
          { id: 't_csp_grep', text: 'Confirm strict Content-Security-Policy directive: grep "Content-Security-Policy" /etc/nginx/security_headers.conf', commandHint: 'grep "Content-Security-Policy" /etc/nginx/security_headers.conf', hint: 'Verify CSP.' }
        ]
      }
    ]
  },
  {
    id: 'course-network-defense',
    title: 'Network Forensics & Packet Investigation',
    tagline: 'Analyze PCAP packet captures, dissect suspicious handshakes, and isolate MITM attacks.',
    category: 'Analysis',
    level: 'Intermediate',
    estimatedTime: '1 hr',
    totalModules: 4,
    xpReward: 950,
    status: 'AVAILABLE',
    color: 'amber',
    icon: 'network',
    skills: ['Wireshark Logic', 'TCP 3-Way Handshake', 'ARP Spoofing', 'DNS Poisoning'],
    modules: [
      {
        id: 'mod-net-1',
        moduleNumber: 1,
        title: 'TCP 3-Way Handshake & SYN Flood Analysis',
        badge: 'Handshake Warden',
        badgeIcon: 'Radio',
        description: 'Examine TCP transmission states (SYN, SYN-ACK, ACK) and detect half-open denial-of-service floods.',
        briefing: 'The TCP 3-way handshake establishes reliable connections. In a SYN Flood attack, thousands of spoofed SYN packets exhaust connection backlogs.',
        commandReference: [
          { cmd: 'cat <file>', desc: 'Inspect gateway TCP connection state logs.' },
          { cmd: 'grep "SYN_RECV" <file>', desc: 'Filter for half-open connection states.' }
        ],
        tasks: [
          { id: 't_syn_inspect', text: 'Inspect gateway packet log for flood events: cat /var/log/network/syn_flood.log', commandHint: 'cat /var/log/network/syn_flood.log', hint: 'View SYN flood log.' },
          { id: 't_syn_count', text: 'Count half-open SYN_RECV states: cat /var/log/network/syn_flood.log | grep SYN_RECV | wc -l', commandHint: 'cat /var/log/network/syn_flood.log | grep SYN_RECV | wc -l', hint: 'Chain with wc -l.' }
        ]
      },
      {
        id: 'mod-net-2',
        moduleNumber: 2,
        title: 'Wireshark PCAP Packet Triage',
        badge: 'Packet Warden',
        badgeIcon: 'Search',
        description: 'Analyze network capture summaries to isolate unencrypted HTTP credentials and token leaks.',
        briefing: 'Unencrypted traffic transmitted over plaintext protocols allows adversaries on local networks to steal credentials.',
        commandReference: [
          { cmd: 'cat <file>', desc: 'Inspect forensic packet capture summary.' },
          { cmd: 'grep "password=" <file>', desc: 'Extract plaintext credentials leaked in transit.' }
        ],
        tasks: [
          { id: 't_pcap_examine', text: 'Inspect captured packet flow summary: cat ~/pcaps/capture_summary.txt', commandHint: 'cat ~/pcaps/capture_summary.txt', hint: 'View packet capture.' },
          { id: 't_pcap_extract', text: 'Isolate plaintext password leaked in transit: grep "password=" ~/pcaps/capture_summary.txt', commandHint: 'grep "password=" ~/pcaps/capture_summary.txt', hint: 'Search password.' }
        ]
      },
      {
        id: 'mod-net-3',
        moduleNumber: 3,
        title: 'ARP Cache Poisoning & Man-In-The-Middle (MITM)',
        badge: 'ARP Shield',
        badgeIcon: 'ShieldAlert',
        description: 'Detect unauthorized gratuitous ARP replies that hijack default gateway traffic on local broadcast domains.',
        briefing: 'ARP resolves IP addresses to physical MAC addresses without authentication. Attackers broadcast fake ARP mappings to poison cache tables.',
        commandReference: [
          { cmd: 'cat <file>', desc: 'Inspect local host ARP cache table.' },
          { cmd: 'grep "10.0.0.1" <file>', desc: 'Detect duplicate MAC bindings for gateway.' }
        ],
        tasks: [
          { id: 't_arp_audit', text: 'Audit system ARP cache table: cat ~/pcaps/arp_cache.txt', commandHint: 'cat ~/pcaps/arp_cache.txt', hint: 'Inspect ARP cache.' },
          { id: 't_arp_detect', text: 'Identify conflicting gateway bindings: grep "10.0.0.1" ~/pcaps/arp_cache.txt', commandHint: 'grep "10.0.0.1" ~/pcaps/arp_cache.txt', hint: 'Detect duplicate MAC.' }
        ]
      },
      {
        id: 'mod-net-4',
        moduleNumber: 4,
        title: 'DNS Spoofing & High-Entropy Tunneling',
        badge: 'DNS Sentinel',
        badgeIcon: 'Zap',
        description: 'Identify covert data exfiltration channels hiding inside base64 encoded DNS subdomain queries.',
        briefing: 'DNS tunneling abuses recursive DNS resolvers to exfiltrate stolen credentials through base64-encoded subdomains, bypassing port filters.',
        commandReference: [
          { cmd: 'cat <file>', desc: 'Inspect DNS resolver query logs.' },
          { cmd: 'grep "c2beacon" <file>', desc: 'Filter for malicious exfiltration domains.' }
        ],
        tasks: [
          { id: 't_dns_inspect', text: 'Audit DNS resolver query stream: cat /var/log/network/dns_queries.log', commandHint: 'cat /var/log/network/dns_queries.log', hint: 'Inspect DNS log.' },
          { id: 't_dns_exfil', text: 'Isolate covert C2 exfiltration requests: grep "c2beacon" /var/log/network/dns_queries.log', commandHint: 'grep "c2beacon" /var/log/network/dns_queries.log', hint: 'Spot C2 queries.' }
        ]
      }
    ]
  },
  {
    id: 'course-soc-triage',
    title: 'SOC Analyst Incident Response & Triage',
    tagline: 'Investigate live simulated ransomware beacons, dissect persistence mechanisms, and contain attacks.',
    category: 'Blue Team Operations',
    level: 'Advanced',
    estimatedTime: '1 hr 30 mins',
    totalModules: 5,
    xpReward: 1500,
    status: 'AVAILABLE',
    color: 'purple',
    icon: 'shield',
    skills: ['SIEM Alert Triage', 'Log Forensics', 'Kill Chain Mapping', 'Containment Strategies'],
    modules: [
      {
        id: 'mod-soc-1',
        moduleNumber: 1,
        title: 'SIEM Alert Triage & Incident Severity Prioritization',
        badge: 'Alert Triager',
        badgeIcon: 'Search',
        description: 'Correlate real-time security alerts, eliminate false positives, and triage high-impact critical events.',
        briefing: 'Security Operations Centers (SOC) use SIEM systems to correlate anomalous events and prioritize CRITICAL threat alerts over benign noise.',
        commandReference: [
          { cmd: 'cat <file>', desc: 'Read structured SIEM alert JSON stream.' },
          { cmd: 'grep "CRITICAL" <file>', desc: 'Isolate top-priority incidents requiring immediate escalation.' }
        ],
        tasks: [
          { id: 't_siem_inspect', text: 'Inspect incoming SIEM alerts stream: cat /var/log/siem/alerts.json', commandHint: 'cat /var/log/siem/alerts.json', hint: 'Read SIEM alerts.' },
          { id: 't_siem_critical', text: 'Filter for CRITICAL alerts: grep "CRITICAL" /var/log/siem/alerts.json', commandHint: 'grep "CRITICAL" /var/log/siem/alerts.json', hint: 'Extract critical alerts.' }
        ]
      },
      {
        id: 'mod-soc-2',
        moduleNumber: 2,
        title: 'Ransomware Beacon Detection & C2 Egress',
        badge: 'Beacon Hunter',
        badgeIcon: 'Radio',
        description: 'Detect periodic C2 beaconing signatures in outbound firewall traffic and identify adversary controllers.',
        briefing: 'Malware establishes Command and Control (C2) communication by sending periodic HTTP POST heartbeats to external servers.',
        commandReference: [
          { cmd: 'cat <file>', desc: 'Examine outbound network egress logs.' },
          { cmd: 'grep "heartbeat" <file>', desc: 'Filter for C2 heartbeat requests.' }
        ],
        tasks: [
          { id: 't_beacon_detect', text: 'Examine periodic beacon timing in egress log: cat /var/log/siem/c2_egress.log', commandHint: 'cat /var/log/siem/c2_egress.log', hint: 'Examine beacon timing.' },
          { id: 't_beacon_ip', text: 'Isolate external C2 IP address: grep "203.0.113.88" /var/log/siem/c2_egress.log', commandHint: 'grep "203.0.113.88" /var/log/siem/c2_egress.log', hint: 'Isolate C2 IP.' }
        ]
      },
      {
        id: 'mod-soc-3',
        moduleNumber: 3,
        title: 'Cyber Kill Chain & Threat Actor Mapping',
        badge: 'Kill Chain Analyst',
        badgeIcon: 'Compass',
        description: 'Map incident artifacts across the Lockheed Martin Cyber Kill Chain and MITRE ATT&CK matrix.',
        briefing: 'Incident responders map attacker operations across structured stages (Recon, Weaponization, Delivery, Exploitation, Installation, C2, Action) to deploy countermeasures.',
        commandReference: [
          { cmd: 'cat <file>', desc: 'Read incident forensic analysis timeline.' },
          { cmd: 'grep "T1" <file>', desc: 'Filter for mapped MITRE ATT&CK technique IDs.' }
        ],
        tasks: [
          { id: 't_killchain_map', text: 'Review incident kill chain mapping: cat ~/defense/kill_chain_incident_104.txt', commandHint: 'cat ~/defense/kill_chain_incident_104.txt', hint: 'Inspect kill chain.' },
          { id: 't_killchain_mitre', text: 'Extract MITRE technique codes: grep "T1" ~/defense/kill_chain_incident_104.txt', commandHint: 'grep "T1" ~/defense/kill_chain_incident_104.txt', hint: 'Filter technique IDs.' }
        ]
      },
      {
        id: 'mod-soc-4',
        moduleNumber: 4,
        title: 'Endpoint Memory Dumps & Hollowed Processes',
        badge: 'Memory Forensicist',
        badgeIcon: 'Cpu',
        description: 'Analyze Volatility memory forensic lists to spot unlinked, injected svchost processes hiding in RAM.',
        briefing: 'Advanced malware injects shellcode directly into legitimate system processes (Process Hollowing, T1055.012) hiding inside RAM volatile memory.',
        commandReference: [
          { cmd: 'cat <file>', desc: 'Inspect volatile RAM memory process tree.' },
          { cmd: 'grep "4492" <file>', desc: 'Isolate rogue injected process ID.' }
        ],
        tasks: [
          { id: 't_mem_inspect', text: 'Inspect active memory dump process list: cat /var/log/siem/volatility_pslist.txt', commandHint: 'cat /var/log/siem/volatility_pslist.txt', hint: 'Audit process dump.' },
          { id: 't_mem_hollow', text: 'Locate suspicious injected svchost PID 4492: grep "4492" /var/log/siem/volatility_pslist.txt', commandHint: 'grep "4492" /var/log/siem/volatility_pslist.txt', hint: 'Find PID 4492.' }
        ]
      },
      {
        id: 'mod-soc-5',
        moduleNumber: 5,
        title: 'Incident Containment, Quarantine & Eradication',
        badge: 'SOC Commander',
        badgeIcon: 'Shield',
        description: 'Execute host isolation rules, revoke active session tokens, and establish network quarantine.',
        briefing: 'The final step of incident response is swift containment to prevent lateral movement (NIST SP 800-61), isolating hosts from internal subnets.',
        commandReference: [
          { cmd: 'cat <file>', desc: 'Review host isolation policies.' },
          { cmd: 'grep "STATUS=QUARANTINED" <file>', desc: 'Verify host quarantine enforcement.' }
        ],
        tasks: [
          { id: 't_contain_isolate', text: 'Inspect host containment policy: cat /etc/security/containment_policy.conf', commandHint: 'cat /etc/security/containment_policy.conf', hint: 'View containment rules.' },
          { id: 't_contain_verify', text: 'Verify quarantine state: grep "STATUS=QUARANTINED" /etc/security/containment_policy.conf', commandHint: 'grep "STATUS=QUARANTINED" /etc/security/containment_policy.conf', hint: 'Verify quarantine.' }
        ]
      }
    ]
  },
  {
    id: 'course-human-defense',
    title: 'Phishing, Social Engineering & Password Defense',
    tagline: 'Spot deceptive messages and see why slow, salted hashes stop guessing.',
    category: 'Identity Defense',
    level: 'Beginner',
    estimatedTime: '40 mins',
    totalModules: 2,
    xpReward: 500,
    status: 'AVAILABLE',
    color: 'amber',
    icon: 'shield',
    skills: ['Phishing Indicators', 'Mail Filter Rules', 'Salting', 'Slow Hashes', 'Rate Limiting'],
    modules: [
      {
        id: 'mod-human-1',
        moduleNumber: 1,
        title: 'Phishing Email & Domain Analyzer',
        badge: 'Phish Warden',
        badgeIcon: 'Search',
        description: 'Mark deceptive cues in a sample message, then write the filter rules that quarantine it.',
        briefing: 'Phishing succeeds when a message borrows a trusted brand, invents urgency, and hides a different destination behind familiar link text.',
        commandReference: [
          { cmd: 'Compare sender vs reply-to', desc: 'A mismatch means replies leave the brand the user thinks they are talking to.' },
          { cmd: 'Compare link text vs href', desc: 'The visible label is not the host the browser would open.' }
        ],
        tasks: [
          { id: 't_phish_flags', text: 'Mark at least four red flags on the sample message.', commandHint: 'playground:phishing', hint: 'Check sender spelling, urgency, link destination, attachment, Reply-To.' },
          { id: 't_phish_rule', text: 'Enable all three filter checks and quarantine the sample.', commandHint: 'playground:phishing', hint: 'Lookalike domains, mismatched hosts, and macros.' }
        ]
      },
      {
        id: 'mod-human-2',
        moduleNumber: 2,
        title: 'Password Hashing & Guessing Limits',
        badge: 'Hash Warden',
        badgeIcon: 'KeyRound',
        description: 'Compare a fast hash against a slow salted hash with a rate limit, using a six-word practice list.',
        briefing: 'A unique salt and a slow hash make guessing impractical. This lab only searches a printed six-word list.',
        commandReference: [
          { cmd: 'salt', desc: 'A unique per-user value stored beside the hash.' },
          { cmd: 'bcrypt', desc: 'A deliberately slow password hash.' }
        ],
        tasks: [
          { id: 't_pass_fast', text: 'Run the fast comparison and watch the practice list resolve.', commandHint: 'playground:password', hint: 'Start the fast comparison in Exploit view.' },
          { id: 't_pass_harden', text: 'Rerun with the slow hash and confirm the rate limit stops the run.', commandHint: 'playground:password', hint: 'Switch to Defense view and start again.' }
        ]
      }
    ]
  }
];
