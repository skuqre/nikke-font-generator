// We out here with the terrible JS code
// We got that shit running 24/7
const canvas = document.getElementById("font-canvas");
const ctx = canvas.getContext("2d");
let loaded = {}
let heights = {}

let replacements = {
    "\\" : "backslash",
    "/" : "forslash",
    ":" : "colon",
    "?" : "qmark",
    "\"" : "dquote",
}

const kerning = {
    "y": {
        "l": -32
    },
    "j": {
        "y": -32,
        "t": -16,
        "w": -32,
        "v": -32
    },
    "w": {
        "a": -32,
        "l": -32,
        "o": -8
    },
    "g": {
        a: -8
    },
    "a": {
        "v": -32,
        "t": -32,
        "y": -40,
        "w": -32,
        "f": -16,
        "p": -16,
        "u": -8,
        "o": -8,
        "c": -8,
        "p": -16,
        "r": -8,
        "b": -8,
        "d": -8,
        "s": -8,
        "q": -8
    },
    "t": {
        "a": -32
    },
    "v": {
        "a": -40,
        "l": -32,
        "o": -8,
        "p": -16,
        "g": -8,
        "b": -8,
        "q": -8
    },
    "y": {
        "a": -40,
        "l": -32,
        "p": -16,
        "g": -16,
        "o": -16,
        "b": -16,
        "c": -16,
        "d": -16
    },
    "o": {
        "y": -16,
        "w": -8,
        "v": -8,
        "a": -8,
        "x": -16,
        "y": -12,
        "k": -16
    },
    "q": {
        "a": -8,
        "v": -8,
        "x": -16,
        "k": -16
    },
    "c": {
        "a": -8,
        "v": -8,
        "x": -16,
        "k": -16
    },
    "g": {
        "a": -8,
        "v": -8,
        "y": -16,
        "x": -16,
        "k": -16
    },
    "u": {
        "a": -8
    },
    "x": {
        "q": -8,
        "o": -8,
        "c": -8,
        "b": -8,
        "d": -8,
        "s": -8,
        "a": -8,
        "q": -8
    },
    "s": {
        "x": -12
    },
    ".": {
        "v": -32,
        "t": -32,
        "y": -48,
        "w": -32,
        "f": -32,
    },
    ",": {
        "v": -32,
        "t": -32,
        "y": -48,
        "w": -32,
        "f": -32,
    }
}

let logoglyphs = 'abcdefghijklmnopqrstuvwxyz,.!$&0123456789\'\\/:?"-='

for (let i = 0; i < logoglyphs.length; i++) {
    let img = new Image();

    let shit = logoglyphs.split('')[i]

    if (shit in replacements) {
        shit = replacements[shit];
    }

    img.src = `../nikke-font-generator/images/nikkefont/${shit}.png`;
    img.onload = function (e) {
        loaded[shit] = img;
        heights[shit] = img.height;
    }
}

const myFont = new FontFace('Butch', "url('../nikke-font-generator/fonts/butch-sundance.ttf')");
await myFont.load();
document.fonts.add(myFont);

ctx.font = "48px Butch";
ctx.letterSpacing = "32px";
ctx.fillStyle = "white";
ctx.textAlign = "center";

document.querySelectorAll('#generate')[0].addEventListener('click', () => {
    var text = document.getElementById('text').value;
    var subtext = document.getElementById('subtext').value;

    generateLogoText(text, subtext);
});

let autogen = true;

document.getElementById('generate').oncontextmenu = (e) => {
    e.preventDefault();

    autogen = !autogen;

    document.getElementById('generate').innerHTML = autogen ? 'Refresh' : 'Generate';
    document.getElementById('generate').disabled = autogen;
}

let color = '#ffffff';
let color2 = '#ffffff';
let size = 100;

document.querySelectorAll('#color')[0].addEventListener('change', () => {
    var text = document.getElementById('text').value;
    var subtext = document.getElementById('subtext').value;
    color = document.getElementById('color').value;
    generateLogoText(text, subtext)
});

