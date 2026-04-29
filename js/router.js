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
  const sections = ['about','stats','milestones','reading','experience','projects','other-projects',
    'now','notebook','creative','life','contact','research','toolbox'];
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
  if (hash === 'blog') { showBlogIndex(); return; }
  if (hash === 'resume') { showResume(); return; }
  if (hash === 'resources') { showResources(); return; }
  if (hash === 'tags') { showTags(); return; }

  const m5 = hash.match(/^tag\/(.+)$/);
  if (m5) { showTagItems(decodeURIComponent(m5[1])); return; }

  showMainView();
}

/* ===== 视图切换 ===== */
function showMainView() {
  const main = document.getElementById('main-content');
  const sub = document.getElementById('sub-view');
  const nav = document.getElementById('nav');
  if (!main || !sub) return;

  sub.classList.add('view-hidden');
  main.classList.remove('view-hidden');
  document.body.style.backgroundColor = '';
  window.scrollTo(0, 0);

  // 主页显示导航栏
  if (nav) nav.style.display = '';

  // 恢复侧边栏和邮箱
  const sidebar = document.querySelector('.sidebar');
  const emailSide = document.querySelector('.email-side');
  if (sidebar) sidebar.style.display = '';
  if (emailSide) emailSide.style.display = '';

  // 过渡完成后清理 sub 内容
  setTimeout(() => {
    if (sub.classList.contains('view-hidden')) sub.innerHTML = '';
  }, 500);
  if (typeof restoreSEO === 'function') restoreSEO();
}

function showSubView() {
  const main = document.getElementById('main-content');
  const sub = document.getElementById('sub-view');
  const nav = document.getElementById('nav');
  if (!main || !sub) return;

  main.classList.add('view-hidden');
  sub.classList.remove('view-hidden');
  document.body.style.backgroundColor = '#f6f3ef';
  window.scrollTo(0, 0);

  // 子页面隐藏导航栏，纯阅读模式
  if (nav) nav.style.display = 'none';

  // 隐藏侧边栏和邮箱，减少阅读干扰
  const sidebar = document.querySelector('.sidebar');
  const emailSide = document.querySelector('.email-side');
  if (sidebar) sidebar.style.display = 'none';
  if (emailSide) emailSide.style.display = 'none';
}

