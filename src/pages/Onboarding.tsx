import { useState, useMemo, useId, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSelector from '@/components/LanguageSelector';
import AccessibilityControls from '@/components/AccessibilityControls';
import BrandMark from '@/components/BrandMark';
import {
  ArrowLeft, ArrowRight, Check, Plus, X, Info,
  MessageCircle, BookOpen, Users, Gamepad2, Music,
  Utensils, Moon, School, MapPin, Unlock, type LucideIcon,
} from 'lucide-react';
import { OnboardingData, getRecommendedMinutes, getRecommendedWeekendMinutes, getSuggestedApps } from '@/lib/agreement-generator';
import { Progress } from '@/components/ui/progress';

const TOTAL_STEPS = 10;

const usageOptions: { key: string; icon: LucideIcon }[] = [
  { key: 'communication', icon: MessageCircle },
  { key: 'school', icon: BookOpen },
  { key: 'social', icon: Users },
  { key: 'games', icon: Gamepad2 },
  { key: 'entertainment', icon: Music },
];

const restrictionOptions: { key: string; icon: LucideIcon }[] = [
  { key: 'meals', icon: Utensils },
  { key: 'bedtime', icon: Moon },
  { key: 'homework', icon: BookOpen },
  { key: 'family', icon: Users },
  { key: 'school', icon: School },
];

const supervisionOptions: { key: string; icon: LucideIcon }[] = [
  { key: 'chat', icon: MessageCircle },
  { key: 'location', icon: MapPin },
  { key: 'none', icon: Unlock },
];

export default function Onboarding() {
  const { t, lang } = useLanguage();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [appInput, setAppInput] = useState('');
  const formId = useId();
  const [data, setData] = useState<OnboardingData>({
    childName: '',
    age: 10,
    isFirstPhone: true,
    mainUsage: [],
    restrictions: ['meals', 'bedtime', 'homework'],
    dailyMinutes: 30,
    weekendMinutes: 30,
    allowedApps: [],
    supervision: [],
    parentNames: ['', ''],
    finalMessage: '',
  });

  const recommendedMinutes = useMemo(() => getRecommendedMinutes(data.age), [data.age]);
  const recommendedWeekend = useMemo(() => getRecommendedWeekendMinutes(data.age), [data.age]);
  const suggestedApps = useMemo(() => getSuggestedApps(data.age), [data.age]);

  useEffect(() => {
    setData(prev => {
      const newDaily = getRecommendedMinutes(prev.age);
      const newWeekend = getRecommendedWeekendMinutes(prev.age);
      let defaultRestrictions: string[];
      if (prev.age <= 10) {
        defaultRestrictions = ['meals', 'bedtime', 'homework', 'family', 'school'];
      } else if (prev.age <= 13) {
        defaultRestrictions = ['meals', 'bedtime', 'homework'];
      } else {
        defaultRestrictions = ['meals', 'bedtime'];
      }
      return {
        ...prev,
        dailyMinutes: newDaily,
        weekendMinutes: newWeekend,
        restrictions: defaultRestrictions,
      };
    });
  }, [data.age]);

  const update = <K extends keyof OnboardingData>(key: K, value: OnboardingData[K]) => {
    setData((prev) => ({ ...prev, [key]: value }));
  };

  const toggleArray = (key: 'mainUsage' | 'restrictions' | 'supervision' | 'allowedApps', val: string) => {
    setData((prev) => ({
      ...prev,
      [key]: (prev[key] as string[]).includes(val)
        ? (prev[key] as string[]).filter((v) => v !== val)
        : [...(prev[key] as string[]), val],
    }));
  };

  const addApp = (app: string) => {
    const trimmed = app.trim();
    if (trimmed && !data.allowedApps.includes(trimmed)) {
      update('allowedApps', [...data.allowedApps, trimmed]);
    }
    setAppInput('');
  };

  const removeApp = (app: string) => {
    update('allowedApps', data.allowedApps.filter(a => a !== app));
  };

  const updateParentName = (index: number, value: string) => {
    const names = [...data.parentNames];
    names[index] = value;
    update('parentNames', names);
  };

  const addParentField = () => {
    update('parentNames', [...data.parentNames, '']);
  };

  const canProceed = () => {
    switch (step) {
      case 1: return data.childName.trim().length > 0;
      case 2: return data.age >= 8 && data.age <= 17;
      case 4: return data.mainUsage.length > 0;
      case 5: return data.restrictions.length > 0;
      case 9: return data.parentNames.filter(n => n.trim()).length > 0;
      default: return true;
    }
  };

  const goNext = () => {
    if (step < TOTAL_STEPS) { setStep(step + 1); }
    else {
      const exportData = {
        ...data,
        parent1Name: data.parentNames[0] || '',
        parent2Name: data.parentNames[1] || '',
      };
      sessionStorage.setItem('onboardingData', JSON.stringify(exportData));
      navigate('/agreement');
    }
  };

  const goBack = () => {
    if (step > 1) { setStep(step - 1); }
    else navigate('/');
  };

  const usageLabelMap: Record<string, string> = {
    communication: t('usageCommunication'),
    school: t('usageSchool'),
    social: t('usageSocial'),
    games: t('usageGames'),
    entertainment: t('usageEntertainment'),
  };

  const restrictionLabelMap: Record<string, string> = {
    meals: t('restrictionMeals'),
    bedtime: t('restrictionBedtime'),
    homework: t('restrictionHomework'),
    family: t('restrictionFamily'),
    school: t('restrictionSchool'),
  };

  const supervisionLabelMap: Record<string, string> = {
    chat: t('supervisionChat'),
    location: t('supervisionLocation'),
    none: t('supervisionNone'),
  };

  const ageRecText = t('ageRecommendation')
    .replace('{age}', String(data.age))
    .replace('{minutes}', String(recommendedMinutes));

  const sourceLabel = lang === 'es' ? 'Ver fuente' : 'See source';
  const reviewedLabel = lang === 'es' ? 'revisado en 2026' : 'reviewed in 2026';

  return (
    <div className="min-h-screen bg-paper flex flex-col">
      <a href="#onboarding-form" className="skip-link">
        {t('skipToContent')}
      </a>

      <header className="flex items-center justify-between px-6 py-4 max-w-xl mx-auto w-full" role="banner">
        <BrandMark name={t('brandName')} compact />
        <div className="flex items-center gap-3">
          <AccessibilityControls />
          <LanguageSelector />
        </div>
      </header>

      <div className="max-w-md mx-auto w-full px-6 mb-1">
        <div className="flex items-center justify-between text-[13px] text-muted-foreground mb-2">
          <span>{lang === 'es' ? 'Tu pacto' : 'Your pact'}</span>
          <span>{lang === 'es' ? `Paso ${step} de ${TOTAL_STEPS}` : `Step ${step} of ${TOTAL_STEPS}`}</span>
        </div>
        <Progress
          value={(step / TOTAL_STEPS) * 100}
          aria-label={`${t('onboardingTitle')} — ${step} ${t('stepOf')} ${TOTAL_STEPS}`}
        />
      </div>

      <main className={`flex-1 px-6 pt-6 overflow-y-auto ${step === TOTAL_STEPS ? 'pb-40' : 'pb-28'}`} id="onboarding-form" role="main">
        <div className="w-full max-w-md mx-auto bg-sheet border border-border rounded-lg p-7">
          {step === 1 && (
            <StepContainer>
              <StepLabel htmlFor={`${formId}-childname`}>{t('childNameLabel')}</StepLabel>
              <input
                id={`${formId}-childname`}
                autoFocus
                value={data.childName}
                onChange={(e) => update('childName', e.target.value)}
                placeholder={t('childNamePlaceholder')}
                maxLength={50}
                aria-required="true"
                className="input-paper w-full"
              />
            </StepContainer>
          )}

          {step === 2 && (
            <StepContainer>
              <StepLabel>{t('ageLabel')}</StepLabel>
              <div className="flex items-center gap-8 justify-center" role="group" aria-label={t('ageLabel')}>
                <button
                  onClick={() => update('age', Math.max(8, data.age - 1))}
                  aria-label={lang === 'es' ? 'Reducir edad' : 'Decrease age'}
                  className="w-11 h-11 rounded-md border border-[rgba(30,26,22,0.35)] bg-sheet text-ink text-xl font-semibold flex items-center justify-center hover:bg-[rgba(30,26,22,0.04)] transition-colors duration-180"
                >−</button>
                <div className="text-center">
                  <span className="font-display text-[44px] md:text-[52px] font-bold text-ink leading-none" aria-live="polite">{data.age}</span>
                  <p className="text-sm text-muted-foreground mt-1">{t('ageYears')}</p>
                </div>
                <button
                  onClick={() => update('age', Math.min(17, data.age + 1))}
                  aria-label={lang === 'es' ? 'Aumentar edad' : 'Increase age'}
                  className="w-11 h-11 rounded-md border border-[rgba(30,26,22,0.35)] bg-sheet text-ink text-xl font-semibold flex items-center justify-center hover:bg-[rgba(30,26,22,0.04)] transition-colors duration-180"
                >+</button>
              </div>
              <div className="bg-ochre rounded-md px-4 py-3.5 flex items-start gap-3" role="status">
                <Info className="h-4 w-4 text-ochre-ink flex-shrink-0 mt-0.5" aria-hidden="true" />
                <p className="text-sm text-ochre-ink leading-relaxed">
                  {ageRecText}{' '}
                  <a
                    className="text-link underline"
                    href="https://www.aeped.es"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {sourceLabel}
                  </a>
                  {' · '}{reviewedLabel}
                </p>
              </div>
            </StepContainer>
          )}

          {step === 3 && (
            <StepContainer>
              <StepLabel>{t('firstPhoneLabel')}</StepLabel>
              <div className="flex gap-3 justify-center" role="group" aria-label={t('firstPhoneLabel')}>
                {[true, false].map((val) => (
                  <button
                    key={String(val)}
                    onClick={() => update('isFirstPhone', val)}
                    aria-pressed={data.isFirstPhone === val}
                    className={`px-6 py-3.5 rounded-md text-[17px] font-medium border bg-sheet transition-colors duration-180 ${
                      data.isFirstPhone === val
                        ? 'border-[1.5px] border-terracotta text-ink'
                        : 'border-border text-ink hover:bg-[rgba(30,26,22,0.04)]'
                    }`}
                  >
                    {val ? t('yes') : t('no')}
                    {data.isFirstPhone === val && <Check className="inline h-4 w-4 ml-2 text-terracotta" aria-hidden="true" />}
                  </button>
                ))}
              </div>
            </StepContainer>
          )}

          {step === 4 && (
            <StepContainer>
              <StepLabel>{t('mainUsageLabel')}</StepLabel>
              <div className="grid grid-cols-1 gap-3" role="group" aria-label={t('mainUsageLabel')}>
                {usageOptions.map((opt) => (
                  <ToggleOption key={opt.key} icon={opt.icon} label={usageLabelMap[opt.key]}
                    selected={data.mainUsage.includes(opt.key)} onClick={() => toggleArray('mainUsage', opt.key)} />
                ))}
              </div>
            </StepContainer>
          )}

          {step === 5 && (
            <StepContainer>
              <StepLabel>{t('restrictionsLabel')}</StepLabel>
              <div className="grid grid-cols-1 gap-3" role="group" aria-label={t('restrictionsLabel')}>
                {restrictionOptions.map((opt) => (
                  <ToggleOption key={opt.key} icon={opt.icon} label={restrictionLabelMap[opt.key]}
                    selected={data.restrictions.includes(opt.key)} onClick={() => toggleArray('restrictions', opt.key)} />
                ))}
              </div>
            </StepContainer>
          )}

          {step === 6 && (
            <StepContainer>
              <StepLabel htmlFor={`${formId}-daily-time`}>{t('dailyTimeLabel')}</StepLabel>
              <TimeSlider id={`${formId}-daily-time`} value={data.dailyMinutes} recommended={recommendedMinutes} onChange={(v) => update('dailyMinutes', v)} label={t('minutes')} recLabel={lang === 'es' ? 'Recomendado' : 'Recommended'} />
              <div className="mt-10">
                <p className="font-display text-h3 text-ink mb-4" id={`${formId}-weekend-label`}>{t('weekendLabel')}</p>
                <TimeSlider id={`${formId}-weekend-time`} value={data.weekendMinutes} recommended={recommendedWeekend} onChange={(v) => update('weekendMinutes', v)} label={t('minutes')} recLabel={lang === 'es' ? 'Recomendado' : 'Recommended'} aria-labelledby={`${formId}-weekend-label`} />
              </div>
            </StepContainer>
          )}

          {step === 7 && (
            <StepContainer>
              <StepLabel>{t('appsLabel')}</StepLabel>

              <p className="text-xs text-muted-foreground font-medium mb-2">
                {t('appsSuggested').replace('{age}', String(data.age))}
              </p>
              <div className="flex flex-wrap gap-2 mb-5" role="group" aria-label={t('appsSuggested').replace('{age}', String(data.age))}>
                {suggestedApps.map((app) => (
                  <button key={app} onClick={() => toggleArray('allowedApps', app)}
                    aria-pressed={data.allowedApps.includes(app)}
                    className={`px-4 py-2 rounded-md text-sm font-medium border bg-sheet transition-colors duration-180 ${
                      data.allowedApps.includes(app)
                        ? 'border-[1.5px] border-terracotta text-ink'
                        : 'border-border text-ink hover:bg-[rgba(30,26,22,0.04)]'
                    }`}>
                    {app}
                    {data.allowedApps.includes(app) && <Check className="inline h-3 w-3 ml-1 text-terracotta" aria-hidden="true" />}
                  </button>
                ))}
              </div>

              <div className="flex gap-2">
                <label htmlFor={`${formId}-app-input`} className="sr-only">{t('appsPlaceholder')}</label>
                <input id={`${formId}-app-input`} value={appInput} onChange={(e) => setAppInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && addApp(appInput)}
                  placeholder={t('appsPlaceholder')} maxLength={30}
                  className="input-paper flex-1" />
                <button onClick={() => addApp(appInput)}
                  aria-label={t('appsAdd')}
                  className="px-4 rounded-md border border-[rgba(30,26,22,0.35)] text-ink hover:bg-[rgba(30,26,22,0.04)] transition-colors duration-180">
                  <Plus className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>

              {data.allowedApps.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {data.allowedApps.filter(a => !suggestedApps.includes(a)).map((app) => (
                    <span key={app} className="inline-flex items-center gap-1 px-3 py-2 rounded-md border border-border bg-sheet text-ink text-sm font-medium">
                      {app}
                      <button onClick={() => removeApp(app)} aria-label={`${lang === 'es' ? 'Quitar' : 'Remove'} ${app}`}>
                        <X className="h-3 w-3" aria-hidden="true" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </StepContainer>
          )}

          {step === 8 && (
            <StepContainer>
              <StepLabel>{t('supervisionLabel')}</StepLabel>
              <div className="grid grid-cols-1 gap-3" role="group" aria-label={t('supervisionLabel')}>
                {supervisionOptions.map((opt) => (
                  <ToggleOption key={opt.key} icon={opt.icon} label={supervisionLabelMap[opt.key]}
                    selected={data.supervision.includes(opt.key)} onClick={() => {
                      if (opt.key === 'none') {
                        update('supervision', data.supervision.includes('none') ? [] : ['none']);
                      } else {
                        const newSupervision = data.supervision.filter(s => s !== 'none');
                        if (newSupervision.includes(opt.key)) {
                          update('supervision', newSupervision.filter(s => s !== opt.key));
                        } else {
                          update('supervision', [...newSupervision, opt.key]);
                        }
                      }
                    }} />
                ))}
              </div>
              <p className="text-xs text-muted-foreground text-center mt-4" role="note">{t('supervisionNote')}</p>
            </StepContainer>
          )}

          {step === 9 && (
            <StepContainer>
              <StepLabel>{t('parentNamesLabel')}</StepLabel>
              <div className="space-y-3">
                {data.parentNames.map((name, i) => (
                  <div key={i} className="flex gap-2">
                    <label htmlFor={`${formId}-parent-${i}`} className="block text-sm font-medium text-ink mb-0 sr-only">
                      {i === 0 ? t('parent1Placeholder') : t('parent2Placeholder')}
                    </label>
                    <div className="flex-1">
                      <label htmlFor={`${formId}-parent-${i}`} className="block text-sm font-medium text-ink mb-1">
                        {i === 0 ? t('parent1Placeholder') : t('parent2Placeholder')}
                      </label>
                      <input
                        id={`${formId}-parent-${i}`}
                        autoFocus={i === 0}
                        value={name}
                        onChange={(e) => updateParentName(i, e.target.value)}
                        placeholder={i === 0 ? t('parent1Placeholder') : t('parent2Placeholder')}
                        maxLength={50}
                        aria-required={i === 0 ? 'true' : undefined}
                        className="input-paper w-full"
                      />
                    </div>
                    {i > 1 && (
                      <button onClick={() => update('parentNames', data.parentNames.filter((_, idx) => idx !== i))}
                        aria-label={`${lang === 'es' ? 'Quitar tutor' : 'Remove guardian'} ${i + 1}`}
                        className="text-muted-foreground hover:text-ink transition-colors self-end mb-3">
                        <X className="h-4 w-4" aria-hidden="true" />
                      </button>
                    )}
                  </div>
                ))}
                {data.parentNames.length < 4 && (
                  <button onClick={addParentField}
                    className="text-sm text-link hover:text-link-hover flex items-center gap-1 font-medium">
                    <Plus className="h-3 w-3" aria-hidden="true" /> {t('addParent')}
                  </button>
                )}
              </div>
            </StepContainer>
          )}

          {step === 10 && (
            <StepContainer>
              <StepLabel htmlFor={`${formId}-finalmsg`}>{t('finalMessageLabel')}</StepLabel>
              <textarea
                id={`${formId}-finalmsg`}
                value={data.finalMessage}
                onChange={(e) => update('finalMessage', e.target.value)}
                placeholder={t('finalMessageDefault')}
                rows={4}
                maxLength={500}
                className="input-paper w-full resize-none"
              />
              <p className="text-xs text-muted-foreground text-center">{lang === 'es' ? 'Si lo dejas vacío, usaremos un mensaje predeterminado.' : 'Leave empty to use a default message.'}</p>
            </StepContainer>
          )}
        </div>
      </main>

      <div className="fixed left-0 right-0 bottom-0 px-6 py-6 z-30 bg-paper border-t border-border">
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-between">
            <button onClick={goBack}
              aria-label={t('back')}
              className="inline-flex items-center gap-1.5 text-ink-soft hover:text-ink transition-colors duration-180 font-medium">
              <ArrowLeft className="h-4 w-4" aria-hidden="true" /> {t('back')}
            </button>
            <button onClick={goNext} disabled={!canProceed()}
              aria-label={step === TOTAL_STEPS ? t('generate') : t('next')}
              className="inline-flex items-center gap-2 rounded-md bg-ink text-paper text-base font-semibold px-[22px] py-[13px] hover:bg-ink/90 transition-colors duration-180 disabled:opacity-40">
              {step === TOTAL_STEPS ? t('generate') : t('next')}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
          {step === TOTAL_STEPS && (
            <p className="mt-3 text-right text-[13px] text-muted-foreground">
              {t('legalConsent')}{' '}
              <a href={`${import.meta.env.BASE_URL}terms`} target="_blank" rel="noopener noreferrer" className="text-link underline hover:text-link-hover">
                {t('legalConsentLink')}
              </a>.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function StepContainer({ children }: { children: React.ReactNode }) {
  return <fieldset className="space-y-4 border-0 p-0 m-0"><legend className="sr-only">Step</legend>{children}</fieldset>;
}

function StepLabel({ children, htmlFor }: { children: React.ReactNode; htmlFor?: string }) {
  const Tag = htmlFor ? 'label' : 'h2';
  return <Tag htmlFor={htmlFor} className="block font-display text-h3 md:text-h3-lg text-ink text-center">{children}</Tag>;
}

function ToggleOption({ icon: Icon, label, selected, onClick }: { icon: LucideIcon; label: string; selected: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick}
      role="checkbox"
      aria-checked={selected}
      className={`flex items-center gap-3 w-full px-4 py-3.5 rounded-md border text-left bg-sheet transition-colors duration-180 ${
        selected ? 'border-[1.5px] border-terracotta' : 'border-border hover:bg-[rgba(30,26,22,0.04)]'
      }`}>
      <Icon className="h-5 w-5 text-ink flex-shrink-0" aria-hidden="true" />
      <span className="font-medium flex-1 text-ink">{label}</span>
      {selected && <Check className="h-4 w-4 text-terracotta" aria-hidden="true" />}
    </button>
  );
}

function TimeSlider({ id, value, recommended, onChange, label, recLabel, ...rest }: { id: string; value: number; recommended: number; onChange: (v: number) => void; label: string; recLabel: string; 'aria-labelledby'?: string }) {
  const min = 15;
  const max = 180;
  const bandMin = Math.max(min, recommended - 15);
  const bandMax = Math.min(max, recommended + 15);
  const left = ((bandMin - min) / (max - min)) * 100;
  const width = ((bandMax - bandMin) / (max - min)) * 100;

  return (
    <div>
      <div className="text-center mb-5">
        <span className="font-display text-[44px] md:text-[52px] font-bold text-ink leading-none" aria-live="polite">{value}</span>
        <span className="text-sm text-muted-foreground ml-2">{label}</span>
      </div>
      <div className="relative pt-6 pb-1">
        <div
          className="absolute top-0 pointer-events-none"
          style={{ left: `${left}%`, width: `${width}%` }}
        >
          <p className="eyebrow text-ochre-ink text-center mb-1" style={{ fontSize: 11 }}>{recLabel}</p>
          <div
            className="h-[14px] rounded-[2px] bg-ochre border border-dashed border-ochre-line"
          />
        </div>
        <input
          id={id}
          type="range"
          min={min}
          max={max}
          step={15}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={value}
          aria-valuetext={`${value} ${label}`}
          className="slider-paper relative z-10 mt-[11px]"
          {...rest}
        />
      </div>
      <div className="flex justify-between text-[12px] text-muted-foreground mt-1" aria-hidden="true">
        <span>15</span><span>60</span><span>120</span><span>180</span>
      </div>
    </div>
  );
}
