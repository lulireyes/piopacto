import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSelector from '@/components/LanguageSelector';
import AccessibilityControls from '@/components/AccessibilityControls';
import { useNavigate } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import {
  Shield, Heart, FileText, ArrowRight, Smartphone, Check,
  Clock, MessageCircle, Users, Sparkles, BookOpen, Coffee,
  ChevronDown, Lock, Download, Settings, Eye, Star, HandHeart,
  RefreshCw
} from 'lucide-react';
import { useState, useMemo } from 'react';

import heroImg from '@/assets/hero-photo.jpg';
import problemImg from '@/assets/problem-photo.jpg';
import solutionImg from '@/assets/solution-photo.jpg';
import agreementImg from '@/assets/agreement-photo.jpg';

export default function Landing() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const prefersReducedMotion = useReducedMotion();

  // WCAG 2.1 AA compliant animations: max 300ms, ease-out, only opacity + transform
  const fadeUp = useMemo(() => ({
    hidden: prefersReducedMotion
      ? { opacity: 0 }
      : { opacity: 0, y: 10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.08,
        duration: prefersReducedMotion ? 0.15 : 0.3,
        ease: 'easeOut',
      },
    }),
  }), [prefersReducedMotion]);

  const faqs = [
    { q: t('faq1Q'), a: t('faq1A') },
    { q: t('faq2Q'), a: t('faq2A') },
    { q: t('faq3Q'), a: t('faq3A') },
    { q: t('faq4Q'), a: t('faq4A') },
    { q: t('faq5Q'), a: t('faq5A') },
  ];

  // Helper to render "Smartphone." with green "Smartphone" and green "."
  const renderSmartphoneTitle = (text: string) => {
    const parts = text.split('Smartphone');
    return parts.map((part, i, arr) =>
      i < arr.length - 1 ? (
        <span key={i}>{part}<span className="text-primary">Smartphone</span></span>
      ) : (
        // The remaining part (e.g. ".") should also be green
        <span key={i}><span className="text-primary">{part}</span></span>
      )
    );
  };

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      <a href="#main-content" className="skip-link">
        {t('skipToContent')}
      </a>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border/40" role="banner">
        <nav className="flex items-center justify-between px-6 lg:px-10 py-4 max-w-7xl mx-auto" aria-label={t('mainNavigation')}>
          <div className="flex items-center gap-2">
            <Smartphone className="h-5 w-5 text-primary" aria-hidden="true" />
            <span className="font-extrabold text-lg tracking-tight text-foreground">{t('brandName')}</span>
          </div>
          <div className="flex items-center gap-1 sm:gap-3">
            <button onClick={() => scrollTo('about-section')} className="hidden sm:inline-flex text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 px-3 py-1.5 rounded-lg hover:bg-secondary">
              {t('navAbout')}
            </button>
            <button onClick={() => scrollTo('guide-section')} className="hidden sm:inline-flex text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 px-3 py-1.5 rounded-lg hover:bg-secondary">
              {t('navGuide')}
            </button>
            <AccessibilityControls />
            <LanguageSelector />
          </div>
        </nav>
      </header>

      <main id="main-content" role="main">

        {/* ===== HERO — Centered, emotional ===== */}
        <section className="px-6 lg:px-10 pt-20 sm:pt-28 pb-16 sm:pb-20" aria-labelledby="hero-heading">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2 text-sm font-medium text-muted-foreground mb-8 shadow-sm">
              {t('heroMicrocopy')}
            </motion.div>

            <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={1}
              id="hero-heading" role="heading" aria-level={2}
              className="font-display text-4xl sm:text-5xl lg:text-[3.5rem] xl:text-6xl font-black text-foreground leading-[1.08] mb-8 tracking-tight">
              <span className="block">{t('heroTitle1')}</span>
              <span className="block mt-2">
                {renderSmartphoneTitle(t('heroTitle2'))}
              </span>
            </motion.div>

            <motion.p initial="hidden" animate="visible" variants={fadeUp} custom={2}
              className="text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto mb-10 whitespace-pre-line leading-relaxed">
              {t('heroSubtitle')}
            </motion.p>

            <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={3}>
              <button
                onClick={() => navigate('/onboarding')}
                aria-label={t('heroCta')}
                className="group inline-flex items-center gap-3 gradient-primary text-primary-foreground font-bold text-lg px-10 py-5 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.02] focus-visible:scale-[1.02]"
              >
                {t('heroCta')}
                <ArrowRight className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
              </button>
            </motion.div>
          </div>

          {/* Hero image below CTA */}
          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={4}
            className="max-w-4xl mx-auto mt-16">
            <img
              src={heroImg}
              alt={t('heroImageAlt')}
              className="w-full rounded-3xl shadow-xl"
              loading="eager"
            />
          </motion.div>
        </section>

        {/* ===== Narrative bridge — SEO H1 ===== */}
        <section className="px-6 lg:px-10 py-16 sm:py-20">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground leading-relaxed">
              {t('seoH1')}
            </h1>
          </div>
        </section>

        {/* ===== PROBLEM ===== */}
        <section className="px-6 lg:px-10 py-20 sm:py-28" aria-labelledby="problem-heading">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}
              className="flex justify-center lg:justify-start order-2 lg:order-1">
              <img src={problemImg} alt={t('problemImageAlt')} className="w-full max-w-md rounded-2xl shadow-lg" loading="lazy" />
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1}
              className="order-1 lg:order-2">
              <h2 id="problem-heading" className="font-display text-2xl sm:text-3xl lg:text-4xl font-black text-foreground mb-6 leading-tight">
                {t('problemTitle')}
              </h2>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">{t('problemIntro')}</p>

              <div className="space-y-3 mb-8" role="list" aria-label={t('problemQuestionsLabel')}>
                {[t('problemQ1'), t('problemQ2'), t('problemQ3'), t('problemQ4')].map((q, i) => (
                  <div key={i} role="listitem" className="flex items-start gap-3 bg-warm rounded-xl p-4">
                    <MessageCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <p className="text-foreground font-medium leading-relaxed text-sm">{q}</p>
                  </div>
                ))}
              </div>

              
            </motion.div>
          </div>
        </section>

        {/* ===== SOLUTION ===== */}
        <section className="px-6 lg:px-10 py-20 sm:py-28 bg-warm" aria-labelledby="solution-heading">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
              <h2 id="solution-heading" className="font-display text-2xl sm:text-3xl lg:text-4xl font-black text-foreground mb-6 leading-tight">
                {t('solutionTitle')}
              </h2>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">{t('solutionIntro')}</p>

              <div className="space-y-4 mb-8">
                {[
                  { icon: Users, text: t('solutionPoint1') },
                  { icon: MessageCircle, text: t('solutionPoint2') },
                  { icon: FileText, text: t('solutionPoint3') },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <item.icon className="h-5 w-5 text-primary" aria-hidden="true" />
                    </div>
                    <p className="font-medium text-foreground leading-relaxed pt-2">{item.text}</p>
                  </div>
                ))}
              </div>
              <p className="text-muted-foreground leading-relaxed">{t('solutionDesc')}</p>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1}
              className="flex justify-center lg:justify-end">
              <img src={solutionImg} alt={t('solutionImageAlt')} className="w-full max-w-md rounded-2xl shadow-lg" loading="lazy" />
            </motion.div>
          </div>
        </section>

        {/* ===== HOW IT WORKS — 3 steps ===== */}
        <section className="px-6 lg:px-10 py-24 sm:py-32" aria-labelledby="how-heading">
          <div className="max-w-4xl mx-auto">
            <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}
              id="how-heading" className="font-display text-2xl sm:text-3xl lg:text-4xl font-black text-foreground text-center mb-20">
              {t('howItWorksTitle')}
            </motion.h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
              {[
                { num: '1', icon: MessageCircle, title: t('step1Title'), desc: t('step1Desc') },
                { num: '2', icon: Sparkles, title: t('step2Title'), desc: t('step2Desc') },
                { num: '3', icon: Download, title: t('step3Title'), desc: t('step3Desc') },
              ].map((s, i) => (
                <motion.article key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}
                  className="text-center">
                  <div className="w-14 h-14 rounded-2xl gradient-primary text-primary-foreground font-bold flex items-center justify-center text-xl mx-auto mb-5" aria-hidden="true">
                    {s.num}
                  </div>
                  <h3 className="font-bold text-foreground text-lg mb-2">{s.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* ===== DIFFERENTIATORS ===== */}
        <section className="px-6 lg:px-10 py-24 sm:py-28 bg-warm" aria-labelledby="diff-heading">
          <div className="max-w-5xl mx-auto">
            <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}
              id="diff-heading" className="font-display text-2xl sm:text-3xl lg:text-4xl font-black text-foreground text-center mb-16">
              {t('diffTitle')}
            </motion.h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: Settings, title: t('diff1'), desc: t('diff1Desc') },
                { icon: Heart, title: t('diff2'), desc: t('diff2Desc') },
                { icon: Shield, title: t('diff3'), desc: t('diff3Desc') },
                { icon: Users, title: t('diff4'), desc: t('diff4Desc') },
                { icon: RefreshCw, title: t('diff5'), desc: t('diff5Desc') },
              ].map((d, i) => (
                <motion.article key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}
                  className="bg-card rounded-2xl p-8 border border-border/40 shadow-sm hover:shadow-md transition-shadow duration-200">
                  <d.icon className="h-6 w-6 text-primary mb-5" aria-hidden="true" />
                  <h3 className="font-bold text-foreground mb-2 text-lg">{d.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{d.desc}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* ===== WHAT'S INCLUDED ===== */}
        <section className="px-6 lg:px-10 py-24 sm:py-28" aria-labelledby="includes-heading">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}
              className="flex justify-center lg:justify-start">
              <img src={agreementImg} alt={t('agreementImageAlt')} className="w-full max-w-sm rounded-2xl shadow-lg" loading="lazy" />
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1}>
              <h2 id="includes-heading" className="font-display text-2xl sm:text-3xl lg:text-4xl font-black text-foreground mb-10">
                {t('includesTitle')}
              </h2>

              <ul className="space-y-3 mb-10" role="list">
                {[t('includes1'), t('includes2'), t('includes3'), t('includes4'), t('includes5'), t('includes6')].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 bg-card rounded-xl p-4 border border-border/40 shadow-sm">
                    <Check className="h-5 w-5 text-primary flex-shrink-0" aria-hidden="true" />
                    <span className="text-foreground font-medium">{item}</span>
                  </li>
                ))}
              </ul>

              <blockquote className="bg-warm rounded-xl p-6 border-l-4 border-primary/30">
                <p className="text-foreground italic leading-relaxed whitespace-pre-line">{t('includesQuote')}</p>
              </blockquote>
            </motion.div>
          </div>
        </section>

        {/* ===== ABOUT ===== */}
        <section id="about-section" className="px-6 lg:px-10 py-24 sm:py-28 bg-warm" aria-labelledby="about-heading">
          <div className="max-w-2xl mx-auto">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
              <h2 id="about-heading" className="font-display text-2xl sm:text-3xl font-black text-foreground mb-4">
                {t('aboutTitle')}
              </h2>
              <p className="text-primary font-medium text-lg mb-10 italic whitespace-pre-line">{t('aboutMotto')}</p>
              <div className="space-y-6 text-foreground leading-[1.8] text-[1.05rem]">
                <p>{t('aboutP1')}</p>
                <p>{t('aboutP2')}</p>
                <p>{t('aboutP3')}</p>
                <p>{t('aboutP4')}</p>
                <p>
                  {t('aboutP5')}{' '}
                  <a href="mailto:feedback@kidsmartphone.com" className="underline text-primary hover:text-foreground transition-colors duration-200">
                    {t('aboutFeedbackLink')}
                  </a>
                </p>
                <p className="font-medium text-muted-foreground">{t('aboutP6')}</p>
                <div className="pt-4 border-t border-border/40">
                  <p className="font-bold text-foreground">{t('aboutSignName')}</p>
                  <p className="text-muted-foreground text-sm">{t('aboutSignDesc')}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ===== SUPPORT THE PROJECT ===== */}
        <section className="px-6 lg:px-10 py-24 max-w-2xl mx-auto text-center" aria-labelledby="support-heading">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <HandHeart className="h-10 w-10 text-accent mx-auto mb-6" aria-hidden="true" />
            <h2 id="support-heading" className="font-display text-2xl sm:text-3xl font-black text-foreground mb-4">
              {t('supportTitle')}
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8 max-w-md mx-auto">
              {t('supportDesc')}
            </p>
            <a
              href="https://buymeacoffee.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 bg-accent text-accent-foreground font-bold px-8 py-3.5 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 hover:scale-[1.02] focus-visible:scale-[1.02]"
              aria-label={t('supportCta')}
            >
              <Coffee className="h-5 w-5" aria-hidden="true" />
              {t('supportCta')}
            </a>
            <p className="text-xs text-muted-foreground mt-4">{t('supportNote')}</p>
          </motion.div>
        </section>

        {/* ===== SEO GUIDE ===== */}
        <section id="guide-section" className="px-6 lg:px-10 py-24 bg-warm" aria-labelledby="guide-heading">
          <div className="max-w-3xl mx-auto">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
              <h2 id="guide-heading" className="font-display text-2xl sm:text-3xl font-black text-foreground mb-5">
                {t('guideTitle')}
              </h2>
              <p className="text-muted-foreground mb-10 leading-relaxed">{t('guideIntro')}</p>

              <ul className="space-y-3 mb-10" role="list">
                {[
                  { icon: Clock, text: t('guide1') },
                  { icon: Lock, text: t('guide2') },
                  { icon: Shield, text: t('guide3') },
                  { icon: FileText, text: t('guide4') },
                  { icon: Eye, text: t('guide5') },
                ].map((g, i) => (
                  <li key={i} className="flex items-center gap-4 bg-card rounded-xl p-5 border border-border/40 shadow-sm">
                    <g.icon className="h-5 w-5 text-primary flex-shrink-0" aria-hidden="true" />
                    <span className="text-foreground font-medium">{g.text}</span>
                  </li>
                ))}
              </ul>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  onClick={() => navigate('/tech-guide?platform=iphone')}
                  className="flex items-center justify-center gap-3 bg-card rounded-xl p-6 border border-border/40 shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-200 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                    <Smartphone className="h-5 w-5 text-primary" aria-hidden="true" />
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-foreground">{t('guideIphone')}</p>
                    <p className="text-xs text-muted-foreground">{t('guideDownloadPdf')}</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all ml-auto" aria-hidden="true" />
                </button>
                <button
                  onClick={() => navigate('/tech-guide?platform=android')}
                  className="flex items-center justify-center gap-3 bg-card rounded-xl p-6 border border-border/40 shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-200 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                    <Settings className="h-5 w-5 text-primary" aria-hidden="true" />
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-foreground">{t('guideAndroid')}</p>
                    <p className="text-xs text-muted-foreground">{t('guideDownloadPdf')}</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all ml-auto" aria-hidden="true" />
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ===== FAQ ===== */}
        <section className="px-6 lg:px-10 py-24 max-w-3xl mx-auto" aria-labelledby="faq-heading">
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}
            id="faq-heading" className="font-display text-2xl sm:text-3xl font-black text-foreground text-center mb-16">
            {t('faqTitle')}
          </motion.h2>

          <div className="space-y-3" role="list">
            {faqs.map((faq, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}
                className="bg-card rounded-xl border border-border/40 overflow-hidden shadow-sm" role="listitem">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left"
                  aria-expanded={openFaq === i}
                  aria-controls={`faq-answer-${i}`}
                  id={`faq-question-${i}`}
                >
                  <span className="font-semibold text-foreground pr-4 leading-snug">{faq.q}</span>
                  <ChevronDown className={`h-5 w-5 text-muted-foreground flex-shrink-0 transition-transform duration-200 ${openFaq === i ? 'rotate-180' : ''}`} aria-hidden="true" />
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-6 pt-0" id={`faq-answer-${i}`} role="region" aria-labelledby={`faq-question-${i}`}>
                    <p className="text-muted-foreground text-sm leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </section>

        {/* ===== FINAL CTA ===== */}
        <section className="px-6 lg:px-10 py-28 sm:py-36 text-center bg-warm" aria-labelledby="final-cta-heading">
          <div className="max-w-2xl mx-auto">
            <h2 id="final-cta-heading" className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-foreground mb-6 leading-tight">
              <span className="block">{t('heroTitle1')}</span>
              <span className="block mt-2">
                {renderSmartphoneTitle(t('heroTitle2'))}
              </span>
            </h2>
            <p className="text-muted-foreground text-lg mb-10 leading-relaxed">{t('solutionDesc')}</p>
            <button
              onClick={() => navigate('/onboarding')}
              className="group inline-flex items-center gap-3 gradient-primary text-primary-foreground font-bold text-xl px-12 py-5 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.02] focus-visible:scale-[1.02]"
              aria-label={t('heroCta')}
            >
              {t('heroCta')}
              <ArrowRight className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
            </button>
            <p className="text-sm text-muted-foreground mt-5">{t('heroMicrocopy')}</p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/40 py-10 px-6 lg:px-10" role="contentinfo">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-5 mb-6">
            <div className="flex items-center gap-2">
              <Smartphone className="h-4 w-4 text-primary" aria-hidden="true" />
              <span className="font-bold text-sm text-foreground">{t('brandName')}</span>
            </div>
            <p className="text-sm text-muted-foreground text-center">{t('footerText')}</p>
            <a
              href="https://buymeacoffee.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors duration-200 flex items-center gap-1.5"
              aria-label={t('footerSupport')}
            >
              <Coffee className="h-3.5 w-3.5" aria-hidden="true" /> {t('footerSupport')}
            </a>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground">
            <a href="/terms" className="hover:text-foreground transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 rounded">
              {t('footerTerms')}
            </a>
            <span aria-hidden="true">·</span>
            <a href="/privacy" className="hover:text-foreground transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 rounded">
              {t('footerPrivacy')}
            </a>
            <span aria-hidden="true">·</span>
            <a href="mailto:legal@kidsmartphone.com" className="hover:text-foreground transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 rounded">
              {t('footerContact')}
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
