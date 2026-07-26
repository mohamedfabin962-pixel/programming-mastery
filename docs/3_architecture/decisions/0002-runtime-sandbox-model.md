# ADR 0002: Challenge Execution Sandbox Model

*   **Status**: Accepted
*   **Date**: 2026-07-25
*   **Deciders**: Engineering & Architecture Team

---

## 1. Context

For "Challenge Mode" and interactive lessons, students will write code (JavaScript, React components, Node.js routers, Express servers) and execute it in real time to verify correctness. This requires a secure code execution environment (sandbox).

We must choose where and how this user code runs. The requirements are:
1.  **Security**: Prevent malicious code from accessing server resources, filesystems, or targeting other users.
2.  **Performance / Speed**: Running test suites should feel immediate (<500ms) to maintain a premium learning experience.
3.  **Cost**: Scaling the platform to thousands of active users should not require expensive, persistent container servers.
4.  **Capabilities**: The system must eventually support both frontend tasks (DOM manipulation, UI rendering) and backend tasks (HTTP route handling, database integrations).

---

## 2. Alternatives Considered

We compared three primary sandbox patterns:

### Alternative A: Complete Client-Side Evaluation
*Execute user code inside the learner's browser using sandboxed `iframe` panels, Web Workers, or WebAssembly (Wasm) runtimes.*
*   *Pros*:
    *   No backend server costs; computing is offloaded to the user's browser.
    *   Near-instantaneous execution times.
    *   Inherently secure for servers since no student code touches the backend.
*   *Cons*:
    *   Limited capability. Cannot easily run persistent database instances or execute real Node/Express services without complex in-browser virtualization (e.g. StackBlitz WebContainers).

### Alternative B: Complete Server-Side Containerized Evaluation
*Transmit code payload to a backend API, spawn an isolated container (e.g. Docker, AWS Lambda), run tests, and return results.*
*   *Pros*:
    *   Highly capable: Can execute any software, databases, or terminal commands.
    *   Easily matches real-world deployment scenarios.
*   *Cons*:
    *   High server costs: Running containers for every code execution request is expensive.
    *   Latency: Network hops and container spin-up times create a laggy UX (>1500ms delay).
    *   High security risk: Requires strict firewalls, rate limiters, and sandbox isolation.

### Alternative C: Hybrid Sandbox Model (Recommended)
*Use browser-based execution for basic JS/frontend lessons, and fall back to secure backend runners for advanced Node/Express/DB lessons.*
*   *Pros*:
    *   Optimizes cost and latency for 80% of lessons.
    *   Supports the full curriculum path from simple variables to complex databases.
*   *Cons*:
    *   Requires building and maintaining two execution pipelines.
    *   Requires a routing engine to direct challenges to the appropriate runner based on metadata tags.

---

## 3. Decision & Rationale

We decide to adopt **Alternative C: Hybrid Sandbox Model**.

We justify this choice based on our balance of performance and long-term scaling goals:
*   **Optimal Learning Experience**: Frontend and basic JavaScript lessons represent the bulk of the early learning path. By running these in the browser (Alternative A), students get immediate feedback as they type, keeping them in the Flow State.
*   **Scale and Cost Control**: Offloading the majority of tests to client-side sandboxes prevents our server bills from scaling linearly with the number of users.
*   **Backend Capabilities**: As students progress to database mapping and Express routers, we route their code to secure, short-lived server containers. This ensures they build actual server endpoints without compromising server safety.

---

## 4. Consequences

*   **Curriculum Configuration**: Lesson metadata schemas must include a runner tag (e.g., `"executionEnvironment": "client" | "server"`) to direct the workspace where to execute the code.
*   **Security Implementation**:
    *   For browser execution, we must configure strict `Content-Security-Policy` (CSP) rules on the workspace page, and lock iframe sandbox attributes to `allow-scripts`.
    *   For server execution, we must implement strict execution timeouts, CPU caps, and complete network isolation for container daemons.
