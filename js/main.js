/**
 * 渲染引擎
 * ========
 * 从 DATA 读取内容，渲染到 HTML 容器中。
 * 用户只需编辑 data.js 即可更新所有内容。
 */

/* ===== 导航栏 ===== */
function renderNav() {
  const container = document.getElementById('nav-links');
  const lang = typeof currentLang !== 'undefined' ? currentLang : 'zh';
  const t = DATA.i18n.nav;

  let html = '';
  t.items.forEach(item => {
    html += `<a href="${item.href}" data-en="${item.en}" data-zh="${item.zh}">${item[lang].toUpperCase()}</a>`;
  });

  html += `<div class="dropdown" id="more-dropdown">
    <button class="dropdown-toggle" id="moreBtn" onclick="toggleDropdown()" data-en="${t.moreBtn.en}" data-zh="${t.moreBtn.zh}">${t.moreBtn[lang]}</button>
    <div class="dropdown-menu" id="dropdown-menu">`;

  t.dropdown.forEach(item => {
    html += `<a href="${item.href}" data-en="${item.en}" data-zh="${item.zh}">${item[lang]}</a>`;
  });

  html += `</div></div>
    <div class="lang-toggle">
      <button class="lang-btn active" onclick="setLang('zh')" id="lang-zh">中</button>
      <button class="lang-btn" onclick="setLang('en')" id="lang-en">EN</button>
    </div>`;

  container.innerHTML = html;
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
    <a class="reading-item" href="#reading/${i}" style="text-decoration:none;display:grid;grid-template-columns:36px 1fr auto;gap:16px;padding:24px 28px;background:var(--light-navy);border-radius:var(--radius);align-items:flex-start;transition:var(--transition);border-left:1px solid transparent;cursor:pointer">
      <div class="reading-num">·</div>
      <div class="reading-content">
        <h3>${item.title[lang]}</h3>
        <div class="meta">${item.meta[lang]}</div>
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
      <div class="num">${h.num}</div>
      <div class="label">${h.label[lang]}</div>
    </div>
  `).join('');
}

/* ===== Projects ===== */
function renderProjects() {
  const container = document.getElementById('projects-list');
  const lang = currentLang;

  container.innerHTML = DATA.projects.map((p, i) => `
    <div class="project-card${i % 2 === 1 ? ' right' : ''}">
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
  renderProjects();
  renderMiniProjects();
  renderNow();
  renderNotebook();
  renderCreative();
  renderLife();
}

/* ===== Scroll Reveal ===== */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('visible');
  });
}, { threshold: 0.08 });

/* ===== Navigation Scroll ===== */
window.addEventListener('scroll', () => {
  const nav = document.getElementById('nav');
  if (nav) nav.classList.toggle('scrolled', window.scrollY > 40);

  // Section 高亮
  let current = '';
  document.querySelectorAll('section[id]').forEach(s => {
    if (window.scrollY >= s.offsetTop - 180) current = s.id;
  });
  document.querySelectorAll('#nav-links > a[href^="#"]').forEach(a => {
    a.style.color = a.getAttribute('href') === '#' + current ? 'var(--gold)' : '';
  });
});

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

/* ===== Init ===== */
document.addEventListener('DOMContentLoaded', () => {
  renderAll();
  heroEntry();
  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
  // 响应式 Tab 指示器
  window.addEventListener('resize', () => {
    const active = Array.from(document.querySelectorAll('.exp-tab')).findIndex(t => t.classList.contains('active'));
    if (active >= 0) switchExp(active);
  });
});
