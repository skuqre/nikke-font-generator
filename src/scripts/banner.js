import {draw9slice, drawImageWithRot, eyeOff, eyeOn, pointInPolygon, translateCoordinates, trimCanvas } from './util.js';
import fuzzysort from "fuzzysort";

const canvas = document.getElementById("banner-canvas");
const ctx = canvas.getContext("2d", { willReadFrequently: true });

const canvas2 = document.getElementById("banner-canvas2");
const ctx2 = canvas2.getContext("2d", { willReadFrequently: true });

const canvas3 = document.getElementById("banner-canvas3");
const ctx3 = canvas3.getContext("2d", { willReadFrequently: true });

// same ol
let nikkepfps = {}
const response = await fetch('https://api.dotgg.gg/nikke/characters/');
response.json().then((e) => {
    for (let i = 0; i < e.length; i++) {
        nikkepfps[e[i].name.toLowerCase()] = e[i].img;
    }
});

const response2 = await fetch('/nikke-font-generator/blabla-npcs.json');
response2.json().then((e) => {
    for (let i = 0; i < e.length; i++) {
        nikkepfps[e[i][0]] = e[i][1];
    }
});

const skinFetch = await fetch("https://nkas.pages.dev/nk_data/skins.json");
const skinData = await skinFetch.json();

const nkasL2dFetch = await fetch("https://nkas-l2d.pages.dev/characters.json");
const nkasL2dData = await nkasL2dFetch.json();

for (let i = 0; i < skinData.length; i++) {
    const skin = skinData[i];
    const cid = "c" + skin[0] + "_" + skin[1];

    const pngName = (nkasL2dData[cid] ?? "Name unavailable, check later!").toLowerCase();
    const pngSrc = "si_c" + skin[0] + "_" + skin[1] + "_s";

    nikkepfps[pngName] = pngSrc;
}

let rotateIcon = new Image();
rotateIcon.crossOrigin = "anonymous"
rotateIcon.src = `/nikke-font-generator/images/banner/icn_rotate.png`;

let maskMain = new Image();
maskMain.crossOrigin = "anonymous"
maskMain.src = `/nikke-font-generator/images/banner/mask_main.png`;

let maskVisuals = new Image();
maskVisuals.crossOrigin = "anonymous"
maskVisuals.src = `/nikke-font-generator/images/banner/mask_visual.png`;

let maskNikke = new Image();
maskNikke.crossOrigin = "anonymous"
maskNikke.src = `/nikke-font-generator/images/banner/mask_nikke.png`;

let maskTop = new Image();
maskTop.crossOrigin = "anonymous"
maskTop.src = `/nikke-font-generator/images/banner/mask_top.png`;

let bg = new Image();
bg.crossOrigin = "anonymous";
bg.onload = (e) => {
    generateBanner();
}

let char = new Image();
char.crossOrigin = "anonymous"
char.src = `https://nkas.pages.dev/characters_hq/c012_00.png`;
char.onload = (e) => {
    generateBanner();
}

const maskType = document.getElementById("masktype");
maskType.oninput = generateBanner;

const refresh = document.getElementById("generate");
refresh.onclick = generateBanner;

const deselect = document.getElementById("deselect");
deselect.onclick = () => {
    updateSelected(null);
    generateBanner();
}

let currentImage = ''
let currentClipboard = '';

document.getElementById("char-full-search").addEventListener("input", () => {
    if (Object.keys(nikkepfps).length > 0) {
        if (document.getElementById("char-full-search").value.trim().length > 0) {
            const results = fuzzysort.go(document.getElementById("char-full-search").value, Object.keys(nikkepfps));
            if (results.length > 0) {
                currentImage = `https://nkas.pages.dev/characters_hq/${nikkepfps[results[0].target].replace("si_", "").replace("_s", "")}.png`;

                document.getElementById("full-preview").src = `https://nkas.pages.dev/characters/${nikkepfps[results[0].target]}.png`;
                document.getElementById("full-preview").onerror = () => {
                    document.getElementById("full-preview").src = `https://nkas.pages.dev/characters_missing_si/${nikkepfps[results[0].target]}.png`;
                    document.getElementById("full-preview").onerror = () => {
                        document.getElementById("full-preview").src = `/nikke-font-generator/images/blabla/pfp/nochat.png`;
                    }
                }
            } else {
                document.getElementById("full-preview").src = `/nikke-font-generator/images/blabla/pfp/nochat.png`;
            }
        } else {
            currentImage = `https://nkas.pages.dev/characters_hq/c928_00.png`;
            document.getElementById("full-preview").src = `/nikke-font-generator/images/blabla/pfp/nochat.png`;
        }
    }

    char.src = currentImage;
});

