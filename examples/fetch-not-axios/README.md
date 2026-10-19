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

Every application makes HTTP requests. Axios appeared in 2014 and quickly became the default HTTP client for an entire generation of JavaScript projects. Browsers shipped `fetch` natively in 2015, whilst Node took until version 18.

## 2. Usual approach

`npm install axios`, entirely on the grounds that it feels "easier"—automatic JSON parsing, interceptors, and a familiar API. The industry is so driven by momentum that most projects still blindly install it today, even in runtimes that have shipped native `fetch` for years.

## 3. Dev0 approach

Just use `fetch`. I adopted it long before it was native everywhere: using a polyfill (`whatwg-fetch`) in older browsers, and `node-fetch` on the server until Node shipped `fetch` itself. A polyfill strictly implements the standard. When the platform finally catches up, you simply remove one import statement and absolutely nothing else changes.

```javascript
const response = await fetch("/api/members", {
  method: "POST",
  headers: { "content-type": "application/json" },
  body: JSON.stringify(member),
});

if (!response.ok) throw new Error(`Saving member failed: ${response.status}`);
return await response.json();
```

Axios handles a few rare edge cases out of the box. If I ever actually encountered one, I would write a few lines of Vanilla JS around `fetch` and be done with it.

## 4. Tests

| Test            | Native `fetch` | Axios | Rationale                                                                                                                                                |
| :-------------- | :------------: | :---: | :------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Less**        |       ✅       |  ❌   | Axios introduces a library and its entire transitive dependency tree just to wrap an API the runtime already ships.                                      |
| **Separate**    |       ➖       |  ➖   | Not decisive here.                                                                                                                                       |
| **Legibility**  |       ✅       |  ❌   | `fetch` is exactly the same standard API in every single browser, worker, and server.                                                                    |
| **Native**      |       ✅       |  ❌   | `fetch` is built-in. Even the polyfills passed this test: they implemented the native standard and were instantly deleted when it arrived.               |
| **Beneficiary** |       ✅       |  ❌   | Axios fails completely in the browser. End users are forced to download a library simply so the developer can skip typing `.json()`.                     |
| **Control**     |       ✅       |  ❌   | This is exactly why I used polyfills. Where I did not control the runtime, I filled the gap with the standard itself, not a permanent alternative to it. |

## 5. Outcome

When browsers and Node finally caught up, removing the polyfills was a single-line deletion in each environment. There was never a massive, painful migration away from a second API, because there was never a second API to begin with.

## 6. Trade-offs

- `fetch` does not automatically reject on HTTP error statuses; explicitly checking `response.ok` is my job.
- Upload progress and request timeouts require using the native `AbortController` or writing a few lines of my own, rather than just flipping a configuration option.

[← Back to Examples](../README.md)
