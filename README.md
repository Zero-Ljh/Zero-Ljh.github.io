# 李军辉 · 个人主页

武汉科技大学 · 纯前端静态个人主页。Navy + Gold 设计风格，中英双语，零依赖，GitHub Pages 自动部署。

## 文件结构

| 文件 | 作用 |
|------|------|
| `index.html` | 骨架结构 |
| `css/style.css` | 全部样式（CSS 变量驱动） |
| `js/data.js` | **内容数据源** — 改内容编辑此文件 |
| `js/i18n.js` | 中英双语切换 |
| `js/main.js` | 渲染引擎 |
| `js/router.js` | 哈希路由（子页面导航） |
| `404.html` | 自定义 404 页面 |
| `.github/workflows/` | CI/CD 自动化部署 |

## 修改内容

编辑 `js/data.js` 即可更新页面内容，无需修改 HTML。每个板块有对应的数据对象（如 `DATA.reading`、`DATA.projects`），改完后刷新浏览器即可预览。

## 本地预览

```bash
python3 -m http.server 3000
```

浏览器访问 `http://localhost:3000`。

## 部署

推送到 `main` 分支自动触发 GitHub Actions，部署到 GitHub Pages。

```bash
git push origin main
```

等待几分钟，访问 [https://zero-ljh.github.io](https://zero-ljh.github.io) 查看更新。

## 技术栈

HTML + CSS + JavaScript，无框架，无构建步骤，零外部依赖。
