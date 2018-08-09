import {
  Component,
  OnInit,
  ElementRef,
  Renderer2,
  AfterViewInit,
  HostListener,
  Input,
} from '@angular/core';

@Component({
  selector: 'app-display-cards',
  templateUrl: './display-cards.component.html',
  styleUrls: ['./display-cards.component.scss'],
})
export class DisplayCardsComponent implements OnInit, AfterViewInit {
  @Input() side: string = 'left';
  @Input() src: string;
  @Input() href: string;
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {}

  ngAfterViewInit(): void {}

  @HostListener('mousemove', ['$event'])
  onhover(event: MouseEvent) {
    console.log('Is in card');
  }

  @HostListener('mouseleave')
  onhoverend() {
    console.log('Is not in card');
  }
}
