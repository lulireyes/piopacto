import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSelector from '@/components/LanguageSelector';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Smartphone, Download, Edit3, Plus, Trash2, ArrowLeft, X,
  Palette, Type, Sparkles, SmilePlus
} from 'lucide-react';
import { OnboardingData, Agreement, AgreementRule, generateAgreement } from '@/lib/agreement-generator';

/* ── Visual customization types ── */
type ColorPalette = 'green' | 'blue' | 'purple' | 'coral' | 'slate';
type FontStyle = 'sans' | 'serif' | 'handwritten';
type AgreementStyle = 'minimal' | 'warm' | 'modern';

const palettes: Record<ColorPalette, { name: string; accent: string; bg: string; circle: string }> = {
  green:  { name: 'Verde',   accent: '#4a8c6f', bg: '#f0f7f4', circle: '#e6f2ec' },
  blue:   { name: 'Azul',    accent: '#3b6fa0', bg: '#f0f5fa', circle: '#e0ecf5' },
  purple: { name: 'Púrpura', accent: '#7c5cbf', bg: '#f5f0fa', circle: '#ece0f5' },
  coral:  { name: 'Coral',   accent: '#d4735e', bg: '#faf3f0', circle: '#f5e8e3' },
  slate:  { name: 'Gris',    accent: '#5a6577', bg: '#f2f3f5', circle: '#e6e8ec' },
};

const fonts: Record<FontStyle, { name: string; family: string }> = {
  sans:        { name: 'Moderna',    family: "'Inter', system-ui, sans-serif" },
  serif:       { name: 'Clásica',    family: "'Georgia', 'Times New Roman', serif" },
  handwritten: { name: 'Manuscrita', family: "'Caveat', 'Comic Sans MS', cursive" },
};

