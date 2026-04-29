# 李军辉 个人主页 — 技术实现方案

> 基于 [设计规约](./2026-04-28-personal-homepage-design.md) 的技术实现文档
> 参考：Brittany Chiang v4（布局结构）、SimonAKing-HomePage（纯前端 JS 数据驱动）

## 一、技术架构

### 决策清单

| 维度 | 选择 | 理由 |
|------|------|------|
| **架构** | 单页面 + Hash 路由子视图 | GitHub Pages 原生支持，零后端 |
| **技术栈** | 纯 HTML + CSS + JavaScript | 零依赖，单文件可部署 |
| **内容管理** | 分离 `data.js`（`DATA` 全局对象） | 不动 HTML/JS 即可更新内容 |
| **双语方案** | `data-zh` / `data-en` 属性 + `setLang()` | 已实现，无需额外库 |
| **子页面** | Hash 路由（`#reading/0`、`#project/xxx` 等）切换视图 | 不刷新页面，保持状态 |
| **部署** | GitHub Pages + GitHub Actions CI/CD | 自动构建、自动 HTTPS |
| **响应式** | Desktop-first + 1080px / 768px / 480px 三断点 | 兼顾宽屏、平板和移动端 |

### 文件结构

```
zero-ljh.github.io/
├── index.html                # 主入口（骨架结构 + SEO meta + JSON-LD）
├── 404.html                  # GitHub Pages 404 页面
├── sw.js                     # Service Worker（PWA 离线缓存）
├── manifest.json             # PWA Web App Manifest
├── icon.svg                  # PWA 图标
├── robots.txt                # 爬虫规则
├── sitemap.xml               # SEO Sitemap
├── README.md                 # 项目说明
├── CLAUDE.md                 # AI 辅助开发说明书
│
├── .github/
│   └── workflows/
│       ├── deploy.yml        # GitHub Pages 部署（main 分支 + 手动触发）
│       └── ci.yml            # CI 检查（HTML 验证 + 链接检查 + JS 语法）
│
├── .claude/
│   ├── settings.json         # Claude Code 配置（含 hooks 和权限）
│   ├── settings.local.json   # 本地覆盖配置
│   ├── agents/
│   │   └── code-reviewer.md  # 代码审查 Agent 说明书
│   ├── hooks/
│   │   ├── bash-firewall.js  # Bash 命令防火墙（敏感命令拦截）
│   │   ├── file-guard.js     # 文件保护（防意外修改关键文件）
│   │   ├── lint-on-edit.js   # 编辑后自动语法检查
│   │   ├── stop-verify.js    # 提交前验证检查
│   │   └── audit-log.js      # 操作审计日志
│   └── rules/
│       └── workflow.md       # 工作流规则（AI 自动加载）
│
├── css/
│   └── style.css             # 全部样式（~650 行，含响应式 + 动画）
├── js/
│   ├── data.js               # 唯一数据源（所有内容中英双语）
│   ├── i18n.js               # 双语切换系统（含浏览器语言自动检测）
│   ├── main.js               # 渲染引擎 + 滚动监听 + 动画 + GitHub API
│   └── router.js             # Hash 路由子视图管理
├── assets/
│   ├── images/               # 图片资源
│   │   ├── og-image.png      # Open Graph 分享图
│   │   └── projects/         # 项目截图（可选）
│   └── resume.pdf            # 简历下载（可选）
│
└── docs/
    └── superpowers/specs/    # 设计/技术规格说明书
```

### 为什么不选框架？

| 方案 | 优势 | 劣势 |
|------|------|------|
| **纯 HTML/CSS/JS**（本方案） | 零依赖，秒开，GitHub Pages 原生，Vibe Coding 作业要求 | 手动管理稍多 |
| React/Gatsby（Brittany 方案） | 组件化 | 需要构建步骤，作业要求纯前端 |
| Jekyll（学术方案） | 内容管理方便 | Ruby 环境，构建步骤 |
| Vue/Vite | 开发体验好 | 需要打包，偏离零依赖要求 |

### CI/CD 自动化

两个 GitHub Actions 工作流：

