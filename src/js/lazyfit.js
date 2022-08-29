lazyfit();
async function lazyfit() {
    const halfWindowHeight = window.innerHeight / 2;

    const observer = new IntersectionObserver((entries) => {
        for (const entry of entries) {
            setTimeout(() => {
                intersectionTest(entry)
            }, 0)
        }
    }, {
        rootMargin: `${halfWindowHeight}px 0px ${halfWindowHeight}px 0px`
    });

    setTimeout(getImages, 0);

    function getImages() {
        const images = [...document.getElementsByClassName("lazyfit")];
        setTimeout(() => {
            observeImages(images, 0, images.length - 1)
        }, 0);
    }
    
    function observeImages(images, index, end) {
        observer.observe(images[index]);
        if(index < end){
            setTimeout(() => {
                observeImages(images, index + 1, end)
            }, 0);
        }
    }

    function intersectionTest(entry) {
        if (entry.isIntersecting) {
            observer.unobserve(entry.target);
            setTimeout(() => {
                loadImage(entry.target);
            }, 0);
        }
    }

    function loadImage(image) {
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