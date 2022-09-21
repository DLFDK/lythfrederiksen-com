---
title: How I lazy load pixel perfect images on every device
date: 2022-09-14
author: Dennis Lyth Frederiksen
tags: [featured]
category: Code
style: posts/14-09-2022/14-09-2022.scss
scripts: ["/js/lazyfit.js"]
snippet: "I’m a pixel-pincher. You know, like a penny-pincher but with pixels? Anyway, I hate sending along pixels that don’t end up on the screen. It’s wasteful and I don’t like it! In this blog post I detail how I load perfectly sized images using a tiny bit of javascript and an image CDN. Full code included!"
img: /images/https://ik.imagekit.io/dlfdk/lythfrederiksen/blog/Posts/pixel-perfect/Painting_within_a_frame_eBEbYajVG.png
---
<section>

<div class="image-flair img-float img-float--right img-float--hero img-float--pop-500" style="shape-outside: polygon(3.96% 30.35%, 4.08% 79.52%, 15.89% 97.13%, 95.38% 97.25%, 89.1% 6.28%, 27.19% 11.79%)">
    <img class="lazyfit image-flair__greyscale" data-max-dpr="1" data-add-class="lazyfit--show" data-src="/images/https://ik.imagekit.io/dlfdk/lythfrederiksen/blog/Posts/pixel-perfect/Painting-outside-frame-greyscale_nwLBNVHnZ.png?tr=w-{width}" alt="">
    <img class="lazyfit image-flair__color" data-add-class="lazyfit--show" data-src="/images/https://ik.imagekit.io/dlfdk/lythfrederiksen/blog/Posts/pixel-perfect/Painting-outside-frame-color_4OXQYVM0JQ.png?tr=w-{width}" alt="Empty frame hanging on a wall, light streaming in from the top left casting shadows. The edges of the image are blurred and irregular. Initially in greyscale, but on interaction or hover becomes filled with colors.">
</div>

<p class="article__date">{{ date | postDate }}</p>

<h1 class="title">{{title}}</h1>

Look, responsive images are hard. Have a go at writing the [src-set-sizes](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images) syntax from memory, I’ll wait. Where did you set your breakpoints? Why there? Did you remember to account for pixel density? See? Hard. Hopefully you have found a way to automate the process. No? Thoughts and prayers.

The essence of our goal isn’t really that complicated, though. We have a box that we want to fill with an image. An image with a resolution fit for the box being filled. Small box? Small image. Large box? Large image.

However, the browser doesn’t know the size of the box when the image request is sent. It’s so eager to start the download that it doesn’t wait for the layout to complete. What's worse - the image we end up requesting may itself influence the size of the box! In many cases the box doesn’t even have a size without the image!

The official solution (src-set-sizes) requires telling the browser what size the box will be given a certain viewport size. Not at every possible viewport size, of course, but a handful at least. And for each of them we hand the browser a link to a fitting image. Tedious work. Oh, and don’t forget to actually create the image variations. Make sure they’re properly compressed too. Did you adjust the layout and thus change the size of the image? Yeah, you should probably go through the whole process again.

```html
<img alt="..." 
    src="my-image-400.jpg" 
    srcset="my-image-400.jpg 400w,             
            my-image-600.jpg 600w,             
            my-image-800.jpg 800w,             
            my-image-1000.jpg 10000w" 
    sizes="(min-width: 1080px) 760px,            
           (min-width: 860px) 550px,            
           (min-width: 550px) 460px,            
           100vw">
```

</section>

<section>

<h2 id="the-much-better-way"><a title="Permalink to The much better way*" href="#the-much-better-way">The much better way*</a></h2>

I’m a pixel-pincher. You know, like a penny-pincher but with pixels? Anyway, I hate sending along pixels that don’t end up on the screen. It’s wasteful and I don’t like it!

Using src-set-sizes we could conceivably create so many images and breakpoints that close to every device would get a pixel perfect image. That is, an image the exact size needed - accounting for device pixel ratio (DPR) - to fill the box. Every pixel shipped would get a physical pixel at the other end. One to one.

