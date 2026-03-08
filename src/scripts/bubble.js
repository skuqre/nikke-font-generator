import { draw9slice, trimCanvas } from "./util";
import fuzzysort from "fuzzysort";
import { fontNames } from "./langinit.js"

if (localStorage.getItem("fontLanguage") === null) {
    localStorage.setItem("fontLanguage", fontNames["en"]);
}

const colorFetch = await fetch("https://nkas.pages.dev/nk_data/colors.json");
let colorData = await colorFetch.json();

const myFont = new FontFace('PEB', "url('/nikke-font-generator/fonts/" + localStorage.getItem("fontLanguage").replace("*", "ExtraBold") + "')");
await myFont.load();
document.fonts.add(myFont);

const myFont2 = new FontFace('PB', "url('/nikke-font-generator/fonts/" + localStorage.getItem("fontLanguage").replace("*", "Bold") + "')");
await myFont2.load();
document.fonts.add(myFont2);

const myFont3 = new FontFace('PSB', "url('/nikke-font-generator/fonts/Pretendard-SemiBold.ttf')");
await myFont3.load();
document.fonts.add(myFont3);

//

const bubble = new Image();
bubble.crossOrigin = "anonymous"
bubble.src = `/nikke-font-generator/images/bubble/bubble.png`;

const randomBubble = [
    "Into the fire, to the flames...",
    "I'm caught in your spell...",
    "Blazing fire within my veins!",
    "Uh, feelin' like I'm ready for the limelight, waitin' for the right time to unleash...",
    "Mind over matter, coming straight from underground...",
    "Where do we go from here? I really can't see the way...",
    "Dancing... under the moonlight... Moving apart... the life of the stars tonight...",
    "Can this be the end?",
    "Forward march!",
    "Hurricane, rain, the entrance to my reign...",
    "I may be a weap; my heart is alive and cries...",
    "Steel in stillness...",
    "Rêve d'ordinarie, vis d'espérance...",
    "Heart is racing here now... Never wanna wake out...", // Cosmo really loves his samples from Splice, huh? This is from the "Vocal Future Pop" sample pack by Arcando!
    "La tristesse est futile\nLes promesses sont galvanisées\nAinsi l'espoir se répare\nPour que s'éveille l'aube rêvée\nNon....."
];

//

const bubbleCanvas = document.getElementById("bubble-canvas");
const bubbleCtx = bubbleCanvas.getContext("2d", {willReadFrequently: true});

const inputName = document.getElementById("name");
const inputDialog = document.getElementById("dialog");
const inputColor = document.getElementById("color");

inputName.addEventListener("input", draw);
inputDialog.addEventListener("input", draw);
inputColor.addEventListener("input", draw);

const buttonDraw = document.getElementById("generate");
const buttonDownload = document.getElementById("download");
const buttonAutoColor = document.getElementById("autocolor-toggle");

buttonDraw.addEventListener("click", draw);
buttonDownload.addEventListener("click", downloadImage);

buttonAutoColor.addEventListener("click", () => {
    autocolor = !autocolor;
    buttonAutoColor.innerHTML = `<span>Automatically change Color Bar: ${autocolor ? "ON" : "OFF"}</span>`;
});

const bubbleShadowPadding = 22;
const bubble9SliceSquare = [
    bubbleShadowPadding,
    bubbleShadowPadding,
    468,
    115
];
const bubbleMaxWidth = bubbleShadowPadding * 2 + 388;

function draw() {
    if (!loaded) return;

    bubbleCtx.clearRect(0, 0, bubbleCanvas.width, bubbleCanvas.height);
    bubbleCanvas.width = 1000;
    bubbleCanvas.height = 2000;

    bubbleCtx.shadowColor = inputColor.value + "80";
    bubbleCtx.shadowBlur = 3;

    bubbleCtx.fillStyle = inputColor.value;
    bubbleCtx.fillRect(bubbleShadowPadding + 16, bubbleShadowPadding + 16, 4, 20)

    bubbleCtx.shadowColor = "#ffffff00";
    bubbleCtx.shadowBlur = 0;

    const nameX = bubbleShadowPadding + 16 + 4 + 8 + 2;
    const nameY = bubbleShadowPadding + 16 + 11;

    bubbleCtx.font = "18px PEB";
    bubbleCtx.letterSpacing = "0.4px";
    bubbleCtx.fillStyle = "#fff";
    bubbleCtx.textBaseline = "middle";
    bubbleCtx.fillText(inputName.value, nameX, nameY);

    const nameWidth = bubbleCtx.measureText(inputName.value).width;

    bubbleCtx.font = "17px PB";
    bubbleCtx.letterSpacing = "0.2px";
    bubbleCtx.fillStyle = "#ddd";
    bubbleCtx.textBaseline = "top";

    const dialogMaxWidth = bubbleMaxWidth - bubbleShadowPadding * 2 - 16 * 4;

    // bubbleCtx.fillRect(bubbleShadowPadding + 16 + 4 + 8 + 2, bubbleShadowPadding + 16 + 32, dialogMaxWidth, 100);

    const dialogX = bubbleShadowPadding + 16 + 4 + 8 + 2;
    const dialogY = bubbleShadowPadding + 16 + 36;

    let lines = getLinesForParagraphs(bubbleCtx, inputDialog.value, dialogMaxWidth);
    let yoffset = 26;

    let maxWidth = 0;
    let lastY = 0;

    for (let i = 0; i < lines.length; i++) {
        bubbleCtx.fillText(lines[i] || "",  dialogX, dialogY + i * yoffset, dialogMaxWidth);

        const metrics = bubbleCtx.measureText(lines[i]);

        if (metrics.width > maxWidth) {
            maxWidth = metrics.width;
        }

        lastY = dialogY + i * yoffset;
    }

    bubbleCtx.globalCompositeOperation = "destination-over";
    const calcBubbleWidth = Math.min(bubbleMaxWidth, maxWidth + dialogX * 2);
    const calcBubbleHeight = lastY + yoffset + 16 + 20;
    draw9slice(bubbleCtx, bubble, bubble9SliceSquare, 0, 0, Math.max(calcBubbleWidth, 300, nameWidth + nameX * 2), calcBubbleHeight);
    bubbleCtx.globalCompositeOperation = "source-over";

    const newCanvas = trimCanvas(bubbleCanvas);
    bubbleCanvas.width = newCanvas.width;
    bubbleCanvas.height = newCanvas.height;
    bubbleCtx.drawImage(newCanvas, 0, 0);
}

