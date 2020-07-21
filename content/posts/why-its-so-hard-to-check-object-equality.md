---
title: "Why It's So Hard to Check Object Equality in JavaScript"
date: 2019-11-19T08:23:48+02:00
draft: false
headerUrl: "images/why-its-so-hard-to-check-object-equality.jpg"
---

The other day I was working on a bit of code where I found myself having to check if two JavaScript objects were equal, namely, do two objects have the same keys and values. The first thing I tried was putting them into a simple equality check (using ===) and thought that my problem was solved. However, it turns out that comparing JavaScripts objects is much harder than I thought.

I spent quite a bit of time trying to find a solution to this problem that covered all the edge cases so I decided to write an article about it. I hope my findings will be helpful.

### A Breakdown of the Problem

So that we are on the same page, I'm going to quickly break down what the issue is with a quick example:


```typescript
const a = { name: 'simple object' };
const b = a;

console.log(a === b); // -> true

const c = { name: 'simple object' };

console.log(a === c); // -> false
```

Huh? That doesn't seem right. Both **a** and **c** look like they are equal. However, comparing them together using **===** we get a false value.

So why does this happen? Well, the main reason this happens is that (`===`) doesn't check that both objects have the same property keys and values. Instead, it checks that the two objects occupy the same place in memory. Hence, when we declare **a** it is given a place in memory. When we assign **a** to **b**, we are not declaring a new object, rather we are telling **b** that its value is in the same location as **a**. So essentially, when we do `a === b`, it returns true because we are essentially doing `a === a` (which is obviously going to be true).

However, when we take **a** (its value being { name: 'simple object' }) and compare it to a new object that looks the same (`a === c`), we get false. The reason this happens is that the object we assigned to **c** occupies a different place in memory than **a**. Therefore, when *===* tries to check if the two objects are the same place in memory, it returns false because they are in different places in memory. 

An interesting little side note here is that when we assign **a** to **b**, we can actually change properties in **b** and yet it will still be equal to **a** using *===*.


```typescript
const a = { name: 'simple object' };
const b = a;

console.log(a === b); // -> true

b.name = 'Changed Name';

console.log(a === b); // -> true

console.log(a); // -> { name: 'Changed Name' }
console.log(b); // -> { name: 'Changed Name' }
```

Because **b** simply references variable **a**'s place in memory, changing a value in **b** also changes that value in **a**.

### So What's the Solution?

I spent a fair amount of time trying to find a good solution to this problem and found a few different solutions that do work. Because the use cases you might have are different, I will show a few of the solutions I found and give a brief explanation of each.

#### Solution 1 - JSON.stringify

If you have a fairly simple object, it is quite easy to use JSON.stringify to check if they are equal.

```typescript
const a = { name: "Joshua" };
const b = { name: "Joshua" };

console.log(a === b); // -> false

console.log(JSON.stringify(a) === JSON.stringify(b)); // -> true
```

This works, but it is not very reliable. It will require that all your keys and values are in the same order, otherwise, it will see the two objects as unequal.

```typescript
const a = { name: "Joshua", surname: "Britz" };
const b = { surname: "Britz", name: "Joshua" };

console.log(JSON.stringify(a) === JSON.stringify(b)); // -> false
```

This method is not recommended but can work in certain situations.

#### Solution 2 - Shallow Key/Value check

This solution should work for a large number of cases. We simple extract the keys from our object, make sure that they match, and then check if the values of those keys match as well.

```typescript
const a = { name: "Joshua", surname: "Britz" };
const b = { surname: "Britz", name: "Joshua" };

function areTheseObjectsEqual(first, second) {
  const al = Object.getOwnPropertyNames(first);
  const bl = Object.getOwnPropertyNames(second);

  // Check if the two list of keys are the same
  // length. If they are not, we know the objects
  // are not equal.
  if (al.length !== bl.length) return false;

  // Check that all keys from both objects match
  // are present on both objects.
  const hasAllKeys = al.every(value => !!bl.find(v => v === value));

  // If not all the keys match, we know the
  // objects are not equal.
  if (!hasAllKeys) return false;

  // We can now check that the value of each
  // key matches its corresponding key in the
  // other object.
  for (const key of al) if (first[key] !== second[key]) return false;

  // If the object hasn't return yet, at this
  // point we know that the objects are the
  // same
  return true;
}

console.log(areTheseObjectsEqual(a, b)); // -> true
```

