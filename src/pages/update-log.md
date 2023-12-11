---
layout: ../layouts/md.astro
title: Update Log
embeddesc: the update log
---

# Update Log

---
<br>

## qol `Dec 11, 2023`

**blabla gen**
- added a way to quickly switch between "commander" and other chatters (it's the two buttons btw)
- added an image preview
- added a way to quickly get a nikke's pfp easily. SHOUTOUTS TO [NIKKE-DB](https://nikke-db.pages.dev) & [NIKKE.GG](https://nikke.gg) Y'ALL ROCK
- [the reddit post has reached a hefty ton of attraction. thank you all.](https://www.reddit.com/r/NikkeMobile/comments/18f3ned/nikke_font_generator_blabla_update/)

HELLOO!!! the post got a lot of stuff goin on in it so im really happy rn... <br>NIKKE-DB is a glorious life-saver. some sort of personal blogpost may elaborate on this.

some qol stuff to feast on to, as this week am busy!

enjoy!!

<br>

---
<br>

## Blabla Generator (BETA) `Dec 10, 2023`

**blabla generator!!**
- BETA phase, may have RIDICULOUS bugs
- sizing for it is currently disabled
    - *now that i think about it, it's small enough!*

**other changes**
- optimized some images

blabla generator! the next tool on the roster!
i find it odd how it turned out -- i myself thought it was going to be the skills screen.

either way, enjoy!

<br>

---
<br>

## Dialogue Control Types `Dec 8, 2023`

- added four new dialogue control types (from the Neverland Update!)
    - Auto-Log-Skip
    - Auto-Log-Fast
    - Hide-Auto-Log-Skip
    - Hide-Auto-Log-Fast
- added the ability to hide UI
    - this also hides the watermark as it's just all gradients.

<br>

---
<br>

## Numbers `Dec 6, 2023`

- added Numbers to the logo generator
- added the ability to change seperate colors in the logo generator
- reduced file size of glyphs for the logo generator
- **BREAKING** default site behavior changed, outputs now change when you're typing, no more clicking "generate" when creating your images
    - button has been renamed to "Refresh" instead of "Generate"
    - old behavior can be toggled with by right clicking the button
- **BREAKING** behavior on Logo Generator changed
    - the big font's (one for the "NIKKE" text) way of being positioned vertically has been changed a bit:
    letters will now be centered vertically with the tallest letter in the word, there should be a small
    visual difference but everything would be fine.

<br>

---
<br>

## More motion `Dec 5, 2023`

- added `jump` motion effect
    - makes the character do a little "jump" commonly from VNs
- added `scalech` motion effect
    - scales the character. same syntax as `scalebg`

||
|-|
| <video width="100%" controls autoplay src="https://cdn.discordapp.com/attachments/1154460728179314710/1181592901080322178/nikke-dialogue_1.mp4" /> |

<br>

---
<br>

## Stuff `Dec 2, 2023`

- anis is back!
- the narration box is now resizable.
- the title can now show the export progress in video/gif. really out of the line but i don't know how to make the site not halt when exporting LMAO
- the site now alerts when exporting is finished
- added `fadeout` motion effect

<br>

---
<br>

## temp: Happy birthday, Kevin `Dec 2, 2023`

<img src="https://haxeflixel.is-terrible.com/6lhGtIcWB.png" width="100%" />

just a temporary happy birthday Kevin

in all seriousness, this is a small little birthday thing for KennyP1, one of the people who first played with the Dialogue Generator! big thanks to you for using it avidly when it was in it's bones.

also: this is now a thing in the NIKKE Community server! there was a time where i would think to ask "i wonder how much would it take to get to #community-projects" but now it's in there since one of the big guys, Reed, noticed the site, and gave me the pass to post there!

don't worry about Anis's default btw, she'll comeback in ~12 hours after this update's release!

if you'd like to give a feature request or bug report, you can holler me there!

- fixed Color Bar not being the default color (`#f4d259` on Anis)

update 1: now changed to "Kenny"

<br>

---
<br>

## Frame Allowance `Dec 1, 2023`

ladies and germs we are now able to prolong the video/gif

i intentionally did not include exporting to individual frames to be prolonged because i want that to be as "raw" as possible

the sole purpose of "individual frames" is to use such media for your editing shenanigans, but if you're against that idea, just holler at me at discord or smn

thank you!

<br>

---
<br>

## Motion `Nov 27, 2023`

it's time for some motion!

i pretty much overcomplicated the addition of this, so it's in the essence of "scripting"

it's pretty limited right now, but more to come if the people ask of it!

[motion explanation](/nikke-font-generator/what-is/motion)

<br>

---
<br>

## Export `Nov 26, 2023`

- added the ability to download/export in 4 different types
    - Export as PNG...
    - Export as animated GIF...
    - Export as animated MP4...
    - Export as individual frames (as ZIP)...

[explanation page for each export type](/nikke-font-generator/what-is/export-types)

the site now uses tools like `Buffer`, `gif-encoder`, and `client-zip` for things like this. hope y'all enjoy.

<br>

---
<br>

## Fixes `Nov 25, 2023`

- fixed newlines not working properly
- fixed font size not changing line spacing
- removed usage of links in backgrounds
    - **REASON FOR REMOVAL**: this would break half the time, plus no one really uses it

<br>

---
<br>

## Newlines `Nov 24, 2023`

- added the ability to type in new lines (when you press enter) on narration and normal dialogue
- added back in Background Auto Fitting
- added the ability to toggle Background Auto Fitting
- fixed Drag being stupid on touch devices

| | |
|-|-|
| <img src='https://cdn.discordapp.com/attachments/1154460728179314710/1177549114142101584/ATA9GNkXiWy6AAAAAElFTkSuQmCC.png' width="100%" /> | <img src='https://media.discordapp.net/attachments/1154460728179314710/1177549114989355048/QX9iLnuJOSTH6vE2w563Xc5HPUALElU4Jja6tQa4fKw78NJ1r35NneoGAAAAAElFTkSuQmCC.png' width="100%"> |

<br>

---
<br>

## Action / Narration `Nov 23, 2023`

- added the ability to add Narration / Action style dialogue

<br>

---
<br>

## Resize-able `Nov 22, 2023`

- added the ability to resize and reposition any text/ui element in the image (thank you Δionion for the idea)
- added the ability to resize the entire canvas
- fixed use of deprecated HTML in the file itself (see [`src/pages/dialogue.astro`](https://github.com/skuqre/nikke-font-generator/blob/src/pages/dialogue.astro))
- changed the layout of the sizing tool a bit
- code is now deemed "shitter than Ever *guaranteed*"
- **BREAKING** backgrounds will not fit to empty spaces anymore
    - this is moreso for the make canvas size same as bg size button that you can press

huge shoutout to folks at the [Official Server](https://discord.gg/nikke-en) who use this. y'alls creations make me happy.

<br>

---
<br>

## Small Mobile Support `Nov 21, 2023`

- *SHITTY mobile support for drag

<br>

---
<br>

## Adjustments `Nov 20, 2023`

- added the ability to include/exclude the bottom right arrow that appears when lines finish in-game
- reduced the opacity of the watermark (less noticeable but obvious when looking at it properly)
- added the ability to include/exclude the top right dialogue controls

<br>

---
<br>

## Choices `Nov 17, 2023`

Should have been in there since the beginning, but whatever.

- added the ability to create choices
- discovered the ability to add emojis in any text field

<br>

---
<br>

## Dialogue Generator Updates `Nov 12-14, 2023`

- added Drag Tool
- added ability to use CSS Filters and the ability to write your own filter code

<br>

---
<br>

## Public-er Release `Nov 11, 2023`

This site has always been public -- but it was only seen by the people at the Official Discord to use.

- added Dialogue Generator
- added Sizing Tools
- [made a post on the Official Reddit](https://www.reddit.com/r/NikkeMobile/comments/17sp0dx/i_created_a_nikke_font_generator/)

<br>