document.getElementById("char-full-upload").onchange = (e) => {
    const fileList = document.querySelectorAll('#char-full-upload')[0].files;
    const filer = new FileReader();
    filer.onload = (e) => {
        char.src = e.target.result.toString();
        char.onerror = (e) => {
            char.src = "https://nkas.pages.dev/characters_hq/c928_00.png";
        }
    };
    if (fileList.length > 0) {
        filer.readAsDataURL(fileList[0]);
    }
}

let curBackground = "default_00";
let curObjects = [];
let curSelected = null;
let loadedImages = {};

let chpos = [730, 1060];
let chscale = 0.7;

document.getElementById("xposch").oninput = () => {
    chpos[0] = parseFloat(document.getElementById("xposch").value);
    generateBanner();
}

document.getElementById("yposch").oninput = () => {
    chpos[1] = parseFloat(document.getElementById("yposch").value);
    generateBanner();
}

document.getElementById("scalech").oninput = () => {
    chscale = parseFloat(document.getElementById("scalech").value) / 100;
    generateBanner();
}

function generateBanner() {
    // clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx2.clearRect(0, 0, canvas2.width, canvas2.width);
    ctx3.clearRect(0, 0, canvas3.width, canvas3.width);

    canvas.width = 900;
    canvas.height = 316;

    canvas2.width = 900;
    canvas2.height = 900;

    canvas3.width = 900;
    canvas3.height = 316;

    // draw background
    const bgSrc = `/nikke-font-generator/images/banner/bgs/icn_profile_bg_${curBackground}.png`;
    if (bg.src.split("/").pop() !== bgSrc.split("/").pop()) {
        bg.src = bgSrc;
    }
    
    if (maskType.value === "fullymask") {
        draw9slice(ctx, maskMain, [208, 9, 8, 8], 8, 14, 880, 290);
        ctx.globalCompositeOperation = "source-atop";
    }

    ctx.drawImage(bg, 0, canvas.height - bg.height);

    // draw objects
    for (const e of curObjects) {
        if (!(e.id in loadedImages)) {
            loadedImages[e.id] = new Image();
            loadedImages[e.id].src = "/nikke-font-generator/images/banner/" + e.type + "s/icn_profile_" + e.type + "_" + e.id + ".png";
            loadedImages[e.id].onload = () => {
                if (loadedImages[e.id].width > 0 || loadedImages[e.id].height > 0) {
                    generateBanner();
                } else {
                    return;
                }
            }
        }

        // TO DO:
        // DRAW ON TOP
        // LAYER MENU
        // ADD DOWNLOAD BUTTON
        // ADD TUTORIAL

        const image = loadedImages[e.id];
        const angle = e.transform.r * Math.PI / 180;

        drawImageWithRot(e.drawOnTop ? ctx3 : ctx, image, e.transform.x - (image.width / 2) * e.transform.s, e.transform.y - (image.height / 2) * e.transform.s, angle, e.transform.s);
    }

    if (maskType.value === "maskbounds") {
        ctx.drawImage(maskVisuals, 0, canvas.height - maskVisuals.height);
    }

    // draw character on second canvas
    if (showNikke) {
        ctx2.globalCompositeOperation = "source-over";
        ctx2.drawImage(char, chpos[0] - char.width * chscale / 2, chpos[1] - char.height * chscale / 2, char.width * chscale, char.height * chscale);
        if (maskType.value === "fullymask") {
            ctx2.globalCompositeOperation = "destination-out";
            ctx2.drawImage(maskNikke, 0, canvas2.height - maskNikke.height);

            if (curObjects.filter(e => e.drawOnTop).length > 0) {
                ctx3.globalCompositeOperation = "destination-out";
                ctx3.drawImage(maskTop, 0, 0);
            }
        }
    }

    ctx.globalCompositeOperation = "source-over";
    ctx3.globalCompositeOperation = "source-over";
    
    if (curSelected !== null) {
        const e = curObjects.find(e => e.name === curSelected);
        const angle = e.transform.r * Math.PI / 180;
        const image = loadedImages[e.id];

        // draw bounding box
        ctx3.strokeStyle = "#ffffff";
        ctx3.lineWidth = 3;
        ctx3.beginPath();
        ctx3.moveTo(e.transform.x - (image.width * e.transform.s / 2) * Math.cos(angle) - (image.height * e.transform.s / 2) * Math.sin(angle),
                   e.transform.y - (image.width * e.transform.s / 2) * Math.sin(angle) + (image.height * e.transform.s / 2) * Math.cos(angle));
        ctx3.lineTo(e.transform.x + (image.width * e.transform.s / 2) * Math.cos(angle) - (image.height * e.transform.s / 2) * Math.sin(angle),
                   e.transform.y + (image.width * e.transform.s / 2) * Math.sin(angle) + (image.height * e.transform.s / 2) * Math.cos(angle));
        ctx3.lineTo(e.transform.x + (image.width * e.transform.s / 2) * Math.cos(angle) + (image.height * e.transform.s / 2) * Math.sin(angle),
                   e.transform.y + (image.width * e.transform.s / 2) * Math.sin(angle) - (image.height * e.transform.s / 2) * Math.cos(angle));
        ctx3.lineTo(e.transform.x - (image.width * e.transform.s / 2) * Math.cos(angle) + (image.height * e.transform.s / 2) * Math.sin(angle),
                   e.transform.y - (image.width * e.transform.s / 2) * Math.sin(angle) - (image.height * e.transform.s / 2) * Math.cos(angle));
        ctx3.closePath()
        ctx3.stroke();

        // draw rotate button
        ctx3.fillStyle = "#323232";
        ctx3.lineWidth = 5;
        ctx3.beginPath();
        ctx3.arc(e.transform.x + (image.width * e.transform.s / 2) * Math.cos(angle) - (image.height * e.transform.s / 2) * Math.sin(angle),
                e.transform.y + (image.width * e.transform.s / 2) * Math.sin(angle) + (image.height * e.transform.s / 2) * Math.cos(angle), 16, 0, 2 * Math.PI);
        ctx3.stroke();
        ctx3.fill();
        ctx3.closePath()
        ctx3.drawImage(rotateIcon,
            e.transform.x + (image.width * e.transform.s / 2) * Math.cos(angle) - (image.height * e.transform.s / 2) * Math.sin(angle) - (24 / 2),
            e.transform.y + (image.width * e.transform.s / 2) * Math.sin(angle) + (image.height * e.transform.s / 2) * Math.cos(angle) - ((rotateIcon.height * 24 / rotateIcon.width) / 2),
            24, rotateIcon.height * 24 / rotateIcon.width)
    }
}

