const canvasElement = document.getElementById('canvas');
const ctx = canvasElement.getContext('2d');
const { width, height } = canvasElement;

function clearScreen() {
    ctx.beginPath();
    ctx.rect(0, 0, width, height);
    ctx.fillStyle = "white";
    ctx.fill();
}

function drawCircle(x, y) {
    ctx.beginPath();
    ctx.arc(x, y, 50, 0, 2 * Math.PI);
    ctx.fillStyle ='red';
    ctx.fill();
}