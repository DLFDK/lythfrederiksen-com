---
title: How I lazy load pixel perfect images on every device
date: 2022-09-14
author: Dennis Lyth Frederiksen
tags: [featured]
category: Code
style: posts/14-09-2022/14-09-2022.scss
scripts: ["/js/lazyfit.js"]
snippet: ""
img: /images/https://ik.imagekit.io/dlfdk/lythfrederiksen/blog/Posts/grid-gut/markus-spiske-ruudayIzfJI-unsplash_CftAlZkmV.jpg
---
<section>

<p class="article__date">{{ date | postDate }}</p>

<h1 class="title">{{title}}</h1>

Look, responsive images are hard. Have a go at writing the [src-set-sizes](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images) syntax from memory, I’ll wait. Where did you set your breakpoints? Why there? Did you remember to account for pixel density? See? Hard. Hopefully you have found a way to automate the process. No? Damn! Thoughts and prayers.

The essence of the subject isn’t really that complicated, though. We have a box that we want to fill with an image. An image whose resolution is fitting for the box being filled. Small box? Small image. Large box? Large image. Simple, really.

The browser’s problem is that it doesn’t actually know the size of the box when the request goes out. It’s so eager to start the download that it doesn’t want to wait for the layout to complete. What's worse - the image we end up requesting may itself influence the size of the box! In many cases the box doesn’t even have a size without the image!

The official solution (src-set-sizes) requires telling the browser what size the box will be given a certain viewport size. Not every possible size, of course, but a handful at least. And for each of them we give the browser a link to a fitting image. Tedious work. Oh, and don’t forget to actually create the image variations. Make sure they’re properly compressed too.

</section>

<section>
<h2 id="the-much-better-way"><a aria-label="Permalink to The much better way*" href="#the-much-better-way">The much better way*</a></h2>

I’m a pixel-pincher. You know, like a penny-pincher but with pixels? Anyway, I hate sending along pixels that don’t end up on the screen. It’s wasteful and I don’t like it!

Using src-set-sizes we could conceivably create so many images and breakpoints that close to every device would get a pixel perfect image. That is, an image the exact size needed - accounting for device pixel ratio (DPR) - to fill the box. Every pixel shipped would get a physical pixel at the other end. One to one.

While this could be automated - and I’m sure it has been - it requires a hefty amount of work up front. Work we’d need to redo every time the layout changed even slightly. And shuffling all those images around would get old real quick.

The first improvement to this hellish scenario is to use one of those image CDNs. Instead of creating the images up front, we simply add the src-set image links and let the CDN send the images when requested. The original images are uploaded to the CDN, at the first request resized and compressed, and from then on served from the cache. Pretty neat!

We’d still have that whole src-set-sizes markup to generate at every build, of course. Can’t we just let the users do it themselves?

We certainly can! Here’s how it plays out using a little bit of Javascript:

<div class="step">
    <h3>STEP 1</h3>
    <p>Each image we wish to load this way gets a special class - let’s call it lazyfit - and the image-URL is put in the data-src attribute while the regular src-attribute is left empty. Make sure the image-element has its final size even when empty. Note how the URL in data-src contains a placeholder (width) that will later be replaced. A placeholder for height can be added too - it will depend on how you want the image CDN to deliver the image.</p>
</div>

```html
<img class="lazyfit" data-src="https://ik.imagekit.io/johndoe/awesome_image.jpg?tr=w-{width}" alt="...">
```

<div class="step">
    <h3>STEP 2</h3>
    <p>The script grabs all elements with the lazyfit-class and registers them with an IntersectionObserver. This way we can implement lazy loading while we’re at it.
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
    <h3>STEP 3</h3>
    <p>On intersection, the script pulls the height and width of the empty image-element and uses those numbers to request an image of that exact size from the image CDN using the URL provided in the data-src-attribute. The script accounts for the DPR.</p>
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
<h2 id="the-fine-print"><a aria-label="Permalink to The fine print" href="#the-fine-print">The fine print</a></h2>

But wait a minute! That’s potentially thousands of image-variations! What about the cost of making all those? And the storage?!

Alright, alright. I didn’t say it would be cheap. Let’s see if we can bring the cost down a little.

