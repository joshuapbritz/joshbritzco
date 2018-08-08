import { Directive, Input, HostListener } from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[js-href]'
})
export class JsHrefDirective {
  // tslint:disable-next-line:no-input-rename
  @Input('js-href') link: string;
  @Input() target: string = '_blank';
  constructor() { }
  @HostListener('click') clicked() {
    window.open(this.link, this.target);
  }
}
