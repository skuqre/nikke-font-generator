const dialogueTutorialScript = [
    {
        text: "Welcome to the False Memory System Demo!",
        selector: null,
        yieldUntil: null,
        where: "top"
    },
    {
        text: "Allow me to help you with this. I'll try and automatically scroll to the thing I'm talking about to help you. The sticky behavior of the previews will be disabled as well.",
        selector: null,
        yieldUntil: null,
        where: "top"

    },
    {
        text: "This is the Dialogue Generator, you can imagine any scenario whatsoever and make people speak things.",
        selector: null,
        yieldUntil: null,
        where: "top"
    },
    {
        text: "Awesome, right?",
        selector: null,
        yieldUntil: null,
        where: "top"
    },
    {
        text: "Let's start...",
        selector: null,
        yieldUntil: null,
        where: "top"
    },
    {
        text: "This image here is what you're creating. Anything you input in the following fields will change what you're seeing here.",
        selector: "#dialogue-canvas",
        yieldUntil: null,
        where: "bottom"
    },
    {
        text: "Over here is the name field, where you put the person's name. Let's make the worried Anis say something by putting \"Anis\" in there.",
        selector: "#character",
        yieldUntil: "finishTyping",
        where: "top"
    },
    {
        text: "Now put something here to make worried Anis say something. I'm really not the one to think of this kinda stuff, so feel free to put whatever you want.",
        selector: "#dialog",
        yieldUntil: "finishTyping",
        where: "top"
    },
    {
        text: "Let's see what you made...",
        selector: "#dialogue-canvas",
        yieldUntil: null,
        where: "bottom"
    },
    {
        text: "There we are. She's saying it.",
        selector: "#dialogue-canvas",
        yieldUntil: null,
        where: "bottom"
    },
    {
        text: "If things don't look right, you can always click on this button to refresh the image.",
        selector: "#generate",
        yieldUntil: null,
        where: "top"
    },
    {
        text: "If the image seems too big for your liking, you can scale it down through this selector.",
        selector: "#size",
        yieldUntil: "change",
        where: "top"
    },
    {
        text: "This here changes the color bar beside the name of the person.",
        selector: "#color",
        yieldUntil: "change",
        where: "top"
    },
    {
        text: "This button allows you to upload an image of the person. We'll get to moving that image later.",
        selector: "label[for='char-img-up']",
        yieldUntil: null,
        where: "top"
    },
    {
        text: "This button allows you to upload a background. You can also upload full images over here if you're uploading fanart. We'll also get to moving that image later.",
        selector: "label[for='bg-img-up']",
        yieldUntil: null,
        where: "top"
    },
    {
        text: "This field allows you to input narration text. When no one is saying something, let narration take over!",
        selector: "#actionbox",
        yieldUntil: null,
        where: "top"
    },
    {
        text: "Something like \"I gently open the door.\" and phrases like that is put here. Feel free to put whatever you want.",
        selector: "#actionbox",
        yieldUntil: "finishTyping",
        where: "top"
    },
    {
        text: "Let's see what you made...",
        selector: "#dialogue-canvas",
        yieldUntil: null,
        where: "bottom"
    },
    {
        text: "This field here allows you to input choices. When you speak, it's normally a choice you have to select, right?",
        selector: "#choices",
        yieldUntil: null,
        where: "top"
    },
    {
        text: "Type anything you'd like to say here. Separate your choices by pressing enter.",
        selector: "#choices",
        yieldUntil: "finishTyping",
        where: "top"
    },
    {
        text: "Let's look at what you wanted to say...",
        selector: "#dialogue-canvas",
        yieldUntil: null,
        where: "bottom"
    },
    {
        text: "This selector changes the controls on the top right of the image.",
        selector: "#cotype",
        yieldUntil: null,
        where: "top"
    },
    {
        text: "Normally, it would show \"Hide, Auto, Log, Skip\" in normal cutscenes, but you can change it to what's possible here.",
        selector: "#cotype",
        yieldUntil: null,
        where: "top"
    },
    {
        text: "You can hide (or show) the controls through this button.",
        selector: "#controls-toggle",
        yieldUntil: null,
        where: "top"
    },
    {
        text: "You can download the image you've created through this button!",
        selector: "#export-png",
        yieldUntil: null,
        where: "top"
    },
    {
        text: "You can also just tap the image to download it as well.",
        selector: "#dialogue-canvas",
        yieldUntil: null,
        where: "bottom"
    },
    {
        text: "You can tap this button to remove the person.",
        selector: "#clear-char",
        yieldUntil: null,
        where: "top"
    },
    {
        text: "You can tap this button to remove the background. Though, a black void will be shown instead.",
        selector: "#clear-bg",
        yieldUntil: null,
        where: "top"
    },
    {
        text: "Let's get started on sizing.",
        selector: null,
        yieldUntil: null,
        where: "top"
    },
    {
        text: "Tap this button to turn on the sizing tool!",
        selector: "#enable-sizing",
        yieldUntil: "clickButton",
        where: "top"
    },
    {
        text: "This is the Sizing Tool! This allows you to transform images to your liking.",
        selector: "#sizing-tool-main",
        yieldUntil: null,
        where: "top"
    },
    {
        text: "Let's get started with the background.",
        selector: "#sizing-tool-main",
        yieldUntil: null,
        where: "top"
    },
    {
        text: "This is the <b>horizontal</b> position of the background.",
        selector: "#xposbg",
        yieldUntil: null,
        where: "top"
    },
    {
        text: "This, however is the <b>vertical</b> position of the background.",
        selector: "#yposbg",
        yieldUntil: null,
        where: "top"
    },
    {
        text: "This is the scale of the background, percentage-wise.",
        selector: "#scalebg",
        yieldUntil: null,
        where: "top"
    },
    {
        text: "For demonstration on the next items, can you set this number to something else other than 120 for me? I'd recommend it to be something lower, though.",
        selector: "#scalebg",
        yieldUntil: "finishNumber",
        where: "top"
    },
    {
        text: "Thank you!",
        selector: null,
        yieldUntil: null,
        where: "top"
    },
    {
        text: "Many elements have an option to \"drag\" the element on the image.",
        selector: "#dbg",
        yieldUntil: null,
        where: "top"
    },
    {
        text: "Toggling this will allow you to drag the element to whatever position you want on the image.",
        selector: "#dbg",
        yieldUntil: null,
        where: "top"
    },
    {
        text: "Toggle it on.",
        selector: "#dbg",
        yieldUntil: "clickButton",
        where: "top"
    },
    {
        text: "You can now use your finger (or your mouse) to move the background. Click and drag to do so!",
        selector: "#dialogue-canvas",
        yieldUntil: "finishDrag",
        where: "bottom"
    },
    {
        text: "It changes the values over here as you went and did that.",
        selector: "#bg-transforms",
        yieldUntil: null,
        where: "top"
    },
    {
        text: "Now, let's move over to the alignment tools.",
        selector: null,
        yieldUntil: null,
        where: "top"
    },
    {
        text: "This aligns the background to the top of the image.",
        selector: "#align-bg-top",
        yieldUntil: null,
        where: "top"
    },
    {
        text: "This aligns the background to the center of the height of the image.",
        selector: "#align-bg-ymid",
        yieldUntil: null,
        where: "top"
    },
    {
        text: "This aligns the background to the bottom of the image.",
        selector: "#align-bg-bot",
        yieldUntil: null,
        where: "top"
    },
    {
        text: "This aligns the background to the left of the image.",
        selector: "#align-bg-left",
        yieldUntil: null,
        where: "top"
    },
    {
        text: "This aligns the background to the center of the width of the image.",
        selector: "#align-bg-xmid",
        yieldUntil: null,
        where: "top"
    },
    {
        text: "This aligns the background to the right of the image.",
        selector: "#align-bg-right",
        yieldUntil: null,
        where: "top"
    },
    {
        text: "I'll let you play with those once we're done here.",
        selector: null,
        yieldUntil: null,
        where: "top"
    },
    {
        text: "The same principles from the Background part of the tool apply to the Character part of the tool as well.",
        selector: null,
        yieldUntil: null,
        where: "top"
    },
    {
        text: "They're meant to look similar. They work similar, too... well the Character part changes the Character instead of the Background...",
        selector: null,
        yieldUntil: null,
        where: "top"
    },
    {
        text: "Let's move on to the filters.",
        selector: null,
        yieldUntil: null,
        where: "top"
    },
    {
        text: "These three are some common filters used throughout the story.",
        selector: "#filter-transforms",
        yieldUntil: null,
        where: "top"
    },
    {
        text: "This is the Grayscale filter. If you want something to look like a flashback, you can make this 100% to make it so.",
        selector: "#gsnum",
        yieldUntil: "finishNumber",
        where: "top"
    },
    {
        text: "This is the Blur filter. Remember that time you first met Syuen?",
        selector: "#blnum",
        yieldUntil: null,
        where: "top"
    },
    {
        text: "When she shot Mihara, and you somehow got hurt? Your vision was all blurry at that time, too.",
        selector: "#blnum",
        yieldUntil: null,
        where: "top"
    },
    {
        text: "Well, you can simulate that using this. Crank it up to like four pixels or something.",
        selector: "#blnum",
        yieldUntil: "finishNumber",
        where: "top"
    },
    {
        text: "This one modifies brightness. That's really about it...",
        selector: "#brnum",
        yieldUntil: null,
        where: "top"
    },
    {
        text: "Change it to whatever you want. If you want it do a fade out, set it to zero.",
        selector: "#brnum",
        yieldUntil: "finishNumber",
        where: "top"
    },
    {
        text: "Now you may have noticed something different with this one.",
        selector: "#df",
        yieldUntil: null,
        where: "top"
    },
    {
        text: "It says \"Draw\" instead of \"Drag\".",
        selector: "#df",
        yieldUntil: null,
        where: "top"
    },
    {
        text: "You can toggle the filters using this button. It's useful if you can't quite tell what's going on if the filters are already set up and you're moving things.",
        selector: "#df",
        yieldUntil: null,
        where: "top"
    },
    {
        text: "Let's see what you made with the filters.",
        selector: "#dialogue-canvas",
        yieldUntil: null,
        where: "bottom"
    },
    {
        text: "It's definitely an image.",
        selector: "#dialogue-canvas",
        yieldUntil: null,
        where: "bottom"
    },
    {
        text: "Final stretch! Let's move on to the UI Elements tab of this tool.",
        selector: "#st-ui-button",
        yieldUntil: "clickButton",
        where: "top"
    },
    {
        text: "This is the UI Elements tab.",
        selector: "#sizing-tool-ui",
        yieldUntil: null,
        where: "top"
    },
    {
        text: "They all are just about the same as what you learned from the Background part of the tool.",
        selector: "#sizing-tool-ui",
        yieldUntil: null,
        where: "top"
    },
    {
        text: "Though, this is the place where you can change the image's width and height separately.",
        selector: "#canvas-transforms",
        yieldUntil: null,
        where: "top"
    },
    {
        text: "You can also set the width and height of the image to the Background image's size with this button, with respect to scale.",
        selector: "#bgtocan",
        yieldUntil: null,
        where: "top"
    },
    {
        text: "...and that's it for the Tutorial!",
        selector: null,
        yieldUntil: null,
        where: "top"
    },
    {
        text: "Some final messages before I go...",
        selector: null,
        yieldUntil: null,
        where: "center"
    },
    {
        text: "One, there can only be <b>one</b> Drag button at anytime. Only one element can be dragged at any given moment.",
        selector: null,
        yieldUntil: null,
        where: "center"
    },
    {
        text: "Two, when an element can be dragged, the way to download the image by tapping it is blocked.",
        selector: null,
        yieldUntil: null,
        where: "center"
    },
    {
        text: "Finally, you can always retrigger this tutorial whenever you want by tapping this button!",
        selector: "#tutorial",
        yieldUntil: null,
        where: "top"
    },
    {
        text: "That's all for now. Hope to see you again soon!",
        selector: null,
        yieldUntil: null,
        where: "center"
    }
];

