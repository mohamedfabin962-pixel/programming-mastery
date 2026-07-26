# Product Requirements Document: Programming Mastery

## 1.0 Executive Summary

### 1.1 Document Purpose
This Product Requirements Document (PRD) serves as the definitive Single Source of Truth (SSOT) defining the functional specifications, product behaviors, user experiences, and operational boundaries of the **Programming Mastery** platform. It aligns the design, engineering, QA, and content teams on the core deliverables for Version 1.0 (V1) and outlines the product's long-term architectural evolution.

### 1.2 Product Concept
Programming Mastery is an immersive, interactive Developer Journey Platform designed to transform aspiring students into job-ready, autonomous software engineers. Rejecting the passive video-watching model of traditional online courses, the platform represents learning as an explorable, visual world. By engaging with multi-pane sandboxed workspaces, executing integration test suites, refactoring codebases, and collaborating with context-aware AI agents, users cultivate the deep cognitive models and practical problem-solving skills required in the modern software industry.

### 1.3 Scope and Target Outlay
The document details the primary scope of the V1 launch, targeting desktop-first code construction environments, lightweight conceptual mobile companions, adaptive spaced-repetition schedules, and five distinct AI specialized assistants. It explicitly forbids traditional video repositories, generic social feeds, public follower schemes, and XP grinding mechanics to retain maximum pedagogical integrity.

---

## 2.0 Product Overview

### 2.1 Core Paradigm
Programming Mastery treats programming not as a list of lessons to check off, but as a craft that requires active, physical engagement. The core experience centers around:
1. **The World Map**: A spatial interface where different software engineering disciplines are represented as explorable regions.
2. **The Knowledge Tree**: An interactive, dependency-based visual node network representing the connectivity of all computer science knowledge.
3. **The Developer Workshop**: A multi-pane web-based IDE where learners write production-grade code, run test suites, and profile execution speeds.
4. **The Developer Lab**: A desktop-only, sandbox environment where learners design database models, orchestrate microservices, write unit tests, and execute architectural capstones.
5. **The Developer Passport**: An immutable, verified record of a learner's actual engineering achievements, code contributions, and system optimizations.
6. **The AI Mentor Ecosystem**: A coordinated suite of context-aware, specialized agents that guide the user through logic, syntax, debugging, and system design, without writing code for them.

### 2.2 System Interfaces

```
                    ┌────────────────────────┐
                    │       World Map        │
                    └───────────┬────────────┘
                                │ (Selects Node)
                                ▼
                    ┌────────────────────────┐
                    │     Knowledge Tree     │
                    └───────────┬────────────┘
                                │ (Launches)
                                ▼
       ┌────────────────────────┴────────────────────────┐
       ▼ (Desktop Only)                                  ▼ (Mobile Only)
┌───────────────┐                                 ┌───────────────┐
│   Workshop/   │                                 │ Travel Mode / │
│ Developer Lab │                                 │  Recall Deck  │
└──────┬────────┘                                 └──────┬────────┘
       │ (Saves & Compiles)                              │ (Syncs Progress)
       ▼                                                 ▼
┌─────────────────────────────────────────────────────────────────┐
│                      Central Learning Engine                    │
└─────────────────────────────────────────────────────────────────┘
```

---

## 3.0 Vision
Our 10-year vision is to build the world's most trusted, engaging, and effective educational ecosystem for software engineering. We aim to replace arbitrary degrees and certificate-mill courses with a transparent, verified proof-of-capability standard. Programming Mastery will become the infrastructure through which global talent is discovered, trained, and hired, leveling the playing field for aspiring software engineers everywhere.

---

## 4.0 Mission
Our mission is to empower individuals to achieve professional software engineering agency. We achieve this by:
*   Fostering a deep understanding of core systems under the hood (memory, networks, data structures) rather than shallow syntax memorization.
*   Enforcing high-quality engineering practices (unit testing, documentation, performance optimization, secure design) in every lesson.
*   Eliminating friction and intimidation by introducing abstract concepts through concrete, physical analogies and interactive visual models.
*   Building resilient, self-directed problem solvers who can autonomously navigate real-world codebase complexities.

---

## 5.0 Product Goals

### 5.1 Qualitative Goals
*   **Abolish Tutorial Hell**: Provide a structured journey that forces independent decision-making, ensuring students can build systems from scratch.
*   **Establish Cognitive Transparency**: Use real-time visual models of memory, network state, and call stacks so that abstract execution becomes concrete.
*   **Minimize Environmental Friction**: Provide a pre-configured, instantly active development sandbox, keeping initial setup from blocking learners.
*   **Cultivate Engineering Intuition**: Prioritize structural "why" trade-offs over memorizing dynamic framework syntax.

### 5.2 Quantitative Goals
The V1 product targets the following operational objectives:

| Goal ID | Metric Category | V1 Target Metric |
| :--- | :--- | :--- |
| **G-001** | Day 30 User Retention | Greater than 40% active retention |
| **G-002** | Initial Onboarding Time | Under 3 minutes from registration to first test run |
| **G-003** | Mission Completion Rate | Greater than 65% for started missions |
| **G-004** | Revision Schedule Adherence | Greater than 75% of scheduled spaced-repetition items completed within 48 hours |
| **G-005** | Job Placement Rate | Greater than 80% placement for users completing the "Mastery Arena" path |

---

## 6.0 Problems Being Solved

### 6.1 The Passive Learning Trap
Traditional platforms offer video-heavy tutorials that encourage passive watching. Students replicate code line-by-line without understanding the architectural design, leading to the **illusion of competence**. Programming Mastery replaces passive watching with interactive code sandboxes and mandatory test runners.

### 6.2 Tutorial Hell and Brittle Knowledge
Without experiencing real-world errors, students build fragile mental models. The moment they exit the video ecosystem, they cannot debug or structure projects. Programming Mastery solves this by presenting multi-file codebases, forcing debugging sessions, and introducing real compiler/runtime errors.

### 6.3 Environmental Friction
Setting up databases, local servers, compilers, and dependencies can be highly discouraging for beginners. Programming Mastery solves this by providing sandboxed, multi-pane containers directly in the browser, while transitioning users to local-style development as they progress.

### 6.4 Fragmented, Disconnected Curricula
Courses are typically sold as isolated silos (e.g., "Learn React" separate from "Learn Node"). Students do not learn how these systems interact. Programming Mastery maps all modules onto a single, unified Knowledge Tree, showing the explicit prerequisite pathways and integration points.

---

## 7.0 Target Audience
The target audience consists of:
*   **Aspiring Engineers**: Individuals with zero programming experience seeking a structured, reliable career transition.
*   **CS Students / Graduates**: Academic learners who understand theory but lack modern, full-stack, project-based engineering experience.
*   **Self-Taught Developers**: Learners who have hit a wall in "Tutorial Hell" and need structured projects and deep architectural concepts.
*   **Transitioning Professionals**: Experienced engineers in other domains (e.g., QA, Sysadmin) looking to transition to web or systems architecture.

