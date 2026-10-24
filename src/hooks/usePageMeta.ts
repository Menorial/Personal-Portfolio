import { useEffect } from 'react';

const DEFAULT_DESCRIPTION = '祁玉的个人作品集：AI 应用开发、自动化工具与全栈项目。';

/*
 * 统一维护页面标题与 meta description。
 * 之前每页各自 useEffect 改 title，description 全站只有 index.html 里那一份。
 */
export function usePageMeta(title: string, description: string = DEFAULT_DESCRIPTION) {
  useEffect(() => {
    document.title = title;

    let meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'description');
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', description);

    const ogTitle = document.querySelector<HTMLMetaElement>('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', title);

    const ogDescription = document.querySelector<HTMLMetaElement>('meta[property="og:description"]');
    if (ogDescription) ogDescription.setAttribute('content', description);
  }, [title, description]);
}
