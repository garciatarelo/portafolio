document.addEventListener('DOMContentLoaded', () => {
    // 1. Año Actual
    document.getElementById('current-year').textContent = new Date().getFullYear();

    // 2. Observer de Animaciones de Entrada (Scroll)
    const observerOptions = { root: null, rootMargin: '0px', threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    document.querySelectorAll('.fade-in-up').forEach(el => observer.observe(el));

    // 3. Barra de Progreso de Scroll
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.body.offsetHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        document.getElementById('scroll-progress').style.width = scrollPercent + '%';
    });

    // 4. Efecto Hover en Iconos Sociales (JS simple para SVG)
    const socialLinks = document.querySelectorAll('.transition-hover svg');
    socialLinks.forEach(svg => {
        svg.parentElement.addEventListener('mouseenter', () => svg.setAttribute('stroke', '#41D194'));
        svg.parentElement.addEventListener('mouseleave', () => svg.setAttribute('stroke', '#94A3B8'));
    });
});
