# TypeScript to JSDoc <!-- omit in toc -->

Keep the type checking, drop the second language. Write plain Vanilla JS with JSDoc types, checked strictly by `tsc` but never, ever compiled.

## Table of Contents <!-- omit in toc -->

- [1. Context](#1-context)
- [2. Usual approach](#2-usual-approach)
- [3. Dev0 approach](#3-dev0-approach)
- [4. Tests](#4-tests)
- [5. Outcome](#5-outcome)
- [6. Trade-offs](#6-trade-offs)

## 1. Context

Static types catch real bugs and give the editor excellent autocomplete hints. Nearly every JavaScript project in the industry now blindly reaches for TypeScript to get them. I want those same checks, but I absolutely demand that what I write is exactly what runs natively.

## 2. Usual approach

Write `.ts` files, add a heavy compiler or bundler step to transpile them down into JavaScript, and wrestle with source maps just so your stack traces can point back to the original source. The build step is now a mandatory tax on every single edit, test run, and deployment.

## 3. Dev0 approach

Write standard Vanilla JS (ES6+ ESM) and express the types strictly in JSDoc comments. Turn on `checkJs` and run `tsc --noEmit` purely as a static checker, in the editor and in CI. It reports the exact same type errors, but it emits absolutely nothing.

```javascript
/**
 * Fetches a user record by id.
 *
 * @param {string} userId - The user's unique identifier.
 * @returns {Promise<{ id: string, email: string }>} The user record.
 */
export async function getUser(userId) {
  const response = await fetch(`/users/${userId}`);
  return await response.json();
}
```

The tell is that Node now supports running TypeScript files simply by stripping the types out—not compiling them, just deleting them. If types can be completely removed without altering what the program does at runtime, they never did anything for the program in the first place. Everything they offer, they offer exclusively to the developer, and JSDoc delivers that exact same benefit without the build tax.

## 4. Tests

| Test            | Vanilla JS + JSDoc | TypeScript | Rationale                                                                                                                      |
| :-------------- | :----------------: | :--------: | :----------------------------------------------------------------------------------------------------------------------------- |
| **Less**        |         ✅         |     ❌     | No compile step, no source maps, no build loop. `tsc` acts only as a linter that ships nothing.                                |
| **Separate**    |         ✅         |     ❌     | Types sit cleanly in comments beside the code they describe, never intertwined with runtime logic syntax.                      |
| **Legibility**  |         ✅         |     ❌     | The plain JavaScript file you read is the exact file that executes.                                                            |
| **Native**      |         ✅         |     ❌     | Browsers and Node run the Vanilla JS source directly.                                                                          |
| **Beneficiary** |         ✅         |     ❌     | The user receives identical JavaScript either way; the entire TypeScript compile step serves purely for developer convenience. |
| **Control**     |         ✅         |     ❌     | The exact same source runs natively everywhere standard JavaScript runs.                                                       |

## 5. Outcome

Type errors are caught instantly in VS Code and in CI, exactly as before. There is zero translation between source and runtime, absolutely nothing to configure or go stale, and native stack traces point directly to real, unmapped lines of code.

## 6. Trade-offs

- Reusable type shapes need a dedicated home: `@typedef` declarations in a `types.js` module, imported cleanly via `import("./types.js").Name`.

[← Back to Examples](../README.md)
