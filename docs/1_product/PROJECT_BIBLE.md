# Project Bible: Programming Mastery

This document is the Single Source of Truth (SSOT) for the functional specifications, product features, user flows, and product schemas of **Programming Mastery**. It describes *what* the application does, *how* users interact with it, and *why* specific product boundaries exist, independent of the underlying implementation technologies.

---

## 1. Target User Personas

To ensure the platform remains purposeful, all features are designed to serve five core personas:

| Persona | Motivation | Pain Point | Core Platform Feature |
| :--- | :--- | :--- | :--- |
| **Complete Beginner** | Wants a clear, non-intimidating start in web development. | Confused by terminology, gets stuck on local environment setup. | Visual interactive sandboxes, real-world analogies, incremental skill path. |
| **Self-Learner** | Seeks structured, comprehensive curriculum without boot camp costs. | Lack of direction, difficulty staying motivated, high abandon rate. | Gamified progression trees, streak incentives, streak protection features. |
| **College Student** | Needs practical coding skills to supplement theoretical courses. | Curricula are outdated, lacking modern full-stack application experience. | Project-based modules, coding challenge arena, direct concept verification. |
| **Job Seeker** | Preparing for engineering interviews and looking for portfolio work. | Hard to pass technical screens, portfolios look like generic tutorial clones. | Interview prep corner in every lesson, complex multi-file challenges. |
| **Transitioning Developer** | Adding modern web development to an existing software background. | Foundations are too slow, gets bored with basic syntax explanations. | Ability to test out of foundational nodes; advanced concepts deep-dives. |

---

## 2. Core Functional Modules

The platform is structured into five core modules. Each module has strict design and product requirements.

### A. The User Dashboard
The dashboard is the central hub for the student's learning journey.
*   **Resume Learning Engine**: A single, prominent button that immediately takes the user to their active lesson, calculating their current node position automatically.
*   **Visual Curriculum Tree (Skill Tree)**: An interactive path showing completed, active, and locked nodes.
*   **Engagement Tracking**: Displays current daily streak, total XP, and achievements.
*   **Streak Protection**: A mechanism allowing users to purchase a "streak freeze" with XP earned through completing challenges, fostering retention without anxiety.

### B. The Interactive Workspace (The Classroom)
The main learning view is a multi-pane layout designed for focused study.
*   **The Lesson Pane**: Displays the markdown content, analogies, diagrams, and pitfall callouts.
*   **The Code Workspace**: An editor that supports syntax highlighting, multi-file editing, and automatic saving.
*   **The Preview / Console Pane**: Renders the output of HTML/CSS/JS or shows the execution logs for backend lessons.
*   **The Test Runner Panel**: Displays step-by-step verification tests (e.g. "Test 1: Variable `username` must be declared. [Passed]").

### C. Revision Mode (Active Recall Engine)
To combat the forgetting curve, the platform includes a built-in spaced repetition system.
*   **Active Recall Prompts**: Instead of rereading, users are prompted with interactive, fill-in-the-blank, or error-debugging questions based on past lessons.
*   **Spaced Repetition Scheduler**: Lessons are automatically queued for review at intervals (e.g., 1 day, 3 days, 7 days, 30 days) depending on user performance.
*   **Performance Rating**: Users rate their confidence on a scale of 1-3, which adjusts the next review timestamp.

### D. Challenge Mode
An arena for testing problem-solving under different constraints.
*   **Debugging Arena**: Users are given a broken codebase and must find and fix the bug to make the test suite pass.
*   **Refactoring Arena**: Users must optimize a functional but poorly written script to meet clean-code rules (e.g. reduce complexity, improve runtime performance).
*   **Algorithmic Arena**: Focuses on core logic challenges structured around standard interview patterns.

### E. Admin Control Panel
The content management workspace for administrators and course designers.
*   **Visual Curriculum Builder**: Drag-and-drop tool to arrange course nodes, link prerequisites, and manage content paths.
*   **Analytics Engine**: Tracks aggregate metrics such as average completion times, failure rates per lesson, and drop-off points.
*   **Content Editor**: Markdown interface for content creation, complete with template generators for test configurations.

---

## 3. Product Workflows & State Machines

### The Student Lesson Flow
This diagram details the product lifecycle of a student progress cycle inside a lesson:

```
[Start Lesson]
      │
      ▼
[Read Concepts & Review Visuals]
      │
      ▼
[Edit Code in Workspace]
      │
      ▼
[Run Code Verification Tests]
      │
      ├─► (Fail) ──► Show Target Clues & Pitfall Reference ──► [Edit Code]
      │
      └─► (Pass) ──► Award XP ──► Unlock Next Node ──► Schedule Revision
```

### Spaced Repetition State Machine
A student's mastery level for a specific concept changes according to their revision performance:

```
                  ┌─────────────── Fail (Reset Interval) ───────────────┐
                  │                                                     │
                  ▼                                                     │
        [Mastery Level 0] ──► Pass ──► [Level 1 (1 Day)] ──► Pass ──► [Level 2 (3 Days)]
                                                                           │
                                                                          Pass
                                                                           │
                                                                           ▼
                                                                     [Level 3 (7 Days)]
```
*   **Rules**: Any failure during review resets the mastery level back to Level 0, ensuring the user gets immediate reinforcement on the concept.
*   **Spacings**: Recommended spacing intervals are 1 day, 3 days, 7 days, 14 days, and 30 days.

---

## 4. Product Boundaries & Constraints

*   **Offline Mode**: The platform should support reading already-downloaded lessons offline, caching the user's progress until they reconnect.
*   **Sandbox Safety**: The user workspace must not run code that can access local sensitive paths, compromise the client browser, or overload backend resources.
*   **Accessibility Boundaries**: The workspace layout must remain readable at zoom levels up to 200%, support full keyboard navigation, and provide visual indicators alongside color-coded states (e.g., combining red borders with "Failed" text icons).
