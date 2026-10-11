# HTML, CSS and JavaScript in Separate Files <!-- omit in toc -->

Three highly engineered engines, each tuned to its own domain. Use each for what it does best, and keep them apart.

## Table of Contents <!-- omit in toc -->

- [1. Context](#1-context)
- [2. Usual approach](#2-usual-approach)
- [3. Dev0 approach](#3-dev0-approach)
- [4. Tests](#4-tests)
- [5. Outcome](#5-outcome)
- [6. Trade-offs](#6-trade-offs)

## 1. Context

In the late 1990s we had ASP, JSP and PHP -- what I call the \*p problem. Every one of them invited you to interleave HTML, CSS, JavaScript, VBScript, SQL and server code line by line, until no one could say which language they were reading. The industry spent fifteen years climbing out of it.

## 2. Usual approach

The \*p problem is back with better tooling. JSX weaves markup through JavaScript. Utility-class CSS moves styling into strings of twenty classes on every element. Server components and server actions put server and client code in the same file, sometimes the same function, separated by a `"use client"` or `"use server"` string. The industry calls it colocation.

## 3. Dev0 approach

HTML in `.html` files, CSS in `.css` files, JavaScript in `.js` files. The rule is "never interleaved", not "always separate files": towards the end of my classic ASP days I simulated code-behind, with one server block at the top of each file doing all the work, followed by legible markup with tokens replaced. One file, two languages, each in its own block.

I keep what I call a Mind's DOM. Show me an HTML file and I can see the rendered page in my head:

```html
<article class="profile">
  <h2>Ada Lovelace</h2>
  <p>Analyst, Analytical Engine</p>
</article>
```

Show me reams of JavaScript with JSX woven through it and I cannot; the structure only exists once the code runs.

## 4. Tests

- **Less** -- pass. No compiler is needed to turn the source into something a browser can parse.
- **Separate** -- pass. Each language in its own file, doing one job, with the DOM as the interface between them.
- **Legibility** -- pass. Markup reads as structure, CSS reads as rules, and you can tell which machine every line runs on.
- **Native** -- pass. Each engine is used directly: the HTML parser, the CSS engine, the JavaScript runtime.
- **Beneficiary** -- pass. The browser streams and renders HTML before any script runs, so the user sees content sooner.
- **Control** -- not decisive.

## 5. Outcome

Pages render without JavaScript and are enhanced by it. Styling changes touch only CSS. Anyone who knows the web platform can read any file without learning a framework's dialect first.

## 6. Trade-offs

- A component's markup, style and behaviour live in three places, so related changes span files.
- Without a framework's conventions, the team needs its own discipline about naming and file layout.

[← Back to Examples](../README.md)
