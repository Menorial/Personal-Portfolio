import { useEffect } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { FadeUp } from '../components/FadeUp';
import Footer from '../components/Footer';
import { works } from '../data/works';

/*
 * 作品详情页 /work/:id —— 完全由 src/data/works.ts 驱动：
 * 角色 / 项目介绍 / 关键点 / 图集 / 技术栈，
 * 字段为空时对应区块自动不渲染。
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
  const summaryParagraphs = work.summary?.split('\n\n').filter(Boolean) ?? [];

  return (
    <main className="min-h-screen bg-white">
      <section className="px-6 pb-24 pt-24 sm:px-8 sm:pt-28">
        <div className="mx-auto w-full max-w-[980px]">
          {/* 返回 */}
          <FadeUp as="div">
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
          {work.role && (
            <FadeUp as="p" delay={0.16} className="mt-3 text-[15px] text-muted-48">
              {work.role}
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
                <span className="text-[14px] text-muted-48">作品截图占位</span>
              </div>
            )}
          </FadeUp>

          {/* 项目介绍 */}
          {summaryParagraphs.length > 0 && (
            <div className="mt-14 max-w-[760px] space-y-5 text-[17px] leading-[1.47] text-ink/90">
              <FadeUp as="h2" className="text-[28px] font-semibold leading-[1.14] text-ink">
                项目介绍
              </FadeUp>
              {summaryParagraphs.map((paragraph, i) => (
                <FadeUp key={paragraph} as="p" delay={0.06 + i * 0.05} className="m-0">
                  {paragraph}
                </FadeUp>
              ))}
            </div>
          )}

          {/* 技术难点 / 解法 */}
          {work.highlights && work.highlights.length > 0 && (
            <div className="mt-14 max-w-[760px]">
              <FadeUp as="h2" className="text-[28px] font-semibold leading-[1.14] text-ink">
                关键点
              </FadeUp>
              <ul className="mt-5 list-none space-y-4 p-0">
                {work.highlights.map((highlight, i) => (
                  <li key={highlight}>
                    <FadeUp as="div" delay={0.06 + i * 0.05} className="flex gap-3 text-[17px] leading-[1.55] text-ink/90">
                      <span aria-hidden="true" className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      <span>{highlight}</span>
                    </FadeUp>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* 图集 */}
          {work.gallery && work.gallery.length > 0 && (
            <div className="mt-14 grid gap-4 sm:grid-cols-2">
              {work.gallery.map((src, i) => (
                <FadeUp as="div" key={src} delay={i * 0.05}>
                  <img
                    src={src}
                    alt={`${work.title} 截图 ${i + 1}`}
                    loading="lazy"
                    className="w-full rounded-[8px] object-cover"
                  />
                </FadeUp>
              ))}
            </div>
          )}

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
            <a href={work.githubHref} target="_blank" rel="noreferrer" className="btn-primary">
              GitHub 仓库 ↗
            </a>
            {work.demoHref && (
              <a href={work.demoHref} target="_blank" rel="noreferrer" className="btn-ghost">
                在线演示 ↗
              </a>
            )}
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
