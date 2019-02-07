import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-toast',
  template: `
    <div #wrapper class="toast-content-wrapper">{{ message }}</div>
  `,
  styleUrls: ['./toast.scss'],
})
export class ToastComponent {
  public message: string;

  @ViewChild('wrapper') public wrapper: ElementRef<HTMLElement>;

  detach() {
    return new Promise(res => {
      const endFn = ({ animationName }: AnimationEvent) => {
        if (animationName === 'toastOut') {
          res();
        }

        this.wrapper.nativeElement.removeEventListener(
          'animationend',
          endFn.bind(this)
        );
      };

      this.wrapper.nativeElement.addEventListener(
        'animationend',
        endFn.bind(this)
      );

      this.wrapper.nativeElement.classList.add('closing');
    });
  }
}
