// Comprehensive Course Catalog & Learning Tracks for CyberGuardian

export const ALL_COURSES = [
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
        number: 1,
        title: 'Filesystem Navigation & Orientation',
        badge: 'Pathfinder',
        badgeIcon: 'Compass',
        description: 'Learn how to orient yourself inside a Linux directory tree, navigate paths, and reveal hidden files.',
        briefing: `In cybersecurity operations, whether you are responding to an incident or auditing a server, you must be able to orient yourself quickly without a graphical desktop. Linux organizes all files in a single root hierarchy denoted by \`/\`. Your default starting location is your personal home directory (\`/home/student\` or \`~\`).`,
        commandReference: [
          { cmd: 'pwd', desc: 'Print Working Directory: displays your exact absolute location.' },
          { cmd: 'ls', desc: 'List files and directories in current location.' },
          { cmd: 'ls -la', desc: 'Detailed listing including hidden files (.dotfiles) and permissions.' },
          { cmd: 'cd <path>', desc: 'Change current directory. Use .. to go up one level.' },
          { cmd: 'mkdir -p <dir>', desc: 'Create directory paths and parent folders if needed.' }
        ],
        tasks: [
          {
            id: 't1_pwd',
            text: 'Determine your current working directory using pwd',
            commandHint: 'pwd',
            hint: 'Type "pwd" and hit Enter to inspect your full directory path.',
            validate: (event) => event.command === 'pwd' && event.success
          },
          {
            id: 't1_ls_la',
            text: 'Reveal hidden dotfiles and detailed permissions using ls -la',
            commandHint: 'ls -la',
            hint: 'Use the flags "-l" (long format) and "-a" (all files including hidden ones): "ls -la"',
            validate: (event) => (event.raw.includes('ls') && event.raw.includes('-') && (event.raw.includes('a') || event.raw.includes('la') || event.raw.includes('al')))
          },
          {
            id: 't1_mkdir',
            text: 'Create a dedicated security workspace: mkdir -p ~/defense/audit',
            commandHint: 'mkdir -p ~/defense/audit',
            hint: 'Execute "mkdir -p ~/defense/audit" to build nested directories in your home folder.',
            validate: (event, vfs) => {
              const node = vfs.getNode('/home/student/defense/audit');
              return node && node.type === 'dir';
            }
          },
          {
            id: 't1_cd',
            text: 'Navigate into your new audit workspace using cd ~/defense/audit',
            commandHint: 'cd ~/defense/audit',
            hint: 'Change your working directory with "cd ~/defense/audit" or "cd defense/audit".',
            validate: (event, vfs) => vfs.cwd === '/home/student/defense/audit'
          }
        ]
      },
      {
        id: 'mod-2',
        number: 2,
        title: 'File Creation, Inspection & Backup',
        badge: 'File Surgeon',
        badgeIcon: 'FileCode',
        description: 'Master non-destructive file inspection, creating incident logs, and copying digital evidence.',
        briefing: `The core Unix philosophy is: "Everything is a file". When investigating security incidents, opening a huge log file in a graphical text editor can crash the system or corrupt timestamps. Defenders use lightweight stream readers like \`cat\`, \`head\`, and \`tail\` to inspect records safely.`,
        commandReference: [
          { cmd: 'touch <file>', desc: 'Create a new blank file or refresh timestamp.' },
          { cmd: 'cat <file>', desc: 'Concatenate and display entire contents of a file.' },
          { cmd: 'head -n <lines>', desc: 'View only the first N lines of a file.' },
          { cmd: 'tail -n <lines>', desc: 'View the last N lines (often used to monitor real-time logs).' },
          { cmd: 'cp <src> <dst>', desc: 'Copy a file safely to another destination.' }
        ],
        tasks: [
          {
            id: 't2_touch',
            text: 'Initialize a new investigation notes file: touch incident.txt',
            commandHint: 'touch incident.txt',
            hint: 'Run "touch incident.txt" in your current folder.',
            validate: (event, vfs) => {
              const node = vfs.getNode(vfs.cwd + '/incident.txt');
              return node && node.type === 'file';
            }
          },
          {
            id: 't2_cat',
            text: 'Examine the system authentication log using cat /var/log/auth.log',
            commandHint: 'cat /var/log/auth.log',
            hint: 'View the server SSH authentication records with "cat /var/log/auth.log".',
            validate: (event) => event.raw.includes('cat') && event.raw.includes('/var/log/auth.log')
          },
          {
            id: 't2_head',
            text: 'Extract only the first 3 lines of the log using head -n 3 /var/log/auth.log',
            commandHint: 'head -n 3 /var/log/auth.log',
            hint: 'Use the "-n 3" flag with the head command: "head -n 3 /var/log/auth.log"',
            validate: (event) => event.raw.includes('head') && event.raw.includes('3') && event.raw.includes('auth.log')
          },
          {
            id: 't2_cp',
            text: 'Create a forensic backup copy: cp /var/log/auth.log ~/evidence_auth.log',
            commandHint: 'cp /var/log/auth.log ~/evidence_auth.log',
            hint: 'Run "cp /var/log/auth.log ~/evidence_auth.log" to preserve evidence in your home directory.',
            validate: (event, vfs) => {
              const node = vfs.getNode('/home/student/evidence_auth.log');
              return node && node.type === 'file';
            }
          }
        ]
      },
      {
        id: 'mod-3',
        number: 3,
        title: 'Linux Permissions, Modes & Access Control',
        badge: 'Permission Sentinel',
        badgeIcon: 'ShieldAlert',
        description: 'Understand the rwx permission model, octal notation, and securing sensitive files.',
        briefing: `Improper file permissions are one of the most common causes of data breaches and privilege escalation (CWE-732). Every Linux file has permissions for 3 entities: Owner (u), Group (g), and Others (o). Each can have Read (r = 4), Write (w = 2), and Execute (x = 1). Running \`chmod 777\` gives everyone in the world full control, which is a catastrophic security vulnerability!`,
        commandReference: [
          { cmd: 'ls -l <file>', desc: 'Inspect the 10-character permission string (e.g., -rwxr-xr-x).' },
          { cmd: 'chmod 644 <file>', desc: 'Owner can read/write; group and others can only read (standard safe mode).' },
          { cmd: 'chmod +x <script>', desc: 'Add execute permission to make a security script runnable.' },
          { cmd: 'chmod 700 <file>', desc: 'Strict mode: only the owner can read, write, and execute.' }
        ],
        tasks: [
          {
            id: 't3_ls_l',
            text: 'Inspect the locked permissions on /secret/classified_flag.txt',
            commandHint: 'ls -l /secret/classified_flag.txt',
            hint: 'Run "ls -l /secret/classified_flag.txt" to see its restricted status.',
            validate: (event) => event.raw.includes('ls') && event.raw.includes('-l') && event.raw.includes('classified_flag.txt')
          },
          {
            id: 't3_chmod_flag',
            text: 'Grant read access using octal permissions: chmod 644 /secret/classified_flag.txt',
            commandHint: 'chmod 644 /secret/classified_flag.txt',
            hint: 'Type "chmod 644 /secret/classified_flag.txt" to set owner read/write and world read permissions.',
            validate: (event, vfs) => {
              const node = vfs.getNode('/secret/classified_flag.txt');
              return node && (node.permissions === '0644' || node.permissions === '644');
            }
          },
          {
            id: 't3_cat_flag',
            text: 'Read the unlocked classified flag: cat /secret/classified_flag.txt',
            commandHint: 'cat /secret/classified_flag.txt',
            hint: 'Now that permissions are fixed, run "cat /secret/classified_flag.txt" to extract the token!',
            validate: (event) => event.raw.includes('cat') && event.raw.includes('classified_flag.txt') && event.success
          },
          {
            id: 't3_chmod_x',
            text: 'Make the python network scanner executable: chmod +x ~/projects/network_scanner.py',
            commandHint: 'chmod +x ~/projects/network_scanner.py',
            hint: 'Add execute permission: "chmod +x ~/projects/network_scanner.py" or "chmod 755 ~/projects/network_scanner.py".',
            validate: (event, vfs) => {
              const node = vfs.getNode('/home/student/projects/network_scanner.py');
              return node && (node.permissions === '0755' || node.permissions === '755');
            }
          }
        ]
      },
      {
        id: 'mod-4',
        number: 4,
        title: 'Log Analysis, Grep & Pipeline Redirection',
        badge: 'Log Detective',
        badgeIcon: 'Search',
        description: 'Search through thousands of log lines using grep, pipe output, and write forensic reports.',
        briefing: `Real security logs contain millions of lines. You cannot read them manually. With \`grep\` (Global Regular Expression Print), pipes (\`|\`), and redirection (\`>\`), you can filter out the noise and instantly pinpoint malicious IP addresses, failed brute force attacks, and anomalous activity.`,
        commandReference: [
          { cmd: 'grep "pattern" <file>', desc: 'Search for exact or regex pattern matches inside a file.' },
          { cmd: 'grep -i "pattern"', desc: 'Case-insensitive search.' },
          { cmd: 'cmd1 | cmd2', desc: 'Pipe: sends stdout of cmd1 directly into stdin of cmd2.' },
          { cmd: 'cmd > file', desc: 'Redirect stdout to a new file (overwriting).' },
          { cmd: 'cmd >> file', desc: 'Append stdout to an existing file without deleting contents.' }
        ],
        tasks: [
          {
            id: 't4_grep',
            text: 'Filter /var/log/auth.log for failed login attempts using grep "Failed"',
            commandHint: 'grep "Failed" /var/log/auth.log',
            hint: 'Type: grep "Failed" /var/log/auth.log',
            validate: (event) => event.raw.includes('grep') && event.raw.includes('Failed') && event.raw.includes('auth.log')
          },
          {
            id: 't4_pipe_wc',
            text: 'Count total failed attack attempts using a pipe: cat /var/log/auth.log | grep Failed | wc -l',
            commandHint: 'cat /var/log/auth.log | grep Failed | wc -l',
            hint: 'Chain commands with pipes: "cat /var/log/auth.log | grep Failed | wc -l"',
            validate: (event) => event.raw.includes('|') && event.raw.includes('grep') && event.raw.includes('wc')
          },
          {
            id: 't4_redirect',
            text: 'Export detected attacks to a report: grep "Failed" /var/log/auth.log > ~/attacks.txt',
            commandHint: 'grep "Failed" /var/log/auth.log > ~/attacks.txt',
            hint: 'Use the ">" redirection operator: grep "Failed" /var/log/auth.log > ~/attacks.txt',
            validate: (event, vfs) => {
              const node = vfs.getNode('/home/student/attacks.txt');
              return node && node.type === 'file' && node.content && node.content.includes('Failed');
            }
          },
          {
            id: 't4_find',
            text: 'Discover all log files under /var using find /var -name "*.log"',
            commandHint: 'find /var -name "*.log"',
            hint: 'Run: find /var -name "*.log"',
            validate: (event) => event.raw.includes('find') && event.raw.includes('/var') && event.raw.includes('.log')
          }
        ]
      },
      {
        id: 'mod-5',
        number: 5,
        title: 'Process Triage & Threat Termination',
        badge: 'Process Terminator',
        badgeIcon: 'Zap',
        description: 'Discover rogue background services, cryptominers, and terminate unauthorized processes.',
        briefing: `When an attacker compromises a server, they often deploy malicious processes such as cryptominers, reverse shells, or C2 beacons. Linux administrators use \`ps aux\` to list every active process, verify parent IDs, check CPU consumption, and kill malicious threats with \`kill <PID>\`.`,
        commandReference: [
          { cmd: 'ps aux', desc: 'Displays snapshot of all processes running across all users.' },
          { cmd: 'kill <PID>', desc: 'Send termination signal to stop a specific process ID.' },
          { cmd: 'free -m', desc: 'Displays available and consumed RAM memory in megabytes.' },
          { cmd: 'uname -a', desc: 'Displays Linux kernel release, architecture, and system build.' }
        ],
        tasks: [
          {
            id: 't5_ps',
            text: 'Inspect all running system processes using ps aux',
            commandHint: 'ps aux',
            hint: 'Type "ps aux" and inspect the PID and CPU usage columns.',
            validate: (event) => event.command === 'ps' && event.success
          },
          {
            id: 't5_find_rogue',
            text: 'Locate the rogue cryptominer taking 94% CPU (look at PID 1337)',
            commandHint: 'ps aux | grep miner',
            hint: 'Notice PID 1337 (/tmp/.hidden/xmrig_miner) consuming extreme CPU.',
            validate: (event) => event.raw.includes('ps') || (event.raw.includes('grep') && event.raw.includes('1337'))
          },
          {
            id: 't5_kill',
            text: 'Neutralize the unauthorized cryptominer process: kill 1337',
            commandHint: 'kill 1337',
            hint: 'Execute: kill 1337 to terminate the malicious background process.',
            validate: (event, vfs) => {
              const hasMiner = vfs.runningProcesses.some(p => p.pid === 1337);
              return !hasMiner;
            }
          },
          {
            id: 't5_sysinfo',
            text: 'Verify system resources and OS architecture with free -m and uname -a',
            commandHint: 'uname -a',
            hint: 'Check memory with "free -m" or system kernel info with "uname -a".',
            validate: (event) => event.command === 'uname' || event.command === 'free'
          }
        ]
      },
      {
        id: 'mod-6',
        number: 6,
        title: 'Network Reconnaissance & Diagnostics',
        badge: 'Network Sentinel',
        badgeIcon: 'Radio',
        description: 'Audit network interfaces, verify gateway connectivity, and test local security endpoints.',
        briefing: `Network awareness is fundamental to defense. Attackers scan networks to map open ports, while defenders diagnose network configurations and test connectivity between compromised hosts and internal firewalls. Commands like \`ifconfig\`, \`ping\`, and \`curl\` are core to network reconnaissance.`,
        commandReference: [
          { cmd: 'ifconfig (or ip a)', desc: 'Display active network interface IP addresses (e.g., eth0, lo).' },
          { cmd: 'ping -c <count> <host>', desc: 'Test ICMP reachability and measure round-trip packet latency.' },
          { cmd: 'curl -I <url>', desc: 'Fetch HTTP response headers from a web server.' },
          { cmd: 'whoami', desc: 'Verify your current active session user clearance.' }
        ],
        tasks: [
          {
            id: 't6_ifconfig',
            text: 'Inspect active network interfaces and IP addresses: ifconfig',
            commandHint: 'ifconfig',
            hint: 'Run "ifconfig" or "ip a" to see your local interface (eth0: 10.0.4.15).',
            validate: (event) => (event.command === 'ifconfig' || event.raw.startsWith('ip')) && event.success
          },
          {
            id: 't6_ping',
            text: 'Test ICMP latency to the internal security gateway: ping -c 3 10.0.0.1',
            commandHint: 'ping -c 3 10.0.0.1',
            hint: 'Type: ping -c 3 10.0.0.1 to send 3 echo requests to the gateway.',
            validate: (event) => event.command === 'ping' && event.raw.includes('10.0.0.1')
          },
          {
            id: 't6_curl',
            text: 'Audit HTTP defense headers from security gateway: curl -I http://10.0.0.1/status',
            commandHint: 'curl -I http://10.0.0.1/status',
            hint: 'Query headers with: curl -I http://10.0.0.1/status',
            validate: (event) => event.command === 'curl' && (event.raw.includes('-I') || event.raw.includes('-i') || event.raw.includes('status'))
          },
          {
            id: 't6_whoami',
            text: 'Verify your final operator identity: whoami',
            commandHint: 'whoami',
            hint: 'Type "whoami" to complete Course 1 validation!',
            validate: (event) => event.command === 'whoami' && event.success
          }
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
        number: 1,
        title: 'SQL Injection (SQLi) Identification & Parameterization',
        badge: 'SQLi Shield',
        badgeIcon: 'ShieldAlert',
        playground: 'sqli',
        description: 'Analyze how unchecked user input corrupts relational SQL queries and implement secure parameterized prepared statements.',
        briefing: `SQL Injection (CWE-89) occurs when untrusted user input is directly concatenated into a dynamic SQL query string without sanitization. Attackers inject boolean logic such as \`' OR '1'='1\` to bypass authentication gates or extract sensitive database tables via \`UNION SELECT\`. In this lab, inspect the vulnerable login script and verify the parameterized defense patch.`,
        commandReference: [
          { cmd: 'cat <file>', desc: 'Inspect source code for direct string concatenation.' },
          { cmd: 'grep -i "SELECT" <file>', desc: 'Search for vulnerable SQL statements.' },
          { cmd: 'curl -d "..." <url>', desc: 'Test HTTP POST authentication endpoints with payloads.' }
        ],
        tasks: [
          {
            id: 't_sqli_inspect',
            text: 'Inspect the vulnerable authentication script: cat /var/www/html/vulnerable_app/login.php',
            commandHint: 'cat /var/www/html/vulnerable_app/login.php',
            hint: 'Run cat /var/www/html/vulnerable_app/login.php to spot the vulnerable string interpolation.',
            validate: (event) => event.playground === 't_sqli_inspect' || (event.raw.includes('cat') && event.raw.includes('login.php') && !event.raw.includes('login_secure'))
          },
          {
            id: 't_sqli_grep',
            text: 'Locate the concatenated SQL statement using grep "SELECT" /var/www/html/vulnerable_app/login.php',
            commandHint: 'grep "SELECT" /var/www/html/vulnerable_app/login.php',
            hint: 'Type: grep "SELECT" /var/www/html/vulnerable_app/login.php',
            validate: (event) => event.playground === 't_sqli_grep' || (event.raw.includes('grep') && event.raw.includes('SELECT') && event.raw.includes('login.php'))
          },
          {
            id: 't_sqli_patch',
            text: 'Review the secure parameterized implementation: cat /var/www/html/vulnerable_app/login_secure.php',
            commandHint: 'cat /var/www/html/vulnerable_app/login_secure.php',
            hint: 'View the defense patch: cat /var/www/html/vulnerable_app/login_secure.php',
            validate: (event) => event.playground === 't_sqli_patch' || (event.raw.includes('cat') && event.raw.includes('login_secure.php'))
          }
        ]
      },
      {
        id: 'mod-web-2',
        number: 2,
        title: 'Cross-Site Scripting (XSS) & DOM Sanitization',
        badge: 'XSS Neutralizer',
        badgeIcon: 'FileCode',
        playground: 'xss',
        description: 'Examine how unsafe innerHTML assignments trigger client-side script execution and apply DOMPurify sanitization.',
        briefing: `Cross-Site Scripting (CWE-79) allows adversaries to inject malicious JavaScript into web applications viewed by other users. Attackers steal session cookies (\`document.cookie\`), log keystrokes, or redirect visitors to malicious phishing landing pages. Defenders must escape output and apply battle-tested sanitizers like DOMPurify.`,
        commandReference: [
          { cmd: 'cat <file>', desc: 'Inspect client-side JavaScript for unsafe innerHTML operations.' },
          { cmd: 'grep "DOMPurify" <file>', desc: 'Verify HTML sanitization routines.' }
        ],
        tasks: [
          {
            id: 't_xss_audit',
            text: 'Inspect the vulnerable comment handler: cat /var/www/html/vulnerable_app/comment.js',
            commandHint: 'cat /var/www/html/vulnerable_app/comment.js',
            hint: 'Type: cat /var/www/html/vulnerable_app/comment.js',
            validate: (event) => event.playground === 't_xss_audit' || (event.raw.includes('cat') && event.raw.includes('comment.js') && !event.raw.includes('comment_secure'))
          },
          {
            id: 't_xss_sanitize',
            text: 'Confirm DOMPurify sanitization in the patched version: grep "DOMPurify" /var/www/html/vulnerable_app/comment_secure.js',
            commandHint: 'grep "DOMPurify" /var/www/html/vulnerable_app/comment_secure.js',
            hint: 'Type: grep "DOMPurify" /var/www/html/vulnerable_app/comment_secure.js',
            validate: (event) => event.playground === 't_xss_sanitize' || (event.raw.includes('grep') && event.raw.includes('DOMPurify') && event.raw.includes('comment_secure.js'))
          }
        ]
      },
      {
        id: 'mod-web-3',
        number: 3,
        title: 'Broken Authentication & JWT Integrity',
        badge: 'Token Guardian',
        badgeIcon: 'Shield',
        playground: 'jwt',
        description: 'Identify insecure JWT signature algorithms (alg: none) and audit stateless credential integrity.',
        briefing: `JSON Web Tokens (JWT) are widely used for stateless identity. However, misconfigured verifiers that accept \`"alg": "none"\` allow attackers to forge arbitrary administrative claims without possessing the cryptographic signing key (CWE-347).`,
        commandReference: [
          { cmd: 'cat <file>', desc: 'Inspect intercepted authorization headers and tokens.' },
          { cmd: 'grep "none" <file>', desc: 'Detect unsigned algorithm bypass vectors.' }
        ],
        tasks: [
          {
            id: 't_jwt_inspect',
            text: 'Examine the leaked authentication token header: cat /var/www/html/vulnerable_app/auth_header.txt',
            commandHint: 'cat /var/www/html/vulnerable_app/auth_header.txt',
            hint: 'Run cat /var/www/html/vulnerable_app/auth_header.txt to examine the token structure.',
            validate: (event) => event.playground === 't_jwt_inspect' || (event.raw.includes('cat') && event.raw.includes('auth_header.txt'))
          },
          {
            id: 't_jwt_alg',
            text: 'Verify the algorithm bypass risk using grep "none" /var/www/html/vulnerable_app/auth_header.txt',
            commandHint: 'grep "none" /var/www/html/vulnerable_app/auth_header.txt',
            hint: 'Type: grep "none" /var/www/html/vulnerable_app/auth_header.txt',
            validate: (event) => event.playground === 't_jwt_alg' || (event.raw.includes('grep') && event.raw.includes('none') && event.raw.includes('auth_header.txt'))
          }
        ]
      },
      {
        id: 'mod-web-4',
        number: 4,
        title: 'Path Traversal & Arbitrary File Access (CWE-22)',
        badge: 'Path Sentinel',
        badgeIcon: 'Compass',
        playground: 'path',
        description: 'Detect directory dot-dot-slash (../../) bypasses and implement strict filename basename isolation.',
        briefing: `Path Traversal occurs when user input is concatenated into filesystem access APIs without basename whitelisting. By appending \`../../etc/passwd\`, an attacker escapes the webroot to read sensitive system configuration files.`,
        commandReference: [
          { cmd: 'cat <file>', desc: 'Examine server file routing controllers.' },
          { cmd: 'grep "basename" <file>', desc: 'Verify path sanitization defenses.' }
        ],
        tasks: [
          {
            id: 't_path_test',
            text: 'Inspect vulnerable filesystem endpoint: cat /var/www/html/vulnerable_app/server.js',
            commandHint: 'cat /var/www/html/vulnerable_app/server.js',
            hint: 'Type: cat /var/www/html/vulnerable_app/server.js',
            validate: (event) => event.playground === 't_path_test' || (event.raw.includes('cat') && event.raw.includes('server.js') && !event.raw.includes('server_secure'))
          },
          {
            id: 't_path_patch',
            text: 'Audit the secured path isolation patch: cat /var/www/html/vulnerable_app/server_secure.js',
            commandHint: 'cat /var/www/html/vulnerable_app/server_secure.js',
            hint: 'View the secure basename wrapper: cat /var/www/html/vulnerable_app/server_secure.js',
            validate: (event) => event.playground === 't_path_patch' || (event.raw.includes('cat') && event.raw.includes('server_secure.js'))
          }
        ]
      },
      {
        id: 'mod-web-5',
        number: 5,
        title: 'Security Misconfiguration & Header Hardening',
        badge: 'Citadel Architect',
        badgeIcon: 'Shield',
        playground: 'headers',
        description: 'Audit Content-Security-Policy (CSP), Strict-Transport-Security (HSTS), and X-Frame-Options.',
        briefing: `HTTP defense headers instruct modern web browsers to restrict frame embedding (clickjacking defense), enforce HTTPS, and block unauthorized third-party script execution. Inspect and configure server headers to harden perimeter defenses.`,
        commandReference: [
          { cmd: 'cat <file>', desc: 'Inspect web server defense configuration files.' },
          { cmd: 'grep "Content-Security-Policy" <file>', desc: 'Verify active CSP header rules.' }
        ],
        tasks: [
          {
            id: 't_headers_audit',
            text: 'Inspect NGINX perimeter defense headers: cat /etc/nginx/security_headers.conf',
            commandHint: 'cat /etc/nginx/security_headers.conf',
            hint: 'Type: cat /etc/nginx/security_headers.conf',
            validate: (event) => event.playground === 't_headers_audit' || (event.raw.includes('cat') && event.raw.includes('security_headers.conf'))
          },
          {
            id: 't_csp_grep',
            text: 'Confirm strict Content-Security-Policy directive: grep "Content-Security-Policy" /etc/nginx/security_headers.conf',
            commandHint: 'grep "Content-Security-Policy" /etc/nginx/security_headers.conf',
            hint: 'Type: grep "Content-Security-Policy" /etc/nginx/security_headers.conf',
            validate: (event) => event.playground === 't_csp_grep' || (event.raw.includes('grep') && event.raw.includes('Content-Security-Policy'))
          }
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
        number: 1,
        title: 'TCP 3-Way Handshake & SYN Flood Analysis',
        badge: 'Handshake Warden',
        badgeIcon: 'Radio',
        description: 'Examine TCP transmission states (SYN, SYN-ACK, ACK) and detect half-open denial-of-service floods.',
        briefing: `The TCP 3-way handshake establishes reliable connections. In a SYN Flood attack (CWE-400), an adversary transmits thousands of spoofed SYN packets without completing the handshake with an ACK, exhausting server connection backlogs.`,
        commandReference: [
          { cmd: 'cat <file>', desc: 'Inspect gateway TCP connection state logs.' },
          { cmd: 'grep "SYN_RECV" <file>', desc: 'Filter for half-open connection states.' }
        ],
        tasks: [
          {
            id: 't_syn_inspect',
            text: 'Inspect gateway packet log for flood events: cat /var/log/network/syn_flood.log',
            commandHint: 'cat /var/log/network/syn_flood.log',
            hint: 'Type: cat /var/log/network/syn_flood.log',
            validate: (event) => event.raw.includes('cat') && event.raw.includes('syn_flood.log')
          },
          {
            id: 't_syn_count',
            text: 'Count half-open SYN_RECV states: cat /var/log/network/syn_flood.log | grep SYN_RECV | wc -l',
            commandHint: 'cat /var/log/network/syn_flood.log | grep SYN_RECV | wc -l',
            hint: 'Chain with grep and wc: cat /var/log/network/syn_flood.log | grep SYN_RECV | wc -l',
            validate: (event) => event.raw.includes('grep') && event.raw.includes('SYN_RECV') && event.raw.includes('wc')
          }
        ]
      },
      {
        id: 'mod-net-2',
        number: 2,
        title: 'Wireshark PCAP Packet Triage',
        badge: 'Packet Warden',
        badgeIcon: 'Search',
        description: 'Analyze network capture summaries to isolate unencrypted HTTP credentials and token leaks.',
        briefing: `Unencrypted traffic transmitted over plaintext protocols (HTTP, FTP, Telnet) can be intercepted by adversaries on the same local network. Defenders analyze PCAP captures to identify exposed sensitive payloads.`,
        commandReference: [
          { cmd: 'cat <file>', desc: 'Inspect forensic packet capture summary.' },
          { cmd: 'grep "password=" <file>', desc: 'Extract plaintext credentials leaked in transit.' }
        ],
        tasks: [
          {
            id: 't_pcap_examine',
            text: 'Inspect captured packet flow summary: cat ~/pcaps/capture_summary.txt',
            commandHint: 'cat ~/pcaps/capture_summary.txt',
            hint: 'Type: cat ~/pcaps/capture_summary.txt or cat /home/student/pcaps/capture_summary.txt',
            validate: (event) => event.raw.includes('cat') && event.raw.includes('capture_summary.txt')
          },
          {
            id: 't_pcap_extract',
            text: 'Isolate plaintext password leaked in transit: grep "password=" ~/pcaps/capture_summary.txt',
            commandHint: 'grep "password=" ~/pcaps/capture_summary.txt',
            hint: 'Type: grep "password=" ~/pcaps/capture_summary.txt',
            validate: (event) => event.raw.includes('grep') && event.raw.includes('password=') && event.raw.includes('capture_summary.txt')
          }
        ]
      },
      {
        id: 'mod-net-3',
        number: 3,
        title: 'ARP Cache Poisoning & Man-In-The-Middle (MITM)',
        badge: 'ARP Shield',
        badgeIcon: 'ShieldAlert',
        description: 'Detect unauthorized gratuitous ARP replies that hijack default gateway traffic on local broadcast domains.',
        briefing: `ARP resolves IP addresses to physical MAC addresses without built-in authentication. Attackers broadcast fake ARP replies mapping the gateway IP (10.0.0.1) to their own MAC address, placing themselves directly in the middle of all outbound traffic.`,
        commandReference: [
          { cmd: 'cat <file>', desc: 'Inspect local host ARP cache table.' },
          { cmd: 'grep "10.0.0.1" <file>', desc: 'Detect duplicate MAC bindings for gateway.' }
        ],
        tasks: [
          {
            id: 't_arp_audit',
            text: 'Audit system ARP cache table: cat ~/pcaps/arp_cache.txt',
            commandHint: 'cat ~/pcaps/arp_cache.txt',
            hint: 'Type: cat ~/pcaps/arp_cache.txt',
            validate: (event) => event.raw.includes('cat') && event.raw.includes('arp_cache.txt')
          },
          {
            id: 't_arp_detect',
            text: 'Identify conflicting gateway bindings: grep "10.0.0.1" ~/pcaps/arp_cache.txt',
            commandHint: 'grep "10.0.0.1" ~/pcaps/arp_cache.txt',
            hint: 'Type: grep "10.0.0.1" ~/pcaps/arp_cache.txt',
            validate: (event) => event.raw.includes('grep') && event.raw.includes('10.0.0.1') && event.raw.includes('arp_cache.txt')
          }
        ]
      },
      {
        id: 'mod-net-4',
        number: 4,
        title: 'DNS Spoofing & High-Entropy Tunneling',
        badge: 'DNS Sentinel',
        badgeIcon: 'Zap',
        description: 'Identify covert data exfiltration channels hiding inside base64 encoded DNS subdomain queries.',
        briefing: `DNS tunneling abuses recursive DNS resolvers to exfiltrate stolen credentials through base64-encoded subdomains (e.g. \`dXNlcj1hZG1pbj...c2beacon.net\`), bypassing traditional perimeter firewall port filters.`,
        commandReference: [
          { cmd: 'cat <file>', desc: 'Inspect DNS resolver query logs.' },
          { cmd: 'grep "c2beacon" <file>', desc: 'Filter for malicious exfiltration domains.' }
        ],
        tasks: [
          {
            id: 't_dns_inspect',
            text: 'Audit DNS resolver query stream: cat /var/log/network/dns_queries.log',
            commandHint: 'cat /var/log/network/dns_queries.log',
            hint: 'Type: cat /var/log/network/dns_queries.log',
            validate: (event) => event.raw.includes('cat') && event.raw.includes('dns_queries.log')
          },
          {
            id: 't_dns_exfil',
            text: 'Isolate covert C2 exfiltration requests: grep "c2beacon" /var/log/network/dns_queries.log',
            commandHint: 'grep "c2beacon" /var/log/network/dns_queries.log',
            hint: 'Type: grep "c2beacon" /var/log/network/dns_queries.log',
            validate: (event) => event.raw.includes('grep') && event.raw.includes('c2beacon')
          }
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
        number: 1,
        title: 'SIEM Alert Triage & Incident Severity Prioritization',
        badge: 'Alert Triager',
        badgeIcon: 'Search',
        description: 'Correlate real-time security alerts, eliminate false positives, and triage high-impact critical events.',
        briefing: `Security Operations Centers (SOC) ingest millions of telemetry events every day. Analysts use Security Information and Event Management (SIEM) systems to correlate anomalous events and prioritize CRITICAL threat alerts over benign noise.`,
        commandReference: [
          { cmd: 'cat <file>', desc: 'Read structured SIEM alert JSON stream.' },
          { cmd: 'grep "CRITICAL" <file>', desc: 'Isolate top-priority incidents requiring immediate escalation.' }
        ],
        tasks: [
          {
            id: 't_siem_inspect',
            text: 'Inspect incoming SIEM alerts stream: cat /var/log/siem/alerts.json',
            commandHint: 'cat /var/log/siem/alerts.json',
            hint: 'Type: cat /var/log/siem/alerts.json',
            validate: (event) => event.raw.includes('cat') && event.raw.includes('alerts.json')
          },
          {
            id: 't_siem_critical',
            text: 'Filter for CRITICAL alerts: grep "CRITICAL" /var/log/siem/alerts.json',
            commandHint: 'grep "CRITICAL" /var/log/siem/alerts.json',
            hint: 'Type: grep "CRITICAL" /var/log/siem/alerts.json',
            validate: (event) => event.raw.includes('grep') && event.raw.includes('CRITICAL') && event.raw.includes('alerts.json')
          }
        ]
      },
      {
        id: 'mod-soc-2',
        number: 2,
        title: 'Ransomware Beacon Detection & C2 Egress',
        badge: 'Beacon Hunter',
        badgeIcon: 'Radio',
        description: 'Detect periodic C2 beaconing signatures in outbound firewall traffic and identify adversary controllers.',
        briefing: `Once an endpoint is infected, malware establishes Command and Control (C2) communication by sending periodic HTTP POST heartbeats to external servers. By analyzing interval regularity (jitter) and destination IPs, defenders discover active intrusions.`,
        commandReference: [
          { cmd: 'cat <file>', desc: 'Examine outbound network egress logs.' },
          { cmd: 'grep "heartbeat" <file>', desc: 'Filter for C2 heartbeat requests.' }
        ],
        tasks: [
          {
            id: 't_beacon_detect',
            text: 'Examine periodic beacon timing in egress log: cat /var/log/siem/c2_egress.log',
            commandHint: 'cat /var/log/siem/c2_egress.log',
            hint: 'Type: cat /var/log/siem/c2_egress.log',
            validate: (event) => event.raw.includes('cat') && event.raw.includes('c2_egress.log')
          },
          {
            id: 't_beacon_ip',
            text: 'Isolate external C2 IP address: grep "203.0.113.88" /var/log/siem/c2_egress.log',
            commandHint: 'grep "203.0.113.88" /var/log/siem/c2_egress.log',
            hint: 'Type: grep "203.0.113.88" /var/log/siem/c2_egress.log',
            validate: (event) => event.raw.includes('grep') && event.raw.includes('203.0.113.88')
          }
        ]
      },
      {
        id: 'mod-soc-3',
        number: 3,
        title: 'Cyber Kill Chain & Threat Actor Mapping',
        badge: 'Kill Chain Analyst',
        badgeIcon: 'Compass',
        description: 'Map incident artifacts across the Lockheed Martin Cyber Kill Chain and MITRE ATT&CK matrix.',
        briefing: `Incident responders map attacker operations across structured stages (Reconnaissance, Weaponization, Delivery, Exploitation, Installation, Command & Control, Actions on Objectives) to assess the breach scope and deploy countermeasures.`,
        commandReference: [
          { cmd: 'cat <file>', desc: 'Read incident forensic analysis timeline.' },
          { cmd: 'grep "T1" <file>', desc: 'Filter for mapped MITRE ATT&CK technique IDs.' }
        ],
        tasks: [
          {
            id: 't_killchain_map',
            text: 'Review incident kill chain mapping: cat ~/defense/kill_chain_incident_104.txt',
            commandHint: 'cat ~/defense/kill_chain_incident_104.txt',
            hint: 'Type: cat ~/defense/kill_chain_incident_104.txt',
            validate: (event) => event.raw.includes('cat') && event.raw.includes('kill_chain_incident_104.txt')
          },
          {
            id: 't_killchain_mitre',
            text: 'Extract MITRE technique codes: grep "T1" ~/defense/kill_chain_incident_104.txt',
            commandHint: 'grep "T1" ~/defense/kill_chain_incident_104.txt',
            hint: 'Type: grep "T1" ~/defense/kill_chain_incident_104.txt',
            validate: (event) => event.raw.includes('grep') && event.raw.includes('T1') && event.raw.includes('kill_chain_incident_104.txt')
          }
        ]
      },
      {
        id: 'mod-soc-4',
        number: 4,
        title: 'Endpoint Memory Dumps & Hollowed Processes',
        badge: 'Memory Forensicist',
        badgeIcon: 'Cpu',
        description: 'Analyze Volatility memory forensic lists to spot unlinked, injected svchost processes hiding in RAM.',
        briefing: `Advanced malware injects shellcode directly into legitimate system processes (Process Hollowing, T1055.012). While disk scans show clean files, memory forensics reveals discrepancies between process names, thread counts, and parent IDs.`,
        commandReference: [
          { cmd: 'cat <file>', desc: 'Inspect volatile RAM memory process tree.' },
          { cmd: 'grep "4492" <file>', desc: 'Isolate rogue injected process ID.' }
        ],
        tasks: [
          {
            id: 't_mem_inspect',
            text: 'Inspect active memory dump process list: cat /var/log/siem/volatility_pslist.txt',
            commandHint: 'cat /var/log/siem/volatility_pslist.txt',
            hint: 'Type: cat /var/log/siem/volatility_pslist.txt',
            validate: (event) => event.raw.includes('cat') && event.raw.includes('volatility_pslist.txt')
          },
          {
            id: 't_mem_hollow',
            text: 'Locate the suspicious injected svchost PID 4492: grep "4492" /var/log/siem/volatility_pslist.txt',
            commandHint: 'grep "4492" /var/log/siem/volatility_pslist.txt',
            hint: 'Type: grep "4492" /var/log/siem/volatility_pslist.txt',
            validate: (event) => event.raw.includes('grep') && event.raw.includes('4492') && event.raw.includes('volatility_pslist.txt')
          }
        ]
      },
      {
        id: 'mod-soc-5',
        number: 5,
        title: 'Incident Containment, Quarantine & Eradication',
        badge: 'SOC Commander',
        badgeIcon: 'Shield',
        description: 'Execute host isolation rules, revoke active session tokens, and establish network quarantine.',
        briefing: `The final step of incident response is swift containment to prevent lateral movement (NIST SP 800-61). Security administrators isolate the host from the internal subnet, revoke credential tokens, and seal access.`,
        commandReference: [
          { cmd: 'cat <file>', desc: 'Review host isolation policies.' },
          { cmd: 'grep "STATUS=QUARANTINED" <file>', desc: 'Verify host quarantine enforcement.' }
        ],
        tasks: [
          {
            id: 't_contain_isolate',
            text: 'Inspect host containment policy: cat /etc/security/containment_policy.conf',
            commandHint: 'cat /etc/security/containment_policy.conf',
            hint: 'Type: cat /etc/security/containment_policy.conf',
            validate: (event) => event.raw.includes('cat') && event.raw.includes('containment_policy.conf')
          },
          {
            id: 't_contain_verify',
            text: 'Verify quarantine state: grep "STATUS=QUARANTINED" /etc/security/containment_policy.conf',
            commandHint: 'grep "STATUS=QUARANTINED" /etc/security/containment_policy.conf',
            hint: 'Type: grep "STATUS=QUARANTINED" /etc/security/containment_policy.conf',
            validate: (event) => event.raw.includes('grep') && event.raw.includes('STATUS=QUARANTINED')
          }
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
        number: 1,
        title: 'Phishing Email & Domain Analyzer',
        badge: 'Phish Warden',
        badgeIcon: 'Search',
        playground: 'phishing',
        description: 'Mark deceptive cues in a sample message, then write the filter rules that quarantine it.',
        briefing: 'Phishing succeeds when a message borrows a trusted brand, invents urgency, and hides a different destination behind familiar link text. This lab uses one fabricated sample. You never leave the page, and you do not build a message to send to anyone.',
        commandReference: [
          { cmd: 'Compare sender vs reply-to', desc: 'A mismatch means replies leave the brand the user thinks they are talking to.' },
          { cmd: 'Compare link text vs href', desc: 'The visible label is not the host the browser would open.' }
        ],
        tasks: [
          {
            id: 't_phish_flags',
            text: 'In the Defense Playground, mark at least four red flags on the sample message.',
            commandHint: 'playground:phishing',
            hint: 'Check the sender spelling, the deadline language, the link destination, the attachment type, and Reply-To.',
            validate: (event) => event.playground === 't_phish_flags'
          },
          {
            id: 't_phish_rule',
            text: 'In Defense view, enable all three filter checks and quarantine the sample.',
            commandHint: 'playground:phishing',
            hint: 'Lookalike domains, mismatched link hosts, and macro attachments should all be stopped.',
            validate: (event) => event.playground === 't_phish_rule'
          }
        ]
      },
      {
        id: 'mod-human-2',
        number: 2,
        title: 'Password Hashing & Guessing Limits',
        badge: 'Hash Warden',
        badgeIcon: 'KeyRound',
        playground: 'password',
        description: 'Compare a fast hash against a slow salted hash with a rate limit, using a six-word practice list.',
        briefing: 'If a password database is stolen, a fast hash lets an attacker try millions of guesses per second. A unique salt makes precomputed tables useless for other users. A slow hash and a rate limit make online guessing stall. The playground only searches the six words printed on screen.',
        commandReference: [
          { cmd: 'salt', desc: 'A unique per-user value stored beside the hash so identical passwords do not share a hash.' },
          { cmd: 'bcrypt', desc: 'A deliberately slow password hash. Cost increases the time of every guess.' }
        ],
        tasks: [
          {
            id: 't_pass_fast',
            text: 'In Exploit view, run the fast comparison and watch the practice list resolve.',
            commandHint: 'playground:password',
            hint: 'A fast hash finishes the short list almost immediately. Notice which control is missing.',
            validate: (event) => event.playground === 't_pass_fast'
          },
          {
            id: 't_pass_harden',
            text: 'In Defense view, rerun with the slow hash and confirm the rate limit stops the run.',
            commandHint: 'playground:password',
            hint: 'Switch the toggle, then start the run again. The third attempt should be the last.',
            validate: (event) => event.playground === 't_pass_harden'
          }
        ]
      }
    ]
  }
];

export const COURSE_DATA = ALL_COURSES[0];
