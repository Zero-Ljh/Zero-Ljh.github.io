# 李军辉 · 个人主页

武汉科技大学 · AI 科创实验班大一学生。纯前端静态个人主页，Navy + Gold 设计风格，中英双语，零依赖，GitHub Pages 部署。

**线上地址**：[zero-ljh.github.io](https://zero-ljh.github.io)

---

## 功能概览

| 板块 | 说明 |
|------|------|
| Hero | 状态指示器（可点击→/now）+ 座右铭 |
| About | 个人介绍 + 技能标签 + 照片 |
| Reading | 阅读记录（5 篇全文，支持双语/标签/相关阅读） |
| Experience | 团队/运动/学习 三栏经历面板 |
| Milestones | 8 步学习时间线 |
| Projects | 精选项目 + 详情页 Case Study |
| Mini Projects | 小项目卡片 |
| Now | 在读/在做/下一步 |
| Notebook | 课程笔记（含代码块+概念提炼） |
| Creative | 创作空间（古诗/文章/现代诗/随笔） |
| Life | 课余生活 + 照片墙 + 灯箱浏览 |
| Toolbox | 常用工具分类 |
| Gallery | 图片库·瀑布流+灯箱·分 AI生成/摄影/动漫/生活 |
| Resources | 学习资源推荐（B站UP主分类整理） |
| Contact | 联系表单 + 实时提交反馈 |
| Research | 兴趣探索方向（4 个） |
| **子页面** | 阅读/项目/笔记/创作全文 / 生活 / 工具箱 |
| | 归档 / 博客索引 / 简历 / 资源 / 标签 / 图库 / 兴趣探索 |
| **搜索** | Ctrl+K 全站搜索 |
| **双语** | 中/EN 一键切换，全局 data-attribute 驱动 |
| **PWA** | Service Worker 离线支持 + manifest.json |
| **CMS** | Sveltia CMS 可视化内容管理 |

---

## 文件结构

```
index.html              # HTML 骨架
css/style.css           # 全部样式（CSS 变量驱动）
js/
  data.js               # 内容数据源（唯一数据源）
  data-loader.js        # 异步加载 content/*.json（失败回退 data.js）
  i18n.js               # 中英双语切换引擎
  main.js               # 渲染引擎 + 交互 + 动效
  router.js             # 哈希路由（18 条路由 + 子页面）
content/                # CMS 管理的内容（13 个 JSON 文件）
admin/
  index.html            # Sveltia CMS 入口
  config.yml            # CMS 配置（13 个内容集合）
assets/
  images/               # 头像 + 生活照（足球/心理情景剧）
  gallery/              # 图库图片
404.html                # 自定义 404
sw.js                   # Service Worker（PWA 离线）
manifest.json           # PWA 清单
sitemap.xml             # SEO 站点地图
robots.txt              # 爬虫规则
icon.svg                # 网站图标
.github/workflows/
  deploy.yml            # 自动部署到 GitHub Pages
  ci.yml                # CI：HTML验证 + 链接检查 + JS语法
```

## 内容管理（CMS）

访问 `https://zero-ljh.github.io/admin/` → GitHub 设备码登录 → 可视化编辑所有内容。

CMS 编辑后自动提交到仓库 → GitHub Actions 自动部署 → 网站更新。

本地开发时，直接编辑 `js/data.js` 即可预览（`content/*.json` 的 fetch 在本机失败时会回退到 data.js）。

## 本地预览

```bash
python -m http.server 8080
```

浏览器访问 `http://localhost:8080`。

## 部署

推送到 `main` 分支自动部署：

```bash
git push origin main
```

## 技术栈

HTML + CSS + JavaScript，无框架，无构建步骤，零外部依赖。

Feather Icons 内联 SVG 用于少数图标（<2KB），Sveltia CMS 单文件 CDN 加载。
