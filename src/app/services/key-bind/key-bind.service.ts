import { KeyNames } from './keycodes';
import { Injectable } from '@angular/core';
import { Observable, fromEvent } from 'rxjs';
import { ModifierKey } from './modifiers';

@Injectable({
  providedIn: 'root',
})
export class KeyBindService {
  constructor() {}

  public match(
    matchKeys: KeyNames[],
    matchModifiers: ModifierKey[],
    listenOn: EventTarget = window
  ): Observable<KeyboardEvent> {
    return new Observable(({ next }) => {
      const listener$ = fromEvent(listenOn, 'keydown');
    });
  }
}
