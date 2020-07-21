---
title: "An Opinion on Progressive Enhancement in CSS"
date: 2020-03-08T10:16:27+02:00
draft: false
---

Although support for the "plague browsers" is dropping by the year, developers across the world are faced with the challenge of having to support older web browsers like Internet Explorer. Such browsers have very limited support for new web technologies like grid, flexbox, or custom properties. Because of browsers like this, the CSS spec gives specific instructions to browsers about how they should treat CSS rules that they do no understand. That is, that browsers should discard any line of CSS they do not understand. For example, let's look at the below selector that uses logical properties.

```scss
.box {
   padding-inline: 30px;
   margin-block: 30px;
}
```

In a browser that understands logical properties, the `.box` element will get padding of 30px on the left and right and a margin on the top and bottom of 30px. However, a browser that doesn't understand logical properties will completely ignore those rules and the element will have no padding or margin. Thankfully, CSS has an elegant around this issue: the `@supports` selector. With our above example, we might use `@supports` like this.

```scss
.box {
   padding-left: 30px;
   padding-right: 30px;
   margin-top: 30px;
   margin-bottom: 30px;

   @supports (padding-inline: 30px) and (margin-block: 30px) {
      padding-inline: 30px;
      margin-block: 30px;
   }
}
```

Essentially, what's happening here is that the `.box` selector gets the standard, well-supported padding properties in all browsers. However, in a browser that supports logical properties, the element will get the logical property rules. This is an elegant way of handling progressively enhanced pages by using CSS rules that work in all browsers and then overwriting those rules with newer, less-supported rules by wrapping them in `@supports` blocks.

But, here's the rub. When should you actually use **@supports**? When we build things with CSS, there will always be a browser that has lower levels of support for CSS features than others. Because of the nature of CSS, rules that work on an old browser have to work on newer browsers in order to maintain backwards compatibility. So if we are creating a layout and we have to support a browser that only understands Float Layout for instance, then it is fully possible to build a layout that will work in all browsers even if they have support for newer technologies (like flexbox). The question then is this: "If you can build something with an older CSS technology, what is the point of rewriting styles with newer tech to redundantly achieve the same results?" 

When deciding on which CSS feature to use for a project or design, here are some things that I think should be considered.

---

#### The CSS technology you choose should have the widest browser support while still being able to do as much of what you need as is possible.

Now you must know, I am a hipster at heart. Whenever new CSS features are released, I immediately want to try out that new feature and then brutally smash it into the projects I'm working on. However, recently I've tried to reform my thinking in this area. I used to spend hours upon hours rewriting and bug fixing my CSS so that it would work in IE because the shiny new features I'd got working in Chrome using the shiniest and newest CSS, were not at all supported. 

But there is a simple way around this problem. Instead of just opting for the thing that makes you code look sleeker and lets you write your code with less effort, consider rather finding the feature that has the widest support for the most browsers while still being able to do what you need. Your aim should be to write as little fallback CSS as you possibly can. Here is an example of this problem in the real world.

```scss
.container {
   width: 100%;
   height: auto;
   padding: 40px;
}

.container::after {
   content: '';
   display: table;
   clear: both;
}

.container .box {
   float: left;
   width: calc(50% - 20px);
   height: 200px;
   border solid 2px pink;
}

@supports (display: flex) {
  .container {
     display: flex;
     flex-flow: wrap row;
     align-items: stretch;
  }

  .container .box {
     flex: 1;
     max-width: calc(50% - 20px);
  }
}
```

This code will produce something like this.

<!-- {% codepen https://codepen.io/joshuapaulbritz/pen/gObQmBj %} -->

Awesome, so this code works! However, you could remove the `@supports` part of the above code and it would work perfectly fine, in **all** browsers. In fact, we can decrease the size of our CSS file by removing it. Does this then mean that you should go through all your CSS from all your projects and delete any fallback CSS you can find? Absolutely not! While there is a large amount of redundant CSS out there, there is another factor to consider when you face the issue of write fallback (or progressively enhanced) CSS: Accessibility.

#### Please always consider the accessibility of the CSS features you want to use.

It's well and all saying that you shouldn't use a CSS feature _just_ because it's shiny and new, and that you should try to use features that have the widest support across the board. However, it would be wrong to throw out progressively enhanced code altogether. Some of the older CSS features out there require you to order your HTML elements in an illogical or impractical way. This can result in HTML pages that screen readers are unable to parse or sites that are frustrating to those who navigate pages using keyboards. So, when picking a CSS feature you want to use, you need to ensure that you pick a feature that has the best accessibility that you can find even if it means that you may have to write some fallback CSS for browsers that do not understand the feature.

You want to find a good balance between support of a feature and its accessibility, which may mean writing a little extra CSS for your edge case browsers so that your site works properly. Consider the example I used earlier:

```scss
.box {
   padding-left: 30px;
   padding-right: 30px;
   margin-top: 30px;
   margin-bottom: 30px;

   @supports (padding-inline: 30px) and (margin-block: 30px) {
      padding-inline: 30px;
      margin-block: 30px;
   }
}
```

The code is guaranteed to work in all browsers because all browsers support the standard padding properties very well. However, not all browsers understand the much newer standard of logical properties (you can find a good explanation of what their benefits are [here](https://www.smashingmagazine.com/2018/03/understanding-logical-properties-values/)). Yet, because logical properties offer us better internationalization they are a better choice for us as they will make our site more accessible to more people. In this case the benefits outway the drawbacks.

Now let's look at the other example I used.

```scss
.container {
   width: 100%;
   height: auto;
   padding: 40px;
}

.container::after {
   content: '';
   display: table;
   clear: both;
}

.container .box {
   float: left;
   width: calc(50% - 20px);
   height: 200px;
   border solid 2px pink;
}

@supports (display: flex) {
  .container {
     display: flex;
     flex-flow: wrap row;
     align-items: stretch;
  }

  .container .box {
     flex: 1;
     max-width: calc(50% - 20px);
  }
}
```

This is an unnecessary progressive enhancement. Any browser, new or old, will understand float layout and the boxes do not display differently when flexbox is used. That extra code is therefore not needed and can be removed from your project without worry.

#### Ensure that your time is being well spent.

Another consideration when deciding on whether or not to progressively enhance your CSS is time. Your time as a developer is very valuable and you should be doing as much as you can to optimize and utilize that time.

When you are trying to build a feature with CSS, you need to find a solution that takes up the least amount of your time. It is very time-consuming to write tons of fallback CSS in order to get your code to work on browsers like IE.

---

So, what can be concluded from this rant of an article? I'm not trying to say that you shouldn't use new CSS or that you should only use old CSS. Rather, I want to advocate that you take time to consider the CSS you use for projects. Don't just automatically opt for new shiny CSS for its own sake as nice as it is. 