import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
  type ReactNode,
  type Ref,
} from 'react';

/*
 * 淡入上浮动画 —— 用 CSS transition + IntersectionObserver 实现。
 *
 * 之前用 framer-motion（gzip 40.2 KB），但全站只用到「进入视口时
 * opacity 0→1、translateY 24px→0」这一种效果，用原生 API 等价即可。
 * 好处：JS 少 40 KB、少解析约 450 KB 源码，且 prefers-reduced-motion 真正生效。
 */
type FadeUpProps = {
  children: ReactNode;
  delay?: number;
  duration?: number;
  y?: number;
  className?: string;
  style?: CSSProperties;
  as?: 'div' | 'section' | 'span' | 'h1' | 'h2' | 'h3' | 'p' | 'nav';
  once?: boolean;
};

type FadeStyle = CSSProperties & {
  '--fade-y': string;
  '--fade-duration': string;
  '--fade-delay': string;
};

export function FadeUp({
  children,
  delay = 0,
  duration = 0.7,
  y = 24,
  className,
  style,
  as = 'div',
  once = true,
}: FadeUpProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // 系统开启「减少动态效果」：直接呈现终态，不做位移
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setInView(true);
      return;
    }
    // 老浏览器没有 IntersectionObserver：不要再把内容藏起来
    if (typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true);
            if (once) observer.disconnect();
          } else if (!once) {
            setInView(false);
          }
        }
      },
      // 与原来的 viewport.amount: 0.2 对齐
      { threshold: 0.2 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [once]);

  const fadeStyle: FadeStyle = {
    '--fade-y': `${y}px`,
    '--fade-duration': `${duration}s`,
    '--fade-delay': `${delay}s`,
    ...style,
  };

  const Tag = as as ElementType<{
    ref?: Ref<HTMLElement>;
    className?: string;
    style?: CSSProperties;
    children?: ReactNode;
  }>;
  return (
    <Tag
      ref={ref}
      className={['fade-up', inView ? 'fade-up--in' : '', className].filter(Boolean).join(' ')}
      style={fadeStyle}
    >
      {children}
    </Tag>
  );
}
