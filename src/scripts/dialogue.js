import { draw9slice, dataURLtoFile, eyeOn, eyeOff } from "./util.js";
import { downloadZip } from "https://cdn.jsdelivr.net/npm/client-zip/index.js"
import { Buffer } from "buffer";
import * as HME from "h264-mp4-encoder";

const canvas = document.getElementById("dialogue-canvas");
const ctx = canvas.getContext("2d", { willReadFrequently: true });

const myFont = new FontFace('PEB', "url('/nikke-font-generator/fonts/Pretendard-ExtraBold.ttf')");
await myFont.load();
document.fonts.add(myFont);

const myFont2 = new FontFace('PB', "url('/nikke-font-generator/fonts/Pretendard-Bold.ttf')");
await myFont2.load();
document.fonts.add(myFont2);

const myFont3 = new FontFace('PSB', "url('/nikke-font-generator/fonts/Pretendard-SemiBold.ttf')");
await myFont3.load();
document.fonts.add(myFont3);

// 1, -3
const jpEBold = new FontFace('JPEB', "url('/nikke-font-generator/fonts/JP-GothicMB101-ExtraBold.ttf')");
await jpEBold.load();
document.fonts.add(jpEBold);

// -1, -7
const jpBold = new FontFace('JPB', "url('/nikke-font-generator/fonts/JP-GothicMB101-Bold.ttf')");
await jpBold.load();
document.fonts.add(jpBold);

// adding JP fonts soon. Maybe.

let text2 = '';
let subtext2 = '';
let size = 100;
let color = '#f5ba36';
let scalebg = 120;
let scalech = 100;
let bgpos = [0, 0]
let chpos = [0, 0]

let chposoff = [0, 0];

let canvassize = [1080, 1080];

let wmrk = new Image();
wmrk.crossOrigin = "anonymous"
wmrk.src = `/nikke-font-generator/favicon.png`;

// let img = new Image();
// img.crossOrigin = "anonymous"
// img.src = `/nikke-font-generator/images/dialogue/vignette.png`;

// let img2 = new Image();
// img2.crossOrigin = "anonymous"
// img2.src = `/nikke-font-generator/images/dialogue/vignette2.png`;

let arrow = new Image();
arrow.crossOrigin = "anonymous"
arrow.src = `/nikke-font-generator/images/dialogue/arrow.png`;

let controls = new Image();
controls.crossOrigin = "anonymous"
controls.src = `/nikke-font-generator/images/dialogue/controls/hideskip.png`;

let choicepng = new Image();
choicepng.crossOrigin = "anonymous"
choicepng.src = `/nikke-font-generator/images/dialogue/choice_9slice.png`;

let bg = new Image();
bg.crossOrigin = "anonymous"
bg.src = `/nikke-font-generator/images/dialogue/bgs/CommanderRoom.png`;

let char = new Image();
char.crossOrigin = "anonymous"
char.src = `/nikke-font-generator/images/dialogue/anis.png`;

let lmesh = new Image();
lmesh.crossOrigin = "anonymous"
lmesh.src = `/nikke-font-generator/images/dialogue/choice_mesh.png`;

let rmesh = new Image();
rmesh.crossOrigin = "anonymous"
rmesh.src = `/nikke-font-generator/images/dialogue/choice_mesh_f.png`;

let ltri = new Image();
ltri.crossOrigin = "anonymous"
ltri.src = `/nikke-font-generator/images/dialogue/choice_tri_glow.png`;

let rtri = new Image();
rtri.crossOrigin = "anonymous"
rtri.src = `/nikke-font-generator/images/dialogue/choice_tri_glow_f.png`;

// choice canvas (for mesh design and other things)
const choiceCanvas = document.createElement("canvas");
const choiceCanvasCtx = choiceCanvas.getContext("2d");

let rng = [
    "This feels... different.",
    "It doesn't feel the same...",
    "Something doesn't feel right and I can't tell what it is...",
    "Something is off.\nMaybe is it just me?\nOr is it you?\nOr is it everyone and everything around us?",
    "Commander, if you feel like something is actually different, please tell me right now. I am so confused.",
    "Commander? You look different today...",
    "I can't put my finger on it, but the atmosphere feels different."
]

setTimeout(() => {
    generateText("Anis", rng[Math.round(Math.random() * (rng.length - 1))]);
}, 1000);

let tpos = [126, 878];
let dpos = [125, 929];
let cpos = [110, 883];
let copos = [677, 13];
let arpos = [953, 1027];

let coposoffset = [-102, -11];

let tsize = 23;
let dsize = 23;
let scaledc = 100;
let scalecb = 100;
let scalear = 100;

let scalena = 100;

let dvig = new Image();
dvig.crossOrigin = "anonymous"
dvig.src = `/nikke-font-generator/images/dialogue/newgradient/gradientD_S.png`;

let lvig = new Image();
lvig.crossOrigin = "anonymous"
lvig.src = `/nikke-font-generator/images/dialogue/newgradient/gradientL.png`;

let rvig = new Image();
rvig.crossOrigin = "anonymous"
rvig.src = `/nikke-font-generator/images/dialogue/newgradient/gradientR.png`;

let uvig = new Image();
uvig.crossOrigin = "anonymous"
uvig.src = `/nikke-font-generator/images/dialogue/newgradient/gradientU.png`;

let bvig = new Image();
bvig.crossOrigin = "anonymous"
bvig.src = `/nikke-font-generator/images/dialogue/newgradient/gradientD_C.png`;

let mesh = new Image();
mesh.crossOrigin = "anonymous"
mesh.src = `/nikke-font-generator/images/dialogue/mesh.png`;

let action = new Image();
action.crossOrigin = "anonymous"
action.src = `/nikke-font-generator/images/dialogue/actionbox.png`;

