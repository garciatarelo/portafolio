document.addEventListener('DOMContentLoaded', () => {

  /* ---- 1. Current Year ---- */
  const yearEl = document.getElementById('current-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---- 2. Scroll Progress ---- */
  const progressBar = document.getElementById('scroll-progress');
  window.addEventListener('scroll', () => {
    const scrollTop  = window.scrollY;
    const docHeight  = document.body.offsetHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    if (progressBar) progressBar.style.width = pct + '%';
  }, { passive: true });

  /* ---- 3. Fade-in-up on scroll ---- */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.fade-in-up').forEach(el => observer.observe(el));

  /* ---- 4. Mobile Nav Toggle ---- */
  const toggle   = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen);
    });

    // Close on link click
    navLinks.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---- 5. Typing Effect ---- */
  const typedEl = document.getElementById('typed-text');
  if (typedEl) {
    const phrases = [
      'Ingeniera en Sistemas en Formación',
      'Desarrolladora Web Full Stack',
      'Apasionada por la Tecnología',
    ];
    let phraseIdx  = 0;
    let charIdx    = 0;
    let isDeleting = false;
    let delay      = 80;

    function type() {
      const current = phrases[phraseIdx];

      if (isDeleting) {
        typedEl.textContent = current.slice(0, charIdx - 1);
        charIdx--;
        delay = 38;
      } else {
        typedEl.textContent = current.slice(0, charIdx + 1);
        charIdx++;
        delay = 80;
      }

      if (!isDeleting && charIdx === current.length) {
        delay = 2400;
        isDeleting = true;
      } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        phraseIdx  = (phraseIdx + 1) % phrases.length;
        delay = 450;
      }

      setTimeout(type, delay);
    }

    setTimeout(type, 900);
  }

  /* ---- 6. Active nav link on scroll ---- */
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY + 100;
    sections.forEach(section => {
      const top    = section.offsetTop;
      const height = section.offsetHeight;
      const id     = section.getAttribute('id');
      const link   = document.querySelector(`.nav-link[href="#${id}"]`);
      if (link && scrollY >= top && scrollY < top + height) {
        navItems.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    });
  }, { passive: true });

});
