# Cloudflare over AWS <!-- omit in toc -->

Configuration is made of parts, too. Two clouds can run the exact same function, but they differ enormously in the sheer amount of configuration you must understand to get it there.

## Table of Contents <!-- omit in toc -->

- [1. Context](#1-context)
- [2. Usual approach](#2-usual-approach)
- [3. Dev0 approach](#3-dev0-approach)
- [4. Tests](#4-tests)
- [5. Outcome](#5-outcome)
- [6. Trade-offs](#6-trade-offs)

## 1. Context

I deploy serverless functions to both AWS Lambda and Cloudflare Workers. The underlying code can be identical—see [Lambda to WinterCG Fetch](../lambda-to-wintercg-fetch/README.md). What surrounds the code is not.

## 2. Usual approach

AWS, simply because it is the industry default. Getting a function running behind a URL on AWS requires a daunting amount of CloudFormation and configuration: IAM roles, IAM policies, API Gateways or function URLs, log groups, and networking rules, all hopelessly entangled. In practice, a team ends up needing a dedicated AWS engineer just to keep the infrastructure legible.

## 3. Dev0 approach

Count configuration lines as parts, and choose the platform that requires fewer of them to achieve the same result. Cloudflare's CLI and APIs deliver exactly the same outcome—a function behind a URL, with storage and secrets—using a fraction of the moving parts:

```jsonc
// wrangler.jsonc -- the whole deployment description
{
  "name": "my-api",
  "main": "src/handler.js",
  "compatibility_date": "2026-10-01",
}
```

This is the exact same reasoning I use to rule out heavy container orchestrators for a handful of services. They are parts built for a scale you simply do not have.

## 4. Tests

| Test            | Cloudflare | AWS | Rationale                                                                                                              |
| :-------------- | :--------: | :-: | :--------------------------------------------------------------------------------------------------------------------- |
| **Less**        |     ✅     | ❌  | AWS requires IAM policies, roles, gateways, and templates—discrete parts that can break and drift.                     |
| **Separate**    |     ✅     | ❌  | Each Worker is an isolated block. AWS functions are technically separate, but infrastructure intertwines them.         |
| **Legibility**  |     ✅     | ❌  | You read a short config file top-to-bottom. AWS requires sprawling templates where behaviour emerges from interaction. |
| **Native**      |     ✅     | ✅  | Both run standard JavaScript. Workers natively speak standard `fetch`.                                                 |
| **Beneficiary** |     ✅     | ❌  | Users experience cold starts that are roughly ten times faster on Cloudflare.                                          |
| **Control**     |     ✅     | ✅  | I strictly control the runtime environment on either platform.                                                         |

## 5. Outcome

On Cloudflare, a single developer can easily understand and own the entire deployment, whilst the user benefits from significantly faster cold starts. Separation done right—building many small, isolated functions—is only cheap when the platform doesn't tax every single function with massive configuration overhead.

## 6. Trade-offs

- AWS has native services that Cloudflare does not, and many enterprise clients are already heavily committed to AWS. When AWS is required, I rely on a portable handler to isolate the vendor-specific lock-in to a single file.
- Platform selection is ultimately an architect's decision, made within the business context: budget, existing contracts, and the team's actual skills.

[← Back to Examples](../README.md)
