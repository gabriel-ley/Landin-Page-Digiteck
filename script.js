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
   Carrossel de avaliações
========================= */
const reviews = [
  {
    title: 'Arlinda Pereira',
    text: 'Foi ótimas todos ótimos atendentes ❤️❤️❤️',
    detail: 'Avaliação de 5 estrelas no Google Maps',
    link: 'https://www.google.com/maps/reviews/data=!4m5!14m4!1m3!1m2!1s108162788860060327126!2s0x935a2e53e32741c7:0xbe93749cd29cefd8?ved=1t:31295&ictx=111',
    cta: 'Ver avaliação completa'
  },
  {
    title: 'Renan Soares',
    text: 'Ótimo lugar para fazer impressão com computadores e mini papelaria. Dependendo da hora é bem difícil estacionar.',
    detail: 'Avaliação de 5 estrelas no Google Maps',
    link: 'https://www.google.com/maps/reviews/data=!4m5!14m4!1m3!1m2!1s116242512945058837494!2s0x935a2e53e32741c7:0xbe93749cd29cefd8?ved=1t:31295&ictx=111',
    cta: 'Ver avaliação completa'
  },
  {
    title: 'Rivaldo Filho',
    text: 'Uma boa loja de produtos de internet. Um bom atendimento.',
    detail: 'Avaliação de 4 estrelas no Google Maps',
    link: 'https://www.google.com/maps/reviews/data=!4m5!14m4!1m3!1m2!1s114758857722958899026!2s0x935a2e53e32741c7:0xbe93749cd29cefd8?ved=1t:31295&ictx=111',
    cta: 'Ver avaliação completa'
  }
];

const sortedReviews = [...reviews];
const reviewsCarousel = document.getElementById('reviews-carousel');
const reviewCounter = document.getElementById('review-counter');
let currentReviewIndex = 0;

const renderReviews = () => {
  if (!reviewsCarousel) return;

  reviewsCarousel.innerHTML = '';

  sortedReviews.forEach((review, index) => {
    const slide = document.createElement('article');
    slide.className = `review-card${index === 0 ? ' active' : ''}`;
    slide.innerHTML = `
      <div class="review-stars" aria-label="5 estrelas">
        <i class="fa-solid fa-star"></i>
        <i class="fa-solid fa-star"></i>
        <i class="fa-solid fa-star"></i>
        <i class="fa-solid fa-star"></i>
        <i class="fa-solid fa-star"></i>
      </div>
      <h3>${review.title}</h3>
      <p>${review.text}</p>
      <div class="reviewer">${review.detail}</div>
      <a class="review-link" href="${review.link}" target="_blank" rel="noopener noreferrer">${review.cta}</a>
    `;
    reviewsCarousel.appendChild(slide);
  });

  updateReviewCounter();
};

const updateReviewCounter = () => {
  if (!reviewCounter) return;
  const slides = reviewsCarousel?.querySelectorAll('.review-card') || [];
  reviewCounter.textContent = `${currentReviewIndex + 1} de ${slides.length}`;
};

const showReview = (index) => {
  const slides = reviewsCarousel?.querySelectorAll('.review-card') || [];
  if (!slides.length) return;

  currentReviewIndex = (index + slides.length) % slides.length;
  slides.forEach((slide, slideIndex) => {
    slide.classList.toggle('active', slideIndex === currentReviewIndex);
  });

  updateReviewCounter();
};

document.querySelector('.review-prev')?.addEventListener('click', () => showReview(currentReviewIndex - 1));
document.querySelector('.review-next')?.addEventListener('click', () => showReview(currentReviewIndex + 1));

renderReviews();
showReview(0);

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
