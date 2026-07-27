# Architecture Decision Records (ADR)

This document serves as the central index of important architectural and engineering decisions made throughout the development of **Programming Mastery**.

Each decision is documented separately inside the `docs/3_architecture/decisions/` directory.

The purpose of this registry is to explain **why** a decision was made, not only **what** was implemented.

---

# ADR Status

Each Architecture Decision Record should have one of the following statuses.

| Status     | Meaning                    |
| ---------- | -------------------------- |
| Proposed   | Under discussion           |
| Accepted   | Approved and adopted       |
| Superseded | Replaced by another ADR    |
| Rejected   | Considered but not adopted |

---

# ADR Template

Every ADR should follow this structure.

```md
# ADR-XXXX

## Status

Accepted

---

## Context

Why does this problem exist?

What constraints exist?

---

## Alternatives Considered

Option A

Option B

Option C

---

## Decision

What was chosen?

Why?

---

## Consequences

Benefits

Trade-offs

Future considerations
```

---

# Decision Registry

| ADR      | Title                          | Status   | Area                      |
| -------- | ------------------------------ | -------- | ------------------------- |
| ADR-0001 | Repository Structure           | Accepted | Architecture              |
| ADR-0002 | Runtime Sandbox Model          | Accepted | Architecture              |
| ADR-0003 | Learning Path Architecture     | Accepted | Product                   |
| ADR-0004 | Mastery-Based Progress         | Accepted | Product                   |
| ADR-0005 | Dedicated Backend Architecture | Accepted | System Architecture       |
| ADR-0006 | Authentication Strategy        | Accepted | Security / Authentication |

---

# Current Accepted Decisions

## ADR-0001

Repository follows a Turborepo monorepo architecture.

---

## ADR-0002

Challenge execution will eventually use isolated sandbox environments.

This architecture is outside the MVP.

---

## ADR-0003

Learning Paths organize Technologies.

A Technology may belong to multiple Learning Paths.

Content should never be duplicated.

---

## ADR-0004

Learner progress is measured by mastery rather than lesson completion.

Completion percentages alone do not accurately represent understanding.

---

## ADR-0005

Programming Mastery uses a dedicated backend.

Frontend

↓

Next.js

↓

Express API

↓

Prisma ORM

↓

PostgreSQL

This separation allows multiple clients (web, mobile, desktop) to share the same backend.

---

## ADR-0006

Programming Mastery uses Better Auth for authentication while maintaining a separate application User model for business data.

Authentication remains independent from the business domain, making the system easier to evolve and migrate in the future.

---

# Creating a New ADR

When introducing an important architectural or product decision:

1. Create a new markdown file inside:

```
docs/3_architecture/decisions/
```

2. Use the next available ADR number.

Example:

```
ADR-0006-authentication-strategy.md
```

3. Follow the ADR template.

4. Add the new ADR to the registry above.

5. Reference it in the Pull Request if the decision changes existing architecture.

---

# What Deserves an ADR?

Create an ADR when a decision significantly affects the project.

Examples include:

- Architecture changes
- Authentication strategy
- Database technology
- State management
- API design
- Deployment architecture
- Product architecture
- Learning model
- Progress model
- Security model

Avoid creating ADRs for minor implementation details.
