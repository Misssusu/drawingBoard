var canvas = document.getElementById('canvas');
var eraser = document.getElementById('eraser');
var brush = document.getElementById('brush');
var actions = document.getElementById('actions');
var context = canvas.getContext('2d');
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
    eraserEnabled = !eraserEnabled;
    actions.className = "actions isBrush";
}
brush.onclick = function() {
    eraserEnabled = false;
    actions.className = "actions";
}
function useEraser(x, y) {
    context.clearRect(x-5, y-5, 10, 10);
}
function drawCircle(x,y,radius) {
    context.beginPath();
    context.fillStyle = 'black';
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
            drawCircle(x, y, 1);
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
                drawCircle(x, y, 1);
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
                drawCircle(x, y, 1);
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
                    drawCircle(x, y, 1);
                    drawLine(firstPoint.x,firstPoint.y,newPoint.x,newPoint.y);
                    firstPoint = newPoint;
                }
            }
        }
        canvas.onmouseup = function(evt) {
            using = false;
        }
}