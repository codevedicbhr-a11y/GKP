// Mobile menu
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
if (menuToggle) {
  menuToggle.addEventListener('click', () => navMenu.classList.toggle('open'));
  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navMenu.classList.remove('open'));
  });
}

// Header sticky shadow
window.addEventListener('scroll', () => {
  const h = document.getElementById('header');
  if (h) h.style.boxShadow = window.scrollY > 40 ? '0 4px 20px rgba(0,0,0,0.1)' : '0 2px 15px rgba(0,0,0,0.06)';
});

// Modal
const modal = document.getElementById('admissionModal');
function openModal() {
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}
function closeModal() {
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}
const closeBtn = document.getElementById('closeModal');
if (closeBtn) closeBtn.addEventListener('click', closeModal);
if (modal) {
  modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
}

// Popup on first load
window.addEventListener('load', () => {
  setTimeout(() => {
    if (!sessionStorage.getItem('popupShown')) {
      openModal();
      sessionStorage.setItem('popupShown', 'true');
    }
  }, 2000);
});

// Form → WhatsApp
const form = document.getElementById('enquiryForm');
if (form) {
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const cls = document.getElementById('class').value;
    const msg = document.getElementById('message').value.trim();
    let text = `*Admission Enquiry - Global Knowledge Public School*%0A%0A`;
    text += `*Name:* ${name}%0A*Phone:* ${phone}%0A*Class:* ${cls}%0A`;
    if (msg) text += `*Message:* ${msg}%0A`;
    window.open(`https://wa.me/917296092039?text=${text}`, '_blank');
    closeModal();
    this.reset();
  });
}

// Hero carousel
(function() {
  const slides = document.querySelectorAll('.hero-slide');
  if (!slides.length) return;
  const dotsContainer = document.getElementById('heroDots');
  slides.forEach((_, i) => {
    const dot = document.createElement('span');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goTo(i));
    if (dotsContainer) dotsContainer.appendChild(dot);
  });
  const dots = dotsContainer ? dotsContainer.querySelectorAll('span') : [];
  let current = 0;
  function goTo(n) {
    slides[current].classList.remove('active');
    if (dots[current]) dots[current].classList.remove('active');
    current = n;
    slides[current].classList.add('active');
    if (dots[current]) dots[current].classList.add('active');
  }
  setInterval(() => goTo((current + 1) % slides.length), 4500);
})();

// Active nav on scroll
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (scrollY >= sec.offsetTop - 120) current = sec.getAttribute('id');
  });
  document.querySelectorAll('nav a').forEach(a => {
    a.classList.remove('active');
    if (a.getAttribute('href') === '#' + current) a.classList.add('active');
  });
});
