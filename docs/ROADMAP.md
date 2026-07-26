# Programming Mastery: Project Roadmap

This document outlines the high-level roadmap and granular phase execution plans for the development, release, and scaling of **Programming Mastery**. It is a living document updated at major planning intervals to guide engineering resources, design focuses, and content schedules.

---

## 1. Roadmap Overview

```
Phase 1: Foundations ──► Phase 2: Core Platform ──► Phase 3: Interactive Suite ──► Phase 4: Expansion & Scale
  (Linting & Monorepo)       (Auth & Dashboard)          (Sandboxing & Review)         (Advanced Stack & AI)
```

---

## 2. Granular Development Phases

### Phase 1: Architectural Foundations (Weeks 1 - 4)
Focus on setting up the workspace boundaries, configuration tools, design system scaffolding, and content pipelines.
*   **Infrastructure**:
    *   Set up monorepo workspace configuration (e.g., workspaces setup).
    *   Initialize build tools (e.g., build cache pipelines, bundlers).
    *   Set up unified linting and formatting rules.
*   **Design & UI**:
    *   Initialize design tokens (HSL colors, type scales, spacing units) inside styling files.
    *   Create base design system components (buttons, input fields, visual containers, layout grids).
*   **LXD (Curriculum)**:
    *   Draft and validate initial JavaScript core syllabus JSON schema.
    *   Develop a CLI content-validation tool that checks content markdown and challenge files.

### Phase 2: Core User Experience (Weeks 5 - 8)
Build the user lifecycle, dashboard paths, and primary lesson reading environment.
*   **Authentication & Security**:
    *   Implement user registration, profile management, and login.
    *   Configure HTTP-Only cookies, JWT management, and role validation rules.
*   **Dashboard Module**:
    *   Build the interactive visual curriculum tree (Skill Tree renderer).
    *   Implement user progress tracking (XP, streaks, and milestone badges).
*   **Classroom Interface**:
    *   Implement the dual-column reader layout (prose on left, playground workspace on right).
    *   Build standard lesson reader components that render content layout templates.

### Phase 3: Interactive Learning Suite (Weeks 9 - 14)
Bring active coding sandboxes and review engines online to fulfill the manifesto goals.
*   **In-Browser Sandbox (Frontend / JS)**:
    *   Develop sandboxed iframe rendering engine using Web Workers for safety.
    *   Implement local test runner capturing execution results and printing test assertions.
*   **Spaced Repetition Engine (Revision Mode)**:
    *   Write calculations logic for spaced repetition intervals.
    *   Build the active recall card workspace (fill-in-the-blank, error debugging cards).
*   **Challenge Mode**:
    *   Develop the debugging arena and refactoring arena views with side-by-side file differences.

### Phase 4: Advanced Modules & Scale (Weeks 15+)
Support the full MERN journey and leverage data to optimize learning.
*   **Isolated Server Sandbox**:
    *   Design container orchestrators to compile and test full-stack Node.js / Express challenges.
    *   Implement secure worker queues to execute and return output within a 2000ms ceiling.
*   **Admin & Content Creator Suite**:
    *   Deploy visual course builder mapping curriculum dependencies.
    *   Implement analytics panel indicating drop-off coordinates, lesson failure metrics, and average completion timelines.
*   **Adaptive Learning Paths**:
    *   Design adaptive learning scripts that recommend revision cards based on specific concept performance.
