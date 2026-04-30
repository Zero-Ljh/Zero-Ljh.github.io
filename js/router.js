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
  const sections = ['about','reading','experience','projects','now','contact'];
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
  if (hash === 'gallery') { showGallery(); return; }
  if (hash === 'research') { showResearchPage(); return; }
  if (hash === 'creative') { showCreativeIndex(); return; }
  if (hash === 'life') { showLifePage(); return; }
  if (hash === 'coverage') { showCoveragePage(); return; }
  if (hash === 'toolbox') { showToolboxPage(); return; }
  if (hash === 'about-detail') { showAboutDetail(); return; }

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

  // 先显示主视图（确保文档流高度）
  sub.innerHTML = '';
  main.classList.remove('view-hidden');
  document.body.style.backgroundColor = '';
  document.body.style.overflow = ''; // Bug 4: 强制重置 overflow
  if (nav) nav.style.display = '';
  const sidebar = document.querySelector('.sidebar');
  const emailSide = document.querySelector('.email-side');
  if (sidebar) sidebar.style.display = '';
  if (emailSide) emailSide.style.display = '';
  window.scrollTo(0, 0);
  if (typeof restoreSEO === 'function') restoreSEO();

  // 再隐藏子视图（此时 main 已在文档流中，body 不会塌缩）
  sub.classList.add('view-hidden');

  // 等过渡动画完成后清空子视图 + 重播 Hero
  setTimeout(function() {
    sub.innerHTML = '';

    // 重播Hero入场动画
    setTimeout(function() {
      var els = document.querySelectorAll('.hero .container > *');
      els.forEach(function(el, i) {
        el.style.animation = 'none';
        el.offsetHeight;
        el.style.animation = 'fadeInUp 0.6s ease backwards';
        el.style.animationDelay = (i * 120) + 'ms';
      });
    }, 50);
  }, 400);
}

function showSubView() {
  const main = document.getElementById('main-content');
  const sub = document.getElementById('sub-view');
  const nav = document.getElementById('nav');
  if (!main || !sub) return;

  // 先隐藏主视图
  main.classList.add('view-hidden');
  document.body.style.backgroundColor = '#f6f3ef';
  if (nav) nav.style.display = 'none';
  const sidebar = document.querySelector('.sidebar');
  const emailSide = document.querySelector('.email-side');
  if (sidebar) sidebar.style.display = 'none';
  if (emailSide) emailSide.style.display = 'none';
  window.scrollTo(0, 0);

  // 等主视图淡出完成后再显示子视图
  setTimeout(function() {
    sub.classList.remove('view-hidden');
    var h1 = sub.querySelector('h1');
    if (h1) { h1.setAttribute('tabindex', '-1'); h1.focus({ preventScroll: true }); }
  }, 400);
}

