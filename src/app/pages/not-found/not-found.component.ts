import { Component, OnInit, HostListener } from '@angular/core';

const SIZE_QUERY: MediaQueryList = window.matchMedia(
  'screen and (max-width: 1024px)'
);

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
})
export class NotFoundComponent implements OnInit {
  public movex: number = 0;
  public movey: number = 0;

  public get quadrantWidth(): number {
    return window.innerWidth / 2;
  }

  public get quadrantHeight(): number {
    return window.innerHeight / 2;
  }

  constructor() {}

  ngOnInit() {}

  @HostListener('window:mousemove', ['$event']) public onmousemove(
    event: MouseEvent
  ): void {
    if (!SIZE_QUERY.matches) {
      this.movex = event.clientX - this.quadrantWidth;
      this.movey = event.clientY - this.quadrantHeight;
    } else this.onmouseleave();
  }

  @HostListener('window:mouseleave')
  @HostListener('window:mouseout')
  @HostListener('window:blur')
  public onmouseleave() {
    this.movex = 0;
    this.movey = 0;
  }
}
