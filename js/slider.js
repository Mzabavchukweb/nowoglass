/* =========================================================
   SLIDER.JS v3 — Hero z prawdziwymi zdjęciami
   ========================================================= */
(function () {
  'use strict';

  /* Dane slajdów — rzeczywiste zdjęcia */
  const slides = [
    {
      // Slajd 1: Szklane wieżowce — pokazuje efekt końcowy naszych produktów
      img: 'img/hero_glass_facade.jpg',
      alt: 'Nowoczesna szklana fasada budynku korporacyjnego — szyby zespolone NOWO-GLAS',
      eyebrow: 'Producent szyb od 1999 roku',
      title: 'Jakość szyb,<br>która <em>buduje</em><br>zaufanie.',
      sub: 'Certyfikowany producent szyb zespolonych, hartowanych i przeciwogniowych dla klientów B2B. Polska. Niemcy. Europa.',
      btn1: { text: 'Zakres oferty', href: 'oferta.html' },
      btn2: { text: 'Zapytaj o wycenę', href: 'kontakt.html' },
    },
    {
      // Slajd 2: Panorama miejska nocą — dziesiątki tysięcy szyb w budynkach to nasz produkt
      img: 'img/slide2_glass.jpg',
      alt: 'Panorama nowoczesnego miasta nocą — szyby zespolone NOWO-GLAS w budynkach',
      eyebrow: 'Certyfikat CE — PN-EN 1279-5',
      title: 'Szyby<br><em>zespolone</em><br>najwyższej klasy.',
      sub: 'Dwuszybowe i trójszybowe z wypełnieniem argonem. Wszystkie produkty objęte certyfikatami ISICQ, CE i ZKP. Deklaracje zgodności online.',
      btn1: { text: 'Szyby zespolone', href: 'oferta/szyby-zespolone.html' },
      btn2: { text: 'Pobierz deklaracje', href: 'deklaracje.html' },
    },
    {
      // Slajd 3: Biuro z przeszklonymi ścianami — B2B, środowisko naszych klientów
      img: 'img/slide3_office.jpg',
      alt: 'Nowoczesne biuro z przeszklonymi ścianami działowymi — partner techniczny NOWO-GLAS',
      eyebrow: 'Obsługa klientów B2B — PL / DE / EN',
      title: 'Twój<br><em>partner</em><br>techniczny.',
      sub: 'Dostarczamy pełną dokumentację techniczną, deklaracje zgodności i wsparcie dla architektów, deweloperów i producentów stolarki.',
      btn1: { text: 'Zapytaj o współpracę', href: 'kontakt.html' },
      btn2: { text: 'Dokumenty', href: 'dokumenty.html' },
    },
  ];

  let current = 0;
  let autoTimer = null;
  let isAnimating = false;

  const heroRight = document.getElementById('hero-right');
  const heroImg   = document.getElementById('hero-img');
  const dots      = document.querySelectorAll('.hero__dot');

  /* Text elements */
  const eyebrowEl = document.getElementById('hero-eyebrow');
  const titleEl   = document.getElementById('hero-title');
  const subEl     = document.getElementById('hero-sub');
  const btn1El    = document.getElementById('hero-btn1');
  const btn2El    = document.getElementById('hero-btn2');

  if (!heroImg) return;

  function goTo(idx, dir = 1) {
    if (isAnimating) return;
    isAnimating = true;

    const slide = slides[idx];
    const textWrap = document.getElementById('hero-text');

    /* Fade out left panel text */
    if (textWrap) {
      textWrap.style.opacity = '0';
      textWrap.style.transform = 'translateY(12px)';
    }

    /* Cross-fade photo */
    heroImg.style.opacity = '0';

    setTimeout(() => {
      /* Update photo */
      heroImg.src = slide.img;
      heroImg.alt = slide.alt;
      heroImg.onload = () => {
        heroImg.style.opacity = '1';
      };
      /* If already cached */
      if (heroImg.complete) heroImg.style.opacity = '1';

      /* Update text */
      if (eyebrowEl) eyebrowEl.textContent = slide.eyebrow;
      if (titleEl) titleEl.innerHTML = slide.title;
      if (subEl) subEl.textContent = slide.sub;
      if (btn1El) { btn1El.textContent = slide.btn1.text; btn1El.href = slide.btn1.href; }
      if (btn2El) { btn2El.textContent = slide.btn2.text; btn2El.href = slide.btn2.href; }

      /* Fade in text */
      if (textWrap) {
        setTimeout(() => {
          textWrap.style.opacity = '1';
          textWrap.style.transform = 'none';
        }, 80);
      }

      /* Update dots */
      dots.forEach((d, i) => {
        d.classList.toggle('active', i === idx);
        d.setAttribute('aria-selected', String(i === idx));
      });

      current = idx;
      isAnimating = false;
    }, 350);
  }

  /* Transitions on photo and text */
  if (heroImg) {
    heroImg.style.transition = 'opacity 0.45s ease';
  }
  const textW = document.getElementById('hero-text');
  if (textW) {
    textW.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
  }

  /* Dots */
  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      if (i !== current) { goTo(i); resetAuto(); }
    });
  });

  /* Auto-play */
  function resetAuto() {
    clearInterval(autoTimer);
    autoTimer = setInterval(() => {
      goTo((current + 1) % slides.length);
    }, 5500);
  }
  resetAuto();

  /* Preload next image */
  function preload(idx) {
    const img = new Image();
    img.src = slides[idx].img;
  }
  slides.forEach((_, i) => { if (i > 0) preload(i); });

  /* Set initial image */
  heroImg.src = slides[0].img;

})();

/* =========================================================
   COUNT-UP — animacja liczb w stats-row
   ========================================================= */
(function () {
  'use strict';

  function easeOut(t) { return 1 - Math.pow(1 - t, 3); }

  function animateCount(el) {
    if (el.dataset.nocount) return; // skip non-numeric stats
    const raw = el.dataset.count || el.textContent.trim();
    const isYear = raw.length === 4 && parseInt(raw) > 1990;
    const target = parseInt(raw.replace(/\D/g, ''));
    const suffix = raw.replace(/[\d]/g, '');
    const duration = isYear ? 1400 : 1200;
    const start = isYear ? target - 25 : 0;
    let startTime = null;

    el.dataset.count = raw;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const value = Math.floor(start + (target - start) * easeOut(progress));
      el.textContent = value + suffix;
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = raw;
    }
    requestAnimationFrame(step);
  }

  const statsObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.stats-row__num').forEach(animateCount);
        statsObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  const statsRow = document.querySelector('.stats-row__grid');
  if (statsRow) statsObs.observe(statsRow);
})();

/* =========================================================
   FADE-IN — scroll intersection observer
   ========================================================= */
(function () {
  'use strict';
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, entry.target.dataset.delay || 0);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.fade-in').forEach((el, i) => {
    el.dataset.delay = (i % 4) * 80;
    obs.observe(el);
  });
})();
