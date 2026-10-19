import { useLanguage } from '@/contexts/LanguageContext';
import { useState, useRef, useEffect } from 'react';
import { Language, languageNames } from '@/lib/i18n';

const languages: Language[] = ['es', 'en', 'fr', 'de', 'pt', 'it', 'nl'];

export default function LanguageSelector({ pill = false }: { pill?: boolean }) {
  const { lang, setLang, t } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={
          pill
            ? "inline-flex items-center rounded-full border border-[rgba(30,26,22,0.2)] bg-transparent px-[14px] py-[9px] font-[inherit] text-[14px] text-[#1E1A16] transition-colors duration-180 hover:bg-[rgba(30,26,22,0.04)]"
            : "inline-flex items-center rounded-md border border-[rgba(30,26,22,0.2)] bg-transparent px-3 py-[9px] text-sm text-ink transition-colors duration-180 hover:bg-[rgba(30,26,22,0.04)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
        }
        aria-label={t('language')}
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        {lang.toUpperCase()}
      </button>

      {open && (
        <ul
          role="listbox"
          aria-label={t('language')}
          className="absolute right-0 top-full mt-2 z-50 min-w-[160px] rounded-lg border border-border bg-sheet py-1"
        >
          {languages.map((l) => (
            <li key={l} role="option" aria-selected={lang === l}>
              <button
                onClick={() => { setLang(l); setOpen(false); }}
                className={`w-full text-left px-4 py-2.5 text-sm transition-colors hover:bg-secondary flex items-center justify-between ${
                  lang === l ? 'font-bold text-primary' : 'text-foreground'
                }`}
              >
                <span>{languageNames[l]}</span>
                <span className="text-xs text-muted-foreground">{l.toUpperCase()}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
