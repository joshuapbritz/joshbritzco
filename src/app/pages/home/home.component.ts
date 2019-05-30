import {
  Component,
  OnInit,
  ApplicationRef,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
} from '@angular/core';
import { HomeService } from './home.service';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  constructor(
    private service: HomeService,
    private title: Title,
    private meta: Meta
  ) {
    this.title.setTitle('Josh Britz - Home');

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
