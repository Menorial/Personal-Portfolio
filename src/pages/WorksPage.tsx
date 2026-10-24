import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FadeUp } from '../components/FadeUp';
import Footer from '../components/Footer';
import Lightbox from '../components/Lightbox';
import { works, type WorkItem } from '../data/works';

/*
 * DESIGN.md 作品页 —— store-utility-card 网格（苹果配件页风）：
 * 白色卡片，1px hairline 细边框，18px 圆角，24px 内边距。
 * 列数自动均分（auto-fill）；编号按原始顺序生成，筛选后不变。
 * 有图 → 点图放大预览；无图 → 灰色占位。顶部按技术标签筛选。
 */
function WorkCard({
  work,
  number,
  onImageClick,
}: {
  work: WorkItem;
  number: string;
  onImageClick: (image: string, title: string) => void;
}) {
  const image = work.imageHref;

  return (
    <FadeUp
      as="div"
      delay={0.05}
      duration={0.6}
      y={20}
      className="flex flex-col rounded-[18px] border border-hairline bg-white p-6"
    >
      {/* 作品图：有图可点开大图预览；无图显示占位 */}
      {image ? (
        <button
          type="button"
          onClick={() => onImageClick(image, work.title)}
          className="block aspect-square w-full cursor-zoom-in overflow-hidden rounded-[8px] bg-[#e9e9ee] text-left"
          aria-label={`放大查看 ${work.title}`}
        >
          <img
            src={image}
            alt={work.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-[1.03]"
          />
        </button>
      ) : (
        <div className="flex aspect-square w-full items-center justify-center overflow-hidden rounded-[8px] bg-[#e9e9ee]">
          <span className="text-[13px] text-muted-48">作品截图占位</span>
        </div>
      )}

      {/* 名称 + 编号 */}
      <div className="mt-5 flex items-baseline justify-between gap-3">
        <h3 className="text-[17px] font-semibold leading-[1.24] text-ink">{work.title}</h3>
        <span className="shrink-0 text-[12px] tracking-[0.08em] text-muted-48">{number}</span>
      </div>

      {/* 简介 */}
      <p className="mt-1.5 flex-1 text-[14px] leading-[1.43] text-muted-48">{work.tagline}</p>

      {/* 技术标签 */}
      {work.tags && work.tags.length > 0 && (
        <p className="mt-3 text-[12px] leading-[1.43] text-muted-48/80">{work.tags.join(' · ')}</p>
      )}

      {/* 链接行：详情页 + GitHub 直连仓库 */}
      <div className="mt-5 flex items-center justify-between border-t border-black/5 pt-4">
        <Link to={`/work/${work.id}`} className="text-[17px] text-primary hover:opacity-70">
          查看详情
        </Link>
        <a
          href={work.githubHref}
          target="_blank"
          rel="noreferrer"
          className="text-[17px] text-muted-48 transition-colors hover:text-primary"
        >
          GitHub ↗
        </a>
      </div>
    </FadeUp>
  );
}

const ALL_TAGS = Array.from(new Set(works.flatMap((work) => work.tags ?? [])));

export default function WorksPage() {
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [lightbox, setLightbox] = useState<{ image: string; title: string } | null>(null);

  useEffect(() => {
    document.title = '作品 — 祁玉';
  }, []);

  const visibleWorks = activeTag ? works.filter((work) => work.tags?.includes(activeTag)) : works;

  const chipClass = (active: boolean) =>
    [
      'rounded-full border px-4 py-1.5 text-[13px] transition-colors',
      active
        ? 'border-ink bg-ink text-white'
        : 'border-hairline text-muted-48 hover:border-ink hover:text-ink',
    ].join(' ');

  return (
    <main className="min-h-screen bg-white">
      {/* 页头 */}
      <section className="px-6 pb-10 pt-28 text-center sm:pt-32">
        <FadeUp as="p" className="m-0 text-[14px] font-semibold tracking-[0.22em] text-muted-48">
          PORTFOLIO
        </FadeUp>
        <FadeUp
          as="h1"
          delay={0.08}
          className="mt-3 text-[40px] font-semibold leading-[1.1] tracking-[-0.01em] text-ink"
        >
          作品
        </FadeUp>
        <FadeUp
          as="p"
          delay={0.16}
          className="mx-auto mt-3 max-w-[520px] text-[17px] text-muted-48"
        >
          精选项目与探索。
        </FadeUp>
      </section>

      {/* 技术标签筛选 */}
      {ALL_TAGS.length > 0 && (
        <section className="mx-auto w-full max-w-[1440px] px-6 sm:px-8">
          <div className="flex flex-wrap justify-center gap-2 pb-10" role="group" aria-label="按技术标签筛选">
            <button
              type="button"
              onClick={() => setActiveTag(null)}
              aria-pressed={activeTag === null}
              className={chipClass(activeTag === null)}
            >
              全部
            </button>
            {ALL_TAGS.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setActiveTag(tag)}
                aria-pressed={activeTag === tag}
                className={chipClass(activeTag === tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        </section>
      )}

      {/* 卡片网格 —— 列数自适应 */}
      <section className="mx-auto w-full max-w-[1440px] px-6 pb-24 sm:px-8">
        <div className="grid grid-cols-[repeat(auto-fill,minmax(min(300px,100%),1fr))] gap-6">
          {visibleWorks.map((work) => (
            <WorkCard
              key={work.id}
              work={work}
              number={String(works.indexOf(work) + 1).padStart(2, '0')}
              onImageClick={(image, title) => setLightbox({ image, title })}
            />
          ))}
        </div>
        {visibleWorks.length === 0 && (
          <p className="py-16 text-center text-[15px] text-muted-48">这个标签下暂时没有作品。</p>
        )}
      </section>

      {lightbox && (
        <Lightbox image={lightbox.image} title={lightbox.title} onClose={() => setLightbox(null)} />
      )}

      <Footer />
    </main>
  );
}
