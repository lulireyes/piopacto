import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSelector from '@/components/LanguageSelector';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Heart, FileText, ArrowRight, Smartphone } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.5, ease: 'easeOut' },
  }),
};

export default function Landing() {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const features = [
    { icon: Shield, title: t('featureTitle1'), desc: t('featureDesc1') },
    { icon: Heart, title: t('featureTitle2'), desc: t('featureDesc2') },
    { icon: FileText, title: t('featureTitle3'), desc: t('featureDesc3') },
  ];

  const steps = [
    { num: '1', title: t('step1Title'), desc: t('step1Desc') },
    { num: '2', title: t('step2Title'), desc: t('step2Desc') },
    { num: '3', title: t('step3Title'), desc: t('step3Desc') },
  ];

  return (
    <div className="min-h-screen gradient-hero">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 max-w-5xl mx-auto">
        <div className="flex items-center gap-2">
          <Smartphone className="h-6 w-6 text-primary" />
          <span className="font-bold text-lg text-foreground">PactoDigital</span>
        </div>
        <LanguageSelector />
      </header>

      {/* Hero */}
      <section className="px-6 pt-16 pb-20 max-w-3xl mx-auto text-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={0}
          className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-6"
        >
          <Heart className="h-3.5 w-3.5" />
          {t('heroTime')}
        </motion.div>

        <motion.h1
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={1}
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground leading-tight mb-6"
        >
          {t('heroTitle')}
        </motion.h1>

        <motion.p
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={2}
          className="text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto mb-10"
        >
          {t('heroSubtitle')}
        </motion.p>

        <motion.button
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={3}
          onClick={() => navigate('/onboarding')}
          className="inline-flex items-center gap-2 gradient-primary text-primary-foreground font-bold text-lg px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
        >
          {t('heroCta')}
          <ArrowRight className="h-5 w-5" />
        </motion.button>
      </section>

      {/* Features */}
      <section className="px-6 pb-20 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={i}
              className="bg-card rounded-2xl p-8 shadow-sm border border-border"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <f.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">{f.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="px-6 pb-24 max-w-3xl mx-auto">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={0}
          className="text-2xl sm:text-3xl font-extrabold text-foreground text-center mb-12"
        >
          {t('howItWorksTitle')}
        </motion.h2>

        <div className="space-y-8">
          {steps.map((s, i) => (
            <motion.div
              key={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={i}
              className="flex gap-5 items-start"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-full gradient-primary text-primary-foreground font-bold flex items-center justify-center text-lg">
                {s.num}
              </div>
              <div>
                <h3 className="font-bold text-foreground text-lg">{s.title}</h3>
                <p className="text-muted-foreground text-sm mt-1">{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-6 text-center">
        <p className="text-sm text-muted-foreground">{t('footerText')}</p>
      </footer>
    </div>
  );
}
