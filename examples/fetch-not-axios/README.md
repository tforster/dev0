# Fetch, Not Axios <!-- omit in toc -->

I have used `fetch` thousands of times, in browsers and on servers, and I have never once needed Axios. A polyfill is a dependency that plans its own deletion; a wrapper library is a second API, permanently.

## Table of Contents <!-- omit in toc -->

- [1. Context](#1-context)
- [2. Usual approach](#2-usual-approach)
- [3. Dev0 approach](#3-dev0-approach)
- [4. Tests](#4-tests)
- [5. Outcome](#5-outcome)
- [6. Trade-offs](#6-trade-offs)

## 1. Context

Every application makes HTTP requests. Axios appeared in 2014 and became the default HTTP client for a generation of JavaScript projects. Browsers shipped `fetch` in 2015; Node took until version 18.

## 2. Usual approach

`npm install axios`, on the grounds that it is easier: automatic JSON, interceptors, a familiar API. Most projects still install it today, in runtimes that have shipped `fetch` for years.

## 3. Dev0 approach

Use `fetch`. I adopted it before it was native everywhere: a polyfill (`whatwg-fetch`) in older browsers, and `node-fetch` on the server until Node shipped `fetch` itself. A polyfill implements the standard, so when the platform catches up you remove one import and nothing else changes.

```js
const response = await fetch("/api/members", {
  method: "POST",
  headers: { "content-type": "application/json" },
  body: JSON.stringify(member),
});
if (!response.ok) throw new Error(`Saving member failed: ${response.status}`);
return await response.json();
```

Axios handles a few rare edge cases. If I ever met one, I would write a few lines around `fetch` and be done.

## 4. Tests

- **Less** -- Axios fails. A library and its transitive tree, to wrap an API the runtime already ships.
- **Separate** -- not decisive.
- **Legibility** -- pass. `fetch` is the same API in every browser, worker and server.
- **Native** -- Axios fails; `fetch` passes. The polyfills passed too: they implemented the standard and were deleted when it arrived.
- **Beneficiary** -- Axios fails in the browser. Users download a library so developers can skip writing `response.json()`.
- **Control** -- the reason for the polyfills. Where I did not control the runtime, I filled the gap with the standard, not an alternative to it.

## 5. Outcome

When browsers and Node caught up, removing the polyfills was a one-line change each. There was never a migration away from a second API, because there was never a second API.

## 6. Trade-offs

- `fetch` does not reject on HTTP error statuses; checking `response.ok` is my job.
- Upload progress and request timeouts need `AbortController` or a few lines of my own, not a configuration option.

[← Back to Examples](../README.md)
