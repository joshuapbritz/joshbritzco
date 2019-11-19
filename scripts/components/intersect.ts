window.addEventListener(
  'load',
  () => {
    const items = Array.from(document.querySelectorAll('.work-grid .item'));

    const observer = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        for (const block of entries) {
          if (block.isIntersecting) {
            block.target.classList.add('visible');
            observer.unobserve(block.target);
          }
        }
      },
      {
        threshold: 0.7,
      }
    );

    items.forEach(item => observer.observe(item));
  },
  { once: true }
);
