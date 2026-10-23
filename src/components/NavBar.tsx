import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

/*
 * DESIGN.md global-nav — persistent ultra-thin black bar, 44px tall,
 * nav-link typography (12px / 400 / -0.12px tracking).
 * Collapses to hamburger at ≤ 834px (tablet landscape breakpoint).
 */
const NAV_ITEMS = [
  { to: '/', label: '首页', end: true },
  { to: '/work', label: '作品', end: false },
  { to: '/about', label: '关于', end: false },
  { to: '/contact', label: '联系', end: false },
];

function NavLinkClass({ isActive }: { isActive: boolean; isPending: boolean; isTransitioning: boolean }) {
  return `text-[12px] tracking-[-0.12px] transition-colors ${
    isActive ? 'text-sky' : 'text-white/90 hover:text-white'
  }`;
}

export default function NavBar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-black text-white">
      <nav className="mx-auto flex h-11 w-full max-w-[1440px] items-center justify-between px-5 sm:px-8">
        <Link
          to="/"
          className="text-[13px] font-semibold tracking-[0.2em] text-white"
          onClick={() => setOpen(false)}
        >
          QI&nbsp;YU
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-8 min-[835px]:flex">
          {NAV_ITEMS.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.end} className={NavLinkClass}>
              {item.label}
            </NavLink>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          aria-label="打开菜单"
          aria-expanded={open}
          className="flex h-11 w-11 items-center justify-center text-white min-[835px]:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="18" height="12" viewBox="0 0 18 12" fill="none" aria-hidden="true">
              <path d="M0 1h18M0 6h18M0 11h18" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile dropdown */}
      {open && (
        <div className="flex flex-col gap-1 border-t border-white/10 bg-black px-5 py-3 min-[835px]:hidden">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }: { isActive: boolean; isPending: boolean; isTransitioning: boolean }) =>
                `py-2 text-[15px] transition-colors ${isActive ? 'text-sky' : 'text-white/90 hover:text-white'}`
              }
              onClick={() => setOpen(false)}
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      )}
    </header>
  );
}
