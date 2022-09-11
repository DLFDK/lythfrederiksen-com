---
title: Dollar Store Stripe
date: 2022-09-01
tags: [featured]
list: new-portfolio-site
category: Code
style: projects/new-portfolio-site/new-portfolio-site.scss
scripts: ["/js/lazyfit.js"]
snippet: Does this site remind you of anything? Perhaps a certain well known payment provider? No, not PayPal, come on! This is the story of why and how this site came to be a Stripe.com imitation rather than an original creation pulled from the depths of my artistic mind (ha). Time for a little introspection!
img: /images/https://ik.imagekit.io/dlfdk/lythfrederiksen/projects/new-portfolio-site/DALL_E_2022-08-31_08.49.32_-_A_robot_is_painting_a_painting_of_robots__pencil_drawn-colored_3mieB_f-p.png
img_article: https://ik.imagekit.io/dlfdk/lythfrederiksen/projects/new-portfolio-site/DALL_E_2022-08-31_08.49.32_-_A_robot_is_painting_a_painting_of_robots__pencil_drawn-edited_2UVPtTCuL.png
img_alt: A robot is painting a painting of another robot, pencil drawn, black and white
---

<section>

<img class="lazyfit image image--right image--hero image--pop-500" style="shape-outside: polygon(30% 2%, 31% 28%, 7% 28%, 8% 40%, 4% 42%, 4% 62%, 8% 65%, 8% 75%, 0% 75%, 0% 100%, 100% 100%, 100% 2%);" data-add-class="lazyfit--show" data-src="/images/https://ik.imagekit.io/dlfdk/lythfrederiksen/projects/new-portfolio-site/DALL_E_2022-08-31_08.49.32_-_A_robot_is_painting_a_painting_of_robots__pencil_drawn-edited_2UVPtTCuL.png?tr=w-{width}" alt="">

<p class="article__date">{{ date | postDate }}</p>

<h1 class="title">{{title}}</h1>

There’s a strong connection between the mastery of a skill and the novelty one can display with it. We expect the master to be novel, the apprentice to mimic. Only once you’ve made it to the outskirts of all we know, can you hope to discover something we don’t. For the apprentice, this journey, the display of novelty, becomes the path to advancement.

As a largely unproven web developer, it initially seemed obvious to me that my new portfolio site, my new home on the internet, ought to be one such display of novelty. Perhaps a technical feat with three.js? Or a groundbreaking hypermorphism years ahead of Dribbble? What about something unnecessarily rewritten in Rust, made browser-relevant and compiled to Webassembly?!

No - I decided to be the apprentice I still am. I decided to mimic. To reimplement. To recreate what others much more experienced than me had already done. Here’s the story of why and how I decided to create a Stripe.com imitation as my new personal website in lieu of being novel.

</section>

<section>

<h2 id="the-why"><a aria-label="Permalink to The why" href="#the-why">The why</a></h2>

A novel site would demand a novel design - and I’m not a designer. Heard that excuse before? It’s true, though!

Design is not what drives me to build websites. I’d much rather spend an hour contemplating whether a given heading should be an h2 or h3, than spend it trying to find a fitting font. I geek out over cumulative layout shift and compression algorithms, not color spaces and letter spacing. You’re much more likely to catch me watching a talk on the newest Javascript framework than scouring Dribbble for the latest design trends. I’m repeating myself.

And it’s not merely a preference arising due to a skill gap. No, it has been this way since I knew jack shit about either. I’m an engineer, not an artist. A developer, not a designer. Can I get away with it in a pinch? Sure! But it’s not something you’d ever want to count on long term.

I dread making design decisions. I truly enjoy writing the markup, styling and javascript that implements them. That’s what it boils down to and what initially pushed me towards exploring the idea of building an imitation.

It wouldn’t be enough to go in that direction, though. Sometimes the dreadful bits are just unavoidable, an inherent part of the journey towards our destination. And wouldn’t I simply be stealing someone else’s work as a way to get around my own laziness and lack of design skills?!

