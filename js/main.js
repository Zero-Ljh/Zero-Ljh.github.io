/**
 * 渲染引擎
 * ========
 * 从 DATA 读取内容，渲染到 HTML 容器中。
 * 用户只需编辑 data.js 即可更新所有内容。
 */

/* ===== 工具函数 ===== */
function debounce(fn, delay) {
  let timer; return function(...args) {
    clearTimeout(timer); timer = setTimeout(() => fn.apply(this, args), delay);
  };
}
function throttle(fn, limit) {
  let inThrottle; return function(...args) {
    if (!inThrottle) { fn.apply(this, args); inThrottle = true; setTimeout(() => { inThrottle = false; }, limit); }
  };
}

/* ===== 导航栏 ===== */
function renderNav() {
  const container = document.getElementById('nav-links');
  const mobileContainer = document.getElementById('mobile-links');
  const lang = typeof currentLang !== 'undefined' ? currentLang : 'zh';
  const t = DATA.i18n.nav;

  let desktopHtml = '';
  t.items.forEach(item => {
    desktopHtml += `<a href="${item.href}" data-en="${item.en}" data-zh="${item.zh}">${item[lang].toUpperCase()}</a>`;
  });

  desktopHtml += `<a href="#" id="resume-btn" class="resume-btn" data-en="${t.resumeBtn.en}" data-zh="${t.resumeBtn.zh}" onclick="event.preventDefault();window.open('${DATA.profile.resumeUrl}','_blank')">${t.resumeBtn[lang]}</a>
    <div class="dropdown" id="more-dropdown">
    <button class="dropdown-toggle" id="moreBtn" onclick="toggleDropdown()" data-en="${t.moreBtn.en}" data-zh="${t.moreBtn.zh}">${t.moreBtn[lang]}</button>
    <div class="dropdown-menu" id="dropdown-menu">`;

  t.dropdown.forEach(item => {
    desktopHtml += `<a href="${item.href}" data-en="${item.en}" data-zh="${item.zh}">${item[lang]}</a>`;
  });

  desktopHtml += `</div></div>
    <div class="lang-toggle">
      <button class="lang-btn active" onclick="setLang('zh')" id="lang-zh">中</button>
      <button class="lang-btn" onclick="setLang('en')" id="lang-en">EN</button>
    </div>`;

  container.innerHTML = desktopHtml;

  // Mobile menu: all items + resume
  if (mobileContainer) {
    let mobileHtml = '';
    [...t.items, ...t.dropdown].forEach(item => {
      mobileHtml += `<a href="${item.href}" data-en="${item.en}" data-zh="${item.zh}">${item[lang]}</a>`;
    });
    mobileHtml += `<a href="#" class="mobile-resume" onclick="event.preventDefault();window.open('${DATA.profile.resumeUrl}','_blank')">${t.resumeBtn[lang]}</a>`;
    mobileContainer.innerHTML = mobileHtml;
  }
}

/* ===== About ===== */
function renderAbout() {
  const container = document.getElementById('about-content');
  const lang = currentLang;
  const p = DATA.profile;

  container.innerHTML = `
    <div class="about-text">
      <p>${p.about[0][lang]}</p>
      <p>${p.about[1][lang]}</p>
      <p style="font-size:var(--fz-md);color:var(--dark-slate);border-left:2px solid var(--gold);padding-left:16px;margin-top:24px">${p.highlight[lang]}</p>
      <p style="font-size:var(--fz-md);color:var(--gold);border:1px solid rgba(212,162,89,0.2);border-radius:var(--radius);padding:14px 18px;margin-top:20px;background:rgba(212,162,89,0.04);line-height:1.7">${p.seeking[lang]}</p>
      <ul class="tech-grid">
        ${p.skills.map(s => `<li>${s}</li>`).join('')}
      </ul>
    </div>
    <div class="about-image">
      <div class="frame">
        <div class="photo">
          <div class="initials">LH</div>
          <div class="caption">${DATA.i18n.photoPlaceholder[lang]}</div>
        </div>
      </div>
    </div>`;
}

/* ===== Reading ===== */
function renderReading() {
  const container = document.getElementById('reading-list');
  const lang = currentLang;
  const items = DATA.reading;

  container.innerHTML = items.map((item, i) => `
    <a class="reading-item" href="#reading/${i}">
      <div class="reading-num">·</div>
      <div class="reading-content">
        <h3>${item.title[lang]}</h3>
        <div class="meta">${item.meta[lang]}${item.readingTime ? ' · ' + item.readingTime : ''}</div>
        <div class="note">${item.note[lang]}</div>
      </div>
      <div class="reading-tags">${item.tags.map(t => `<span>${t}</span>`).join('')}</div>
    </a>
  `).join('');
}

