import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  private value: boolean = true;
  public get loading(): boolean {
    return this.value;
  }
  public year = new Date().getFullYear();
  onClick() {}

  constructor() {
    setTimeout(() => {
      this.value = false;
    }, 5000);
  }
}
