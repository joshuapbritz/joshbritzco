((nav: HTMLElement) => {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
      nav.classList.add('scrolled');
    } else nav.classList.remove('scrolled');
  });
})(document.querySelector('nav'));