Array.prototype.swap = function(x, y){
    var b = this[x];
    this[x] = this[y];
    this[y] = b;
    return this;
}

const layerSelector = document.getElementById("layer-selector");
function updateLayerDisplay() {
    while (layerSelector.lastChild) {
        layerSelector.removeChild(layerSelector.lastChild);
    }

    for (const i of curObjects) {
        const object = i;
        const objectIndex = curObjects.indexOf(object);

        const div = document.createElement("div");
        div.classList.add("input-option");
        div.classList.add("option-no-hover");
        div.style.justifyContent = "spacing-between";
        div.id = "layer-option-" + i.name;
        div.onclick = () => {
            updateSelected(object.name);
            generateBanner();
        }

        const divHighlight = document.createElement("div");
        divHighlight.classList.add("layer-select-highlight")
        divHighlight.style.display = i.name === curSelected ? "block" : "none";
        divHighlight.id = "layer-highlight-" + i.name;
        div.append(divHighlight);

        const image = document.createElement("img");
        image.src = "/nikke-font-generator/images/banner/si_" + i.type + "s/si_profile_" + i.type + "_" + i.id + ".png";
        image.style.maxWidth = "48px";
        image.style.maxHeight = "48px";
        div.append(image);

        const div2 = document.createElement("div");
        div2.classList.add("button-tray")

        const drawOnTop = document.createElement("div");
        drawOnTop.classList.add("input-button");
        drawOnTop.classList.add("square");
        drawOnTop.style.color = i.drawOnTop ? "var(--main-color)" : "white";
        drawOnTop.innerHTML = "<span><i class='bx bx-minus-front'></i></span>";
        drawOnTop.title = "Toggle to make this sticker draw on top of the NIKKE or not.";
        drawOnTop.id = "layer-top-" + object.name;
        drawOnTop.onclick = () => {
            object.drawOnTop = !object.drawOnTop;

            updateSelected(curSelected);
            updateLayerDisplay();
            generateBanner();
        }

        const layerUp = document.createElement("div");
        layerUp.classList.add("input-button");
        layerUp.classList.add("square");
        layerUp.innerHTML = "<span><i class='bx bx-chevron-up'></i></span>";
        layerUp.title = "Move this sticker one layer up";
        layerUp.id = "layer-up-" + object.name;
        layerUp.onclick = () => {
            let newIndex = objectIndex + 1;
            if (newIndex > curObjects.length - 1) {
                newIndex = curObjects.length - 1;
            }
            if (newIndex < 0) {
                newIndex = 0;
            }
            curObjects.swap(objectIndex, newIndex);

            updateSelected(curSelected);
            generateBanner();
        }

        const layerDown = document.createElement("div");
        layerDown.classList.add("input-button");
        layerDown.classList.add("square");
        layerDown.innerHTML = "<span><i class='bx bx-chevron-down'></i></span>";
        layerDown.title = "Move this sticker one layer down";
        layerDown.id = "layer-down-" + object.name;
        layerDown.onclick = () => {
            let newIndex = objectIndex - 1;
            if (newIndex > curObjects.length - 1) {
                newIndex = curObjects.length - 1;
            }
            if (newIndex < 0) {
                newIndex = 0;
            }
            curObjects.swap(objectIndex, newIndex);

            updateSelected(curSelected);
            generateBanner();
        }

        const trash = document.createElement("div");
        trash.classList.add("input-button");
        trash.classList.add("square");
        trash.innerHTML = "<span><i class='bx bx-trash'></i></span>";
        trash.id = "layer-trash-" + object.name;
        trash.onclick = () => {
            div.onclick();
            curObjects = curObjects.filter(e => e.name !== curSelected);
            updateSelected(null);
            generateBanner();
        }

        div2.append(drawOnTop);
        div2.append(layerUp);
        div2.append(layerDown);
        div2.append(trash);

        div.append(div2);

        layerSelector.appendChild(div);
    }
}

