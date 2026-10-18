# Dev0 <!-- omit in toc -->

_Simplicity, defined._

Everyone claims simplicity, and most of what the industry sells as simple is merely easy: familiar, one command away, what everyone else uses. Dev0 is my name for how I have built software over 40 years, and it pins the word down. **Simple means fewer parts, kept separate, each legible.** Every part is something that can break, be attacked, go out of date, need testing and be shipped to a user. Separation can add parts and still simplify, because it removes the tangles between them. Legibility stops "fewer" turning into code golf.

The method is **zero-based**. Like zero-based budgeting, you do not start from last year's stack plus a bit. You start from nothing -- no scaffold, no framework, no dependencies -- and every addition, whether a dependency, a tool, a layer or a line of configuration, earns its place against the whole system. The question flips from "why not add this?" to "does this earn the right to exist?" An addition earns its place by passing **all six tests**, and a strong pass never buys off a failure:

- **Less** -- does it reduce what can go wrong, or add to it? You own its whole transitive tree, its configuration and its infrastructure.
- **Separate** -- does each part do one thing, in its own place, behind a clear interface?
- **Legibility** -- can you predict what it does by reading it, without running it?
- **Native** -- does what you already run on do this? Use the platform before adding to it.
- **Beneficiary** -- who does it serve: the user, or only the developer?
- **Control** -- do you control where it runs? Use the newest features where you own the runtime, and be conservative where you do not.

When developer convenience and user benefit conflict, **the user wins**. Tools may check what you write as much as they like -- a type checker, linter or formatter ships nothing -- but they may transform it only on the way out, as a minifier does.

Any rule can be broken, but only as an **exception**: made by someone who can see the whole system, and written down with its cost, its reason and the alternatives it rejected. A codebase records what was built; only a written rejection records what was ruled out.

That someone is the **architect**: whoever owns the design, and the responsibility for it, for this piece of work. The architect draws the boundaries, refuses dependencies and decides what is not being built -- once, upfront, in writing. **Doers**, whether people or AI coding agents, build against those decisions faithfully, and when the design does not answer a question they ask rather than improvise. An agent left to decide writes very good median code; a design that closes the decisions is what stops it. Growing from doer to architect is widening the view: a task, a feature, a system, a domain.

Dev0 applies to any stack; my examples lean towards the web because that is where I work. It runs on legacy code too, one strangled piece at a time. And it makes being wrong survivable, because fewer parts make reversal cheap.

[Agents0](https://github.com/tforster/agents0) is my opinionated companion toolkit -- skills, rules, hooks and agents for Claude Code that apply Dev0. You do not need it. The real test of Dev0 is whether your own agent can apply it from a single prompt, without adopting my tooling.

- **For humans:** [Examples](./examples/README.md) -- case studies of the six tests in practice.
- **For agents:** [prompt.md](./prompt.md) -- paste it into your agent to add Dev0 to your CLAUDE.md or AGENTS.md.
