import { draw9slice, eyeOff, eyeOn } from "./util.js";
import fuzzysort from "fuzzysort";
import * as HME from "h264-mp4-encoder";
import { Buffer } from "buffer";
import { fontNames } from "./langinit.js"

if (localStorage.getItem("fontLanguage") === null) {
    localStorage.setItem("fontLanguage", fontNames["en"]);
}

const canvas = document.getElementById("blabla-canvas");
const ctx = canvas.getContext("2d", { willReadFrequently: true });

const myFont = new FontFace('PEB', "url('/nikke-font-generator/fonts/" + localStorage.getItem("fontLanguage").replace("*", "ExtraBold") + "')");
await myFont.load();
document.fonts.add(myFont);

const myFont2 = new FontFace('PB', "url('/nikke-font-generator/fonts/" + localStorage.getItem("fontLanguage").replace("*", "Bold") + "')");
await myFont2.load();
document.fonts.add(myFont2);

const myFont3 = new FontFace('PR', "url('/nikke-font-generator/fonts/" + localStorage.getItem("fontLanguage").replace("*", "Regular") + "')");
await myFont3.load();
document.fonts.add(myFont3);

const myFont4 = new FontFace('SB', "url('/nikke-font-generator/fonts/SUIT-Bold.ttf')");
await myFont4.load();
document.fonts.add(myFont4);

var chats = [
    {
        'name': 'Commander',
        'image': '',
        'message': 'Anis?',
        'color': '#ffac00'
    },
    {
        'name': 'Commander',
        'image': '',
        'message': 'Rapi?',
        'color': '#ffac00'
    },
    {
        'name': 'Commander',
        'image': '',
        'message': 'Neon??',
        'color': '#ffac00'
    },
    {
        'name': 'Commander',
        'image': '',
        'message': 'Seems like no one\'s around.',
        'color': '#ffac00'
    }
];

var profile = {
    'name': 'Commander',
    'image': 'https://nkas.pages.dev/characters/si_c942_00_s.png',
    'message': "I don't look like this, but I feel good when I think I do. Commander of Counters Squad.",
    'color': '#ffac00',

    // profile exclusive
    'bg': null
}

var mode = 'conversation';

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
        var toadd = e[i][1];

        if (e[i][2] !== undefined)
            toadd += "_NIKKEDB";

        nikkepfps[e[i][0]] = toadd;
    }
});

// populate skins
const skinFetch = await fetch("https://nkas.pages.dev/nk_data/skins.json");
const skinData = await skinFetch.json();

const nikkeggFetch = await fetch("https://nkas-l2d.pages.dev/characters.json");
const nikkeggData = await nikkeggFetch.json();

for (let i = 0; i < skinData.length; i++) {
    const skin = skinData[i];
    const cid = "c" + skin[0] + "_" + skin[1];

    const pngName = (nikkeggData[cid] + ": " + skin[2]).toLowerCase();
    const pngSrc = "si_c" + skin[0] + "_" + skin[1] + "_s";

    nikkepfps[pngName] = pngSrc;
}

const response4 = await fetch('/nikke-font-generator/blabla-raptures.json');
response4.json().then((e) => {
    for (let i = 0; i < e.length; i++) {
        nikkepfps["rapture " + e[i][0]] = e[i][1];
    }
});

let top = new Image();
top.crossOrigin = "anonymous"
top.src = `/nikke-font-generator/images/blabla/top.png`;

let top2 = new Image();
top2.crossOrigin = "anonymous"
top2.src = `/nikke-font-generator/images/blabla/top2.png`;

let shadow = new Image();
shadow.crossOrigin = "anonymous"
shadow.src = `/nikke-font-generator/images/blabla/shadow.png`;

let bot = new Image();
bot.crossOrigin = "anonymous"
bot.src = `/nikke-font-generator/images/blabla/bot.png`;

let bot2 = new Image();
bot2.crossOrigin = "anonymous"
bot2.src = `/nikke-font-generator/images/blabla/bot2.png`;

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

let sybub = new Image();
sybub.crossOrigin = "anonymous"
sybub.src = `/nikke-font-generator/images/blabla/systembubble.png`;

let s_sybub = new Image();
s_sybub.crossOrigin = "anonymous"
s_sybub.src = `/nikke-font-generator/images/blabla/s_systembubble.png`;

let mission_logo = new Image();
mission_logo.crossOrigin = "anonymous"
mission_logo.src = `/nikke-font-generator/images/blabla/logo_mission.png`;

let nikke_logo = new Image();
nikke_logo.crossOrigin = "anonymous"
nikke_logo.src = `/nikke-font-generator/images/blabla/logo_nikke.png`;

let nikkelogo_c = new Image();
nikkelogo_c.crossOrigin = "anonymous"
nikkelogo_c.src = `/nikke-font-generator/images/blabla/nikke_colored.png`;

let group_logo = new Image();
group_logo.crossOrigin = "anonymous"
group_logo.src = `/nikke-font-generator/images/blabla/logo_group.png`;

let indicator = new Image();
indicator.crossOrigin = "anonymous"
indicator.src = `/nikke-font-generator/images/blabla/indicator.png`;

let blabla_logo = new Image();
blabla_logo.crossOrigin = "anonymous"
blabla_logo.src = `/nikke-font-generator/images/blabla/blabla_logo.png`;

let blabla_chatbox = new Image();
blabla_chatbox.crossOrigin = "anonymous"
blabla_chatbox.src = `/nikke-font-generator/images/blabla/blabla_chatbox.png`;

let chatter_mask = new Image();
chatter_mask.crossOrigin = "anonymous"
chatter_mask.src = `/nikke-font-generator/images/blabla/chatter_mask.png`;

let chatterbg = new Image();
chatterbg.crossOrigin = "anonymous"
chatterbg.src = `/nikke-font-generator/images/blabla/chatterbg.png`;

let wifi = new Image();
wifi.crossOrigin = "anonymous"
wifi.src = `/nikke-font-generator/images/blabla/wifi.png`;

let pfpCanvas = document.createElement('canvas');
let pfpCtx = pfpCanvas.getContext('2d');
pfpCtx.width = 74;
pfpCtx.height = 74;

let pfpCanvas2 = document.createElement('canvas');
let pfpCtx2 = pfpCanvas2.getContext('2d');
pfpCtx2.width = 74;
pfpCtx2.height = 74;

let pfpCanvas3 = document.createElement('canvas');
let pfpCtx3 = pfpCanvas3.getContext('2d');
pfpCtx3.width = 134;
pfpCtx3.height = 134;

let chatterCanvas = document.createElement('canvas');
let chatterCtx = chatterCanvas.getContext('2d');
chatterCtx.width = 111;
chatterCtx.height = 84;

let chatterCanvas2 = document.createElement('canvas');
let chatterCtx2 = chatterCanvas2.getContext('2d');
chatterCtx2.width = 111;
chatterCtx2.height = 84;

let attachmentCanvas = document.createElement('canvas');
let attachmentCtx = attachmentCanvas.getContext('2d');

let pfpMask = new Image();
pfpMask.crossOrigin = "anonymous";
pfpMask.src = `/nikke-font-generator/images/blabla/mask.png`;

let amask = new Image();
amask.crossOrigin = "anonymous"
amask.src = `/nikke-font-generator/images/blabla/attachmentmask.png`;

let thoughtbubble = new Image();
thoughtbubble.crossOrigin = "anonymous";
thoughtbubble.src = `/nikke-font-generator/images/blabla/thoughtbubble.png`;

let thoughttail = new Image();
thoughttail.crossOrigin = "anonymous";
thoughttail.src = `/nikke-font-generator/images/blabla/thoughttails.png`;

let tailCanvas = document.createElement('canvas');
let tailCtx = tailCanvas.getContext('2d');

let darkener = new Image();
darkener.crossOrigin = "anonymous";
darkener.src = `/nikke-font-generator/images/blabla/darkener.png`;

let top3 = new Image();
top3.crossOrigin = "anonymous";
top3.src = `/nikke-font-generator/images/blabla/top3.png`;

let bot3 = new Image();
bot3.crossOrigin = "anonymous";
bot3.src = `/nikke-font-generator/images/blabla/bot3.png`;

let topGradient = new Image();
topGradient.crossOrigin = "anonymous";
topGradient.src = `/nikke-font-generator/images/blabla/profiletopgradient.png`;

let profilemask = new Image();
profilemask.crossOrigin = "anonymous";
profilemask.src = `/nikke-font-generator/images/blabla/profilemask.png`;

