gradient();
function gradient() {
    const container = document.getElementById("hero__background");
    const canvas = document.getElementById("hero__canvas");
    const width = canvas.offsetWidth;
    const height = canvas.offsetHeight;
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    const grad1 = ctx.createRadialGradient(width * 0.5, 0.5 * height, 0, 0.5 * width, 0.5 * height, height);
    grad1.addColorStop(0, '#ffcb57');
    grad1.addColorStop(1, '#ffcb5700');
    ctx.fillStyle = grad1;
    ctx.fillRect(0, 0, width, height);
}