const xposObj = document.getElementById("xposobj");
const yposObj = document.getElementById("yposobj");
const scaleObj = document.getElementById("scaleobj");
const rotateObj = document.getElementById("rotateobj");

const rotateToggle = document.getElementById("rotate-toggle");
const scaleToggle = document.getElementById("scale-toggle");

const copyButton = document.getElementById("copy-sticker");
const pasteButton = document.getElementById("paste-sticker");
const dupeButton = document.getElementById("dupe-sticker");

const moveUpSticker = document.getElementById("top-sticker");
const moveDownSticker = document.getElementById("bot-sticker");
const frontToggle = document.getElementById("front-sticker");

function updateSelected(selection) {
    curSelected = selection;

    const bannerTool = document.getElementById("banner-tool-main");
    bannerTool.style.display = selection === null ? "none" : "flex";

    updateLayerDisplay();

    if (curSelected === null) {
        return;
    }

    const curSelectedObject = curObjects.find(e => e.name === curSelected);
    if (curSelectedObject === undefined || curSelectedObject === null) {
        updateSelected(null);
        generateBanner();
        return;
    }

    xposObj.value = curSelectedObject.transform.x;
    yposObj.value = curSelectedObject.transform.y;
    scaleObj.value = curSelectedObject.transform.s * 100;
    rotateObj.value = curSelectedObject.transform.r;

    rotateToggle.style.color = canRotate ? "var(--main-color)" : "#fff";
    scaleToggle.style.color = canScale ? "var(--main-color)" : "#fff";

    frontToggle.style.color = curSelectedObject.drawOnTop ? "var(--main-color)" : "#fff";
}

xposObj.addEventListener("input", (e) => {
    if (curSelected === null) return;
    const curSelectedObject = curObjects.find(e => e.name === curSelected);

    curSelectedObject.transform.x = parseFloat(xposObj.value);

    generateBanner();
    updateSelected(curSelected);
});

yposObj.addEventListener("input", (e) => {
    if (curSelected === null) return;
    const curSelectedObject = curObjects.find(e => e.name === curSelected);

    curSelectedObject.transform.y = parseFloat(yposObj.value);

    generateBanner();
    updateSelected(curSelected);
});

scaleObj.addEventListener("input", (e) => {
    if (curSelected === null) return;
    const curSelectedObject = curObjects.find(e => e.name === curSelected);

    curSelectedObject.transform.s = parseFloat(scaleObj.value) / 100;

    generateBanner();
    updateSelected(curSelected);
});

rotateObj.addEventListener("input", (e) => {
    if (curSelected === null) return;
    const curSelectedObject = curObjects.find(e => e.name === curSelected);

    curSelectedObject.transform.r = parseFloat(rotateObj.value);

    generateBanner();
    updateSelected(curSelected);
});

rotateToggle.addEventListener("click", (e) => {
    if (curSelected === null) return;

    canRotate = !canRotate;

    updateSelected(curSelected);
});

scaleToggle.addEventListener("click", (e) => {
    if (curSelected === null) return;

    canScale = !canScale;

    updateSelected(curSelected);
});

copyButton.addEventListener("click", copySticker);
pasteButton.addEventListener("click", pasteSticker);
dupeButton.addEventListener("click", dupeSticker);

moveUpSticker.addEventListener("click", (e) => {
    if (curSelected === null) return;
    const curSelectedObject = curObjects.find(e => e.name === curSelected);
    document.getElementById("layer-up-" + curSelectedObject.name).onclick();
});

