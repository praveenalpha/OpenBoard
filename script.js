const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
let points = []; //db to store the points, used to redraw
let removedPoints = [];

window.addEventListener("resize", function () {
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
  redraw();
});

let isPenDown = false;
ctx.lineWidth = 10;

//To Draw Functions
canvas.addEventListener("mousedown", function (e) {
  //clientX,Y gives the x,y coord relative to window top, but we need wrt to canvas, so subtract top from Y coord
  //get the top y coord of canvas
  let { top } = canvas.getBoundingClientRect();
  let x = e.clientX;
  let y = e.clientY - top;
  let point = {
    x: x,
    y: y,
    id: "md",
    color: ctx.strokeStyle,
    width: ctx.lineWidth,
  };
  points.push(point);
  ctx.beginPath();
  ctx.moveTo(x, y);
  isPenDown = true;

  socket.emit("md", point);
});

canvas.addEventListener("mousemove", function (e) {
  if (isPenDown == true) {
    let { top } = canvas.getBoundingClientRect();
    let x = e.clientX;
    let y = e.clientY - top;
    let point = {
      x: x,
      y: y,
      id: "mm",
      color: ctx.strokeStyle,
      width: ctx.lineWidth,
    };
    points.push(point);
    ctx.lineTo(x, y);
    ctx.stroke();

    socket.emit("mm", point);
  }
});

canvas.addEventListener("mouseup", function (e) {
  isPenDown = false;
  ctx.closePath();
});

//redraw whenever the window is resized
function redraw() {
  for (let i = 0; i < points.length; i++) {
    let point = points[i];
    ctx.lineWidth = point.width;
    ctx.strokeStyle = point.color;
    if (point.id == "md") {
      ctx.beginPath();
      ctx.moveTo(point.x, point.y);
    } else {
      ctx.lineTo(point.x, point.y);
      ctx.stroke();
    }
  }
  ctx.strokeStyle = currStrokeStyle;
  ctx.lineWidth = currLineWidth;

  console.log("calling redraw");
  socket.emit("redraw", points);
}

function undoPoints() {
  //1. remove the last line from db
  let lastRemovedPoints = [];
  let i = points.length - 1;
  while (i-- >= 0 && points[i].id != "md") {
    lastRemovedPoints.unshift(points.pop());
  }
  lastRemovedPoints.unshift(points.pop()); //to remove the last md
  removedPoints.push(lastRemovedPoints);

  //2. clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  //3. redraw the remaining lines
  redraw();
}

function redoPoints() {
  if (removedPoints.length >= 1) {
    //add the last removed points back into the db
    let removedPoint = removedPoints.pop();
    for (let i = 0; i < removedPoint.length; i++) {
      points.push(removedPoint[i]);
    }
    // 2. clear canvas
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    // 3. redraw points
    redraw();
  }
}
