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
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential ease-out
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
      gsap.ticker.lagSmoothing(0);
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
        y: -40,
        duration: 0.7,
        ease: 'power3.inOut',
        onComplete: () => {
          preloader.classList.add('loaded');
          preloader.remove();
        }
      });
    } else {
      preloader.classList.add('loaded');
      setTimeout(() => preloader.remove(), 600);
    }
  };

  if (document.readyState === 'complete') {
    setTimeout(hidePreloader, 350);
  } else {
    window.addEventListener('load', () => {
      setTimeout(hidePreloader, 350);
    });
    setTimeout(hidePreloader, 1500);
  }
}

function initHeroAnimations() {
  const heroCard = document.querySelector('.banner__content-single');
  const profileCard = document.querySelector('.banner__meta-single');
  const sidebarWidgets = document.querySelectorAll('.banner__sidebar-single');

  if (!heroCard) return;

  const tl = gsap.timeline({
    defaults: { ease: 'power3.out', duration: 0.9 }
  });

  if (profileCard) {
    tl.from(profileCard, {
      opacity: 0,
      y: 40,
      duration: 0.8
    }, 0.1);
  }

  tl.from(heroCard, {
    opacity: 0,
    y: 35,
    duration: 0.85
  }, 0.2);

  const heroHeading = heroCard.querySelector('h2');
  if (heroHeading) {
    tl.from(heroHeading, {
      opacity: 0,
      y: 25,
      duration: 0.7
    }, 0.35);
  }

  const ctaItems = heroCard.querySelectorAll('.cta-single');
  if (ctaItems.length) {
    tl.from(ctaItems, {
      opacity: 0,
      y: 20,
      stagger: 0.08,
      duration: 0.6
    }, 0.5);
  }

  if (sidebarWidgets.length) {
    tl.from(sidebarWidgets, {
      opacity: 0,
      y: 30,
      stagger: 0.12,
      duration: 0.75
    }, 0.4);
  }
}

function initTitleAnimations() {
  const titleAnimations = document.querySelectorAll('.title-animation');
  titleAnimations.forEach((title) => {
    gsap.from(title, {
      scrollTrigger: {
        trigger: title,
        start: 'top 85%',
        toggleActions: 'play none none none'
      },
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: 'power3.out'
    });
  });
}

function initFadeTopAnimations() {
  // Case Study Rows
  const caseStudyRows = document.querySelectorAll('.banner__content-study__single');
  if (caseStudyRows.length) {
    caseStudyRows.forEach((row) => {
      gsap.from(row, {
        scrollTrigger: {
          trigger: row,
          start: 'top 88%',
          toggleActions: 'play none none none'
        },
        opacity: 0,
        y: 35,
        duration: 0.75,
        ease: 'power3.out'
      });
    });
  }

  // About Box Achievements
  const aboutCard = document.querySelector('.banner__content-about-inner');
  if (aboutCard) {
    gsap.from(aboutCard, {
      scrollTrigger: {
        trigger: aboutCard,
        start: 'top 85%',
        toggleActions: 'play none none none'
      },
      opacity: 0,
      y: 40,
      duration: 0.85,
      ease: 'power3.out'
    });

    const achievements = aboutCard.querySelectorAll('.achievement-row');
    if (achievements.length) {
      gsap.from(achievements, {
        scrollTrigger: {
          trigger: aboutCard,
          start: 'top 80%',
          toggleActions: 'play none none none'
        },
        opacity: 0,
        x: -25,
        stagger: 0.12,
        duration: 0.65,
        ease: 'power3.out'
      });
    }
  }

  // History Single Rows
  const historyRows = document.querySelectorAll('.banner__history-single');
  if (historyRows.length) {
    historyRows.forEach((row) => {
      gsap.from(row, {
        scrollTrigger: {
          trigger: row,
          start: 'top 88%',
          toggleActions: 'play none none none'
        },
        opacity: 0,
        y: 30,
        duration: 0.7,
        ease: 'power3.out'
      });
    });
  }

  // Sidebar Specialization Items
  const specItems = document.querySelectorAll('.banner__sidebar-special');
  if (specItems.length) {
    specItems.forEach((item) => {
      gsap.from(item, {
        scrollTrigger: {
          trigger: item,
          start: 'top 90%',
          toggleActions: 'play none none none'
        },
        opacity: 0,
        x: 20,
        duration: 0.6,
        ease: 'power3.out'
      });
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
    gsap.from(footerIntro, {
      scrollTrigger: {
        trigger: footerIntro,
        start: 'top 85%',
        toggleActions: 'play none none none'
      },
      opacity: 0,
      y: 35,
      duration: 0.8,
      ease: 'power3.out'
    });
  }

  if (footerEmail) {
    gsap.from(footerEmail, {
      scrollTrigger: {
        trigger: footerEmail,
        start: 'top 85%',
        toggleActions: 'play none none none'
      },
      opacity: 0,
      scale: 0.94,
      y: 40,
      duration: 0.9,
      ease: 'power3.out'
    });
  }
}
