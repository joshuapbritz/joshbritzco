import { Component, OnInit } from '@angular/core';
import * as babylon from 'babylon';

@Component({
  selector: 'app-source-code',
  templateUrl: './source-code.component.html',
  styleUrls: ['./source-code.component.scss'],
})
export class SourceCodeComponent implements OnInit {
  constructor() {
    console.log(babylon.parse('var name = `Joshua`'));
  }

  ngOnInit() {}
}
