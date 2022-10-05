---
title: The data is in - Your website sucks!
date: 2022-10-04
author: Dennis Lyth Frederiksen
tags: [featured]
category: Code
style: posts/2022-10-04/2022-10-04.scss
scripts: ["/js/lazyfit.js"]
snippet: "I ran 5241 popular Danish webshops through PageSpeed Insights to finally put my low opinion of them to the test. Are they objectively as bad as I’ve suspected? The title above may have spoiled the result. Read on anyway!"
img: /images/https://ik.imagekit.io/dlfdk/lythfrederiksen/blog/Posts/performance-wanted/DALL_E_2022-10-03_08.23.29_-_A_tiny_race_car_with_an_extremely_overweight_elephant_on_its_roof__sharpened_peUXawLdP.png
---

<section>

<p class="article__date">{{ date | postDate }}</p>

<h1 class="title">{{title}}</h1>

<img class="lazyfit img-float img-float--right img-float--hero img-float--pop-500" style="aspect-ratio: 1606/930; shape-outside: polygon(20.21% 11.04%, 18.81% 50.80%, 3.14% 59.81%, 16.99% 99.48%, 98.9% 99.77%, 84.98% 11.78%);" data-add-class="lazyfit--show" data-src="/images/https://ik.imagekit.io/dlfdk/lythfrederiksen/blog/Posts/performance-wanted/DALL_E_2022-10-03_08.23.29_-_A_tiny_race_car_with_an_extremely_overweight_elephant_on_its_roof__sharpened_peUXawLdP.png?tr=w-{width}" alt="{{img_alt}}">

I have a guilty pleasure.

No, it’s not watching terrible reality shows.

When I get an ad for a company that makes websites for others, I like to do a performance review of that company’s own site.

Why? 

Because I kinda enjoy seeing how badly they perform. It’s like watching motorsports for the crashes. But, you know, without the deaths.

And I can’t help but feel like I’m being lied to, when the company, who wants to sell me a high quality, performant website, have so clearly failed to build their own home on the web to the same standard.

While my unsolicited performance reviews don’t amount to any sort of empirical evidence for the sad state of the modern web, their consistent findings have nevertheless made me worried.

So, instead of worrying without a reason, let’s actually find out! In this post I’ll collect a whole bunch of data to finally conclude that yes, indeed, most websites suck!

</section>

<section>

<h2 id="the-data"><a title="Permalink to The data" href="#the-data">The data</a></h2>

The dataset consists of 3373 audits done using the PageSpeed Insights API. Audits were done as mobile-only.

The audited websites were a subset of 27350 sites collected from dk.trustpilot.com - the Danish subdomain of the review website Trustpilot - with at least 1 review published.

To get the number of sites down to a more manageable size, those with less than 100 reviews on Trustpilot were excluded.

Of the remaining 5241 sites, 528 returned errors upon running the audit, resulting in 4713 completed. Each audit took between 10 and 40 seconds to finish.

Part of the PageSpeed Insights audit is a report on real world performance metrics collected by actual users as part of CrUX. However, not every site had enough data collected on it to compute these metrics, leaving some or all of these fields empty in the audit. Websites without all metrics available were filtered out. 3373 websites were left.

Each audit was delivered as a JSON-file and then parsed with Node.

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

