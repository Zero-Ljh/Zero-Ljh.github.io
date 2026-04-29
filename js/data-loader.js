/**
 * CMS 异步内容加载器（简化版）
 * ==============================
 * 从 /content/*.json 加载 CMS 内容，直接替换 DATA 对应字段。
 * data.js 提供同步回退。所有文件加载完成后触发 data-ready 事件。
 */
(function() {
  'use strict';

  var FILES = [
    'site', 'milestones', 'experience', 'research',
    'projects', 'now', 'creative', 'toolbox',
    'resources', 'navigation', 'reading', 'notebook', 'gallery'
  ];

  window.__DATA_READY = false;
  window.__dataReady = false;

  function loadFile(name) {
    return fetch('/content/' + name + '.json')
      .then(function(res) {
        if (!res.ok) throw new Error('HTTP ' + res.status);
        return res.json();
      })
      .then(function(data) {
        if (!data) return;
        var keys = Object.keys(data);
        for (var i = 0; i < keys.length; i++) {
          window.DATA[keys[i]] = data[keys[i]];
        }
      })
      .catch(function(err) {
        console.warn('[CMS] ' + name + '.json: ' + err.message);
      });
  }

  window.__dataPromise = Promise.all(FILES.map(loadFile)).then(function() {
    window.__DATA_READY = true;
    window.__dataReady = true;
    window.dispatchEvent(new CustomEvent('data-ready'));
  });

  setTimeout(function() {
    if (!window.__DATA_READY) {
      window.__DATA_READY = true;
      window.__dataReady = true;
      window.dispatchEvent(new CustomEvent('data-ready'));
    }
  }, 8000);
})();
