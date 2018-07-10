---
title: 'Git Aliases'
date: 2018-02-03T23:27:13-05:00
categories: ["code", "video"]
draft: true
featuredImage: "test.jpg"
---

It's been my experience that with most new things you learn, even if it's a gradual process, there's a distinct moment when it all clicks. I can remember sitting on the couch running git commands from the terminal to revert my work and just marveling at how cool it felt.

That wore off pretty quickly, and after typing `git status` for the 16,423,325th time I decided I was ready to commit to some git aliases.

For the first 5 I settled on the ones I use the most: `status`, `push`, `pull`, `log`, and of course `commit`. Creating the aliases was actually simpler than I had imagined when I first heard it was a thing. Just typing each of these lines one at a time and you'll have all you need to get up and running.

{{< highlight sh >}}
git config --global alias.st status
git config --global alias.ps push
git config --global alias.p pull
git config --global alias.lo "log --oneline"
git config --global alias.ca "commit -am"
{{< /highlight >}}

After having used those for a few days I Googled around a bit to see how other people were using them. As with most things git and bash, there are infinite rabbit holes to go down. [This article](http://durdn.com/blog/2012/11/22/must-have-git-aliases-advanced-examples/) in particular made me realize there's still plenty to learn that's way over my head. I did grab one from that site that I liked, to print out all the aliases I have on the global space, as I'm sure I'll start to forget them occasionally as list grows:

{{< highlight sh >}}
git config --global alias.la "!git config -l | grep alias | cut -c 7-"
{{< /highlight >}}

I actually had an issue just pasting that one into Terminal, something to do with the ! getting escaped maybe? You can open the file where these are actually getting saved by running `open $HOME/.gitconfig` which has all the global git settings. Pasting the quoted portion after the `la` fixed the issue for me so I can now run `git la` to print out the list of aliases.