---

## 8.0 User Personas

### 8.1 Detailed Persona: Sarah (The Complete Beginner)
*   **Demographics**: 24 years old, works in retail management, no technical background.
*   **Learning Goal**: Transition to an entry-level Frontend developer role in 12 months.
*   **Pain Points**:
    *   Finds command-line environments and configuration terminals intimidating.
    *   Gets confused by abstract logical jargon (e.g., "closures," "lexical scope").
    *   Easily discouraged by vague syntax errors like `Uncaught TypeError: Cannot read properties of undefined`.
*   **User Journey Behavior**:
    *   Relies heavily on visual models (e.g., animations showing variables as boxes).
    *   Prefers clear, physical analogies (e.g., router as a post office).
    *   Relies on the AI Debugger to translate cryptic stack traces into plain English.

### 8.2 Detailed Persona: David (The Self-Learner)
*   **Demographics**: 31 years old, marketing specialist.
*   **Learning Goal**: Learn to build custom SaaS applications and automation scripts.
*   **Pain Points**:
    *   Starts multiple online video courses but abandons them halfway.
    *   Suffers from a lack of direction; does not know what skills to study next.
    *   Struggles to build projects without code-along video reference guides.
*   **User Journey Behavior**:
    *   Uses the World Map to visualize progress and stay motivated.
    *   Tracks progress metrics (streak statistics, completed missions).
    *   Requires clear validation tests to confirm code is written correctly.

### 8.3 Detailed Persona: Maya (The College Student)
*   **Demographics**: 20 years old, Sophomore Computer Science student.
*   **Learning Goal**: Secure a high-quality frontend/backend internship.
*   **Pain Points**:
    *   University classes teach Java and C++ but lack modern web application experience.
    *   Struggles with full-stack systems design and multi-container architectures.
    *   Has zero experience with deployment environments, database schemas, and API routers.
*   **User Journey Behavior**:
    *   Bypasses basic syntax nodes by passing "Challenge Arenas".
    *   Spends significant time in the Developer Lab building database models and REST interfaces.
    *   Tracks system efficiency and query performance metrics on the platform.

### 8.4 Detailed Persona: James (The Job Seeker)
*   **Demographics**: 27 years old, coding boot camp graduate.
*   **Learning Goal**: Land first role as a Junior Full-Stack Developer within 3 months.
*   **Pain Points**:
    *   Has built generic portfolio projects (e.g., clone of a popular app) that fail to impress recruiters.
    *   Fails live-coding technical interviews and struggles with system design questions.
    *   Struggles to explain the architectural trade-offs of his implementations.
*   **User Journey Behavior**:
    *   Builds detailed, multi-file codebases in the Developer Lab.
    *   Uses the Developer Passport as his public resume.
    *   Utilizes the AI Interviewer assistant to simulate mock technical interview screens.

### 8.5 Detailed Persona: Elena (The Transitioning Developer)
*   **Demographics**: 38 years old, Systems Engineer with 8 years experience in C/Java.
*   **Learning Goal**: Transition to modern web architecture and React component frameworks.
*   **Pain Points**:
    *   Introductory tutorials are too slow and explain basic loops and variables.
    *   Wants to quickly grasp state synchronization, virtual DOM patterns, and serverless logic.
*   **User Journey Behavior**:
    *   Quickly skips basic programming fundamentals nodes.
    *   Uses the Knowledge Tree to pinpoint advanced React and frontend state nodes.
    *   Utilizes the AI Reviewer to evaluate code style and clean code conventions.

---

## 9.0 User Types & Permission Matrix

The platform supports six distinct user roles:

1. **Guest**: Unauthenticated users exploring public landing pages and the basic, non-saving Starter Region nodes.
2. **Learner**: Authenticated students actively traversing the World Map, completing missions, building projects, and owning a Passport.
3. **Mentor**: Certified external reviewers or teachers who can view designated learners' code, leave comments, and host review sessions.
4. **Content Creator**: Internal or verified external authors who write lessons, configure metadata schemas, and design verification tests.
5. **Reviewer**: Quality assurance specialists who run content validations on content bundles, approving or rejecting them for publishing.
6. **Administrator**: Platform managers who oversee user permissions, system health, aggregate analytics, and billing infrastructure.

### 9.1 Role & Permission Matrix

| Feature / Resource | Guest | Learner | Mentor | Content Creator | Reviewer | Administrator |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Explore Landing / Map** | Read | Read | Read | Read | Read | Read |
| **Access Starter Lessons** | Read / Run | Read / Run | Read / Run | Read / Run | Read / Run | Read / Run |
| **Save Lesson Progress** | No | Yes | Yes | Yes | Yes | Yes |
| **Access Workspace / Lab** | No | Read / Write | Read / Write | Read / Write | Read / Write | Read / Write |
| **Run Code Verification** | Yes (No Save) | Yes (Save) | Yes | Yes | Yes | Yes |
| **View Developer Passports** | Public Only | Public Only | Assigned Only | Public Only | Public Only | All Passports |
| **Provide Code Reviews** | No | No | Yes | No | Yes | Yes |
| **Create/Modify Lessons** | No | No | No | Read / Write | Read / Write | Read / Write |
| **Publish to Prod Map** | No | No | No | No | Yes | Yes |
| **Access Admin Dashboard** | No | No | No | No | No | Full Access |

---

## 10.0 Core Product Principles

### 10.1 Principle 1: Journey Architecture
We represent learning as a continuous, spatial journey. Vertically stacked list configurations and folder hierarchies are prohibited. The interface must always highlight where the user is, where they came from, and which logical domains are unlocked next.

### 10.2 Principle 2: Mandatory Application
We do not explain a concept without forcing the student to write, test, or modify code that executes it. If the lesson covers a concept, the student must apply it within a two-minute window. Theoretical text must be compact and lead directly to the sandbox.

### 10.3 Principle 3: Model-First Explanations
We represent abstract computing operations (e.g., asynchronous event loops, database indexes, call stacks) using interactive visualizers. These visual state models must react dynamically to code changes, building a spatial, concrete mental model of internal mechanics.

### 10.4 Principle 4: Real-world Settings
As soon as foundations are complete, we place users inside realistic codebases with multiple directories, configurations, and dependency trees. We reject simple single-file sandboxes that hide the structural complexity of production systems.

### 10.5 Principle 5: Diagnostic AI Assistance
The AI system must never write code, generate snippets, or solve problems directly for the user. It must behave as a diagnostic guide, pointing out structural errors, asking clarifying questions, and pointing to relevant conceptual analogies to guide the user to their own realization.

### 10.6 Principle 6: Authentic Rewards
We ban meaningless gamification, points, and cosmetic badges. Rewards must represent actual skill growth, system efficiency gains, optimized code performance, and conceptual retention metrics.

### 10.7 Principle 7: Durability Over Volatility
We prioritize long-term, durable computer science skills (memory management, networking protocols, schema normalization) over volatile framework patterns. When teaching specific tools, we focus on the core standards and operational paradigms that outlive syntax iterations.

