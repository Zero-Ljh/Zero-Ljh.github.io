/**
 * 双语切换系统
 * ============
 * 基于 data-zh / data-en 属性的中英文切换。
 * 语言偏好存储在 localStorage 中自动恢复。
 */

let currentLang = localStorage.getItem('lang') || 'zh';

function setLang(lang) {
  currentLang = lang;
  localStorage.setItem('lang', lang);
  document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';

  // 切换按钮高亮
  document.querySelectorAll('.lang-btn').forEach(b =>
    b.classList.toggle('active', b.id === 'lang-' + lang)
  );

  // 更新所有带 data-zh/data-en 的元素
  document.querySelectorAll('[data-' + lang + ']').forEach(el => {
    const text = el.getAttribute('data-' + lang);

    // 富文本元素用 innerHTML，纯文本用 textContent
    const richElements = ['P', 'LI', 'H3', 'H2', 'SPAN', 'DIV'];
    if (richElements.includes(el.tagName) &&
        (el.classList.contains('project-desc') ||
         el.classList.contains('excerpt') ||
         el.classList.contains('note') ||
         el.classList.contains('meta') ||
         el.classList.contains('caption') ||
         el.classList.contains('reading-num') ||
         el.closest('.exp-panel'))) {
      el.innerHTML = text;
    } else if (el.tagName === 'P' || el.tagName === 'LI') {
      el.innerHTML = text;
    } else {
      el.textContent = text;
    }
  });
}

// 初始化语言
document.addEventListener('DOMContentLoaded', () => setLang(currentLang));
