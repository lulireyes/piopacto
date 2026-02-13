import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSelector from '@/components/LanguageSelector';
import AccessibilityControls from '@/components/AccessibilityControls';
import { Smartphone, Menu, X } from 'lucide-react';

interface NavbarProps {
  /** Optional scroll-to handler for in-page sections (used on Landing) */
  onScrollTo?: (id: string) => void;
  /** Max width class for the inner container */
  maxWidth?: string;
}

export default function Navbar({ onScrollTo, maxWidth = 'max-w-7xl' }: NavbarProps) {
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

  const navItems = [
    { label: t('navAbout'), action: () => handleScrollOrNavigate('about-section') },
    { label: t('navGuide'), action: () => handleScrollOrNavigate('guide-section') },
    { label: t('navSetupGuide'), action: () => { setMobileOpen(false); navigate('/tech-guide?platform=iphone'); }, highlight: true },
  ];

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border/40" role="banner">
      <nav className={`flex items-center justify-between px-6 lg:px-10 py-4 ${maxWidth} mx-auto`} aria-label={t('mainNavigation')}>
        {/* Logo — always links home */}
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 rounded-lg"
          aria-label={`${t('brandName')} — ${isLanding ? '' : t('back')}`}
        >
          <Smartphone className="h-5 w-5 text-primary" aria-hidden="true" />
          <span className="font-extrabold text-lg tracking-tight text-foreground">{t('brandName')}</span>
        </button>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1 sm:gap-3">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={item.action}
              className={`text-sm font-medium transition-colors duration-200 px-3 py-1.5 rounded-lg focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 ${
                item.highlight
                  ? 'text-primary hover:text-primary/80 hover:bg-primary/5'
                  : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
              }`}
            >
              {item.label}
            </button>
          ))}
          <AccessibilityControls />
          <LanguageSelector />
        </div>

        {/* Mobile: controls + hamburger */}
        <div className="flex md:hidden items-center gap-2">
          <AccessibilityControls />
          <LanguageSelector />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-menu"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            className="p-2 rounded-lg text-foreground hover:bg-secondary transition-colors focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div
          id="mobile-nav-menu"
          className="md:hidden border-t border-border/40 bg-background/98 backdrop-blur-md px-6 py-4 space-y-1 animate-in slide-in-from-top-2 duration-200"
          role="menu"
        >
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={item.action}
              role="menuitem"
              className={`block w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 ${
                item.highlight
                  ? 'text-primary hover:bg-primary/5'
                  : 'text-foreground hover:bg-secondary'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