function drawGradients(haschoices) {
    ctx.globalCompositeOperation = "multiply";
    ctx.drawImage(uvig, 0, 0, canvassize[0], uvig.height);
    ctx.drawImage(lvig, 0, 0, lvig.width, canvassize[1]);
    ctx.drawImage(rvig, canvassize[0] - rvig.width, 0, rvig.width, canvassize[1]);

    if (haschoices) {
        ctx.drawImage(bvig, 0, canvassize[1] - bvig.height, canvassize[0], bvig.height);
        ctx.globalCompositeOperation = "source-over";
    } else {
        ctx.font = dsize + "px PSB";
        ctx.letterSpacing = "0.2px";
        ctx.fillStyle = "#dcdcdc";
        ctx.textBaseline = "top";

        let lines = getLinesForParagraphs(ctx, subtext2, canvassize[0] - 250)
        ctx.letterSpacing = "0px";
        var downVigHeight = Math.max(322 + 39 * (lines.length - 2), 322);

        draw9slice(ctx, dvig, [0, 111, 1080, 211], 0, canvassize[1] - downVigHeight, canvassize[0], downVigHeight);
        ctx.globalCompositeOperation = "source-over";

        // create temp canvas to put the weird mesh thing
        const canvasTemp = document.createElement("canvas");
        const ctxTemp = canvasTemp.getContext("2d");

        canvasTemp.width = canvassize[0];
        canvasTemp.height = canvassize[1];
        ctxTemp.fillStyle = color;
        ctxTemp.fillRect(canvassize[0] - mesh.width, canvassize[1] - mesh.height, mesh.width, mesh.height);
        ctxTemp.globalCompositeOperation = "destination-in";
        ctxTemp.drawImage(mesh, canvassize[0] - mesh.width, canvassize[1] - mesh.height);
        ctxTemp.globalCompositeOperation = "source-over";

        ctx.drawImage(canvasTemp, 0, 0);
    }
}

document.querySelectorAll('#generate')[0].addEventListener('click', () => {
    var text = document.getElementById('character').value;
    var subtext = document.getElementById('dialog').value;

    generateText(text, subtext);
});

let autogen = true;

document.getElementById('generate').oncontextmenu = (e) => {
    e.preventDefault();

    autogen = !autogen;

    document.getElementById('generate').innerHTML = autogen ? 'Refresh' : 'Generate';
    document.getElementById('generate').disabled = autogen;
}

function autogent() {
    if (autogen) {
        var text = document.getElementById('character').value;
        var subtext = document.getElementById('dialog').value;
        generateText(text, subtext)
    }
}

document.getElementById('character').oninput = autogent;
document.getElementById('dialog').oninput = autogent;

document.querySelectorAll('#clear-char')[0].addEventListener('click', () => {
    char.src = '/nikke-font-generator/images/transparent.png';
    char.onload = function (e) {
        generateText(text2, subtext2);
    }
});

document.querySelectorAll('#clear-bg')[0].addEventListener('click', () => {
    bg.src = '/nikke-font-generator/images/transparent.png';
    bg.onload = function (e) {
        generateText(text2, subtext2);
    }
});

document.querySelectorAll('#size')[0].addEventListener('change', () => {
    size = parseInt(document.getElementById('size').value);
    generateText(text2, subtext2)
});

document.querySelectorAll('#cotype')[0].addEventListener('change', () => {
    let n = document.getElementById('cotype').value;

    let prev = [coposoffset[0], coposoffset[1]];

    let add = n.endsWith("cancel") ? -33 : 0;
    if (n.startsWith('auto')) {
        coposoffset = [-6 + add, -6];
    } else if (n.startsWith('hide')) {
        coposoffset = [-102 + add, -11];
    }

    copos[0] += (coposoffset[0] - prev[0]) * (scaledc / 100);
    copos[1] += (coposoffset[1] - prev[1]) * (scaledc / 100);

    controls.src = `/nikke-font-generator/images/dialogue/controls/${n}.png`;
    controls.onload = () => {
        generateText(text2, subtext2)
    }
});

document.querySelectorAll('#color')[0].addEventListener('change', () => {
    color = document.getElementById('color').value;
    generateText(text2, subtext2)
});

document.querySelectorAll('#bg-img-up')[0].addEventListener('change', () => {
    const fileList = document.querySelectorAll('#bg-img-up')[0].files;
    const filer = new FileReader();
    filer.onload = (e) => {
        bg.src = e.target.result;
        bg.onload = (e) => {
            if (bg.width > bg.height) {
                if (bgautofit) {
                    scalebg = (canvassize[1] / bg.height) * 100;
                    document.getElementById('scalebg').value = parseInt(scalebg);
                }
                bgpos = [(canvassize[0] - 1080 * (bg.width / bg.height)) / 2, 0];
            } else {
                if (bgautofit) {
                    scalebg = (canvassize[0] / bg.width) * 100;
                    document.getElementById('scalebg').value = parseInt(scalebg);
                }
                bgpos = [0, 0];
            }
            generateText(text2, subtext2)
        }
    };
    if (fileList.length > 0) {
        filer.readAsDataURL(fileList[0]);
    }
});

document.querySelectorAll('#char-img-up')[0].addEventListener('change', () => {
    const fileList = document.querySelectorAll('#char-img-up')[0].files;
    const filer = new FileReader();
    filer.onload = (e) => {
        char.src = e.target.result;
        char.onload = (e) => {
            chpos = [(canvassize[0] - char.width) / 2, char.height > canvassize[1] ? 0 : canvassize[1] - char.height];
            generateText(text2, subtext2)
        }
    };
    if (fileList.length > 0) {
        filer.readAsDataURL(fileList[0]);
    }
});

document.querySelectorAll('#xposbg')[0].addEventListener('input', () => {
    bgpos[0] = parseInt(document.getElementById('xposbg').value);
    generateText(text2, subtext2)
});

document.querySelectorAll('#yposbg')[0].addEventListener('input', () => {
    bgpos[1] = parseInt(document.getElementById('yposbg').value);
    generateText(text2, subtext2)
});

document.querySelectorAll('#xposch')[0].addEventListener('input', () => {
    chpos[0] = parseInt(document.getElementById('xposch').value);
    generateText(text2, subtext2)
});

document.querySelectorAll('#yposch')[0].addEventListener('input', () => {
    chpos[1] = parseInt(document.getElementById('yposch').value);
    generateText(text2, subtext2)
});

document.querySelectorAll('#scalebg')[0].addEventListener('input', () => {
    scalebg = parseInt(document.getElementById('scalebg').value);
    generateText(text2, subtext2)
});

document.querySelectorAll('#scalech')[0].addEventListener('input', () => {
    scalech = parseInt(document.getElementById('scalech').value);
    generateText(text2, subtext2)
});

document.querySelectorAll('#scaledc')[0].addEventListener('input', () => {
    let prev = scaledc / 100;
    scaledc = parseInt(document.getElementById('scaledc').value);
    copos[0] += controls.width * prev - controls.width * scaledc / 100;
    copos[1] -= controls.height * prev - controls.height * scaledc / 100;

    generateText(text2, subtext2)
});

document.querySelectorAll('#scalecb')[0].addEventListener('input', () => {
    let prev = scalecb / 100;
    scalecb = parseInt(document.getElementById('scalecb').value);

    generateText(text2, subtext2)
});

