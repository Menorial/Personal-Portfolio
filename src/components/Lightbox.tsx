import { useEffect } from 'react';

/*
 * 大图预览（Lightbox）—— 点作品截图放大查看
 * Esc / 点击遮罩 / 右上角按钮 关闭；打开时锁定页面滚动
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
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-6 sm:p-12"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={title}
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
