import { hexToCSSFilter } from 'hex-to-css-filter';

// We out here with the terrible JS code
// We got that shit running 24/7
const canvas = document.getElementById("font-canvas");
const ctx = canvas.getContext("2d");
let loaded = {}

let logoglyphs = 'abcdefghijklmnopqrstuvwxyz,.!$&'
for (let i = 0; i < logoglyphs.length; i++) {
    let img = new Image();
    img.src = `../nikke-font-generator/images/nikkefont/${logoglyphs.split('')[i]}.png`;
    img.onload = function (e) {
        loaded[logoglyphs.split('')[i]] = img;
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

let color = '#ffffff';
let size = 100;

document.querySelectorAll('#color')[0].addEventListener('change', () => {
    var text = document.getElementById('text').value;
    var subtext = document.getElementById('subtext').value;
    color = document.getElementById('color').value;
    generateLogoText(text, subtext)
});

document.querySelectorAll('#size')[0].addEventListener('change', () => {
    var text = document.getElementById('text').value;
    var subtext = document.getElementById('subtext').value;
    size = parseInt(document.getElementById('size').value);
    generateLogoText(text, subtext)
});

setTimeout(() => {
    generateLogoText('BARELY', 'ACCURATE NIKKE FONT GENERATOR')
}, 1000, 1);

let curx = 0;
let cury = 0;
function generateLogoText(text, subtext) {
    let lower = text.toLowerCase();
    curx = 0;
    cury = 0;

    let textwidth = ctx.measureText(subtext).width

    for (let i = 0; i < lower.length; i++) {
        if (lower.split('')[i] == ' ') {
            curx += 64;
            continue;
        }
        curx += loaded[lower.split('')[i]].width + (i + 1 == lower.length ? 0 : 32);
        if (loaded[lower.split('')[i]].height >= cury) {
            cury = loaded[lower.split('')[i]].height;
        }
    }
    canvas.width = (textwidth > curx ? textwidth : curx) * size / 100;
    let xoffset = 0
    if (textwidth > curx) {
        xoffset = (textwidth - curx) / 2
    }
    canvas.height = (cury + 100) * size / 100;

    ctx.filter = 'brightness(0) ' + hexToCSSFilter(color)['filter'].replace(';', '');
    ctx.scale(size / 100, size / 100);

    curx = xoffset;
    for (let i = 0; i < lower.length; i++) {
        if (lower.split('')[i] == ' ') {
            curx += 64;
            continue;
        }
        ctx.drawImage(loaded[lower.split('')[i]], curx > 0 ? curx : 0, 0);
        curx += loaded[lower.split('')[i]].width + 32;
    }

    ctx.font = "48px Butch";
    ctx.letterSpacing = "32px";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText(subtext.trim(), Math.abs(textwidth - canvas.width) <= 5 ? textwidth / 2 + 16 : curx / 2, cury + 90);
}