let profilebgmask = new Image();
profilebgmask.crossOrigin = "anonymous";
profilebgmask.src = `/nikke-font-generator/images/blabla/profilebgmask.png`;

let profilebgmaskshad = new Image();
profilebgmaskshad.crossOrigin = "anonymous";
profilebgmaskshad.src = `/nikke-font-generator/images/blabla/profilebgmaskshad.png`;

// start xy 107, 174

setTimeout(() => {
    generateBlabla();
}, 1000);

// no names and no pfps
let noname = [
    'commander',
    'system',
    'indicator'
]

// loaded pfps
let loaded = {};

// loaded attachments
let loadedAttachments = {}

/*
0.3 seconds 
75 pixel offset
sine out
*/

let xOffset = 0.0; // 75 to 0
let yOffset = 0.0; // 10 to 0
let alphaMult = 1.0;
let messageMaxFrames = 0; // (0.3 seconds + (0.05 * amount of letters in message)) * 30
let curMessageFrames = 0;
let exporting = false;

const easeOutSine = x => Math.sin((x * Math.PI) / 2);

function resetAnimatables() {
    xOffset = 0;
    yOffset = 0;
    alphaMult = 1;
    messageMaxFrames = 0;
    curMessageFrames = 0;
}

function generateBlabla() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    canvas.width = 540;
    canvas.height = 900;
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    ctx.drawImage(gridOn ? bot2 : bot, 0, top.height);

    if (mode == 'profile') {
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        // Draw Profile Screen
        ctx.drawImage(top3, 0, 0);

        if (loaded[profile.bg] != null) {
            let bgImg = loaded[profile.bg];

            let bgCanvas = document.createElement('canvas');
            let bgCtx = bgCanvas.getContext('2d');

            const BGWIDTH = canvas.width - 128;
            const BGHEIGHT = 624 * 508 / BGWIDTH;
            const SHADWIDTH = canvas.width - (128 - 18 * 2);
            const SHADHEIGHT = 646 * 553 / SHADWIDTH;

            bgCanvas.width = BGWIDTH;
            bgCanvas.height = BGHEIGHT;

            bgCtx.drawImage(profilebgmask, 0, 0, BGWIDTH, BGHEIGHT);
            bgCtx.globalCompositeOperation = 'source-in';

            let scale = parseFloat(document.getElementById('scalebg').value) / 100;
            let xoff = parseFloat(document.getElementById('xposbg').value)
            let yoff = parseFloat(document.getElementById('yposbg').value)
            if (bgImg.width > bgImg.height) {
                const widthS = bgImg.width * BGHEIGHT / bgImg.height * scale;
                const heightS = BGHEIGHT * scale;
                bgCtx.drawImage(bgImg, (BGWIDTH - widthS) / 2 + xoff, 0 + yoff, widthS, heightS);
            } else {
                const widthS = BGWIDTH * scale;
                const heightS = bgImg.height * BGWIDTH / bgImg.width * scale;
                bgCtx.drawImage(bgImg, (BGWIDTH - widthS) / 2 + xoff, 0 + yoff, widthS, heightS);
            }

            if (!bgImg.src.endsWith('transparent.png')) {
                ctx.drawImage(profilebgmaskshad, (canvas.width - SHADWIDTH) / 2, (canvas.width - SHADWIDTH) / 2 - 9, SHADWIDTH, SHADHEIGHT);
                ctx.drawImage(bgCanvas, (canvas.width - BGWIDTH) / 2, (canvas.width - BGWIDTH) / 2);
            }
        } else {
            const ass = profile.bg;
            if (ass !== null) {
                let bgImg = new Image();
                bgImg.crossOrigin = "anonymous";
                bgImg.src = ass;
                bgImg.onload = function () {
                    if (loaded[ass] == null) {
                        loaded[ass] = bgImg;
                        generateBlabla();
                    }
                }
                bgImg.onerror = function () {
                    bgImg.src = '/nikke-font-generator/images/transparent.png';
                }
            }
        }

        ctx.globalAlpha = 0.5;
        ctx.drawImage(topGradient, 0, 0);

        ctx.globalAlpha = 1;
        ctx.drawImage(bot3, 0, canvas.height - bot3.height);

        ctx.font = "38px PEB";
        ctx.fillStyle = "#000000";
        ctx.textBaseline = "top";
        ctx.textAlign = "center";

        ctx.fillText(profile.name, canvas.width / 2, 735);

        ctx.font = "18px PB";
        ctx.fillStyle = "#525252";
        // ctx.fillText(profile.message, canvas.width / 2, 794);

        const lines = getLinesForParagraphs(ctx, profile.message, canvas.width * 0.7);

        for (let j = 0; j < lines.length; j++) {
            ctx.fillText(lines[j].trim(), canvas.width / 2, 794 + j * 26);
        }

        if (loaded[profile.image] != null) {
            let pfpImg = loaded[profile.image];

            pfpCtx3.drawImage(profilemask, 0, 0, 134, 134);
            pfpCtx3.globalCompositeOperation = 'source-in';

            if (pfpImg.width > pfpImg.height) {
                pfpCtx3.drawImage(pfpImg, 0, 0, 134, pfpImg.height * 134 / pfpImg.width);
            } else {
                pfpCtx3.drawImage(pfpImg, (134 - (pfpImg.width * 134 / pfpImg.height)) / 2, 0, pfpImg.width * 134 / pfpImg.height, 134);
            }

            pfpCtx3.globalCompositeOperation = 'source-over';

            ctx.drawImage(pfpCanvas3, (canvas.width - 134) / 2, 564);
            pfpCtx3.clearRect(0, 0, 134, 134);
        } else {
            const ass = profile.image;
            let pfpImg = new Image();
            pfpImg.crossOrigin = "anonymous";
            pfpImg.src = ass;
            pfpImg.onload = function () {
                if (loaded[ass] == null) {
                    loaded[ass] = pfpImg;
                    generateBlabla();
                }
            }
            pfpImg.onerror = function () {
                pfpImg.src = '/nikke-font-generator/images/blabla/blabla_icon_chat.png';
                generateBlabla();
            }
        }
    } else if (mode == 'conversation') {
        let curx = 107;
        let cury = 174 + ypos;

        let curSpeaker = '';

        for (let i = 0; i < chats.length; i++) {
            let item = chats[i];

            let switchedSpeakers = false;
            let gap = 7;

            if (curSpeaker != item.name.toLowerCase()) {
                curSpeaker = item.name.toLowerCase();
                switchedSpeakers = true;
            }

            if (exporting && messageBeingAnimated == i) {
                xOffset = 75 * (1 - easeOutSine(Math.min(curMessageFrames, 10) / 10));
                yOffset = 10 * (1 - easeOutSine(Math.min(curMessageFrames, 10) / 10));
                alphaMult = easeOutSine(Math.min(curMessageFrames, 10) / 10);
            } else {
                xOffset = 0;
                yOffset = 0;
                alphaMult = 1;
            }

            if (chats[i + 1] != null) {
                if (curSpeaker != chats[i + 1].name.toLowerCase()) {
                    switch (chats[i + 1].name.toLowerCase()) {
                        case 'commander':
                            gap = 12;
                            break;
                        case 'system':
                            gap = 12;
                            break;
                        case 'indicator':
                            gap = 58;
                            break;
                        default:
                            gap = 50;
                            break;
                    }
                }
            }

            ctx.font = "20px PB";
            ctx.fillStyle = "#222222";
            ctx.textBaseline = "top";
            ctx.textAlign = "left";
            ctx.lineWidth = 0.25;

            // look for longest line width and base it off of there
            // instead of relying on the full width of the image
            let linesPre = item.message.split("\n");
            let linePreWidths = [];
            for (const i of linesPre) {
                linePreWidths.push(ctx.measureText(i).width)
            }
            linePreWidths.sort((a, b) => a - b); // sort to get the highest value

            let width = linePreWidths.pop();
            let innerBubbleWidth = width + 22 * 2 > 420 ? 420 : width + 22 * 2; // the bubble w/o shadow
            let textWidth = innerBubbleWidth - 22 * 2; // could either be 418 - 22 * 2 or width - 22 * 2
            let lines = getLinesForParagraphs(ctx, item.message, textWidth);

            let height = lines.length * 31 + 24 + 13 * 2;

            let slicex = curSpeaker.toLowerCase() == 'commander' ? 33 : 37;

            // WET (Write Everything Twice)
            // TODO: make it so that the commander condition isn't just a copy LMAO
            switch (curSpeaker.toLowerCase()) {
                case 'commander':
                    if (item.attachment != null) {
                        if (loadedAttachments[item.attachment] != null) {
                            let attachment = loadedAttachments[item.attachment];
                            let scale = 1.0;
                            const margins = 13 * 2 + 5 * 2;

                            if (attachment.width > 350) {
                                scale = 350 / attachment.width;
                            }

                            ctx.globalAlpha = 0.35 * alphaMult;
                            draw9slice(ctx, r_sbub, [slicex, 35, 2, 2], canvas.width - 39 + xOffset - attachment.width * scale - 12, cury - 13, (attachment.width * scale) + margins + 4, (attachment.height * scale) + margins)
                            ctx.globalAlpha = 1 * alphaMult;
                            draw9slice(ctx, r_bub, [slicex, 35, 2, 2], canvas.width - 39 + xOffset - attachment.width * scale - 12, cury - 13, (attachment.width * scale) + margins + 4, (attachment.height * scale) + margins, item.color)

                            attachmentCtx.globalCompositeOperation = 'source-over';
                            attachmentCtx.clearRect(0, 0, attachmentCanvas.width, attachmentCanvas.height);
                            attachmentCanvas.width = attachment.width * scale;
                            attachmentCanvas.height = attachment.height * scale;
                            draw9slice(attachmentCtx, amask, [15, 17, 2, 2], 0, 0, attachmentCanvas.width, attachmentCanvas.height, '#dfdddd');
                            attachmentCtx.globalCompositeOperation = 'source-in';
                            attachmentCtx.drawImage(attachment, 0, 0, attachmentCanvas.width, attachmentCanvas.height)

                            ctx.drawImage(attachmentCanvas, canvas.width - 32 + xOffset - attachment.width * scale - 1, cury + 5);

                            // specials
                            if (item.attachment.trim().toLowerCase().startsWith("/nikke-font-generator")) {
                                switch (item.attachment.split("/").pop().trim().toLowerCase()) {
                                    case "gift_opened_template_cmd.png":
                                        ctx.font = "15px PB";
                                        ctx.fillStyle = "#323232";
                                        ctx.textBaseline = "middle";
                                        ctx.textAlign = "center";
                                        ctx.letterSpacing = '0px';

                                        ctx.fillText("Gift claimed.", (canvas.width - 32 + xOffset - attachment.width * scale - 1) + attachmentCanvas.width / 2, cury + 5 + attachmentCanvas.height / 2 + 77);
                                        break;
                                    case "gift_unopened_template_cmd.png":
                                        ctx.font = "15px PB";
                                        ctx.fillStyle = "#323232";
                                        ctx.textBaseline = "middle";
                                        ctx.textAlign = "center";
                                        ctx.letterSpacing = '0px';

                                        ctx.fillText("You sent a gift.", (canvas.width - 32 + xOffset - attachment.width * scale - 1) + attachmentCanvas.width / 2, cury + 5 + attachmentCanvas.height / 2 + 77);
                                        break;
                                    case "pcall_template_cmd.png":
                                        ctx.font = "18px PEB";
                                        ctx.fillStyle = "#fff";
                                        ctx.textBaseline = "bottom";
                                        ctx.textAlign = "left";
                                        ctx.letterSpacing = '0px';

                                        ctx.fillText("Voice Call", (canvas.width - 32 + xOffset - attachment.width * scale - 1) + attachmentCanvas.width * 84 / 240, cury + 5 + attachmentCanvas.height / 2 - 3);

                                        ctx.font = "16px PB";
                                        ctx.fillStyle = "#fdfdfd";
                                        ctx.textBaseline = "top";
                                        ctx.textAlign = "left";
                                        ctx.letterSpacing = '0px';

                                        ctx.fillText(item.message, (canvas.width - 32 + xOffset - attachment.width * scale - 1) + attachmentCanvas.width * 84 / 240, cury + 5 + attachmentCanvas.height / 2 + 7);
                                        break;
                                    case "vcall_template_cmd.png":
                                        ctx.font = "18px PEB";
                                        ctx.fillStyle = "#fff";
                                        ctx.textBaseline = "bottom";
                                        ctx.textAlign = "left";
                                        ctx.letterSpacing = '0px';

                                        ctx.fillText("Video Call", (canvas.width - 32 + xOffset - attachment.width * scale - 1) + attachmentCanvas.width * 84 / 240, cury + 5 + attachmentCanvas.height / 2 - 3);

                                        ctx.font = "16px PB";
                                        ctx.fillStyle = "#fdfdfd";
                                        ctx.textBaseline = "top";
                                        ctx.textAlign = "left";
                                        ctx.letterSpacing = '0px';

                                        ctx.fillText(item.message, (canvas.width - 32 + xOffset - attachment.width * scale - 1) + attachmentCanvas.width * 84 / 240, cury + 5 + attachmentCanvas.height / 2 + 7);
                                        break;
                                }
                            }

                            height = attachment.height * scale + margins;
                        } else {
                            width = ctx.measureText('<Loading image...>').width;
                            innerBubbleWidth = width + 22 * 2 > 420 ? 420 : width + 22 * 2; // the bubble w/o shadow
                            textWidth = innerBubbleWidth - 22 * 2; // could either be 418 - 22 * 2 or width - 22 * 2

                            ctx.globalAlpha = 0.35 * alphaMult;
                            draw9slice(ctx, r_sbub, [slicex, 35, 2, 2], canvas.width - 39 + xOffset - innerBubbleWidth, cury - 13, innerBubbleWidth + 30, height)
                            ctx.globalAlpha = 1 * alphaMult;
                            draw9slice(ctx, r_bub, [slicex, 35, 2, 2], canvas.width - 39 + xOffset - innerBubbleWidth, cury - 13, innerBubbleWidth + 30, height, item.color)

                            ctx.fillText('<Loading image...>', canvas.width - 20 + xOffset - innerBubbleWidth + 14, cury + 20, textWidth);

                            let attachmentImg = new Image();
                            attachmentImg.crossOrigin = "anonymous";
                            attachmentImg.src = item.attachment;
                            attachmentImg.onload = function () {
                                if (loadedAttachments[item.attachment] == null) {
                                    loadedAttachments[item.attachment] = attachmentImg;
                                    generateBlabla();
                                }
                            }
                            attachmentImg.onerror = function () {
                                attachmentImg.src = '/nikke-font-generator/images/blabla/pfp/nochat.png';
                            }
                        }
                    } else {
                        ctx.fillStyle = "#ffffff"
                        ctx.globalAlpha = 0.35 * alphaMult;
                        draw9slice(ctx, r_sbub, [slicex, 35, 2, 2], canvas.width - 39 + xOffset - innerBubbleWidth, cury - 13, innerBubbleWidth + 28, height)
                        ctx.globalAlpha = 1 * alphaMult;
                        draw9slice(ctx, r_bub, [slicex, 35, 2, 2], canvas.width - 39 + xOffset - innerBubbleWidth, cury - 13, innerBubbleWidth + 28, height, item.color)

                        for (let j = 0; j < lines.length; j++) {
                            ctx.fillText(lines[j].trim(), canvas.width - 20 + xOffset - innerBubbleWidth + 14, cury + 20 + ((31) * j), textWidth);

                            // ctx.fillStyle = "#ff0000";
                            // ctx.fillRect(canvas.width - 20 - innerBubbleWidth + 14, cury + 20 + ((31) * j), textWidth, 10);
                        }
                    }

                    break;

                case 'system':
                    ctx.fillStyle = "#dcdcdc"
                    ctx.textAlign = 'center';
                    ctx.globalAlpha = 1 * alphaMult;

                    let shitwidth = width + 32 * 2 > 500 ? 500 : width + 32 * 2;
                    draw9slice(ctx, sybub, [20, 22, 2, 2], (canvas.width - shitwidth) / 2, cury + yOffset, shitwidth, lines.length == 1 ? 55 : 28 + ((29) * (lines.length)), ' #989898')

                    for (let j = 0; j < lines.length; j++) {
                        ctx.fillText(lines[j].trim(), canvas.width / 2, cury + 19 + ((29) * j) + yOffset, canvas.width);
                    }

                    ctx.textAlign = 'left';

                    break;
                case 'indicator':
                    ctx.fillStyle = "#b7b7b7"
                    ctx.textAlign = 'center';
                    ctx.globalAlpha = 1;

                    ctx.font = "13px PB";

                    let longest = 0;
                    for (let j = 0; j < lines.length; j++) {
                        ctx.fillText(lines[j].trim(), canvas.width / 2, cury + ((20) * j));

                        let long = ctx.measureText(lines[j].trim()).width;
                        if (long > longest) {
                            longest = long;
                        }
                    }

                    let lineWidth = Math.abs(13 - (canvas.width - longest) / 2) - 11;

                    ctx.fillRect(13, cury - 5 + ((20 * lines.length) - 1) / 2, lineWidth, 1);
                    ctx.fillRect(canvas.width - lineWidth - 13, cury - 5 + (((20) * lines.length) - 1) / 2, lineWidth, 1);


                    break;

                default:
                    if (item.attachment != null) {
                        if (loadedAttachments[item.attachment] != null) {
                            let attachment = loadedAttachments[item.attachment];
                            let scale = 1.0;
                            const margins = 13 * 2 + 5 * 2;

                            if (attachment.width > 350) {
                                scale = 350 / attachment.width;
                            }

                            ctx.globalAlpha = 0.35 * alphaMult;
                            draw9slice(ctx, sbub, [slicex, 35, 2, 2], curx - 23 - xOffset, cury - 13, (attachment.width * scale) + margins + 4, (attachment.height * scale) + margins)
                            ctx.globalAlpha = 1 * alphaMult;
                            draw9slice(ctx, bub, [slicex, 35, 2, 2], curx - 23 - xOffset, cury - 13, (attachment.width * scale) + margins + 4, (attachment.height * scale) + margins, item.color)

                            attachmentCtx.globalCompositeOperation = 'source-over';
                            attachmentCtx.clearRect(0, 0, attachmentCanvas.width, attachmentCanvas.height);
                            attachmentCanvas.width = attachment.width * scale;
                            attachmentCanvas.height = attachment.height * scale;
                            draw9slice(attachmentCtx, amask, [15, 17, 2, 2], 0, 0, attachmentCanvas.width, attachmentCanvas.height, '#dfdddd');
                            attachmentCtx.globalCompositeOperation = 'source-in';
                            attachmentCtx.drawImage(attachment, 0, 0, attachmentCanvas.width, attachmentCanvas.height)

                            ctx.drawImage(attachmentCanvas, curx - 1 - xOffset, cury + 5);

                            // specials
                            if (item.attachment.trim().toLowerCase().startsWith("/nikke-font-generator")) {
                                switch (item.attachment.split("/").pop().trim().toLowerCase()) {
                                    case "gift_opened_template.png":
                                        ctx.font = "15px PB";
                                        ctx.fillStyle = "#fff";
                                        ctx.textBaseline = "middle";
                                        ctx.textAlign = "center";
                                        ctx.letterSpacing = '0px';

                                        ctx.fillText("Gift claimed.", curx - 1 - xOffset + attachmentCanvas.width / 2, cury + 5 + attachmentCanvas.height / 2 + 77);
                                        break;
                                    case "gift_unopened_template.png":
                                        ctx.font = "15px PB";
                                        ctx.fillStyle = "#fff";
                                        ctx.textBaseline = "middle";
                                        ctx.textAlign = "center";
                                        ctx.letterSpacing = '0px';

                                        const textWidth = ctx.measureText(item.name + " sent a gift.").width;
                                        if (textWidth > 157) {
                                            ctx.font = ((157 - 32) / textWidth * 15) + "px PB";
                                        }

                                        ctx.fillText(item.name + " sent a gift.", curx - 1 - xOffset + attachmentCanvas.width / 2, cury + 5 + attachmentCanvas.height / 2 + 77);
                                        break;
                                    case "pcall_template.png":
                                        ctx.font = "18px PEB";
                                        ctx.fillStyle = "#404040";
                                        ctx.textBaseline = "bottom";
                                        ctx.textAlign = "left";
                                        ctx.letterSpacing = '0px';

                                        ctx.fillText("Voice Call", curx - 1 - xOffset + attachmentCanvas.width * 84 / 240, cury + 5 + attachmentCanvas.height / 2 - 3);

                                        ctx.font = "16px PB";
                                        ctx.fillStyle = "#777";
                                        ctx.textBaseline = "top";
                                        ctx.textAlign = "left";
                                        ctx.letterSpacing = '0px';

                                        ctx.fillText(item.message, curx - 1 - xOffset + attachmentCanvas.width * 84 / 240, cury + 5 + attachmentCanvas.height / 2 + 7);
                                        break;
                                    case "vcall_template.png":
                                        ctx.font = "18px PEB";
                                        ctx.fillStyle = "#404040";
                                        ctx.textBaseline = "bottom";
                                        ctx.textAlign = "left";
                                        ctx.letterSpacing = '0px';

                                        ctx.fillText("Video Call", curx - 1 - xOffset + attachmentCanvas.width * 84 / 240, cury + 5 + attachmentCanvas.height / 2 - 3);

                                        ctx.font = "16px PB";
                                        ctx.fillStyle = "#777";
                                        ctx.textBaseline = "top";
                                        ctx.textAlign = "left";
                                        ctx.letterSpacing = '0px';

                                        ctx.fillText(item.message, curx - 1 - xOffset + attachmentCanvas.width * 84 / 240, cury + 5 + attachmentCanvas.height / 2 + 7);
                                        break;
                                }
                            }

                            height = attachment.height * scale + margins;
                        } else {
                            width = ctx.measureText('<Loading image...>').width;
                            innerBubbleWidth = width + 22 * 2 > 420 ? 420 : width + 22 * 2; // the bubble w/o shadow
                            textWidth = innerBubbleWidth - 22 * 2; // could either be 418 - 22 * 2 or width - 22 * 2

                            ctx.globalAlpha = 0.35 * alphaMult;
                            draw9slice(ctx, sbub, [slicex, 35, 2, 2], curx - 23 - xOffset, cury - 13, innerBubbleWidth + 30, height)
                            ctx.globalAlpha = 1 * alphaMult;
                            draw9slice(ctx, bub, [slicex, 35, 2, 2], curx - 23 - xOffset, cury - 13, innerBubbleWidth + 30, height, item.color)

                            ctx.fillText('<Loading image...>', curx + 16 - xOffset, cury + 20, textWidth);

                            let attachmentImg = new Image();
                            attachmentImg.crossOrigin = "anonymous";
                            attachmentImg.src = item.attachment;
                            attachmentImg.onload = function () {
                                if (loadedAttachments[item.attachment] == null) {
                                    loadedAttachments[item.attachment] = attachmentImg;
                                    generateBlabla();
                                }
                            }
                            attachmentImg.onerror = function () {
                                attachmentImg.src = '/nikke-font-generator/images/blabla/pfp/nochat.png';
                            }
                        }
                    } else {
                        ctx.globalAlpha = 0.35 * alphaMult;
                        draw9slice(ctx, sbub, [slicex, 35, 2, 2], curx - 23 - xOffset, cury - 13, innerBubbleWidth + 30, height)
                        ctx.globalAlpha = 1 * alphaMult;
                        draw9slice(ctx, bub, [slicex, 35, 2, 2], curx - 23 - xOffset, cury - 13, innerBubbleWidth + 30, height, item.color)

                        for (let j = 0; j < lines.length; j++) {
                            ctx.fillText(lines[j].trim(), curx + 16 - xOffset, cury + 20 + ((31) * j), textWidth);
                            // ctx.strokeText(lines[j].trim(), curx + 16 - xOffset, cury + 20 + ((31) * j), textWidth);

                            // ctx.fillStyle = "#ff0000";
                            // ctx.fillRect(curx + 16, cury + 20 + ((31) * j), textWidth, 10);
                        }
                    }

                    if (switchedSpeakers) {
                        ctx.font = "16px PEB";
                        ctx.fillStyle = "#404040";
                        ctx.textBaseline = "bottom";
                        ctx.textAlign = "left";

                        ctx.fillText(item.name, curx + 9 - xOffset, cury - 5);

                        if (loaded[item.image] != null) {
                            let pfpImg = loaded[item.image];
                            let pfpy = cury + height - 7 - 74;
                            pfpCtx.drawImage(pfpMask, 0, 0);
                            pfpCtx.globalCompositeOperation = 'source-in';

                            pfpCtx2.fillStyle = '#ffffff';
                            pfpCtx2.fillRect(0, 0, 74, 74);

                            const imgWidthFinal = (74 / pfpImg.height) * pfpImg.width;
                            const imgHeightFinal = (74 / pfpImg.width) * pfpImg.height;

                            if (pfpImg.height >= pfpImg.width) {
                                pfpCtx2.drawImage(pfpImg, (74 - imgWidthFinal) / 2, 0, imgWidthFinal, 74);
                            } else if (pfpImg.height < pfpImg.width) {
                                pfpCtx2.drawImage(pfpImg, 0, (74 - imgHeightFinal) / 2, 74, imgHeightFinal);
                            }

                            pfpCtx.drawImage(pfpCanvas2, 0, 0);

                            let diff = top.height - pfpy + 19;
                            let cond = (diff > 0 ? diff : 0);

                            ctx.drawImage(pfpCanvas, 0, diff > 0 ? diff : 0, 74, 74 - cond, 107 - 74 - 19 - xOffset, pfpy - 19 + cond, 74, 74 - cond)
                        } else {
                            const ass = item.image;
                            let pfpImg = new Image();
                            pfpImg.crossOrigin = "anonymous";
                            pfpImg.src = ass;
                            pfpImg.onload = function () {
                                if (loaded[ass] == null) {
                                    loaded[ass] = pfpImg;
                                    generateBlabla();
                                }
                            }
                            pfpImg.onerror = function () {
                                pfpImg.src = '/nikke-font-generator/images/blabla/blabla_icon_chat.png';
                                generateBlabla();
                            }
                        }
                    }

                    break;
            }

            cury += height - 26 + gap;

            if (exporting) {
                if (cury > canvas.height) {
                    ypos -= Math.abs(canvas.height - cury) - gap + 24;
                }
            }
        }

        // draw choices
        // someone please help me im fucking dying

        if (document.getElementById("choices").value.trim().length > 0) {
            if (exporting) {
                if (messageBeingAnimated == chats.length) {
                    xOffset = 75 * (1 - easeOutSine(Math.min(curMessageFrames, 10) / 10));
                    yOffset = 10 * (1 - easeOutSine(Math.min(curMessageFrames, 10) / 10));
                    alphaMult = easeOutSine(Math.min(curMessageFrames, 10) / 10);
                } else {
                    xOffset = 75;
                    yOffset = 10;
                    alphaMult = 0;
                }
            } else {
                xOffset = 0;
                yOffset = 0;
                alphaMult = 1;
            }

            let shit = document.getElementById("choices").value.trim().split('\n');
            let maxWidth = 0;
            let bubbleHeight = 0;
            let innerbubcury = cury - 18;
            let choices = [];

            ctx.fillStyle = "#323232";
            ctx.font = "20px PEB";
            ctx.textBaseline = "top";
            ctx.textAlign = "left";

            for (let i = 0; i < shit.length; i++) {
                let width = ctx.measureText(shit[i]).width;
                let actualWidth = width + 41 * 2 > 447 ? 447 : width + 41 * 2;
                let lines = getLinesForParagraphs(ctx, shit[i], actualWidth - 41 * 2);

                if (actualWidth > maxWidth) {
                    maxWidth = actualWidth;
                }

                choices.push({
                    "boxwidth": actualWidth,
                    "boxheight": lines.length * 31 + 22,
                    "lines": lines
                });

                bubbleHeight += lines.length * 31 + 22;
            }

            const bx = canvas.width - 24 - (maxWidth + 30 + 22 * 2) + 13 + xOffset;
            const by = cury - 13;

            ctx.globalAlpha = 0.35 * alphaMult;
            draw9slice(ctx, r_sbub, [37, 35, 2, 2], bx, by, maxWidth + 30 + 22 * 2, bubbleHeight + 7 * (choices.length - 1) + 13 * 4)
            ctx.globalAlpha = 1 * alphaMult;
            draw9slice(ctx, r_bub, [37, 35, 2, 2], bx, by, maxWidth + 30 + 22 * 2, bubbleHeight + 7 * (choices.length - 1) + 13 * 4, document.getElementById("com-color").value)

            for (let i = 0; i < choices.length; i++) {
                let fuck = choices[i];
                let ibx = bx + ((maxWidth + 30 + 22 * 2) - fuck.boxwidth) - 22 - 17;
                let iby = innerbubcury + 26;

                ctx.globalAlpha = 0.5 * alphaMult;
                draw9slice(ctx, s_sybub, [26, 28, 2, 2], ibx - 6, iby - 2, fuck.boxwidth + 12, fuck.boxheight + 12);
                ctx.globalAlpha = 1 * alphaMult;
                draw9slice(ctx, sybub, [20, 22, 2, 2], ibx, iby + 4, fuck.boxwidth, fuck.boxheight, '#ffffff');

                for (let j = 0; j < fuck.lines.length; j++) {
                    ctx.fillText(fuck.lines[j].trim(), ibx + (fuck.boxwidth - ctx.measureText(fuck.lines[j].trim()).width) / 2, iby + 24 + (j * 31), fuck.boxwidth - 41 * 2);
                }

                innerbubcury += fuck.boxheight + 7;
            }

            if (exporting && messageBeingAnimated == chats.length) {
                let add = (bubbleHeight + 7 * (choices.length - 1) + 13 * 2);
                if (cury + add > canvas.height) {
                    ypos -= Math.abs(canvas.height - cury - add) + 24;
                }
            }
        }

        ctx.globalAlpha = 1;

        ctx.drawImage(top, 0, 0);
        ctx.globalAlpha = 0.4;
        ctx.drawImage(shadow, 0, top.height);
        ctx.globalAlpha = 1;

        if (arrowOn) {
            ctx.drawImage(arr, 29, 69);
        }

        if (wifiOn) {
            ctx.drawImage(wifi, 17, 14);
        }

        ctx.font = "28px PEB";
        ctx.textBaseline = "top";
        ctx.textAlign = "left";
        ctx.letterSpacing = '0.5px';

        ctx.fillStyle = "#000000";
        ctx.globalAlpha = 0.25;
        ctx.fillText(chatname, 61, 71);

        ctx.fillStyle = "#ffffff";
        ctx.globalAlpha = 1.0;
        ctx.fillText(chatname, 60, 70);

        // draw thought
        if (thoughtOn && document.getElementById("thought").value.trim().length > 0) {
            draw9slice(ctx, darkener, [16, 16, 32, 32], 0, 0, canvas.width, canvas.height);

            let tailx = 456;
            let taily = 735;

            tailCanvas.width = thoughttail.width;
            tailCanvas.height = thoughttail.height;

            if (document.getElementById("com-color").value != '#ffffff') {
                tailCtx.fillStyle = document.getElementById("com-color").value;
                tailCtx.fillRect(0, 0, tailCanvas.width, tailCanvas.height);
                tailCtx.globalCompositeOperation = "destination-in";
            }

            tailCtx.drawImage(thoughttail, 0, 0);
            tailCtx.globalCompositeOperation = "source-over";

            ctx.drawImage(tailCanvas, tailx, taily);
            tailCtx.clearRect(0, 0, tailCanvas.width, tailCanvas.height);

            ctx.font = "20px PB";
            ctx.textBaseline = "top";
            ctx.textAlign = "left";
            ctx.fillStyle = '#ffffff';
            ctx.letterSpacing = '0px';

            let w = ctx.measureText(document.getElementById("thought").value.trim()).width + 17 * 2;
            let tw = w > 435 ? 435 : w;
            tw += 1;
            let lines = getLinesForParagraphs(ctx, document.getElementById("thought").value.trim(), tw - 17 * 2);
            let th = lines.length * 31 + 17 * 2 + 1;

            draw9slice(ctx, thoughtbubble, [16, 16, 32, 32], tailx + 32 - tw, taily + 9 - th, tw, th, document.getElementById("com-color").value);

            for (let j = 0; j < lines.length; j++) {
                ctx.fillText(lines[j].trim(), tailx + 32 - tw + 17, taily + 15 - th + 17 + 31 * j, tw - 17 * 2);
            }
        }
    } else if (mode == 'chatlist') {
        let curx = 18;
        let cury = 233 + ypos;

        ctx.font = "16px PEB";
        ctx.textBaseline = "top";
        ctx.textAlign = "left";
        ctx.letterSpacing = '0px';

        for (let i = 0; i < chats.length; i++) {
            let item = chats[i];

            if (exporting && messageBeingAnimated == i) {
                yOffset = 10 * (1 - easeOutSine(Math.min(curMessageFrames, 10) / 10));
                alphaMult = easeOutSine(Math.min(curMessageFrames, 10) / 10);
            } else {
                yOffset = 0;
                alphaMult = 1;
            }

            ctx.globalAlpha = alphaMult;

            ctx.drawImage(blabla_chatbox, curx - 13, cury - 13 + yOffset);
            ctx.drawImage(nikkelogo_c, curx + 125, cury + 20 + yOffset);

            ctx.font = "18px PEB";
            ctx.fillText(item.name, curx + 139, cury + 19 + yOffset);
            ctx.font = "18px PR";
            ctx.fillText(item.message, curx + 123, cury + 50 + yOffset);

            if (loaded[item.image] != null) {
                let pfpImg = loaded[item.image];
                let pfpy = cury + yOffset;

                chatterCtx.drawImage(chatter_mask, 0, 0);
                chatterCtx.globalCompositeOperation = 'source-in';

                chatterCtx2.drawImage(chatterbg, 0, 0);
                chatterCtx2.drawImage(pfpImg, -7, -13, 120, 120);

                chatterCtx.drawImage(chatterCanvas2, 0, 0);

                let diff = 233 - pfpy;
                let cond = (diff > 0 ? diff : 0);

                ctx.drawImage(chatterCanvas, 0, cond, chatterCanvas.width, chatterCanvas.height - cond, 18, pfpy + cond, chatterCanvas.width, chatterCanvas.height - cond);
            } else {
                const ass = item.image;
                let pfpImg = new Image();
                pfpImg.crossOrigin = "anonymous";
                pfpImg.src = ass;
                pfpImg.onload = function () {
                    if (loaded[ass] == null) {
                        loaded[ass] = pfpImg;
                        generateBlabla();
                    }
                }
                pfpImg.onerror = function () {
                    pfpImg.src = '/nikke-font-generator/images/blabla/blabla_icon.png';
                }
            }

            cury += 90;
        }

        ctx.globalAlpha = 1;

        ctx.drawImage(top2, 0, 0);

        if (wifiOn) {
            ctx.drawImage(wifi, 17, 14);
        }

        ctx.font = "16px PEB";
        ctx.textBaseline = "top";
        ctx.textAlign = "left";
        ctx.letterSpacing = '0px';

        ctx.fillStyle = '#f2f2f2';
        ctx.fillRect(0, top2.height, canvas.width, 64)

        ctx.fillStyle = "#333333";
        ctx.fillText(`Chats: (${chats.length})`, 18, 195);

        ctx.globalAlpha = 0.4;

        ctx.drawImage(shadow, 0, top2.height);
        ctx.globalAlpha = 1;

        ctx.drawImage(blabla_logo, 169, 48);

        let divided = canvas.width / 3;

        ctx.font = "20px PB";
        ctx.fillStyle = "#ffffff";

        ctx.globalAlpha = nikkepage == 0 ? 1 : 0.8;
        ctx.drawImage(mission_logo, 43, 129, 24, 24);
        ctx.fillText('Mission', 73, 133);

        ctx.globalAlpha = nikkepage == 1 ? 1 : 0.8;
        ctx.drawImage(nikke_logo, 233, 129, 24, 24);
        ctx.fillText('Nikke', 263, 133);

        ctx.globalAlpha = nikkepage == 2 ? 1 : 0.8;
        ctx.drawImage(group_logo, 409, 129, 24, 24);
        ctx.fillText('Group', 439, 133);

        ctx.globalAlpha = 1;
        ctx.drawImage(indicator, divided * nikkepage + (divided - indicator.width) / 2, top2.height - indicator.height);
    }

    if (mode !== "profile") {
        ctx.font = "15px SB";
        ctx.textBaseline = "top";
        ctx.textAlign = "left";
        ctx.letterSpacing = '0px';
        ctx.fillStyle = '#ffffff';
        ctx.fillText(document.getElementById('chattime').value, 42, 14);
    }
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

