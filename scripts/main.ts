import { Slider } from './components/slider';

window.addEventListener('load', () => {
  const anchors: HTMLAnchorElement[] = document.querySelectorAll(
    'a[href]'
  ) as any;
  for (const anchor of anchors) {
    anchor.addEventListener('click', (event: Event) => {
      const href = anchor.getAttribute('href');
      if (href.startsWith('#')) {
        event.preventDefault();
        console.log('scroll here');
        window.location.hash = href;
      }
    });
  }

  const slider = new Slider(
    document.querySelector('.slider'),
    document.querySelector('.track'),
    document.querySelector('.next'),
    document.querySelector('.previous')
  );
  slider.start();
});