document.querySelectorAll('#scalear')[0].addEventListener('input', () => {
    let prev = scalear / 100;
    scalear = parseInt(document.getElementById('scalear').value);
    arpos[0] += arrow.width * prev - arrow.width * scalear / 100;
    arpos[1] += arrow.height * prev - arrow.height * scalear / 100;

    generateText(text2, subtext2)
});

document.querySelectorAll('#scalena')[0].addEventListener('input', () => {
    scalena = parseInt(document.getElementById('scalena').value);
    generateText(text2, subtext2)
});

document.getElementById('xposna').addEventListener('input', generateText.bind(text2, subtext2));
document.getElementById('yposna').addEventListener('input', generateText.bind(text2, subtext2));

document.querySelectorAll('#wca')[0].addEventListener('input', () => {
    let prevwidth = canvassize[0];
    canvassize[0] = parseInt(document.getElementById('wca').value);
    let diff = canvassize[0] - prevwidth;

    copos[0] += diff;
    arpos[0] += diff;

    document.getElementById('xposdc').value = copos[0];
    document.getElementById('xposar').value = arpos[0];

    generateText(text2, subtext2)
});

document.querySelectorAll('#hca')[0].addEventListener('input', () => {
    let prevheight = canvassize[1];
    canvassize[1] = parseInt(document.getElementById('hca').value);
    let diff = canvassize[1] - prevheight;

    tpos[1] += diff;
    dpos[1] += diff;
    cpos[1] += diff;
    arpos[1] += diff;

    document.getElementById('yposcn').value = tpos[1];
    document.getElementById('yposdt').value = dpos[1];
    document.getElementById('yposcb').value = cpos[1];
    document.getElementById('yposar').value = arpos[1];

    generateText(text2, subtext2)
});

document.querySelectorAll('#xposcn')[0].addEventListener('input', () => {
    tpos[0] = parseInt(document.getElementById('xposcn').value);

    generateText(text2, subtext2)
});
document.querySelectorAll('#yposcn')[0].addEventListener('input', () => {
    tpos[1] = parseInt(document.getElementById('yposcn').value);

    generateText(text2, subtext2)
});

document.querySelectorAll('#xposdt')[0].addEventListener('input', () => {
    dpos[0] = parseInt(document.getElementById('xposdt').value);

    generateText(text2, subtext2)
});
document.querySelectorAll('#yposdt')[0].addEventListener('input', () => {
    dpos[1] = parseInt(document.getElementById('yposdt').value);

    generateText(text2, subtext2)
});

document.querySelectorAll('#xposdc')[0].addEventListener('input', () => {
    copos[0] = parseInt(document.getElementById('xposdc').value);

    generateText(text2, subtext2)
});
document.querySelectorAll('#yposdc')[0].addEventListener('input', () => {
    copos[1] = parseInt(document.getElementById('yposdc').value);

    generateText(text2, subtext2)
});

document.querySelectorAll('#xposcb')[0].addEventListener('input', () => {
    cpos[0] = parseInt(document.getElementById('xposcb').value);

    generateText(text2, subtext2)
});
document.querySelectorAll('#yposcb')[0].addEventListener('input', () => {
    cpos[1] = parseInt(document.getElementById('yposcb').value);

    generateText(text2, subtext2)
});

document.querySelectorAll('#xposar')[0].addEventListener('input', () => {
    arpos[0] = parseInt(document.getElementById('xposar').value);

    generateText(text2, subtext2)
});
document.querySelectorAll('#yposar')[0].addEventListener('input', () => {
    arpos[1] = parseInt(document.getElementById('yposar').value);

    generateText(text2, subtext2)
});

bg.onload = (e) => {
    if (bg.width > bg.height) {
        bgpos = [(canvassize[0] - 1080 * (bg.width / bg.height)) / 2, 0];
    } else {
        bgpos = [0, 0];
    }
}

char.onload = (e) => {
    chpos = [(canvassize[0] - char.width) / 2, char.height > canvassize[1] ? 0 : canvassize[1] - char.height];
}

let sizetools = false;

document.getElementById('sizing-tool').style['display'] = "none";
document.querySelectorAll('#enable-sizing')[0].addEventListener('click', () => {
    sizetools = !sizetools
    document.getElementById('sizing-tool').style['display'] = sizetools ? "block" : "none";
});

document.querySelectorAll('canvas#dialogue-canvas')[0].addEventListener('click', downloadImage);

let dragbg = false;
let dragch = false;

let dragcn = false;
let dragdt = false;
let dragdc = false;
let dragcb = false;
let dragar = false;
let dragna = false

let mousecapture = [0, 0];
let previousbg = [0, 0];
let previousch = [0, 0];
let dragging = false;

let bgautofit = true;

let previouscn = [0, 0];
let previousdt = [0, 0];
let previousdc = [0, 0];
let previouscb = [0, 0];
let previousar = [0, 0];
let previousna = [0, 0];

document.querySelectorAll('canvas#dialogue-canvas')[0].addEventListener('pointerdown', (e) => {
    if (dragging) return;
    dragging = true;

    if (dragbg) {
        previousbg[0] = bgpos[0];
        previousbg[1] = bgpos[1];
    }
    if (dragch) {
        previousch[0] = chpos[0];
        previousch[1] = chpos[1];
    }

    // end me
    if (dragcn) {
        previouscn[0] = tpos[0];
        previouscn[1] = tpos[1];
    }
    if (dragdt) {
        previousdt[0] = dpos[0];
        previousdt[1] = dpos[1];
    }
    if (dragdc) {
        previousdc[0] = copos[0];
        previousdc[1] = copos[1];
    }
    if (dragcb) {
        previouscb[0] = cpos[0];
        previouscb[1] = cpos[1];
    }
    if (dragar) {
        previousar[0] = arpos[0];
        previousar[1] = arpos[1];
    }
    if (dragna) {
        previousna[0] = parseInt(document.getElementById('xposna').value);
        previousna[1] = parseInt(document.getElementById('yposna').value);
    }

    mousecapture[0] = e.clientX;
    mousecapture[1] = e.clientY;

    if (dragbg || dragch || dragcn || dragdt || dragdc || dragcb || dragar || dragna) {
        disableScroll();
    }
});

