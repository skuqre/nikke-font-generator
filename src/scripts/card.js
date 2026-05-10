import { draw9slice, recolorImage, trimCanvas, translateCoordinates } from './util.js';
import fuzzysort from "fuzzysort";

const canvas = document.getElementById("card-canvas");
const ctx = canvas.getContext("2d", { willReadFrequently: true });

const myFont = new FontFace('PB', "url('/nikke-font-generator/fonts/Pretendard-Bold.ttf')");
await myFont.load();
document.fonts.add(myFont);

const myFont2 = new FontFace('AE', "url('/nikke-font-generator/fonts/AireExterior.ttf')");
await myFont2.load();
document.fonts.add(myFont2);

const myFont3 = new FontFace('ABOL', "url('/nikke-font-generator/fonts/AbolitionTest-Regular.ttf')");
await myFont3.load();
document.fonts.add(myFont3);

const myFont4 = new FontFace('AZO', "url('/nikke-font-generator/fonts/Azonix.otf')");
await myFont4.load();
document.fonts.add(myFont4);

const myFont5 = new FontFace('AIRE', "url('/nikke-font-generator/fonts/AireExterior.ttf')");
await myFont5.load();
document.fonts.add(myFont5);

// same ol, just replace si with mi
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

let bg = new Image();
bg.crossOrigin = "anonymous"
bg.src = `/nikke-font-generator/images/card/card_bg.png`;

let synchroBorder = new Image();
synchroBorder.crossOrigin = "anonymous"
synchroBorder.src = `/nikke-font-generator/images/card/synchro_border.png`;

let trialBorder = new Image();
trialBorder.crossOrigin = "anonymous"
trialBorder.src = `/nikke-font-generator/images/card/trial_border.png`;

let decoBar = new Image();
decoBar.crossOrigin = "anonymous"
decoBar.src = `/nikke-font-generator/images/card/deco_weirdbar.png`;

let decoBar2 = new Image();
decoBar2.crossOrigin = "anonymous"
decoBar2.src = `/nikke-font-generator/images/card/deco_weirdbar2.png`;

let decoOverlay = new Image();
decoOverlay.crossOrigin = "anonymous"
decoOverlay.src = `/nikke-font-generator/images/card/overlay.png`;

let decoSynchro = new Image();
decoSynchro.crossOrigin = "anonymous"
decoSynchro.src = `/nikke-font-generator/images/card/ele_synchro_upgrade_deco.png`;

let char = new Image();
char.crossOrigin = "anonymous"
char.src = `https://nkas.pages.dev/characters/mi_c928_00_s.png`;
char.onload = (e) => {
    generateCard();
}

let classAttacker = new Image();
classAttacker.crossOrigin = "anonymous"
classAttacker.src = `/nikke-font-generator/images/card/icn_class_attacker.png`;

let classDefender = new Image();
classDefender.crossOrigin = "anonymous"
classDefender.src = `/nikke-font-generator/images/card/icn_class_defender.png`;

let classSupporter = new Image();
classSupporter.crossOrigin = "anonymous"
classSupporter.src = `/nikke-font-generator/images/card/icn_class_supporter.png`;

let hexFrameDark = new Image();
hexFrameDark.crossOrigin = "anonymous"
hexFrameDark.src = `/nikke-font-generator/images/card/hex_frame_dark.png`;

let hexFrameLight = new Image();
hexFrameLight.crossOrigin = "anonymous"
hexFrameLight.src = `/nikke-font-generator/images/card/hex_frame_light.png`;

let hexStroke1 = new Image();
hexStroke1.crossOrigin = "anonymous"
hexStroke1.src = `/nikke-font-generator/images/card/hex_stroke_1.png`;

let hexStroke2 = new Image();
hexStroke2.crossOrigin = "anonymous"
hexStroke2.src = `/nikke-font-generator/images/card/hex_stroke_2.png`;

let favoriteIcon = new Image();
favoriteIcon.crossOrigin = "anonymous"
favoriteIcon.src = `/nikke-font-generator/images/card/favorite.png`;

let burst1 = new Image();
burst1.crossOrigin = "anonymous"
burst1.src = `/nikke-font-generator/images/card/icn_burst_01.png`;

let burst2 = new Image();
burst2.crossOrigin = "anonymous"
burst2.src = `/nikke-font-generator/images/card/icn_burst_02.png`;

