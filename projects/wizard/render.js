var canvasElement = document.getElementById('canvas');
const ctx = canvasElement.getContext('2d');

canvasElement.width = window.innerWidth;
canvasElement.height = window.innerHeight;

var { width : CANVAS_WIDTH, height : CANVAS_HEIGHT } = canvasElement;

function clearScreen() {
    ctx.beginPath();
    ctx.rect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.fillStyle = "white";
    ctx.fill();
}

function drawCircle(x, y, radius, color) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
}

function drawRect(x, y, width, height, color) {
    ctx.beginPath();
    ctx.rect(x - (width/2), y - (height/2), width, height);
    ctx.fillStyle = color;
    ctx.fill();
}

function drawTexture(texture, x, y, width, height, color) {
    ctx.drawImage(texture, x - (width/2), y - (height/2), width, height);
}