# Cloudflare over AWS <!-- omit in toc -->

Configuration is parts too. Two clouds can run the same function, and differ enormously in what you have to understand to get it there.

## Table of Contents <!-- omit in toc -->

- [1. Context](#1-context)
- [2. Usual approach](#2-usual-approach)
- [3. Dev0 approach](#3-dev0-approach)
- [4. Tests](#4-tests)
- [5. Outcome](#5-outcome)
- [6. Trade-offs](#6-trade-offs)

## 1. Context

I deploy serverless functions to both AWS Lambda and Cloudflare Workers. The code can be identical -- see [Lambda to WinterCG Fetch](../lambda-to-wintercg-fetch/README.md). What surrounds it is not.

## 2. Usual approach

AWS, because it is the default. Getting a function running behind a URL takes a daunting amount of CloudFormation and configuration: IAM roles and policies, API Gateway or function URLs, log groups, networking and service settings, all entangled with each other. In practice a team ends up needing a dedicated AWS engineer just to keep the configuration understood.

## 3. Dev0 approach

Count the configuration as parts, and choose the platform with fewer of them where it fits. Cloudflare's CLI and APIs get the same result -- a function on a URL, with storage and secrets -- with a fraction of the moving parts:

```jsonc
// wrangler.jsonc -- the whole deployment description
{
  "name": "my-api",
  "main": "src/handler.js",
  "compatibility_date": "2026-10-01",
}
```

The same reasoning rules out a container orchestrator for a handful of services: parts that exist for a scale you do not have.

## 4. Tests

- **Less** -- AWS fails here. Policies, roles, gateways and templates are all parts that can break, drift and need expertise.
- **Separate** -- Cloudflare passes. Each Worker is an isolated, individually tested block with a specific interface. On AWS the functions are just as separate; it is the configuration around them that intertwines.
- **Legibility** -- Cloudflare passes. A short configuration file you can read top to bottom, against templates where behaviour emerges from many interacting resources.
- **Native** -- both pass. Both run standard JavaScript; Workers speaks `fetch` natively.
- **Beneficiary** -- not decisive. Users see a fast response from either.
- **Control** -- both pass. I control the runtime on either platform.

## 5. Outcome

On Cloudflare, one developer can understand and own the whole deployment. Separation done right -- many small, isolated functions -- is cheap when the platform does not tax every one of them in configuration.

## 6. Trade-offs

- AWS has services Cloudflare does not, and some clients are committed to AWS. Then it is AWS, with the portable handler keeping the vendor-specific part to one file.
- Choosing a platform is the architect's decision, made with the business context: budget, existing contracts, the team's skills.

[← Back to Examples](../README.md)
