/**
 * Decap/Sveltia CMS — 异步内容加载器
 * =====================================
 * 从 /content/*.json 加载 CMS 管理的内容，合并到全局 DATA 对象。
 * data.js 提供同步回退——任何文件加载失败时，保留 data.js 的原始值。
 */
(function() {
  'use strict';

  var CONTENT_FILES = [
    'site', 'milestones', 'experience', 'research',
    'projects', 'now', 'creative', 'toolbox',
    'resources', 'navigation', 'reading', 'notebook', 'gallery'
  ];

  window.__DATA_READY = false;
  window.__dataReady = false;  // 别名，兼容旧引用

  var LOAD_TIMEOUT = 8000;

  function deepMerge(target, source) {
    Object.keys(source).forEach(function(key) {
      if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
        if (!target[key] || typeof target[key] !== 'object') target[key] = {};
        deepMerge(target[key], source[key]);
      } else {
        target[key] = source[key];
      }
    });
  }

  window.__dataPromise = Promise.all(
    CONTENT_FILES.map(function(name) {
      return fetch('/content/' + name + '.json')
        .then(function(res) {
          if (!res.ok) throw new Error('HTTP ' + res.status + ' for ' + name);
          return res.json();
        })
        .then(function(data) {
          // 将文件中的所有 key 合并到全局 DATA
          Object.keys(data).forEach(function(key) {
            if (key === 'reading' || key === 'notebook' || key === 'projects' || key === 'miniProjects') {
              window.DATA[key] = data[key];
            } else if (typeof data[key] === 'object' && !Array.isArray(data[key])) {
              if (!window.DATA[key]) window.DATA[key] = {};
              deepMerge(window.DATA[key], data[key]);
            } else {
              window.DATA[key] = data[key];
            }
          });
        })
        .catch(function(err) {
          console.warn('[CMS Loader] ' + name + '.json: ' + err.message + ' (using data.js fallback)');
        });
    })
  ).then(function() {
    window.__DATA_READY = true;
    window.__dataReady = true;
    window.dispatchEvent(new CustomEvent('data-ready'));
  });

  // 超时保护：8 秒后无论如何触发
  setTimeout(function() {
    if (!window.__DATA_READY) {
      console.warn('[CMS Loader] Timeout — using data.js content');
      window.__DATA_READY = true;
      window.__dataReady = true;
      window.dispatchEvent(new CustomEvent('data-ready'));
    }
  }, LOAD_TIMEOUT);
})();