The average performance score across the audited sites was 36. Thirty-six. A whopping 78% percent scored below 50 - what Google regards as “poor” performance. Only 1.2% scored above 89, achieving the label of “good”. [To provide a good user experience, sites should strive to have a good score (90-100)](https://web.dev/performance-scoring/), as Google puts it.

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

There’s a lot of data to look at in a single audit let alone 3373, and there’s no doubt potential for many interesting comparisons and analyses. For now, however, let’s move briskly along to the performance numbers collected from real world users. Again we're looking at data from mobile only.

PSI classifies the quality of user experiences into three buckets - Poor, Needs Improvement, Good - and reports the proportion of users in each for six different metrics. [The specific criteria used are available here](https://developers.google.com/speed/docs/insights/v5/about). Ideally, all users would get the Good experience, but alas, the real world is complicated. The newest iPhone on an excellent 5G connection is going to perform better than a 10 year old android phone on slow 3G. Google uses the 75th percentile to give a metric its overall classification. That is, at least 75% of users had that experience or better.

The graphic below shows the distribution of overall classifications across the audited sites.

<figure class="le">
    <div class="le__group">
        <div class="le__share" style="--height: 17px">
            <div>
                17<span>%</span>
            </div>
            <div></div>
        </div>
        <div class="le__share" style="--height: 20px">
            <div>
                20<span>%</span>
            </div>
            <div></div>
        </div>
        <div class="le__share" style="--height: 63px">
            <div>
                63<span>%</span>
            </div>
            <div></div>
         </div>
        <div class="le__metric">Cumulative layout shift</div>
    </div>
    <div class="le__group">
        <div class="le__share" style="--height: 3.6px">
            <div>
                3.6<span>%</span>
            </div>
            <div></div>
        </div>
        <div class="le__share" style="--height: 45px">
            <div>
                45<span>%</span>
            </div>
            <div></div>
        </div>
        <div class="le__share" style="--height: 52px">
            <div>
                52<span>%</span>
            </div>
            <div></div>
         </div>
        <div class="le__metric">Interaction to next paint</div>
    </div>
    <div class="le__group">
        <div class="le__share" style="--height: 11px">
            <div>
                11<span>%</span>
            </div>
            <div></div>
        </div>
        <div class="le__share" style="--height: 41px">
            <div>
                41<span>%</span>
            </div>
            <div></div>
        </div>
        <div class="le__share" style="--height: 48px">
            <div>
                48<span>%</span>
            </div>
            <div></div>
         </div>
        <div class="le__metric">Time to first byte</div>
    </div>
    <div class="le__group">
        <div class="le__share" style="--height: 6.4px">
            <div>
                6.4<span>%</span>
            </div>
            <div></div>
        </div>
        <div class="le__share" style="--height: 24px">
            <div>
                24<span>%</span>
            </div>
            <div></div>
        </div>
        <div class="le__share" style="--height: 70px">
            <div>
                70<span>%</span>
            </div>
            <div></div>
         </div>
        <div class="le__metric">First contentful paint</div>
    </div>
    <div class="le__group">
        <div class="le__share" style="--height: 0.3px">
            <div>
                0.3<span>%</span>
            </div>
            <div></div>
        </div>
        <div class="le__share" style="--height: 1.4px">
            <div>
                1.4<span>%</span>
            </div>
            <div></div>
        </div>
        <div class="le__share" style="--height: 98px">
            <div>
                98<span>%</span>
            </div>
            <div></div>
         </div>
        <div class="le__metric">First input delay</div>
    </div>
    <div class="le__group">
        <div class="le__share" style="--height: 6.3px">
            <div>
                6.3<span>%</span>
            </div>
            <div></div>
        </div>
        <div class="le__share" style="--height: 30px">
            <div>
                30<span>%</span>
            </div>
            <div></div>
        </div>
        <div class="le__share" style="--height: 63px">
            <div>
                63<span>%</span>
            </div>
            <div></div>
         </div>
        <div class="le__metric">Largest contentful paint</div>
    </div>
    <figcaption>User experience classification across all audited sites (left to right: Poor, Needs improvement, Good)</figcaption>
</figure>

Suddenly the results aren’t too shabby! In all metrics the majority of sites get the classification Good. Great! The proportion of sites earning the dreaded Poor classification never exceed 17%, and First Input Delay is clearly a complete non-issue.

Not so fast, though. It’s possible for a specific site to excel in most metrics, but offer such a low score in one or two that it nevertheless makes for a terrible experience for the majority of users.

That's what Google accounts for in the overall classification of user experience. Here, [the result will be equal to the lowest performing metric](https://support.google.com/webmasters/answer/9205520?hl=en) between Cumulative Layout Shift, First Contentful Paint and First Input Delay (the so-called [core web vitals](https://web.dev/vitals/#core-web-vitals)). If a site scores Good in 2 out of 3, but Poor in the last, the overall classification will be Poor.

Let's take a look at the distribution of those overall classifications:

<figure class="le-total">
    <div class="le-total__bars">
        <div style="--height: 58%"></div>
        <div style="--height: 100%"></div>
        <div style="--height: 36%"></div>
    </div>
    <div class="le-total__labels">
        <div>Poor</div>
        <div>Needs improvement</div>
        <div>Good</div>
    </div>
    <figcaption>Distribution of overall user experience classification</figcaption>
</figure>

The number of sites that can offer a Good experience to most users shrinks considerably. Now only 18% get that. At least Poor remains the minority!

It should also be noted that these real world metrics are from a very particular subset of users: [those who use Chrome (iOS-version not included), have enabled usage statistic reporting and and sync their browser history](https://developer.chrome.com/docs/crux/methodology/#user-eligibility).

</section>


<section>
<h2 id="struggling-to-convert-mobile-users"><a title="Permalink to Struggling to convert mobile users?" href="#struggling-to-convert-mobile-users">Struggling to convert mobile users?</a></h2>

It can be tempting to ignore the terrible results from the simulated Moto G4 and focus on the real world user metrics. After all, it’s the real users who count, right? Clearly, they’re mostly getting a decent experience. And only real users can turn into real customers! 

<img class="lazyfit img-float img-float--left img-float--pop-500" style="aspect-ratio: 1683/908; shape-outside: polygon(1.18% 10.95%, -0.93% 99.6%, 79.71% 101.52%, 97.91% 49.23%, 83.47% 11.03%);" data-add-class="lazyfit--show" data-src="/images/https://ik.imagekit.io/dlfdk/lythfrederiksen/blog/Posts/performance-wanted/DALL_E_2022-10-03_08.39.54_-_A_tiny_pickup_truck_with_an_extremely_overweight_elephant_on_its_truckbed__cropped_QbIZYSvJO.png?tr=w-{width}" alt="">

But before you do so, go ahead and look up your conversion rates by device type. Maybe you already know what I’m hinting at. Could it be that your much lower conversion rate on mobile is in part due to the terrible performance those mobile users are likely to experience?

Perhaps the conversion rates you see aren't even accurate. Is a mobile user on a slow device and connection going to stick around long enough for your slew of analytics scripts to even count them?

And sure, you probably have a super fancy responsive design that adjusts itself according to screen size - even the smallest ones! That's a good start. But a mobile friendly website requires more than media queries.

*Article illustrations generated by [DALL-E 2](https://openai.com/dall-e-2/)*

</section>

<section>

<h2 id="get-the-data"><a title="Permalink to Get the data" href="#get-the-data">Get the data</a></h2>

Feel like poring over the data yourself? Please do! It’s about 900MB (2GB uncompressed) in total and comes in the form of 4713 json-files assembled in a zip-archive.

[Audits Zip-archive](https://pub-9615e2e12975430f8e4d54675d10297c.r2.dev/audits.zip)

</section>