---
layout: ../../layouts/md.astro
title: Motion - Dialogue Generator
embeddesc: This guy "skuqre" really put a dumb system in just to add motion 😂😂😂😂
---

# Motion - Dialogue Generator

As simple as I'd like the generator to be, adding motion to it can become complicated.

**bugs inbound! this hasn't been thoroughly tested!**

Adding motion takes form in adding lines formatted in a matter to which the generator can understand.
Kinda like a script in some sort of language or something.

Here's an example of what I would put in that field:
```
fadein::0.5
jump::0.5
scalech::110::top-center::1
scalebg::125::top-center::1
```

Most take in the form of `keyword::value::value::value` where `keyword` is a specific word that must be typed *as-is*, and value
can be anything, commonly a number.

You can preview the results of your motion creations by exporting in MP4 or GIF. Take note that exporting to these types will provide you with a result in 30 FPS!

Anything with a `duration` value is the value in seconds, e.g. `fadein::0.2` is fade in the image for 0.2 seconds.

| Keyword | Format | Description
| - | - | - |
| **fadein** | `fadein::duration` | Fade the image *from black* (excluding the UI) for a certain amount of seconds. |
| **fadeout** | `fadeout::duration` | Fade the image *to black* (excluding the UI) for a certain amount of seconds. |
| **jump** | `jump::duration` | Make the character image "jump" a tiny bit. The jump height scales with your canva's height. |
| **scalebg** | `scalebg::finalScale::anchor::duration` | Scale the background. <ul><li>**finalScale**: The value you want the background to smoothly transition to</li><li>**anchor**: Where the background will "scale" from. Can be `top-left`, `top-center`, `top-right`, `mid-left`, `mid-center`, `mid-right`, `bot-left`, `bot-center`, `bot-right`. If you want to just change scale, and no position, this can be `none` instead.</li></ul> |
| **posxbg** | `posxbg::toXpos::duration` | Move the background to a new place, horizontally. <ul><li>**toXpos**: Where the background will go to in the horizontal axis.</li></ul> |
| **posybg** | `posybg::toYpos::duration` | Move the background to a new place, vertically. <ul><li>**toYpos**: Where the background will go to in the vertical axis.</li></ul> |
| **scalech** | `scalech::finalScale::anchor::duration` | Same as the one ending in `bg` |
| **posxch** | `posxch::toXpos::duration` | Same as the one ending in `bg` |
| **posych** | `posych::toXpos::duration` | Same as the one ending in `bg` |