# Handlebars with Only If and Each <!-- omit in toc -->

Handlebars offers an endless supply of logic helpers. I strictly allow exactly two: conditionals and loops. Restricted this heavily, a template still reads exactly as the plain HTML it produces.

## Table of Contents <!-- omit in toc -->

- [1. Context](#1-context)
- [2. Usual approach](#2-usual-approach)
- [3. Dev0 approach](#3-dev0-approach)
- [4. Tests](#4-tests)
- [5. Outcome](#5-outcome)
- [6. Trade-offs](#6-trade-offs)

## 1. Context

Server-rendered pages need dynamic data injected into them: names, lists, optional sections. A template engine exists simply to fill the gap between static HTML and that data.

## 2. Usual approach

Use absolutely every feature the engine offers. Developers write custom helpers to format dates, compare values, look up translations, and compute CSS classes. Partials pass complex parameters to other partials. Over time, the template devolves into a full-blown program, and the structure of the page only becomes visible once it is running.

## 3. Dev0 approach

Two block helpers and token replacement. Absolutely nothing else.

- **A conditional** is either in the output or it is not.
- **A loop** is zero, one, or many copies of the exact same block.
- **Everything else is strict token replacement.** `<span class="firstname">{{firstName}}</span>` renders in my head instantly.

```handlebars
<ul class="members">
  {{#each members}}
    <li>{{name}}{{#if isAdmin}} <em>admin</em>{{/if}}</li>
  {{/each}}
</ul>
```

Anything that requires more complex logic—formatting, sorting, deciding—is done in standard Vanilla JS _before_ the data ever reaches the template. Logic belongs where it can be tested.

## 4. Tests

| Test            | Dev0 (Restricted) | Usual Approach | Rationale                                                                                                                                           |
| :-------------- | :---------------: | :------------: | :-------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Less**        |        ✅         |       ❌       | No custom helpers to write, register, test, and maintain over years.                                                                                |
| **Separate**    |        ✅         |       ❌       | Logic lives strictly in JavaScript; the template only places data. The usual approach hopelessly intertwines logic and view.                        |
| **Legibility**  |        ✅         |       ❌       | The template reads identically to the HTML it produces, just with predictable holes. Complex templates read like un-runnable code.                  |
| **Native**      |        ➖         |       ➖       | Not decisive here. A template engine is technically an addition, justified only because the restricted subset stays incredibly close to plain HTML. |
| **Beneficiary** |        ✅         |       ❌       | Pages are rendered strictly on the server, ensuring the user receives instant, plain HTML.                                                          |
| **Control**     |        ➖         |       ➖       | Not decisive here.                                                                                                                                  |

## 5. Outcome

Any template in the system can be read natively as a page. Bugs in logic surface during standard JavaScript testing, not deep inside a template that only fails at render time.

## 6. Trade-offs

- Data must be deliberately shaped for the view beforehand using a small mapping step in JavaScript. This view-mapping step actually pays for itself: mapping data strictly to match the template is significantly faster than computing generic data inside the template at render time, so builds complete almost instantly.
- Developers accustomed to rich, bloated template helpers often find this restriction austere at first.

[← Back to Examples](../README.md)
