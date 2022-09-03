if(window.requestIdleCallback){
    requestIdleCallback(lazyfit);
} else {
    lazyfit();
}

function lazyfit() {
    const halfWindowHeight = window.innerHeight / 2;
    const images = [...document.getElementsByClassName("lazyfit")];

    const observer = new IntersectionObserver((entries, observer) => {
            for (const entry of entries) {
                if (entry.isIntersecting) {
                    let offsetHeight;
                    let offsetWidth
                    if(entry.target.dataset.parent) {
                        offsetHeight = entry.target.parentElement.offsetHeight;
                        offsetWidth = entry.target.parentElement.offsetWidth;
                    } else {
                        offsetHeight = entry.target.offsetHeight;
                        offsetWidth = entry.target.offsetWidth;
                    }
                    entry.target.style.height = `${offsetHeight}px`;
                    entry.target.style.width = `${offsetWidth}px`;
                    const pixelHeight = offsetHeight * window.devicePixelRatio;
                    const pixelWidth = offsetWidth * window.devicePixelRatio;
                    entry.target.src = entry.target.dataset.src.replace("{width}", pixelWidth).replace("{height}", pixelHeight);
                    observer.unobserve(entry.target);
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
}