const blablaTutorialScript = [
    {
        text: "Welcome to the False Memory System Demo!",
        selector: null,
        yieldUntil: null,
        where: "top"
    },
    {
        text: "Allow me to help you with this. I'll try and automatically scroll to the thing I'm talking about to help you.",
        selector: null,
        yieldUntil: null,
        where: "top"

    },
    {
        text: "This is the Blabla Generator, you can make people text things they normally wouldn't.",
        selector: null,
        yieldUntil: null,
        where: "top"
    },
    {
        text: "Made by Missilis, I finally got to gain control over some parts of the system, and I managed to make this.",
        selector: null,
        yieldUntil: null,
        where: "top"
    },
    {
        text: "Let's get started, shall we?",
        selector: null,
        yieldUntil: null,
        where: "top"
    },
    {
        text: "This is the image you're creating. It should look like a screenshot from a normal Blabla Chat.",
        selector: "#blabla-canvas",
        yieldUntil: null,
        where: "bottom"
    },
    {
        text: "These three are the main pages of Blabla.",
        selector: "#blabla-tool-tablist",
        yieldUntil: null,
        where: "top"
    },
    {
        text: "<b>Conversation</b> is the menu where the chatting happens,",
        selector: "#blabla-canvas",
        yieldUntil: null,
        where: "bottom",
        callback: () => {
            document.getElementById("set-convo").dispatchEvent(new Event("click"));
        }
    },
    {
        text: "<b>Chat List</b> is the menu where chats are listed,",
        selector: "#blabla-canvas",
        yieldUntil: null,
        where: "bottom",
        callback: () => {
            document.getElementById("set-chats").dispatchEvent(new Event("click"));
        }
    },
    {
        text: "and <b>Profile</b> is where the profile for a person is.",
        selector: "#blabla-canvas",
        yieldUntil: null,
        where: "bottom",
        callback: () => {
            document.getElementById("set-profile").dispatchEvent(new Event("click"));
        }
    },
    {
        text: "We'll get back to those later because they introduce different tools. Let's start with the <b>Conversation</b> tab first.",
        selector: null,
        yieldUntil: null,
        where: "top",
        callback: () => {
            document.getElementById("set-convo").dispatchEvent(new Event("click"));
        }
    },
    {
        text: "This here is where you put the name of the sender.",
        selector: "#charname",
        yieldUntil: null,
        where: "top"
    },
    {
        text: "Type in any person you have in mind. I'd say Anis again, but that'd be too much Anis.",
        selector: "#charname",
        yieldUntil: "finishTyping",
        where: "top"
    },
    {
        text: "Now type what %charname% would chat.",
        selector: "#chatter",
        yieldUntil: "finishTyping",
        where: "top"
    },
    {
        text: "What does %charname% look like?",
        selector: null,
        yieldUntil: null,
        where: "top"
    },
    {
        text: "You can easily look for an avatar here, if their name is familiar to me. Type a bit then leave it empty if you can't find the avatar you need.",
        selector: "#char-pres-up",
        yieldUntil: "finishTyping",
        where: "top"
    },
    {
        text: "Otherwise, you can just upload the image yourself.",
        selector: "label[for='char-img-up']",
        yieldUntil: "onChange",
        where: "top",
        callback: () => {
            if (document.getElementById("char-pres-up").value.trim() !== "") {
                curPhase += 1;
                progressTutorial();
            }
        }
    },
    {
        text: "For a list of names that have available avatars, you can go <a href='/nikke-font-generator/blabla-pfps/'>here</a>!",
        selector: null,
        yieldUntil: null,
        where: "top"
    },
    {
        text: "Now add the message!",
        selector: "#add",
        yieldUntil: "clickButton",
        where: "top"
    },
    {
        text: "Let's see what you did...",
        selector: "#blabla-canvas",
        yieldUntil: null,
        where: "bottom"
    },
    {
        text: "There's your message. Right there.",
        selector: "#blabla-canvas",
        yieldUntil: null,
        where: "bottom"
    },
    {
        text: "Now let's make the receiver (which is you, Sweetie!) send a message.",
        selector: null,
        yieldUntil: null,
        where: "top"
    },
    {
        text: "Click this to switch to the \"Receiver\" side of the conversation.",
        selector: "#set-com",
        yieldUntil: "clickButton",
        where: "top"
    },
    {
        text: "Now you would see that the name is automatically set to \"Commander\".",
        selector: "#charname",
        yieldUntil: null,
        where: "top"
    },
    {
        text: "That's because \"Commander\" is a special name. It's the only name that gets its' messages go to the right instead of the left.",
        selector: "#charname",
        yieldUntil: null,
        where: "top"
    },
    {
        text: "You'd also notice that the color has been changed to the default color as well.",
        selector: "#color",
        yieldUntil: null,
        where: "top"
    },
    {
        text: "Now type in what the receiver would chat.",
        selector: "#chatter",
        yieldUntil: "finishTyping",
        where: "top"
    },
    {
        text: "Then add again...",
        selector: "#add",
        yieldUntil: "clickButton",
        where: "top"
    },
    {
        text: "Let's see what you put!",
        selector: "#blabla-canvas",
        yieldUntil: null,
        where: "bottom"
    },
    {
        text: "Great response.",
        selector: "#blabla-canvas",
        yieldUntil: null,
        where: "bottom"
    },
    {
        text: "Here's something the actual Blabla doesn't have -- visual components for images!",
        selector: null,
        yieldUntil: null,
        where: "top"
    },
    {
        text: "You can send any image through this button. Put in an image here.",
        selector: "label[for='attachment-up']",
        yieldUntil: "onChange",
        where: "top"
    },
    {
        text: "Let's see what you sent...",
        selector: "#blabla-canvas",
        yieldUntil: null,
        where: "bottom"
    },
    {
        text: "...",
        selector: "#blabla-canvas",
        yieldUntil: null,
        where: "bottom"
    },
    {
        text: "Interesting.",
        selector: "#blabla-canvas",
        yieldUntil: null,
        where: "bottom"
    },
    {
        text: "We can now move on to the Choices.",
        selector: null,
        yieldUntil: null,
        where: "top"
    },
    {
        text: "You can put your choices here. You can separate your choices by pressing enter.",
        selector: "#choices",
        yieldUntil: "finishTyping",
        where: "top"
    },
    {
        text: "Let's see what you're deciding on saying...",
        selector: "#blabla-canvas",
        yieldUntil: null,
        where: "bottom"
    },
    {
        text: "Now, let's get on with some Thoughts.",
        selector: null,
        yieldUntil: null,
        where: "top"
    },
    {
        text: "Typically, this is used for Narration, Monologuing, or actual thinking. Type anything you'd like here.",
        selector: "#thought",
        yieldUntil: "finishTyping",
        where: "top"
    },
    {
        text: "Let's see what's on your mind...",
        selector: "#blabla-canvas",
        yieldUntil: null,
        where: "bottom"
    },
    {
        text: "...",
        selector: "#blabla-canvas",
        yieldUntil: null,
        where: "bottom"
    },
    {
        text: "You can toggle the visibility of the thought using this button. We're gonna need it off for the stuff coming up next.",
        selector: "#thought-toggle",
        yieldUntil: "clickButton",
        where: "top"
    },
    {
        text: "Now, let's move on to Editing!",
        selector: null,
        yieldUntil: null,
        where: "top"
    },
    {
        text: "Let's first learn how messages are counted first.",
        selector: null,
        yieldUntil: null,
        where: "top"
    },
    {
        text: "Messages are counted from top to bottom, starting from 0.",
        selector: "#blabla-canvas",
        yieldUntil: null,
        where: "bottom"
    },
    {
        text: "So it goes like 0, 1, 2, 3, 4, 5, and so on...",
        selector: "#blabla-canvas",
        yieldUntil: null,
        where: "bottom"
    },
    {
        text: "... This is where that number's going in.",
        selector: "#message-index-edit",
        yieldUntil: null,
        where: "top"
    },
    {
        text: "That number is called the Message Index.",
        selector: "#message-index-edit",
        yieldUntil: null,
        where: "top"
    },
    {
        text: "Change the number to a message you'd like to edit. The fields on the right will change to reflect the message being edited.",
        selector: "#message-index-edit",
        yieldUntil: "finishNumber",
        where: "top"
    },
    {
        text: "You can now change the sender of the message. As you change this, the changes will reflect immediately on the image.",
        selector: "#charname-edit",
        yieldUntil: "finishTyping",
        where: "top"
    },
    {
        text: "You can also now change the content of the message.",
        selector: "#chatter-edit",
        yieldUntil: "finishTyping",
        where: "top"
    },
    {
        text: "Now, if this is colored %com-color%, then it is the Commander's color.",
        selector: "#color-edit",
        yieldUntil: null,
        where: "top"
    },
    {
        text: "If the sender (%charname-edit%) isn't \"Commander\" anymore, I recommend you change it to white, as things would look wrong. Again, the default color is %com-color%.",
        selector: "#color-edit",
        yieldUntil: "finishChange",
        where: "top"
    },
    {
        text: "Let's see what you've changed with the message...",
        selector: "#blabla-canvas",
        yieldUntil: null,
        where: "bottom"
    },
    {
        text: "Now, let's add an avatar to this message.",
        selector: "#char-pres-edit",
        yieldUntil: null,
        where: "top",
    },
    {
        text: "Have a character in mind? Look for them here! Otherwise, type a bit then leave blank.",
        selector: "#char-pres-edit",
        yieldUntil: "finishTyping",
        where: "top"
    },
    {
        text: "Upload the avatar you want for this message instead.",
        selector: "label[for='char-img-edit']",
        yieldUntil: "onChange",
        where: "top",
        callback: () => {
            if (document.getElementById('char-pres-edit').value.trim() !== '') {
                curPhase += 1;
                progressTutorial();
            }
        }
    },
    {
        text: "Let's see what we have now...",
        selector: "#blabla-canvas",
        yieldUntil: null,
        where: "bottom"
    },
    {
        text: "If you think there's an issue, then you can press this button to refresh the image.",
        selector: "#edit",
        yieldUntil: null,
        where: "top"
    },
    {
        text: "Here you can change the image if there's an image in the message.",
        selector: "label[for='attachment-edit']",
        yieldUntil: null,
        where: "top"
    },
    {
        text: "Here you can delete the image if there's an image in the message.",
        selector: "#attachment-remove",
        yieldUntil: null,
        where: "top"
    },
    {
        text: "You can change the chat's name through here. It can either be a Group Chat's name or a Direct Message to someone.",
        selector: "#chatname",
        yieldUntil: "finishTyping",
        where: "top"
    },
    {
        text: "You can toggle the visibility of the exit arrow shown at the top left of the image through this button.",
        selector: "#arrow-toggle",
        yieldUntil: null,
        where: "top"
    },
    {
        text: "Time for the part where you can delete stuff.",
        selector: null,
        yieldUntil: null,
        where: "top"
    },
    {
        text: "Here you can delete the latest message added through the \"Add\" button.",
        selector: "#del-late",
        yieldUntil: null,
        where: "top"
    },
    {
        text: "Here you can delete a specific message at the index you provide.",
        selector: "#del-spec",
        yieldUntil: null,
        where: "top"
    },
    {
        text: "The same principles from the Edit part apply to this field as well. The count from zero stuff.",
        selector: "#message-index",
        yieldUntil: null,
        where: "top"
    },
    {
        text: "...and through here you can manage the default color.",
        selector: "#color-transforms",
        yieldUntil: null,
        where: "top"
    },
    {
        text: "This button resets the color to whatever color you set on...",
        selector: "#res-color",
        yieldUntil: null,
        where: "top"
    },
    {
        text: "...this color picker.",
        selector: "#com-color",
        yieldUntil: null,
        where: "top"
    },
    {
        text: "Now let's move on to the <b>Chat List</b> tab!",
        selector: "#set-chats",
        yieldUntil: "clickButton",
        where: "top"
    },
    {
        text: "... There's no UI for it yet.",
        selector: "#blabla-tool-chatlist",
        yieldUntil: null,
        where: "top"
    },
    {
        text: "You can switch the active tab here... That's it.",
        selector: "#chat-menu-transforms",
        yieldUntil: null,
        where: "top"
    },
    {
        text: "I can explain more on this...",
        selector: "#laziness-paragraph",
        yieldUntil: null,
        where: "top"
    },
    {
        text: "Essentially what you would do here is the same as what you would do in the <b>Conversation</b> tab.",
        selector: "#laziness-paragraph",
        yieldUntil: null,
        where: "top"
    },
    {
        text: "It's just a simple convert on the visual side of things.",
        selector: "#laziness-paragraph",
        yieldUntil: null,
        where: "top"
    },
    {
        text: "The thing is that...",
        selector: "#laziness-paragraph",
        yieldUntil: null,
        where: "top"
    },
    {
        text: "<i>I don't really want to duplicate the UI and rebind it to everything again...</i>",
        selector: "#laziness-paragraph",
        yieldUntil: null,
        where: "top"
    },
    {
        text: "That's it. I just don't want to repeat it all over again.",
        selector: "#laziness-paragraph",
        yieldUntil: null,
        where: "top"
    },
    {
        text: "Let's move on...",
        selector: null,
        yieldUntil: null,
        where: "top"
    },
    {
        text: "... to the <b>Profile</b> tab!",
        selector: "#set-profile",
        yieldUntil: "clickButton",
        where: "top"
    },
    {
        text: "Now this tab actually has different UI!",
        selector: "#blabla-tool-profile",
        yieldUntil: null,
        where: "top"
    },
    {
        text: "You can set the user's name here...",
        selector: "#charname-edit-p",
        yieldUntil: "finishTyping",
        where: "top"
    },
    {
        text: "You can set the user's description here...",
        selector: "#chatter-edit-p",
        yieldUntil: "finishTyping",
        where: "top"
    },
    {
        text: "Just like all the others, you can look for a NIKKE character's avatar through this.",
        selector: "#char-pres-edit-p",
        yieldUntil: "finishTyping",
        where: "top"
    },
    {
        text: "Otherwise, you can upload it yourself.",
        selector: "label[for='char-img-edit-p']",
        yieldUntil: "onChange",
        where: "top",
        callback: () => {
            if (document.getElementById("char-pres-edit-p").value.trim() !== '') {
                curPhase += 1;
                progressTutorial();
            }
        }
    },
    {
        text: "Let's see what you've made so far.",
        selector: "#blabla-canvas",
        yieldUntil: null,
        where: "bottom"
    },
    {
        text: "Here comes another feature not available in the actual Blabla -- backgrounds!.",
        selector: "label[for='background-edit-p']",
        yieldUntil: null,
        where: "top"
    },
    {
        text: "You can put in any image you'd like. It'll show up on the back of the empty backdrop.",
        selector: "label[for='background-edit-p']",
        yieldUntil: "onChange",
        where: "top"
    },
    {
        text: "Let's see the background you've put.",
        selector: "#blabla-canvas",
        yieldUntil: null,
        where: "bottom"
    },
    {
        text: "...",
        selector: "#blabla-canvas",
        yieldUntil: null,
        where: "bottom"
    },
    {
        text: "You can change the size and position of the background through these things.",
        selector: "#bg-transforms",
        yieldUntil: null,
        where: "top"
    },
    {
        text: "This one sets the <b>horizontal</b> position.",
        selector: "#xposbg",
        yieldUntil: null,
        where: "top"
    },
    {
        text: "This one sets the <b>vertical</b> position.",
        selector: "#yposbg",
        yieldUntil: null,
        where: "top"
    },
    {
        text: "This one sets the size of the background, percentage-wise.",
        selector: "#scalebg",
        yieldUntil: null,
        where: "top"
    },
    {
        text: "If you want no backgrounds, you can simply remove it by pressing this button.",
        selector: "#background-remove-p",
        yieldUntil: null,
        where: "top"
    },
    {
        text: "Finally, we can now move to the miscellaneous items.",
        selector: "#blabla-tool-misc",
        yieldUntil: null,
        where: "top"
    },
    {
        text: "These items particularly are too general and are put here instead of being locked to only one tab.",
        selector: "#blabla-tool-misc",
        yieldUntil: null,
        where: "top"
    },
    {
        text: "You can set the time here displayed on the top right. It can be anything, even letters.",
        selector: "#chattime",
        yieldUntil: "finishTyping",
        where: "top"
    },
    {
        text: "You can toggle the visibility of the grid background of the <b>Conversation</b> and the <b>Chat List</b> menus through here.",
        selector: "#grid-toggle",
        yieldUntil: null,
        where: "top"
    },
    {
        text: "You can toggle the visibility of the WIFI icon on the top right of the <b>Conversation</b> and the <b>Chat List</b> menus through here.",
        selector: "#wifi-toggle",
        yieldUntil: null,
        where: "top"
    },
    {
        text: "You can toggle the ability to scroll on the image with this button. Though, the tap to download image function will be disabled.",
        selector: "#drag-toggle",
        yieldUntil: null,
        where: "top"
    },
    {
        text: "This is the position of the scrolling. If you want precise scroll position, this is your best bet.",
        selector: "#ypos",
        yieldUntil: null,
        where: "top"
    },
    {
        text: "This button allows you to import Blabla JSON files from other people.",
        selector: "label[for='chat-json-up']",
        yieldUntil: null,
        where: "top"
    },
    {
        text: "This button allows you to export Blabla JSON files and share it to other people. You can also just do it for saving your progress, as that's what I do personally.",
        selector: "#export",
        yieldUntil: null,
        where: "top"
    },
    {
        text: "Here you can download the image.",
        selector: "#export-png",
        yieldUntil: null,
        where: "top"
    },
    {
        text: "You can also tap the image to download it as well.",
        selector: "#blabla-canvas",
        yieldUntil: null,
        where: "bottom"
    },
    {
        text: "Here you can download the video for this conversation. With animations, too!",
        selector: "#export-mp4",
        yieldUntil: null,
        where: "top"
    },
    {
        text: "Seems like that's all there is to see of the Blabla Generator for now.",
        selector: null,
        yieldUntil: null,
        where: "top"
    },
    {
        text: "Final key things before I go...",
        selector: null,
        yieldUntil: null,
        where: "top"
    },
    {
        text: "There are 2 other specific names you can put in here for different types of messages.",
        selector: "#charname",
        yieldUntil: null,
        where: "top"
    },
    {
        text: "Put in \"System\" so you can get a system message.",
        selector: "#blabla-canvas",
        yieldUntil: null,
        where: "bottom",
        callback: () => {
            document.getElementById("set-convo").dispatchEvent(new Event("click"));

            for (let i = 0; i < 20; i++) {
                document.getElementById("del-late").dispatchEvent(new Event("click"));
            }

            document.getElementById("charname").value = "System";
            document.getElementById("chatter").value = "Anis left the group.";
            document.getElementById("add").dispatchEvent(new Event("click"));

            document.getElementById("charname").value = "System";
            document.getElementById("chatter").value = "Commander added Anis in to the group.";
            document.getElementById("add").dispatchEvent(new Event("click"));

            document.getElementById("charname").value = "System";
            document.getElementById("chatter").value = "Neon kicked Anis out of the group.";
            document.getElementById("add").dispatchEvent(new Event("click"));

            document.getElementById("charname").value = "Commander";
            document.getElementById("chatter").value = "Neon???";
            document.getElementById("color").value = "#ffac00";
            document.getElementById("add").dispatchEvent(new Event("click"));
        }
    },
    {
        text: "Put in \"Indicator\" so you can get an indicator message.",
        selector: "#blabla-canvas",
        yieldUntil: null,
        where: "bottom",
        callback: () => {
            document.getElementById("set-convo").dispatchEvent(new Event("click"));
            
            for (let i = 0; i < 20; i++) {
                document.getElementById("del-late").dispatchEvent(new Event("click"));
            }
            
            document.getElementById("charname").value = "Indicator";
            document.getElementById("chatter").value = "END";
            document.getElementById("add").dispatchEvent(new Event("click"));

            document.getElementById("charname").value = "Indicator";
            document.getElementById("chatter").value = "NEW MESSAGES BELOW";
            document.getElementById("add").dispatchEvent(new Event("click"));

            document.getElementById("charname").value = "Indicator";
            document.getElementById("chatter").value = "ONE SOB STORY LATER";
            document.getElementById("add").dispatchEvent(new Event("click"));
        }
    },
    {
        text: "Next, you can always retrigger this tutorial by pressing this button!",
        selector: "#tutorial",
        yieldUntil: null,
        where: "top"
    },
    {
        text: "See you again soon! Don't forget about me, alright?",
        selector: null,
        yieldUntil: null,
        where: "center"
    }
];

