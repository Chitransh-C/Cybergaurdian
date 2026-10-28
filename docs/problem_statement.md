1. Introduction
Cybersecurity threats are becoming increasingly sophisticated, while traditional cybersecurity education often focuses primarily on theoretical concepts — students may understand the definitions of attacks but lack opportunities to safely observe attack behaviour, practice defensive techniques, and receive immediate guidance. CyberGuardian is proposed as an AI-powered cybersecurity learning and defense platform that bridges this gap by combining structured learning modules, safe attack simulations, hands-on practice laboratories, AI-assisted tutoring, quizzes, and progress tracking, all within a controlled environment that never interacts with or affects real-world systems.
2. Problem Statement
Existing cybersecurity learning approaches often separate theoretical learning from practical implementation, so students may have difficulty understanding how attacks operate, why vulnerabilities occur, and how appropriate defensive mechanisms should be implemented. Practical experimentation on real systems can also introduce security and ethical risks.
There is therefore a need for a secure and interactive platform that allows users to understand cyber attacks, observe their behaviour in controlled environments, practice mitigation techniques, and receive personalised assistance.
CyberGuardian aims to address this problem by providing a safe, AI-assisted cybersecurity learning environment that integrates theory, simulation, practice, and defense.
3. Project Objectives
1.      To provide structured learning modules for fundamental cybersecurity concepts.
2.      To demonstrate common cyber attack techniques through isolated and controlled simulations.
3.      To teach users appropriate defensive mechanisms and secure coding practices.
4.      To provide an AI-powered tutor capable of answering cybersecurity questions and explaining concepts in simple language.
5.      To provide hands-on cybersecurity exercises through a secure sandbox environment.
6.      To evaluate user understanding through quizzes and practical assessments.
7.      To track learning progress and provide personalised recommendations.
8.      To encourage responsible and ethical cybersecurity learning without exposing real systems to attacks.
4. System Architecture Overview
The diagram below summarises how a user moves from registration into the core learning and practice modules — including the sandboxed attack simulations — and how progress feeds back into the personalised dashboard.




5. Functional Requirements
5.1 User Registration & Authentication
•     The system shall allow users to create an account and log in securely.
•     Passwords shall be stored using secure hashing, with session/token-based authentication.

5.2 Learning Modules & Dashboard
•     Structured modules shall cover topics such as SQL Injection, XSS, Phishing, Ransomware, Password Security, MITM, and Cryptography, each explaining the attack flow, impact, and defence.
•     A personalised dashboard shall show progress, completed modules, quiz scores, and achievements.
5.3 Attack Simulation & Defense
•     The platform shall run controlled simulations in a sandbox using intentionally vulnerable demo apps, with no interaction with real external systems.
•     Each simulation shall be paired with defensive guidance (e.g., parameterised queries, input validation, least-privilege access).
5.4 AI Tutor & Practice Laboratory
•     An AI tutor shall explain concepts, answer questions, and recommend relevant modules.
•     A guided practice lab shall let users identify a vulnerability, apply a fix, and verify the mitigation.
5.5 Assessment & Progress Tracking
•     The system shall provide quizzes and practical assessments, recording results, completion status, and badges.
6. Non-Functional Requirements
6.1 Security & Ethical Usage
User accounts and learning data must be protected, and all attack simulations must remain isolated from real systems, promoting responsible cybersecurity practice.
6.2 Performance & Scalability
The platform should be responsive, with fast page loads and reasonable AI response times, and should support new modules, simulations, and users without major re-architecture.
6.3 Usability & Reliability
The interface should be simple and accessible to users of varying skill levels, while maintaining consistent progress and assessment records with minimal failures.
6.4 Maintainability
A modular architecture should allow learning modules, simulations, AI services, and assessments to be updated independently.



7. Feasibility Study
7.1 Technical Feasibility
The system is technically feasible using a modern frontend (e.g., React), Node.js/Express backend services, and a database such as MongoDB or PostgreSQL for accounts, progress, and module data. AI capabilities can be integrated through a suitable LLM API, with containerised, isolated sandbox environments for safe attack demonstrations.
7.2 Economic Feasibility
The project can be built using open-source software and common development tools, keeping initial costs low. Cloud AI and hosting costs can be controlled through usage limits, caching, and resource management, making it economically suitable for academic and student-oriented training.
7.3 Operational Feasibility
The platform is designed to be simple enough for students and beginners while remaining practical, accessible entirely through a web browser, and extensible for use by colleges and cybersecurity training organisations.
8. Scope & Expected Outcome
The initial scope includes user authentication, learning modules, controlled attack simulations, defensive explanations, AI tutor assistance, practical laboratories, quizzes, and progress tracking. Future versions may add advanced labs, automated vulnerability analysis, adaptive learning paths, instructor dashboards, team challenges, and certification.
The expected outcome is a functional web-based cybersecurity education platform that helps users understand vulnerabilities, observe their behaviour safely, learn defensive techniques, and build practical skills through guided, AI-assisted learning.
9. Conclusion
This Problem Identification and Requirement Analysis establishes a clear scope for CyberGuardian and identifies its major functional, non-functional, technical, economic, and operational requirements. By combining cybersecurity education, safe simulations, practical laboratories, and AI-assisted guidance, CyberGuardian aims to provide a structured and responsible environment for developing cybersecurity knowledge and practical skills.

