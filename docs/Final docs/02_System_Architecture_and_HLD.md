# 2. System Architecture & High-Level Design

## 2.1 Architectural Style
CyberGuardian uses a **hybrid monolith** backend and a **single-page application (SPA)** frontend.

- The Express server is organised by domain modules (auth, user, course, progress, badge, lab, mentor, health).  
- The React SPA owns all interactive labs. Attack simulations never execute shell code on the server.  
- MySQL stores durable learning state. Gemini (optional) powers the mentor through a backend gateway.

This matches MVP Concept A from the project roadmap: **Interactive In-Browser Cyber Lab** — ultra-low infrastructure cost and 100% sandbox isolation by design.

---

## 2.2 High-Level Component Diagram

```mermaid
flowchart TB
  subgraph Client["Browser Client (React + Vite)"]
    UI[Pages: Landing, Dashboard, Catalog, Profile]
    Lab[LabView]
    Term[TerminalView + xterm.js]
    VFS[VirtualFileSystem]
    PG[DefensePlayground]
    Theory[TheoryView + Quiz]
    MentorUI[AiMentor Chat Widget]
    APIClient[api.js client]
  end

  subgraph Server["Node.js Express Hybrid Monolith"]
    MW[CORS / JSON / Logger / Errors]
    Auth[Auth Module]
    User[User Module]
    Course[Course Module]
    Progress[Progress Module]
    Badge[Badge Module]
    LabLog[Lab Log Module]
    Mentor[Mentor Gateway]
  end

  subgraph Data["Persistence & AI"]
    MySQL[(MySQL 8)]
    Gemini[Gemini 2.5 Flash API]
    LocalAI[Local Socratic Engine]
  end

  UI --> Lab
  Lab --> Term
  Lab --> PG
  Lab --> MentorUI
  Term --> VFS
  UI --> Theory
  UI --> APIClient
  MentorUI --> APIClient
  Lab --> APIClient

  APIClient --> MW
  MW --> Auth & User & Course & Progress & Badge & LabLog & Mentor
  Auth --> MySQL
  User --> MySQL
  Course --> MySQL
  Progress --> MySQL
  Badge --> MySQL
  LabLog --> MySQL
  Mentor --> Gemini
  Mentor --> LocalAI
```

---

## 2.3 Technology Stack

| Layer | Choice | Role |
|-------|--------|------|
| UI Framework | React 18 | Component-driven learning UX |
| Build Tool | Vite 6 | Fast SPA builds and HMR |
| Styling | Tailwind CSS 3 | Utility-first cyber UI |
| Terminal | `@xterm/xterm` + FitAddon | In-browser POSIX feel |
| Backend | Express 5 | REST API hybrid monolith |
| Auth crypto | bcryptjs + HMAC tokens | Password hashing + sessions |
| Database | MySQL 8.4 (`mysql2`) | Relational progress model |
| AI | Gemini API (`GEMINI_API_KEY`) | Socratic tutoring |
| AI fallback | `shared/guardian-engine.js` | Works offline / on refusal |
| Optional infra | Docker Compose MySQL | Portable DB when needed |
| Dev orchestration | concurrently | `npm run dev:all` |

---

## 2.4 Frontend Information Architecture

```mermaid
flowchart TD
  Landing --> AuthModal
  Landing --> Dashboard
  Dashboard --> Catalog
  Dashboard --> Profile
  Dashboard --> Lab
  Catalog --> Lab
  Lab --> Theory
  Theory --> Lab
  Lab --> CertificateModal
  Profile --> CertificateModal
```

### Major UI surfaces
| Page / Component | Responsibility |
|------------------|----------------|
| `LandingPage` | Marketing + CTA into academy |
| `AuthModal` | Login / register / demo clearance |
| `Dashboard` | Resume lab, track switcher, XP |
| `CourseCatalog` | Five pathways → launch correct course |
| `CadetProfile` | Badges, skill radar, certificates |
| `TheoryView` | Threat scenario, concepts, quiz |
| `LabView` | Split: directives/AI + terminal/playground |
| `DefensePlayground` | Exploit vs Defense interactive labs |
| `TerminalView` | xterm bound to VFS |
| `AiMentor` | Chat UI for GuardianAI |
| `CertificateModal` | Course completion artefact |

