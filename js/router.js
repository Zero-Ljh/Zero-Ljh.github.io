/**
 * Hash 路由系统
 * ============
 * 子页面导航，支持项目详情、阅读笔记全文、创作全文、笔记全文。
 *
 * 路由规则：
 *   #about          → 滚动到 About 板块
 *   #reading        → 滚动到 Reading 板块
 *   #reading/0      → 显示第 0 条阅读详情
 *   #project/python-learning → 显示项目详情
 *   #creative/1     → 显示创作全文
 *   #notebook/2     → 显示笔记全文
 *   #home 或 无hash → 主页面
 */

/* ===== 路由处理 ===== */
function handleRoute() {
  const hash = window.location.hash.slice(1); // 去掉 '#'

  // 无 hash 或 #home → 主页面
  if (!hash || hash === 'home') {
    showMainView();
    return;
  }

  // Section 锚点 → 滚动到相应板块
  const sections = ['about', 'reading', 'experience', 'projects', 'other-projects',
    'now', 'notebook', 'creative', 'life', 'contact'];
  if (sections.includes(hash)) {
    showMainView();
    setTimeout(() => {
      document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
    return;
  }

  // #reading/数字 → 阅读详情
  const readingMatch = hash.match(/^reading\/(\d+)$/);
  if (readingMatch) {
    const idx = parseInt(readingMatch[1]);
    showReadingDetail(idx);
    return;
  }

  // #project/xxx → 项目详情
  const projectMatch = hash.match(/^project\/(.+)$/);
  if (projectMatch) {
    showProjectDetail(projectMatch[1]);
    return;
  }

  // #creative/数字 → 创作全文
  const creativeMatch = hash.match(/^creative\/(\d+)$/);
  if (creativeMatch) {
    showCreativeDetail(parseInt(creativeMatch[1]));
    return;
  }

  // #notebook/数字 → 笔记全文
  const notebookMatch = hash.match(/^notebook\/(\d+)$/);
  if (notebookMatch) {
    showNoteDetail(parseInt(notebookMatch[1]));
    return;
  }

  // 未匹配 → 回退主页面
  showMainView();
}

/* ===== 视图切换 ===== */
function showMainView() {
  const main = document.getElementById('main-content');
  const sub = document.getElementById('sub-view');
  if (main) main.classList.remove('hidden');
  if (sub) sub.classList.add('hidden');
  window.scrollTo(0, 0);
}

function showSubView() {
  const main = document.getElementById('main-content');
  const sub = document.getElementById('sub-view');
  if (main) main.classList.add('hidden');
  if (sub) sub.classList.remove('hidden');
  window.scrollTo(0, 0);
}

/* ===== 阅读详情 ===== */
function showReadingDetail(index) {
  const item = DATA.reading[index];
  if (!item) { showMainView(); return; }
  const lang = currentLang;
  const container = document.getElementById('sub-view');
  if (!container) return;

  container.innerHTML = `
    <div class="sub-page" style="padding:120px 44px;max-width:720px;margin:0 auto;">
      <a href="#" onclick="window.location.hash='';return false;" class="back-link">← ${lang === 'zh' ? '返回阅读' : 'Back to Reading'}</a>
      <p class="sub-label">${item.meta[lang]}</p>
      <h1>${item.title[lang]}</h1>
      <div class="sub-body">${item.note[lang]}</div>
      <div class="sub-meta">${item.tags.map(t => `<span>${t}</span>`).join('')}</div>
    </div>`;
  showSubView();
}

/* ===== 项目详情 ===== */
function showProjectDetail(id) {
  const project = DATA.projects.find(p => p.id === id);
  if (!project) { showMainView(); return; }
  const lang = currentLang;
  const container = document.getElementById('sub-view');
  if (!container) return;

  container.innerHTML = `
    <div class="sub-page" style="padding:120px 44px;max-width:720px;margin:0 auto;">
      <a href="#" onclick="window.location.hash='';return false;" class="back-link">← ${lang === 'zh' ? '返回' : 'Back'}</a>
      <p class="sub-label">${project.overline[lang]}</p>
      <h1>${project.title[lang]}</h1>
      <div class="sub-body">${project.desc[lang]}</div>
      <div class="sub-meta">${project.tech.map(t => `<span>${t}</span>`).join('')}</div>
    </div>`;
  showSubView();
}

/* ===== 创作全文 ===== */
function showCreativeDetail(index) {
  const item = DATA.creative[index];
  if (!item) { showMainView(); return; }
  const lang = currentLang;
  const container = document.getElementById('sub-view');
  if (!container) return;

  container.innerHTML = `
    <div class="sub-page" style="padding:120px 44px;max-width:680px;margin:0 auto;">
      <a href="#" onclick="window.location.hash='';return false;" class="back-link">← ${lang === 'zh' ? '返回创作' : 'Back to Creative'}</a>
      <p class="sub-label">${item.genre[lang]}</p>
      <h1 style="font-family:var(--font-serif)">${item.title[lang]}</h1>
      <div class="creative-body">${item.excerpt[lang]}</div>
    </div>`;
  showSubView();
}

/* ===== 笔记全文 ===== */
function showNoteDetail(index) {
  const note = DATA.notebook[index];
  if (!note) { showMainView(); return; }
  const lang = currentLang;
  const container = document.getElementById('sub-view');
  if (!container) return;

  const dateStr = typeof note.date === 'object' ? note.date[lang] : note.date;

  container.innerHTML = `
    <div class="sub-page" style="padding:120px 44px;max-width:680px;margin:0 auto;">
      <a href="#" onclick="window.location.hash='';return false;" class="back-link">← ${lang === 'zh' ? '返回笔记' : 'Back to Notes'}</a>
      <p class="sub-label" style="font-size:10px;color:var(--dark-slate)">${dateStr}</p>
      <h1>${note.title[lang]}</h1>
      <div class="sub-body">${note.desc[lang]}</div>
      <div class="sub-meta"><span>${note.tag}</span></div>
    </div>`;
  showSubView();
}

/* ===== 初始化 ===== */
function initRouter() {
  window.addEventListener('hashchange', handleRoute);
  handleRoute();
}

document.addEventListener('DOMContentLoaded', initRouter);
