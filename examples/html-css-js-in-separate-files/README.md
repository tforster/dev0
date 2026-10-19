# HTML, CSS and JavaScript in Separate Files <!-- omit in toc -->

Three highly engineered engines, each perfectly tuned to its own domain. Use each strictly for what it does best, and keep them apart.

## Table of Contents <!-- omit in toc -->

- [1. Context](#1-context)
- [2. Usual approach](#2-usual-approach)
- [3. Dev0 approach](#3-dev0-approach)
- [4. Tests](#4-tests)
- [5. Outcome](#5-outcome)
- [6. Trade-offs](#6-trade-offs)

## 1. Context

In the late 1990s, we had ASP, JSP, and PHP—what I call the \*p problem. Every one of them invited you to carelessly interleave HTML, CSS, and JavaScript with server-side VBScript, Java, PHP, and SQL, line by line, until no one could say which language they were even reading. The industry spent fifteen long years climbing out of that hole.

## 2. Usual approach

The \*p problem is back, just wearing better tooling. JSX weaves markup directly through JavaScript. Utility-class CSS crams styling into unreadable strings of twenty classes on every single element. Server components and server actions shove server and client code into the exact same file, sometimes the same function, weakly separated by a `"use client"` or `"use server"` string. The industry calls this "colocation"; I call it a tangled mess.

## 3. Dev0 approach

HTML in `.html` files, CSS in `.css` files, JavaScript in `.js` files. The absolute rule is _never interleaved_. Even towards the end of my classic ASP days, I simulated code-behind: one server block at the top doing all the logic, followed by strictly legible markup with simple tokens replaced. One file, two languages, each locked in its own isolated block.

I maintain what I call a "Mind's DOM." Show me an HTML file, and I can see the rendered page in my head instantly:

```html
<article class="profile">
  <h2>Ada Lovelace</h2>
  <p>Analyst, Analytical Engine</p>
</article>
```

Show me reams of JavaScript with JSX woven through it, and I cannot; the structure only exists once the code actually runs.

## 4. Tests

| Test            | Dev0 (Separation) | Usual Approach (Colocation) | Rationale                                                                                                             |
| :-------------- | :---------------: | :-------------------------: | :-------------------------------------------------------------------------------------------------------------------- |
| **Less**        |        ✅         |             ❌              | No compiler or bundler is needed to turn the source into something a browser can actually parse.                      |
| **Separate**    |        ✅         |             ❌              | Each language lives in its own file, doing exactly one job, with the DOM acting as the strict interface between them. |
| **Legibility**  |        ✅         |             ❌              | Markup reads as structure, CSS reads as rules. You can instantly tell which machine every line runs on.               |
| **Native**      |        ✅         |             ❌              | Each native engine is used directly: the HTML parser, the CSS engine, the standard JavaScript runtime.                |
| **Beneficiary** |        ✅         |             ❌              | The browser streams and renders plain HTML long before any script runs, meaning the user sees content immediately.    |
| **Control**     |        ➖         |             ➖              | Not decisive here.                                                                                                    |

## 5. Outcome

Pages render structurally without JavaScript and are then progressively enhanced by it. Styling changes touch only CSS. Anyone who fundamentally knows the native web platform can read any file in the system without having to learn a bloated framework's proprietary dialect first.

## 6. Trade-offs

- A single component's markup, style, and behaviour span three files, meaning related changes cross file boundaries. I mitigate this by using one folder per component, so the three files sit side-by-side rather than sprawling across separate HTML, CSS, and JS directory trees.

[← Back to Examples](../README.md)
