import { trimCanvas } from "./util";

const canvas = document.getElementById("font-canvas");
const ctx = canvas.getContext("2d");

const inputText = document.getElementById("text");
const inputSubtext = document.getElementById("subtext");

const inputTextColor = document.getElementById("text-color");
const inputSubtextColor = document.getElementById("subtext-color");

const inputMainSize = document.getElementById("main-size");
const inputSubSize = document.getElementById("sub-size");

const download = document.getElementById("download");

const myFont1 = new FontFace('Docteur', "url('../nikke-font-generator/fonts/DocteurAtomic-Clean.ttf')");
await myFont1.load();
document.fonts.add(myFont1);

const myFont = new FontFace('Butch', "url('../nikke-font-generator/fonts/butch-sundance.ttf')");
await myFont.load();
document.fonts.add(myFont);

const mainConst = 333;
const subConst = 32;

const heightOff = 20;

let mainSize = mainConst;
let subSize = subConst;

const letterSpacingMain = 16;
const letterSpacingSub = 22;

function setMain() {
    ctx.fillStyle = inputTextColor.value;
    ctx.font = `${mainSize}px Docteur`;
    ctx.letterSpacing = `${letterSpacingMain * (mainSize / mainConst)}px`;
    ctx.textBaseline = "top";
    ctx.textAlign = "center";
}

function setSub() {
    ctx.fillStyle = inputSubtextColor.value;
    ctx.font = `${subSize}px Butch`;
    ctx.letterSpacing = `${letterSpacingSub * (subSize / subConst)}px`;
    // ctx.textBaseline = "top";
    ctx.textAlign = "center";
}

function draw() {
    // doc 333 7px spacing
    // butch 59 24px spacing

    const title = inputText.value.trim() || " ";
    const subtitle = inputSubtext.value.trim() || " ";
    
    setMain();
    const mainWidth = ctx.measureText(title).width;
    
    setSub();
    const subWidth = ctx.measureText(subtitle).width;

    const maxWidth = Math.max(mainWidth, subWidth);

    const subY = 229 * (mainSize / mainConst);

    canvas.width = maxWidth;
    canvas.height = subY + 60 * (subSize / subConst) + heightOff;

    setMain();

    ctx.fillText(title, canvas.width / 2, -75 * (mainSize / mainConst) + heightOff);

    setSub();

    ctx.fillText(subtitle, canvas.width / 2, subY + heightOff);

    const newCanvas = trimCanvas(canvas);
    canvas.width = newCanvas.width;
    canvas.height = newCanvas.height;
    ctx.drawImage(newCanvas, 0, 0);
}

setTimeout(() => {
    inputText.value = "BARELY";
    inputSubtext.value = "ACCURATE NIKKE FONT GENERATOR";
    draw();
    inputText.value = "";
    inputSubtext.value = "";
}, 1000);

inputText.addEventListener("input", draw);
inputSubtext.addEventListener("input", draw);

inputMainSize.addEventListener("input", () => {
    mainSize = parseInt(inputMainSize.value);
    draw();
});
inputSubSize.addEventListener("input", () => {
    subSize = parseInt(inputSubSize.value);
    draw();
});

inputTextColor.addEventListener("input", draw);
inputSubtextColor.addEventListener("input", draw);

inputMainSize.value = mainSize;
inputSubSize.value = subSize;

download.addEventListener("click", () => {
    var link = document.createElement('a');
    link.download = 'nikke-logo.png';
    link.href = canvas.toDataURL();
    link.click();
    link.remove();
});