moveDownSticker.addEventListener("click", (e) => {
    if (curSelected === null) return;
    const curSelectedObject = curObjects.find(e => e.name === curSelected);
    document.getElementById("layer-down-" + curSelectedObject.name).onclick();
});

frontToggle.addEventListener("click", (e) => {
    if (curSelected === null) return;
    const curSelectedObject = curObjects.find(e => e.name === curSelected);
    document.getElementById("layer-top-" + curSelectedObject.name).onclick();
});

document.getElementById("del-sticker").addEventListener("click", (e) => {
    if (curSelected === null) return;

    curObjects = curObjects.filter(e => e.name !== curSelected);

    updateSelected(null);
    generateBanner();
});

document.getElementById("align-obj-top").addEventListener("click", (e) => {
    if (curSelected === null) return;
    const curSelectedObject = curObjects.find(e => e.name === curSelected);
    const image = loadedImages[curSelectedObject.id];
    const angle = curSelectedObject.transform.r * Math.PI / 180;

    curSelectedObject.transform.y = (image.height * curSelectedObject.transform.s * Math.abs(Math.cos(angle)) 
                                  + image.width * curSelectedObject.transform.s * Math.abs(Math.sin(angle))) / 2;
    
    generateBanner();
    updateSelected(curSelected);
});

document.getElementById("align-obj-ymid").addEventListener("click", (e) => {
    if (curSelected === null) return;
    const curSelectedObject = curObjects.find(e => e.name === curSelected);

    curSelectedObject.transform.y = bg.height / 2;
    
    generateBanner();
    updateSelected(curSelected);
});

document.getElementById("align-obj-bot").addEventListener("click", (e) => {
    if (curSelected === null) return;
    const curSelectedObject = curObjects.find(e => e.name === curSelected);
    const image = loadedImages[curSelectedObject.id];
    const angle = curSelectedObject.transform.r * Math.PI / 180;

    curSelectedObject.transform.y = bg.height - (image.height * curSelectedObject.transform.s * Math.abs(Math.cos(angle)) 
                                  + image.width * curSelectedObject.transform.s * Math.abs(Math.sin(angle))) / 2;
    
    generateBanner();
    updateSelected(curSelected);
});

document.getElementById("align-obj-left").addEventListener("click", (e) => {
    if (curSelected === null) return;
    const curSelectedObject = curObjects.find(e => e.name === curSelected);
    const image = loadedImages[curSelectedObject.id];
    const angle = curSelectedObject.transform.r * Math.PI / 180;

    curSelectedObject.transform.x = (image.width * curSelectedObject.transform.s * Math.abs(Math.cos(angle)) 
                                  + image.height * curSelectedObject.transform.s * Math.abs(Math.sin(angle))) / 2;
    
    generateBanner();
    updateSelected(curSelected);
});

document.getElementById("align-obj-xmid").addEventListener("click", (e) => {
    if (curSelected === null) return;
    const curSelectedObject = curObjects.find(e => e.name === curSelected);

    curSelectedObject.transform.x = bg.width / 2;
    
    generateBanner();
    updateSelected(curSelected);
});

document.getElementById("align-obj-right").addEventListener("click", (e) => {
    if (curSelected === null) return;
    const curSelectedObject = curObjects.find(e => e.name === curSelected);
    const image = loadedImages[curSelectedObject.id];
    const angle = curSelectedObject.transform.r * Math.PI / 180;

    curSelectedObject.transform.x = bg.width - (image.width * curSelectedObject.transform.s * Math.abs(Math.cos(angle)) 
                                  + image.height * curSelectedObject.transform.s * Math.abs(Math.sin(angle))) / 2;
    
    generateBanner();
    updateSelected(curSelected);
});

let mouseCapture = [0, 0];
let curSelectedCapture = [0, 0];
let curSelectedScaleCapture = 1;
let dragging = false;
let rotating = false;

let canScale = true;
let canRotate = true;
let justClicked = false;

