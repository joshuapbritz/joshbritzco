import { KeyNames, hasKeycode, KEYS } from './keycodes';
import { Injectable } from '@angular/core';
import { Observable, fromEvent } from 'rxjs';
import { ModifierKey, hasModifierKey } from './modifiers';

class MatchConfig {
  public listenOn: EventTarget = window;

  constructor(init: Partial<MatchConfig>) {
    Object.assign(this, init);
  }
}

type MatchMode = 'some' | 'every';

@Injectable({
  providedIn: 'root',
})
export class KeyBindService {
  constructor() {}

  public match(
    matchKey: KeyNames,
    matchModifiers: ModifierKey[] = [],
    options?: MatchConfig
  ): Observable<KeyboardEvent> {
    const { listenOn } = new MatchConfig(options);

    return new Observable(observer => {
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
  }
}
