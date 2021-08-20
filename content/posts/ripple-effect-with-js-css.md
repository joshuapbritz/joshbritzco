---
title: "Create a Material Style Ripple Effect With JavaScript and CSS"
subtitle: "Add some style to your clicks using material designs ripple effect"
date: 2021-08-20T09:22:15+02:00
draft: false
headerUrl: "/images/ripple.png"
---

Possibly one of the most iconic designs patterns to come out of Google's material design is the ripple effect. It is such a simple interaction, but feels so satisfying to use. It gives a user really good context of what action they have taken in your application and, let face it, it just looks really cool. Now, if you are using a framework that is build by Google (such as Angular Material, Material Flutter, or their native Android Toolkit), you have probably not had to worry about adding this interaction to your code. However, if you are using, or building, your own framework or tooling, you may want to consider adding a ripple effect to your belt. 

For such a simple interaction, this effect can be a little bit tricky to code up. Fear not, I have your back. Having recently found myself having to do just this for a project I was working on, I want to share a quick guide on how to build your own ripple effect.

### Getting things rolling
Naturally, the first thing you are going to need is a project in which you are going to create this tool. Because I want this to be applicable to anyone reading this, I am going to be using a plain JS, HTML, and CSS project as an example. If you are using something like Angular or React, stick around till the end where I will give some tips for integrating this code with them. For now, I'm going to setup the basics.

First off, I am going to create an `index.html` file. The basic code will look like this:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ripple Effect</title>
</head>
<body>
    <button>Click Me</button>
</body>
</html>
```

Next, we are going to need some basic css styles for the project. If you are using an already existing project, it is likely that you won't need to do this step. I'm going to first create an `index.css` file and add it to my html file.

```html
...
<link rel="stylesheet" href="./index.css">
...
```

In my CSS file, I am going to add the following code to get things going. I am not going to bother trying to explain what's going on as it is not pertinent to this tutorial. All you need to know is that it is just giving us a canvas to work on.

```css
/* Set the box-sizing and font for the project */
*,
*::before,
*::after {
  box-sizing: border-box;
  outline: none;
  font-family: Arial, Helvetica, sans-serif;
}

/* Remove the unneeded margin on the body and make it the app container */
body {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 0;
  background-color: hsl(34, 78%, 91%);
}

/* Create a basic Button style */
button {
  font-family: Arial, Helvetica, sans-serif;
  display: block;
  line-height: 50px;
  padding: 0 80px;
  border: solid 2px hsl(0, 0%, 6%);
  color: hsl(0, 0%, 6%);
  text-transform: uppercase;
  cursor: pointer;
  font-size: 30px;
  font-weight: lighter;
  background-color: hsl(34, 78%, 91%);
  border-radius: 5px;
}

