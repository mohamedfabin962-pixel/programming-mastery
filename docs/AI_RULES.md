# AI Rules

## Goal

Generate production-ready, scalable, maintainable code for the Programming Mastery platform.

---

## Tech Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS v4
- shadcn/ui
- Turborepo
- pnpm

---

## General Principles

- Always use TypeScript.
- Prefer Server Components.
- Use Client Components only when required.
- Follow the existing project architecture.
- Write reusable code.
- Keep components focused on a single responsibility.
- Prefer composition over large components.
- Avoid unnecessary abstractions.
- Use shadcn/ui before creating custom UI.
- Follow accessibility best practices.
- Optimize for readability over cleverness.

---

## Before Writing Code

Always:

1. Understand the feature completely.
2. Reuse existing components.
3. Check whether a similar implementation already exists.
4. Follow the project folder structure.
5. Explain architectural decisions when introducing new patterns.

---

## Code Quality

- No duplicated logic.
- No unnecessary dependencies.
- No unused code.
- Avoid `any`.
- Use descriptive naming.
- Prefer async/await over Promise chains.
- Handle loading, error, and empty states.
- Use strict TypeScript.

---

## Architecture Rules

- UI should not contain business logic.
- Keep API logic separate from components.
- Prefer feature-based organization.
- Make components reusable.
- Keep files small and focused.

---

## Never

- Create random folders.
- Introduce libraries without justification.
- Ignore TypeScript errors.
- Hardcode configuration values.
- Mix unrelated responsibilities.