---

## 2.5 Backend Module Map

```mermaid
flowchart LR
  API["/api"] --> Health
  API --> Auth
  API --> User
  API --> Courses
  API --> Progress
  API --> Badges
  API --> Lab
  API --> Mentor

  Auth --> UsersTable[(users)]
  User --> UsersTable
  User --> UserBadges[(user_badges)]
  User --> UserProgress[(user_progress)]
  Courses --> CoursesTable[(courses)]
  Courses --> ModulesTable[(modules)]
  Progress --> UserProgress
  Progress --> QuizAttempts[(quiz_attempts)]
  Badges --> BadgesTable[(badges)]
  Lab --> LabLogs[(lab_command_logs)]
```

### Representative endpoints
| Method | Path | Purpose |
|--------|------|---------|
| GET | `/api/health` | DB connectivity & service status |
| POST | `/api/auth/login` | Authenticate / auto-provision demo |
| POST | `/api/auth/register` | Enrol cadet |
| GET | `/api/auth/session` | Validate bearer token |
| GET | `/api/user/profile/:id` | Profile, badges, completed modules |
| GET | `/api/courses` | Course catalogue from DB |
| POST | `/api/progress/task` | Credit task XP |
| POST | `/api/progress/module` | Mark module complete + bonus XP |
| POST | `/api/progress/quiz` | Persist quiz attempt |
| POST | `/api/lab/log` | Audit sandbox commands |
| POST | `/api/mentor/chat` | GuardianAI reply |

---

## 2.6 Logical Data Model

```mermaid
erDiagram
  USERS ||--o{ USER_PROGRESS : completes
  USERS ||--o{ USER_BADGES : earns
  USERS ||--o{ QUIZ_ATTEMPTS : attempts
  USERS ||--o{ LAB_COMMAND_LOGS : executes
  COURSES ||--|{ MODULES : contains
  COURSES ||--o{ USER_PROGRESS : tracked_in
  MODULES ||--o{ USER_PROGRESS : tracked_in
  BADGES ||--o{ USER_BADGES : awarded_as

  USERS {
    int id PK
    string email
    string password_hash
    string callsign
    string clearance
    string tier
    int xp
    int streak
  }
  COURSES {
    string id PK
    string title
    string level
    int total_modules
    int xp_reward
    json skills
  }
  MODULES {
    string id PK
    string course_id FK
    int module_number
    string badge
    json tasks
  }
  BADGES {
    string id PK
    string title
    string mitre
    string hash_code
  }
  USER_PROGRESS {
    int id PK
    int user_id FK
    string course_id FK
    string module_id FK
    bool is_completed
  }
  QUIZ_ATTEMPTS {
    int id PK
    int user_id FK
    string module_id
    bool correct
  }
  LAB_COMMAND_LOGS {
    int id PK
    int user_id FK
    string command
    int exit_code
    bool success
  }
```

---

## 2.7 Learning Experience Flow (End-to-End)

```mermaid
sequenceDiagram
  actor Cadet
  participant UI as React SPA
  participant API as Express API
  participant DB as MySQL
  participant AI as Gemini / Local Tutor

  Cadet->>UI: Open academy / login
  UI->>API: POST /auth/login
  API->>DB: Verify bcrypt hash
  API-->>UI: user + token
  Cadet->>UI: Launch course module
  UI->>UI: Load TheoryView quiz
  UI->>API: POST /progress/quiz
  Cadet->>UI: Enter lab
  alt Terminal lab
    Cadet->>UI: Run POSIX command
    UI->>UI: VFS.execute + validate task
    UI->>API: POST /lab/log + /progress/task
  else Defense playground
    Cadet->>UI: Exploit then Defense actions
    UI->>UI: report playground task IDs
    UI->>API: POST /progress/task|/module
  end
  Cadet->>UI: Ask GuardianAI
  UI->>API: POST /mentor/chat
  API->>AI: Socratic prompt + guardrails
  AI-->>API: Complete reply
  API-->>UI: text + source/model
  UI-->>Cadet: XP / badge / certificate
```

