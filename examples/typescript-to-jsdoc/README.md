# TypeScript to JSDoc <!-- omit in toc -->

Keep the type checking, drop the second language: plain JavaScript with JSDoc types, checked by `tsc` and never compiled.

## Table of Contents <!-- omit in toc -->

- [1. Context](#1-context)
- [2. Usual approach](#2-usual-approach)
- [3. Dev0 approach](#3-dev0-approach)
- [4. Tests](#4-tests)
- [5. Outcome](#5-outcome)
- [6. Trade-offs](#6-trade-offs)

## 1. Context

Static types catch real bugs and give the editor good hints. Nearly every JavaScript project now reaches for TypeScript to get them. I want the same checks, but I also want what I write to be what runs.

## 2. Usual approach

Write `.ts` files, add a compiler or bundler step to turn them into JavaScript, and configure source maps so stack traces point back at the source. The build is now part of every edit, test run and deploy.

## 3. Dev0 approach

Write plain JavaScript and express types in JSDoc. Turn on `checkJs` and run `tsc --noEmit` as a checker, in the editor and in CI. It reports the same type errors; it emits nothing.

```js
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

The tell is that Node now runs TypeScript files by stripping the types out -- not compiling them, just deleting them. If the types can be removed without changing what the program does, they never did anything for the program at runtime. Everything they offer, they offer the developer, and JSDoc offers it too.

## 4. Tests

- **Less** -- pass. No compile step, no source maps, no build in the edit-run loop. `tsc` is a development tool that checks and ships nothing.
- **Separate** -- pass. Types sit in comments beside the code they describe, never interleaved with runtime logic.
- **Legibility** -- pass. The file you read is the file that runs.
- **Native** -- pass. Browsers and Node run the source directly.
- **Beneficiary** -- pass, where TypeScript fails. The user receives identical JavaScript either way, so the compile step served only the developer.
- **Control** -- pass. The same source runs everywhere JavaScript runs.

## 5. Outcome

Type errors are caught in the editor and in CI, exactly as before. There is nothing to configure between source and runtime, nothing to go stale, and stack traces point at real lines.

## 6. Trade-offs

- JSDoc is more verbose than inline TypeScript annotations, especially for generics and complex types.
- Some TypeScript-only features, such as enums and parameter properties, have no JSDoc equivalent. They are runtime constructs, which is exactly why they are not missed.
- Reusable shapes need a home: `@typedef` declarations in a `types.js` module, imported with `import("./types.js").Name`.

[← Back to Examples](../README.md)
