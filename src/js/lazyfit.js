if (window.requestIdleCallback) {
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
                observer.unobserve(entry.target);

                // const newVar = entry.target.dataset.parent ? entry.target.parentElement.offsetHeight : entry.target.offsetHeight;

                let offsetHeight;
                let offsetWidth
                if (entry.target.dataset.parent) {
                    offsetHeight = entry.target.parentElement.offsetHeight;
                    offsetWidth = entry.target.parentElement.offsetWidth;
                } else {
                    offsetHeight = entry.target.offsetHeight;
                    offsetWidth = entry.target.offsetWidth;
                }
                if (entry.target.dataset.round) {
                    entry.target.style.height = `${offsetHeight}px`;
                    entry.target.style.width = `${offsetWidth}px`;
                }
                // switch (isNaN(maxDPR) || maxDPR) {
                //     case true:
                //         maxDPR = window.devicePixelRatio;
                //         break;
                //     case "0":
                //         maxDPR = 1;
                //         break;
                //     default:
                //         maxDPR = Math.min(maxDPR, window.devicePixelRatio)
                // }
                const maxDPR = entry.target.dataset.maxDpr ? Math.min(entry.target.dataset.maxDpr, window.devicePixelRatio) : window.devicePixelRatio;
                // if (maxDPR) {
                //     maxDPR = Math.min(maxDPR, window.devicePixelRatio)
                // } else {
                //     maxDPR = window.devicePixelRatio;
                // }
                console.log(maxDPR);
                const pixelHeight = offsetHeight * maxDPR;
                const pixelWidth = offsetWidth * maxDPR;
                entry.target.src = entry.target.dataset.src.replace("{width}", pixelWidth).replace("{height}", pixelHeight);

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