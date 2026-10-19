# A Single-Page App in 17 Lines <!-- omit in toc -->

In 2014, I rebuilt my own website as a single-page app. It was arguably the wrong architectural call—but because the routing was just 17 lines of Vanilla JS rather than a heavy framework, being wrong cost me almost nothing.

## Table of Contents <!-- omit in toc -->

- [1. Context](#1-context)
- [2. Usual approach](#2-usual-approach)
- [3. Dev0 approach](#3-dev0-approach)
- [4. Tests](#4-tests)
- [5. Outcome](#5-outcome)
- [6. Trade-offs](#6-trade-offs)

## 1. Context

Around 2010, the industry became obsessed with making websites feel like native apps, primarily by eliminating the flicker of full page loads. Single-page apps (SPAs) were the fashionable answer: intercept the navigation with JavaScript, fetch the next page's content, and swap it directly into the DOM.

## 2. Usual approach

Adopt a bloated client-side routing framework. The industry started violently hacking the browser to trick its native router (history, back, and forward buttons) into swapping content without a true page load. A war of routing frameworks followed, each bringing its own heavy conventions, mandatory build steps, and perpetual upgrade treadmills.

## 3. Dev0 approach

I wanted the smooth transition, so I built exactly that—and absolutely nothing else. Seventeen lines of Vanilla JS listened for link clicks, fetched the target HTML page, swapped the content region, and pushed the new URL onto the browser's history stack. Every single page remained a real, server-rendered HTML document at a real URL.

Today, I wouldn't write this JavaScript at all. Native CSS view transitions give standard multi-page sites the exact same smooth transitions that SPAs were originally built to fake, using a single line of CSS and absolutely zero JavaScript:

```css
@view-transition {
  navigation: auto;
}
```

## 4. Tests

| Test            | Dev0 (17 lines) | Frameworks | Rationale                                                                                                                                    |
| :-------------- | :-------------: | :--------: | :------------------------------------------------------------------------------------------------------------------------------------------- |
| **Less**        |       ✅        |     ❌     | Seventeen lines of my own Vanilla JS versus a heavy framework and its massive transitive dependency tree.                                    |
| **Separate**    |       ✅        |     ❌     | The tiny script merely enhanced perfectly valid HTML pages that already worked natively without it.                                          |
| **Legibility**  |       ✅        |     ❌     | You can read and fully comprehend seventeen lines of JS in under a minute.                                                                   |
| **Native**      |       ❌        |     ❌     | Both failed in hindsight. We were fighting the browser's native router with JavaScript. Today, CSS view transitions pass this test natively. |
| **Beneficiary** |       ❌        |     ❌     | Both failed. App-like transitions were a vanity metric developers wanted. The vast majority of users neither noticed nor cared.              |
| **Control**     |       ✅        |     ➖     | Plain, standard JavaScript that every browser of the day ran perfectly natively.                                                             |

## 5. Outcome

It failed two tests, so strictly by Dev0's own rules, it should not have been built. But this illustrates the deeper point: Dev0 does not require you to be right. Deleting 17 lines of JavaScript is trivial; removing an entire SPA routing framework is a devastating rewrite. Having fewer parts makes being wrong incredibly cheap.

It also proves that what is native outlives the fashion. Babel, SPA routers, and CSS-in-JS each temporarily filled a gap the platform later closed natively, instantly turning those tools into legacy technical debt. I build multi-page sites (MPAs) again, because they are inherently simpler, and the browser handles the rest.

## 6. Trade-offs

- Modern CSS view transitions are true progressive enhancement: browsers that lack support simply navigate normally, which is exactly the right failure mode.

[← Back to Examples](../README.md)
