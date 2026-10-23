import { useEffect } from 'react';
import { FadeUp } from '../components/FadeUp';
import Footer from '../components/Footer';
import { SITE_EMAIL, SITE_GITHUB } from '../data/site';

/*
 * 联系页 —— 近黑画布（DESIGN.md surface-tile-3）：
 * 作为站点收尾的“深色结束语”，与前面白底页面形成明暗交替节奏。
 * 联系方式统一来自 src/data/site.ts。
 */
const CONTACT_LINKS = [
  { href: `mailto:${SITE_EMAIL}`, label: '发送邮件', primary: true, external: false },
  { href: SITE_GITHUB, label: 'GitHub', primary: false, external: true },
];

export default function ContactPage() {
  useEffect(() => {
    document.title = '联系 — 祁玉';
  }, []);

  return (
    <main className="min-h-screen bg-tile-3">
      <section className="px-6 pb-28 pt-32 text-center sm:pt-36">
        <div className="mx-auto w-full max-w-[760px]">
          <FadeUp as="p" className="m-0 text-[14px] font-semibold tracking-[0.22em] text-muted-dark">
            CONTACT
          </FadeUp>
          <FadeUp
            as="h1"
            delay={0.08}
            className="mt-3 text-[40px] font-semibold leading-[1.1] tracking-[-0.01em] text-white"
          >
            联系我
          </FadeUp>
          <FadeUp
            as="p"
            delay={0.16}
            className="mx-auto mt-4 max-w-[520px] text-[21px] leading-[1.4] text-white/80"
          >
            欢迎交流与协作，可以通过邮件或 GitHub 找到我。
          </FadeUp>

          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            {CONTACT_LINKS.map((link, i) => (
              <FadeUp as="div" key={link.label} delay={0.24 + i * 0.08} duration={0.6}>
                <a
                  href={link.href}
                  {...(link.external ? { target: '_blank', rel: 'noreferrer' } : {})}
                  className={link.primary ? 'btn-primary' : 'btn-ghost-dark'}
                >
                  {link.label}
                </a>
              </FadeUp>
            ))}
          </div>

          <FadeUp as="p" delay={0.5} className="mt-12 text-[14px] leading-[1.6] text-white/45">
            {SITE_EMAIL}
          </FadeUp>
        </div>
      </section>

      <Footer />
    </main>
  );
}
