# 李军辉 个人主页

## 项目概述

纯 HTML/CSS/JS 静态个人主页，部署于 GitHub Pages。
Navy + Gold 设计风格，中英双语，零依赖。

## 技术栈

- 纯前端：HTML + CSS + JavaScript
- 无框架，无构建步骤，零依赖
- 部署：GitHub Pages (`Zero-Ljh.github.io`)

## 文件结构

| 文件 | 作用 |
|------|------|
| `index.html` | 骨架结构（只有容器和静态内容） |
| `css/style.css` | 全部样式 + CSS 变量 |
| `js/data.js` | **内容数据**（同步回退，本地开发直接编此文件） |
| `js/data-loader.js` | 异步加载 `content/*.json`（CMS 数据源优先，失败回退 data.js） |
| `js/i18n.js` | 中英双语切换（`setLang()` 驱动 `renderAll()`） |
| `js/main.js` | 渲染引擎（~20 个 render 函数） |
| `js/router.js` | 哈希路由（14 条路由 + 子页面骨架 + 灯箱） |
| `content/*.json` | CMS 管理的内容数据（13 个 JSON 文件） |
| `admin/` | Sveltia CMS 面板（index.html + config.yml） |
| `sw.js` | Service Worker（PWA 离线，缓存优先） |

---

## 工作流规范

### Session Start Protocol（AI 工作前必读）

1. **`CLAUDE.md`**（当前文件）—— 项目架构、代码约定、Commit 规范
2. **`README.md`** —— 功能概览、文件结构、部署说明
3. **关键文件** —— 修改前先读 `js/data.js`（数据结构）、`js/main.js`（渲染逻辑）、`js/router.js`（路由）

### 开发流程（Vibe Coding 版本）

遵循 Vibe Coding 小批量高频次原则：

```
1. 理解需求（参考说明书）
2. 规划方案（如需，先使用 Plan agent）
3. 实现代码（单功能、小批次）
4. 审查代码（使用 code-reviewer sub-agent）
5. 验证运行（浏览器测试）
6. 提交推送（遵循 Commit 规范）
```

### Agent 分工规则

| 步骤 | 使用工具 | 说明 |
|------|---------|------|
| 规划设计 | `EnterPlanMode` + Plan agent | 复杂功能先规划后代码 |
| 日常开发 | 主 AI（当前会话） | 单次只做一个功能 |
| 代码审查 | `Agent` → `superpowers:code-reviewer` | **每次修改后必须审查** |
| Bug 诊断 | `Agent` → `superpowers:code-reviewer` | 先诊断原因，再修复 |
| 双语检查 | 主 AI | 新增文本必配中英双语 |

### 分支策略：GitHub Flow（简化版）

```
main          ← 始终可部署（GitHub Pages 自动部署）
  └─ feat/xxx ← 大改动时使用特性分支
```

- **小改动**（改个文字、修个样式）：直接推 `main`
- **大改动**（新板块、重构）：新建特性分支 → PR → 合并到 `main`

特性分支命名：
```
feat/xxx    新功能
fix/xxx     Bug 修复
refactor/xxx 重构
docs/xxx    文档
```

### Commit Message 规范（简化版 Conventional Commits）

```
<type>: <简短描述>
```

类型：

| 类型 | 什么时候用 |
|------|-----------|
| `feat` | 新功能、新板块 |
| `fix` | Bug 修复 |
| `docs` | 文档、README 更新 |
| `refactor` | 代码重构（不改功能） |
| `style` | CSS 样式调整 |
| `chore` | 配置、CI、构建相关 |
| `perf` | 性能优化 |

示例：
```
feat: 添加阅读记录板块
fix: 修复导航栏在移动端不显示的问题
style: 调整 Hero 区域的字体大小和间距
docs: 更新 README 中的项目说明
```

### CI/CD 自动化

两个 GitHub Actions 工作流：

| 工作流 | 触发时机 | 作用 |
|--------|---------|------|
| `deploy.yml` | 推送到 `main` + 手动触发 | 构建并部署到 GitHub Pages |
| `ci.yml` | 推送、PR、每天凌晨定时 | HTML 验证 + 链接检查 + JS 语法检查 |

**部署流程**：
1. 推送到 `main`
2. → GitHub Actions 自动构建（复制文件到 `_site`）
3. → 上传 artifact + 部署到 GitHub Pages
4. → 几分钟后网站自动更新

### 内容更新方式

- **线上更新**：访问 `/admin/` → Sveltia CMS 可视化编辑 → 保存 → 自动提交部署
- **本地开发**：编辑 `js/data.js` → 刷新浏览器 → 确认后运行同步脚本更新 `content/*.json`

### Issue 模板

项目提供了两种 Issue 模板：
- **Bug Report** (`bug_report.yml`)：报告 bug 时使用
- **Feature Request** (`feature_request.yml`)：提建议时使用

### PR 模板

创建 Pull Request 时自动填充 checklist，包括：
- 代码质量检查
- 双语支持完整性
- 样式一致性
- 渲染正确性

---

## 代码审查规范

每次修改代码后（尤其是 PR 合并前），必须进行 code review：

### 审查 Checklist

1. **架构合规**：代码是否符合项目架构（纯前端、零依赖、单数据源）
2. **数据源正确**：渲染函数是否正确使用 `data.js` 数据
3. **双语支持**：新增文本是否都有 `data-en` / `data-zh` 属性
4. **路由边界**：路由是否正确处理边界情况（404、空状态等）
5. **设计系统**：样式是否与 Navy + Gold 设计系统一致（使用了 CSS 变量而非硬编码）
6. **控制台错误**：是否有 JavaScript 错误或控制台警告
7. **响应式**：是否在 Mobile 和 Desktop 上都显示正常
8. **死链接**：是否有无效的链接或资源引用

### 注意事项

- 不要引入外部依赖（npm 包、CDN 库等）
- 颜色使用 CSS 变量（`var(--xxx)`），不要硬编码
- 所有用户可见文本必须有中英双语
