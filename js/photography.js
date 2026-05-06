/**
 * Photography Portfolio — 个人摄影集
 * ================================
 * 深色极简风格，非对称网格，分类浏览
 */

/* ===== 主入口 ===== */
function showPhotography() {
  const L = currentLang;
  const c = document.getElementById('sub-view');
  if (!c) return;

  const g = DATA.gallery;
  if (!g || !g.categories || !g.items) {
    c.innerHTML = subPageShell(
      emptyStateHTML('◇',
        L === 'zh' ? '暂无照片' : 'No Photos Yet',
        L === 'zh' ? '照片集正在建设中' : 'Gallery is under construction',
        L === 'zh' ? '返回主页' : 'Back to Home'
      ),
      L === 'zh' ? '返回' : 'Back'
    );
    showSubView();
    document.body.style.backgroundColor = '#0a0a0a';
    return;
  }

  // 渲染完整页面
  const catsHTML = renderCategoryCards(g.categories, g.items, L);
  const gridHTML = renderAsymmetricGrid(g.items, L);

  c.innerHTML = `
    <div class="ph-page">
      <nav class="ph-bar">
        <a href="#" class="ph-logo" onclick="window.location.hash='';return false;">Zero.</a>
        <div class="ph-bar-actions">
          <button class="ph-lang-btn${L === 'zh' ? ' active' : ''}" onclick="setLang('zh')">中</button>
          <button class="ph-lang-btn${L === 'en' ? ' active' : ''}" onclick="setLang('en')">EN</button>
        </div>
      </nav>
      <div class="ph-hero" id="ph-hero">
        <div class="ph-hero-bg"></div>
        <div class="ph-hero-noise"></div>
        <div class="ph-hero-grid"></div>
        <div class="ph-hero-content">
          <p class="ph-hero-overline" data-en="Photography Portfolio" data-zh="摄影作品集">${L === 'zh' ? '摄影作品集' : 'Photography Portfolio'}</p>
          <h1 class="ph-hero-name">Zero<span class="dot">.</span></h1>
          <p class="ph-hero-title" data-en="Future Algorithm Engineer" data-zh="未来的算法工程师">${L === 'zh' ? '未来的算法工程师' : 'Future Algorithm Engineer'}</p>
          <a href="#photography" class="ph-hero-scroll" onclick="event.preventDefault();document.querySelector('.ph-portfolio')?.scrollIntoView({behavior:'smooth'})">
            <span data-en="Explore" data-zh="探索作品">${L === 'zh' ? '探索作品' : 'Explore'}</span>
            <div class="line"></div>
          </a>
        </div>
      </div>
      <section class="ph-portfolio">
        <div class="ph-section-header ph-fade-up">
          <p class="label" data-en="Collections" data-zh="作品集">${L === 'zh' ? '作品集' : 'Collections'}</p>
          <h2 data-en="Every frame tells a story" data-zh="每一帧，都有故事">${L === 'zh' ? '每一帧，都有故事' : 'Every frame tells a story'}</h2>
          <p class="desc" data-en="A collection of visual moments — from AI-generated art to the poetry of everyday life." data-zh="从 AI 生成的数字艺术到日常生活的诗意碎片，记录那些值得被看见的瞬间。">${L === 'zh' ? '从 AI 生成的数字艺术到日常生活的诗意碎片，记录那些值得被看见的瞬间。' : 'A collection of visual moments — from AI-generated art to the poetry of everyday life.'}</p>
        </div>
        <div class="ph-categories ph-fade-up">${catsHTML}</div>
        <div class="ph-grid" id="ph-grid">${gridHTML}</div>
      </section>
      <!-- Lightbox -->
      <div class="ph-lightbox" id="ph-lightbox" onclick="if(event.target===this)closePhotographyLightbox()">
        <button class="ph-lb-close" onclick="closePhotographyLightbox()">✕</button>
        <button class="ph-lb-nav ph-lb-prev" onclick="event.stopPropagation();prevPhoto()">‹</button>
        <img id="ph-lb-img" src="" alt="">
        <button class="ph-lb-nav ph-lb-next" onclick="event.stopPropagation();nextPhoto()">›</button>
        <span class="ph-lb-counter" id="ph-lb-counter"></span>
      </div>
    </div>`;

  showSubView();
  document.body.style.backgroundColor = '#0a0a0a';

  // 滚动动画
  initPhotoReveal();

  // 初始化灯箱数据
  initLightboxData(g.items);

  if (typeof updateSEO === 'function') updateSEO(
    L === 'zh' ? '摄影集 - Zero.' : 'Photography - Zero.',
    L === 'zh' ? 'Zero. 的摄影作品集 | AI 生成 · 旷野遐想 · 动人心弦 · 生活碎片' : "Zero.'s photography portfolio | AIGC · Wilderness · Heartstrings · Fragments"
  );
}

