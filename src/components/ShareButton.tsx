import { useEffect, useState } from 'react';

/*
 * 分享按钮
 * - 只在触屏设备（手机/平板）调用系统分享面板 navigator.share
 * - 桌面端直接复制链接：Windows 的系统分享面板容易卡住且几乎没有可用目标，
 *   之前一点就弹出一个无响应的共享窗口
 * - 复制失败时退回到 textarea + execCommand，兼容非 HTTPS 或旧浏览器
 */
const isTouchDevice = () =>
  typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;

const copyText = async (text: string) => {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }
  const area = document.createElement('textarea');
  area.value = text;
  area.setAttribute('readonly', '');
  area.style.position = 'fixed';
  area.style.opacity = '0';
  document.body.appendChild(area);
  area.select();
  const ok = document.execCommand('copy');
  document.body.removeChild(area);
  if (!ok) throw new Error('copy failed');
};

export default function ShareButton({ title }: { title: string }) {
  const [state, setState] = useState<'idle' | 'done' | 'error'>('idle');
  const [nativeShare] = useState(() => typeof navigator.share === 'function' && isTouchDevice());

  useEffect(() => {
    if (state === 'idle') return;
    const timer = window.setTimeout(() => setState('idle'), 2000);
    return () => window.clearTimeout(timer);
  }, [state]);

  const share = async () => {
    const url = window.location.href;

    if (nativeShare) {
      try {
        await navigator.share({ title, url });
      } catch {
        // 用户取消分享，或系统面板不可用：静默返回
      }
      return;
    }

    try {
      await copyText(url);
      setState('done');
    } catch {
      setState('error');
    }
  };

  const label =
    state === 'done' ? '链接已复制' : state === 'error' ? '复制失败' : nativeShare ? '分享' : '复制链接';

  return (
    <button
      type="button"
      onClick={share}
      className="btn-ghost"
      aria-live="polite"
      title={nativeShare ? '分享这个作品' : '复制这个作品的链接'}
    >
      {label}
    </button>
  );
}
