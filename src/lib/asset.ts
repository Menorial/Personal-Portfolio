/*
 * 把 public/ 下的资源路径补上部署前缀。
 * GitHub Pages 项目页的资源在 /<仓库名>/ 下，直接写 '/images/x.png' 会 404；
 * 外链（http/https）原样返回。
 */
export function assetUrl(path?: string): string | undefined {
  if (!path) return undefined;
  if (/^(https?:)?\/\//.test(path)) return path;
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;
}
