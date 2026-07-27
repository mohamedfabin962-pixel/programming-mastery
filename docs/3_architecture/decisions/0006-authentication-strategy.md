# ADR-0006

# Authentication Strategy

## Status

Accepted

---

## Context

Programming Mastery requires authentication for user-specific functionality such as learning progress, notes, revision schedules, settings, and future personalization.

Authentication should remain independent from the application's business domain.

---

## Alternatives Considered

### Option A

Use Better Auth as the entire User model.

Pros

- Less code
- Simple

Cons

- Domain becomes tightly coupled to Better Auth.
- Future migrations become harder.
- Business data mixes with authentication data.

---

### Option B (Selected)

Use Better Auth for authentication.

Maintain a separate application User model for business data.

Pros

- Clean separation of concerns.
- Easier to evolve.
- Easier to migrate authentication providers.
- Better domain modeling.

Cons

- Slightly more implementation work.

---

### Option C

Custom authentication.

Rejected because authentication is not the core business problem.

---

## Decision

Programming Mastery will use Better Auth exclusively for:

- Authentication
- Sessions
- Password management
- Account security

Application-specific data such as learning progress, notes, preferences, achievements, and profile information will belong to the application's domain model.

Authentication and business logic remain independent.

---

## Consequences

Benefits

- Better architecture
- Cleaner domain model
- Easier maintenance
- Easier future integrations

Trade-offs

- Additional mapping between authentication identity and application user.

---

## Date

2026-07-27
