import { useEffect } from 'react';
import { FadeUp } from '../components/FadeUp';
import Footer from '../components/Footer';
import { INTRO, SKILLS, TIMELINE, type Skill } from '../data/about';

/*
 * 关于页 —— 白底居中，正文 17px / 1.47（DESIGN.md body token）
 * 文案全部来自 src/data/about.ts，改内容不用碰 JSX。
 */
const LEVELS: Array<Skill['level']> = ['熟练', '了解'];

export default function AboutPage() {
  useEffect(() => {
    document.title = '关于 — 祁玉';
  }, []);

  return (
    <main className="min-h-screen bg-white">
      <section className="px-6 pb-24 pt-24 sm:pt-28">
        <div className="mx-auto w-full max-w-[860px]">
          {/* 头像占位 */}
          <FadeUp as="div" delay={0}>
            <div className="flex h-36 w-36 items-center justify-center rounded-[18px] bg-[#e9e9ee] text-[14px] text-muted-48">
              头像占位
            </div>
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
        </div>
      </section>

      <Footer />
    </main>
  );
}
