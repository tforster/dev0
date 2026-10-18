# Vue Single-File Components <!-- omit in toc -->

Why an addition must pass all six tests: a format that passes "separate" beautifully still fails on two others, and strong passes do not buy off a failure.

## Table of Contents <!-- omit in toc -->

- [1. Context](#1-context)
- [2. Usual approach](#2-usual-approach)
- [3. Dev0 approach](#3-dev0-approach)
- [4. Tests](#4-tests)
- [5. Outcome](#5-outcome)
- [6. Trade-offs](#6-trade-offs)

## 1. Context

A Vue single-file component puts a component's template, script and style in one `.vue` file, each in its own block, never interleaved:

```vue
<template>
  <button class="counter" @click="count++">{{ count }}</button>
</template>

<script setup>
import { ref } from "vue";
const count = ref(0);
</script>

<style scoped>
.counter {
  font-weight: bold;
}
</style>
```

## 2. Usual approach

Adopt it because it is tidy. It is the shape the original Web Components proposals intended -- a component in one HTML file, pulled into the page with a `<link>` -- before browsers abandoned HTML Imports (Chrome was the only browser to ship them, and removed them in 2020).

## 3. Dev0 approach

Run all six tests, and refuse to average them. One file holding several languages in separate blocks is fine -- when the platform parses it natively. No browser parses a `.vue` file, so it needs a compiler between what you write and what runs.

Declarative Shadow DOM is the living native echo of the idea: a component's markup and scoped styles in plain HTML that the browser itself understands.

## 4. Tests

- **Less** -- fail. A compiler, its plugins and a framework runtime ship with every component.
- **Separate** -- pass. Template, script and style each in their own block, never interleaved.
- **Legibility** -- pass. Each block reads cleanly in its own language.
- **Native** -- fail. No browser can parse it.
- **Beneficiary** -- fail. The compiler serves only the developer; the user receives compiled output either way.
- **Control** -- not decisive.

## 5. Outcome

Rejected. Strong passes on separate and legibility do not offset failures on native and beneficiary. Weighing passes against failures would make every failure "but it passes the other five", and the exception would never be written down.

## 6. Trade-offs

- Choosing native components means writing more of the plumbing a framework provides, such as reactivity and template binding.
- If a project's context -- an existing Vue codebase, a team's skills -- outweighs the tests, that is the architect's call, made as a written exception.

[← Back to Examples](../README.md)
