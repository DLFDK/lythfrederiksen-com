lazyload();
function lazyload() {
    const images = [...document.querySelectorAll("img[data-lazy]")];
    const observer = new IntersectionObserver((entries, observer) => {
        for (const entry of entries) {
            if (entry.isIntersecting) {
                entry.target.src = entry.target.dataset.src.replace("{width}", entry.target.offsetWidth).replace("{height}", entry.target.offsetHeight);
                observer.unobserve(entry.target);
            }
        }
    }, {
        rootMargin: "300px 0px 300px 0px"
    });

    for (const image of images) {
        observer.observe(image);
    }


    // const el_images = document.getElementsByClassName("lazyload__img");
    // const baseURL = "https://res.cloudinary.com/dypwsyigo/image/upload/";
    // const folderURL = "/Mit%20Tiny%20House%20Gallery/";
    // const observer = new IntersectionObserver((entries, observer) => {
    //     entries.forEach(entry => {
    //         if (entry.isIntersecting) {
    //             entry.target.style.width = entry.target.offsetWidth + "px";
    //             entry.target.src = baseURL + "f_auto,q_auto," + "w_" + (entry.target.offsetWidth * window.devicePixelRatio).toFixed(0) + folderURL + entry.target.dataset.src;
    //             entry.target.addEventListener("load", () => {
    //                 entry.target.classList.add("lazyload__img--show");
    //             });
    //             observer.unobserve(entry.target);
    //         }
    //     })
    // }, {
    //     rootMargin: "300px 0px 300px 0px"
    // })
    // Array.from(el_images).forEach(image => {
    //     observer.observe(image);
    // });
    // const el_galleries = document.getElementsByClassName("section__gallery");
    // Array.from(el_galleries).forEach(gallery => {
    //     gallery.style.width = gallery.offsetWidth - gallery.offsetWidth % 3 + "px";
    // });
}