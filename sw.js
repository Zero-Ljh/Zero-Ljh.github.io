/* ===========================================================================
 * Service Worker — PWA 离线支持
 * 策略：Cache First（缓存优先，回退网络）
 * 版本：v20260428
 * =========================================================================== */

const CACHE_NAME = "v20260428";

const PRECACHE_LIST = [
  "/",
  "/index.html",
  "/404.html",
  "/icon.svg",
  "/css/style.css",
  "/js/data.js",
  "/js/i18n.js",
  "/js/main.js",
  "/js/router.js"
];

/* ---------------------------------------------------------------------------
 * install：预缓存关键文件
 * ---------------------------------------------------------------------------
 * 安装时一次性缓存所有关键资源。其中任何一个失败都会导致安装失败，
 * 确保首次启动时所有必要文件都已缓存在本地。
 * ------------------------------------------------------------------------- */
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        console.log("[SW] Pre-caching", PRECACHE_LIST.length, "files");
        return cache.addAll(PRECACHE_LIST);
      })
      .then(() => {
        console.log("[SW] Install complete, skipping waiting");
        return self.skipWaiting();
      })
      .catch((err) => {
        console.error("[SW] Install failed:", err);
      })
  );
});

/* ---------------------------------------------------------------------------
 * activate：清理旧缓存
 * ---------------------------------------------------------------------------
 * 遍历所有缓存，删除不在白名单中的旧版本缓存。
 * 然后立即接管所有客户端页面（claim）。
 * ------------------------------------------------------------------------- */
self.addEventListener("activate", (event) => {
  const cacheWhitelist = [CACHE_NAME];

  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((name) => {
            if (!cacheWhitelist.includes(name)) {
              console.log("[SW] Deleting old cache:", name);
              return caches.delete(name);
            }
          })
        );
      })
      .then(() => {
        console.log("[SW] Activate complete, claiming clients");
        return self.clients.claim();
      })
  );
});

/* ---------------------------------------------------------------------------
 * fetch：缓存优先，回退网络
 * ---------------------------------------------------------------------------
 * 1) 检查缓存中是否有匹配的响应
 * 2) 有 → 直接返回缓存
 * 3) 没有 → 从网络获取，成功后加入缓存（下次命中）
 * 4) 网络也失败 → 返回兜底响应（如果有）
 * ------------------------------------------------------------------------- */
self.addEventListener("fetch", (event) => {
  // 只处理 GET 请求
  if (event.request.method !== "GET") return;

  // 只处理同源请求
  if (!event.request.url.startsWith(self.location.origin)) return;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        // 缓存命中 → 直接返回
        return cachedResponse;
      }

      // 缓存未命中 → 网络请求
      return fetch(event.request)
        .then((networkResponse) => {
          // 只缓存成功的响应（状态码 200）
          if (
            networkResponse &&
            networkResponse.status === 200 &&
            networkResponse.type === "basic"
          ) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseClone);
            });
          }
          return networkResponse;
        })
        .catch(() => {
          // 网络失败 → 返回离线兜底
          console.warn("[SW] Network failed for:", event.request.url);
          // 如果是导航请求，返回 offline 页面
          if (event.request.mode === "navigate") {
            return caches.match("/");
          }
          return new Response("Offline", { status: 503 });
        });
    })
  );
});