If the reason for building an imitation rested only on design-aversion that argument could definitely be made. Even more so if the imitation didn’t reveal its heritage in any form and tried to present itself as an original. That’d be straight up, inexcusable plagiarism. Probably illegal too. And I’m not a crook! Here the right way forward would be to buy a finished design. As a bespoke creation according to my needs or picked from a catalog of existing ones. In other words: hire a designer.

But building an imitation is not only about the design - or the UX more generally speaking. It is just as much about the markup, styling and javascript that brings it to life. Because we have access to the full implementation of the original and not merely a design specification, we are granted a wonderful opportunity to marvel at, analyze, learn from and criticize the engineering that went into it. This becomes the foundation on which we are challenged to build our own - one which is perhaps even better.

<img class="lazyfit image image--left image--small image--pop-500" style="shape-outside: polygon(0.98% 0.28%, -0.93% 99.6%, 91.48% 99.17%, 92.29% 92.34%, 88.19% 87.93%, 99.37% -0.9%);" data-add-class="lazyfit--show" data-src="/images/https://ik.imagekit.io/dlfdk/lythfrederiksen/projects/new-portfolio-site/DALL_E_2022-09-11_02.16.38_cE10BR8-o.png?tr=w-{width}" alt="">

An imitation is not a clone, however. The goal isn’t to build a pixel-perfect lookalike indistinguishable from the original. While that can certainly be worthwhile too, it leaves many learning opportunities untapped. For anything that must reach the global web, there’d also be concerns regarding content copyrights. Instead, a site imitation, as I wish to define it here, takes the key features of the original and applies them to new content, extending the design where needed while maintaining overall consistency. As such, it is not a pathway for those who want to entirely avoid design work. The original design does make for a very helpful and illuminating guide, though! It is a very worthwhile endeavor even for someone as design-averse as I.

Exactly how worthwhile depends on the site being imitated. Just as not all poems yield interesting insights upon analysis, not all infrastructure projects make for valuable case studies and not all software post-mortems produce useful lessons, not all websites are worth the process of imitation. It depends entirely on what we’re trying to learn.

I wanted to learn more about the parts that go into making a great landing page. My portfolio site was going to have a landing page at its heart and so focusing on that made a great deal of sense.

I can’t claim to have considered a lot of options here: Stripe.com immediately sprang to mind and while I did consider alternatives, none ever got close to besting it. The position of Stripe as an industry leader in both design and engineering holds tremendous value as its products come to represent a de facto standard of sorts. We can reasonably expect every last detail of the company’s landing page to have been pored over and debated, every decision scrutinized and an untold number of variations A/B-tested. It is only then our analysis and questioning becomes worthwhile. If the answers to the many questions of why things are the way they are were to simply amount to “dunno”, there’d be very little of value to find. 

That certainly doesn’t mean it must be without faults, however. On the contrary, faults, places where we’d reckon an optimization is in order or a better engineering decision can be made, make for some of the most exciting discoveries! And equally nerve-wracking blog posts when you work up the courage to share them. “Have I really found a fault, or am I just dumb?” In a perfect world we’d be able to interview the original authors along the way and bombard them with all the questions, which the code itself doesn’t answer. Wouldn’t that be nice? I bet the consulting fees wouldn’t.

Aside from its industry position, the content slots - sections of text and images - on Stripe.com also fit well with the content I had in mind, thereby minimizing design work. Woohoo! At an early point in the process I considered both nytimes.com and gov.uk for their leadership in their respective categories, but neither were close enough to the landing-page-portfolio-hybrid style I was looking for.