/* ===== 子页面骨架 ===== */
function subPageShell(contentHTML, backLabel, backHash) {
  const lang = currentLang;
  const hashAction = backHash ? `window.location.hash='${backHash}';return false;` : `window.location.hash='';return false;`;
  return `
    <div class="sub-page">
      <div class="sub-body-wrap">
        <div class="sub-top-bar">
          <a href="#" onclick="${hashAction}" class="sub-back">← ${backLabel}</a>
          <button class="sub-share" onclick="copyPageLink(this)" title="${lang === 'zh' ? '复制链接' : 'Copy Link'}">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
            <span>${lang === 'zh' ? '复制链接' : 'Copy'}</span>
          </button>
        </div>
        ${contentHTML}
        <div class="sub-back-top">
          <a href="#" onclick="window.scrollTo({top:0,behavior:'smooth'});return false;">↑ ${lang === 'zh' ? '回到顶部' : 'Back to top'}</a>
        </div>
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

/* ===== 正文渲染 ===== */
function renderBody(body, lang) {
  if (!body || !body.length) return '';
  function esc(str) {
    return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }
  return body.map(function(section) {
    switch (section.type) {
      case 'p': return '<p>' + section.content[lang] + '</p>';
      case 'h2': return '<h2>' + section.content[lang] + '</h2>';
      case 'h3': return '<h3>' + section.content[lang] + '</h3>';
      case 'code':
        var langAttr = section.lang ? ' data-lang="' + esc(section.lang) + '"' : '';
        return '<div class="code-block"' + langAttr + '><pre><code>' + esc(section.content[lang]) + '</code></pre></div>';
      case 'ul':
        return '<ul>' + section.items.map(function(i) { return '<li>' + i[lang] + '</li>'; }).join('') + '</ul>';
      case 'ol':
        return '<ol>' + section.items.map(function(i) { return '<li>' + i[lang] + '</li>'; }).join('') + '</ol>';
      case 'blockquote': return '<blockquote>' + section.content[lang] + '</blockquote>';
      case 'hr': return '<hr>';
      default: return '';
    }
  }).join('');
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

  // 正文（优先 body 字段，回退到 note 块引用）
  var bodyHtml = renderBody(item.body, lang);
  if (bodyHtml) {
    // 有正文时: note 作为引用块放在正文前
    extras += `<div class="sub-blockquote">${item.note[lang]}</div>`;
    extras += '<div class="sub-content">' + bodyHtml + '</div>';
  } else {
    // 无正文时: 只显示 note 块引用（原有行为）
    extras += `<div class="sub-blockquote">${item.note[lang]}</div>`;
  }

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
  extras += `<div class="sub-tags">${item.tags.map(t => `<span onclick="window.location.hash='tag/${encodeURIComponent(t)}'" style="cursor:pointer" title="${lang === 'zh' ? '查看相关' : 'View related'}">${t}</span>`).join('')}</div>`;

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

  // 截图（增强占位）
  if (project.image) {
    extras += `<div class="project-screenshot"><img src="${project.image}" alt="${project.title[lang]}"></div>`;
  } else {
    extras += `<div class="project-screenshot"><div class="img-placeholder">
      <div class="placeholder-geo"></div>
      <div class="placeholder-content">
        <span class="placeholder-title">${project.title[lang]}</span>
        <span class="placeholder-sub">${lang === 'zh' ? '项目截图' : 'Project Screenshot'}</span>
      </div>
    </div></div>`;
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

  // 项目信息栏
  let infoParts = [];
  infoParts.push(`<span><span class="info-label">${lang === 'zh' ? '状态' : 'Status'}</span> ${project.status ? project.status[lang] : project.overline[lang]}</span>`);
  if (project.period) infoParts.push(`<span><span class="info-label">${lang === 'zh' ? '时间' : 'Period'}</span> ${project.period[lang]}</span>`);
  if (project.role) infoParts.push(`<span><span class="info-label">${lang === 'zh' ? '角色' : 'Role'}</span> ${project.role[lang]}</span>`);
  const infoBarHTML = `<div class="project-info-bar">${infoParts.join('<span class="info-sep">|</span>')}</div>`;

  // 相关项目（相同 tech 标签）
  const relatedProjects = DATA.projects.filter(p => p.id !== id && p.tech.some(t => project.tech.includes(t)));
  let relatedHTML = '';
  if (relatedProjects.length > 0) {
    relatedHTML = `<div class="project-related">
      <h3>${lang === 'zh' ? '相关项目' : 'Related Projects'}</h3>
      <div class="related-list">
        ${relatedProjects.map(p => `
          <a href="#project/${p.id}" class="related-card">
            <span class="related-card-title">${p.title[lang]}</span>
            <span class="related-card-tech">${p.tech.slice(0,3).join(' · ')}</span>
          </a>
        `).join('')}
      </div>
    </div>`;
  }

  const idx = DATA.projects.findIndex(p => p.id === id);
  const prevProj = idx > 0 ? { href: `#project/${DATA.projects[idx - 1].id}`, title: DATA.projects[idx - 1].title } : null;
  const nextProj = idx < DATA.projects.length - 1 ? { href: `#project/${DATA.projects[idx + 1].id}`, title: DATA.projects[idx + 1].title } : null;

  container.innerHTML = subPageShell(`
    <p class="sub-label">${project.overline[lang]}</p>
    <h1 class="sub-title">${project.title[lang]}</h1>
    ${infoBarHTML}
    ${extras}
    ${relatedHTML}
    ${subNavHTML(prevProj, nextProj, lang)}
  `, lang === 'zh' ? '返回项目' : 'Back to Projects', 'projects');
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

  // 正文（优先 body 字段）
  var bodyHtml = renderBody(note.body, lang);
  if (bodyHtml) {
    extras += '<div class="sub-content">' + bodyHtml + '</div>';
  } else {
    extras += `<div class="sub-content"><p>${note.desc[lang]}</p></div>`;
  }

  // 关键概念
  if (note.concepts && note.concepts.length) {
    extras += `<div class="concept-list">
      <h2>${lang === 'zh' ? '关键概念' : 'Key Concepts'}</h2>
      <ul>${note.concepts.map(c => `<li>${c[lang]}</li>`).join('')}</ul>
    </div>`;
  }

  // 标签
  extras += `<div class="sub-tags"><span onclick="window.location.hash='tag/${encodeURIComponent(note.tag)}'" style="cursor:pointer" title="${lang === 'zh' ? '查看相关' : 'View related'}">${note.tag}</span></div>`;

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

/* ===== 标签辅助函数 ===== */
function getAllTaggedItems(lang) {
  const all = [];

  DATA.reading.forEach(function(item, idx) {
    if (item.tags) {
      item.tags.forEach(function(tag) {
        all.push({
          tag: tag,
          type: 'reading',
          title: item.title[lang],
          meta: item.meta[lang],
          href: '#reading/' + idx
        });
      });
    }
  });

  DATA.notebook.forEach(function(item, idx) {
    if (item.tag && item.tag !== 'Soon') {
      var dateStr = typeof item.date === 'object' ? item.date[lang] : item.date;
      all.push({
        tag: item.tag,
        type: 'notebook',
        title: item.title[lang],
        meta: dateStr,
        href: '#notebook/' + idx
      });
    }
  });

  return all;
}

/* ===== 资源推荐页 ===== */
function showResources() {
  var lang = currentLang;
  var container = document.getElementById('sub-view');
  if (!container) return;

  var r = DATA.resources;
  var catsHtml = '';

  r.categories.forEach(function(cat) {
    catsHtml += '<div class="resources-section">' +
      '<h2>' + cat.icon + ' ' + cat.label[lang] + '</h2>' +
      '<div class="resources-list">' +
      cat.items.map(function(item) {
        return '<a href="' + item.url + '" target="_blank" rel="noreferrer" class="resource-item">' +
          '<div class="resource-name">' + item.name + ' ↗</div>' +
          '<div class="resource-desc">' + item.desc[lang] + '</div>' +
          '</a>';
      }).join('') +
      '</div></div>';
  });

  container.innerHTML = subPageShell(
    '<p class="sub-label">' + (lang === 'zh' ? '推荐资源' : 'Recommended Resources') + '</p>' +
    '<h1 class="sub-title">' + r.title[lang] + '</h1>' +
    '<p class="sub-meta-line" style="margin-bottom:40px">' + r.desc[lang] + '</p>' +
    catsHtml,
    lang === 'zh' ? '返回' : 'Back'
  );
  showSubView();
  if (typeof updateSEO === 'function') updateSEO(r.title[lang], r.desc[lang]);
}

/* ===== 标签索引页 ===== */
function showTags() {
  var lang = currentLang;
  var container = document.getElementById('sub-view');
  if (!container) return;

  var taggedItems = getAllTaggedItems(lang);
  var groups = {};
  taggedItems.forEach(function(item) {
    if (!groups[item.tag]) groups[item.tag] = [];
    groups[item.tag].push(item);
  });

  var sortedTags = Object.keys(groups).sort(function(a, b) {
    return groups[b].length - groups[a].length;
  });

  var totalItems = taggedItems.length;
  var countLabel = lang === 'zh' ? totalItems + ' 条内容' : totalItems + ' items';

  var cloudHtml = '<div class="tags-cloud">';
  sortedTags.forEach(function(tag) {
    cloudHtml += '<a href="#tag/' + encodeURIComponent(tag) + '" class="tag-cloud-item">' +
      tag + ' <span class="count">(' + groups[tag].length + ')</span></a>';
  });
  cloudHtml += '</div>';

  // 逐标签显示内容组
  var groupsHtml = '';
  sortedTags.forEach(function(tag) {
    groupsHtml += '<div class="tag-group">' +
      '<h3 class="tag-group-title">#' + tag + ' <span class="count">(' + groups[tag].length + ')</span></h3>' +
      '<div class="tag-group-list">';
    groups[tag].forEach(function(item) {
      var typeLabel = item.type === 'reading'
        ? (lang === 'zh' ? '📖 阅读' : '📖 Reading')
        : (lang === 'zh' ? '📓 笔记' : '📓 Note');
      groupsHtml += '<a href="' + item.href + '" class="tag-group-item">' +
        '<span class="tag-item-type">' + typeLabel + '</span>' +
        '<span class="tag-item-title">' + item.title + '</span>' +
        '<span class="tag-item-meta">' + item.meta + '</span>' +
        '</a>';
    });
    groupsHtml += '</div></div>';
  });

  container.innerHTML = subPageShell(
    '<p class="sub-label" style="margin-bottom:4px">' + (lang === 'zh' ? '标签' : 'Tags') + '</p>' +
    '<h1 class="sub-title" style="margin-bottom:4px">' + (lang === 'zh' ? '内容标签' : 'Content Tags') + '</h1>' +
    '<p class="sub-meta-line" style="margin-bottom:32px">' + countLabel + '</p>' +
    cloudHtml +
    groupsHtml,
    lang === 'zh' ? '返回' : 'Back'
  );
  showSubView();
  if (typeof updateSEO === 'function') updateSEO(
    lang === 'zh' ? '内容标签' : 'Content Tags',
    lang === 'zh' ? '按标签浏览所有内容' : 'Browse all content by tag'
  );
}

/* ===== 标签筛选页 ===== */
function showTagItems(tagName) {
  var lang = currentLang;
  var container = document.getElementById('sub-view');
  if (!container) return;

  var taggedItems = getAllTaggedItems(lang);
  var items = taggedItems.filter(function(item) { return item.tag === tagName; });

  if (items.length === 0) { showTags(); return; }

  var countLabel = items.length + ' ' + (lang === 'zh' ? '条内容' : 'items');

  var listHtml = '<div class="tag-items-list">';
  items.forEach(function(item) {
    var typeLabel = item.type === 'reading'
      ? (lang === 'zh' ? '📖 阅读' : '📖 Reading')
      : (lang === 'zh' ? '📓 笔记' : '📓 Note');
    listHtml += '<a href="' + item.href + '" class="tag-item-card">' +
      '<div class="tag-item-type">' + typeLabel + '</div>' +
      '<div class="tag-item-title">' + item.title + '</div>' +
      '<div class="tag-item-meta">' + item.meta + '</div>' +
      '</a>';
  });
  listHtml += '</div>';

  var backLabel = lang === 'zh' ? '← 所有标签' : '← All Tags';
  var backBtn = '<div class="sub-back-top" style="margin-top:32px">' +
    '<a href="#tags" onclick="event.preventDefault();window.location.hash=\'tags\'">' + backLabel + '</a></div>';

  container.innerHTML = subPageShell(
    '<p class="sub-label" style="margin-bottom:4px">' + (lang === 'zh' ? '标签' : 'Tag') + '</p>' +
    '<h1 class="sub-title" style="margin-bottom:4px">#' + escHTML(tagName) + '</h1>' +
    '<p class="sub-meta-line" style="margin-bottom:32px">' + countLabel + '</p>' +
    listHtml +
    backBtn,
    lang === 'zh' ? '返回标签' : 'Back to Tags'
  );
  showSubView();
  if (typeof updateSEO === 'function') updateSEO(
    '#' + tagName,
    tagName + ' - ' + countLabel
  );
}

/* ===== HTML 转义 ===== */
function escHTML(str) {
  return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

/* ===== Blog 文章索引页 ===== */
function showBlogIndex() {
  const lang = currentLang;
  const container = document.getElementById('sub-view');
  if (!container) return;

  // 所有笔记（含即将更新的）
  const entries = DATA.notebook.map((note, i) => ({ ...note, idx: i }));

  // 去重 tags
  const allTags = [...new Set(entries.map(n => n.tag).filter(t => t && t !== 'Soon'))];

  // 筛选条
  let filterHtml = `<div class="blog-filter-bar">
    <button class="blog-filter-btn active" onclick="filterBlog('all', this)">${lang === 'zh' ? '全部' : 'All'}</button>`;
  allTags.forEach(tag => {
    filterHtml += `<button class="blog-filter-btn" onclick="filterBlog('${tag}', this)">${tag}</button>`;
  });
  filterHtml += `</div>`;

  // 文章卡片
  const entriesHtml = entries.map((note) => {
    const dateStr = typeof note.date === 'object' ? note.date[lang] : note.date;
    const isSoon = note.tag === 'Soon';
    return `
    <a class="blog-card${isSoon ? ' coming-soon' : ''}" href="#notebook/${note.idx}" data-tag="${note.tag || ''}">
      ${note.tag && note.tag !== 'Soon' ? `<span class="blog-tag">${note.tag}</span>` : ''}
      <h3>${note.title[lang]}</h3>
      <div class="blog-meta">${dateStr}${note.readingTime ? ' · ' + note.readingTime : ''}</div>
      ${!isSoon ? `<p>${note.desc[lang]}</p>` : `<p style="color:#9ca3af;font-style:italic">${note.desc[lang]}</p>`}
    </a>`;
  }).join('');

  container.innerHTML = subPageShell(`
    <p class="sub-label">${lang === 'zh' ? '博客 · 学习记录' : 'Blog · Learning Notes'}</p>
    <h1 class="sub-title">${lang === 'zh' ? '学习笔记' : 'Learning Blog'}</h1>
    <p class="sub-meta-line" style="margin-bottom:32px">${lang === 'zh' ? '记录学习过程中的思考和发现' : 'Documenting my learning journey'}</p>
    ${filterHtml}
    <div class="blog-list" id="blog-list">
      ${entriesHtml}
    </div>
  `, lang === 'zh' ? '返回主页' : 'Back to Home');

  showSubView();
  if (typeof updateSEO === 'function') updateSEO(
    lang === 'zh' ? '学习笔记' : 'Learning Blog',
    lang === 'zh' ? '李军辉的学习笔记与博客' : "Junhui Li's learning blog"
  );
}

/* ===== Blog 筛选 ===== */
function filterBlog(tag, btn) {
  document.querySelectorAll('.blog-filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.blog-card').forEach(card => {
    if (tag === 'all' || card.getAttribute('data-tag') === tag) {
      card.classList.remove('filtered-out');
    } else {
      card.classList.add('filtered-out');
    }
  });
}

/* ===== 初始化 ===== */
function initRouter() {
  window.addEventListener('hashchange', handleRoute);
  if (window.__DATA_READY) { handleRoute(); }
  else { window.addEventListener('data-ready', function() { handleRoute(); }, { once: true }); }
}
document.addEventListener('DOMContentLoaded', initRouter);
