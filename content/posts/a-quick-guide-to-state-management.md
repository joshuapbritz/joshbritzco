---
title: "A Quick Guide to State Management in React"
subtitle: "An non-exhaustive walk-through of how to manage state in your React applications without too much hassle"
date: 2022-09-06T00:00:00+00:00
draft: false
tags: ["Workflow", "React", "State Management", "UI", "UX"]
headerUrl: "images/state-management.jpeg"
---

Page state management is a tricky business. Naturally, most developers either opt for using some sort of global state management or they use React's built-in `useState` hook. Both of these have their place, but they are not always the ideal for managing page state. Things can get complicated very quickly. When it comes to page state, we might be looking at a variety of different input sources and data objects that all need to be coordinated in order to get the page to display as required. On top of that, need to make sure that the page renders and re-renders at the correct time to ensure that the user is seeing exactly what they are supposed to. 

This guide will walk you through some of the do's and don'ts of state management.

## Types of Application State
Application state can be defined as "data that can persist through the render cycles of a component and contributes to the rendering of a component or page". For example, the variable (`title`) in the below component would not be considered application state.

```tsx
export function Page() {
   const title: string = `My Page Title`;

   return <div>{title}</div>
}
```

This variable is connected to the render cycle of the page and cannot be changed, edited, or varied. This is because every time the component re-renders, the variable would be set to title and would never be updatable. In this instance, ee would rather want to use something that will allow us to work with our data throughout component renders, and that will give us control over re-rendering the component when data changes. The tools we will use to do this are Global State, `useState`, `useRef`, and `useReducer`. Each have their place and each work in a different way. In this guide, I will try to walk you through how and when to use each.

### Global State
Global state is a way of managing state where your data is available to your whole application. Data in the global state will persist across various pages and components, and will cause all components and that have access to that data re-render when that data changes. This can be very useful as it will allow you to essentially have a session for your data that will allow you to access and update the same data in different places, without having to load and fetch it every time.

#### When to use it
Global state should only be used for state that truly needs to be global (duh). It might be tempting to through all your data into the global state, as this makes life a lot easier in the short term. The issue is that doing so can cause your global state to very quickly become bloated and hard to manage or understand. When deciding if certain data should be included in the global state, consider the below criteria.

- The data must be used or updatable in at least two separate components
- It should be guaranteed that the data will be used
- The data should be used to affect the general architecture of the application
- The data populated should not be filtered past the user/organisation dimension (ie, the top level of filtering you have available).

Global state is very useful for things like user settings and information, theme configs, and application statuses. It is also very useful for storing data globally that will need to be access on multiple pages. If I have a list of courses that I need to fetch for one single page, for example, this *would not* go into the global state. The would inflate and complicate the global state over time, and would make it harder to debug my pages. However, if I have list of countries that a user can choose from when filling out forms in various places across the site, it may make sense to keep that data in global state as it would reduce the number of service calls that need to be done across the application. Another common use for global state is to store user details that would be used for messaging and stylisation across an application.

