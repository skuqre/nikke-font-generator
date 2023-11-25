export function draw9slice(ctx, img, squareslice, x, y, w, h) {
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