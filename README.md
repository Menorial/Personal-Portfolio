# 祁玉 · 个人作品集

Vite 6 + React 18 + TypeScript + Tailwind 3。动效由 CSS transition + IntersectionObserver 实现
（见 `src/components/FadeUp.tsx`），不依赖动画库；Inter 字体从本地打包，只含 latin 子集的
400 / 600 两个字重。

## 本地运行

```bash
npm install
npm run dev      # http://localhost:5173/
```

> 本项目没有 `start` 脚本，请用 `npm run dev`，不是 `npm start`。

## 构建

```bash
npm run build    # tsc 类型检查 + vite build → dist/
npm run preview  # 本地预览构建产物
```

## 首屏视频

`src/assets/hero-1080.mp4`（1920×1080 / 24fps / 原片，6.28 MB，逐字节未转码）与
`src/assets/hero-poster.jpg`（首帧封面，98 KB）。

> 这个文件就是最早用的那段素材，原样保留、不做二次压缩：任何转码（哪怕是 1080p）
> 都会让细节变软，而这个粒子球是整站视觉主体，清晰度优先。

替换成自己的素材（原文件直接放进去即可，不必转码）：

```bash
cp 你的视频.mp4 src/assets/hero-1080.mp4
ffmpeg -i src/assets/hero-1080.mp4 -frames:v 1 -q:v 3 src/assets/hero-poster.jpg
```

如果以后确实要压体积，再考虑转码（会损失一点锐度）：

```bash
ffmpeg -i 你的视频.mp4 -vf "scale=1920:-2" -c:v libx264 -crf 28 -preset slow -an \
       -movflags +faststart src/assets/hero-1080.mp4
```

移动端（≤ 768px）与系统开启「减少动态效果」时只加载封面图，不加载视频。
素材从 `src/assets` 引入而不是放 `public`，Vite 会加内容哈希，换素材后 URL 自动变化，
访客不会继续看浏览器里缓存的旧版。

## 部署到 GitHub Pages

已内置自动化：[.github/workflows/deploy.yml](.github/workflows/deploy.yml)，push 到 `main` 即自动构建发布。

1. 在 GitHub 新建仓库（免费账号必须是 **Public**），不要初始化 README / .gitignore，保持空仓库。
2. 本地初始化并推送：

```bash
cd D:\Data\ai-automation-hero
git init
git add .
git commit -m "init: portfolio"
git branch -M main
git remote add origin https://github.com/<你的用户名>/<仓库名>.git
git push -u origin main
```

3. 仓库 **Settings → Pages → Build and deployment → Source** 选择 **GitHub Actions**。
4. 等 Actions 的 `Deploy to GitHub Pages` 变绿，访问 `https://<用户名>.github.io/<仓库名>/`。

### 为什么不用手改 base

`vite.config.ts` 从 Actions 注入的 `GITHUB_REPOSITORY` 自动推导 `base`（`/<仓库名>/`），
`src/main.tsx` 的 `BrowserRouter basename` 同步读取 `import.meta.env.BASE_URL`。
所以换仓库名、或改成 `<用户名>.github.io` 用户主页，都不需要改代码。

### 绑定自定义域名

自定义域名下站点挂在根路径，构建时覆盖即可：

```bash
VITE_BASE=/ npm run build
```

（在 Actions 里则给 build 步骤加 `env: VITE_BASE: /`）

### 子页面刷新 404

GitHub Pages 不支持 SPA rewrite。工作流会把 `dist/index.html` 复制成 `dist/404.html`，
深链接（如 `/work/w1`）被刷新时由 404 页接管，再由前端路由还原到正确页面。

## 内容维护（改内容只需要动这三个文件）

| 文件 | 内容 |
|---|---|
| `src/data/works.ts` | 作品列表：标题、简介、标签、角色、项目介绍、难点、截图、仓库/演示地址 |
| `src/data/about.ts` | 关于页：自我介绍段落、经历时间线、技能（熟练/了解） |
| `src/data/site.ts` | 联系方式：邮箱、GitHub |

作品详情页 `/work/:id` 完全由 `works.ts` 驱动，字段留空时对应区块自动不渲染。

## 上线前待办

- [ ] `src/data/works.ts` 换成真实作品（角色、项目介绍、技术难点）
- [ ] `src/data/about.ts` 真实自我介绍、经历时间线、技能
- [x] 联系方式：`src/data/site.ts`（邮箱 `suqiyu0852@163.com`、GitHub `Menorial`），微信已移除
- [x] 作品详情页结构化：角色 / 项目介绍 / 关键点 / 图集 / 演示链接
- [x] 技术标签筛选、自定义 404、复制邮箱、Lightbox 焦点陷阱
- [x] `index.html` 社交分享图 `og.jpg`（1200×630，绝对地址）
- [ ] 作品截图：放进 `public/images/`，在 `works.ts` 填 `imageHref` 和 `gallery`
