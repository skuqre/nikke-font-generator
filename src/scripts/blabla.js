import { draw9slice } from "./util.js";
import fuzzysort from "fuzzysort";

const canvas = document.getElementById("blabla-canvas");
const ctx = canvas.getContext("2d", { willReadFrequently: true });

const myFont = new FontFace('PEB', "url('/nikke-font-generator/fonts/Pretendard-ExtraBold.ttf')");
await myFont.load();
document.fonts.add(myFont);

const myFont2 = new FontFace('PB', "url('/nikke-font-generator/fonts/Pretendard-Bold.ttf')");
await myFont2.load();
document.fonts.add(myFont2);

var chats = [
    {
        'name': 'Commander',
        'image': '',
        'message': 'Anis?',
        'color': '#fea50a'
    },
    {
        'name': 'Commander',
        'image': '',
        'message': 'Rapi?',
        'color': '#fea50a'
    },
    {
        'name': 'Commander',
        'image': '',
        'message': 'Neon??',
        'color': '#fea50a'
    },
    {
        'name': 'Commander',
        'image': '',
        'message': 'Seems like no one\'s around.',
        'color': '#fea50a'
    }
];

const nikkepfps = {}
const response = await fetch('https://api.dotgg.gg/nikke/characters/');
response.json().then((e) => {
    for (let i = 0; i < e.length; i++) {
        nikkepfps[e[i].name.toLowerCase()] = e[i].img;
    }
});

let top = new Image();
top.crossOrigin = "anonymous"
top.src = `/nikke-font-generator/images/blabla/top.png`;

let shadow = new Image();
shadow.crossOrigin = "anonymous"
shadow.src = `/nikke-font-generator/images/blabla/shadow.png`;

let bot = new Image();
bot.crossOrigin = "anonymous"
bot.src = `/nikke-font-generator/images/blabla/bot.png`;

let arr = new Image();
arr.crossOrigin = "anonymous"
arr.src = `/nikke-font-generator/images/blabla/arrow.png`;

let bub = new Image();
bub.crossOrigin = "anonymous"
bub.src = `/nikke-font-generator/images/blabla/chatbubble.png`;

let sbub = new Image();
sbub.crossOrigin = "anonymous"
sbub.src = `/nikke-font-generator/images/blabla/bubbleshadow.png`;

let r_bub = new Image();
r_bub.crossOrigin = "anonymous"
r_bub.src = `/nikke-font-generator/images/blabla/r_chatbubble.png`;

let r_sbub = new Image();
r_sbub.crossOrigin = "anonymous"
r_sbub.src = `/nikke-font-generator/images/blabla/r_bubbleshadow.png`;

let pfpCanvas = document.createElement('canvas');
let pfpCtx = pfpCanvas.getContext('2d');
pfpCtx.width = 74;
pfpCtx.height = 74;

let pfpCanvas2 = document.createElement('canvas');
let pfpCtx2 = pfpCanvas2.getContext('2d');
pfpCtx2.width = 74;
pfpCtx2.height = 74;

let pfpMask = new Image();
pfpMask.crossOrigin = "anonymous";
pfpMask.src = `/nikke-font-generator/images/blabla/mask.png`;

// start xy 107, 174

setTimeout(() => {
    generateBlabla();
}, 1000);