### 10.8 Principle 8: Intentional Collaboration
We do not build generic social feeds, public follower counts, or comment sections. Peer connection is strictly based on intentional partnerships, peer reviews, and collaborative debugging sessions.

### 10.9 Principle 9: Quality Over Abundance
We choose to construct a curated, highly polished curriculum tree that guarantees technical capability over a massive, unvetted directory of courses. Every node must pass strict technical verification and user testing.

### 10.10 Principle 10: Absolute Respect for Time
We design the workspace to optimize focus. There is no filler content, unnecessary text, or unskippable introductions. The system saves states continuously, loads instantly, and runs tests with low latency.

---

## 11.0 Product Philosophy
Programming Mastery exists because traditional platforms fail to train actual developers. Video platforms treat learning as a consumable product, optimizing for subscription retention rather than technical proficiency. 

We believe that software engineering is a skilled trade. To learn a trade, one must enter a workshop and build. The platform provides a sandboxed environment where the learner can construct systems, run verification suites, inspect live running state variables, correct real execution errors, and receive targeted, professional mentoring feedback. We do not sell easy success; we offer structured, deep engineering practice.

---

## 12.0 Learning Philosophy
Our educational model uses the active learning loop, moving the student through eight stages of mastery for every major topic:

```
[Explore] ──► [Understand] ──► [Practice] ──► [Build]
   ▲                                             │
   │                                             ▼
[Master] ◄── [Teach] ◄── [Revise] ◄── [Reflect] ─┘
```

1. **Explore**: Engage with an active, visual sandbox to feel the problem domain before receiving the solution.
2. **Understand**: Construct a visual mental model of the concept, understanding its mechanics and architectural trade-offs.
3. **Practice**: Complete micro-exercises to build muscle memory and syntax familiarity.
4. **Build**: Write code inside a multi-file project with comprehensive test suites and technical specifications.
5. **Reflect**: Compare the completed code against senior engineer codebases, assessing performance, style, and design trade-offs.
6. **Revise**: Solve spaced-repetition active recall prompts to ensure knowledge doesn't decay.
7. **Teach**: Review code reviews and pull requests written by simulated junior developers, identifying bugs and explaining corrections.
8. **Master**: Pass high-intensity challenges under strict system constraints (performance, memory, dependency limits).

---

## 13.0 Desktop Experience

### 13.1 General Layout
The desktop screen is the full, complete environment for Programming Mastery. It is optimized for multi-panel, focused engineering work, maximizing horizontal screen space.

### 13.2 Key Components
*   **Global Map Canvas**: An interactive, zoomable, dark-themed map of all regions and nodes.
*   **The Workshop (Three-Pane Split)**:
    *   *Left Pane*: Instructions, analogies, visualizers, and interactive state controls.
    *   *Center Pane*: Multi-tab IDE with folder navigation tree and code highlighting.
    *   *Right Pane*: Combined browser preview, console output, system performance monitors, and test runner logs.
*   **The Developer Lab**: A desktop-only, full-screen environment where learners design database models, orchestrate microservices, write unit tests, and execute architectural missions.
*   **The Knowledge Tree Visualizer**: A searchable node tree showing detailed metadata, prerequisites, and learning paths.

---

## 14.0 Mobile Experience

### 14.1 Focus and Limitations
The mobile experience is not designed for coding, project building, or complex console debugging. The **Developer Lab** and **Workshop code editing** are strictly blocked on mobile interfaces.

### 14.2 Core Features
*   **Travel Mode**: Accessible on mobile to read analogies, review instructions, and interact with visual system diagrams.
*   **Recall Deck**: A mobile-friendly active recall interface showing flashcards, short logic quizzes, and diagnostic debugging puzzles.
*   **Passport Hub**: View and share developer progress, profile metrics, and achievements.
*   **Learning Engine Dashboard**: Schedule notifications, check upcoming revision tasks, and review conceptual paths.

---

## 15.0 Functional Requirements

### 15.1 Authentication
*   **Overview**: Secures access to learner and administrator workspaces. Supports single-sign-on (SSO) and standard credentials.
*   **Detailed Behaviors**:
    *   Allows token refresh cycles to happen silently without interrupting active workspace focus.
    *   Enforces secure session storage and verification checks on server connections.

#### 15.1.1 Specifications

| Req ID | Input | Processing | Output | Error States |
| :--- | :--- | :--- | :--- | :--- |
| **FR-AUTH-01** | User email and password, or third-party SSO token. | Validate credentials against database, check for user status (active/suspended). | Authenticated session token, redirection to dashboard. | Invalid credentials, locked account, system timeout. |
| **FR-AUTH-02** | Request to revoke session. | Destroy active session token across all connected client caches. | Redirect to Landing Page, guest state. | Session already expired. |

---

### 15.2 Developer Profile
*   **Overview**: Maintains user data, goals, path preferences, and learning stats.
*   **Detailed Behaviors**:
    *   Tracks active goals and schedules weekly commit and review goals.
    *   Drives personal progression metrics displayed on the main dashboard.

#### 15.2.1 Specifications

| Req ID | Input | Processing | Output | Error States |
| :--- | :--- | :--- | :--- | :--- |
| **FR-PROF-01** | User updates bio, profile image, developer targets, or links. | Validate input structures, update the profile schema in database. | Updated profile card, updated public passport bio. | File upload too large, invalid URL syntax. |
| **FR-PROF-02** | Change learning path targets (e.g. Frontend to Backend). | Re-calculate Knowledge Tree active recommendations and map pathways. | Dynamically refreshed World Map highlighting new target nodes. | Invalid path target configuration. |

---

### 15.3 Developer ID
*   **Overview**: A unique, human-readable identifier and public address (e.g., `dev.name/username`) representing the developer's identity.
*   **Detailed Behaviors**:
    *   Directs public queries to the user's Passport portfolio.
    *   Enforces regex matches: alphanumeric characters only, 3 to 24 characters long.

#### 15.3.1 Specifications

| Req ID | Input | Processing | Output | Error States |
| :--- | :--- | :--- | :--- | :--- |
| **FR-DEVID-01**| Custom handle name request (during signup or settings change). | Check uniqueness, regex match validation (no special chars, min 3 chars). | Claimed handle, updated public developer address. | Username already taken, invalid character input. |

---

### 15.4 World Exploration
*   **Overview**: An explorable, zoomable World Map allowing users to select learning regions.
*   **Detailed Behaviors**:
    *   Maintains a progressive disclosure system (fog of war) over locked regions.
    *   Reveals new nodes and region maps dynamically upon prerequisite completions.

#### 15.4.1 Specifications

| Req ID | Input | Processing | Output | Error States |
| :--- | :--- | :--- | :--- | :--- |
| **FR-EXPL-01** | Click on a region or node on the map canvas. | Query user's current progress state. Verify if prerequisites are met. | Open node modal (if unlocked) showing prerequisites and start button. | Node locked (prerequisites missing). |
| **FR-EXPL-02** | Zoom or drag interactions. | Rerender map canvas, adjusting visual fog of war based on user's unlocked nodes. | Dynamic canvas scaling, revealing adjacent undiscovered territories. | None. |

