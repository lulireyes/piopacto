import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSelector from '@/components/LanguageSelector';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Shield, Heart, FileText, ArrowRight, Smartphone, Check,
  Clock, MessageCircle, Users, Sparkles, BookOpen, Coffee,
  ChevronDown, Lock, Download, Settings, Eye
} from 'lucide-react';
import { useState } from 'react';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: 'easeOut' },
  }),
};

export default function Landing() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    { q: t('faq1Q'), a: t('faq1A') },
    { q: t('faq2Q'), a: t('faq2A') },
    { q: t('faq3Q'), a: t('faq3A') },
    { q: t('faq4Q'), a: t('faq4A') },
    { q: t('faq5Q'), a: t('faq5A') },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="flex items-center justify-between px-6 py-3 max-w-5xl mx-auto">
          <div className="flex items-center gap-2">
            <Smartphone className="h-5 w-5 text-primary" />
            <span className="font-extrabold text-lg text-foreground">{t('brandName')}</span>
          </div>
          <LanguageSelector />
        </div>
      </header>

      {/* ===== HERO ===== */}
      <section className="gradient-hero px-6 pt-20 pb-24 text-center">
        <div className="max-w-3xl mx-auto">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0}
            className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-8">
            <Heart className="h-3.5 w-3.5" /> {t('heroMicrocopy')}
          </motion.div>

          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={1}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground leading-tight mb-6">
            <span className="block">{t('heroTitle1')}</span>
            <span className="block text-primary">{t('heroTitle2')}</span>
          </motion.div>

          <motion.p initial="hidden" animate="visible" variants={fadeUp} custom={2}
            className="text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto mb-10 whitespace-pre-line">
            {t('heroSubtitle')}
          </motion.p>

          <motion.button initial="hidden" animate="visible" variants={fadeUp} custom={3}
            onClick={() => navigate('/onboarding')}
            className="inline-flex items-center gap-2 gradient-primary text-primary-foreground font-bold text-lg px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:scale-[1.02]">
            {t('heroCta')}
            <ArrowRight className="h-5 w-5" />
          </motion.button>
        </div>
      </section>

      {/* ===== H1 SEO ===== */}
      <section className="px-6 py-12 max-w-4xl mx-auto text-center">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
          {t('seoH1')}
        </h1>
      </section>

      {/* ===== PROBLEM ===== */}
      <section className="px-6 py-16 max-w-3xl mx-auto">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground mb-4">{t('problemTitle')}</h2>
          <p className="text-muted-foreground text-lg mb-8">{t('problemIntro')}</p>

          <div className="space-y-4 mb-8">
            {[t('problemQ1'), t('problemQ2'), t('problemQ3'), t('problemQ4')].map((q, i) => (
              <div key={i} className="flex items-start gap-3 bg-warm rounded-xl p-4">
                <MessageCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                <p className="text-foreground font-medium">{q}</p>
              </div>
            ))}
          </div>

          <p className="text-foreground font-semibold text-lg whitespace-pre-line">{t('problemClosing')}</p>
        </motion.div>
      </section>

      {/* ===== SOLUTION ===== */}
      <section className="px-6 py-16 bg-warm">
        <div className="max-w-3xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground mb-4">{t('solutionTitle')}</h2>
            <p className="text-muted-foreground text-lg mb-8">{t('solutionIntro')}</p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              {[
                { icon: Users, text: t('solutionPoint1') },
                { icon: MessageCircle, text: t('solutionPoint2') },
                { icon: FileText, text: t('solutionPoint3') },
              ].map((item, i) => (
                <div key={i} className="bg-card rounded-xl p-5 border border-border text-center">
                  <item.icon className="h-8 w-8 text-primary mx-auto mb-3" />
                  <p className="font-semibold text-foreground text-sm">{item.text}</p>
                </div>
              ))}
            </div>
            <p className="text-muted-foreground text-center">{t('solutionDesc')}</p>
          </motion.div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="px-6 py-20 max-w-3xl mx-auto">
        <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}
          className="text-2xl sm:text-3xl font-extrabold text-foreground text-center mb-14">
          {t('howItWorksTitle')}
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {[
            { num: '1', icon: MessageCircle, title: t('step1Title'), desc: t('step1Desc') },
            { num: '2', icon: Sparkles, title: t('step2Title'), desc: t('step2Desc') },
            { num: '3', icon: Settings, title: t('step3Title'), desc: t('step3Desc') },
            { num: '4', icon: Download, title: t('step4Title'), desc: t('step4Desc') },
          ].map((s, i) => (
            <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}
              className="bg-card rounded-2xl p-6 border border-border">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full gradient-primary text-primary-foreground font-bold flex items-center justify-center text-lg">
                  {s.num}
                </div>
                <s.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-bold text-foreground text-lg mb-1">{s.title}</h3>
              <p className="text-muted-foreground text-sm">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ===== DIFFERENTIATORS ===== */}
      <section className="px-6 py-16 bg-warm">
        <div className="max-w-4xl mx-auto">
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}
            className="text-2xl sm:text-3xl font-extrabold text-foreground text-center mb-12">
            {t('diffTitle')}
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: Settings, title: t('diff1'), desc: t('diff1Desc') },
              { icon: Heart, title: t('diff2'), desc: t('diff2Desc') },
              { icon: Shield, title: t('diff3'), desc: t('diff3Desc') },
              { icon: Users, title: t('diff4'), desc: t('diff4Desc') },
              { icon: Sparkles, title: t('diff5'), desc: t('diff5Desc') },
            ].map((d, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}
                className="bg-card rounded-2xl p-6 border border-border">
                <d.icon className="h-6 w-6 text-primary mb-3" />
                <h3 className="font-bold text-foreground mb-1">{d.title}</h3>
                <p className="text-muted-foreground text-sm">{d.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== WHAT'S INCLUDED ===== */}
      <section className="px-6 py-20 max-w-3xl mx-auto">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground text-center mb-10">
            {t('includesTitle')}
          </h2>

          <div className="space-y-3 mb-10">
            {[t('includes1'), t('includes2'), t('includes3'), t('includes4'), t('includes5'), t('includes6')].map((item, i) => (
              <div key={i} className="flex items-center gap-3 bg-card rounded-xl p-4 border border-border">
                <Check className="h-5 w-5 text-primary flex-shrink-0" />
                <span className="text-foreground font-medium">{item}</span>
              </div>
            ))}
          </div>

          <blockquote className="bg-warm rounded-2xl p-6 text-center">
            <p className="text-foreground italic leading-relaxed whitespace-pre-line">{t('includesQuote')}</p>
          </blockquote>
        </motion.div>
      </section>

      {/* ===== ABOUT ===== */}
      <section className="px-6 py-16 bg-warm">
        <div className="max-w-2xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground mb-6">{t('aboutTitle')}</h2>
            <div className="space-y-4 text-foreground leading-relaxed">
              <p>{t('aboutP1')}</p>
              <p>{t('aboutP2')}</p>
              <p>{t('aboutP3')}</p>
              <p className="text-muted-foreground text-sm">{t('aboutP4')}</p>
            </div>
            <div className="mt-6 flex items-center gap-2">
              <Coffee className="h-4 w-4 text-accent" />
              <span className="text-sm text-muted-foreground">{t('aboutSupport')}</span>
              <a href="#" className="text-sm font-semibold text-primary hover:underline">{t('aboutSupportLink')}</a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== SEO GUIDE ===== */}
      <section className="px-6 py-20 max-w-3xl mx-auto">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground mb-4">{t('guideTitle')}</h2>
          <p className="text-muted-foreground mb-8">{t('guideIntro')}</p>

          <div className="space-y-3 mb-8">
            {[
              { icon: Clock, text: t('guide1') },
              { icon: Lock, text: t('guide2') },
              { icon: Shield, text: t('guide3') },
              { icon: FileText, text: t('guide4') },
              { icon: Eye, text: t('guide5') },
            ].map((g, i) => (
              <div key={i} className="flex items-center gap-3 bg-card rounded-xl p-4 border border-border">
                <g.icon className="h-5 w-5 text-primary flex-shrink-0" />
                <span className="text-foreground font-medium">{g.text}</span>
              </div>
            ))}
          </div>

          <div className="bg-warm rounded-2xl p-6 text-center">
            <p className="font-bold text-foreground mb-2">{t('guideDownload')}</p>
            <p className="text-sm text-muted-foreground">{t('guideDownloadSoon')}</p>
          </div>
        </motion.div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="px-6 py-16 bg-warm">
        <div className="max-w-3xl mx-auto">
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}
            className="text-2xl sm:text-3xl font-extrabold text-foreground text-center mb-10">
            {t('faqTitle')}
          </motion.h2>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}
                className="bg-card rounded-xl border border-border overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <span className="font-semibold text-foreground pr-4">{faq.q}</span>
                  <ChevronDown className={`h-5 w-5 text-muted-foreground flex-shrink-0 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5 pt-0">
                    <p className="text-muted-foreground text-sm leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section className="px-6 py-20 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground mb-4">{t('heroTitle1')} {t('heroTitle2')}</h2>
          <p className="text-muted-foreground mb-8">{t('solutionDesc')}</p>
          <button
            onClick={() => navigate('/onboarding')}
            className="inline-flex items-center gap-2 gradient-primary text-primary-foreground font-bold text-lg px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:scale-[1.02]"
          >
            {t('heroCta')}
            <ArrowRight className="h-5 w-5" />
          </button>
          <p className="text-sm text-muted-foreground mt-4">{t('heroMicrocopy')}</p>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="border-t border-border py-8 px-6">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Smartphone className="h-4 w-4 text-primary" />
            <span className="font-bold text-sm text-foreground">{t('brandName')}</span>
          </div>
          <p className="text-sm text-muted-foreground text-center">{t('footerText')}</p>
          <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
            <Coffee className="h-3 w-3" /> {t('footerSupport')}
          </a>
        </div>
      </footer>
    </div>
  );
}
