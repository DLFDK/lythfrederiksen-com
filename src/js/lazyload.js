lazyload();
function lazyload() {
    const images = [...document.querySelectorAll("img[data-lazy]")];
    const observer = new IntersectionObserver((entries, observer) => {
        for (const entry of entries) {
            if (entry.isIntersecting) {
                entry.target.style.height = `${entry.target.offsetHeight}px`;
                entry.target.style.width = `${entry.target.offsetWidth}px`;
                const pixelWidth = entry.target.offsetWidth * window.devicePixelRatio.toFixed(0);
                const pixelHeight = entry.target.offsetHeight * window.devicePixelRatio.toFixed(0);
                entry.target.src = entry.target.dataset.src.replace("{width}", pixelWidth).replace("{height}", pixelHeight);
                observer.unobserve(entry.target);
            }
        }
    }, {
        rootMargin: "300px 0px 300px 0px"
    });

    for (const image of images) {
        observer.observe(image);
    }
}