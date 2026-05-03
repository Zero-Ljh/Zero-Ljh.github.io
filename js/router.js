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

/* ===== About Detail 子页面（暖卡风格） ===== */
function showAboutDetail() {
  const L = currentLang;
  const container = document.getElementById('sub-view');
  if (!container) return;

  const p = DATA.profile;
  const edu = DATA.education;

  const aboutHtml = p.about.map(function(para) {
    return '<p>' + para[L] + '</p>';
  }).join('');

  const skillsHtml = p.skills.map(function(s) {
    var name = typeof s === 'string' ? s : s.name;
    var level = typeof s === 'object' ? s.level : 60;
    var label = (typeof s === 'object' && s.label) ? s.label[L] : level + '%';
    return name + ' (' + label + ')';
  }).join(' · ');

  container.innerHTML = `
    <div class="ab-page">
      <nav class="ab-bar">
        <a href="#" onclick="window.location.hash='';return false;" class="ab-back">← ${L === 'zh' ? '返回主页' : 'Back to Home'}</a>
        <span class="ab-lang">
          <button class="ab-lb${L === 'zh' ? ' on' : ''}" onclick="setLang('zh')">中</button>
          <button class="ab-lb${L === 'en' ? ' on' : ''}" onclick="setLang('en')">EN</button>
        </span>
      </nav>
      <div class="ab-body">
        <div class="ab-hero">
          <div class="ab-avatar">${(p.name[L] || 'J').charAt(0)}</div>
          <h1 class="ab-name">${p.name[L]}</h1>
          <p class="ab-degree">${edu.degree[L]}</p>
        </div>
        <div class="ab-cards">
          <div class="ab-card">
            <h2 class="ab-card-title">${L === 'zh' ? '关于我' : 'About Me'}</h2>
            ${aboutHtml}
          </div>
          <div class="ab-card">
            <h2 class="ab-card-title">${L === 'zh' ? '教育背景' : 'Education'}</h2>
            <p><strong><a href="${edu.url}" target="_blank" rel="noopener" class="inline-link">${edu.school[L]}</a></strong> — ${edu.degree[L]}</p>
            <p>${edu.description[L]}</p>
          </div>
          <div class="ab-card">
            <h2 class="ab-card-title">${L === 'zh' ? '我正在寻找' : "What I'm Looking For"}</h2>
            <p>${p.seeking[L]}</p>
          </div>
          <div class="ab-card">
            <h2 class="ab-card-title">${L === 'zh' ? '技能' : 'Skills'}</h2>
            <p>${skillsHtml}</p>
          </div>
        </div>
      </div>
    </div>`;

  showSubView();
  document.body.style.backgroundColor = '#f7f3ed';
  if (typeof updateSEO === 'function') updateSEO(
    L === 'zh' ? '关于 - ' + p.name.zh : 'About - ' + p.name.en,
    p.about[0][L].replace(/<[^>]*>/g, '').substring(0, 160)
  );
}