button:hover {
  background-color: hsla(0, 0%, 6%, 0.05);
}
```

Finally, we need to create a JavaScript file. This will be where most of our coding today will happen. I'm going to just create a file called `index.js` and link it to my html file.

```html
...
<script async src="./index.js"></script>
...
```

### What's first?
The first thing we need to do is create a way of identifying elements in our page that should have the ripple effect. To do this, we are going to use a custom attribute, `[data-ripple]`. This will be used to listen for events, and to add styling to our ripple and to the elements that will hold the ripple. Let's update the button on our page with the following code.

```html
<button data-ripple>Click Me</button>
```

And in our JavaScript, let's listen for the mousedown event on any element with that attribute.

```javascript
(() => {
    const rippleHosts = document.querySelectorAll('[data-ripple]');

    for (const host of rippleHosts) {
        host.addEventListener('mousedown', () => { 
            console.log('MouseDown Event');
        });
    }
})()
```

This will look for every element with the `[data-ripple]` attribute, and will listen for mousedowns on that element. We can now make use of that event and add some ripple effects. To do this, there is some stuff we need to figure out. The first thing we need to figure out is where in the button the user clicked. Unfortunately, this is a little more complicated than one would think. As part of the mousedown event, we do get the X and Y position of the point. The problem is that we get its position in the window and not relative to the element that was clicked. Fear not though, we can do a bit of math to figure things out. Let's start by getting the position of the clicked element and the X and X of the user's cursor.

```javascript
...
for (const host of rippleHosts) {
    host.addEventListener('mousedown', (event) => {
        const rect = host.getBoundingClientRect();
        const cursorX = event.clientX;
        const cursorY = event.clientY;

        console.log(cursorX, cursorY, rect);
    });
}
...
```

This gives us all the data we need in order to figure out where in the element the user clicked. First off, let's work out where the user clicked on the Y axis. To do this we will take the mouses Y position in the window (`cursorY`) and subtract the distance between our element and the top of the window (`rect.top`). This will tell us how far from the top of the element the user clicked. With this data, we can also figure out how far from the bottom of the element the user clicked.

```javascript
...
for (const host of rippleHosts) {
    host.addEventListener('mousedown', (event) => {
        const rect = host.getBoundingClientRect();
        const cursorX = event.clientX;
        const cursorY = event.clientY;

        const fromTop = cursorY - rect.top;
        const fromBottom = rect.height - fromTop;

        console.log(fromTop, fromBottom);
    });
}
...
```

The process for the X axis is almost identical. We will subtract the distance between the edge of the window and our element (`rect.left`) from the X position of the cursor (`cursorY`). Using that, we can figure our the cursor's distance from the left and right of our element.

```javascript
...
for (const host of rippleHosts) {
    host.addEventListener('mousedown', (event) => {
        const rect = host.getBoundingClientRect();
        const cursorX = event.clientX;
        const cursorY = event.clientY;

        const fromTop = cursorY - rect.top;
        const fromBottom = rect.height - fromTop;
        const fromLeft = cursorX - rect.left;
        const fromRight = rect.width - fromLeft;

        console.log(fromTop, fromBottom, fromLeft, fromRight);
    });
}
...
```

If you click on your button now, you should see the various values we calculated are being logged to the console. You will notice that the closer to the center you are, the more similar the values will be. However, as you move to the extremes of the element, you will see that they will become more different. 

So, what's the next step? Well, we now need to figure out where to place our ripple and how big it should be. To do this, we are going to create a function that will generate a div.

```javascript
(() => {
    const rippleHosts = document.querySelectorAll('[data-ripple]');

    function generateRipple() {}

    for (const host of rippleHosts) {
        ...
    }
})()
```

We now just need to add some code to that function. First of all, we will add some parameters. The parameters we will need are `rippleX`, `rippleY`, and `rippleDimensions`. Using these, we can create and return a div element.

```javascript
...
function generateRipple(rippleX, rippleY, rippleDimensions) {
    const div = document.createElement('div');
    div.className = 'ripple-pad';

    div.style.width = `${rippleDimensions}px`;
    div.style.height = `${rippleDimensions}px`;
    
    div.style.left = `${rippleX}px`;
    div.style.top = `${rippleY}px`;
    
    div.style.borderRadius = `${rippleDimensions}px`;

    return div;
}
...
```

Now, we can wire this function into our code to get our ripple element. Before we do that, we do need to calculate the position of the ripple. To do this, we need to figure out whether our `fromTop` or `fromBottom` is bigger, and if our `fromLeft` or `fromRight` is bigger. We will use the biggest value to calculate the radius of the ripple. That way, the ripple will always be just the right size for the element. Once we know the radius of the ripple, we can create it and place it into our DOM.

```javascript
...
for (const host of rippleHosts) {
    host.addEventListener('mousedown', (event) => {
        const rect = host.getBoundingClientRect();
        const cursorX = event.clientX;
        const cursorY = event.clientY;

        const fromTop = cursorY - rect.top;
        const fromBottom = rect.height - fromTop;
        const fromLeft = cursorX - rect.left;
        const fromRight = rect.width - fromLeft;

        const requiredDimension = Math.ceil(Math.max(fromRight, fromLeft, fromTop, fromBottom));
        const ripple = generateRipple(fromLeft - requiredDimension, fromTop - requiredDimension, requiredDimension * 2);
        host.appendChild(ripple);

        console.log(fromTop, fromBottom, fromLeft, fromRight, requiredDimension);
    });
}
...
```

To make sure you can see the ripple for now, we will add the following line of code to our `index.css` file.

```css
[data-ripple] {
    position: relative;
}

[data-ripple] .ripple-pad {
    background: hsla(240, 100%, 50%, 0.5);
    position: absolute
}
```

At this point, clicking on your button should produce a large blue circle that covers most, if not all, of your button. If you click around, you should also notice that the size of the circle changes depending on where you click. We now need to add the actual rippling effect. To do this, we will use good ol' keyframes. Our keyframes definition will look like this.

```css
@keyframes RippleEffect {
  to {
    transform: scale(1);
    opacity: 0;
  }
}
```

All we need to do now is add it to our `.ripple-pad` element.

```css
[data-ripple] {
  position: relative;
}

[data-ripple] .ripple-pad {
  background: hsla(240, 100%, 50%, 0.5);
  position: absolute;
  opacity: 1;
  transform: scale(0);
  animation: RippleEffect 1700ms cubic-bezier(0, 0, 0.2, 1) forwards;
}

