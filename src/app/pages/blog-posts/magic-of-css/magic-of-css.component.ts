import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-magic-of-css',
  templateUrl: './magic-of-css.component.html',
  styleUrls: ['./magic-of-css.component.scss'],
})
export class MagicOfCssComponent implements OnInit {
  constructor(private title: Title) {
    this.title.setTitle('Josh Britz - Codelabs: The magic of css variables');
  }

  ngOnInit() {}
}
