((navbar) => {
    window.addEventListener('scroll', () => {
        if (window.scrollY >= 50) {
            navbar.classList.add('has-scrolled');
        } else navbar.classList.remove('has-scrolled');
    });
})(document.getElementById('navigation-bar'));