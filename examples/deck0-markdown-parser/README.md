# Deck0's Markdown Parser <!-- omit in toc -->

Less does not mean none. My ultra-minimalist slide-deck engine, Deck0, comes in at under 10kb and depends on exactly one library—and it fiercely earns its place.

## Table of Contents <!-- omit in toc -->

- [1. Context](#1-context)
- [2. Usual approach](#2-usual-approach)
- [3. Dev0 approach](#3-dev0-approach)
- [4. Tests](#4-tests)
- [5. Outcome](#5-outcome)
- [6. Trade-offs](#6-trade-offs)

## 1. Context

Deck0 is my presentation tool: slides are written in a single Markdown file and presented directly in the browser. It needs to turn Markdown into HTML, and then use Vanilla JS to split that HTML into individual slides.

## 2. Usual approach

Reach for a bloated presentation framework, or build the deck in a heavy UI component framework with a component per slide, a state management library for basic navigation, and a complex plugin system just to handle themes.

## 3. Dev0 approach

Two precise decisions, each made strictly against the six tests:

- **Parse Markdown with [`marked`](https://github.com/markedjs/marked).** Parsing CommonMark safely is full of specification edge cases and sanitisation traps. The problem is solved, specialised, and strictly bounded. Writing my own parser would introduce far more risk and complexity than the library does.
- **Use the document's own structure as the interface.** Ordinary `<h1>` headings mark slide boundaries, rather than relying on invented metadata syntax, meaning any Markdown renderer still naturally understands the file. Each `<h1>` starts a new slide, which perfectly matches HTML's own native rule: one `<h1>` per page, or per `<section>`.

```markdown
# Why Dev0

Fewer parts, kept separate, each legible.

# The six tests

Less, separate, legibility, native, beneficiary, control.
```

## 4. Tests

| Test            | Dev0 (`marked` & native structure) | Heavy Frameworks | Rationale                                                                                                                   |
| :-------------- | :--------------------------------: | :--------------: | :-------------------------------------------------------------------------------------------------------------------------- |
| **Less**        |                 ✅                 |        ❌        | One focused library with a bounded job. A hand-rolled parser adds risk, whilst a UI component framework adds massive bloat. |
| **Separate**    |                 ✅                 |        ❌        | Parsing the text, slicing it into slides, and presenting the UI are strictly distinct, separated steps.                     |
| **Legibility**  |                 ✅                 |        ❌        | A deck remains a plain Markdown file that reads sequentially as a standard document, not a pile of fragmented components.   |
| **Native**      |                 ✅                 |        ❌        | Headings are the platform's native structure; the browser renders the HTML directly via Vanilla JS.                         |
| **Beneficiary** |                 ✅                 |        ❌        | The audience gets fast, plain HTML slides, not a sluggish framework runtime downloading to their device.                    |
| **Control**     |                 ➖                 |        ➖        | Not decisive here.                                                                                                          |

## 5. Outcome

Exactly one dependency, explicitly justified in writing. The engine stays under 10kb, and the slide decks remain purely portable Markdown files that render anywhere, including natively on GitHub.

## 6. Trade-offs

- `marked` and its updates are now officially in the supply chain, meaning the version must be pinned and rigorously reviewed like any other moving part.

[← Back to Examples](../README.md)
