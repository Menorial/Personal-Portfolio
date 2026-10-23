import { Link } from 'react-router-dom';

/*
 * DESIGN.md footer — parchment canvas, dense-link columns (17px / 2.41 leading),
 * caption-strong column heads, fine-print legal row.
 */
const NAV_COLUMN = [
  { to: '/', label: '首页' },
  { to: '/work', label: '作品' },
  { to: '/about', label: '关于' },
  { to: '/contact', label: '联系' },
];

// 占位链接：之后替换为真实联系方式
const CONTACT_COLUMN = [
  { href: 'mailto:hello@example.com', label: '邮箱', external: false },
  { href: 'https://github.com/', label: 'GitHub', external: true },
  { href: '#', label: '微信（占位）', external: false },
];

export default function Footer() {
  return (
    <footer className="bg-parchment text-muted-80">
      <div className="mx-auto w-full max-w-[1440px] px-5 py-16 sm:px-8">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand block */}
          <div className="sm:col-span-2">
            <p className="text-[15px] font-semibold tracking-[0.2em] text-ink">QI YU</p>
            <p className="mt-4 max-w-[280px] text-[14px] leading-[1.43] text-muted-48">
              以代码与智能，重塑数字世界的可能。个人作品集（占位简介，之后替换）。
            </p>
          </div>

          {/* Nav column */}
          <nav aria-label="页脚导航">
            <h3 className="text-[14px] font-semibold text-ink">导航</h3>
            <ul className="mt-4 list-none p-0">
              {NAV_COLUMN.map((item) => (
                <li key={item.to} className="leading-[2.41]">
                  <Link to={item.to} className="text-[17px] text-muted-80 transition-colors hover:text-primary">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact column */}
          <nav aria-label="联系方式">
            <h3 className="text-[14px] font-semibold text-ink">联系</h3>
            <ul className="mt-4 list-none p-0">
              {CONTACT_COLUMN.map((item) => (
                <li key={item.label} className="leading-[2.41]">
                  <a
                    href={item.href}
                    {...(item.external ? { target: '_blank', rel: 'noreferrer' } : {})}
                    className="text-[17px] text-muted-80 transition-colors hover:text-primary"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Legal row */}
        <div className="mt-12 flex flex-col gap-2 border-t border-black/10 pt-6 text-[12px] leading-none text-muted-48 sm:flex-row sm:items-center sm:justify-between">
          <p className="m-0">© 2025 祁玉 · 保留所有权利</p>
          <p className="m-0">个人作品集 · 内容为占位，待替换</p>
        </div>
      </div>
    </footer>
  );
}
