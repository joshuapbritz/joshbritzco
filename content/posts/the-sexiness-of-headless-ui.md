---
title: "The Sexiness of Headless UI Components"
date: 2019-12-02T07:36:20+02:00
draft: false
---

Something I enjoy doing most on the web is creating things that help other developers to be more productive. I especially love creating component libraries and core development kits that can be used to make project bootstrapping and deveopment easier. As a result I have spent a substantial amount of time trying to find newer and better ways of making sure that the components I make are robust, versatile, and easy to use. One of the things I've noticed about components is that we developers have a natural tendency of just make them work in the given immediate use case or context. So often we incorporate business logic, layout logic, and other specifics as part of the component's makeup. Many components are just  abstracted into a separate project from where they are being used, but take no advantage of the benefits provided by doing that. One of the biggest reasons for this, in my opinion, is that components are way too tied to the design iteration they represent. They are made to cater for the designs that can be found at the time of them being made, but have no mindfulness of future enhancements. There have been many times when I've poured hours into making components that work according to specification, look good, are well tested, and have proper documentation. Yet the very next day, I'll get to work only to find that the design has changed or a new use case had been added and so the component has to be updated. This is very frustrating and is the cause of a lot of (often) easily avoidable bugs. 

So what's the solution? If your read the title I'm sure you will be able to guess what I'm going to say next. Headless UI Components. But what are those? Well, to sum it up Headless UI Components are **Components that provide a set of functionalites for a feature without explicitly determining its UI aspect**. Let's look at an example of what I mean. The follwing example is **not** a Headless Component.

```tsx
const Counter: FC = () => {
   const [count, setCount] = useState(0);

   return (
     <div className="counter-wrapper">
       <button onClick={() => setCount(count - 1)}>-</button>
       <span>{count}</span>
       <button onClick={() => setCount(count + 1)}>+</button>
     </div>
   );
}
```

Now it should be quite easy to see what's happening here. We have a component state (thanks to React Hooks) and a component UI. The UI is made up of two buttons for incrementing and decrementing the count value and an output to see what the value is. This works fine and does what its supposed to. However, we are limited to the UI that the component provides for us. Let's say we want to change the text in the buttons to say *more* and *less* rather than *+* and *-*. We could add some props to the component to do that.

```tsx
interface Props {
  decrementText?: string;
  incrementText?: string;
}

const Counter: FC<Props> = (props: Props) => {
  const [count, setCount] = useState(0);

  const {decrementText = '-', incrementText = '+'} = props;

  return (
    <div className="counter-wrapper">
      <button onClick={() => setCount(count - 1)}>{decrementText}</button>
      <span>{count}</span>
      <button onClick={() => setCount(count + 1)}>{incrementText}</button>
    </div>
  );
};
```

Cool! It works. No Sweat. But, now let's say we need to change how much we increment/decrement the counter by each time we click the button. We would need to add yet another propety to our component.

```tsx
interface Props {
  decrementText?: string;
  incrementText?: string;
  stepAmount?: number;
}

const Counter: FC<Props> = (props: Props) => {
  const [count, setCount] = useState(0);

  const { decrementText = '-', incrementText = '+', stepAmount = 1 } = props;

  return (
    <div className="counter-wrapper">
      <button onClick={() => setCount(count - stepAmount)}>
        {decrementText}
      </button>
      <span>{count}</span>
      <button onClick={() => setCount(count + stepAmount)}>
        {incrementText}
      </button>
    </div>
  );
};
```

At this point, we have a component that does 4 things.

1. It allows you to increment its value
2. It allows you to decrement its value
3. It allows you to configure some of it's properties
4. It renders some UI to reflect its state

Now this may even be exactly what you want from your component (and there are certainly times when something like this will be your best bet). However, as you can see, each change we want to make to the component's UI has to be pre-planned and built into the component. It also gets messier with each new state or option you add. 

So what if I want the functionality of the counter (its state, and ability to increment and decrement), but not the UI that is given. In most cases, the solution is to just build a new component that works in the same way as an exsisting component, but render a different UI or, to add another config to the component's props that switches between the two UIs.

But... There is another way. Enter Headless UI Components. Hopefully at this point you can see a use case for a component that provides the functionality you need without caring about it's UI. Let's look at how this would work.


