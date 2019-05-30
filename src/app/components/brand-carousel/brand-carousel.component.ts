import {
  Component,
  ElementRef,
  AfterContentInit,
  HostListener,
  OnDestroy,
} from '@angular/core';
import { RESOURCE_CACHE_PROVIDER } from '@angular/platform-browser-dynamic';

@Component({
  selector: 'app-brand-carousel',
  templateUrl: './brand-carousel.component.html',
  styleUrls: ['./brand-carousel.component.scss'],
})
export class BrandCarouselComponent implements AfterContentInit, OnDestroy {
  private readonly container: HTMLElement;
  private items: HTMLElement[];
  public width: number;
  private childWidth: number;
  private moved: number = 0;
  private numberOfItems: number;
  private interval: any;

  constructor(private el: ElementRef) {
    this.container = el.nativeElement;
  }

  ngAfterContentInit() {
    this.items = Array.from(this.container.children) as HTMLElement[];
    this.setUp();
    this.interval = setInterval(() => {
      this.slide();
    }, 7000);

    window.addEventListener('resize', () => {
      clearInterval(this.interval);
      this.setUp();
      this.interval = setInterval(() => {
        this.slide();
      }, 7000);
    });
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

  // @HostListener('click')
  slide() {
    this.moved = this.moved + 1;
    let i = 1;
    for (const slide of this.items) {
      if (this.moved < this.items.length - (this.numberOfItems - 1)) {
        slide.style.transform = `translate3D(-${this.childWidth *
          this.moved}px, 0, 0)`;
      } else {
        slide.style.transform = `translate3D(${0}px, 0, 0)`;
        this.moved = 0;
      }
      i++;
    }
  }

  @HostListener('mouseenter')
  hover() {
    clearInterval(this.interval);
    this.interval = undefined;
  }

  @HostListener('mouseleave')
  unhover() {
    this.interval = setInterval(() => {
      this.slide();
    }, 7000);
  }

  setUp() {
    this.width = this.container.clientWidth;
    this.childWidth = this.items[0].clientWidth;
    const $ = window.innerWidth;
    if ($ > 750) {
      this.numberOfItems = 3;
    } else if ($ <= 750 && $ > 550) {
      this.numberOfItems = 2;
    } else if ($ <= 550) {
      this.numberOfItems = 1;
    }
  }
}
