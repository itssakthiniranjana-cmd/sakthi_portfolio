/**
 * 3D Capabilities Cloud Interactive System
 * Sakthi Niranjana S Portfolio
 * 
 * Features:
 * - 3D Perspective Tilt on Mouse Tracking
 * - Card Depth Elevation (translateZ)
 * - Neighboring Card Displacement & Subtle Repulsion
 * - Microcopy & Skill Badges Reveal
 */

import { CAPABILITIES } from './data.js';

export function renderCapabilities(containerId = 'capabilities-container') {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = '';
  
  CAPABILITIES.forEach((cap, index) => {
    const card = document.createElement('div');
    card.className = 'capability-card';
    card.dataset.index = index;

    card.innerHTML = `
      <span class="capability-num">${cap.id} // ${cap.category}</span>
      <h3 class="capability-title">${cap.title}</h3>
      <p class="capability-desc">${cap.description}</p>
      <div class="capability-skills">
        ${cap.skills.map(s => `<span class="capability-skill-pill">${s}</span>`).join('')}
      </div>
    `;

    // 3D Tilt & Magnetic Tracking
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -12;
      const rotateY = ((x - centerX) / centerX) * 12;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(35px)`;

      // Subtly displace sibling cards
      const allCards = container.querySelectorAll('.capability-card');
      allCards.forEach(sibling => {
        if (sibling !== card) {
          const sRect = sibling.getBoundingClientRect();
          const dist = Math.hypot(sRect.left - rect.left, sRect.top - rect.top);
          if (dist < 450) {
            const pushX = (sRect.left - rect.left) * 0.03;
            const pushY = (sRect.top - rect.top) * 0.03;
            sibling.style.transform = `translate3d(${pushX}px, ${pushY}px, -10px) scale(0.98)`;
            sibling.style.opacity = '0.75';
          }
        }
      });
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
      const allCards = container.querySelectorAll('.capability-card');
      allCards.forEach(sibling => {
        sibling.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
        sibling.style.opacity = '1';
      });
    });

    container.appendChild(card);
  });
}
