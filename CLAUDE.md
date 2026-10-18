# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working in this repository.

## What this is

`dev0` is the Dev0 philosophy and nothing else: `README.md` explains it completely, `prompt.md` lets anyone's agent apply it, and `examples/` holds case studies. There is no code, no tooling and no dependency. The implementation -- skills, rules, hooks, agents and installer for Claude Code -- lives in [Agents0](https://github.com/tforster/agents0), which builds on Dev0. Dev0 never depends on Agents0: nothing here may require it, link into its internals or assume its tooling.

## Rules for changes

- **The README stays a few paragraphs.** If Dev0 cannot be expressed that lightly, it contradicts itself. Push detail into an example rather than growing the README.
- **`prompt.md` stands alone.** It must work pasted into any agent, for any CLAUDE.md or AGENTS.md: it names no skill, file path, harness-specific feature or Agents0 artefact. Agents0 has its own, more detailed Dev0 rule; the two are separate on purpose, so do not sync them.
- **The definition and the six tests appear in both the README and `prompt.md`.** A change to one is a change to both, in the same PR.
- **Examples** live at `examples/<slug>/README.md` and follow one outline: title, one-line summary, Table of Contents, then numbered sections Context, Usual approach, Dev0 approach, Tests, Outcome, Trade-offs, and a back link. Every new example gets a row in `examples/README.md`.
- **No tooling.** Do not add `package.json`, a formatter or a build. Section numbers and ToCs come from the `markdown` skill's scripts.
