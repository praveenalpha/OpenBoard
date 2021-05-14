let pencil = document.querySelector("#pencil");
let eraser = document.querySelector("#eraser");
let undo = document.querySelector("#undo");
let redo = document.querySelector("#redo");
let pencilOptions = document.querySelector("#pencil-options");
let eraserOptions = document.querySelector("#eraser-options");
let black = document.querySelector("#black");
let red = document.querySelector("#red");
let yellow = document.querySelector("#yellow");
let blue = document.querySelector("#blue");
let pencilSlider = document.querySelector("#pencil-size");
let eraserSlider = document.querySelector("#eraser-size");

let currStrokeStyle="black";
let currLineWidth;
let eraserWidth = 1;
let pencilWidth = 1;
let activeTool = "pencil";

//draw
pencil.addEventListener("click", function () {
  console.log("clicked on pencil");
  if (activeTool == "pencil") {
    if (pencilOptions.classList.contains("active")) {
      pencilOptions.classList.remove("active");
    } else {
      pencilOptions.classList.add("active");
    }
  } else {
    activeTool = "pencil";
    ctx.strokeStyle = currStrokeStyle;
    ctx.lineWidth = pencilWidth;
    pencil.classList.add("active-tool");
    eraser.classList.remove("active-tool");
    eraserOptions.classList.remove("active");

    socket.emit( "pencil"  , "black" );
  }
});

// pencil.addEventListener("blur", function () {
//   if (pencilOptions.classList.contains("active")) {
//     pencilOptions.classList.remove("active");
//   }
// });

//erase
eraser.addEventListener("click", function () {
  console.log("clicked on eraser");

  if (activeTool == "eraser") {
    if (eraserOptions.classList.contains("active")) {
      eraserOptions.classList.remove("active");
    } else {
      eraserOptions.classList.add("active");
    }
  } else {
    ctx.strokeStyle = "white";
    activeTool = "eraser";
    ctx.lineWidth = eraserWidth;
    eraser.classList.add("active-tool");
    pencil.classList.remove("active-tool");
    pencilOptions.classList.remove("active");
  }
});

// eraser.addEventListener("blur", function () {
//   if (eraserOptions.classList.contains("active")) {
//     eraserOptions.classList.remove("active");
//   }
// });

//undo
undo.addEventListener("click", function () {
  undoPoints();
});

//redo
redo.addEventListener("click", function () {
  redoPoints();
});

black.addEventListener("click", function () {
  ctx.strokeStyle = "black";
  currStrokeStyle = "black";
});

blue.addEventListener("click", function () {
  ctx.strokeStyle = "blue";
  currStrokeStyle = "blue";
});
red.addEventListener("click", function () {
  ctx.strokeStyle = "red";
  currStrokeStyle = "red";
});
yellow.addEventListener("click", function () {
  ctx.strokeStyle = "yellow";
  currStrokeStyle = "yellow";
});



pencilSlider.addEventListener("change" , function(){
    ctx.lineWidth = pencilSlider.value;
    pencilWidth = pencilSlider.value;
})
eraserSlider.addEventListener("change" , function(){
    ctx.lineWidth = eraserSlider.value;
    eraserWidth = eraserSlider.value;
})