First of all, there is a finite amount of unique devices out there. That equates to a finite set of screen resolutions. Regular users don’t sit around dragging their browser windows all day, you know. [Looking at the stats](https://gs.statcounter.com/screen-resolution-stats), 20 resolutions cover about 70% of the total number of users worldwide. If you serve a specific market or region, the spread you see is likely even tighter.

Given high resolution originals, the total storage requirement for the 20 variations is probably going to match it. Whether it makes the most sense to store the rest or generate them on demand will depend on the costs of your operation. I store everything and clean out the least requested variations once in a while. 

Secondly, don’t use the cache of the image CDN. It’s too expensive. Put in a redirect or proxy to cache at your own layer before the request reaches them. At Netlify it’s a redirect rule, at Cloudflare it’s a worker. I’m sure your provider has something similar.

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

With this way of handling images, my routine consists of uploading the originals to the image CDN, taking the returned URL and adding it to an image-element with the Lazyfit-class. The end.

</section>

<section>
<h2 id="making-the-script-a-little-smarter"><a aria-label="Permalink to Making the script a little smarter" href="#making-the-script-a-little-smarter">Making the script a little smarter</a></h2>

There are a few things we can do to make the script a little smarter.

For the IntersectionObserver, I like to grab the viewport height to base the rootMargin on. It’s a fairly straightforward heuristic that works well.

```js
const halfWindowHeight = window.innerHeight / 2;
const images = [...document.getElementsByClassName("lazyfit")];
const observer = new IntersectionObserver((entries, observer) => {...}, {
    rootMargin: `${halfWindowHeight}px 0px ${halfWindowHeight}px 0px`
});
```

In rare cases in some (unnamed) browsers, the sane behavior of empty image-elements can’t be counted on and it can be necessary to base the size of the requested image on the parent-element. I’ve added this option using data-attributes.

```html
<img class="lazyfit" data-parent="true" data-src="..." alt="...">
```

```js
const targetParent = entry.target.dataset.parent;
const height = targetParent ? entry.target.parentElement.height : entry.target.height;
const width = targetParent ? entry.target.parentElement.width : entry.target.width;
```

To extend styling choices, data-attributes are also used to instruct the script to add, remove and toggle classes on image-load. I use this to add a nice fade-in transition.

```html
<img class="lazyfit" data-add-class="lazyfit--show" data-src="..." alt="...">
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

And finally, I’ve found some browsers' image rendering to be a bit lacking when it comes to half-pixel-cases. That is, cases where the image is some non-integer number of pixels wide or tall. This appears to be especially troublesome with crisp graphics. Using this option, the script will force the image to take on a rounded size. Note that this also makes it impossible for the image to resize e.g. on a switch between portrait and landscape, so use with caution.

```html
<img class="lazyfit" data-round="true" data-src="..." alt="...">
```

```js
if (entry.target.dataset.round) {
    entry.target.style.height = `${height}px`;
    entry.target.style.width = `${width}px`;
}
```

</section>

<section>
<h2 id="more-caveats"><a aria-label="Permalink to More caveats" href="#more-caveats">More caveats</a></h2>

Yes, there’s more!

While src-set-sizes is typically sold as a way to load size-appropriate images, browser-vendors are free to pick and choose between the linked images [“depending on the user's screen's pixel density, zoom level, and possibly other factors such as the user's network condition”](https://html.spec.whatwg.org/multipage/images.html#introduction-3). To what extent this actually happens I don’t know - my google-fu wasn’t up to the task of finding any useful answers. The script could use the [Network Information API](https://developer.mozilla.org/en-US/docs/Web/API/Network_Information_API) to at least account for basic network conditions, but support is currently limited to Chromium-based browsers only.

Speaking of network conditions, today’s high end smartphones have high DPRs - the iPhone 14 is sitting at 3, the Galaxy S22 Ultra at 4 - and loading a full screen, pixel perfect image in a timely manner can require significant bandwidth on those devices. Doing so on the S22 Ultra  will result in the request of a 1440 by 3088 pixel behemoth. And you know what kind of device folks tend to carry with them to places with bad reception? Smartphones! Shocking, I know! For this reason, the script includes an option to limit the DPR on a per-image basis.

```html
<img class="lazyfit" data-max-dpr="2" data-src="..." alt="...">
```

```js
const maxDPR = entry.target.dataset.maxDpr;
const DPR = maxDPR ? Math.min(maxDPR, window.devicePixelRatio) : window.devicePixelRatio;
```

Sometimes you may want to not only deliver a size-appropriate image for a given device, but actually pick an entirely different image altogether. This is what we call [art direction](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images#art_direction) and comes as a package deal with the picture-element. My script has none of that.

If your [largest contentful paint](https://web.dev/lcp/) (LCP) is an image, or includes an image, loading it via a script will add a sizable delay. I even insist on making it deferred! On the upside, since the image size is fixed before load, it will not ruin your CLS score! Here the simple solution is to add the image with src-set-sizes instead. Or - and perhaps even better - don’t have your LCP contain an image.

Then there’s SEO. It should work? [At least that’s what Google says](https://developers.google.com/search/docs/crawling-indexing/javascript/lazy-loading). No guarantees given, though. Admittedly, SEO wasn’t the biggest concern when I implemented this.

</section>

<section>
<h2 id="ask-your-accountant-about-lazyfit"><a aria-label="Permalink to Ask your accountant about lazyfit" href="#ask-your-accountant-about-lazyfit">Ask your <s>doctor</s> accountant about lazyfit</a></h2>

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

</section>