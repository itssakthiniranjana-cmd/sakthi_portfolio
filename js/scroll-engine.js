/**
 * Scroll Engine & Parallax Choreographer
 * Sakthi Niranjana S Portfolio
 * 
 * Features:
 * - Smooth scroll orchestration
 * - Scroll-spy navigation indicator
 * - Design Philosophy word-by-word / statement reveal
 * - Parallax depth listeners
 */

export function initScrollEngine() {
  // 1. Smooth Navigation Anchor Clicks
  const navLinks = document.querySelectorAll('a[href^="#"]');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId === '#') return;
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const headerOffset = 100;
        const elementPosition = targetEl.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });

        // Close mobile drawer if open
        const mobileDrawer = document.getElementById('mobile-drawer');
        if (mobileDrawer) mobileDrawer.classList.remove('open');
      }
    });
  });

  // 2. Scroll Spy for Active Navigation Link
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.pageYOffset + 200;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    const links = document.querySelectorAll('.nav-link');
    links.forEach(l => {
      l.classList.remove('active');
      if (l.getAttribute('href') === `#${current}`) {
        l.classList.add('active');
      }
    });
  });

  // 3. Design Philosophy Statement Activator
  const philosophyCards = document.querySelectorAll('.philosophy-statement-card');
  if (philosophyCards.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        } else {
          entry.target.classList.remove('active');
        }
      });
    }, {
      threshold: 0.45
    });

    philosophyCards.forEach(card => observer.observe(card));
  }
}
