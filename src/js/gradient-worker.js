onmessage = (message) => {
    const {canvas, width, height, colorOne, colorTwo, colorThree, colorFour, containerHeight} = message.data;
    // return;
    const ctx = canvas.getContext("2d");
    // performance.mark("createElement");

    const ratio = width / (containerHeight ? containerHeight : width);

    const halfWidth = width / 2;
    const halfHeight = height / 2;

    const colorOneTransparent = colorOne + "00";
    const colorTwoTransparent = colorTwo + "00";
    const colorThreeTransparent = colorThree + "00";
    const colorFourTransparent = colorFour + "00";

    // performance.mark("innerWidth");

    ctx.fillStyle = colorOne;
    ctx.fillRect(0, 0, width, height);

    // performance.mark("fillRect");


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
    // performance.mark("grads");


    for (const grad of grads) {
        createGradient(...grad);
    }

    postMessage("Go");

    // performance.mark("End");


    // performance.measure("getComputedStyle", "Start", "getComputedStyle");
    // performance.measure("if(!(colorOne &&...", "getComputedStyle", "if(!(colorOne &&...");
    // performance.measure("getElementById", "if(!(colorOne &&...", "getElementById");
    // performance.measure("createElement", "getElementById", "createElement");
    // performance.measure("innerWidth", "createElement", "innerWidth");
    // performance.measure("fillRect", "innerWidth", "fillRect");
    // performance.measure("grads", "fillRect", "grads");
    // performance.measure("createGradient", "grads", "createGradient");
    // performance.measure("append", "createGradient", "append");
    // performance.measure("End", "append", "End");
    // performance.measure("Start to end", "Start", "End");

    // const totalTime = performance.getEntriesByName("Start to end")[0].duration;
    // console.log("Total time: ", totalTime);
    // for (const entry of performance.getEntriesByType("measure")) {
    //     if (entry.duration) {
    //         console.log(entry.name, ((entry.duration / totalTime) * 100).toFixed(1));
    //     }
    // }

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