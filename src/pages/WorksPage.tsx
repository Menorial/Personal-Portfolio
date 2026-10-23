import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FadeUp } from '../components/FadeUp';
import Footer from '../components/Footer';
import Lightbox from '../components/Lightbox';
import { works, type WorkItem } from '../data/works';

/*
 * DESIGN.md 作品页 —— store-utility-card 网格（苹果配件页风）：
 * 白色卡片，1px hairline 细边框，18px 圆角，24px 内边距。
 * 列数自动均分（auto-fill）；编号按位置自动生成。
 * 有图 → 点图放大预览；无图 → 灰色占位。标题下技术标签；底部：详情页 + GitHub。
 */
function WorkCard({
  work,
  index,
  onImageClick,
}: {
  work: WorkItem;
  index: number;
  onImageClick: (image: string) => void;
}) {
  const number = String(index + 1).padStart(2, '0');

  return (
    <FadeUp
      as="div"
      delay={Math.min(index, 3) * 0.07}
      duration={0.6}
      y={20}
      className="flex flex-col rounded-[18px] border border-hairline bg-white p-6"
    >
      {/* 作品图：有图可点开大图预览；无图显示占位 */}
      {work.imageHref ? (
        <button
          type="button"
          onClick={() => onImageClick(work.imageHref as string)}
          className="block aspect-square w-full cursor-zoom-in overflow-hidden rounded-[8px] bg-[#e9e9ee] text-left"
          aria-label={`放大查看 ${work.title}`}
        >
          <img
            src={work.imageHref}
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

      {/* 名称 + 自动编号 */}
      <div className="mt-5 flex items-baseline justify-between gap-3">
        <h3 className="text-[17px] font-semibold leading-[1.24] text-ink">{work.title}</h3>
        <span className="shrink-0 text-[12px] tracking-[0.08em] text-muted-48">{number}</span>
      </div>

      {/* 简介 */}
      <p className="mt-1.5 flex-1 text-[14px] leading-[1.43] text-muted-48">{work.tagline}</p>

      {/* 技术标签 */}
      {work.tags && work.tags.length > 0 && (
        <p className="mt-3 text-[12px] leading-[1.43] text-muted-48/80">
          {work.tags.join(' · ')}
        </p>
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

export default function WorksPage() {
  const [lightbox, setLightbox] = useState<string | null>(null);

  useEffect(() => {
    document.title = '作品 — 祁玉';
  }, []);

  return (
    <main className="min-h-screen bg-white">
      {/* 页头 */}
      <section className="px-6 pb-12 pt-28 text-center sm:pt-32">
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
          精选项目与探索（以下为占位内容，待替换为真实作品）。
        </FadeUp>
      </section>

      {/* 卡片网格 —— 列数自适应 */}
      <section className="mx-auto w-full max-w-[1440px] px-6 pb-24 sm:px-8">
        <div className="grid grid-cols-[repeat(auto-fill,minmax(min(300px,100%),1fr))] gap-6">
          {works.map((work, i) => (
            <WorkCard key={work.id} work={work} index={i} onImageClick={setLightbox} />
          ))}
        </div>
      </section>

      {lightbox && (
        <Lightbox
          image={lightbox}
          title={works.find((w) => w.imageHref === lightbox)?.title ?? '作品截图'}
          onClose={() => setLightbox(null)}
        />
      )}

      <Footer />
    </main>
  );
}
