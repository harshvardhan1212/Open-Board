let toolsCont = document.querySelector(".tools-cont");
let optionsCont = document.querySelector(".options-cont");
let eresertoolcont = document.querySelector(".ereser-tool-cont");
let penciltoolcont = document.querySelector(".pencil-tool-cont");
let newpagecont = document.querySelector(".newpage");

let sticky = document.querySelector(".notepad");
let eraser = document.querySelector(".eraser");
let pencil = document.querySelector(".pencil");
let upload = document.querySelector(".photo");
let newpage = document.querySelector(".new");
let cancelcont = document.querySelector(".cancel");

let optionsFlag = true;
let eraserFlag = false;
let pencilFlag = false;
let newpageFlag = false;

//true->tools show ,false->close tools
optionsCont.addEventListener("click", (e) => {
    optionsFlag = !optionsFlag;

    if (optionsFlag) {
        openTools();
    }
    else {
        closeTools();
    }
})


function openTools() {
    let iconElem = optionsCont.children[0];
    iconElem.classList.remove("fa-bars");
    iconElem.classList.add("fa-xmark");
    toolsCont.style.display = "flex";
}
function closeTools() {
    let iconElem = optionsCont.children[0];
    iconElem.classList.remove("fa-xmark");
    iconElem.classList.add("fa-bars");
    toolsCont.style.display = "none";
    penciltoolcont.style.display = "none";
    eresertoolcont.style.display = "none";
}
pencil.addEventListener("click", (e) => {
    //true->show pencil,false->hide pencil.
    pencilFlag = !pencilFlag;
    if (pencilFlag) penciltoolcont.style.display = "block";
    else penciltoolcont.style.display = "none";
})
eraser.addEventListener("click", (e) => {
    eraserFlag = !eraserFlag;
    if (eraserFlag) eresertoolcont.style.display = "block";
    else eresertoolcont.style.display = "none";
})

newpage.addEventListener("click", (e) => {
    newpageFlag = !newpageFlag;
    if (newpageFlag) newpagecont.style.display = "block";
    else newpagecont.style.display = "none";
})


cancelcont.addEventListener("click", (e) => {
    newpagecont.style.display = "none";

})

upload.addEventListener("click", (e) => {
    // open file exploer
    let input = document.createElement("input");
    input.setAttribute("type", "file");
    input.click();

    input.addEventListener("change", (e) => {

        let file = input.files[0];
        let urrl = URL.createObjectURL(file);
        console.log(urrl);
         
        let stickycont = document.createElement("div");
        stickycont.setAttribute("class", "sticky-cont");
       stickycont.innerHTML = '<div class="header-cont"><div class="minimize-cont"></div><div class="remove-cont"></div></div><div class="note-cont"><img src="${urrl}"/></div>';

        document.body.appendChild(stickycont);

        let minimize = stickycont.querySelector(".minimize-cont");
        let remove = stickycont.querySelector(".remove-cont");
        noteAction(minimize, remove, stickycont);
        stickycont.onmousedown = function (event) {
            DragAndDrop(stickycont, event)
        };
        stickycont.ondragstart = function () {
            return false
        };
    })


})
sticky.addEventListener("click", (e) => {
    let stickycont = document.createElement("div");
    stickycont.setAttribute("class", "sticky-cont");
    stickycont.innerHTML = '<div class="header-cont"><div class="minimize-cont"></div><div class="remove-cont"></div></div><div class="note-cont"><textarea></textarea></div>';
    document.body.appendChild(stickycont);
    let minimize = stickycont.querySelector(".minimize-cont");
    let remove = stickycont.querySelector(".remove-cont");
    noteAction(minimize, remove, stickycont);
    stickycont.onmousedown = function (event) {
        DragAndDrop(stickycont, event)
    }
    stickycont.ondragstart = function () {
        return false;
    };
})
function noteAction(minimize, remove, stickycont) {
    remove.addEventListener("click", (e) => {
        stickycont.remove();
    })
    minimize.addEventListener("click", (e) => {
        let noteCont = stickycont.querySelector(".note-cont");
        let display = getComputedStyle(noteCont).getPropertyValue("display");
        if (display == "none") noteCont.style.display = "block";
        else noteCont.style.display = "none";
    })

}
function DragAndDrop(element, event) {
    let shiftX = event.clientX - element.getBoundingClientRect().left;
    let shiftY = event.clientY - element.getBoundingClientRect().top;

    element.style.position = 'absolute';
    element.style.zIndex = 1000;

    moveAt(event.pageX, event.pageY);

    // moves the ball at (pageX, pageY) coordinates
    // taking initial shifts into account
    function moveAt(pageX, pageY) {
        element.style.left = pageX - shiftX + 'px';
        element.style.top = pageY - shiftY + 'px';
    }

    function onMouseMove(event) {
        moveAt(event.pageX, event.pageY);
    }

    // move the ball on mousemove
    document.addEventListener('mousemove', onMouseMove);

    // drop the ball, remove unneeded handlers
    element.onmouseup = function () {
        document.removeEventListener('mousemove', onMouseMove);
        element.onmouseup = null;
    };
}