document.querySelectorAll('canvas#dialogue-canvas')[0].addEventListener('pointermove', (e) => {
    if (!dragging) return;

    if (dragbg) {
        bgpos[0] = e.clientX + (previousbg[0] - mousecapture[0]);
        bgpos[1] = e.clientY + (previousbg[1] - mousecapture[1]);
    }
    if (dragch) {
        chpos[0] = e.clientX + (previousch[0] - mousecapture[0]);
        chpos[1] = e.clientY + (previousch[1] - mousecapture[1]);
    }

    // end me pt 2
    if (dragcn) {
        tpos[0] = e.clientX + (previouscn[0] - mousecapture[0]);
        tpos[1] = e.clientY + (previouscn[1] - mousecapture[1]);
    }
    if (dragdt) {
        dpos[0] = e.clientX + (previousdt[0] - mousecapture[0]);
        dpos[1] = e.clientY + (previousdt[1] - mousecapture[1]);
    }
    if (dragdc) {
        copos[0] = e.clientX + (previousdc[0] - mousecapture[0]);
        copos[1] = e.clientY + (previousdc[1] - mousecapture[1]);
    }
    if (dragcb) {
        cpos[0] = e.clientX + (previouscb[0] - mousecapture[0]);
        cpos[1] = e.clientY + (previouscb[1] - mousecapture[1]);
    }
    if (dragar) {
        arpos[0] = e.clientX + (previousar[0] - mousecapture[0]);
        arpos[1] = e.clientY + (previousar[1] - mousecapture[1]);
    }

    if (dragna) {
        document.getElementById('xposna').value = e.clientX + (previousna[0] - mousecapture[0]);
        document.getElementById('yposna').value = e.clientY + (previousna[1] - mousecapture[1]);
    }

    generateText(text2, subtext2);
});

// not using this yet
// var prevd = 0;
// var scalepre = 0;
// var curscaling = '';

// document.querySelectorAll('canvas#dialogue-canvas')[0].addEventListener('touchstart', (e) => {
// 	if (!dragging) return;
// 	if (e.touches.length === 2) {
// 		prevd = Math.hypot(e.touches[0].pageX - e.touches[1].pageX, e.touches[0].pageY - e.touches[1].pageY);
// 		scalepre = scalebg;
// 	}
// });

// document.querySelectorAll('canvas#dialogue-canvas')[0].addEventListener('touchmove', (e) => {
// 	if (!dragging) return;
// 	if (e.touches.length === 2) {
// 		var dist = Math.hypot(e.touches[0].pageX - e.touches[1].pageX, e.touches[0].pageY - e.touches[1].pageY);

// 		scalebg = scalepre * dist/prevd;
// 		document.getElementById('scalebg').value = scalebg;
// 	}
// });

document.querySelectorAll('canvas#dialogue-canvas')[0].addEventListener('pointerup', (e) => {
    if (!dragging) return;
    dragging = false;

    enableScroll();
});

document.querySelectorAll('canvas#dialogue-canvas')[0].addEventListener('pointerleave', (e) => {
    dragging = false;

    enableScroll();
});

document.querySelectorAll('button#dch')[0].addEventListener('click', () => {
    let cap = !dragch;
    disableAllDrag();
    dragch = cap;
    updateDragButtons();
});
document.querySelectorAll('button#dbg')[0].addEventListener('click', () => {
    let cap = !dragbg;
    disableAllDrag();
    dragbg = cap;
    updateDragButtons();
});

document.querySelectorAll('button#dcn')[0].addEventListener('click', () => {
    let cap = !dragcn;
    disableAllDrag();
    dragcn = cap;
    updateDragButtons();
});
document.querySelectorAll('button#ddt')[0].addEventListener('click', () => {
    let cap = !dragdt;
    disableAllDrag();
    dragdt = cap;
    updateDragButtons();
});
document.querySelectorAll('button#ddc')[0].addEventListener('click', () => {
    let cap = !dragdc;
    disableAllDrag();
    dragdc = cap;
    updateDragButtons();
});
document.querySelectorAll('button#dcb')[0].addEventListener('click', () => {
    let cap = !dragcb;
    disableAllDrag();
    dragcb = cap;
    updateDragButtons();
});
document.querySelectorAll('button#dar')[0].addEventListener('click', () => {
    let cap = !dragar;
    disableAllDrag();
    dragar = cap;
    updateDragButtons();
});
document.querySelectorAll('button#dna')[0].addEventListener('click', () => {
    let cap = !dragna;
    disableAllDrag();
    dragna = cap;
    updateDragButtons();
});

document.querySelectorAll('button#bgtocan')[0].addEventListener('click', () => {
    let bgs = scalebg / 100;
    document.getElementById('wca').value = bg.width * bgs;
    document.getElementById('hca').value = bg.height * bgs;
    // canvassize = [bg.width * bgs, bg.height * bgs];
    bgpos = [0, 0];

    document.getElementById('wca').dispatchEvent(new Event('input'));
    document.getElementById('hca').dispatchEvent(new Event('input'));
    generateText(text2, subtext2)
});

document.querySelectorAll('button#bgautofit')[0].addEventListener('click', () => {
    bgautofit = !bgautofit;

    document.querySelectorAll('button#bgautofit')[0].innerHTML = "Auto Fit: " + (bgautofit ? "ON" : "OFF");
});

document.querySelectorAll('button#export-png')[0].addEventListener('click', downloadImage);
document.querySelectorAll('button#export-mp4')[0].addEventListener('click', downloadVideo);


document.querySelectorAll('button#export-frames')[0].addEventListener('click', downloadIndividualFrames);

function updateDragButtons() {
    document.querySelectorAll('button#dch')[0].innerHTML = dragch ? "ON" : "OFF";
    document.querySelectorAll('button#dbg')[0].innerHTML = dragbg ? "ON" : "OFF";

    document.querySelectorAll('button#dcn')[0].innerHTML = dragcn ? "ON" : "OFF";
    document.querySelectorAll('button#ddt')[0].innerHTML = dragdt ? "ON" : "OFF";
    document.querySelectorAll('button#ddc')[0].innerHTML = dragdc ? "ON" : "OFF";
    document.querySelectorAll('button#dcb')[0].innerHTML = dragcb ? "ON" : "OFF";
    document.querySelectorAll('button#dar')[0].innerHTML = dragar ? "ON" : "OFF";
    document.querySelectorAll('button#dna')[0].innerHTML = dragna ? "ON" : "OFF";
}

function disableAllDrag() {
    dragch = false;
    dragbg = false;

    dragcn = false;
    dragdt = false;
    dragdc = false;
    dragcb = false;
    dragar = false;
    dragna = false;
}

let drawfil = true;
document.querySelectorAll('button#df')[0].addEventListener('click', () => {
    drawfil = !drawfil;

    document.querySelectorAll('button#df')[0].innerHTML = drawfil ? "ON" : "OFF";
    generateText(text2, subtext2)
});

