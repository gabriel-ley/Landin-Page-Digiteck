/* =========================
   Menu responsivo
========================= */
const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('.site-nav');
const navLinks = document.querySelectorAll('.site-nav a');

if (menuToggle && siteNav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = siteNav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      siteNav.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

/* =========================
   Scroll suave e destaque de menu
========================= */
const sections = document.querySelectorAll('main section[id]');
const navItems = document.querySelectorAll('.site-nav a');

const setActiveLink = () => {
  let current = 'home';
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 120;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navItems.forEach((item) => {
    item.classList.toggle('active', item.getAttribute('href') === `#${current}`);
  });
};

window.addEventListener('scroll', setActiveLink);
window.addEventListener('load', setActiveLink);

/* =========================
   Animações ao rolar
========================= */
const revealItems = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

revealItems.forEach((item) => observer.observe(item));

/* =========================
   Botão voltar ao topo
========================= */
const backToTop = document.querySelector('.back-to-top');

window.addEventListener('scroll', () => {
  backToTop?.classList.toggle('visible', window.scrollY > 520);
});

backToTop?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* =========================
   Validação básica do formulário
========================= */
const contactForm = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');

contactForm?.addEventListener('submit', (event) => {
  event.preventDefault();

  const name = document.getElementById('name');
  const email = document.getElementById('email');
  const message = document.getElementById('message');

  const isNameValid = name.value.trim().length >= 2;
  const isEmailValid = /\S+@\S+\.\S+/.test(email.value);
  const isMessageValid = message.value.trim().length >= 10;

  if (!isNameValid || !isEmailValid || !isMessageValid) {
    formMessage.textContent = 'Preencha todos os campos corretamente para enviar sua mensagem.';
    formMessage.style.color = '#c2410c';
    return;
  }

  formMessage.textContent = 'Mensagem enviada com sucesso! Em breve nossa equipe entrará em contato.';
  formMessage.style.color = '#0f4c81';
  contactForm.reset();
});
