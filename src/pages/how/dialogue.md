---
layout: ../../layouts/md.astro
title: How to Dialogue Generator
embeddesc: the hell is a dialogue gen supposed to do? make dialogue? who named this thing
---

---

# A very inconvenient guide on how to use the Dialogue Generator

---

<br>

As the Dialogue Generator could get updated in the foreseeable future, expect this part of the site to get updated (as well as the Blabla Generator how-to).

<br>

<h3 align="left">Writing a dialogue</h3>

<img src="https://haxeflixel.is-terrible.com/6nWShaKuS.png" />

The main interface is this part. It's similar to the Logo Generator's interface with a few tweaks here and here.
- **Character name here...**: Where you put the character that's speaking.
- **What the character will be saying...**: Where you put what the character will be saying.
- **Refresh**: If the image being shown does not pertain to what you think it would look like, you can force it to redraw the image.
- **100% selector**: Image size, to scale.
- **Large color bar at the right**: The color of the small color bar at the left of the character's name.

<br>

<h3 align="left">Changing the character</h3>

Click the "Upload Character Image..." button ever so displayed prominently just below the main fields and select your file. Possible file types are any image file. *No image is actually uploaded by the way, just letting this button be as intuitive as possible, is all.* 

<br>

<h3 align="left">Changing the background</h3>

Click the "Upload Background Image..." button ever so displayed prominently just below the character image button and select your file. Possible file types are any image file.

When you upload, the image will attempt to auto fit to the canvas to fill empty spaces on the image. 
- When the image is portrait (height is greater than the width), the image will stay at (0, 0) and will scale to the canvas's width.
- When the image is landscape (width is greater than the height), the image will scale to the canvas's height and center itself horizontally.

The behavior above only happens **once** when you upload an image.

<br>

<h3 align="left">Choices</h3>

<img src="https://haxeflixel.is-terrible.com/6nWTUXx8U.png" />

If you want something like an advise session or a commander dialogue, you can put lines in here. **It's where "1 line = 1 choice"**. To add another choice, just press enter and type another one to do so.

- When you're at >1 choices, the dialogue will darken, as that's how it is in the game.
- The choice's text size do not scale to the choice's backdrop/background image.

<br>

<h3 align="left">Action/Narration</h3>

<img src="https://haxeflixel.is-terrible.com/6nWUg2MIZ.png" />

If you want something like "I gently open the door..." or just the narration box, then you can put your narration stuff in here. Newlines (or just pressing enter) are supported as well.

- The narration box does not scale vertically when the amount of lines is >2 like the game does.
- The narration box is created from scratch and may be inaccurate when seen closely
- The narration box scales horizontally when the canvas's width is different, keeping a static margin left and right
- The text's max width is constrained by the width of the narration box.

<br>

<h3 align="left">Dialogue Controls</h3>

<img src="https://haxeflixel.is-terrible.com/6nWVj4KFY.png" />

The top right houses the dialogue controls. It can be switched to different types that show what they would be: 
- Auto Log Skip
- Auto Log Fast
- Auto Log Cancel
- Hide Auto Log Skip
- Hide Auto Log Fast
- Hide Auto Log Cancel

The ones that end in **Cancel** are used exclusively in Advise interactions where you are granted the ability to cancel and reroll for a new advise question.

The ones that end in **Fast** are used exclusively in Visual Novel-like interactions. This comes directly from the Neverland Minigame.

The ones that end in **Skip** are the default dialogue control buttons. It is used mostly anywhere in the game.

The ones that start with **Hide** are now the current buttons in game. Since the Neverland event, the game has added a "Hide" button to hide most UI elements in a dialogue interaction.

*Do note that these buttons do not work and are just there for novelty and accuracy's sake.*

**The eye on the right will hide/show the dialogue control types.**

<br>

<h3 align="left">Export</h3>

<img src="https://haxeflixel.is-terrible.com/6nWX1ZkWQ.png" />

This is where you get your results. [Please see the full explanation for a more thorough description](/nikke-font-generator/what-is/export-types).

<br>

<h3 align="left">Motion</h3>

<img src="https://haxeflixel.is-terrible.com/6nWXMQzKx.png" />

Motion (or motion code, more likely), is a needlessly complicated addition of adding animation/motion to your dialogue. [Please see the full explanation for a more thorough description](/nikke-font-generator/what-is/motion).

<br>

<h3 align="left">Frame Allowance</h3>

<img src="https://haxeflixel.is-terrible.com/6nWYmAorA.png" />

When your motion code is just too much, the exported video may end in the middle of a motion animation because the frames supplied by your dialogue are not enough. This is where this field comes in. You can add a number (30 for 1 second) so that your motion completes before the video ends.

<br>

<h3 align="left">Other</h3>

<img src="https://haxeflixel.is-terrible.com/6nWYWg74C.png" />

Contains other buttons that can't be categorized.

- **Clear Character**: Removes the character.
- **Clear Background**: Removes the background.
- **Bottom right arrow: ON**: Shows/hides the arrow on the bottom right that indicates when a dialogue has finished typing or not.
- **UI: ON**: This works similar to the Hide button in the game -- hides most UI elements except for the gradients.
- **Enable Size, Position, and Post-process tools**: Enables the other part of the tool.

<br>

---

<br>

## Size, Position, and Post-processing

In the game, many may come across flashbacks, blurred, or sepia-like dialogue interactions. There are also times where others may want to just resize the text/various UI elements. This is where this tool comes in.

**You have to enable this menu by clicking the "Enable Size, Position, and Post-process tools" once. It'll appear above the main tools discussed above.**

<br>

<h3 align="left">Images tab</h3>

<img src="https://haxeflixel.is-terrible.com/6nW_yM7Yo.png" />

Where you can resize and reposition the major images (background and character) however you like. Most options are self explanatory.

- **Auto Fit: ON**: Toggles the auto fit behavior that occurs when you upload a background image. **It's ON by default**.
- **Drag**: Applies for ALL buttons with "Drag" above it: Enables you to use your mouse or finger to position the image/element with "Drag" being ON. **Only one Drag button can be ON at a time**.

**Post-processing** includes 3 of the most used filters in NIKKE. You can also input your custom CSS filter code if you'd like other filters. [Head here for a full list of said filters](https://developer.mozilla.org/en-US/docs/Web/CSS/filter).

- **Draw**: Toggles the filters. You can disable it temporarily if you'd like to reposition or resize your characters a bit.

<br>

<h3 align="left">UI Elements / Canvas tab</h3>

<img src="https://haxeflixel.is-terrible.com/6nX1s2V6a.png" />

It's very long, but you probably should know what most of them do now.

- **Narration box**: This uses offsets instead of the absolute position the narration box is at (when active), you can also change its' scale here.
- **Canvas**: You can resize the canvas here. You can also make the canvas's dimensions same as the background image's size (with the BG image's scale affecting it) by clicking the "Make canvas to BG image size".

<br>