```tsx
interface Arguments {
  count: number;
  increment: (value: number) => void;
  decrement: (value: number) => void;
}

const Counter = (props: { children: (args: Arguments) => JSX.Element }) => {
  const [count, setCount] = useState(0);

  if (!props.children || typeof props.children !== 'function') return null;

  return props.children({
    count,
    increment: (value: number = 1) => setCount(value),
    decrement: (value: number = 1) => setCount(value),
  });
};
```

🤨 what is that?! Admittedly, this code doesn't look super sexy compared to the example we saw before. But, it can do so much more. Because it doesn't control its own UI you can plug any UI you want into it and use its functionality as you want. Below is an implementation of the component that is similar to the non-headless variant.

```tsx
<CounterHeadless>
  {({ count, increment, decrement }: any) => {
    return (
      <div className="counter-wrapper">
        <button onClick={() => decrement(count - 1)}>less</button>
        <span>{count}</span>
        <button onClick={() => increment(count + 1)}>more</button>
      </div>
    );
  }}
</CounterHeadless>
```

Or something with a different layout.

```tsx
<CounterHeadless>
  {({ count, increment, decrement }) => {
    return (
      <div className="counter-wrapper">
        <h2>{count}</h2>
        <button onClick={() => decrement(count - 1)}>-</button>
        <button onClick={() => increment(count + 1)}>+</button>
      </div>
    );
  }}
</CounterHeadless>
```

Or with just the increment function.


```tsx
<CounterHeadless>
  {({ count, increment }: any) => {
    return (
      <div className="counter-wrapper">
        <h2>{count}</h2>
        <button onClick={() => increment(count + 1)}>+</button>
      </div>
    );
  }}
</CounterHeadless>
```

The possiblities for this component, though not endless, are much greater because its UI can be whatever you need it to be (sort of the Batman of components). With Headless Components, you can easily package common utilities for various components and ship them without even having to think about how much padding this button must have, or what color that border will be, or if the border-radius of the other thing should be 5px or 3px. You can simply create a robust component that does everything you need it to, and worry about the UI when you get to actually using the component. 

**So what about components that need to be styled in a specific way?**. A common use case for components is to have pre-styled and tested design elements that can be dropped into a page without having to worry about their styling. The problem is, headless components don't let you do that... Or do they? Just because you make use of headless components doesn't mean that you should never build components that have UI. In fact headless components can make this process even easier. If we take the example of the counter above, we can see that we have created a few different variations of that counter. Using the headless counter component we built, we can make each of these counters into their own component without having to duplicate functionality accross components.

```tsx
const Counter: FC = () => {
  return (
    <CounterHeadless>
      {({ count, increment, decrement }) => {
        return (
          <div className="counter-wrapper">
            <button onClick={() => decrement(count - 1)}>less</button>
            <span>{count}</span>
            <button onClick={() => increment(count + 1)}>more</button>
          </div>
        );
      }}
    </CounterHeadless>
  );
};

const CounterStacked: FC = () => {
  return (
    <CounterHeadless>
      {({ count, increment, decrement }) => {
        return (
          <div className="counter-wrapper">
            <h3>{count}</h3>
            <button onClick={() => decrement(count - 1)}>less</button>
            <button onClick={() => increment(count + 1)}>more</button>
          </div>
        );
      }}
    </CounterHeadless>
  );
};

const CounterLabeled: FC<{ label: string }> = ({ label }) => {
  return (
    <CounterHeadless>
      {({ count, increment, decrement }) => {
        return (
          <div className="counter-wrapper">
            <h3>
              {label} - {count}
            </h3>
            <button onClick={() => decrement(count - 1)}>less</button>
            <button onClick={() => increment(count + 1)}>more</button>
          </div>
        );
      }}
    </CounterHeadless>
  );
};

export { CounterLabeled, Counter, CounterStacked };
```

And there you go. Three components for the price of one. You can use each one of the above counters as preset components in your app or, if you need to, you can just use the headless base version and create your own variation. 

---

In my opinion, components are way too tied to specific designs. Many components you'll find today are mangled cesspools of uneeded configurations, business logic, and styling. We spend so much time creating components that look and work exactly according to specififcation only to have to overwrite so much of our work because one of the designers thought it would be "cooler" if the arrow was on the other side of the button on this page. Overall, I think that headless components are a great way of getting around this problem as well as many others that we face when creating components.