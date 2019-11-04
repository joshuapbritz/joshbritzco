enum MediaModes {
  Desktop,
  Tablet,
  Mobile,
}

export class Slider {
  private currentMode: MediaModes;

  public index: number = 0;

  public slides: HTMLElement[];

  public get slideWidth(): number {
    if (this.currentMode === MediaModes.Desktop) {
      return this.wrapper.clientWidth / 2;
    } else return this.wrapper.clientWidth;
  }

  public get padding(): any {
    const pad = this.slides.map(s => window.getComputedStyle(s).paddingRight);
    return Math.max(...pad.map(p => parseInt(p.replace('px', ''))));
  }

  constructor(
    protected readonly wrapper: HTMLElement,
    protected readonly track: HTMLElement,
    protected readonly next: HTMLElement,
    protected readonly previous: HTMLElement
  ) {
    this.slides = Array.from(this.wrapper.querySelectorAll('.slider-item'));
  }

  public start(): void {
    this.setSliderSizes();

    this.next.addEventListener('click', () => {
      if (this.index < this.slides.length - 2) {
        this.previous.classList.remove('ended');
        this.index++;

        const slideAmount: number = Math.min(
          this.slideWidth * (this.slides.length - 2) - this.padding,
          Math.abs(this.slideWidth) * this.index
        );

        this.track.style.transform = `translateX(-${slideAmount}px)`;

        if (this.index === this.slides.length - 2) {
          this.next.classList.add('ended');
        }
      }
    });

    this.previous.addEventListener('click', () => {
      if (this.index > 0) {
        this.next.classList.remove('ended');
        this.index--;

        const slideAmount: number = Math.abs(this.slideWidth) * this.index;

        this.track.style.transform = `translateX(-${slideAmount}px)`;

        if (this.index === 0) {
          this.previous.classList.add('ended');
        }
      }
    });

    window.addEventListener('resize', () => {
      this.setSliderSizes();
    });
  }

  private setSliderSizes(): void {
    const width = window.innerWidth;
    if (width >= 1000 && this.currentMode !== MediaModes.Desktop) {
      this.currentMode = MediaModes.Desktop;
    } else if (
      width < 1000 &&
      width >= 800 &&
      this.currentMode !== MediaModes.Tablet
    ) {
      this.currentMode = MediaModes.Tablet;
    } else if (width < 800 && this.currentMode !== MediaModes.Mobile) {
      this.currentMode = MediaModes.Mobile;
    }

    this.track.style.transform = `translateX(0px)`;
    this.track.style.width = `${this.slideWidth * this.slides.length}px`;
    this.previous.classList.add('ended');
    this.next.classList.remove('ended');
    this.index = 0;
  }
}
