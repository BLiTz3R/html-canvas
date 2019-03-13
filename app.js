// Variables
const canvas = document.querySelector('#draw');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx.strokeStyle = "#BADA55";
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = 30;
//ctx.globalCompositeOperation = 'overlay';

let isDrawing = false;
let lastX = 0;
let lastY = 0;
let hue = 0;
let direction = true;

// Draw function
function draw(e) {
    if (!isDrawing) return; // stop the function when not mouse click down
    document.querySelector('h1').style.display = "none";
    ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    if (e.touches) { // if touch, get touch coordinates
        let touchX = e.touches[0].pageX - e.touches[0].target.offsetLeft;
        let touchY = e.touches[0].pageY - e.touches[0].target.offsetTop;
        ctx.lineTo(touchX, touchY);
        ctx.stroke();
        [lastX, lastY] = [touchX, touchY];
    } else { // else get mouse coords
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
        [lastX, lastY] = [e.offsetX, e.offsetY];
    }
    hue++;
    if (hue >= 360) {
        hue = 0;
    }
    if (ctx.lineWidth >= 50 || ctx.lineWidth <= 1) {
        direction = !direction;
    }
    if (direction) {
        ctx.lineWidth++;
    } else {
        ctx.lineWidth--;   
    }
}

// Event listeners for mouse
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mousedown', (e) => { 
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];  
});
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseout', () => isDrawing = false);

// Event listeners for touch
canvas.addEventListener('touchmove', draw, false);
canvas.addEventListener('touchstart', (e) => {
    e.preventDefault(); 
    isDrawing = true;
    [lastX, lastY] = [e.touches[0].pageX - e.touches[0].target.offsetLeft, e.touches[0].pageY - e.touches[0].target.offsetTop];  
}, false);
canvas.addEventListener('touchend', () => isDrawing = false);
canvas.addEventListener('touchleave', () => isDrawing = false);