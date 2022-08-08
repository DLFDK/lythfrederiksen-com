lazyfit();
async function lazyfit() {
    // const yieldToEventLoop = () => new Promise((resolve) => setTimeout(() => { 
    //     console.log("Yielding");
    //     resolve() 
    // }, 0))

    // const getInnerHeight = "getInnerHeight";
    // const setupObserver = "setupObserver";
    // const getImages = "getImages";
    // const observeImages = "observeImages";

    // const startMarker = "startMarker";
    // performance.mark(startMarker);

    const maxLoopTime = 0.1;

    const halfWindowHeight = window.innerHeight / 2;
    // await yieldToEventLoop();

    // performance.mark(getInnerHeight);

    // const observer = new IntersectionObserver((entries, observer) => {
    //     for (const entry of entries) {
    //         console.log(entry.isIntersecting && false);
    //         if (entry.isIntersecting) {
    //             // entry.target.style.height = `${entry.target.offsetHeight}px`;
    //             // entry.target.style.width = `${entry.target.offsetWidth}px`;
    //             const pixelWidth = entry.target.offsetWidth * window.devicePixelRatio.toFixed(0);//Should the rounding happen after multiplication?
    //             const pixelHeight = entry.target.offsetHeight * window.devicePixelRatio.toFixed(0);
    //             entry.target.src = entry.target.dataset.src.replace("{width}", pixelWidth).replace("{height}", pixelHeight);
    //             observer.unobserve(entry.target);
    //             entry.target.addEventListener("load", () => {
    //                 if (entry.target.dataset.addClass) {
    //                     for (const className of entry.target.dataset.addClass.split(" ")) {
    //                         entry.target.classList.add(className);
    //                     }
    //                 }
    //                 if (entry.target.dataset.removeClass) {
    //                     for (const className of entry.target.dataset.removeClass.split(" ")) {
    //                         entry.target.classList.remove(className);
    //                     }
    //                 }
    //                 if (entry.target.dataset.toggleClass) {
    //                     for (const className of entry.target.dataset.toggleClass.split(" ")) {
    //                         entry.target.classList.toggle(className);
    //                     }
    //                 }
    //             });
    //         }
    //     }
    // }, {
    //     rootMargin: `${halfWindowHeight}px 0px ${halfWindowHeight}px 0px`
    // });

    const observer = new IntersectionObserver((entries, observer) => {
        for (const entry of entries) {
            if (entry.isIntersecting) {
                observer.unobserve(entry.target);
                setTimeout(() => {
                    loadImage(entry.target);
                }, 0);
            }
        }
    }, {
        rootMargin: `${halfWindowHeight}px 0px ${halfWindowHeight}px 0px`
    });

    setTimeout(getImages, 0);
    // await yieldToEventLoop();

    // performance.mark(setupObserver);

    // const images = [...document.getElementsByClassName("lazyfit")];
    // await yieldToEventLoop();

    // performance.mark(getImages);

    // for (const image of images) {
    // console.time("Loop");
    // observer.observe(image);
    // await yieldToEventLoop();
    // console.timeEnd("Loop");
    // }
    // performance.mark(observeImages);


    // performance.measure("getInnerHeight", startMarker, getInnerHeight);
    // performance.measure("setupObserver", getInnerHeight, setupObserver);
    // performance.measure("getImages", setupObserver, getImages);
    // performance.measure("observeImages", getImages, observeImages);
    // console.log(performance.getEntriesByType("measure")[0].duration);
    // for (const entry of performance.getEntriesByType("measure")) {
    //     console.log(entry.name, entry.duration);
    // }

    function getImages() {
        const images = new Set([...document.getElementsByClassName("lazyfit")]);
        setTimeout(() => {
            observeImages(images)
        }, 0);
    }

    function observeImages(images) {
        const startTime = performance.now();
        for (const image of images) {
            observer.observe(image);
            images.delete(image);
            if (performance.now() - startTime > maxLoopTime) {
                setTimeout(() => {
                    observeImages(images)
                }, 0);
                break;
            }
        }
    }

    function loadImage(image) {
        console.log("Loading image");
        // image.style.height = `${image.offsetHeight}px`;
        // image.style.width = `${image.offsetWidth}px`;
        const pixelWidth = image.offsetWidth * window.devicePixelRatio.toFixed(0);//Should the rounding happen after multiplication?
        const pixelHeight = image.offsetHeight * window.devicePixelRatio.toFixed(0);
        image.src = image.dataset.src.replace("{width}", pixelWidth).replace("{height}", pixelHeight);
        image.addEventListener("load", () => {
            if (image.dataset.addClass) {
                for (const className of image.dataset.addClass.split(" ")) {
                    image.classList.add(className);
                }
            }
            if (image.dataset.removeClass) {
                for (const className of image.dataset.removeClass.split(" ")) {
                    image.classList.remove(className);
                }
            }
            if (image.dataset.toggleClass) {
                for (const className of image.dataset.toggleClass.split(" ")) {
                    image.classList.toggle(className);
                }
            }
        });
    }
}