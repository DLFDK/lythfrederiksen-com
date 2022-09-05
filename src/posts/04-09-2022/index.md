---
title: Grid gut - and save a few bits in the process!
date: 2022-09-04
author: Dennis Lyth Frederiksen
tags: [featured]
category: Code
topic: New Portfolio Site
style: posts/04-09-2022/04-09-2022.scss
scripts: ["/js/lazyfit.js", "/js/highlight.min.js"]
snippet: "In this short post I want to highlight a neat use for Grid that I came across while building my Stripe imitation. See how you can cut down on both markup and styling complexity."
img: /images/https://ik.imagekit.io/dlfdk/lythfrederiksen/blog/Posts/grid-gut/markus-spiske-ruudayIzfJI-unsplash_CftAlZkmV.jpg
---
<script onload="hljs.highlightAll()"defer src="/js/highlight.min.js"></script>
<section>

<h1 class="title">{{title}}</h1>

When CSS Grid became widely available in the spring of '17 it not only gave us a fantastic tool to build new and exciting layouts, it also made it possible to weed out much of the complexity that older layout algorithms had forced us to sprinkle everywhere across our HTML and CSS.

In this short post I’d like to highlight a neat use for Grid that I came across while building [my Stripe imitation](/projects/dollar-store-stripe/), which managed to cut down on both markup and styling complexity. As someone much smarter than me once said: Why waste bits write lot HTML CSS, when few bits do trick? (Autocorrect is yelling at me right now)

Let's first look at what I recreated:

<div class="image" style="aspect-ratio: 1600/1006">
<img class="lazyfit" data-add-class="lazyfit--show" src="" data-src="https://ik.imagekit.io/dlfdk/lythfrederiksen/blog/Posts/grid-gut/Stripe-stripes_gHiRwhHSb.png" alt="">
<div class="image__circle"></div>
<svg class="image__arrow" viewBox="0 0 500 511.61"><path d="m281.46 249.66-15.5-101.27c-.57-3.8.47-7.81 3.19-10.93 4.92-5.64 13.5-6.24 19.14-1.32l207.07 180.38 1.53 1.59c4.77 5.76 3.96 14.32-1.8 19.08L288.02 508.53c-2.99 2.41-6.96 3.59-11.03 2.87-7.34-1.32-12.23-8.36-10.91-15.69l15.44-85.83c-17.98-2.09-37.59-6.57-57.77-13.36-52.66-17.69-109.96-51.41-153.32-100.33C26.64 246.79-3.02 181.98.25 102.58 1.42 73.66 7 42.84 17.88 10.23 19.22 4.95 23.7.78 29.43.1c7.44-.88 14.19 4.44 15.06 11.87 11.93 100.08 50.53 158.11 98.25 191.8 42.65 30.12 93.19 41.35 138.72 45.89z"></path></svg>
</div>

The stripes of Stripe, essentially. Small pieces of flavor to mark the transition from one section to the next. What’s not captured in the screenshot is the extremely subtle sliding effect caused by translating the two short stripes according to the viewport position, so that the overlap between the long and short stripes increases as the user scrolls down. It is only about 13 pixels, so I bet most don’t notice. I certainly didn’t!

The markup consists of 8 divs in two groups of 4, with a handful of classes on each to apply the styling that amounts to about 150 lines of CSS. Granted, many of those are custom properties and associated infrastructure, but it does give a decent impression of the complexity at play nonetheless.

The original implementation uses absolute positioning and about 16 calc(...) functions to get the job done. The sliding effect is handled with Javascript and a basic translation. Note that the color of the overlap isn’t due to an opacity effect, but an actual third stripe sitting in between the two bigger ones to create the illusion of color mixing.

My implementation uses a single parent div with 6 children divs, where all styling happens on the parent with the help of child-selectors. This is what it looks like using the grid-inspector in Firefox:

<div class="image" style="aspect-ratio: 1600/591">
<img class="lazyfit" data-add-class="lazyfit--show" src="" data-src="https://ik.imagekit.io/dlfdk/lythfrederiksen/blog/Posts/grid-gut/Regular-grid_uKzu3ei8x.png" alt="">
</div>

The parent div needs just a handful of properties on it, with each of the six children elements sitting at about the same. I chose not to implement the sliding effect as I deemed it too subtle to warrant the extra javascript, but the choice of a grid layout wouldn’t be an obstacle.

From the sass-file:

<div class="code">