/* ===== 分类卡片 ===== */
function renderCategoryCards(categories, items, L) {
  return categories.map(function(cat) {
    const count = items.filter(function(i) { return i.category === cat.id; }).length;
    const coverItem = items.find(function(i) { return i.category === cat.id; });
    const hasCover = coverItem && coverItem.src;

    return '<a href="#photography/category/' + cat.id + '" class="ph-cat-card">' +
      '<div class="ph-cat-card-bg">' +
        (hasCover
          ? '<img src="' + coverItem.src + '" alt="' + cat.label[L] + '" loading="lazy">'
          : '<div class="ph-placeholder"><span class="icon">' + cat.icon + '</span></div>'
        ) +
      '</div>' +
      '<div class="ph-cat-card-content">' +
        '<span class="cat-icon">' + cat.icon + '</span>' +
        '<h3>' + escHTML(cat.label[L]) + '</h3>' +
        '<p class="cat-desc">' + escHTML(cat.desc[L]) + '</p>' +
        '<p class="cat-count">' + count + ' ' + (L === 'zh' ? '张' : 'photos') + '</p>' +
      '</div>' +
    '</a>';
  }).join('');
}

/* ===== 非对称网格 ===== */
function renderAsymmetricGrid(items, L) {
  if (!items || items.length === 0) {
    return '<div class="ph-empty">' + (L === 'zh' ? '暂无照片' : 'No photos yet') + '</div>';
  }

  return items.map(function(item, idx) {
    // 利用非对称布局类（由 nth-child 控制）
    return '<div class="ph-grid-item ph-fade-in" data-index="' + idx + '" onclick="openPhoto(' + idx + ')">' +
      '<img src="' + (item.thumb || item.src) + '" alt="' + escHTML(item.title[L]) + '" loading="lazy">' +
      '<div class="ph-grid-overlay">' +
        '<span class="num">' + String(idx + 1).padStart(2, '0') + '</span>' +
        '<span class="title">' + escHTML(item.title[L]) + '</span>' +
        '<span class="cat">' + getCategoryLabel(item.category, L) + '</span>' +
      '</div>' +
    '</div>';
  }).join('');
}

/* ===== 网格（分类视图用） ===== */
function renderCategoryGrid(items, L) {
  return items.map(function(item, idx) {
    return '<div class="ph-cat-item ph-fade-in" onclick="openPhotoFromCat(\'' + item.category + '\', ' + idx + ')">' +
      '<img src="' + (item.thumb || item.src) + '" alt="' + escHTML(item.title[L]) + '" loading="lazy">' +
      '<div class="ph-grid-overlay">' +
        '<span class="num">' + String(idx + 1).padStart(2, '0') + '</span>' +
        '<span class="title">' + escHTML(item.title[L]) + '</span>' +
      '</div>' +
    '</div>';
  }).join('');
}