While this could be automated - and I’m sure it has been - it requires a hefty amount of work up front. Work we’d need to redo every time the layout changed even slightly. And shuffling all those images around would get old real quick.

The first improvement to this hellish scenario is to use an image CDNs. Instead of creating the images up front, we simply add the src-set image links and let the image CDN send the images when requested. High quality originals are uploaded to the CDN, at the first request resized and compressed, and then served from cache.

We’d still have that whole src-set-sizes markup to generate at every build, of course. Can’t we just let the users do it themselves?

We certainly can! Here’s how it plays out using a little bit of Javascript:

<div class="step">
    <h3 tabindex="0">STEP 1</h3>
    <p>Each image we wish to load this way gets a special class - let’s call it lazyfit - and the image-URL is put in the <em>data-src</em> attribute while the regular <em>src</em> attribute is left empty. Make sure the image-element has its final size even when empty. Note how the URL in <em>data-src</em> contains a placeholder for width that will later be replaced. A placeholder for height can be added too.</p>
</div>

```html
<img class="lazyfit" 
     src="" 
     data-src="https://ik.imagekit.io/johndoe/awesome_image.jpg?tr=w-{width}" 
     alt="...">
```

<div class="step">
    <h3 tabindex="0">STEP 2</h3>
    <p>The script grabs all elements with the lazyfit-class and registers them with an <em>IntersectionObserver</em>. This way we can implement lazy loading while we’re at it.
</p>
</div>

```js
const images = [...document.getElementsByClassName("lazyfit")];
const observer = new IntersectionObserver(...);
for (const image of images) {
    observer.observe(image);
}
```

<div class="step">
    <h3 tabindex="0">STEP 3</h3>
    <p>On intersection, the script pulls the height and width of the empty image-element and uses those numbers to request an image of that exact size from the image CDN using the URL provided in the <em>data-src</em> attribute. The script also accounts for the DPR.</p>
</div>

```js
const images = [...document.getElementsByClassName("lazyfit")];
const observer = new IntersectionObserver((entries, observer) => {
    for (const entry of entries) {
        if (entry.isIntersecting) {
            observer.unobserve(entry.target);
            const DPR = window.devicePixelRatio;    
            entry.target.src = entry.target.dataset.src
                .replace("{width}", entry.target.width * DPR)
                .replace("{height}", entry.target.height * DPR);
        }
    }
});
for (const image of images) {
    observer.observe(image);
}
```

That’s it! You got pixel perfect images to satisfy your inner pixel-pincher! \*Fireworks\*


</section>

<section>
<h2 id="the-fine-print"><a title="Permalink to The fine print" href="#the-fine-print">The fine print</a></h2>

But wait a minute! That’s potentially thousands of image-variations! What about the cost of making all those? And the storage?!

Alright, alright. I didn’t say it would be cheap. Let’s see if we can bring the cost down a little.

First of all, there is a finite amount of unique devices out there. That equates to a finite set of screen resolutions. Regular users don't drag around their browser windows all day, you know. [Looking at the stats](https://gs.statcounter.com/screen-resolution-stats), 20 resolutions cover about 70% of the total number of users worldwide. If you serve a specific market or region, the spread you see is likely even tighter.

Given high resolution originals, the total storage requirement for the 20 variations is probably going to match it. Whether it makes the most sense to store the rest or generate them on demand will depend on the costs of your operation.

Secondly, don’t use the cache of the image CDN - it’s too expensive. Put in a redirect or proxy to cache at your own layer before the request reaches them. At Netlify it’s a redirect rule, at Cloudflare it’s a worker. I’m sure your provider has something similar.

Netlify redirect:

```toml
[[redirects]]
  from = "/images/*"
  to = ":splat"
  status = 200
  force = true
```

Cloudflare worker:

```js
export async function onRequest(context) {
    const { request } = context;
    const regex = /.*images\/(.*)/;
    const url = request.url.match(regex)[1];
    const imageRequest = new Request(url, {
        headers: request.headers
    });
    return await fetch(imageRequest);
}
```

Make sure at least the *Accept* header gets passed along. Without it the image CDN can't deliver the optimal format.

