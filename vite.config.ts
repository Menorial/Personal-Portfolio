import { defineConfig } from 'vite';
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

export default defineConfig({
  base: resolveBase(),
  plugins: [react()],
});