let burst3 = new Image();
burst3.crossOrigin = "anonymous"
burst3.src = `/nikke-font-generator/images/card/icn_burst_03.png`;

let burstall = new Image();
burstall.crossOrigin = "anonymous"
burstall.src = `/nikke-font-generator/images/card/icn_burst_all.png`;

let lbEmpty = new Image();
lbEmpty.crossOrigin = "anonymous"
lbEmpty.src = `/nikke-font-generator/images/card/lb_empty.png`;

let lbFilled = new Image();
lbFilled.crossOrigin = "anonymous"
lbFilled.src = `/nikke-font-generator/images/card/lb_filled.png`;

let coreNumBG = new Image();
coreNumBG.crossOrigin = "anonymous"
coreNumBG.src = `/nikke-font-generator/images/card/core_bg.png`;

let coreMax = new Image();
coreMax.crossOrigin = "anonymous"
coreMax.src = `/nikke-font-generator/images/card/MAX.png`;

const classes = {
    attacker: classAttacker,
    defender: classDefender,
    supporter: classSupporter
}

const bursts = {
    burst01: burst1,
    burst02: burst2,
    burst03: burst3,
    burstall: burstall
}

const favItemColor = {
    "ssr": "#fe6c00",
    "sr": "#bd53fe",
    "r": "#00bffe"
}

const elements = {}
const elementColors = {
    "fire": "#fe0000",
    "wind": "#2ced73",
    "iron": "#fe9000",
    "electric": "#f700f2",
    "water": "#0376f6"
}
for (const i of ['fire', 'wind', 'iron', 'electric', 'water']) {
    let element = new Image();
    element.crossOrigin = "anonymous"
    element.src = `/nikke-font-generator/images/card/icn_element_${i}.png`;

    elements[i] = element;
}

const weapons = {}
for (const i of ['ar', 'mg', 'smg', 'rl', 'sr', 'sg']) {
    let weapon = new Image();
    weapon.crossOrigin = "anonymous"
    weapon.src = `/nikke-font-generator/images/card/icn_weapon_${i}.png`;

    weapons[i] = weapon;
}

let curBorder = "synchro";
let curBurst = "03";
let curColor = "#ffce00";
let curRarity = "ssr";
let curClass = "supporter";
let curCopies = 3;
let curLevel = 120;
let curName = "Einkk";
let curElement = "wind"
let curWeapon = "ar";
let curTransforms = [0, 0, 1];
let curFavStatus = "maxed";
let curFavRarity = "ssr";

