---
title: "Skeleton Loading Component Angular"
date: 2020-08-05T13:01:07+02:00
draft: true
---

47% of consumers today expect web pages to load in 2 seconds or less. Every second it takes for a page to load, a user becomes more likely to abandon your site. Because of this, it is important to ensure that your site loads as fast as possible. Part of that is ensure that your site is small and not too code heavy. However, we sometimes have to deal with external services and apis that are super slow - resulting in our pages getting slowed. Because of this, we have to be smart. Thanks to the tools given to us by most modern web browsers, we can get around this problem by progressively loading our pages. A common approach is to load that shell of your website (eg. navbar, footer, landing page) while deferring the loading of your data. This plays into something we call perceived load time. When users see even a part of your page loaded, they feel like the site has loaded, even if there is no meaningful data for a while. So, for example, if your data takes 6 seconds to load, you can still make users feel that you page loads in under 2 seconds because there are elements of it on the screen.

Now, this can be achieved by using a loader or a spinner. Really anything other than a blank screen. However, I feel that these options fall short as loading patterns. They can become frustrating because they do not give your users any expectations about what to expect once your page loads. Enter skeleton loaders. This loading pattern is a create bridge between your page loading and fetching your data. You can use a skeleton loader to show what the structure of your page before it is even loaded.

So, in this article, we are going to learn how to build a skeleton loader component in Angular. To do this, you will need to have NodeJS and Angular installed on your computer. To start, you are going to need to get an Angular project up and running.

```bash
$ ng new data-application
```

When prompted, select SCSS for your stylesheets, but don't worry about adding routing. This will bootstrap a project for us, and we will be able to get things setup. In the project, let's get rid of the basic code that Angular gives us off the bat. In your **app.component.html**, replace any code that's there with the following code.

```html
<main>
  <ng-template [ngIf]="!isLoading">
    <h1>Hello World</h1>
  </ng-template>

  <ng-template [ngIf]="isLoading">
    <h1>Loading Content</h1>
  </ng-template>
</main>
```

and replace the code in **app.component.ts** with the following code.

```typescript
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public isLoading: boolean = true;

  public ngOnInit(): void {
    setTimeout(() => {
      this.isLoading = false;
    }, 1200);
  }
}
```

now, if you run **ng serve --open**, you will see *Loading Content* on your screen for a little while before the text is replaced with *Hello World*. This will be the basis of our skeleton loader. So let's create the skeleton loader. We'll start by creating a component by running the following two commands in your terminal.

```bash
ng g module components/skeleton
```

```bash
ng g component components/skeleton -p=ngx --skip-tests --export
```

This will give us a component where we can create our skeleton loader. Now, navigate to **components/skeleton** and create two more files **skeleton.configs.ts** & **skeleton.models.ts**. This will be where we will create our definitions for skeleton blocks. Let's start by configuring our TypeScript. In **skeleton.component.ts**, we will create two inputs: *name* and *height*. Your component should now look like this:

```typescript
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-skeleton',
  templateUrl: './skeleton.component.html',
  styleUrls: ['./skeleton.component.scss'],
})
export class SkeletonComponent implements OnInit {
  @Input() public name!: string;
  @Input() public height!: number;

  constructor() {}

  public ngOnInit(): void {}
}
```

and in **skeleton.component.html**, you can add the following HTML to make sure that code is working properly.

```html
<div class="skeleton-inner-wrapper">
    {{name}} {{height}}
</div>
```

Now, if you import the **SkeletonModule** into your **app.module.ts**, you will be able to change the Content Loading h1 with the new component.

```html
<main>
  <ng-template [ngIf]="!isLoading">
    <h1>Hello World</h1>
  </ng-template>

  <ng-template [ngIf]="isLoading">
    <ngx-skeleton name="block" [height]="40"></ngx-skeleton>
  </ng-template>
</main>
```

Now, when your page loads, we emulate fetching data. Until the data loads, we show a skeleton loader and then show the content when the data is ready. So, we just need to style the loader. To do this, we will create some TypeScript models that will be used to define our configs. In **skeleton.configs.ts**, you can add the following code

```typescript
export interface SkeletonConfig {
  color?: string;
  skeletons?: Skeletons;
}

export interface Skeletons {
  [name: string]: Skeleton;
}

export interface SkeletonStyling {
  [property: string]: any;
}

export interface Skeleton {
  height: number;
  opacity: number;
  pushBottom?: number;
  stops: SkeletonStop[];
}

export interface SkeletonStop {
  width: SkeletonStopWidth;
  color: string;
  shape: SkeletonStopShape;
}

export type SkeletonStopWidth = number | 'fill';

export type SkeletonStopShape = 'circle' | 'square'
```

This will allow us to create a variety of different "blocks" that can be used as skeletons. In **skeleton.configs.ts** we will now create our first config: **block**. The code fow this config is simple.

```typescript
import { Skeletons } from './skeleton.models';

const skeletons: Skeletons = {
  block: {
    opacity: 1,
    height: 30,
    pushBottom: 8,
    stops: [
      {
        width: 'fill',
        color: '#e3e7eb',
        shape: 'square',
      },
    ],
  },
};

export default skeletons;
```

Great, we are almost there. Now, let's import our skeleton configs into **skeleton.component.ts**. This will allow us to use our name input to find the config we want to display. Let's update our code to look like this

```typescript
...
import skeletons from './skeleton.configs';

@Component({
  selector: 'ngx-skeleton',
  templateUrl: './skeleton.component.html',
  styleUrls: ['./skeleton.component.scss'],
})
export class SkeletonComponent implements OnInit {
  @Input() public name: string = 'block';
  @Input() public height!: number;

  public get skeleton(): Skeleton {
    // We will try to get a config based on the name
    // that we passed into the skeleton input. If no
    // config is found, we will load the block config
    // by default.
    return skeletons[this.name] ?? skeletons.block;
  }

  constructor() {}

  public ngOnInit(): void {}
}
```

We can now update our HTML to look like this

```html
<div
  class="skeleton-inner-wrapper"
  *ngIf="!!skeleton"
  [style.height.px]="height || skeleton.height"
>
  <div
    class="stop"
    *ngFor="let stop of skeleton.stops"
    [style.backgroundColor]="stop.color"
    [ngClass]="stop.shape"
  ></div>
</div>
```

This is almost ready to be styled. In fact we just need one more thing. In you **app.component.ts**, add the following function to you code.

```typescript
  ...
  // Returns a css style object based on the
  // given stop definition's styling, that
  // can be passed to Angular's NgStyle
  public getStyleObject(stop: SkeletonStop): SkeletonStyling {
    const style: SkeletonStyling = {
      backgroundColor: stop.color,
      opacity: this.skeleton.opacity,
      paddingBottom: `${this.skeleton.pushBottom}px`,
    };

    // Coerces the width value of the skeleton
    // to allow for the "fill" shorthand definition
    // which translates to "flex: 1"
    style[stop.width === 'fill' ? 'flex' : 'width'] =
      stop.width === 'fill' ? '1' : `${stop.width}px`;

    return style;
  }
  ...
```

In you html, you can now add the following attribute to your stops

```html
<div
    class="stop"
    *ngFor="let stop of skeleton.stops"
    [style.backgroundColor]="stop.color"
    [ngStyle]="getStyleObject(stop)"
    [ngClass]="stop.shape"
></div>
```

We can now style our skeleton. In **skeleton.component.scss**, we can add the following code.

```scss

```
