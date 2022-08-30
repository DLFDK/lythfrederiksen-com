requestIdleCallback(lazyfit);
function lazyfit() {
    const halfWindowHeight = window.innerHeight / 2;
    performance.mark("A");
    const images = [...document.getElementsByClassName("lazyfit")];
    performance.mark("B");
    performance.measure("getElementsByClassName", "A", "B");

    performance.mark("C");
    const observer = new IntersectionObserver((entries, observer) => {
        requestIdleCallback((IdleDeadline) => {
            console.log(IdleDeadline.timeRemaining());
            performance.mark("X");
            for (const entry of entries) {
                if (entry.isIntersecting) {
                    entry.target.style.height = `${entry.target.offsetHeight}px`;
                    entry.target.style.width = `${entry.target.offsetWidth}px`;
                    const pixelWidth = entry.target.offsetWidth * window.devicePixelRatio.toFixed(0);
                    const pixelHeight = entry.target.offsetHeight * window.devicePixelRatio.toFixed(0);
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
            performance.mark("Y");
            performance.measure("for (const entry of entries)", "X", "Y");
            // console.log(IdleDeadline.didTimeout, IdleDeadline.timeRemaining());
            const measure = performance.getEntriesByType("measure")[0];
            console.log(measure.name, measure.duration, IdleDeadline.didTimeout, IdleDeadline.timeRemaining());
            performance.clearMeasures();
        });
    }, {
        rootMargin: `${halfWindowHeight}px 0px ${halfWindowHeight}px 0px`
    });
    performance.mark("D");
    performance.measure("IntersectionObserver", "C", "D");


    performance.mark("E");
    for (const image of images) {
        observer.observe(image);
    }
    performance.mark("F");
    performance.measure("observer.observe(image)", "C", "D");


    for (const entry of performance.getEntriesByType("measure")) {
        console.log(entry.name, entry.duration);
    }
    performance.clearMeasures();
    // console.log(performance.getEntriesByType("measure"));

}