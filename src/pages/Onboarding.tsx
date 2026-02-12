import { useState, useMemo, useId, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSelector from '@/components/LanguageSelector';
import AccessibilityControls from '@/components/AccessibilityControls';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Smartphone, Check, Plus, X } from 'lucide-react';
import { OnboardingData, getRecommendedMinutes, getRecommendedWeekendMinutes, getSuggestedApps } from '@/lib/agreement-generator';

const TOTAL_STEPS = 10;

const usageOptions = [
  { key: 'communication', icon: '💬' },
  { key: 'school', icon: '📚' },
  { key: 'social', icon: '📱' },
  { key: 'games', icon: '🎮' },
  { key: 'entertainment', icon: '🎵' },
];

const restrictionOptions = [
  { key: 'meals', icon: '🍽️' },
  { key: 'bedtime', icon: '🌙' },
  { key: 'homework', icon: '📖' },
  { key: 'family', icon: '👨‍👩‍👧‍👦' },
  { key: 'school', icon: '🏫' },
];

const supervisionOptions = [
  { key: 'chat', icon: '💬' },
  { key: 'location', icon: '📍' },
  { key: 'none', icon: '🔓' },
];

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 200 : -200, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -200 : 200, opacity: 0 }),
};

export default function Onboarding() {
  const { t, lang } = useLanguage();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [appInput, setAppInput] = useState('');
  const formId = useId();
  const [data, setData] = useState<OnboardingData>({
    childName: '',
    age: 10,
    isFirstPhone: true,
    mainUsage: [],
    restrictions: ['meals', 'bedtime', 'homework'],
    dailyMinutes: 60,
    weekendMinutes: 90,
    allowedApps: [],
    supervision: [],
    parentNames: ['', ''],
    finalMessage: '',
  });

  const recommendedMinutes = useMemo(() => getRecommendedMinutes(data.age), [data.age]);
  const recommendedWeekend = useMemo(() => getRecommendedWeekendMinutes(data.age), [data.age]);
  const suggestedApps = useMemo(() => getSuggestedApps(data.age), [data.age]);

  // Dynamic defaults: update time and restrictions when age changes
  useEffect(() => {
    setData(prev => {
      const newDaily = getRecommendedMinutes(prev.age);
      const newWeekend = getRecommendedWeekendMinutes(prev.age);
      // Dynamic default restrictions based on age
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
    if (step < TOTAL_STEPS) { setDirection(1); setStep(step + 1); }
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
    if (step > 1) { setDirection(-1); setStep(step - 1); }
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

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <a href="#onboarding-form" className="skip-link">
        {t('skipToContent')}
      </a>

      <header className="flex items-center justify-between px-6 py-4 max-w-2xl mx-auto w-full" role="banner">
        <div className="flex items-center gap-2">
          <Smartphone className="h-5 w-5 text-primary" aria-hidden="true" />
          <span className="font-bold text-foreground">{t('brandName')}</span>
        </div>
        <div className="flex items-center gap-3">
          <AccessibilityControls />
          <LanguageSelector />
        </div>
      </header>

      <div className="max-w-md mx-auto w-full px-6 mb-1" role="progressbar" aria-valuenow={step} aria-valuemin={1} aria-valuemax={TOTAL_STEPS} aria-label={`${t('onboardingTitle')} - ${step} ${t('stepOf')} ${TOTAL_STEPS}`}>
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
          <span>{t('onboardingTitle')}</span>
          <span>{step} {t('stepOf')} {TOTAL_STEPS}</span>
        </div>
        <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
          <motion.div
            className="h-full gradient-primary rounded-full"
            animate={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      <main className="flex-1 flex items-start justify-center px-6 pt-6 pb-28" id="onboarding-form" role="main">
        <div className="w-full max-w-md">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={step}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.25, ease: 'easeInOut' }}
            >
              {/* Step 1: Child Name */}
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
                    className="w-full rounded-2xl border border-input bg-card px-5 py-3.5 text-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
                  />
                </StepContainer>
              )}

              {/* Step 2: Age */}
              {step === 2 && (
                <StepContainer>
                  <StepLabel>{t('ageLabel')}</StepLabel>
                  <div className="flex items-center gap-8 justify-center" role="group" aria-label={t('ageLabel')}>
                    <button
                      onClick={() => update('age', Math.max(8, data.age - 1))}
                      aria-label={lang === 'es' ? 'Reducir edad' : 'Decrease age'}
                      className="w-12 h-12 rounded-full border border-border bg-card text-foreground text-xl font-bold flex items-center justify-center hover:bg-secondary transition-colors"
                    >−</button>
                    <div className="text-center">
                      <span className="text-5xl font-extrabold text-foreground" aria-live="polite">{data.age}</span>
                      <p className="text-sm text-muted-foreground mt-1">{t('ageYears')}</p>
                    </div>
                    <button
                      onClick={() => update('age', Math.min(17, data.age + 1))}
                      aria-label={lang === 'es' ? 'Aumentar edad' : 'Increase age'}
                      className="w-12 h-12 rounded-full border border-border bg-card text-foreground text-xl font-bold flex items-center justify-center hover:bg-secondary transition-colors"
                    >+</button>
                  </div>
                  <p className="text-center text-sm text-primary font-medium mt-5" role="status">💡 {ageRecText}</p>
                </StepContainer>
              )}

              {/* Step 3: First Phone */}
              {step === 3 && (
                <StepContainer>
                  <StepLabel>{t('firstPhoneLabel')}</StepLabel>
                  <div className="flex gap-4 justify-center" role="group" aria-label={t('firstPhoneLabel')}>
                    {[true, false].map((val) => (
                      <button
                        key={String(val)}
                        onClick={() => update('isFirstPhone', val)}
                        aria-pressed={data.isFirstPhone === val}
                        className={`px-8 py-3.5 rounded-2xl text-lg font-semibold border transition-all ${
                          data.isFirstPhone === val
                            ? 'border-primary bg-primary/10 text-primary'
                            : 'border-border bg-card text-foreground hover:bg-secondary'
                        }`}
                      >
                        {val ? t('yes') : t('no')}
                      </button>
                    ))}
                  </div>
                </StepContainer>
              )}

              {/* Step 4: Usage */}
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

              {/* Step 5: Restrictions */}
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

              {/* Step 6: Daily time */}
              {step === 6 && (
                <StepContainer>
                  <StepLabel htmlFor={`${formId}-daily-time`}>{t('dailyTimeLabel')}</StepLabel>
                  <TimeSlider id={`${formId}-daily-time`} value={data.dailyMinutes} onChange={(v) => update('dailyMinutes', v)} label={t('minutes')} />
                  <div className="mt-10">
                    <p className="text-sm font-semibold text-foreground mb-4" id={`${formId}-weekend-label`}>{t('weekendLabel')}</p>
                    <TimeSlider id={`${formId}-weekend-time`} value={data.weekendMinutes} onChange={(v) => update('weekendMinutes', v)} label={t('minutes')} aria-labelledby={`${formId}-weekend-label`} />
                  </div>
                </StepContainer>
              )}

              {/* Step 7: Apps */}
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
                        className={`px-3.5 py-2 rounded-xl text-sm font-medium border transition-all ${
                          data.allowedApps.includes(app)
                            ? 'border-primary bg-primary/10 text-primary'
                            : 'border-border bg-card text-foreground hover:bg-secondary'
                        }`}>
                        {app}
                        {data.allowedApps.includes(app) && <Check className="inline h-3 w-3 ml-1" aria-hidden="true" />}
                      </button>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <label htmlFor={`${formId}-app-input`} className="sr-only">{t('appsPlaceholder')}</label>
                    <input id={`${formId}-app-input`} value={appInput} onChange={(e) => setAppInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && addApp(appInput)}
                      placeholder={t('appsPlaceholder')} maxLength={30}
                      className="flex-1 rounded-2xl border border-input bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow" />
                    <button onClick={() => addApp(appInput)}
                      aria-label={t('appsAdd')}
                      className="px-4 py-3 rounded-2xl bg-primary/10 text-primary font-medium text-sm hover:bg-primary/20 transition-colors">
                      <Plus className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </div>

                  {data.allowedApps.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {data.allowedApps.filter(a => !suggestedApps.includes(a)).map((app) => (
                        <span key={app} className="inline-flex items-center gap-1 px-3.5 py-2 rounded-xl bg-primary/10 text-primary text-sm font-medium">
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

              {/* Step 8: Supervision */}
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

              {/* Step 9: Parent names */}
              {step === 9 && (
                <StepContainer>
                  <StepLabel>{t('parentNamesLabel')}</StepLabel>
                  <div className="space-y-3">
                    {data.parentNames.map((name, i) => (
                      <div key={i} className="flex gap-2">
                        <label htmlFor={`${formId}-parent-${i}`} className="sr-only">
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
                          className="flex-1 rounded-2xl border border-input bg-card px-5 py-3.5 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
                        />
                        {i > 1 && (
                          <button onClick={() => update('parentNames', data.parentNames.filter((_, idx) => idx !== i))}
                            aria-label={`${lang === 'es' ? 'Quitar tutor' : 'Remove guardian'} ${i + 1}`}
                            className="text-muted-foreground hover:text-destructive transition-colors">
                            <X className="h-4 w-4" aria-hidden="true" />
                          </button>
                        )}
                      </div>
                    ))}
                    {data.parentNames.length < 4 && (
                      <button onClick={addParentField}
                        className="text-sm text-primary hover:underline flex items-center gap-1 font-medium">
                        <Plus className="h-3 w-3" aria-hidden="true" /> {t('addParent')}
                      </button>
                    )}
                  </div>
                </StepContainer>
              )}

              {/* Step 10: Final message */}
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
                    className="w-full rounded-2xl border border-input bg-card px-5 py-3.5 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none transition-shadow"
                  />
                  <p className="text-xs text-muted-foreground text-center">{lang === 'es' ? 'Si lo dejas vacío, usaremos un mensaje predeterminado.' : 'Leave empty to use a default message.'}</p>
                </StepContainer>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      <div className="fixed left-0 right-0 px-6 py-4 z-30" style={{ top: '60%' }}>
        <div className="max-w-md mx-auto flex items-center justify-between">
          <button onClick={goBack}
            aria-label={t('back')}
            className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors font-medium">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" /> {t('back')}
          </button>
          <button onClick={goNext} disabled={!canProceed()}
            aria-label={step === TOTAL_STEPS ? t('generate') : t('next')}
            className="inline-flex items-center gap-2 gradient-primary text-primary-foreground font-bold px-7 py-3.5 rounded-2xl shadow-md hover:shadow-lg transition-shadow disabled:opacity-40 disabled:shadow-none">
            {step === TOTAL_STEPS ? t('generate') : t('next')}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
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
  return <Tag htmlFor={htmlFor} className="block text-2xl font-bold text-foreground text-center">{children}</Tag>;
}

function ToggleOption({ icon, label, selected, onClick }: { icon: string; label: string; selected: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick}
      role="checkbox"
      aria-checked={selected}
      className={`flex items-center gap-3 w-full px-5 py-3.5 rounded-2xl border text-left transition-all ${
        selected ? 'border-primary bg-primary/10 text-foreground' : 'border-border bg-card text-foreground hover:bg-secondary'
      }`}>
      <span className="text-xl" aria-hidden="true">{icon}</span>
      <span className="font-medium flex-1">{label}</span>
      {selected && <Check className="h-4 w-4 text-primary" aria-hidden="true" />}
    </button>
  );
}

function TimeSlider({ id, value, onChange, label, ...rest }: { id: string; value: number; onChange: (v: number) => void; label: string; 'aria-labelledby'?: string }) {
  return (
    <div>
      <div className="text-center mb-5">
        <span className="text-4xl font-extrabold text-foreground" aria-live="polite">{value}</span>
        <span className="text-sm text-muted-foreground ml-2">{label}</span>
      </div>
      <input
        id={id}
        type="range"
        min={15}
        max={180}
        step={15}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-valuemin={15}
        aria-valuemax={180}
        aria-valuenow={value}
        aria-valuetext={`${value} ${label}`}
        className="w-full h-2 bg-secondary rounded-full appearance-none cursor-pointer accent-primary"
        {...rest}
      />
      <div className="flex justify-between text-xs text-muted-foreground mt-1" aria-hidden="true">
        <span>15</span><span>60</span><span>120</span><span>180</span>
      </div>
    </div>
  );
}
