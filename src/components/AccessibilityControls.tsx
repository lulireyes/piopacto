import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Eye, Type } from 'lucide-react';

export default function AccessibilityControls() {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [largeText, setLargeText] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.documentElement.classList.toggle('high-contrast', highContrast);
  }, [highContrast]);

  useEffect(() => {
    document.documentElement.style.setProperty(
      '--base-font-size',
      largeText ? '118%' : '100%'
    );
  }, [largeText]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKey);
    };
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-[rgba(30,26,22,0.2)] bg-transparent text-ink transition-colors duration-180 hover:bg-[rgba(30,26,22,0.04)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
        aria-label={t('a11yMenu')}
        aria-expanded={open}
        aria-haspopup="true"
        title={t('a11yMenu')}
      >
        <Eye className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
      </button>

      {open && (
        <div
          role="menu"
          aria-label={t('a11yMenu')}
          className="absolute right-0 top-full z-50 mt-2 min-w-[200px] rounded-lg border border-border bg-sheet py-1"
        >
          <button
            type="button"
            role="menuitemcheckbox"
            aria-checked={highContrast}
            aria-label={t('a11yHighContrast')}
            onClick={() => setHighContrast(!highContrast)}
            className={`flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-sm transition-colors duration-180 hover:bg-[rgba(30,26,22,0.04)] ${
              highContrast ? 'font-semibold text-ink' : 'text-foreground'
            }`}
          >
            <Eye className="h-3.5 w-3.5 flex-shrink-0" strokeWidth={1.75} aria-hidden="true" />
            {t('a11yHighContrast')}
          </button>
          <button
            type="button"
            role="menuitemcheckbox"
            aria-checked={largeText}
            aria-label={t('a11yLargeText')}
            onClick={() => setLargeText(!largeText)}
            className={`flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-sm transition-colors duration-180 hover:bg-[rgba(30,26,22,0.04)] ${
              largeText ? 'font-semibold text-ink' : 'text-foreground'
            }`}
          >
            <Type className="h-3.5 w-3.5 flex-shrink-0" strokeWidth={1.75} aria-hidden="true" />
            {t('a11yLargeText')}
          </button>
        </div>
      )}
    </div>
  );
}
