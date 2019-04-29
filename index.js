var canvas = document.getElementById('canvas');
var eraser = document.getElementById('eraser');
var brush = document.getElementById('brush');
var actions = document.getElementById('actions');
var red = document.getElementById('red');
var blue = document.getElementById('blue');
var yellow = document.getElementById('yellow');
var clear = document.getElementById('clear');
var save = document.getElementById('save');
var context = canvas.getContext('2d');
var iptColor = context.strokeStyle;
var using = false;
var eraserEnabled = false;
firstPoint = {
    "x" : undefined,
    "y" : undefined
}

autoSetCanvasSize();
listenToMouse();
if('ontouchstart' in document) {
    //mobile上
    listenToTouch();
} else {
    //PC上
    listenToMouse();
}

eraser.onclick = function() {
    eraserEnabled = true;
    actions.className = "actions isBrush";
    eraser.classList.add('active');
    brush.classList.remove('active');
    clear.classList.remove('active');
    save.classList.remove('active');
}
brush.onclick = function() {
    eraserEnabled = false;
    actions.className = "actions";
    brush.classList.add('active');
    eraser.classList.remove('active');
    clear.classList.remove('active');
    save.classList.remove('active');
}
clear.onclick = function() {
    eraserEnabled = true;
    context.clearRect(0, 0, canvas.width, canvas.height);
    clear.classList.add('active');
    brush.classList.remove('active');
    eraser.classList.remove('active');
    save.classList.remove('active');
}
save.onclick = function() {
    eraserEnabled = true;
    var url = canvas.toDataURL("image/png");
    var a = document.createElement('a');
    document.body.appendChild(a);
    a.href = url;
    a.download = "drawPicture";
    a.target = "_blank";
    a.click();
    save.classList.add('active');
    brush.classList.remove('active');
    eraser.classList.remove('active');
    clear.classList.remove('active');
}
black.onclick = function() {
    context.strokeStyle = 'black';
    black.classList.add('active');
    red.classList.remove('active');
    blue.classList.remove('active');
    yellow.classList.remove('active');
}
red.onclick = function() {
    context.strokeStyle = 'red';
    red.classList.add('active');
    blue.classList.remove('active');
    yellow.classList.remove('active');
    black.classList.remove('active');
}
blue.onclick = function() {
    context.strokeStyle = 'blue';
    blue.classList.add('active');
    red.classList.remove('active');
    yellow.classList.remove('active');
    black.classList.remove('active');
}
yellow.onclick = function() {
    context.strokeStyle = 'yellow';
    yellow.classList.add('active');
    red.classList.remove('active');
    blue.classList.remove('active');
    black.classList.remove('active');
}
function useEraser(x, y) {
    context.clearRect(x-5, y-5, 20, 20);
}
function drawCircle(x,y,radius) {
    context.beginPath();
    // context.fillStyle = 'black';
    context.arc(x, y, radius, 0, Math.PI*2);
    context.fill();
}
function drawLine(x,y,x1,y1) {
    context.beginPath();
    context.lineWidth = 5;
    //开始点
    context.moveTo(x,y);
    //结束点
    context.lineTo(x1,y1);
    //描边
    context.stroke();
    context.closePath();
}
function autoSetCanvasSize() {
    setCanvasSize();
    window.onresize = function() {
        setCanvasSize();
    }
}
function setCanvasSize() {
    var pageWidth = document.documentElement.clientWidth;
    var pageHeight = document.documentElement.clientHeight;
    canvas.width = pageWidth;
    canvas.height = pageHeight;
}
function listenToTouch() {
    canvas.ontouchstart = function(evt) {
        context.lineCap = "round";
        context.lineJoin= "round";
        using = true;
        var x = evt.touches[0].clientX;
        var y = evt.touches[0].clientY;
        if(eraserEnabled) {
            useEraser(x, y);
        }else {
            firstPoint = {
                "x" : x,
                "y" : y
            }
            // drawCircle(x, y, 1);
        }
    }
    canvas.ontouchmove = function(evt) {
        var x = evt.touches[0].clientX;
        var y = evt.touches[0].clientY;
        if(using) {
            if(eraserEnabled) {
                useEraser(x, y);
            }else {
                var newPoint = {
                    "x" : x,
                    "y" : y
                }
                // drawCircle(x, y, 1);
                drawLine(firstPoint.x,firstPoint.y,newPoint.x,newPoint.y);
                firstPoint = newPoint;
            }
        }
    }
    canvas.ontouchend = function(evt) {
        using = false;
    }
}
function listenToMouse() {
        canvas.onmousedown = function(evt) {
            context.lineCap = "round";
            context.lineJoin= "round";
            using = true;
            var x = evt.clientX;
            var y = evt.clientY;
            if(eraserEnabled) {
                useEraser(x, y);
            }else {
                firstPoint = {
                    "x" : x,
                    "y" : y
                }
                // drawCircle(x, y, 1);
            }
        }
        canvas.onmousemove = function(evt) {
            var x = evt.clientX;
            var y = evt.clientY;
            if(using) {
                if(eraserEnabled) {
                    useEraser(x, y);
                }else {
                    var newPoint = {
                        "x" : x,
                        "y" : y
                    }
                    // drawCircle(x, y, 1);
                    drawLine(firstPoint.x,firstPoint.y,newPoint.x,newPoint.y);
                    firstPoint = newPoint;
                }
            }
        }
        canvas.onmouseup = function(evt) {
            using = false;
        }
}