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

    x = Math.round(x);
    y = Math.ceil(y);

    // corners
    ctx.drawImage(img, 0, 0, sx, sy, x, y, sx, sy); // top left
    ctx.drawImage(img, 0, sy + sh, sx, img.height - (sy + sh), x, y + sy + ch, sx, img.height - (sy + sh)); // bot left
    ctx.drawImage(img, sx + sw, 0, img.width - (sx + sw), sy, x + sx + cw, y, img.width - (sx + sw), sy); // top right
    ctx.drawImage(img, sx + sw, sy + sh, img.width - (sx + sw), img.height - (sy + sh), x + sx + cw, y + sy + ch, img.width - (sx + sw), img.height - (sy + sh)); // bot right

    // sides
    ctx.drawImage(img, 0, sy, sx, sh, x, y + sy, sx, ch); // left
    ctx.drawImage(img, sx + sw, sy, img.width - (sx + sw), sh, x + sx + cw, y + sy, img.width - (sx + sw), ch); // right
    ctx.drawImage(img, sx, 0, sw, sy, x + sx, y, Math.ceil(cw), sy) // up
    ctx.drawImage(img, sx, sy + sh, sw, img.height - (sy + sh), x + sx, y + sy + ch, Math.ceil(cw), img.height - (sy + sh)) // down

    ctx.drawImage(img, sx, sy, sw, sh, x + sx, y + sy, Math.ceil(cw), ch); // center
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

export function recolorImage(img, color = "#ffffff") {
    const canvasTemp = document.createElement("canvas");
    const ctxTemp = canvasTemp.getContext("2d");

    canvasTemp.width = img.width;
    canvasTemp.height = img.height;

    ctxTemp.drawImage(img, 0, 0);
    ctxTemp.globalCompositeOperation = "source-in";

    if (color != '#ffffff') {
        ctxTemp.fillStyle = color;
        ctxTemp.fillRect(0, 0, canvasTemp.width, canvasTemp.height);
    }

    ctxTemp.globalCompositeOperation = "source-over";

    const canvasCopy = document.createElement("canvas");
    canvasCopy.width = img.width;
    canvasCopy.height = img.height;
    canvasCopy.getContext("2d").drawImage(canvasTemp, 0, 0);

    ctxTemp.clearRect(0, 0, canvasTemp.width, canvasTemp.height);
    ctxTemp.drawImage(img, 0, 0);
    ctxTemp.globalCompositeOperation = "multiply";
    ctxTemp.drawImage(canvasCopy, 0, 0);

    return canvasTemp;
}

export function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

// https://gist.github.com/Luftare/fd238b7aac27c4e82c13b4a9526c878f
export function drawImageWithRot(ctx, img, x, y, angle = 0, scale = 1) {
    ctx.save();
    ctx.translate(x + img.width * scale / 2, y + img.height * scale / 2);
    ctx.rotate(angle);
    ctx.translate(- x - img.width * scale / 2, - y - img.height * scale / 2);
    ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
    ctx.restore();
}

// https://www.reddit.com/r/learnjavascript/comments/11z9ll6/scaling_canvas_at_mouse_position_and_conversion/
export function translateCoordinates(e, canvas) {
    const clientRect = canvas.getBoundingClientRect();

    const adjustedX = (e.clientX - clientRect.left) * (canvas.width / canvas.offsetWidth);
    const adjustedY = (e.clientY - clientRect.top) * (canvas.height / canvas.offsetHeight);

    return [adjustedX, adjustedY];
}

// https://gist.github.com/timdown/021d9c8f2aabc7092df564996f5afbbf

export function rowBlank(imageData, width, y) {
    for (var x = 0; x < width; ++x) {
        if (imageData.data[y * width * 4 + x * 4 + 3] !== 0) return false;
    }
    return true;
}

export function columnBlank(imageData, width, x, top, bottom) {
    for (var y = top; y < bottom; ++y) {
        if (imageData.data[y * width * 4 + x * 4 + 3] !== 0) return false;
    }
    return true;
}

export var trimCanvas = (function () {
    return function (canvas) {
        var ctx = canvas.getContext("2d");
        var width = canvas.width;
        var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        var top = 0, bottom = imageData.height, left = 0, right = imageData.width;

        while (top < bottom && rowBlank(imageData, width, top)) ++top;
        while (bottom - 1 > top && rowBlank(imageData, width, bottom - 1)) --bottom;
        while (left < right && columnBlank(imageData, width, left, top, bottom)) ++left;
        while (right - 1 > left && columnBlank(imageData, width, right - 1, top, bottom)) --right;

        if (right - left === 0 || bottom - top === 0) {
            return canvas;
        }

        var trimmed = ctx.getImageData(left, top, right - left, bottom - top);
        var copy = canvas.ownerDocument.createElement("canvas");
        var copyCtx = copy.getContext("2d");
        copy.width = trimmed.width;
        copy.height = trimmed.height;
        copyCtx.putImageData(trimmed, 0, 0);

        return copy;
    };
})();

// https://www.algorithms-and-technologies.com/point_in_polygon/javascript
export const pointInPolygon = function (polygon, point) {
    //A point is in a polygon if a line from the point to infinity crosses the polygon an odd number of times
    let odd = false;
    //For each edge (In this case for each point of the polygon and the previous one)
    for (let i = 0, j = polygon.length - 1; i < polygon.length; i++) {
        //If a line from the point into infinity crosses this edge
        if (((polygon[i][1] > point[1]) !== (polygon[j][1] > point[1])) // One point needs to be above, one below our y coordinate
            // ...and the edge doesn't cross our Y corrdinate before our x coordinate (but between our x coordinate and infinity)
            && (point[0] < ((polygon[j][0] - polygon[i][0]) * (point[1] - polygon[i][1]) / (polygon[j][1] - polygon[i][1]) + polygon[i][0]))) {
            // Invert odd
            odd = !odd;
        }
        j = i;

    }
    //If the number of crossings was odd, the point is in the polygon
    return odd;
}