/* ===== 子页面骨架 ===== */
function subPageShell(contentHTML, backLabel, backHash, themeClass) {
  const lang = currentLang;
  const hashAction = backHash ? `window.location.hash='${backHash}';return false;` : `window.location.hash='';return false;`;
  return `
    <div class="sub-page">
      <div class="sub-body-wrap${themeClass ? ' sub-theme-' + themeClass : ''}">
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

/* ===== 阅读详情（粗野主义报刊风格） ===== */
function showReadingDetail(index) {
  const item = DATA.reading[index];
  if (!item) { showMainView(); return; }
  const L = currentLang;
  const c = document.getElementById('sub-view');
  if (!c) return;

  const metaLine = item.meta[L] + (item.readingTime ? ' · ' + item.readingTime : '');
  let bodyHtml = renderBody(item.body, L);
  let body = bodyHtml ? bodyHtml : '';

  let take = '';
  if (item.keyPoints && item.keyPoints.length) {
    take = '<div class="rr-box"><span class="rr-box-h">' + (L === 'zh' ? '要点' : 'KEY') + '</span>' + item.keyPoints.map(kp => '<div class="rr-box-i">' + kp[L] + '</div>').join('') + '</div>';
  }
  let src = '';
  if (item.source) {
    const url = typeof item.source === 'object' ? item.source[L] : item.source;
    src = '<div class="rr-src"><span>↗</span> <a href="' + url + '" target="_blank">' + (item.sourceLabel ? item.sourceLabel[L] : (L === 'zh' ? '来源' : 'Source')) + '</a></div>';
  }
  const relItems = (item.relatedReading || []).filter(i => i >= 0 && i < DATA.reading.length);
  let rel = '';
  if (relItems.length) {
    rel = '<hr class="rr-hr"><div class="rr-rel">' + relItems.map(i => '<a href="#reading/' + i + '">' + DATA.reading[i].title[L] + '</a>').join('') + '</div>';
  }
  const prev = index > 0 ? { h: '#reading/' + (index - 1), t: DATA.reading[index - 1].title[L] } : null;
  const next = index < DATA.reading.length - 1 ? { h: '#reading/' + (index + 1), t: DATA.reading[index + 1].title[L] } : null;
  let nav = '<div class="rr-nav">';
  nav += prev ? '<a href="' + prev.h + '"><span>←</span><span>' + prev.t + '</span></a>' : '<span></span>';
  nav += next ? '<a href="' + next.h + '" class="rr-nxt"><span>' + next.t + '</span><span>→</span></a>' : '<span></span>';
  nav += '</div>';

  c.innerHTML = `
    <div class="rr">
      <nav class="rr-bar">
        <a href="#" onclick="window.location.hash='reading';return false;">← ${L === 'zh' ? '返回' : 'Back'}</a>
        <span><button class="rr-lb${L === 'zh' ? ' on' : ''}" onclick="setLang('zh')">中</button><button class="rr-lb${L === 'en' ? ' on' : ''}" onclick="setLang('en')">EN</button></span>
      </nav>
      <div class="rr-rule"></div>
      <article class="rr-body">
        <div class="rr-hd">
          <span class="rr-tags">${item.tags.map(t => t).join(' · ')}</span>
          <h1 class="rr-t">${item.title[L]}</h1>
          <div class="rr-meta">${metaLine}</div>
        </div>
        <div class="rr-note">${item.note[L]}</div>
        ${take}
        <div class="rr-col2">
          ${body}
        </div>
        ${src}
        ${rel}
      </article>
      <div class="rr-rule"></div>
      ${nav}
    </div>`;

  showSubView();
  document.body.style.backgroundColor = '#f0ede8';
  if (typeof updateSEO === 'function') updateSEO(item.title[L], item.meta[L]);

  let pb = document.getElementById('reading-progress');
  if (!pb) { pb = document.createElement('div'); pb.id = 'reading-progress'; document.body.appendChild(pb); }
  setTimeout(function() { window.dispatchEvent(new Event('scroll')); }, 100);
}

/* ===== 项目详情（Tech 极客风） ===== */
function showProjectDetail(id) {
  const p = DATA.projects.find(pj => pj.id === id);
  if (!p) { showMainView(); return; }
  const L = currentLang;
  const c = document.getElementById('sub-view');
  if (!c) return;

  const idx = DATA.projects.findIndex(pj => pj.id === id);
  const status = p.status ? p.status[L] : (p.overline ? p.overline[L] : '');
  const period = p.period ? p.period[L] : '';
  const role = p.role ? p.role[L] : '';

  // Header
  const overlineText = p.overline ? p.overline[L] : p.title[L];
  const headerHTML = `
    <div class="pv-tech-hd">
      <div>
        <span class="t-tag"># ${escHTML(overlineText)} · ${escHTML(status)}</span>
        <h1>${p.title[L]}</h1>
      </div>
      <div class="t-meta"><span class="hl">▶</span> ${escHTML(period)}${role ? ' · ' + escHTML(role) : ''}</div>
    </div>`;

  // Description
  const descParts = p.desc[L].split(/(?<=。)/g).filter(Boolean);
  const descHTML = `
    <div class="pv-tech-desc">
      <div class="pv-tech-desc-in">
        <span class="key">$ cat README.md</span><br>
        <span class="cmt"># ${escHTML(p.title[L])}</span><br><br>
        <span class="val">${descParts.join('</span><br><span class="val">')}</span>
        ${p.challenges ? `<br><br><span class="cmt"># "${escHTML(p.challenges[L].substring(0, 60))}..."</span>` : ''}
      </div>
    </div>`;

  // Stats
  const techItems = p.tech || [];
  const stats = [
    { num: techItems[0] || '—', lbl: L === 'zh' ? '主要技术' : 'Primary Tech' },
    { num: period.match(/\d{4}/) ? period.match(/\d{4}/)[0] : '—', lbl: L === 'zh' ? '年份' : 'Year' },
    { num: role || '—', lbl: L === 'zh' ? '角色' : 'Role' },
    { num: techItems[1] || techItems[0] || '—', lbl: L === 'zh' ? '技术栈' : 'Stack' }
  ];
  const statsHTML = `<div class="pv-tech-stats">${stats.map(s =>
    `<div class="pv-tech-stat"><div class="num">${escHTML(s.num)}</div><div class="lbl">${s.lbl}</div></div>`
  ).join('')}</div>`;

  // Timeline
  let tlHTML = '';
  if (p.timeline && p.timeline[L]) {
    const steps = p.timeline[L].split(' → ').map(s => s.trim());
    tlHTML = `<div class="pv-tech-tl"><div class="tl-h">timeline</div>${steps.map(s =>
      `<div class="tl-row"><span class="tl-dot"></span><span class="tl-text">${escHTML(s)}</span></div>`
    ).join('')}</div>`;
  }

  // Learnings
  let lnHTML = '';
  if (p.learnings && p.learnings[L] && p.learnings[L].length) {
    lnHTML = `<div class="pv-tech-ln"><div class="ln-h">learnings</div>${p.learnings[L].map(x =>
      `<div class="ln-item">${x}</div>`
    ).join('')}</div>`;
  }

  // Challenges
  let chHTML = '';
  if (p.challenges && p.challenges[L]) {
    chHTML = `<div class="pv-tech-ch"><div class="ch-h">challenges</div><p>${p.challenges[L]}</p></div>`;
  }

  // Tags
  const tagsHTML = `<div class="pv-tech-tags">${p.tech.map(t =>
    `<span class="pv-tech-tag">${escHTML(t.toLowerCase())}</span>`
  ).join('')}</div>`;

  // Nav
  const prev = idx > 0 ? DATA.projects[idx - 1] : null;
  const next = idx < DATA.projects.length - 1 ? DATA.projects[idx + 1] : null;
  let navHTML = '<div class="pv-tech-nav">';
  navHTML += prev
    ? `<a href="#project/${prev.id}"><small>← ${L === 'zh' ? '上一篇' : 'Previous'}</small>${prev.title[L]}</a>`
    : '<span></span>';
  navHTML += next
    ? `<a href="#project/${next.id}" class="nav-r"><small>${L === 'zh' ? '下一篇' : 'Next'} →</small>${next.title[L]}</a>`
    : '<span></span>';
  navHTML += '</div>';

  c.innerHTML = `
    <div class="pv-tech">
      <div class="pv-tech-bar">
        <a href="#" onclick="window.location.hash='archive';return false;" class="back"><span class="arrow">←</span> ${L === 'zh' ? '返回' : 'Back'}</a>
        <div class="path"><span class="un">junhui</span>:~/projects/${escHTML(p.id)}</div>
      </div>
      <div class="pv-tech-body">
        ${headerHTML}
        ${descHTML}
        ${statsHTML}
        ${tlHTML}
        ${lnHTML ? `<div>${lnHTML}</div>` : '<div></div>'}
        ${chHTML ? `<div>${chHTML}</div>` : '<div></div>'}
        ${tagsHTML}
        ${navHTML}
      </div>
    </div>`;

  showSubView();
  document.body.style.overflow = '';
  if (typeof updateSEO === 'function') updateSEO(p.title[L], p.desc[L].replace(/<[^>]*>/g, ''));
}

/* ===== 创作详情（暗色诗廊） ===== */
function showCreativeDetail(index) {
  const item = DATA.creative[index];
  if (!item) { showMainView(); return; }
  const L = currentLang;
  const c = document.getElementById('sub-view');
  if (!c) return;

  const dateStr = item.date ? (typeof item.date === 'object' ? item.date[L] : item.date) : '';
  const metaLine = [item.genre[L], dateStr, item.readingTime].filter(Boolean).join(' · ');

  const prev = index > 0 ? { h: '#creative/' + (index - 1), t: DATA.creative[index - 1].title[L] } : null;
  const next = index < DATA.creative.length - 1 ? { h: '#creative/' + (index + 1), t: DATA.creative[index + 1].title[L] } : null;
  let nav = '<div class="cr-nav"><div class="cr-nav-in">';
  nav += prev ? '<a href="' + prev.h + '" class="cr-nb"><span>←</span><span>' + prev.t + '</span></a>' : '<span></span>';
  nav += next ? '<a href="' + next.h + '" class="cr-nb cr-nb-r"><span>' + next.t + '</span><span>→</span></a>' : '<span></span>';
  nav += '</div></div>';

  c.innerHTML = `
    <div class="cr-page">
      <div class="cr-bar">
        <a href="#" onclick="window.location.hash='creative';return false;">← ${L === 'zh' ? '返回' : 'Back'}</a>
        <span><button class="cr-lb${L === 'zh' ? ' on' : ''}" onclick="setLang('zh')">中</button><button class="cr-lb${L === 'en' ? ' on' : ''}" onclick="setLang('en')">EN</button></span>
      </div>
      <article class="cr">
        <div class="cr-label">${item.genre[L]}</div>
        <h1 class="cr-t">${item.title[L]}</h1>
        <div class="cr-meta">${metaLine}</div>
        <div class="cr-diamond">◇</div>
        <div class="cr-body">${item.excerpt[L]}</div>
        <div class="cr-diamond">◇</div>
      </article>
      ${nav}
    </div>`;

  showSubView();
  document.body.style.backgroundColor = '#121212';
  if (typeof updateSEO === 'function') updateSEO(item.title[L], item.excerpt[L].replace(/<[^>]*>/g, ''));
}

/* ===== 笔记全文（终端 cat 风格 — 与博客一致） ===== */
function showNoteDetail(index) {
  const note = DATA.notebook[index];
  if (!note) { showMainView(); return; }
  const L = currentLang;
  const c = document.getElementById('sub-view');
  if (!c) return;

  const dateStr = typeof note.date === 'object' ? note.date[L] : note.date;
  const metaLine = dateStr + (note.readingTime ? ' · ' + note.readingTime : '');

  let bodyHtml = renderBody(note.body, L);
  let body = bodyHtml || '<p>' + note.desc[L] + '</p>';

  let concepts = '';
  if (note.concepts && note.concepts.length) {
    concepts = '<div class="nc-box"><div class="nc-box-h"># ' + (L === 'zh' ? '关键概念' : 'Key Concepts') + '</div>' + note.concepts.map(c => '<div class="nc-box-i">▹ ' + c[L] + '</div>').join('') + '</div>';
  }

  const prev = index > 0 ? { h: '#notebook/' + (index - 1), t: DATA.notebook[index - 1].title[L] } : null;
  const next = index < DATA.notebook.length - 1 ? { h: '#notebook/' + (index + 1), t: DATA.notebook[index + 1].title[L] } : null;
  let nav = '<div class="nc-nav">';
  nav += prev ? '<a href="' + prev.h + '" class="nc-nb"><span>←</span><span>' + prev.t + '</span></a>' : '<span></span>';
  nav += next ? '<a href="' + next.h + '" class="nc-nb nc-nb-r"><span>' + next.t + '</span><span>→</span></a>' : '<span></span>';
  nav += '</div>';

  c.innerHTML = `
    <div class="nc">
      <nav class="nc-nav">
        <a href="#" onclick="window.location.hash='blog';return false;">← ${L === 'zh' ? '返回列表' : 'Back'}</a>
        <span><button class="nc-lb${L === 'zh' ? ' on' : ''}" onclick="setLang('zh')">中</button><button class="nc-lb${L === 'en' ? ' on' : ''}" onclick="setLang('en')">EN</button></span>
      </nav>
      <div class="nc-prompt">
        <span class="nc-user">visitor@learn</span>
        <span class="nc-colon">:</span>
        <span class="nc-path">~/notes</span>
        <span class="nc-dollar">$</span>
        <span class="nc-cmd">cat ${note.title[L].toLowerCase().replace(/[^a-z0-9]/g,'-')}.md</span>
      </div>
      <div class="nc-meta">
        <span># ${note.tag}</span>
        <span>${metaLine}</span>
      </div>
      <div class="nc-body">${body}</div>
      ${concepts}
      <div class="nc-sep">─── ${L === 'zh' ? '文件结束' : 'EOF'} ───</div>
      ${nav}
    </div>`;

  showSubView();
  document.body.style.backgroundColor = '#0d0d0d';
  if (typeof updateSEO === 'function') updateSEO(note.title[L], note.desc[L]);
}

/* ===== 归档页（Dark Minimal 极简风） ===== */
function showArchive() {
  const L = currentLang;
  const c = document.getElementById('sub-view');
  if (!c) return;

  const total = DATA.projects.length + DATA.miniProjects.length;
  const countLabel = L === 'zh' ? total + ' 个项目' : total + ' projects';

  // Group projects by year
  const groups = {};
  DATA.projects.forEach(p => {
    const periodStr = p.period ? (p.period[L] || p.period.en || '') : '';
    const m = periodStr.match(/(\d{4})/);
    const year = m ? m[1] : '';
    if (!groups[year]) groups[year] = [];
    groups[year].push(p);
  });
  const sortedYears = Object.keys(groups).sort((a, b) => b.localeCompare(a));

  const projectRows = sortedYears.map(year =>
    groups[year].map(p =>
      `<a href="#project/${p.id}" class="ar-item">
        <div class="ar-yr">'${year.slice(2)}</div>
        <div>
          <div class="ar-t">${p.title[L]}</div>
          <div class="ar-d">${p.desc[L]}</div>
          <div class="ar-ts">${p.tech.map(t => `<span>${escHTML(t)}</span>`).join('')}</div>
        </div>
      </a>`
    ).join('')
  ).join('');

  const miniRows = DATA.miniProjects.length
    ? `<div class="ar-mini">
        <div class="ar-mini-hd">${L === 'zh' ? '小项目' : 'Side Builds'}</div>
        <div class="ar-mini-grid">
          ${DATA.miniProjects.map((m, i) =>
            `<div class="ar-mini-card">
              <div class="m-num">${String(i + 1).padStart(2, '0')}</div>
              <h3>${m.title[L]}</h3>
              <p>${m.desc[L]}</p>
            </div>`
          ).join('')}
        </div>
      </div>`
    : '';

  c.innerHTML = `
    <div class="ar-wrap">
      <div class="ar-bar">
        <a href="#" onclick="window.location.hash='';return false;" class="back"><span class="arrow">←</span> ${L === 'zh' ? '返回' : 'Back'}</a>
        <span>Archive</span>
      </div>
      <div class="ar-body">
        <div class="ar-head">
          <div class="ar-count">${String(total).padStart(2, '0')}</div>
          <div class="ar-label">${countLabel}</div>
        </div>
        ${projectRows}
        ${miniRows}
        <div class="ar-foot">${DATA.projects.length} ${L === 'zh' ? '个项目' : 'projects'} · ${DATA.miniProjects.length} ${L === 'zh' ? '个小项目' : 'side builds'}</div>
      </div>
    </div>`;

  showSubView();
  document.body.style.overflow = '';
  if (typeof updateSEO === 'function') updateSEO(
    L === 'zh' ? '全部项目' : 'All Projects',
    L === 'zh' ? '李军辉的项目档案' : "Junhui Li's project archive"
  );
}

/* ===== Resume 页面（打印文档风格） ===== */
function showResume() {
  // 重定向到新版的独立简历页面
  const lang = currentLang === 'en' ? 'en' : 'zh';
  const url = lang === 'en'
    ? (DATA.profile.resumeUrlEn || 'resume/en.html')
    : (DATA.profile.resumeUrl || 'resume/index.html');
  window.open(url, '_blank');
  // 回到主页
  window.location.hash = '';
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

/* ===== 资源推荐页（卡片目录风格） ===== */
function showResources() {
  const L = currentLang;
  const c = document.getElementById('sub-view');
  if (!c || !DATA.resources) return;
  const r = DATA.resources;

  const cats = r.categories.map(cat => {
    const items = cat.items.map(item =>
      '<a href="' + item.url + '" target="_blank" rel="noreferrer" class="rs-card">' +
        '<span class="rs-card-name">' + item.name + '</span>' +
        '<span class="rs-card-desc">' + item.desc[L] + '</span>' +
      '</a>'
    ).join('');
    return '<div class="rs-cat"><div class="rs-cat-h">' + cat.icon + ' <span>' + cat.label[L] + '</span></div><div class="rs-cat-body">' + items + '</div></div>';
  }).join('');

  c.innerHTML = `
    <div class="rs">
      <nav class="rs-bar">
        <a href="#" onclick="window.location.hash='';return false;">← ${L === 'zh' ? '返回' : 'Back'}</a>
        <span><button class="rs-lb${L === 'zh' ? ' on' : ''}" onclick="setLang('zh')">中</button><button class="rs-lb${L === 'en' ? ' on' : ''}" onclick="setLang('en')">EN</button></span>
      </nav>
      <main class="rs-body">
        <div class="rs-hd">
          <h1 class="rs-t">${r.title[L]}</h1>
          <p class="rs-desc">${r.desc[L]}</p>
        </div>
        ${cats}
      </main>
    </div>`;

  showSubView();
  document.body.style.backgroundColor = '#f5f0eb';
  if (typeof updateSEO === 'function') updateSEO(r.title[L], r.desc[L]);
}

/* ===== 标签索引页 ===== */
function showTags() {
  const L = currentLang;
  const c = document.getElementById('sub-view');
  if (!c) return;

  const taggedItems = getAllTaggedItems(L);
  const groups = {};
  taggedItems.forEach(function(item) {
    if (!groups[item.tag]) groups[item.tag] = [];
    groups[item.tag].push(item);
  });

  const sortedTags = Object.keys(groups).sort(function(a, b) {
    return groups[b].length - groups[a].length;
  });

  if (sortedTags.length === 0) {
    c.innerHTML =
      '<div class="tg">' +
        '<nav class="tg-bar">' +
          '<a href="#" onclick="window.location.hash=\'\';return false;">← ' + (L === 'zh' ? '返回' : 'Back') + '</a>' +
          '<span><button class="tg-lb' + (L === 'zh' ? ' on' : '') + '" onclick="setLang(\'zh\')">中</button><button class="tg-lb' + (L === 'en' ? ' on' : '') + '" onclick="setLang(\'en\')">EN</button></span>' +
        '</nav>' +
        '<main class="tg-body">' +
          emptyStateHTML('🏷️',
            L === 'zh' ? '还没有标签' : 'No Tags Yet',
            L === 'zh' ? '内容添加标签后会在这里展示' : 'Tags will appear here once content is tagged',
            L === 'zh' ? '返回主页' : 'Back to Home'
          ) +
        '</main>' +
      '</div>';
    showSubView();
    document.body.style.backgroundColor = '#f5f3ef';
    return;
  }

  const totalItems = taggedItems.length;
  const countLabel = L === 'zh' ? totalItems + ' 条内容' : totalItems + ' items';

  let maxCount = 0;
  sortedTags.forEach(function(tag) { if (groups[tag].length > maxCount) maxCount = groups[tag].length; });

  let cloudHtml = '<div class="tags-cloud">';
  sortedTags.forEach(function(tag) {
    const weight = Math.log(groups[tag].length + 1) / Math.log(maxCount + 1);
    const fontSize = 14 + weight * 18;
    cloudHtml += '<a href="#tag/' + encodeURIComponent(tag) + '" class="tag-cloud-item" style="font-size:' + fontSize + 'px">' +
      tag + ' <span class="count">(' + groups[tag].length + ')</span></a>';
  });
  cloudHtml += '</div>';

  // 逐标签显示内容组
  let groupsHtml = '';
  sortedTags.forEach(function(tag) {
    groupsHtml += '<div class="tag-group">' +
      '<h3 class="tag-group-title">#' + tag + ' <span class="count">(' + groups[tag].length + ')</span></h3>' +
      '<div class="tag-group-list">';
    groups[tag].forEach(function(item) {
      const typeLabel = item.type === 'reading'
        ? (L === 'zh' ? '📖 阅读' : '📖 Reading')
        : (L === 'zh' ? '📓 笔记' : '📓 Note');
      groupsHtml += '<a href="' + item.href + '" class="tag-group-item">' +
        '<span class="tag-item-type">' + typeLabel + '</span>' +
        '<span class="tag-item-title">' + item.title + '</span>' +
        '<span class="tag-item-meta">' + item.meta + '</span>' +
        '</a>';
    });
    groupsHtml += '</div></div>';
  });

  c.innerHTML =
    '<div class="tg">' +
      '<nav class="tg-bar">' +
        '<a href="#" onclick="window.location.hash=\'\';return false;">← ' + (L === 'zh' ? '返回' : 'Back') + '</a>' +
        '<span><button class="tg-lb' + (L === 'zh' ? ' on' : '') + '" onclick="setLang(\'zh\')">中</button><button class="tg-lb' + (L === 'en' ? ' on' : '') + '" onclick="setLang(\'en\')">EN</button></span>' +
      '</nav>' +
      '<main class="tg-body">' +
        '<div class="tg-hd">' +
          '<p class="sub-label">' + (L === 'zh' ? '标签' : 'Tags') + '</p>' +
          '<h1 class="sub-title">' + (L === 'zh' ? '内容标签' : 'Content Tags') + '</h1>' +
          '<p class="sub-meta-line">' + countLabel + '</p>' +
        '</div>' +
        cloudHtml +
        groupsHtml +
      '</main>' +
    '</div>';

  showSubView();
  document.body.style.backgroundColor = '#f5f3ef';
  if (typeof updateSEO === 'function') updateSEO(
    L === 'zh' ? '内容标签' : 'Content Tags',
    L === 'zh' ? '按标签浏览所有内容' : 'Browse all content by tag'
  );
}

/* ===== 标签筛选页 ===== */
function showTagItems(tagName) {
  const L = currentLang;
  const c = document.getElementById('sub-view');
  if (!c) return;

  const taggedItems = getAllTaggedItems(L);
  const items = taggedItems.filter(function(item) { return item.tag === tagName; });

  if (items.length === 0) { showTags(); return; }

  const countLabel = items.length + ' ' + (L === 'zh' ? '条内容' : 'items');

  let listHtml = '<div class="tag-items-list">';
  items.forEach(function(item) {
    const typeLabel = item.type === 'reading'
      ? (L === 'zh' ? '📖 阅读' : '📖 Reading')
      : (L === 'zh' ? '📓 笔记' : '📓 Note');
    listHtml += '<a href="' + item.href + '" class="tag-item-card">' +
      '<div class="tag-item-type">' + typeLabel + '</div>' +
      '<div class="tag-item-title">' + item.title + '</div>' +
      '<div class="tag-item-meta">' + item.meta + '</div>' +
      '</a>';
  });
  listHtml += '</div>';

  const backLabel = L === 'zh' ? '← 所有标签' : '← All Tags';
  const backBtn = '<div class="ti-back-top" style="margin-top:32px">' +
    '<a href="#tags" onclick="event.preventDefault();window.location.hash=\'tags\'">' + backLabel + '</a></div>';

  c.innerHTML =
    '<div class="ti">' +
      '<nav class="ti-bar">' +
        '<a href="#" onclick="window.location.hash=\'\';return false;">← ' + (L === 'zh' ? '返回' : 'Back') + '</a>' +
        '<span><button class="ti-lb' + (L === 'zh' ? ' on' : '') + '" onclick="setLang(\'zh\')">中</button><button class="ti-lb' + (L === 'en' ? ' on' : '') + '" onclick="setLang(\'en\')">EN</button></span>' +
      '</nav>' +
      '<main class="ti-body">' +
        '<div class="ti-hd">' +
          '<p class="sub-label">' + (L === 'zh' ? '标签' : 'Tag') + '</p>' +
          '<h1 class="sub-title">#' + escHTML(tagName) + '</h1>' +
          '<p class="sub-meta-line">' + countLabel + '</p>' +
        '</div>' +
        listHtml +
        backBtn +
      '</main>' +
    '</div>';
  showSubView();
  document.body.style.backgroundColor = '#f5f3ef';
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
  const L = currentLang;
  const c = document.getElementById('sub-view');
  if (!c) return;

  const entries = DATA.notebook.map((note, i) => ({ ...note, idx: i }));
  const allTags = [...new Set(entries.map(n => n.tag).filter(t => t && t !== 'Soon'))];
  const fid = 'bf' + Date.now();

  let flt = '<div class="bf-bar"><span class="bf-dol">$</span> ls -la <span class="bf-fl">--tag</span>';
  flt += ' <span class="bf-fl on" onclick="bf(\'all\',\'' + fid + '\')">all</span>';
  allTags.forEach(t => { flt += ' <span class="bf-fl" onclick="bf(\'' + t + '\',\'' + fid + '\')">' + t + '</span>'; });
  flt += '</div>';

  window.bf = function(tag, id) {
    document.querySelectorAll('#' + id + ' .bf-fl').forEach(b => b.classList.remove('on'));
    document.querySelectorAll('#' + id + ' .bf-fl').forEach(b => { if (b.textContent === tag) b.classList.add('on'); });
    document.querySelectorAll('#bl-' + id + ' .bl-e').forEach(e => {
      e.style.display = (!tag || tag === 'all' || e.getAttribute('d-t') === tag) ? '' : 'none';
    });
  };

  const list = entries.map(n => {
    const d = typeof n.date === 'object' ? n.date[L] : n.date;
    const s = n.tag === 'Soon';
    return '<a class="bl-e' + (s ? ' bl-soon' : '') + '" href="#notebook/' + n.idx + '" d-t="' + (n.tag || '') + '">' +
      '<span class="bl-perm">' + (s ? 'lrwxr-xr-x' : '-rw-r--r--') + '</span>' +
      '<span class="bl-size">' + (n.readingTime || '--') + '</span>' +
      '<span class="bl-date">' + d + '</span>' +
      '<span class="bl-name">' + n.title[L] + '</span>' +
      '<span class="bl-tag">' + (n.tag && n.tag !== 'Soon' ? '#' + n.tag : '') + '</span>' +
      '</a>';
  }).join('');

  c.innerHTML = `
    <div class="bl">
      <nav class="bl-nav">
        <a href="#" onclick="window.location.hash='';return false;">← ${L === 'zh' ? '返回' : 'Back'}</a>
        <span><button class="bl-lb${L === 'zh' ? ' on' : ''}" onclick="setLang('zh')">中</button><button class="bl-lb${L === 'en' ? ' on' : ''}" onclick="setLang('en')">EN</button></span>
      </nav>
      <header class="bl-hd">
        <div class="bl-prompt">
          <span class="bl-user">visitor@learn</span>
          <span class="bl-colon">:</span>
          <span class="bl-path">~/notes</span>
          <span class="bl-dollar">$</span>
          <span class="bl-cmd">ls -la</span>
        </div>
      </header>
      <div id="${fid}">${flt}</div>
      <div class="bl-body" id="bl-${fid}">
        <div class="bl-hdr">
          <span class="bl-perm">permissions</span>
          <span class="bl-size">time</span>
          <span class="bl-date">date</span>
          <span class="bl-name">entry</span>
          <span class="bl-tag">tag</span>
        </div>
        ${list}
      </div>
    </div>`;

  showSubView();
  document.body.style.backgroundColor = '#0d0d0d';
  if (typeof updateSEO === 'function') updateSEO(L === 'zh' ? '学习笔记' : 'Learning Blog', L === 'zh' ? '学习笔记与博客' : "Learning blog");
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
  const L = currentLang;
  const c = document.getElementById('sub-view');
  if (!c || !DATA.research) return;
  const r = DATA.research;

  let areasHtml = '<div class="research-grid-sub">';
  r.areas.forEach(function(a) {
    areasHtml += '<div class="research-card-sub"><div class="research-icon">' + a.icon + '</div><h3>' + a.title[L] + '</h3><p>' + a.desc[L] + '</p></div>';
  });
  areasHtml += '</div>';

  c.innerHTML =
    '<div class="rh">' +
      '<nav class="rh-bar">' +
        '<a href="#" onclick="window.location.hash=\'\';return false;">← ' + (L === 'zh' ? '返回' : 'Back') + '</a>' +
        '<span><button class="rh-lb' + (L === 'zh' ? ' on' : '') + '" onclick="setLang(\'zh\')">中</button><button class="rh-lb' + (L === 'en' ? ' on' : '') + '" onclick="setLang(\'en\')">EN</button></span>' +
      '</nav>' +
      '<main class="rh-body">' +
        '<div class="rh-hd">' +
          '<p class="sub-label">' + (L === 'zh' ? '兴趣探索' : 'Exploring') + '</p>' +
          '<h1 class="sub-title">' + r.heading[L] + '</h1>' +
          '<p class="sub-meta-line">' + r.intro[L] + '</p>' +
        '</div>' +
        areasHtml +
      '</main>' +
    '</div>';
  showSubView();
  document.body.style.backgroundColor = '#f0ede8';
  if (typeof updateSEO === 'function') updateSEO(r.heading[L], r.intro[L]);
}

/* ===== 创作索引子页（文学墙 — 每个作品独立构图） ===== */
function showCreativeIndex() {
  const L = currentLang;
  const c = document.getElementById('sub-view');
  if (!c || !DATA.creative) return;

  const items = DATA.creative.map((item, i) => {
    const alt = i % 2;
    if (alt) {
      // Style B: genre bottom-right, title large, excerpt runs full
      return '<a href="#creative/' + i + '" class="cw cw-b">' +
        '<span class="cw-t">' + item.title[L] + '</span>' +
        '<span class="cw-e">' + item.excerpt[L] + '</span>' +
        '<span class="cw-g">' + item.genre[L] + '</span>' +
      '</a>';
    }
    // Style A: genre top-left, title centered, excerpt compact
    return '<a href="#creative/' + i + '" class="cw cw-a">' +
      '<span class="cw-g">' + item.genre[L] + '</span>' +
      '<span class="cw-t">' + item.title[L] + '</span>' +
      '<span class="cw-e">' + item.excerpt[L] + '</span>' +
    '</a>';
  }).join('');

  c.innerHTML = `
    <div class="cw-pg">
      <nav class="cw-bar">
        <a href="#" onclick="window.location.hash='';return false;">← ${L === 'zh' ? '返回' : 'Back'}</a>
        <span><button class="cw-lb${L === 'zh' ? ' on' : ''}" onclick="setLang('zh')">中</button><button class="cw-lb${L === 'en' ? ' on' : ''}" onclick="setLang('en')">EN</button></span>
      </nav>
      <main class="cw-body">
        <header class="cw-hd">
          <h1 class="cw-h">${L === 'zh' ? '诗歌 · 文章 · 随笔' : 'Poetry · Essays · Prose'}</h1>
          <p class="cw-sub">${L === 'zh' ? '文字记录与表达' : 'Words and expression'}</p>
        </header>
        <div class="cw-grid">${items}</div>
      </main>
    </div>`;

  showSubView();
  document.body.style.backgroundColor = '#0a0a0a';
  if (typeof updateSEO === 'function') updateSEO(L === 'zh' ? '创作 - 李军辉' : 'Creative - Junhui Li', L === 'zh' ? '李军辉的诗歌、文章与随笔' : "Junhui Li's creative writing");
}

/* ===== 课余生活子页 ===== */
function showLifePage() {
  const L = currentLang;
  const c = document.getElementById('sub-view');
  if (!c || !DATA.life) return;

  const icons = typeof FEATHER_ICONS !== 'undefined' ? FEATHER_ICONS : {};
  let itemsHtml = '<div class="life-sub-grid">';
  DATA.life.forEach(function(item) {
    const content = '<span class="life-sub-icon">' + (icons[item.icon] || item.icon) + '</span>' +
      '<div class="life-sub-label">' + item.label[L] + '</div>' +
      (item.desc ? '<div class="life-sub-desc">' + item.desc[L] + '</div>' : '') +
      (item.photo ? '<img src="' + item.photo + '" alt="' + item.label[L] + '" class="life-sub-photo" loading="lazy">' : '');
    if (item.url) {
      itemsHtml += '<a href="' + item.url + '" target="_blank" rel="noopener" class="life-sub-item life-sub-item-link">' + content + '</a>';
    } else {
      itemsHtml += '<div class="life-sub-item">' + content + '</div>';
    }
  });
  itemsHtml += '</div>';

  let lifePhotos = [];
  if (DATA.gallery && DATA.gallery.items) {
    lifePhotos = DATA.gallery.items.filter(function(i) { return i.category === 'life'; });
  }
  let photosHtml = '';
  if (lifePhotos.length) {
    photosHtml += '<div class="life-photos-section">';
    photosHtml += '<div class="life-photos-divider"></div>';
    photosHtml += '<p class="life-photos-heading">' + (L === 'zh' ? '📷 影像瞬间' : '📷 Life in Frames') + '</p>';
    photosHtml += '<div class="life-photos-grid">';
    lifePhotos.forEach(function(p, idx) {
      const title = (p.title && p.title[L]) ? p.title[L] : '';
      photosHtml += '<div class="life-photo-item" onclick="window._lifeOpenLightbox(' + idx + ')">' +
        '<img src="' + (p.thumb || p.src) + '" alt="' + title + '" loading="lazy">' +
        (title ? '<div class="life-photo-label">' + title + '</div>' : '') +
        '</div>';
    });
    photosHtml += '</div>';
    photosHtml += '<a href="#gallery" class="life-photos-more">' + (L === 'zh' ? '查看全部照片 →' : 'All Photos →') + '</a>';
    photosHtml += '</div>';

    photosHtml += '<div id="life-lightbox" class="life-lightbox-overlay" style="display:none">' +
      '<button class="gallery-lightbox-close" onclick="window._lifeCloseLightbox()" aria-label="Close">✕</button>' +
      '<button class="gallery-lightbox-nav gallery-lightbox-prev" onclick="window._lifePrevPhoto()" aria-label="Previous">‹</button>' +
      '<img id="life-lightbox-img" src="" alt="">' +
      '<button class="gallery-lightbox-nav gallery-lightbox-next" onclick="window._lifeNextPhoto()" aria-label="Next">›</button>' +
      '<div class="life-lightbox-counter" id="life-lightbox-counter"></div>' +
      '</div>';

    window._lifePhotos = lifePhotos;
    window._lifePhotoIdx = 0;
    window._lifeOpenLightbox = function(idx) {
      const lb = document.getElementById('life-lightbox');
      if (!lb) return;
      window._lifePhotoIdx = idx;
      const img = document.getElementById('life-lightbox-img');
      if (img) img.src = lifePhotos[idx].src;
      lb.style.display = 'flex';
      document.body.style.overflow = 'hidden';
      const counter = document.getElementById('life-lightbox-counter');
      if (counter) counter.textContent = (idx + 1) + ' / ' + lifePhotos.length;
    };
    window._lifeCloseLightbox = function() {
      const lb = document.getElementById('life-lightbox');
      if (lb) lb.style.display = 'none';
      document.body.style.overflow = '';
    };
    window._lifePrevPhoto = function() {
      let idx = window._lifePhotoIdx - 1;
      if (idx < 0) idx = window._lifePhotos.length - 1;
      window._lifeOpenLightbox(idx);
    };
    window._lifeNextPhoto = function() {
      let idx = window._lifePhotoIdx + 1;
      if (idx >= window._lifePhotos.length) idx = 0;
      window._lifeOpenLightbox(idx);
    };
  }

  c.innerHTML =
    '<div class="lf">' +
      '<nav class="lf-bar">' +
        '<a href="#" onclick="window.location.hash=\'\';return false;">← ' + (L === 'zh' ? '返回' : 'Back') + '</a>' +
        '<span><button class="lf-lb' + (L === 'zh' ? ' on' : '') + '" onclick="setLang(\'zh\')">中</button><button class="lf-lb' + (L === 'en' ? ' on' : '') + '" onclick="setLang(\'en\')">EN</button></span>' +
      '</nav>' +
      '<main class="lf-body">' +
        '<div class="lf-hd">' +
          '<p class="sub-label">' + (L === 'zh' ? '课余生活' : 'Life') + '</p>' +
          '<h1 class="sub-title">' + (L === 'zh' ? '足球 · 阅读 · 机器人 · 心理' : 'Football · Reading · Robotics · Mental Health') + '</h1>' +
          '<p class="sub-meta-line">' + (L === 'zh' ? '学习之外，我在做的那些事' : 'Beyond studying — what I spend time on') + '</p>' +
        '</div>' +
        itemsHtml +
        photosHtml +
      '</main>' +
    '</div>';
  showSubView();
  document.body.style.backgroundColor = '#faf7f2';
  if (typeof updateSEO === 'function') updateSEO(
    L === 'zh' ? '生活 - 李军辉' : 'Life - Junhui Li',
    L === 'zh' ? '李军辉的课余生活' : "Junhui Li's life beyond studying"
  );
}

document.addEventListener('keydown', function(e) {
  var lb = document.getElementById('life-lightbox');
  if (!lb || lb.style.display !== 'flex') return;
  if (e.key === 'Escape') window._lifeCloseLightbox();
  if (e.key === 'ArrowLeft') window._lifePrevPhoto();
  if (e.key === 'ArrowRight') window._lifeNextPhoto();
});

/* ===== 工具箱子页（工具目录风格） ===== */
function showToolboxPage() {
  const L = currentLang;
  const c = document.getElementById('sub-view');
  if (!c || !DATA.toolbox) return;
  const tb = DATA.toolbox;

  let catsHtml = '';
  tb.categories.forEach(function(cat) {
    catsHtml += '<div class="tb-cat"><h3>' + cat.label[L] + '</h3><div class="tb-items">';
    cat.items.forEach(function(item) {
      catsHtml += '<div class="tb-item"><span class="tb-item-name">' + item.name + '</span><span class="tb-item-desc">' + item.desc[L] + '</span></div>';
    });
    catsHtml += '</div></div>';
  });

  c.innerHTML =
    '<div class="tb">' +
      '<nav class="tb-bar">' +
        '<a href="#" onclick="window.location.hash=\'\';return false;">← ' + (L === 'zh' ? '返回' : 'Back') + '</a>' +
        '<span><button class="tb-lb' + (L === 'zh' ? ' on' : '') + '" onclick="setLang(\'zh\')">中</button><button class="tb-lb' + (L === 'en' ? ' on' : '') + '" onclick="setLang(\'en\')">EN</button></span>' +
      '</nav>' +
      '<main class="tb-body">' +
        '<div class="tb-hd">' +
          '<p class="sub-label">' + (L === 'zh' ? '工具箱' : 'Toolbox') + '</p>' +
          '<h1 class="sub-title">' + tb.heading[L] + '</h1>' +
          '<p class="sub-meta-line">' + (L === 'zh' ? '我在用的工具和工作流' : 'Tools and workflows I use') + '</p>' +
        '</div>' +
        catsHtml +
      '</main>' +
    '</div>';

  showSubView();
  document.body.style.backgroundColor = '#f8f6f2';
  if (typeof updateSEO === 'function') updateSEO(
    tb.heading[L],
    L === 'zh' ? '李军辉的工具箱' : "Junhui Li's toolbox"
  );
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
