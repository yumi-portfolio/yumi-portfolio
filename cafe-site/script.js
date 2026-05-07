document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.header-inner');
  const navLinks = document.querySelectorAll('.nav a[href^="#"]');
  const sections = document.querySelectorAll('section[id]');

  /* スクロールフェード */
  const fadeTargets = document.querySelectorAll(
    '.fade-up, .concept-text, .concept-image, .about-block, .menu-visual, .menu-card, .space-main, .space-text, .gallery-item, .access-container'
  );

  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        fadeObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  });

  fadeTargets.forEach((target, index) => {
    target.style.transitionDelay = `${(index % 4) * 0.12}s`;
    fadeObserver.observe(target);
  });

  /* ヘッダー背景切り替え */
  const handleHeaderScroll = () => {
    if (!header) return;

    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleHeaderScroll);
  handleHeaderScroll();

  /* ナビのスムーススクロール */
  navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      const target = document.querySelector(targetId);

      if (!target) return;

      e.preventDefault();

      const headerHeight = header ? header.offsetHeight : 0;
      const targetPosition =
        target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    });
  });

  /* 現在位置のナビ強調 */
  const setActiveNav = () => {
    let currentSectionId = '';

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 140;
      const sectionHeight = section.offsetHeight;

      if (
        window.pageYOffset >= sectionTop &&
        window.pageYOffset < sectionTop + sectionHeight
      ) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');

      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  };

  window.addEventListener('scroll', setActiveNav);
  setActiveNav();
});

/* -----------------------------
   TOP スライド切り替え
----------------------------- */
const slides = document.querySelectorAll('.slide');
let current = 0;

if (slides.length > 0) {
  setInterval(() => {
    slides[current].classList.remove('active');

    current = (current + 1) % slides.length;

    slides[current].classList.add('active');
  }, 4000); // ← 4秒ごと
}
