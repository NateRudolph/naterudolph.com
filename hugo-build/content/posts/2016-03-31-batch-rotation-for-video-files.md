---
title: 'Batch rotation for video files'
categories: [code]
promo: true
featuredImage: "hand.jpg"
tags: redrock, lens, ffmpeg, batch, video
---

{{< image "test.jpg" full >}}

{{< highlight html >}}

<section id="main">
  <div>
   <h1 id="title">{{ .Title }}</h1>
    {{ range .Data.Pages }}
        {{ .Render "summary"}}
    {{ end }}
  </div>
</section>
{{< /highlight >}}

I recently had a collection of videos I wanted to start editing that needed to be rotated by 180 degrees because they were originally shot on a Redrock lens that flips the image upside down. The files were all uncompressed movs so I wanted a way to also convert everything to mp4 in one step.

In days past I would open up Premiere and make a new sequence for each one, rotate the video by hand, and then render it out with the same name in a different directory. The process was always a bit daunting because there were several dozen and I always assumed there would be a better way to do it.

There is!

{% highlight sh %}

#!/bin/bash

# by Nate Rudolph

# Uses ffmpeg to rotate a collection of videos (mov) by 180 degrees

# Loop through all movs in current directory

for vid in \*.mov ; do

# Create variable for new filename with new extension

newfilename=${vid%.\*}\_r.mp4

# Use original video as input, rotate by PI (180 degrees), save as new file

ffmpeg -i $vid -vf "rotate=PI:bilinear=0" $newfilename

done

{% endhighlight %}

[(Link on Github)](https://gist.github.com/NateRudolph/b54f95c0f735df9af5194dd23990074e)

This assumes you have ffmpeg installed, which can be done relatively easily with something like Homebrew. Check out [this link](http://www.renevolution.com/how-to-install-ffmpeg-on-mac-os-x/) if none of that makes sense.

Enjoy!
