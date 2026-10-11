# A Single-Page App in 17 Lines <!-- omit in toc -->

In 2014 I rebuilt my own website as a single-page app. It was arguably the wrong call -- but the routing was 17 lines of JavaScript, not a framework, so being wrong cost almost nothing.

## Table of Contents <!-- omit in toc -->

- [1. Context](#1-context)
- [2. Usual approach](#2-usual-approach)
- [3. Dev0 approach](#3-dev0-approach)
- [4. Tests](#4-tests)
- [5. Outcome](#5-outcome)
- [6. Trade-offs](#6-trade-offs)

## 1. Context

Around 2010 there was a huge push to make websites feel like native apps, mostly by removing the flicker between page loads. Single-page apps were the answer of the day: intercept navigation with JavaScript, fetch the next page's content and swap it in without a full load.

## 2. Usual approach

Adopt a client-side routing framework. We all started hacking the browser to trick its own router -- history, back and forward -- into swapping content without a page load, and a war of routing frameworks followed. Each brought its own conventions, its own build and its own upgrade treadmill.

## 3. Dev0 approach

I wanted the transition, so I built it -- but only the transition. Seventeen lines listened for link clicks, fetched the target page, swapped the content region and pushed the new URL onto the browser's history. Every page remained a real HTML page at a real URL.

Today I would not build it at all. CSS view transitions give multi-page sites the smooth page changes single-page apps were built to fake, with one line of CSS and no JavaScript:

```css
@view-transition {
  navigation: auto;
}
```

## 4. Tests

- **Less** -- pass for the 17 lines; a routing framework fails. Seventeen lines of my own code against a framework and its transitive tree.
- **Separate** -- pass. The script enhanced pages that worked without it.
- **Legibility** -- pass. Seventeen lines can be read in a minute.
- **Native** -- fail in hindsight. The browser's own router was being fought with JavaScript; view transitions now do the job natively.
- **Beneficiary** -- fail. App-like transitions were something developers wanted. The vast majority of users neither cared nor noticed.
- **Control** -- pass. Plain JavaScript that every browser of the day ran.

## 5. Outcome

It failed two tests, so by Dev0's own rule it should not have been built -- but it shows the deeper point. Dev0 does not require you to be right. Removing 17 lines is trivial; removing a framework is a rewrite. Fewer parts make being wrong cheap.

It also shows that what is native outlives the fashion. Babel, single-page app routers and CSS-in-JS each filled a gap the platform later closed, then became debt. I build multi-page sites again, because they are inherently easier to build, and the browser does the rest.

## 6. Trade-offs

- Without a framework, every edge case -- scroll position, focus, failed fetches -- was mine to handle.
- View transitions are progressive enhancement: browsers that lack them simply navigate normally, which is the right failure.

[← Back to Examples](../README.md)