---

### 15.5 Learning Engine
*   **Overview**: The background engine scheduling active recall cycles, lessons, and adaptive paths.
*   **Detailed Behaviors**:
    *   Tracks memory strength indices using custom intervals based on performance.
    *   Modulates recommended pathways dynamically based on failure and completion vectors.

#### 15.5.1 Specifications

| Req ID | Input | Processing | Output | Error States |
| :--- | :--- | :--- | :--- | :--- |
| **FR-ENG-01** | Completion of a lesson or challenge. | Calculate performance rating, update user's mastery vector, queue revision. | Scheduled revision dates (1d, 3d, 7d). | Database sync failed. |
| **FR-ENG-02** | User fails a challenge three times consecutively. | Query database for alternate sub-concept exercises matching the failed node. | Dynamic injection of simplified sub-concept challenge. | No sub-challenges available for this node. |

---

### 15.6 Missions
*   **Overview**: Complex, narrative-based paths leading to a major project build.
*   **Detailed Behaviors**:
    *   Organizes multiple sub-lessons under a single engineering narrative.
    *   Tracks completion states of prerequisite node chains for advanced missions.

#### 15.6.1 List of Core Missions in V1:

1. **Mission 1: The Gateway Node**
   *   *Description*: Learn basic code statements, logic controls, and execute your first local test script.
   *   *Target Nodes*: `fundamental-syntax`, `logical-expressions`, `script-execution`.
   *   *Outcome*: Execute local testing scripts, setting up variable bindings.
2. **Mission 2: Structural Data Pipes**
   *   *Description*: Build dynamic data collections, manage memory arrays, and implement custom sorting filters.
   *   *Target Nodes*: `memory-addresses`, `arrays-manipulation`, `sorting-algorithms`.
   *   *Outcome*: Design systems managing key-value memory scopes.
3. **Mission 3: Client Interface Foundations**
   *   *Description*: Build an accessible, clean document structure containing forms and media.
   *   *Target Nodes*: `semantic-html`, `document-object-model`, `css-layout-grids`.
   *   *Outcome*: Build responsive layout containers.
4. **Mission 4: Dynamic State Synchronization**
   *   *Description*: Construct dynamic forms that validate live inputs, coordinate fetch requests, and update views.
   *   *Target Nodes*: `js-event-handling`, `asynchronous-fetch`, `dom-manipulation-dynamic`.
   *   *Outcome*: Render lists dynamically mapping external server data.
5. **Mission 5: Server Routers & REST APIs**
   *   *Description*: Build a backend server handling path parsing, REST headers, and query strings.
   *   *Target Nodes*: `http-routing`, `middleware-authorization`, `json-payload-processing`.
   *   *Outcome*: Implement middleware routes securing user data sessions.
6. **Mission 6: Structured Relational Storage**
   *   *Description*: Design a normalized database schema mapping users, projects, and transactions.
   *   *Target Nodes*: `schema-normalization`, `relational-joins`, `indexing-strategies`.
   *   *Outcome*: Write relational index queries avoiding tables scans.
7. **Mission 7: The Distributed Connection Hub**
   *   *Description*: Construct WebSockets connection layers synchronizing state updates to active clients.
   *   *Target Nodes*: `websocket-connections`, `connection-pooling`, `redis-event-broadcaster`.
   *   *Outcome*: Synchronize live room chats across users.
8. **Mission 8: Micro-Container Packaging**
   *   *Description*: Package application modules into clean containers and deploy static routing paths.
   *   *Target Nodes*: `containerization-basics`, `port-mapping`, `environment-configurations`.
   *   *Outcome*: Export localized reproducible environment definitions.
9. **Mission 9: Distributed Queue Workers**
   *   *Description*: Construct background worker processes handling execution tasks via queue tables.
   *   *Target Nodes*: `message-brokers`, `background-jobs`, `concurrency-throttles`.
   *   *Outcome*: Process heavy data generation requests asynchronously.
10. **Mission 10: The Secure Deployment Pipeline**
    *   *Description*: Build automated pipelines linting files, running unit checks, and managing releases.
    *   *Target Nodes*: `ci-pipelines`, `static-analysis-linters`, `release-rollback-hooks`.
    *   *Outcome*: Automated zero-downtime deployment pipelines.

#### 15.6.2 Specifications

| Req ID | Input | Processing | Output | Error States |
| :--- | :--- | :--- | :--- | :--- |
| **FR-MISS-01**| Learner starts a new mission. | Load target mission config, mark mission as active, unlock mission nodes on tree. | Mission spec sheet loaded, map highlight paths updated. | Mission prerequisites not met. |

---

### 15.7 Lessons
*   **Overview**: Individual conceptual steps inside a node, featuring problem descriptions, analogies, and code work.
*   **Detailed Behaviors**:
    *   Pulls content bundles containing Markdown descriptions, visual assets, and tests.
    *   Tracks scroll progress, visualizer step-through completions, and execution status.

#### 15.7.1 Standard Lesson Content Schema Example

Every lesson data bundle must conform to this JSON metadata layout:

```json
{
  "lessonId": "backend-routing-middleware",
  "version": "1.0.0",
  "title": "Configuring Request Authorization Middleware",
  "estimatedDurationMinutes": 20,
  "prerequisites": ["http-protocol-basics", "json-parsers"],
  "visualizerSetup": {
    "diagramType": "sequence-flow",
    "nodes": [
      {"id": "client", "label": "Web Client Browser"},
      {"id": "middleware", "label": "Token Validator"},
      {"id": "controller", "label": "Resource Handler"}
    ],
    "transitions": [
      {"from": "client", "to": "middleware", "event": "Send HTTP request header token"},
      {"from": "middleware", "to": "client", "event": "Return 401 if missing"},
      {"from": "middleware", "to": "controller", "event": "Forward request context on pass"}
    ]
  },
  "initialWorkspace": {
    "directoryStructure": {
      "app": {
        "middleware.js": "function authMiddleware(req, res, next) {\n  // Implement logic\n}",
        "server.js": "const http = require('http');\n// Server logic"
      }
    }
  },
  "assertions": [
    {
      "name": "Should return 401 unauthorized if Authorization header is missing",
      "testScript": "assert.strictEqual(runServerTest({headers: {}}).status, 401)"
    },
    {
      "name": "Should forward request to next handler if token is valid",
      "testScript": "assert.strictEqual(runServerTest({headers: {Authorization: 'Bearer valid_token'}}).status, 200)"
    }
  ]
}
```

#### 15.7.2 Specifications

| Req ID | Input | Processing | Output | Error States |
| :--- | :--- | :--- | :--- | :--- |
| **FR-LESS-01**| User opens a lesson file. | Retrieve the content bundle (markdown, visual analogies, tests, start files). | Render instruction panel and setup code editor with initial workspace files. | Bundle corrupt, loading failure. |

