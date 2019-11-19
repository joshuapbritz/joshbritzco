window.addEventListener(
  'load',
  () => {
    const items = Array.from(document.querySelectorAll('.work-grid .item'));

    const observer = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        for (const block of entries) {
          if (block.isIntersecting) {
            block.target.classList.add('visible');
          }
        }
      },
      {
        threshold: 0.4,
      }
    );

    items.forEach(item => observer.observe(item));
  },
  { once: true }
);
