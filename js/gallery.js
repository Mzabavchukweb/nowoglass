/* =========================================================
   GALLERY.JS v2 — Ornament thumbnails + lightbox
   ========================================================= */
(function () {
  'use strict';

  const gallery  = document.getElementById('ornaments-gallery');
  const lightbox = document.getElementById('lightbox');
  const lbImg    = document.getElementById('lightbox-img');
  const lbClose  = document.getElementById('lightbox-close');

  if (!gallery) return;

  const ornaments = [
    'Katedra','Chinchilla','Delta','Epsilon','Fern','Gamma',
    'Koral','Kostka','Kryształ','Księżyc','Mleczny','Morena',
    'Niagara','Optima','Romb','Spring','Wir'
  ];

  ornaments.forEach((name, i) => {
    const idx = String(i + 1).padStart(2, '0');
    const wrap = document.createElement('div');
    wrap.className = 'ornament-thumb';
    wrap.setAttribute('role', 'listitem');
    wrap.setAttribute('tabindex', '0');
    wrap.setAttribute('aria-label', `Wzór ornamentowy: ${name}`);

    const img = document.createElement('img');
    img.src     = `img/ornamenty/${idx}.jpg`;
    img.alt     = `Szkło ornamentowe ${name}`;
    img.loading = 'lazy';

    const label = document.createElement('div');
    label.className = 'ornament-thumb__label';
    label.innerHTML = `<span>${name}</span>`;

    wrap.appendChild(img);
    wrap.appendChild(label);
    gallery.appendChild(wrap);

    const openLb = () => openLightbox(img.src, `Ornament: ${name}`);
    wrap.addEventListener('click', openLb);
    wrap.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLb(); }
    });
  });

  function openLightbox(src, alt) {
    if (!lightbox || !lbImg) return;
    lbImg.src = src;
    lbImg.alt = alt;
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
    lbClose?.focus();
  }

  function closeLightbox() {
    lightbox?.classList.remove('open');
    document.body.style.overflow = '';
  }

  lbClose?.addEventListener('click', closeLightbox);
  lightbox?.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });

})();
