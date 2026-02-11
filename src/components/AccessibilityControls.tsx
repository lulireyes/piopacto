import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Eye, Type } from 'lucide-react';

export default function AccessibilityControls() {
  const { lang } = useLanguage();
  const [highContrast, setHighContrast] = useState(false);
  const [largeText, setLargeText] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('high-contrast', highContrast);
  }, [highContrast]);

  useEffect(() => {
    document.documentElement.style.setProperty(
      '--base-font-size',
      largeText ? '118%' : '100%'
    );
  }, [largeText]);

  return (
    <div className="flex items-center gap-1" role="group" aria-label={lang === 'es' ? 'Controles de accesibilidad' : 'Accessibility controls'}>
      <button
        onClick={() => setHighContrast(!highContrast)}
        className={`inline-flex items-center justify-center w-8 h-8 rounded-full border transition-colors ${
          highContrast
            ? 'border-primary bg-primary/10 text-primary'
            : 'border-border bg-card text-muted-foreground hover:text-foreground hover:bg-secondary'
        }`}
        aria-label={lang === 'es' ? 'Activar alto contraste' : 'Toggle high contrast'}
        aria-pressed={highContrast}
        title={lang === 'es' ? 'Alto contraste' : 'High contrast'}
      >
        <Eye className="h-3.5 w-3.5" aria-hidden="true" />
      </button>
      <button
        onClick={() => setLargeText(!largeText)}
        className={`inline-flex items-center justify-center w-8 h-8 rounded-full border transition-colors ${
          largeText
            ? 'border-primary bg-primary/10 text-primary'
            : 'border-border bg-card text-muted-foreground hover:text-foreground hover:bg-secondary'
        }`}
        aria-label={lang === 'es' ? 'Aumentar tamaño de texto' : 'Increase text size'}
        aria-pressed={largeText}
        title={lang === 'es' ? 'Texto grande' : 'Large text'}
      >
        <Type className="h-3.5 w-3.5" aria-hidden="true" />
      </button>
    </div>
  );
}