---

### 15.8 Knowledge Tree
*   **Overview**: A visual node network displaying the connectivity and dependencies of all engineering domains.
*   **Detailed Behaviors**:
    *   Renders connections dynamically when filters (e.g., "Frontend only") are modified.
    *   Maintains a database of dependency mappings for direct visual inspection.

#### 15.8.1 Specifications

| Req ID | Input | Processing | Output | Error States |
| :--- | :--- | :--- | :--- | :--- |
| **FR-TREE-01**| User accesses the Knowledge Tree view. | Query global node list, overlay user's progress state (completed, active, locked). | Interactive node network showing connected dependency lines. | Rendering engine lag. |

---

### 15.9 Passport
*   **Overview**: A public, verifiable portfolio displaying project profiles, code test histories, and system performance metrics.
*   **Detailed Behaviors**:
    *   Enforces secure signature structures for completed project builds.
    *   Displays performance benchmarking statistics and profiles.

#### 15.9.1 Specifications

| Req ID | Input | Processing | Output | Error States |
| :--- | :--- | :--- | :--- | :--- |
| **FR-PASS-01**| Recruiter visits `dev.name/username/passport`. | Retrieve developer's progress, code samples, execution performance logs. | Verify profile, render static public portfolio page. | Profile set to private, profile not found. |

---

### 15.10 Workshop
*   **Overview**: The three-pane integrated editor where students learn and practice.
*   **Detailed Behaviors**:
    *   Enforces automatic code syntax checks and code formatting.
    *   Manages user files, directories, and workspace local cache.

#### 15.10.1 Specifications

| Req ID | Input | Processing | Output | Error States |
| :--- | :--- | :--- | :--- | :--- |
| **FR-WORK-01**| User edits code in the editor panel. | Continuously save workspace draft in local client memory. | Updated visual code display, saved local status indicator. | Disk full exception, local storage disabled. |
| **FR-WORK-02**| Click "Run Verification Tests". | Execute student code against the lesson test runner within an isolated sandbox. | Render list of assertions passed/failed, show runtime metrics. | Sandbox timeout, infinite execution loop. |

---

### 15.11 Developer Lab
*   **Overview**: A desktop-first environment for complex multi-file projects, server mockups, and database architecture.
*   **Detailed Behaviors**:
    *   Provides mock servers and virtual backend databases for testing routing, queues, and optimization.
    *   Measures network load limits, transaction deadlocks, and system performance budgets.

#### 15.11.1 List of Core Lab Exercises in V1:

1. **Design a Thread-safe Task Queue**: Build an execution engine managing concurrent tasks without resource locks.
   *   *Inputs*: Batch array of task payloads, concurrency limits metadata.
   *   *Outputs*: Ordered execution logs, verification indicators confirming zero duplicate resource handles.
2. **Relational Schema Normalization Audit**: Normalize an inefficient dataset containing duplicates into 3NF forms.
   *   *Inputs*: Bulk log table CSV schema, dependency parameters.
   *   *Outputs*: Normalised schema SQL table outputs, pass report on duplicate column tests.
3. **API Routing Optimization & Caching**: Implement an API route optimization using background caching layers.
   *   *Inputs*: Mock data payloads, load generation configuration.
   *   *Outputs*: Latency graph showing response time drop from 300ms to <10ms, cache hits statistics.
4. **Isolated Docker Container Package Configuration**: Construct environment packaging files establishing custom volume networks.
   *   *Inputs*: Source codes directory, port specifications.
   *   *Outputs*: Successful container build run metrics, network connectivity diagnostics verification.
5. **Secure Authentication Session Vault**: Build an encryption utility validating authorization signatures.
   *   *Inputs*: Auth token input strings, signature keys.
   *   *Outputs*: Verified signature pass response log, decryption test verification.

#### 15.11.2 Specifications

| Req ID | Input | Processing | Output | Error States |
| :--- | :--- | :--- | :--- | :--- |
| **FR-LAB-01** | Run project tests inside Developer Lab. | Execute test suites against microservices, databases, or mock network setups. | Display test results, logs, runtime memory usage, database query times. | Port mapping error, sandbox isolation exception. |

---

### 15.12 AI Mentor Ecosystem

#### 15.12.1 Overview & Specialized Assistants
An AI manager overseeing specialized diagnostic assistants:
*   **AI Mentor**: Answers general conceptual questions and maps problems to analogies.
*   **AI Debugger**: Analyzes stack traces and diagnostics without providing code snippets.
*   **AI Reviewer**: Conducts pull request style code reviews.
*   **AI Interviewer**: Simulates technical interviews based on completed nodes.
*   **AI Planner**: Assists users in outlining implementation plans for projects.

#### 15.12.2 Assistant Prompt & Behavior Design Constraints

```
 ┌────────────────────────────────────────────────────────┐
 │                      AI Assistant                      │
 └──────────────────────────┬─────────────────────────────┘
                            │ (Checks Rules)
                            ▼
 ┌────────────────────────────────────────────────────────┐
 │ * Enforce conceptual guides                           │
 │ * Ban explicit code blocks or direct fixes            │
 │ * Require analogies to map logic                       │
 └────────────────────────────────────────────────────────┘
```

##### AI Mentor Behavior System rules:
1. Under no circumstance provide direct code snippets in responses.
2. Map conceptual questions (e.g., "what is pointers") to physical analogies (e.g., "mailboxes with addresses").
3. Use Markdown alerts to highlight target system constraints.

##### AI Debugger Behavior System rules:
1. Read compiler/runtime errors, explain *why* the exception occurred in clear logical steps.
2. Do not offer corrected code lines. Highlight only the line number and the logical mismatch (e.g., "Look at line 12: you are calling `.length` on a variable that is currently valued as `null`").
3. Suggest console log strategies to let the student verify variable states.

##### AI Reviewer Behavior System rules:
1. Evaluate student code submissions for complexity indices, styling conventions, and architectural leaks.
2. Structure review feedback as a tabular code review report: Code Quality, Performance, Security.
3. Suggest structural refactoring patterns (e.g., "Extract function to reduce nested depth").

##### AI Interviewer Behavior System rules:
1. Simulates interview screen prompts. Asks 3 consecutive conceptual questions mapping to the user's completed nodes.
2. Rates user text replies based on accuracy metrics.
3. Provides constructive pointers summarizing what keywords the student missed.

##### AI Planner Behavior System rules:
1. Helps users structure complex labs. Asks users to break down their requirements.
2. Suggests folder layouts and sequential implementation steps (e.g., "Step 1: Define database schema, Step 2: Implement authentication middleware").
3. Banned from writing functional code blocks for the plan steps.

#### 15.12.3 Specifications

