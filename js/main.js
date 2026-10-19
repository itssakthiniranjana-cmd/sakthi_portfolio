/**
 * Sakthi Niranjana S - Portfolio Script
 * Interactive behaviors, theme toggling, menu accordions, hover reveals, and smooth interactions
 */

(function () {
  'use strict';

  // 1. Color Scheme Management (Dark / Light)
  const initTheme = () => {
    const savedTheme = localStorage.getItem('color-scheme') || 'light';
    document.documentElement.setAttribute('color-scheme', savedTheme);
    updateThemeIcon(savedTheme);

    const themeToggleButtons = document.querySelectorAll('.mxd-color-switcher');
    themeToggleButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const currentTheme = document.documentElement.getAttribute('color-scheme') || 'light';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('color-scheme', newTheme);
        localStorage.setItem('color-scheme', newTheme);
        updateThemeIcon(newTheme);
      });
    });
  };

  const updateThemeIcon = (theme) => {
    const icons = document.querySelectorAll('.mxd-color-switcher i');
    icons.forEach(icon => {
      if (theme === 'dark') {
        icon.className = 'ph-bold ph-sun';
      } else {
        icon.className = 'ph-bold ph-moon';
      }
    });
  };

  // 2. Fullscreen Menu & Accordion Drawer
  const initNavigation = () => {
    const getMenuElements = () => ({
      menuWrap: document.querySelector('.mxd-menu__wrapper'),
      navWrap: document.querySelector('.mxd-nav__wrap')
    });

    const openMenu = () => {
      document.body.classList.add('nav-open');
      const { menuWrap, navWrap } = getMenuElements();
      if (menuWrap) {
        menuWrap.classList.add('active_menu');
        menuWrap.style.display = 'block';
        menuWrap.style.opacity = '1';
        menuWrap.style.visibility = 'visible';
        menuWrap.style.pointerEvents = 'auto';
      }
      if (navWrap) {
        navWrap.classList.add('active_menu');
        navWrap.style.pointerEvents = 'auto';
      }
    };

    const closeMenu = () => {
      document.body.classList.remove('nav-open');
      const { menuWrap, navWrap } = getMenuElements();
      if (menuWrap) {
        menuWrap.classList.remove('active_menu');
        menuWrap.style.opacity = '0';
        menuWrap.style.visibility = 'hidden';
        menuWrap.style.pointerEvents = 'none';
      }
      if (navWrap) {
        navWrap.classList.remove('active_menu');
        navWrap.style.pointerEvents = 'none';
      }
    };

    // Global click delegation for hamburger buttons
    document.addEventListener('click', (e) => {
      const hamburger = e.target.closest('.mxd-nav__hamburger');
      if (hamburger) {
        e.preventDefault();
        e.stopPropagation();
        const isOpen = document.body.classList.contains('nav-open');
        if (isOpen) {
          closeMenu();
        } else {
          openMenu();
        }
      }
    });

    // Submenu toggles
    document.addEventListener('click', (e) => {
      const toggle = e.target.closest('.main-menu__toggle');
      if (!toggle) return;
      e.preventDefault();
      const parentItem = toggle.closest('.main-menu__item');
      if (!parentItem) return;

      const submenu = parentItem.querySelector('.submenu');
      if (!submenu) return;

      const isOpen = parentItem.classList.contains('open');

      // Close other items
      document.querySelectorAll('.main-menu__item.open').forEach(item => {
        if (item !== parentItem) {
          item.classList.remove('open');
          const sub = item.querySelector('.submenu');
          if (sub) {
            sub.style.height = '0';
            sub.style.paddingTop = '0';
          }
        }
      });

      if (isOpen) {
        parentItem.classList.remove('open');
        submenu.style.height = '0';
        submenu.style.paddingTop = '0';
      } else {
        parentItem.classList.add('open');
        submenu.style.height = 'auto';
        submenu.style.paddingTop = '1.5rem';
      }
    });

    // Close menu when clicking internal anchor links
    document.addEventListener('click', (e) => {
      const link = e.target.closest('.mxd-menu__wrapper a:not(.main-menu__toggle a)');
      if (link) {
        closeMenu();
      }
    });

    // Close menu when clicking backdrop overlay
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('mxd-menu__base')) {
        closeMenu();
      }
    });

    // Close menu on Escape key press
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && document.body.classList.contains('nav-open')) {
        closeMenu();
      }
    });
  };

  // 3. Header scroll state & To Top Button
  const initScrollEvents = () => {
    const header = document.getElementById('header');
    const toTopBtn = document.getElementById('to-top');

    window.addEventListener('scroll', () => {
      const scrollPos = window.scrollY;

      if (header) {
        if (scrollPos > 40) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
      }

      if (toTopBtn) {
        if (scrollPos > 400) {
          toTopBtn.style.opacity = '1';
          toTopBtn.style.visibility = 'visible';
          toTopBtn.style.pointerEvents = 'auto';
        } else {
          toTopBtn.style.opacity = '0';
          toTopBtn.style.visibility = 'hidden';
          toTopBtn.style.pointerEvents = 'none';
        }
      }
    });

    if (toTopBtn) {
      toTopBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  };

  // 4. Stat Counter Animations
  const initCounters = () => {
    const counters = document.querySelectorAll('.mxd-stats-number span');
    if (!counters.length) return;

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const targetValue = parseInt(el.getAttribute('data-target') || el.innerText, 10);
          if (!isNaN(targetValue) && targetValue > 0) {
            animateCounter(el, targetValue);
          }
          obs.unobserve(el);
        }
      });
    }, { threshold: 0.2 });

    counters.forEach(counter => {
      const val = parseInt(counter.innerText, 10);
      if (!isNaN(val) && val > 0) {
        counter.setAttribute('data-target', val);
        counter.innerText = '0';
      }
      observer.observe(counter);
    });
  };

  const animateCounter = (el, target) => {
    let current = 0;
    const duration = 1500;
    const stepTime = Math.max(Math.floor(duration / target), 30);
    const stepAmount = Math.max(Math.ceil(target / (duration / stepTime)), 1);

    const timer = setInterval(() => {
      current += stepAmount;
      if (current >= target) {
        el.innerText = target;
        clearInterval(timer);
      } else {
        el.innerText = current;
      }
    }, stepTime);
  };

  // 5. Hover Reveal Image Follower
  const initHoverReveal = () => {
    const revealItems = document.querySelectorAll('.hover-reveal__item');
    revealItems.forEach(item => {
      const content = item.querySelector('.hover-reveal__content');
      if (!content) return;

      item.addEventListener('mouseenter', () => {
        content.style.opacity = '1';
      });

      item.addEventListener('mouseleave', () => {
        content.style.opacity = '0';
      });

      item.addEventListener('mousemove', (e) => {
        const x = e.clientX + 30;
        const y = e.clientY - 40;
        content.style.left = `${x}px`;
        content.style.top = `${y}px`;
        content.style.transform = 'translate(-20%, -50%)';
      });
    });
  };

  // 6. Portfolio Filter (Works page)
  const initPortfolioFilter = () => {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.portfolio-filter-item');

    if (!filterBtns.length || !projectItems.length) return;

    filterBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterVal = btn.getAttribute('data-filter') || 'all';

        projectItems.forEach(item => {
          const cat = item.getAttribute('data-category') || '';
          if (filterVal === 'all' || cat.includes(filterVal)) {
            item.style.display = '';
            item.style.opacity = '0';
            setTimeout(() => {
              item.style.transition = 'opacity 0.4s ease';
              item.style.opacity = '1';
            }, 50);
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  };

  // 7. Testimonials Slider
  const initTestimonials = () => {
    const slides = document.querySelectorAll('.swiper-testimonials .swiper-slide');
    if (!slides.length) return;

    let currentIndex = 0;
    const total = slides.length;
    const prevBtn = document.querySelector('.swiper-button-prev');
    const nextBtn = document.querySelector('.swiper-button-next');
    const pagination = document.querySelector('.swiper-pagination');

    const updateSlider = () => {
      slides.forEach((slide, idx) => {
        if (idx === currentIndex) {
          slide.style.display = 'block';
          slide.style.opacity = '0';
          setTimeout(() => {
            slide.style.transition = 'opacity 0.5s ease';
            slide.style.opacity = '1';
          }, 20);
        } else {
          slide.style.display = 'none';
        }
      });

      if (pagination) {
        pagination.innerText = `${currentIndex + 1} / ${total}`;
      }
    };

    if (prevBtn) {
      prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        currentIndex = (currentIndex - 1 + total) % total;
        updateSlider();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        currentIndex = (currentIndex + 1) % total;
        updateSlider();
      });
    }

    updateSlider();
  };

  // 8. Contact & Subscribe Forms
  const initForms = () => {
    // Contact form
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
      contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        if (submitBtn) {
          submitBtn.disabled = true;
          const origText = submitBtn.innerHTML;
          submitBtn.innerHTML = 'Sending...';

          setTimeout(() => {
            submitBtn.disabled = false;
            submitBtn.innerHTML = origText;
            contactForm.reset();
            const reply = contactForm.closest('.mxd-block__inner-form')?.querySelector('.form__reply');
            if (reply) {
              reply.style.display = 'block';
              contactForm.style.display = 'none';
            }
            showToast('Thank you! Your message has been sent to Sakthi Niranjana.');
          }, 800);
        }
      });
    }

    // Subscribe forms
    const notifyForms = document.querySelectorAll('.notify-form');
    notifyForms.forEach(form => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        form.reset();
        const parent = form.closest('.form-container');
        const okReply = parent?.querySelector('.form__reply.subscription-ok');
        if (okReply) {
          okReply.style.display = 'block';
          form.style.display = 'none';
        }
        showToast('Subscribed! You will receive design insights directly.');
      });
    });
  };

  // 9. Toast Helper
  const showToast = (message) => {
    let toast = document.querySelector('.toast-alert');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'toast-alert';
      document.body.appendChild(toast);
    }
    toast.innerHTML = `<i class="ph-bold ph-check-circle" style="color:var(--additional);font-size:2rem;"></i> <span>${message}</span>`;
    toast.classList.add('show');

    setTimeout(() => {
      toast.classList.remove('show');
    }, 4500);
  };

  // 10. Video Showreel Modal
  const initVideoModal = () => {
    const triggers = document.querySelectorAll('.showreel-trigger');
    triggers.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        let modal = document.querySelector('.videoModal__overlay');
        if (!modal) {
          modal = document.createElement('div');
          modal.className = 'videoModal__overlay';
          modal.innerHTML = `
            <div class="videoModal__content" style="position:relative; width:90%; max-width:1000px; background:#161616; border-radius:24px; padding:30px; box-shadow:0 30px 60px rgba(0,0,0,0.5);">
              <button class="videoModal__close" style="position:absolute; top:15px; right:20px; font-size:28px; background:none; border:none; color:#fff; cursor:pointer;">&times;</button>
              <div style="aspect-ratio:16/9; width:100%; border-radius:16px; overflow:hidden; background:#000;">
                <video src="video/540x310_video-01.mp4" controls autoplay loop style="width:100%; height:100%; object-fit:cover;"></video>
              </div>
              <div style="margin-top:20px; color:#fff;">
                <h4 style="color:#fff; margin-bottom:5px;">Sakthi Niranjana — UI/UX Design System & Product Reel</h4>
                <p style="color:#aaa; font-size:1.5rem;">A dynamic glimpse into Warehouse Management System (WMS), Supply Chain SaaS interfaces, and interactive prototypes built in Figma.</p>
              </div>
            </div>
          `;
          document.body.appendChild(modal);

          const closeBtn = modal.querySelector('.videoModal__close');
          closeBtn.addEventListener('click', () => {
            modal.classList.remove('active');
            const video = modal.querySelector('video');
            if (video) video.pause();
          });

          modal.addEventListener('click', (ev) => {
            if (ev.target === modal) {
              modal.classList.remove('active');
              const video = modal.querySelector('video');
              if (video) video.pause();
            }
          });
        }

        modal.classList.add('active');
        const video = modal.querySelector('video');
        if (video) video.play();
      });
    });
  };

  // 11. Blog Filter & Search (Insights page)
  const initBlogFilter = () => {
    const filterLinks = document.querySelectorAll('[data-blog-filter]');
    const posts = document.querySelectorAll('.mxd-posts-container .mxd-post');
    const searchInput = document.getElementById('search');

    if (!posts.length) return;

    const applyFilter = (filterVal) => {
      // Update active state on header tags
      document.querySelectorAll('.inner-headline__blogtags .tag').forEach(tag => {
        const link = tag.querySelector('[data-blog-filter]');
        if (link && link.getAttribute('data-blog-filter') === filterVal) {
          tag.classList.add('active');
        } else {
          tag.classList.remove('active');
        }
      });

      posts.forEach(post => {
        const cat = (post.getAttribute('data-category') || '').toLowerCase();
        if (filterVal === 'all' || cat.includes(filterVal.toLowerCase())) {
          post.style.display = '';
          post.style.opacity = '0';
          setTimeout(() => {
            post.style.transition = 'opacity 0.4s ease';
            post.style.opacity = '1';
          }, 30);
        } else {
          post.style.display = 'none';
        }
      });
    };

    filterLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const filterVal = link.getAttribute('data-blog-filter') || 'all';
        applyFilter(filterVal);
      });
    });

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        const query = e.target.value.trim().toLowerCase();
        posts.forEach(post => {
          const text = post.textContent.toLowerCase();
          if (!query || text.includes(query)) {
            post.style.display = '';
            post.style.opacity = '1';
          } else {
            post.style.display = 'none';
          }
        });
      });
    }
  };

  // Initialize all immediately or on DOM ready
  const initApp = () => {
    initTheme();
    initNavigation();
    initScrollEvents();
    initCounters();
    initHoverReveal();
    initPortfolioFilter();
    initBlogFilter();
    initTestimonials();
    initForms();
    initVideoModal();
    document.body.classList.add('page-loaded');
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
  } else {
    initApp();
  }
})();