| 工作流 | 触发时机 | 作用 |
|--------|---------|------|
| `deploy.yml` | 推送到 `main` + 手动触发 | 构建并部署到 GitHub Pages |
| `ci.yml` | 推送、PR、每天凌晨定时 | HTML 验证 + 链接检查 + JS 语法检查 |

工作流共享通过 `actions/upload-pages-artifact` 生成的 artifact，由 `actions/deploy-pages` 负责部署到 Pages 环境。

---

## 二、核心系统设计

### 2.1 双语系统（i18n.js）

```
data-zh + data-en 属性 → setLang(lang) 切换 → 全局重新渲染
```

**实现要点：**
- 每个需要翻译的元素标记 `data-zh="中文" data-en="English"`
- `setLang('zh'/'en')` 切换 `document.documentElement.lang`，页面无闪烁重新渲染
- 标题类用 `textContent` 赋值，段落/列表用 `innerHTML` 支持富文本
- 导航、按钮等 UI 文本统一放在 `data.js` 的 `DATA.i18n` 对象中
- 语言偏好存储到 `localStorage`，下次访问自动恢复
- **浏览器自动检测**：首次访问时通过 `navigator.language` 自动判断语言

### 2.2 内容数据系统（data.js）

**数据对象名：`DATA`**（不是 `SITE_DATA`）

结构化数据对象，方便未来改动内容无需碰 HTML：

```javascript
const DATA = {
  /* ===== 个人信息 ===== */
  profile: {
    name: { zh: '李军辉', en: 'Junhui Li' },
    about: [ /* 多段介绍，支持 HTML */ ],
    highlight: { zh: '...', en: '...' },
    seeking: { zh: '🔬 寻找 AI/机器人方向的课题组...', en: '...' },
    skills: [
      { name: 'Python', level: 70 },
      { name: 'C++', level: 50 },
      { name: 'Vibe Coding', level: 65 },
      // 支持 label 字段标记学习中
    ],
    resumeUrl: '...',
    githubUsername: 'Zero-Ljh'
  },

  /* ===== 实验经历（时间线） ===== */
  experience: {
    panels: [ /* date/title/items 中英双语，支持 sub 子项 */ ]
  },

  /* ===== 荣誉 ===== */
  honors: [ { num: '...', label: { zh, en } } ],

  /* ===== 阅读记录 ===== */
  reading: [ /* title/meta/note/tags, 支持 keyPoints/source/relatedReading */ ],

  /* ===== 研究方向 ===== */
  research: {
    heading: { zh, en },
    intro: { zh, en },
    areas: [ /* icon/title/desc */ ]
  },

  /* ===== 项目 ===== */
  projects: [ /* id/overline/title/desc/tech/links/learnings/challenges/timeline/image */ ],

  /* ===== 小项目 ===== */
  miniProjects: [ /* icon/title/desc/tech */ ],

  /* ===== Now 页面 ===== */
  now: {
    heading: { zh, en },
    columns: [ /* label/items */ ]
  },

  /* ===== 笔记 ===== */
  notebook: [ /* date/title/desc/tag/readingTime/concepts */ ],

  /* ===== 创作 ===== */
  creative: [ /* genre/title/excerpt/date/readingTime */ ],

  /* ===== 课余生活 ===== */
  life: [ /* icon/label */ ],

  /* ===== 快速概览 Stats ===== */
  stats: [ /* number/label */ ],

  /* ===== 工具集 ===== */
  toolbox: {
    categories: [ /* label/items */ ]
  },

  /* ===== 教育信息 ===== */
  education: { /* degree/school/period/description/courses */ },

  /* ===== UI 文字 ===== */
  i18n: {
    nav: { /* items/dropdown/resumeBtn/moreBtn/logo */ }
  }
};
```

### 2.3 渲染引擎（main.js）

渲染流程：`renderAll()` 依次调用各板块渲染函数。

