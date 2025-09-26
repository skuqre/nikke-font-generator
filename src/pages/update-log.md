---
layout: ../layouts/md.astro
title: Update Log
embeddesc: the update log
---

# Update Log

---

<br>

## Quality `September 26, 2025`

higher quality images! provided by yours truly

**banner gen**
- switched portraits to NKAS's `characters_hq` images
- FINALLY updated the stickers LMAOOOOOOOOOOOOOOOOOOOOO

**blabla gen**
- switched missing character profile photos to NKAS's `character_missing_si` images

<br>

---

<br>

## Custom Colors `Mar 21, 2025`

more color stuff!!

**dialogue gen**
- added the color list, located below the color changer thing
    - allows you to add definitions of your own if you have custom characters
    - allows you to override names to use different colors
    - delete stuff too!
    - this was hackled up on just about 2 hours (while half asleep), so expect buggy stuff to occur

<br>

---

<br>

## Auto color and delays `Mar 14, 2025`

helloooo!!! yes i'm alive

**dialogue gen**
- added automatic color picking based on character name
    - **only** playable nikkes
    - always toggleable! scroll down and click on "automatically change scrollbar: on" to toggle.

**blabla gen**
- added customizable delays for video export
    - some languages don't directly cater to what is essentially English-based delays, so why not do it yourself? some languages like japanese only take a handful of characters in order to be expressive -- but messages happen to quickly. i hope this negates that
- added 0.2s of delay in every message in video export

<br>

---

<br>

## Image + npcs `Jan 24, 2025`

reorganized where "Send an image" button is because there's
lots of images where this feature isn't utilized.