document.getElementById("add").onclick = addChat;

function addChat(e) {
    chats.push({
        'name': document.getElementById("charname").value,
        'image': noname.includes(document.getElementById("charname").value.toLowerCase()) ? '' : currentImage,
        'message': document.getElementById("chatter").value,
        'color': document.getElementById("color").value
    });

    generateBlabla();
}

document.getElementById("set-gifto").onclick = () => {
    if (mode == 'conversation') {
        chats.push({
            name: document.getElementById("charname").value,
            image: noname.includes(document.getElementById("charname").value.toLowerCase()) ? '' : currentImage,
            attachment: "/nikke-font-generator/images/blabla/gift_opened_template" + (document.getElementById("charname").value.toLowerCase().trim() === "commander" ? "_cmd" : "") + ".png",
            color: document.getElementById("color").value,
            message: ''
        })
    }

    generateBlabla();
}

document.getElementById("set-giftu").onclick = () => {
    if (mode == 'conversation') {
        chats.push({
            name: document.getElementById("charname").value,
            image: noname.includes(document.getElementById("charname").value.toLowerCase()) ? '' : currentImage,
            attachment: "/nikke-font-generator/images/blabla/gift_unopened_template" + (document.getElementById("charname").value.toLowerCase().trim() === "commander" ? "_cmd" : "") + ".png",
            color: document.getElementById("color").value,
            message: ''
        })
    }

    generateBlabla();
}

