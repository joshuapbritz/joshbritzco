import { Component, OnInit, ElementRef, HostListener } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'content-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  private element: HTMLElement;
  constructor(private el: ElementRef) {
    this.element = this.el.nativeElement;
  }

  ngOnInit() {
  }

  @HostListener('click', ['$event.target'])
  onbackdrop(target: EventTarget) {
    if (target === this.element) {
      this.close();
    }
  }

  public open() {
    this.element.classList.add('is-open');
    document.body.classList.add('no-scroll');

    setTimeout(() => {
      this.element.classList.add('is-open-body');
    }, 300);
  }

  public close() {
    this.element.classList.remove('is-open-body');

    setTimeout(() => {
      this.element.classList.remove('is-open');
      document.body.classList.remove('no-scroll');
    }, 300);
  }

}