// drag function
canvas.addEventListener('pointerdown', (e) => {
    const coords = translateCoordinates(e, canvas);

    if (curSelected !== null && !dragging) {
        dragging = true;
        justClicked = true;
        mouseCapture[0] = coords[0];
        mouseCapture[1] = coords[1];

        const curSelectedObject = curObjects.find(e => e.name === curSelected);

        curSelectedCapture[0] = curSelectedObject.transform.x;
        curSelectedCapture[1] = curSelectedObject.transform.y;
        curSelectedScaleCapture = curSelectedObject.transform.s;

        const image = loadedImages[curSelectedObject.id];
        const angle = curSelectedObject.transform.r * Math.PI / 180;

        const rotateX = curSelectedObject.transform.x + (image.width * curSelectedObject.transform.s / 2) * Math.cos(angle) - (image.height * curSelectedObject.transform.s / 2) * Math.sin(angle) - 16;
        const rotateY = curSelectedObject.transform.y + (image.width * curSelectedObject.transform.s / 2) * Math.sin(angle) + (image.height * curSelectedObject.transform.s / 2) * Math.cos(angle) - 16;
        const rotateWidth = rotateX + 32;
        const rotateHeight = rotateY + 32;

        rotating = (coords[0] >= rotateX && coords[0] <= rotateWidth) && (coords[1] >= rotateY && coords[1] <= rotateHeight);
    }

    // uncomment to see if coords are working right
    // ctx.fillRect(coords[0] - 12, coords[1] - 12, 24, 24);

    if (!rotating) {
        // check if hovering over selected object first
        if (curSelected !== null) {
            const curSelectedObject = curObjects.find(e => e.name === curSelected);
            const image = loadedImages[curSelectedObject.id];
            const angle = curSelectedObject.transform.r * Math.PI / 180;
            let points = [
                [curSelectedObject.transform.x - (image.width * curSelectedObject.transform.s / 2) * Math.cos(angle) - (image.height * curSelectedObject.transform.s / 2) * Math.sin(angle),
                    curSelectedObject.transform.y - (image.width * curSelectedObject.transform.s / 2) * Math.sin(angle) + (image.height * curSelectedObject.transform.s / 2) * Math.cos(angle)],
                [curSelectedObject.transform.x + (image.width * curSelectedObject.transform.s / 2) * Math.cos(angle) - (image.height * curSelectedObject.transform.s / 2) * Math.sin(angle),
                    curSelectedObject.transform.y + (image.width * curSelectedObject.transform.s / 2) * Math.sin(angle) + (image.height * curSelectedObject.transform.s / 2) * Math.cos(angle)],
                [curSelectedObject.transform.x + (image.width * curSelectedObject.transform.s / 2) * Math.cos(angle) + (image.height * curSelectedObject.transform.s / 2) * Math.sin(angle),
                    curSelectedObject.transform.y + (image.width * curSelectedObject.transform.s / 2) * Math.sin(angle) - (image.height * curSelectedObject.transform.s / 2) * Math.cos(angle)],
                [curSelectedObject.transform.x - (image.width * curSelectedObject.transform.s / 2) * Math.cos(angle) + (image.height * curSelectedObject.transform.s / 2) * Math.sin(angle),
                    curSelectedObject.transform.y - (image.width * curSelectedObject.transform.s / 2) * Math.sin(angle) - (image.height * curSelectedObject.transform.s / 2) * Math.cos(angle)]
            ]
            const hoveringOverSelected = pointInPolygon(points, coords);
            if (hoveringOverSelected) return;
        }


        for (const i of [...curObjects].reverse()) {
            // ever wanted to cry so bad
            const e = i;
            const image = loadedImages[i.id];
            const angle = i.transform.r * Math.PI / 180;
            let points = [
                [e.transform.x - (image.width * e.transform.s / 2) * Math.cos(angle) - (image.height * e.transform.s / 2) * Math.sin(angle),
                    e.transform.y - (image.width * e.transform.s / 2) * Math.sin(angle) + (image.height * e.transform.s / 2) * Math.cos(angle)],
                [e.transform.x + (image.width * e.transform.s / 2) * Math.cos(angle) - (image.height * e.transform.s / 2) * Math.sin(angle),
                    e.transform.y + (image.width * e.transform.s / 2) * Math.sin(angle) + (image.height * e.transform.s / 2) * Math.cos(angle)],
                [e.transform.x + (image.width * e.transform.s / 2) * Math.cos(angle) + (image.height * e.transform.s / 2) * Math.sin(angle),
                    e.transform.y + (image.width * e.transform.s / 2) * Math.sin(angle) - (image.height * e.transform.s / 2) * Math.cos(angle)],
                [e.transform.x - (image.width * e.transform.s / 2) * Math.cos(angle) + (image.height * e.transform.s / 2) * Math.sin(angle),
                    e.transform.y - (image.width * e.transform.s / 2) * Math.sin(angle) - (image.height * e.transform.s / 2) * Math.cos(angle)]
            ]
            
            const hoveringOverObject = pointInPolygon(points, coords);
    
            if (hoveringOverObject) {
                // curSelected = i.name;
                updateSelected(i.name);
                generateBanner();
                break;
            } else {
                // curSelected = null;
                updateSelected(null);
                generateBanner();
            }
        }
    }
});

