import { useEffect } from 'react';
import { FadeUp } from '../components/FadeUp';
import Footer from '../components/Footer';

/*
 * 关于页（占位内容）——白底居中，正文 17px / 1.47（DESIGN.md body token）
 */
const SKILL_PLACEHOLDERS = ['技能一（占位）', '技能二（占位）', '技能三（占位）', '技能四（占位）'];

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
            <FadeUp as="p" delay={0.14} className="m-0">
              这里是自我介绍（占位）。用两到三段话介绍你的背景、专注方向与兴趣——比如如何进入开发、最享受解决哪类问题。
            </FadeUp>
            <FadeUp as="p" delay={0.2} className="m-0">
              第二段占位：补充你的经历亮点、代表性成果或合作方式偏好，让访客在进入作品页前先了解“你是谁”。
            </FadeUp>
            <FadeUp as="p" delay={0.26} className="m-0">
              第三段占位：可写一句个人信念或联系方式引导（完整联系信息在“联系”页）。
            </FadeUp>
          </div>

          {/* 技能方向 —— pearl capsule chips */}
          <FadeUp as="h2" delay={0.1} className="mt-20 text-[34px] font-semibold leading-[1.47] text-ink">
            技能方向
          </FadeUp>
          <div className="mt-6 flex flex-wrap gap-3">
            {SKILL_PLACEHOLDERS.map((skill, i) => (
              <FadeUp key={skill} as="span" delay={0.14 + i * 0.06} duration={0.5} y={16}>
                <span className="btn-pearl">{skill}</span>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
