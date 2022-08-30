---
title: "Create a Keybinding Service in Angular"
date: 2019-11-06T08:26:30+02:00
draft: false
headerUrl: "images/create-a-keybinding-service-in-angular.jpg"
tags: ["Angular", "TypeScript", "Utilities"]
---

A common frustration I come across when working with Angular (or any other framework for that matter), is running functions based on key bindings. The typical method of doing this is unreadable and messy. For example, if you wanted to run a function when a user hit <strong>CTRL+ALT+D</strong>, your code would look something like this.

```typescript
window.addEventListener('keydown', (event: KeyboardEvent) => {
   // Fall back to event.which if event.keyCode is null
   const keycode = event.keyCode || event.which;

   if (keycode === 68 && event.ctrlKey && event.altKey) {
     // Do stuff here
   }
});
```

True, it could be worse. Never the less, doing this can become very messy
very quickly. It is also difficult to quickly find and fix problems because you have to know the exact number of each key code to know what key command is being listened for. In a recent project, I was working on, I decided to remedy the issue by abstracting the process into an Angular service and now I'm going to show you how to do it.

## Creating a project

Because we are making an Angular service, you will need to have an Angular project to work in. You can use an existing one, or you can create a new blank project to play around with.

```bash
$ ng new KeyBindServiceApp
```

You should now have a fresh project to work in.


## Setting things up

First of all, we need to create a service that will do all our work.

```bash
$ ng g service path/to/services/key-bind
```

Your newly created service should look something like this.

```typescript
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class KeyBindService {
  constructor() { }
}
```

In the same folder as your service, create two new files: one called **modifiers.ts** and one called **keycodes.ts**, and copy the following code into them. You can move these later, but for now, it is easier to keep them in the same folder as your service.

```typescript
/**
* Checks if an event has any of the provided
* keycodes
* @param {KeyboardEvent} event
* @param {Array<number>} codes
*/
export function hasKeycode(event: KeyboardEvent, codes: number[]): boolean {
  return codes.some(value => (event.keyCode || event.which) === value);
}

export const KEYS = { A: 65, ALT: 18, APOSTROPHE: 192, AT_SIGN: 64, B: 66, BACKSLASH: 220, BACKSPACE: 8, C: 67, CAPS_LOCK: 20, CLOSE_SQUARE_BRACKET: 221, COMMA: 188, CONTEXT_MENU: 93, CONTROL: 17, D: 68, DASH: 189, DELETE: 46, DOWN_ARROW: 40, E: 69, EIGHT: 56, END: 35, ENTER: 13, EQUALS: 187, ESCAPE: 27, F: 70, F1: 112, F10: 121, F11: 122, F12: 123, F2: 113, F3: 114, F4: 115, F5: 116, F6: 117, F7: 118, F8: 119, F9: 120, FF_EQUALS: 61, FF_MINUS: 173, FF_MUTE: 181, FF_SEMICOLON: 59, FF_VOLUME_DOWN: 182, FF_VOLUME_UP: 183, FIRST_MEDIA: 166, FIVE: 53, FOUR: 52, G: 71, H: 72, HOME: 36, I: 73, INSERT: 45, J: 74, K: 75, L: 76, LAST_MEDIA: 183, LEFT_ARROW: 37, M: 77, MAC_ENTER: 3, MAC_META: 224, MAC_WK_CMD_LEFT: 91, MAC_WK_CMD_RIGHT: 93, META: 91, MUTE: 173, N: 78, NINE: 57, NUM_CENTER: 12, NUM_LOCK: 144, NUMPAD_DIVIDE: 111, NUMPAD_EIGHT: 104, NUMPAD_FIVE: 101, NUMPAD_FOUR: 100, NUMPAD_MINUS: 109, NUMPAD_MULTIPLY: 106, NUMPAD_NINE: 105, NUMPAD_ONE: 97, NUMPAD_PERIOD: 110, NUMPAD_PLUS: 107, NUMPAD_SEVEN: 103, NUMPAD_SIX: 102, NUMPAD_THREE: 99, NUMPAD_TWO: 98, NUMPAD_ZERO: 96, O: 79, ONE: 49, OPEN_SQUARE_BRACKET: 219, P: 80, PAGE_DOWN: 34, PAGE_UP: 33, PAUSE: 19, PLUS_SIGN: 43, PRINT_SCREEN: 44, Q: 81, QUESTION_MARK: 63, R: 82, RIGHT_ARROW: 39, S: 83, SCROLL_LOCK: 145, SEMICOLON: 186, SEVEN: 55, SHIFT: 16, SINGLE_QUOTE: 222, SIX: 54, SLASH: 191, SPACE: 32, T: 84, TAB: 9, THREE: 51, TILDE: 192, TWO: 50, U: 85, UP_ARROW: 38, V: 86, VOLUME_DOWN: 174, VOLUME_UP: 175, W: 87, X: 88, Y: 89, Z: 90, ZERO: 48 };

export type KeyNames = keyof typeof KEYS;
```