```
renderAll()
  ├── renderNav()         → 桌面/移动端导航栏 + 下拉菜单 + 简历按钮
  ├── renderAbout()       → 个人介绍 + 技能进度条（动画）
  ├── renderStats()       → 数字动画
  ├── renderReading()     → 阅读列表
  ├── renderExperience()  → 时间线面板
  ├── renderHonors()      → 荣誉卡片 + 数字递增动画
  ├── renderResearch()    → 研究兴趣卡片
  ├── renderProjects()    → 项目卡片 + 标签筛选栏
  ├── renderMiniProjects()→ 小项目网格
  ├── renderNow()         → 三栏布局
  ├── renderNotebook()    → 笔记网格
  ├── renderCreative()    → 创作卡片
  ├── renderLife()        → 生活图标网格
  ├── renderToolbox()     → 工具分类
  └── fetchGitHubRepos()  → GitHub API 获取仓库（带 localStorage 缓存）
```

其他系统：
- **技能条动画**：DOM 渲染后 `setTimeout` 触发 `.visible`
- **数字递增动画**：`IntersectionObserver` 进入视口后启动
- **Scroll Reveal**：全局 `IntersectionObserver`，`.visible` 类触发 CSS 动画（支持上移/左移/右移/缩放四种方向）
- **导航栏**：滚动缩放 + 隐藏/显示 + Section 高亮
- **DropDown 菜单**：点击切换 + 外部点击关闭
- **Mobile Menu**：汉堡按钮 + 焦点陷阱 + Escape 关闭 + `aria-expanded`
- **Hero 入场**：Staggered Entry（错位淡入上移）
- **回到顶部按钮**：滚动 >400px 显示
- **阅读进度条**：顶部金色进度条
- **SEO 动态更新**：`updateSEO()` 在子页面切换时更新 title/meta
- **Loader**：菱形脉冲动画，最少显示 1.5 秒，sessionStorage 防重复，5 秒安全兜底

### 2.4 子视图系统（router.js）

Hash 路由实现子页面，不刷新：

| Hash | 视图 | 内容来源 |
|------|------|---------|
| 无 hash 或 `#home` | 主页面（默认） | index.html 主体 |
| `#板块名` | 滚动到对应板块 | 主页面内锚点 |
| `#reading/数字` | 阅读详情 | data.js reading |
| `#project/项目id` | 项目详情 | data.js projects |
| `#creative/数字` | 创作全文 | data.js creative |
| `#notebook/数字` | 笔记全文 | data.js notebook |
| `#archive` | 项目归档页 | data.js projects + miniProjects |
| `#blog` | 博客/笔记索引页 | data.js notebook（含标签筛选） |
| `#resume` | 简历页 | data.js profile + experience + education |

**子页面特性：**
- 切换时 `View Transitions`：主页面 fade out，子页面 fade in（CSS `opacity` + `transition` 实现）
- 子页面背景切换为暖白色 `#f6f3ef`
- 统一骨架：`subPageShell()` 生成 header + back button + 分享按钮
- 导航辅助：`subNavHTML()` 生成上/下一篇链接
- 分享功能：`copyPageLink()` 复制当前 URL
- 子页面卸载时自动清理内容，恢复 SEO
- **404 行为**：无效 index 自动返回主视图

---

## 三、样式架构

### 3.1 CSS 变量体系（当前真实值）

```css
:root {
  /* 颜色 */
  --navy: #0a192f;
  --dark-navy: #020c1b;
  --light-navy: #112240;
  --gold: #d4a259;
  --gold-dim: rgba(212, 162, 89, 0.1);
  --gold-glow: rgba(212, 162, 89, 0.04);
  --slate: #8892b0;
  --light-slate: #ccd6f6;
  --warm-white: #e6f1ff;
  --dark-slate: #495670;

  /* 字体 */
  --font-display: 'Playfair Display', Georgia, serif;
  --font-sans: 'Outfit', 'Noto Sans SC', -apple-system, sans-serif;
  --font-mono: 'JetBrains Mono', 'SF Mono', 'Fira Code', monospace;
  --font-serif: 'Noto Serif SC', Georgia, serif;

  /* 尺寸 */
  --nav-h: 80px;
  --nav-h-scroll: 64px;
  --fz-sm: 13px;
  --fz-md: 15px;
  --fz-lg: 17px;
  --radius: 4px;

  /* 动效 */
  --easing: cubic-bezier(0.645, 0.045, 0.355, 1);
  --transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
  --transition-fast: all 0.25s var(--easing);
}
```

