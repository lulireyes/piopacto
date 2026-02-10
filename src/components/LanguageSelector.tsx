import { useLanguage } from '@/contexts/LanguageContext';
import { Globe } from 'lucide-react';

export default function LanguageSelector() {
  const { lang, setLang, t } = useLanguage();

  return (
    <button
      onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
      className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
      aria-label={t('language')}
    >
      <Globe className="h-3.5 w-3.5" />
      {lang === 'es' ? 'EN' : 'ES'}
    </button>
  );
}
