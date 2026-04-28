/**
 * Hash 路由系统
 * ============
 * 子页面导航 — 与主页面不同的文章阅读风格。
 *
 * 路由规则：
 *   #about          → 滚动到 About 板块
 *   #reading/0      → 显示阅读详情
 *   #project/xxx    → 项目详情
 *   #creative/1     → 创作全文
 *   #notebook/2     → 笔记全文
 *   #home 或 无hash → 主页面
 */

function handleRoute() {
  const hash = window.location.hash.slice(1);
  if (!hash || hash === 'home') { showMainView(); return; }

  // Section 锚点
  const sections = ['about','reading','experience','projects','other-projects',
    'now','notebook','creative','life','contact'];
  if (sections.includes(hash)) {
    showMainView();
    setTimeout(() => document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' }), 100);
    return;
  }

  const m1 = hash.match(/^reading\/(\d+)$/);
  if (m1) { showReadingDetail(parseInt(m1[1])); return; }

  const m2 = hash.match(/^project\/(.+)$/);
  if (m2) { showProjectDetail(m2[1]); return; }

  const m3 = hash.match(/^creative\/(\d+)$/);
  if (m3) { showCreativeDetail(parseInt(m3[1])); return; }

  const m4 = hash.match(/^notebook\/(\d+)$/);
  if (m4) { showNoteDetail(parseInt(m4[1])); return; }

  if (hash === 'archive') { showArchive(); return; }

  showMainView();
}

/* ===== 视图切换 ===== */
function showMainView() {
  document.getElementById('main-content')?.classList.remove('hidden');
  document.getElementById('sub-view')?.classList.add('hidden');
  document.body.style.backgroundColor = '';
  window.scrollTo(0, 0);
  if (typeof restoreSEO === 'function') restoreSEO();
}

function showSubView() {
  document.getElementById('main-content')?.classList.add('hidden');
  document.getElementById('sub-view')?.classList.remove('hidden');
  document.body.style.backgroundColor = '#f6f3ef';
  window.scrollTo(0, 0);
}

/* ===== 子页面骨架 ===== */
function subPageShell(contentHTML, backLabel) {
  const lang = currentLang;
  const logo = DATA.i18n.nav.logo[lang];
  return `
    <div class="sub-page">
      <div class="sub-header">
        <a href="#" class="site-name">${logo}</a>
        <a href="#" onclick="window.location.hash='';return false;" class="sub-back">← ${backLabel}</a>
      </div>
      <div class="sub-body-wrap">
        ${contentHTML}
      </div>
    </div>`;
}

/* ===== 阅读详情 ===== */
function showReadingDetail(index) {
  const item = DATA.reading[index];
  if (!item) { showMainView(); return; }
  const lang = currentLang;
  const container = document.getElementById('sub-view');
  if (!container) return;

  container.innerHTML = subPageShell(`
    <p class="sub-label">${item.meta[lang]}</p>
    <h1 class="sub-title">${item.title[lang]}</h1>
    <p class="sub-meta-line">${item.meta[lang]}</p>
    <div class="sub-content"><p>${item.note[lang]}</p></div>
    <div class="sub-tags">${item.tags.map(t => `<span>${t}</span>`).join('')}</div>
  `, lang === 'zh' ? '返回阅读' : 'Back to Reading');
  showSubView();
  if (typeof updateSEO === 'function') updateSEO(item.title[lang], item.meta[lang]);
}

/* ===== 项目详情 ===== */
function showProjectDetail(id) {
  const project = DATA.projects.find(p => p.id === id);
  if (!project) { showMainView(); return; }
  const lang = currentLang;
  const container = document.getElementById('sub-view');
  if (!container) return;

  container.innerHTML = subPageShell(`
    <p class="sub-label">${project.overline[lang]}</p>
    <h1 class="sub-title">${project.title[lang]}</h1>
    <p class="sub-meta-line">${project.title[lang]}</p>
    <div class="sub-content"><p>${project.desc[lang]}</p></div>
    <div class="sub-tags">${project.tech.map(t => `<span>${t}</span>`).join('')}</div>
  `, lang === 'zh' ? '返回' : 'Back');
  showSubView();
  if (typeof updateSEO === 'function') updateSEO(project.title[lang], project.desc[lang]);
}

/* ===== 创作全文 ===== */
function showCreativeDetail(index) {
  const item = DATA.creative[index];
  if (!item) { showMainView(); return; }
  const lang = currentLang;
  const container = document.getElementById('sub-view');
  if (!container) return;

  container.innerHTML = subPageShell(`
    <p class="sub-label">${item.genre[lang]}</p>
    <h1 class="sub-title" style="font-family:var(--font-serif)">${item.title[lang]}</h1>
    <p class="sub-meta-line">${item.genre[lang]}</p>
    <div class="creative-body">${item.excerpt[lang]}</div>
  `, lang === 'zh' ? '返回创作' : 'Back to Creative');
  showSubView();
  if (typeof updateSEO === 'function') updateSEO(item.title[lang], item.excerpt[lang].replace(/<[^>]*>/g, ''));
}

/* ===== 笔记全文 ===== */
function showNoteDetail(index) {
  const note = DATA.notebook[index];
  if (!note) { showMainView(); return; }
  const lang = currentLang;
  const container = document.getElementById('sub-view');
  if (!container) return;

  const dateStr = typeof note.date === 'object' ? note.date[lang] : note.date;

  container.innerHTML = subPageShell(`
    <p class="sub-label">${note.tag}</p>
    <h1 class="sub-title">${note.title[lang]}</h1>
    <p class="sub-meta-line">${dateStr}</p>
    <div class="sub-content"><p>${note.desc[lang]}</p></div>
    <div class="sub-tags"><span>${note.tag}</span></div>
  `, lang === 'zh' ? '返回笔记' : 'Back to Notes');
  showSubView();
  if (typeof updateSEO === 'function') updateSEO(note.title[lang], note.desc[lang]);
}

/* ===== 归档页 ===== */
function showArchive() {
  const lang = currentLang;
  const container = document.getElementById('sub-view');
  if (!container) return;

  const total = DATA.projects.length + DATA.miniProjects.length;
  const countLabel = lang === 'zh' ? total + ' 个项目' : total + ' projects';

  const projectItems = DATA.projects.map(p => `
    <div class="archive-item">
      <div class="archive-year">${p.overline[lang]}</div>
      <div class="archive-info">
        <h3><a href="#project/${p.id}">${p.title[lang]}</a></h3>
        <p>${p.desc[lang]}</p>
        <div class="archive-tech">${p.tech.map(t => `<span>${t}</span>`).join('')}</div>
      </div>
    </div>
  `).join('');

  const miniItems = DATA.miniProjects.map(m => `
    <div class="archive-item mini">
      <div class="archive-year">${m.icon}</div>
      <div class="archive-info">
        <h3>${m.title[lang]}</h3>
        <p>${m.desc[lang]}</p>
        <div class="archive-tech">${m.tech}</div>
      </div>
    </div>
  `).join('');

  container.innerHTML = subPageShell(`
    <p class="sub-label" style="margin-bottom:4px">${lang === 'zh' ? '归档' : 'Archive'}</p>
    <h1 class="sub-title" style="margin-bottom:4px">${lang === 'zh' ? '全部项目' : 'All Projects'}</h1>
    <p class="sub-meta-line" style="margin-bottom:48px">${countLabel}</p>
    <div class="archive-list">
      ${projectItems}
      ${DATA.miniProjects.length ? '<h2 class="archive-section-title">' + (lang === 'zh' ? '小项目' : 'Mini Projects') + '</h2>' + miniItems : ''}
    </div>
  `, lang === 'zh' ? '返回' : 'Back');
  showSubView();
  if (typeof updateSEO === 'function') updateSEO(
    lang === 'zh' ? '全部项目' : 'All Projects',
    lang === 'zh' ? '李军辉的项目归档' : "Junhui Li's project archive"
  );
}

/* ===== 初始化 ===== */
function initRouter() {
  window.addEventListener('hashchange', handleRoute);
  handleRoute();
}
document.addEventListener('DOMContentLoaded', initRouter);
