

document.addEventListener('DOMContentLoaded', () => {

 
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();


  /* -------------------------------------------------
     2. Hire Me button with alert
  ------------------------------------------------- */
  const hireBtn = document.getElementById('hire-btn');
  if (hireBtn) {
    hireBtn.addEventListener('click', () => {
      alert("Thanks for your interest! Send a message through the contact form and I'll get back to you within a day.");
    });
  }


  /* -------------------------------------------------
     3. Show / Hide "More About Me"
  ------------------------------------------------- */
  const toggleAboutBtn = document.getElementById('toggle-about');
  const moreAbout = document.getElementById('more-about');

  if (toggleAboutBtn && moreAbout) {
    toggleAboutBtn.addEventListener('click', () => {
      const isHidden = moreAbout.hasAttribute('hidden');
      const label = toggleAboutBtn.querySelector('.toggle-label');

      if (isHidden) {
        moreAbout.removeAttribute('hidden');
        toggleAboutBtn.setAttribute('aria-expanded', 'true');
        label.textContent = 'Show less';
      } else {
        moreAbout.setAttribute('hidden', '');
        toggleAboutBtn.setAttribute('aria-expanded', 'false');
        label.textContent = 'Show more about me';
      }
    });
  }


  /* -------------------------------------------------
     4. Mobile hamburger menu
  ------------------------------------------------- */
  const hamburger = document.getElementById('hamburger');
  const siteNav = document.getElementById('site-nav');

  if (hamburger && siteNav) {
    hamburger.addEventListener('click', () => {
      const isOpen = siteNav.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', String(isOpen));
      hamburger.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
    });

    // Close the mobile menu whenever a nav link is clicked
    siteNav.querySelectorAll('.nav-link').forEach((link) => {
      link.addEventListener('click', () => {
        siteNav.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.setAttribute('aria-label', 'Open menu');
      });
    });
  }


  /* -------------------------------------------------
     5. Smooth scrolling navigation
     (progressive enhancement on top of CSS scroll-behavior,
     mainly so we can account for the sticky header offset)
  ------------------------------------------------- */
  const header = document.querySelector('.site-header');

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId.length <= 1) return; // ignore bare "#"

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      const headerHeight = header ? header.offsetHeight : 0;
      const top = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 12;

      window.scrollTo({ top, behavior: 'smooth' });
    });
  });


  /* -------------------------------------------------
     6. Scroll-to-top button
  ------------------------------------------------- */
  const scrollTopBtn = document.getElementById('scroll-top');

  if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 480) {
        scrollTopBtn.classList.add('visible');
      } else {
        scrollTopBtn.classList.remove('visible');
      }
    });

    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }


  /* -------------------------------------------------
     7. Contact form validation
  ------------------------------------------------- */
  const form = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');

  const validators = {
    name: (value) => {
      if (!value.trim()) return 'Please enter your name.';
      if (value.trim().length < 2) return 'That name looks too short.';
      return '';
    },
    email: (value) => {
      const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!value.trim()) return 'Please enter your email.';
      if (!pattern.test(value.trim())) return 'Please enter a valid email address.';
      return '';
    },
    subject: (value) => {
      if (!value.trim()) return 'Please add a short subject.';
      return '';
    },
    message: (value) => {
      if (!value.trim()) return 'Please write a message.';
      if (value.trim().length < 10) return 'Message should be at least 10 characters.';
      return '';
    }
  };

  function showFieldError(fieldName, message) {
    const input = document.getElementById(fieldName);
    const errorEl = document.getElementById(`${fieldName}-error`);
    const row = input.closest('.form-row');

    if (message) {
      row.classList.add('invalid');
      errorEl.textContent = message;
    } else {
      row.classList.remove('invalid');
      errorEl.textContent = '';
    }
  }

  function validateField(fieldName) {
    const input = document.getElementById(fieldName);
    const message = validators[fieldName](input.value);
    showFieldError(fieldName, message);
    return message === '';
  }

  if (form) {
    // Validate on blur for immediate, non-annoying feedback
    Object.keys(validators).forEach((fieldName) => {
      const input = document.getElementById(fieldName);
      input.addEventListener('blur', () => validateField(fieldName));
      input.addEventListener('input', () => {
        // Clear error as soon as the user starts fixing it
        const row = input.closest('.form-row');
        if (row.classList.contains('invalid')) validateField(fieldName);
      });
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const fieldNames = Object.keys(validators);
      const results = fieldNames.map(validateField);
      const allValid = results.every(Boolean);

      if (!allValid) {
        formStatus.textContent = 'Please fix the highlighted fields before sending.';
        formStatus.className = 'form-status error';
        return;
      }

      // No backend is connected — simulate a successful send.
      formStatus.textContent = 'Message sent! Thanks for reaching out — I\'ll reply soon.';
      formStatus.className = 'form-status success';
      form.reset();
    });
  }


  /* -------------------------------------------------
     8. Typing effect for the hero "status" line
     (extra flourish tied to the editor-window visual)
  ------------------------------------------------- */
  const statusEl = document.getElementById('typed-status');

  if (statusEl) {
    const messages = ['"open to work"', '"shipping projects"', '"learning React"'];
    let messageIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function typeLoop() {
      const current = messages[messageIndex];

      if (!deleting) {
        statusEl.textContent = current.slice(0, charIndex + 1);
        charIndex++;
        if (charIndex === current.length) {
          deleting = true;
          setTimeout(typeLoop, 1400);
          return;
        }
      } else {
        statusEl.textContent = current.slice(0, charIndex - 1);
        charIndex--;
        if (charIndex === 0) {
          deleting = false;
          messageIndex = (messageIndex + 1) % messages.length;
        }
      }

      setTimeout(typeLoop, deleting ? 35 : 70);
    }

    typeLoop();
  }

});
