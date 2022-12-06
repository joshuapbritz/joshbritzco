---
title: "Create a JavaScript Datepicker"
date: 2022-12-06T00:00:00+00:00
draft: true
headerUrl: "images/why-its-so-hard-to-check-object-equality.jpg"
tags: ["JavaScript", "Web Dev", "Utilities"]
---

Datepickers are possibly one of the most frustrating JavaScript components to build. They are also one of the most fun and rewarding. There is a lot of complexity that goes into making one, which gives us a lot of opportunity to learn some cool new skills. Of course, you may ask why someone would want to build one. After all, isn't there a built-in datepicker that comes with HTML? Or, if that isn't to our liking, why not use an existing component library? The answer to me is this - the native HTML datepicker is a pain to work with and has essentially no customisability. Many libraries do indeed offer some good datepickers, but they are only really worth it if you are already using the component systems they are packaged with. Once again, you are also limited in terms of styling and customisation. Creating our own component will allow us to have a very high level of control over every aspect of the control.

### Project setup
Many of the principles of this component will be able to be transferred to React or Angular or Vue, but for this tutorial we will be coding this component in pure HTML and JavaScript.