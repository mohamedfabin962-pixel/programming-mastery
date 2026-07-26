# Content Guidelines & LXD Specifications

This document defines the standards, templates, structural schemas, and pedagogical guidelines for content creation on **Programming Mastery**. It is designed to ensure that any author can construct lessons, coding challenges, and active recall assessments that match the platform's high premium quality standard.

---

## 1. Tone of Voice & Writing Style

Programming Mastery is authoritative, empathetic, clear, and highly visual. Content authors must write according to the following directives:

*   **Empathetic but Professional**: Avoid talking down to the reader ("This is super easy!"). Acknowledge complexity, validate struggle, and celebrate breakthroughs.
*   **Active Voice**: Always write in the active voice.
    *   *Avoid*: "The function is called when the button is clicked by the user."
    *   *Prefer*: "When a user clicks the button, the browser triggers the function."
*   **Analogy-First Explanations**: Before showing syntactical constructs, explain the underlying logic using a concrete real-world comparison.
    *   *Example*: Do not explain variables as "allocated blocks in RAM." Explain them as labeled storage boxes where contents can change but the label stays the same.
*   **Clarity Over Cleverness**: Avoid convoluted, "clever" code snippets. Code examples must be clean, readable, self-explanatory, and production-oriented.

---

## 2. The Standard Lesson Template

Every lesson file must follow this exact Markdown structure:

```markdown
# Lesson: [Topic Name]

## The Problem
[1-2 paragraphs detailing a practical problem that the student cannot solve yet. Keep it concrete.]

## The Analogy
[Explain the concept using a physical real-world scenario. Use a visual diagram placeholder.]

## Core Concept
[Deep explanation of the concept, breaking down its mechanics. Explain *why* it behaves this way.]

## Hands-On Code
[Minimalist, production-grade code implementation with comments explaining major lines.]

```javascript
// Example implementation snippet
```

## Common Pitfalls
*   **[Pitfall Name]**: Explain the bug, show the incorrect code, explain why it fails, and show the fixed code.

## Active Recall Corner
1. [Active Recall Prompt 1 - Concept validation]
2. [Active Recall Prompt 2 - Logical deduction]

## Interview Preparation
*   **Question**: "Explain how [Concept] works under the hood."
*   **Key Talking Points**: List 3-4 bullet points the student should mention to stand out in an interview.
```

---

## 3. Abstract Content Schemas

Curriculum units are represented by a folder containing lesson text (`lesson.md`), metadata configuration (`metadata.json`), and mock assets/tests. The schema format is designed to be highly portable.

### A. Lesson Metadata Schema (`metadata.json`)
Every lesson folder must contain a `metadata.json` defining properties, prerequisites, active recall tests, and challenge setups:

```json
{
  "$schema": "http://programming-mastery.com/schemas/lesson-metadata.json",
  "id": "js-arrays-map",
  "title": "Transforming Data with Array.prototype.map",
  "difficulty": "Intermediate",
  "estimatedTimeMinutes": 15,
  "prerequisites": ["js-arrays-basic"],
  "rewards": {
    "xp": 100,
    "achievements": ["array-wizard-1"]
  },
  "interactiveElements": {
    "quizzes": [
      {
        "id": "quiz-map-return-value",
        "question": "What does the map method return if the callback function does not return anything?",
        "options": [
          "An array containing undefined for each element",
          "An empty array",
          "The original, unmodified array",
          "A ReferenceError is thrown"
        ],
        "answerIndex": 0,
        "explanation": "Map creates a new array by executing the callback on each item. If the callback lacks a return statement, JavaScript implicitly returns undefined, resulting in an array of undefined values."
      }
    ],
    "challenge": {
      "id": "challenge-map-prices",
      "type": "code-refactor",
      "instructions": "Refactor the standard `for` loop to use `.map()` to return a new array of formatted price strings.",
      "startingFiles": {
        "index.js": "function formatPrices(prices) {\n  // Refactor this\n  const formatted = [];\n  for (let i = 0; i < prices.length; i++) {\n    formatted.push('$' + prices[i].toFixed(2));\n  }\n  return formatted;\n}"
      },
      "validationSuite": {
        "tests": [
          {
            "name": "Should return formatted currency strings",
            "assert": "assert.deepStrictEqual(formatPrices([10, 5.5, 9.99]), ['$10.00', '$5.50', '$9.99'])"
          },
          {
            "name": "Should not modify the original array",
            "assert": "const input = [5]; formatPrices(input); assert.deepStrictEqual(input, [5])"
          },
          {
            "name": "Should not use for-loops inside the function body",
            "assert": "assert.strictEqual(formatPrices.toString().includes('for'), false, 'You must use .map() instead of a for loop')"
          }
        ]
      }
    }
  }
}
```

---

## 4. Visual Layout & Diagram Guidelines

Since Programming Mastery is a highly visual platform, content designers must adhere to standard diagram layouts:

### Layout Structures
*   **The Grid Layout**: Split pages into two halves on screens larger than 1024px. The left column contains the text narrative, and the right column houses the interactive visualizers, code playgrounds, or sandboxes.
*   **Analogical Diagrams**: When mapping code execution to physical analogies, use consistent shapes:
    *   *Inputs / Data Sources*: Cylinders or incoming arrow streams.
    *   *Processors / Methods*: Gear icons, factory processing lines, or boxes with in-flow / out-flow arrows.
    *   *Storage / Scope*: Labeled containers with distinct boundaries.

### Color-Coding of Status callouts
Visual indicators in lessons and challenges must use the platform's standard design-token semantics:
*   `Info / Note`: Soft slate background, thin slate border, gray/blue icon.
*   `Pitfall / Mistake`: Soft crimson background, thin crimson border, warning/error icon.
*   `Analogy / Metaphor`: Soft purple/violet background, thin violet border, lightbulb icon.
