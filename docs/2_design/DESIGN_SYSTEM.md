# Design System: Visual & UX Foundations

This document establishes the design tokens, visual rules, interaction transitions, and accessibility standards for the **Programming Mastery** platform. Developers and UI designers must reference this document to build interface layouts, ensuring the platform maintains a premium, cohesive, and handcrafted user experience.

---

## 1. Design Tokens

Design tokens are the atomic values of our user interface, decoupled from specific implementation libraries (e.g., Tailwind, CSS variables, CSS-in-JS).

### A. Color Palette
To minimize cognitive fatigue during long learning sessions, the design system utilizes an Obsidian-Dark theme. Each color serves a functional purpose.

```
┌────────────────────────────────────────────────────────────────────────┐
│                              CORE SYSTEM                               │
├───────────────────┬───────────────────┬────────────────────────────────┤
│ Slate Background  │ Obsidian Slate    │ Neon Violet (Primary Accent)   │
│ HSL(220, 15%, 8%) │ HSL(220, 12%, 13%)│ HSL(262, 80%, 60%)             │
└───────────────────┴───────────────────┴────────────────────────────────┘
```

| Semantic Name | HSL Value | Hex Value | Intended Usage |
| :--- | :--- | :--- | :--- |
| `background-deep` | `HSL(220, 15%, 8%)` | `#0b0d11` | Primary site background (Obsidian dark). |
| `background-surface` | `HSL(220, 12%, 13%)` | `#1c1e24` | Cards, panel workspace divisions, headers. |
| `border-subtle` | `HSL(220, 9%, 20%)` | `#2d3139` | Standard structural borders. |
| `text-primary` | `HSL(210, 20%, 98%)` | `#fafafa` | Headings, core prose, primary text. |
| `text-secondary` | `HSL(215, 12%, 72%)` | `#b5bdc9` | Supporting information, labels, metadata. |
| `accent-primary` | `HSL(262, 80%, 60%)` | `#8233e6` | Focus items, active nodes, success links. |
| `accent-glow` | `HSL(262, 80%, 60%, 0.15)`| — | Soft shadows, hover glow, active highlight. |
| `state-success` | `HSL(142, 70%, 45%)` | `#22c55e` | Passed tests, completed lessons, streak logs. |
| `state-error` | `HSL(350, 80%, 55%)` | `#ef4444` | Failed tests, warnings, pitfall indicators. |
| `state-warning` | `HSL(37, 90%, 50%)` | `#f59e0b` | Attention notices, retry clues. |

---

## 2. Typography

We prioritize highly legible, structural sans-serif typefaces designed for reading technical content.

*   **Primary Typeface**: `Outfit` (or `Inter`) - Used for headers, menus, user dashboard widgets, and platform control copy.
*   **Monospace Typeface**: `Fira Code` (or `JetBrains Mono`) - Used for code workspaces, verification reports, inputs, and inline code formatting.

| Scale Token | Font Size (rem / px) | Line Height | Font Weight | Usage |
| :--- | :--- | :--- | :--- | :--- |
| `fs-h1` | `2.25rem / 36px` | `1.2` | Bold (`700`) | Main Page Header |
| `fs-h2` | `1.75rem / 28px` | `1.3` | Semi-Bold (`600`) | Section Headers, Lesson Titles |
| `fs-h3` | `1.25rem / 20px` | `1.4` | Medium (`500`) | Card Titles, Drawer Headers |
| `fs-body` | `1.0rem / 16px` | `1.6` | Regular (`400`) | Curriculum Prose, Documentation |
| `fs-caption`| `0.875rem / 14px` | `1.4` | Regular (`400`) | Subtexts, Metadata tags |
| `fs-code` | `0.938rem / 15px` | `1.5` | Regular (`400`) | Code playground, test runner outputs |

---

## 3. Motion & Micro-interactions

Motion must feel responsive, clean, and physical—never slow or distracting.

### Animation Curve Standards
*   **Interactive Transitions**: For button hovers, card selections, and panel resizing.
    *   *Duration*: `150ms`
    *   *Timing Function*: `cubic-bezier(0.4, 0, 0.2, 1)` (ease-in-out standard)
*   **Expressive Page Entries / Card Flips**: For node unlocks, level-ups, and revision flips.
    *   *Duration*: `300ms`
    *   *Timing Function*: `cubic-bezier(0.34, 1.56, 0.64, 1)` (expressive spring/bounceback)

### Micro-interaction Specifications
1.  **Button Hover**: A subtle scaling (`scale(1.02)`), border color shift toward `accent-primary`, and an optional thin outer glow using `accent-glow`.
2.  **Input Focus**: Expand border color to `accent-primary` and apply a `3px` glow ring.
3.  **Active Card Selection**: Apply a 1-pixel border highlight combined with a vertical translation shift (`translateY(-2px)`) to mimic mechanical height.
4.  **Test Run Pulse**: During code verification, the runner status button pulses between opacity `0.4` and `1.0` in a smooth looping `800ms` transition.

---

## 4. Accessibility (A11y) & UX Tenets

The platform must meet WCAG 2.1 Level AA compliance guidelines:

*   **Color Contrast**: Every text/background pairing must meet or exceed a contrast ratio of `4.5:1` (or `3:1` for text larger than 18pt).
*   **Keyboard Operation**:
    *   All interactive controls (buttons, code editor, tree nodes, inputs) must be focusable using the `Tab` key.
    *   Visible focus rings (`border-subtle` to `accent-primary` with outline) must be clearly apparent on focus states.
*   **Redundant Coding**: Color must never be the only indicator of success or failure.
    *   *Incorrect*: A green dot to represent "Passed" and a red dot for "Failed".
    *   *Correct*: A green checkmark icon with text "Passed" and a red exclamation icon with text "Failed".
*   **Layout Scale**: Text styling must scale cleanly using dynamic viewport units or relative sizing (`rem`, `em`), ensuring readable scaling when zoomed up to 200% via the browser.
