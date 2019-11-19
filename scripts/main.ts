import './components/navbar';
import './components/intersect';

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
        event.stopPropagation();

        const section = document.querySelector(href);
        if (!!section) {
          section.scrollIntoView({ behavior: 'smooth', block: 'start' });
          window.history.pushState(null, null, window.location.pathname + href);
        } else console.warn('No target found for ' + href);
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
