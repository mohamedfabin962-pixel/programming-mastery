# Domain Model

## Purpose

This document defines the core domain of Programming Mastery.

It establishes the primary entities, their responsibilities, and their relationships.

This document is independent of implementation details such as databases, APIs, or frontend frameworks.

---

# Domain Hierarchy

Programming Mastery

├── Learning Paths

│ └── Technologies

│ └── Modules

│ └── Lessons

│ ├── Learn

│ ├── Practice

│ ├── Debug Challenges

│ ├── Mini Projects

│ ├── Interview Questions

│ ├── Notes

│ ├── Revision

│ └── Mastery Check

---

# Core Entities

## Learning Path

A Learning Path represents a structured roadmap toward a specific developer role.

Examples:

- Frontend Developer
- Backend Developer
- Full Stack Developer
- React Developer
- Node.js Developer

A Learning Path references one or more Technologies.

---

## Technology

A Technology represents a programming language, framework, database, or tool.

Examples:

- JavaScript
- TypeScript
- React
- Node.js
- Express
- MongoDB
- PostgreSQL
- Git

Each Technology contains multiple Modules.

A Technology may belong to multiple Learning Paths.

---

## Module

A Module groups related concepts inside a Technology.

Example (JavaScript):

- Variables
- Functions
- Arrays
- Objects
- DOM
- Async Programming

Each Module contains multiple Lessons.

---

## Lesson

A Lesson teaches a single concept.

Examples:

- let vs const
- Closures
- Promise.all()
- Flexbox
- MongoDB Aggregation

A Lesson is the smallest learning unit.

Each Lesson contains multiple learning activities.

---

# Learning Activities

Each Lesson may contain one or more activities.

## Learn

Concept explanation.

---

## Guided Practice

Exercises completed with guidance.

---

## Independent Practice

Exercises solved without guidance.

---

## Debug Challenge

Broken code that learners must understand and fix.

---

## Mini Project

A focused implementation task that applies the concept.

---

## Interview Questions

Questions commonly asked in software engineering interviews.

---

## Notes

Learner-created notes attached to the lesson.

---

## Revision

Revision material and scheduled review.

---

## Mastery Check

Final evaluation to determine whether the learner has mastered the lesson.

---

# Progress Model

Progress is tracked at multiple levels.

Lesson

↓

Module

↓

Technology

↓

Learning Path

Progress should represent demonstrated mastery rather than simple completion.

---

# Mastery States

Each Lesson exists in one state.

- Not Started
- Learning
- Practicing
- Debugging
- Applying
- Revising
- Mastered

These states represent learner progression.

---

# Relationships

Learning Path

→ contains Technologies

Technology

→ contains Modules

Module

→ contains Lessons

Lesson

→ contains Learning Activities

Lesson

→ contains User Notes

Lesson

→ contains Revision Material

Lesson

→ has Progress

Technology

→ belongs to multiple Learning Paths

User

→ progresses through Lessons

---

# Design Principles

- Concepts should be reusable.
- Technologies should not duplicate content.
- Learning Paths should organize existing Technologies.
- Lessons should remain small and focused.
- Activities should reinforce practical understanding.
- Progress should reflect mastery.
- The domain should remain scalable as new Technologies and Learning Paths are added.

---

# Future Extensions

These are intentionally outside the MVP.

- AI Mentor
- Community
- Pair Programming
- Leaderboards
- Certificates
- Organizations
- Team Learning
- Course Marketplace
- Advanced Analytics
- Personalized Learning Recommendations
