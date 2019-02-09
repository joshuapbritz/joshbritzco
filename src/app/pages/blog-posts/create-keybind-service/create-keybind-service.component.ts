import { Component, OnInit } from '@angular/core';
import { hasKeycode, KEYS } from 'src/app/services/key-bind/keycodes';
import { hasModifierKey } from 'src/app/services/key-bind/modifiers';
import { KeyBindService } from 'src/app/services/key-bind/key-bind.service';

@Component({
  selector: 'app-create-keybind-service',
  templateUrl: './create-keybind-service.component.html',
  styleUrls: ['./create-keybind-service.component.scss'],
})
export class CreateKeybindServiceComponent implements OnInit {
  public snippets = {
    snippet1: `window.addEventListener('keydown', (event: KeyboardEvent) => {
    // Fall back to event.which if event.keyCode is null
    const keycode = event.keyCode || event.which;

    if (keycode === 68 && event.ctrlKey && event.altKey) {
      // Do stuff here
    }
});`,
    snippet2: `ng new KeyBindServiceApp`,
    snippet3: `ng g service path/to/services/key-bind`,
    snippet4: `import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class KeyBindService {

  constructor() { }
}`,
    snippet5: `/**
* Checks if an event has any of the provided
* keycodes
* @param {KeyboardEvent} event
* @param {Array<number>} codes
*/
export function hasKeycode(event: KeyboardEvent, ...codes: number[]): boolean {
  return codes.some(value => (event.keyCode || event.which) === value);
}

export const KEYS = {
  A: 65,
  ALT: 18,
  APOSTROPHE: 192,
  AT_SIGN: 64,
  B: 66,
  BACKSLASH: 220,
  BACKSPACE: 8,
  C: 67,
  CAPS_LOCK: 20,
  CLOSE_SQUARE_BRACKET: 221,
  COMMA: 188,
  CONTEXT_MENU: 93,
  CONTROL: 17,
  D: 68,
  DASH: 189,
  DELETE: 46,
  DOWN_ARROW: 40,
  E: 69,
  EIGHT: 56,
  END: 35,
  ENTER: 13,
  EQUALS: 187,
  ESCAPE: 27,
  F: 70,
  F1: 112,
  F10: 121,
  F11: 122,
  F12: 123,
  F2: 113,
  F3: 114,
  F4: 115,
  F5: 116,
  F6: 117,
  F7: 118,
  F8: 119,
  F9: 120,
  FF_EQUALS: 61,
  FF_MINUS: 173,
  FF_MUTE: 181,
  FF_SEMICOLON: 59,
  FF_VOLUME_DOWN: 182,
  FF_VOLUME_UP: 183,
  FIRST_MEDIA: 166,
  FIVE: 53,
  FOUR: 52,
  G: 71,
  H: 72,
  HOME: 36,
  I: 73,
  INSERT: 45,
  J: 74,
  K: 75,
  L: 76,
  LAST_MEDIA: 183,
  LEFT_ARROW: 37,
  M: 77,
  MAC_ENTER: 3,
  MAC_META: 224,
  MAC_WK_CMD_LEFT: 91,
  MAC_WK_CMD_RIGHT: 93,
  META: 91,
  MUTE: 173,
  N: 78,
  NINE: 57,
  NUM_CENTER: 12,
  NUM_LOCK: 144,
  NUMPAD_DIVIDE: 111,
  NUMPAD_EIGHT: 104,
  NUMPAD_FIVE: 101,
  NUMPAD_FOUR: 100,
  NUMPAD_MINUS: 109,
  NUMPAD_MULTIPLY: 106,
  NUMPAD_NINE: 105,
  NUMPAD_ONE: 97,
  NUMPAD_PERIOD: 110,
  NUMPAD_PLUS: 107,
  NUMPAD_SEVEN: 103,
  NUMPAD_SIX: 102,
  NUMPAD_THREE: 99,
  NUMPAD_TWO: 98,
  NUMPAD_ZERO: 96,
  O: 79,
  ONE: 49,
  OPEN_SQUARE_BRACKET: 219,
  P: 80,
  PAGE_DOWN: 34,
  PAGE_UP: 33,
  PAUSE: 19,
  PLUS_SIGN: 43,
  PRINT_SCREEN: 44,
  Q: 81,
  QUESTION_MARK: 63,
  R: 82,
  RIGHT_ARROW: 39,
  S: 83,
  SCROLL_LOCK: 145,
  SEMICOLON: 186,
  SEVEN: 55,
  SHIFT: 16,
  SINGLE_QUOTE: 222,
  SIX: 54,
  SLASH: 191,
  SPACE: 32,
  T: 84,
  TAB: 9,
  THREE: 51,
  TILDE: 192,
  TWO: 50,
  U: 85,
  UP_ARROW: 38,
  V: 86,
  VOLUME_DOWN: 174,
  VOLUME_UP: 175,
  W: 87,
  X: 88,
  Y: 89,
  Z: 90,
  ZERO: 48,
};

export type KeyNames =
  | 'MAC_ENTER'
  | 'BACKSPACE'
  | 'TAB'
  | 'NUM_CENTER'
  | 'ENTER'
  | 'SHIFT'
  | 'CONTROL'
  | 'ALT'
  | 'PAUSE'
  | 'CAPS_LOCK'
  | 'ESCAPE'
  | 'SPACE'
  | 'PAGE_UP'
  | 'PAGE_DOWN'
  | 'END'
  | 'HOME'
  | 'LEFT_ARROW'
  | 'UP_ARROW'
  | 'RIGHT_ARROW'
  | 'DOWN_ARROW'
  | 'PLUS_SIGN'
  | 'PRINT_SCREEN'
  | 'INSERT'
  | 'DELETE'
  | 'ZERO'
  | 'ONE'
  | 'TWO'
  | 'THREE'
  | 'FOUR'
  | 'FIVE'
  | 'SIX'
  | 'SEVEN'
  | 'EIGHT'
  | 'NINE'
  | 'FF_SEMICOLON'
  | 'FF_EQUALS'
  | 'QUESTION_MARK'
  | 'AT_SIGN'
  | 'A'
  | 'B'
  | 'C'
  | 'D'
  | 'E'
  | 'F'
  | 'G'
  | 'H'
  | 'I'
  | 'J'
  | 'K'
  | 'L'
  | 'M'
  | 'N'
  | 'O'
  | 'P'
  | 'Q'
  | 'R'
  | 'S'
  | 'T'
  | 'U'
  | 'V'
  | 'W'
  | 'X'
  | 'Y'
  | 'Z'
  | 'META'
  | 'MAC_WK_CMD_LEFT'
  | 'MAC_WK_CMD_RIGHT'
  | 'CONTEXT_MENU'
  | 'NUMPAD_ZERO'
  | 'NUMPAD_ONE'
  | 'NUMPAD_TWO'
  | 'NUMPAD_THREE'
  | 'NUMPAD_FOUR'
  | 'NUMPAD_FIVE'
  | 'NUMPAD_SIX'
  | 'NUMPAD_SEVEN'
  | 'NUMPAD_EIGHT'
  | 'NUMPAD_NINE'
  | 'NUMPAD_MULTIPLY'
  | 'NUMPAD_PLUS'
  | 'NUMPAD_MINUS'
  | 'NUMPAD_PERIOD'
  | 'NUMPAD_DIVIDE'
  | 'F1'
  | 'F2'
  | 'F3'
  | 'F4'
  | 'F5'
  | 'F6'
  | 'F7'
  | 'F8'
  | 'F9'
  | 'F10'
  | 'F11'
  | 'F12'
  | 'NUM_LOCK'
  | 'SCROLL_LOCK'
  | 'FIRST_MEDIA'
  | 'FF_MINUS'
  | 'MUTE'
  | 'VOLUME_DOWN'
  | 'VOLUME_UP'
  | 'FF_MUTE'
  | 'FF_VOLUME_DOWN'
  | 'LAST_MEDIA'
  | 'FF_VOLUME_UP'
  | 'SEMICOLON'
  | 'EQUALS'
  | 'COMMA'
  | 'DASH'
  | 'SLASH'
  | 'APOSTROPHE'
  | 'TILDE'
  | 'OPEN_SQUARE_BRACKET'
  | 'BACKSLASH'
  | 'CLOSE_SQUARE_BRACKET'
  | 'SINGLE_QUOTE'
  | 'MAC_META';`,
    snippet6: `export type ModifierKey = 'altKey' | 'shiftKey' | 'ctrlKey' | 'metaKey';

export const MODIFIERS = ['altKey', 'shiftKey', 'ctrlKey', 'metaKey'];

/**
 * Checks whether a modifier key is pressed.
 * @param event Event to be checked.
 */
export function hasModifierKey(
  event: KeyboardEvent,
  ...modifiers: ModifierKey[]
): boolean {
  if (modifiers.length) {
    return modifiers.some(modifier => event[modifier]);
  }

  return event.altKey || event.shiftKey || event.ctrlKey || event.metaKey;
}`,
    snippet7: `window.addEventListener('keydown', (event: KeyboardEvent) => {
  const { D } = KEYS;

  if (
    hasKeycode(event, D) &&
    hasModifierKey(event, 'ctrlKey', 'altKey')
  ) {
    // Do action
  }
});`,
    snippet8: `public match(
  matchKey: KeyNames,
  matchModifiers: ModifierKey[] = [],
  options?: MatchConfig
): Observable<KeyboardEvent> {

  const { listenOn } = new MatchConfig(options);

  return new Observable((observer) => {
    const listener$ = fromEvent(listenOn, 'keydown');
  });
}`,
    snippet9: `export class MatchConfig {
  public listenOn: EventTarget = window;

  constructor(init: Partial<MatchConfig>) {
    Object.assign(this, init);
  }
}`,
    snippet10: `public match(
  matchKey: KeyNames,
  matchModifiers: ModifierKey[] = [],
  options?: MatchConfig
): Observable<KeyboardEvent> {

  const { listenOn } = new MatchConfig(options);

  return new Observable((observer) => {
    const listener$ = fromEvent(listenOn, 'keydown');

    listener$.subscribe((event: KeyboardEvent) => {
      if (
        hasKeycode(event, KEYS[matchKey]) &&
        (!matchModifiers.length || hasModifierKey(event, ...matchModifiers))
      ) {
        observer.next(event);
      }
    });
  });
}`,
    snippet11: `constructor(private keybind: KeyBindService) {}`,
    snippet12: `const binding$ = this.keybind.match(KEYS.RIGHT_ARROW, ['ctrlKey]).subscribe(() => {
  alert('binding pressed');
});

// to stop listening to the binding call .unsubscribe on it
binding$.unsubscribe()`,
  };

  constructor(private keybind: KeyBindService) {
    this.keybind.match('RIGHT_ARROW').subscribe(() => {
      alert('sub hit');
    });
  }

  ngOnInit() {}
}

// window.addEventListener('keydown', (event: KeyboardEvent) => {
//   // Fall back to event.which if event.keyCode is null
//   const keycode = event.keyCode || event.which;

//   if (keycode === 68 && event.ctrlKey && event.altKey) {
//     // Do stuff here
//   }
// });

// window.addEventListener('keydown', (event: KeyboardEvent) => {
//   const { D } = KEYS;
//   if (hasKeycode(event, D) && hasModifierKey(event, 'ctrlKey', 'altKey')) {
//     alert('hit');
//   }
// });
