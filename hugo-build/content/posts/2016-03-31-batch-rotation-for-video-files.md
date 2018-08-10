---
title: 'Batch rotation for video files'
date: 2016-03-31T14:49:24-04:00
categories: [code]
featuredImage: "hand.jpg"
excerpt: "I recently had a collection of videos I wanted to start editing that needed to be rotated by 180 degrees because they were shot on a Redrock lens..."
tags: redrock, lens, ffmpeg, batch, video
---

I recently had a collection of videos I wanted to start editing that needed to be rotated by 180 degrees because they were shot on a Redrock lens that flips the image upside down. The files were all uncompressed movs so I wanted a way to also convert everything to mp4 in one step.

In days past I would open up Premiere and make a new sequence for each one, rotate the video by hand, and then render it out with the same name in a different directory. The process was a bit daunting given there were several dozen and I always assumed there would be a better way to do it.

There is!

{{< highlight sh >}}
#!/bin/bash
# by Nate Rudolph
# [Github](https://gist.github.com/NateRudolph/b54f95c0f735df9af5194dd23990074e)
# Uses ffmpeg to rotate a collection of videos (mov) by 180 degrees
# Loop through all movs in current directory
for vid in \*.mov ; do
# Create variable for new filename with new extension
newfilename=${vid%.\*}\_r.mp4
# Use original video as input, rotate by PI (180 degrees), save as new file
ffmpeg -i $vid -vf "rotate=PI:bilinear=0" $newfilename
done
{{< /highlight >}}

Copy/paste the above snippet into a new file and save it with the ending `.sh`. Make sure to do that in a regular text editor not something like Word or Pages. Then you can move that file to the folder with all your videos you want to rotate. The script doesn't really have any logic built into it so it'll just blindly run the process on any .mov file in that directory. Which could take awhile if there are quite a few.

To kick off the process you can open Terminal, move to that folder, and run the script by typing: `sh name-of-script.sh`
 
This assumes you have ffmpeg installed, which can be done relatively easily with something like Homebrew. Check out [this link](https://www.oodlestechnologies.com/blogs/Easiest-Way-To-Install-FFmpeg-On-Mac-OS-X) if none of that makes sense.

Enjoy!
