import { Component, OnInit } from '@angular/core';
// tslint:disable:max-line-length

@Component({
  selector: 'app-blog-landing',
  templateUrl: './blog-landing.component.html',
  styleUrls: ['./blog-landing.component.scss'],
})
export class BlogLandingComponent implements OnInit {
  public posts: Array<{ title: string; snippet: string; image: string }> = [
    {
      title: 'Create a Keybinding Service in Angular',
      snippet: `A common frustration I come across when working with Angular (or any other framework for that matter), is running functions based on key bindings...`,
      image: 'assets/images/posts/create-keybinding-service.jpeg',
    },

    {
      title: 'The Magic of CSS Variables',
      snippet: `A common frustration I come across when working with Angular (or any other framework for that matter), is running functions based on key bindings...`,
      image: 'assets/images/posts/magic-css-variables.jpeg',
    },

    {
      title: 'The Magic of CSS Variables',
      snippet: `A common frustration I come across when working with Angular (or any other framework for that matter), is running functions based on key bindings...`,
      image: 'assets/images/posts/magic-css-variables.jpeg',
    },

    {
      title: 'The Magic of CSS Variables',
      snippet: `A common frustration I come across when working with Angular (or any other framework for that matter), is running functions based on key bindings...`,
      image: 'assets/images/posts/magic-css-variables.jpeg',
    },

    {
      title: 'The Magic of CSS Variables',
      snippet: `A common frustration I come across when working with Angular (or any other framework for that matter), is running functions based on key bindings...`,
      image: 'assets/images/posts/magic-css-variables.jpeg',
    },
  ];

  constructor() {}

  ngOnInit() {}

  public getClass(index: number): 'right' | 'left' {
    return index % 2 === 0 ? 'left' : 'right';
  }
}
