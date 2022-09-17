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

                const targetParent = entry.target.dataset.parent;
                const offsetHeight = targetParent ? entry.target.parentElement.height : entry.target.height;
                const offsetWidth = targetParent ? entry.target.parentElement.width : entry.target.width;

                if (entry.target.dataset.round) {
                    entry.target.style.height = `${offsetHeight}px`;
                    entry.target.style.width = `${offsetWidth}px`;
                }

                const maxDPR = entry.target.dataset.maxDpr;
                const DPR = maxDPR ? Math.min(maxDPR, window.devicePixelRatio) : window.devicePixelRatio;
                
                entry.target.src = entry.target.dataset.src.replace("{width}", offsetWidth * DPR).replace("{height}", offsetHeight * DPR);

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