document.getElementById("set-voicecall").onclick = () => {
    if (mode == 'conversation') {
        chats.push({
            name: document.getElementById("charname").value,
            image: noname.includes(document.getElementById("charname").value.toLowerCase()) ? '' : currentImage,
            attachment: "/nikke-font-generator/images/blabla/pcall_template" + (document.getElementById("charname").value.toLowerCase().trim() === "commander" ? "_cmd" : "") + ".png",
            color: document.getElementById("color").value,
            message: document.getElementById("voicecall-text").value
        })
    }

    generateBlabla();
}

document.getElementById("set-videocall").onclick = () => {
    if (mode == 'conversation') {
        chats.push({
            name: document.getElementById("charname").value,
            image: noname.includes(document.getElementById("charname").value.toLowerCase()) ? '' : currentImage,
            attachment: "/nikke-font-generator/images/blabla/vcall_template" + (document.getElementById("charname").value.toLowerCase().trim() === "commander" ? "_cmd" : "") + ".png",
            color: document.getElementById("color").value,
            message: document.getElementById("videocall-text").value
        })
    }

    generateBlabla();
}

document.getElementById("attachment-up").onchange = (e) => {
    const fileList = document.querySelectorAll('#attachment-up')[0].files;
    const filer = new FileReader();
    filer.onload = (e) => {
        if (mode == 'conversation') {
            chats.push({
                name: document.getElementById("charname").value,
                image: noname.includes(document.getElementById("charname").value.toLowerCase()) ? '' : currentImage,
                attachment: e.target.result.toString(),
                color: document.getElementById("color").value,
                message: ''
            })
        }

        document.getElementById('attachment-up').value = "";
        generateBlabla();
    };
    if (fileList.length > 0) {
        filer.readAsDataURL(fileList[0]);
    }
}