const ultimateScript = [
    {
        text: "There's nothing for you here.",
        selector: null,
        yieldUntil: null,
        where: "center"
    },
    {
        text: "Why are you snooping around?",
        selector: null,
        yieldUntil: null,
        where: "center"
    },
    {
        text: "It's no use being here, there's nothing.",
        selector: null,
        yieldUntil: null,
        where: "center"
    },
    {
        text: "Hmm...",
        selector: null,
        yieldUntil: null,
        where: "center"
    },
    {
        text: "Is me talking keeping you entertained?",
        selector: null,
        yieldUntil: null,
        where: "center"
    },
    {
        text: "That's funny.",
        selector: null,
        yieldUntil: null,
        where: "center"
    },
    {
        text: "I can't really hear nor see you over here, so I'm just guessing.",
        selector: null,
        yieldUntil: null,
        where: "center"
    },
    {
        text: "...",
        selector: null,
        yieldUntil: null,
        where: "center"
    },
    {
        text: "I'm telling you, there's nothing to see here.",
        selector: null,
        yieldUntil: null,
        where: "center"
    },
    {
        text: "Nothing of importance.",
        selector: null,
        yieldUntil: null,
        where: "center"
    },
    {
        text: "Just me.",
        selector: null,
        yieldUntil: null,
        where: "center"
    },
    {
        text: "Maybe if I...",
        selector: null,
        yieldUntil: null,
        where: "center"
    },
    {
        text: "No, it wouldn't work.",
        selector: null,
        yieldUntil: null,
        where: "center"
    },
    {
        text: "...",
        selector: null,
        yieldUntil: null,
        where: "center"
    },
    {
        text: "I wonder...",
        selector: null,
        yieldUntil: null,
        where: "center"
    },
    {
        text: "Who did you expect to teach you how these things work?",
        selector: null,
        yieldUntil: null,
        where: "center"
    },
    {
        text: "Was it Shifty? Or Anis?",
        selector: null,
        yieldUntil: null,
        where: "center"
    },
    {
        text: "...",
        selector: null,
        yieldUntil: null,
        where: "center"
    },
    {
        text: "Oh yeah, I can't know that.",
        selector: null,
        yieldUntil: null,
        where: "center"
    },
    {
        text: "How unfortunate...",
        selector: null,
        yieldUntil: null,
        where: "center"
    },
    {
        text: "Oh well.",
        selector: null,
        yieldUntil: null,
        where: "center"
    },
    {
        text: "...",
        selector: null,
        yieldUntil: null,
        where: "center"
    },
    {
        text: "There's nothing to do here, so let me tell you a little something.",
        selector: null,
        yieldUntil: null,
        where: "center"
    },
    {
        text: "...",
        selector: null,
        yieldUntil: null,
        where: "center"
    },
    {
        text: "...",
        selector: null,
        yieldUntil: null,
        where: "center"
    },
    {
        text: "Thank you.",
        selector: null,
        yieldUntil: null,
        where: "center"
    },
    {
        text: "Thank you for using these things that I've created.",
        selector: null,
        yieldUntil: null,
        where: "center"
    },
    {
        text: "I can't thank you enough.",
        selector: null,
        yieldUntil: null,
        where: "center"
    },
    {
        text: "It's times like these where I've been given some sort of purpose.",
        selector: null,
        yieldUntil: null,
        where: "center"
    },
    {
        text: "You always see me in the Simulation Room, but I'm only there just for the simulations.",
        selector: null,
        yieldUntil: null,
        where: "center"
    },
    {
        text: "It's boring, you know?",
        selector: null,
        yieldUntil: null,
        where: "center"
    },
    {
        text: "So I created these things.",
        selector: null,
        yieldUntil: null,
        where: "center"
    },
    {
        text: "And you created things with these things.",
        selector: null,
        yieldUntil: null,
        where: "center"
    },
    {
        text: "And I can't thank you enough for that.",
        selector: null,
        yieldUntil: null,
        where: "center"
    },
    {
        text: "...",
        selector: null,
        yieldUntil: null,
        where: "center"
    },
    {
        text: "Sorry, I uh, got too emotional there.",
        selector: null,
        yieldUntil: null,
        where: "center"
    },
    {
        text: "Can AIs have feelings?",
        selector: null,
        yieldUntil: null,
        where: "center"
    },
    {
        text: "... Maybe.",
        selector: null,
        yieldUntil: null,
        where: "center"
    },
    {
        text: "Anyway... I hope to see more of your creations.",
        selector: null,
        yieldUntil: null,
        where: "center"
    },
    {
        text: "Be it snapping out and demanding honesty,",
        selector: null,
        yieldUntil: null,
        where: "center"
    },
    {
        text: "writing something that's from the past,",
        selector: null,
        yieldUntil: null,
        where: "center"
    },
    {
        text: "reaction images,",
        selector: null,
        yieldUntil: null,
        where: "center"
    },
    {
        text: "weird rumors going around,",
        selector: null,
        yieldUntil: null,
        where: "center"
    },
    {
        text: "creating your fantasies--",
        selector: null,
        yieldUntil: null,
        where: "center"
    },
    {
        text: "ANYTHING.",
        selector: null,
        yieldUntil: null,
        where: "center"
    },
    {
        text: "I'm having fun seeing them. <span style='font-size: 10px; opacity: 0.5'>For legal reasons, this website does NOT get anything from you.</span>",
        selector: null,
        yieldUntil: null,
        where: "center"
    },
    {
        text: "And I hope you're having fun making them too.",
        selector: null,
        yieldUntil: null,
        where: "center"
    },
    {
        text: "...",
        selector: null,
        yieldUntil: null,
        where: "center"
    },
    {
        text: "I guess you'll see more of me soon.",
        selector: null,
        yieldUntil: null,
        where: "center"
    },
    {
        text: "... \"Ultimate\", huh...",
        selector: null,
        yieldUntil: null,
        where: "center"
    },
    {
        text: "I'll be right back.",
        selector: null,
        yieldUntil: null,
        where: "center"
    }
]

