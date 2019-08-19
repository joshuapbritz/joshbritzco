import { Component, OnInit, AfterViewInit, Input } from '@angular/core';

@Component({
  selector: 'app-display-cards',
  templateUrl: './display-cards.component.html',
  styleUrls: ['./display-cards.component.scss'],
})
export class DisplayCardsComponent implements OnInit, AfterViewInit {
  @Input() side: string = 'left';
  @Input() src: string;
  @Input() href: string;

  ngOnInit() {}

  ngAfterViewInit(): void {}
}
