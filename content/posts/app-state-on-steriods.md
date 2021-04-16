---
title: "App State on Steroids: Part 1"
subtitle: "An Introduction to CerebralJS and declarative state"
date: 2021-04-16T09:52:41+02:00
draft: false
headerUrl: "/images/app-state.jpeg"
---

Many developers, including myself, opt for a single responsibility, functional approach to web development. This has resulted in many great patterns in code design like headless components and functional components. These patterns prioritise code reusability, readability, and debugability by forcing developers to make components self-contained. This means that, where possible, all state for a component is contained within itself and is passed back and forth throughout the component chain when it needs to be shared. This means that you can very easily trace problems in your app because you have a "chain of custody" as it were. This works and this works really well, for the most part. There are, however, many issues with this approach. Primarily, using this approach can end up making it very difficult to share data to what you might call "distant components". Let's consider this diagram.

![Diagram #1](/images/diagram.svg)

This diagram depicts a very simple news site. It is made up of 3 pages and two components (that we will be focusing on). There is a global toolbar - where we will be able to show the current user's name and profile picture - that will appear on all the pages and a profile avatar - which would essentially be a profile picture and username. Now, this is a common hurdle that developers will have to face. These two things are separate components, but they both need to use the same data. There are ways around this issue - you could utilise local storage or session storage to save the data in the browser, you could create an event system to send messages between components using some things like web workers or observables, you can even hack things and just using the global variable approach by attaching information to the window object. However, these solutions are workarounds and do have their limits. They are also prone to errors and do not provide a consistent API, making future development on the application and landmine. This is where a global state management system comes in handy. With a system like this in place, your global state sits outside of the rest of your application and can be accessed from within your code. Most of these state managers also allow you to implement side effects and functions that allow you to interact with your global state. The diagram of this app would look like this.

![Diagram #2](/images/diagram2.svg)

This means that we can store the login information for our app in the global state, and we can make that available to the components that need it. Seem like a cool idea? It really is. So let's break down how this kind of system works and how you can start building applications with it. For this example, I will be using CerebralJS which uses a declarative state and has a really cool API. It also supports multiple frameworks including Angular, ReactJS, Vue, Preact, and Inferno. For this example, I will be using React. So, let's get started.

#### Setting Things Up
Naturally, you will need to have a project to work on. For this example, I will use the create React app tool. I am using TypeScript so the command to set up this project will be.

```bash
yarn create react-app state-app --template=typescript
```

On top of the basic setup, you will need to install some other libraries. To do this you can run the following commands.

```bash
yarn add cerebral @cerebral/react classnames react-router-dom
```

```bash
yarn add --dev node-sass @types/react-router-dom
```

You can omit node-sass if you do not want to use sass, and you are welcome to omit classnames and react-router-dom if you have other libraries that you prefer. These three libraries are not vital for this example project, but they are tools that I like to use. It is also not required that you use TypeScript if you don't want to. Simply ignore types and other TypeScript specific things while following along. We are now ready to start coding.

#### The Basic Project Setup
The first thing we need to do is set up our basic project structure. Start by creating a folder in the src folder of your project. This folder will be called config. In this folder, we will create five files: index.ts, actions.ts, state.ts, providers.ts, and sequences.ts. This is where we will configure CerebralJS in our application. Let's start with the index.ts file, where we will create the main container for this application. Let's start by creating the application shell. 

```typescript
import App from "cerebral";
import DevTools from "cerebral/devtools";

export default App(
  ({ app }) => {
    return {};
  },
  {
    devtools: DevTools({
      host: "localhost:8585",
    }),
  }
);
```

This bit of code will actually replace the `App.tsx` in your React app, but we will get to that later. We now need to setup our basic state. This will be done in the `state.ts` file. We simply need to create an object that is export by the file. To start off, our state will be really simple.

```typescript
const State /*If you want to you can add types here*/ = {
    name: 'Jane',
    surname: 'Doe'
}

export default State;
```

In our `index.ts`, we now need to import that state so that it will be available in our application. To do that we will import our state into the `index.ts` file and return it in the first app function.

```typescript
import App from "cerebral";
import DevTools from "cerebral/devtools";
import state from "./state";

export default App(
  ({ app }) => {
    return {
        state
    };
  },
  {
    devtools: DevTools({
      host: "localhost:8585",
    }),
  }
);
```

Now, get this all wired up so that you can see everything in action. This will require a bit of reconfiguring on your application. In the root of your project, locate the `index.tsx file`. It should look something like this.

```tsx
import React from 'react';
import ReactDOM from 'react-dom';
import "./index.css";
import App from './App'

ReactDOM.render(
  <App />,
  document.getElementById('root')
```

Here we need to import some tools from the cerebral library and setup the app container. To do this, your code will end up looking like this.

```tsx
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Container } from "@cerebral/react";
import App from "./config/index";

ReactDOM.render(
  <Container app={App}>
    <h1>Hello World</h1>
  </Container>,
  document.getElementById("root")
);
```

Next, we need to create a page. This is also a little bit different form the standard React model. In another folder in **src**, create a folder called **pages** and inside that folder create another one called **home**. Inside the home folder, create a tsx file called `home.tsx`. In `home.tsx`, you will need to connect to CerebralJS so that you can access your application state. You can do that like this.

```tsx
import React from 'react';
// We import the connect function from cerebral which
// allows us to connect this page to our global state
import { connect } from "@cerebral/react";
// The state function from cerebral allows us to call
// specific properties from state which makes it far
// easier to work with state on our pages.
import { state } from "cerebral";

interface HomeProps {
  name: string;
  surname: string;
}

export const Home = connect(
    // Here we are telling cerebral which items we are
    // going to want from state. 
    { name: state`name`, surname: state`surname` }, 

    // Finally, we return the ui for the page using the
    // data we got from state.
    ({ name, surname }: HomeProps) => {
    return (
        <div className="HomePage">
            <h1>Hello {name} {surname}</h1>
        </div>
    );
})
```

We can now import the home page into our app and finally test the application. We are not going to worry about routing right now, so all you need to do is replace the content of `<Container>` in `index.tsx`.

```tsx
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Container } from "@cerebral/react";
import App from "./config/index";
import {} from './pages/home/home.tsx';

ReactDOM.render(
  <Container app={App}>
    <Home />
  </Container>,
  document.getElementById("root")
);
```

If you run `yarn start` now, your should see **Hello Jane Doe** displayed on the screen.

#### Wiring up the Debugger
One of the great things about CerebralJS is that is come with and absolutely fantastic debugger. I recommend that you get your hands on it at this point as it will help as we develop this application further. You can [download the debugger here](https://cerebraljs.com/docs/introduction/devtools.html).

--- 

That is all for now as it would make the article far too long to have this whole guide on one page. The part two of this series will be available soon where we will dig deeper into CerebralJS and how you can use it to make awesome applications.