#### How to use it
There are a few different tools that are available to React developers when it comes to global state. My favourite is [Overmind](https://overmindjs.org/), but there are a other options available to use. Another commonly used tool is [React Redux](https://react-redux.js.org/). For this example, I am going to show the setup with Overmind, though the principles remain the same across most global state management tools.

To setup global state in, you need to update the initial state and state model objects (if you are using TypeScript). The best thing to do in this case is to start by editing the state model. When doing this, try to determine what the logical initial state of that should be. Typically, if a state property is not a required property, it should be `undefined` by default (ie, not an empty array or empty string). Think of your initial state as the boilerplate of your application - it is going to be what your are going to start scaffolding your pages with.

Now, let's say we are going to add a new global state property called `companyName` which is going to be a string. This value is going to be populated based on the user who is logged in and will be used in various places to stylise and white-label them. First, we would need to define that value in the `GlobalState` model.

```ts
export interface GlobalState {
   ...
   companyName: string;
   ...
}
```

Note that this property is not an optional parameter (eg. `companyName?: string;`). This is because it is going to have a default value when the application is booted up. We now need to populate that initial value. To do this, we need to set up the initial state in Overmind. This will usually be in the `state.ts` file in the `overmind` folder of a project. In that initial state object, we now need to populate our variable. 

```ts
export const state: GlobalState = {
   ...
   companyName: 'Josh Britz Co',
   ...
}
```

This variable is now available to our application. In a page our component, it can be used by calling the `useAppState` hook as in the below example.

*\*Bear in mind that `useAppState` is a feature of Overmind. Other global state management systems will have different methods for accessing your data.*

```tsx
export function Page() {
   const { companyName } = useAppState();

   return <div>Name of the company: {companyName}</div>
}
```

Of course, we are actually going to want to be able to set that value. To do this, we need to make use of another overmind tool called *actions*. These are predefined function that exist globally in our application and will allow us to edit the state of our application in a controlled and predictable way. Actions are defined in the `actions` folder, within the project's `overmind` folder. An action will look like this. Once again, most global state management systems have a similar concept to this, though they may be implemented slightly differently.

```ts
export function setCompanyName(context: Context): void {
   // Do something here
}
```

Here we are defining an action that we will use to set the company name. You will see that there is a parameter called `context`. This is an object that contains all the information about the global state. We can use this to edit the `companyName` property in our global state. To do this, we can add the following to our function.

```ts
export function setCompanyName(context: Context, name: string): void {
   context.state.companyName = name;
}
```

This action is now available to the global application, and can be used as in the below example

```tsx
export function Page() {
   const { companyName } = useAppState();
   const actions = useAppActions();

   return (
      <div>
         <h1>Name of the company: {companyName}</h1>
         <button onClick={() => actions.setCompanyName('My Company Name')}>Update Name</button>
      </div>
   );
}
```

On clicking that button, the global state variable will be edited, and the page would be updated to match. In essence, this is how global state management would be used in your applications. This guide is not a tutorial in using Overmind, so if you are interested in learning more about it, I suggest [checking out their docs](https://overmindjs.org/). Maybe I'll look at doing an Overmind tutorial at some point in the future.

### useState
I would guess that this is one of React's most utilised hooks. It allows you to persist data across renders within a component, and will automatically re-render the component when it's value changes. It is the successor of the classic class based state management that can be used in React, but is much more straightforward and intuitive (in my opinion). An example of the hook in use would be.

```tsx
export function Page() {
   const [companyName, setCompanyName] = useState<string>('Josh Britz Co');

   return (
      <div>
         <h1>Name of the company: {companyName}</h1>
         <button onClick={() => setCompanyName('My Company Name')}>Update Name</button>
      </div>
   );
}
```

Like in the example with overmind, clicking the button on this page would result in the page displaying a different company name. However, this variable change will be kept to the scope of this page and will not affect the application as a whole. Calling `setCompanyName` allows us to change the variable and when `setCompanyName` is called, the page will be re-rendered so that the updates are shown. This is great for state that is not very complicated. 

#### When to use it
`useState` should be used when you need data on a specific page and when that page does not have more than two or three complex data points in use. The important thing to know here is that `useState` cause your page to re-render when it is set. If you have 5 state variables that you are using to store data for you page, this means that your page will be re-rendered 5 times. Of course, React has got some fancy optimisation features to help reduce unneeded renders, especially in React 18, but this is still not ideal. `useState` is also a less strictured way of managing state as it does not limit the way in which your page state can be edited. As a result, your pages can become very messy and hard to work with over time, and will be prone to more errors and breakages.

I suggest, only using `useSate` for simple data types (ie, boolean, string, number), and try to only use it if there are very few complex data structures in your page. If you do use it for more complex data (like arrays and objects), try to make sure that you clearly define when and how your state is being updated (if you can, try to explain why you are updating your state wherever you are doing so).

#### How to use it
`useState` is fairly simple to use. You start by declaring the hook and destructing and naming your variables.

```ts
const [value, setValue] = useState();
```

It is good practice to define both an initial value (if that is not going to be `undefined`) and a type value (if you are using TypeScript). The initial value should be left blank if it is `undefined`, rather than specifying `undefined` as a value.

```ts
const [value, setValue] = useState<number>(0);
```

This variable is now available to your component, available as `value`, and can be changed using the `setValue` function. 

```ts
export function Page() {
   const [value, setValue] = useState<number>(0);

   return (
      <div>
         <h1>Count: {value}</h1>
         <button onClick={() => setValue(value + 1)}>+</button>
         <button onClick={() => setValue(value - 1)}>-</button>
      </div>
   );
}
```

One less know little feature of the `useState` hook is that the setter function that is provided gives access to the current state value. You could rather do the following in the above example.

```ts
return (
    <div>
        <h1>Count: {value}</h1>
        <button onClick={() => setValue(previousValue => previousValue + 1)}>+</button>
        <button onClick={() => setValue(previousValue => previousValue - 1)}>-</button>
    </div>
);
```

### useRef
`useRef` is less common for state management, but can be quite useful. `useRef` is great for storing values that you want to have persist through page renders, but that you don't want to cause the page to re-render for. This can help you to have control over the render of you page or component. 


```tsx
export function Page() {
   const companyName = useRef('Josh Britz Co');

   return (
      <div>
         <h1>Name of the company: {companyName.current}</h1>
         <button onClick={() => {
            companyName.current = 'My Company Name';
         }}>Update Name</button>
      </div>
   );
}
```

Unlike with overmind and `useSate`, clicking the Update Name button will do nothing to the page. `useRef` allows you to use values that will persist through page renders, but will not cause the page to re-render when changed. One might use this if multiple variables might need to be changed, and where you want to have full control over when in your logic your component will re-render. Below is an example of how `useRef` might be used.

```tsx
export function Page() {
   const companyName = useRef('Josh Britz Co');
   const companySize = useRef(10);
   const [companyLocation, setCompanyLocation] = useSate('England');

   return (
      <div>
         <h1>Name of the company: {companyName.current} {companySize.current} {companyLocation}</h1>
         <button onClick={() => {
            companyName.current = 'My Company Name'; // Doesn't re-render component
            companySize.current = 8; // Doesn't re-render component
            setCompanyLocation('Scotland'); // Re-renders component and will cause the changes to the above variables to reflect
         }}>Update Info</button>
      </div>
   );
}
```

### useReducer
When it comes to complex page state, `useState` can be a major pain to use. Consider the below example

```tsx
export function SelectUserPage() {
   const [isLoading, setIsLoading] = useState<boolean>(false);
   const [isSaving, setIsSaving] = useState<boolean>(false);
   const [users, setUsers] = useState<User[]>();
   const [countries, setCountries] = useState<Country[]>();
   const [selectedUser, setSelectedUser] = useState<User>();
   const [selectedCountry, setSelectedCountry] = useState<Country>();

   useEffect(() => {
      setIsLoading(true); // - Re-renders the page

      Promise.all([
         fetch('/get/users/request/path').then(d => d.json()), 
         fetch('/get/countries/request/path').then(d => d.json()),
      ]).then(([users, countries]) => {
         setUsers(users); // - Re-renders the page
         setCountries(countries); // - Re-renders the page
         setIsLoading(false); // - Re-renders the page
      });
   }, []);

   return (
      <React.Fragment>
         <div className="form-control">
            <select onChange={event => setSelectedUser(event.target.selectedOptions[0].value) /* Re-renders the page */}>
               {users.map(user => {
                  return <option value={user.id}>{user.name}</option>
               })};
            </select>
         </div>

         <div className="form-control">
            <select onChange={event => setSelectedCountry(event.target.selectedOptions[0].value) /* Re-renders the page */}>
               {countries.map(country => {
                  return <option value={country.id}>{country.name}</option>
               })};
            </select>
         </div>

         <div className="form-control">
            <button onClick={() => setIsSaving(true) /* Re-renders the page */}>save</button>
         </div>
      </React.Fragment>
   );
}
```

This is a fairly simple page. We are fetching a list of users and countries that will populate a form for us. We are then allowing the user to select a person from a dropdown and a country from another dropdown. When we are fetching the list of countries and users, we set a loading variable so the the loading can be indicated on the page. When the user clicks the save button, we set `isSaving` variable to indicate that a save is in process. As you can tell, even this simple page state is complex and causes the page to re-render a lot (4x times just to load the first page data). `useState` is great for managing simple state, but quickly becomes unmanageable. This is where `useReducer` comes in. It gives you a simple interface with predefined ways that your state can be managed. This means that your page state will be more predictable and far less prone to error. Of course, the re-rendering aspect of this page is less of a concern in newer versions of React.

#### When to use it
Typically, `useReducer` should be used on any page or component that has more than about 3-4 state variables. There is an issue of diminishing returns when using the tool, as it can be cumbersome and unwieldy if there is only one state variable that your are using. Another good indicator of when to use `useReducer` is when you are updating multiple parts of your state in one go. It is usually fairly straightforward to convert your page or component between `useState` and `useReducer`, so you may start with one or the other and then change over as your component matures.

The golden rule is scalability. We want to make components, pages, and apps that can be easily updated and changed. The type of state management we use will often come down to the option that contributes best to this principle.

#### How to use it
`useReducer` is quite straightforward. One of the key advantages it offers is that you end up separating your state logic into a separate file from your UI code. Let's re-create the example page from above to use the `useReducer` hook.

```tsx
// -> select-user.state.ts
export interface SelectUserState {
   users?: User[];
   countries?: Country[];

   selectedUser?: User;
   selectedCountry?: Country;

   isLoading: boolean;
   isSaving: boolean;
}

export const initialState: SelectUserState = {
   isLoading: true;
   isSaving: false;
};

export function reducer(state: SelectUserState, action: any): SelectUserState {
   if (action.type === 'populate') {
      return { ...state, users: action.payload.users, countries: action.payload.countries, isLoading: false };
   }

   if (action.type === 'select-user') {
      return { ...state, selectedUser: action.payload };
   }

   if (action.type === 'select-country') {
      return { ...state, selectedCountry: action.payload };
   }

   if (action.type === 'save') {
      return { ...state, isSaving: true };
   }

   return state;
}

// -> select-user.page.tsx
import * as st from './select-user.state.ts';

export function SelectUserPage() {
   const [state, dispatch] = useReducer(st.reducer, st.initialState);

   useEffect(() => {
      Promise.all([
         fetch('/get/users/request/path').then(d => d.json()), 
         fetch('/get/countries/request/path').then(d => d.json()),
      ]).then(([users, countries]) => {
         dispatch({ type: 'populate', payload: { users, countries } }); // - Re-renders the page
      });
   }, []);

   return (
      <React.Fragment>
         <div className="form-control">
            <select onChange={event => dispatch({ type: 'select-user', payload: event.target.selectedOptions[0].value }) /* Re-renders the page */}>
               {state.users.map(user => {
                  return <option value={user.id}>{user.name}</option>
               })};
            </select>
         </div>

         <div className="form-control">
            <select onChange={event => dispatch({ type: 'select-country', payload: event.target.selectedOptions[0].value }) /* Re-renders the page */}>
               {state.countries.map(country => {
                  return <option value={country.id}>{country.name}</option>
               })};
            </select>
         </div>

         <div className="form-control">
            <button onClick={() => dispatch({ type: 'save' }) /* Re-renders the page */}>save</button>
         </div>
      </React.Fragment>
   );
}
```
Now, you might immediately notice that there seems to be a lot more code here. However, this code is much cleaner and will scale much more easily. Notice, also, how much cleaner the component code is. We are simply populating the data in that `useEffect` call. Outside of that, all the state logic is in a different place. 

One of the big advantages of using this method of state management is that you have to define every way you can change your state. This means that you can't accidentally change your state without realising it, and it will also mean that it is much easier to see what state actions you have available.

---

State management is an integral part of every app. The learning curve for state management in React is very low at the start, but grows quickly in complexity as your application grows. I hope this article offers just a little bit of guidance that can help you create neater applications. There is certainly much more that can be said about state management in React, but that will have to be the subject of another article.
