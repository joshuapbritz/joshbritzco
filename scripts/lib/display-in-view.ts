// Used for defering the loading of content sections
// until they are in view. First, we find all the
// <section> tags on a page using querySelectorAll.
//
// Once we have found the sections, we initialize
// as intersection observer that will fire when
// an element is about to scroll into view.
//
// The class "is-visible" is added to the element
// when it is scrolled into view

document.addEventListener('DOMContentLoaded', event => {
  const sections = document.querySelectorAll('section');

  const obs = new IntersectionObserver(
    entries => {
      for (const entry of entries) {
        entry.target.classList.toggle('is-visible', entry.isIntersecting);
      }
    },
    { threshold: 0, root: null }
  );

  for (const section of sections) obs.observe(section);
});
