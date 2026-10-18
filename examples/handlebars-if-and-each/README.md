# Handlebars with Only If and Each <!-- omit in toc -->

Handlebars offers all sorts of logic helpers. I allow exactly two: conditionals and loops. Restricted that far, a template still reads as the HTML it produces.

## Table of Contents <!-- omit in toc -->

- [1. Context](#1-context)
- [2. Usual approach](#2-usual-approach)
- [3. Dev0 approach](#3-dev0-approach)
- [4. Tests](#4-tests)
- [5. Outcome](#5-outcome)
- [6. Trade-offs](#6-trade-offs)

## 1. Context

Server-rendered pages need data in them: names, lists, optional sections. A template engine fills the gap between static HTML and the data.

## 2. Usual approach

Use whatever the engine offers. Custom helpers format dates, compare values, look up translations and compute classes. Partials pass parameters to partials. Over time the template becomes a program, and the page only exists once it runs.

## 3. Dev0 approach

Two block helpers and token replacement, nothing else.

- **A conditional** is either in the output or it is not.
- **A loop** is zero, one or many copies of the same block.
- **Everything else is token replacement.** `<span class="firstname">{{firstName}}</span>` renders in my head instantly.

```handlebars
<ul class="members">
  {{#each members}}
    <li>{{name}}{{#if isAdmin}} <em>admin</em>{{/if}}</li>
  {{/each}}
</ul>
```

Anything that needs more logic -- formatting, sorting, deciding -- is done in JavaScript before the data reaches the template, where it can be tested.

## 4. Tests

- **Less** -- pass. No custom helpers to write, register, test and maintain.
- **Separate** -- pass. Logic lives in JavaScript; the template only places data.
- **Legibility** -- pass. The template reads as the HTML it produces, with predictable holes.
- **Native** -- not decisive. A template engine is an addition, justified because the restricted subset stays close to plain HTML.
- **Beneficiary** -- pass. Pages are rendered on the server, so users receive plain HTML.
- **Control** -- not decisive.

## 5. Outcome

Any template can be read as a page. Bugs in logic surface in tested JavaScript, not in a template that only fails at render time.

## 6. Trade-offs

- Data must be shaped for the view beforehand, in a small mapping step in JavaScript. The step pays for itself: shaping data to match the template is much faster than shaping generic data inside the template, so builds complete almost instantly.
- Developers used to rich template helpers find the restriction austere at first.

[← Back to Examples](../README.md)
