/**
 * 3D Parallax Portrait Interactive Physics Engine
 * Sakthi Niranjana S Portfolio
 * 
 * Features:
 * - 3D Perspective Tilt on Mouse Movement
 * - Smooth Lerp Damping (60-120fps)
 * - Multi-layer Depth Parallax (Backdrop, Card, Image, Badges)
 * - Scroll-driven Elevation & Parallax Offset
 */

export function initPortraitParallax() {
  const stage = document.querySelector('.hero-portrait-stage');
  const card = document.querySelector('.hero-portrait-card');
  const img = document.querySelector('.hero-portrait-img');
  const badge1 = document.querySelector('.floating-badge-1');
  const badge2 = document.querySelector('.floating-badge-2');
  const glow = document.querySelector('.hero-portrait-backdrop-glow');

  if (!stage || !card) return;

  let mouseX = 0;
  let mouseY = 0;
  let currentRotateX = 0;
  let currentRotateY = 0;
  let targetRotateX = 0;
  let targetRotateY = 0;
  let scrollY = 0;

  // Window Mouse Move Listener
  window.addEventListener('mousemove', (e) => {
    const rect = stage.getBoundingClientRect();
    const stageCenterX = rect.left + rect.width / 2;
    const stageCenterY = rect.top + rect.height / 2;

    const diffX = e.clientX - stageCenterX;
    const diffY = e.clientY - stageCenterY;

    // Calculate rotation angles (max 18deg)
    targetRotateY = (diffX / (window.innerWidth / 2)) * 14;
    targetRotateX = -(diffY / (window.innerHeight / 2)) * 14;
  });

  // Device Gyroscope Support for Mobile
  if (window.DeviceOrientationEvent) {
    window.addEventListener('deviceorientation', (e) => {
      if (e.gamma !== null && e.beta !== null) {
        targetRotateY = Math.max(-15, Math.min(15, e.gamma / 2));
        targetRotateX = Math.max(-15, Math.min(15, (e.beta - 45) / 2));
      }
    });
  }

  // Scroll Listener
  window.addEventListener('scroll', () => {
    scrollY = window.scrollY || window.pageYOffset;
  });

  // Animation Loop with Lerp
  function updateParallax() {
    currentRotateX += (targetRotateX - currentRotateX) * 0.08;
    currentRotateY += (targetRotateY - currentRotateY) * 0.08;

    const scrollOffset = scrollY * 0.08;

    // Apply 3D Transform to Card
    card.style.transform = `
      translate3d(0, ${-scrollOffset}px, 0)
      rotateX(${currentRotateX}deg)
      rotateY(${currentRotateY}deg)
      translateZ(20px)
    `;

    // Inner Image Counter-Parallax
    if (img) {
      img.style.transform = `
        scale(1.04)
        translate3d(${-currentRotateY * 0.6}px, ${-currentRotateX * 0.6}px, 0)
      `;
    }

    // Floating Badge 1 (Forward Parallax)
    if (badge1) {
      badge1.style.transform = `
        translate3d(${currentRotateY * 1.2}px, ${currentRotateX * 1.2}px, 45px)
      `;
    }

    // Floating Badge 2 (Deeper Forward Parallax)
    if (badge2) {
      badge2.style.transform = `
        translate3d(${-currentRotateY * 1.4}px, ${-currentRotateX * 1.4}px, 55px)
      `;
    }

    // Backdrop Glow Follow
    if (glow) {
      glow.style.transform = `
        translate3d(${currentRotateY * 1.8}px, ${currentRotateX * 1.8}px, -20px)
      `;
    }

    requestAnimationFrame(updateParallax);
  }

  updateParallax();
}