/* ===== Experience ===== */
function renderExperience() {
  const container = document.getElementById('exp-container');
  const lang = currentLang;
  const exp = DATA.experience;

  let html = `<div class="exp-tabs" style="position:relative;">
    <div class="exp-indicator" id="exp-indicator" style="top:0;"></div>`;

  exp.tabs[lang].forEach((tab, i) => {
    html += `<button class="exp-tab${i === 0 ? ' active' : ''}" onclick="switchExp(${i})">${tab}</button>`;
  });

  html += `</div><div class="exp-panels">`;

  exp.panels.forEach((panel, i) => {
    html += `<div class="exp-panel${i === 0 ? ' active' : ''}" id="exp-${i}">
      <h3>${panel.title[lang]}</h3>
      <p class="date">${panel.date[lang]}</p>
      <ul>${panel.items[lang].map(item => `<li>${item}</li>`).join('')}</ul>`;

    if (panel.sub) {
      html += `<br><h3>${panel.sub.title[lang]}</h3>
        <p class="date">${panel.sub.date[lang]}</p>
        <ul>${panel.sub.items[lang].map(item => `<li>${item}</li>`).join('')}</ul>`;
    }

    html += `</div>`;
  });

  html += `</div>`;
  container.innerHTML = html;
}

/* ===== Honors ===== */
function renderHonors() {
  const container = document.getElementById('honors-grid');
  const lang = currentLang;

  container.innerHTML = DATA.honors.map(h => `
    <div class="honor-card">
      <div class="num" data-count="${h.num}">${h.num}</div>
      <div class="label">${h.label[lang]}</div>
    </div>
  `).join('');

  // 数字动画
  const nums = container.querySelectorAll('.num[data-count]');
  const countObserver = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const target = parseInt(el.getAttribute('data-count'));
      if (isNaN(target)) return;
      let current = 0;
      const duration = 800;
      const step = () => {
        current += Math.ceil(target / (duration / 16));
        if (current >= target) { el.textContent = target; return; }
        el.textContent = current;
        requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
      countObserver.unobserve(el);
    });
  }, { threshold: 0.5 });
  nums.forEach(n => countObserver.observe(n));
}

/* ===== Research ===== */
function renderResearch() {
  const container = document.getElementById('research-grid');
  const lang = currentLang;
  const r = DATA.research;

  document.getElementById('research-heading').textContent = r.heading[lang];
  document.getElementById('research-intro').textContent = r.intro[lang];

  container.innerHTML = r.areas.map(a => `
    <div class="research-card">
      <div class="research-icon">${a.icon}</div>
      <h3>${a.title[lang]}</h3>
      <p>${a.desc[lang]}</p>
    </div>
  `).join('');
}

/* ===== Projects ===== */
function renderProjects() {
  const container = document.getElementById('projects-list');
  const lang = currentLang;

  // 收集所有标签
  const allTags = [...new Set(DATA.projects.flatMap(p => p.tech))];

  let html = '';

  // 筛选条
  if (allTags.length > 1) {
    html += `<div class="filter-bar" role="group" aria-label="${lang === 'zh' ? '项目筛选' : 'Filter projects'}">
      <button class="filter-btn active" onclick="filterProjects('all', this)" aria-pressed="true">${lang === 'zh' ? '全部' : 'All'}</button>`;
    allTags.forEach(tag => {
      html += `<button class="filter-btn" onclick="filterProjects('${tag}', this)" aria-pressed="false">${tag}</button>`;
    });
    html += `</div>`;
  }

  html += `<div id="project-cards">`;

  html += DATA.projects.map((p, i) => `
    <div class="project-card${i % 2 === 1 ? ' right' : ''}" data-tags="${p.tech.join(',')}">
      <div class="project-content">
        <p class="project-overline">${p.overline[lang]}</p>
        <h3 class="project-title">${p.title[lang]}</h3>
        <div class="project-desc">${p.desc[lang]}</div>
        <div class="project-tech">${p.tech.map(t => `<span>${t}</span>`).join('')}</div>
        <div class="project-links">
          <a href="#project/${p.id}" title="${lang === 'zh' ? '详情' : 'Details'}">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
          </a>
        </div>
      </div>
      <div class="project-image">
        <div class="img-placeholder">${p.title[lang]}<div class="overlay"></div></div>
      </div>
    </div>
  `).join('');

  html += `</div>`;
  container.innerHTML = html;
}