function generateCard() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    canvas.width = 311;
    canvas.height = 600;

    // draw bg
    ctx.drawImage(bg, 1, canvas.height - bg.height - 1);

    // draw border
    switch (curBorder) {
        case "normal":
            break;
        case "synchro":
            draw9slice(ctx, synchroBorder, [22, 456, 261, 4], 0, canvas.height - synchroBorder.height, canvas.width, synchroBorder.height + 10)
            break;
        case "trial":
            draw9slice(ctx, trialBorder, [22, 456, 261, 4], 0, canvas.height - trialBorder.height, canvas.width, trialBorder.height + 10)
            break;
    }

    // draw character
    const canvasTemp = document.createElement("canvas");
    const ctxTemp = canvasTemp.getContext("2d");
    canvasTemp.width = 271;
    canvasTemp.height = char.height * (271 / char.width) - curTransforms[1];
    ctxTemp.drawImage(char, 
        curTransforms[0], 
        0, 
        (char.width < canvasTemp.width ? canvasTemp.width : char.width) * curTransforms[2], 
        (char.width < canvasTemp.width ? char.height * (271 / char.width) : char.height) * curTransforms[2]
    );

    ctx.drawImage(canvasTemp, 17, canvas.height - canvasTemp.height - 2, 271, canvasTemp.height)

    // draw deco
    ctx.globalAlpha = 0.75;
    ctx.drawImage(decoOverlay, 11, canvas.height - decoOverlay.height + 8);

    ctx.globalAlpha = 0.5;
    const classWidth = classes[curClass].width * 164 / classSupporter.height;
    const classHeight = classes[curClass].height * 164 / classSupporter.height;
    ctx.drawImage(recolorImage(classes[curClass], curColor), canvas.width - 20 - classWidth, canvas.height - 73 - 16 - classHeight / 2, classWidth, classHeight)

    ctx.globalAlpha = 1;

    // 54 / 406
    if (curBorder === "synchro") {
        const synchroWidth = decoSynchro.width * 54 / 406;
        const synchroHeight = decoSynchro.height * 54 / 406;

        for (let i = 0; i < 3; i++) {
            ctx.drawImage(recolorImage(decoSynchro, "#fe6c00"), canvas.width - synchroWidth - 17 + 5, canvas.height - synchroHeight - 421, synchroWidth, synchroHeight);
        }

        ctx.drawImage(decoSynchro, canvas.width - synchroWidth - 17 + 5, canvas.height - synchroHeight - 421, synchroWidth, synchroHeight)
    }

    draw9slice(ctx, decoBar2, [0, 36, 283, 2], 11, canvas.height - 44, 283, 47, curColor);
    ctx.drawImage(recolorImage(decoBar, curColor), 11, canvas.height - decoBar.height + 1)

    // draw element
    // ctx.drawImage(recolorImage(hexFrame, elementColors[curElement]), 6, canvas.height - synchroBorder.height + 2, 84, 84)

    const frameWidth = 68;
    const frameHeight = hexFrameDark.naturalHeight * frameWidth / hexFrameDark.naturalWidth;

    const strokeWidth = 57;
    const strokeHeight = hexStroke1.naturalHeight * strokeWidth / hexStroke1.naturalWidth;

    // draw element
    ctx.drawImage(recolorImage(hexFrameDark, elementColors[curElement]), 14, canvas.height - synchroBorder.height + 4, frameWidth, frameHeight);
    ctx.drawImage(recolorImage(hexStroke2, elementColors[curElement]), 14 + (frameWidth - strokeWidth) / 2, canvas.height - synchroBorder.height + 4 + (frameHeight - strokeHeight) / 2, strokeWidth, strokeHeight);

    const elementWidth = elements[curElement].naturalWidth * 44 / 226;
    const elementHeight = elements[curElement].naturalHeight * 44 / 226;
    ctx.drawImage(recolorImage(elements[curElement], elementColors[curElement]), 14 + (frameWidth - elementWidth) / 2, canvas.height - synchroBorder.height + 4 + (frameHeight - elementHeight) / 2, elementWidth, elementHeight)


    // draw weapon
    ctx.drawImage(hexFrameLight, 14, canvas.height - synchroBorder.height + 4 + 72, frameWidth, frameHeight);
    ctx.drawImage(recolorImage(hexStroke1, "#323232"), 14 + (frameWidth - strokeWidth) / 2, canvas.height - synchroBorder.height + 4 + 72 + (frameHeight - strokeHeight) / 2, strokeWidth, strokeHeight);

    const weaponWidth = weapons[curWeapon].naturalWidth * 32 / 73;
    const weaponHeight = weapons[curWeapon].naturalHeight * 32 / 73;
    ctx.drawImage(recolorImage(weapons[curWeapon], "#323232"), 14 + (frameWidth - weaponWidth) / 2, canvas.height - synchroBorder.height + 4 + 72 + (frameHeight - weaponHeight) / 2, weaponWidth, weaponHeight)

    // draw burst
    ctx.drawImage(hexFrameDark, 14, canvas.height - synchroBorder.height + 4 + 144, frameWidth, frameHeight);
    ctx.drawImage(hexStroke1, 14 + (frameWidth - strokeWidth) / 2, canvas.height - synchroBorder.height + 4 + 144 + (frameHeight - strokeHeight) / 2, strokeWidth, strokeHeight);

    const burstWidth = bursts["burst" + curBurst].naturalWidth * 33 / 79;
    const burstHeight = bursts["burst" + curBurst].naturalHeight * 33 / 79;
    ctx.drawImage(bursts["burst" + curBurst], 14 + (frameWidth - burstWidth) / 2, canvas.height - synchroBorder.height + 4 + 144 + (frameHeight - burstHeight) / 2, burstWidth, burstHeight)

    // draw favorite

    if (curFavStatus !== 'none') {
        if (curFavStatus === 'maxed') {
            ctx.drawImage(hexFrameDark, 14, canvas.height - synchroBorder.height + 4 + 216, frameWidth, frameHeight);
        } else {
            ctx.drawImage(hexFrameLight, 14, canvas.height - synchroBorder.height + 4 + 216, frameWidth, frameHeight);
        }

        const favoriteWidth = 40;
        const favoriteHeight = favoriteIcon.naturalHeight * 40 / favoriteIcon.width;

        ctx.drawImage(recolorImage(favoriteIcon, favItemColor[curFavRarity]), 14 + (frameWidth - favoriteWidth) / 2, canvas.height - synchroBorder.height + 4 + 216 + (frameHeight - favoriteHeight) / 2, favoriteWidth, favoriteHeight)
        ctx.drawImage(recolorImage(hexStroke1, favItemColor[curFavRarity]), 14 + (frameWidth - strokeWidth) / 2, canvas.height - synchroBorder.height + 4 + 216 + (frameHeight - strokeHeight) / 2, strokeWidth, strokeHeight);
    }

    // draw name
    if (curBorder === "synchro") {
        ctx.fillStyle = "#ffbe1a";
    } else {
        ctx.fillStyle = "#ffffff";
    }

    // ctx.letterSpacing = "0.8px";
    ctx.textBaseline = "bottom"
    ctx.textAlign = "right";
    ctx.strokeStyle = "#202020";
    ctx.lineWidth = 3;
    ctx.shadowColor = "#202020";
    ctx.shadowBlur = 4;
    ctx.font = "36px PB";
    ctx.strokeText(curName, canvas.width - 29, canvas.height - 15);
    ctx.fillText(curName, canvas.width - 29, canvas.height - 15);

    // draw level
    ctx.font = "73px ABOL"
    ctx.textAlign = "left";
    ctx.strokeText(curLevel.toString().padStart(2, "0"), 20, canvas.height - 11);
    ctx.fillText(curLevel.toString().padStart(2, "0"), 20, canvas.height - 11);

    ctx.font = "24px AZO";
    ctx.strokeText("LV.", 23, canvas.height - 85 + 6);
    ctx.fillText("LV.", 23, canvas.height - 85 + 6);

    // draw limitbreaks 30 / 74
    const lbWidth = lbFilled.width * 30 / 74;
    const lbHeight = lbFilled.height * 30 / 74;

    const coreWidth = coreNumBG.width * 50 / 93;
    const coreHeight = coreNumBG.height * 50 / 93;

    ctx.fillStyle = "#ffffff";
    ctx.font = "44px AIRE";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    switch (curRarity.toLowerCase()) {
        case "ssr": {
            let starModifier = 0;
            if (curCopies > 3) {
                starModifier = 50;
                ctx.drawImage(coreNumBG, canvas.width - 29 - coreWidth, canvas.height - 12 - 87 + lbHeight - coreHeight, coreWidth, coreHeight);

                const coreMaxWidth = coreMax.width * 38 / coreMax.width;
                const coreMaxHeight = coreMax.height * 38 / coreMax.width;

                if (curCopies === 10) {
                    ctx.drawImage(coreMax, canvas.width - 29 - coreWidth + (coreWidth - coreMaxWidth) / 2, canvas.height - 12 - 87 + lbHeight - coreHeight + (coreHeight - coreMaxHeight) / 2, coreMaxWidth, coreMaxHeight);
                } else {
                    ctx.fillText((curCopies - 3).toString().padStart(2, "0"), canvas.width - 29 - coreWidth + coreWidth / 2, canvas.height - 12 - 87 + lbHeight - coreHeight + coreHeight / 2, coreWidth);
                }
            }
            for (let i = 0; i < 3; i++) {
                if (i < curCopies) {
                    ctx.drawImage(lbFilled, canvas.width - 29 + (i * 29) - (2 * 29) - lbWidth - starModifier, canvas.height - 12 - 87, lbWidth, lbHeight);
                } else {
                    ctx.drawImage(lbEmpty, canvas.width - 29 + (i * 29) - (2 * 29) - lbWidth - starModifier, canvas.height - 12 - 87, lbWidth, lbHeight);
                }
            }
            break;
        }
        case "sr": {
            let starModifier = 0;
            if (curCopies > 2) {
                starModifier = 50;
                ctx.drawImage(coreNumBG, canvas.width - 29 - coreWidth, canvas.height - 12 - 87 + lbHeight - coreHeight, coreWidth, coreHeight);

                const coreMaxWidth = coreMax.width * 38 / coreMax.width;
                const coreMaxHeight = coreMax.height * 38 / coreMax.width;

                if (curCopies === 10) {
                    ctx.drawImage(coreMax, canvas.width - 29 - coreWidth + (coreWidth - coreMaxWidth) / 2, canvas.height - 12 - 87 + lbHeight - coreHeight + (coreHeight - coreMaxHeight) / 2, coreMaxWidth, coreMaxHeight);
                } else {
                    ctx.fillText((curCopies - 2).toString().padStart(2, "0"), canvas.width - 29 - coreWidth + coreWidth / 2, canvas.height - 12 - 87 + lbHeight - coreHeight + coreHeight / 2, coreWidth);
                }
            }
            for (let i = 0; i < 2; i++) {
                if (i < curCopies) {
                    ctx.drawImage(lbFilled, canvas.width - 29 + (i * 29) - (1 * 29) - lbWidth - starModifier, canvas.height - 12 - 87, lbWidth, lbHeight);
                } else {
                    ctx.drawImage(lbEmpty, canvas.width - 29 + (i * 29) - (1 * 29) - lbWidth - starModifier, canvas.height - 12 - 87, lbWidth, lbHeight);
                }
            }
            break;
        }
        case "r":
            if (curCopies > 0) {
                ctx.drawImage(coreNumBG, canvas.width - 29 - coreWidth, canvas.height - 12 - 87 + lbHeight - coreHeight, coreWidth, coreHeight);

                const coreMaxWidth = coreMax.width * 38 / coreMax.width;
                const coreMaxHeight = coreMax.height * 38 / coreMax.width;

                if (curCopies === 10) {
                    ctx.drawImage(coreMax, canvas.width - 29 - coreWidth + (coreWidth - coreMaxWidth) / 2, canvas.height - 12 - 87 + lbHeight - coreHeight + (coreHeight - coreMaxHeight) / 2, coreMaxWidth, coreMaxHeight);
                } else {
                    ctx.fillText((curCopies).toString().padStart(2, "0"), canvas.width - 29 - coreWidth + coreWidth / 2, canvas.height - 12 - 87 + lbHeight - coreHeight + coreHeight / 2, coreWidth);
                }
            }
            break;
    }

    // trim canvas

    if (!dragging) {
        const newCanvas = trimCanvas(canvas);
        canvas.width = newCanvas.width;
        canvas.height = newCanvas.height;
        ctx.drawImage(newCanvas, 0, 0);
    }
}

