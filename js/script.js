// ===== Mobile nav toggle =====
const navToggle = document.getElementById('navToggle');
const mainNav = document.getElementById('mainNav');

function closeNav() {
  mainNav.classList.remove('open');
  navToggle.setAttribute('aria-expanded', 'false');
  navToggle.setAttribute('aria-label', 'Open menu');
}

function openNav() {
  mainNav.classList.add('open');
  navToggle.setAttribute('aria-expanded', 'true');
  navToggle.setAttribute('aria-label', 'Close menu');
}

navToggle.addEventListener('click', () => {
  const isOpen = mainNav.classList.contains('open');
  isOpen ? closeNav() : openNav();
});

mainNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', closeNav);
});

document.addEventListener('click', (e) => {
  if (!mainNav.classList.contains('open')) return;
  if (!mainNav.contains(e.target) && !navToggle.contains(e.target)) closeNav();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeNav();
});

// ===== Header shadow on scroll =====
const header = document.getElementById('siteHeader');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 8);
}, { passive: true });

// ===== Equipment rate toggle (daily / weekly) =====
document.querySelectorAll('.rate-toggle').forEach(btn => {
  btn.addEventListener('click', () => {
    const card = btn.closest('.equip-card, .detail-info');
    const priceBlock = card.querySelector('.equip-price');
    const valueEl = priceBlock.querySelector('.price-value');
    const unitEl = priceBlock.querySelector('.price-unit');
    const showingWeekly = btn.dataset.mode === 'weekly';

    if (showingWeekly) {
      valueEl.textContent = '$' + priceBlock.dataset.daily;
      unitEl.textContent = '/ day';
      btn.textContent = 'Show weekly rate';
      btn.dataset.mode = 'daily';
    } else {
      valueEl.textContent = '$' + priceBlock.dataset.weekly;
      unitEl.textContent = '/ week';
      btn.textContent = 'Show daily rate';
      btn.dataset.mode = 'weekly';
    }
  });
});

// ===== Contact form =====
const contactForm = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = contactForm.name.value.trim();
  const phone = contactForm.phone.value.trim();
  const message = contactForm.message.value.trim();

  if (!name || !phone || !message) {
    formNote.textContent = 'Please fill in every field before sending.';
    formNote.style.color = '#b33';
    return;
  }

  fetch('/api/contact', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, phone, message })
  })
  .then(response => response.json())
  .then(data => {
    formNote.style.color = '';
    formNote.textContent = data.message;
    contactForm.reset();
  })
  .catch(error => {
    formNote.textContent = 'Something went wrong. Please try again.';
    formNote.style.color = '#b33';
  });
});

// ===== Quote form (only present on quote.html) =====
const quoteForm = document.getElementById('quoteForm');
const quoteNote = document.getElementById('quoteNote');

if (quoteForm) {
  quoteForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = quoteForm.name.value.trim();
    const phone = quoteForm.phone.value.trim();
    const type = quoteForm.type.value;
    const details = quoteForm.details.value.trim();

    if (!name || !phone || !type || !details) {
      quoteNote.textContent = 'Please fill in every field so we can quote accurately.';
      quoteNote.style.color = '#b33';
      return;
    }

    // No backend connected yet — this simulates a successful send.
    quoteNote.style.color = '';
    quoteNote.textContent = "Thanks, " + name + " — we've got your request and will send pricing shortly. For a faster reply, message us on WhatsApp.";
    quoteForm.reset();
  });
}

// ===== Footer year =====
document.getElementById('year').textContent = new Date().getFullYear();