/* ===== 分类详情页 ===== */
function showPhotographyCategory(catId) {
  const L = currentLang;
  const c = document.getElementById('sub-view');
  if (!c) return;

  const g = DATA.gallery;
  const cat = g.categories.find(function(c) { return c.id === catId; });
  if (!cat) { showPhotography(); return; }

  const items = g.items.filter(function(i) { return i.category === catId; });

  const gridHTML = items.length
    ? '<div class="ph-cat-grid">' + renderCategoryGrid(items, L) + '</div>'
    : emptyStateHTML(cat.icon,
        L === 'zh' ? '暂无照片' : 'No Photos',
        L === 'zh' ? '这个分类还没有照片，很快就会补充' : 'This category has no photos yet. Coming soon.',
        L === 'zh' ? '返回摄影集' : 'Back to Gallery'
      );

  c.innerHTML = `
    <div class="ph-page">
      <nav class="ph-bar">
        <a href="#" class="ph-logo" onclick="window.location.hash='';return false;">Zero.</a>
        <div class="ph-bar-actions">
          <button class="ph-lang-btn${L === 'zh' ? ' active' : ''}" onclick="setLang('zh')">中</button>
          <button class="ph-lang-btn${L === 'en' ? ' active' : ''}" onclick="setLang('en')">EN</button>
        </div>
      </nav>
      <div class="ph-cat-detail">
        <div class="ph-cat-header">
          <a href="#photography" class="back-link">
            <span>←</span>
            <span data-en="Back to Gallery" data-zh="返回摄影集">${L === 'zh' ? '返回摄影集' : 'Back to Gallery'}</span>
          </a>
          <h1>${cat.icon} ${cat.label[L]}</h1>
          <p class="cat-detail-desc">${cat.desc[L]}</p>
          <p class="cat-count" style="margin-top:12px;font-size:11px;color:rgba(255,255,255,0.25);letter-spacing:1px">
            ${items.length} ${L === 'zh' ? '张照片' : 'photos'}
          </p>
        </div>
        ${gridHTML}
      </div>
      <div class="ph-lightbox" id="ph-lightbox" onclick="if(event.target===this)closePhotographyLightbox()">
        <button class="ph-lb-close" onclick="closePhotographyLightbox()">✕</button>
        <button class="ph-lb-nav ph-lb-prev" onclick="event.stopPropagation();prevPhoto()">‹</button>
        <img id="ph-lb-img" src="" alt="">
        <button class="ph-lb-nav ph-lb-next" onclick="event.stopPropagation();nextPhoto()">›</button>
        <span class="ph-lb-counter" id="ph-lb-counter"></span>
      </div>
    </div>`;

  showSubView();
  document.body.style.backgroundColor = '#0a0a0a';
  initPhotoReveal();
  initLightboxData(items);

  if (typeof updateSEO === 'function') updateSEO(
    cat.label[L] + ' - Zero.',
    cat.desc[L]
  );
}

/* ===== 灯箱系统 ===== */
var _phItems = [];
var _phIndex = 0;

function initLightboxData(items) {
  _phItems = items || [];
  _phIndex = 0;
}

function openPhoto(idx) {
  if (!_phItems[idx]) return;
  _phIndex = idx;
  var lb = document.getElementById('ph-lightbox');
  var img = document.getElementById('ph-lb-img');
  if (!lb || !img) return;
  updateLightboxImage();
  lb.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function openPhotoFromCat(catId, idx) {
  var g = DATA.gallery;
  var items = g.items.filter(function(i) { return i.category === catId; });
  initLightboxData(items);
  openPhoto(idx);
}

function closePhotographyLightbox() {
  var lb = document.getElementById('ph-lightbox');
  if (lb) lb.classList.remove('open');
  document.body.style.overflow = '';
}

function prevPhoto() {
  if (_phIndex > 0) { _phIndex--; updateLightboxImage(); }
}

function nextPhoto() {
  if (_phIndex < _phItems.length - 1) { _phIndex++; updateLightboxImage(); }
}

function updateLightboxImage() {
  var item = _phItems[_phIndex];
  if (!item) return;
  var img = document.getElementById('ph-lb-img');
  var counter = document.getElementById('ph-lb-counter');
  if (!img || !counter) return;

  img.classList.add('ph-loading');
  img.src = item.src;
  img.alt = item.title ? (item.title[currentLang] || '') : '';
  img.onload = function() { img.classList.remove('ph-loading'); };
  counter.textContent = (_phIndex + 1) + ' / ' + _phItems.length;
}

/* ===== 滚动动画 ===== */
function initPhotoReveal() {
  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.05, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.ph-fade-in, .ph-fade-up, .ph-scale-in').forEach(function(el) {
    observer.observe(el);
  });
}

/* ===== 辅助函数 ===== */
function getCategoryLabel(catId, L) {
  var g = DATA.gallery;
  if (!g || !g.categories) return catId;
  var cat = g.categories.find(function(c) { return c.id === catId; });
  return cat ? cat.label[L] : catId;
}

/* ===== 键盘导航 ===== */
document.addEventListener('keydown', function _phKeyboard(e) {
  var lb = document.getElementById('ph-lightbox');
  if (!lb || !lb.classList.contains('open')) return;
  if (e.key === 'Escape') closePhotographyLightbox();
  if (e.key === 'ArrowLeft') prevPhoto();
  if (e.key === 'ArrowRight') nextPhoto();
});
