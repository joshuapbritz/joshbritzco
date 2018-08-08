import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-timeline-section',
  templateUrl: './timeline-section.component.html',
  styleUrls: ['./timeline-section.component.scss']
})
export class TimelineSectionComponent implements OnInit {
  @Input() title: string;
  constructor() { }

  ngOnInit() {
  }

}
