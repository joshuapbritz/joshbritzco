import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
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
      title: 'Object Recognition in the Browser with TensorFlowJs',
      snippet: `Get started with basic object recognition in the browser using the TensorFlow JavaScript library and MobileNet...`,
      image: 'assets/images/posts/object-recognition.jpeg',
    },

    // {
    //   title: 'The Magic of CSS Variables',
    //   snippet: `A common frustration I come across when working with Angular (or any other framework for that matter), is running functions based on key bindings...`,
    //   image: 'assets/images/posts/magic-css-variables.jpeg',
    // },

    // {
    //   title: 'The Magic of CSS Variables',
    //   snippet: `A common frustration I come across when working with Angular (or any other framework for that matter), is running functions based on key bindings...`,
    //   image: 'assets/images/posts/magic-css-variables.jpeg',
    // },

    // {
    //   title: 'The Magic of CSS Variables',
    //   snippet: `A common frustration I come across when working with Angular (or any other framework for that matter), is running functions based on key bindings...`,
    //   image: 'assets/images/posts/magic-css-variables.jpeg',
    // },
  ];

  constructor(private title: Title, private meta: Meta) {
    this.title.setTitle('Josh Britz - Codelabs');

    this.meta.updateTag({
      name: 'description',
      content: `Some tutorials and how-to's that will (hopefully) help you become a better developer`,
    });

    this.meta.updateTag({
      name: 'keywords',
      content:
        'Web development,Angular development,UI devloper,HTML,CSS,JavaScript' +
        ',Angular,Web technologies,Accessablility,User interaction,Machine learning,App development,' +
        'Hybrid app development,Api development',
    });
  }

  ngOnInit() {}

  public getClass(index: number): 'right' | 'left' {
    return index % 2 === 0 ? 'left' : 'right';
  }
}
