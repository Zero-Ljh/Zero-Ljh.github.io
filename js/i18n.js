/**
 * 双语切换系统
 * ============
 * 语言切换时调用 renderAll() 重新渲染所有动态内容。
 * data-zh/data-en 属性仅用于 Hero、Contact、Nav logo 等静态 HTML。
 */

let currentLang = localStorage.getItem('lang') || 'zh';

function setLang(lang) {
  currentLang = lang;
  localStorage.setItem('lang', lang);
  document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';

  // 按钮高亮
  document.querySelectorAll('.lang-btn').forEach(b =>
    b.classList.toggle('active', b.id === 'lang-' + lang)
  );

  // 重新渲染全部动态内容
  if (typeof renderAll === 'function') renderAll();

  // 更新带 data-zh/data-en 的静态元素（Hero、Contact、Nav logo、footer）
  document.querySelectorAll('[data-' + lang + ']').forEach(el => {
    const text = el.getAttribute('data-' + lang);
    if (el.tagName === 'P' || el.tagName === 'H1' || el.tagName === 'H2' ||
        el.tagName === 'SPAN' || el.tagName === 'A' || el.tagName === 'BUTTON') {
      el.innerHTML = text;
    } else if (el.classList.contains('excerpt') || el.classList.contains('project-desc') ||
               el.classList.contains('note') || el.classList.contains('meta') ||
               el.classList.contains('caption')) {
      el.innerHTML = text;
    } else {
      el.textContent = text;
    }
  });
}

document.addEventListener('DOMContentLoaded', () => setLang(currentLang));
