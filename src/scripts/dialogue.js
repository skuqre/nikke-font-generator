import { draw9slice, eyeOn, eyeOff, translateCoordinates } from "./util.js";
import { fontNames } from "./langinit.js"

const colorFetch = await fetch("https://nkas.pages.dev/nk_data/colors.json");
const colorData = await colorFetch.json();

if (localStorage.getItem("fontLanguage") === null) {
    localStorage.setItem("fontLanguage", fontNames["en"]);
}

const canvas = document.getElementById("dialogue-canvas");
const ctx = canvas.getContext("2d", { willReadFrequently: true });

const myFont = new FontFace('PEB', "url('/nikke-font-generator/fonts/" + localStorage.getItem("fontLanguage").replace("*", "ExtraBold") + "')");
await myFont.load();
document.fonts.add(myFont);

const myFont2 = new FontFace('PB', "url('/nikke-font-generator/fonts/" + localStorage.getItem("fontLanguage").replace("*", "Bold") + "')");
await myFont2.load();
document.fonts.add(myFont2);

const myFont3 = new FontFace('PSB', "url('/nikke-font-generator/fonts/Pretendard-SemiBold.ttf')");
await myFont3.load();
document.fonts.add(myFont3);

// 1, -3
// const jpEBold = new FontFace('JPEB', "url('/nikke-font-generator/fonts/JP-GothicMB101-ExtraBold.ttf')");
// await jpEBold.load();
// document.fonts.add(jpEBold);

// -1, -7
// const jpBold = new FontFace('JPB', "url('/nikke-font-generator/fonts/JP-GothicMB101-Bold.ttf')");
// await jpBold.load();
// document.fonts.add(jpBold);

// adding JP fonts soon. Maybe.

let text2 = '';
let subtext2 = '';
let size = 100;
let color = '#f5ba36';
let scalebg = 120;
let bgpos = [540, 540];

let canvassize = [1080, 1080];
let padding = true;
let autocolor = true;

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

let chars = [
    {
        x: 1080 / 2,
        y: 1080 / 2,
        scale: 1.0,
        visible: true,
        id: "NFG_ANIS"
    }
]

var anis = new Image();
anis.src = `/nikke-font-generator/images/dialogue/anis.png`;
anis.onload = (_) => {
    generateText(text2, subtext2);
}

let loadedImages = {
    "NFG_ANIS": anis
}

let bg = new Image();
bg.crossOrigin = "anonymous"
bg.src = `/nikke-font-generator/images/dialogue/bgs/CommanderRoom.png`;

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
    "Something's wrong. I can feel it.",
    "I don't feel right...",
    "You look different today."
]

setTimeout(() => {
    generateText("Anis", rng[Math.round(Math.random() * (rng.length - 1))]);
    updateCharList();
}, 2000);

let tpos = [126, 883 + 12];
let dpos = [125, 929];
let cpos = [110, 883];
let copos = [677, 13];
let arpos = [953, 1027];

let coposoffset = [-102, -11];

let campos = [540, 540];
let camzoom = 0.0;

let tsize = 23;
let dsize = 22;
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

    if (!padding) {
        ctx.drawImage(lvig, 0, 0, lvig.width, canvassize[1]);
        ctx.drawImage(rvig, canvassize[0] - rvig.width, 0, rvig.width, canvassize[1]);
    } else {
        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, (canvassize[0] - canvassize[1]) / 2, canvassize[1]);
        ctx.fillRect(canvassize[0] - (canvassize[0] - canvassize[1]) / 2, 0, (canvassize[0] - canvassize[1]) / 2, canvassize[1]);

        ctx.drawImage(lvig, (canvassize[0] - canvassize[1]) / 2, 0, lvig.width, canvassize[1]);
        ctx.drawImage(rvig, canvassize[0] - (canvassize[0] - canvassize[1]) / 2 - rvig.width, 0, rvig.width, canvassize[1]);
    }

    if (haschoices) {
        ctx.drawImage(bvig, 0, canvassize[1] - bvig.height, canvassize[0], bvig.height);
        ctx.globalCompositeOperation = "source-over";
    } else {
        ctx.font = dsize + "px PB";
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

        if (autocolor) {
            for (const i of Object.keys(colorData)) {
                if (i.toLowerCase().trim() === text.toLowerCase().trim()) {
                    document.getElementById('color').value = colorData[i];
                    color = colorData[i];
                }
            }
        }

        var subtext = document.getElementById('dialog').value;
        generateText(text, subtext)
    }
}