document.addEventListener('pointermove', (e) => {
    const coords = translateCoordinates(e, canvas);

    if (curSelected !== null && dragging && justClicked) {
        justClicked = false;

        mouseCapture[0] = coords[0];
        mouseCapture[1] = coords[1];

        const curSelectedObject = curObjects.find(e => e.name === curSelected);

        curSelectedCapture[0] = curSelectedObject.transform.x;
        curSelectedCapture[1] = curSelectedObject.transform.y;
        curSelectedScaleCapture = curSelectedObject.transform.s;
    }

    if (curSelected !== null && dragging && !justClicked) {
        const curSelectedObject = curObjects.find(e => e.name === curSelected);

        if (!rotating) {
            curSelectedObject.transform.x = curSelectedCapture[0] + (coords[0] - mouseCapture[0]);
            curSelectedObject.transform.y = curSelectedCapture[1] + (coords[1] - mouseCapture[1]);
        } else {
            const image = loadedImages[curSelectedObject.id];
            const rotateX = curSelectedObject.transform.x + (image.width * curSelectedObject.transform.s / 2) * Math.cos(0) - (image.height * curSelectedObject.transform.s / 2) * Math.sin(0);
            const rotateY = curSelectedObject.transform.y + (image.width * curSelectedObject.transform.s / 2) * Math.sin(0) + (image.height * curSelectedObject.transform.s / 2) * Math.cos(0);
            const offset = Math.atan2((rotateY - curSelectedObject.transform.y + (canvas.height - bg.height)), (rotateX - curSelectedObject.transform.x)) * 180 / Math.PI;

            if (canRotate) {
                curSelectedObject.transform.r = Math.atan2((coords[1] - curSelectedObject.transform.y + (canvas.height - bg.height)), (coords[0] - curSelectedObject.transform.x)) * 180 / Math.PI - offset;
            }

            if (canScale) {
                const distanceOfCapture = Math.sqrt(Math.pow((mouseCapture[0] - curSelectedObject.transform.x), 2) + Math.pow((mouseCapture[1] - curSelectedObject.transform.y + (canvas.height - bg.height)), 2))
                const distanceOfCurrent = Math.sqrt(Math.pow((coords[0] - curSelectedObject.transform.x), 2) + Math.pow((coords[1] - curSelectedObject.transform.y + (canvas.height - bg.height)), 2))
                curSelectedObject.transform.s = curSelectedScaleCapture * distanceOfCurrent / distanceOfCapture;
            }
        }

        generateBanner();
        updateSelected(curSelected);
    }
});

document.addEventListener('pointerup', (e) => {
    if (dragging) {
        dragging = false;
        rotating = false;
        justClicked = false;

        generateBanner();
    }
});

setTimeout(() => {
    generateBanner();
    updateLayerDisplay();
}, 2000);

// initialize bg elements
const bgElements = [...document.querySelectorAll(`[id^="bg-option-"]`)];
for (const e of bgElements) {
    e.onclick = () => {
        curBackground = e.id.replaceAll("bg-option-", "").trim();
        updateBgSelection();
        generateBanner();
    }
}

function updateBgSelection() {
    for (const e of bgElements) {
        e.style.backgroundColor = "";
    }

    const selected = document.getElementById("bg-option-" + curBackground);
    selected.style.backgroundColor = "var(--main-color)";
}

updateBgSelection();

// initialize stickers
const stickerElements = [...document.querySelectorAll(`[id^="sticker-option-"]`)];
for (const e of stickerElements) {
    e.onclick = () => {
        let cleaned = e.id.replaceAll("sticker-option-", "").trim();
        let copy = 0;

        for (const i of curObjects) {
            if (cleaned === i.id) {
                const numGet = i.name.match(/(%\d+%)/gm);
                const num = numGet.length > 0 ? parseInt(numGet[0].replaceAll("%","").trim()) : 0;
    
                if (num > copy) {
                    copy = num;
                }
            }
        }
        copy += 1;

        let name = cleaned + (copy > 0 ? ` (STICKER, %${copy}%)` : "");

        curObjects.push({
            name: name,
            id: cleaned,
            type: "sticker",
            drawOnTop: false,
            transform: {
                x: bg.width / 2,
                y: bg.height / 2,
                s: 1,
                r: 0
            }
        });

        // curSelected = name;
        updateSelected(name);
        updateLayerDisplay();

        generateBanner();
    }
}