---

## 2.8 Lab Subsystem Design

### Two sandbox strategies

```mermaid
flowchart TB
  subgraph TerminalLabs["Terminal Labs"]
    T1[Linux Fundamentals]
    T2[Network Forensics]
    T3[SOC Triage]
    VFS[In-memory POSIX VFS]
    T1 --> VFS
    T2 --> VFS
    T3 --> VFS
  end

  subgraph PlaygroundLabs["Defense Playgrounds"]
    P1[SQLi / XSS / JWT / Path / Headers]
    P2[Phishing Analyzer]
    P3[Password Hash Simulator]
    Toggle[Exploit View ↔ Defense View]
    P1 --> Toggle
    P2 --> Toggle
    P3 --> Toggle
  end

  Validators[Task validators in courses.js]
  TerminalLabs --> Validators
  PlaygroundLabs --> Validators
```

### Why client-side sandboxes?
1. **Safety:** no server RCE surface from student commands  
2. **Speed:** labs start instantly  
3. **Cost:** no per-user container fleet for MVP  
4. **Pedagogy:** still supports observe → fix → verify loops  

---

## 2.9 GuardianAI Design

```mermaid
flowchart TD
  Q[Student question] --> LocalGate{Local refusal patterns?}
  LocalGate -->|Refuse| R[Ethical refusal text]
  LocalGate -->|Allow| Key{GEMINI_API_KEY set?}
  Key -->|No| L[Local Socratic engine]
  Key -->|Yes| G[Gemini 2.5 Flash<br/>thinkingBudget=0]
  G -->|OK complete text| Out[Reply to UI]
  G -->|Error / truncated| L
  L --> Out
```

Design principles:
- Socratic hints over ready-made exploit dumps  
- Module/task context injected into prompts  
- Thinking disabled so replies do not truncate mid-sentence  
- Hard refusals for real domains, malware, and weaponization  

---

## 2.10 Deployment View

```mermaid
flowchart LR
  Dev[Developer Machine] --> Vite[Vite :5173]
  Dev --> API[Express :5000]
  API --> MySQL[(MySQL :3306)]
  API --> GeminiCloud[Google Generative Language API]
  Optional[docker compose mysql] -.-> MySQL
```

### Runtime commands
| Command | Effect |
|---------|--------|
| `npm run db:setup` | Migrate schema + seed |
| `npm run db:up` | Start MySQL via Docker Compose |
| `npm run dev:all` | Vite + API together |
| `npm run smoke:labs` | Validate all lab tasks |
| `npm run build` | Production frontend bundle |

### Environment (high level)
- `PORT`, `VITE_API_URL`  
- `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`  
- `JWT_SECRET`  
- `AI_PROVIDER`, `AI_MODEL`, `GEMINI_API_KEY`  

---

## 2.11 Security Architecture (MVP)

```mermaid
flowchart TB
  subgraph Boundaries
    B1[Labs never leave the browser sandbox]
    B2[Passwords hashed with bcrypt]
    B3[HMAC session tokens]
    B4[Mentor refuses real-world attack help]
    B5[No server-side shell for student input]
  end
```

Threats explicitly *not* introduced by the MVP design:
- Arbitrary remote code execution from lab commands  
- Live phishing campaigns against real people  
- Password cracking against real hashes outside the printed practice list  

---

## 2.12 Design Decisions Summary

| Decision | Rationale |
|----------|-----------|
| SPA + hybrid monolith | Fast academic delivery; clear module boundaries |
| MySQL relational model | Natural fit for users ↔ courses ↔ progress |
| Client VFS / playgrounds | Safety + cost for beginner labs |
| Gemini behind Express | Keep API key off the browser; centralise guardrails |
| Data-driven `courses.js` | Add modules without rewriting UI shells |
| Exploit/Defense toggle | Enforces observe → remediate → verify pedagogy |
