import { Component, OnInit, VERSION } from '@angular/core';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent implements OnInit {
  get angular() {
    return `Angular ${VERSION.major}+`;
  }
  constructor() { }

  ngOnInit() {
  }

}
