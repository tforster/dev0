# Lambda to WinterCG Fetch <!-- omit in toc -->

Write every serverless handler as a standard `fetch(request, env)` function, and confine each cloud's request format to one small adapter.

## Table of Contents <!-- omit in toc -->

- [1. Context](#1-context)
- [2. Usual approach](#2-usual-approach)
- [3. Dev0 approach](#3-dev0-approach)
- [4. Tests](#4-tests)
- [5. Outcome](#5-outcome)
- [6. Trade-offs](#6-trade-offs)

## 1. Context

I build heavily on serverless functions: AWS Lambda for some clients, Cloudflare Workers for others, and Node locally. Each platform speaks its own dialect. Lambda hands a handler a JSON `event` describing an HTTP request and expects a JSON object back. Workers, Deno and Bun hand it a standard `Request` and expect a standard `Response` -- the shape the WinterCG (now WinterTC) group standardised for server-side JavaScript, borrowed straight from the browser's `fetch`.

## 2. Usual approach

Write the handler against the event format of the platform you deploy to today. Business logic reads `event.rawPath`, `event.headers` and `event.body`, and returns `{ statusCode, headers, body }`. Tests build fake Lambda events. Often a framework or adapter library sits on top to make the event feel like Express.

It is easy: it matches the platform's documentation and every tutorial. It also welds the whole codebase to one vendor's event format, and every test to fixtures of that format.

## 3. Dev0 approach

The handler is written once, against the web platform's own types. Runtime concerns such as configuration and secrets arrive as an `env` argument, following the Workers `(request, env)` convention, so the handler imports nothing platform-specific.

```js
// handler.js -- portable across Lambda, Workers, Deno, Bun and Node
export const router = {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === "/health") return Response.json({ ok: true });
    return new Response("Not found", { status: 404 });
  },
};
```

On Workers the router is the export; there is nothing to adapt. Lambda gets the only platform-specific file in the project, converting its event to a `Request` on the way in and the `Response` back on the way out:

```js
// lambda.js -- the only file that knows about Lambda
import { router } from "./handler.js";

export const handler = async (event) => {
  const { domainName, http } = event.requestContext;
  const query = event.rawQueryString ? `?${event.rawQueryString}` : "";
  const body = event.isBase64Encoded ? Buffer.from(event.body, "base64") : event.body;
  const request = new Request(`https://${domainName}${event.rawPath}${query}`, {
    method: http.method,
    headers: event.headers,
    body,
  });
  const response = await router.fetch(request, process.env);
  return { statusCode: response.status, headers: Object.fromEntries(response.headers), body: await response.text() };
};
```

Tests construct a `new Request(...)`, call `router.fetch` and assert on the `Response`. No event fixtures, no emulator, no cloud.

## 4. Tests

- **Less** -- pass. No framework or adapter library; one small file of glue per non-standard platform, instead of vendor types throughout the codebase.
- **Separate** -- pass. Business logic and platform plumbing live in different files behind one interface, `fetch(request, env)`.
- **Legibility** -- pass. `Request`, `Response`, `URL` and `Headers` are the same APIs every web developer already reads in the browser.
- **Native** -- pass. Workers, Deno, Bun and Node all ship these types; the handler uses only what the runtimes provide.
- **Beneficiary** -- pass. Users get the same behaviour; nothing ships that serves only the developer.
- **Control** -- pass. Where the runtime is controlled, its newest standard APIs are used freely, and the one runtime with a non-standard interface is fenced into a single file.

## 5. Outcome

Moving a handler between Lambda and Workers means swapping the adapter, not rewriting the logic. The same handler runs locally under Node with no emulator. Tests read like browser code and never mention a cloud vendor.

## 6. Trade-offs

- The adapter is code I own. It covers the event shape I use (function URLs and HTTP API payload v2); other Lambda event sources need their own small adapter.
- As written it returns text bodies. Binary responses need `isBase64Encoded: true` and a base64-encoded body.
- Platform extras that do not fit `fetch(request, env)`, such as Workers' `ctx.waitUntil` or Lambda's response streaming, are deliberately kept out of the handler, or passed in explicitly where a handler genuinely needs them.

[← Back to Examples](../README.md)
