import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { Heart, Coffee, ArrowLeft, Smartphone, Home, CheckCircle2, ArrowRight, Settings } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.12, duration: 0.5, ease: 'easeOut' },
  }),
};

export default function SuccessPage() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [feedback, setFeedback] = useState('');
  const [feedbackSent, setFeedbackSent] = useState(false);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border/40 bg-background/95 backdrop-blur-md" role="banner">
        <div className="flex items-center justify-between px-6 py-4 max-w-3xl mx-auto">
          <div className="flex items-center gap-2">
            <Smartphone className="h-5 w-5 text-primary" aria-hidden="true" />
            <span className="font-bold text-foreground">{t('brandName')}</span>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="max-w-lg w-full space-y-10">

          {/* Success message */}
          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0}
            className="text-center space-y-5">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
              <CheckCircle2 className="h-10 w-10 text-primary" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground">
              {t('downloadSuccess')}
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-md mx-auto">
              {t('downloadMessage')}
            </p>
          </motion.div>

          {/* Feedback */}
          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={1}
            className="bg-card rounded-2xl border border-border/40 p-8 shadow-sm">
            <p className="font-semibold text-foreground mb-4">{t('feedbackInvite')}</p>
            {!feedbackSent ? (
              <div className="space-y-4">
                <textarea
                  value={feedback}
                  onChange={e => setFeedback(e.target.value)}
                  placeholder={t('feedbackPlaceholder')}
                  maxLength={500}
                  rows={4}
                  className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
                />
                <button
                  onClick={() => { if (feedback.trim()) setFeedbackSent(true); }}
                  className="w-full px-4 py-3 rounded-xl gradient-primary text-primary-foreground text-sm font-bold shadow-sm hover:shadow-md transition-shadow"
                >
                  {t('feedbackSend')}
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3 py-4">
                <Heart className="h-5 w-5 text-primary" aria-hidden="true" />
                <p className="text-primary font-semibold">{t('feedbackThanks')}</p>
              </div>
            )}
          </motion.div>

          {/* Tech Guide CTA */}
          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={1.5}
            className="bg-card rounded-2xl border border-border/40 p-8 shadow-sm">
            <p className="font-semibold text-foreground mb-2">{t('successGuideTitle')}</p>
            <p className="text-sm text-muted-foreground mb-5">{t('successGuideDesc')}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={() => navigate('/tech-guide?platform=iphone')}
                className="flex items-center gap-3 rounded-xl border border-border p-4 hover:border-primary/30 hover:shadow-sm transition-all group"
              >
                <Smartphone className="h-5 w-5 text-primary" aria-hidden="true" />
                <span className="font-medium text-foreground text-sm">{t('guideIphone')}</span>
                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary ml-auto" aria-hidden="true" />
              </button>
              <button
                onClick={() => navigate('/tech-guide?platform=android')}
                className="flex items-center gap-3 rounded-xl border border-border p-4 hover:border-primary/30 hover:shadow-sm transition-all group"
              >
                <Settings className="h-5 w-5 text-primary" aria-hidden="true" />
                <span className="font-medium text-foreground text-sm">{t('guideAndroid')}</span>
                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary ml-auto" aria-hidden="true" />
              </button>
            </div>
          </motion.div>

          {/* Support */}
          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={2}
            className="text-center space-y-4">
            <p className="text-sm text-muted-foreground">{t('supportProject')}</p>
            <a
              href="https://buymeacoffee.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 font-bold px-8 py-3.5 rounded-2xl bg-accent text-accent-foreground shadow-sm hover:shadow-md hover:scale-[1.02] transition-all"
            >
              <Coffee className="h-5 w-5" aria-hidden="true" />
              {t('supportCta')}
            </a>
          </motion.div>

          {/* Back to home */}
          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={3}
            className="text-center pt-4">
            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground font-medium transition-colors"
            >
              <Home className="h-4 w-4" aria-hidden="true" />
              {t('startOver')}
            </button>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