export default function AgreementPage() {
  const { t, lang } = useLanguage();
  const navigate = useNavigate();
  const agreementRef = useRef<HTMLDivElement>(null);
  const [editing, setEditing] = useState(false);
  const [newRule, setNewRule] = useState('');
  const [showCustomize, setShowCustomize] = useState(false);

  /* Visual customization state */
  const [palette, setPalette] = useState<ColorPalette>('green');
  const [fontStyle, setFontStyle] = useState<FontStyle>('sans');
  const [style, setStyle] = useState<AgreementStyle>('warm');
  const [emojis, setEmojis] = useState(true);

  const rawData = sessionStorage.getItem('onboardingData');
  const onboardingData: OnboardingData | null = rawData ? JSON.parse(rawData) : null;
  const [agreement, setAgreement] = useState<Agreement | null>(null);

  useEffect(() => {
    if (!onboardingData) { navigate('/'); return; }
    setAgreement(generateAgreement(onboardingData, lang));
  }, [lang]);

  if (!agreement || !onboardingData) return null;

  const today = new Date().toLocaleDateString(
    lang === 'es' ? 'es-ES' : lang === 'fr' ? 'fr-FR' : lang === 'de' ? 'de-DE' : lang === 'pt' ? 'pt-PT' : lang === 'it' ? 'it-IT' : lang === 'nl' ? 'nl-NL' : 'en-US',
    { year: 'numeric', month: 'long', day: 'numeric' }
  );

  const p = palettes[palette];
  const f = fonts[fontStyle];

  /* ── Inline editing helpers ── */
  const updateField = (field: keyof Agreement, value: string | string[]) =>
    setAgreement(prev => prev ? { ...prev, [field]: value } : prev);

  const updateRule = (id: string, text: string) =>
    setAgreement(prev => prev ? { ...prev, rules: prev.rules.map(r => r.id === id ? { ...r, text } : r) } : prev);

  const removeRule = (id: string) =>
    setAgreement(prev => prev ? { ...prev, rules: prev.rules.filter(r => r.id !== id) } : prev);

  const addRule = () => {
    if (!newRule.trim()) return;
    const rule: AgreementRule = { id: Math.random().toString(36).substring(2, 9), text: newRule.trim(), category: 'behavior' };
    setAgreement(prev => prev ? { ...prev, rules: [...prev.rules, rule] } : prev);
    setNewRule('');
  };

  const updateCommitment = (type: 'parentCommitments' | 'childCommitments', idx: number, text: string) =>
    setAgreement(prev => {
      if (!prev) return prev;
      const arr = [...prev[type]];
      arr[idx] = text;
      return { ...prev, [type]: arr };
    });

  const removeCommitment = (type: 'parentCommitments' | 'childCommitments', idx: number) =>
    setAgreement(prev => {
      if (!prev) return prev;
      return { ...prev, [type]: prev[type].filter((_, i) => i !== idx) };
    });

  const addCommitment = (type: 'parentCommitments' | 'childCommitments') =>
    setAgreement(prev => prev ? { ...prev, [type]: [...prev[type], ''] } : prev);

  const e = (emoji: string) => emojis ? emoji : '';

  /* ── PDF export ── */
  const handleDownloadPdf = async () => {
    if (!agreementRef.current) return;
    const el = agreementRef.current;

    // Temporarily apply PDF-specific styles for clean export
    el.style.maxWidth = '700px';
    el.style.width = '700px';

    const html2pdf = (await import('html2pdf.js')).default;
    const filename = lang === 'es'
      ? `acuerdo-familiar-${onboardingData.childName.toLowerCase().replace(/\s+/g, '-')}.pdf`
      : `family-agreement-${onboardingData.childName.toLowerCase().replace(/\s+/g, '-')}.pdf`;
    await html2pdf()
      .set({
        margin: [10, 12, 10, 12],
        filename,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2.5, useCORS: true, logging: false, letterRendering: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        pagebreak: { mode: ['css', 'legacy'], avoid: ['.no-break'] },
      })
      .from(el)
      .save();

    // Restore styles
    el.style.maxWidth = '';
    el.style.width = '';

    navigate('/success');
  };

  const parents = (onboardingData.parentNames || []).filter(Boolean);
  const commitTitle = (name: string) => t('childCommitmentsTitle').replace('{name}', name);

  const cardBg = style === 'minimal' ? '#ffffff' : style === 'modern' ? '#fafafa' : p.bg;

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="flex items-center justify-between px-6 py-3 max-w-3xl mx-auto">
          <div className="flex items-center gap-2">
            <Smartphone className="h-5 w-5 text-primary" aria-hidden="true" />
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
        <button onClick={() => setShowCustomize(!showCustomize)}
          className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-card px-4 py-2 text-sm font-medium text-foreground hover:bg-secondary transition-colors"
          aria-label="Personalizar">
          <Palette className="h-4 w-4" />
          {lang === 'es' ? 'Personalizar' : 'Customize'}
        </button>
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

      {/* ── Customization panel ── */}
      <AnimatePresence>
        {showCustomize && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
            className="max-w-3xl mx-auto px-6 overflow-hidden">
            <div className="bg-card border border-border rounded-2xl p-6 mb-6 space-y-6">

              {/* Color palette */}
              <div>
                <label className="text-sm font-semibold text-foreground flex items-center gap-2 mb-3">
                  <Palette className="h-4 w-4" /> {lang === 'es' ? 'Paleta de colores' : 'Color palette'}
                </label>
                <div className="flex flex-wrap gap-3">
                  {(Object.keys(palettes) as ColorPalette[]).map(k => (
                    <button key={k} onClick={() => setPalette(k)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-medium transition-all ${palette === k ? 'border-foreground ring-2 ring-foreground/20 shadow-sm' : 'border-border hover:border-foreground/30'}`}>
                      <span className="w-4 h-4 rounded-full" style={{ background: palettes[k].accent }} />
                      {palettes[k].name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Typography */}
              <div>
                <label className="text-sm font-semibold text-foreground flex items-center gap-2 mb-3">
                  <Type className="h-4 w-4" /> {lang === 'es' ? 'Tipografía' : 'Typography'}
                </label>
                <div className="flex flex-wrap gap-3">
                  {(Object.keys(fonts) as FontStyle[]).map(k => (
                    <button key={k} onClick={() => setFontStyle(k)}
                      className={`px-4 py-2 rounded-xl border text-sm transition-all ${fontStyle === k ? 'border-foreground ring-2 ring-foreground/20 shadow-sm font-bold' : 'border-border hover:border-foreground/30'}`}
                      style={{ fontFamily: fonts[k].family }}>
                      {fonts[k].name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Style preset */}
              <div>
                <label className="text-sm font-semibold text-foreground flex items-center gap-2 mb-3">
                  <Sparkles className="h-4 w-4" /> {lang === 'es' ? 'Estilo' : 'Style'}
                </label>
                <div className="flex flex-wrap gap-3">
                  {(['minimal', 'warm', 'modern'] as AgreementStyle[]).map(s => (
                    <button key={s} onClick={() => setStyle(s)}
                      className={`px-4 py-2 rounded-xl border text-sm font-medium transition-all capitalize ${style === s ? 'border-foreground ring-2 ring-foreground/20 shadow-sm' : 'border-border hover:border-foreground/30'}`}>
                      {s === 'minimal' ? (lang === 'es' ? 'Minimalista' : 'Minimal') :
                       s === 'warm' ? (lang === 'es' ? 'Cálido' : 'Warm') :
                       (lang === 'es' ? 'Moderno' : 'Modern')}
                    </button>
                  ))}
                </div>
              </div>

              {/* Emoji toggle */}
              <div className="flex items-center justify-between">
                <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <SmilePlus className="h-4 w-4" /> Emojis
                </label>
                <button onClick={() => setEmojis(!emojis)}
                  className={`relative w-12 h-7 rounded-full transition-colors ${emojis ? 'bg-primary' : 'bg-input'}`}
                  role="switch" aria-checked={emojis}>
                  <span className={`absolute top-0.5 left-0.5 w-6 h-6 rounded-full bg-white shadow transition-transform ${emojis ? 'translate-x-5' : 'translate-x-0'}`} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Agreement document ── */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto px-6 pb-8">
        <div ref={agreementRef}
          className="rounded-2xl border shadow-sm"
          style={{
            fontFamily: f.family,
            background: cardBg,
            borderColor: style === 'modern' ? '#e5e5e5' : '#eee',
            padding: '2.5rem',
            lineHeight: 1.7,
          }}>

          {/* Header */}
          <div className="text-center mb-8 no-break">
            <div className="mx-auto mb-4 flex items-center justify-center"
              style={{ width: 56, height: 56, borderRadius: 16, background: p.accent, color: '#fff' }}>
              <Smartphone style={{ width: 28, height: 28 }} />
            </div>

            {editing ? (
              <input value={agreement.title} onChange={e2 => updateField('title', e2.target.value)}
                className="w-full text-center text-2xl sm:text-3xl font-extrabold bg-transparent border-b-2 border-dashed focus:outline-none focus:border-current py-1"
                style={{ borderColor: p.accent, color: p.accent }} />
            ) : (
              <h1 className="text-2xl sm:text-3xl font-extrabold" style={{ color: p.accent }}>{agreement.title}</h1>
            )}

            <p className="text-sm mt-2" style={{ color: '#888' }}>{t('agreementDate')}: {today}</p>
          </div>

          {/* Intro */}
          <div className="mb-8 no-break">
            {editing ? (
              <textarea value={agreement.intro} onChange={e2 => updateField('intro', e2.target.value)}
                className="w-full bg-transparent border border-dashed rounded-lg p-3 text-sm resize-none focus:outline-none"
                style={{ borderColor: p.accent + '60', color: '#333' }} rows={4} />
            ) : (
              <p className="text-sm leading-relaxed" style={{ color: '#333' }}>{agreement.intro}</p>
            )}
          </div>

          {/* Rules */}
          <div className="mb-8">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2 no-break" style={{ color: p.accent }}>
              {e('📋')} {t('rulesTitle')}
            </h2>
            <div className="space-y-3">
              {agreement.rules.map((rule, i) => (
                <div key={rule.id} className="flex items-start gap-3 no-break" style={{ pageBreakInside: 'avoid' }}>
                  <span style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '24px',
                      height: '24px',
                      minWidth: '24px',
                      minHeight: '24px',
                      borderRadius: '50%',
                      background: p.circle,
                      color: p.accent,
                      fontSize: '11px',
                      fontWeight: 700,
                      lineHeight: 1,
                      flexShrink: 0,
                    }}>
                    {i + 1}
                  </span>
                  {editing ? (
                    <div className="flex-1 flex items-start gap-2">
                      <textarea value={rule.text} onChange={e2 => updateRule(rule.id, e2.target.value)}
                        className="flex-1 rounded-lg border border-dashed px-3 py-2 text-sm resize-none focus:outline-none"
                        style={{ borderColor: p.accent + '60' }} rows={2} />
                      <button onClick={() => removeRule(rule.id)} className="text-red-500 hover:text-red-400 mt-1">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <p className="text-sm leading-relaxed" style={{ color: '#333' }}>{rule.text}</p>
                  )}
                </div>
              ))}
              {editing && (
                <div className="flex items-center gap-2 mt-4">
                  <input value={newRule} onChange={e2 => setNewRule(e2.target.value)}
                    onKeyDown={e2 => e2.key === 'Enter' && addRule()} placeholder={t('newRulePlaceholder')}
                    className="flex-1 rounded-lg border px-3 py-2 text-sm focus:outline-none"
                    style={{ borderColor: '#ddd' }} />
                  <button onClick={addRule}
                    className="inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium"
                    style={{ background: p.circle, color: p.accent }}>
                    <Plus className="h-4 w-4" /> {t('addRule')}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Parent commitments */}
          <div className="mb-8">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2 no-break" style={{ color: p.accent }}>
              {e('🤝')} {t('parentCommitmentsTitle')}
            </h2>
            <ul className="space-y-2">
              {agreement.parentCommitments.map((c, i) => (
                <li key={i} className="flex items-start gap-2 text-sm no-break" style={{ pageBreakInside: 'avoid' }}>
                  <span style={{ color: p.accent }} className="mt-0.5 flex-shrink-0">✓</span>
                  {editing ? (
                    <div className="flex-1 flex items-start gap-2">
                      <textarea value={c} onChange={e2 => updateCommitment('parentCommitments', i, e2.target.value)}
                        className="flex-1 rounded-lg border border-dashed px-3 py-1.5 text-sm resize-none focus:outline-none"
                        style={{ borderColor: p.accent + '60' }} rows={2} />
                      <button onClick={() => removeCommitment('parentCommitments', i)} className="text-red-500 hover:text-red-400 mt-1">
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ) : (
                    <span style={{ color: '#333' }}>{c}</span>
                  )}
                </li>
              ))}
              {editing && (
                <button onClick={() => addCommitment('parentCommitments')}
                  className="inline-flex items-center gap-1 text-sm font-medium mt-2"
                  style={{ color: p.accent }}>
                  <Plus className="h-4 w-4" /> {lang === 'es' ? 'Añadir compromiso' : 'Add commitment'}
                </button>
              )}
            </ul>
          </div>

          {/* Child commitments */}
          <div className="mb-8">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2 no-break" style={{ color: p.accent }}>
              {e('🌟')} {commitTitle(onboardingData.childName)}
            </h2>
            <ul className="space-y-2">
              {agreement.childCommitments.map((c, i) => (
                <li key={i} className="flex items-start gap-2 text-sm no-break" style={{ pageBreakInside: 'avoid' }}>
                  <span style={{ color: p.accent }} className="mt-0.5 flex-shrink-0">★</span>
                  {editing ? (
                    <div className="flex-1 flex items-start gap-2">
                      <textarea value={c} onChange={e2 => updateCommitment('childCommitments', i, e2.target.value)}
                        className="flex-1 rounded-lg border border-dashed px-3 py-1.5 text-sm resize-none focus:outline-none"
                        style={{ borderColor: p.accent + '60' }} rows={2} />
                      <button onClick={() => removeCommitment('childCommitments', i)} className="text-red-500 hover:text-red-400 mt-1">
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ) : (
                    <span style={{ color: '#333' }}>{c}</span>
                  )}
                </li>
              ))}
              {editing && (
                <button onClick={() => addCommitment('childCommitments')}
                  className="inline-flex items-center gap-1 text-sm font-medium mt-2"
                  style={{ color: p.accent }}>
                  <Plus className="h-4 w-4" /> {lang === 'es' ? 'Añadir compromiso' : 'Add commitment'}
                </button>
              )}
            </ul>
          </div>

          {/* Closing note */}
          <div className="rounded-xl p-6 mb-8 no-break" style={{ background: p.circle }}>
            {editing ? (
              <textarea value={agreement.closingNote} onChange={e2 => updateField('closingNote', e2.target.value)}
                className="w-full bg-transparent text-sm italic leading-relaxed resize-none focus:outline-none"
                style={{ color: '#333' }} rows={3} />
            ) : (
              <p className="text-sm leading-relaxed italic" style={{ color: '#333' }}>{agreement.closingNote}</p>
            )}
          </div>

          {/* Review note */}
          <div className="no-break">
            {editing ? (
              <textarea value={agreement.reviewNote} onChange={e2 => updateField('reviewNote', e2.target.value)}
                className="w-full text-center bg-transparent text-xs leading-relaxed resize-none focus:outline-none"
                style={{ color: '#888' }} rows={2} />
            ) : (
              <p className="text-xs text-center mb-10" style={{ color: '#888' }}>{e('🔄')} {agreement.reviewNote}</p>
            )}
          </div>

          {/* Signatures */}
          <div className="pt-8 no-break" style={{ borderTop: '1px solid #e5e5e5' }}>
            <h2 className="text-lg font-bold text-center mb-8" style={{ color: p.accent }}>{t('signatures')}</h2>
            <div style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.min(parents.length + 1, 3)}, 1fr)`, gap: '2rem' }}>
              {parents.map(name => (
                <div key={name} className="text-center">
                  <div style={{ borderBottom: `2px solid ${p.accent}40`, marginBottom: 12, height: 64 }} />
                  <p className="text-sm font-semibold" style={{ color: '#333' }}>{name}</p>
                  <p className="text-xs" style={{ color: '#888' }}>{t('signatureParent')}</p>
                </div>
              ))}
              <div className="text-center">
                <div style={{ borderBottom: `2px solid ${p.accent}40`, marginBottom: 12, height: 64 }} />
                <p className="text-sm font-semibold" style={{ color: '#333' }}>{onboardingData.childName}</p>
                <p className="text-xs" style={{ color: '#888' }}>{t('signatureChild')} {onboardingData.childName}</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>


    </div>
  );
}