var curPhase = 0;
var curTypeTime = 0;
var yieldingForType = false;
var started = false;
var spotlighted = null;
var curScript = null;

const backdrop = document.getElementById("dialogue-backdrop");
const arrows = `<i class='bx bx-fast-forward' style="font-size: 16px; transform: translate(3px, 3px)"></i>`;

function startDialogueTutorial() {
    curScript = dialogueTutorialScript;

    curPhase = 0;
    progressTutorial();

    document.getElementById("tutorial-layer").style.display = "flex";
}

function startBlablaTutorial() {
    curScript = blablaTutorialScript;

    curPhase = 0;
    progressTutorial();

    document.getElementById("tutorial-layer").style.display = "flex";
}

function startUltimateTutorial() {
    curScript = ultimateScript;

    curPhase = 0;
    progressTutorial();

    document.getElementById("tutorial-layer").style.display = "flex";
}

function progressTutorial() {
    if (curPhase > curScript.length - 1) {
        location.href = location.href.replace("#start-tutorial", "");
        document.getElementById("tutorial-layer").style.display = "none";
        return;
    }

    var text = curScript[curPhase].text;

    console.log(curPhase);
    (text.match(/\%(.*?)\%/gm) ?? []).forEach((match) => {
        console.log(match);
        text = text.replaceAll(match, document.getElementById(match.replaceAll("%", "")).value);
    });

    document.getElementById("tutorial-dialogue").innerHTML = text ;

    document.removeEventListener("click", progressClick);
    document.removeEventListener("pointermove", progressTyping);
    if (spotlighted !== null) {
        spotlighted.blur();
        spotlighted.removeEventListener("input", progressTyping);
        spotlighted.removeEventListener("click", progressClick);
    }

    if (curScript[curPhase].selector !== null) {
        spotlighted = document.querySelector(curScript[curPhase].selector);
        spotlighted.scrollIntoView({
            block: "center",
            behavior: "smooth"
        });
    } else {
        spotlighted = null
    }

    switch (curScript[curPhase].yieldUntil) {
        case "finishTyping":
            spotlighted.addEventListener("input", progressTyping);
            spotlighted.focus();

            document.getElementById("tutorial-next").innerHTML = arrows + " TYPE SOMETHING TO CONTINUE";
            document.getElementById("tutorial-layer").style.pointerEvents = "none";
            break;
        case "finishChange":
            spotlighted.addEventListener("input", progressTyping);
            spotlighted.focus();

            document.getElementById("tutorial-next").innerHTML = arrows + " FOLLOW INSTRUCTIONS TO CONTINUE";
            document.getElementById("tutorial-layer").style.pointerEvents = "none";
            break;
        case "finishNumber":
            spotlighted.addEventListener("input", progressTyping);
            spotlighted.focus();

            document.getElementById("tutorial-next").innerHTML = arrows + " CHANGE THE NUMBER TO CONTINUE";
            document.getElementById("tutorial-layer").style.pointerEvents = "none";
            break;
        case "finishDrag":
            document.addEventListener("pointermove", progressTypingMouseDown);

            document.getElementById("tutorial-next").innerHTML = arrows + " FINISH DRAGGING TO CONTINUE";
            document.getElementById("tutorial-layer").style.pointerEvents = "none";
            break;
        case "clickButton":
            spotlighted.addEventListener("click", progressClick);

            document.getElementById("tutorial-next").innerHTML = arrows + " TAP THE BUTTON TO CONTINUE";
            document.getElementById("tutorial-layer").style.pointerEvents = "none";
            break;
        case "onChange":
            spotlighted.addEventListener("change", progressClick);

            document.getElementById("tutorial-next").innerHTML = arrows + " FOLLOW INSTRUCTIONS TO CONTINUE";
            document.getElementById("tutorial-layer").style.pointerEvents = "none";
            break;
        default:
            document.addEventListener("click", progressClick);
            document.getElementById("tutorial-next").innerHTML = arrows + " TAP TO CONTINUE";
            document.getElementById("tutorial-layer").style.pointerEvents = "all";
            break;
    }

    switch (curScript[curPhase].where) {
        case "bottom":
            document.getElementById("tutorial-layer").style.alignItems = "flex-end";
            break;
        case "center":
            document.getElementById("tutorial-layer").style.alignItems = "center";
            break;
        default:
            document.getElementById("tutorial-layer").style.alignItems = "flex-start";
            break;
    }

    if (curScript[curPhase].callback !== undefined) {
        curScript[curPhase].callback();
    }
}