### 3.2 响应式断点（当前真实值）

| 断点 | 目标设备 | 调整内容 |
|------|---------|---------|
| ≥1081px | 桌面 | 标准布局，侧边栏显示 |
| ≤1080px | 平板及以下 | 隐藏左右侧边栏 |
| ≤768px | 手机横屏 | 缩小间距，汉堡菜单，缩小字体，单列布局 |
| ≤480px | 小屏手机 | 进一步缩小间距和字体 |
| 打印 `@media print` | 打印 | 隐藏导航/侧栏/动画 |

### 3.3 设计细节

- **Grain Overlay**：SVG fractal noise 固定叠加层，营造纸张质感
- **装饰性径向渐变**：固定背景金色光晕
- **自定义滚动条**：匹配 Navy 配色
- **Focus 样式**：金色虚线 `:focus-visible`，无障碍友好
- **动画尊重用户偏好**：`@media (prefers-reduced-motion: reduce)` 关闭所有动画

---

## 四、动效系统

| 动效 | 实现方式 | 说明 |
|------|---------|------|
| **Scroll Reveal** | `IntersectionObserver` + CSS `.visible` | 支持从下/左/右/缩放四种方向入场 |
| **Hero Staggered Entry** | JS 错位 `setTimeout` | 文字元素依次淡入上移 |
| **Loading Pulse** | CSS `@keyframes loaderPulse` | 菱形 ◇ 缩放脉冲动画 |
| **CTA 呼吸脉冲** | CSS `@keyframes pulse` | 按钮 `box-shadow` 金色呼吸效果 |
| **导航缩放** | JS scroll 监听 + class 切换 | 80px → 64px 高度过渡 |
| **导航隐藏/显示** | 滚动方向检测 | 下滚隐藏，上滚显示 |
| **Section 高亮** | scroll 监听计算偏移 | 当前 section 导航文字变金色 |
| **技能进度条** | CSS `--target` 变量 + `setTimeout` 触发 | 进入页面后从 0 到目标宽度过渡 |
| **数字递增** | `IntersectionObserver` + `requestAnimationFrame` | Stats/Honors 数字递增效果 |
| **Card Hover** | CSS `transition` + `transform` | 纯 GPU 加速的悬浮效果 |
| **Gold Glow** | CSS `box-shadow` + `border` | 金色边框 hover 发光 |
| **View Transitions** | CSS `opacity` + `transition` | 主视图 ↔ 子视图 fade 切换 |
| **子页面上/下篇导航** | Hash 路由 + prev/next 计算 | 阅读/项目/创作/笔记 均支持 |
| **阅读进度条** | scroll 事件驱动 | 顶部固定金色进度条 |
| **回到顶部按钮** | scroll 显示/隐藏 | 滚动 >400px 出现 |

---

## 五、性能目标

| 指标 | 目标 | 实现方式 |
|------|------|---------|
| Lighthouse 性能 | ≥95 | 零依赖、无渲染阻塞资源 |
| 首屏加载 | <1s | 内联关键 CSS，异步加载非关键 |
| 总包体积 | <150KB | 纯文本，无框架 |
| 图片 | 渐进式 | 懒加载（计划中） |

---

## 六、内容板块

当前共有 **18 个板块**，全部由 `data.js` 数据驱动：

