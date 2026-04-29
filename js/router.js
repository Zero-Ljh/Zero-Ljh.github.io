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
  if (hash === 'resume') { showResume(); return; }

  showMainView();
}

/* ===== 视图切换 ===== */
function showMainView() {
  const main = document.getElementById('main-content');
  const sub = document.getElementById('sub-view');
  if (!main || !sub) return;

  sub.classList.add('view-hidden');
  main.classList.remove('view-hidden');
  document.body.style.backgroundColor = '';
  window.scrollTo(0, 0);

  // 过渡完成后清理 sub 内容
  setTimeout(() => {
    if (sub.classList.contains('view-hidden')) sub.innerHTML = '';
  }, 500);
  if (typeof restoreSEO === 'function') restoreSEO();
}

function showSubView() {
  const main = document.getElementById('main-content');
  const sub = document.getElementById('sub-view');
  if (!main || !sub) return;

  main.classList.add('view-hidden');
  sub.classList.remove('view-hidden');
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
        <div class="sub-header-actions">
          <button class="sub-share" onclick="copyPageLink(this)" title="${lang === 'zh' ? '复制链接' : 'Copy Link'}">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
            <span>${lang === 'zh' ? '复制链接' : 'Copy'}</span>
          </button>
          <a href="#" onclick="window.location.hash='';return false;" class="sub-back">← ${backLabel}</a>
        </div>
      </div>
      <div class="sub-body-wrap">
        ${contentHTML}
      </div>
    </div>`;
}

/* ===== 导航辅助 ===== */
function subNavHTML(prev, next, lang) {
  let html = '<div class="sub-nav">';
  if (prev) {
    html += `<a href="${prev.href}" class="prev">
      <small>${lang === 'zh' ? '← 上一篇' : '← Previous'}</small>
      ${prev.title[lang]}
    </a>`;
  } else {
    html += '<span></span>';
  }
  if (next) {
    html += `<a href="${next.href}" class="next">
      <small>${lang === 'zh' ? '下一篇 →' : 'Next →'}</small>
      ${next.title[lang]}
    </a>`;
  }
  html += '</div>';
  return html;
}

/* ===== 复制链接 ===== */
function copyPageLink(btn) {
  navigator.clipboard.writeText(window.location.href).then(() => {
    btn.classList.add('copied');
    const span = btn.querySelector('span');
    const lang = currentLang;
    span.textContent = lang === 'zh' ? '已复制!' : 'Copied!';
    setTimeout(() => {
      btn.classList.remove('copied');
      span.textContent = lang === 'zh' ? '复制链接' : 'Copy';
    }, 2000);
  }).catch(() => {});
}

/* ===== 阅读详情 ===== */
function showReadingDetail(index) {
  const item = DATA.reading[index];
  if (!item) { showMainView(); return; }
  const lang = currentLang;
  const container = document.getElementById('sub-view');
  if (!container) return;

  const metaLine = item.meta[lang] + (item.readingTime ? ' · ' + item.readingTime : '');

  let extras = '';

  // 引用块
  extras += `<div class="sub-blockquote">${item.note[lang]}</div>`;

  // 关键要点
  if (item.keyPoints && item.keyPoints.length) {
    extras += `<div class="sub-takeaways">
      <h2>${lang === 'zh' ? '关键要点' : 'Key Takeaways'}</h2>
      <ul>${item.keyPoints.map(kp => `<li>${kp[lang]}</li>`).join('')}</ul>
    </div>`;
  }

  // 来源链接
  if (item.source) {
    const url = typeof item.source === 'object' ? item.source[lang] : item.source;
    const label = item.sourceLabel ? item.sourceLabel[lang] : (lang === 'zh' ? '查看原文' : 'View Source');
    extras += `<a href="${url}" target="_blank" rel="noreferrer" class="sub-source-link">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
      ${label}
    </a>`;
  }

  // 标签
  extras += `<div class="sub-tags">${item.tags.map(t => `<span>${t}</span>`).join('')}</div>`;

  // 相关阅读
  if (item.relatedReading && item.relatedReading.length) {
    const related = item.relatedReading
      .filter(i => i >= 0 && i < DATA.reading.length)
      .map(i => `<a href="#reading/${i}" class="sub-related-item">${DATA.reading[i].title[lang]}</a>`)
      .join('');
    if (related) {
      extras += `<div class="sub-related">
        <h2>${lang === 'zh' ? '相关阅读' : 'Related'}</h2>
        <div class="sub-related-list">${related}</div>
      </div>`;
    }
  }

  const prev = index > 0 ? { href: `#reading/${index - 1}`, title: DATA.reading[index - 1].title } : null;
  const next = index < DATA.reading.length - 1 ? { href: `#reading/${index + 1}`, title: DATA.reading[index + 1].title } : null;

  container.innerHTML = subPageShell(`
    <p class="sub-label">${item.meta[lang]}</p>
    <h1 class="sub-title">${item.title[lang]}</h1>
    <p class="sub-meta-line">${metaLine}</p>
    ${extras}
    ${subNavHTML(prev, next, lang)}
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

  let extras = '';

  // 状态标签
  if (project.status) {
    extras += `<div class="status-badge">${project.status[lang]}</div>`;
  }

  // 截图占位
  if (project.image) {
    extras += `<div class="project-screenshot"><img src="${project.image}" alt="${project.title[lang]}"></div>`;
  } else {
    extras += `<div class="project-screenshot"><div class="img-placeholder">${project.title[lang]} — ${lang === 'zh' ? '截图待加' : 'screenshot placeholder'}</div></div>`;
  }

  // 描述
  extras += `<div class="sub-content"><p>${project.desc[lang]}</p></div>`;

  // 链接
  if (project.links && project.links.length) {
    extras += `<div class="project-links-section">`;
    project.links.forEach(link => {
      extras += `<a href="${link.url}" target="_blank" rel="noreferrer">${link.label[lang]}</a>`;
    });
    extras += `</div>`;
  }

  // 学到了什么
  if (project.learnings && project.learnings[lang].length) {
    extras += `<div class="project-detail-section">
      <h3>${lang === 'zh' ? '学到了什么' : 'What I Learned'}</h3>
      <div class="project-learnings">${project.learnings[lang].map(l => `<span>${l}</span>`).join('')}</div>
    </div>`;
  }

  // 遇到的挑战
  if (project.challenges && project.challenges[lang]) {
    extras += `<div class="project-detail-section">
      <h3>${lang === 'zh' ? '遇到的挑战' : 'Challenges'}</h3>
      <div class="project-challenge">${project.challenges[lang]}</div>
    </div>`;
  }

  // 时间线
  if (project.timeline && project.timeline[lang]) {
    extras += `<div class="project-detail-section">
      <h3>${lang === 'zh' ? '时间线' : 'Timeline'}</h3>
      <p class="project-timeline">${project.timeline[lang]}</p>
    </div>`;
  }

  // 技术栈
  extras += `<div class="sub-tags tech-badges">${project.tech.map(t => `<span>${t}</span>`).join('')}</div>`;

  const idx = DATA.projects.findIndex(p => p.id === id);
  const prevProj = idx > 0 ? { href: `#project/${DATA.projects[idx - 1].id}`, title: DATA.projects[idx - 1].title } : null;
  const nextProj = idx < DATA.projects.length - 1 ? { href: `#project/${DATA.projects[idx + 1].id}`, title: DATA.projects[idx + 1].title } : null;

  container.innerHTML = subPageShell(`
    <p class="sub-label">${project.overline[lang]}</p>
    <h1 class="sub-title">${project.title[lang]}</h1>
    <p class="sub-meta-line">${project.title[lang]}</p>
    ${extras}
    ${subNavHTML(prevProj, nextProj, lang)}
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

  const dateStr = item.date ? (typeof item.date === 'object' ? item.date[lang] : item.date) : '';
  const metaParts = [item.genre[lang]];
  if (dateStr) metaParts.push(dateStr);
  if (item.readingTime) metaParts.push(item.readingTime);
  const metaLine = metaParts.join(' · ');

  const prev = index > 0 ? { href: `#creative/${index - 1}`, title: DATA.creative[index - 1].title } : null;
  const next = index < DATA.creative.length - 1 ? { href: `#creative/${index + 1}`, title: DATA.creative[index + 1].title } : null;

  container.innerHTML = subPageShell(`
    <p class="sub-label">${item.genre[lang]}</p>
    <h1 class="sub-title" style="font-family:var(--font-serif)">${item.title[lang]}</h1>
    <p class="sub-meta-line">${metaLine}</p>
    <div class="artistic-separator">~ ~ ~</div>
    <div class="poetic-body drop-cap">${item.excerpt[lang]}</div>
    <div class="artistic-separator">~ ~ ~</div>
    ${subNavHTML(prev, next, lang)}
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
  const metaLine = dateStr + (note.readingTime ? ' · ' + note.readingTime : '');

  let extras = '';

  // 内容
  extras += `<div class="sub-content"><p>${note.desc[lang]}</p></div>`;

  // 关键概念
  if (note.concepts && note.concepts.length) {
    extras += `<div class="concept-list">
      <h2>${lang === 'zh' ? '关键概念' : 'Key Concepts'}</h2>
      <ul>${note.concepts.map(c => `<li>${c[lang]}</li>`).join('')}</ul>
    </div>`;
  }

  // 标签
  extras += `<div class="sub-tags"><span>${note.tag}</span></div>`;

  const prev = index > 0 ? { href: `#notebook/${index - 1}`, title: DATA.notebook[index - 1].title } : null;
  const next = index < DATA.notebook.length - 1 ? { href: `#notebook/${index + 1}`, title: DATA.notebook[index + 1].title } : null;

  container.innerHTML = subPageShell(`
    <span class="sub-tag-badge">${note.tag}</span>
    <h1 class="sub-title">${note.title[lang]}</h1>
    <p class="sub-meta-line">${metaLine}</p>
    ${extras}
    ${subNavHTML(prev, next, lang)}
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

/* ===== Resume 页面 ===== */
function showResume() {
  const lang = currentLang;
  const container = document.getElementById('sub-view');
  if (!container) return;

  const p = DATA.profile;
  const edu = DATA.education;

  let html = `
    <div class="resume-header">
      <h1 class="sub-title" style="margin-bottom:4px">${p.name[lang]}</h1>
      <p class="resume-degree">${edu.degree[lang]}</p>
      <p class="resume-period">${edu.period[lang]}</p>
    </div>

    <div class="resume-section">
      <h2>${lang === 'zh' ? '教育背景' : 'Education'}</h2>
      <div class="resume-item">
        <h3>${edu.school[lang]}</h3>
        <p class="resume-item-desc">${edu.description[lang]}</p>
        <div class="resume-courses">
          ${edu.courses[lang].map(c => `<span class="resume-tag">${c}</span>`).join('')}
        </div>
      </div>
    </div>

    <div class="resume-section">
      <h2>${lang === 'zh' ? '经历' : 'Experience'}</h2>`;

  DATA.experience.panels.forEach(panel => {
    html += `
      <div class="resume-item">
        <h3>${panel.title[lang]}</h3>
        <p class="resume-date">${panel.date[lang]}</p>
        <ul>
          ${panel.items[lang].map(item => `<li>${item}</li>`).join('')}
        </ul>`;

    if (panel.sub) {
      html += `
        <div class="resume-sub-item">
          <h4>${panel.sub.title[lang]}</h4>
          <p class="resume-date">${panel.sub.date[lang]}</p>
          <ul>
            ${panel.sub.items[lang].map(item => `<li>${item}</li>`).join('')}
          </ul>
        </div>`;
    }

    html += `</div>`;
  });

  html += `
    </div>

    <div class="resume-section">
      <h2>${lang === 'zh' ? '技能' : 'Skills'}</h2>
      <div class="resume-courses">
        ${DATA.profile.skills.map(s => `<span class="resume-tag">${s}</span>`).join('')}
      </div>
    </div>

    <div class="resume-section">
      <h2>${lang === 'zh' ? '荣誉' : 'Honors'}</h2>
      <div class="resume-honors">
        ${DATA.honors.map(h => `
          <div class="resume-honor-item">
            <span class="resume-honor-num">${h.num}</span>
            <span class="resume-honor-label">${h.label[lang]}</span>
          </div>
        `).join('')}
      </div>
    </div>`;

  container.innerHTML = subPageShell(html, lang === 'zh' ? '返回主页' : 'Back to Home');
  showSubView();
  if (typeof updateSEO === 'function') updateSEO(
    lang === 'zh' ? '简历 - 李军辉' : 'Resume - Junhui Li',
    lang === 'zh' ? '李军辉的个人简历' : "Junhui Li's Resume"
  );
}

/* ===== 初始化 ===== */
function initRouter() {
  window.addEventListener('hashchange', handleRoute);
  handleRoute();
}
document.addEventListener('DOMContentLoaded', initRouter);
