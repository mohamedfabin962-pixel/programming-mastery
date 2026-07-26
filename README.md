<<<<<<< Updated upstream
# programming-mastery
=======
# Programming Mastery

A premium, interactive web platform for learning modern full-stack web development through structured, visual, and project-based instruction. 

---

## 📖 Documentation Architecture

Before writing any application code, we establish a robust documentation system. Use the links below to explore the core product specifications, visual systems, and technical architectures:

### 1. Product & Pedagogy (Product Design)
*   **[Project Manifesto](file:///c:/Users/hp/fabi-learning/programming-mastery/docs/1_product/PROJECT_MANIFESTO.md)**: Defines the platform's vision, core values, learning philosophy, and gamification principles.
*   **[Project Bible](file:///c:/Users/hp/fabi-learning/programming-mastery/docs/1_product/PROJECT_BIBLE.md)**: The single source of truth for target user personas, features, workspace pages, and sitemaps.
*   **[Content Guidelines](file:///c:/Users/hp/fabi-learning/programming-mastery/docs/1_product/CONTENT_GUIDELINES.md)**: Educational standards, writing tone, lesson templates, and structural metadata JSON schemas.

### 2. UI/UX Design System
*   **[Design System](file:///c:/Users/hp/fabi-learning/programming-mastery/docs/2_design/DESIGN_SYSTEM.md)**: Visual design tokens, Obsidian-dark HSL color variables, typography scales, transition motions, and WCAG AA accessibility rules.

### 3. Engineering & Systems Design
*   **[Technical Architecture](file:///c:/Users/hp/fabi-learning/programming-mastery/docs/3_architecture/ARCHITECTURE.md)**: Clean Architecture boundary specifications, curriculum content synchronization pipelines, and security sandboxing models.
*   **[Architecture Decisions (ADR Registry)](file:///c:/Users/hp/fabi-learning/programming-mastery/docs/3_architecture/DECISIONS.md)**: Registry containing all architectural decision records, tracking status and evaluations:
    *   **[ADR 0001: Monorepo Boundaries](file:///c:/Users/hp/fabi-learning/programming-mastery/docs/3_architecture/decisions/0001-repository-structure.md)**: Comparison of monorepos vs polyrepos and our workspaces justification.
    *   **[ADR 0002: Sandbox Execution Runtimes](file:///c:/Users/hp/fabi-learning/programming-mastery/docs/3_architecture/decisions/0002-runtime-sandbox-model.md)**: Client-side browser vs server-side containerized code evaluation trade-offs.

### 4. Development & Releases
*   **[Contributor's Guide](file:///c:/Users/hp/fabi-learning/programming-mastery/docs/CONTRIBUTING.md)**: Onboarding instructions, git branch structure, pull request templates, and conventional commit rules.
*   **[Project Roadmap](file:///c:/Users/hp/fabi-learning/programming-mastery/docs/ROADMAP.md)**: Four-phase timeline outlining milestones from architectural setup to full-stack scaling.
*   **[Changelog](file:///c:/Users/hp/fabi-learning/programming-mastery/docs/CHANGELOG.md)**: Tracking releases following SemVer and Keep-a-Changelog rules.

---

## 📂 Proposed Repository Layout

We employ a workspace layout to decouple client code, API servers, and curriculum datasets. The structure of the monorepo is organized as follows:

```
programming-mastery/
├── apps/
│   ├── client/                  # Client learning app & dashboard workspace
│   └── api/                     # Backend data & orchestration server workspace
├── packages/
│   ├── shared/                  # Common TypeScript definitions & validation schemas
│   └── content/                 # Curriculum database package (Markdown & JSON challenges)
├── docs/                        # Complete Documentation Archive (outlined above)
├── package.json                 # Monorepo configuration
└── README.md                    # This document
```

---

## 🛠️ Getting Started

To explore or run the platform workspaces locally, please review the steps in **[Contributor's Guide](file:///c:/Users/hp/fabi-learning/programming-mastery/docs/CONTRIBUTING.md)**.
>>>>>>> Stashed changes