setTimeout(() => {
    generateCard()
}, 1000);

document.getElementById("copies").addEventListener("input", () => {
    curCopies = parseInt(document.getElementById("copies").value);
    generateCard();
});

document.getElementById("level").addEventListener("input", () => {
    curLevel = parseInt(document.getElementById("level").value);
    generateCard();
});

document.getElementById("nikke-class").addEventListener("input", () => {
    curClass = document.getElementById("nikke-class").value;
    generateCard();
});

document.getElementById("nikke-type").addEventListener("input", () => {
    curBorder = document.getElementById("nikke-type").value;
    generateCard();
});

document.getElementById("nikke-fav-status").addEventListener("input", () => {
    curFavStatus = document.getElementById("nikke-fav-status").value;
    generateCard();
});

document.getElementById("nikke-fav-rarity").addEventListener("input", () => {
    curFavRarity = document.getElementById("nikke-fav-rarity").value;
    generateCard();
});

document.getElementById("burst").addEventListener("input", () => {
    curBurst = document.getElementById("burst").value;
    generateCard();
});

document.getElementById("weapon").addEventListener("input", () => {
    curWeapon = document.getElementById("weapon").value;
    generateCard();
});

document.getElementById("element").addEventListener("input", () => {
    curElement = document.getElementById("element").value;
    generateCard();
});

