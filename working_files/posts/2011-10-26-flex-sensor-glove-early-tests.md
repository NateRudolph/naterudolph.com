---
layout: single-article
title: 'FlexSensor Glove: Early Tests'
categories: [hardware]
draft: true
---

{% include vimeoPlayer.html id="31157135" %}

I’ve made some pretty significant steps in the FlexSensor Glove since the last post. The LED is now mounted to the finger tip, and the cords are soldered and wrapped neatly coming out of the glove to keep things from getting shorted or confusing when hooking up to the Arduino.

The code itself also has added the video element. My main goal was to be able to virtually click and drag things with the glove using the webcam as a point of entry. Instead of touching a track pad for instance, the user can bend their finger and two things happen. The LED lights up and tells the computer it is lit, and then starts drawing a purple circle at the coordinates of the LED. When the finger is unbent, the LED turns off and the computer quits tracking, in addition to leaving a darkened circle where it was last pointed to. (To clear up any confusion, here’s a video of it all happening.)

To make this usable for manipulating programs there needs to be an ‘off state’ that still tracks the hand. That way the user can move their hand and still see something, without actually manipulating any objects they’ve created. Then, there needs to be a way to check what the user has ‘clicked’ on, by checking the distance from their initial bent state and the existing object. If the distance is larger than the bounding box of the object, then the object’s coordinates shouldn’t be updated.

Once those elements are present, the actual video feed can change from a live webcam, to a user interface that is more conducive to manipulating graphic elements.

For those interested, I’ve included the source code used:

## Processing:

{% highlight java %}

/_
nate rudolph
CC Lab - 10/24/11
_/

/_ Color Tracking sketch from:
Learning Processing
Daniel Shiffman
http://www.learningprocessing.com
Example 16-11: Simple color tracking
_/

import processing.video._;
import processing.serial._;

// Variable to open Serial communication with Arduino
Serial myPort;
float flexFloat;

// Variable to save the most recent ellipse
int lastX;
int lastY;

// Boolean to create the click and drag illusion
boolean isClickClose = true;
float distance;

// Variable for capture device
Capture video;

// A variable for the color we are searching for.
color trackColor;

void setup() {
size(640, 480);
video = new Capture(this, width, height, 30);
// Start off tracking for purple light from LED
trackColor = color(60, 0, 213);
smooth();

myPort = new Serial(this, Serial.list()[0], 9600);
myPort.bufferUntil('\n');
}

void serialEvent (Serial myPort) {
String flexString = myPort.readStringUntil('\n');
if (flexString != null) {
flexString = trim(flexString);
flexFloat = float(flexString);
//println(flexFloat);
}
}

void draw() {

//println(flexFloat);

// Capture and display the video
if (video.available()) {
video.read();
}
video.loadPixels();
image(video, 0, 0);

// Before we begin searching, the "world record" for closest color is set to a high number that is easy for the first pixel to beat.
float worldRecord = 500;

// XY coordinate of closest color
int closestX = 0;
int closestY = 0;

// Begin loop to walk through every pixel
for (int x = 0; x < video.width; x ++ ) {
for (int y = 0; y < video.height; y ++ ) {
int loc = x + y\*video.width;
// What is current color
color currentColor = video.pixels[loc];
float r1 = red(currentColor);
float g1 = green(currentColor);
float b1 = blue(currentColor);
float r2 = red(trackColor);
float g2 = green(trackColor);
float b2 = blue(trackColor);

      // Using euclidean distance to compare colors
      float d = dist(r1, g1, b1, r2, g2, b2); // We are using the dist( ) function to compare the current color with the color we are tracking.

      // If current color is more similar to tracked color than
      // closest color, save current location and current difference
      if (d < worldRecord) {
        worldRecord = d;
        closestX = x;
        closestY = y;
      }
    }

}

// We only consider the color found if its color distance is less than 10.
// This threshold of 10 is arbitrary and you can adjust this number depending on how accurate you require the tracking to be.
if (worldRecord < 15) {

 // check to see if initial click is close enough to old
if (isClickClose){

 // Draw a circle at the tracked pixel (only when flex is active)
if (flexFloat < 70) {
fill(trackColor);
strokeWeight(10.0);
stroke(0);
ellipse(closestX, closestY, 50, 50);
}

    lastX = closestX;
    lastY = closestY;

}
}

// Here the circle keeps getting drawn when the flex is not on

if (flexFloat > 70) {
pushMatrix();
fill(trackColor-150);
strokeWeight(5.0);
stroke(0);
ellipse(lastX, lastY, 45, 45);
popMatrix();
//isClickClose = false;
}

//float distance = dist(lastX,lastY,closestX,closestY);
//if (distance < 30){
// isClickClose = true;
//}

}

// Original Sketch featured the option to click on a pixel
// and track that new color. Since I'm using the same LED each time
// I commented this part out.
/*
void mousePressed() {
// Save color where the mouse is clicked in trackColor variable
int loc = mouseX + mouseY*video.width;
trackColor = video.pixels[loc];
}
\*/

{% endhighlight %}

## Arduino

{% highlight java %}
/_
nate rudolph
CC Lab - 10/14/11
/_

Huge thanks to the following website:
http://arduinobasics.blogspot.com/2011/05/arduino-uno-flex-sensor-and-leds.html#comment-form
It was one of the few sites that had tons of documentation for how to hook up a flex sensor.
Including a lot of the code seen below.

Flex Sensor and LEDs created by ScottC on 23rd May 2011

\*/

//Flex Sensor Pin (flexPin)
//the analog pin the Flex Sensor is connected to
int flexPin = 1;
const int LEDPin = 7;

boolean isFlexOn = false;

void setup() {
Serial.begin(9600);
pinMode(LEDPin, OUTPUT);
}

void loop(){

/_ Read the flex Level
Adjust the value 130 to 275 to span 4 to 13
The values 130 and 275 may need to be widened to suit
the minimum and maximum flex levels being read by the
Analog pin _/
int flexLevel = map(analogRead(flexPin), 130, 275, 0, 100);

Serial.println(flexLevel);

// digitalWrite(LEDPin, HIGH);

if (flexLevel < 70){
digitalWrite(LEDPin, HIGH);
isFlexOn = true;
}
else {
digitalWrite(LEDPin, LOW);
isFlexOn = false;
}
}

{% endhighlight %}
