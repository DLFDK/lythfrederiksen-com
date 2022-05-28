gradient();
function gradient() {
    const colorOne = getComputedStyle(document.documentElement).getPropertyValue("--color-gradient-1");
    const colorTwo = getComputedStyle(document.documentElement).getPropertyValue("--color-gradient-2");
    const colorThree = getComputedStyle(document.documentElement).getPropertyValue("--color-gradient-3");
    const colorFour = getComputedStyle(document.documentElement).getPropertyValue("--color-gradient-4");
    if(!(colorOne && colorTwo && colorThree && colorFour)) return;

    const container = document.getElementById("canvas-gradient");
    if(!container) return;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const windowWidth = window.innerWidth;
    const width = windowWidth > 1000 ? windowWidth : 1000;
    const height = width;
    canvas.style.width = width + "px";
    canvas.width = width;
    canvas.height = height;

    const containerHeight = container.dataset.gradientHeight;
    const ratio = width / (containerHeight ? containerHeight : width);

    const halfWidth = width / 2;
    const halfHeight = height / 2;

    const colorOneTransparent = colorOne + "00";
    const colorTwoTransparent = colorTwo + "00";
    const colorThreeTransparent = colorThree + "00";
    const colorFourTransparent = colorFour + "00";

    ctx.fillStyle = colorOne;
    ctx.fillRect(0, 0, width, height);

    const grads = [
        [[
            [colorThree, 0.25],
            [colorThreeTransparent, 0.50],
        ], 520, -250 * ratio],
        [[
            [colorThree, 0.15],
            [colorThreeTransparent, 0.50],
        ], -620, 0 * ratio],
        [[
            [colorOne, 0.10],
            [colorOneTransparent, 0.60],
        ], -420, 120 * ratio],
        [[
            [colorOne, 0.30],
            [colorOneTransparent, 0.67],
        ], 122, -120 * ratio],
        [[
            [colorTwo, 0.4],
            [colorTwoTransparent, 0.57],
        ], 495, -44 * ratio],
        [[
            [colorThree, 0.1],
            [colorThreeTransparent, 0.60],
        ], -120, 250 * ratio],
        [[
            [colorTwo, 0],
            [colorTwoTransparent, 0.60],
        ], -940, 290 * ratio],
        [[
            [colorFour, 0.23],
            [colorFourTransparent, 0.67],
        ], 385, -24 * ratio],
    ];

    for (const grad of grads) {
        createGradient(...grad);
    }

    container.append(canvas);

    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        canvas.animate(
            { opacity: 0, offset: 0 },
            { duration: 1000 }
        );
    }



    function createGradient(colorStops, positionX, positionY) {
        const centerX = halfWidth + positionX;
        const centerY = halfHeight + positionY;

        const signX = Math.sign(positionX);
        const signY = Math.sign(positionY);

        const centers = [];
        centers.push([centerX, centerY]);
        if (positionX && positionY) {
            centers.push([centerX - signX * width, centerY - signY * height]);
            centers.push([centerX - signX * width, centerY]);
            centers.push([centerX, centerY - signY * height]);
        } else if (positionX) {
            centers.push([centerX - signX * width, centerY]);
        } else if (positionY) {
            centers.push([centerX, centerY - signY] * height);
        }

        for (const [x, y] of centers) {
            const grad = ctx.createRadialGradient(x, y, 0, x, y, halfWidth * Math.SQRT2);
            for (const [color, stop] of colorStops) {
                grad.addColorStop(stop, color);
            }
            ctx.fillStyle = grad;
            ctx.fillRect(x - halfWidth, y - halfHeight, width, height);
        }
    }
}