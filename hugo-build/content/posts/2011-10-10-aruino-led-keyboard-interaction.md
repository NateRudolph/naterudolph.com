---
title: 'Arduino LED Keyboard Interaction'
date: 2011-10-10T20:29:26-04:00
categories: [hardware]
---

{{< vimeo id="30289104" >}}

I wrote some code in Arduino (adapted from code I found in a forum at: arduino.cc/​cgi-bin/​yabb2/​YaBB.pl?num=1241706282) that allows the user to turn a yellow LED on (by pressing Q) and off (by pressing W).

I tried to get A and S to work the other red LED but for some reason it wasn’t responding. Something to revisit. I didn’t realize until I got into things that the Arduino board isn’t actually always listening to the keyboard input like a Processing sketch would be. You have to open the Serial Monitor window and send it certain keystrokes.

I’m definitely interested in delving further into interactions with the Arduino board. I’d love to be able to have some sort of controller through an internet connection manipulated by an iPhone. Baby steps… For know I just added a physical switch to operate the red LED.

{{< image src="arduino-keyboard-interaction.jpg" layout="media--full" alt="Arduino and breadboard" >}}
