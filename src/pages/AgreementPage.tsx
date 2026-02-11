import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSelector from '@/components/LanguageSelector';
import { motion } from 'framer-motion';
import { Smartphone, Download, Edit3, Plus, Trash2, ArrowLeft, X, Heart, Coffee, MessageCircle } from 'lucide-react';
import { OnboardingData, Agreement, AgreementRule, generateAgreement } from '@/lib/agreement-generator';

export default function AgreementPage() {
  const { t, lang } = useLanguage();
  const navigate = useNavigate();
  const agreementRef = useRef<HTMLDivElement>(null);
  const [editing, setEditing] = useState(false);
  const [newRule, setNewRule] = useState('');
  const [downloaded, setDownloaded] = useState(false);
  const [feedbackSent, setFeedbackSent] = useState(false);
  const [feedback, setFeedback] = useState('');

  const rawData = sessionStorage.getItem('onboardingData');
  const onboardingData: OnboardingData | null = rawData ? JSON.parse(rawData) : null;

  const [agreement, setAgreement] = useState<Agreement | null>(null);

  useEffect(() => {
    if (!onboardingData) {
      navigate('/');
      return;
    }
    setAgreement(generateAgreement(onboardingData, lang));
  }, [lang]);

  if (!agreement || !onboardingData) return null;

  const today = new Date().toLocaleDateString(lang === 'es' ? 'es-ES' : 'en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  });

  const updateRule = (id: string, text: string) => {
    setAgreement((prev) =>
      prev ? { ...prev, rules: prev.rules.map((r) => (r.id === id ? { ...r, text } : r)) } : prev
    );
  };

  const removeRule = (id: string) => {
    setAgreement((prev) =>
      prev ? { ...prev, rules: prev.rules.filter((r) => r.id !== id) } : prev
    );
  };

  const addRule = () => {
    if (!newRule.trim()) return;
    const rule: AgreementRule = {
      id: Math.random().toString(36).substring(2, 9),
      text: newRule.trim(),
      category: 'behavior',
    };
    setAgreement((prev) => (prev ? { ...prev, rules: [...prev.rules, rule] } : prev));
    setNewRule('');
  };

  const handleDownloadPdf = async () => {
    if (!agreementRef.current) return;
    const html2pdf = (await import('html2pdf.js')).default;
    const filename = lang === 'es'
      ? `acuerdo-familiar-${onboardingData.childName.toLowerCase().replace(/\s+/g, '-')}.pdf`
      : `family-agreement-${onboardingData.childName.toLowerCase().replace(/\s+/g, '-')}.pdf`;
    html2pdf()
      .set({
        margin: [15, 15, 15, 15],
        filename,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      })
      .from(agreementRef.current)
      .save();
    setDownloaded(true);
  };

  const parents = (onboardingData.parentNames || []).filter(Boolean);

  const commitTitle = (name: string) =>
    t('childCommitmentsTitle').replace('{name}', name);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="flex items-center justify-between px-6 py-3 max-w-3xl mx-auto">
          <div className="flex items-center gap-2">
            <Smartphone className="h-5 w-5 text-primary" />
            <span className="font-bold text-foreground">{t('brandName')}</span>
          </div>
          <LanguageSelector />
        </div>
      </header>

      {/* Actions bar */}
      <div className="max-w-3xl mx-auto px-6 py-4 flex flex-wrap items-center gap-3">
        <button onClick={() => navigate('/')}
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-4 w-4" /> {t('startOver')}
        </button>
        <div className="flex-1" />
        <button onClick={() => setEditing(!editing)}
          className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-card px-4 py-2 text-sm font-medium text-foreground hover:bg-secondary transition-colors">
          {editing ? <X className="h-4 w-4" /> : <Edit3 className="h-4 w-4" />}
          {editing ? t('cancel') : t('editAgreement')}
        </button>
        <button onClick={handleDownloadPdf}
          className="inline-flex items-center gap-1.5 gradient-primary text-primary-foreground px-4 py-2 rounded-xl text-sm font-bold shadow-md hover:shadow-lg transition-shadow">
          <Download className="h-4 w-4" /> {t('downloadPdf')}
        </button>
      </div>

      {/* Agreement */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto px-6 pb-8">
        <div ref={agreementRef}
          className="bg-card rounded-2xl border border-border shadow-sm p-8 sm:p-12"
          style={{ fontFamily: "'Nunito', sans-serif" }}>
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl gradient-primary text-primary-foreground flex items-center justify-center mx-auto mb-4">
              <Smartphone className="h-7 w-7" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground">{agreement.title}</h1>
            <p className="text-sm text-muted-foreground mt-2">{t('agreementDate')}: {today}</p>
          </div>

          <p className="text-foreground leading-relaxed mb-8">{agreement.intro}</p>

          {/* Rules */}
          <div className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              📋 {t('rulesTitle')}
            </h2>
            <div className="space-y-3">
              {agreement.rules.map((rule, i) => (
                <div key={rule.id} className="flex items-start gap-3 group">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center mt-0.5">
                    {i + 1}
                  </span>
                  {editing ? (
                    <div className="flex-1 flex items-start gap-2">
                      <textarea value={rule.text} onChange={(e) => updateRule(rule.id, e.target.value)}
                        className="flex-1 rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary/30" rows={2} />
                      <button onClick={() => removeRule(rule.id)} className="text-destructive hover:text-destructive/80 mt-1">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <p className="text-foreground text-sm leading-relaxed">{rule.text}</p>
                  )}
                </div>
              ))}
              {editing && (
                <div className="flex items-center gap-2 mt-4">
                  <input value={newRule} onChange={(e) => setNewRule(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && addRule()} placeholder={t('newRulePlaceholder')}
                    className="flex-1 rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
                  <button onClick={addRule}
                    className="inline-flex items-center gap-1 rounded-lg bg-primary/10 text-primary px-3 py-2 text-sm font-medium hover:bg-primary/20 transition-colors">
                    <Plus className="h-4 w-4" /> {t('addRule')}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Parent commitments */}
          <div className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              🤝 {t('parentCommitmentsTitle')}
            </h2>
            <ul className="space-y-2">
              {agreement.parentCommitments.map((c, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                  <span className="text-primary mt-0.5">✓</span><span>{c}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Child commitments */}
          <div className="mb-8">
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              🌟 {commitTitle(onboardingData.childName)}
            </h2>
            <ul className="space-y-2">
              {agreement.childCommitments.map((c, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                  <span className="text-accent mt-0.5">★</span><span>{c}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Closing */}
          <div className="bg-warm rounded-xl p-6 mb-8">
            <p className="text-foreground text-sm leading-relaxed italic">{agreement.closingNote}</p>
          </div>

          <p className="text-xs text-muted-foreground text-center mb-10">🔄 {agreement.reviewNote}</p>

          {/* Signatures */}
          <div className="border-t border-border pt-8">
            <h2 className="text-lg font-bold text-foreground text-center mb-8">{t('signatures')}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {parents.map((name) => (
                <div key={name} className="text-center">
                  <div className="border-b-2 border-border mb-3 h-16" />
                  <p className="text-sm font-semibold text-foreground">{name}</p>
                  <p className="text-xs text-muted-foreground">{t('signatureParent')}</p>
                </div>
              ))}
              <div className="text-center">
                <div className="border-b-2 border-border mb-3 h-16" />
                <p className="text-sm font-semibold text-foreground">{onboardingData.childName}</p>
                <p className="text-xs text-muted-foreground">{t('signatureChild')} {onboardingData.childName}</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Post-download section */}
      {downloaded && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto px-6 pb-16">
          <div className="bg-warm rounded-2xl p-8 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
              <Heart className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-2xl font-extrabold text-foreground">{t('downloadSuccess')}</h2>
            <p className="text-muted-foreground">{t('downloadMessage')}</p>

            {/* Feedback */}
            <div className="pt-4 border-t border-border">
              <p className="text-sm font-medium text-foreground mb-3">{t('feedbackInvite')}</p>
              {!feedbackSent ? (
                <div className="flex gap-2 max-w-md mx-auto">
                  <input value={feedback} onChange={(e) => setFeedback(e.target.value)}
                    placeholder={t('feedbackPlaceholder')} maxLength={500}
                    className="flex-1 rounded-xl border border-input bg-card px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
                  <button onClick={() => { if (feedback.trim()) setFeedbackSent(true); }}
                    className="px-4 py-2.5 rounded-xl gradient-primary text-primary-foreground text-sm font-bold">
                    {t('feedbackSend')}
                  </button>
                </div>
              ) : (
                <p className="text-primary font-medium">{t('feedbackThanks')}</p>
              )}
            </div>

            {/* Support */}
            <div className="pt-4">
              <p className="text-sm text-muted-foreground mb-2">{t('supportProject')}</p>
              <a href="#" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline">
                <Coffee className="h-4 w-4" />
                {lang === 'es' ? 'Invítanos a un café ☕' : 'Buy us a coffee ☕'}
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