#### Solution 3 - Deep Equals.

So solution two works, but it has limitations. It will work fine if your object is fairly flat in its structure. But when we get to more complex objects with nested values, it fails badly. So, we need a better solution for cases like this. Here is the solution I ended up using:

```typescript
const a = {
  name: "Joshua",
  surname: "Britz",
  pets: [
    { type: "cat", name: "Florence" },
    { type: "cat", name: "Da Vinci" }
  ]
};

const b = {
  surname: "Britz",
  name: "Joshua",
  pets: [
    { type: "cat", name: "Florence" },
    { type: "cat", name: "Da Vinci" }
  ]
};

function areTheseObjectsEqual(first, second) {
  "use strict";

  // If the value of either variable is empty
  // we can instantly compare them and check
  // for equality.
  if (
    first === null ||
    first === undefined ||
    second === null ||
    second === undefined
  ) {
    return first === second;
  }

  // If neither are empty, we can check if
  // their constructors are equal. Because
  // constructors are objects, if they are
  // equal, we know the objects are of the
  // same type (though not necessarily of
  // the same value).
  if (first.constructor !== second.constructor) {
    return false;
  }

  // If we reach this point, we know both
  // objects are of the same type so all
  // we need to do is check what type one
  // of the objects is, and then compare
  // them
  if (first instanceof Function || first instanceof RegExp) {
    return first === second;
  }

  // Throught back to the equlity check
  // we started with. Just incase we are
  // comparing simple objects.
  if (first === second || first.valueOf() === second.valueOf()) {
    return true;
  }

  // If the value of check we saw above
  // failed and the objects are Dates,
  // we know they are not Dates because
  // Dates would have equal valueOf()
  // values.
  if (first instanceof Date) return false;

  // If the objects are arrays, we know
  // they are not equal if their lengths
  // are not the same.
  if (Array.isArray(first) && first.length !== second.length) {
    return false;
  }

  // If we have gotten to this point, we
  // need to just make sure that we are
  // working with objects so that we can
  // do a recursive check of the keys and
  // values.
  if (!(first instanceof Object) || !(second instanceof Object)) {
    return false;
  }

  // We now need to do a recursive check
  // on all children of the object to
  // make sure they are deeply equal
  const firstKeys = Object.keys(first);

  // Here we just make sure that all the
  // object keys on this level of the
  // object are the same.
  const allKeysExist = Object.keys(second).every(
    i => firstKeys.indexOf(i) !== -1
  );

  // Finally, we pass all the values of our
  // of each object into this function to
  // make sure everything matches
  const allKeyValuesMatch = firstKeys.every(i =>
    areTheseObjectsEqual(first[i], second[i])
  );

  return allKeysExist && allKeyValuesMatch;
}

console.log(areTheseObjectsEqual(a, b)); // -> true
```

This method will cover most use cases and is fairly reliable. There is one caveat that I am aware of, and that is that it does have a dependency on the order of your arrays. 

```typescript
const one = [1,2,3,4];
const two = [4,3,2,1];

console.log(areTheseObjectsEqual(one, two)); // -> false
```

If you need to check array equality, you may need to look at a different solution.

#### Solution 4 - Use a library (😱🙀🤯)

Now, I'm not advocating for the use of external packages for every situation. The above three solutions will most like work for the majority of situations you come across. However, if you are already using a library that has support for this, or the need you have can justify adding a package to your app, there are definitely very good solutions out there. I won't go into all of them, but a good one that I know of is loadash's _.isEqual method (https://lodash.com/docs/4.17.11#isEqual). 