// In-Memory POSIX-like Virtual File System and Command Interpreter for CyberGuardian

export class VirtualFileSystem {
  constructor() {
    this.currentUser = 'student';
    this.currentGroup = 'student';
    this.hostname = 'sandbox-node';
    this.cwd = '/home/student';
    this.commandHistory = [];
    this.listeners = new Set();
    this.runningProcesses = [
      { pid: 1, user: 'root', cpu: '0.1', mem: '0.4', time: '00:03:12', cmd: '/sbin/init splash' },
      { pid: 214, user: 'root', cpu: '0.0', mem: '0.2', time: '00:00:05', cmd: '/usr/sbin/sshd -D' },
      { pid: 389, user: 'syslog', cpu: '0.0', mem: '0.3', time: '00:00:18', cmd: '/usr/sbin/rsyslogd -n' },
      { pid: 842, user: 'student', cpu: '0.1', mem: '0.8', time: '00:00:02', cmd: '-bash' },
      { pid: 1337, user: 'www-data', cpu: '94.2', mem: '14.5', time: '00:41:20', cmd: '/tmp/.hidden/xmrig_miner --stratum stratum+tcp://xmr.pool:3333' }
    ];

    this.root = this.createDefaultTree();
  }

  createDefaultTree() {
    return {
      type: 'dir',
      name: '',
      owner: 'root',
      group: 'root',
      permissions: '0755',
      children: {
        'bin': {
          type: 'dir',
          name: 'bin',
          owner: 'root',
          group: 'root',
          permissions: '0755',
          children: {
            'bash': { type: 'file', name: 'bash', owner: 'root', group: 'root', permissions: '0755', content: '' },
            'ls': { type: 'file', name: 'ls', owner: 'root', group: 'root', permissions: '0755', content: '' },
            'cat': { type: 'file', name: 'cat', owner: 'root', group: 'root', permissions: '0755', content: '' },
            'grep': { type: 'file', name: 'grep', owner: 'root', group: 'root', permissions: '0755', content: '' }
          }
        },
        'etc': {
          type: 'dir',
          name: 'etc',
          owner: 'root',
          group: 'root',
          permissions: '0755',
          children: {
            'passwd': {
              type: 'file',
              name: 'passwd',
              owner: 'root',
              group: 'root',
              permissions: '0644',
              content: [
                'root:x:0:0:root:/root:/bin/bash',
                'daemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin',
                'syslog:x:104:110::/home/syslog:/usr/sbin/nologin',
                'www-data:x:33:33:www-data:/var/www:/usr/sbin/nologin',
                'student:x:1000:1000:CyberGuardian Student,,,:/home/student:/bin/bash'
              ].join('\n')
            },
            'hosts': {
              type: 'file',
              name: 'hosts',
              owner: 'root',
              group: 'root',
              permissions: '0644',
              content: '127.0.0.1   localhost\n10.0.0.1    cyberguardian.gateway\n10.0.4.15   sandbox-node\n'
            },
            'nginx': {
              type: 'dir',
              name: 'nginx',
              owner: 'root',
              group: 'root',
              permissions: '0755',
              children: {
                'security_headers.conf': {
                  type: 'file',
                  name: 'security_headers.conf',
                  owner: 'root',
                  group: 'root',
                  permissions: '0644',
                  content: 'add_header X-Frame-Options "DENY";\nadd_header X-Content-Type-Options "nosniff";\nadd_header Content-Security-Policy "default-src \'self\'; script-src \'self\';";\nadd_header Strict-Transport-Security "max-age=31536000; includeSubDomains";\n'
                }
              }
            },
            'security': {
              type: 'dir',
              name: 'security',
              owner: 'root',
              group: 'root',
              permissions: '0755',
              children: {
                'containment_policy.conf': {
                  type: 'file',
                  name: 'containment_policy.conf',
                  owner: 'root',
                  group: 'root',
                  permissions: '0644',
                  content: 'HOST_ISOLATION=ENABLED\nNETWORK=ISOLATED\nSTATUS=QUARANTINED\nDEFENSE_ACTION=REVOKE_SESSION_TOKENS\n'
                }
              }
            }
          }
        },
        'home': {
          type: 'dir',
          name: 'home',
          owner: 'root',
          group: 'root',
          permissions: '0755',
          children: {
            'student': {
              type: 'dir',
              name: 'student',
              owner: 'student',
              group: 'student',
              permissions: '0755',
              children: {
                'readme.txt': {
                  type: 'file',
                  name: 'readme.txt',
                  owner: 'student',
                  group: 'student',
                  permissions: '0644',
                  content: '=== CYBERGUARDIAN DEFENSE LAB ===\nAgent Clearance: LEVEL-1\nPrimary Objective: Master the Linux Command Line to detect breaches, manage permissions, and investigate incidents.\nUse the left panel for guided directives or ask GuardianAI for Socratic hints.'
                },
                '.bashrc': {
                  type: 'file',
                  name: '.bashrc',
                  owner: 'student',
                  group: 'student',
                  permissions: '0644',
                  content: '# ~/.bashrc: executed by bash for non-login shells.\nexport PS1="\\[\\033[01;32m\\]\\u@\\h\\[\\033[00m\\]:\\[\\033[01;34m\\]\\w\\[\\033[00m\\]\\$ "'
                },
                'projects': {
                  type: 'dir',
                  name: 'projects',
                  owner: 'student',
                  group: 'student',
                  permissions: '0755',
                  children: {
                    'network_scanner.py': {
                      type: 'file',
                      name: 'network_scanner.py',
                      owner: 'student',
                      group: 'student',
                      permissions: '0644',
                      content: '#!/usr/bin/env python3\n# CyberGuardian Diagnostic Probe\nimport socket\nprint("[+] CyberGuardian Network Probe initialized.")\nprint("[+] Gateway connection established at 10.0.0.1")\n'
                    }
                  }
                },
                'pcaps': {
                  type: 'dir',
                  name: 'pcaps',
                  owner: 'student',
                  group: 'student',
                  permissions: '0755',
                  children: {
                    'capture_summary.txt': {
                      type: 'file',
                      name: 'capture_summary.txt',
                      owner: 'student',
                      group: 'student',
                      permissions: '0644',
                      content: 'Frame 1: 10.0.4.15 -> 10.0.0.1 HTTP POST /api/login [User-Agent: Mozilla/5.0]\nFrame 2: Payload Data: user=admin&password=SuperSecretPassword2026! [LEAK: Unencrypted HTTP]\nFrame 3: 10.0.0.1 -> 10.0.4.15 HTTP 200 OK Set-Cookie: session=adm9281a\n'
                    },
                    'arp_cache.txt': {
                      type: 'file',
                      name: 'arp_cache.txt',
                      owner: 'student',
                      group: 'student',
                      permissions: '0644',
                      content: 'IP Address       HW Type   HW Address          Flags Mask  Iface\n10.0.0.1         ether     00:50:56:c0:00:08   C           eth0\n10.0.0.1         ether     00:0c:29:ab:32:11   C           eth0 [ALERT: DUPLICATE MAC - ARP SPOOF DETECTED]\n10.0.4.1         ether     00:50:56:fe:ea:71   C           eth0\n'
                    }
                  }
                },
                'defense': {
                  type: 'dir',
                  name: 'defense',
                  owner: 'student',
                  group: 'student',
                  permissions: '0755',
                  children: {
                    'kill_chain_incident_104.txt': {
                      type: 'file',
                      name: 'kill_chain_incident_104.txt',
                      owner: 'student',
                      group: 'student',
                      permissions: '0644',
                      content: '=== INCIDENT 104 KILL CHAIN REPORT ===\nPhase 1 Recon: T1595 Active Scanning from 198.51.100.22\nPhase 2 Delivery: T1566 Phishing spear attachment invoice.docm\nPhase 3 Exploitation: T1190 SQL Injection on public login endpoint\nPhase 4 Persistence: T1053 Cron schedule creating rogue daemon\nPhase 5 C2: T1071 Application Layer Protocol HTTP egress beaconing\n'
                    }
                  }
                }
              }
            }
          }
        },
        'var': {
          type: 'dir',
          name: 'var',
          owner: 'root',
          group: 'root',
          permissions: '0755',
          children: {
            'log': {
              type: 'dir',
              name: 'log',
              owner: 'root',
              group: 'root',
              permissions: '0755',
              children: {
                'auth.log': {
                  type: 'file',
                  name: 'auth.log',
                  owner: 'root',
                  group: 'root',
                  permissions: '0644',
                  content: [
                    'Oct 11 21:00:12 sandbox sshd[1042]: Accepted publickey for student from 10.0.4.15 port 49210 ssh2',
                    'Oct 11 21:05:44 sandbox sshd[1088]: Failed password for invalid user admin from 192.168.1.105 port 55102 ssh2',
                    'Oct 11 21:05:46 sandbox sshd[1090]: Failed password for invalid user root from 192.168.1.105 port 55104 ssh2',
                    'Oct 11 21:05:48 sandbox sshd[1092]: Failed password for invalid user test from 192.168.1.105 port 55106 ssh2',
                    'Oct 11 21:05:50 sandbox sshd[1094]: Failed password for invalid user support from 192.168.1.105 port 55108 ssh2',
                    'Oct 11 21:05:52 sandbox sshd[1096]: Failed password for invalid user oracle from 192.168.1.105 port 55110 ssh2',
                    'Oct 11 21:12:00 sandbox sudo[1120]: student : TTY=pts/0 ; PWD=/home/student ; USER=root ; COMMAND=/bin/ls'
                  ].join('\n')
                },
                'syslog': {
                  type: 'file',
                  name: 'syslog',
                  owner: 'root',
                  group: 'root',
                  permissions: '0644',
                  content: [
                    'Oct 11 20:59:01 sandbox systemd[1]: Started CyberGuardian Core Engine.',
                    'Oct 11 21:01:22 sandbox kernel: [ 14.281092] eth0: link up, 1000Mbps, full duplex',
                    'Oct 11 21:04:19 sandbox cron[482]: (root) CMD (/usr/local/bin/check_integrity.sh)',
                    'Oct 11 21:10:02 sandbox kernel: [ 45.109281] warning: high CPU usage detected on PID 1337'
                  ].join('\n')
                },
                'network': {
                  type: 'dir',
                  name: 'network',
                  owner: 'root',
                  group: 'root',
                  permissions: '0755',
                  children: {
                    'syn_flood.log': {
                      type: 'file',
                      name: 'syn_flood.log',
                      owner: 'root',
                      group: 'root',
                      permissions: '0644',
                      content: [
                        'Oct 11 22:01:02 gateway kernel: TCP: SYN_RECV packet from 198.51.100.22:49102 to 10.0.0.1:80',
                        'Oct 11 22:01:02 gateway kernel: TCP: SYN_RECV packet from 198.51.100.23:49104 to 10.0.0.1:80',
                        'Oct 11 22:01:03 gateway kernel: TCP: SYN_RECV packet from 198.51.100.24:49106 to 10.0.0.1:80',
                        'Oct 11 22:01:03 gateway kernel: TCP: SYN_RECV packet from 198.51.100.25:49108 to 10.0.0.1:80',
                        'Oct 11 22:01:04 gateway kernel: TCP: Possible SYN flooding on port 80. Sending cookies. Check SNMP counters.'
                      ].join('\n')
                    },
                    'dns_queries.log': {
                      type: 'file',
                      name: 'dns_queries.log',
                      owner: 'root',
                      group: 'root',
                      permissions: '0644',
                      content: [
                        'Oct 11 22:10:01 dns-relay: query A safe-site.org from 10.0.4.15',
                        'Oct 11 22:10:14 dns-relay: query A dXNlcj1hZG1pbjtwYXNzPXNlY3JldA.c2beacon.net from 10.0.4.15',
                        'Oct 11 22:10:15 dns-relay: query A aG9zdG5hbWU9c2FuZGJveC1ub2Rl.c2beacon.net from 10.0.4.15',
                        'Oct 11 22:10:16 dns-relay: query A b3M9dWJ1bnR1X2xpbnV4XzI0MDQ.c2beacon.net from 10.0.4.15'
                      ].join('\n')
                    }
                  }
                },
                'siem': {
                  type: 'dir',
                  name: 'siem',
                  owner: 'root',
                  group: 'root',
                  permissions: '0755',
                  children: {
                    'alerts.json': {
                      type: 'file',
                      name: 'alerts.json',
                      owner: 'root',
                      group: 'root',
                      permissions: '0644',
                      content: [
                        '{"id": "AL-1092", "timestamp": "2026-10-11T22:30:10Z", "severity": "CRITICAL", "source": "10.0.4.15", "rule": "Ransomware Encryptor Volume Spike", "action": "ALERT_TRIGGERED"}',
                        '{"id": "AL-1093", "timestamp": "2026-10-11T22:30:12Z", "severity": "HIGH", "source": "10.0.4.15", "rule": "Mass File Renaming .locked extension", "action": "PROCESS_FLAGGED"}',
                        '{"id": "AL-1094", "timestamp": "2026-10-11T22:31:00Z", "severity": "INFO", "source": "10.0.0.1", "rule": "Scheduled Health Probe", "action": "LOG_ONLY"}'
                      ].join('\n')
                    },
                    'c2_egress.log': {
                      type: 'file',
                      name: 'c2_egress.log',
                      owner: 'root',
                      group: 'root',
                      permissions: '0644',
                      content: [
                        '2026-10-11 22:15:00 POST /heartbeat HTTP/1.1 -> Host: 203.0.113.88:8080 Status: 200 OK (jitter: 60s)',
                        '2026-10-11 22:16:00 POST /heartbeat HTTP/1.1 -> Host: 203.0.113.88:8080 Status: 200 OK (jitter: 60s)',
                        '2026-10-11 22:17:00 POST /heartbeat HTTP/1.1 -> Host: 203.0.113.88:8080 Status: 200 OK (jitter: 60s)'
                      ].join('\n')
                    },
                    'volatility_pslist.txt': {
                      type: 'file',
                      name: 'volatility_pslist.txt',
                      owner: 'root',
                      group: 'root',
                      permissions: '0644',
                      content: [
                        'Offset(V)  Name                    PID   PPID   Thds     Hnds   Time',
                        '0x8549a020 system                4      0      98       512    2026-10-11 20:00:00',
                        '0x85b2c340 smss.exe              280    4      3        29     2026-10-11 20:00:01',
                        '0x8619a900 svchost.exe           840    620    22       340    2026-10-11 20:00:05',
                        '0x879fb100 svchost.exe           4492   1120   1        12     2026-10-11 22:14:02 [SUSPICIOUS: Injected Hollow Process]'
                      ].join('\n')
                    }
                  }
                }
              }
            },
            'www': {
              type: 'dir',
              name: 'www',
              owner: 'root',
              group: 'root',
              permissions: '0755',
              children: {
                'html': {
                  type: 'dir',
                  name: 'html',
                  owner: 'root',
                  group: 'root',
                  permissions: '0755',
                  children: {
                    'vulnerable_app': {
                      type: 'dir',
                      name: 'vulnerable_app',
                      owner: 'www-data',
                      group: 'www-data',
                      permissions: '0755',
                      children: {
                        'login.php': {
                          type: 'file',
                          name: 'login.php',
                          owner: 'www-data',
                          group: 'www-data',
                          permissions: '0644',
                          content: '<?php\n// VULNERABLE: Direct string interpolation into SQL query\n$user = $_POST["user"];\n$pass = $_POST["pass"];\n$query = "SELECT * FROM users WHERE user = \'" . $user . "\' AND pass = \'" . $pass . "\'";\n$result = $db->query($query);\n?>'
                        },
                        'login_secure.php': {
                          type: 'file',
                          name: 'login_secure.php',
                          owner: 'www-data',
                          group: 'www-data',
                          permissions: '0644',
                          content: '<?php\n// SECURE: Parameterized Prepared Statement\n$stmt = $pdo->prepare("SELECT id, user, role FROM users WHERE user = :u AND pass = :p");\n$stmt->execute([":u" => $user, ":p" => hash("sha256", $pass)]);\n$result = $stmt->fetch();\n?>'
                        },
                        'comment.js': {
                          type: 'file',
                          name: 'comment.js',
                          owner: 'www-data',
                          group: 'www-data',
                          permissions: '0644',
                          content: '// VULNERABLE: Raw unsanitized innerHTML assignment\nfunction postComment(input) {\n  document.getElementById("comments").innerHTML = "<p>" + input + "</p>";\n}'
                        },
                        'comment_secure.js': {
                          type: 'file',
                          name: 'comment_secure.js',
                          owner: 'www-data',
                          group: 'www-data',
                          permissions: '0644',
                          content: '// SECURE: DOMPurify HTML sanitization\nfunction postComment(input) {\n  const cleanHTML = DOMPurify.sanitize(input);\n  document.getElementById("comments").innerHTML = "<p>" + cleanHTML + "</p>";\n}'
                        },
                        'auth_header.txt': {
                          type: 'file',
                          name: 'auth_header.txt',
                          owner: 'www-data',
                          group: 'www-data',
                          permissions: '0644',
                          content: '{"alg":"none","typ":"JWT"}.{"sub":"cadet-102","role":"admin"}.unsigned'
                        },
                        'server.js': {
                          type: 'file',
                          name: 'server.js',
                          owner: 'www-data',
                          group: 'www-data',
                          permissions: '0644',
                          content: 'const file = req.query.file;\n// VULNERABLE: Path Traversal (CWE-22)\nfs.readFile("/var/www/uploads/" + file, (err, data) => res.send(data));'
                        },
                        'server_secure.js': {
                          type: 'file',
                          name: 'server_secure.js',
                          owner: 'www-data',
                          group: 'www-data',
                          permissions: '0644',
                          content: 'const safeFile = path.basename(req.query.file);\n// SECURE: Whitelisted directory isolation\nfs.readFile(path.join("/var/www/uploads", safeFile), (err, data) => res.send(data));'
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        'secret': {
          type: 'dir',
          name: 'secret',
          owner: 'root',
          group: 'root',
          permissions: '0755',
          children: {
            'classified_flag.txt': {
              type: 'file',
              name: 'classified_flag.txt',
              owner: 'root',
              group: 'root',
              permissions: '0000', // initially restricted
              content: 'CYBER{L1NUX_P3RM1SS10NS_M4ST3R_2026}\nSECURITY CLEARANCE GRANTED: You have bypassed file lock and identified defense permission tokens.'
            }
          }
        },
        'tmp': {
          type: 'dir',
          name: 'tmp',
          owner: 'root',
          group: 'root',
          permissions: '0777',
          children: {}
        }
      }
    };
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify(event) {
    for (const listener of this.listeners) {
      listener(event);
    }
  }

  getPrompt() {
    const displayPath = this.cwd === '/home/student' 
      ? '~' 
      : this.cwd.startsWith('/home/student/') 
        ? '~' + this.cwd.slice('/home/student'.length) 
        : this.cwd;
    return `\x1b[1;32m${this.currentUser}@${this.hostname}\x1b[0m:\x1b[1;34m${displayPath}\x1b[0m$ `;
  }

  resolvePath(pathStr) {
    if (!pathStr || pathStr === '.') return this.cwd;
    let resolved = pathStr;
    if (resolved === '~' || resolved.startsWith('~/')) {
      resolved = '/home/student' + resolved.slice(1);
    } else if (!resolved.startsWith('/')) {
      resolved = this.cwd === '/' ? `/${resolved}` : `${this.cwd}/${resolved}`;
    }

    const segments = resolved.split('/').filter(Boolean);
    const stack = [];
    for (const seg of segments) {
      if (seg === '.') continue;
      if (seg === '..') {
        stack.pop();
      } else {
        stack.push(seg);
      }
    }
    return '/' + stack.join('/');
  }

  getNode(pathStr) {
    const fullPath = this.resolvePath(pathStr);
    if (fullPath === '/') return this.root;
    const parts = fullPath.split('/').filter(Boolean);
    let curr = this.root;
    for (const part of parts) {
      if (!curr || curr.type !== 'dir' || !curr.children[part]) {
        return null;
      }
      curr = curr.children[part];
    }
    return curr;
  }

  getParentAndName(pathStr) {
    const fullPath = this.resolvePath(pathStr);
    const parts = fullPath.split('/').filter(Boolean);
    const name = parts.pop();
    const parentPath = '/' + parts.join('/');
    const parent = this.getNode(parentPath);
    return { parent, name, parentPath, fullPath };
  }

  formatPermissions(node) {
    const isDir = node.type === 'dir';
    const octal = node.permissions || (isDir ? '0755' : '0644');
    const oct = octal.length === 4 ? octal.slice(1) : octal;
    const digits = oct.split('').map(Number);
    const map = ['---', '--x', '-w-', '-wx', 'r--', 'r-x', 'rw-', 'rwx'];
    const pStr = digits.map(d => map[d] || '---').join('');
    return (isDir ? 'd' : '-') + pStr;
  }

  execute(rawCommand) {
    const trimmed = rawCommand.trim();
    if (!trimmed) {
      return { output: '', code: 0 };
    }
    this.commandHistory.push(trimmed);

    // Check for output redirection (> or >>)
    let commandToRun = trimmed;
    let redirectFile = null;
    let append = false;

    if (trimmed.includes('>>')) {
      const parts = trimmed.split('>>');
      commandToRun = parts[0].trim();
      redirectFile = parts[1].trim();
      append = true;
    } else if (trimmed.includes('>')) {
      const parts = trimmed.split('>');
      commandToRun = parts[0].trim();
      redirectFile = parts[1].trim();
      append = false;
    }

    // Check for pipes (|)
    const pipeline = commandToRun.split('|').map(c => c.trim()).filter(Boolean);
    let currentInput = '';
    let result = { output: '', code: 0 };

    for (let i = 0; i < pipeline.length; i++) {
      result = this.runSingleCommand(pipeline[i], currentInput);
      if (result.code !== 0 && i < pipeline.length - 1) {
        break;
      }
      currentInput = result.output;
    }

    // Handle redirection if specified
    if (redirectFile && result.code === 0) {
      const { parent, name, fullPath } = this.getParentAndName(redirectFile);
      if (!parent || parent.type !== 'dir') {
        result = { output: `bash: ${redirectFile}: No such file or directory`, code: 1 };
      } else {
        const existing = parent.children[name];
        if (existing && existing.type === 'dir') {
          result = { output: `bash: ${redirectFile}: Is a directory`, code: 1 };
        } else {
          const contentToWrite = append 
            ? ((existing ? existing.content : '') + (existing && existing.content ? '\n' : '') + result.output)
            : result.output;
          parent.children[name] = {
            type: 'file',
            name: name,
            owner: this.currentUser,
            group: this.currentGroup,
            permissions: '0644',
            content: contentToWrite
          };
          result.output = ''; // Silent redirection on success
        }
      }
    }

    this.notify({
      raw: trimmed,
      command: pipeline[0],
      cwd: this.cwd,
      success: result.code === 0,
      output: result.output,
      vfs: this
    });

    return result;
  }

  runSingleCommand(cmdStr, stdin = '') {
    const tokens = cmdStr.match(/(?:[^\s"']+|"[^"]*"|'[^']*')+/g) || [];
    if (!tokens.length) return { output: '', code: 0 };

    const cmd = tokens[0];
    const args = tokens.slice(1).map(arg => {
      if ((arg.startsWith('"') && arg.endsWith('"')) || (arg.startsWith("'") && arg.endsWith("'"))) {
        return arg.slice(1, -1);
      }
      return arg;
    });

    switch (cmd) {
      case 'pwd':
        return { output: this.cwd, code: 0 };

      case 'clear':
        return { output: '\x1b[2J\x1b[3J\x1b[H', code: 0 };

      case 'whoami':
        return { output: this.currentUser, code: 0 };

      case 'uname':
        if (args.includes('-a')) {
          return { output: 'Linux sandbox-node 6.1.0-21-amd64 #1 SMP PREEMPT_DYNAMIC Debian 6.1.90-1 x86_64 GNU/Linux', code: 0 };
        }
        return { output: 'Linux', code: 0 };

      case 'cd': {
        const target = args[0] || '~';
        const targetPath = this.resolvePath(target);
        const node = this.getNode(targetPath);
        if (!node) {
          return { output: `bash: cd: ${target}: No such file or directory`, code: 1 };
        }
        if (node.type !== 'dir') {
          return { output: `bash: cd: ${target}: Not a directory`, code: 1 };
        }
        this.cwd = targetPath;
        return { output: '', code: 0 };
      }

      case 'ls': {
        let showAll = false;
        let longFormat = false;
        const paths = [];

        for (const arg of args) {
          if (arg.startsWith('-')) {
            if (arg.includes('a')) showAll = true;
            if (arg.includes('l')) longFormat = true;
          } else {
            paths.push(arg);
          }
        }

        const targetPath = paths[0] || '.';
        const node = this.getNode(targetPath);
        if (!node) {
          return { output: `ls: cannot access '${targetPath}': No such file or directory`, code: 1 };
        }

        if (node.type === 'file') {
          if (longFormat) {
            const p = this.formatPermissions(node);
            const size = (node.content || '').length.toString().padStart(5);
            return { output: `${p} 1 ${node.owner} ${node.group} ${size} Oct 11 21:00 ${node.name}`, code: 0 };
          }
          return { output: node.name, code: 0 };
        }

        const entries = Object.keys(node.children);
        const filtered = showAll ? ['.', '..', ...entries] : entries.filter(e => !e.startsWith('.'));
        filtered.sort();

        if (longFormat) {
          const lines = [`total ${filtered.length * 4}`];
          for (const item of filtered) {
            let childNode;
            if (item === '.') childNode = node;
            else if (item === '..') childNode = this.getNode(this.resolvePath('..')) || node;
            else childNode = node.children[item];

            const p = this.formatPermissions(childNode);
            const size = childNode.type === 'dir' ? '4096' : (childNode.content || '').length.toString().padStart(4);
            const colorName = childNode.type === 'dir' 
              ? `\x1b[1;34m${item}\x1b[0m` 
              : (childNode.permissions && childNode.permissions.includes('7') ? `\x1b[1;32m${item}\x1b[0m` : item);
            lines.push(`${p} 1 ${childNode.owner} ${childNode.group} ${size} Oct 11 21:00 ${colorName}`);
          }
          return { output: lines.join('\n'), code: 0 };
        }

        const formatted = filtered.map(item => {
          const childNode = node.children[item];
          if (childNode && childNode.type === 'dir') {
            return `\x1b[1;34m${item}\x1b[0m`;
          }
          return item;
        });

        return { output: formatted.join('  '), code: 0 };
      }

      case 'mkdir': {
        let makeParents = false;
        const dirs = [];
        for (const arg of args) {
          if (arg === '-p') makeParents = true;
          else if (!arg.startsWith('-')) dirs.push(arg);
        }

        if (!dirs.length) return { output: 'mkdir: missing operand', code: 1 };

        for (const dirPath of dirs) {
          const resolved = this.resolvePath(dirPath);
          const parts = resolved.split('/').filter(Boolean);
          let curr = this.root;

          for (let i = 0; i < parts.length; i++) {
            const part = parts[i];
            if (!curr.children[part]) {
              if (i === parts.length - 1 || makeParents) {
                curr.children[part] = {
                  type: 'dir',
                  name: part,
                  owner: this.currentUser,
                  group: this.currentGroup,
                  permissions: '0755',
                  children: {}
                };
              } else {
                return { output: `mkdir: cannot create directory '${dirPath}': No such file or directory`, code: 1 };
              }
            } else if (curr.children[part].type !== 'dir') {
              return { output: `mkdir: cannot create directory '${dirPath}': Not a directory`, code: 1 };
            }
            curr = curr.children[part];
          }
        }
        return { output: '', code: 0 };
      }

      case 'touch': {
        if (!args.length) return { output: 'touch: missing file operand', code: 1 };
        for (const f of args) {
          const { parent, name } = this.getParentAndName(f);
          if (!parent || parent.type !== 'dir') {
            return { output: `touch: cannot touch '${f}': No such file or directory`, code: 1 };
          }
          if (!parent.children[name]) {
            parent.children[name] = {
              type: 'file',
              name: name,
              owner: this.currentUser,
              group: this.currentGroup,
              permissions: '0644',
              content: ''
            };
          }
        }
        return { output: '', code: 0 };
      }

      case 'cat': {
        if (!args.length && stdin) {
          return { output: stdin, code: 0 };
        }
        if (!args.length) return { output: '', code: 0 };

        const outputs = [];
        for (const filePath of args) {
          const node = this.getNode(filePath);
          if (!node) {
            return { output: `cat: ${filePath}: No such file or directory`, code: 1 };
          }
          if (node.type === 'dir') {
            return { output: `cat: ${filePath}: Is a directory`, code: 1 };
          }
          // Check permissions
          if (node.permissions === '0000' && this.currentUser !== 'root') {
            return { output: `cat: ${filePath}: Permission denied`, code: 1 };
          }
          outputs.push(node.content);
        }
        return { output: outputs.join('\n'), code: 0 };
      }

      case 'head': {
        let linesCount = 10;
        let fileIndex = 0;
        if (args[0] === '-n' && args[1]) {
          linesCount = parseInt(args[1], 10) || 10;
          fileIndex = 2;
        }

        const sourceContent = args[fileIndex] 
          ? (this.getNode(args[fileIndex]) ? this.getNode(args[fileIndex]).content : null) 
          : stdin;

        if (sourceContent === null && args[fileIndex]) {
          return { output: `head: cannot open '${args[fileIndex]}' for reading: No such file or directory`, code: 1 };
        }

        const splitLines = (sourceContent || '').split('\n');
        return { output: splitLines.slice(0, linesCount).join('\n'), code: 0 };
      }

      case 'tail': {
        let linesCount = 10;
        let fileIndex = 0;
        if (args[0] === '-n' && args[1]) {
          linesCount = parseInt(args[1], 10) || 10;
          fileIndex = 2;
        }

        const sourceContent = args[fileIndex] 
          ? (this.getNode(args[fileIndex]) ? this.getNode(args[fileIndex]).content : null) 
          : stdin;

        if (sourceContent === null && args[fileIndex]) {
          return { output: `tail: cannot open '${args[fileIndex]}' for reading: No such file or directory`, code: 1 };
        }

        const splitLines = (sourceContent || '').split('\n');
        return { output: splitLines.slice(-linesCount).join('\n'), code: 0 };
      }

      case 'cp': {
        if (args.length < 2) return { output: 'cp: missing destination file operand', code: 1 };
        const srcNode = this.getNode(args[0]);
        if (!srcNode || srcNode.type !== 'file') {
          return { output: `cp: cannot stat '${args[0]}': No such file or directory`, code: 1 };
        }
        const { parent, name } = this.getParentAndName(args[1]);
        if (!parent) return { output: `cp: cannot create regular file '${args[1]}': No such file or directory`, code: 1 };
        
        parent.children[name] = {
          type: 'file',
          name: name,
          owner: this.currentUser,
          group: this.currentGroup,
          permissions: srcNode.permissions,
          content: srcNode.content
        };
        return { output: '', code: 0 };
      }

      case 'mv': {
        if (args.length < 2) return { output: 'mv: missing destination file operand', code: 1 };
        const srcInfo = this.getParentAndName(args[0]);
        if (!srcInfo.parent || !srcInfo.parent.children[srcInfo.name]) {
          return { output: `mv: cannot stat '${args[0]}': No such file or directory`, code: 1 };
        }
        const node = srcInfo.parent.children[srcInfo.name];
        delete srcInfo.parent.children[srcInfo.name];

        const destInfo = this.getParentAndName(args[1]);
        if (!destInfo.parent) {
          return { output: `mv: cannot move to '${args[1]}': No such file or directory`, code: 1 };
        }
        node.name = destInfo.name;
        destInfo.parent.children[destInfo.name] = node;
        return { output: '', code: 0 };
      }

      case 'rm': {
        let recursive = false;
        const targets = [];
        for (const arg of args) {
          if (arg === '-r' || arg === '-rf' || arg === '-R') recursive = true;
          else if (!arg.startsWith('-')) targets.push(arg);
        }

        if (!targets.length) return { output: 'rm: missing operand', code: 1 };
        for (const t of targets) {
          const { parent, name } = this.getParentAndName(t);
          if (!parent || !parent.children[name]) {
            return { output: `rm: cannot remove '${t}': No such file or directory`, code: 1 };
          }
          if (parent.children[name].type === 'dir' && !recursive) {
            return { output: `rm: cannot remove '${t}': Is a directory`, code: 1 };
          }
          delete parent.children[name];
        }
        return { output: '', code: 0 };
      }

      case 'grep': {
        let pattern = '';
        let fileArg = '';
        let caseInsensitive = false;

        for (const a of args) {
          if (a === '-i') caseInsensitive = true;
          else if (!pattern) pattern = a;
          else if (!fileArg) fileArg = a;
        }

        const source = fileArg ? (this.getNode(fileArg) ? this.getNode(fileArg).content : null) : stdin;
        if (fileArg && source === null) {
          return { output: `grep: ${fileArg}: No such file or directory`, code: 1 };
        }

        const lines = (source || '').split('\n');
        const re = new RegExp(pattern, caseInsensitive ? 'i' : '');
        const matched = lines.filter(l => re.test(l));
        return { output: matched.join('\n'), code: matched.length > 0 ? 0 : 1 };
      }

      case 'find': {
        const rootPath = args[0] && !args[0].startsWith('-') ? args[0] : '.';
        let namePattern = '*';
        const nameIdx = args.indexOf('-name');
        if (nameIdx !== -1 && args[nameIdx + 1]) {
          namePattern = args[nameIdx + 1].replace(/"/g, '').replace(/'/g, '');
        }

        const startNode = this.getNode(rootPath);
        if (!startNode) return { output: `find: '${rootPath}': No such file or directory`, code: 1 };

        const results = [];
        const regex = new RegExp('^' + namePattern.replace(/\./g, '\\.').replace(/\*/g, '.*') + '$');

        const traverse = (node, curPath) => {
          if (regex.test(node.name || curPath)) {
            results.push(curPath);
          }
          if (node.type === 'dir') {
            for (const childName in node.children) {
              const nextPath = curPath === '/' ? `/${childName}` : `${curPath}/${childName}`;
              traverse(node.children[childName], nextPath);
            }
          }
        };

        traverse(startNode, this.resolvePath(rootPath));
        return { output: results.join('\n'), code: 0 };
      }

      case 'wc': {
        let countLines = false;
        let countWords = false;
        let targetFile = '';

        for (const a of args) {
          if (a === '-l') countLines = true;
          else if (a === '-w') countWords = true;
          else if (!targetFile) targetFile = a;
        }

        const text = targetFile ? (this.getNode(targetFile) ? this.getNode(targetFile).content : '') : stdin;
        const lineCount = text ? text.split('\n').length : 0;
        const wordCount = text ? text.trim().split(/\s+/).filter(Boolean).length : 0;

        if (countLines) return { output: `${lineCount}${targetFile ? ' ' + targetFile : ''}`, code: 0 };
        if (countWords) return { output: `${wordCount}${targetFile ? ' ' + targetFile : ''}`, code: 0 };
        return { output: `${lineCount} ${wordCount} ${text.length} ${targetFile}`, code: 0 };
      }

      case 'chmod': {
        if (args.length < 2) return { output: 'chmod: missing operand', code: 1 };
        const mode = args[0];
        const target = args[1];
        const node = this.getNode(target);
        if (!node) return { output: `chmod: cannot access '${target}': No such file or directory`, code: 1 };

        if (/^[0-7]{3,4}$/.test(mode)) {
          node.permissions = mode.length === 3 ? '0' + mode : mode;
          return { output: '', code: 0 };
        } else if (mode.includes('+x')) {
          node.permissions = '0755';
          return { output: '', code: 0 };
        }
        return { output: `chmod: invalid mode: '${mode}'`, code: 1 };
      }

      case 'chown': {
        if (args.length < 2) return { output: 'chown: missing operand', code: 1 };
        const ownerPart = args[0].split(':');
        const target = args[1];
        const node = this.getNode(target);
        if (!node) return { output: `chown: cannot access '${target}': No such file or directory`, code: 1 };

        node.owner = ownerPart[0];
        if (ownerPart[1]) node.group = ownerPart[1];
        return { output: '', code: 0 };
      }

      case 'ps': {
        const lines = ['USER       PID  %CPU %MEM    TIME COMMAND'];
        for (const proc of this.runningProcesses) {
          const user = proc.user.padEnd(8);
          const pid = proc.pid.toString().padStart(6);
          const cpu = proc.cpu.padStart(5);
          const mem = proc.mem.padStart(5);
          const time = proc.time.padStart(8);
          lines.push(`${user} ${pid} ${cpu} ${mem} ${time} ${proc.cmd}`);
        }
        return { output: lines.join('\n'), code: 0 };
      }

      case 'kill': {
        if (!args.length) return { output: 'kill: usage: kill [-s sigspec | -n signum | -sigspec] pid | jobspec ...', code: 1 };
        const pid = parseInt(args[0], 10);
        const idx = this.runningProcesses.findIndex(p => p.pid === pid);
        if (idx === -1) {
          return { output: `bash: kill: (${pid}) - No such process`, code: 1 };
        }
        const killed = this.runningProcesses.splice(idx, 1)[0];
        return { output: `[+] Process ${killed.pid} (${killed.cmd.split(' ')[0]}) terminated successfully.`, code: 0 };
      }

      case 'echo': {
        return { output: args.join(' '), code: 0 };
      }

      case 'ping': {
        const host = args.filter(a => !a.startsWith('-'))[0] || '10.0.0.1';
        return {
          output: [
            `PING ${host} (${host}) 56(84) bytes of data.`,
            `64 bytes from ${host}: icmp_seq=1 ttl=64 time=0.412 ms`,
            `64 bytes from ${host}: icmp_seq=2 ttl=64 time=0.388 ms`,
            `64 bytes from ${host}: icmp_seq=3 ttl=64 time=0.405 ms`,
            `--- ${host} ping statistics ---`,
            `3 packets transmitted, 3 received, 0% packet loss, time 2045ms`,
            `rtt min/avg/max/mdev = 0.388/0.401/0.412/0.010 ms`
          ].join('\n'),
          code: 0
        };
      }

      case 'curl': {
        const url = args.filter(a => !a.startsWith('-'))[0] || 'http://10.0.0.1/status';
        if (args.includes('-I') || args.includes('-i') || args.includes('--head')) {
          return {
            output: [
              `HTTP/1.1 200 OK`,
              `Server: CyberGuardian-Gateway/2.4.52`,
              `Date: Fri, 11 Oct 2026 21:30:00 GMT`,
              `Content-Type: application/json; charset=UTF-8`,
              `X-Security-Firewall: ACTIVE`,
              `Connection: keep-alive`
            ].join('\n'),
            code: 0
          };
        }
        return {
          output: JSON.stringify({ status: 'ONLINE', nodes: 4, defensePolicy: 'ENFORCED', gateway: '10.0.0.1' }, null, 2),
          code: 0
        };
      }

      case 'ifconfig':
      case 'ip': {
        return {
          output: [
            `eth0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500`,
            `        inet 10.0.4.15  netmask 255.255.255.0  broadcast 10.0.4.255`,
            `        ether 02:42:0a:00:04:0f  txqueuelen 0  (Ethernet)`,
            `        RX packets 14298  bytes 18921820 (18.0 MB)`,
            `        TX packets 11204  bytes 1421092 (1.3 MB)`,
            ``,
            `lo: flags=73<UP,LOOPBACK,RUNNING>  mtu 65536`,
            `        inet 127.0.0.1  netmask 255.0.0.0`,
            `        loop  txqueuelen 1000  (Local Loopback)`
          ].join('\n'),
          code: 0
        };
      }

      case 'free': {
        return {
          output: [
            `               total        used        free      shared  buff/cache   available`,
            `Mem:            3938        1124        1840          12         974        2580`,
            `Swap:           2048           0        2048`
          ].join('\n'),
          code: 0
        };
      }

      case 'df': {
        return {
          output: [
            `Filesystem     1K-blocks     Used Available Use% Mounted on`,
            `overlay         31457280  4194304  27262976  14% /`,
            `tmpfs              65536        0     65536   0% /dev`,
            `/dev/sda1       31457280  4194304  27262976  14% /etc/hosts`
          ].join('\n'),
          code: 0
        };
      }

      case 'help': {
        return {
          output: [
            `\x1b[1;36m=== CYBERGUARDIAN VIRTUAL POSIX ENVIRONMENT ===\x1b[0m`,
            `Core commands available:`,
            `  \x1b[1;32mpwd\x1b[0m, \x1b[1;32mls\x1b[0m, \x1b[1;32mcd\x1b[0m, \x1b[1;32mmkdir\x1b[0m, \x1b[1;32mtouch\x1b[0m, \x1b[1;32mcat\x1b[0m, \x1b[1;32mhead\x1b[0m, \x1b[1;32mtail\x1b[0m`,
            `  \x1b[1;32mcp\x1b[0m, \x1b[1;32mmv\x1b[0m, \x1b[1;32mrm\x1b[0m, \x1b[1;32mgrep\x1b[0m, \x1b[1;32mfind\x1b[0m, \x1b[1;32mwc\x1b[0m, \x1b[1;32mchmod\x1b[0m, \x1b[1;32mchown\x1b[0m`,
            `  \x1b[1;32mps\x1b[0m, \x1b[1;32mkill\x1b[0m, \x1b[1;32muname\x1b[0m, \x1b[1;32mwhoami\x1b[0m, \x1b[1;32mping\x1b[0m, \x1b[1;32mcurl\x1b[0m, \x1b[1;32mifconfig\x1b[0m`,
            `  \x1b[1;32mfree\x1b[0m, \x1b[1;32mdf\x1b[0m, \x1b[1;32mecho\x1b[0m, \x1b[1;32mclear\x1b[0m`,
            `Supports piping (\x1b[1;33m|\x1b[0m) and file redirection (\x1b[1;33m>\x1b[0m, \x1b[1;33m>>\x1b[0m).`
          ].join('\n'),
          code: 0
        };
      }

      default:
        return { output: `bash: ${cmd}: command not found. Type 'help' for available commands.`, code: 127 };
    }
  }

  getAutocompletions(prefix) {
    const tokens = prefix.split(' ');
    const lastToken = tokens[tokens.length - 1];
    
    // Command autocompletion if single token
    if (tokens.length === 1) {
      const allCmds = ['pwd', 'ls', 'cd', 'mkdir', 'touch', 'cat', 'head', 'tail', 'cp', 'mv', 'rm', 'grep', 'find', 'wc', 'chmod', 'chown', 'ps', 'kill', 'uname', 'whoami', 'ping', 'curl', 'ifconfig', 'free', 'df', 'echo', 'clear', 'help'];
      return allCmds.filter(c => c.startsWith(lastToken));
    }

    // Path autocompletion
    const lastSlash = lastToken.lastIndexOf('/');
    let searchDir = '.';
    let filePrefix = lastToken;
    if (lastSlash !== -1) {
      searchDir = lastToken.slice(0, lastSlash) || '/';
      filePrefix = lastToken.slice(lastSlash + 1);
    }

    const dirNode = this.getNode(searchDir);
    if (!dirNode || dirNode.type !== 'dir') return [];

    const matches = Object.keys(dirNode.children).filter(k => k.startsWith(filePrefix));
    return matches.map(m => (lastSlash !== -1 ? lastToken.slice(0, lastSlash + 1) + m : m));
  }
}
