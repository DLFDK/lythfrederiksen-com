---
title: Your website sucks! Probably
date: 2022-10-04
author: Dennis Lyth Frederiksen
tags: [featured]
category: Code
style: posts/2022-10-04/2022-10-04.scss
scripts: ["/js/lazyfit.js"]
snippet: "I’m a pixel-pincher. You know, like a penny-pincher but with pixels? Anyway, I hate sending along pixels that don’t end up on the screen. It’s wasteful and I don’t like it! In this blog post I detail how I load perfectly sized images using a tiny bit of javascript and an image CDN. Full code included!"
img: /images/https://ik.imagekit.io/dlfdk/lythfrederiksen/blog/Posts/pixel-perfect/Painting_within_a_frame_eBEbYajVG.png
---

<section>

<p class="article__date">{{ date | postDate }}</p>

<h1 class="title">{{title}}</h1>

I have a guilty pleasure.

No, it’s not watching terrible reality shows. Erm, it’s not only watching terrible reality shows.

When I get an ad for a company that makes websites for others, I like to do a performance review of that company’s own site.

Why?

Because I kinda enjoy seeing how badly they perform. It’s like watching motorsports for the crashes. But, you know, without the deaths.

And I can’t help but feel like I’m being lied to, when the company, who wants to sell me a high quality, performant website, have so clearly failed to build their own home on the web to the same standard. If you can’t achieve it at home, there’s no chance in hell you’ll achieve it when the client’s requirements enter the fray.

While these unsolicited performance reviews don’t amount to any sort of empirical evidence for the sad state of the modern web, their consistent findings have nevertheless made me worried.

So, instead of worrying without a reason, let’s actually find out! In this post I’ll collect a whole bunch of data to finally conclude that yes, indeed, most websites suck!

</section>

<section>

<h2 id="the-data"><a title="Permalink to The data" href="#the-data">The data</a></h2>

The dataset consists of 3373 audits done using the PageSpeed Insights API. Audits were done as mobile-only.

The audited websites were a subset of 27350 sites collected from dk.trustpilot.com - the Danish subdomain of the review website Trustpilot - with at least 1 review published.

To get the number of sites down to a more manageable size, those with less than 100 reviews on Trustpilot were excluded.

Of the remaining 5241 sites, 528 returned errors upon running the audit, resulting in 4713 completed. Each audit took between 10 and 40 seconds to finish.

Part of the PageSpeed Insights audit is a report on real world performance metrics collected by actual users as part of CrUX. However, not every site had enough data collected on it to compute these metrics, leaving some or all of these fields empty in the audit. Websites without all metrics available were filtered out. 3373 websites were left.

<figure class="data-selection">
    <div class="data-selection__group">
        <div class="data-selection__bar"></div>
        <div class="data-selection__number">27350</div>
        <div class="data-selection__label">Sites on dk.trustpilot.com</div>
    </div>
    <div class="data-selection__group">
        <div class="data-selection__bar"></div>
        <div class="data-selection__number">5241</div>
        <div class="data-selection__label">Sites with >100 reviews</div>
    </div>
    <div class="data-selection__group">
        <div class="data-selection__bar"></div>
        <div class="data-selection__number">4713</div>
        <div class="data-selection__label">Audits run successfully</div>
    </div>
    <div class="data-selection__group">
        <div class="data-selection__bar"></div>
        <div class="data-selection__number">3373</div>
        <div class="data-selection__label">Audits with all metrics</div>
    </div>
    <figcaption>Overview of data selection</figcaption>
</figure>

Each audit was delivered as a JSON-file, which I parsed with a bit of javascript running in Node.

</section>

<section>

<h2 id="the-results"><a title="Permalink to The results" href="#the-results">The results</a></h2>

So, with the numbers in hand, is it as bad as I feared?

Yes!

And no. It’s complicated. But mostly yes, unfortunately. Let’s start with the results from the simulated Moto G4 on a slow 4G network.

<figure class="histogram">
    <div class="histogram__bars">
        <div style="--height: 19%"></div>
        <div style="--height: 63%"></div>
        <div style="--height: 100%"></div>
        <div style="--height: 71%"></div>
        <div style="--height: 54%"></div>
        <div style="--height: 38%"></div>
        <div style="--height: 21%"></div>
        <div style="--height: 14%"></div>
        <div style="--height: 9%"></div>
        <div style="--height: 4%"></div>
    </div>
    <div class="histogram__labels">
        <div>10</div>
        <div>20</div>
        <div>30</div>
        <div>40</div>
        <div>50</div>
        <div>60</div>
        <div>70</div>
        <div>80</div>
        <div>90</div>
    </div>
    <figcaption>Histogram of performance scores</figcaption>
</figure>

The average performance score across the audited sites was 36. Thirty-six. A whopping 78% percent scored below 50 - what Google regards as “poor” performance. Only 1.2% scored above 89, achieving the label of “good”. To provide a good user experience, sites should strive to have a good score (90-100), as Google puts it.

Let’s have a look at the six metrics that make up the overall performance score:

<figure class="six-metrics">
    <div class="six-metrics__metric">
        <div class="six-metrics__background"></div>
        <div>FCP</div>
        <div>3.6<span> s</span></div>
    </div>
    <div class="six-metrics__metric">
        <div class="six-metrics__background"></div>
        <div>SI</div>
        <div>8.3<span> s</span></div>
    </div>
    <div class="six-metrics__metric">
        <div class="six-metrics__background"></div>
        <div>LCP</div>
        <div>10<span> s</span></div>
    </div>
    <div class="six-metrics__metric">
        <div class="six-metrics__background"></div>
        <div>TTI</div>
        <div>14<span> s</span></div>
    </div>
    <div class="six-metrics__metric">
        <div class="six-metrics__background"></div>
        <div>TBT</div>
        <div>1.5<span> s</span></div>
    </div>
    <div class="six-metrics__metric">
        <div class="six-metrics__background"></div>
        <div>CLS</div>
        <div>0.22</div>
    </div>
    <figcaption>Average scores for the six core metrics</figcaption>
