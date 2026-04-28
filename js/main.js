/**
 * 核心功能
 * ========
 * 导航、滚动、动画、Tab 切换、下拉菜单
 */

/* ===== Scroll Reveal (IntersectionObserver) ===== */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
    }
  });
}, { threshold: 0.08 });

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
});

/* ===== Navigation Scroll Effect ===== */
window.addEventListener('scroll', () => {
  const nav = document.getElementById('nav');
  if (nav) nav.classList.toggle('scrolled', window.scrollY > 40);
});

/* ===== Active Section Highlight ===== */
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 180) current = s.id;
  });
  document.querySelectorAll('.nav-links a:not(.resume-btn):not(.dropdown-toggle):not(.lang-btn)').forEach(a => {
    a.style.color = a.getAttribute('href') === '#' + current ? 'var(--gold)' : '';
  });
});

/* ===== Experience Tab ===== */
function switchExp(index) {
  const tabs = document.querySelectorAll('.exp-tab');
  const panels = document.querySelectorAll('.exp-panel');
  const indicator = document.getElementById('exp-indicator');

  tabs.forEach((t, i) => t.classList.toggle('active', i === index));
  panels.forEach((p, i) => p.classList.toggle('active', i === index));

  if (indicator) {
    if (window.innerWidth <= 768) {
      // 水平 Tab 模式
      const tabEl = tabs[index];
      indicator.style.width = tabEl.offsetWidth + 'px';
      indicator.style.left = tabEl.offsetLeft + 'px';
    } else {
      indicator.style.top = index * 40 + 'px';
      indicator.style.width = '2px';
      indicator.style.left = '-2px';
    }
  }
}

// 响应式 Tab 指示器
window.addEventListener('resize', () => {
  const activeIndex = Array.from(document.querySelectorAll('.exp-tab')).findIndex(t => t.classList.contains('active'));
  if (activeIndex >= 0) switchExp(activeIndex);
});

/* ===== Dropdown Menu ===== */
function toggleDropdown() {
  document.getElementById('dropdown-menu')?.classList.toggle('open');
}

document.addEventListener('click', (e) => {
  const dd = document.getElementById('more-dropdown');
  if (dd && !dd.contains(e.target)) {
    document.getElementById('dropdown-menu')?.classList.remove('open');
  }
});

/* ===== Staggered Reveal on Page Load ===== */
document.addEventListener('DOMContentLoaded', () => {
  const heroElements = document.querySelectorAll('.hero-overline, .hero h1, .hero .sub, .hero p, .hero .cta');
  heroElements.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    setTimeout(() => {
      el.style.transition = 'opacity 0.8s ease, transform 0.8s cubic-bezier(0.22, 1, 0.36, 1)';
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, 100 + i * 120);
  });
});
