import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-timeline-section-item',
  templateUrl: './timeline-section-item.component.html',
  styleUrls: ['./timeline-section-item.component.scss']
})
export class TimelineSectionItemComponent implements OnInit {
  @Input() side: string = 'left';
  @Input() heading: string;
  @Input() skillLevel: number = 0;
  constructor() { }

  ngOnInit() {
  }

}