let arrowOn = true;
document.querySelectorAll('#arrow-toggle')[0].addEventListener('click', () => {
    arrowOn = !arrowOn;

    document.querySelectorAll('#arrow-toggle')[0].innerHTML = "Bottom right arrow: " + (arrowOn ? "ON" : "OFF");
    generateText(text2, subtext2)
});

let controlsOn = true;
document.querySelectorAll('#controls-toggle')[0].addEventListener('click', () => {
    controlsOn = !controlsOn;

    document.querySelectorAll('#controls-toggle')[0].innerHTML = controlsOn ? eyeOn : eyeOff;
    generateText(text2, subtext2)
});

let uiOn = true;

document.querySelectorAll('#ui-toggle')[0].addEventListener('click', () => {
    uiOn = !uiOn;

    document.querySelectorAll('#ui-toggle')[0].innerHTML = "UI: " + (uiOn ? "ON" : "OFF");
    generateText(text2, subtext2)
});

document.querySelectorAll('#customfil')[0].addEventListener('input', () => {
    generateText(text2, subtext2)
});


let gsnum = 0;
document.querySelectorAll('#gsnum')[0].addEventListener('input', () => {
    gsnum = parseInt(document.getElementById('gsnum').value);
    generateText(text2, subtext2)
});

let blnum = 0;
document.querySelectorAll('#blnum')[0].addEventListener('input', () => {
    blnum = parseInt(document.getElementById('blnum').value);
    generateText(text2, subtext2)
});

let brnum = 100;
document.querySelectorAll('#brnum')[0].addEventListener('input', () => {
    brnum = parseInt(document.getElementById('brnum').value);
    generateText(text2, subtext2)
});

document.querySelectorAll('#choices')[0].addEventListener('input', () => {
    generateText(text2, subtext2)
});

document.querySelectorAll('#actionbox')[0].addEventListener('input', () => {
    generateText(text2, subtext2)
});

document.querySelectorAll('#scalecn')[0].addEventListener('input', () => {
    tsize = parseInt(document.getElementById('scalecn').value);
    generateText(text2, subtext2)
});

document.querySelectorAll('#scaledt')[0].addEventListener('input', () => {
    dsize = parseInt(document.getElementById('scaledt').value);
    generateText(text2, subtext2)
});

function disableScroll() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    let scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

    window.onscroll = function () {
        window.scrollTo(scrollLeft, scrollTop, "instant");
    };

    window.onwheel = (e) => {
        if (dragbg) {
            scalebg += (e.deltaY / -100);
        }
        if (dragch) {
            scalech += (e.deltaY / -100);
        }

        if (dragcn) {
            tsize += (e.deltaY / -100);
        }
        if (dragdt) {
            dsize += (e.deltaY / -100);
        }
        if (dragdc) {
            scaledc += (e.deltaY / -100);
        }
        if (dragcb) {
            scalecb += (e.deltaY / -100);
        }
        if (dragar) {
            scalear += (e.deltaY / -100);
        }
        if (dragna) {
            scalena += (e.deltaY / -100);
        }

        document.getElementById('scalebg').value = scalebg;
        document.getElementById('scalech').value = scalech;

        document.getElementById('scalecn').value = tsize;
        document.getElementById('scaledt').value = dsize;
        document.getElementById('scaledc').value = scaledc;
        document.getElementById('scalecb').value = scalecb;
        document.getElementById('scalear').value = scalear;
        document.getElementById('scalena').value = scalena;
        generateText(text2, subtext2)
    }
}

function enableScroll() {
    window.onscroll = function () { };
    window.onwheel = (e) => { }
}

let capture = {}

let frame = 0;
let maxframes = 0;

function captureAnimatables() {
    frame = 0
    capture = {
        oldDialogueLines: subtext2,
        oldActionLines: document.getElementById('actionbox').value.trim(),
        oldChoices: document.getElementById('choices').value.trim(),
        brightness: brnum,
        bgvals: [bgpos[0], bgpos[1], scalebg], // x, y, scale
        chvals: [chpos[0], chpos[1], scalech]
    }

    chposoff = [0, 0];

    let curFrame = 0;

    let individual = subtext2.split('');
    individual.splice(0, 0, '');
    for (let i = 0; i < individual.length; i++) {

        if (individual[i+1] == ' ') {
            i++;
        }
        if (individual[i+1] == '\\n') {
            i++;
        }

        for (let i = 0; i <= 1; i++) {
            curFrame++;
        }
    }

    let extra = 1;

    let newframes = document.getElementById('fa').value;

    if (newframes != null) {
        if (newframes > 0) {
            if (true) { // document.getElementById('fa-how').value == 'add'
                extra = parseInt(newframes) + 1 // a frame of peace
            }
        }
    }

    curFrame += extra;

    maxframes = curFrame;
}

function resetAnimatables() {
    bgpos[0] = capture.bgvals[0];
    bgpos[1] = capture.bgvals[1];
    scalebg = capture.bgvals[2];

    chpos[0] = capture.chvals[0]
    chpos[1] = capture.chvals[1]
    scalech = capture.chvals[2];

    chposoff = [0, 0];

    brnum = capture.brightness;

    subtext2 = capture.oldDialogueLines;
    document.getElementById('actionbox').value = capture.oldActionLines;
    document.getElementById('choices').value = capture.oldChoices;

    generateText(text2, subtext2);

    document.title = "Barely Accurate NIKKE Dialogue Generator"
}

// just use sine for everything...
const easeInOutSine = t => (1 + Math.sin(Math.PI * t - Math.PI / 2)) / 2;