function filterProjects(tag, btn) {
  document.querySelectorAll('.filter-btn').forEach(b => { b.classList.remove('active'); b.setAttribute('aria-pressed', 'false'); });
  btn.classList.add('active');
  btn.setAttribute('aria-pressed', 'true');

  document.querySelectorAll('.project-card').forEach(card => {
    if (tag === 'all' || card.getAttribute('data-tags').split(',').includes(tag)) {
      card.classList.remove('filtered-out');
    } else {
      card.classList.add('filtered-out');
    }
  });
}

/* ===== Mini Projects ===== */
function renderMiniProjects() {
  const container = document.getElementById('mini-grid');
  const lang = currentLang;

  container.innerHTML = DATA.miniProjects.map(m => `
    <div class="other-card">
      <div class="icon">${m.icon}</div>
      <h3>${m.title[lang]}</h3>
      <p>${m.desc[lang]}</p>
      <div class="tech">${m.tech}</div>
    </div>
  `).join('');
}

/* ===== Now ===== */
function renderNow() {
  const lang = currentLang;
  document.getElementById('now-intro').textContent = DATA.now.heading[lang];

  const container = document.getElementById('now-grid');
  container.innerHTML = DATA.now.columns.map(col => `
    <div class="now-card">
      <div class="label">${col.label[lang]}</div>
      <ul>${col.items[lang].map(item => `<li>${item}</li>`).join('')}</ul>
    </div>
  `).join('');
}

/* ===== Notebook ===== */
function renderNotebook() {
  const container = document.getElementById('notebook-grid');
  const lang = currentLang;

  container.innerHTML = DATA.notebook.map((n, i) => {
    const dateStr = typeof n.date === 'object' ? n.date[lang] : n.date;
    return `
    <a class="note-card" href="#notebook/${i}" style="text-decoration:none;display:block;">
      <div class="date">${dateStr}</div>
      <h3>${n.title[lang]}</h3>
      <p>${n.desc[lang]}</p>
      <span class="tag">${n.tag}</span>
    </a>`;
  }).join('');
}

/* ===== Creative ===== */
function renderCreative() {
  const container = document.getElementById('creative-grid');
  const lang = currentLang;

  container.innerHTML = DATA.creative.map((c, i) => `
    <div class="creative-card">
      <div class="genre">${c.genre[lang]}</div>
      <h3>${c.title[lang]}</h3>
      <div class="excerpt">${c.excerpt[lang]}</div>
      <a href="#creative/${i}" class="read-more" data-en="Read →" data-zh="阅读 →">${lang === 'zh' ? '阅读 →' : 'Read →'}</a>
    </div>
  `).join('');
}

/* ===== Life ===== */
function renderLife() {
  const container = document.getElementById('life-grid');
  const lang = currentLang;

  container.innerHTML = DATA.life.map(item => `
    <div class="life-item">
      <span class="icon-emblem">${item.icon}</span>
      <div class="label">${item.label[lang]}</div>
    </div>
  `).join('');
}

/* ===== 全部渲染 ===== */
function renderAll() {
  renderNav();
  renderAbout();
  renderReading();
  renderExperience();
  renderHonors();
  renderResearch();
  renderProjects();
  renderMiniProjects();
  renderNow();
  renderNotebook();
  renderCreative();
  renderLife();
  fetchGitHubRepos();
}

/* ===== Scroll Reveal ===== */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('visible');
  });
}, { threshold: 0.08 });

/* ===== Navigation Scroll ===== */
(function() {
  let lastScrollY = 0;
  window.addEventListener('scroll', throttle(() => {
    const nav = document.getElementById('nav');
    if (!nav) return;
    const scrollY = window.scrollY;

    // 滚动缩放
    nav.classList.toggle('scrolled', scrollY > 40);

    // 滚动方向：下滚隐藏，上滚显示
    if (scrollY > 80) {
      nav.classList.toggle('nav-hidden', scrollY > lastScrollY);
    } else {
      nav.classList.remove('nav-hidden');
    }
    lastScrollY = scrollY;

    // Section 高亮
    let current = '';
    document.querySelectorAll('section[id]').forEach(s => {
      if (scrollY >= s.offsetTop - 180) current = s.id;
    });
    document.querySelectorAll('#nav-links > a[href^="#"]').forEach(a => {
      a.style.color = a.getAttribute('href') === '#' + current ? 'var(--gold)' : '';
    });
  }, 100));
})();