/* ===== About Detail 子页面 ===== */
function showAboutDetail() {
  var lang = currentLang;
  var container = document.getElementById('sub-view');
  if (!container) return;

  var p = DATA.profile;
  var edu = DATA.education;

  var aboutHtml = p.about.map(function(para) {
    return '<p>' + para[lang] + '</p>';
  }).join('');

  var skillsHtml = p.skills.map(function(s) {
    var name = typeof s === 'string' ? s : s.name;
    var level = typeof s === 'object' ? s.level : 60;
    var label = (typeof s === 'object' && s.label) ? s.label[lang] : level + '%';
    return name + ' (' + label + ')';
  }).join(' · ');

  var html = '<div class="sub-content">' +
    aboutHtml +
    '<h2>' + (lang === 'zh' ? '教育背景' : 'Education') + '</h2>' +
    '<p><strong><a href="' + edu.url + '" target="_blank" rel="noopener" class="inline-link">' + edu.school[lang] + '</a></strong> — ' + edu.degree[lang] + '</p>' +
    '<p>' + edu.description[lang] + '</p>' +
    '<h2>' + (lang === 'zh' ? '我正在寻找' : "What I'm Looking For") + '</h2>' +
    '<p>' + p.seeking[lang] + '</p>' +
    '<h2>' + (lang === 'zh' ? '技能' : 'Skills') + '</h2>' +
    '<p>' + skillsHtml + '</p>' +
    '</div>';

  container.innerHTML = subPageShell(
    '<p class="sub-label">' + (lang === 'zh' ? '关于我' : 'About Me') + '</p>' +
    '<h1 class="sub-title">' + p.name[lang] + '</h1>' +
    '<p class="sub-meta-line">' + edu.degree[lang] + '</p>' +
    html,
    lang === 'zh' ? '返回主页' : 'Back to Home'
  );
  showSubView();
  if (typeof updateSEO === 'function') updateSEO(
    lang === 'zh' ? '关于 - ' + p.name.zh : 'About - ' + p.name.en,
    p.about[0][lang].replace(/<[^>]*>/g, '').substring(0, 160)
  );
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
          <div class="sub-top-actions">
            <div class="sub-lang-toggle">
              <button class="sub-lang-btn${lang === 'zh' ? ' active' : ''}" onclick="setLang('zh')">中</button>
              <button class="sub-lang-btn${lang === 'en' ? ' active' : ''}" onclick="setLang('en')">EN</button>
            </div>
            <button class="sub-share" onclick="copyPageLink(this)" title="${lang === 'zh' ? '复制链接' : 'Copy Link'}">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
              <span>${lang === 'zh' ? '复制链接' : 'Copy'}</span>
            </button>
          </div>
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
      case 'p':
        var content = section.content[lang];
        content = content.replace(/<a\s/g, '<a class="inline-link" ');
        return '<p>' + content + '</p>';
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
  var tocHtml = '';
  if (bodyHtml) {
    // 自动目录：正文 h2 超过 3 个时生成 TOC
    var h2Count = (bodyHtml.match(/<h2>/g) || []).length;
    if (h2Count > 3) {
      var tocItems = [];
      bodyHtml = bodyHtml.replace(/<h2>([^<]+)<\/h2>/g, function(match, text) {
        var slug = text.toLowerCase()
          .replace(/<[^>]*>/g, '')
          .replace(/[^a-z0-9一-鿿\s-]/g, '')
          .replace(/\s+/g, '-')
          .replace(/-+/g, '-')
          .replace(/^-+|-+$/g, '');
        if (!slug) slug = 'h';
        var id = 'toc-' + slug;
        tocItems.push({ text: text, id: id });
        return '<h2 id="' + id + '">' + text + '</h2>';
      });
      if (tocItems.length > 3) {
        tocHtml = '<nav class="sub-toc"><h2>' + (lang === 'zh' ? '目录' : 'Table of Contents') + '</h2><ol>' +
          tocItems.map(function(item) { return '<li><a href="#' + item.id + '">' + item.text + '</a></li>'; }).join('') +
          '</ol></nav>';
      }
    }
    // 有正文时: note 作为引用块放在正文前
    extras += `<div class="sub-blockquote">${item.note[lang]}</div>`;
    extras += tocHtml;
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

  // 确保阅读进度条在子页面也正常工作
  var progressBar = document.getElementById('reading-progress');
  if (!progressBar) {
    progressBar = document.createElement('div');
    progressBar.id = 'reading-progress';
    document.body.appendChild(progressBar);
  }
  // 等 DOM 渲染完成后触发一次更新
  setTimeout(function() {
    window.dispatchEvent(new Event('scroll'));
  }, 100);
}

/* ===== 项目详情（Case Study 布局） ===== */
function showProjectDetail(id) {
  const project = DATA.projects.find(p => p.id === id);
  if (!project) { showMainView(); return; }
  const lang = currentLang;
  const container = document.getElementById('sub-view');
  if (!container) return;

  // ---- 1. Status Badge ----
  let badgeHTML = '';
  if (project.status) {
    badgeHTML = `<div class="status-badge" style="margin-bottom:12px">${project.status[lang]}</div>`;
  }

  // ---- 2. Info Bar (Status | Period | Role) ----
  let infoParts = [];
  infoParts.push(`<span><span class="info-label">${lang === 'zh' ? '状态' : 'Status'}</span> ${project.status ? project.status[lang] : project.overline[lang]}</span>`);
  if (project.period) infoParts.push(`<span><span class="info-label">${lang === 'zh' ? '时间' : 'Period'}</span> ${project.period[lang]}</span>`);
  if (project.role) infoParts.push(`<span><span class="info-label">${lang === 'zh' ? '角色' : 'Role'}</span> ${project.role[lang]}</span>`);
  const infoBarHTML = `<div class="project-info-bar" style="margin-bottom:32px">${infoParts.join('<span class="info-sep">|</span>')}</div>`;

  // ---- 3. Screenshot (full-width) ----
  let screenshotHTML = '';
  if (project.image) {
    screenshotHTML = `<div class="project-screenshot" style="width:100%;margin-bottom:32px"><img src="${project.image}" alt="${project.title[lang]}"></div>`;
  } else {
    screenshotHTML = `<div class="project-screenshot" style="width:100%;margin-bottom:32px"><div class="img-placeholder">
      <div class="placeholder-geo"></div>
      <div class="placeholder-content">
        <span class="placeholder-title">${project.title[lang]}</span>
        <span class="placeholder-sub">${lang === 'zh' ? '项目截图' : 'Project Screenshot'}</span>
      </div>
    </div></div>`;
  }

  // ---- 4. Description + Links ----
  let contentHTML = `<div class="sub-content"><p>${project.desc[lang]}</p></div>`;
  if (project.links && project.links.length) {
    contentHTML += `<div class="project-links-section" style="margin-bottom:32px">`;
    project.links.forEach(link => {
      contentHTML += `<a href="${link.url}" target="_blank" rel="noreferrer">${link.label[lang]}</a>`;
    });
    contentHTML += `</div>`;
  }

  // ---- 5. Two-column Grid: Learnings | Challenges ----
  let learningsHTML = '';
  let challengesHTML = '';
  if (project.learnings && project.learnings[lang].length) {
    learningsHTML = `<div>
      <h3 style="margin-bottom:12px;font-size:1.1rem">${lang === 'zh' ? '学到了什么' : 'What I Learned'}</h3>
      <div class="project-learnings">${project.learnings[lang].map(l => `<span>${l}</span>`).join('')}</div>
    </div>`;
  }
  if (project.challenges && project.challenges[lang]) {
    challengesHTML = `<div>
      <h3 style="margin-bottom:12px;font-size:1.1rem">${lang === 'zh' ? '遇到的挑战' : 'Challenges'}</h3>
      <div class="project-challenge">${project.challenges[lang]}</div>
    </div>`;
  }
  let splitGridHTML = '';
  if (learningsHTML || challengesHTML) {
    splitGridHTML = `<div class="project-detail-grid">
      ${learningsHTML || '<div></div>'}
      ${challengesHTML || '<div></div>'}
    </div>`;
  }

  // ---- 6. Tech Stack (centered) ----
  let techHTML = `<div class="sub-tags tech-badges" style="text-align:center;margin-bottom:32px">${project.tech.map(t => `<span>${t}</span>`).join('')}</div>`;

  // ---- 7. Timeline (horizontal flex steps) ----
  let timelineHTML = '';
  if (project.timeline && project.timeline[lang]) {
    const raw = project.timeline[lang];
    const steps = raw.includes(' → ') ? raw.split(' → ') : [raw];
    const stepItems = steps.map((s, i) => `
      <span style="display:inline-flex;align-items:center;gap:8px">
        ${i > 0 ? `<span style="color:var(--color-gold,#c9a84c);font-size:1.2rem">→</span>` : ''}
        <span style="background:var(--color-bg-secondary, #f0ebe6);padding:8px 16px;border-radius:8px;font-size:0.9rem">${s.trim()}</span>
      </span>
    `).join('');
    timelineHTML = `<div class="project-detail-section" style="margin-bottom:32px">
      <h3 style="margin-bottom:16px;font-size:1.1rem;text-align:center">${lang === 'zh' ? '时间线' : 'Timeline'}</h3>
      <div style="display:flex;gap:4px;flex-wrap:wrap;justify-content:center;align-items:center">
        ${stepItems}
      </div>
    </div>`;
  }

  // ---- 8. Related Projects (card grid) ----
  const relatedProjects = DATA.projects.filter(p => p.id !== id && p.tech.some(t => project.tech.includes(t)));
  let relatedHTML = '';
  if (relatedProjects.length > 0) {
    relatedHTML = `<div class="project-related" style="margin-bottom:32px">
      <h3 style="margin-bottom:16px;font-size:1.1rem">${lang === 'zh' ? '相关项目' : 'Related Projects'}</h3>
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

  // ---- 9. Prev / Next Navigation ----
  const idx = DATA.projects.findIndex(p => p.id === id);
  const prevProj = idx > 0 ? { href: `#project/${DATA.projects[idx - 1].id}`, title: DATA.projects[idx - 1].title } : null;
  const nextProj = idx < DATA.projects.length - 1 ? { href: `#project/${DATA.projects[idx + 1].id}`, title: DATA.projects[idx + 1].title } : null;

  // ---- Assemble into subPageShell ----
  container.innerHTML = subPageShell(`
    ${badgeHTML}
    <h1 class="sub-title" style="font-size:48px">${project.title[lang]}</h1>
    ${infoBarHTML}
    ${screenshotHTML}
    ${contentHTML}
    ${splitGridHTML}
    ${techHTML}
    ${timelineHTML}
    ${relatedHTML}
    ${subNavHTML(prevProj, nextProj, lang)}
  `, lang === 'zh' ? '返回项目' : 'Back to Projects', 'projects');

  showSubView();
  var pbw = container.querySelector('.sub-body-wrap');
  if (pbw) pbw.classList.add('sub-theme-studio');
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
  var cbw = container.querySelector('.sub-body-wrap');
  if (cbw) cbw.classList.add('sub-creative-detail');
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
  var nbw = container.querySelector('.sub-body-wrap');
  if (nbw) nbw.classList.add('sub-notebook');
  if (typeof updateSEO === 'function') updateSEO(note.title[lang], note.desc[lang]);
}

/* ===== 归档页 ===== */
function showArchive() {
  const lang = currentLang;
  const container = document.getElementById('sub-view');
  if (!container) return;

  const total = DATA.projects.length + DATA.miniProjects.length;
  const countLabel = lang === 'zh' ? total + ' 个项目' : total + ' projects';

  // Extract year from period field (e.g. "2025 — Present" -> "2025")
  function extractYear(p) {
    const periodStr = p.period ? (p.period[lang] || p.period.en || '') : '';
    const match = periodStr.match(/(\d{4})/);
    return match ? match[1] : '';
  }

  // Group projects by year
  const groups = {};
  DATA.projects.forEach(p => {
    const year = extractYear(p);
    if (!groups[year]) groups[year] = [];
    groups[year].push(p);
  });

  // Sort years descending
  const sortedYears = Object.keys(groups).sort((a, b) => b.localeCompare(a));

  const projectHTML = sortedYears.map(year => `
    <div class="archive-year-group">
      <div class="archive-year-divider">
        <span class="year-num">${year}</span>
        <span class="year-line"></span>
      </div>
      ${groups[year].map(p => `
        <div class="archive-row">
          <a href="#project/${p.id}" class="archive-name">${p.title[lang]}</a>
          <span class="archive-desc">${p.desc[lang]}</span>
          <span class="archive-tags">${p.tech.join(' · ')}</span>
        </div>
      `).join('')}
    </div>
  `).join('');

  const miniHTML = DATA.miniProjects.length ? `
    <div class="archive-year-group">
      <div class="archive-year-divider">
        <span class="year-num">${lang === 'zh' ? '更多' : 'More'}</span>
        <span class="year-line"></span>
      </div>
      ${DATA.miniProjects.map(m => `
        <div class="archive-row">
          <span class="archive-name">${m.title[lang]}</span>
          <span class="archive-desc">${m.desc[lang]}</span>
          <span class="archive-tags">${m.tech}</span>
        </div>
      `).join('')}
    </div>
  ` : '';

  container.innerHTML = subPageShell(`
    <p class="sub-label" style="margin-bottom:4px">${lang === 'zh' ? '归档' : 'Archive'}</p>
    <h1 class="sub-title" style="margin-bottom:4px">${lang === 'zh' ? '全部项目' : 'All Projects'}</h1>
    <p class="sub-meta-line" style="margin-bottom:48px">${countLabel}</p>
    ${projectHTML}
    ${miniHTML}
  `, lang === 'zh' ? '返回' : 'Back');
  showSubView();
  var abw = container.querySelector('.sub-body-wrap');
  if (abw) abw.classList.add('sub-theme-archive');
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

  /* 顶部双栏Header */
  const headerHTML = `
    <div class="resume-header">
      <div class="resume-header-left">
        <h1 class="resume-name">${p.name[lang]}</h1>
        <p class="resume-header-meta">
          ${edu.degree[lang]}<span class="resume-header-dot"> · </span>${edu.period[lang]}
        </p>
      </div>
      <div class="resume-header-right">
        <div class="resume-contact-item">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
          <a href="https://github.com/${p.githubUsername}" target="_blank" rel="noopener">github.com/${p.githubUsername}</a>
        </div>
      </div>
    </div>
  `;

  /* 教育背景 */
  const eduHTML = `
    <div class="resume-section">
      <h2>${lang === 'zh' ? '教育背景' : 'Education'}</h2>
      <div class="resume-item">
        <h3><a href="${edu.url}" target="_blank" rel="noopener" class="inline-link">${edu.school[lang]}</a></h3>
        <p class="resume-item-desc">${edu.description[lang]}</p>
        <div class="resume-courses">
          ${edu.courses[lang].map(c => `<span class="resume-tag">${c}</span>`).join('')}
        </div>
      </div>
    </div>
  `;

  /* 经历（时间线） */
  let expItems = '';
  DATA.experience.panels.forEach(panel => {
    expItems += `
      <div class="resume-timeline-item">
        <div class="resume-timeline-dot"></div>
        <div class="resume-timeline-body">
          <h3>${panel.title[lang]}</h3>
          <p class="resume-date">${panel.date[lang]}</p>
          <ul>
            ${panel.items[lang].map(item => `<li>${item}</li>`).join('')}
          </ul>`;

    if (panel.sub) {
      expItems += `
          <div class="resume-sub-item">
            <h4>${panel.sub.title[lang]}</h4>
            <p class="resume-date">${panel.sub.date[lang]}</p>
            <ul>
              ${panel.sub.items[lang].map(item => `<li>${item}</li>`).join('')}
            </ul>
          </div>`;
    }

    expItems += `</div></div>`;
  });

  /* 技能标签格 */
  const skillsHTML = `
    <div class="resume-section">
      <h2>${lang === 'zh' ? '技能' : 'Skills'}</h2>
      <div class="resume-skills-grid">
        ${p.skills.map(s => `
          <span class="resume-skill-pill">
            <span class="resume-skill-name">${s.name}</span>
            ${s.label ? `<span class="resume-skill-label">${s.label[lang]}</span>` : ''}
          </span>
        `).join('')}
      </div>
    </div>
  `;

  /* 荣誉横排卡片 */
  const honorsHTML = `
    <div class="resume-section">
      <h2>${lang === 'zh' ? '荣誉' : 'Honors'}</h2>
      <div class="resume-honors">
        ${DATA.honors.map(h => `
          <div class="resume-honor-card">
            <span class="resume-honor-num">${h.num}</span>
            <span class="resume-honor-label">${h.label[lang]}</span>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  const html = `
    ${headerHTML}
    ${eduHTML}
    <div class="resume-grid">
      <div class="resume-grid-left">
        <div class="resume-section">
          <h2>${lang === 'zh' ? '经历' : 'Experience'}</h2>
          <div class="resume-timeline">
            ${expItems}
          </div>
        </div>
      </div>
      <div class="resume-grid-right">
        ${skillsHTML}
        ${honorsHTML}
      </div>
    </div>
  `;

  container.innerHTML = subPageShell(html, lang === 'zh' ? '返回主页' : 'Back to Home');
  showSubView();
  var rbw = container.querySelector('.sub-body-wrap');
  if (rbw) rbw.classList.add('sub-theme-print');
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
  var rbw2 = container.querySelector('.sub-body-wrap');
  if (rbw2) rbw2.classList.add('sub-theme-library');
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

  if (sortedTags.length === 0) {
    container.innerHTML = subPageShell(
      emptyStateHTML('🏷️',
        lang === 'zh' ? '还没有标签' : 'No Tags Yet',
        lang === 'zh' ? '内容添加标签后会在这里展示' : 'Tags will appear here once content is tagged',
        lang === 'zh' ? '返回主页' : 'Back to Home'
      ),
      lang === 'zh' ? '返回' : 'Back'
    );
    showSubView();
    return;
  }

  var totalItems = taggedItems.length;
  var countLabel = lang === 'zh' ? totalItems + ' 条内容' : totalItems + ' items';

  var maxCount = 0;
  sortedTags.forEach(function(tag) { if (groups[tag].length > maxCount) maxCount = groups[tag].length; });

  var cloudHtml = '<div class="tags-cloud">';
  sortedTags.forEach(function(tag) {
    var weight = Math.log(groups[tag].length + 1) / Math.log(maxCount + 1);
    var fontSize = 14 + weight * 18;
    cloudHtml += '<a href="#tag/' + encodeURIComponent(tag) + '" class="tag-cloud-item" style="font-size:' + fontSize + 'px">' +
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
  var tbw = container.querySelector('.sub-body-wrap');
  if (tbw) tbw.classList.add('sub-theme-index');
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
      ${!isSoon ? `<p>${note.desc[lang]}</p>` : `<p style="color:#6b7280;font-style:italic">${note.desc[lang]}</p>`}
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
  var bbw = container.querySelector('.sub-body-wrap');
  if (bbw) bbw.classList.add('sub-theme-blog');
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

/* ===== 图库展示 ===== */
function showGallery() {
  var lang = currentLang;
  var container = document.getElementById('sub-view');
  if (!container || !DATA.gallery) { showMainView(); return; }

  var gallery = DATA.gallery;
  var activeCat = 'all';

  function renderGallery(cat) {
    activeCat = cat;
    var items = cat === 'all' ? gallery.items : gallery.items.filter(function(i) { return i.category === cat; });

    var filterHtml = '<div class="gallery-filter">' +
      '<button class="gallery-filter-btn' + (cat === 'all' ? ' active' : '') + '" onclick="window._filterGallery(\'all\')">' + (lang === 'zh' ? '全部' : 'All') + '</button>';
    gallery.categories.forEach(function(c) {
      filterHtml += '<button class="gallery-filter-btn' + (cat === c.id ? ' active' : '') + '" onclick="window._filterGallery(\'' + c.id + '\')">' + c.icon + ' ' + c.label[lang] + '</button>';
    });
    filterHtml += '</div>';

    var masonryHtml = '<div class="gallery-grid">';
    items.forEach(function(item, idx) {
      var globalIdx = gallery.items.indexOf(item);
      masonryHtml += '<div class="gallery-item" onclick="window._openLightbox(' + globalIdx + ')">' +
        '<img src="' + (item.thumb || item.src) + '" alt="' + escHTML(item.title[lang]) + '" loading="lazy">' +
        '<div class="gallery-item-overlay"><div class="gallery-item-label">' +
        '<span class="label-num">No. ' + (idx + 1) + ' / ' + items.length + '</span>' +
        '<span class="label-title">' + item.title[lang] + '</span>' +
        '<span class="label-meta">' + (item.category === 'aigc' ? (lang === 'zh' ? 'AI 生成' : 'AI Generated') : (item.category === 'photo' ? (lang === 'zh' ? '摄影' : 'Photography') : (lang === 'zh' ? '动漫' : 'Anime'))) + '</span>' +
        '</div></div>' +
        '</div>';
    });
    masonryHtml += '</div>';

    document.getElementById('gallery-content').innerHTML = filterHtml + masonryHtml;
    window._galleryCat = cat;
    requestAnimationFrame(function() {
      var items = document.querySelectorAll('.gallery-item');
      items.forEach(function(item, i) {
        item.style.animationDelay = (i * 100) + 'ms';
      });
    });
  }

  window._openLightbox = function(idx) {
    window._lightboxIdx = idx;
    window._lightboxItems = window._galleryCat === 'all'
      ? gallery.items
      : gallery.items.filter(function(i) { return i.category === window._galleryCat; });
    // Find the index within filtered items
    var item = gallery.items[idx];
    var filteredIdx = window._lightboxItems.indexOf(item);
    window._lightboxIdx = filteredIdx >= 0 ? filteredIdx : 0;
    document.getElementById('gallery-lightbox').classList.add('open');
    updateLightboxImage();
    document.body.style.overflow = 'hidden';
    resetLightboxTimer();
  };

  window._closeLightbox = function() {
    try { document.getElementById('gallery-lightbox')?.classList.remove('open'); } catch(e) {}
    document.body.style.overflow = '';
    clearTimeout(lightboxTimer);
  };

  window._lightboxPrev = function() {
    if (window._lightboxIdx > 0) { window._lightboxIdx--; updateLightboxImage(); }
  };

  window._lightboxNext = function() {
    if (window._lightboxIdx < window._lightboxItems.length - 1) { window._lightboxIdx++; updateLightboxImage(); }
  };

  function updateLightboxImage() {
    var item = window._lightboxItems[window._lightboxIdx];
    if (!item) return;
    var img = document.getElementById('lightbox-img');

    // 当前图缩放淡出
    if (img.src && !img.classList.contains('loading')) {
      img.classList.add('exiting');
      setTimeout(function() {
        img.classList.remove('exiting');
        setNewImage();
      }, 350);
    } else {
      setNewImage();
    }

    function setNewImage() {
      img.classList.add('loading');
      img.src = item.src;
      img.alt = item.title ? (typeof item.title === 'object' ? item.title[currentLang] : item.title) : '';
      img.onload = function() {
        img.classList.remove('loading');
        img.classList.add('entering');
        setTimeout(function() { img.classList.remove('entering'); }, 500);
      };
      document.getElementById('lightbox-counter').textContent = (window._lightboxIdx + 1) + ' / ' + window._lightboxItems.length;
    }
  }

  window._filterGallery = function(cat) { renderGallery(cat); };

  // Keyboard nav
  document.addEventListener('keydown', function _galleryKb(e) {
    var lb = document.getElementById('gallery-lightbox');
    if (!lb || !lb.classList.contains('open')) return;
    if (e.key === 'Escape') window._closeLightbox();
    if (e.key === 'ArrowLeft') window._lightboxPrev();
    if (e.key === 'ArrowRight') window._lightboxNext();
  });

  // Auto-hide lightbox UI after 3s of no mouse movement
  var lightboxTimer;
  function resetLightboxTimer() {
    var lb = document.getElementById('gallery-lightbox');
    if (lb) lb.classList.remove('idle');
    clearTimeout(lightboxTimer);
    lightboxTimer = setTimeout(function() {
      var lb2 = document.getElementById('gallery-lightbox');
      if (lb2) lb2.classList.add('idle');
    }, 3000);
  }

  var lightboxHTML = '<div id="gallery-lightbox" class="gallery-lightbox" onclick="if(event.target===this)window._closeLightbox()">' +
    '<button class="gallery-lightbox-close" onclick="window._closeLightbox()" aria-label="Close">✕</button>' +
    '<button class="gallery-lightbox-nav gallery-lightbox-prev" onclick="event.stopPropagation();window._lightboxPrev()" aria-label="Previous">‹</button>' +
    '<div class="spotlight"></div>' +
    '<img id="lightbox-img" src="" alt="">' +
    '<button class="gallery-lightbox-nav gallery-lightbox-next" onclick="event.stopPropagation();window._lightboxNext()" aria-label="Next">›</button>' +
    '<span id="lightbox-counter" class="gallery-lightbox-counter"></span>' +
    '</div>';

  container.innerHTML = subPageShell(
    '<p class="sub-label">' + (lang === 'zh' ? '图库' : 'Gallery') + '</p>' +
    '<h1 class="sub-title" style="margin-bottom:32px">' + (lang === 'zh' ? '影像记录' : 'Visual Moments') + '</h1>' +
    '<div id="gallery-content"></div>' +
    lightboxHTML,
    lang === 'zh' ? '返回' : 'Back'
  );

  showSubView();
  var bodyWrap = container.querySelector('.sub-body-wrap');
  if (bodyWrap) { bodyWrap.classList.add('sub-theme-gallery'); }

  // Bind lightbox auto-hide and touch events
  var lightboxEl = document.getElementById('gallery-lightbox');
  if (lightboxEl) {
    lightboxEl.addEventListener('mousemove', resetLightboxTimer);
    var touchStartX = 0;
    lightboxEl.addEventListener('touchstart', function(e) {
      touchStartX = e.changedTouches[0].screenX;
    }, {passive: true});
    lightboxEl.addEventListener('touchend', function(e) {
      var dx = e.changedTouches[0].screenX - touchStartX;
      if (Math.abs(dx) > 50) {
        if (dx < 0) window._lightboxNext();
        else window._lightboxPrev();
      }
    }, {passive: true});
  }

  renderGallery('all');

  // 悬浮视差倾斜（仅在用户未减少动效时绑定）
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    function tiltHandler(e) {
      var el = e.currentTarget;
      var rect = el.getBoundingClientRect();
      var x = e.clientX - rect.left;
      var y = e.clientY - rect.top;
      var centerX = rect.width / 2;
      var centerY = rect.height / 2;
      var rotateX = (y - centerY) / centerY * -5;
      var rotateY = (x - centerX) / centerX * 5;
      el.style.transform = 'perspective(800px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg)';
    }
    function resetHandler(e) {
      e.currentTarget.style.transform = 'perspective(800px) rotateX(0) rotateY(0)';
    }
    document.querySelectorAll('.gallery-item').forEach(function(item) {
      item.removeEventListener('mousemove', tiltHandler);
      item.removeEventListener('mouseleave', resetHandler);
      item.addEventListener('mousemove', tiltHandler);
      item.addEventListener('mouseleave', resetHandler);
    });
  }

  if (typeof updateSEO === 'function') updateSEO(
    lang === 'zh' ? '图库 - 李军辉' : 'Gallery - Junhui Li',
    lang === 'zh' ? '李军辉的影像记录' : "Junhui Li's visual gallery"
  );
}

/* ===== 兴趣探索子页 ===== */
function showResearchPage() {
  var lang = currentLang;
  var container = document.getElementById('sub-view');
  if (!container || !DATA.research) return;
  var r = DATA.research;

  var areasHtml = '<div class="research-grid-sub">';
  r.areas.forEach(function(a) {
    areasHtml += '<div class="research-card-sub"><div class="research-icon">' + a.icon + '</div><h3>' + a.title[lang] + '</h3><p>' + a.desc[lang] + '</p></div>';
  });
  areasHtml += '</div>';

  container.innerHTML = subPageShell(
    '<p class="sub-label">' + (lang === 'zh' ? '兴趣探索' : 'Exploring') + '</p>' +
    '<h1 class="sub-title">' + r.heading[lang] + '</h1>' +
    '<p class="sub-meta-line" style="margin-bottom:32px">' + r.intro[lang] + '</p>' +
    areasHtml,
    lang === 'zh' ? '返回' : 'Back'
  );
  showSubView();
  var rbw = container.querySelector('.sub-body-wrap');
  if (rbw) rbw.classList.add('sub-theme-research');
  if (typeof updateSEO === 'function') updateSEO(r.heading[lang], r.intro[lang]);
}

/* ===== 创作索引子页 ===== */
function showCreativeIndex() {
  var lang = currentLang;
  var container = document.getElementById('sub-view');
  if (!container || !DATA.creative) return;

  var itemsHtml = '<div class="creative-sub-list">';
  DATA.creative.forEach(function(c, i) {
    itemsHtml += '<a href="#creative/' + i + '" class="creative-sub-card">' +
      '<span class="creative-genre">' + c.genre[lang] + '</span>' +
      '<h3>' + c.title[lang] + '</h3>' +
      '<p>' + c.excerpt[lang] + '</p>' +
      '</a>';
  });
  itemsHtml += '</div>';

  container.innerHTML = subPageShell(
    '<p class="sub-label">' + (lang === 'zh' ? '创作' : 'Creative') + '</p>' +
    '<h1 class="sub-title">' + (lang === 'zh' ? '诗歌 · 文章 · 随笔' : 'Poetry · Essays · Prose') + '</h1>' +
    '<p class="sub-meta-line" style="margin-bottom:32px">' + (lang === 'zh' ? '文字记录与表达' : 'Words and expression') + '</p>' +
    itemsHtml,
    lang === 'zh' ? '返回' : 'Back'
  );
  showSubView();
  if (typeof updateSEO === 'function') updateSEO(
    lang === 'zh' ? '创作 - 李军辉' : 'Creative - Junhui Li',
    lang === 'zh' ? '李军辉的诗歌、文章与随笔' : "Junhui Li's creative writing"
  );
}

/* ===== 课余生活子页 ===== */
function showLifePage() {
  var lang = currentLang;
  var container = document.getElementById('sub-view');
  if (!container || !DATA.life) return;

  var icons = typeof FEATHER_ICONS !== 'undefined' ? FEATHER_ICONS : {};
  var itemsHtml = '<div class="life-sub-grid">';
  DATA.life.forEach(function(item) {
    itemsHtml += '<div class="life-sub-item">' +
      '<span class="life-sub-icon">' + (icons[item.icon] || item.icon) + '</span>' +
      '<div class="life-sub-label">' + item.label[lang] + '</div>' +
      (item.desc ? '<div class="life-sub-desc">' + item.desc[lang] + '</div>' : '') +
      (item.photo ? '<img src="' + item.photo + '" alt="' + item.label[lang] + '" class="life-sub-photo" loading="lazy">' : '') +
      '</div>';
  });
  itemsHtml += '</div>';

  container.innerHTML = subPageShell(
    '<p class="sub-label">' + (lang === 'zh' ? '课余生活' : 'Life') + '</p>' +
    '<h1 class="sub-title">' + (lang === 'zh' ? '足球 · 阅读 · 机器人 · 心理' : 'Football · Reading · Robotics · Mental Health') + '</h1>' +
    '<p class="sub-meta-line" style="margin-bottom:32px">' + (lang === 'zh' ? '学习之外，我在做的那些事' : 'Beyond studying — what I spend time on') + '</p>' +
    itemsHtml,
    lang === 'zh' ? '返回' : 'Back'
  );
  showSubView();
  var lbw = container.querySelector('.sub-body-wrap');
  if (lbw) lbw.classList.add('sub-theme-life');
  if (typeof updateSEO === 'function') updateSEO(
    lang === 'zh' ? '生活 - 李军辉' : 'Life - Junhui Li',
    lang === 'zh' ? '李军辉的课余生活' : "Junhui Li's life beyond studying"
  );
}

/* ===== 媒体报道子页 ===== */
function showCoveragePage() {
  var lang = currentLang;
  var container = document.getElementById('sub-view');
  if (!container || !DATA.coverage) return;
  var c = DATA.coverage;

  var itemsHtml = '';
  c.items.forEach(function(item) {
    var photosHtml = '';
    if (item.photos && item.photos.length) {
      photosHtml = '<div class="coverage-photos">';
      item.photos.forEach(function(p) {
        photosHtml += '<img src="' + p + '" alt="' + item.title[lang] + '" class="coverage-photo" loading="lazy">';
      });
      photosHtml += '</div>';
    }
    itemsHtml +=
      '<div class="coverage-item">' +
      '<div class="coverage-meta">' +
      '<span class="coverage-source">📰 ' + item.source[lang] + '</span>' +
      '<span class="coverage-date">' + item.date + '</span>' +
      '</div>' +
      '<h3 class="coverage-title">' + item.title[lang] + '</h3>' +
      (photosHtml ? photosHtml : '') +
      '<p class="coverage-desc">' + item.desc[lang] + '</p>' +
      '<div class="coverage-links">' +
      '<a href="' + item.url + '" target="_blank" rel="noopener" class="coverage-link">' +
      (lang === 'zh' ? '阅读全文 ↗' : 'Read Full Article ↗') +
      '</a>' +
      (item.urlHighlights ? '<a href="' + item.urlHighlights + '" target="_blank" rel="noopener" class="coverage-link coverage-link-secondary">' +
      (lang === 'zh' ? '精彩片段 ↗' : 'Highlights ↗') +
      '</a>' : '') +
      '</div>' +
      '</div>';
  });

  container.innerHTML = subPageShell(
    '<p class="sub-label">' + (lang === 'zh' ? '媒体报道' : 'Coverage') + '</p>' +
    '<h1 class="sub-title">' + c.heading[lang] + '</h1>' +
    '<p class="sub-meta-line" style="margin-bottom:32px">' + c.intro[lang] + '</p>' +
    itemsHtml,
    lang === 'zh' ? '返回' : 'Back'
  );
  showSubView();
  var lbw = container.querySelector('.sub-body-wrap');
  if (lbw) lbw.classList.add('sub-theme-coverage');
  if (typeof updateSEO === 'function') updateSEO(
    lang === 'zh' ? '媒体报道 - 李军辉' : 'Coverage - Junhui Li',
    lang === 'zh' ? '关于李军辉的外部报道与记录' : "External coverage about Junhui Li"
  );
}

/* ===== 工具箱子页 ===== */
function showToolboxPage() {
  var lang = currentLang;
  var container = document.getElementById('sub-view');
  if (!container || !DATA.toolbox) return;
  var tb = DATA.toolbox;

  var catsHtml = '';
  tb.categories.forEach(function(cat) {
    catsHtml += '<div class="toolbox-sub-category"><h3>' + cat.label[lang] + '</h3><div class="toolbox-sub-items">';
    cat.items.forEach(function(item) {
      catsHtml += '<div class="toolbox-sub-item"><span class="tool-sub-name">' + item.name + '</span><span class="tool-sub-desc">' + item.desc[lang] + '</span></div>';
    });
    catsHtml += '</div></div>';
  });

  container.innerHTML = subPageShell(
    '<p class="sub-label">' + (lang === 'zh' ? '工具箱' : 'Toolbox') + '</p>' +
    '<h1 class="sub-title">' + tb.heading[lang] + '</h1>' +
    '<p class="sub-meta-line" style="margin-bottom:32px">' + (lang === 'zh' ? '我在用的工具和工作流' : 'Tools and workflows I use') + '</p>' +
    catsHtml,
    lang === 'zh' ? '返回' : 'Back'
  );
  showSubView();
  var tbw = container.querySelector('.sub-body-wrap');
  if (tbw) tbw.classList.add('sub-theme-toolbox');
  if (typeof updateSEO === 'function') updateSEO(tb.heading[lang], lang === 'zh' ? '李军辉的工具箱' : "Junhui Li's toolbox");
}

/* ===== 空状态通用函数 ===== */
function emptyStateHTML(icon, title, desc, backLabel) {
  var lang = currentLang;
  return '<div class="empty-state">' +
    '<div class="empty-icon">' + icon + '</div>' +
    '<h2>' + (typeof title === 'object' ? title[lang] : title) + '</h2>' +
    '<p>' + (typeof desc === 'object' ? desc[lang] : desc) + '</p>' +
    '<a href="#" onclick="window.location.hash=\'\';return false" class="empty-back">← ' + (backLabel || (lang === 'zh' ? '返回主页' : 'Back to Home')) + '</a>' +
    '</div>';
}

/* ===== 初始化 ===== */
function initRouter() {
  window.addEventListener('hashchange', handleRoute);
  if (window.__DATA_READY) { handleRoute(); }
  else { window.addEventListener('data-ready', function() { handleRoute(); }, { once: true }); }
}
document.addEventListener('DOMContentLoaded', initRouter);
