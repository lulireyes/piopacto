import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSelector from '@/components/LanguageSelector';
import AccessibilityControls from '@/components/AccessibilityControls';
import BrandMark from '@/components/BrandMark';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  onScrollTo?: (id: string) => void;
  maxWidth?: string;
  hideNavItems?: boolean;
}

const NAV_LINKS = [
  { key: 'navHowItWorks', id: 'como' },
  { key: 'navPhoneGuide', id: 'guia' },
  { key: 'navFaq', id: 'faq' },
] as const;

export default function Navbar({ onScrollTo, maxWidth = 'max-w-[1180px]', hideNavItems = false }: NavbarProps) {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isLanding = location.pathname === '/';

  const handleScrollOrNavigate = (sectionId: string) => {
    setMobileOpen(false);
    if (isLanding && onScrollTo) {
      onScrollTo(sectionId);
    } else {
      navigate(`/#${sectionId}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-paper border-b border-border" role="banner">
      <div className={`flex items-center gap-6 flex-wrap px-8 py-[14px] ${maxWidth} mx-auto`}>
        <button
          type="button"
          onClick={() => navigate('/')}
          className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2 focus-visible:ring-offset-paper rounded-md"
          aria-label={`${t('brandName')}${isLanding ? '' : ` — ${t('back')}`}`}
        >
          <BrandMark name={t('brandName')} />
        </button>

        {!hideNavItems && (
          <nav
            className="hidden md:flex flex-1 items-center justify-center gap-[26px] text-[15px] flex-wrap"
            aria-label={t('mainNavigation')}
          >
            {NAV_LINKS.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleScrollOrNavigate(item.id)}
                className="text-ink no-underline transition-colors duration-180 hover:text-link"
              >
                {t(item.key)}
              </button>
            ))}
          </nav>
        )}

        {hideNavItems && <div className="hidden md:block flex-1" />}

        <div className="flex items-center gap-2.5 ml-auto md:ml-0">
          <AccessibilityControls />
          <LanguageSelector />
          <Button type="button" onClick={() => { setMobileOpen(false); navigate('/crear'); }}>
            {t('navCreatePact')}
          </Button>
          {!hideNavItems && (
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav-menu"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-md border border-[rgba(30,26,22,0.2)] text-ink hover:bg-[rgba(30,26,22,0.04)] transition-colors duration-180"
            >
              {mobileOpen ? <X className="h-5 w-5" strokeWidth={1.75} /> : <Menu className="h-5 w-5" strokeWidth={1.75} />}
            </button>
          )}
        </div>
      </div>

      {mobileOpen && !hideNavItems && (
        <nav
          id="mobile-nav-menu"
          className="md:hidden border-t border-border bg-paper px-8 py-4 space-y-1"
          aria-label={t('mainNavigation')}
        >
          {NAV_LINKS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => handleScrollOrNavigate(item.id)}
              className="block w-full text-left px-1 py-3 text-[15px] text-ink transition-colors duration-180 hover:text-link"
            >
              {t(item.key)}
            </button>
          ))}
        </nav>
      )}
    </header>
  );
}
