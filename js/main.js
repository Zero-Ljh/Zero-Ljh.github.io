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
  t.items.forEach((item, i) => {
    const num = String(i + 1).padStart(2, '0');
    desktopHtml += `<a href="${item.href}" data-en="${num}. ${item.en}" data-zh="${num}. ${item.zh}">${num}. ${item[lang]}</a>`;
  });

  desktopHtml += `<a href="#" id="resume-btn" class="resume-btn" data-en="${t.resumeBtn.en}" data-zh="${t.resumeBtn.zh}" onclick="event.preventDefault();window.open('${DATA.profile.resumeUrl}','_blank')">${t.resumeBtn[lang]}</a>
    <div class="dropdown" id="more-dropdown">
    <button class="dropdown-toggle" id="moreBtn" onclick="toggleDropdown()" aria-haspopup="true" aria-expanded="false" data-en="${t.moreBtn.en}" data-zh="${t.moreBtn.zh}">${t.moreBtn[lang]}</button>
    <div class="dropdown-menu" id="dropdown-menu">`;

  t.dropdown.forEach(item => {
    desktopHtml += `<a href="${item.href}" data-en="${item.en}" data-zh="${item.zh}">${item[lang]}</a>`;
  });

  desktopHtml += `</div></div>
    <button class="search-toggle search-toggle-desk" onclick="openSearch()" aria-label="Search" title="Search">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
      </svg>
    </button>
    <div class="lang-toggle">
      <button class="lang-btn${lang === 'zh' ? ' active' : ''}" onclick="setLang('zh')" id="lang-zh">中</button>
      <button class="lang-btn${lang === 'en' ? ' active' : ''}" onclick="setLang('en')" id="lang-en">EN</button>
    </div>`;

  container.innerHTML = desktopHtml;

  // Mobile menu: items with numbers + dropdown without + resume
  if (mobileContainer) {
    let mobileHtml = '';
    t.items.forEach((item, i) => {
      const num = String(i + 1).padStart(2, '0');
      mobileHtml += `<a href="${item.href}" data-en="${num}. ${item.en}" data-zh="${num}. ${item.zh}">${num}. ${item[lang]}</a>`;
    });
    t.dropdown.forEach(item => {
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
      <p style="font-size:var(--fz-sm);color:var(--slate);border-left:2px solid var(--gold);padding-left:16px;margin-top:12px;font-style:italic">${p.mentorNote[lang]}</p>
      <div class="skills-bars">
        ${p.skills.map(s => {
          const name = typeof s === 'string' ? s : s.name;
          const level = typeof s === 'object' ? s.level : 60;
          const label = (typeof s === 'object' && s.label) ? s.label[lang] : '';
          return `
            <div class="skill-item">
              <div class="skill-info">
                <span class="skill-name">${name}</span>
                ${label ? `<span class="skill-label">${label}</span>` : ''}
              </div>
              <div class="skill-bar" style="--target:${level}%">
                <div class="skill-fill"></div>
              </div>
            </div>`;
        }).join('')}
      </div>
    </div>
    <div class="about-image">
      <div class="frame">
        <div class="photo">
          <img src="assets/images/avatar.jpg" alt="${p.name[lang]}" class="about-avatar">
        </div>
      </div>
    </div>`;
}

/* ===== Reading ===== */
function renderReading() {
  const container = document.getElementById('reading-list');
  const lang = currentLang;
  const items = DATA.reading;

  // Section intro
  const intro = document.getElementById('reading-intro');
  if (intro) {
    intro.textContent = lang === 'zh' ? '关注 AI 动态，记录学习思考。' : 'Tracking AI developments and documenting learning.';
  }

  container.innerHTML = items.map((item, i) => {
    const isOngoing = item.readingTime && !item.readingTime.includes('min');
    const dot = isOngoing ? '◆' : '·';
    const activeClass = isOngoing ? ' reading-active' : '';
    return `
    <a class="reading-item${activeClass}" href="#reading/${i}">
      <div class="reading-num">${dot}</div>
      <div class="reading-content">
        <h3>${item.title[lang]}</h3>
        <div class="meta">${item.meta[lang]}${item.readingTime ? ' · ' + item.readingTime : ''}</div>
        <div class="note">${item.note[lang]}</div>
      </div>
      <div class="reading-tags">${item.tags.map(t => `<span onclick="event.stopPropagation();window.location.hash='tag/${encodeURIComponent(t)}'" style="cursor:pointer" title="${lang === 'zh' ? '查看所有以此标签的内容' : 'View all items with this tag'}">${t}</span>`).join('')}</div>
    </a>`;
  }).join('');
}

/* ===== Experience ===== */
function renderExperience() {
  const container = document.getElementById('exp-container');
  const lang = currentLang;

  let html = '<div class="timeline">';
  DATA.experience.panels.forEach((panel) => {
    html += `
      <div class="timeline-item">
        <div class="timeline-date">${panel.date[lang]}</div>
        <div class="timeline-content">
          <h3>${panel.title[lang]}</h3>
          <ul>${panel.items[lang].map(item => `<li>${item}</li>`).join('')}</ul>
        </div>
      </div>`;
    if (panel.sub) {
      html += `
        <div class="timeline-item sub">
          <div class="timeline-date">${panel.sub.date[lang]}</div>
          <div class="timeline-content">
            <h3>${panel.sub.title[lang]}</h3>
            <ul>${panel.sub.items[lang].map(item => `<li>${item}</li>`).join('')}</ul>
          </div>
        </div>`;
    }
  });
  html += '</div>';
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

  // Featured first
  const sorted = [...DATA.projects].sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return 0;
  });

  html += sorted.map((p, i) => {
    const featuredBadge = p.featured
      ? `<div class="featured-badge">${lang === 'zh' ? '⭐ 精选' : '⭐ Featured'}</div>`
      : '';
    return `
    <div class="project-card${i % 2 === 1 ? ' right' : ''}${p.featured ? ' featured' : ''}" data-tags="${p.tech.join(',')}">
      <div class="project-content">
        ${featuredBadge}
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
    </div>`;
  }).join('');

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
var FEATHER_ICONS = {
  'shield': '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
  'book-open': '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>',
  'cpu': '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/></svg>',
  'heart': '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>'
};

function renderLife() {
  const container = document.getElementById('life-grid');
  const lang = currentLang;

  container.innerHTML = DATA.life.map(item => `
    <div class="life-item">
      <span class="life-icon">${FEATHER_ICONS[item.icon] || item.icon}</span>
      <div class="label">${item.label[lang]}</div>
      ${item.desc ? '<div class="desc">' + item.desc[lang] + '</div>' : ''}
    </div>
  `).join('');
}

/* ===== Toolbox ===== */
function renderToolbox() {
  const container = document.getElementById('toolbox-grid');
  if (!container) return;
  const lang = currentLang;
  const tb = DATA.toolbox;

  container.innerHTML = tb.categories.map(cat => `
    <div class="toolbox-category">
      <h3>${cat.label[lang]}</h3>
      <div class="toolbox-items">
        ${cat.items.map(item => `
          <div class="toolbox-item">
            <span class="tool-name">${item.name}</span>
            <span class="tool-desc">${item.desc[lang]}</span>
          </div>
        `).join('')}
      </div>
    </div>
  `).join('');
}

/* ===== 快速概览 Stats ===== */
function renderStats() {
  const container = document.getElementById('stats-grid');
  const lang = currentLang;
  if (!container || !DATA.stats) return;

  container.innerHTML = DATA.stats.map(s => `
    <div class="stat-card">
      <div class="stat-number" data-target="${s.number}">0</div>
      <div class="stat-label">${s.label[lang]}</div>
    </div>
  `).join('');

  // 数字动画
  const nums = container.querySelectorAll('.stat-number[data-target]');
  const countObserver = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const target = parseInt(el.getAttribute('data-target'));
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

/* ===== 全部渲染 ===== */
function renderAll() {
  var content = document.getElementById('main-content');
  if (content) {
    content.style.opacity = '0';
    content.style.transition = 'opacity 0.2s ease';
  }

  renderNav();
  renderAbout();
  renderReading();
  renderExperience();
  renderProjects();
  renderNow();

  setTimeout(function() {
    document.querySelectorAll('.skill-bar').forEach(function(bar) { bar.classList.add('visible'); });
    if (content) { content.style.opacity = '1'; }
  }, 100);
}

/* ===== 学习里程碑 ===== */
function renderMilestones() {
  const container = document.getElementById('milestones-container');
  const intro = document.getElementById('milestones-intro');
  const lang = currentLang;
  const m = DATA.learningMilestones;

  if (!container || !m || !m.milestones) return;

  if (intro) intro.textContent = m.intro[lang];

  container.innerHTML = m.milestones.map(ms => `
    <div class="milestone-item reveal">
      <div class="milestone-icon">${ms.icon}</div>
      <div class="milestone-content">
        <div class="milestone-date">${ms.date}</div>
        <h3>${ms.title[lang]}</h3>
        <p>${ms.desc[lang]}</p>
      </div>
    </div>
  `).join('');

  // Register dynamic reveal elements
  requestAnimationFrame(() => {
    container.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
  });
}

/* ===== Scroll Reveal ===== */
const revealObserver = new IntersectionObserver(function(entries) {
  entries.forEach(function(e) {
    e.target.classList.toggle('visible', e.isIntersecting);
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

/* ===== Dropdown ===== */
function toggleDropdown() {
  const menu = document.getElementById('dropdown-menu');
  const btn = document.getElementById('moreBtn');
  if (!menu) return;
  const isOpen = menu.classList.toggle('open');
  if (btn) btn.setAttribute('aria-expanded', isOpen);
  if (isOpen) {
    const firstLink = menu.querySelector('a');
    if (firstLink) setTimeout(function() { firstLink.focus(); }, 100);
  }
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
  const els = document.querySelectorAll('.hero .container > *');
  els.forEach((el, i) => {
    el.style.animationDelay = `${i * 120}ms`;
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

/* ===== 搜索功能 ===== */
function openSearch() {
  const overlay = document.getElementById('search-overlay');
  if (!overlay) return;
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
  const input = document.getElementById('search-input');
  if (input) setTimeout(function(){ input.focus(); }, 100);
}

function closeSearch() {
  const overlay = document.getElementById('search-overlay');
  if (!overlay) return;
  overlay.classList.remove('open');
  document.body.style.overflow = '';
  var lang = typeof currentLang !== 'undefined' ? currentLang : 'zh';
  document.getElementById('search-results').innerHTML =
    '<p class="search-hint" data-zh="输入关键词开始搜索" data-en="Type to search">' +
    (lang === 'zh' ? '输入关键词开始搜索' : 'Type to search') + '</p>';
  var input = document.getElementById('search-input');
  if (input) input.value = '';
}

function searchSite(query) {
  var q = query.trim().toLowerCase();
  if (!q) return [];
  var results = [];
  var lang = typeof currentLang !== 'undefined' ? currentLang : 'zh';

  function matches() {
    for (var i = 0; i < arguments.length; i++) {
      if (arguments[i] && String(arguments[i]).toLowerCase().indexOf(q) !== -1) return true;
    }
    return false;
  }

  function addResult(type, title, excerpt, href) {
    for (var i = 0; i < results.length; i++) {
      if (results[i].href === href && results[i].type === type) return;
    }
    results.push({ type: type, title: title, excerpt: excerpt, href: href });
  }

  function stripHTML(html) {
    if (!html) return '';
    var div = document.createElement('div');
    div.innerHTML = html;
    return div.textContent || div.innerText || '';
  }

  // 1. Reading
  if (DATA.reading) {
    for (var i = 0; i < DATA.reading.length; i++) {
      var item = DATA.reading[i];
      if (matches(item.title.zh, item.title.en, item.meta.zh, item.meta.en, item.note.zh, item.note.en)) {
        addResult('reading', item.title[lang], stripHTML(item.note[lang]), '#reading/' + i);
      }
    }
  }

  // 2. Projects
  if (DATA.projects) {
    for (var i = 0; i < DATA.projects.length; i++) {
      var item = DATA.projects[i];
      if (matches(item.title.zh, item.title.en, item.desc.zh, item.desc.en)) {
        addResult('project', item.title[lang], stripHTML(item.desc[lang]), '#project/' + item.id);
      }
    }
  }

  // 3. Mini Projects
  if (DATA.miniProjects) {
    for (var i = 0; i < DATA.miniProjects.length; i++) {
      var item = DATA.miniProjects[i];
      if (matches(item.title.zh, item.title.en, item.desc.zh, item.desc.en)) {
        addResult('mini-project', item.title[lang], stripHTML(item.desc[lang]), '#other-projects');
      }
    }
  }

  // 4. Notebook
  if (DATA.notebook) {
    for (var i = 0; i < DATA.notebook.length; i++) {
      var item = DATA.notebook[i];
      if (matches(item.title.zh, item.title.en, item.desc.zh, item.desc.en)) {
        addResult('note', item.title[lang], stripHTML(item.desc[lang]), '#notebook/' + i);
      }
    }
  }

  // 5. Creative
  if (DATA.creative) {
    for (var i = 0; i < DATA.creative.length; i++) {
      var item = DATA.creative[i];
      if (matches(item.title.zh, item.title.en, item.excerpt.zh, item.excerpt.en)) {
        addResult('creative', item.title[lang], stripHTML(item.excerpt[lang]), '#creative/' + i);
      }
    }
  }

  // 6. Research areas
  if (DATA.research && DATA.research.areas) {
    for (var i = 0; i < DATA.research.areas.length; i++) {
      var item = DATA.research.areas[i];
      if (matches(item.title.zh, item.title.en, item.desc.zh, item.desc.en)) {
        addResult('research', item.title[lang], stripHTML(item.desc[lang]), '#research');
      }
    }
  }

  // 7. Toolbox items
  if (DATA.toolbox && DATA.toolbox.categories) {
    for (var c = 0; c < DATA.toolbox.categories.length; c++) {
      var cat = DATA.toolbox.categories[c];
      if (cat.items) {
        for (var j = 0; j < cat.items.length; j++) {
          var item = cat.items[j];
          if (matches(item.name, item.desc.zh, item.desc.en)) {
            addResult('tool', item.name, stripHTML(item.desc[lang]), '#toolbox');
          }
        }
      }
    }
  }

  return results;
}

function searchTypeLabel(type, lang) {
  var map = {
    'reading': { zh: '阅读', en: 'Reading' },
    'project': { zh: '项目', en: 'Project' },
    'mini-project': { zh: '小项目', en: 'Mini' },
    'note': { zh: '笔记', en: 'Note' },
    'creative': { zh: '创作', en: 'Creative' },
    'research': { zh: '研究', en: 'Research' },
    'tool': { zh: '工具', en: 'Tool' }
  };
  return map[type] ? map[type][lang] : type;
}

function highlightText(text, query) {
  if (!text || !query) return text || '';
  var idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return text;
  var before = text.slice(0, idx);
  var match = text.slice(idx, idx + query.length);
  var after = text.slice(idx + query.length);
  return before + '<mark>' + match + '</mark>' + after;
}

function renderSearchResults(query) {
  var container = document.getElementById('search-results');
  var results = searchSite(query);
  var lang = typeof currentLang !== 'undefined' ? currentLang : 'zh';

  if (results.length === 0) {
    container.innerHTML = '<p class="search-empty" data-zh="未找到相关结果" data-en="No results found">' +
      (lang === 'zh' ? '未找到相关结果' : 'No results found') + '</p>';
    return;
  }

  var html = '';
  for (var i = 0; i < results.length; i++) {
    var r = results[i];
    var excerpt = r.excerpt ? highlightText(r.excerpt.length > 80 ? r.excerpt.slice(0, 80) + '…' : r.excerpt, query) : '';
    html += '<a class="search-result-item" href="' + r.href + '" onclick="closeSearch()">' +
      '<span class="search-result-type">' + searchTypeLabel(r.type, lang) + '</span>' +
      '<span class="search-result-title">' + highlightText(r.title, query) + '</span>';
    if (excerpt) {
      html += '<span class="search-result-excerpt">' + excerpt + '</span>';
    }
    html += '</a>';
  }
  container.innerHTML = html;
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
  // 等待 CMS 数据就绪后再渲染（data.js 作为回退）
  Promise.resolve(window.__dataPromise).then(function() {
    if (typeof setLang === 'function') setLang(currentLang);
    initMobileMenu();
    createBackToTop();
    createProgressBar();
    heroEntry();
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(function(el) { revealObserver.observe(el); });
  });

  // 搜索：键盘快捷键（Ctrl+K 或 /）
  document.addEventListener('keydown', function(e) {
    if ((e.ctrlKey || e.metaKey) && (e.key === 'k' || e.key === 'K')) {
      e.preventDefault();
      openSearch();
    }
    const overlay = document.getElementById('search-overlay');
    if (e.key === 'Escape' && overlay && overlay.classList.contains('open')) {
      closeSearch();
    }
  });

  // 搜索：/ 键打开（不在输入框中时）
  document.addEventListener('keydown', function(e) {
    if (e.key === '/' && document.getElementById('search-overlay') && !document.getElementById('search-overlay').classList.contains('open')) {
      var tag = e.target.tagName;
      if (tag !== 'INPUT' && tag !== 'TEXTAREA' && !e.target.isContentEditable) {
        e.preventDefault();
        openSearch();
      }
    }
  });

  // 搜索：防抖输入
  var searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('input', debounce(function() {
      var q = this.value.trim();
      if (q.length >= 1) {
        renderSearchResults(q);
      } else {
        var lang = typeof currentLang !== 'undefined' ? currentLang : 'zh';
        document.getElementById('search-results').innerHTML =
          '<p class="search-hint" data-zh="输入关键词开始搜索" data-en="Type to search">' +
          (lang === 'zh' ? '输入关键词开始搜索' : 'Type to search') + '</p>';
      }
    }, 200));
  }
});
