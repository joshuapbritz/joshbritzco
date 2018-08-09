import { Component, OnInit, Input, HostListener } from '@angular/core';

@Component({
  selector: 'app-brand-carousel-item',
  templateUrl: './brand-carousel-item.component.html',
  styleUrls: ['./brand-carousel-item.component.scss'],
})
export class BrandCarouselItemComponent implements OnInit {
  @Input()
  slideTitle: string;
  @Input()
  link: string;
  constructor() {}

  ngOnInit() {}

  @HostListener('click')
  openLink() {
    if (this.link) {
      window.open(this.link);
    }
  }
}