The web gives us a wonderful opportunity to study the best, the worst and everyone else in between. We’re not sending compiled binaries across the wire. We’re sending the code itself. HTML, CSS, Javascript. It’s all right there for us to marvel at, learn from, criticize, improve. Heck, the device we're consuming it through can be used to manipulate it directly! I have a hard time thinking of any other area of our digital lives as accessible as the web. Whether the experience of making an imitation stands to produce as much value for a senior developer I have a difficult time guessing, but it certainly gave me many useful lessons. Many, many more than had I gone with a design of my own making.

</section>

<section>

<h2 id="the-how"><a aria-label="Permalink to The how" href="#the-how">The how</a></h2>

Is this where I lay out the meticulous 12-step plan to build the perfect imitation that I followed? Yes?! Damn!

I don’t have one. Never did. And I still don’t feel particularly confident in creating one. I’m not even sure the task is complicated enough to need it!

But I do reckon there’s a definite step one: Figure out what content you’ll need. All of the content of the site you’re imitating will be off limits, so you’ll have many empty slots to fill with something interesting. With too much lorem ipsum and too many placeholder-images you risk imitating design features you don’t actually have any content for. Wasted effort! And by planning out your content up front, the fit between the original site and your imitation becomes clear rather fast. Too many empty slots you have no idea what to fill with? That’s probably a bad fit.

The urge to get going with markup and styling got the better of me, I must admit, and I moved on from step one a bit too early. “I’ll just figure out the stuff above the fold and worry about the rest later. It’s fine!” But I suppose iterating over failures is a valid method too!

<img class="lazyfit image image--right image--pop-500" style="shape-outside: polygon(3.46% 26.32%, 9.28% 99.38%, 99.71% 100.12%, 98.68% 79.47%, 100.14% 6.03%, 37.33% 8.44%, 37.55% 26.38%);" data-add-class="lazyfit--show" data-src="/images/https://ik.imagekit.io/dlfdk/lythfrederiksen/projects/new-portfolio-site/DALL_E_2022-09-11_02.52.12_tkX1iXpc7.png?tr=w-{width}" alt="">

A good choice for step two is to derive design tokens - colors, fonts, easing functions, break points, etc. - and load them into your system of choice. I used a combination of CSS custom properties and sass-variables, with an emphasis on the latter as very few needed the cascade. The CSS Overview feature found in Chrome can be a valuable tool here. While you’re unlikely to be able to use the original site’s font for your imitation - bigger sites often use paid, exclusive fonts - using it during prototyping can be helpful.

Other than the obvious upside of not having to remember all these design tokens and retyping them endlessly, doing this also helps you towards developing a sense of the design system. Something you’ll need when adapting your content to it later. Great designs typically rely on a few key ideas, and getting a feel for them early will save you a lot of headache later.

I did an even worse job at step two than I did step one. Again, I jumped too quickly into writing markup and styling, instead of investing the necessary time in basic design analysis. In my defense I was concurrently setting up Eleventy for the first time for which I wanted markup and styling to play around with. It’s the typical pitfall of dealing with many “firsts” at the same time.

From here on it’s mostly webdev as usual, though there’s one particular aspect to keep in mind: Performance. Certain visual features used in a design may come with nontrivial hardware and connection demands. If the company, whose site you’re building an imitation of, mainly expects its prospective customers to use high-end phones, laptops and desktops on stable, high-speed connections, then that is bound to influence the trade-offs its designers are willing to make. What expectations do you have about the folks who will visit your site?

An example: Stripe.com features a large, multilayered, animated gradient at full page-width above the fold. This gradient is created with a canvas using javascript weighing in at around 30kB (uncompressed). As the typical visitor is unlikely to stay above the fold for more than a few seconds, this visual treat is somewhat expensive. Does it make sense to have your visitors download 30kB of javascript for a two second visual treat?

It’s admittedly a difficult question to answer, one that requires much more context than offered here. What else are you asking your visitors to download and execute? A full javascript framework? A bucketload of analytics? Three different, variable fonts? High-res images? It’s a complicated issue that I’d argue even the biggest sites often screw up.

