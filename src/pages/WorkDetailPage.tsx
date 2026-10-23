import { useEffect } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { FadeUp } from '../components/FadeUp';
import Footer from '../components/Footer';
import { works } from '../data/works';

/*
 * 作品详情页 /work/:id —— 框架 + 占位内容。
 * 之后补充真实内容时，可在 src/data/works.ts 给作品加字段（如长描述、图片列表），
 * 或直接在本页按作品 id 渲染差异化内容。
 */
export default function WorkDetailPage() {
  const { id } = useParams();
  const work = works.find((w) => w.id === id);

  useEffect(() => {
    if (work) document.title = `${work.title} — 祁玉`;
  }, [work]);

  if (!work) {
    return <Navigate to="/work" replace />;
  }

  const number = String(works.indexOf(work) + 1).padStart(2, '0');

  return (
    <main className="min-h-screen bg-white">
      <section className="px-6 pb-24 pt-24 sm:px-8 sm:pt-28">
        <div className="mx-auto w-full max-w-[980px]">
          {/* 返回 */}
          <FadeUp as="div" delay={0}>
            <Link
              to="/work"
              className="inline-flex items-center gap-2 text-[17px] text-primary hover:opacity-70"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M10 2L4 8l6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              返回作品
            </Link>
          </FadeUp>

          {/* 标题区 */}
          <FadeUp as="p" delay={0.06} className="mt-10 text-[14px] font-semibold tracking-[0.22em] text-muted-48">
            PROJECT {number}
          </FadeUp>
          <FadeUp
            as="h1"
            delay={0.12}
            className="mt-3 text-[40px] font-semibold leading-[1.1] tracking-[-0.01em] text-ink"
          >
            {work.title}
          </FadeUp>
          {work.tags && work.tags.length > 0 && (
            <FadeUp as="p" delay={0.18} className="mt-4 text-[17px] text-muted-48">
              {work.tags.join(' · ')}
            </FadeUp>
          )}

          {/* 主图 */}
          <FadeUp as="div" delay={0.2} className="mt-10">
            {work.imageHref ? (
              <img
                src={work.imageHref}
                alt={work.title}
                loading="lazy"
                className="w-full rounded-[8px] object-cover"
              />
            ) : (
              <div className="flex aspect-[16/10] w-full items-center justify-center rounded-[8px] bg-[#e9e9ee]">
                <span className="text-[14px] text-muted-48">作品截图占位 · 之后替换为真实图片</span>
              </div>
            )}
          </FadeUp>

          {/* 项目介绍（占位） */}
          <div className="mt-14 max-w-[760px] space-y-5 text-[17px] leading-[1.47] text-ink/90">
            <FadeUp as="h2" className="text-[28px] font-semibold leading-[1.14] text-ink">
              项目介绍
            </FadeUp>
            <FadeUp as="p" delay={0.06} className="m-0">
              {work.tagline}
            </FadeUp>
            <FadeUp as="p" delay={0.12} className="m-0">
              详细内容占位——等替换为真实项目时，在这里补充背景与动机、技术方案、实现过程中的难点与解决思路。
            </FadeUp>
            <FadeUp as="p" delay={0.18} className="m-0">
              成果与收获占位：数据、演示效果或上线链接可写在这里（或在作品数据里新增字段统一管理）。
            </FadeUp>
          </div>

          {/* 技术栈 */}
          {work.tags && work.tags.length > 0 && (
            <div className="mt-14">
              <FadeUp as="h2" className="text-[28px] font-semibold leading-[1.14] text-ink">
                技术栈
              </FadeUp>
              <div className="mt-5 flex flex-wrap gap-3">
                {work.tags.map((tag, i) => (
                  <FadeUp key={tag} as="span" delay={0.1 + i * 0.05} duration={0.5} y={16}>
                    <span className="btn-pearl">{tag}</span>
                  </FadeUp>
                ))}
              </div>
            </div>
          )}

          {/* 链接 */}
          <FadeUp as="div" delay={0.2} className="mt-14 flex flex-wrap items-center gap-4">
            <a
              href={work.githubHref}
              target="_blank"
              rel="noreferrer"
              className="btn-primary"
            >
              GitHub 仓库 ↗
            </a>
            <Link to="/work" className="btn-ghost">
              返回作品列表
            </Link>
          </FadeUp>
        </div>
      </section>

      <Footer />
    </main>
  );
}
