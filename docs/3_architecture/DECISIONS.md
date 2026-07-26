# Architectural Decisions Records (ADR) Registry

This document serves as the central index of significant architectural and design choices made during the lifecycle of the **Programming Mastery** project. By tracking decisions here, we establish context and trace the evolution of the codebase architecture.

---

## 1. How to Read an ADR

Every Architecture Decision Record (ADR) is written using a standard format:

*   **Status**: Indicates whether the decision is `Proposed`, `Accepted`, `Superceded`, or `Rejected`.
*   **Context**: The problem we are trying to solve, background requirements, and constraints.
*   **Alternatives Considered**: A list of alternative solutions, along with their pros and cons.
*   **Decision**: The selected path, and why it was selected over the alternatives.
*   **Consequences**: The trade-offs, limitations, and subsequent changes resulting from the choice.

---

## 2. Decision Registry

| ID | Title | Date | Status | Target Area |
| :--- | :--- | :--- | :--- | :--- |
| **0001** | [Repository Monorepo Boundaries](file:///c:/Users/hp/fabi-learning/programming-mastery/docs/3_architecture/decisions/0001-repository-structure.md) | 2026-07-25 | `Accepted` | Git Repo Structure |
| **0002** | [Challenge Execution Sandbox Model](file:///c:/Users/hp/fabi-learning/programming-mastery/docs/3_architecture/decisions/0002-runtime-sandbox-model.md) | 2026-07-25 | `Accepted` | Code Execution Sandbox |

---

## 3. Creating a New ADR

To propose a new architectural decision:
1. Copy the standard ADR markdown structure.
2. File it under `/docs/3_architecture/decisions/` using a sequential numbering prefix (e.g. `0003-state-management.md`).
3. Add the record entry to the table above.
4. Submit the ADR for peer review as part of the pull request flow.