function generateText(text, subtext, exporting=false) {
    ctx.globalAlpha = 1;
    text2 = text;
    subtext2 = subtext;
    ctx.globalCompositeOperation = "source-over";

    canvas.width = canvassize[0] * size / 100;
    canvas.height = canvassize[1] * size / 100;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.scale(size / 100, size / 100);

    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    let bgs = scalebg / 100;
    let chs = scalech / 100;

    if (exporting) {
        if (document.getElementById('motion').value.trim().length > 0) {
            let shit = document.getElementById('motion').value;
            shit = shit.replaceAll('\\n', String.fromCharCode(13, 10));
    
            let split = shit.trim().split('\n');

            let fadeInFrames = 0;
            let fadeOutFrames = 0;
            let posbgFrames = [[0, 0], [0, 0]] // frames, goal value
            let scalebgFrames = [0, 'center', 0] // frames, anchor, goal value
            let scalechFrames = [0, 'center', 0]
            let chjumpFrames = 0;

            let poschFrames = [[0, 0], [0, 0]]

            for (let i = 0; i < split.length; i++) {
                let data = split[i].trim().split("::");

                switch (data[0]) {
                    case 'fadein':
                        fadeInFrames = Math.round(parseFloat(data[1]) * 30);
                        break;

                    case 'fadeout':
                        fadeOutFrames = Math.round(parseFloat(data[1]) * 30);
                        break;

                    case 'posxbg':
                        posbgFrames[0] = [Math.round(parseFloat(data[2]) * 30), parseFloat(data[1])];
                        break;

                    case 'posybg':
                        posbgFrames[1] = [Math.round(parseFloat(data[2]) * 30), parseFloat(data[1])];
                        break;

                    case 'scalebg':
                        scalebgFrames = [Math.round(parseFloat(data[3]) * 30), data[2], parseFloat(data[1])] 
                        break;

                    case 'posxch':
                        poschFrames[0] = [Math.round(parseFloat(data[2]) * 30), parseFloat(data[1])];
                        break;

                    case 'posych':
                        poschFrames[1] = [Math.round(parseFloat(data[2]) * 30), parseFloat(data[1])];
                        break;
                    
                    case 'scalech':
                        scalechFrames = [Math.round(parseFloat(data[3]) * 30), data[2], parseFloat(data[1])] 
                        break;
                    
                    case 'jump':
                        chjumpFrames = Math.round(parseFloat(data[1]) * 30);
                        break;
                
                    default:
                        break;
                }
            }

            if (fadeInFrames > 0) {
                brnum = ((frame < fadeInFrames ? frame : fadeInFrames) / fadeInFrames) * capture.brightness;
            }

            if (fadeOutFrames > 0) {
                if (frame >= maxframes - fadeOutFrames) {
                    brnum = ((maxframes - frame < fadeOutFrames ? maxframes - frame : fadeOutFrames) / fadeOutFrames) * capture.brightness;
                }
            }

            if (posbgFrames[0][0] > 0) {
                let daFrame = (frame < posbgFrames[0][0] ? frame : posbgFrames[0][0])
                bgpos[0] = capture.bgvals[0] + easeInOutSine(daFrame / posbgFrames[0][0]) * (posbgFrames[0][1] - capture.bgvals[0]);
            }

            if (posbgFrames[1][0] > 0) {
                let daFrame = (frame < posbgFrames[1][0] ? frame : posbgFrames[1][0])
                bgpos[1] = capture.bgvals[1] + easeInOutSine(daFrame / posbgFrames[1][0]) * (posbgFrames[1][1] - capture.bgvals[1]);
            }

            if (poschFrames[0][0] > 0) {
                let daFrame = (frame < poschFrames[0][0] ? frame : poschFrames[0][0])
                chpos[0] = capture.chvals[0] + easeInOutSine(daFrame / poschFrames[0][0]) * (poschFrames[0][1] - capture.chvals[0]);
            }

            if (poschFrames[1][0] > 0) {
                let daFrame = (frame < poschFrames[1][0] ? frame : poschFrames[1][0])
                chpos[1] = capture.chvals[1] + easeInOutSine(daFrame / poschFrames[1][0]) * (poschFrames[1][1] - capture.chvals[1]);
            }

            if (scalebgFrames[0] > 0) {
                let daFrame = (frame < scalebgFrames[0] ? frame : scalebgFrames[0])
                scalebg = capture.bgvals[2] + easeInOutSine(daFrame / scalebgFrames[0]) * (scalebgFrames[2] - capture.bgvals[2]);
                let anchors = scalebgFrames[1].split('-')
                let scalen = scalebg / capture.bgvals[2];
                bgs = scalebg / 100;

                let xoff = capture.bgvals[0] * scalen;
                let yoff = capture.bgvals[1] * scalen;

                let midxoff = Math.abs(capture.bgvals[0] - canvas.width / 2);
                let midyoff = Math.abs(capture.bgvals[1] - canvas.height / 2);

                if (anchors.length > 1) {
                    switch (anchors[0]) {
                        case 'top':
                            bgpos[1] = yoff;
                            break;
                        case 'mid':
                            bgpos[1] = (canvas.height / 2) - midyoff * scalen;
                            break;
                        case 'bot':
                            bgpos[1] = (canvas.height - (bg.height * bgs)) + (yoff);
                            break;
                    }
    
                    switch (anchors[1]) {
                        case 'left':
                            bgpos[0] = xoff;
                            break;
                        case 'center':
                            bgpos[0] = (canvas.width / 2) - midxoff * scalen;
                            break;
                        case 'right':
                            bgpos[0] = (canvas.width - (bg.width * bgs)) + (xoff);
                            break;
                    }
                }
            }

            if (scalechFrames[0] > 0) {
                let daFrame = (frame < scalechFrames[0] ? frame : scalechFrames[0])
                scalech = capture.chvals[2] + easeInOutSine(daFrame / scalechFrames[0]) * (scalechFrames[2] - capture.chvals[2]);
                let anchors = scalechFrames[1].split('-')
                let scalen = scalech / capture.chvals[2];
                chs = scalech / 100;

                let xoff = capture.chvals[0] * scalen;
                let yoff = capture.chvals[1] * scalen;

                let midxoff = Math.abs(capture.chvals[0] - canvas.width / 2);
                let midyoff = Math.abs(capture.chvals[1] - canvas.height / 2);

                if (anchors.length > 1) {
                    switch (anchors[0]) {
                        case 'top':
                            chpos[1] = yoff;
                            break;
                        case 'mid':
                            chpos[1] = (canvas.height / 2) - midyoff * scalen;
                            break;
                        case 'bot':
                            chpos[1] = (canvas.height - (ch.width * chs)) + (yoff);
                            break;
                    }
    
                    switch (anchors[1]) {
                        case 'left':
                            chpos[0] = xoff;
                            break;
                        case 'center':
                            chpos[0] = (canvas.width / 2) - midxoff * scalen;
                            break;
                        case 'right':
                            chpos[0] = (canvas.width - (ch.width * chs)) + (xoff);
                            break;
                    }
                }
            }

            if (chjumpFrames > 0) {
                let daFrame = (frame < chjumpFrames ? frame : chjumpFrames)
                chposoff[1] = parseFloat(Math.abs(Math.sin(3.14159 * easeInOutSine(daFrame / chjumpFrames))).toFixed(2)) * -15 * (canvas.height / 1080);
            }
        }
    }

    if (drawfil) {
        let custom = document.getElementById('customfil').value + '';
        ctx.filter = `grayscale(${gsnum}%) blur(${blnum}px) brightness(${brnum}%) ` + custom;
    }

    ctx.drawImage(bg, bgpos[0], bgpos[1], bg.width * bgs, bg.height * bgs);

    document.getElementById('xposbg').value = bgpos[0];
    document.getElementById('yposbg').value = bgpos[1];

    document.getElementById('xposch').value = chpos[0];
    document.getElementById('yposch').value = chpos[1];

    document.getElementById('xposcn').value = tpos[0];
    document.getElementById('yposcn').value = tpos[1];

    document.getElementById('xposdt').value = dpos[0];
    document.getElementById('yposdt').value = dpos[1];

    document.getElementById('xposdc').value = copos[0];
    document.getElementById('yposdc').value = copos[1];

    document.getElementById('xposcb').value = cpos[0];
    document.getElementById('yposcb').value = cpos[1];

    document.getElementById('xposar').value = arpos[0];
    document.getElementById('yposar').value = arpos[1];

    ctx.drawImage(char, chpos[0] + chposoff[0], chpos[1] + chposoff[1], char.width * chs, char.height * chs)

    ctx.filter = "none";

    let dsc = dsize / 23;

    if (uiOn) {
        if (document.getElementById('choices').value.trim().length > 0) {
            let shit = document.getElementById('choices').value;
            shit = shit.replaceAll('\\n', String.fromCharCode(13, 10));

            let split = shit.trim().split('\n').reverse();
            if (split.length > 1) {
                ctx.fillStyle = "rgba(0, 0, 0, 0.6)";
                ctx.fillRect(0, 0, canvassize[0], canvassize[1]);
            }

            drawGradients(true);

            let mult = easeInOutSine(Math.min(8, frame) / 8);

            if (!exporting) {
                mult = 1;
            }

            let startY = (canvassize[1] * (844 / 1080));

            let curY = startY;
            for (let i = 0; i < split.length; i++) {
                let item = split[i];

                ctx.globalAlpha = mult;

                ctx.font = "21px PSB";
                ctx.fillStyle = "#ffffff";
                ctx.letterSpacing = "0.3px";
                ctx.textBaseline = "top";
                ctx.textAlign = "center";

                let lines = getLinesForParagraphs(ctx, item.trim(), 508 - 48);
                let height = 70 + (lines.length - 1) * 34;

                draw9slice(ctx, choicepng, [31, 29, 1, 2], 286, curY - height + 7, 508, height);

                // draw mesh design
                choiceCanvasCtx.clearRect(0, 0, choiceCanvas.width, choiceCanvas.height);
                choiceCanvas.width = 508 - 12;
                choiceCanvas.height = height - 7 - 4;
                choiceCanvasCtx.clearRect(0, 0, choiceCanvas.width, choiceCanvas.height);

                choiceCanvasCtx.drawImage(lmesh, 0, (choiceCanvas.height - lmesh.height) / 2);
                choiceCanvasCtx.drawImage(ltri, 2, (choiceCanvas.height - ltri.height) / 2);
                choiceCanvasCtx.drawImage(rmesh, choiceCanvas.width - rmesh.width, (choiceCanvas.height - lmesh.height) / 2);
                choiceCanvasCtx.drawImage(rtri, choiceCanvas.width - rtri.width - 2, (choiceCanvas.height - rtri.height) / 2);

                ctx.drawImage(choiceCanvas, 292, curY - height + 11)
                
                let textHeight = (lines.length * 32) - 5;

                console.log(item)
                for (let j = 0; j < lines.length; j++) {
                    ctx.fillText(lines[j], canvassize[0] / 2, (curY - height) +  ((height - textHeight) / 2) + 32 * j + 12);
                }

                curY -= height + 3;

                ctx.globalAlpha = 1;
                ctx.letterSpacing = "0px";
            }

        } else if (document.getElementById('actionbox').value.trim().length > 0) {
            drawGradients(true);

            let ay = canvassize[1] * (1023 / 1080);
            let result = canvassize[0] - 203 * 2 > 674 ? canvassize[0] - 203 * 2 : 674;

            let xoff = parseInt(document.getElementById('xposna').value);
            let yoff = parseInt(document.getElementById('yposna').value);

            ctx.globalAlpha = 0.865;
            ctx.font = dsize + "px PB";
            ctx.fillStyle = "#ffffff";
            ctx.textBaseline = "top";
            ctx.textAlign = "left";

            let cw = ((result * scalena / 100) - 54 - (action.width - (54 + 566)));
            let ch = (248 * scalena / 100 - 54 - (action.height - (54 + 140)))
            let lines = getLinesForParagraphs(ctx, document.getElementById('actionbox').value.trim(), cw - 32 * 2);
            let linesAlt = null;

            const bn = 39 * dsc; // bumfuck number

            let actionBoxMoreYOffset = (bn) * Math.max(lines.length - 2, 0) - (lines.length > 2 ? 5 : 0);
            let actionBoxHeight = (248 + actionBoxMoreYOffset) * (scalena / 100)
            let textHeight = (lines.length * (bn)) - 5;

            if (exporting) {
                lines = getLinesForParagraphs(ctx, subtext, cw - 32 * 2);
                linesAlt = getLinesForParagraphs(ctx, document.getElementById('actionbox').value.trim(), cw - 32 * 2);
            }

            draw9slice(ctx, action, [54, 54, 566, 140], (canvassize[0] - result * (scalena / 100)) / 2 + xoff, ay - actionBoxHeight + 53 + yoff, result * (scalena / 100), actionBoxHeight);

            for (let i = 0; i < lines.length; i++) {
                // ctx.fillText(lines[i], (canvassize[0] - ctx.measureText(linesAlt == null ? lines[i] : linesAlt[i]).width) / 2 + xoff, (ay + 248 * (scalena / 100) / 2 - ath / 2) + (7 * dsc) + 4 + ((39 * dsc) * i) + yoff - actionBoxMoreYOffset, cw - 32 * 2);
                ctx.fillText(lines[i], (canvassize[0] - ctx.measureText(linesAlt == null ? lines[i] : linesAlt[i]).width) / 2 + xoff, ay - actionBoxHeight + 53 + 8 + ((actionBoxHeight - textHeight) / 2) + (bn * i) + yoff, cw - 32 * 2);
            }

            ctx.globalAlpha = 1;

            ctx.letterSpacing = "0px";

            if (arrowOn) {
                ctx.drawImage(arrow, (canvassize[0] + cw) / 2 - 27 + xoff + (document.getElementById('xposar').value - 953) / scalena / 100, canvassize[1] * (952 / 1080) + (ch / 2) - 29 + yoff + (document.getElementById('yposar').value - 1027) / scalena / 100, arrow.width * scalear / 100, arrow.height * scalear / 100);
            }
        } else {
            // ctx.drawImage(img, 0, 0)
            drawGradients(false);

            ctx.font = dsize + "px PSB";
            ctx.letterSpacing = "0.2px";
            ctx.fillStyle = "#dcdcdc";
            ctx.textBaseline = "top";

            let lines = getLinesForParagraphs(ctx, subtext, canvassize[0] - 250)
            let yoffset = (39 * Math.max(lines.length - 2, 0));

            for (let i = 0; i < lines.length; i++) {
                ctx.fillText(lines[i], dpos[0], dpos[1] + (7 * dsc) + ((39 * dsc) * i) - yoffset, canvassize[0] - 250);
            }

            ctx.shadowColor = color + "80";
            ctx.shadowBlur = 3;

            ctx.fillStyle = color;
            ctx.fillRect(cpos[0], cpos[1] - yoffset, 5 * scalecb / 100, 24 * scalecb / 100);

            ctx.shadowColor = "#ffffff00";
            ctx.shadowBlur = 0;

            ctx.font = tsize + "px PB";
            ctx.letterSpacing = "0.4px";
            ctx.fillStyle = "#ffffff";
            ctx.textBaseline = "top";
            ctx.fillText(text, tpos[0], tpos[1] + 8 - yoffset, canvassize[0] - 250);

            ctx.letterSpacing = "0px";

            if (arrowOn) {
                ctx.drawImage(arrow, arpos[0], arpos[1], arrow.width * scalear / 100, arrow.height * scalear / 100);
            }
        }

        if (controlsOn) {
            ctx.drawImage(controls, copos[0], copos[1], controls.width * scaledc / 100, controls.height * scaledc / 100);
        }

        ctx.globalAlpha = 0.075;
        ctx.drawImage(wmrk, 16, -16, 128, 128);
    } else {
        drawGradients(true);
    }
}