With this way of handling images, my job is to upload the original image to the image CDN, take the returned URL and add it to an image-element with the lazyfit-class.

</section>

<section>
<h2 id="making-the-script-a-little-smarter"><a title="Permalink to Making the script a little smarter" href="#making-the-script-a-little-smarter">Making the script a little smarter</a></h2>

There are a few things we can do to make the script a little smarter.

For the *IntersectionObserver*, I like to grab the viewport height to base the *rootMargin* on. It’s a fairly straightforward heuristic that works well.

```js
const halfWindowHeight = window.innerHeight / 2;
const images = [...document.getElementsByClassName("lazyfit")];
const observer = new IntersectionObserver((entries, observer) => {...}, {
    rootMargin: `${halfWindowHeight}px 0px ${halfWindowHeight}px 0px`
});
```

In rare cases in some (unnamed) browsers, the sane behavior of empty image-elements can’t be counted on and it can be necessary to base the size of the requested image on the parent-element. I’ve added this option using data-attributes.

```html
<img class="lazyfit" 
     data-parent="true" 
     src="" 
     data-src="..." 
     alt="...">
```

```js
const targetParent = entry.target.dataset.parent;
const height = targetParent ? entry.target.parentElement.height : entry.target.height;
const width = targetParent ? entry.target.parentElement.width : entry.target.width;
```

To extend styling choices, data-attributes are also used to instruct the script to add, remove and toggle classes on image-load. I use this to add a fade-in transition.

```html
<img class="lazyfit" data-add-class="lazyfit--show" src="" data-src="..." alt="...">
```

```js
entry.target.addEventListener("load", () => {
    if (entry.target.dataset.addClass) {
        for (const className of entry.target.dataset.addClass.split(" ")) {
            entry.target.classList.add(className);
        }
    }
    if (entry.target.dataset.removeClass) {
        for (const className of entry.target.dataset.removeClass.split(" ")) {
            entry.target.classList.remove(className);
        }
    }
    if (entry.target.dataset.toggleClass) {
        for (const className of entry.target.dataset.toggleClass.split(" ")) {
            entry.target.classList.toggle(className);
        }
    }
});
```

Today’s high end smartphones have high DPRs - the iPhone 14 is sitting at 3, the Galaxy S22 Ultra at 4 - and loading a full screen, pixel perfect image can require significant bandwidth. Doing so on the S22 Ultra  will result in the request of a 1440 by 3088 pixel behemoth. And you know what kind of device folks tend to carry with them to places with bad reception? Smartphones! Shocking, I know! For this reason, the script includes an option to limit the DPR on a per-image basis.

```html
<img class="lazyfit" 
     data-max-dpr="2" 
     src="" 
     data-src="..." 
     alt="...">
```

```js
const maxDPR = entry.target.dataset.maxDpr;
const DPR = maxDPR ? Math.min(maxDPR, window.devicePixelRatio) : window.devicePixelRatio;
```

And finally, I’ve found some browsers' image rendering to be a bit lacking when it comes to half-pixel-cases. That is, cases where the image is some non-integer number of pixels wide or tall. This appears to be especially troublesome with crisp graphics. Using this option, the script will force the image to take on a rounded size. Note that this also makes it impossible for the image to resize e.g. on a switch between portrait and landscape, so use with caution.

```html
<img class="lazyfit" 
     data-round="true" 
     src="" 
     data-src="..." 
     alt="...">
```

```js
if (entry.target.dataset.round) {
    entry.target.style.height = `${height}px`;
    entry.target.style.width = `${width}px`;
}
```

</section>

<section>
<h2 id="more-caveats"><a title="Permalink to More caveats" href="#more-caveats">More caveats</a></h2>

Yes, there’s more!