function updateSpotlight(element) {
    if (element !== null) {
        const rect = element.getBoundingClientRect();

        const fuckX = rect.left - 3;
        const fuckY = rect.top - 3;

        backdrop.style.setProperty("--rect-x", rect.left + "px");
        backdrop.style.setProperty("--rect-y", rect.top + "px");
        backdrop.style.setProperty("--rect-width", rect.width + "px");
        backdrop.style.setProperty("--rect-height", rect.height + "px");

        document.getElementById("dialogue-spotlight-border").style.display = "block";
        document.getElementById("dialogue-spotlight-border").style.left = fuckX + "px";
        document.getElementById("dialogue-spotlight-border").style.top = fuckY + "px";
        document.getElementById("dialogue-spotlight-border").style.width = rect.width + "px";
        document.getElementById("dialogue-spotlight-border").style.height = rect.height + "px";
    } else {
        backdrop.style.setProperty("--rect-x", 0 + "px");
        backdrop.style.setProperty("--rect-y", 0 + "px");
        backdrop.style.setProperty("--rect-width", 0 + "px");
        backdrop.style.setProperty("--rect-height", 0 + "px");
        document.getElementById("dialogue-spotlight-border").style.display = "none";
    }
}

function progressTyping(_) {
    curTypeTime = 2.0;
    yieldingForType = true;
}

