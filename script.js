const nav = document.querySelector('.main-nav');
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('#primary-menu');

if (nav && navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    navToggle.classList.toggle('nav-open');
    nav.classList.toggle('nav-open');
  });

  navMenu.addEventListener('click', (event) => {
    if (event.target instanceof HTMLAnchorElement && nav.classList.contains('nav-open')) {
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.classList.remove('nav-open');
      nav.classList.remove('nav-open');
    }
  });
}

const yearSpan = document.querySelector('#year');
if (yearSpan) {
  yearSpan.textContent = String(new Date().getFullYear());
}

const form = document.querySelector('.contact-form');
if (form instanceof HTMLFormElement) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const requiredFields = form.querySelectorAll('[required]');
    let hasErrors = false;

    requiredFields.forEach((field) => {
      if (!(field instanceof HTMLInputElement)) {
        return;
      }

      const container = field.closest('.form-field');
      const errorMessage = container?.querySelector('.error');

      if (errorMessage) {
        errorMessage.textContent = '';
      }

      const value = field.value.trim();
      if (!value) {
        hasErrors = true;
        if (errorMessage) {
          errorMessage.textContent = 'This field is required.';
        }
        return;
      }

      if (field.type === 'email' && !/^\S+@\S+\.\S+$/.test(value)) {
        hasErrors = true;
        if (errorMessage) {
          errorMessage.textContent = 'Enter a valid work email.';
        }
      }
    });

    if (!hasErrors) {
      form.reset();
      const confirmation = document.createElement('p');
      confirmation.className = 'form-confirmation';
      confirmation.textContent = 'Thank you. A Vain Bridge advisor will reach out shortly.';
      form.append(confirmation);
      setTimeout(() => {
        confirmation.remove();
      }, 6000);
    }
  });
}

const observerElements = document.querySelectorAll('[data-animate="fade-up"]');
if (observerElements.length > 0) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.2
  });

  observerElements.forEach((element) => observer.observe(element));
}