@keyframes RippleEffect {
  to {
    transform: scale(1);
    opacity: 0;
  }
}
```

This should produce a rather satisfying effect with your circles growing and then fading out. This is most of the effect. However, there is some cleanup we need to do. If you look at the DOM, you will notice that there are a bunch of `.ripple-pad` elements inside the button. We need to add a way of removing elements after it's animation has ended. To do this, we can turn back to our JavaScript.

```javascript
...
for (const host of rippleHosts) {
    host.addEventListener('mousedown', (event) => {
        const rect = host.getBoundingClientRect();
        const cursorX = event.clientX;
        const cursorY = event.clientY;

        const fromTop = cursorY - rect.top;
        const fromBottom = rect.height - fromTop;
        const fromLeft = cursorX - rect.left;
        const fromRight = rect.width - fromLeft;

        const requiredDimension = Math.ceil(Math.max(fromRight, fromLeft, fromTop, fromBottom));
        const ripple = generateRipple(fromLeft - requiredDimension, fromTop - requiredDimension, requiredDimension * 2);
        host.appendChild(ripple);

        ripple.addEventListener('animationend', ({ animationName }) => {
            if (animationName === 'RippleEffect') ripple.remove();
        });
    });
}
...
```

At this point, if you click on the button, you will see that your ripple will be removed from the code of the button once it disappears. There is now one more thing we need to do to make this a fully functional ripple. To do this, we need to just add one line of css to our code to stop the ripples from overflowing from the button.

```css
...
[data-ripple] {
  position: relative;
  overflow: hidden;
}
...
```

And there we go, we have a ripple effect. We can add the `data-ripple` attribute to other elements and they will also have ripple effect. To test this, let's add another button to the `index.html` file. 

```html
<!DOCTYPE html>
<html lang="en">
  ...
  <body>
    <button data-ripple>Click Me</button>
    <div style="width: 50px;"></div>
    <button data-ripple>Click Me Too</button>

    <script async src="./index.js"></script>
  </body>
</html>
```

---

### Tips for Integrating With React or Angular
Like many devs today, you may be using a UI framework like React or Angular. Naturally, the code we have just written may not work out of the box for you. First of all, we can look at React. 

To integrate this code into React is actually fairly easy. In fact, it only requires minimal changes. In a common folder in your React project, you will need to create a file called `ripple.js`. The code that will go into this file will look like this:

```javascript
function generateRipple(rippleX, rippleY, rippleDimensions) {
    const div = document.createElement('div');
    div.className = 'ripple-pad';

    div.style.width = `${rippleDimensions}px`;
    div.style.height = `${rippleDimensions}px`;

    div.style.left = `${rippleX}px`;
    div.style.top = `${rippleY}px`;

    div.style.borderRadius = `${rippleDimensions}px`;

    return div;
}

export function RippleEffect(event) {
    const host = event.currentTarget;
    const rect = host.getBoundingClientRect();
    const cursorX = event.clientX;
    const cursorY = event.clientY;

    const fromTop = cursorY - rect.top;
    const fromBottom = rect.height - fromTop;
    const fromLeft = cursorX - rect.left;
    const fromRight = rect.width - fromLeft;

    const requiredDimension = Math.ceil(Math.max(fromRight, fromLeft, fromTop, fromBottom));
    const ripple = generateRipple(fromLeft - requiredDimension, fromTop - requiredDimension, requiredDimension * 2);
    host.appendChild(ripple);

    ripple.addEventListener('animationend', ({ animationName }) => {
        if (animationName === 'RippleEffect') ripple.remove();
    });
}
```

You can then add the effect to an element like this

```jsx
import React from "react";
import { RippleEffect } from "./index.react";

export function Button() {
  return <button onMouseDown={(e) => RippleEffect(e)}>Click Me</button>;
}
```

For Angular, you are probably going to want to use a directive. The code for that will look like this:

```js
import { Directive, HostListener } from "@angular/core";

@Directive({ selector: "[rippleEffect]" })
export class RippleEffectDirective {
  generateRipple(rippleX, rippleY, rippleDimensions) {
    const div = document.createElement("div");
    div.className = "ripple-pad";

    div.style.width = `${rippleDimensions}px`;
    div.style.height = `${rippleDimensions}px`;

    div.style.left = `${rippleX}px`;
    div.style.top = `${rippleY}px`;

    div.style.borderRadius = `${rippleDimensions}px`;

    return div;
  }

  @HostListener("mousedown") onMouseDown(event) {
    const host = event.currentTarget;
    const rect = host.getBoundingClientRect();
    const cursorX = event.clientX;
    const cursorY = event.clientY;

    const fromTop = cursorY - rect.top;
    const fromBottom = rect.height - fromTop;
    const fromLeft = cursorX - rect.left;
    const fromRight = rect.width - fromLeft;

    const requiredDimension = Math.ceil(
      Math.max(fromRight, fromLeft, fromTop, fromBottom)
    );
    
    const ripple = this.generateRipple(
      fromLeft - requiredDimension,
      fromTop - requiredDimension,
      requiredDimension * 2
    );
    host.appendChild(ripple);

    ripple.addEventListener("animationend", ({ animationName }) => {
      if (animationName === "RippleEffect") ripple.remove();
    });
  }
}
```

---

The code for this tutorial is hosted [on GitHub](https://github.com/joshuapbritz/RippleEffectExample).
