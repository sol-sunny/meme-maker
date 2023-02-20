const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
let isPainting = false;
let isFilling = false;
const lineWidth = document.getElementById("line-width");
ctx.lineWidth = lineWidth.value;
const color = document.getElementById("color");
const colorOption = Array.from(document.getElementsByClassName("color-option"));
const modeBtn = document.getElementById("mode-btn");
const destroyBtn = document.getElementById("destroy-btn");
const eraserBtn = document.getElementById("eraser-btn");
const saveBtn = document.getElementById("save-btn");
const fileInput = document.getElementById("file");
const textInput = document.getElementById("text");

const textSize = document.getElementById("text-size");
const textStyle = document.getElementById("text-style");


const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;
canvas.height = CANVAS_HEIGHT;
canvas.width = CANVAS_WIDTH;


ctx.lineCap = "round";


function onMove(event) {
    if (isPainting == true) {
        ctx.lineTo(event.offsetX, event.offsetY);
        ctx.stroke();
        return;
    }
    ctx.moveTo(event.offsetX, event.offsetY);
}

function startPainting() {
    isPainting = true;
}

function cancelPainting() {
    isPainting = false;
    ctx.beginPath();
}

function onLineWidthChange(event) {
    //console.log(event.target.value);
    ctx.lineWidth = event.target.value;

}

function onColorChange(event) {
    //console.log(event.target.value);
    ctx.strokeStyle = event.target.value;
    ctx.fillStyle = event.target.value;
}

function onColorClick(event) {
    const colorValue = event.target.dataset.color;
    console.dir(colorValue);
    ctx.strokeStyle = colorValue;
    ctx.fillStyle = colorValue;
    color.value = colorValue;
}

function onModeClick() {
    if (isFilling == true) {
        isFilling = false;
        modeBtn.innerText = "Fill";
    } else if (isFilling == false) {
        isFilling = true;
        modeBtn.innerText = "Draw";
    }
}

function onCanvasClick() {
    if (isFilling == true) {
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    }
}

function onDestroyClick() {
    alert("YOU REALLY WANT TO DELETE?");
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

function onEraserClick() {
    ctx.strokeStyle = "white";
    isFilling = false;
    modeBtn.innerText = "Fill";
}

function onFileChange(event) {
    //console.dir(event.target);
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    const image = new Image();
    image.src = url;
    image.onload = function () {
        ctx.drawImage(image, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        fileInput.value = null;
    };
}

function onTextSizeChange(event) {
    console.log(event.target.value)
    ctx.textSize = event.target.value;
}

function onDoubleClick(event) {
    const text = textInput.value;
    let textSizeSelect = textSize.value + "px";
    let textStyleSelect = textStyle.value;
    //console.log(textStyleSelect);
    if (text !== "") {
        ctx.save();
        ctx.lineWidth = 1;
        ctx.font = `${textSizeSelect} ${textStyleSelect}`;
        ctx.fillText(text, event.offsetX, event.offsetY);
        ctx.restore();
        console.log(textStyleSelect);
    }
}

function onSaveClick() {
    const url = canvas.toDataURL();
    const a = document.createElement("a");
    a.href = url;
    a.download = "myDrawing.png";
    a.click();
}

canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", cancelPainting);
canvas.addEventListener("mouseleave", cancelPainting);
canvas.addEventListener("click", onCanvasClick);
canvas.addEventListener("dblclick", onDoubleClick);

lineWidth.addEventListener("change", onLineWidthChange);
color.addEventListener("change", onColorChange);
colorOption.forEach(item => item.addEventListener("click", onColorClick));
modeBtn.addEventListener("click", onModeClick);
destroyBtn.addEventListener("click", onDestroyClick);
saveBtn.addEventListener("click", onSaveClick);
eraserBtn.addEventListener("click", onEraserClick);
fileInput.addEventListener("change", onFileChange);


textSize.addEventListener("change", onTextSizeChange);



