# Lambda to WinterCG Fetch <!-- omit in toc -->

Write every serverless handler strictly as a standard `fetch(request, env)` function, and strictly confine each cloud's proprietary request format to a single, small adapter.

## Table of Contents <!-- omit in toc -->

- [1. Context](#1-context)
- [2. Usual approach](#2-usual-approach)
- [3. Dev0 approach](#3-dev0-approach)
- [4. Tests](#4-tests)
- [5. Outcome](#5-outcome)
- [6. Trade-offs](#6-trade-offs)

## 1. Context

I build heavily on serverless functions: AWS Lambda for some clients, Cloudflare Workers for others, and Vanilla Node locally. Each platform historically spoke its own dialect. Lambda hands a handler a proprietary JSON `event` describing an HTTP request and expects a custom JSON object back. Conversely, Workers, Deno, and Bun hand it a standard `Request` and expect a standard `Response`—the exact shape the WinterCG (now WinterTC) group standardised for server-side JavaScript, borrowed straight from the browser's native `fetch` API.

## 2. Usual approach

Write the handler directly against the proprietary event format of whatever platform you are deploying to today. The business logic carelessly reads `event.rawPath`, `event.headers`, and `event.body`, and returns `{ statusCode, headers, body }`. Tests require building massive, fake Lambda event fixtures. Often, developers reach for a bloated adapter library just to make the proprietary event feel like an old Express app.

It feels "easy" because it matches the vendor's documentation, but it permanently welds the entire codebase—and every single test—to one vendor's proprietary format.

## 3. Dev0 approach

The handler is written exactly once, against the web platform's own native types. Runtime concerns, such as configuration and secrets, arrive as an `env` argument, following the clean Workers `(request, env)` convention. The handler imports absolutely nothing platform-specific.

```javascript
// handler.js -- purely portable across Lambda, Workers, Deno, Bun, and Node
export const router = {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === "/health") return Response.json({ ok: true });
    return new Response("Not found", { status: 404 });
  },
};
```

On Cloudflare Workers, this router is simply exported directly; there is nothing to adapt. AWS Lambda gets the _only_ platform-specific file in the entire project, simply converting its proprietary event to a standard `Request` on the way in, and mapping the standard `Response` back out:

```javascript
// lambda.js -- the only file in the codebase that knows about Lambda
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

  return {
    statusCode: response.status,
    headers: Object.fromEntries(response.headers),
    body: await response.text(),
  };
};
```

Tests simply construct a `new Request(...)`, call `router.fetch`, and assert on the resulting `Response`. No event fixtures, no heavy emulators, no cloud dependencies.

## 4. Tests

| Test            | Dev0 (WinterCG Standard) | Usual Approach (Vendor Lock-in) | Rationale                                                                                                                                                                |
| :-------------- | :----------------------: | :-----------------------------: | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Less**        |            ✅            |               ❌                | No heavy framework or Express-adapter library. Just one small file of pure Vanilla JS glue per non-standard platform.                                                    |
| **Separate**    |            ✅            |               ❌                | Business logic and platform plumbing live in strictly different files behind one clean interface: `fetch(request, env)`.                                                 |
| **Legibility**  |            ✅            |               ❌                | `Request`, `Response`, `URL`, and `Headers` are the exact same APIs every web developer already reads natively in the browser.                                           |
| **Native**      |            ✅            |               ❌                | Workers, Deno, Bun, and Node all ship these types natively. The handler uses only what the runtimes already provide.                                                     |
| **Beneficiary** |            ✅            |               ❌                | Users get the exact same behaviour; absolutely nothing ships that serves only the developer's convenience.                                                               |
| **Control**     |            ✅            |               ❌                | Where the runtime is controlled, its newest standard APIs are used freely. The one runtime with a non-standard interface (Lambda) is securely fenced into a single file. |

## 5. Outcome

Moving a handler between Lambda and Workers simply means swapping the adapter, not rewriting the business logic. The exact same handler runs locally under Node with zero emulation. Tests read like clean browser code and never once mention a cloud vendor.

## 6. Trade-offs

- The adapter is code I own and must maintain. It covers the specific event shape I use (function URLs and HTTP API payload v2); other Lambda event sources require their own small, custom adapters.

[← Back to Examples](../README.md)
