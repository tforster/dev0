# Dev0

_Simplicity, defined._

I have been building software for nearly four decades. Everyone sells "simplicity," but what the industry usually means is "easy"—the familiar path of least resistance using whatever bloated framework happens to be trending. Dev0 is the methodology I’ve distilled over my career to cut through that noise.

To me, simple means one thing: **fewer parts, strictly separated, and completely legible**. Every piece of scaffolding, framework, or dependency you add is a liability. It's something that can break, become outdated, or be attacked. Separation simplifies a system because it severs the tangles between parts, whilst legibility ensures that "fewer lines" doesn't just devolve into code golf.

Dev0 is a **zero-based** methodology. You don't start with last year's boilerplate and tack on more. You start with absolutely nothing—no scaffold, no heavy frontend frameworks, no dependencies. Just standard Vanilla JS (ES6+ using ESM) and native platform capabilities. Every single addition must fiercely justify its right to exist within the system. The default question flips from "Why not use this library?" to "Does this earn its keep?"

To earn that right, an addition must pass all **six tests**. A strong pass in one never excuses a failure in another:

| Name            | What it tests                                                                                                                                                                        |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Less**        | Does it actually reduce complexity, or just hide it? When you add a dependency, you own its entire transitive tree, its configuration, and its infrastructure.                       |
| **Separate**    | Does each part do exactly one thing, in its own place, behind a clean interface?                                                                                                     |
| **Legibility**  | Can you predict exactly what the code does just by reading it, without having to run it?                                                                                             |
| **Native**      | Does the platform already do this? Favour native APIs and standard JavaScript before reaching for a third-party wrapper.                                                             |
| **Beneficiary** | Who does this actually serve the end user, or just the developer? When developer convenience and user performance conflict, **the user wins**.                                       |
| **Control**     | Do you control where it runs? Push the newest features to the serverless edge or cloud infrastructure where you own the runtime, but be conservative in the browser where you don't. |

Build tools should analyse, not transform. Tools can check your code all they want—like using JSDoc for types or a linter—because those don't ship to production. But they should only transform code on the way out the door, such as minification.

Rules can be broken, but only as deliberate **exceptions**. These exceptions must be made by the architect who sees the whole system, and they must be documented. A codebase only shows what was built; written architecture decisions record what was explicitly ruled out, and why.

The **architect** owns the boundaries, refuses the dependencies, and decides what isn't being built upfront. **Doers**—whether they are human developers or AI coding agents—execute strictly within those boundaries. If a design leaves a question open, they ask rather than improvise. An AI agent left to its own devices will write bloated, median-quality code; a strict design is what stops it.

Dev0 applies to any stack, though my examples lean towards the web because that is where I operate. It works beautifully on legacy code too, applying the Strangler Fig pattern one piece at a time. Above all, it makes being wrong survivable, because having fewer parts makes reversing your mistakes incredibly cheap.

Agents0 is my opinionated companion toolkit—skills, rules, hooks, and agents for Claude Code that enforce Dev0. You don't strictly need it. The real test of Dev0 is whether your own AI agent can apply it from a single prompt, without adopting my tooling.

- **For humans**: Examples — case studies of the six tests in practice.
- **For agents**: prompt.md — paste it into your agent to add Dev0 to your CLAUDE.md or AGENTS.md.