/* ===== Experience Tab ===== */
function switchExp(index) {
  const tabs = document.querySelectorAll('.exp-tab');
  const panels = document.querySelectorAll('.exp-panel');
  const indicator = document.getElementById('exp-indicator');
  if (!tabs.length) return;

  tabs.forEach((t, i) => t.classList.toggle('active', i === index));
  panels.forEach((p, i) => p.classList.toggle('active', i === index));

  if (indicator) {
    if (window.innerWidth <= 768) {
      indicator.style.width = tabs[index].offsetWidth + 'px';
      indicator.style.left = tabs[index].offsetLeft + 'px';
    } else {
      indicator.style.top = index * 40 + 'px';
      indicator.style.width = '2px';
      indicator.style.left = '-2px';
    }
  }
}

/* ===== Dropdown ===== */
function toggleDropdown() {
  document.getElementById('dropdown-menu')?.classList.toggle('open');
}
document.addEventListener('click', (e) => {
  const dd = document.getElementById('more-dropdown');
  if (dd && !dd.contains(e.target)) {
    document.getElementById('dropdown-menu')?.classList.remove('open');
  }
});

/* ===== Mobile Menu ===== */
function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  if (!hamburger || !mobileMenu) return;

  function openMenu() {
    hamburger.classList.add('active');
    mobileMenu.classList.add('open');
    document.body.classList.add('menu-open');
    hamburger.setAttribute('aria-expanded', 'true');
    const firstLink = mobileMenu.querySelector('a');
    if (firstLink) setTimeout(() => firstLink.focus(), 100);
  }

  function closeMenu() {
    hamburger.classList.remove('active');
    mobileMenu.classList.remove('open');
    document.body.classList.remove('menu-open');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.focus();
  }

  hamburger.addEventListener('click', () => {
    mobileMenu.classList.contains('open') ? closeMenu() : openMenu();
  });

  // 点击链接关闭
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });

  // Escape 关闭
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('open')) closeMenu();
  });

  // 焦点陷阱
  mobileMenu.addEventListener('keydown', e => {
    if (e.key !== 'Tab') return;
    const focusable = mobileMenu.querySelectorAll('a, button, [tabindex]:not([tabindex="-1"])');
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault(); last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault(); first.focus();
    }
  });
}

/* ===== Hero Staggered Entry ===== */
function heroEntry() {
  const els = document.querySelectorAll('.hero-overline, .hero h1, .hero .sub, .hero p, .hero .cta');
  els.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    setTimeout(() => {
      el.style.transition = 'opacity 0.8s ease, transform 0.8s cubic-bezier(0.22, 1, 0.36, 1)';
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, 100 + i * 120);
  });
}

/* ===== 回到顶部按钮 ===== */
function createBackToTop() {
  const btn = document.createElement('button');
  btn.id = 'back-to-top';
  btn.innerHTML = '↑';
  btn.setAttribute('aria-label', 'Back to top');
  btn.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  document.body.appendChild(btn);

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  });
}

/* ===== 阅读进度条 ===== */
function createProgressBar() {
  const bar = document.createElement('div');
  bar.id = 'reading-progress';
  document.body.appendChild(bar);

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = progress + '%';
  });
}

/* ===== GitHub 仓库展示（含缓存） ===== */
const GITHUB_CACHE_KEY = 'github-repos';
const GITHUB_CACHE_TTL = 3600000; // 1 小时

function getCachedRepos(ignoreTTL) {
  try {
    const raw = localStorage.getItem(GITHUB_CACHE_KEY);
    if (!raw) return null;
    const cached = JSON.parse(raw);
    if (!ignoreTTL && Date.now() - cached.ts > GITHUB_CACHE_TTL) return null;
    return cached.data;
  } catch { return null; }
}

function setCachedRepos(data) {
  try { localStorage.setItem(GITHUB_CACHE_KEY, JSON.stringify({ ts: Date.now(), data })); }
  catch { /* 存储满时静默失败 */ }
}

function renderRepoCards(repos, container) {
  const lang = currentLang;
  if (!Array.isArray(repos) || repos.length === 0) {
    container.innerHTML = '';
    return;
  }
  container.innerHTML = repos.map(repo => `
    <a href="${repo.html_url}" target="_blank" rel="noreferrer" class="repo-card">
      <div class="repo-name">${repo.name}</div>
      <div class="repo-desc">${repo.description || (lang === 'zh' ? '暂无描述' : 'No description')}</div>
      <div class="repo-meta">
        ${repo.language ? `<span>${repo.language}</span>` : ''}
        <span>★ ${repo.stargazers_count}</span>
      </div>
    </a>
  `).join('');
}

