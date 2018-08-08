import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-brand-carousel-item',
  templateUrl: './brand-carousel-item.component.html',
  styleUrls: ['./brand-carousel-item.component.scss']
})
export class BrandCarouselItemComponent implements OnInit {
  @Input() slideTitle: string;
  constructor() { }

  ngOnInit() {
  }

}
