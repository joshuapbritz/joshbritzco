import { Component, OnInit, VERSION, ApplicationRef } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss'],
})
export class SkillsComponent implements OnInit {
  get angular() {
    return `Angular ${VERSION.major}+`;
  }
  constructor(private title: Title, private meta: Meta) {
    this.title.setTitle('Josh Britz - Skills');

    this.meta.updateTag({
      name: 'description',
      content:
        'An ever growing list of my skills and knowledge of the web and other platforms, ' +
        'including: JavaScript, Angular, CSS, Python, CircleCI, Firebase, Ionic, C# and .NET',
    });

    this.meta.updateTag({
      name: 'keywords',
      content:
        'Skills,What I can Do,Knowledge,HTML,CSS,XML,JavaScript,Angular,Web technologies,Hybrid app development',
    });
  }

  ngOnInit() {}
}