let _githubFetching = false;

function fetchGitHubRepos() {
  if (_githubFetching) return;
  const username = DATA.profile.githubUsername;
  const container = document.getElementById('github-repos');
  if (!container || !username) return;

  // 尝试缓存（即使过期也先用着）
  const cached = getCachedRepos();
  if (cached) { renderRepoCards(cached, container); return; }

  const lang = currentLang;
  container.innerHTML = `<p class="repo-loading">${lang === 'zh' ? '加载中...' : 'Loading...'}</p>`;

  _githubFetching = true;
  fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`)
    .then(res => {
      if (!res.ok) throw new Error(`GitHub API ${res.status}`);
      return res.json();
    })
    .then(repos => {
      _githubFetching = false;
      setCachedRepos(repos);
      renderRepoCards(repos, container);
    })
    .catch(() => {
      _githubFetching = false;
      // API 失败时尝试过期缓存
      const stale = getCachedRepos(true);
      if (stale) {
        renderRepoCards(stale, container);
      } else {
        container.innerHTML = `<p class="repo-loading">${lang === 'zh' ? '加载失败' : 'Failed to load'}</p>`;
      }
    });
}

/* ===== SEO 动态更新 ===== */
const SEO_DEFAULTS = {
  title: document.title,
  desc: document.querySelector('meta[name="description"]')?.getAttribute('content') || '',
  ogTitle: document.querySelector('meta[property="og:title"]')?.getAttribute('content') || '',
  ogDesc: document.querySelector('meta[property="og:description"]')?.getAttribute('content') || '',
  twTitle: document.querySelector('meta[name="twitter:title"]')?.getAttribute('content') || '',
  twDesc: document.querySelector('meta[name="twitter:description"]')?.getAttribute('content') || '',
};

function updateSEO(title, description) {
  const siteName = ' · Junhui Li';
  const fullTitle = title ? title + siteName : SEO_DEFAULTS.title;
  const fullDesc = description || SEO_DEFAULTS.desc;

  document.title = fullTitle;
  setMeta('description', fullDesc);
  setMeta('og:title', fullTitle, 'property');
  setMeta('og:description', fullDesc, 'property');
  setMeta('twitter:title', fullTitle);
  setMeta('twitter:description', fullDesc);
}

function setMeta(name, content, attr) {
  const a = attr || 'name';
  let el = document.querySelector(`meta[${a}="${name}"]`);
  if (el) el.setAttribute('content', content);
}

function restoreSEO() {
  document.title = SEO_DEFAULTS.title;
  setMeta('description', SEO_DEFAULTS.desc);
  setMeta('og:title', SEO_DEFAULTS.ogTitle, 'property');
  setMeta('og:description', SEO_DEFAULTS.ogDesc, 'property');
  setMeta('twitter:title', SEO_DEFAULTS.twTitle);
  setMeta('twitter:description', SEO_DEFAULTS.twDesc);
}

/* ===== Loader ===== */
function initLoader() {
  const loader = document.getElementById('loader');
  if (!loader) return;

  if (sessionStorage.getItem('loader-shown')) {
    loader.remove();
    return;
  }

  const hideLoader = () => {
    if (loader.dataset.hidden) return;
    loader.dataset.hidden = '1';
    loader.classList.add('loaded');
    setTimeout(() => { loader.remove(); }, 600);
    sessionStorage.setItem('loader-shown', '1');
  };

  const startTime = Date.now();
  window.addEventListener('load', () => {
    const elapsed = Date.now() - startTime;
    const minShow = 1500;
    if (elapsed >= minShow) {
      hideLoader();
    } else {
      setTimeout(hideLoader, minShow - elapsed);
    }
  });

  // Safety: hide after 5s even if load never fires
  setTimeout(hideLoader, 5000);
}

/* ===== Init ===== */
document.addEventListener('DOMContentLoaded', () => {
  initLoader();
  // setLang 内部调用 renderAll（含 fetchGitHubRepos），只需一次
  if (typeof setLang === 'function') setLang(currentLang);
  initMobileMenu();
  createBackToTop();
  createProgressBar();
  heroEntry();
  document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(el => revealObserver.observe(el));
  // 响应式 Tab 指示器
  window.addEventListener('resize', () => {
    const active = Array.from(document.querySelectorAll('.exp-tab')).findIndex(t => t.classList.contains('active'));
    if (active >= 0) switchExp(active);
  });
});
