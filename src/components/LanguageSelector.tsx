import { useLanguage } from '@/contexts/LanguageContext';
import { Globe, ChevronDown } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { Language, languageNames } from '@/lib/i18n';

const languages: Language[] = ['es', 'en', 'fr', 'de', 'pt', 'it', 'nl'];

export default function LanguageSelector() {
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
        onClick={() => setOpen(!open)}
        className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
        aria-label={t('language')}
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        <Globe className="h-3.5 w-3.5" aria-hidden="true" />
        {lang.toUpperCase()}
        <ChevronDown className={`h-3 w-3 transition-transform ${open ? 'rotate-180' : ''}`} aria-hidden="true" />
      </button>

      {open && (
        <ul
          role="listbox"
          aria-label={t('language')}
          className="absolute right-0 top-full mt-2 z-50 min-w-[160px] rounded-xl border border-border bg-card shadow-lg py-1 animate-in fade-in-0 zoom-in-95"
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