document.getElementById("attachment-edit").onchange = (e) => {
    const fileList = document.querySelectorAll('#attachment-edit')[0].files;
    const filer = new FileReader();
    filer.onload = (e) => {
        chats[parseInt(document.getElementById("message-index-edit").value)].attachment = e.target.result.toString();
        generateBlabla();
    };
    if (fileList.length > 0) {
        filer.readAsDataURL(fileList[0]);
    }
}

document.getElementById("background-edit-p").onchange = (e) => {
    const fileList = document.querySelectorAll('#background-edit-p')[0].files;
    const filer = new FileReader();
    filer.onload = (e) => {
        profile.bg = e.target.result.toString();
        generateBlabla();
    };
    if (fileList.length > 0) {
        filer.readAsDataURL(fileList[0]);
    }
}

document.getElementById("attachment-remove").onclick = (e) => {
    chats[parseInt(document.getElementById("message-index-edit").value)].attachment = null;
    generateBlabla();
}

document.getElementById("background-remove-p").onclick = (e) => {
    profile.bg = null;
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
    document.getElementById("arrow-toggle").innerHTML = "Exit Arrow: " + (arrowOn ? "Shown" : "Hidden");
    generateBlabla();
}

document.getElementById("set-oth").onclick = (e) => {
    document.getElementById("charname").value = prevChat;
    document.getElementById("color").value = '#ffffff';
}

