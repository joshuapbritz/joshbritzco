---
title: "6 Principles to Make Your Projects More \"Team Friendly\""
date: 2019-11-07T08:28:29+02:00
draft: false
tags: ["Workflow", "Team"]
headerUrl: "images/team.jpeg"
---

The other day I was reflecting on the team that I am currently working with on a massive project at our company. We have recently gone through a huge overhaul in our process and structures, so I wanted to see how those changes had reflected in projects. Namely, I wanted to try and see what we did well, what maybe needed some work, and what we needed to start (or stop) doing. 

In thinking about this, I decided to turn my findings into an article outlining our team's goals and principles (whether or not we are perfectly achieving them or not). These are very subjective ideas that are tailored to the team I work with. So while I hope you can draw some benefit from how we as a team think, please don't take any of these principles as set-in-stone rules.

##### 1: Have a clearly defined project structure and style guide

There are hundreds if not thousands of different views, held by many respectable developers, on what good code looks like. There is a style guide for everyone's preference, ranging from very unopinionated and general to highly opinionated and detailed. Now, there is nothing particularly wrong with either approach. As a developer (on your own) you have the right to any preference in code style you want. If you like strongly typed and ultra-explicit nature of TypeScript code, cool. Or maybe you prefer that slightly more lenient and free nature of vanilla JavaScript instead, also cool. We are all different people with different ways of thinking and organising our minds, and the way we right code should reflect that. 

However, when we have to work with a team, things change a little bit. When you get to a point where you are writing code with other people, the reason for having a style guide changes a little bit. No longer is the question "what is your preference?" or "how do you like to write code?", rather you have to ask "how can my code be written so that anyone on my team can easily work on this?" or "how can my team write code in such a way that our codebase looks like one person wrote it?". When working in a team you will often have to pick up tasks that your co-workers started, or you will have to fix bugs in parts of an application that you have never worked on. This is when a coding standard is most vital. If you have rules that determine how to name variables and functions, where to place code in your files, how to name your files and whatever else you might have rules for, you and your team will find it much easier to work on code that you have never worked on before.

##### 2: Define project scripts in an easy to access place

So many times you will have to work on a project where the build scripts for that project are nowhere to be found. This is a small thing but it can save developers so much time. If you are using any sort of NodeJS tool, this is super simple to do. All you have to do is add items to the scripts section of your package.json. It may seem like something so simple and trivial, but it makes things so much for the other developers in your team. 

##### 3: Make sure you have a readme file

Many projects you'll come across will not have a proper readme file. In most cases, most often with projects generated by a CLI, the readme file that can be found in the project is completely unuseful. The technical information is generic and out of date, the setup steps are sorely lacking and any developer looking to get going on that project is left to fend for themselves in the maze of code they have found in the repo. 
Your readme is meant to be the starting point for developers going into a project and should provide the following information:

- A brief (like extremely brief) intro to the project.
- A list of links to the relevant documents, specs, repositories, and other places where developers can learn more about the project. Also, if available, include a link to where the live version of the project is hosted.
- An up to date list of the environments needed to run the project, including:
- Languages that need to be installed (with versions specified if important)
- Build tools and CLI tools that need to be installed
- CI/CD and DevOps tools being used
- And, a list of steps that are needed to run, build or deploy that project.

##### 4: Don't use flashy code, use readable code.

Readable code is better than succinct code... every time. This is not to say that you should be writing messy code or inefficient code. Rather, when choosing how you are going to solve a problem it is a great temptation to try and make your code as compact as you possibly can. I've often caught myself writing one-liners that do solve the problem I'm trying to solve but also are virtually unreadable for anyone other than me. But when working with a team, you should prioritize the readability of your code. What could even be best practice or at least completely fine code for you to write in your own projects, could mean hours that another dev, unfamiliar with that pattern or idea, could spend trying to work with that code. Often it is best to discuss with your team and make decisions on what sorts of code you will use and what you will not.

##### 5: Add comments to your code

This may be one of the most hotly debated things in code. Between those who say that code should be covered from top to bottom with comments to those who say code should have no comments and that code should document itself, it is hard to know what to think. However, it is my opinion that when we are working teams, you cannot always be sure that you are going to be the one to maintain the code you have just written. Bugs will be raised and someone will have to fix them and more often than not, it won't be you. This is what comments are for. They can be a very useful tool in ensuring that that next person who works on your code can see what you were thinking when you wrote it.

That being said, please don't go writing mini novels above each line of your code. All you really need from a comment is a piece of a map that points to the flow of the code you have written. This may be a justification for calling a function, and explanation of a hack or detailing of logic. A good question to ask yourself when writing comments is "what do I wish I had known before writing this code?".

##### 6: DO NOT try to implement any of the above apart from your team.

These points are things I have found from my own experience in my own team and may not be the solution for everyone. They are not rules, but rather principles that should be adapted to suit your team. Further, they are principles that pertain to your whole team. If you feel that your team should be implementing some of these things, don't just bulldoze through and try to implement them in your own power. Get your team together, talk about how you would go about implementing these changes as a team and discuss the pros and cons of each change. Decide together whether or not any or all of these principles are going to benefit your team. Each team is different and has its own needs so you should treat yours that way.