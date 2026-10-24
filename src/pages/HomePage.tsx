import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { FadeUp } from '../components/FadeUp';
import Footer from '../components/Footer';
import { works } from '../data/works';
import heroVideo from '../assets/hero-1080.mp4';
import heroPoster from '../assets/hero-poster.jpg';

/*
 * 首屏背景视频自托管（原第三方 CloudFront 外链不可控，随时可能失效）：
 * - src/assets/hero-1080.mp4：1920×1080 原片，6.28 MB，未做任何转码
 * - src/assets/hero-poster.jpg：首帧封面 98 KB，视频没就绪也不会黑屏
 * - 移动端与「减少动态效果」偏好下只加载封面图，省掉整段视频
 * 从 src 引入而不是放 public：Vite 会给文件名加内容哈希，
 * 换素材后 URL 自动变化，浏览器不会继续用旧缓存。
 */
const VIDEO_SRC = heroVideo;
const POSTER_SRC = heroPoster;

// 首屏文案按用户要求保持现状（英文签名），仅字族已切为 SF Pro / Inter
const INTRO_WORDS = ['HI,', "I'M"];
const NAME_WORDS = ['QI', 'YU'];

/** 背景视频的暂停状态存在 localStorage，刷新后保持 */
const PAUSE_KEY = 'hero-video-paused';

export default function HomePage() {
  const [useStillImage, setUseStillImage] = useState(false);
  const [playing, setPlaying] = useState(() => {
    try {
      return localStorage.getItem(PAUSE_KEY) !== '1';
    } catch {
      return true;
    }
  });
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    document.title = '祁玉 · 个人作品集';
  }, []);

  // 小屏省流量、减少动效时不播放视频，都用封面替代
  useEffect(() => {
    const query = window.matchMedia('(max-width: 768px), (prefers-reduced-motion: reduce)');
    const sync = () => setUseStillImage(query.matches);
    sync();
    query.addEventListener('change', sync);
    return () => query.removeEventListener('change', sync);
  }, []);

  // 播放 / 暂停与持久化
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (playing) {
      void video.play().catch(() => {});
    } else {
      video.pause();
    }
    try {
      localStorage.setItem(PAUSE_KEY, playing ? '0' : '1');
    } catch {
      /* 隐私模式下忽略 */
    }
  }, [playing, useStillImage]);

  return (
    <main>
      {/* 首屏 */}
      <section className="relative h-[100svh] w-full overflow-hidden bg-black">
        {useStillImage ? (
          <img
            src={POSTER_SRC}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover"
            src={VIDEO_SRC}
            poster={POSTER_SRC}
            autoPlay={playing}
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden="true"
          />
        )}

        {/* 前景内容（导航为固定黑条，内容区避开顶部） */}
        <div className="absolute inset-0 flex flex-col justify-center px-8 pb-8 pt-[70px] max-[900px]:px-[18px] max-[900px]:pt-[90px]">
          <div className="flex max-w-[720px] flex-col items-start">
            {/* 眉题 + 名字：HI, I'M 轻小，QI YU 最大最重 */}
            <h1 className="m-0 flex flex-wrap items-baseline gap-[0.32em] uppercase leading-[1.08] text-white">
              {INTRO_WORDS.map((word, i) => (
                <FadeUp
                  key={`${word}-${i}`}
                  as="span"
                  delay={0.15 + i * 0.08}
                  duration={0.7}
                  y={32}
                  className="text-[clamp(14px,1.6vw,18px)] font-normal tracking-[0.08em] text-white/75"
                >
                  {word}
                </FadeUp>
              ))}
              {NAME_WORDS.map((word, i) => (
                <FadeUp
                  key={`${word}-${INTRO_WORDS.length + i}`}
                  as="span"
                  delay={0.15 + (INTRO_WORDS.length + i) * 0.08}
                  duration={0.7}
                  y={32}
                  className="text-[clamp(39px,4.5vw,63px)] font-semibold tracking-[0.01em] text-white"
                >
                  {word}
                </FadeUp>
              ))}
            </h1>

            {/* 副标题（两行，保持现状文案） */}
            <FadeUp
              as="p"
              delay={0.9}
              duration={0.7}
              className="mt-6 text-[21px] leading-[1.65] text-white/85"
            >
              Where code meets intelligence
              <br />
              to reshape digital possibilities.
            </FadeUp>

            {/* 首屏入口 */}
            <FadeUp as="div" delay={1.05} duration={0.6} className="mt-10 flex flex-wrap items-center gap-4">
              <Link to="/work" className="btn-primary">
                查看作品
              </Link>
              <a href="#selected" className="text-[15px] text-white/75 transition-colors hover:text-white">
                精选项目 ↓
              </a>
            </FadeUp>
          </div>
        </div>

        {/* 背景视频播放控制 */}
        {!useStillImage && (
          <button
            type="button"
            onClick={() => setPlaying((value) => !value)}
            aria-label={playing ? '暂停背景视频' : '播放背景视频'}
            aria-pressed={!playing}
            className="absolute bottom-6 right-6 flex h-10 w-10 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur transition-colors hover:bg-black/50"
          >
            {playing ? (
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M4 2v10M10 2v10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" aria-hidden="true">
                <path d="M3.5 1.9v10.2a.6.6 0 0 0 .92.5l8-5.1a.6.6 0 0 0 0-1L4.42 1.4a.6.6 0 0 0-.92.5Z" />
              </svg>
            )}
          </button>
        )}
      </section>

      {/* 第二屏：精选作品 */}
      <section id="selected" className="bg-white px-6 py-24 sm:px-8">
        <div className="mx-auto w-full max-w-[1200px]">
          <FadeUp as="p" className="m-0 text-[14px] font-semibold tracking-[0.22em] text-muted-48">
            SELECTED WORK
          </FadeUp>
          <div className="mt-3 flex items-end justify-between gap-6">
            <FadeUp
              as="h2"
              delay={0.08}
              className="m-0 text-[40px] font-semibold leading-[1.1] tracking-[-0.01em] text-ink"
            >
              精选作品
            </FadeUp>
            <Link
              to="/work"
              className="hidden shrink-0 text-[15px] text-primary transition-opacity hover:opacity-70 sm:block"
            >
              查看全部 →
            </Link>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {works.slice(0, 3).map((work) => (
              <FadeUp key={work.id} as="div" delay={0.1} duration={0.6} y={24}>
                <Link to={`/work/${work.id}`} className="group flex h-full flex-col">
                  {work.imageHref ? (
                    <img
                      src={work.imageHref}
                      alt={work.title}
                      loading="lazy"
                      className="aspect-[4/3] w-full rounded-[12px] object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                    />
                  ) : (
                    <div className="flex aspect-[4/3] w-full items-center justify-center rounded-[12px] bg-[#e9e9ee]">
                      <span className="text-[13px] text-muted-48">作品截图占位</span>
                    </div>
                  )}
                  <h3 className="mt-4 text-[19px] font-semibold leading-[1.3] text-ink">{work.title}</h3>
                  <p className="mt-1.5 line-clamp-2 text-[14px] leading-[1.5] text-muted-48">{work.tagline}</p>
                  {work.tags && work.tags.length > 0 && (
                    <p className="mt-2 text-[12px] text-muted-48/80">{work.tags.join(' · ')}</p>
                  )}
                </Link>
              </FadeUp>
            ))}
          </div>

          <div className="mt-12 sm:hidden">
            <Link to="/work" className="btn-ghost">
              查看全部作品
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