let prevChat = ''
document.getElementById("set-com").onclick = (e) => {
    if (document.getElementById("charname").value.toLowerCase() != 'commander') {
        prevChat = document.getElementById("charname").value;
    }

    document.getElementById("charname").value = 'Commander';
    document.getElementById("color").value = document.getElementById("com-color").value;
}

document.getElementById("set-system").onclick = (e) => {
    if (document.getElementById("charname").value.toLowerCase() != 'commander') {
        prevChat = document.getElementById("charname").value;
    }

    document.getElementById("charname").value = 'System';
    document.getElementById("color").value = '#ffffff';
}

document.getElementById("set-indicator").onclick = (e) => {
    if (document.getElementById("charname").value.toLowerCase() != 'commander') {
        prevChat = document.getElementById("charname").value;
    }

    document.getElementById("charname").value = 'Indicator';
    document.getElementById("color").value = '#ffffff';
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
    chats[parseInt(document.getElementById("message-index-edit").value)].name = document.getElementById("charname-edit").value;
    generateBlabla();
}

document.getElementById("chatter-edit").oninput = (e) => {
    chats[parseInt(document.getElementById("message-index-edit").value)].message = document.getElementById("chatter-edit").value;
    generateBlabla();
}

document.getElementById("charname-edit-p").oninput = (e) => {
    profile.name = document.getElementById("charname-edit-p").value;
    generateBlabla();
}