| Req ID | Input | Processing | Output | Error States |
| :--- | :--- | :--- | :--- | :--- |
| **FR-AIM-01** | Code state and compiler logs sent to AI Debugger. | Parse logic, cross-reference past student errors, generate concept clues. | Step-by-step diagnostic hint listing conceptual pitfalls. | Timeout, invalid script inputs. |
| **FR-AIM-02** | Request to evaluate a project for code review. | Verify code meets formatting criteria, identify complexity levels and leaks. | Tabular architectural feedback detailing performance, leaks, and style tips. | File structure parsing failure. |
| **FR-AIM-03** | Request to start mock technical interview screen. | Fetch completed nodes, select core conceptual queries, prompt student for answer. | Interactive interview screen, logs user text response, rates accuracy. | AI service offline. |
| **FR-AIM-04** | User requests help formatting an implementation plan. | Read project requirements metadata, suggest order of directories, define steps. | Standard markdown plan skeleton listing key files to create/modify. | Plan template not found. |

---

### 15.13 Search
*   **Overview**: Unified database search tool.
*   **Detailed Behaviors**:
    *   Filters search outputs by Category (Lessons, Passports, Developer IDs, Missions).

#### 15.13.1 Specifications

| Req ID | Input | Processing | Output | Error States |
| :--- | :--- | :--- | :--- | :--- |
| **FR-SCH-01** | Search query string. | Index lookup on nodes, concepts, usernames, and documentation files. | Structured list of matches categorized by type. | Invalid characters. |

---

### 15.14 Analytics
*   **Overview**: Tracks progress metrics, completion times, and common failure nodes.
*   **Detailed Behaviors**:
    *   Identifies lessons with high failure rates to target for curriculum improvement.

#### 15.14.1 Specifications

| Req ID | Input | Processing | Output | Error States |
| :--- | :--- | :--- | :--- | :--- |
| **FR-ANL-01** | Completion of lessons, test durations, code submissions. | Aggregate data, identify drop-off points, recalculate node failure stats. | Updated dashboards for admins, personal stats on profile. | Sync lag, data packet corrupt. |

---

### 15.15 Notifications
*   **Overview**: Dispatches revision and collaboration reminders.
*   **Detailed Behaviors**:
    *   Sends notifications to mobile devices when a revision task is due.

#### 15.15.1 Specifications

| Req ID | Input | Processing | Output | Error States |
| :--- | :--- | :--- | :--- | :--- |
| **FR-NTF-01** | Revision task scheduled or review comments received. | Match user preference, send notifications (push, email, or in-app). | In-app notification card, email dispatch. | Push token invalid, email service bounce. |

---

### 15.16 Content Studio
*   **Overview**: Authoring environment for building and exporting Content Bundles.
*   **Detailed Behaviors**:
    *   Validates Content Bundles against metadata and test runner schemas.

#### 15.16.1 Specifications

| Req ID | Input | Processing | Output | Error States |
| :--- | :--- | :--- | :--- | :--- |
| **FR-STD-01** | Markdown and JSON content metadata packages. | Validate schema formats, compile prerequisites, run validation suite. | Success build artifact, preview render. | Schema parsing errors, cyclic dependency detected. |

---

### 15.17 Offline Learning
*   **Overview**: Caches region metadata and content for offline use.
*   **Detailed Behaviors**:
    *   Saves active lesson states locally, caching workspace progress for synchronization.

#### 15.17.1 Specifications

| Req ID | Input | Processing | Output | Error States |
| :--- | :--- | :--- | :--- | :--- |
| **FR-OFL-01** | Download request for a specific region. | Fetch all content bundles in region, cache in client browser local database storage. | Offline indicator on region, downloaded success status. | Storage limit exceeded, incomplete bundle down. |

---

### 15.18 Cross-device Synchronization
*   **Overview**: Syncs workspace states and progress between devices.
*   **Detailed Behaviors**:
    *   Resolves conflicts using timestamp vector clocks to choose the highest progress state.

#### 15.18.1 Specifications

| Req ID | Input | Processing | Output | Error States |
| :--- | :--- | :--- | :--- | :--- |
| **FR-SYNC-01**| Connection re-established state. | Parse local updates, compare version vector clocks with server databases. | Synchronized state, update maps, clear local conflict queue. | Sync conflict (requiring user manual choice). |

---

### 15.19 Settings
*   **Overview**: Manages themes, layout preferences, and privacy rules.
*   **Detailed Behaviors**:
    *   Allows toggling Passport public visibility and managing API access keys.

#### 15.19.1 Specifications

| Req ID | Input | Processing | Output | Error States |
| :--- | :--- | :--- | :--- | :--- |
| **FR-SET-01** | Toggle dark/light theme, set privacy bounds on profile/passport. | Update local setting file, synchronize preferences to server. | Immediate visual style shift, updated passport public toggle. | Write permission fail. |

---

### 15.20 Accessibility
*   **Overview**: Enforces WCAG compliance across interactive modules.
*   **Detailed Behaviors**:
    *   Supports custom color-contrast ratios, keyboard focus guides, and screen readers.

#### 15.20.1 Specifications

| Req ID | Input | Processing | Output | Error States |
| :--- | :--- | :--- | :--- | :--- |
| **FR-ACC-01** | Keyboard navigate interactions (Tab, Arrows). | Move focus borders across UI components, support screen reader aria elements. | Clear focus boundaries, screen reader audio tags match view. | Visual model focus trapping. |

---

## 16.0 Non-Functional Requirements

The platform must satisfy the following performance, scalability, security, reliability, availability, accessibility, privacy, and internationalization targets:

### 16.1 Target Specifications

| Category | Requirement Specification | Measurement Logic | V1 target Threshold |
| :--- | :--- | :--- | :--- |
| **Performance** | Time-to-Interactive (TTI) | Average load-to-edit duration on a standard connection. | < 1.5 seconds |
| **Performance** | Sandbox execution latency | Duration between click event and result payload. | < 200 milliseconds |
| **Performance** | Render Framerate | World Map and Knowledge Tree canvas framerate. | Stable 60 FPS |
| **Security** | Sandbox Isolation | User code isolation from host client resources. | Completely isolated, no storage access, no cross-origin scripting. |
| **Security** | CPU execution thread bounds | Maximum allowable compilation and execution run time. | Max 10.0 seconds |
| **Security** | Password Hashing | Minimum strength verification logic. | Modern high-entropy key derivation algorithms. |
| **Reliability** | Auto-save Frequency | Save period for client workspace edits. | Every 30 seconds |
| **Reliability** | Recovery Point Objective (RPO) | Database backup synchronization frequency. | Under 24 hours |
| **Scalability** | Concurrent WebSocket Syncs | Maximum active synchronized client processes. | 20,000 concurrent loops |
| **Availability** | System Uptime | Access availability metrics for core pages. | 99.9% uptime per calendar month |
| **Accessibility** | Color Contrast | Contrast ratio parameters. | Minimum 4.5:1 ratio |
| **Accessibility** | Keyboard Navigation | Focus behavior constraints. | Zero focus trapping, logical sequential tab order. |
| **Privacy** | Data Deletion | Execution timeline for data deletion requests. | Processed within 72 hours of request validation. |
| **Maintainability**| Automated Test Coverage | Code coverage target metrics. | Minimum 80% automated unit test coverage |
| **Internationalization** | Language Support | Translation framework. | Separate JSON file schema formats for all interface strings. |

