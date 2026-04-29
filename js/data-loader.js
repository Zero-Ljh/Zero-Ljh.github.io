/**
 * Decap/Sveltia CMS — 异步内容加载器
 * =====================================
 * 从 /content/*.json 加载 CMS 管理的内容，合并到全局 DATA 对象。
 * data.js 提供同步回退——任何文件加载失败时，保留 data.js 的原始值。
 * 所有操作包装 try-catch，单个文件失败不影响其他文件。
 */
(function() {
  'use strict';

  var CONTENT_FILES = [
    'site', 'milestones', 'experience', 'research',
    'projects', 'now', 'creative', 'toolbox',
    'resources', 'navigation', 'reading', 'notebook', 'gallery'
  ];

  window.__DATA_READY = false;
  window.__dataReady = false;

  var LOAD_TIMEOUT = 8000;
  var loadedCount = 0;

  function safeDeepMerge(target, source, path) {
    if (!target || typeof target !== 'object') return;
    if (!source || typeof source !== 'object') return;
    var keys = Object.keys(source);
    for (var i = 0; i < keys.length; i++) {
      var k = keys[i];
      try {
        var sv = source[k];
        if (sv && typeof sv === 'object' && !Array.isArray(sv)) {
          if (!target[k] || typeof target[k] !== 'object') target[k] = {};
          safeDeepMerge(target[k], sv, path + '.' + k);
        } else {
          target[k] = sv;
        }
      } catch (e) {
        console.warn('[CMS] deepMerge error at ' + path + '.' + k + ': ' + e.message);
      }
    }
  }

  window.__dataPromise = Promise.all(
    CONTENT_FILES.map(function(name) {
      return fetch('/content/' + name + '.json')
        .then(function(res) {
          if (!res.ok) throw new Error('HTTP ' + res.status);
          return res.json();
        })
        .then(function(data) {
          if (!data || typeof data !== 'object') {
            console.warn('[CMS] ' + name + '.json: invalid data, skipping');
            return;
          }
          var keys = Object.keys(data);
          for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            try {
              if (!window.DATA) {
                console.warn('[CMS] window.DATA not ready yet for ' + name + '.json, retrying...');
                return;
              }
              if (key === 'reading' || key === 'notebook' || key === 'projects' || key === 'miniProjects' || key === 'creative' || key === 'life' || key === 'gallery') {
                window.DATA[key] = data[key];
              } else if (Array.isArray(data[key])) {
                window.DATA[key] = data[key];
              } else if (data[key] && typeof data[key] === 'object') {
                if (!window.DATA[key]) window.DATA[key] = {};
                safeDeepMerge(window.DATA[key], data[key], key);
              } else {
                window.DATA[key] = data[key];
              }
              loadedCount++;
            } catch (e) {
              console.warn('[CMS] ' + name + '.json key "' + key + '": ' + e.message);
            }
          }
        })
        .catch(function(err) {
          console.warn('[CMS] ' + name + '.json: ' + err.message + ' (using data.js fallback)');
        });
    })
  ).then(function() {
    window.__DATA_READY = true;
    window.__dataReady = true;
    window.dispatchEvent(new CustomEvent('data-ready'));
  });

  setTimeout(function() {
    if (!window.__DATA_READY) {
      console.warn('[CMS] Timeout — using data.js fallback for all content');
      window.__DATA_READY = true;
      window.__dataReady = true;
      window.dispatchEvent(new CustomEvent('data-ready'));
    }
  }, LOAD_TIMEOUT);
})();
