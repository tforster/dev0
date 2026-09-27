# dev0 <!-- omit in toc -->

_The Dev0 toolkit: the skills, agents, rules and tooling that deliver the Dev0 workflow, kept in sync across machines._

## Table of Contents <!-- omit in toc -->

- [About](#about)
- [Quick Start](#quick-start)
- [Documentation](#documentation)
- [Known Issues](#known-issues)
- [Change Log](#change-log)
- [Contributing](#contributing)
- [License](#license)

## About

`dev0` is the toolkit the Dev0 workflow is delivered through: a personal, single-harness (Claude-only) repo that keeps `install/{skills,agents,rules}` in sync across machines and symlinks them into `~/.claude/`.

The scope test for anything added here: does it exist only to serve the Dev0 workflow? **In:** the philosophy, agentic traits (skills, agents, rules, hooks, ADRs), worktree shell functions, project templates. **Out, to the dotfiles repo:** general shell and machine setup.

**Key points:**

- One canonical copy of skills, agents, and rules, git-synced across machines
- Symlinked wholesale into a harness's config directory -- no per-category special-casing
- Zero runtime dependencies; `npm install` is only for dev tooling
- Deliberately minimal: "simple and good enough for one person" over generality

It began as `capabilities`, scaffolding for [trAIt](https://github.com/tforster/trait). See [`docs/explanation/architecture.md`](./docs/explanation/architecture.md) for the full design rationale and [`docs/reference/prd.md`](./docs/reference/prd.md) for the original design discussion.

## Quick Start

**Prerequisites:** Node.js 24+ (npm only for development)

```bash
# Clone, then link install/{skills,agents,rules} into ~/.claude/ and bin/dev0 into ~/.local/bin
git clone <repo-url> dev0
cd dev0
node bin/dev0 install

# Check what's currently linked
dev0 status

# Pull/push changes across machines
dev0 sync

# Scaffold a new skill under install/skills/
dev0 new skill <name>
```

For development:

```bash
npm install                           # dev tooling only
npm test                              # full test suite (node:test)
npm run lint                          # oxlint
npm run format                        # oxfmt --write
npm run format:check                  # oxfmt --check (no write)
npm run typecheck                     # tsc --noEmit -p jsconfig.json
```

## Documentation

Documentation follows the [Diátaxis framework](https://diataxis.fr):

- **[Tutorials](./docs/tutorials/README.md)** — step-by-step guides for getting started
- **[How-To Guides](./docs/how-to/README.md)** — practical guides for specific tasks
- **[Reference](./docs/reference/README.md)** — specs, the PRD, and the issue tracker
- **[Explanation](./docs/explanation/README.md)** — architecture and design rationale

📚 **Start here:** [Documentation Index](./docs/README.md)

> [!NOTE]
> Tutorials and how-to guides are still stubs — this is a young, single-user tool. Reference (`prd.md`, `issues.md`) and Explanation (`architecture.md`) are the most complete sections today.

## Known Issues

There's no external issue tracker yet — open items are tracked in [`docs/reference/issues.md`](./docs/reference/issues.md) until one is adopted. Notably still open:

- Confirm the git host and push the repo remotely

## Change Log

No `CHANGELOG.md` yet. For now, `git log` is the change history.

## Contributing

This is a personal, single-user tool and isn't set up to take outside contributions. If you're working in this codebase, `CLAUDE.md` and `docs/explanation/architecture.md` are the places to start.

## License

MIT License — see [LICENSE](./LICENSE) for details.

**Author:** Troy Forster ([@tforster](https://github.com/tforster)) — <troy.forster@gmail.com>