const rarityButtons = [
    document.getElementById("ssr"),
    document.getElementById("sr"),
    document.getElementById("r")
];

document.getElementById("ssr").addEventListener("click", () => {
    for (const e of rarityButtons) {
        e.style.fontWeight = "normal";
    }

    document.getElementById("ssr").style.fontWeight = "bold";
    curColor = "#ffce00";
    curRarity = "ssr";
    generateCard();
});

document.getElementById("sr").addEventListener("click", () => {
    for (const e of rarityButtons) {
        e.style.fontWeight = "normal";
    }

    document.getElementById("sr").style.fontWeight = "bold";
    curColor = "#fe28fe";
    curRarity = "sr";
    generateCard();
});

document.getElementById("r").addEventListener("click", () => {
    for (const e of rarityButtons) {
        e.style.fontWeight = "normal";
    }

    document.getElementById("r").style.fontWeight = "bold";
    curColor = "#00fefe";
    curRarity = "r";
    generateCard();
});

document.getElementById("xposcd").addEventListener("input", () => {
    curTransforms[0] = parseInt(document.getElementById("xposcd").value);
    generateCard();
});

document.getElementById("yposcd").addEventListener("input", () => {
    curTransforms[1] = parseInt(document.getElementById("yposcd").value);
    generateCard();
});

