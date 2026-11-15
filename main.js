(function () {
  const $ = (s, r = document) => r.querySelector(s);
  window.toast = function (msg) {
    const t = $('#toast');
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(t._t);
    t._t = setTimeout(() => t.classList.remove('show'), 2200);
  };
  window.esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  window.LS = (k, d) => { try { const v = JSON.parse(localStorage.getItem(k)); return v == null ? d : v; } catch (e) { return d; } };
  window.SV = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} };

  const bar = $('#progress'), up = $('#toTop'), nav = $('#nav'), burger = $('#burger');
  const onScroll = () => {
    const h = document.documentElement;
    bar.style.transform = 'scaleX(' + h.scrollTop / Math.max(1, h.scrollHeight - h.clientHeight) + ')';
    up.classList.toggle('show', h.scrollTop > 600);
  };
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  up.onclick = () => scrollTo({ top: 0 });
  burger.onclick = () => burger.setAttribute('aria-expanded', nav.classList.toggle('open'));
  nav.addEventListener('click', e => { if (e.target.closest('a')) nav.classList.remove('open'); });

  window.reveal = function (root) {
    const els = (root || document).querySelectorAll('.rv:not(.in)');
    if (!('IntersectionObserver' in window)) { els.forEach(e => e.classList.add('in')); return; }
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    }), { threshold: 0.08 });
    els.forEach(e => io.observe(e));
  };
  reveal();
})();
// scroll-linked parallax background + hero (skipped for reduced-motion users)
(function () {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const r = document.documentElement.style; let tick = false;
  function upd() {
    const y = scrollY;
    r.setProperty('--py', (-y * 0.12).toFixed(1) + 'px');
    r.setProperty('--sz', Math.min(y / 9000, 0.1).toFixed(3));
    r.setProperty('--hy', Math.min(y * 0.3, 160).toFixed(1) + 'px');
    r.setProperty('--ho', Math.max(0, 1 - y / 420).toFixed(2));
    tick = false;
  }
  addEventListener('scroll', () => { if (!tick) { tick = true; requestAnimationFrame(upd); } }, { passive: true });
  upd();
})();
