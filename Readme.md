# CyberGuardian

AI-assisted cybersecurity learning platform with in-browser sandboxes, Exploit/Defense labs, quizzes, progress tracking, and GuardianAI (Socratic mentor).

## Prerequisites

- **Node.js** 18+
- **MySQL** 8.x (local install, or Docker)
- Optional: **Gemini API key** for live GuardianAI replies (local tutor works without it)

## Setup

```bash
npm install
```

Copy `.env.example` to `.env` and set your MySQL password (and optional `GEMINI_API_KEY`):

```bash
# Windows (PowerShell)
Copy-Item .env.example .env
```

### Database

**Option A — local MySQL** (use credentials already in `.env`):

```bash
npm run db:setup
```

**Option B — MySQL via Docker:**

```bash
npm run db:up
npm run db:setup
```

## Start the project

**Recommended — frontend + API together:**

```bash
npm run dev:all
```

| Service  | URL |
|----------|-----|
| App      | http://localhost:5173 |
| API      | http://localhost:5000 |
| Health   | http://localhost:5000/api/health |

**Or start them separately:**

```bash
npm run server
npm run dev
```

## Demo login

| Field    | Value |
|----------|-------|
| Email    | `neo@cyberguard.academy` |
| Password | `cybercadet2026` |

## Useful scripts

| Command | Description |
|---------|-------------|
| `npm run dev:all` | Vite + Express together |
| `npm run dev` | Frontend only (port 5173) |
| `npm run server` | API only (port 5000) |
| `npm run db:setup` | Migrate schema + seed data |
| `npm run db:up` | Start MySQL with Docker Compose |
| `npm run smoke:labs` | Validate all lab tasks |
| `npm run build` | Production frontend build |

## Documentation

Full project docs: [`docs/Final docs/`](./docs/Final%20docs/)