![](https://anis.is-ne.at/6XT06W19W.png)

added npcs:
- rapi: hospitalized
- d.e.e.p.
- rapi: hospitalized child
- rapi: mass produced red
- hologram: with a hat

<br>

---

<br>

## font language selector `Dec 23, 2024`

you can now select the proper fonts in the Dialogue and the Blabla generator.

<br>

---

<br>

## call messages????!?!?!!? `Nov 18, 2024`

i've had that image under my radar and i've never really gotten to it.

here we are now!

**blabla gen**
- added gift messages
- added video call messages
- added voice call messages

<br>

---

<br>

## happy 1 year! `Nov 11, 2024`

it's been a year...?!

thank you all for using this site for your shitposts, memes, fanfictions!

it's been very fun making this site better for you all!

\- skuqre (`u/ANISNO1`)

**blabla gen**
- renamed `rapture centurion: red shoes` -> `rapture centurion: replica red shoes`

**dialogue gen**
- added landscape padding
    - makes landscape canvas sizes look more like the game, it can be toggled off
    - might be buggy when toggling between
    - changing canvas size is now a **destructive** transform, meaning some positions of UI elements (dialogue text, character name, etc...) may get messed up.
- fixed some issues with canvas sizes
    - camera should now follow lead when changing
    - characters should now follow lead when changing
- increased choice text margins (24px -> 32px)

**card gen**
- added Drag
    - may cause the tool to chug because of how things are drawn, will fix soon

<br>

---

<br>

## many new npcs `Nov 1, 2024`

since a whole lot of npcs became units and added to nikke.gg, the npcs list has been updated to adapt to it

grave got upgrades, so the playable grave takes precedent, but the old grave still lives

rapunzel got playable, but it's just an id and name change (rapunzel: innocent days -> rapunzel: pure grace)

**blabla gen**

added npcs
- leviathan
- phantom: mask off
- little mermaid / siren
- abe
- hansel
- gretel
- red shoes
- rapi: tactical up
- emma: tactical up
- vesti: tactical up
- eunhwa: tactical up
- grave: old

added raptures
- centurion: red shoes
- boss: land eater -> boss: land eater psid
- boss: land eater hsta
- boss: behemoth psid

<br>

---

<br>

## multiple characters `Oct 23, 2024`

after a looong loong time comin, multiple characters have been added to the dialogue generator!

you can now add multiple characters, position them individually, or move around with a camera.

**dialogue gen**
- **BREAKING** new character system!
	- enables you to add more characters than just one!
	- drag them individually, or reorder them!
- **BREAKING** fixed Drag
	- Drag wasn't really converting space between screen and canvas right, but it has been reworked in order to be consistent like the banner gen
- anchored Characters and Backgrounds to their **center**
	- this means that scaling happens from center, and position anchor is on the center of the character/background, should be easier for resizing!

<br>


---

<br>

## BANNER GENERATORRR!!! `Oct 4, 2024`

**introducing a new tool to the roster: the [Banner Generator](/nikke-font-generator/banner)!**

create any banner youd like, with duplicates too!

this generator is made out of pure spite. please expect bugs

also, to the guy that asked for Liberalio in the card generator: she was unfortunately deleted by the game, for some reason... I don't know if i'll find her.

**general**
- removed the animation for sticky behavior
- corrected some tutorial sentences

<br>

---

<br>

## card generator `Aug 25, 2024`

**introducing a new tool to the roster: the [Card Generator](/nikke-font-generator/card)!**

make ANYTHING look like a Nikke Unit! hell, maybe even NPCs!

add a [REDACTED] amount of cores on them as well, why not?!

\- suggested by reedzylx from the Nikke Community Discord

**blabla gen**
- added Behemoth and Black Ark Ranger (5 months late...)

**general**
- updated [Credits](/nikke-font-generator/credits) & [Usage](/nikke-font-generator/usage) page

<br>

---

<br>

## a long, long, time ago... `Aug 19, 2024`

**logo gen**
- updated UI

**dialogue gen**
- **BREAKING** ADDED STICKY BEHAVIOR!
    - as you scroll down, the image will follow along your screen. should be easier instead of purely guessing what's on the image!
- updated official channel warning 
- removed motion
    - motion proved to be tough to maintain AT ALL. it isn't worth it anymore, and since Ultimate is indev, it wont be readded back in.
- removed mp4 export, gif export, frame export
    - also just overall tough to maintain. might be readded at some point, but who knows?

**blabla gen**
- **BREAKING** ADDED STICKY BEHAVIOR!
    - as you scroll down, the image will follow along your screen. should be easier instead of purely guessing what's on the image!
- made profile pictures now respect aspect ratio
- [blabla pfp page](/nikke-font-generator/blabla-pfps/) should now be consistent with how it is displayed in the generator
- fixed the pfp preview beside the search bar to respect aspect ratio
    - affected images like Makima: Coat Off have now been fixed
- (hopefully) fixed some 9slice issues where you can see the lines where slices occurred in chat bubbles
- (hopefully) made the ui more intuitive!
    - most people barely utilize the features, so i'm trying to keep it more intuitive!!!
- frame system has been removed
    - yeah uh no one uses this and it's just about as unmaintainable as a github repo from like 12 years ago
    - also no one can like get a profile frame so it's w/e
    - i *might* add it back again, if suggested
- (hopefully) improved stability with profile picture lookup

**boss warning gen**
- updated UI

**general**
- **BREAKING** FULL UI REWRITE!
    - every UI between each generator should now be consistent!
    - UI should rely less on inline styling...
- **BREAKING** ADDED MUCH, MUCH BETTER TUTORIALS!
    - currently, the only available tutorials are for [Dialogue Generator](/nikke-font-generator/dialogue#start-tutorial) and [Blabla Generator](/nikke-font-generator/dialogue#start-tutorial). you can start the tutorial through the button that says "Tutorial" on the bottom of the preview, or click the links in this line!
    - if you have any suggestions, please don't hesitate to tell me! i'd be happy to change it, since it's not really my thing to teach...
- **BREAKING** ADDED UPDATE POPUP!
    - woooo
- changed the usage page a bit
- removed tl notice
- removed old tutorials
- removed old "what is" pages
- added 404 page!

<br>

---

<br>

## a taste of ultimate! `Aug 1, 2024`

here i give you a taste of ultimate!

**dialogue gen**
- gradients are now much more accurate!
- added the ability to of the dialogue going up if the lines are more than 2
- updated the font weights!
    - dialogue text: bold -> semibold
    - choice text: bold -> semibold
- choices have now been fixed to be more accurate to the choices from the summer event
    - this is because this is just the superior one compared to the unnecessarily thick one we have right now
- default control displayed is now Hide-Auto-Log-Skip
- narration box now has more line support
- because of how html canvases work, a black void background has been added
    - this is due to an issue with blend modes. the new gradients contain a white background, so "multiply" is used to hide it, but when a white color and a transparent color is multiplied, it shows white instead of being transparent. can't really fix this, sorry!
    - this void is unaffected by filters
- watermark is now more visible (0.05 -> 0.075)
- new default texts and anis for this update!
- updated default color (`#f4d259` -> `f5ba36`)

<br>

---

<br>

## hello `Jul 8, 2024`

**blabla gen**
- added most (if not all) raptures
    - ???: unknown rapture
    - boss: 9810811510911663
    - boss: alteisen mk.vi
    - boss: alteisen mk.vi psid
    - boss: black smith
    - boss: chatterbox
    - boss: crystal chamber hsta
    - boss: crystal chamber psid
    - boss: gatekeeper
    - boss: gatekeeper dmtr
    - boss: gatekeeper hsta
    - boss: gatekeeper psid
    - boss: gatekeeper zeus
    - boss: golden kraken
    - boss: grave digger
    - boss: grave digger (exposed core)
    - boss: harvester
    - boss: indivilia
    - boss: kraken anmi
    - boss: kraken dmtr
    - boss: kraken hsta
    - boss: kraken psid
    - boss: kraken zeus
    - boss: land eater
    - boss: material h
    - boss: material h dmtr
    - boss: modernia
    - boss: mother whale
    - boss: nihilister
    - boss: storm bringer
    - boss: storm bringer anmi
    - boss: ultra
    - centurion: armstrong
    - centurion: bow tie
    - centurion: cocytus
    - centurion: cucumber
    - centurion: doctor
    - centurion: dual ring
    - centurion: fingers
    - centurion: halo
    - centurion: heavy metal
    - centurion: laitance
    - centurion: loud mouth
    - centurion: mace
    - centurion: obelisk
    - centurion: plate
    - centurion: porter
    - centurion: rebuild armstrong
    - centurion: rebuild cucumber
    - centurion: rebuild porter
    - centurion: rebuild spooky
    - centurion: rebuild stout
    - centurion: rebuild vulcan r
    - centurion: runway
    - centurion: scarf
    - centurion: sinister
    - centurion: spook
    - centurion: spread
    - centurion: stout
    - centurion: sunbather
    - centurion: thermite
    - centurion: thermite β
    - centurion: tombstone
    - centurion: unknown crystal
    - centurion: vulcan r
    - elite: arkanoid
    - elite: bronchus
    - elite: bulwark
    - elite: bulwark (exposed core)
    - elite: capra
    - elite: cutter
    - elite: cutter (exposed core)
    - elite: driver
    - elite: elite barbell
    - elite: elite tiara
    - elite: glasses
    - elite: goblet
    - elite: hammer
    - elite: hexagon
    - elite: jellyfish
    - elite: joint
    - elite: knight
    - elite: launcher
    - elite: mantis
    - elite: needle
    - elite: orchestrion
    - elite: peacock
    - elite: penetrator
    - elite: penetrator (exposed core)
    - elite: perennial
    - elite: petal
    - elite: ponytail
    - elite: riddler
    - elite: riddler (exposed core)
    - elite: satellite
    - elite: screamer
    - elite: sentry
    - elite: shield
    - elite: tail bone
    - elite: tail bone (exposed core)
    - elite: tears
    - elite: tripod
    - elite: twin tail
    - elite: veil
    - elite: watcher
    - minion: ant
    - minion: battery
    - minion: beetle
    - minion: bird
    - minion: blocker
    - minion: bullwhip
    - minion: capsule
    - minion: clam
    - minion: crawler
    - minion: crawler (exposed core)
    - minion: cricket
    - minion: cube
    - minion: dagger
    - minion: disc
    - minion: drifter
    - minion: fez
    - minion: fez (exposed core)
    - minion: fez w
    - minion: frisbee
    - minion: frisbee (exposed core)
    - minion: glitter
    - minion: leech
    - minion: lentigo
    - minion: lure
    - minion: mono eye
    - minion: oculus
    - minion: oculus (exposed core)
    - minion: pelican
    - minion: pelican (exposed core)
    - minion: razer fin
    - minion: remnant
    - minion: runner
    - minion: scimitar
    - minion: sparrow
    - minion: sparrow (exposed core)
    - minion: sphere
    - minion: squid
    - minion: star fish
    - minion: thief
    - minion: vulcan
    - minion: vulcan (exposed core)
    - minion: waller
    - thrash: abettor
    - thrash: daikon
    - thrash: salver
    - thrash: shank
    - thrash: skimmer
    - thrash: striker
- added skins
    - maiden: under the sun
    - guilty: wave of disbelief
    - mast: mast the diver
    - anchor: anchor the diver
- removed boss raptures from the npc list

special thanks to Lorax from the Nikke Community discord for providing me rapture `si`s!

just a note, the rapture list excludes the renames that occurred from the NIER event, 
as they dont have much visual change (except for White Smith `9810811510911663`)

also, when looking for raptures, you're gonna need to put `rapture` in your query to make the
search look for raptures specifically.

---

<br>

## hello `Apr 30, 2024`

**blabla gen**
- renamed: `unknown` -> `grave`
- added npcs
    - clay
    - fragile
    - drilley
    - t.a.l.o.s.
    - kilo
- added skins
    - rosanna: ms. dangerous
    - poli: cheer up police
    - snow white: white knight
    - modernia: second affection
    - diesel: midnight strawberry
    - emilia: clumsy maid
    - emilia: spring breeze
    - rem: handy maid
    - rem: pure blossom

**logo gen**
- finally added some kerning!
    - this makes text look more normal

**general**
- updated examples on site embeds (e.g. Discord links)

<br>

## hello `Mar 3, 2024`

**blabla gen**

- added npcs
    - flora
    - hammering
    - liveryn
    - unknown
    - t.rony (the screen)
    - trony (the nikke)
- added nikke SKINS baby
    - liter: guardfish
    - frima: sea of sloth
    - yan: sunrise market
    - pepper: ocean vitamin
    - rapi: classic vacation
    - mast: a pirate's heart
    - rapi: white promise
    - neon: bling bullet
    - poli: sweet holic
    - brid: model worker
    - maxwell: mechanic white
    - diesel: strawberry flower
    - diesel: black sunday
    - maiden: covert nurse
    - yuni: pretty in pink
    - privaty: government grunt
    - novel: penguin holmes
    - milk: extreme fighter
    - centi: supreme holiday
    - noise: cherry blossom stage
    - alice: sweet home
    - emma: office therapy
    - sakura: midnight stealth
    - modernia: first affection
    - brid: black moon
    - noir: black rabbit
    - blanc: white rabbit
    - sugar: wild backyard
    - exia: gamer
    - emma: color me red
    - exia: joy to the nerds
    - julia: mild nocturne
    - sugar: hard-boiled
    - helm: chandelier
    - dolla: dark rose
    - privaty: banquet princess
    - harran: banquet witch
    - dorothy: nostalgia
    - liter: cute sunflower
    - guillotine: dark tracer
    - noise: classic diva
    - signal: dramatic chocolate
    - drake: maid for villain
    - viper: toxic rabbit
    - rupee: rabbit deluxe
    - drake: villain racer
    - 2b: metamorphic damage (no inherent visual change compared to 2b)
    - 2b: yorha uniform 1
    - a2: metamorphic damage
    - a2: yorha uniform prototype
    - novel: detective nurse
    - makima: coat off (no inherent visual change compared to makima)
- fixed bug of mp4 exporting (forgot to change a variable... for 2 MONTHS mind you)

i have not done my dailies the past 4 days<br>
the keyboard update is coming soon i promise

<br>

---

<br>

## hi `Feb 17, 2024`

**blabla generator**
- added npcs
    - freesia (RED ASH, from RE:DASH specifically)
    - b-0006 (OuteR: AUTOMATA)
    - c-1002 (OuteR: AUTOMATA)
    - 6000-d (OuteR: AUTOMATA)
    - hedonia member (~~rosalina's~~ ROSANNA's henchmen)
    - seimeikai member (sakura's henchmen)
    - peony association member (moran's henchmen, or just one of the best boys, Jin)
    - lumi (NEVERLAND)
    - ghost: lena (NEVERLAND)
    - ghost: lua (NEVERLAND)
    - ghost: lumi (NEVERLAND)
    - outer rim generic a
    - outer rim generic b
    - mast: old
    - rapi: old
- updated the [blabla pfps list](/nikke-font-generator/blabla-pfps) to fetch the data on site visit rather than on compile time (sorry [nikke.gg](https://nikke.gg))

**general**
- added the Japanese font in the repository.
    - it's not implemented on any of the generators yet, however, [credits are already added](/nikke-font-generator/credits).

I mainly am working on [Anisa](https://skuqre.github.io/anisa/) right now. no ideas for this site currently so /shrug<br>
I am stupid and put it as "beta" but like none of the functions are like existing so it's more of in an indev stage lolé

<br>

---

<br>

## boss warning `Jan 22, 2024`

**introducing the next tool to the roster: the boss warning generator!**

this creates an image with the boss introduction ui overlayed onto it. barely accurate, of course.

proper credits have been added to their specific pages!

\- suggested by mimir from the Nikke Discord

**general**
- transparent watermarks now have their opacity lowered even further (from 10% -> 5%)
- tool links are now icons
    - prevents clutter on the bottom, plus it's easy to identify... i think.

**blabla gen**
- added npcs
    - rose
    - mass produced melee old
    - mass produced melee
- added the pfps list!
    - [go check it out](/nikke-font-generator/blabla-pfps/)!

<br>

---

<br>

## profile pages `Jan 7, 2024`

**blabla gen**
- added the ability to create profile pages
    - this also includes non-nikke features like profile backgrounds and profile picture frames
- added the ability to add profile picture frames to normal blabla chats

**general**
- removed any mentions of Anisé
    - nothing too crazy -- Anisé is not getting any more viable updates from now on.

first update of the new year! thank you for using the tool and keeping me motivated to update the site!<br>
also, I've been interested in adding translations to the site, [go visit if you're interested](/nikke-font-generator/translation)!

<br>

---
<br>

## guides, and thoughts `Dec 30, 2023`

**blabla gen**
- added the ability to add in thoughts (or the thinking chat bubble if you feel so inclined)
- tweaked the default color by just a tiny bit

**dialogue gen**
- made the dialogue type toggle button (the eye) to be consistent with the other ui

**general**
- usage page has been tweaked
- GUIDES HAVE BEEN ADDED! The guides have been added that describes specific input fields and all that stuff.

<br>

---
<br>

## Accurate-r than ever `Dec 27, 2023`

**blabla gen**
- tweaked text weight of other chatters
    - uses text stroke to do so
- tweaked some ui peeves i got

**dialogue gen**
- added animation to choices when exporting
- added animation to narration box when exporting
- **BREAKING** removed gif exporting
    - it just really isn't worth it anymore, go convert your mp4 to a gif for a better result

**general**
- tweaked the way the other tools are displayed (no, the Blabla interface isn't the only thing you can make in this site)

yes I know the exporting indicator is not working as usual, I have to find a better way to find frames than this

<br>

---
<br>

## characters `Dec 23, 2023`

**blabla gen**
- added characters to the image lookup pool
    - marian
    - angelina
    - joseph
    - beatrice
    - booboo
    - max
    - 9s
    - aki hayakawa
    - denji
    - denji chainsaw man (the chainsaw man variant, not denji himself)
    - oswald
    - ruru
    - bolt
    - bolt junior
    - mass produced red
    - mass produced blue
    - mass produced orange
    - mass produced green
    - mass produced purple
    - mass produced white

<br>

---
<br>

## video exporting `Dec 21, 2023`

**blabla gen**
- you can now export it as a video with animations like the game
- choices are now also included when exporting to JSON

<br>

---
<br>

## attachments `Dec 19, 2023`

**blabla gen**
- you can now upload attachments as the character you currently have set.

**general**
- all image upload stuff now accept any image file, not just `.png`

<br>

---
<br>

## rewrite, indicators, choices, and more `Dec 18, 2023`

**blabla gen**
- **BREAKING** rewrote how blabla's are drawn
    - this may or may not be good
- **BREAKING** added choices
    - they will always be on the end of the conversation and will not affect your chat's messages
    - they will always be on the side of the Commander
    - they will always take the color of the Commander's color
- added in those "end" indicators -- type in "Indicator" as the character's name.
    ![](https://haxeflixel.is-terrible.com/6mQ3sFinN.png)
- added in system messages -- type in "System" as the character's name.
    ![](https://haxeflixel.is-terrible.com/6mQ3DA1Nc.png)
- added in the Grid Background. it's unnoticeable in fullscreen (all of my refs did not have a grid background), but it subtle in other screens
- made the scroll field more easy to know/use
- added the ability to drag to scroll
- added the ability to export as a json file and import as a json file
    - this was meant to be dev only but i do not tend on removing it now
    - you can open them on notepad to see what they contain; it's the conversation/chat you've been making.
- added a cheeky warning below about Safari
    - Apple, why.
- the name you typed before switching to Commander will now be persistent when you switch back
- fixed inconsistencies
    - Commander's font is now always the Bold variant of Pretendard
    - removed the weird letter spacing

**dialogue gen**
- added control type `Hide-Auto-Log-Cancel`
- added control type `Auto-Log-Cancel`

i unfortunately could not find a good fix for the Safari issue (text is offset vertically), but if i were to implement a fix, it would include manual user intervention; if yall want that, let me know.

it seems that Reddit has been using this as well! i posted some feature previews in there and it gained some attention. to the folks at the Official Reddit -- thank you. the shitposting has been indeed awesome.

<br>

---
<br>

## banger! `Dec 15, 2023`

**blabla gen**
- **BREAKING** added the conversations page.
    - you can toggle it in the "Chat" category.
    - currently very buggy pls do scream at me if you encounter one 
- added npcs to the pfp look up pool
    - andersen
    - andersen but naked (type `andersen: soaky shower` to get it)
    - shifty
    - shifty but old (type `shifty: old` to get it)
    - ingrid
    - syuen
    - the goat, mustang
    - male generic
    - female generic
    - male commander
    - female commander
    - einkk
    - enikk
    - burningum
    - cecil
    - doban
    - elysion harper (type `e.h.` to get it)
    - johan
    - legendary commander
    - ade
    - anachiro (or `cinderella` if you feel fancy)
    - ein
    - indivillia
    - k
    - leona
    - liberalio
    - liliweiss
    - mana
    - moran
    - papillion
    - pinne
    - rian
    - rouge
    - rumani
    - zwei
    - boss: blacksmith
    - boss: gravedigger
    - boss: alteisen
    - boss: chatterbox
    - boss: land eater
    - boss: modernia
    - boss: mother whale
    - boss: harvester
    - boss: material h
    - boss: storm bringer
    - boss: nihilister
    - boss: gatekeeper red
    - boss: gatekeeper green
    - boss: gatekeeper blue
- fixed inconsistencies
    - added the wifi symbol and time
    - changed font weight of the chat name (Extra Bold to just Bold)
    - fixed profile images not clipping to the right height

**general**
- added file filters to upload buttons

crown and chime unfortunately do not have official profile picture crops (yet), so i'm not adding them!
<br>

---
<br>

## usage changes `Dec 12, 2023`

- usage page has now been updated and put into the site itself instead of the github's README. it also now contains *specific font availability/usage guidelines*.
- credits now updated to reflect the proper people!
- fixed blabla text line width thing shenanigan bug

<br>

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