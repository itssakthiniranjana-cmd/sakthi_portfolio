/**
 * Experience & Education Interactive Toggle System
 * Sakthi Niranjana S Portfolio
 * 
 * Features:
 * - Clean toggle switch between Experiences and Education
 * - 2-Column Responsive Card Grid matching user mockup
 * - Date badges, bold titles, organization labels, descriptions, and tag pills
 */

import { EXPERIENCE_TIMELINE, EDUCATION_TIMELINE } from './data.js';

export function initExperienceEducationToggle(containerId = 'exp-edu-container') {
  const container = document.getElementById(containerId);
  if (!container) return;

  let currentTab = 'experiences'; // 'experiences' | 'education'

  function render() {
    const isExp = currentTab === 'experiences';
    const items = isExp ? EXPERIENCE_TIMELINE : EDUCATION_TIMELINE;

    container.innerHTML = `
      <div class="exp-edu-wrapper">
        <!-- Centered Toggle Switch (Experiences [•] Education) -->
        <div class="exp-edu-toggle-bar">
          <button type="button" class="exp-edu-label-btn ${isExp ? 'active' : ''}" id="btn-show-exp">
            Experiences
          </button>
          
          <div class="exp-edu-toggle-switch ${!isExp ? 'toggled-right' : ''}" id="exp-edu-switch" role="switch" aria-checked="${!isExp}" aria-label="Toggle between Experiences and Education" tabindex="0" title="Toggle Experiences and Education">
            <span class="exp-edu-toggle-thumb"></span>
          </div>

          <button type="button" class="exp-edu-label-btn ${!isExp ? 'active' : ''}" id="btn-show-edu">
            Education
          </button>
        </div>

        <!-- 2-Column Grid of Cards matching user mockup -->
        <div class="exp-edu-grid" id="exp-edu-grid-target">
          ${items.map((item) => `
            <div class="exp-edu-card animate-fade-in" data-id="${item.id}">
              <div class="exp-edu-card-top">
                <span class="exp-edu-period-pill">${item.period}</span>
              </div>
              <div class="exp-edu-card-body">
                <h3 class="exp-edu-card-title">${item.role}</h3>
                <span class="exp-edu-card-org">${item.company}</span>
                <p class="exp-edu-card-desc">${item.description}</p>
              </div>
              <div class="exp-edu-card-tags">
                ${(item.tags || item.skills || []).map(t => `<span class="case-pill exp-edu-tag">${t}</span>`).join('')}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    // Bind Event Listeners
    const btnExp = document.getElementById('btn-show-exp');
    const btnEdu = document.getElementById('btn-show-edu');
    const toggleSwitch = document.getElementById('exp-edu-switch');

    if (btnExp) {
      btnExp.addEventListener('click', () => {
        if (currentTab !== 'experiences') {
          currentTab = 'experiences';
          render();
        }
      });
    }

    if (btnEdu) {
      btnEdu.addEventListener('click', () => {
        if (currentTab !== 'education') {
          currentTab = 'education';
          render();
        }
      });
    }

    if (toggleSwitch) {
      toggleSwitch.addEventListener('click', () => {
        currentTab = currentTab === 'experiences' ? 'education' : 'experiences';
        render();
      });

      toggleSwitch.addEventListener('keydown', (e) => {
        if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault();
          currentTab = currentTab === 'experiences' ? 'education' : 'experiences';
          render();
        }
      });
    }
  }

  // Initial render
  render();
}
