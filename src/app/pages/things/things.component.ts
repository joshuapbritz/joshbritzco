import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-things',
  templateUrl: './things.component.html',
  styleUrls: ['./things.component.scss'],
})
export class ThingsComponent implements OnInit {
  constructor(private title: Title, private meta: Meta) {
    this.title.setTitle('Josh Britz - Things');

    this.meta.updateTag({
      name: 'description',
      content:
        'Some awesome (in my opinion) things that I have made on the web.',
    });

    this.meta.updateTag({
      name: 'keywords',
      content:
        'Work,Projects,Fun project,HTML,CSS,XML,JavaScript,Angular,Experimental Projects,',
    });
  }

  ngOnInit() {}
}