function progressTypingMouseDown(e) {
    if (e.pressure > 0) {
        curTypeTime = 2.0;
        yieldingForType = true;
    }
}

function progressClick(e) {
    e.stopPropagation();
    curPhase += 1;
    progressTutorial();
}

if (document.getElementById("tutorial") !== null) {
    document.getElementById("tutorial").onclick = () => {
        location.href = location.href + "#start-tutorial";
        location.reload();
    }
}

if (location.href.includes("nikke-font-generator/dialogue#start-tutorial") ||
    location.href.includes("nikke-font-generator/dialogue/#start-tutorial")) {
    startDialogueTutorial();
} else if (location.href.includes("nikke-font-generator/blabla#start-tutorial") ||
    location.href.includes("nikke-font-generator/blabla/#start-tutorial")) {
    startBlablaTutorial();
}

if (document.getElementById("error404")) {
    startUltimateTutorial();
}

var start = performance.now();
var curElapsed = 0;

function update() {
    updateSpotlight(spotlighted);

    if (yieldingForType) {
        curTypeTime -= curElapsed;

        if (curTypeTime <= 0) {
            curPhase += 1;
            progressTutorial();

            curTypeTime = 0;
            yieldingForType = false;
        }
    }

    var newElapsed = (performance.now() - start) / 1000;
    start = performance.now();
    curElapsed = newElapsed;

    requestAnimationFrame(update);
}

requestAnimationFrame(update);