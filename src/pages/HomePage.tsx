import { useEffect, useState } from 'react';
import { FadeUp } from '../components/FadeUp';

/*
 * 首屏背景视频改为自托管（原第三方 CloudFront 外链 6.28 MB）：
 * - public/hero.mp4：720p / CRF 30 / 无音轨，1.04 MB，体积降到原来的 1/6
 * - public/hero-poster.jpg：首帧封面 38 KB，视频没就绪也不会黑屏
 * - 移动端与「减少动态效果」偏好下只加载封面图，省掉整段视频
 * 路径都走 BASE_URL，GitHub Pages 子目录部署不会 404。
 */
const VIDEO_SRC = `${import.meta.env.BASE_URL}hero.mp4`;
const POSTER_SRC = `${import.meta.env.BASE_URL}hero-poster.jpg`;

// 首屏文案按用户要求保持现状（英文签名），仅字族已切为 SF Pro / Inter
const INTRO_WORDS = ['HI,', "I'M"];
const NAME_WORDS = ['QI', 'YU'];

export default function HomePage() {
  const [useStillImage, setUseStillImage] = useState(false);

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

  return (
    <main className="relative h-[100svh] w-full overflow-hidden bg-black">
      {/* 整屏背景：桌面端视频，小屏/减少动效用封面图 */}
      {useStillImage ? (
        <img
          src={POSTER_SRC}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src={VIDEO_SRC}
          poster={POSTER_SRC}
          autoPlay
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
        </div>
      </div>
    </main>
  );
}
