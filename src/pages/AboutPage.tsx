import { Link } from 'react-router-dom';
import { usePageMeta } from '../hooks/usePageMeta';
import { FadeUp } from '../components/FadeUp';
import Footer from '../components/Footer';
import { assetUrl } from '../lib/asset';
import { AVATAR, INTRO, SKILLS, TIMELINE, type Skill } from '../data/about';

/*
 * 关于页 —— 白底居中，正文 17px / 1.47（DESIGN.md body token）
 * 文案全部来自 src/data/about.ts，改内容不用碰 JSX。
 */
const LEVELS: Array<Skill['level']> = ['熟练', '了解'];

export default function AboutPage() {
  usePageMeta(
    '关于 — 祁玉',
    '祁玉：2024 年从 Java 后端入门，2025 年转向 AI 应用，现在做本地优先的 AI 工具。',
  );

  return (
    <main className="min-h-screen bg-white">
      <section className="px-6 pb-24 pt-24 sm:pt-28">
        <div className="mx-auto w-full max-w-[860px]">
          {/* 头像 */}
          <FadeUp as="div" delay={0}>
            <img
              src={assetUrl(AVATAR)}
              alt="祁玉的头像"
              width={144}
              height={144}
              className="h-36 w-36 rounded-[18px] object-cover ring-1 ring-black/5"
            />
          </FadeUp>

          <FadeUp
            as="h1"
            delay={0.08}
            className="mt-10 text-[40px] font-semibold leading-[1.1] tracking-[-0.01em] text-ink"
          >
            关于我
          </FadeUp>

          <div className="mt-6 space-y-5 text-[17px] leading-[1.47] text-ink/90">
            {INTRO.map((paragraph, i) => (
              <FadeUp key={paragraph} as="p" delay={0.14 + i * 0.06} className="m-0">
                {paragraph}
              </FadeUp>
            ))}
          </div>

          {/* 经历时间线 */}
          <FadeUp as="h2" delay={0.1} className="mt-20 text-[34px] font-semibold leading-[1.47] text-ink">
            经历
          </FadeUp>
          <ol className="relative mt-8 list-none space-y-9 border-l border-hairline pl-7">
            {TIMELINE.map((item, i) => (
              <li key={`${item.year}-${item.title}`} className="relative">
                <span
                  aria-hidden="true"
                  className="absolute -left-[33px] top-2 h-2.5 w-2.5 rounded-full bg-primary ring-4 ring-white"
                />
                <FadeUp as="div" delay={0.08 + i * 0.06}>
                  <p className="m-0 text-[12px] font-semibold tracking-[0.14em] text-muted-48">{item.year}</p>
                  <h3 className="mt-1.5 text-[19px] font-semibold leading-[1.3] text-ink">{item.title}</h3>
                  <p className="mb-0 mt-1.5 text-[15px] leading-[1.6] text-muted-48">{item.desc}</p>
                </FadeUp>
              </li>
            ))}
          </ol>

          {/* 技能方向 —— 按熟练度分组 */}
          <FadeUp as="h2" delay={0.1} className="mt-20 text-[34px] font-semibold leading-[1.47] text-ink">
            技能方向
          </FadeUp>
          <div className="mt-6 space-y-6">
            {LEVELS.map((level) => {
              const items = SKILLS.filter((skill) => skill.level === level);
              if (items.length === 0) return null;
              return (
                <div key={level}>
                  <p className="m-0 text-[12px] font-semibold tracking-[0.14em] text-muted-48">{level}</p>
                  <div className="mt-3 flex flex-wrap gap-3">
                    {items.map((skill, i) => (
                      <FadeUp key={skill.name} as="span" delay={0.06 + i * 0.05} duration={0.5} y={16}>
                        <span className="btn-pearl">{skill.name}</span>
                      </FadeUp>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* 结尾引导 */}
          <FadeUp as="div" delay={0.1} className="mt-20 rounded-[18px] bg-parchment p-8">
            <p className="m-0 text-[21px] font-semibold leading-[1.35] text-ink">
              想聊聊，或者看看能不能一起做点什么？
            </p>
            <p className="mb-0 mt-2 text-[15px] leading-[1.5] text-muted-48">
              邮件或 GitHub 都能找到我，也欢迎直接看作品。
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <Link to="/contact" className="btn-primary">
                联系我
              </Link>
              <Link to="/work" className="btn-ghost">
                查看作品
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>

      <Footer />
    </main>
  );
}
