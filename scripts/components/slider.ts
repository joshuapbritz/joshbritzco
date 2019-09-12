export class Slider {
  public index: number = 0;

  public slides: HTMLElement[];

  public get slideWidth(): number {
    return this.wrapper.clientWidth / 2;
  }

  constructor(
    protected readonly wrapper: HTMLElement,
    protected readonly track: HTMLElement,
    protected readonly next: HTMLElement,
    protected readonly previous: HTMLElement
  ) {
    this.slides = this.wrapper.querySelectorAll('.slider-item') as any;
  }

  public start(): void {
    this.track.style.width = `${this.slideWidth * this.slides.length}px`;

    this.next.addEventListener('click', () => {
      if (this.index < this.slides.length - 2) {
        this.index++;

        const slideAmount: number = Math.min(
          this.slideWidth * (this.slides.length - 2) - 100,
          Math.abs(this.slideWidth) * this.index
        );

        this.track.style.transform = `translateX(-${slideAmount}px)`;
      }
    });

    this.previous.addEventListener('click', () => {
      if (this.index > 0) {
        this.index--;

        const slideAmount: number = Math.abs(this.slideWidth) * this.index;

        this.track.style.transform = `translateX(-${slideAmount}px)`;
      }
    });
  }
}