// https://stackoverflow.com/questions/2936112/text-wrap-in-a-canvas-element
// im fucking stupid -skuqre
function getLines(ctx, text, maxWidth) {
    var words = text.split(" ");
    var lines = [];
    var currentLine = words[0];

    for (var i = 1; i < words.length; i++) {
        var word = words[i];
        var width = ctx.measureText(currentLine + " " + word).width;
        if (width < maxWidth) {
            currentLine += " " + word;
        } else {
            lines.push(currentLine);
            currentLine = word;
        }
    }
    lines.push(currentLine);
    return lines;
}

let exporting = false;

function downloadIndividualFrames() {
    if (exporting) return;
    exporting = true;
    let imgs = []

    let textc = text2;
    let subtextc = subtext2;

    let individual = subtextc.split('');

    if (document.getElementById('actionbox').value.trim().length > 0) {
        individual = document.getElementById('actionbox').value.split('')
    }

    let wasArrowOn = arrowOn;

    arrowOn = false;
    let curText = "";
    individual.splice(0, 0, '');

    for (let i = 0; i < individual.length; i++) {
        curText += individual[i];

        if (individual[i+1] == ' ') {
            curText += individual[i+1];
            i++;
        }
        if (individual[i+1] == '\\n') {
            curText += individual[i+1];
            i++;
        }

        generateText(textc, curText, true)

        imgs.push({
            name: "nikke-frame" + i + ".png",
            input: dataURLtoFile(canvas.toDataURL(), "nikke-frame" + i + ".png")
        })
    }

    arrowOn = wasArrowOn;

    generateText(textc, curText, true)
    imgs.push({
        name: "nikke-frame" + (individual.length) + ".png",
        input: dataURLtoFile(canvas.toDataURL(), "nikke-frame" + (individual.length) + ".png")
    })
    

    downloadZip(imgs).blob().then((blob) => {
        const link = document.createElement("a")
        link.href = window.URL.createObjectURL(blob)
        link.download = "nikke-dialogue.zip"
        link.click()
        link.remove()

        alert("Exporting finished!")
        exporting = false;
    })
}

