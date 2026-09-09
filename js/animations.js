/**
 * Exgrid Light Animations & Smooth Scrolling System
 * Integrates Lenis Smooth Scroll with GSAP 3 & ScrollTrigger
 */

export function initExgridAnimations() {
  // 1. Initialize Lenis Smooth Scrolling
  const lenis = initLenisSmoothScroll();

  // 2. Preloader Animation
  initPreloader();

  // 3. GSAP ScrollTrigger Animations
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    // Hero Greeting Title Reveal
    initHeroAnimations();

    // Section Titles Kinetic Animations
    initTitleAnimations();

    // Fade-Top Staggered Elements
    initFadeTopAnimations();

    // Watermark Background Parallax
    initWatermarkParallax();

    // Footer Animations
    initFooterAnimations();
  }

  return lenis;
}

function initLenisSmoothScroll() {
  if (typeof Lenis === 'undefined') return null;

  try {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    // Synchronize Lenis with GSAP ScrollTrigger
    if (typeof ScrollTrigger !== 'undefined') {
      lenis.on('scroll', ScrollTrigger.update);
    }

    if (typeof gsap !== 'undefined') {
      gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(500, 33);
    } else {
      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
    }

    return lenis;
  } catch (err) {
    console.warn('Lenis initialization skipped:', err);
    return null;
  }
}

function initPreloader() {
  const preloader = document.getElementById('preloader');
  if (!preloader) return;

  const hidePreloader = () => {
    if (typeof gsap !== 'undefined') {
      gsap.to(preloader, {
        opacity: 0,
        y: -30,
        duration: 0.5,
        ease: 'power2.inOut',
        onComplete: () => {
          preloader.classList.add('loaded');
          preloader.remove();
          if (typeof ScrollTrigger !== 'undefined') {
            ScrollTrigger.refresh();
          }
        }
      });
    } else {
      preloader.classList.add('loaded');
      setTimeout(() => preloader.remove(), 400);
    }
  };

  if (document.readyState === 'complete') {
    setTimeout(hidePreloader, 200);
  } else {
    window.addEventListener('load', () => {
      setTimeout(hidePreloader, 200);
    });
    setTimeout(hidePreloader, 1000);
  }
}

function initHeroAnimations() {
  const heroCard = document.querySelector('.banner__content-single');
  const profileCard = document.querySelector('.banner__meta-single');
  const sidebarWidgets = document.querySelectorAll('.banner__sidebar-single');

  if (!heroCard) return;

  // Animate profile card cleanly
  if (profileCard) {
    gsap.fromTo(profileCard,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', clearProps: 'all' }
    );
  }

  // Animate hero card container cleanly without child compounding
  gsap.fromTo(heroCard,
    { opacity: 0, y: 25 },
    { opacity: 1, y: 0, duration: 0.75, delay: 0.08, ease: 'power3.out', clearProps: 'all' }
  );

  // Animate right sidebar widgets if present
  if (sidebarWidgets.length) {
    gsap.fromTo(sidebarWidgets,
      { opacity: 0, y: 25 },
      { opacity: 1, y: 0, duration: 0.65, stagger: 0.1, delay: 0.15, ease: 'power3.out', clearProps: 'all' }
    );
  }
}

function initTitleAnimations() {
  const titleAnimations = document.querySelectorAll('.title-animation');
  titleAnimations.forEach((title) => {
    gsap.fromTo(title,
      { opacity: 0, y: 25 },
      {
        scrollTrigger: {
          trigger: title,
          start: 'top 88%',
          toggleActions: 'play none none none'
        },
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: 'power3.out',
        clearProps: 'all'
      }
    );
  });
}

function initFadeTopAnimations() {
  // Case Study Rows
  const caseStudyRows = document.querySelectorAll('.banner__content-study__single');
  if (caseStudyRows.length) {
    caseStudyRows.forEach((row) => {
      gsap.fromTo(row,
        { opacity: 0, y: 25 },
        {
          scrollTrigger: {
            trigger: row,
            start: 'top 90%',
            toggleActions: 'play none none none'
          },
          opacity: 1,
          y: 0,
          duration: 0.65,
          ease: 'power3.out',
          clearProps: 'all'
        }
      );
    });
  }

  // About Box Achievements
  const aboutCard = document.querySelector('.banner__content-about-inner');
  if (aboutCard) {
    gsap.fromTo(aboutCard,
      { opacity: 0, y: 30 },
      {
        scrollTrigger: {
          trigger: aboutCard,
          start: 'top 88%',
          toggleActions: 'play none none none'
        },
        opacity: 1,
        y: 0,
        duration: 0.75,
        ease: 'power3.out',
        clearProps: 'all'
      }
    );

    const achievements = aboutCard.querySelectorAll('.achievement-row');
    if (achievements.length) {
      gsap.fromTo(achievements,
        { opacity: 0, x: -20 },
        {
          scrollTrigger: {
            trigger: aboutCard,
            start: 'top 85%',
            toggleActions: 'play none none none'
          },
          opacity: 1,
          x: 0,
          stagger: 0.1,
          duration: 0.6,
          ease: 'power3.out',
          clearProps: 'all'
        }
      );
    }
  }

  // History Single Rows
  const historyRows = document.querySelectorAll('.banner__history-single');
  if (historyRows.length) {
    historyRows.forEach((row) => {
      gsap.fromTo(row,
        { opacity: 0, y: 25 },
        {
          scrollTrigger: {
            trigger: row,
            start: 'top 90%',
            toggleActions: 'play none none none'
          },
          opacity: 1,
          y: 0,
          duration: 0.65,
          ease: 'power3.out',
          clearProps: 'all'
        }
      );
    });
  }

  // Sidebar Specialization Items
  const specItems = document.querySelectorAll('.banner__sidebar-special');
  if (specItems.length) {
    specItems.forEach((item) => {
      gsap.fromTo(item,
        { opacity: 0, x: 20 },
        {
          scrollTrigger: {
            trigger: item,
            start: 'top 92%',
            toggleActions: 'play none none none'
          },
          opacity: 1,
          x: 0,
          duration: 0.55,
          ease: 'power3.out',
          clearProps: 'all'
        }
      );
    });
  }
}

function initWatermarkParallax() {
  const watermark = document.querySelector('.tag-t');
  if (!watermark) return;

  gsap.to(watermark, {
    scrollTrigger: {
      trigger: '.banner',
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1.5
    },
    y: 120,
    ease: 'none'
  });
}

function initFooterAnimations() {
  const footerIntro = document.querySelector('.footer__intro');
  const footerEmail = document.querySelector('.footer__content');

  if (footerIntro) {
    gsap.fromTo(footerIntro,
      { opacity: 0, y: 30 },
      {
        scrollTrigger: {
          trigger: footerIntro,
          start: 'top 88%',
          toggleActions: 'play none none none'
        },
        opacity: 1,
        y: 0,
        duration: 0.75,
        ease: 'power3.out',
        clearProps: 'all'
      }
    );
  }

  if (footerEmail) {
    gsap.fromTo(footerEmail,
      { opacity: 0, scale: 0.96, y: 30 },
      {
        scrollTrigger: {
          trigger: footerEmail,
          start: 'top 88%',
          toggleActions: 'play none none none'
        },
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        clearProps: 'all'
      }
    );
  }
}

