export function draw9slice(ctx, img2, squareslice, x, y, w, h, color = "#ffffff") {
    const canvasTemp = document.createElement("canvas");
    const ctxTemp = canvasTemp.getContext("2d");

    canvasTemp.width = img2.width;
    canvasTemp.height = img2.height;

    if (color != '#ffffff') {
        ctxTemp.fillStyle = color;
        ctxTemp.fillRect(0, 0, canvasTemp.width, canvasTemp.height);
        ctxTemp.globalCompositeOperation = "destination-in";
    }

    ctxTemp.drawImage(img2, 0, 0);
    ctxTemp.globalCompositeOperation = "source-over";

    let img = canvasTemp;

    const sx = squareslice[0];
    const sy = squareslice[1];
    const sw = squareslice[2];
    const sh = squareslice[3];

    let cw = w - sx - (img.width - (sx + sw));
    let ch = h - sy - (img.height - (sy + sh));

    cw = cw < 0 ? 0 : cw;
    ch = ch < 0 ? 0 : ch;

    // corners
    ctx.drawImage(img, 0, 0, sx, sy, x, y, sx, sy); // top left
    ctx.drawImage(img, 0, sy + sh, sx, img.height - (sy + sh), x, y + sy + ch, sx, img.height - (sy + sh)); // bot left
    ctx.drawImage(img, sx + sw, 0, img.width - (sx + sw), sy, x + sx + cw, y, img.width - (sx + sw), sy); // top right
    ctx.drawImage(img, sx + sw, sy + sh, img.width - (sx + sw), img.height - (sy + sh), x + sx + cw, y + sy + ch, img.width - (sx + sw), img.height - (sy + sh)); // bot right

    // sides

    ctx.drawImage(img, 0, sy, sx, sh, x, y + sy, sx, ch); // left
    ctx.drawImage(img, sx + sw, sy, img.width - (sx + sw), sh, x + sx + cw, y + sy, img.width - (sx + sw), ch); // right
    ctx.drawImage(img, sx, 0, sw, sy, x + sx, y, cw, sy) // up
    ctx.drawImage(img, sx, sy + sh, sw, img.height - (sy + sh), x + sx, y + sy + ch, cw, img.height - (sy + sh)) // down

    ctx.drawImage(img, sx, sy, sw, sh, x + sx, y + sy, cw, ch); // center
}

export const eyeOn = `<i class='bx bx-show-alt'></i>`
export const eyeOff = `<i class='bx bx-hide'></i>`
export const wifiOnI = `<i class='bx bx-wifi'></i>`;
export const wifiOffI = `<i class='bx bx-wifi-off'></i>`;

export function dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[arr.length - 1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
}

export function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}