socket.on("onmousedown", function (point) {
  // logic
  let { x, y, width, color } = point;
  ctx.lineWidth = width;
  ctx.strokeStyle = color;
  ctx.beginPath();
  ctx.moveTo(x, y);
});

socket.on("onmousemove", function (point) {
  //logic
  let { x, y, width, color } = point;
  ctx.lineWidth = width;
  ctx.strokeStyle = color;
  ctx.lineTo(x, y);
  ctx.stroke();
});

socket.on("redraw", (points) => {
  console.log("redraw reached");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
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
});
