import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutComponent implements OnInit {
  constructor(private title: Title, private meta: Meta) {
    this.title.setTitle('Josh Britz - About');

    this.meta.updateTag({
      name: 'description',
      content: `A little bit of information about me.`,
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
}
