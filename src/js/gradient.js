gradient();
function gradient() {
    const container = document.getElementById("hero__background");
    const canvas = document.getElementById("hero__canvas");
    const ctx = canvas.getContext("2d");
    canvas.style.height = container.offsetHeight + "px";
    const width = canvas.offsetWidth;
    const height = width;
    canvas.width = width;
    canvas.height = height;

    const ratio = canvas.offsetWidth / container.offsetHeight;

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

    createGradient([
        [gradientColorTwo, 0.25],
        [gradientColorTwoTransparent, 0.50],
    ], 520, -250 * ratio);
    createGradient([
        [gradientColorTwo, 0.15],
        [gradientColorTwoTransparent, 0.50],
    ], -620, 0 * ratio);
    createGradient([
        [gradientColorZero, 0.10],
        [gradientColorZeroTransparent, 0.60],
    ], -420, 120 * ratio);
    createGradient([
        [gradientColorZero, 0.30],
        [gradientColorZeroTransparent, 0.67],
    ], 122, -120 * ratio);
    createGradient([
        [gradientColorOne, 0.4],
        [gradientColorOneTransparent, 0.57],
    ], 495, -44 * ratio);
    createGradient([
        [gradientColorTwo, 0.1],
        [gradientColorTwoTransparent, 0.60],
    ], -120, 250 * ratio);
    createGradient([
        [gradientColorOne, 0],
        [gradientColorOneTransparent, 0.60],
    ], -940, 290 * ratio);
    createGradient([
        [gradientColorThree, 0.23],
        [gradientColorThreeTransparent, 0.67],
    ], 385, -24 * ratio);

    canvas.style.opacity = "1";
    
    // createGradient([
    //     [gradientColorThree, 0.23],
    //     [gradientColorThreeTransparent, 0.67],
    //     [gradientColorThreeTransparent, 0.99],
    //     ["black", 0.99],
    // ], 385, -100 * 2.5);

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