function getLines(ctx, text, maxWidth) {
    const separator = text.includes(" ") ? " " : "";
    var words = text.split(separator);
    var lines = [];
    var currentLine = words[0];

    for (var i = 1; i < words.length; i++) {
        var word = words[i];
        var width = ctx.measureText(currentLine + separator + word).width;
        if (width < maxWidth) {
            currentLine += separator + word;
        } else {
            lines.push(currentLine);
            currentLine = word;
        }
    }
    lines.push(currentLine);
    return lines;
}

function getLinesForParagraphs(ctx, text, maxWidth) {
    let ass = text.split("\n").map(para => getLines(ctx, para, maxWidth))
    let res = []

    for (let i = 0; i < ass.length; i++) {
        for (let j = 0; j < ass[i].length; j++) {
            res.push(ass[i][j]);
        }
    }

    return res;
}

function downloadImage() {
    var link = document.createElement('a');
    var canvas = document.getElementById('bubble-canvas')
    link.download = 'nikke-speech-bubble.png';
    link.href = canvas.toDataURL();
    link.click();
    link.remove();
}

let autocolor = true;

function autogent() {
    var text = inputName.value;

    if (autocolor) {
        for (const i of Object.keys(colorData)) {
            if (i.toLowerCase().trim() === text.toLowerCase().trim()) {
                inputColor.value = colorData[i];
                color = colorData[i];
            }
        }
    }

    draw();
}

inputName.addEventListener("input", autogent);
inputDialog.addEventListener("input", autogent);

let loaded = false;

setTimeout(() => {
    inputName.value = "Anis";
    inputDialog.value = randomBubble[Math.floor(Math.random() * (randomBubble.length - 1))];
    inputColor.value = "#f3b935";

    loaded = true;
    draw();

    inputName.value = "";
    inputDialog.value = "";
    inputColor.value = "#fff";
}, 3000)

//

const colorsMain = document.getElementById("colors-main");
const colorsSearch = document.getElementById("colors-search");
const colorsOpen = document.getElementById("colors-open");
const colorsClose = document.getElementById("colors-close");
const colorsList = document.getElementById("colors-list");
const colorsAdd = document.getElementById("colors-add");

colorsOpen.addEventListener("click", () => {
    colorsMain.style.display = null;
});

colorsClose.addEventListener("click", () => {
    colorsMain.style.display = "none";
});

colorsSearch.addEventListener("input", () => {
    updateColorsList();
});

colorsAdd.addEventListener("click", () => {
    colorData["New Color Definition"] = "#ffffff";
    updateColorsList();
})

// let colorKeyElements = [];

function updateColorsList() {
    colorsList.innerHTML = "";
    // colorKeyElements = [];
    const results = fuzzysort.go(colorsSearch.value, Object.keys(colorData), {all: true});

    for (const i of results) {
        const div = document.createElement("div");
        div.classList.add("input-option");
        div.classList.add("option-no-hover");

        const colorKey = document.createElement("input");
        colorKey.classList.add("fullwidth");
        colorKey.type = "text";
        colorKey.value = i.target;
        colorKey.onchange = () => {
            // recreate the entire dict to accomodate for position changes
            let ass = {};
            for (const j of Object.keys(colorData)) {
                if (j === i.target) {
                    ass[colorKey.value] = colorData[i.target];
                } else {
                    ass[j] = colorData[j];
                }
            }
            colorData = ass;

            updateColorsList();
            // colorKeyElements[Object.keys(colorData).indexOf(colorKey.value)].focus()
            draw();
        }
        // colorKeyElements.push(colorKey);

        const buttonTray = document.createElement("div");
        buttonTray.classList.add("button-tray");

        const removeColor = document.createElement("div");
        removeColor.classList.add("input-button");
        removeColor.classList.add("square");
        removeColor.innerHTML = `<i class="bx bx-trash"></i>`
        removeColor.onclick = () => {
            delete colorData[i.target];
            updateColorsList();
            draw()
        }
        buttonTray.appendChild(removeColor);

        const setColor = document.createElement("input");
        setColor.classList.add("input-button");
        setColor.classList.add("square");
        setColor.type = "color";
        setColor.value = colorData[i.target];
        setColor.oninput = () => {
            colorData[i.target] = setColor.value;
            draw()
        }
        buttonTray.appendChild(setColor);

        const applyColor = document.createElement("div");
        applyColor.classList.add("input-button");
        applyColor.classList.add("square");
        applyColor.innerHTML = `<i class="bx bxs-paint"></i>`
        applyColor.onclick = () => {
            document.getElementById('color').value = colorData[i.target];
            color = colorData[i.target];

            draw();

            colorsClose.dispatchEvent(new Event("click"));
        }
        buttonTray.appendChild(applyColor);

        div.appendChild(colorKey);
        div.appendChild(buttonTray);

        colorsList.appendChild(div);
    }
}

updateColorsList();

document.promptText = "You might have changes in the current Speech Bubble. Are you sure you want to change your font?";