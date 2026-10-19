import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSelector from '@/components/LanguageSelector';
import BrandMark from '@/components/BrandMark';
import {
  Download, Edit3, Plus, Trash2, ArrowLeft, X,
} from 'lucide-react';
import { OnboardingData, Agreement, AgreementRule, generateAgreement } from '@/lib/agreement-generator';

export default function AgreementPage() {
  const { t, lang } = useLanguage();
  const navigate = useNavigate();
  const agreementRef = useRef<HTMLDivElement>(null);
  const [editing, setEditing] = useState(false);
  const [newRule, setNewRule] = useState('');

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

  const handleDownloadPdf = async () => {
    if (!agreementRef.current) return;
    const el = agreementRef.current;

    el.style.maxWidth = '794px';
    el.style.width = '794px';

    const html2pdf = (await import('html2pdf.js')).default;
    const filename = lang === 'es'
      ? `acuerdo-familiar-${onboardingData.childName.toLowerCase().replace(/\s+/g, '-')}.pdf`
      : `family-agreement-${onboardingData.childName.toLowerCase().replace(/\s+/g, '-')}.pdf`;
    await html2pdf()
      .set({
        margin: [8, 8, 8, 8],
        filename,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, logging: false, letterRendering: true, backgroundColor: '#FFFDF8' },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        pagebreak: { mode: ['css', 'legacy'], avoid: ['.no-break'] },
      })
      .from(el)
      .save();

    el.style.maxWidth = '';
    el.style.width = '';

    navigate('/success');
  };

  const parents = (onboardingData.parentNames || []).filter(Boolean);
  const childName = onboardingData.childName;
  const drawingLabel = lang === 'es'
    ? `Espacio para un dibujo o una pegatina de ${childName}`
    : `Space for a drawing or a sticker from ${childName}`;

  const sectionRules = lang === 'es' ? 'Nuestras normas' : t('rulesTitle');
  const sectionParents = lang === 'es' ? 'Nos comprometemos' : t('parentCommitmentsTitle');
  const sectionChild = lang === 'es' ? 'Me comprometo' : t('childCommitmentsTitle').replace('{name}', childName);

  return (
    <div className="min-h-screen bg-paper">
      <header className="sticky top-0 z-50 bg-paper border-b border-border">
        <div className="flex items-center justify-between px-6 py-3 max-w-3xl mx-auto">
          <BrandMark name={t('brandName')} compact />
          <LanguageSelector />
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-6 py-4 flex flex-wrap items-center gap-3">
        <button onClick={() => navigate('/')}
          className="inline-flex items-center gap-1.5 text-sm text-ink-soft hover:text-ink transition-colors duration-180">
          <ArrowLeft className="h-4 w-4" /> {t('startOver')}
        </button>
        <div className="flex-1" />
        <button onClick={() => setEditing(!editing)}
          className="inline-flex items-center gap-1.5 rounded-md border border-[rgba(30,26,22,0.35)] bg-transparent px-4 py-[13px] text-base font-medium text-ink hover:bg-[rgba(30,26,22,0.04)] transition-colors duration-180">
          {editing ? <X className="h-4 w-4" /> : <Edit3 className="h-4 w-4" />}
          {editing ? t('cancel') : t('editAgreement')}
        </button>
        <button onClick={handleDownloadPdf}
          className="inline-flex items-center gap-1.5 rounded-md bg-terracotta-strong text-cream text-btn px-[26px] py-4 hover:bg-terracotta-hover transition-colors duration-180">
          <Download className="h-4 w-4" /> {t('downloadPdf')}
        </button>
      </div>

      <div className="max-w-3xl mx-auto px-6 pb-8">
        <div
          ref={agreementRef}
          className="bg-sheet border border-border rounded-lg sheet-shadow"
          style={{
            padding: '40px 48px',
            fontFamily: 'Figtree, system-ui, sans-serif',
            lineHeight: 1.5,
            color: '#1E1A16',
          }}
        >
          <div className="flex items-start justify-between gap-6 mb-8 no-break">
            <div>
              <p className="eyebrow mb-3">Pacto familiar del primer móvil</p>
              {editing ? (
                <input
                  value={childName}
                  readOnly
                  className="font-display font-bold bg-transparent border-b border-dashed border-terracotta focus:outline-none"
                  style={{ fontSize: 40, lineHeight: 1, fontVariationSettings: "'SOFT' 100" }}
                />
              ) : (
                <h1
                  className="font-display font-bold text-ink"
                  style={{ fontSize: 56, lineHeight: 1, fontVariationSettings: "'SOFT' 100" }}
                >
                  {childName}
                </h1>
              )}
            </div>
            <p className="text-sm text-muted-foreground pt-8 whitespace-nowrap">{today}</p>
          </div>

          <div className="mb-8 no-break">
            {editing ? (
              <textarea value={agreement.intro} onChange={e2 => updateField('intro', e2.target.value)}
                className="w-full bg-transparent border border-dashed rounded-md p-3 text-base resize-none focus:outline-none border-terracotta/40" rows={4} />
            ) : (
              <p className="text-base leading-relaxed text-ink">{agreement.intro}</p>
            )}
          </div>

          <div className="mb-8">
            <h2 className="font-display font-semibold text-ink mb-4 no-break" style={{ fontSize: 22, fontVariationSettings: "'SOFT' 100" }}>
              {sectionRules}
            </h2>
            <div className="space-y-3">
              {agreement.rules.map((rule, i) => (
                <div key={rule.id} className="flex items-start gap-3 no-break">
                  <span
                    className="font-display font-bold text-terracotta flex-shrink-0"
                    style={{ width: 18, fontSize: 16, fontVariationSettings: "'SOFT' 100" }}
                  >
                    {i + 1}
                  </span>
                  {editing ? (
                    <div className="flex-1 flex items-start gap-2">
                      <textarea value={rule.text} onChange={e2 => updateRule(rule.id, e2.target.value)}
                        className="flex-1 rounded-md border border-dashed px-3 py-2 text-base resize-none focus:outline-none border-terracotta/40" rows={2} />
                      <button onClick={() => removeRule(rule.id)} className="text-terracotta-hover mt-1">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <p className="text-base leading-relaxed text-ink">{rule.text}</p>
                  )}
                </div>
              ))}
              {editing && (
                <div className="flex items-center gap-2 mt-4">
                  <input value={newRule} onChange={e2 => setNewRule(e2.target.value)}
                    onKeyDown={e2 => e2.key === 'Enter' && addRule()} placeholder={t('newRulePlaceholder')}
                    className="input-paper flex-1" />
                  <button onClick={addRule}
                    className="inline-flex items-center gap-1 rounded-md px-[22px] py-[13px] text-base font-semibold bg-ink text-paper">
                    <Plus className="h-4 w-4" /> {t('addRule')}
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="mb-8">
            <h2 className="font-display font-semibold text-ink mb-4 no-break" style={{ fontSize: 22, fontVariationSettings: "'SOFT' 100" }}>
              {sectionParents}
            </h2>
            <ul className="space-y-2">
              {agreement.parentCommitments.map((c, i) => (
                <li key={i} className="flex items-start gap-3 text-base no-break">
                  {editing ? (
                    <div className="flex-1 flex items-start gap-2">
                      <textarea value={c} onChange={e2 => updateCommitment('parentCommitments', i, e2.target.value)}
                        className="flex-1 rounded-md border border-dashed px-3 py-1.5 text-base resize-none focus:outline-none border-terracotta/40" rows={2} />
                      <button onClick={() => removeCommitment('parentCommitments', i)} className="text-terracotta-hover mt-1">
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ) : (
                    <span className="text-ink">{c}</span>
                  )}
                </li>
              ))}
              {editing && (
                <button onClick={() => addCommitment('parentCommitments')}
                  className="inline-flex items-center gap-1 text-sm font-medium mt-2 text-link">
                  <Plus className="h-4 w-4" /> {lang === 'es' ? 'Añadir compromiso' : 'Add commitment'}
                </button>
              )}
            </ul>
          </div>

          <div className="mb-8">
            <h2 className="font-display font-semibold text-ink mb-4 no-break" style={{ fontSize: 22, fontVariationSettings: "'SOFT' 100" }}>
              {sectionChild}
            </h2>
            <ul className="space-y-2">
              {agreement.childCommitments.map((c, i) => (
                <li key={i} className="flex items-start gap-3 text-base no-break">
                  {editing ? (
                    <div className="flex-1 flex items-start gap-2">
                      <textarea value={c} onChange={e2 => updateCommitment('childCommitments', i, e2.target.value)}
                        className="flex-1 rounded-md border border-dashed px-3 py-1.5 text-base resize-none focus:outline-none border-terracotta/40" rows={2} />
                      <button onClick={() => removeCommitment('childCommitments', i)} className="text-terracotta-hover mt-1">
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ) : (
                    <span className="text-ink">{c}</span>
                  )}
                </li>
              ))}
              {editing && (
                <button onClick={() => addCommitment('childCommitments')}
                  className="inline-flex items-center gap-1 text-sm font-medium mt-2 text-link">
                  <Plus className="h-4 w-4" /> {lang === 'es' ? 'Añadir compromiso' : 'Add commitment'}
                </button>
              )}
            </ul>
          </div>

          <div className="mb-8 no-break">
            {editing ? (
              <textarea value={agreement.closingNote} onChange={e2 => updateField('closingNote', e2.target.value)}
                className="w-full bg-transparent text-base leading-relaxed resize-none focus:outline-none" rows={3} />
            ) : (
              <p className="text-base leading-relaxed text-ink">{agreement.closingNote}</p>
            )}
          </div>

          <div className="bg-ochre rounded-md px-4 py-3.5 mb-8 no-break">
            {editing ? (
              <textarea value={agreement.reviewNote} onChange={e2 => updateField('reviewNote', e2.target.value)}
                className="w-full bg-transparent text-sm leading-relaxed resize-none focus:outline-none text-ochre-ink" rows={2} />
            ) : (
              <p className="text-sm text-ochre-ink">{agreement.reviewNote}</p>
            )}
          </div>

          <div
            className="rounded-md mb-10 no-break flex items-center justify-center text-center"
            style={{
              border: '1px dashed hsl(var(--line) / 0.14)',
              minHeight: 120,
              padding: 24,
            }}
          >
            <p className="text-sm text-muted-foreground">{drawingLabel}</p>
          </div>

          <div className="no-break">
            <div className="grid grid-cols-2 gap-12">
              {parents.map(name => (
                <div key={name}>
                  <div style={{ borderTop: '1.5px solid #1E1A16', marginBottom: 8 }} />
                  <p className="text-[13px] text-muted-foreground">{name}</p>
                </div>
              ))}
              <div>
                <div style={{ borderTop: '1.5px solid #1E1A16', marginBottom: 8 }} />
                <p className="text-[13px] text-muted-foreground">{childName}</p>
              </div>
            </div>
          </div>

          <p className="text-center mt-10 text-muted-foreground" style={{ fontSize: 11 }}>
            piopacto.com
          </p>
        </div>
      </div>
    </div>
  );
}
