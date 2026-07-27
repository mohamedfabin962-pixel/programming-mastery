# Technical Architecture Blueprint

This document defines the high-level technical architecture of **Programming Mastery**.

It describes how the system is organized, how data flows through the application, and the architectural principles that guide implementation.

This document intentionally focuses on the MVP architecture while remaining extensible for future versions.

---

# 1. Architecture Overview

Programming Mastery follows a layered architecture based on the principles of Clean Architecture.

The goal is to keep business logic independent from frameworks, databases, and user interfaces.

```
                    ┌──────────────────────────────┐
                    │         Presentation         │
                    │ Next.js (Frontend/UI)        │
                    └──────────────┬───────────────┘
                                   │
                                   ▼
                    ┌──────────────────────────────┐
                    │       Express API Layer      │
                    │ Routes • Controllers         │
                    └──────────────┬───────────────┘
                                   │
                                   ▼
                    ┌──────────────────────────────┐
                    │      Application Layer       │
                    │ Services • Use Cases         │
                    └──────────────┬───────────────┘
                                   │
                                   ▼
                    ┌──────────────────────────────┐
                    │        Domain Layer          │
                    │ Business Rules & Entities    │
                    └──────────────┬───────────────┘
                                   │
                                   ▼
                    ┌──────────────────────────────┐
                    │     Infrastructure Layer     │
                    │ Prisma • PostgreSQL          │
                    └──────────────────────────────┘
```

---

# 2. Technology Stack

## Frontend

- Next.js 16 (App Router)
- React
- TypeScript
- Tailwind CSS v4
- shadcn/ui
- React Hook Form
- Zod

---

## Backend

- Express.js
- TypeScript
- Better Auth
- Prisma ORM

---

## Database

- PostgreSQL

---

## Development

- Turborepo
- pnpm
- ESLint
- Prettier
- GitHub

---

# 3. Architectural Layers

## Presentation Layer

Responsible for:

- User Interface
- Routing
- Layouts
- Forms
- Client-side interactions
- Server Components
- API communication

Business logic should never exist here.

---

## API Layer

Implemented using Express.

Responsible for:

- Route definitions
- Authentication middleware
- Authorization
- Request validation
- Response formatting

Controllers should remain thin and delegate work to services.

---

## Application Layer

Contains application-specific business logic.

Examples:

- User registration
- Lesson progression
- Progress calculation
- Revision scheduling
- Challenge evaluation

This layer coordinates business operations.

---

## Domain Layer

The heart of the application.

Contains:

- Domain entities
- Business rules
- Domain models
- Value objects

The domain layer should have no dependency on Express, Prisma, PostgreSQL, or Next.js.

---

## Infrastructure Layer

Responsible for:

- Database access
- Prisma Client
- External services
- File storage
- Email providers
- Logging

Infrastructure implements the interfaces required by the application layer.

---

# 4. Request Lifecycle

A typical request follows this flow:

```
User

↓

Next.js

↓

Express Route

↓

Controller

↓

Application Service

↓

Repository

↓

Prisma

↓

PostgreSQL

↓

Response
```

Each layer has a single responsibility.

---

# 5. Folder Responsibilities

Each folder should have one clear responsibility.

## components/

Reusable UI components.

Examples:

- Buttons
- Cards
- Dialogs
- Navigation
- Layouts

---

## features/

Feature-specific UI and logic.

Examples:

- Authentication
- Dashboard
- Learning Paths
- Lessons

---

## lib/

Shared utilities.

Examples:

- Helpers
- Constants
- Utility functions

---

## config/

Application configuration.

Examples:

- Environment variables
- Navigation
- Theme configuration

---

## services/

Business logic.

No UI code should exist here.

---

## hooks/

Reusable React hooks.

---

## types/

Shared TypeScript types.

---

# 6. Data Flow

```
Frontend

↓

Express API

↓

Application Service

↓

Repository

↓

Prisma

↓

PostgreSQL
```

Responses follow the same path back to the client.

---

# 7. Authentication Architecture

Authentication is handled by Better Auth.

Responsibilities include:

- User registration
- Login
- Logout
- Session management
- Protected routes
- Role-based authorization

Only authenticated users may access protected resources.

---

# 8. Security Principles

## Authentication

- Session-based authentication
- HTTP-Only cookies
- Secure cookies in production
- SameSite protection

---

## Authorization

Role-based access control (RBAC).

MVP Roles:

- Student
- Admin

---

## Validation

All external input must be validated before processing.

Validation occurs:

- Client-side
- API layer
- Database layer

Never trust client input.

---

## Rate Limiting

Authentication and sensitive endpoints should be rate limited to reduce abuse.

---

# 9. Design Principles

The architecture follows these principles:

- Separation of concerns
- Single Responsibility Principle
- Reusable components
- Strong typing
- Feature-first organization
- Clean Architecture
- Scalable module boundaries
- Explicit dependencies
- Testable business logic

---

# 10. Future Architecture

The following systems are intentionally outside the MVP.

They will be designed when the platform reaches later development phases.

Future systems include:

- Remote code execution sandbox
- Docker-based challenge runners
- Distributed execution workers
- AI-assisted code evaluation
- Curriculum synchronization pipeline
- Advanced caching infrastructure
- Event-driven background jobs
- Analytics pipeline
- Recommendation engine

These systems are intentionally deferred until the core learning platform is complete.

---

# 11. Architectural Goals

Programming Mastery should be:

- Maintainable
- Scalable
- Secure
- Modular
- Testable
- Easy to extend
- Easy to understand

Every architectural decision should support long-term maintainability rather than short-term convenience.