function generateBlabla() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    canvas.width = 540;
    canvas.height = 900;

    ctx.drawImage(bot, 0, top.height);

    let curx = 107;
    let cury = 174 + parseFloat(document.getElementById("ypos").value);

    let curSpeaker = ''

    for (let i = 0; i < chats.length; i++) {
        let item = chats[i];

        var nextSpeakerAdd = 0
        let switchedSpeakers = false;
        if (curSpeaker != item.name) {
            curSpeaker = item.name;

            if (curSpeaker.toLowerCase() != 'commander') {
                curx = 107;

                ctx.font = "16px PEB";
                ctx.fillStyle = "#404040";
                ctx.textBaseline = "bottom";
                ctx.textAlign = "left";

                ctx.fillText(curSpeaker, curx + 9, cury - 5);
                switchedSpeakers = true
            } else {
                curx = canvas.width - 24;
                cury += 5;
                nextSpeakerAdd = -8;
            }
        }
        if (chats[i + 1] != null) {
            if (chats[i + 1].name.toLowerCase() != 'commander') {
                if (curSpeaker.toLowerCase() != chats[i + 1].name.toLowerCase()) {
                    nextSpeakerAdd = 38;
                }
            } else if (curSpeaker.toLowerCase() != 'commander') {
                nextSpeakerAdd = 8;
            } else {
                nextSpeakerAdd = 0;
            }
        }

        ctx.font = "21px PEB";
        ctx.fillStyle = "#333333";
        ctx.textBaseline = "top";
        ctx.textAlign = "left";
        ctx.letterSpacing = '-0.8px'; // ?

        let width = ctx.measureText(item.message).width > 418 ? 418 : ctx.measureText(item.message).width;
        let actualWidth = width + 22 * 2 > 418 ? 418 : width + 22 * 2;
        let lines = getLinesForParagraphs(ctx, item.message, actualWidth - 22 * 2);
        let height = lines.length > 1 ? 19 + ((31) * (lines.length + 1)) : 81;

        let ass = curSpeaker.toLowerCase() != 'commander' ? 37 : 34;

        if (curSpeaker.toLowerCase() != 'commander') {
            ctx.fillStyle = "#333333";
            ctx.globalAlpha = 0.35;
            draw9slice(ctx, sbub, [ass, 36, 1, 1], curx - 22, cury - 13, actualWidth + 29, lines.length == 1 ? 81 : height, item.color)
            ctx.globalAlpha = 1;
            draw9slice(ctx, bub, [ass, 36, 1, 1], curx - 22, cury - 13, actualWidth + 29, lines.length == 1 ? 81 : height, item.color)

            if (lines.length > 1) {
                for (let j = 0; j < lines.length; j++) {
                    ctx.fillText(lines[j].trim(), curx - 6 + 21, cury + 19 + ((31) * j), actualWidth - 22 * 2);
                }
            } else {
                ctx.fillText(item.message.trim(), curx - 6 + 21, cury + 19, actualWidth - 22 * 2);
            }

            if (switchedSpeakers) {
                let pfpImg = new Image();
                pfpImg.crossOrigin = "anonymous";
                pfpImg.src = item.image;
                let pfpy = cury + (lines.length == 1 ? 81 : height) - 81;
                pfpImg.onload = function() {
                    pfpCtx.drawImage(pfpMask, 0, 0);
                    pfpCtx.globalCompositeOperation = 'source-in';
                    
                    pfpCtx2.fillStyle = '#ffffff';
                    pfpCtx2.fillRect(0, 0, 74, 74);
                    pfpCtx2.drawImage(pfpImg, 0, 0, 74, 74);

                    pfpCtx.drawImage(pfpCanvas2, 0, 0);

                    ctx.drawImage(pfpCanvas, 107 - 74 - 19, pfpy - 19)
                }
            }
        } else {
            ctx.fillStyle = "#ffffff"
            ctx.globalAlpha = 0.35;
            draw9slice(ctx, r_sbub, [ass, 36, 1, 1], curx - actualWidth - 16, cury - 18, actualWidth + 29, lines.length == 1 ? 81 : height, item.color)
            ctx.globalAlpha = 1;
            draw9slice(ctx, r_bub, [ass, 36, 1, 1], curx - actualWidth - 16, cury - 18, actualWidth + 29, lines.length == 1 ? 81 : height, item.color)

            if (lines.length > 1) {
                for (let j = 0; j < lines.length; j++) {
                    ctx.fillText(lines[j].trim(), curx - actualWidth + 17, cury + 14 + ((31) * j), actualWidth - 22 * 2);
                }
            } else {
                ctx.fillText(item.message.trim(), curx - actualWidth + 17, cury + 14, actualWidth - 22 * 2);
            }
        }

        cury += height - 9 + nextSpeakerAdd - 10;

        ctx.letterSpacing = '0px';
    }

    ctx.drawImage(top, 0, 0);
    ctx.globalAlpha = 0.4;
    ctx.drawImage(shadow, 0, top.height);
    ctx.globalAlpha = 1;

    if (arrowOn) {
        ctx.drawImage(arr, 29, 69);
    }

    ctx.font = "28px PEB";
    ctx.textBaseline = "top";
    ctx.textAlign = "left";

    ctx.fillStyle = "#000000";
    ctx.globalAlpha = 0.25;
    ctx.fillText(chatname, 61, 71);

    ctx.fillStyle = "#ffffff";
    ctx.globalAlpha = 1.0;
    ctx.fillText(chatname, 60, 70);
}

let currentImage = '';

document.getElementById("char-img-up").onchange = (e) => {
    const fileList = document.querySelectorAll('#char-img-up')[0].files;
    const filer = new FileReader();
    filer.onload = (e) => {
        currentImage = e.target.result.toString();
        document.getElementById("pfp-preview").src = currentImage;
    };
    if (fileList.length > 0) {
        filer.readAsDataURL(fileList[0]);
    }
}

document.getElementById("add").onclick = (e) => {
    chats.push({
        'name': document.getElementById("charname").value,
        'image': currentImage,
        'message': document.getElementById("chatter").value,
        'color': document.getElementById("color").value,
    });

    generateBlabla();
}

document.getElementById("del-late").onclick = (e) => {
    chats.pop();
    generateBlabla();
}

