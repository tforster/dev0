# Babel <!-- omit in toc -->

Where I first noticed the pattern: if a compiler was just turning the newest JavaScript into version _n_, I wrote version _n_ natively and deleted the compiler.

## Table of Contents <!-- omit in toc -->

- [1. Context](#1-context)
- [2. Usual approach](#2-usual-approach)
- [3. Dev0 approach](#3-dev0-approach)
- [4. Tests](#4-tests)
- [5. Outcome](#5-outcome)
- [6. Trade-offs](#6-trade-offs)

## 1. Context

For years, browser support lagged behind the JavaScript specification. Developers wanted arrow functions, classes, ESM, and `async`/`await` long before browsers could actually run them.

## 2. Usual approach

Babel. The industry default was to write the newest syntax and let Babel compile it down to whatever the target browsers supported. This meant adding presets, plugins, configuration files, and a mandatory build step—all of which had to be continuously maintained and updated.

## 3. Dev0 approach

Look at what the user actually received: the exact same compiled JavaScript either way. If Babel was compiling down to version _n_, I simply wrote version _n_. No compiler, no configuration files, no build step to break, and no bloated dependencies added to the supply chain.

Today, this pragmatic judgement has a formal name. [Baseline](https://web.dev/baseline) marks which web features are safe to use across all major browsers. If you write your code to Baseline's "widely available" standard, you achieve the exact outcome Babel used to provide, completely eliminating the compile step.

## 4. Tests

| Test            | Native (Baseline) | Babel | Rationale                                                                                                                       |
| :-------------- | :---------------: | :---: | :------------------------------------------------------------------------------------------------------------------------------ |
| **Less**        |        ✅         |  ❌   | Babel introduced a compiler, plugins, and a massive transitive dependency tree, all to produce code I could just write by hand. |
| **Separate**    |        ➖         |  ➖   | Not decisive here.                                                                                                              |
| **Legibility**  |        ✅         |  ❌   | With Babel, the code that executed in the browser was fundamentally different from the code I wrote.                            |
| **Native**      |        ✅         |  ❌   | Writing version _n_ directly was the actual language the browsers ran natively.                                                 |
| **Beneficiary** |        ✅         |  ❌   | Babel existed purely for developer convenience; the end users received identical, or often heavier, output.                     |
| **Control**     |        ✅         |  ❌   | For the browser runtime, which I did not control, I wrote conservative JavaScript natively rather than relying on tooling.      |

## 5. Outcome

Zero compile step, zero configuration, and no build-tool upgrade treadmills. When the browsers eventually caught up, the codebase was already written in the native language they ran.

## 6. Trade-offs

- Writing older syntax by hand meant sacrificing some developer conveniences for a few years.
- This required judgement per runtime rather than a blanket rule: where I owned the runtime entirely (like Node), I leveraged everything it offered.

[← Back to Examples](../README.md)
