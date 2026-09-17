/**
 * Contact Page Interactive System
 * Sakthi Niranjana S Portfolio
 */

export function initContactPage() {
  initClipboardHandlers();
  initFormChips();
  initContactForm();
  initContactFaq();
}

function showToast(message) {
  let toast = document.getElementById('contact-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'contact-toast';
    toast.className = 'contact-toast';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `<i class="fa-solid fa-circle-check"></i> <span>${message}</span>`;
  toast.classList.add('active');

  setTimeout(() => {
    toast.classList.remove('active');
  }, 3000);
}

function initClipboardHandlers() {
  // Copy Email Buttons
  const emailBtns = document.querySelectorAll('.js-copy-email');
  emailBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const email = 'its.sakthiniranjana@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        showToast('Email address copied to clipboard!');
      }).catch(() => {
        showToast('its.sakthiniranjana@gmail.com');
      });
    });
  });

  // Copy Phone Buttons
  const phoneBtns = document.querySelectorAll('.js-copy-phone');
  phoneBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const phone = '+916374523020';
      navigator.clipboard.writeText(phone).then(() => {
        showToast('Phone number copied to clipboard!');
      }).catch(() => {
        showToast('+91 6374523020');
      });
    });
  });
}

function initFormChips() {
  const chipGroups = document.querySelectorAll('.form-chips-wrap');
  chipGroups.forEach(group => {
    const isMulti = group.dataset.multi === 'true';
    const chips = group.querySelectorAll('.form-chip');

    chips.forEach(chip => {
      chip.addEventListener('click', () => {
        if (isMulti) {
          chip.classList.toggle('active');
        } else {
          chips.forEach(c => c.classList.remove('active'));
          chip.classList.add('active');
        }
      });
    });
  });
}

function initContactForm() {
  const form = document.getElementById('contact-inquiry-form');
  const successBanner = document.getElementById('form-success-banner');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameInput = document.getElementById('contact-name');
    const emailInput = document.getElementById('contact-email');
    const messageInput = document.getElementById('contact-message');
    const activeChips = Array.from(form.querySelectorAll('.form-chip.active')).map(c => c.textContent.trim());

    const name = nameInput ? nameInput.value.trim() : '';
    const email = emailInput ? emailInput.value.trim() : '';
    const message = messageInput ? messageInput.value.trim() : '';
    const interest = activeChips.length ? activeChips.join(', ') : 'General Product Inquiry';

    if (!name || !email) {
      showToast('Please enter your name and email address.');
      return;
    }

    // Build Mailto link as a reliable fallback
    const subject = encodeURIComponent(`Product Design Inquiry: ${name} (${interest})`);
    const body = encodeURIComponent(
      `Hello Sakthi,\n\nName: ${name}\nEmail: ${email}\nInterest: ${interest}\n\nMessage:\n${message}\n\nBest regards,\n${name}`
    );
    const mailtoUrl = `mailto:its.sakthiniranjana@gmail.com?subject=${subject}&body=${body}`;

    // Show Success feedback
    if (successBanner) {
      successBanner.classList.add('active');
      successBanner.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    showToast('Inquiry drafted! Launching email client...');

    setTimeout(() => {
      window.location.href = mailtoUrl;
    }, 1200);
  });
}

function initContactFaq() {
  const faqItems = document.querySelectorAll('.contact-faq-item');
  faqItems.forEach(item => {
    const btn = item.querySelector('.contact-faq-btn');
    if (btn) {
      btn.addEventListener('click', () => {
        const isOpen = item.classList.contains('active');
        faqItems.forEach(other => {
          if (other !== item) other.classList.remove('active');
        });
        item.classList.toggle('active', !isOpen);
      });
    }
  });
}