While src-set-sizes is typically sold as a way to load size-appropriate images, browser-vendors are free to pick and choose between the linked images [“depending on the user's screen's pixel density, zoom level, and possibly other factors such as the user's network condition”](https://html.spec.whatwg.org/multipage/images.html#introduction-3). To what extent this actually happens I don’t know - my google-fu wasn’t up to the task of finding any useful answers. The script could use the [Network Information API](https://developer.mozilla.org/en-US/docs/Web/API/Network_Information_API) to at least account for basic network conditions, but support is currently limited to Chromium-based browsers only.

<img class="lazyfit img-float img-float--left img-float--small img-float--pop-500" style="shape-outside: polygon(30% 2%, 31% 28%, 7% 28%, 8% 40%, 4% 42%, 4% 62%, 8% 65%, 8% 75%, 0% 75%, 0% 100%, 100% 100%, 100% 2%); box-shadow: 0 6px 12px -4px rgba(50, 50, 93, 1), 0 3px 7px -3px rgba(0, 0, 0, 1);" data-add-class="lazyfit--show" data-src="/images/https://ik.imagekit.io/dlfdk/lythfrederiksen/blog/Posts/pixel-perfect/Painting_within_a_frame_eBEbYajVG.png?tr=w-{width}" alt="Framed painting with multiple sets of borders as if it was a frame within a frame. At the center is a drawing of a galaxy using purple hues only.">

Sometimes you may want to not only deliver a size-appropriate image for a given device, but actually pick an entirely different image altogether. This is what we call [art direction](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images#art_direction) and comes as a package deal with the picture-element. My script has none of that.

If your [largest contentful paint](https://web.dev/lcp/) (LCP) is an image, or includes an image, loading it via a script will add a sizable delay. I even insist on making it deferred! On the upside, since the image size is fixed before load, it will not ruin your CLS score. Here the simple solution is to add the image with src-set-sizes instead. Or - and perhaps even better - don’t have the LCP contain an image.

Then there’s SEO. It should work? [At least that’s what Google says](https://developers.google.com/search/docs/crawling-indexing/javascript/lazy-loading). No guarantees given. Admittedly, SEO wasn’t the biggest concern when I implemented this.

</section>

<section>
<h2 id="ask-your-accountant-about-lazyfit"><a title="Permalink to Ask your accountant about lazyfit" href="#ask-your-accountant-about-lazyfit">Ask your accountant about lazyfit</a></h2>

You should probably be weary about implementing this on anything bigger than a side-project or personal portfolio site. I haven’t yet had the opportunity to implement it on a site with traffic of note and I’m pretty sure there’ll be important stuff to discover in the process. There’s not much fun in getting a surprise bill from Cloudinary!

Lazyfit in full:

```js
const halfWindowHeight = window.innerHeight / 2;
const images = [...document.getElementsByClassName("lazyfit")];
const observer = new IntersectionObserver((entries, observer) => {
    for (const entry of entries) {
        if (entry.isIntersecting) {
            observer.unobserve(entry.target);

            const targetParent = entry.target.dataset.parent;
            const height = targetParent ? entry.target.parentElement.height : entry.target.height;
            const width = targetParent ? entry.target.parentElement.width : entry.target.width;

            if (entry.target.dataset.round) {
                entry.target.style.height = `${height}px`;
                entry.target.style.width = `${width}px`;
            }

            const maxDPR = entry.target.dataset.maxDpr;
            const DPR = maxDPR ? Math.min(maxDPR, window.devicePixelRatio) : window.devicePixelRatio;
            
            entry.target.src = entry.target.dataset.src.replace("{width}", width * DPR).replace("{height}", height * DPR);

            entry.target.addEventListener("load", () => {
                if (entry.target.dataset.addClass) {
                    for (const className of entry.target.dataset.addClass.split(" ")) {
                        entry.target.classList.add(className);
                    }
                }
                if (entry.target.dataset.removeClass) {
                    for (const className of entry.target.dataset.removeClass.split(" ")) {
                        entry.target.classList.remove(className);
                    }
                }
                if (entry.target.dataset.toggleClass) {
                    for (const className of entry.target.dataset.toggleClass.split(" ")) {
                        entry.target.classList.toggle(className);
                    }
                }
            });
        }
    }
}, {
    rootMargin: `${halfWindowHeight}px 0px ${halfWindowHeight}px 0px`
});

for (const image of images) {
    observer.observe(image);
}
```
Article illustrations generated by [Stable Diffusion](https://github.com/CompVis/stable-diffusion/)
</section>