```typescript
export type ModifierKey = 'altKey' | 'shiftKey' | 'ctrlKey' | 'metaKey';
export const MODIFIERS = ['altKey', 'shiftKey', 'ctrlKey', 'metaKey'];
/**
 * Checks whether a modifier key is pressed.
 * @param event Event to be checked.
 */
export function hasModifierKey(event: KeyboardEvent, ...modifiers: ModifierKey[]): boolean {
  if (modifiers.length) {
    return modifiers.some(modifier => event[modifier]);
  }
  
  return event.altKey || event.shiftKey || event.ctrlKey || event.metaKey;
}
```

These files contain helpers we will use to make our service work properly. For example, <strong>keycodes.ts</strong> has a list of all the key codes, mapped to readable names, and <strong>modifiers</strong> has a helper function to check if one or more modifier keys are present in and event.

Theoretically, they would already make your life easier. You could use them as below.

```typescript
window.addEventListener('keydown', (event: KeyboardEvent) => {
  const { D } = KEYS;

  if (hasKeycode(event, D) && hasModifierKey(event, 'ctrlKey', 'altKey')) {
    // Do action
  }
});
```

This code is much cleaner, but we can do better than that. What we want is a declarative way of listening to key events.

In the key bind service, you will create a new method called **match()**. We will have parameters so that you can specify the keys and modifiers you want to listen for, some extra options, and we will return an Observable that fires when the binding is matched.

```typescript
public match(matchKey: KeyNames, matchModifiers: ModifierKey[] = [], options?: MatchConfig): Observable<KeyboardEvent> {
  const { listenOn } = new MatchConfig(options);

  return new Observable((observer) => {
    const listener$ = fromEvent(listenOn, 'keydown');
  });
}
```

And a class for your extra config

```typescript
export class MatchConfig {
  public listenOn: EventTarget = window;

  constructor(init: Partial<MatchConfig>) {
    Object.assign(this, init);
  }
}
```

Now that we have out plumbing in place, we will need to subscribe to our keydown listener and check if the current event's keys match the binding specified. To do that, we will use the methods defined in **keycodes.ts** and **modifiers.ts**.

```typescript
public match(matchKey: KeyNames, matchModifiers: ModifierKey[] = [], options?: MatchConfig): Observable<KeyboardEvent> {
  const { listenOn } = new MatchConfig(options);

  return new Observable((observer) => {
    const listener$ = fromEvent(listenOn, 'keydown');
    
    listener$.subscribe((event: KeyboardEvent) => {
      if (
        hasKeycode(event, KEYS[matchKey]) && (!matchModifiers.length || hasModifierKey(event, ...matchModifiers))) {
        observer.next(event);
      }
    });
  });
}
```

_*note_ we added **(!matchModifiers.length || hasModifierKey(event, ...matchModifiers)** to the if statement so that it can match a binding that has no modifiers.

The service is now ready to be used. You can provide it to a component through the constructor.

```typescript
constructor(private keybind: KeyBindService) {}
```

And to use it

```typescript
const binding$ = this.keybind.match(KEYS.RIGHT_ARROW, ['ctrlKey']).subscribe(() => {
  alert('binding pressed');
});

// to stop listening to the binding call .unsubscribe on it
binding$.unsubscribe()
```

---

If you want to see this project in action, you can [find it here](https://github.com/joshuapbritz/KeybindingServiceInAngular).