function downloadImage() {
    if (dragbg || dragch || dragcn || dragdt || dragdc || dragcb || dragar || dragna) return;
    var link = document.createElement('a');
    var canvas = document.getElementById('dialogue-canvas')
    link.download = 'nikke-dialogue.png';
    link.href = canvas.toDataURL();
    link.click();
    link.remove();
}

// 30 fps

function downloadVideo() {
    if (exporting) return;
    exporting = true;

    captureAnimatables()

    HME.createH264MP4Encoder().then((encoder) => {

        let textc = text2;
        let subtextc = subtext2;

        let individual = subtextc.split('');

        if (document.getElementById('actionbox').value.trim().length > 0) {
            individual =  document.getElementById('actionbox').value.split('')
        }

        encoder.width = canvas.width % 2 == 0 ? canvas.width : canvas.width + 1;
        encoder.height = canvas.height % 2 == 0 ? canvas.height : canvas.height + 1;
        encoder.quantizationParameter = 15;
        encoder.frameRate = 30;
        encoder.initialize();

        let wasArrowOn = arrowOn;

        arrowOn = false;
        let curText = "";
        individual.splice(0, 0, '');
        for (let i = 0; i < individual.length; i++) {
            curText += individual[i];

            if (individual[i+1] == ' ') {
                curText += individual[i+1];
                i++;
            }
            if (individual[i+1] == '\\n') {
                curText += individual[i+1];
                i++;
            }

            for (let i = 0; i <= 1; i++) {
                generateText(textc, curText, true)
                encoder.addFrameRgba(ctx.getImageData(0, 0, canvas.width, canvas.height).data);
                frame++;

                document.title = "Exporting...";
            }
        }

        arrowOn = wasArrowOn;

        let extra = 1;

        let newframes = document.getElementById('fa').value;

        if (newframes != null) {
            if (newframes > 0) {
                if (true) {
                    extra = parseInt(newframes) + 1 // a frame of peace
                }
            }
        }

        for (let i = 0; i < extra; i++) {
            generateText(textc, curText, true)
            encoder.addFrameRgba(ctx.getImageData(0, 0, canvas.width, canvas.height).data);
            frame++;

            document.title = "Exporting...";
        }

        encoder.finalize();

        let output = encoder.FS.readFile(encoder.outputFilename);
        let b64 = Buffer.from(output).toString('base64');

        var link = document.createElement('a');
        link.download = 'nikke-dialogue.mp4';
        link.href = "data:video/mp4;base64," + b64;
        link.click();

        encoder.delete();

        resetAnimatables()
        alert("Exporting finished!")
        exporting = false;
    })
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