document.getElementById('character').oninput = autogent;
document.getElementById('dialog').oninput = autogent;

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
                bgpos = [540, 540];
            }
            generateText(text2, subtext2)
        }
    };
    if (fileList.length > 0) {
        filer.readAsDataURL(fileList[0]);
    }
});

document.querySelectorAll('#ch-img-up')[0].addEventListener('change', () => {
    const fileList = document.querySelectorAll('#ch-img-up')[0].files;
    const filer = new FileReader();
    filer.onload = (e) => {
        let ch = new Image();
        ch.src = e.target.result;
        ch.onload = (e) => {
            generateText(text2, subtext2)
        }

        loadedImages[fileList[0].name] = ch;

        chars.push({
            x: 1080 / 2,
            y: 1080 / 2,
            scale: 1.0,
            visible: true,
            id: fileList[0].name
        });

        curSelected = chars.length - 1;
        updateCharList();
        updateToolFields();
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

document.querySelectorAll('#scalebg')[0].addEventListener('input', () => {
    scalebg = parseInt(document.getElementById('scalebg').value);
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

document.querySelectorAll('#camx')[0].addEventListener('input', () => {
    campos[0] = parseInt(document.getElementById('camx').value);
    generateText(text2, subtext2)
});

document.querySelectorAll('#camy')[0].addEventListener('input', () => {
    campos[1] = parseInt(document.getElementById('camy').value);
    generateText(text2, subtext2)
});

document.getElementById("camzoom").addEventListener('input', (e) => {
    camzoom = parseFloat(document.getElementById("camzoom").value) - 1.0;
    generateText(text2, subtext2)
});

document.querySelectorAll('#wca')[0].addEventListener('input', () => {
    let prevwidth = canvassize[0];
    canvassize[0] = parseInt(document.getElementById('wca').value);
    let diff = canvassize[0] - prevwidth;

    copos[0] += diff;
    arpos[0] += diff;

    document.getElementById('xposdc').value = copos[0];
    document.getElementById('xposar').value = arpos[0];

    bgpos[0] += diff / 2;
    document.getElementById('xposbg').value = bgpos[0];
    
    campos[0] += diff / 2;

    for (const i of chars) {
        i.x += diff / 2;
    }

    if (canvassize[0] < canvassize [1]) {
        tpos[0] += diff / -2;
        dpos[0] += diff / -2;
        cpos[0] += diff / -2;
        arpos[0] += diff / 2;
    }

    document.getElementById('yposcn').value = tpos[0];
    document.getElementById('yposdt').value = dpos[0];
    document.getElementById('yposcb').value = cpos[0];
    document.getElementById('yposar').value = arpos[0];

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

    bgpos[1] += diff / 2;
    document.getElementById('yposbg').value = bgpos[1];

    campos[1] += diff / 2;

    for (const i of chars) {
        i.y += diff / 2;
    }

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
        bgpos = [540, 540];
    }
}

let sizetools = false;

document.getElementById('sizing-tool').style['display'] = "none";
document.querySelectorAll('#enable-sizing')[0].addEventListener('click', () => {
    sizetools = !sizetools
    document.getElementById('sizing-tool').style['display'] = sizetools ? "flex" : "none";
});

document.querySelectorAll('canvas#dialogue-canvas')[0].addEventListener('click', downloadImage);

let dragbg = false;
let dragcam = false;

let dragcn = false;
let dragdt = false;
let dragdc = false;
let dragcb = false;
let dragar = false;
let dragna = false

let mousecapture = [0, 0];
let previousbg = [0, 0];
let previouscam = [0, 0];
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

    var coords = translateCoordinates(e, canvas);

    if (dragbg) {
        previousbg[0] = bgpos[0];
        previousbg[1] = bgpos[1];
    }
    if (dragcam) {
        previouscam[0] = campos[0];
        previouscam[1] = campos[1];
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

    mousecapture[0] = coords[0];
    mousecapture[1] = coords[1];

    if (dragbg || dragcam || dragcn || dragdt || dragdc || dragcb || dragar || dragna) {
        disableScroll();
    }
});

document.querySelectorAll('canvas#dialogue-canvas')[0].addEventListener('pointermove', (e) => {
    if (!dragging) return;

    var coords = translateCoordinates(e, canvas);

    if (dragbg) {
        bgpos[0] = Math.round(previousbg[0] + (coords[0] - mousecapture[0]));
        bgpos[1] = Math.round(previousbg[1] + (coords[1] - mousecapture[1]));
    }
    if (dragcam) {
        campos[0] = Math.round(previouscam[0] + (coords[0] - mousecapture[0]));
        campos[1] = Math.round(previouscam[1] + (coords[1] - mousecapture[1]));
    }

    // end me pt 2
    if (dragcn) {
        tpos[0] = Math.round(previouscn[0] + (coords[0] - mousecapture[0]));
        tpos[1] = Math.round(previouscn[1] + (coords[1] - mousecapture[1]));
    }
    if (dragdt) {
        dpos[0] = Math.round(previousdt[0] + (coords[0] - mousecapture[0]));
        dpos[1] = Math.round(previousdt[1] + (coords[1] - mousecapture[1]));
    }
    if (dragdc) {
        copos[0] = Math.round(previousdc[0] + (coords[0] - mousecapture[0]));
        copos[1] = Math.round(previousdc[1] + (coords[1] - mousecapture[1]));
    }
    if (dragcb) {
        cpos[0] = Math.round(previouscb[0] + (coords[0] - mousecapture[0]));
        cpos[1] = Math.round(previouscb[1] + (coords[1] - mousecapture[1]));
    }
    if (dragar) {
        arpos[0] = Math.round(previousar[0] + (coords[0] - mousecapture[0]));
        arpos[1] = Math.round(previousar[1] + (coords[1] - mousecapture[1]));
    }
    if (dragna) {
        document.getElementById('xposna').value = Math.round(previousna[0] + (coords[0] - mousecapture[0]));
        document.getElementById('yposna').value = Math.round(previousna[1] + (coords[1] - mousecapture[1]));
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

document.querySelectorAll('#dbg')[0].addEventListener('click', () => {
    let cap = !dragbg;
    disableAllDrag();
    dragbg = cap;
    updateDragButtons();
});

document.querySelectorAll('#dcam')[0].addEventListener('click', () => {
    let cap = !dragcam;
    disableAllDrag();
    dragcam = cap;
    updateDragButtons();
});


document.querySelectorAll('#dcn')[0].addEventListener('click', () => {
    let cap = !dragcn;
    disableAllDrag();
    dragcn = cap;
    updateDragButtons();
});
document.querySelectorAll('#ddt')[0].addEventListener('click', () => {
    let cap = !dragdt;
    disableAllDrag();
    dragdt = cap;
    updateDragButtons();
});
document.querySelectorAll('#ddc')[0].addEventListener('click', () => {
    let cap = !dragdc;
    disableAllDrag();
    dragdc = cap;
    updateDragButtons();
});
document.querySelectorAll('#dcb')[0].addEventListener('click', () => {
    let cap = !dragcb;
    disableAllDrag();
    dragcb = cap;
    updateDragButtons();
});
document.querySelectorAll('#dar')[0].addEventListener('click', () => {
    let cap = !dragar;
    disableAllDrag();
    dragar = cap;
    updateDragButtons();
});
document.querySelectorAll('#dna')[0].addEventListener('click', () => {
    let cap = !dragna;
    disableAllDrag();
    dragna = cap;
    updateDragButtons();
});

document.querySelectorAll('#bgtocan')[0].addEventListener('click', () => {
    let bgs = scalebg / 100;
    document.getElementById('wca').value = bg.width * bgs;
    document.getElementById('hca').value = bg.height * bgs;
    // canvassize = [bg.width * bgs, bg.height * bgs];
    bgpos = [540, 540];

    document.getElementById('wca').dispatchEvent(new Event('input'));
    document.getElementById('hca').dispatchEvent(new Event('input'));
    generateText(text2, subtext2)
});

document.querySelectorAll('#bgautofit')[0].addEventListener('click', () => {
    bgautofit = !bgautofit;

    document.querySelectorAll('#bgautofit')[0].innerHTML = "Auto Fit: " + (bgautofit ? "ON" : "OFF");
});

document.querySelectorAll('#export-png')[0].addEventListener('click', downloadImage);

function updateDragButtons() {
    document.querySelectorAll('#dbg')[0].innerHTML = dragbg ? "ON" : "OFF";
    document.querySelectorAll('#dcam')[0].innerHTML = dragcam ? "ON" : "OFF";

    document.querySelectorAll('#dcn')[0].innerHTML = dragcn ? "ON" : "OFF";
    document.querySelectorAll('#ddt')[0].innerHTML = dragdt ? "ON" : "OFF";
    document.querySelectorAll('#ddc')[0].innerHTML = dragdc ? "ON" : "OFF";
    document.querySelectorAll('#dcb')[0].innerHTML = dragcb ? "ON" : "OFF";
    document.querySelectorAll('#dar')[0].innerHTML = dragar ? "ON" : "OFF";
    document.querySelectorAll('#dna')[0].innerHTML = dragna ? "ON" : "OFF";
}

function disableAllDrag() {
    dragbg = false;
    dragcam = false;

    dragcn = false;
    dragdt = false;
    dragdc = false;
    dragcb = false;
    dragar = false;
    dragna = false;

    curSelected = null;
    updateCharList();
    updateToolFields();
}

let drawfil = true;
document.querySelectorAll('#df')[0].addEventListener('click', () => {
    drawfil = !drawfil;

    document.querySelectorAll('#df')[0].innerHTML = drawfil ? "ON" : "OFF";
    generateText(text2, subtext2)
});

let arrowOn = true;
document.querySelectorAll('#arrow-toggle')[0].addEventListener('click', () => {
    arrowOn = !arrowOn;

    document.querySelectorAll('#arrow-toggle')[0].innerHTML = "<span>" + "Bottom right pointer: " + (arrowOn ? "Shown" : "Hidden") + "</span>";
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

    document.querySelectorAll('#ui-toggle')[0].innerHTML = "<span>" + "UI: " + (uiOn ? "Shown" : "Hidden") + "</span>";
    generateText(text2, subtext2)
});

document.querySelectorAll('#padding-toggle')[0].addEventListener('click', () => {
    padding = !padding;

    document.querySelectorAll('#padding-toggle')[0].innerHTML = "<span>" + "Landscape Padding: " + (padding ? "ON" : "OFF") + "</span>";
    generateText(text2, subtext2)
});

document.querySelectorAll('#autocolor-toggle')[0].addEventListener('click', () => {
    autocolor = !autocolor;

    document.querySelectorAll('#autocolor-toggle')[0].innerHTML = "<span>" + "Automatically change Color Bar: " + (autocolor ? "ON" : "OFF") + "</span>";
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
        if (dragcam) {
            camzoom += (e.deltaY / -1000);
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

document.getElementById("align-bg-top").onclick = (e) => {
    bgpos[1] = ((scalebg / 100) * bg.height) / 2;
    generateText(text2, subtext2);
}

document.getElementById("align-bg-ymid").onclick = (e) => {
    bgpos[1] = canvassize[1] / 2;
    generateText(text2, subtext2);
}

document.getElementById("align-bg-bot").onclick = (e) => {
    bgpos[1] = canvassize[1] - ((scalebg / 100) * bg.height) / 2;
    generateText(text2, subtext2);
}

document.getElementById("align-bg-left").onclick = (e) => {
    bgpos[0] = ((scalebg / 100) * bg.width) / 2;
    generateText(text2, subtext2);
}

document.getElementById("align-bg-xmid").onclick = (e) => {
    bgpos[0] = canvassize[0] / 2;
    generateText(text2, subtext2);
}

document.getElementById("align-bg-right").onclick = (e) => {
    bgpos[0] = canvassize[0] - ((scalebg / 100) * bg.width) / 2;
    generateText(text2, subtext2);
}

///

function generateText(text, subtext) {
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

    if (drawfil) {
        let custom = document.getElementById('customfil').value + '';
        ctx.filter = `grayscale(${gsnum}%) blur(${blnum}px) brightness(${brnum}%) ` + custom;
    }

    let bgWidth = bg.width * bgs * (camzoom * 0.1 + 1);
    let bgHeight = bg.height * bgs * (camzoom * 0.1 + 1);

    var dx = bgpos[0] - campos[0];
    var dy = bgpos[1] - campos[1];
    var canvasX = bgpos[0] + (dx * camzoom) * (camzoom >= 0 ? 1 : -1) + ((canvassize[0] / 2) - campos[0]) * 0.1;
    var canvasY = bgpos[1] + (dy * camzoom) * (camzoom >= 0 ? 1 : -1)  + ((canvassize[1] / 2) - campos[1]) * 0.1;

    ctx.drawImage(bg, canvasX - bgWidth / 2, canvasY - bgHeight / 2, bgWidth, bgHeight);

    document.getElementById('xposbg').value = bgpos[0];
    document.getElementById('yposbg').value = bgpos[1];

    document.getElementById('camx').value = campos[0];
    document.getElementById('camy').value = campos[1];

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

    // char
    for (let i of chars) {
        if (!i.visible)
            continue;

        let img = loadedImages[i.id];

        let imgWidth = img.width * i.scale * (camzoom + 1);
        let imgHeight = img.height * i.scale * (camzoom + 1);

        var dx = (i.x - campos[0]);
        var dy = (i.y - campos[1]);
        var canvasX = i.x + (dx * camzoom) + ((canvassize[0] / 2) - campos[0]);
        var canvasY = i.y + (dy * camzoom) + ((canvassize[1] / 2) - campos[1]);

        ctx.drawImage(img, canvasX - imgWidth / 2, canvasY - imgHeight / 2, imgWidth, imgHeight);
    }

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

            let startY = (canvassize[1] * (844 / 1080));

            let curY = startY;
            for (let i = 0; i < split.length; i++) {
                let item = split[i];

                ctx.globalAlpha = 1;

                ctx.font = "21px PB";
                ctx.fillStyle = "#ffffff";
                ctx.letterSpacing = "0.3px";
                ctx.textBaseline = "top";
                ctx.textAlign = "center";

                let lines = getLinesForParagraphs(ctx, item.trim(), 508 - 64);
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

                for (let j = 0; j < lines.length; j++) {
                    ctx.fillText(lines[j], canvassize[0] / 2, (curY - height) + ((height - textHeight) / 2) + 32 * j + 12);
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

            const bn = 39 * dsc; // bumfuck number

            let actionBoxMoreYOffset = (bn) * Math.max(lines.length - 2, 0) - (lines.length > 2 ? 5 : 0);
            let actionBoxHeight = (248 + actionBoxMoreYOffset) * (scalena / 100)
            let textHeight = (lines.length * (bn)) - 5;

            draw9slice(ctx, action, [54, 54, 566, 140], (canvassize[0] - result * (scalena / 100)) / 2 + xoff, ay - actionBoxHeight + 53 + yoff, result * (scalena / 100), actionBoxHeight);

            for (let i = 0; i < lines.length; i++) {
                ctx.fillText(lines[i], (canvassize[0] - ctx.measureText(lines[i]).width) / 2 + xoff, ay - actionBoxHeight + 53 + 8 + ((actionBoxHeight - textHeight) / 2) + (bn * i) + yoff, cw - 32 * 2);
            }

            ctx.globalAlpha = 1;

            ctx.letterSpacing = "0px";

            if (arrowOn) {
                ctx.drawImage(arrow, (canvassize[0] + cw) / 2 - 27 + xoff + (document.getElementById('xposar').value - 953) / scalena / 100, canvassize[1] * (952 / 1080) + (ch / 2) - 29 + yoff + (document.getElementById('yposar').value - 1027) / scalena / 100, arrow.width * scalear / 100, arrow.height * scalear / 100);
            }
        } else {
            // ctx.drawImage(img, 0, 0)
            drawGradients(false);

            ctx.font = dsize + "px " + (localStorage.getItem("fontLanguage") === "Pretendard-*.ttf" ? "PSB" : "PB");
            ctx.letterSpacing = "0.2px";
            ctx.fillStyle = "#dcdcdc";
            ctx.textBaseline = "top";

            let lines = getLinesForParagraphs(ctx, subtext, canvassize[0] - 250)
            let yoffset = (39 * Math.max(lines.length - 2, 0));

            for (let i = 0; i < lines.length; i++) {
                ctx.fillText(lines[i], dpos[0] + (padding ? (canvassize[0] - canvassize[1]) / 2 : 0), dpos[1] + (7 * dsc) + ((39 * dsc) * i) - yoffset, canvassize[0] - 250);
            }

            ctx.shadowColor = color + "80";
            ctx.shadowBlur = 3;

            ctx.fillStyle = color;
            ctx.fillRect(cpos[0] + (padding ? (canvassize[0] - canvassize[1]) / 2 : 0), cpos[1] - yoffset, 5 * scalecb / 100, 24 * scalecb / 100);

            ctx.shadowColor = "#ffffff00";
            ctx.shadowBlur = 0;

            ctx.font = tsize + "px PEB";
            ctx.letterSpacing = "0.4px";
            ctx.fillStyle = "#ffffff";
            ctx.textBaseline = "middle";
            ctx.fillText(text, tpos[0] + (padding ? (canvassize[0] - canvassize[1]) / 2 : 0), tpos[1] + 2 - yoffset, canvassize[0] - 250);

            ctx.letterSpacing = "0px";

            if (arrowOn) {
                ctx.drawImage(arrow, arpos[0] - (padding ? (canvassize[0] - canvassize[1]) / 2 : 0), arpos[1], arrow.width * scalear / 100, arrow.height * scalear / 100);
            }
        }

        if (controlsOn) {
            ctx.drawImage(controls, copos[0], copos[1], controls.width * scaledc / 100, controls.height * scaledc / 100);
        }

        ctx.globalAlpha = 0.1;
        ctx.drawImage(wmrk, 16 + (padding ? (canvassize[0] - canvassize[1]) / 2 : 0), -16, 128, 128);
    } else {
        drawGradients(true);
    }
}

var curSelected = null;

var charDragCapture = [0, 0];
var charCapture = [0, 0];
var charDragging = false;

document.getElementById("dialogue-canvas").addEventListener("pointerdown", (e) => {
    const coords = translateCoordinates(e, canvas);
    if (curSelected == null) return;
    if (charDragging) return;

    charDragging = true;
    charDragCapture[0] = coords[0];
    charDragCapture[1] = coords[1];

    charCapture[0] = chars[curSelected].x;
    charCapture[1] = chars[curSelected].y;
});

document.addEventListener("pointermove", (e) => {
    const coords = translateCoordinates(e, canvas);
    if (curSelected == null) return;
    if (!charDragging) return;

    // i took about 2 hours to figure out that final factor
    // i cant believe it was that simple
    // i hate math.
    chars[curSelected].x = Math.round(charCapture[0] + (coords[0] - charDragCapture[0]) * (1 / (camzoom + 1)));
    chars[curSelected].y = Math.round(charCapture[1] + (coords[1] - charDragCapture[1]) * (1 / (camzoom + 1)));

    updateToolFields();
});

document.addEventListener("pointerup", (e) => {
    const coords = translateCoordinates(e, canvas);
    if (curSelected == null) return;
    if (!charDragging) return;

    charDragging = false;
});

// to do:

function updateCharList() {

    // document.getElementById("dialogue-tool-main").style.display = curSelected === null ? "none" : "flex";
    for (let i of document.getElementsByClassName("charedit")) {
        i.style.opacity = curSelected === null ? "0.5" : "1";
        i.style.pointerEvents = curSelected === null ? "none" : null;
    }
    document.getElementById("deselect").innerHTML = curSelected === null ? "<span>No character selected.</span>" : "<span>Deselect</span>";
    document.getElementById("character-selector").innerHTML = '';

    for (let i of chars) {
        const object = i;
        const objectIndex = chars.indexOf(object);

        const div2 = document.createElement("div");

        const div = document.createElement("div");
        div.classList.add("input-option");
        div.classList.add("option-no-hover");
        div.style.justifyContent = "spacing-between";
        div.onclick = () => {
            if (!div2.matches(":hover")) return;

            disableAllDrag();

            curSelected = objectIndex;
            updateCharList();
            updateToolFields();
            updateDragButtons();
        }

        const divHighlight = document.createElement("div");
        divHighlight.classList.add("layer-select-highlight")
        divHighlight.style.display = objectIndex === curSelected ? "block" : "none";
        div.append(divHighlight);

        const image = document.createElement("img");
        image.src = loadedImages[i.id].src;
        image.style.maxWidth = "48px";
        image.style.maxHeight = "48px";
        div.append(image);
        div2.classList.add("button-tray")

        const visible = document.createElement("div");
        visible.classList.add("input-button");
        visible.classList.add("square");
        visible.innerHTML = chars[objectIndex].visible ? eyeOn : eyeOff;
        visible.id = "visible-" + object.id;
        visible.onclick = () => {
            chars[objectIndex].visible = !chars[objectIndex].visible;

            updateToolFields();
            updateCharList();
            generateText(text2, subtext2);
        }

        const layerUp = document.createElement("div");
        layerUp.classList.add("input-button");
        layerUp.classList.add("square");
        layerUp.innerHTML = "<span><i class='bx bx-chevron-up'></i></span>";
        layerUp.id = "layer-up-" + object.id;
        layerUp.onclick = () => {
            let newIndex = objectIndex + 1;
            if (newIndex > chars.length - 1) {
                newIndex = chars.length - 1;
            }
            if (newIndex < 0) {
                newIndex = 0;
            }
            chars.swap(objectIndex, newIndex);
            disableAllDrag();
            curSelected = newIndex;

            updateToolFields();
            updateCharList();
            updateDragButtons();
            generateText(text2, subtext2);
        }

        const layerDown = document.createElement("div");
        layerDown.classList.add("input-button");
        layerDown.classList.add("square");
        layerDown.innerHTML = "<span><i class='bx bx-chevron-down'></i></span>";
        layerDown.id = "layer-down-" + object.id;
        layerDown.onclick = () => {
            let newIndex = objectIndex - 1;
            if (newIndex > chars.length - 1) {
                newIndex = chars.length - 1;
            }
            if (newIndex < 0) {
                newIndex = 0;
            }
            chars.swap(objectIndex, newIndex);

            disableAllDrag();
            curSelected = newIndex;

            updateToolFields();
            updateCharList();
            updateDragButtons()
            generateText(text2, subtext2);
        }

        const trash = document.createElement("div");
        trash.classList.add("input-button");
        trash.classList.add("square");
        trash.innerHTML = "<span><i class='bx bx-trash'></i></span>";
        trash.id = "trash-" + object.id;
        trash.onclick = () => {
            chars.splice(objectIndex, 1);
            disableAllDrag();
            curSelected = null;

            updateToolFields();
            updateCharList();
            updateDragButtons()
            generateText(text2, subtext2);
        }

        div2.append(visible);
        div2.append(layerUp);
        div2.append(layerDown);
        div2.append(trash);

        div.append(div2);

        document.getElementById("character-selector").appendChild(div);
    }
}

const xposch = document.getElementById("xposch");
const yposch = document.getElementById("yposch");
const scalech = document.getElementById("scalech");
const visibilityCh = document.getElementById("visibility-ch")
const delch = document.getElementById("del-ch")
const deselect = document.getElementById("deselect");

function updateToolFields() {
    if (curSelected === null) return;

    xposch.value = chars[curSelected].x;
    yposch.value = chars[curSelected].y;
    scalech.value = parseInt(chars[curSelected].scale * 100);
    visibilityCh.innerHTML = chars[curSelected].visible ? eyeOn : eyeOff;

    generateText(text2, subtext2);
}

xposch.addEventListener("input", (e) => {
    if (curSelected === null) return;
    chars[curSelected].x = parseInt(xposch.value);
    updateToolFields();
});

yposch.addEventListener("input", (e) => {
    if (curSelected === null) return;
    chars[curSelected].y = parseInt(yposch.value);
    updateToolFields();
});

scalech.addEventListener("input", (e) => {
    if (curSelected === null) return;
    chars[curSelected].scale = parseInt(scalech.value) / 100;
    updateToolFields();
});

visibilityCh.addEventListener("click", (e) => {
    if (curSelected === null) return;
    chars[curSelected].visible = !chars[curSelected].visible;

    updateToolFields();
    updateCharList();
    generateText(text2, subtext2);
});

delch.addEventListener("click", (e) => {
    chars.splice(curSelected, 1);
    disableAllDrag();
    curSelected = null;
    
    updateToolFields();
    updateCharList();
    updateDragButtons();
    generateText(text2, subtext2);
});

deselect.addEventListener("click", (e) => {
    if (curSelected === null) return;
    disableAllDrag();
    curSelected = null;
    updateCharList();

    updateDragButtons();
    updateToolFields();
});

document.getElementById("recenter-cam").addEventListener("click", (e) => {
    campos[0] = canvassize[0] / 2;
    campos[1] = canvassize[1] / 2;

    generateText(text2, subtext2);
});

const chTop = document.getElementById("align-ch-top");
const chYMid = document.getElementById("align-ch-ymid");
const chBot = document.getElementById("align-ch-bot");

const chLeft = document.getElementById("align-ch-left");
const chXMid = document.getElementById("align-ch-xmid");
const chRight = document.getElementById("align-ch-right");

chTop.addEventListener("click", (_) => {
    if (curSelected === null) return;
    const image = loadedImages[chars[curSelected].id];
    chars[curSelected].y = image.height * chars[curSelected].scale / 2;
    updateToolFields();
    generateText(text2, subtext2);
});

chYMid.addEventListener("click", (_) => {
    if (curSelected === null) return;
    chars[curSelected].y = canvassize[1] / 2;
    updateToolFields();
    generateText(text2, subtext2);
});

chBot.addEventListener("click", (_) => {
    if (curSelected === null) return;
    const image = loadedImages[chars[curSelected].id];
    chars[curSelected].y = canvassize[1] -  (image.height * chars[curSelected].scale / 2);
    updateToolFields();
    generateText(text2, subtext2);
});

chLeft.addEventListener("click", (_) => {
    if (curSelected === null) return;
    const image = loadedImages[chars[curSelected].id];
    chars[curSelected].x = image.width * chars[curSelected].scale / 2;
    updateToolFields();
    generateText(text2, subtext2);
});

chXMid.addEventListener("click", (_) => {
    if (curSelected === null) return;
    chars[curSelected].x = canvassize[0] / 2;
    updateToolFields();
    generateText(text2, subtext2);
});

chRight.addEventListener("click", (_) => {
    if (curSelected === null) return;
    const image = loadedImages[chars[curSelected].id];
    chars[curSelected].x = canvassize[0] -  (image.width * chars[curSelected].scale / 2);
    updateToolFields();
    generateText(text2, subtext2);
});

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

function downloadImage() {
    if (dragbg || dragcam || dragcn || dragdt || dragdc || dragcb || dragar || dragna) return;
    if (curSelected != null) return;
    var link = document.createElement('a');
    var canvas = document.getElementById('dialogue-canvas')
    link.download = 'nikke-dialogue.png';
    link.href = canvas.toDataURL();
    link.click();
    link.remove();
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

Array.prototype.swap = function(x, y){
    var b = this[x];
    this[x] = this[y];
    this[y] = b;
    return this;
}

document.promptText = "You might have changes in the current Dialogue. Are you sure you want to change your font?";