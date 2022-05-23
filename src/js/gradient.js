gradient();
function gradient() {
    const container = document.getElementById("canvas-gradient");
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

    const gradientColorZero = "#a960ee";
    const gradientColorOne = "#ff333d";
    const gradientColorTwo = "#90e0ff";
    const gradientColorThree = "#ffcb57";
    const gradientColorZeroTransparent = "rgba(169, 96, 238, 0)";
    const gradientColorOneTransparent = "rgba(255, 51, 61, 0)";
    const gradientColorTwoTransparent = "rgba(144, 224, 255, 0)";
    const gradientColorThreeTransparent = "rgba(255, 203, 87, 0)";

    ctx.fillStyle = gradientColorZero;
    ctx.fillRect(0, 0, width, height);

    const grads = [
        [[
            [gradientColorTwo, 0.25],
            [gradientColorTwoTransparent, 0.50],
        ], 520, -250 * ratio],
        [[
            [gradientColorTwo, 0.15],
            [gradientColorTwoTransparent, 0.50],
        ], -620, 0 * ratio],
        [[
            [gradientColorZero, 0.10],
            [gradientColorZeroTransparent, 0.60],
        ], -420, 120 * ratio],
        [[
            [gradientColorZero, 0.30],
            [gradientColorZeroTransparent, 0.67],
        ], 122, -120 * ratio],
        [[
            [gradientColorOne, 0.4],
            [gradientColorOneTransparent, 0.57],
        ], 495, -44 * ratio],
        [[
            [gradientColorTwo, 0.1],
            [gradientColorTwoTransparent, 0.60],
        ], -120, 250 * ratio],
        [[
            [gradientColorOne, 0],
            [gradientColorOneTransparent, 0.60],
        ], -940, 290 * ratio],
        [[
            [gradientColorThree, 0.23],
            [gradientColorThreeTransparent, 0.67],
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