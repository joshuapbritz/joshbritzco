import { Component, OnInit } from '@angular/core';

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
    css: `.selector {
  width: 300px;
  height: 300px;
}`,
  };

  constructor() {}

  ngOnInit() {}
}

// window.addEventListener('keydown', (event: KeyboardEvent) => {
//   // Fall back to event.which if event.keyCode is null
//   const keycode = event.keyCode || event.which;

//   if (keycode === 68 && event.ctrlKey && event.altKey) {
//     // Do stuff here
//   }
// });
