# Babel <!-- omit in toc -->

Where I first noticed the pattern: if a compiler turns the newest JavaScript into version _n_, write version _n_ and delete the compiler.

## Table of Contents <!-- omit in toc -->

- [1. Context](#1-context)
- [2. Usual approach](#2-usual-approach)
- [3. Dev0 approach](#3-dev0-approach)
- [4. Tests](#4-tests)
- [5. Outcome](#5-outcome)
- [6. Trade-offs](#6-trade-offs)

## 1. Context

For years browsers lagged behind the JavaScript language. Developers wanted arrow functions, classes, modules and `async` before browsers could run them.

## 2. Usual approach

Babel. Write the newest syntax, and Babel compiles it down to whatever the target browsers support. Add presets, plugins, a configuration file and a build step, and keep all of them up to date.

## 3. Dev0 approach

Look at what the user receives: the same compiled JavaScript either way. If Babel was compiling down to version _n_, I simply wrote version _n_. No compiler, nothing to configure, nothing to go out of date, nothing extra in the supply chain.

Today the judgement has a name. [Baseline](https://web.dev/baseline) marks which web features are safe across all major browsers. Write to Baseline "widely available" and you get the job Babel used to do, with no compile step at all.

## 4. Tests

- **Less** -- Babel fails. A compiler, its plugins and their transitive tree, all to produce code I could write by hand.
- **Separate** -- not decisive.
- **Legibility** -- Babel fails. The code that runs is not the code you wrote.
- **Native** -- pass for writing version _n_: it is the language the browsers actually run.
- **Beneficiary** -- Babel fails. It served developers wanting the latest syntax; users got identical output.
- **Control** -- the deciding lens. For the browser, which I do not control, I wrote conservative JavaScript; for Node, which I did control, I used the newest features freely. Same language, two answers.

## 5. Outcome

No compile step, no configuration and no build-tool upgrades. When browsers caught up, the code was already the language they ran.

## 6. Trade-offs

- Writing older syntax by hand meant giving up some conveniences for a few years.
- It is a judgement per runtime, not a rule: where you control the runtime, use everything it offers.

[← Back to Examples](../README.md)
