import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-object-recognition-in-browser',
  templateUrl: './object-recognition-in-browser.component.html',
  styleUrls: ['./object-recognition-in-browser.component.scss'],
})
export class ObjectRecognitionInBrowserComponent implements OnInit {
  constructor(private title: Title, private meta: Meta) {
    this.title.setTitle(
      'Josh Britz - Codelabs: Object Recognition in the Browser with TensorFlowJss'
    );

    this.meta.updateTag({
      name: 'description',
      content:
        `In this article, I am going to walk you through setting up TensorFlow in your app, ` +
        `importing your models, setting up a webcam that will feed into the model, and obviously classifying the images from that feed...`,
    });

    this.meta.updateTag({
      name: 'keywords',
      content:
        'Web development,Vanilla JavaScript development,UI development,HTML,CSS,JavaScript' +
        ',Angular,Web technologies,Machine learning,TensorFlowjs',
    });
  }

  ngOnInit() {}
}
