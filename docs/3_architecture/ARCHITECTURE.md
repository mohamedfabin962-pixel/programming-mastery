# Technical Architecture Blueprint

This document specifies the software architecture, data flow pipelines, sandboxing rules, and security model of **Programming Mastery**. It serves as the primary system design blueprint for engineers implementing platform features.

---

## 1. Architectural Patterns (Clean Architecture)

To maintain long-term scalability and decouple business rules from client interfaces or database engines, we follow the principles of Clean Architecture.

```
       ┌─────────────────────────────────────────────────────────┐
       │                      INFRASTRUCTURE                     │
       │    (Database Engines, Express HTTP Router, API Clients) │
       │        ┌───────────────────────────────────────┐        │
       │        │              APPLICATION              │        │
       │        │  (Spaced Repetition Scheduler, Auth)  │        │
       │        │        ┌─────────────────────┐        │        │
       │        │        │     DOMAIN CORE     │        │        │
       │        │        │  (User, Lesson,     │        │        │
       │        │        │   Challenge Entities)        │        │
       │        │        └─────────────────────┘        │        │
       │        └───────────────────────────────────────┘        │
       └─────────────────────────────────────────────────────────┘
```

1.  **Domain Core Layer**: Contains pure business entities (e.g., `User`, `Lesson`, `Challenge`, `StreakRecord`) and domain-specific logic. It has zero external dependencies and does not know about any databases or UI frameworks.
2.  **Application Layer (Use Cases)**: Contains core application logic (e.g., processing challenge submission, updating learning path state, calculating next active recall date using spaced repetition intervals).
3.  **Infrastructure Layer**: Handles details like Express routing, database persistence (Mongoose/MongoDB schemas), third-party auth libraries, and physical execution runtimes.

*Dependency Rule*: Dependencies must only point inward. The Domain Core layer cannot import anything from the application or infrastructure layers.

---

## 2. Curriculum Data Synchronization Pipeline

The course curriculum is version-controlled in the repository as structured content files (Markdown, JSON). To deliver this content efficiently, we design a synchronization pipeline:

```
[Git Repo: /packages/content] ──► [CI Build Step] ──► [JSON Validation Check]
                                                            │
[API Cache Layer] ◄── [Database Seed/Upsert Engine] ◄───────┘
       │
[Next.js Client] (via API Endpoint)
```

1.  **Validation**: A validation schema (e.g., using schema validators like Zod/Joi) checks the format of all curriculum metadata, quiz questions, and starting code template suites.
2.  **Seeding Engine**: When code changes are merged to the main branch, a seeding script parses the content files and upserts the data records into the database.
3.  **Caching**: The API server caches curriculum models in-memory to prevent repeated database query overhead, serving content via a CDN-friendly caching layer.

---

## 3. Challenge Code Execution & Sandbox Strategy

A critical system boundary is the compilation and execution of user-submitted code in Challenge Mode. The architecture requires a safe sandbox.

### Execution Boundaries
To balance execution speed, security, and hosting costs, code execution routing is split based on execution requirements:

```
                                  [User Code Submit]
                                           │
                ┌──────────────────────────┴──────────────────────────┐
                ▼                                                     ▼
     [Frontend / JS Lesson]                                [Backend Node/DB Lesson]
                │                                                     │
    Routable to Client Sandbox                              Routable to Secure Remote
    (iframe / Web Worker Engine)                            (Isolated Docker Container)
```

1.  **Client-Side Sandbox (In-Browser Execution)**:
    *   *Lessons*: Frontend Javascript, DOM manipulation, simple functions.
    *   *Mechanism*: Code is loaded into a sandboxed, cross-origin `iframe` or executed inside a dedicated browser Web Worker with strict Content Security Policies (CSP).
    *   *Verification*: Tests run inside the iframe context and return structured results via `postMessage` back to the parent page.
    *   *Security Benefit*: Zero backend cost, instantaneous test response times.
2.  **Server-Side Isolated Runner (Remote Containerized Execution)**:
    *   *Lessons*: Node.js network routers, filesystem manipulations, database queries.
    *   *Mechanism*: Code payload is sent to a secure queue, instantiated inside an isolated micro-container (e.g. AWS Lambda, gVisor, or a locked-down Docker daemon).
    *   *Verification*: Tests run internally in the container, and results are returned via JSON API.
    *   *Security Benefit*: The user code is executing in a fully isolated, network-restricted container with a strict memory and execution time limit (e.g., 2000ms max execution time).

---

## 4. Platform Security Architecture

The platform security model ensures high data integrity:

*   **Authentication Flow**: User credentials verify against secure hash systems (e.g., bcrypt hashes). Active sessions are managed using HTTP-Only, Secure, SameSite cookies to protect credentials from Cross-Site Scripting (XSS) extraction.
*   **Authorization Rules (RBAC)**: Route access is checked by authorization middleware matching standard role configurations:
    *   `Student`: Access to personal learning stats, profile management, and challenge verification.
    *   `ContentCreator`: Access to course preview tools and content builders.
    *   `Administrator`: Access to system statistics, database tooling, and user permission panels.
*   **Validation Boundaries**: All client input must pass schema validation checks before processing. Database schemas must enforce field limitations to prevent database injection attacks.
*   **Rate Limiting**: API routes must reject excessive requests (e.g. limit submission endpoint to 10 attempts per minute per IP) to prevent server exhaustion.
