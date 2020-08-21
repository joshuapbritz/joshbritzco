---
title: "Oh No! Another Framework Showdown..."
subtitle: "...Sort of. This one is different"
date: 2020-08-21T07:47:56+02:00
draft: true
headerUrl: "images/another-framework.jpeg"
---

One of the more polarizing topics amongst frontend developers today is the question of which JavaScript framework is better. Some say its React because of its simple structure, its features like hooks or jsx, and its general popularity. Others argue that it is Angular because of its general versatility, its strongly opinionated file structure, and its richness of features. Or they may say its Vue or Svelte or Ember or Preact or any other number of JS frameworks (all with awesome features that the others don't have). So, which one is the best then? How can we possibly tell? Do we check the frameworks popularity amongst developers or how many projects use that framework in the real world? Here's the truth - we often group these frameworks together because they all label themselves as being similar. A lot of the time, we are trying to decide between a scalpel and a chef's knife when we are trying to cut through a dense jungle.

Each and every one of the JS frameworks that are out there today are popular for a reason, and each are good at doing certain things. Now I'm not saying that what one framework can do, the others cannot, but that each framework has things that they doing exceptionally well and things that they could do better. So, in essence, the gist of this article is this - chose the right tool for the right job. It annoys me to no end that developers see frameworks as these exclusive bubbles you can live in. Each framework has its merits and I would like to point out what those merits are. Let's start by looking at the merits of each of today's top frameworks on their own.

### React
Facebook's offering to the world of JS frameworks is the beloved ReactJS. The framework itself leans heavily in the functional programming direction and uses a syntax language called JSX which allows developers to compose UIs with a collection of components. React relies heavily on the concept of components, a typical component would like this

```typescript
const Button = (props) => {
    return <button>{props.label}</button>
}

export default Button;
```

This component can be used within your react application like this.

```typescript
import Button from '/path/to/component';

const App = () => {
    return (
        <main>
            <Button label="Click Me" />
        </main>
    )
}
```

In the DOM, this will be rendered as

```html
<main>
    <button>Click Me</button>
</main>
```

Now I'm not trying to compare lines of code between React and the frameworks that will follow. I am simply trying to show how things are done in each framework. Now, it is undeniable that React probably has the simplest component code and that it is arguably the easiest component structure to understand. So let's dig into the benefits and drawbacks of the ReactJS frameworks.

##### The Awesome Stuff
So, what makes React awesome? Well, here are the main highlights.

- It's highly versatile, especially when you are building UIs that need to be feature-rich and highly responsive.
- It's a relatively focused framework. It provides the bare-bone structure of what you need to build great web apps while also letting you use a rich ecosystem of plugins to gain extra functionalities you need.
- It is well supported in the dev community and it is easy to find answers to your questions, therefore making it easy to get things done and to make progress.
- Its unidirectional data flow makes it highly efficient and easy to debug. Data can only be changed in one place and that makes it easy to figure out how your components will change when data changes.
- Its component system is incredibly enjoyable to use and there use of functions as components is really nice.

##### The Less Awesome Stuff
It's not all peaches fluff and rose beds though. Here are some of the things that make React less fun to use.

- If you need a functionality that is not part of the core package, you have to find 3rd-party packages to handle those functionalities. These packages can introduce security risks or may not cover all functionality that is needed.
- Data flow through components can be tricky to understand at first. Even once you have been using the framework for a while, there are gotchas in the process. Unlike frameworks such as Angular, Vue, or Svelte which offer two-way binding on data, React has no such offering (out of the box).
- It is hard to scale in comparison to the other frameworks and can become unmanageable for big systems.

##### Where it Excels
On the ReactJS website, their tagline reads _"React - A JavaScript library for building **user interfaces**"_. I find that React is best when it is used to build beautiful informational websites that need to be responsive and flexible. 

---

### Angular
The next framework offering is from Google. This framework swings all the way to the other side of the programming spectrum. Angular leans very heavily on the OOP paradigm. Like React, Angular relies massively on components but the nature of its components are vastly different to React's. Here is what a typical Angular component would look like.

```typescript
@Component({
    selector: `button[app-button]`,
    template: `<span>{{ label }}</span>`,
}) export class ButtonComponent {
    @Input() public label: string;
}
```

This can be used like this

```html
<main>
    <button app-button label="Click Me"></button>
</main>
```

Which renders this to the DOM

```html
<main>
    <button app-button>
        <span>Click Me</span>
    </button>
</main>
```

The real beauty of Angular components is that they are extremely self-contained, and yet they interface very well with each other. Angular provides a rich feature set with tools that allow you to control how data flows through your application. 