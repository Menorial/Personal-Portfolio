import { useEffect, useRef } from 'react';

/*
 * 大图预览（Lightbox）—— 点作品截图放大查看
 * - Esc / 点击遮罩 / 右上角按钮 关闭
 * - 打开时把焦点移进对话框，Tab 在内部循环（焦点陷阱），关闭后还原到原来的元素
 * - 打开时锁定页面滚动
 */
export default function Lightbox({
  image,
  title,
  onClose,
}: {
  image: string;
  title: string;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const previousFocus = document.activeElement as HTMLElement | null;
    const dialog = dialogRef.current;
    const focusables = () =>
      Array.from(
        dialog?.querySelectorAll<HTMLElement>('button, [href], [tabindex]:not([tabindex="-1"])') ?? [],
      );

    focusables()[0]?.focus();
    document.body.style.overflow = 'hidden';

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== 'Tab' || !dialog) return;

      const items = focusables();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      previousFocus?.focus?.();
    };
  }, [onClose]);

  return (
    <div
      ref={dialogRef}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-6 sm:p-12"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${title} 大图预览`}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="关闭预览"
        className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full text-white/90 transition-colors hover:bg-white/10"
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
          <path d="M2 2l14 14M16 2L2 16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      </button>

      <figure className="max-h-full max-w-full" onClick={(e) => e.stopPropagation()}>
        <img
          src={image}
          alt={title}
          className="max-h-[85vh] w-auto max-w-full rounded-[8px] object-contain"
        />
        <figcaption className="mt-4 text-center text-[14px] text-white/60">{title}</figcaption>
      </figure>
    </div>
  );
}
