import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';

/*
 * GitHub Pages 部署：项目页地址是 https://<用户名>.github.io/<仓库名>/，
 * 所有资源都挂在 /<仓库名>/ 下。base 不对 → /assets/*.js 全部 404 → 白屏。
 *
 * 这里自动从 GitHub Actions 注入的 GITHUB_REPOSITORY（"owner/repo"）推导，
 * 换仓库名也不用改代码；本地开发 / 普通构建仍然是 '/'。
 * 特殊情形（例如绑定自定义域名、想挂在根路径）可用环境变量 VITE_BASE 覆盖。
 */
function resolveBase(): string {
  const env =
    (globalThis as { process?: { env?: Record<string, string | undefined> } }).process?.env ?? {};

  const override = env.VITE_BASE;
  if (override) return override;

  const repo = env.GITHUB_REPOSITORY;
  if (!repo) return '/';

  const name = repo.split('/')[1] ?? '';
  // 用户主页仓库（<用户名>.github.io）本身就是根路径
  if (!name || name.endsWith('.github.io')) return '/';

  return `/${name}/`;
}

/** 部署地址；绑定自定义域名时与 index.html 里的 canonical / og:url 一起改 */
const SITE_URL = 'https://menorial.github.io/Personal-Portfolio';

/*
 * 构建时生成 sitemap.xml 与 robots.txt。
 * 作品详情页从 works.ts 里正则取 id，新增作品不用再手动维护清单。
 */
function sitemapPlugin(): Plugin {
  return {
    name: 'generate-sitemap',
    apply: 'build',
    closeBundle() {
      const worksFile = resolve('src/data/works.ts');
      const ids = existsSync(worksFile)
        ? Array.from(readFileSync(worksFile, 'utf8').matchAll(/\bid:\s*'([^']+)'/g), (match) => match[1])
        : [];
      const routes = ['/', '/work', '/about', '/contact', ...ids.map((id) => `/work/${id}`)];

      const urls = routes.map((route) => `  <url><loc>${SITE_URL}${route}</loc></url>`).join('\n');
      writeFileSync(
        resolve('dist/sitemap.xml'),
        `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
      );

      writeFileSync(
        resolve('dist/robots.txt'),
        `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`,
      );
    },
  };
}

export default defineConfig({
  base: resolveBase(),
  plugins: [react(), sitemapPlugin()],
});
