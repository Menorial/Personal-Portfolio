import { usePageMeta } from '../hooks/usePageMeta';
import { Link } from 'react-router-dom';
import { FadeUp } from '../components/FadeUp';

/*
 * 404 页 —— 未匹配的路径落到这里，而不是静默重定向回首页。
 * 给访客两个明确的出口，避免“我点错了？”的困惑。
 */
export default function NotFoundPage() {
  usePageMeta('页面不存在 — 祁玉', '页面不存在，可以回到首页或浏览作品。');

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white px-6 pb-24 pt-32 text-center">
      <FadeUp as="p" className="m-0 text-[14px] font-semibold tracking-[0.22em] text-muted-48">
        404
      </FadeUp>
      <FadeUp
        as="h1"
        delay={0.08}
        className="mt-3 text-[40px] font-semibold leading-[1.1] tracking-[-0.01em] text-ink"
      >
        页面不存在
      </FadeUp>
      <FadeUp as="p" delay={0.16} className="mt-4 max-w-[420px] text-[17px] leading-[1.5] text-muted-48">
        链接可能已经失效，或者地址输错了。可以从下面重新开始。
      </FadeUp>
      <FadeUp as="div" delay={0.24} className="mt-10 flex flex-wrap items-center justify-center gap-4">
        <Link to="/" className="btn-primary">
          回到首页
        </Link>
        <Link to="/work" className="btn-ghost">
          看看作品
        </Link>
      </FadeUp>
    </main>
  );
}
