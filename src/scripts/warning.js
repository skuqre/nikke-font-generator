import { getRandomArbitrary, draw9slice } from "./util.js";

const canvas = document.getElementById("warning-canvas");
const ctx = canvas.getContext("2d");

const myFont = new FontFace('VOLT', "url('/nikke-font-generator/fonts/Voltec.ttf')");
await myFont.load();
document.fonts.add(myFont);

const myFont2 = new FontFace('ABOL', "url('/nikke-font-generator/fonts/AbolitionTest-Regular.ttf')");
await myFont2.load();
document.fonts.add(myFont2);

let hexbg = new Image();
hexbg.crossOrigin = "anonymous";
hexbg.src = `/nikke-font-generator/images/warning/hexbackdrop.png`;

let row = new Image();
row.crossOrigin = "anonymous";
row.src = `/nikke-font-generator/images/warning/row.png`;

let row2 = new Image();
row2.crossOrigin = "anonymous";
row2.src = `/nikke-font-generator/images/warning/row2.png`;

let square = new Image();
square.crossOrigin = "anonymous";
square.src = `/nikke-font-generator/images/warning/square.png`;

let bossicon = new Image();
bossicon.crossOrigin = "anonymous";
bossicon.src = `/nikke-font-generator/images/warning/bossicon.png`;

let border = new Image();
border.crossOrigin = "anonymous";
border.src = `/nikke-font-generator/images/warning/border.png`;

let wmrk = new Image();
wmrk.crossOrigin = "anonymous";
wmrk.src = `/nikke-font-generator/favicon.png`;

let bossnames = [
    "Modernia",
    "Chatterbox",
    "Alteisen Mk. VI",
    "Alexander",
    "Doro",
    "Land Eater",
    "Gatekeeper",
    "Alexander Alteisen Vanburen the Fiftysixth",
    "Storm Bringer",
    "Grave Digger",
    "Blacksmith",
    "Kraken",
    "Mother Whale",
    "Dororong",
    "Ordinary Recruitment",
    "Advanced Recruitment",
    "At least 9 Rs",
    "10 Rs",
    "400 pulls and not a single SSR",
    "Maxwell",
    "Matis",
    "Drake",
    "Material H",
    "Your Wallet",
    "Your Credit Card",
    "Syuen",
    "Harvester",
    "\"Yet Another Heretic\""
]

var text = bossnames[Math.round(Math.random() * (bossnames.length - 1))];
var subtext = "WARNING"

var defRowVal = getRandomArbitrary(-50, 0);
var defRow2Val = getRandomArbitrary(-25, 0);
var defHexWidth = getRandomArbitrary(-100, 0);
var defWarnWidth = getRandomArbitrary(-100, 100);

var bnshit = [-8, 357, 117]
var bgpos = [0, 0];

var bg = new Image();
var scalebg = 100;

let offsets = [0, 0];

setTimeout(() => {
    drawBossText();
}, 1000)

function drawBossText() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let ch = canvas.height / 1080;

    ctx.drawImage(bg, bgpos[0], bgpos[1], bg.width * scalebg / 100, bg.height * scalebg / 100)
    
    var curHexWidth = defHexWidth;
    ctx.globalAlpha = 0.5;
    while (curHexWidth < canvas.width) {
        ctx.drawImage(hexbg, curHexWidth, (822 * ch - hexbg.height / 2) + offsets[1]);
        curHexWidth += hexbg.width;
    }
    ctx.globalAlpha = 1.0;

    var curRowWidth = defRowVal;
    var curRow2Width = defRow2Val;
    while (curRowWidth < canvas.width) {
        ctx.drawImage(row, curRowWidth, (822 * ch + 29) + offsets[1]);
        curRowWidth += row.width;
    }
    while (curRow2Width < canvas.width) {
        ctx.drawImage(row2, curRow2Width, (822 * ch - 29 - row2.height) + offsets[1]);
        curRow2Width += row2.width;
    }

    var curWarnWidth = defWarnWidth + offsets[0];
    while (curWarnWidth < canvas.width) {

        ctx.font = "45px ABOL";
        ctx.textAlign = "left";
        ctx.textBaseline = "middle";

        ctx.globalAlpha = 0.5;
        ctx.fillStyle = "#000000";
        ctx.fillText(subtext, curWarnWidth + 2, (821 * ch) + offsets[1]);
        ctx.globalAlpha = 1;
        ctx.fillStyle = "#ff0000";
        ctx.fillText(subtext, curWarnWidth, (819 * ch) + offsets[1]);

        curWarnWidth += ctx.measureText(subtext).width + 115;
    }


    ctx.drawImage(square, (canvas.width - square.width) / 2, (822 * ch - square.height / 2) + offsets[1]);
    ctx.drawImage(bossicon, (canvas.width - 150) / 2, (822 * ch - 160 / 2) + offsets[1], 150, 160);

    ctx.save();
    ctx.translate(canvas.width / 2 + bnshit[0], (canvas.height / 2 + bnshit[1] * ch) + offsets[1]);
    ctx.rotate(-0.139626);
    ctx.font = bnshit[2] + "px VOLT";
    ctx.textAlign = "center";
    ctx.textBaseline = "top";

    ctx.fillStyle = "#000000";
    ctx.globalAlpha = 0.4;
    ctx.fillText(text, 4, 4);
    ctx.globalAlpha = 1.0;

    ctx.fillStyle = "#ee0200";
    ctx.fillText(text, 0, 0);

    ctx.restore();

    draw9slice(ctx, border, [38, 38, 2, 2], 0, 0, canvas.width, canvas.height);

    ctx.globalAlpha = 0.05;
    ctx.drawImage(wmrk, 16, -16, 128, 128);
    ctx.globalAlpha = 1;

    document.getElementById("xposbn").value = bnshit[0];
    document.getElementById("yposbn").value = bnshit[1];
    document.getElementById("scalebn").value = bnshit[2];

    document.getElementById("xposbg").value = bgpos[0];
    document.getElementById("yposbg").value = bgpos[1];
    document.getElementById("scalebg").value = scalebg;
}