### 16.2 Reliability and Disaster Recovery specifications
*   **Data Integrity Assurance**: In the event of network dropouts or unexpected device shutdown, local client storage databases must guarantee zero code data corruption. Writing data chunks uses transactional schemas.
*   **Disaster Recovery Site Replication**: Active application state data tables must be replicated across at least two distinct geographic regions. If Region A suffers a complete system fail, routing tables must dynamically shift traffic to Region B within 5 minutes, achieving a recovery time objective (RTO) of under 5 minutes.

### 16.3 Security containerization specifications
*   **Execution Isolation Sandbox**: Sandbox execution threads must verify that zero operations attempt file reads outside the `/workspace/` folder. Sockets access must trigger immediate connection aborts.
*   **Rate Limits and Security Throttles**: Authentication pathways must trigger rate throttling after 5 consecutive incorrect logins, blocking the requesting client IP for 15 minutes.

---

## 17.0 User Flows

### 17.1 New User Journey

```
[Visitor on Landing Page]
           │
           ▼
[Onboarding: Set Career Path & Goals]
           │
           ▼
[Account Creation: Select Unique Developer ID]
           │
           ▼
[Load World Map: Fog clears on Starter Region]
           │
           ▼
[First Lesson: Intro to Variables & Mental Model]
           │
           ▼
[Run Verification Test (Succeeds) ➔ Award First Badge]
```

#### Step-by-Step Flow:
1. **Landing**: Visitor arrives on landing page, reviews platform model, and clicks "Start Journey."
2. **Path Setup**: AI Planner guides user through goal selection, experience assessment, and commitment level.
3. **Register**: User selects email/password or SSO login, and secures a unique Developer ID (e.g. `dev.name/sarahtech`).
4. **Init Map**: System loads the spatial map. Starter Region nodes are highlighted, and the rest of the map is hidden in dark fog.
5. **Onboarding Lesson**: User opens the introductory node, reads the variable analogies, runs their first sandbox verification test successfully, and earns their profile setup badge.

---

### 17.2 Returning User Journey

```
[Launch App / Login]
         │
         ├──────────────────────────────────────────┐
         ▼                                          ▼
[Active Revision Check]                    [Dashboard: Resume Learning]
         │                                          │
    (Needs Review)                                  │
         │                                          ▼
[Execute Spaced Repetition]                [Load Active Mission Node]
         │                                          │
         ├──────────────────────────────────────────┘
         ▼
[Launch Workshop / Resume Editing]
```

#### Step-by-Step Flow:
1. **Access**: Returning user logs in. The Learning Engine queries active recall requirements and current mission locations.
2. **Redirect Evaluation**:
   *   If scheduled revision cards are overdue, the user is prompted to clear their "Revision Stack" first.
   *   If no revisions are due, the primary CTA buttons highlight the active mission.
3. **Resume Workspace**: Click "Resume," load the exact file states of the previous session in the Workshop, and restore the editor focus.

---

### 17.3 Learning Session Flow

```
[Load Lesson Node] ──► [Read Concept & Analogy] ──► [Interact with Visual Model]
                                                          │
                                                          ▼
[Verify Test Run (Fail)] ◄── [Edit Code in Workshop] ◄── [First Test Run (Fail)]
           │
     (AI Debugger Hint)
           │
           ▼
[Verify Test Run (Pass)] ──► [Reflect on Refactored Reference Code] ──► [Complete Node]
```

#### Step-by-Step Flow:
1. **Load Node**: Learner clicks on an unlocked Knowledge Tree node. The Workshop renders instructions, dynamic analogical diagrams, and sandbox files.
2. **Interact**: Learner reviews concepts and moves dynamic sliders on visualizers to inspect call stacks or memory indexes.
3. **Initial Run**: User edits skeleton code and executes the test runner (resulting in failure logs).
4. **Iterative Coding**: User updates code. If stuck, the AI Debugger provides context-aware hints.
5. **Pass**: The test suite passes. The Workshop opens a split-screen comparing user code with clean reference code.
6. **Save**: The user reflects, confirms, saves completion data, and unlocks adjacent tree nodes.

---

### 17.4 Revision Session Flow
1. **Trigger**: Learning Engine schedules a review task based on spaced repetition settings.
2. **Presentation**: User opens the "Active Recall Corner" on mobile or desktop.
3. **Card Load**: System renders an active recall prompt (e.g. fill-in-the-blank logic, or fixing a buggy code snippet).
4. **Execution**: Learner submits the correct configuration.
5. **Result Log**:
   *   *Succeeds*: Scheduled revision date pushes out (e.g. from 3 days to 7 days).
   *   *Fails*: Mastery level drops to 0, scheduling another review for tomorrow.
6. **Next Card**: Next card loads until the stack is cleared.

---

### 17.5 Project Building Flow (Developer Lab)
1. **Entrance**: User starts a capstone project inside the desktop-only Developer Lab.
2. **Design**: Learner reads the specifications document, reviews network/database diagrams, and designs their project plan.
3. **Orchestrate**: User constructs files, configures mock servers, sets database schemas, and implements the requirements.
4. **Verification**: User executes local integration tests, checks performance budgets, and profiles performance.
5. **Submission**: User clicks "Submit Project." The platform executes an integration test suite validating latency bounds, concurrency stability, and edge-case exceptions.
6. **Passport Sync**: The project passes, code updates are pushed to their Developer Passport profile, and the next region is unlocked.

---

### 17.6 Friend Connection Flow
1. **Search**: Learner searches for a user handle in the global registry.
2. **Request**: Learner sends an "Intentional Collaboration Invite."
3. **Response**: Recipient receives a notification. They accept or decline.
4. **Connection**: Once accepted, they appear in each other's "Developer Cohort" panel.
5. **Collaborate**: They can view each other's Passport metrics, schedule private code reviews, and work on collaborative debugging labs. No general feeds, social scrolls, or likes are supported.

---

### 17.7 Progress Sync Flow
1. **Connection**: Client device detects restoration of internet connection.
2. **Compile**: System reads offline cache (completed nodes, recall stats, code edits).
3. **Transmission**: Client sends synchronization packet containing version coordinates.
4. **Conflict Check**: Server checks for sync conflicts.
   *   *No conflicts*: Database tables update immediately.
   *   *Conflict*: Server uses timestamp vectors to merge states, prioritizing the highest progress.
5. **Complete**: Success code returned, local offline DB updates, sync notification flashes.

---

## 18.0 Feature List

### 18.1 Core Features

