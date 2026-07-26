# Contributor's Guide: Programming Mastery

Welcome to **Programming Mastery**! We are delighted that you want to help us build a premium, interactive learning experience.

To ensure our codebase remains clean, maintainable, secure, and accessible, all contributors must follow the guidelines detailed below.

---

## 1. Developer Onboarding & Local Setup

Because we use a monorepo workspace architecture:
1.  **Prerequisites**: Ensure you have Node.js (v18+) and your package manager of choice installed.
2.  **Clone the Repo**:
    ```bash
    git clone https://github.com/your-org/programming-mastery.git
    cd programming-mastery
    ```
3.  **Install Workspace Dependencies**: Install dependencies across all packages at once:
    ```bash
    npm install
    # or if using pnpm
    pnpm install
    ```
4.  **Run Development Servers**: Spin up the local workspace environment (frontend apps, API, documentation watch runs):
    ```bash
    npm run dev
    ```

---

## 2. Git Workflow & Branching Strategy

We follow a structured trunk-based development workflow:

*   **Branch Naming Format**: Create branch names starting with type descriptors:
    *   `feat/` : New feature implementations (e.g., `feat/streak-freeze`)
    *   `fix/`  : Bug fixes (e.g., `fix/runner-timeout`)
    *   `docs/` : Documentation updates or additions (e.g., `docs/add-adr-0003`)
    *   `lxd/`  : Lesson curriculum content updates (e.g., `lxd/javascript-arrays`)
*   **Git Commits (Conventional Commits)**: All commits must conform to the conventional commit specification:
    ```
    type(scope): description
    ```
    *   *Examples*:
        *   `feat(client): implement custom workspace code editor`
        *   `fix(api): adjust rate limiting rules on challenge submits`
        *   `docs(architecture): write ADR on state management`
        *   `lxd(content): add lessons for variable declaration`

---

## 3. Code Standards & Architecture Validation

*   **TypeScript Enforcements**: Strict mode is enabled across all packages. Avoid the use of `any` type overrides; write explicit interfaces and types.
*   **Separation of Concerns**: Never mix domain logic with UI rendering. Ensure that core calculations (like spaced repetition scores or XP levels) exist as pure functions inside domain scopes, separate from React/Next.js files.
*   **Documentation Alignment**: If a pull request introduces a major structural change, you must propose an accompanying ADR inside `/docs/3_architecture/decisions/` describing the change and trade-offs.

---

## 4. Pull Request Checklist & Template

When opening a Pull Request (PR), copy and complete the following description template:

```markdown
## Summary
[Explain what this PR introduces and why.]

## Linked Issue
Closes #[Issue Number]

## Checklist
- [ ] TypeScript compiler runs clean with zero warnings.
- [ ] Coding standard check formats match (Eslint / Prettier run with zero changes).
- [ ] Coverage requirements met (unit tests written for new domain logic).
- [ ] Accessibility verified (tab navigation and screen-contrast checks pass).
- [ ] If changing schemas or structural layers, an ADR has been added.
- [ ] Lesson files follow LXD formatting schemas in CONTENT_GUIDELINES.md.
```

---

## 5. Course Content Contributions (LXD)

If you are contributing educational lessons or coding challenges:
1.  Verify your markdown files follow the templates in `docs/1_product/CONTENT_GUIDELINES.md`.
2.  Run the curriculum validation script locally to check schemas:
    ```bash
    npm run validate:content
    ```
3.  Test your coding challenges in the sandbox runner workspace before committing.
