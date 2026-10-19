import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import BrandMark from '@/components/BrandMark';
import { Heart, Coffee, Home, CheckCircle2, ArrowRight, Settings, Smartphone } from 'lucide-react';

export default function SuccessPage() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [feedback, setFeedback] = useState('');
  const [feedbackSent, setFeedbackSent] = useState(false);

  return (
    <div className="min-h-screen bg-paper flex flex-col">
      <header className="border-b border-border bg-paper" role="banner">
        <div className="flex items-center justify-between px-6 py-4 max-w-3xl mx-auto">
          <BrandMark name={t('brandName')} compact />
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="max-w-lg w-full space-y-10">

          <div className="text-center space-y-5">
            <CheckCircle2 className="h-10 w-10 text-terracotta mx-auto" />
            <h1 className="font-display text-h2 md:text-h2-lg text-ink">
              {t('downloadSuccess')}
            </h1>
            <p className="text-ink-soft text-lead leading-relaxed max-w-md mx-auto">
              {t('downloadMessage')}
            </p>
          </div>

          <div className="bg-sheet rounded-lg border border-border p-7">
            <p className="font-semibold text-ink mb-4">{t('feedbackInvite')}</p>
            {!feedbackSent ? (
              <div className="space-y-4">
                <label className="block text-sm font-medium text-ink" htmlFor="feedback">
                  {t('feedbackInvite')}
                </label>
                <textarea
                  id="feedback"
                  value={feedback}
                  onChange={e => setFeedback(e.target.value)}
                  placeholder={t('feedbackPlaceholder')}
                  maxLength={500}
                  rows={4}
                  className="input-paper w-full"
                />
                <button
                  onClick={() => { if (feedback.trim()) setFeedbackSent(true); }}
                  className="w-full rounded-md bg-terracotta-strong text-cream text-btn px-[26px] py-4 hover:bg-terracotta-hover transition-colors duration-180"
                >
                  {t('feedbackSend')}
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3 py-4">
                <Heart className="h-5 w-5 text-terracotta" aria-hidden="true" />
                <p className="text-terracotta-strong font-semibold">{t('feedbackThanks')}</p>
              </div>
            )}
          </div>

          <div className="bg-sheet rounded-lg border border-border p-7">
            <p className="font-semibold text-ink mb-2">{t('successGuideTitle')}</p>
            <p className="text-sm text-ink-soft mb-5">{t('successGuideDesc')}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={() => navigate('/tech-guide?platform=iphone')}
                className="flex items-center gap-3 rounded-md border border-border p-4 hover:bg-[rgba(30,26,22,0.04)] transition-colors duration-180 group"
              >
                <Smartphone className="h-5 w-5 text-ink" aria-hidden="true" />
                <span className="font-medium text-ink text-sm">{t('guideIphone')}</span>
                <ArrowRight className="h-4 w-4 text-terracotta ml-auto" aria-hidden="true" />
              </button>
              <button
                onClick={() => navigate('/tech-guide?platform=android')}
                className="flex items-center gap-3 rounded-md border border-border p-4 hover:bg-[rgba(30,26,22,0.04)] transition-colors duration-180 group"
              >
                <Settings className="h-5 w-5 text-ink" aria-hidden="true" />
                <span className="font-medium text-ink text-sm">{t('guideAndroid')}</span>
                <ArrowRight className="h-4 w-4 text-terracotta ml-auto" aria-hidden="true" />
              </button>
            </div>
          </div>

          <div className="text-center space-y-4">
            <p className="text-sm text-ink-soft">{t('supportProject')}</p>
            <a
              href="https://buymeacoffee.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md bg-ink text-paper text-base font-semibold px-[22px] py-[13px] hover:bg-ink/90 transition-colors duration-180"
            >
              <Coffee className="h-5 w-5" aria-hidden="true" />
              {t('supportCta')}
            </a>
          </div>

          <div className="text-center pt-4">
            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center gap-2 text-ink-soft hover:text-ink font-medium transition-colors duration-180"
            >
              <Home className="h-4 w-4" aria-hidden="true" />
              {t('startOver')}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