In the case of the discussed gradient, I initially decided to implement a much simpler solution using a series of layered CSS gradients. A solution also used by Stripe.com when visited without javascript enabled. Now, while this solution certainly lowered the amount of javascript, it had an unforeseen negative impact on performance. Due to internal browser rendering shenanigans I’m not privy to, the high number of layered gradients caused dropped frames and scrolling stutter on my low-end test phone. Not good, obviously. The solution? Canvas and javascript. My version requires about 4kB (uncompressed), but only produces static gradients, whereas the original Stripe.com version is animated. I settled on this compromise and in general chose solutions favoring adequate performance even on low-end, badly connected devices. I like getting a perfect 100 score on Lighthouse, okay?!

Also worth noting is the breadth of browsers and browser versions you wish to support. The original site may cater to a very broad segment of users - like gov.uk for example - or be very focused on utilizing the newest in HTML and CSS at the expense of wide support. Adapting your imitation to land in the opposite camp of the original may prove an interesting exercise on its own. Though browser support is not likely to be spelled out anywhere on the site you’re imitating, it can to some degree be deduced from the used CSS and the presence of polyfills.

My chosen target was the latest versions of the big three: Firefox, Chrome, and Safari. A target Stripe.com doesn’t seem to lack far behind. I don’t reckon I’ve used any features not available to the original creators either.

</section>

<section>
<img class="lazyfit image image--right image--pop-500" style="shape-outside: polygon(4.03% 45.76%, 3.79% 99.38%, 99.71% 100.12%, 100.14% 6.03%, 28.43% 6.96%, 30.17% 44.9%);" data-add-class="lazyfit--show" data-src="/images/https://ik.imagekit.io/dlfdk/lythfrederiksen/projects/new-portfolio-site/DALL_E_2022-09-11_03.03.30_S5g0qyA8y.png?tr=w-{width}" alt="">
<h2 id="the-outcome"><a aria-label="Permalink to The outcome" href="#the-outcome">The outcome</a></h2>

So, did I end up with an example of egregious plagiarism badly camouflaged as an attempt at analytical web design, or did I actually succeed at making something interesting, valuable and worth using as my new home on the internet?


I think the idea works. I really do. While I can sit here today and argue for why, I didn’t have the arguments laid out plainly when I started. The outcome could just as well have been unpublishable. It didn’t have to be straight up plagiarism for it to be an example of poor taste.

Granted, it isn’t entirely my decision to make. You, dear visitor, get to have a say too. And perhaps a cease-and-desist email will hit my inbox at some point! Regardless, I firmly stand by the merits of the imitation approach as a method for learning and a catalyst for discussion of casually established best practices. The world doesn’t need any more todo-apps anyway.

Along the way the idea evolved to encompass not only the landing page, but also the rest of my site’s pages, including a blog section. Doing so really cemented the lessons learned and helped me understand which design tokens the original creators considered variable and which they didn’t. The essence stood out.

The process also exposed a decent number of instances in which I found myself disagreeing with the decisions made by the original creators. Things like performance trade-offs, implementation of semantic HTML, excessive use of nested elements and seemingly redundant CSS to name a few. Not having spoken to the original creators, I naturally can’t rule out perfectly valid and convincing reasons for these decisions, but until I’ve heard them, I’ll continue to play the role of a (slightly cocky) beginner who thinks he’s right. After a genuine attempt at arguing for the original decision, I think that’s a reasonable stance to take.

*Article illustrations generated by [DALL-E 2](https://openai.com/dall-e-2/) from the prompt "A robot is painting a painting of robots, pencil drawn"*

</section>

<section>
<h2 id="further-reading"><a aria-label="Permalink to Further reading" href="#further-reading">Further reading</a></h2>
    
Many more observations were made in the process of creating the new site than it makes sense to cover in this single piece of writing. They will instead get individual blog posts in the near future as I get around to documenting everything. As they’re published, I will make sure to list them right here.

</section>