import { useEffect, useState } from 'react';

/*
 * 分享按钮——优先调起系统分享面板（navigator.share），
 * 不支持时退化为复制当前链接，并给出 2 秒的状态反馈。
 */
export default function ShareButton({ title }: { title: string }) {
  const [state, setState] = useState<'idle' | 'done' | 'error'>('idle');

  useEffect(() => {
    if (state === 'idle') return;
    const timer = window.setTimeout(() => setState('idle'), 2000);
    return () => window.clearTimeout(timer);
  }, [state]);

  const share = async () => {
    const url = window.location.href;

    if (typeof navigator.share === 'function') {
      try {
        await navigator.share({ title, url });
        return;
      } catch {
        // 用户取消分享时静默返回
        return;
      }
    }

    try {
      await navigator.clipboard.writeText(url);
      setState('done');
    } catch {
      setState('error');
    }
  };

  const label = state === 'done' ? '链接已复制' : state === 'error' ? '复制失败' : '分享';

  return (
    <button type="button" onClick={share} className="btn-ghost" aria-live="polite">
      {label}
    </button>
  );
}
