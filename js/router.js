/**
 * Hash 路由系统
 * ============
 * 管理子页面视图（项目详情、创作全文、笔记全文）
 * Hash 格式: #project/project-id, #creative/index, #notebook/index
 */

/* ===== 路由表 ===== */
const ROUTES = {
  project: {
    title: 'Project',
    render: (id) => renderProjectDetail(id)
  },
  creative: {
    title: 'Creative',
    render: (id) => renderCreativeDetail(parseInt(id))
  },
  notebook: {
    title: 'Notebook',
    render: (id) => renderNoteDetail(parseInt(id))
  }
};

/* ===== 路由初始化与监听 ===== */
function initRouter() {
  window.addEventListener('hashchange', handleRoute);
  // 初始路由
  if (!window.location.hash || window.location.hash === '#home') {
    showMainView();
  } else {
    handleRoute();
  }
}

function handleRoute() {
  const hash = window.location.hash.slice(1); // 去掉 '#'
  if (!hash || hash === 'home') {
    showMainView();
    return;
  }

  // 解析 section 锚点 (e.g., #about, #reading)
  const isSection = ['about', 'reading', 'experience', 'projects', 'other-projects',
    'now', 'notebook', 'creative', 'life', 'contact'].includes(hash);
  if (isSection) {
    showMainView();
    setTimeout(() => {
      document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
    return;
  }

  // 解析子页面路由
  for (const [route, handler] of Object.entries(ROUTES)) {
    if (hash.startsWith(route + '/')) {
      const id = hash.slice(route.length + 1);
      handler.render(id);
      return;
    }
  }

  // 未匹配 -> 回退主视图
  showMainView();
}

/* ===== 视图切换 ===== */
function showMainView() {
  document.getElementById('main-content')?.classList.remove('hidden');
  document.getElementById('sub-view')?.classList.add('hidden');
  document.body.style.overflow = '';
}

function showSubView() {
  document.getElementById('main-content')?.classList.add('hidden');
  document.getElementById('sub-view')?.classList.remove('hidden');
  document.body.style.overflow = '';
  window.scrollTo(0, 0);
}

/* ===== 子视图渲染 ===== */
function renderProjectDetail(id) {
  const project = DATA.projects.find(p => p.id === id);
  if (!project) { showMainView(); return; }

  const lang = typeof currentLang !== 'undefined' ? currentLang : 'zh';
  const container = document.getElementById('sub-view');
  if (!container) return;

  container.innerHTML = `
    <div class="sub-page" style="padding:120px 44px;max-width:720px;margin:0 auto;">
      <a href="#" onclick="window.location.hash='';return false;" style="font-family:var(--font-mono);font-size:12px;color:var(--gold);display:inline-flex;align-items:center;gap:6px;margin-bottom:32px;">
        ← ${lang === 'zh' ? '返回' : 'Back'}
      </a>
      <p style="font-family:var(--font-mono);font-size:11px;color:var(--gold);margin-bottom:8px;">${project.overline[lang]}</p>
      <h1 style="font-family:var(--font-display);font-size:clamp(28px,4vw,40px);color:var(--warm-white);margin-bottom:20px;">${project.title[lang]}</h1>
      <div style="font-size:var(--fz-lg);line-height:1.8;color:var(--slate);">${project.desc[lang]}</div>
      <div style="display:flex;gap:14px;margin-top:24px;font-family:var(--font-mono);font-size:12px;color:var(--slate);">
        ${project.tech.map(t => `<span style="background:var(--light-navy);padding:4px 12px;border-radius:4px;">${t}</span>`).join('')}
      </div>
    </div>
  `;
  showSubView();
}

function renderCreativeDetail(index) {
  const item = DATA.creative[index];
  if (!item) { showMainView(); return; }

  const lang = typeof currentLang !== 'undefined' ? currentLang : 'zh';
  const container = document.getElementById('sub-view');
  if (!container) return;

  container.innerHTML = `
    <div class="sub-page" style="padding:120px 44px;max-width:680px;margin:0 auto;">
      <a href="#" onclick="window.location.hash='';return false;" style="font-family:var(--font-mono);font-size:12px;color:var(--gold);display:inline-flex;align-items:center;gap:6px;margin-bottom:32px;">
        ← ${lang === 'zh' ? '返回创作' : 'Back to Creative'}
      </a>
      <p style="font-family:var(--font-mono);font-size:11px;color:var(--gold);margin-bottom:8px;">${item.genre[lang]}</p>
      <h1 style="font-family:var(--font-serif);font-size:clamp(26px,3.5vw,36px);color:var(--warm-white);margin-bottom:24px;">${item.title[lang]}</h1>
      <div style="font-family:var(--font-serif);font-size:17px;line-height:2;color:var(--slate);font-style:italic;padding:32px;background:var(--light-navy);border-radius:var(--radius);">
        ${item.excerpt[lang]}
      </div>
    </div>
  `;
  showSubView();
}

function renderNoteDetail(index) {
  const note = DATA.notebook[index];
  if (!note) { showMainView(); return; }

  const lang = typeof currentLang !== 'undefined' ? currentLang : 'zh';
  const container = document.getElementById('sub-view');
  if (!container) return;

  const dateStr = typeof note.date === 'object' ? note.date[lang] : note.date;

  container.innerHTML = `
    <div class="sub-page" style="padding:120px 44px;max-width:680px;margin:0 auto;">
      <a href="#" onclick="window.location.hash='';return false;" style="font-family:var(--font-mono);font-size:12px;color:var(--gold);display:inline-flex;align-items:center;gap:6px;margin-bottom:32px;">
        ← ${lang === 'zh' ? '返回笔记' : 'Back to Notes'}
      </a>
      <p style="font-family:var(--font-mono);font-size:10px;color:var(--dark-slate);margin-bottom:8px;">${dateStr}</p>
      <h1 style="font-family:var(--font-display);font-size:clamp(24px,3vw,32px);color:var(--warm-white);margin-bottom:20px;">${note.title[lang]}</h1>
      <div style="font-size:var(--fz-lg);line-height:1.8;color:var(--slate);">${note.desc[lang]}</div>
      <span style="display:inline-block;font-family:var(--font-mono);font-size:10px;color:var(--gold);background:rgba(212,162,89,0.06);padding:2px 10px;border-radius:10px;margin-top:20px;">${note.tag}</span>
    </div>
  `;
  showSubView();
}

// DOM 就绪后初始化路由
document.addEventListener('DOMContentLoaded', initRouter);