// initialize titles
const titleElements = [...document.querySelectorAll(`[id^="title-option-"]`)];
for (const e of titleElements) {
    e.onclick = () => {
        let cleaned = e.id.replaceAll("title-option-", "").trim();
        let copy = 0;

        for (const i of curObjects) {
            if (cleaned === i.id) {
                const numGet = i.name.match(/(%\d+%)/gm);
                const num = numGet.length > 0 ? parseInt(numGet[0].replaceAll("%","").trim()) : 0;
    
                if (num > copy) {
                    copy = num;
                }
            }
        }
        copy += 1;

        let name = cleaned + (copy > 0 ? ` (TITLE, %${copy}%)` : "");

        curObjects.push({
            name: name,
            id: cleaned,
            type: "title",
            drawOnTop: false,
            transform: {
                x: bg.width / 2,
                y: bg.height / 2,
                s: 1,
                r: 0
            }
        });

        // curSelected = name;
        updateSelected(name);
        updateLayerDisplay();

        generateBanner();
    }
}

const canvasFinal = document.getElementById("banner-canvas-final");
const ctxFinal = canvasFinal.getContext("2d", {willReadFrequently: true});
document.getElementById("download").onclick = () => {
    const lastSelected = curSelected;
    updateSelected(null);
    generateBanner();

    canvasFinal.width = 900;
    canvasFinal.height = 900;
    ctxFinal.clearRect(0, 0, canvasFinal.width, canvasFinal.height);
    ctxFinal.drawImage(canvas, 0, canvasFinal.height - bg.height);
    ctxFinal.drawImage(canvas2, 0, 0);
    ctxFinal.drawImage(canvas3, 0, canvasFinal.height - bg.height);

    const newCanvas = trimCanvas(canvasFinal);
    canvasFinal.width = newCanvas.width;
    canvasFinal.height = newCanvas.height;
    ctxFinal.drawImage(newCanvas, 0, 0);

    var link = document.createElement('a');
    link.download = 'nikke-banner.png';
    link.href = canvasFinal.toDataURL()
    link.click();

    updateSelected(lastSelected);
    generateBanner();
}

document.onkeydown = function (e) {
    if (e.ctrlKey) {
        switch (e.key.toLowerCase()) {
            case 'd':
                e.preventDefault();
                dupeSticker(!e.altKey);
                break;
            case 'c':
                e.preventDefault();
                copySticker();
                break;
            case 'v':
                e.preventDefault();
                pasteSticker();
                break;
            case 'e':
                e.preventDefault();
                document.getElementById("download").onclick();
                break;
            default:
                break;
        }
    } else {
        switch (e.key.toLowerCase()) {
            case 'del':
            case 'delete':
                e.preventDefault();
                if (curSelected === null) return;
                document.getElementById("del-sticker").dispatchEvent(new Event("click"));
                break;
        }
    }
};

let showNikke = true;
document.getElementById("nikke-toggle").onclick = () => {
    showNikke = !showNikke;
    document.getElementById("nikke-toggle").innerHTML = showNikke ? eyeOn : eyeOff;
    generateBanner();
}

function copySticker() {
    if (curSelected === null) return;
    const curSelectedObject = curObjects.find(e => e.name === curSelected);
    currentClipboard = JSON.stringify(curSelectedObject);
}

function pasteSticker() {
    if (curSelected === null) return;
    if (currentClipboard === "") return;

    const curSelectedObject = JSON.parse(currentClipboard);
    let cleaned = curSelectedObject.id;
    let copy = 0;

    for (const i of curObjects) {
        if (cleaned === i.id) {
            const numGet = i.name.match(/(%\d+%)/gm);
            const num = numGet.length > 0 ? parseInt(numGet[0].replaceAll("%","").trim()) : 0;

            if (num > copy) {
                copy = num;
            }
        }
    }
    copy += 1;

    const newObject = JSON.parse(currentClipboard);
    newObject.name = cleaned + (copy > 0 ? ` (${newObject.type.toUpperCase()}, %${copy}%)` : "")
    curObjects.push(newObject);

    updateSelected(newObject.name);
    generateBanner();
}

function dupeSticker(onLayer = false) {
    if (curSelected === null) return;
    const curSelectedObject = curObjects.find(e => e.name === curSelected);
    let cleaned = curSelectedObject.id;
    let copy = 0;

    for (const i of curObjects) {
        if (cleaned === i.id) {
            const numGet = i.name.match(/(%\d+%)/gm);
            const num = numGet.length > 0 ? parseInt(numGet[0].replaceAll("%","").trim()) : 0;

            if (num > copy) {
                copy = num;
            }
        }
    }
    copy += 1;

    const newObject = JSON.parse(JSON.stringify(curSelectedObject));
    newObject.name = cleaned + (copy > 0 ? ` (${newObject.type.toUpperCase()}, %${copy}%)` : "")

    if (onLayer) {
        curObjects.splice(curObjects.indexOf(curSelectedObject) + 1, 0, newObject);
    } else {
        curObjects.push(newObject);
    }

    updateSelected(newObject.name);
    generateBanner();
}