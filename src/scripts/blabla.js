import { draw9slice } from "./util.js";
import fuzzysort from "fuzzysort";
import { wifiOffI, wifiOnI } from "./util.js";

const canvas = document.getElementById("blabla-canvas");
const ctx = canvas.getContext("2d", { willReadFrequently: true });

const myFont = new FontFace('PEB', "url('/nikke-font-generator/fonts/Pretendard-ExtraBold.ttf')");
await myFont.load();
document.fonts.add(myFont);

const myFont2 = new FontFace('PB', "url('/nikke-font-generator/fonts/Pretendard-Bold.ttf')");
await myFont2.load();
document.fonts.add(myFont2);

const myFont3 = new FontFace('PR', "url('/nikke-font-generator/fonts/Pretendard-Regular.ttf')");
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

var chatmode = false;
var userHistory = {};

let nikkepfps = {}
const response = await fetch('https://api.dotgg.gg/nikke/characters/');
response.json().then((e) => {
    for (let i = 0; i < e.length; i++) {
        nikkepfps[e[i].name.toLowerCase()] = e[i].img;
    }

    nikkepfps['male generic'] = 'si_c911_00_s';
    nikkepfps['female generic'] = 'si_c912_00_s';

    nikkepfps['male commander'] = 'si_c916_00_s';
    nikkepfps['female commander'] = 'si_c917_00_s';

    nikkepfps['andersen'] = 'si_c903_00_s';
    nikkepfps['andersen: soaky shower'] = 'si_c903_01_00_s';
    nikkepfps['shifty'] = 'si_c907_00_s';
    nikkepfps['shifty: old'] = 'si_c907_01_00_s';
    nikkepfps['ingrid'] = 'si_c900_00_s';
    nikkepfps['syuen'] = 'si_c901_00_s';
    nikkepfps['mustang'] = 'si_c902_00_s';

    nikkepfps['einkk'] = 'si_c928_00_s';
    nikkepfps['enikk'] = 'si_c904_00_s';

    nikkepfps['burningum'] = 'si_c914_00_s';
    nikkepfps['cecil'] = 'si_c929_00_s';
    nikkepfps['doban'] = 'si_c939_00_s';
    nikkepfps['e.h.'] = 'si_c940_00_s';
    nikkepfps['johan'] = 'si_c925_00_s';
    nikkepfps['legendary commander'] = 'si_c942_00_s';

    nikkepfps['ade'] = 'si_c310_00_s';
    nikkepfps['anachiro'] = 'si_c944_00_s';
    nikkepfps['cinderella'] = 'si_c944_00_s';
    nikkepfps['ein'] = 'si_c391_00_s';
    nikkepfps['indivilia'] = 'si_c263_00_s';
    nikkepfps['k'] = 'si_c041_00_s';
    nikkepfps['leona'] = 'si_c382_00_s';
    nikkepfps['liberalio'] = 'si_c262_00_s';
    nikkepfps['liliweiss'] = 'si_c943_00_s';
    nikkepfps['mana'] = 'si_c290_00_s';
    nikkepfps['moran'] = 'si_c281_00_s';
    nikkepfps['papillion'] = 'si_c908_00_s';
    nikkepfps['pinne'] = 'si_c941_00_s';
    nikkepfps['rian'] = 'si_c905_00_s';
    nikkepfps['rouge'] = 'si_c272_00_s';
    nikkepfps['rumani'] = 'si_c240_00_s';
    nikkepfps['zwei'] = 'si_c390_00_s';

    nikkepfps['boss: blacksmith'] = 'si_bbg003_00_s';
    nikkepfps['boss: gravedigger'] = 'si_mbg002_00_s';
    nikkepfps['boss: alteisen'] = 'si_mbg001_00_s';
    nikkepfps['boss: chatterbox'] = 'si_bbg002_00_s';
    nikkepfps['boss: land eater'] = 'si_ebg001_00_s';
    nikkepfps['boss: modernia'] = 'si_mbg004_00_s';
    nikkepfps['boss: mother whale'] = 'si_bba001_00_s';
    nikkepfps['boss: harvester'] = 'si_bbg001_00_s';
    nikkepfps['boss: material h'] = 'si_ebg002_00_s';
    nikkepfps['boss: storm bringer'] = 'si_eba001_00_s';
    nikkepfps['boss: nihilister'] = 'si_mba002_00_s';
    nikkepfps['boss: gatekeeper red'] = 'si_eba003_hsta_00_s';
    nikkepfps['boss: gatekeeper green'] = 'si_eba003_green_00_s';
    nikkepfps['boss: gatekeeper blue'] = 'si_eba003_00_s.png';
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

let chatterCanvas = document.createElement('canvas');
let chatterCtx = chatterCanvas.getContext('2d');
chatterCtx.width = 111;
chatterCtx.height = 84;

let chatterCanvas2 = document.createElement('canvas');
let chatterCtx2 = chatterCanvas2.getContext('2d');
chatterCtx2.width = 111;
chatterCtx2.height = 84;

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

    if (!chatmode) {
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
                    // cury += 5;
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

            let width = ctx.measureText(item.message).width;
            let actualWidth = width + 22 * 2 > 418 ? 418 : width + 22 * 2;
            let textWidth = actualWidth - 22 * 2;
            let lines = getLinesForParagraphs(ctx, item.message, textWidth);
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
                        ctx.fillText(lines[j].trim(), curx - 6 + 21, cury + 19 + ((31) * j), textWidth);
                    }
                } else {
                    ctx.fillText(item.message.trim(), curx - 6 + 21, cury + 19, textWidth);
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

                        let diff = top.height - pfpy + 19;
                        let cond = (diff > 0 ? diff : 0);

                        ctx.drawImage(pfpCanvas, 0, diff > 0 ? diff : 0, 74, 74 - cond, 107 - 74 - 19, pfpy - 19 + cond, 74, 74 - cond)
                    }
                    pfpImg.onerror = function() {
                        pfpImg.src = '/nikke-font-generator/images/blabla/blabla_icon_chat.png';
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
                        ctx.fillText(lines[j].trim(), curx - actualWidth + 17, cury + 14 + ((31) * j), textWidth);
                    }
                } else {
                    ctx.fillText(item.message.trim(), curx - actualWidth + 17, cury + 14, textWidth);
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

        ctx.font = "28px PB";
        ctx.textBaseline = "top";
        ctx.textAlign = "left";
        ctx.letterSpacing = '0.5px';

        ctx.fillStyle = "#000000";
        ctx.globalAlpha = 0.25;
        ctx.fillText(chatname, 61, 71);

        ctx.fillStyle = "#ffffff";
        ctx.globalAlpha = 1.0;
        ctx.fillText(chatname, 60, 70);
    } else {
        let curx = 18;
        let cury = 233 + parseFloat(document.getElementById("ypos").value);

        ctx.font = "16px PEB";
        ctx.textBaseline = "top";
        ctx.textAlign = "left";
        ctx.letterSpacing = '0px';

        for (let i = 0; i < chats.length; i++) {
            let item = chats[i];

            ctx.drawImage(blabla_chatbox, curx - 13, cury - 13);
            ctx.drawImage(nikkelogo_c, curx + 125, cury + 20);

            ctx.font = "18px PEB";
            ctx.fillText(item.name, curx + 139, cury + 19);
            ctx.font = "18px PR";
            ctx.fillText(item.message, curx + 123, cury + 50);

            let pfpImg = new Image();
            pfpImg.crossOrigin = "anonymous";
            pfpImg.src = item.image;
            let pfpy = cury;
            pfpImg.onload = function() {
                chatterCtx.drawImage(chatter_mask, 0, 0);
                chatterCtx.globalCompositeOperation = 'source-in';

                chatterCtx2.drawImage(chatterbg, 0, 0);
                chatterCtx2.drawImage(pfpImg, -7, -13, 120, 120);

                chatterCtx.drawImage(chatterCanvas2, 0, 0);

                let diff = 233 - pfpy;
                let cond = (diff > 0 ? diff : 0);

                // ctx.drawImage(pfpCanvas, 0, diff > 0 ? diff : 0, 74, 74 - cond, 107 - 74 - 19, pfpy - 19 + cond, 74, 74 - cond)
                ctx.drawImage(chatterCanvas, 0, cond, chatterCanvas.width, chatterCanvas.height - cond, 18, pfpy + cond, chatterCanvas.width, chatterCanvas.height - cond);
            }
            pfpImg.onerror = function() {
                pfpImg.src = '/nikke-font-generator/images/blabla/blabla_icon.png';
            }

            cury += 90;
        }

        ctx.drawImage(top2, 0, 0);

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

    if (wifiOn) {
        ctx.drawImage(wifi, 17, 14);
    }

    ctx.font = "15px SB";
    ctx.textBaseline = "top";
    ctx.textAlign = "left";
    ctx.letterSpacing = '0px';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(document.getElementById('chattime').value, 42, 14);
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

document.getElementById("chattime").oninput = (e) => {
    generateBlabla();
}

let wifiOn = true;
document.getElementById("wifi-toggle").onclick = (e) => {
    wifiOn = !wifiOn;
    document.getElementById("wifi-toggle").innerHTML = wifiOn ? wifiOnI : wifiOffI;
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
    if (Object.keys(nikkepfps).length > 0 && chats[parseInt(document.getElementById("message-index-edit").value)] != null) {
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

document.getElementById("set-chats").onclick = () => {
    chatmode = true;
    document.getElementById("set-chats").style.fontWeight = 'bold';
    document.getElementById("set-convo").style.fontWeight = 'normal';

    document.getElementById('charname').setAttribute('placeholder', 'Conversation name...');
    document.getElementById('chatter').setAttribute('placeholder', 'What the conversation stopped on...');
    document.getElementById('charname-edit').setAttribute('placeholder', 'Conversation name...');
    document.getElementById('chatter-edit').setAttribute('placeholder', 'What the conversation stopped on...');

    document.getElementById('chats-page-tabs').style.display = 'table-row';
    document.getElementById('convo-page-shit').style.display = 'none';

    generateBlabla();
}

document.getElementById("set-convo").onclick = () => {
    chatmode = false;
    document.getElementById("set-chats").style.fontWeight = 'normal';
    document.getElementById("set-convo").style.fontWeight = 'bold';

    document.getElementById('charname').setAttribute('placeholder', 'Character name...');
    document.getElementById('chatter').setAttribute('placeholder', 'What the character will be saying...');
    document.getElementById('charname-edit').setAttribute('placeholder', 'Character name...');
    document.getElementById('chatter-edit').setAttribute('placeholder', 'What the character will be saying...');

    document.getElementById('chats-page-tabs').style.display = 'none';
    document.getElementById('convo-page-shit').style.display = 'table-row';

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
        if (width <= maxWidth) {
            currentLine += " " + word;
        } else {
            lines.push(currentLine);
            currentLine = word;
        }
    }
    lines.push(currentLine);
    return lines;
}