# Agent Context Map <!-- omit in toc -->

What an agent -- a session you start, a subagent, or a loop worker -- has in context, in what order it arrives, and what pulls each further file in. Each box is marked as it stands on 2026-10-04: **exists**, **changing** in DEV0-18, or **planned**, with the story that builds it. Decision IDs refer to `2026-09-11-dev0-framework.md`.

## Table of Contents <!-- omit in toc -->

- [1. Legend](#1-legend)
- [2. Always loaded, at start](#2-always-loaded-at-start)
- [3. Loaded on demand, during work](#3-loaded-on-demand-during-work)
- [4. Enforcement, not context](#4-enforcement-not-context)
- [5. Never loaded by an agent](#5-never-loaded-by-an-agent)

## 1. Legend

```mermaid
flowchart LR
  exists["exists"]:::exists
  changing["changing in DEV0-18"]:::changing
  planned["planned, story key shown"]:::planned
  decision{"decision"}

  classDef exists fill:#dcfce7,stroke:#16a34a,color:#14532d
  classDef changing fill:#fef3c7,stroke:#d97706,color:#78350f
  classDef planned fill:#f1f5f9,stroke:#64748b,color:#334155,stroke-dasharray:5 3
```

Everything in §2 is paid by **every** agent, including each subagent and loop worker (A2), so it is the budget that matters: D25 targets ~1,200 tokens for the global rules, D63 caps the root `CLAUDE.md` plus imports at 6 KB.

## 2. Always loaded, at start

```mermaid
flowchart TD
  start(["Session, subagent or loop worker starts"]) --> harness["Harness baseline<br/>system prompt, tool definitions<br/>outside our control"]:::exists
  harness --> globalMd["~/.claude/CLAUDE.md<br/>one line"]:::exists
  globalMd --> rules["~/.claude/rules/<br/>dev0.md: D1, gates, code rules, Done<br/>code-style.md: naming and casing"]:::changing
  rules --> memory["Auto memory MEMORY.md<br/>per project index"]:::exists
  memory --> rootMd["Project root CLAUDE.md<br/>what this system is called"]:::exists
  rootMd --> glossaryMap["GLOSSARY-MAP.md via @ import<br/>published language (D19)<br/>planned"]:::planned
  rootMd --> agentSkills["Agent skills block<br/>three pointers into docs/agents/<br/>6.2"]:::planned
  rootMd --> pointers["Skill and agent descriptions<br/>install/skills, install/agents, plugins<br/>user-only skills excluded (A4, 5.8)"]:::exists
  pointers --> mcp["MCP tool names<br/>today global; per project via .mcp.json (5.6)"]:::exists
  mcp --> ready(["Ready for the first prompt"])

  classDef exists fill:#dcfce7,stroke:#16a34a,color:#14532d
  classDef changing fill:#fef3c7,stroke:#d97706,color:#78350f
  classDef planned fill:#f1f5f9,stroke:#64748b,color:#334155,stroke-dasharray:5 3
```

Today `~/.claude/rules/` also carries `javascript.md`, `testing.md`, `markdown.md` and `diataxis.md` -- about 4.6k tokens in every agent. DEV0-18 rewrites `philosophy.md` as `dev0.md` (D88), without its language-specific rules; 2.6 and 2.7 demote the rest into skills.

## 3. Loaded on demand, during work

```mermaid
flowchart TD
  ready(["Agent at work"]) --> touchFile{"Reads or edits<br/>a file?"}
  ready --> choice{"Dependency or<br/>architecture choice?"}
  ready --> story{"Working a<br/>story?"}
  ready --> term{"Naming a<br/>domain concept?"}
  ready --> slash{"You type /to-spec,<br/>/to-tickets or /implement?"}

  touchFile -- yes --> cascade["Every CLAUDE.md on the path<br/>e.g. workspaces/ then workspaces/iam/<br/>mechanism exists (A1)"]:::exists
  cascade --> language{"Which<br/>language?"}
  language -- JavaScript --> jsSkill["javascript skill<br/>stub with rules 10-12 in DEV0-18<br/>rules files folded in by 2.6"]:::changing
  language -- shell --> shellSkill["shell skill<br/>DEV0-18"]:::changing
  language -- "HTML, CSS, Handlebars" --> webSkill["web-ui skill<br/>DEV0-18"]:::changing
  language -- Markdown --> mdSkill["markdown skill"]:::exists
  language -- PHP --> phpSkill["php skill<br/>2.8"]:::planned

  choice -- yes --> adrIndex["ADR index<br/>~/.claude/adr/README.md<br/>2.5"]:::planned
  adrIndex --> adr["One ADR<br/>install/adr/ or docs/adr/<br/>2.3, 2.4"]:::planned

  story -- yes --> tracker["tracker skill: get<br/>6.1"]:::planned
  tracker --> issueTracker["docs/agents/issue-tracker.md<br/>triage-labels.md<br/>6.2"]:::planned
  tracker --> blueprint["Story blueprint plus parent<br/>epic's decisions (D85)"]:::planned
  blueprint --> verify{"Blueprint Verification:<br/>open decisions? (7.3)"}
  verify -- yes --> needsInfo["Triage Notes comment, needs-info,<br/>unassign, move on"]:::planned
  verify -- no --> implement["Upstream implement<br/>then tdd, then code-review"]:::exists

  term -- yes --> glossary["GLOSSARY.md of that context<br/>planned"]:::planned

  slash -- yes --> pocock["Pocock skill loads<br/>reads docs/agents/*.md"]:::exists
  pocock --> issueTracker

  classDef exists fill:#dcfce7,stroke:#16a34a,color:#14532d
  classDef changing fill:#fef3c7,stroke:#d97706,color:#78350f
  classDef planned fill:#f1f5f9,stroke:#64748b,color:#334155,stroke-dasharray:5 3
```

The upstream skills exist but have nothing to read yet: `docs/agents/` arrives with 6.2. Whether a loop worker can start `implement` at all is A3 (7.5).

## 4. Enforcement, not context

Hooks cost no context and cannot be talked past (D30, D32). They fire on the tool call, whichever agent made it.

```mermaid
flowchart LR
  sessionStart(["SessionStart"]) --> retention["Scratch retention<br/>3.5"]:::planned
  prompt(["UserPromptSubmit"]) --> account["Account gate<br/>3.10"]:::planned
  bash(["Bash call"]) --> install{"npm install<br/>with a package?"}
  install -- yes --> depGate["Dependency gate: BLOCK<br/>3.2"]:::planned
  bash --> git{"force-push, merge,<br/>switch to main?"}
  git -- yes --> gitGate["Git absolutes: BLOCK<br/>3.1"]:::planned
  edit(["Edit or Write"]) --> fileType{"File type?"}
  fileType -- "*.js" --> jsLint["oxfmt and oxlint<br/>3.3"]:::planned
  fileType -- "*.php" --> phpLint["php-cs-fixer and php -l<br/>4.1"]:::planned
  fileType -- "root CLAUDE.md, GLOSSARY*" --> budget["Root budget warning<br/>3.6"]:::planned
  stop(["Stop"]) --> completion["Completion gate: lint,<br/>typecheck, test -- BLOCK<br/>3.4"]:::planned

  classDef planned fill:#f1f5f9,stroke:#64748b,color:#334155,stroke-dasharray:5 3
```

None of Dev0's hooks exist yet; the only hooks running today are plugins' own (`claude-mem`).

## 5. Never loaded by an agent

- `DEV0.md` (2.2): the tenets and decision matrix, written for the architect. The single exception is the Dev0 review agent (7.4), whose job is judgement (D59).
- The framework design doc and this map: `docs/scratch/`, for you.

[← Back to Documentation Home](../README.md)
