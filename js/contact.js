/**
 * Contact Page Interactive System — Form-Free Direct Communication Edition
 * Sakthi Niranjana S Portfolio
 */

export function initContactPage() {
  initClipboardHandlers();
  initContactFaq();
}

export function showToast(message) {
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
