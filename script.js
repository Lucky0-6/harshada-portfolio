
// ── LOADER ──────────────────────────────────────────────────────
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('loader');
    loader.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
    loader.style.opacity = '0';
    loader.style.transform = 'translateY(-100%)';
    setTimeout(() => loader.remove(), 700);
  }, 1600);
});

// ── SCROLL PROGRESS ─────────────────────────────────────────────
const scrollBar = document.getElementById('scroll-progress');
window.addEventListener('scroll', () => {
  const total = document.documentElement.scrollHeight - window.innerHeight;
  scrollBar.style.width = (window.scrollY / total * 100) + '%';
}, { passive: true });

// ── NAVBAR SCROLL ───────────────────────────────────────────────
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 80);
}, { passive: true });

// ── ACTIVE NAV LINKS ────────────────────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      navLinks.forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id);
      });
    }
  });
}, { threshold: 0.4 });
sections.forEach(s => sectionObserver.observe(s));

// ── CUSTOM CURSOR ───────────────────────────────────────────────
const dot = document.getElementById('cursor-dot');
const ring = document.getElementById('cursor-ring');
let mx = 0, my = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  dot.style.left = mx + 'px';
  dot.style.top = my + 'px';
  ring.style.left = mx + 'px';
  ring.style.top = my + 'px';
});

document.querySelectorAll('a, button, .bento-card, .blog-card, .pdf-card, .skill-card').forEach(el => {
  el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
  el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
});

document.addEventListener('mousedown', () => document.body.classList.add('cursor-click'));
document.addEventListener('mouseup', () => document.body.classList.remove('cursor-click'));

// !HIDING THE CURSOR ON MOBILE AND TAB SCREEN
window.addEventListener("load", function (event) {
  const currentWidth = this.window.innerWidth;
  if (currentWidth < 768) {
    dot.style.display = "none";
    ring.style.display = "none";
  }
})

// ── HERO PARALLAX ───────────────────────────────────────────────
const heroWrap = document.getElementById('heroImgWrap');
document.addEventListener('mousemove', e => {
  if (!heroWrap) return;
  const rx = (e.clientX / window.innerWidth - 0.5) * 14;
  const ry = (e.clientY / window.innerHeight - 0.5) * 10;
  heroWrap.style.transform = `translateY(-8px) rotate(${rx * 0.15}deg) perspective(800px) rotateX(${-ry * 0.3}deg) rotateY(${rx * 0.3}deg)`;
});

// ── MAGNETIC BUTTONS ────────────────────────────────────────────
document.querySelectorAll('.mag-btn-wrap').forEach(wrap => {
  const btn = wrap.querySelector('a');
  wrap.addEventListener('mousemove', e => {
    const r = wrap.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    const dx = (e.clientX - cx) * 0.28;
    const dy = (e.clientY - cy) * 0.28;
    btn.style.transform = `translate(${dx}px, ${dy}px)`;
  });
  wrap.addEventListener('mouseleave', () => {
    btn.style.transform = 'translate(0,0)';
    btn.style.transition = 'transform 0.5s cubic-bezier(0.16,1,0.3,1)';
  });
});

// ── REVEAL ON SCROLL ────────────────────────────────────────────
const revealEls = document.querySelectorAll('[data-reveal]');
console.log("revealEls", revealEls)
const revealObs = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('revealed'), i * 70);
      revealObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
revealEls.forEach(el => revealObs.observe(el));

// ── SKILL BAR ANIMATION ─────────────────────────────────────────
const skillBars = document.querySelectorAll('.skill-bar-fill');
const skillObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const w = e.target.dataset.width;
      setTimeout(() => { e.target.style.width = w + '%'; }, 200);
      skillObs.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });
skillBars.forEach(b => skillObs.observe(b));

// ── MARQUEE DIRECTION REVERSAL ON SCROLL ────────────────────────
let lastSY = 0;
const marqueeTrack = document.getElementById('marqueeTrack');
window.addEventListener('scroll', () => {
  const dy = window.scrollY - lastSY;
  if (marqueeTrack) {
    marqueeTrack.style.animationDirection = dy > 0 ? 'normal' : 'reverse';
  }
  lastSY = window.scrollY;
}, { passive: true });

// ── SWIPER ───────────────────────────────────────────────────────
const swiper = new Swiper('#swiperCreatives', {
  slidesPerView: 'auto',
  centeredSlides: true,
  spaceBetween: 24,
  loop: true,
  autoplay: { delay: 3200, disableOnInteraction: false },
  pagination: {
    el: '.swiper-pagination',
    clickable: true
  },
  grabCursor: true,
  speed: 700,
  effect: 'slide',
});
document.getElementById('prevBtn').addEventListener('click', () => swiper.slidePrev());
document.getElementById('nextBtn').addEventListener('click', () => swiper.slideNext());

// ── FANCYBOX ────────────────────────────────────────────────────
Fancybox.bind('[data-fancybox]', {
  dragToClose: false,
  animated: true,
  showClass: 'fancybox-zoomInUp',
  hideClass: 'fancybox-zoomOut',
  Toolbar: { display: { left: ['infobar'], middle: [], right: ['close'] } }
});

// ── SMOOTH SCROLL ───────────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ── HERO STAT COUNT-UP ──────────────────────────────────────────
function animateCount(el, target, suffix) {
  let start = 0;
  const dur = 1600;
  const step = timestamp => {
    if (!start) start = timestamp;
    const prog = Math.min((timestamp - start) / dur, 1);
    const ease = 1 - Math.pow(1 - prog, 4);
    el.textContent = Math.floor(ease * target) + suffix;
    if (prog < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

const statNums = document.querySelectorAll('.hero-stat-num');
const statObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const count = parseInt(e.target.dataset.count);
      animateCount(e.target, count, '+');
      statObs.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });
statNums.forEach(n => { if (n.dataset.count) statObs.observe(n); });