document.getElementById("text").oninput = (_) => {
    text = document.getElementById("text").value;
    drawBossText();
}

document.getElementById("subtext").oninput = (_) => {
    subtext = document.getElementById("subtext").value;
    drawBossText();
}

document.getElementById("wcanvas").oninput = (_) => {
    canvas.width = parseInt(document.getElementById("wcanvas").value);
    drawBossText();
}

document.getElementById("hcanvas").oninput = (_) => {
    canvas.height = parseInt(document.getElementById("hcanvas").value);
    drawBossText();
}
document.getElementById("xposbn").oninput = (_) => {
    bnshit[0] = parseInt(document.getElementById("xposbn").value)
    drawBossText();
}
document.getElementById("yposbn").oninput = (_) => {
    bnshit[1] = parseInt(document.getElementById("yposbn").value)
    drawBossText();
}
document.getElementById("scalebn").oninput = (_) => {
    bnshit[2] = parseInt(document.getElementById("scalebn").value)
    drawBossText();
}

document.querySelectorAll('#bg-img-up')[0].addEventListener('change', () => {
    const fileList = document.querySelectorAll('#bg-img-up')[0].files;
    const filer = new FileReader();
    filer.onload = (e) => {
        bg.src = e.target.result;
        bg.onload = (e) => {
            if (bg.width > bg.height) {
                scalebg = (canvas.height / bg.height) * 100;
                document.getElementById('scalebg').value = parseInt(scalebg);
                bgpos = [(canvas.width - 1080 * (bg.width / bg.height)) / 2, 0];
            } else {
                scalebg = (canvas.width / bg.width) * 100;
                document.getElementById('scalebg').value = parseInt(scalebg);
                bgpos = [0, 0];
            }

            drawBossText();
        }
    };
    if (fileList.length > 0) {
        filer.readAsDataURL(fileList[0]);
    }
});

document.getElementById("xposbg").oninput = (_) => {
    bgpos[0] = parseInt(document.getElementById("xposbg").value);
    drawBossText();
}; 
document.getElementById("yposbg").oninput = (_) => {
    bgpos[1] = parseInt(document.getElementById("yposbg").value);
    drawBossText();
}; 
document.getElementById("scalebg").oninput = (_) => {
    scalebg = parseInt(document.getElementById("scalebg").value);
    drawBossText();
};

document.getElementById("xoff").oninput = (_) => {
    offsets[0] = parseInt(document.getElementById("xoff").value);
    drawBossText();
}; 
document.getElementById("yoff").oninput = (_) => {
    offsets[1] = parseInt(document.getElementById("yoff").value);
    drawBossText();
}; 

document.getElementById("download").addEventListener("click", () => {
    var link = document.createElement('a');
    var canvas = document.getElementById('warning-canvas')
    link.download = 'nikke-warning.png';
    link.href = canvas.toDataURL();
    link.click();
});


// window.addEventListener('keydown', (e) => {
//     switch (e.key.toLowerCase()) {
//         case 'd':
//             canvas.width += 10; break;
//         case 'a':
//             canvas.width -= 10; break;
//         case 'w':
//             canvas.height -= 10; break;
//         case 's':
//             canvas.height += 10; break;
//     }

//     drawBossText();
// })