| # | 板块 | section id | 渲染函数 | 子页面 |
|---|------|-----------|---------|--------|
| 1 | **Hero** | 无（固定在 main 入口） | 直接写在 index.html | 无 |
| 2 | **About** | `#about` | `renderAbout()` | 无 |
| 3 | **Stats** | `#stats` | `renderStats()` | 无 |
| 4 | **Reading** | `#reading` | `renderReading()` | `#reading/n` — 详情页 |
| 5 | **Experience** | `#experience` | `renderExperience()` — 时间线布局 | 无 |
| 6 | **Honors** | 无 | `renderHonors()` — 数字动画卡片 | 无 |
| 7 | **Research** | `#research` | `renderResearch()` — 研究方向卡片 | 无 |
| 8 | **Projects** | `#projects` | `renderProjects()` — 带标签筛选 | `#project/id` — 详情页 |
| 9 | **Mini Projects** | `#other-projects` | `renderMiniProjects()` | 无 |
| 10 | **GitHub Repos** | 无 | `fetchGitHubRepos()` — API 拉取 | 无 |
| 11 | **Now** | `#now` | `renderNow()` — 三栏 | 无 |
| 12 | **Notebook** | `#notebook` | `renderNotebook()` | `#notebook/n` — 详情页 |
| 13 | **Creative** | `#creative` | `renderCreative()` | `#creative/n` — 全文页 |
| 14 | **Life** | `#life` | `renderLife()` — 图标网格 | 无 |
| 15 | **Toolbox** | `#toolbox` | `renderToolbox()` — 分类展示 | 无 |
| 16 | **Contact** | `#contact` | 联系表单 + CTA | 无 |
| 17 | **Footer** | 无 | 社交链接 + 版权 | 无 |
| 18 | **子页面** | 无（#sub-view） | 路由渲染 | `#archive` / `#blog` / `#resume` |

---

## 七、新增系统

### 7.1 PWA（渐进式 Web 应用）

- **Service Worker**（`sw.js`）: 生产环境自动注册，本地开发跳过
- **Manifest**（`manifest.json`）: 应用名称、图标、主题色 `#0a192f`
- **图标**（`icon.svg`）: SVG 格式 PWA 图标

### 7.2 SEO

- **JSON-LD 结构化数据**：`Person` 和 `WebSite` 两种 Schema，含中英文声明
- **Open Graph**：og:title、og:description、og:image 完备
- **Twitter Card**：summary_large_image
- **Sitemap**（`sitemap.xml`）: 搜索引擎收录
- **Hreflang**：`zh-CN` / `en` / `x-default` 语言声明
- **Robots**（`robots.txt`）: 爬虫规则
- **动态更新**：子页面切换时 `updateSEO()` 更新 title 和 meta

### 7.3 无障碍（Accessibility）

- `skip-to-content` 链接
- `aria-live="polite"` 子视图区域
- `aria-pressed` 筛选按钮状态
- `aria-expanded` 汉堡菜单状态
- `aria-label` 所有图标按钮均有文字标签
- `aria-modal="true"` 移动端菜单
- 焦点陷阱（Mobile Menu 的 Tab 循环）
- `:focus-visible` 自定义焦点样式
- `prefers-reduced-motion` 动画关闭
- `role="status"` 加载状态
- 语义化 HTML（nav, section, footer 等）

### 7.4 Hooks 系统（Claude Code 辅助开发）

| Hook | 文件 | 作用 |
|------|------|------|
| Bash 防火墙 | `bash-firewall.js` | 拦截危险命令（git push --force 等） |
| 文件保护 | `file-guard.js` | 保护关键文件不被意外修改 |
| Lint 检查 | `lint-on-edit.js` | 编辑后自动 HTML/JS/CSS 语法验证 |
| 提交验证 | `stop-verify.js` | 提交前运行检查清单 |
| 审计日志 | `audit-log.js` | 记录操作日志到 `.claude/audit.log` |

### 7.5 GitHub 仓库缓存

- `localStorage` 缓存 GitHub API 结果（1 小时 TTL）
- API 失败时使用过期缓存兜底
- 防止 API 限流

---

## 八、部署流程

```bash
# 1. 推送到 main 分支
git push origin main

# 2. GitHub Actions 自动触发
# deploy.yml 工作流：
#   构建 → 上传 artifact → 部署到 GitHub Pages

# 3. 等待 2-3 分钟
# 访问 https://zero-ljh.github.io

# 手动触发部署：
# GitHub → Actions → Deploy to GitHub Pages → Run workflow
```

---

## 九、后续扩展

| 功能 | 预计时间 | 备注 |
|------|---------|------|
| 搜索/标签筛选增强 | 规划中 | 笔记和阅读区跨页面搜索 |
| 日/夜模式 | 规划中 | 是否必要待评估 |
| 自定义域名 | 规划中 | zero1.life 等 |
| 访客统计 | 规划中 | 极简方案 |