document.querySelectorAll('#color2')[0].addEventListener('change', () => {
    var text = document.getElementById('text').value;
    var subtext = document.getElementById('subtext').value;
    color2 = document.getElementById('color2').value;
    generateLogoText(text, subtext)
});

document.querySelectorAll('#size')[0].addEventListener('change', () => {
    var text = document.getElementById('text').value;
    var subtext = document.getElementById('subtext').value;
    size = parseInt(document.getElementById('size').value);
    generateLogoText(text, subtext)
});

function autogent() {
    if (autogen) {
        var text = document.getElementById('text').value;
        var subtext = document.getElementById('subtext').value;
        generateLogoText(text, subtext)
    }
}

document.getElementById('text').oninput = autogent;
document.getElementById('subtext').oninput = autogent;

setTimeout(() => {
    generateLogoText('BARELY', 'ACCURATE NIKKE FONT GENERATOR')
}, 1000, 1);

const canvasTemp = document.createElement("canvas");
const ctxTemp = canvasTemp.getContext("2d");

let curx = 0;
let cury = 0;
function generateLogoText(text, subtext) {
    text = text.trim();
    subtext = subtext.trim();
    
    let lower = text.toLowerCase();
    let shit = lower.split('')
    curx = 0;
    cury = 0;

    let textwidth = ctx.measureText(subtext).width

    let tallest = 0;

    for (let i = 0; i < shit.length; i++) { 
        if (shit[i] == ' ') {
            curx += 64;
            continue
        }

        if (logoglyphs.indexOf(shit[i].toLowerCase()) == -1) continue;

        if (shit[i] in replacements) {
            shit[i] = replacements[shit[i]]
        }

        if (loaded[shit[i]].height > tallest) {
            tallest = loaded[shit[i]].height;
        }

        if (i > 0) {
            if (shit[i].toLowerCase() in kerning) {
                if (shit[i - 1].toLowerCase() in kerning[shit[i].toLowerCase()]) {
                    curx += kerning[shit[i].toLowerCase()][shit[i - 1].toLowerCase()];
                }
            }
        }

        curx += loaded[shit[i]].width + (i + 1 == lower.length ? 0 : 32);
        if (loaded[shit[i]].height >= cury) {
            cury = loaded[shit[i]].height;
        }
    }

    canvas.width = (textwidth > curx ? textwidth : curx) * size / 100;
    let xoffset = 0
    if (textwidth > curx) {
        xoffset = (textwidth - curx) / 2
    }
    canvas.height = (cury + 100) * size / 100;

    ctx.scale(size / 100, size / 100);

    curx = xoffset;

    for (let i = 0; i < shit.length; i++) {
        if (shit[i] == ' ') {
            curx += 64;
            continue;
        }

        if (logoglyphs.indexOf(shit[i].toLowerCase()) == -1 && !(Object.values(replacements).includes(shit[i]))) continue;

        let image = loaded[shit[i]];

        canvasTemp.width = image.width;
        canvasTemp.height = image.height;
        ctxTemp.fillStyle = color;
        ctxTemp.fillRect(0, 0, image.width, image.height);
        ctxTemp.globalCompositeOperation = "destination-in";
        ctxTemp.drawImage(image, 0, 0);
        ctxTemp.globalCompositeOperation = "source-over";

        if (i > 0) {
            if (shit[i].toLowerCase() in kerning) {
                if (shit[i - 1].toLowerCase() in kerning[shit[i].toLowerCase()]) {
                    curx += kerning[shit[i].toLowerCase()][shit[i - 1].toLowerCase()];
                }
            }
        }

        ctx.drawImage(canvasTemp, curx > 0 ? curx : 0, (tallest - image.height) / 2);
        curx += image.width + 32;
    }

    ctx.font = "48px Butch";
    ctx.letterSpacing = "32px";
    ctx.fillStyle = color2;
    ctx.textAlign = "center";
    ctx.fillText(subtext.trim(), Math.abs(textwidth - canvas.width) <= 5 ? textwidth / 2 + 16 : curx / 2, cury + 90);
}