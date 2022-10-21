---
title: "Goodhart's Law and Interview Tests"
subtitle: "How interviews fail to find the best person for the job by making the metric a goal"
date: 2022-10-21T00:00:00+00:00
draft: false
tags: ["Web Dev", "Jobs", "Interview"]
headerUrl: "images/goodharts-law.jpeg"
---

At some point, I am sure that most developers have had an interview were they have been given some sort of a coding challenge. The idea is this - a company wants to hire a new developer. They want said developer to demonstrate the skills necessary for the job. The skills listed on that developers CV are considered to be unverified and so, that company wants to check and see that the developer can actually do what they say they can do. All of this is good so far. With this thinking in mind, companies implement various coding challenges that potential hires need to complete. Some are good and some are bad. In this article, I just want to explore a little bit of the various types of tests that you might come across, and where their short comings are. Then, because I don't want this to just be a rant, I would like to propose a solution that I think best fits the need that interviewers face.

## The Various Solutions We Have
Naturally, different companies test skills in different ways. Companies also tend to change what they are testing based on what position they are hiring for, and based on what discipline. If you are a developer who is in the job market, it is likely that you will encounter these and, if you have been in the industry for a while, it is likely you have seen many of them. Obviously there are variations to all of the broader categories, but for the sake of conciseness, I will try not to deviate.

### 1. The Theory Test
By far one of the most common type of interview question is the theory test. A question like this tends to shy away from practical application of the code, and tends to test a developer on abstract concepts like how well they have memorised the documentation for a language, how much of a language's obscure syntax they know by heart, and their ability to recall that information under pressure. This is common because it feels really productive and hands on, but this method has a few drawbacks:

1. You are testing the developer's memory more than their hard skills
2. You are not testing the developer's critical thinking
3. You are creating an advantage for newly graduated developers, who have many of these concepts fresh in their minds, over experienced developers who have practical, real-world experience.

The theory test is not without its merits. A non-developer would most likely not be able to pass the test (although if they are, you might need to rethink things). It can be helpful to see how well a developer knows a particular language, especially considering that you are hiring them for that purpose. However, the theory test fails to test the proper nuance of a developer's skill. A really good developer can be thrown into the deepened of a framework they aren't familiar with, and figure things out. This is not because they go and memorise the docs, but because they have te ability to think critically and rationally.

### 2. The "Real-World" Test
This is by far the test I despise the most, though some of the concepts makes sense. Some companies understand that they want developer who can fit in with their code stack. Their solution - have potential new hires fix a real bug on the system. In theory, this is a great idea. It does in fact test the developers real world ability along with how well they can figure out what is going on in an environment they don't understand. However, it has some major problems.

1. It is exploitative, or at least feels that way to the developer. They have no guarantee that their fix isn't going to be used, whether or not they get the job.
2. It exposes your system to people who might go and work for competitors, without their having to sign NDAs.
3. It is not usually a repeatable solution, which makes it hard to compare multiple candidates to each other.

It must be noted that I am talking about the kind of test where you are actually fixing a real bug in a live system at a company. I am not talking about simulated bugs, as that is something I will get to just now. While the "real-world" test can be very helpful in determining a developer's hard skills and critical thinking, it is exploitative and I think it should be avoided.

### 3. The Pop Quiz
Another common type of test is the pop quiz. This is where interviewers will ask a potential hire multiple questions that are more short and concise. This is different from the theory test in that it is often even more divorced from practical hard skills. Usually the format is along the lines of a series of multiple choice questions that relate to development. Some drawbacks of this method are:

1. As with the Theory Test, you are not evaluating hard skills
2. Worse than the theory test, you are not even evaluating basic coding skills.
3. Just don't, please, I beg you

Though I despise the "real-world" test the most, the pop quiz comes a close second. Once again, this does not help you find the best person for the job, but the person who is best able to prepare for an interview. Now, you might luck out and find that rare developer who is both good with hard skills and good and doing tons of interview prep, but why would you take that chance. Just please, don't do it.

### 4. The Simulated Bug/Enhancement Test
This type of test is very interesting, because it allows the benefits of the "real-world" test without the same drawbacks. This kind of test will be involve a pre-made coding project, in which there are engineered bugs and problems. A new hire is then given the project and a document with the tasks they need to complete. These tasks might be enhancements to the code, fixing of bugs, or removing of features (or other things if you so desire). One great thing about this method is that you are evaluating developers on a known quantity of problems, where you also know what the solution should be, and you are doing so without hindering their ability to be creative. There are some drawback to the method such as:

1. You have to be very clear on the description of your tasks as these can be easily misunderstood.
2. You need to build and maintain your test project, and be sure that you have no "extra" bugs that you don't know about.
3. It can often be difficult to balance the difficulty of the test for junior vs. mid-weight vs. senior developers.

This is a very good way of doing developer testing, though it has its drawbacks (just like any other testing method). Developers don't feel cheated into doing free labour and your company secrets are not being shared with random people. On top of that, you are benchmarking developers against the exact same problem, and you are fully aware of what the problem is and what its solution should be.

## Looking for a Better Way
There is one type of test I haven't mentioned yet, and it should be obvious that the reason for that is that it is my favourite. We'll get to what it is now, but before we do that, I want to put some groundwork in place. A common thread in the kinds of tests that I don't like is, as I see it, that they violate Goodhart's Law:

> When a measure becomes a target, it ceases to be a good measure.

The last thing we care about in a developer is how well they can complete interview tests. It's a meaningless ability at best. The test is there to validate skill, as a way of seeing if they are a good fit for the company and the job description. This means that you need to care far less about whether or not your test gets completed, and more about how the problem get's tackled (obviously you want the test to be completed. My point is that shouldn't be your main concern). This leads to a side note - a developer's technical competency should always be tested by someone who has that competency. Please, I beg you, do not have your technical interviews run only by your HR manager - they might be great at evaluating people, but they are very likely completely unable to even begin assessing a developer's skill. Having a developer, senior to the position you are hiring for and competent in the skills you are looking for in the new hire, is a great way of making sure you aren't hiring bad apples.

So, what is a good way to implement this into your interview testing process. Well, the Simulated Bug/Enhancement Test is a good option if you go for that. My problem with it is that it doesn't adequately test innovation, but iteration. It's a great test if you are hiring devs that will only be doing maintenance or bug fixing, but might not be the best way to test someone's ability to work on new features. It certainly won't help you to single out people who have the ability to innovate within the environment, to improve the product they are working on.

So, what might be my proposed solution? I'm glad you asked.

### My Solution: The Project
This is not to dissimilar to the Simulated Bug/Enhancement Test, but has some key differences. Potential hires would be given a document with the description of a basic application. This document would include some notes on design, functionality, and the structure of the app. Bear in mind, we are not asking new developers to build a full scale application, just a basic applet with limited functionality. The kicker here is that the developer is starting with a blank canvas - no project boilerplate, no pre-written code, no setup work. The potential new hire will have to setup the project from scratch using the tooling they would be working with at your company. Some key advantages of this method are:

1. It's not testing a developer's general knowledge or their memory, but their ability to complete tasks with whatever information they have at hand.
2. It allows you to evaluate their creativity by seeing how they tackle obstacles they might face, especially when it comes to having to use new technology.
3. It allows you to evaluate that developer's attention to detail - is there project rife with little bugs, error messages and such or have they put work into producing clean, polished code.
4. It also allows you to see what that developer's coding ethic is - do they care about how well something works, or that something works? Do they have an attitude of "if it ain't broke, don't fix it" or do they put effort into making their code beautiful?

These are among the benefits of using this method of testing. You can get some solid results from such tests, and it is easy to compare potential hires side-by-side to see how they take on challenges differently. That is not to say this way of doing things is perfect. There are a few drawbacks.

1. These kinds of test can feel time consuming and might discourage developers from even attempting them
2. They can sometimes feel like undercover "real-world" tests
3. They often take more time to review and evaluate than other methods, as you are looking at the code for a full project

---

This is by no means a comprehensive guide to interview questions, but is meant to be a whirlwind look at some of the ways in which we evaluate the skills of our developers. We naturally want to have the best of the best working for us, but often don't have processes in place that filter out the kinds of people who know how to game the system without having the skills to back themselves up. My purpose here is not to encourage gate-keeping either - we don't want to unfairly deny positions to people who deserve them. Rather, I am in fact trying to achieve the opposite of that. Many of the skills that are tested for in interviews are the kinds of skill a developer will pick up on the job (easily I might add). And that could be pointed to as the key metric we are actually wanting to measure for - how well can this person adapt within their environment.

And so, thus ends my sorta, kinda, rant-with-a-solution. Maybe it was helpful, maybe it was all utter BS. I'm not an expert at interviewing and probably won't ever claim to be. This article is coming from the perspective of a developer, out outlines some of the key areas I have seen interviewers fail in the past (whether by my own experience or through the experience of friends). 