| Feature ID | Feature Name | Description | User Interface | Impact |
| :--- | :--- | :--- | :--- | :--- |
| **FE-CORE-01** | World Map | Visual spatial representation of regions and missions. | Desktop & Mobile | High |
| **FE-CORE-02** | Knowledge Tree | Dependency-based conceptual node map. | Desktop & Mobile | High |
| **FE-CORE-03** | Workshop IDE | Three-pane sandboxed text editor and test executor. | Desktop Only | High |
| **FE-CORE-04** | Developer Lab | Environment for multi-file capstones and systems engineering. | Desktop Only | High |
| **FE-CORE-05** | Passport | Verifiable portfolio of work, code, and system performance metrics. | Desktop & Mobile | High |
| **FE-CORE-06** | AI Mentor Ecosystem | Diagnostic AI agents (Mentor, Debugger, Reviewer, Interviewer, Planner). | Desktop Only | High |
| **FE-CORE-07** | Learning Engine | Spaced repetition scheduler and adaptive routing. | Desktop & Mobile | High |

### 18.2 Supporting Features

| Feature ID | Feature Name | Description | User Interface | Impact |
| :--- | :--- | :--- | :--- | :--- |
| **FE-SUPP-01** | User Settings | Profile settings, themes (dark/light), notifications config. | Desktop & Mobile | Medium |
| **FE-SUPP-02** | Search Directory | Unified search for nodes, concepts, and developer profiles. | Desktop & Mobile | Medium |
| **FE-SUPP-03** | Cohort Connection | Intentional friend linking for peer reviews and debugging. | Desktop & Mobile | Medium |
| **FE-SUPP-04** | Content Studio | Authoring workspace with markdown templates and schema linting. | Desktop Only | Medium |
| **FE-SUPP-05** | Notification Hub | Alerts for scheduled recall tasks, review comments, and cohort requests. | Desktop & Mobile | Medium |
| **FE-SUPP-06** | Visualizer Engine | Interactive diagrams and animations showing runtime mechanics. | Desktop & Mobile | Medium |

### 18.3 Future Features (Post V1)

| Feature ID | Feature Name | Description | User Interface | Impact |
| :--- | :--- | :--- | :--- | :--- |
| **FE-FUT-01** | Distributed Lab | Virtual clustered servers sandbox for testing system failures. | Desktop Only | Medium |
| **FE-FUT-02** | Enterprise Portal | Portal for recruiters to review passports and launch hiring tests. | Desktop Only | Medium |
| **FE-FUT-03** | Community Studio | Open-sourced platform for public authors to publish custom nodes. | Desktop Only | High |

---

## 19.0 Product Scope
The scope of Programming Mastery V1.0 comprises the development of the following core systems:
*   The spatial World Map interface featuring the Starter, Fundamentals, Frontend, Backend, and Database regions.
*   The interactive, dependency-based Knowledge Tree containing core developer pathways.
*   The three-pane desktop-first Workshop sandboxed workspace.
*   The Developer Lab containing test setups for relational data schema designs, API builds, and local verification.
*   The public-facing Developer Passport rendering verified code execution data, system optimizations, and progress metrics.
*   The AI Mentor Ecosystem (AI Mentor, AI Debugger, and AI Reviewer modules).
*   The offline-first client database cache and vector synchronization server engine.
*   A verified set of 50 core content bundles covering programming foundations, full-stack basics, SQL indexing, and systems engineering practices.

---

## 20.0 Out of Scope
The following features are intentionally excluded from the V1 roadmap to maintain focus on the core learning mechanics:
*   **Video Hosting & Streaming**: No native video players, lecture playlists, or live streaming architectures.
*   **Public Social Feed**: No social timelines, scrollable feeds, public commenting sections, likes, retweets, or follower tracking systems.
*   **Leaderboards & XP Grinding**: No comparative competitor lists, public rankings, or micro-challenges meant only for repeating points accumulation.
*   **Automatic Code Completion / Generators**: No AI-driven autocomplete, tab-to-generate snippets, or automatic workspace code generation.
*   **Mobile Code IDE**: No support for editing source files, terminal execution, or sandbox code testing on mobile browsers or apps.
*   **Recruitment Job Boards**: No native hiring channels, jobs postings, or direct employer communication portals (relegated to Phase II).

---

## 21.0 Success Metrics

We measure platform effectiveness through four key metrics categories:

| Metric ID | Metric Name | Category | Measurement Logic | Success Threshold |
| :--- | :--- | :--- | :--- | :--- |
| **SM-01** | D30 Engagement Retention | Retention | Ratio of users returning to complete a revision or lesson 30 days post-sign-up. | > 40% |
| **SM-02** | Task-Completion Efficiency | User Experience | Average failure count before a learner completes a Workspace verification node. | < 5 attempts |
| **SM-03** | System Performance Index | Core Engineering | Average latency of client test sandboxes executing assertions. | < 200 ms |
| **SM-04** | Revision Schedule Match | Learning | % of scheduled spaced repetition cards resolved inside their target timeline. | > 75% |
| **SM-05** | Employer Placement Rate | Business Impact | % of users with verified Passports securing software roles within 180 days. | > 80% |

---

## 22.0 Risks & Mitigation Strategies

| Risk ID | Risk Description | Severity | Probability | Mitigation Strategy |
| :--- | :--- | :--- | :--- | :--- |
| **RSK-01** | **AI Dependency**: Learners use outside LLMs to write code, skipping the cognitive struggle. | High | High | *   Ensure the AI Mentor does not write code.
*   Structure V1 verification test suites to detect common AI-generated signatures and flag them.
*   Design challenges that require modifying existing multi-file setups, rendering copy-paste code inputs useless. |
| **RSK-02** | **Sandbox Security**: User compiles code designed to escape container layers or overload host resources. | High | Medium | *   Implement sandboxes with strict CPU, memory, and timeout bounds (max 10s execution).
*   Disable socket access, root write configurations, and command executions outside the workspace scope. |
| **RSK-03** | **Content Outdating**: Rapid changes in web standards make node content out of date. | Medium | High | *   Keep instructions focused on durable principles (e.g. databases, HTTP, memory models).
*   Enforce decoupled Content-Driven Architectures to update content bundles quickly without code releases. |
| **RSK-04** | **Learner Fatigue**: Without video streams and hand-holding, some users find the platform too challenging. | High | Medium | *   Build an adaptive engine that dynamically scales down challenge difficulty and provides smaller sub-challenges when a user gets stuck. |

---

## 23.0 Assumptions
*   **Infrastructure**: Learners own a desktop computer with a modern keyboard, screen size (min 13 inches recommended), and updated web browser.
*   **Literacy**: Users possess basic computer literacy (file navigation, mouse interactions, typing skills).
*   **Network**: Users have intermittent access to an internet connection to download content bundles and synchronize state logs.

---

## 24.0 Future Vision
Looking beyond V1.0, Programming Mastery will expand into a decentralized community learning ecosystem. We will release Phase III, which open-sources the Content Studio to verified authors worldwide. Independent teachers, engineering teams, and academic organizations will publish custom-tailored regions to the Knowledge Tree, and the Developer Passport will serve as a global standard for hiring and professional verification. Ultimately, we aim to establish a self-sustaining ecosystem where senior developers teach junior developers, and the community continuously updates the roadmap.