document.getElementById("chatter-edit-p").oninput = (e) => {
    profile.message = document.getElementById("chatter-edit-p").value;
    generateBlabla();
}

let chatname = 'Counters'
document.getElementById("chatname").oninput = (e) => {
    chatname = document.getElementById("chatname").value
    generateBlabla();
}

document.getElementById("chattime").oninput = (e) => {
    generateBlabla();
}

document.getElementById("choices").oninput = (e) => {
    generateBlabla();
}

document.getElementById("thought").oninput = (e) => {
    generateBlabla();
}

document.getElementById("scalebg").oninput = (e) => {
    generateBlabla();
}

document.getElementById("xposbg").oninput = (e) => {
    generateBlabla();
}

document.getElementById("yposbg").oninput = (e) => {
    generateBlabla();
}

let wifiOn = true;
document.getElementById("wifi-toggle").onclick = (e) => {
    wifiOn = !wifiOn;
    document.getElementById("wifi-toggle").innerHTML = "WIFI Icon: " + (wifiOn ? "Shown" : "Hidden");
    generateBlabla();
}

let thoughtOn = true;
document.getElementById("thought-toggle").onclick = (e) => {
    thoughtOn = !thoughtOn;
    document.getElementById("thought-toggle").innerHTML = thoughtOn ? eyeOn : eyeOff;
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
                if (document.getElementById("char-pres-up").value.startsWith("rapture")) {
                    currentImage = `https://nkas.pages.dev/monsters/${nikkepfps[results[0].target]}.png`;
                } else {
                    if (nikkepfps[results[0].target].endsWith("_NIKKEDB")) {
                        currentImage = `https://nikke-db-legacy.pages.dev/images/sprite/${nikkepfps[results[0].target].replace("_NIKKEDB", "")}.png`;
                    } else {
                        currentImage = `https://nkas.pages.dev/characters/${nikkepfps[results[0].target]}.png`;
                    }
                }
                document.getElementById("pfp-preview").src = currentImage;
            } else {
                document.getElementById("pfp-preview").src = `/nikke-font-generator/images/blabla/pfp/nochat.png`;
            }
        } else {
            document.getElementById("pfp-preview").src = `/nikke-font-generator/images/blabla/pfp/nochat.png`;
        }
    }
}

document.getElementById("char-pres-edit").oninput = (e) => {
    if (Object.keys(nikkepfps).length > 0 && chats[parseInt(document.getElementById("message-index-edit").value)] != null) {
        if (document.getElementById("char-pres-edit").value.trim().length > 0) {
            const results = fuzzysort.go(document.getElementById("char-pres-edit").value, Object.keys(nikkepfps));
            if (results.length > 0) {
                if (document.getElementById("char-pres-edit").value.startsWith("rapture")) {
                    chats[parseInt(document.getElementById("message-index-edit").value)].image = `https://nkas.pages.dev/monsters/${nikkepfps[results[0].target]}.png`;
                } else {
                    if (nikkepfps[results[0].target].endsWith("_NIKKEDB")) {
                        chats[parseInt(document.getElementById("message-index-edit").value)].image = `https://nikke-db-legacy.pages.dev/images/sprite/${nikkepfps[results[0].target].replace("_NIKKEDB", "")}.png`;
                    } else {
                        chats[parseInt(document.getElementById("message-index-edit").value)].image = `https://nkas.pages.dev/characters/${nikkepfps[results[0].target]}.png`;
                    }
                }

                let fuck = chats[parseInt(document.getElementById("message-index-edit").value)].image;
                document.getElementById("pfp-preview-edit").src = fuck;
            } else {
                document.getElementById("pfp-preview-edit").src = '/nikke-font-generator/images/blabla/pfp/nochat.png';
            }
        } else {
            document.getElementById("pfp-preview-edit").src = '/nikke-font-generator/images/blabla/pfp/nochat.png';
        }

        generateBlabla();
    }
}

document.getElementById("char-pres-edit-p").oninput = (e) => {
    if (Object.keys(nikkepfps).length > 0) {
        if (document.getElementById("char-pres-edit-p").value.trim().length > 0) {
            const results = fuzzysort.go(document.getElementById("char-pres-edit-p").value, Object.keys(nikkepfps));
            if (results.length > 0) {
                if (document.getElementById("char-pres-edit-p").value.startsWith("rapture")) {
                    profile.image = `https://nkas.pages.dev/monsters/${nikkepfps[results[0].target]}.png`;
                }
                else {
                    if (nikkepfps[results[0].target].endsWith("_NIKKEDB")) {
                        profile.image = `https://nikke-db-legacy.pages.dev/images/sprite/${nikkepfps[results[0].target].replace("_NIKKEDB", "")}.png`;
                    } else {
                        profile.image = `https://nkas.pages.dev/characters/${nikkepfps[results[0].target]}.png`;
                    }
                }
                let fuck = profile.image;
                document.getElementById("pfp-preview-edit-p").src = fuck;
            } else {
                document.getElementById("pfp-preview-edit-p").src = '/nikke-font-generator/images/blabla/pfp/nochat.png';
            }
        } else {
            document.getElementById("pfp-preview-edit-p").src = '/nikke-font-generator/images/blabla/pfp/nochat.png';
        }

        generateBlabla();
    }
}

let ypos = 0;
document.getElementById("ypos").oninput = (e) => {
    ypos = parseFloat(document.getElementById("ypos").value);
    generateBlabla();
}

document.getElementById("color-edit").onchange = (e) => {
    chats[parseInt(document.getElementById("message-index-edit").value)].color = document.getElementById("color-edit").value
    generateBlabla();
}

let dragOn = false;
document.getElementById("drag-toggle").onclick = (e) => {
    dragOn = !dragOn;
    document.getElementById("drag-toggle").innerHTML = "Scroll: " + (dragOn ? "ON" : "OFF");
    generateBlabla();
}

let mousecapture = [0, 0];
let previous = [0, 0];
let dragging = false;

document.querySelectorAll('canvas#blabla-canvas')[0].addEventListener('pointerdown', (e) => {
    if (dragging) return;
    dragging = true;

    if (dragOn) {
        previous[0] = 0;
        previous[1] = ypos;
    }

    mousecapture[0] = e.clientX;
    mousecapture[1] = e.clientY;

    if (dragOn) {
        disableScroll();
    }
});

document.querySelectorAll('canvas#blabla-canvas')[0].addEventListener('pointermove', (e) => {
    if (!dragging) return;

    if (dragOn) {
        ypos = e.clientY + (previous[1] - mousecapture[1]);
        document.getElementById("ypos").value = ypos;
    }

    generateBlabla();
});

document.querySelectorAll('canvas#blabla-canvas')[0].addEventListener('pointerup', (e) => {
    if (!dragging) return;
    dragging = false;

    enableScroll();
});

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

document.getElementById("char-img-edit-p").onchange = (e) => {
    const fileList = document.querySelectorAll('#char-img-edit-p')[0].files;
    const filer = new FileReader();
    filer.onload = (e) => {
        profile.image = e.target.result.toString();
        document.getElementById('pfp-preview-edit-p').src = e.target.result.toString();
        generateBlabla();
    };
    if (fileList.length > 0) {
        filer.readAsDataURL(fileList[0]);
    }
}

document.getElementById("blabla-canvas").onclick = downloadPng;
document.getElementById("export-png").onclick = downloadPng;

function downloadPng() {
    if (dragOn) return;

    var link = document.createElement('a');
    var canvas = document.getElementById('blabla-canvas')
    link.download = 'nikke-blabla.png';
    link.href = canvas.toDataURL();
    link.click();
    link.remove();
}

document.getElementById("set-chats").onclick = () => {
    mode = 'chatlist';

    document.getElementById("blabla-tool-conversation").style.display = "none";
    document.getElementById("blabla-tool-chatlist").style.display = "flex";
    document.getElementById("blabla-tool-profile").style.display = "none";

    document.getElementById("set-convo").style.fontWeight = "normal";
    document.getElementById("set-chats").style.fontWeight = "bold";
    document.getElementById("set-profile").style.fontWeight = "normal";

    generateBlabla();
}