</figure>

Here, only the average cumulative layout shift (CLS) gets anywhere close to acceptable levels. The rest sit firmly in the red. Imagine having to wait 14 seconds for a site to become interactive! That’s of course if you even bother to wait around almost 4 seconds for anything to appear on the page in the first place!

When possible, the audit also tries to offer suggestions for specific improvements. Among these are potential savings from removing unused javascript and CSS and the use of right sized images delivered in modern formats like WebP.

<figure class="unused-bytes">
    <div class="unused-bytes__bars">
        <div style="--height: 4%"></div>
        <div style="--height: 26%"></div>
        <div style="--height: 69%"></div>
        <div style="--height: 100%"></div>
    </div>
    <div class="unused-bytes__labels">
        <div>CSS</div>
        <div>JS</div>
        <div>Img</div>
        <div>Total</div>
    </div>
    <figcaption>Potential for savings across CSS, JS and images</figcaption>
</figure>

On average the sites stand to save 1.2 MB. Do you have any idea how much website you can get for one-point-two megabytes?! Well, it’s a lot! Even an image-heavy landing page should be able to fit within that budget if below-the-fold content is deferred.

Alright, let’s move to the performance numbers collected from real world users. Like the synthetic results above, we’ll be looking at numbers from mobile devices.

PSI classifies the quality of user experiences into three buckets - Slow, Average, Fast. The specific criteria used are available here. The numbers below show the average distribution across these buckets for each metric.

<figure class="le">
    <div class="le__group">
        <div class="le__share" style="--height: 13px">
            <div>
                13<span>%</span>
            </div>
            <div></div>
        </div>
        <div class="le__share" style="--height: 10px">
            <div>
                10<span>%</span>
            </div>
            <div></div>
        </div>
        <div class="le__share" style="--height: 70px">
            <div>
                77<span>%</span>
            </div>
            <div></div>
         </div>
        <div class="le__metric">Cumulative layout shift</div>
    </div>
    <div class="le__group">
        <div class="le__share" style="--height: 8px">
            <div>
                8<span>%</span>
            </div>
            <div></div>
        </div>
        <div class="le__share" style="--height: 20px">
            <div>
                20<span>%</span>
            </div>
            <div></div>
        </div>
        <div class="le__share" style="--height: 72px">
            <div>
                72<span>%</span>
            </div>
            <div></div>
         </div>
        <div class="le__metric">Interaction to next paint</div>
    </div>
    <div class="le__group">
        <div class="le__share" style="--height: 10px">
            <div>
                10<span>%</span>
            </div>
            <div></div>
        </div>
        <div class="le__share" style="--height: 22px">
            <div>
                22<span>%</span>
            </div>
            <div></div>
        </div>
        <div class="le__share" style="--height: 68px">
            <div>
                68<span>%</span>
            </div>
            <div></div>
         </div>
        <div class="le__metric">Time to first byte</div>
    </div>
    <div class="le__group">
        <div class="le__share" style="--height: 7px">
            <div>
                7<span>%</span>
            </div>
            <div></div>
        </div>
        <div class="le__share" style="--height: 14px">
            <div>
                14<span>%</span>
            </div>
            <div></div>
        </div>
        <div class="le__share" style="--height: 79px">
            <div>
                79<span>%</span>
            </div>
            <div></div>
         </div>
        <div class="le__metric">First contentful paint</div>
    </div>
    <div class="le__group">
        <div class="le__share" style="--height: 2px">
            <div>
                2<span>%</span>
            </div>
            <div></div>
        </div>
        <div class="le__share" style="--height: 5px">
            <div>
                5<span>%</span>
            </div>
            <div></div>
        </div>
        <div class="le__share" style="--height: 93px">
            <div>
                93<span>%</span>
            </div>
            <div></div>
         </div>
        <div class="le__metric">First input delay</div>
    </div>
    <div class="le__group">
        <div class="le__share" style="--height: 8px">
            <div>
                8<span>%</span>
            </div>
            <div></div>
        </div>
        <div class="le__share" style="--height: 15px">
            <div>
                15<span>%</span>
            </div>
            <div></div>
        </div>
        <div class="le__share" style="--height: 77px">
            <div>
                77<span>%</span>
            </div>
            <div></div>
         </div>
        <div class="le__metric">Largest contentful paint</div>
    </div>
    <figcaption>User experience ratios (left to right: Slow, Average, Fast)</figcaption>
</figure>

Suddenly the results aren’t too shabby! At a minimum, two thirds get the Fast experience while the Slow group never makes up more than 13%. Great!

These are averages, though, and it’s possible for a site to excel in most metrics, but offer such a low score in one or two that it nevertheless makes for a terrible user experience.

The audit also gives an overall score for these real world metrics:

<figure class="le-total">
    <div class="le-total__bars">
        <div style="--height: 58%"></div>
        <div style="--height: 100%"></div>
        <div style="--height: 36%"></div>
    </div>
    <div class="le-total__labels">
        <div>Slow</div>
        <div>Average</div>
        <div>Fast</div>
    </div>
    <figcaption>Overall user experience ratios</figcaption>
</figure>

The number of sites that can offer a Fast experience shrinks considerably, but at least the Slow group remains a minority.

</section>