document.getElementById("scalecd").addEventListener("input", () => {
    curTransforms[2] = parseInt(document.getElementById("scalecd").value) / 100;
    generateCard();
});

let currentImage = ''

document.getElementById("char-card-search").addEventListener("input", () => {
    if (Object.keys(nikkepfps).length > 0) {
        if (document.getElementById("char-card-search").value.trim().length > 0) {
            const results = fuzzysort.go(document.getElementById("char-card-search").value, Object.keys(nikkepfps));
            if (results.length > 0) {
                currentImage = `https://nkas.pages.dev/characters/${nikkepfps[results[0].target].replace("si", "mi")}.png`;

                if (currentImage.match(/\_\d+/gm).length === 2) {
                    currentImage = currentImage.replace("_00", "");
                }

                document.getElementById("card-preview").src = currentImage.replace("mi", "si");

                document.getElementById("card-preview").onerror = () => {
                    document.getElementById("card-preview").src = currentImage.replace("mi", "si").replace("characters/", "characters_missing_si/");
                    document.getElementById("card-preview").onerror = () => {
                        document.getElementById("card-preview").src = `/nikke-font-generator/images/blabla/pfp/nochat.png`;
                    }
                }
            } else {
                document.getElementById("card-preview").src = `/nikke-font-generator/images/blabla/pfp/nochat.png`;
            }
        } else {
            currentImage = `https://nkas.pages.dev/characters/mi_c000_00_s.png`;
            document.getElementById("card-preview").src = `/nikke-font-generator/images/blabla/pfp/nochat.png`;
        }
    }

    char.src = currentImage;
});

document.getElementById("char-card-upload").onchange = (e) => {
    const fileList = document.querySelectorAll('#char-card-upload')[0].files;
    const filer = new FileReader();
    filer.onload = (e) => {
        char.src = e.target.result.toString();
        char.onerror = (e) => {
            char.src = "https://nkas.pages.dev/characters/mi_c000_00_s.png";
        }
    };
    if (fileList.length > 0) {
        filer.readAsDataURL(fileList[0]);
    }
}

document.getElementById("text").addEventListener("input", () => {
    curName = document.getElementById("text").value;
    generateCard();
});

document.getElementById("generate").addEventListener("click", () => {
    generateCard();
});

document.getElementById("color").addEventListener("input", () => {
    curColor = document.getElementById("color").value;
    generateCard();
});

document.getElementById("download").addEventListener("click", () => {
    var link = document.createElement('a');
    var canvas = document.getElementById('card-canvas');
    link.download = 'nikke-card.png';
    link.href = canvas.toDataURL()
    link.click();
});

let dragOn = false;
document.getElementById("dragcd").onclick = (e) => {
    dragOn = !dragOn;
    document.getElementById("dragcd").innerHTML = (dragOn ? "ON" : "OFF");
    generateCard();
}

let mousecapture = [0, 0];
let previous = [0, 0];
let dragging = false;

document.querySelectorAll('canvas#card-canvas')[0].addEventListener('pointerdown', (e) => {
    if (dragging) return;

    if (dragOn) {
        const coords = translateCoordinates(e, canvas);

        dragging = true;
        mousecapture[0] = coords[0];
        mousecapture[1] = coords[1];

        previous[0] = curTransforms[0];
        previous[1] = curTransforms[1];
    }
});

document.addEventListener('pointermove', (e) => {
    if (!dragging) return;
    const coords = translateCoordinates(e, canvas);

    if (dragOn) {
        curTransforms[0] = parseInt(previous[0] + (coords[0] - mousecapture[0]));
        curTransforms[1] = parseInt(previous[1] + (coords[1] - mousecapture[1]));
        generateCard();
    }

    document.getElementById("xposcd").value = curTransforms[0];
    document.getElementById("yposcd").value = curTransforms[1];
});

document.addEventListener('pointerup', (e) => {
    if (!dragging) return;
    dragging = false;

    generateCard();
});