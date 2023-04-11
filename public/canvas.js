let canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let pencilcolour = document.querySelectorAll(".pencil-colour");
let pencilwidthElem = document.querySelector(".pencilwidt-tool-cont");
let ereserwidthElem = document.querySelector(".ereserz-tool-cont");
let download = document.querySelector(".download");
let undo = document.querySelector(".undo");
let redo = document.querySelector(".redo");
let savecont = document.querySelector(".save");

let pencolour = "red";
let eresercolour = "white";
let pencilwidth = pencilwidthElem.value;
let ereserwidth = ereserwidthElem.value;
let savecontFlag = true;


let undoRedoTracker = [];
let track = 0;

let mousedown = false;

//api
let tool = canvas.getContext("2d");

tool.strokeStyle = pencolour;
tool.lineWidth = pencilwidth;

//mouse
canvas.addEventListener("mousedown", (e) => {
    mousedown = true;
    beginPath({
        x: e.clientX,
        y: e.clientY
    })

})
canvas.addEventListener("mousemove", (e) => {
    if (mousedown) drawStroke({
        x: e.clientX,
        y: e.clientY,
        colour: eraserFlag ? eresercolour : pencolour,
       // width: eraserFlag ? ereserwidth : pencilwidth

    })
})
canvas.addEventListener("mouseup", (e) => {
    mousedown = false;

    let url = canvas.toDataURL();
    undoRedoTracker.push(url);
    track = undoRedoTracker.length-1;
})

undo.addEventListener("click", (e) => {
    if (track > 0) track--;
    //action;
    let trackobj = {
        trackvalue: track,
        undoRedoTracker
    }
    undoRedocanvas(trackobj);
})

redo.addEventListener("click", (e) => {
    if (track < undoRedoTracker.length - 1) track++;
    //action;
    let trackobj = {
        trackvalue: track,
        undoRedoTracker
    }
    undoRedocanvas(trackobj);
})
function undoRedocanvas(trackobj) {
    track = trackobj.trackvalue;
    undoRedoTracker = trackobj.undoRedoTracker;

    let url = undoRedoTracker[track];
    let img = new Image();
    img.src = url;
    img.onload = (e) => {
        tool.drawImage(img, 0, 0, canvas.width, canvas.height);
    }
}


function beginPath(strokeObj) {
    tool.beginPath();
    tool.moveTo(strokeObj.x, strokeObj.y);
}
function drawStroke(strokeObj) {
    tool.strokeStyle = strokeObj.colour;
    tool.lineWidth = strokeObj.width;
    tool.lineTo(strokeObj.x, strokeObj.y);
    tool.stroke();
}
pencilcolour.forEach((colourElen) => {
    colourElen.addEventListener("click", (e) => {

        let colour = colourElen.classList[0];
        pencolour = colour;
        tool.strokeStyle = pencolour;
    })
})

pencilwidthElem.addEventListener("change", (e) => {
    pencilwidth = pencilwidthElem.value;
    tool.lineWidth = pencilwidth;
})

ereserwidthElem.addEventListener("change", (e) => {
    ereserwidth = ereserwidthElem.value;
    tool.lineWidth = ereserwidth;
})

eraser.addEventListener("click", (e) => {
    if (eraserFlag) {
        tool.strokeStyle = eresercolour;
        tool.lineWidth = ereserwidth;
    }
    else {
        tool.strokeStyle = pencolour;
        tool.lineWidth = pencilwidth;
    }
})

download.addEventListener("click", (e) => {
    let url = canvas.toDataURL();
    let a = document.createElement("a");
    a.href = url;
    a.download = "board.jpg";
    a.click();

})
savecont.addEventListener("click", (e) => {

        if (savecontFlag) 
        {

            let url = canvas.toDataURL();
            let a = document.createElement("a");
            a.href = url;
            a.download = "board.jpg";
            a.click();
            
            document.location.href = "index.html";
          
        }
    })