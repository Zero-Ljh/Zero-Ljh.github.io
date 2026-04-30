/**
 * 星空背景 Canvas 动画
 * ======================
 * 纯 Canvas 2D 粒子系统，零依赖。
 *
 * 特性：
 * - 200-400 颗星星，随机大小/亮度/漂移
 * - 每颗星独立呼吸频率（正弦 opacity）
 * - 约 10% 的金色点缀星
 * - 流星系统：每隔 8-15 秒随机一颗
 * - 鼠标视差：极轻微偏移响应
 * - 性能保护：Page Visibility + prefers-reduced-motion
 */
function initStarfield() {
  'use strict';

  /* ---- 1. prefers-reduced-motion ---- */
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (prefersReducedMotion.matches) return;

  /* ---- 2. 创建 Canvas ---- */
  const canvas = document.createElement('canvas');
  canvas.id = 'starfield-canvas';
  canvas.style.cssText = 'position:fixed;inset:0;z-index:-1;pointer-events:none;width:100vw;height:100vh';
  document.body.insertBefore(canvas, document.body.firstChild);

  const ctx = canvas.getContext('2d');

  /* ---- 3. 尺寸管理 ---- */
  let W, H;
  function resize() {
    const dpr = window.devicePixelRatio || 1;
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.scale(dpr, dpr);
  }
  resize();

  /* ---- 4. 星星系统 ---- */
  const isMobile = W < 768;
  const STAR_COUNT = isMobile ? 200 : 400;
  const GOLD_RATIO = 0.1; // 10% 金色星
  const GOLD_COLOR = '#d4a259';

  // 星星：x, y 使用小数实现平滑漂移
  const stars = [];
  function createStars() {
    stars.length = 0;
    for (let i = 0; i < STAR_COUNT; i++) {
      const isGold = Math.random() < GOLD_RATIO;
      stars.push({
        x: Math.random() * W,
        y: Math.random() * H,
        size: isGold ? 1.5 + Math.random() * 2.5 : 0.5 + Math.random() * 2, // 金色稍大
        baseOpacity: 0.3 + Math.random() * 0.7,
        speed: 0.02 + Math.random() * 0.06,  // 垂直漂移速度
        flickerSpeed: 0.005 + Math.random() * 0.015, // 呼吸频率
        phase: Math.random() * Math.PI * 2,
        hue: isGold ? 'gold' : 'white'
      });
    }
  }
  createStars();

  /* ---- 5. 流星系统 ---- */
  const meteors = [];

  function spawnMeteor() {
    const angle = Math.PI / 4 + (Math.random() * Math.PI / 6); // 斜线 45-75度
    const speed = 6 + Math.random() * 4;
    const startX = Math.random() * W * 1.5 - W * 0.25;
    const startY = -20;
    const trailLength = 40 + Math.random() * 40;

    meteors.push({
      x: startX,
      y: startY,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      life: 1.0,
      maxLife: 1.0,
      trail: trailLength
    });
  }

  /* ---- 6. 鼠标视差 ---- */
  let mouseX = W / 2;
  let mouseY = H / 2;
  let hasMouseMoved = false;

  function onMouseMove(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    hasMouseMoved = true;
  }

  document.addEventListener('mousemove', onMouseMove, { passive: true });

  /* ---- 7. 核心渲染循环 ---- */
  let animId = null;
  let paused = false;

  // 流星调度参数
  let nextMeteorDelay = 8 + Math.random() * 7; // 8-15秒
  let meteorCountdown = nextMeteorDelay;

  function render(timestamp) {
    if (paused) return;

    // 清屏（全透明，HTML body 背景自然露出）
    ctx.clearRect(0, 0, W, H);

    /* ---- 鼠标偏移计算（不超过 5px） ---- */
    let offsetX = 0;
    let offsetY = 0;
    if (hasMouseMoved) {
      const centerX = W / 2;
      const centerY = H / 2;
      offsetX = (mouseX - centerX) * 0.02;
      offsetY = (mouseY - centerY) * 0.02;
      // 钳制在 ±5px
      offsetX = Math.max(-5, Math.min(5, offsetX));
      offsetY = Math.max(-5, Math.min(5, offsetY));
    }

    /* ---- 绘制星星 ---- */
    const time = timestamp || 0;
    for (let i = 0; i < stars.length; i++) {
      const s = stars[i];

      // 垂直漂移
      s.y += s.speed;
      if (s.y > H) {
        s.y = -2;
        s.x = Math.random() * W;
      }

      // 呼吸闪烁
      const flicker = Math.sin(time * s.flickerSpeed + s.phase);
      const opacity = s.baseOpacity + flicker * 0.3;
      const clampedOpacity = Math.max(0.05, Math.min(1, opacity));

      // 位置 + 视差偏移
      const drawX = s.x + offsetX;
      const drawY = s.y + offsetY;

      // 用 fillRect 代替 arc（快 2-3 倍）
      ctx.globalAlpha = clampedOpacity;
      if (s.hue === 'gold') {
        ctx.fillStyle = GOLD_COLOR;
      } else {
        ctx.fillStyle = '#ffffff';
      }
      ctx.fillRect(drawX, drawY, s.size, s.size);
    }

    /* ---- 流星系统 ---- */
    // 计时
    const deltaSeconds = 1 / 60; // 假设 60fps 近似
    meteorCountdown -= deltaSeconds;
    if (meteorCountdown <= 0) {
      spawnMeteor();
      nextMeteorDelay = 8 + Math.random() * 7;
      meteorCountdown = nextMeteorDelay;
    }

    // 更新和绘制流星
    ctx.globalAlpha = 1;
    for (let i = meteors.length - 1; i >= 0; i--) {
      const m = meteors[i];
      m.x += m.vx;
      m.y += m.vy;
      m.life -= 0.012;

      if (m.life <= 0) {
        meteors.splice(i, 1);
        continue;
      }

      const alpha = m.life * 0.9;
      ctx.globalAlpha = alpha;

      // 尾迹用渐变：从金色到透明
      const tailEndX = m.x - m.vx * (m.trail / m.vx);
      const tailEndY = m.y - m.vy * (m.trail / m.vy);

      const gradient = ctx.createLinearGradient(m.x, m.y, tailEndX, tailEndY);
      gradient.addColorStop(0, 'rgba(212, 162, 89, 0.9)');
      gradient.addColorStop(0.3, 'rgba(212, 162, 89, 0.5)');
      gradient.addColorStop(0.6, 'rgba(212, 162, 89, 0.15)');
      gradient.addColorStop(1, 'rgba(212, 162, 89, 0)');

      ctx.strokeStyle = gradient;
      ctx.lineWidth = 1 + m.life * 1.5;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(m.x, m.y);
      ctx.lineTo(tailEndX, tailEndY);
      ctx.stroke();

      // 流星头部亮点
      ctx.globalAlpha = alpha * 0.8;
      ctx.fillStyle = '#d4a259';
      ctx.beginPath();
      ctx.arc(m.x, m.y, 1.5 + m.life * 1.5, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.globalAlpha = 1;

    animId = requestAnimationFrame(render);
  }

  /* ---- 8. Page Visibility API ---- */
  function onVisibilityChange() {
    if (document.hidden) {
      paused = true;
      if (animId !== null) {
        cancelAnimationFrame(animId);
        animId = null;
      }
    } else {
      paused = false;
      if (animId === null) {
        animId = requestAnimationFrame(render);
      }
    }
  }
  document.addEventListener('visibilitychange', onVisibilityChange);

  /* ---- 9. Resize 监听 ---- */
  let resizeTimer;
  function onResize() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      const oldW = W;
      resize();
      // 重新分布星星避免超出
      for (let i = 0; i < stars.length; i++) {
        stars[i].x = (stars[i].x / oldW) * W;
        if (stars[i].y > H) stars[i].y = Math.random() * H;
      }
    }, 200);
  }
  window.addEventListener('resize', onResize, { passive: true });

  /* ---- 10. prefers-reduced-motion 动态变化 ---- */
  function onMotionChange(e) {
    if (e.matches) {
      // 用户切到减弱动效模式，停止动画
      paused = true;
      if (animId !== null) {
        cancelAnimationFrame(animId);
        animId = null;
      }
      canvas.remove();
      // 移除监听器
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      window.removeEventListener('resize', onResize);
    }
  }
  prefersReducedMotion.addEventListener('change', onMotionChange);

  /* ---- 启动 ---- */
  animId = requestAnimationFrame(render);
}