document.getElementById("del-spec").onclick = (e) => {
    chats.splice(parseInt(document.getElementById("message-index").value), 1);
    generateBlabla();
}

document.getElementById("res-color").onclick = (e) => {
    document.getElementById("color").value = document.getElementById("com-color").value;
    generateBlabla();
}

let arrowOn = true;
document.getElementById("arrow-toggle").onclick = (e) => {
    arrowOn = !arrowOn;
    document.getElementById("arrow-toggle").innerHTML = "Arrow: " + (arrowOn ? "ON" : "OFF");
    generateBlabla();
}

document.getElementById("set-oth").onclick = (e) => {
    document.getElementById("charname").value = '';
    document.getElementById("color").value = '#ffffff';
}

document.getElementById("set-com").onclick = (e) => {
    document.getElementById("charname").value = 'Commander';
    document.getElementById("color").value = document.getElementById("com-color").value;
}

document.getElementById("message-index-edit").onclick = (e) => {
    let item = chats[parseInt(document.getElementById("message-index-edit").value)];
    document.getElementById("message-index-edit").setAttribute('max', chats.length - 1);

    document.getElementById("charname-edit").value = item.name;
    document.getElementById("chatter-edit").value = item.message;
    document.getElementById("color-edit").value = item.color;

    document.getElementById("pfp-preview-edit").src = item.image.length > 0 ? item.image : '/nikke-font-generator/images/blabla/pfp/nochat.png';
}

document.getElementById("charname-edit").oninput = (e) => {
    chats[parseInt(document.getElementById("message-index-edit").value)].name = document.getElementById("charname-edit").value
    generateBlabla();
}

document.getElementById("chatter-edit").oninput = (e) => {
    chats[parseInt(document.getElementById("message-index-edit").value)].message = document.getElementById("chatter-edit").value
    generateBlabla();
}

let chatname = 'Counters'
document.getElementById("chatname").oninput = (e) => {
    chatname = document.getElementById("chatname").value
    generateBlabla();
}

document.getElementById("ypos").oninput = (e) => {
    generateBlabla();
}

document.getElementById("char-pres-up").oninput = (e) => {
    currentImage = '';
    if (Object.keys(nikkepfps).length > 0) {
        if (document.getElementById("char-pres-up").value.trim().length > 0) {
            const results = fuzzysort.go(document.getElementById("char-pres-up").value, Object.keys(nikkepfps));
            if (results.length > 0) {
                currentImage = `https://raw.githubusercontent.com/Nikke-db/Nikke-db.github.io/main/images/sprite/${nikkepfps[results[0].target]}.png`;
                document.getElementById("pfp-preview").src = currentImage;
            } else {
                document.getElementById("pfp-preview").src = '/nikke-font-generator/images/blabla/pfp/nochat.png';
            }
        } else {
            document.getElementById("pfp-preview").src = '/nikke-font-generator/images/blabla/pfp/nochat.png';
        }
    }
}

document.getElementById("char-pres-edit").oninput = (e) => {
    currentImage = '';
    if (Object.keys(nikkepfps).length > 0) {
        if (document.getElementById("char-pres-edit").value.trim().length > 0) {
            const results = fuzzysort.go(document.getElementById("char-pres-edit").value, Object.keys(nikkepfps));
            if (results.length > 0) {
                chats[parseInt(document.getElementById("message-index-edit").value)].image = `https://raw.githubusercontent.com/Nikke-db/Nikke-db.github.io/main/images/sprite/${nikkepfps[results[0].target]}.png`;
                document.getElementById("pfp-preview-edit").src = chats[parseInt(document.getElementById("message-index-edit").value)].image;
            } else {
                document.getElementById("pfp-preview-edit").src = '/nikke-font-generator/images/blabla/pfp/nochat.png';
            }
        } else {
            document.getElementById("pfp-preview-edit").src = '/nikke-font-generator/images/blabla/pfp/nochat.png';
        }

        generateBlabla();
    }
}

document.getElementById("color-edit").onchange = (e) => {
    chats[parseInt(document.getElementById("message-index-edit").value)].color = document.getElementById("color-edit").value
    generateBlabla();
}


document.getElementById("char-img-edit").onchange = (e) => {
    const fileList = document.querySelectorAll('#char-img-edit')[0].files;
    const filer = new FileReader();
    filer.onload = (e) => {
        chats[parseInt(document.getElementById("message-index-edit").value)].image = e.target.result.toString();
        document.getElementById('pfp-preview-edit').src = e.target.result.toString();
        generateBlabla();
    };
    if (fileList.length > 0) {
        filer.readAsDataURL(fileList[0]);
    }
}

document.getElementById("blabla-canvas").onclick = () => {
    var link = document.createElement('a');
    var canvas = document.getElementById('blabla-canvas')
    link.download = 'nikke-blabla.png';
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