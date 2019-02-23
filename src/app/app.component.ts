import { Component } from '@angular/core';
import { Meta } from '@angular/platform-browser';

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

  constructor(private meta: Meta) {
    setTimeout(() => {
      this.value = false;
    }, 5000);

    this.meta.addTag({
      name: 'author',
      content: 'Joshua Britz',
    });

    this.meta.addTag({
      name: 'description',
      content:
        'View some of the work I have done as a developer, ' +
        'Including projects for WesBank, Nedbank, and BankservAfrica',
    });

    this.meta.addTag({
      name: 'keywords',
      content: 'Work,Projects,Corporate Work,HTML,CSS,XML,JavaScript,Angular',
    });
  }
}
