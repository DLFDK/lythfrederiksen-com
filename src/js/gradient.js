gradient();
function gradient() {
    const container = document.getElementById("hero__background");
    const canvas = document.getElementById("hero__canvas");
    const ctx = canvas.getContext("2d");
    const width = canvas.offsetWidth;
    const height = width;
    // const width = 400;
    // const height = 400;
    canvas.width = width;
    canvas.height = height;

    const halfWidth = width / 2;
    const halfHeight = height / 2;

    createGradient([
        ["#ffcb57", 0.23],
        ["#ffcb5700", 0.67],
        ["#ffcb5700", 0.99],
        ["black", 0.99],
    ], 385, -24);

    // createGradient([
    //     ["#ffcb57", 0.23],
    //     ["#ffcb5700", 0.67],
    //     ["#ffcb5700", 0.99],
    //     ["black", 0.99],
    // ], 0, 0);


    // const grad1 = ctx.createRadialGradient(0, 400, 0, 0, 400, 2 * width);
    // const grad1 = ctx.createRadialGradient(halfWidth,halfHeight,0, halfWidth,halfHeight,halfWidth);
    // grad1.addColorStop(0, 'pink');
    // grad1.addColorStop(0.9, 'white');
    // grad1.addColorStop(0.9, 'green');
    // ctx.fillStyle = grad1;
    // ctx.fillRect(0, 0, width, height);

    // const grad2 = ctx.createRadialGradient(width * 0.5, 0.5 * height, 0, 0.5 * width, 0.5 * height, height);
    // grad2.addColorStop(0, '#a960ee');
    // grad2.addColorStop(0.4, '#a960ee00');
    // ctx.fillStyle = grad2;
    // ctx.fillRect(0, 0, width, height);

    function createGradient(colorStops, positionX, positionY) {
        const centerX = halfWidth + positionX;
        const centerY = halfHeight + positionY;

        const centers = [];
        centers.push([centerX, centerY]);
        if (positionX && positionY) {
            centers.push([centerX - Math.sign(positionX) * width, centerY - Math.sign(positionY) * height]);
            centers.push([centerX - Math.sign(positionX) * width, centerY]);
            centers.push([centerX, centerY - Math.sign(positionY) * height]);
        } else if (positionX) {
            centers.push([centerX - Math.sign(positionX) * width, centerY]);
        } else if (positionY) {
            centers.push([centerX, centerY - Math.sign(positionY)] * height);
        }


        for (const [x, y] of centers) {
            const grad = ctx.createRadialGradient(x, y, 0, x, y, halfWidth * Math.SQRT2);
            for (const [color, stop] of colorStops) {
                grad.addColorStop(stop, color);
            }
            ctx.fillStyle = grad;
            console.log(x, y);
            ctx.fillRect(x - halfWidth, y - halfHeight, width, height);
        }

        // const adjPercOne = Math.sin(45) * fractionOne;
        // const adjPercTwo = Math.sin(45) * fractionTwo;
        // const adjPercThree = Math.sin(45) * fractionThree;


        // grad.addColorStop(fractionTwo, colorTwo);
        // grad.addColorStop(fractionThree, colorThree);
        // ctx.fillRect(0, 0, width, height);
        // ctx.fillRect(positionX - halfWidth, positionY - halfWidth, width, height);
    }
}