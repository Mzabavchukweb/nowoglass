/* =========================================================
   NAV.JS v2 — Sticky (na scroll) + hamburger + accordion
   ========================================================= */
(function () {
  'use strict';

  const navbar     = document.getElementById('navbar');
  const hamburger  = document.getElementById('hamburger-btn');
  const panel      = document.getElementById('mobile-panel');
  const overlay    = document.getElementById('mobile-overlay');
  const closeBtn   = document.getElementById('mobile-close-btn');
  const accBtn     = document.getElementById('mob-oferta-btn');
  const accContent = document.getElementById('mob-oferta-content');

  /* --- Sticky scroll shadow --- */
  const onScroll = () => {
    if (!navbar) return;
    if (window.scrollY > 10) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* --- Open / Close panel --- */
  function openPanel() {
    panel?.classList.add('open');
    overlay?.classList.add('open');
    hamburger?.classList.add('open');
    hamburger?.setAttribute('aria-expanded', 'true');
    panel?.setAttribute('aria-hidden', 'false');
    overlay?.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closePanel() {
    panel?.classList.remove('open');
    overlay?.classList.remove('open');
    hamburger?.classList.remove('open');
    hamburger?.setAttribute('aria-expanded', 'false');
    panel?.setAttribute('aria-hidden', 'true');
    overlay?.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  hamburger?.addEventListener('click', () => {
    panel?.classList.contains('open') ? closePanel() : openPanel();
  });
  closeBtn?.addEventListener('click', closePanel);
  overlay?.addEventListener('click', closePanel);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closePanel();
  });

  /* --- Mobile accordion (Oferta) --- */
  accBtn?.addEventListener('click', () => {
    const open = accContent?.classList.contains('open');
    if (open) {
      accContent?.classList.remove('open');
      accBtn?.classList.remove('open');
      accBtn?.setAttribute('aria-expanded', 'false');
    } else {
      accContent?.classList.add('open');
      accBtn?.classList.add('open');
      accBtn?.setAttribute('aria-expanded', 'true');
    }
  });

  /* --- Language Dropdown Toggle (Desktop & Mobile) --- */
  const langSelectors = document.querySelectorAll('.navbar__langs');
  langSelectors.forEach(langWrap => {
    const langBtn = langWrap.querySelector('.navbar__lang-current');
    if (langBtn) {
      langBtn.addEventListener('click', (e) => {
        // Toggle 'open' class for click-based visibility (mobile mostly)
        const isOpen = langWrap.classList.contains('open');
        
        // Close all other dropdowns
        document.querySelectorAll('.navbar__langs.open').forEach(el => {
          el.classList.remove('open');
          const btn = el.querySelector('.navbar__lang-current');
          if(btn) btn.setAttribute('aria-expanded', 'false');
        });

        if (!isOpen) {
          langWrap.classList.add('open');
          langBtn.setAttribute('aria-expanded', 'true');
        } else {
          langWrap.classList.remove('open');
          langBtn.setAttribute('aria-expanded', 'false');
        }
        e.stopPropagation();
      });
    }
  });

  // Close language dropdowns on outside click
  document.addEventListener('click', (e) => {
    document.querySelectorAll('.navbar__langs.open').forEach(langWrap => {
      if (!langWrap.contains(e.target)) {
        langWrap.classList.remove('open');
        const langBtn = langWrap.querySelector('.navbar__lang-current');
        if(langBtn) langBtn.setAttribute('aria-expanded', 'false');
      }
    });
  });

  /* --- Active nav link highlight --- */
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar__link, .mobile-panel__link, .navbar__lang-link').forEach(el => {
    const href = el.getAttribute('href') || '';
    if (href && href.endsWith(path) && path !== '') {
      el.classList.add('active');
    }
  });

  /* --- Scroll-reveal: fade-up --- */
  const fadeEls = document.querySelectorAll('.fade-up, .fade-in');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, i * 70);
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.01, rootMargin: '0px 0px 60px 0px' });
    fadeEls.forEach(el => io.observe(el));

    // Fallback: force-visible after 2s for elements that might be stuck
    setTimeout(() => {
      fadeEls.forEach(el => el.classList.add('visible'));
    }, 2000);
  } else {
    fadeEls.forEach(el => el.classList.add('visible'));
  }

})();
