# Deck0's Markdown Parser <!-- omit in toc -->

Less does not mean none. My slide-deck engine depends on exactly one library, and it earns its place.

## Table of Contents <!-- omit in toc -->

- [1. Context](#1-context)
- [2. Usual approach](#2-usual-approach)
- [3. Dev0 approach](#3-dev0-approach)
- [4. Tests](#4-tests)
- [5. Outcome](#5-outcome)
- [6. Trade-offs](#6-trade-offs)

## 1. Context

Deck0 is my slide-deck engine: slides are written in Markdown and presented in the browser. It needs to turn Markdown into HTML, then split that HTML into slides.

## 2. Usual approach

Reach for a presentation framework, or build the deck in a UI component framework with a component per slide, a state library for navigation and a plugin system for themes.

## 3. Dev0 approach

Two decisions, each made against the six tests:

- **Parse Markdown with [`marked`](https://github.com/markedjs/marked).** Parsing CommonMark safely is full of specification edge cases and sanitisation traps. The problem is solved, specialised and bounded; writing my own parser would add more risk than the library does.
- **Use the document's own structure as the interface.** Ordinary `<h1>` headings mark slide boundaries, rather than an invented metadata syntax, so any Markdown renderer still understands the file.

```markdown
# Why Dev0

Fewer parts, kept separate, each legible.

# The six tests

Less, separate, legibility, native, beneficiary, control.
```

## 4. Tests

- **Less** -- pass. One focused library with a bounded job, where a hand-rolled parser would carry more risk. A UI component framework to render a slide and toggle a modal would fail.
- **Separate** -- pass. Parsing, slicing into slides and presenting are distinct steps.
- **Legibility** -- pass. A deck is a plain Markdown file that reads as a document.
- **Native** -- pass. Headings are the platform's own structure; the browser renders the HTML directly.
- **Beneficiary** -- pass. The audience gets plain HTML slides, not a framework runtime.
- **Control** -- not decisive.

## 5. Outcome

One dependency, justified in writing. Decks stay portable Markdown that renders anywhere, including on GitHub.

## 6. Trade-offs

- `marked` and its updates are now in the supply chain, so it is pinned and reviewed like any other part.
- Using `<h1>` as the delimiter means a slide cannot contain a second top-level heading.

[← Back to Examples](../README.md)