```
&__stripe {
    @include slant($stripe-white);
    display: grid;
    grid-template-columns: 
        minmax(16px, 1fr) 
        minmax(0, 1080px) 
        minmax(16px, 1fr);
    grid-template-rows: 30px 10px 30px 1fr 30px 10px 30px;

    & div:nth-child(1) {
        grid-column: 3;
        grid-row: 1/3;
        background: #80e9ff;
        width: calc(100% + min(10vw, 140px));
        justify-self: end;
    }

    & div:nth-child(2) {
        grid-column: 3;
        grid-row: 2/4;
        background: #7a73ff;
        width: 160px;
    }

    ...
```

</div>

To me, the use of Grid makes the markup and styling much, much easier to reason about. Even without the use of well-named custom properties, it isn’t difficult to figure out what values must be adjusted should the intersection need to be widened for instance. This is aided greatly by grid-inspection tools. Although the grid only sizes the height (rows) of the stripes, it creates stable and easily handled anchors points that would have taken much more work to find using absolute positioning.

An option to further minimize the styling on the children remains. It does result in a pretty gnarly looking grid-column-property and is definitely not as easy to approach as the first solution. 

<div class="code">

```
&__stripe{
    @include slant($stripe-white);
    display: grid;
    grid-template-columns: 
        minmax(0px, 1fr) 
        clamp(16px, 16px + 100vw - $content-max-width, 160px) 
        min(5vw, 70px) 
        minmax(0, calc($content-max-width / 2 - min(5vw, 70px))) 
        minmax(0, calc($content-max-width / 2 - min(10vw, 140px))) 
        min(10vw, 140px) 
        clamp(16px, 16px + 100vw - $content-max-width, 160px) 
        minmax(0, 1fr);
    grid-template-rows: 30px 10px 30px 1fr 30px 10px 30px;

    & div:nth-child(1) {
        grid-column: 6/-1;
        grid-row: 1/3;
        background: #80e9ff;
    }

    & div:nth-child(2) {
        grid-column: 7/8;
        grid-row: 2/4;
        background: #7a73ff;
    }

    ...
```

</div>

Some of the ugliness can be amended by naming the columns, using custom properties and sass-variables, and by recognizing the symmetry at play. Notice how both height and width of the children divs are now entirely determined by the grid.

<div class="image" style="aspect-ratio: 1600/577">
<img class="lazyfit" data-add-class="lazyfit--show" src="" data-src="https://ik.imagekit.io/dlfdk/lythfrederiksen/blog/Posts/grid-gut/Gnarly-grid_CXFOf1bFpu.png" alt="">
</div>

</section>

<section>

- Blog page snippet photo by <a href="https://unsplash.com/@markusspiske?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Markus Spiske</a> on <a href="https://unsplash.com/s/photos/grid?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>

</section>

<!-- <div class="StripeSet StripeSet--TopRight StripeSet--layoutIntersecting" data-js-controller="StripeSet" aria-hidden="true">
    <div class="Stripe Stripe--accentNone Stripe--variantSolid Stripe--insetNormal Stripe--widthFull" aria-hidden="true" data-js-target-list="StripeSet.stripes"></div>
    <div class="Stripe Stripe--accentNone Stripe--variantSolid Stripe--insetNone Stripe--widthNormal" aria-hidden="true" data-js-target-list="StripeSet.stripes" style="transform: translateY(-13.5px);"></div>
    <div class="Stripe Stripe--accentNone Stripe--variantIntersection Stripe--insetNormal Stripe--widthFull Stripe--intersectionInsetNone Stripe--intersectionWidthNormal" aria-hidden="true" data-js-target-list="StripeSet.stripes">
        <div class="Stripe__intersection" data-js-target="StripeSet.intersection" style="transform: translateY(-13.75px);"></div>
    </div>
</div>
<div class="StripeSet StripeSet--BottomLeft StripeSet--layoutIntersecting" data-js-controller="StripeSet" aria-hidden="true" data-js-align="End">
    <div class="Stripe Stripe--accentNone Stripe--variantSolid Stripe--insetNone Stripe--widthNormal" aria-hidden="true" data-js-target-list="StripeSet.stripes" style="transform: translateY(5.5px);"> </div>
    <div class="Stripe Stripe--accentNone Stripe--variantSolid Stripe--insetSmall Stripe--widthFull" aria-hidden="true" data-js-target-list="StripeSet.stripes"></div>
    <div class="Stripe Stripe--accentNone Stripe--variantIntersection Stripe--insetNone Stripe--widthNormal Stripe--intersectionInsetSmall Stripe--intersectionWidthFull" aria-hidden="true" data-js-target-list="StripeSet.stripes" style="transform: translateY(5.5px);">
        <div class="Stripe__intersection" data-js-target="StripeSet.intersection" style="transform: translateY(-5.75px);"></div>
  </div>
</div> -->