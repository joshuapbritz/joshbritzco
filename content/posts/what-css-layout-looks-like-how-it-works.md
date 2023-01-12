---
title: "What CSS Layout Looks Like and How it Works"
date: 2023-01-12T08:28:29+02:00
draft: false
tags: ["Workflow", "Team"]
headerUrl: "images/css-layout.jpeg"
---

Recently I have been updating the documentation site for my company's component library, which has included making the documentation mobile friendly. While doing so, I employed the age old technique of adding a pink outline to every single element on my page so that I could see how different elements where interacting with each other.

![Example box layout](/images/css-layout/fig1.png "Example box layout")

Such a debugging style can help front-end developers visualise something called the box model, which is the method that CSS (the language we use to style things) uses to apply styles to things. You can think of each element on a website as being in a box. Don't worry about the exact shape though, cause these box can have rounded corners or could even be circular. However, the hard and fast rule with any CSS element is that you will always be able to draw a box around it that touches it on every side.

This is something we refer to as the box model and it forms the backbone of the entire internet. To build a web page, we "stack" these boxes in or around each other in order to get the exact layout we want. These boxes are defined using the HTML language, which many may be familiar with. An example of these boxes being defined might look like this:

![Example box layout](/images/css-layout/fig2.png "Example box layout")

Looking at that image, you should be able to see that each one of the pink boxes on the right corresponds with one of the tags we have on the left. The <article> tag corresponds with the large pink box that goes around the whole section and so on. This is the bare essential concept behind web development. 

Of course, this might seem either overly simple or might seem to be very limited in what it allows you to do. Surprisingly though, this allows us to some pretty epic things. One reason for this is each of these boxes are relative to each other. This basically means that the elements on a page are not like paint on a canvas that can be layered on top of itself and has an absolute position to the canvas it is on. Rather, each box is affected by the other boxes around it - kinda like lego. That is not to say that these boxes can never be layer or that they can never overlap, because they definitely can. The important point is that they are positions relative to each other rather that to the canvas (computer screen) they are on. 

Here is a simple example on my own website.

![Example box layout](/images/css-layout/fig3.png "Example box layout")

![Example box layout](/images/css-layout/fig4.png "Example box layout")

This is quite a simple layout. The text is contained in a dark grey box, with each section of text taking up its own box. However, notice the two "flair" elements - the green square and the white square with the next section's title. These are also boxes, but they have been pushed out of the normal layout they should be in. They are still positioned relatively to the dark grey box they are in, but they pretty much completely outside of the box they should be in.

Now, you might wonder why on earth CSS works like this. After all, wouldn't it be easier if everything was positioned on the page as if they were paint on a canvas. Wouldn't that make it much easier to create graphical master pieces with more flexibility and finesse. I can only think of one appropriate answer to this.

![Example box layout](/images/css-layout/fig5.gif "Example box layout")

You see, unlike a painting on a canvas, the designs on a website have to work on an almost infinite amount of screen sizes. Web developers can never guarantee what size screen their website will be viewed on - it could be anything from a tiny smartphone screen to a humungous ultrawide monitor to anything in-between. And of course, websites are not works of art; websites are functional tools. People who visit the website need to be able to read the information on the page and take action based on that information. The design of the page is simply a "funnel" that guides the users to the correct actions that they can take. 

Because of this, websites do not scale to fit screen sizes. Instead they are responsive, which means that they react to the different sized screens and know how to lay themselves out base on that information. Of course, they do not actually know this - developers spend many hours defining and tweaking pages so that they react the correct way. That aside, the basics are that website don't scale. Below are two examples of a website that is rendered on a laptop screen and a smartphone screen. In the first example the website is scaled and in the second, the website is responsive.

![Example box layout](/images/css-layout/fig6.png "Example box layout")
*An example of a scaled website*

![Example box layout](/images/css-layout/fig7.png "Example box layout")
*An example of a responsive website*

The difference here should be quite clear. The second example is much nicer to read on the mobile version. This is because the text knows how to respond to the different screen sizes and makes itself smaller to fit. This is possible because the elements on the page are positioned relative to each other rather than in an absolute position on the page. Because of this, the content can push and flex itself to fit its container. The above example with absolutely positioned content has to scale down in order to remain positioned correctly. 

In a nutshell, this is how web pages are built, though things can get a lot more complicated. If you realise that every single element on a website is built with this box model, you will start to realise the tom-jiggery that goes on to get things to look correct. Below are two example from the component documentation is was working on.

![Example box layout](/images/css-layout/fig8.png "Example box layout")

On the surface these might look quite simple and clean. On a design level, they are not overly complicated. However, try to think about how these charts would be broken up into boxes. Suddenly what seems like a simple component becomes quite complex. Below is the same image but with the boxes outlined.

![Example box layout](/images/css-layout/fig9.png "Example box layout")

I hope this little crash course into CSS has been somewhat enlightening. It is certainly not a comprehensive course in the topic, but maybe it has helped you get a slightly better understanding of how things work on the internet. 