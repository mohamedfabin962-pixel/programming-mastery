# ADR 0001: Repository Monorepo Boundaries

*   **Status**: Accepted
*   **Date**: 2026-07-25
*   **Deciders**: Engineering & Architecture Team

---

## 1. Context

We need to choose a repository model for the Programming Mastery platform. The system will eventually include:
1.  A frontend student application (interactive workspace, dashboard).
2.  A backend API server handling authorization, spaced repetition logic, and user statistics.
3.  A curriculum folder containing lesson documents (Markdown) and challenge metadata (JSON).
4.  Tooling packages, such as a content validator script (Linter) to verify formatting rules before curriculum deployment.

We need a structure that simplifies developer onboarding, guarantees type safety across system components, and allows independent versioning/testing of our educational content.

---

## 2. Alternatives Considered

We compared two primary repository models:

### Alternative A: Multi-Repo (Polyrepo) Structure
*Separate Git repositories for the client app, backend server, curriculum content, and validation tools.*
*   *Pros*:
    *   Strong structural isolation. Team members working on content have access to only the content repository.
    *   Simplified build pipelines. Changes to content don't trigger backend server rebuilds.
*   *Cons*:
    *   High maintenance overhead. Changes affecting multiple systems (e.g. adding a new challenge validation field) require matching pull requests across multiple repositories.
    *   Harder to maintain code alignment and type sharing.

### Alternative B: Monorepo Structure
*A single unified Git repository containing separate workspace directories for the frontend, backend, content packages, and tooling.*
*   *Pros*:
    *   Single source of truth. Entire project state is captured at a single commit.
    *   Easy code sharing. Domain types and validators (e.g., Zod schemas) can be imported by client and server apps directly.
    *   Unified onboarding. Running a single checkout command gets all parts of the application running locally.
*   *Cons*:
    *   Larger codebase size, potentially slowing down Git operations over long periods.
    *   Requires a build cache system (like Turborepo or Nx) to avoid unnecessary testing and deployment overhead for unmodified workspaces.

---

## 3. Decision & Rationale

We decide to adopt **Alternative B: Monorepo Structure**.

We justify this choice based on our core architectural and product goals:
*   **Maintainability & Type Safety**: The web client and backend API must share data definitions. A monorepo lets us maintain a shared TypeScript package. If the structure of a `Lesson` entity changes, TypeScript compiler errors instantly flag problems in both client and API apps.
*   **Learning Experience & Content Validation**: The platform requires a premium, bug-free curriculum. By housing the content package (`/packages/content`) directly inside the monorepo, we can run content linting scripts during every code integration commit. If a curriculum writer makes an error in a lesson schema, the CI checks fail before the content can affect learners.
*   **Developer Onboarding**: Since our target audience includes developers preparing for interviews or contributing to open source, keeping a single, self-contained monorepo makes it trivial to check out the project and run it with a single command.

---

## 4. Consequences

*   **Build System Requirements**: We must implement a monorepo management configuration (e.g., NPM workspaces or PNPM workspaces) alongside a build optimizer (e.g., Turborepo) to execute build caches.
*   **Access Control**: Code formatting and linting rules must be applied globally across workspaces, while allowing workspace-specific configurations where necessary.
*   **Deployments**: The hosting provider pipelines must support subdirectory-based triggering (e.g., only build/deploy `apps/client` when files in that path or shared dependencies change).