document.getElementById("set-convo").onclick = () => {
    mode = 'conversation'

    document.getElementById("blabla-tool-conversation").style.display = "flex";
    document.getElementById("blabla-tool-chatlist").style.display = "none";
    document.getElementById("blabla-tool-profile").style.display = "none";

    document.getElementById("set-convo").style.fontWeight = "bold";
    document.getElementById("set-chats").style.fontWeight = "normal";
    document.getElementById("set-profile").style.fontWeight = "normal";

    generateBlabla();
}

document.getElementById("set-profile").onclick = () => {
    mode = 'profile';

    document.getElementById("blabla-tool-conversation").style.display = "none";
    document.getElementById("blabla-tool-chatlist").style.display = "none";
    document.getElementById("blabla-tool-profile").style.display = "flex";

    document.getElementById("set-convo").style.fontWeight = "normal";
    document.getElementById("set-chats").style.fontWeight = "normal";
    document.getElementById("set-profile").style.fontWeight = "bold";

    generateBlabla();
}

let nikkepage = 1;

document.getElementById("mission-page").onclick = () => {
    document.getElementById("mission-page").style.fontWeight = 'normal';
    document.getElementById("nikke-page").style.fontWeight = 'normal';
    document.getElementById("group-page").style.fontWeight = 'normal';

    document.getElementById("mission-page").style.fontWeight = 'bold';
    nikkepage = 0;

    generateBlabla();
}

document.getElementById("nikke-page").onclick = () => {
    document.getElementById("mission-page").style.fontWeight = 'normal';
    document.getElementById("nikke-page").style.fontWeight = 'normal';
    document.getElementById("group-page").style.fontWeight = 'normal';

    document.getElementById("nikke-page").style.fontWeight = 'bold';
    nikkepage = 1;

    generateBlabla();
}

document.getElementById("group-page").onclick = () => {
    document.getElementById("mission-page").style.fontWeight = 'normal';
    document.getElementById("nikke-page").style.fontWeight = 'normal';
    document.getElementById("group-page").style.fontWeight = 'normal';

    document.getElementById("group-page").style.fontWeight = 'bold';
    nikkepage = 2;

    generateBlabla();
}

let gridOn = false;
document.getElementById("grid-toggle").onclick = () => {
    gridOn = !gridOn;

    document.getElementById("grid-toggle").innerHTML = "Grid Background: " + (gridOn ? "Shown" : "Hidden");

    generateBlabla();
}

document.getElementById("chat-json-up").onchange = (e) => {
    const fileList = document.getElementById("chat-json-up").files;
    const filer = new FileReader();
    filer.onload = (e) => {
        const json = JSON.parse(e.target.result.toString());

        chats = json.chats;
        chatname = json.chatname;
        ypos = 0;
        document.getElementById("ypos").value = ypos;
        document.getElementById('chattime').value = json.chattime;

        if (json.choices != null) {
            document.getElementById("choices").value = json.choices.trim();
        }

        generateBlabla();
    };
    if (fileList.length > 0) {
        filer.readAsText(fileList[0]);
    }
};
document.getElementById("export").onclick = exportChat;

document.getElementById("export-mp4").onclick = downloadVideo;

document.getElementById("com-color").onchange = () => {
    generateBlabla();
}

document.onkeydown = function (e) {
    if (e.ctrlKey) {
        switch (e.key.toLowerCase()) {
            case 'e':
                e.preventDefault();
                exportChat();
                break;
            case 'enter':
                e.preventDefault();
                addChat();
                break;
            case 'backspace':
                e.preventDefault();
                chats.pop();
                generateBlabla();
                break;
            default:
                break;
        }
    }
};

function disableScroll() {
    if (!dragOn) return;
    let scrollTop = window.scrollY || document.documentElement.scrollTop;
    let scrollLeft = window.scrollX || document.documentElement.scrollLeft;

    window.onscroll = function (e) {
        window.scrollTo(scrollLeft, scrollTop, "instant");
    };

    window.onwheel = (e) => {
        ypos += (e.deltaY / -10) * 5;
        document.getElementById("ypos").value = ypos;
        generateBlabla();
    }
}

function enableScroll() {
    if (!dragOn) return;
    window.onscroll = function () { };
    window.onwheel = (e) => { }
}

canvas.onpointerenter = disableScroll;
canvas.onpointerleave = enableScroll;

function exportChat() {
    let item = {
        "chats": chats,
        "chatname": chatname,
        "chattime": document.getElementById('chattime').value,
        "choices": document.getElementById("choices").value.trim()
    }
    const link = document.createElement("a");
    const file = new Blob([JSON.stringify(item, null, "\t")], { type: 'application/json' });
    link.href = URL.createObjectURL(file);
    link.download = "chats.json";
    link.click();

    URL.revokeObjectURL(link.href);
}

let messageBeingAnimated = 0;

function downloadVideo() {
    let defaultYpos = ypos;
    ypos = 0;
    generateBlabla();

    if (exporting) return;
    exporting = true;

    let defaultThought = thoughtOn;
    thoughtOn = false;

    HME.createH264MP4Encoder().then((encoder) => {

        encoder.width = canvas.width % 2 == 0 ? canvas.width : canvas.width + 1;
        encoder.height = canvas.height % 2 == 0 ? canvas.height : canvas.height + 1;
        encoder.quantizationParameter = 15;
        encoder.frameRate = 30;
        encoder.initialize();

        let maxChats = chats.length;
        let copy = chats.map((x) => x);
        chats = [];

        for (let i = 0; i < copy.length; i++) {
            let item = copy[i];
            resetAnimatables();

            messageBeingAnimated = i;

            chats[i] = item;
            messageMaxFrames = Math.round(10 + (0.05 * item.message.length) * 30);

            if (mode == "conversation") {
                if (item.attachment != null) {
                    messageMaxFrames = 20;
                }
            } else {
                messageMaxFrames = 10;
            }

            while (curMessageFrames < messageMaxFrames) {
                generateBlabla();
                encoder.addFrameRgba(ctx.getImageData(0, 0, canvas.width, canvas.height).data);
                curMessageFrames++;

                document.title = "Exporting: " + chats.length + "/" + maxChats + " (" + (curMessageFrames / messageMaxFrames * 100).toFixed(2) + "%)";
            }
        }

        if (document.getElementById("choices").value.trim().length > 0) {
            messageBeingAnimated = chats.length;
            resetAnimatables();
            messageMaxFrames = 30;

            while (curMessageFrames < messageMaxFrames) {
                generateBlabla();
                encoder.addFrameRgba(ctx.getImageData(0, 0, canvas.width, canvas.height).data);
                curMessageFrames++;

                document.title = "Exporting choices..." + " (" + (curMessageFrames / messageMaxFrames * 100).toFixed(2) + "%)";
            }
        }

        if (defaultThought && document.getElementById("thought").value.trim().length > 0) {
            thoughtOn = defaultThought;

            messageBeingAnimated = chats.length + 1;

            resetAnimatables();
            messageMaxFrames = Math.round(10 + (0.05 * document.getElementById("thought").value.trim().length) * 30);

            while (curMessageFrames < messageMaxFrames) {
                generateBlabla();
                encoder.addFrameRgba(ctx.getImageData(0, 0, canvas.width, canvas.height).data);
                curMessageFrames++;

                document.title = "Exporting thoughts..." + " (" + (curMessageFrames / messageMaxFrames * 100).toFixed(2) + "%)";
            }
        }

        encoder.finalize();

        let output = encoder.FS.readFile(encoder.outputFilename);
        let b64 = Buffer.from(output).toString('base64');

        var link = document.createElement('a');
        link.download = 'nikke-blabla.mp4';
        link.href = "data:video/mp4;base64," + b64;
        link.click();

        encoder.delete();

        resetAnimatables();
        exporting = false;
        document.title = "Barely Accurate NIKKE Blabla Generator";
        ypos = defaultYpos;
        generateBlabla();
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

function getLines(ctx, text, maxWidth) {
    const sep = text.includes(" ") ? " " : "";
    var words = text.split(sep);
    var lines = [];
    var currentLine = words[0];

    if (text.length <= 0) {
        return [''];
    }

    for (var i = 1; i < words.length; i++) {
        var word = words[i];
        var width = ctx.measureText(currentLine + sep + word).width;
        if (width <= maxWidth) {
            currentLine += sep + word;
        } else {
            lines.push(currentLine);
            currentLine = word;
        }
    }
    lines.push(currentLine);
    return lines;
}

document.promptText = "You might have changes in the current BlaBla. Save your BlaBla by clicking \"Export JSON\", and import it after the page refreshes!";
