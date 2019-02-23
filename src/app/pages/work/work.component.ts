import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.scss'],
})
export class WorkComponent implements OnInit {
  constructor(private title: Title, private meta: Meta) {
    this.title.setTitle('Josh Britz - My Work');

    this.meta.updateTag({
      name: 'description',
      content:
        'A full-stack web and app developer, working in Angular and Node.js with a sprinkling of C# and Python',
    });

    this.meta.updateTag({
      name: 'keywords',
      content:
        'Web developer,Angular developer,Fullstack developer,UI devloper,HTML,CSS,XML,JavaScript' +
        ',Angular,Web technologies,Hybrid app development',
    });
  }

  ngOnInit() {}
}
