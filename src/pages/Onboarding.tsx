import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSelector from '@/components/LanguageSelector';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Smartphone, Check } from 'lucide-react';
import { OnboardingData } from '@/lib/agreement-generator';

const TOTAL_STEPS = 7;

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

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 200 : -200, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -200 : 200, opacity: 0 }),
};

export default function Onboarding() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [data, setData] = useState<OnboardingData>({
    childName: '',
    age: 10,
    isFirstPhone: true,
    mainUsage: [],
    restrictions: ['meals', 'bedtime'],
    dailyMinutes: 60,
    weekendMinutes: 90,
    parent1Name: '',
    parent2Name: '',
  });

  const update = <K extends keyof OnboardingData>(key: K, value: OnboardingData[K]) => {
    setData((prev) => ({ ...prev, [key]: value }));
  };

  const toggleArray = (key: 'mainUsage' | 'restrictions', val: string) => {
    setData((prev) => ({
      ...prev,
      [key]: prev[key].includes(val) ? prev[key].filter((v) => v !== val) : [...prev[key], val],
    }));
  };

  const canProceed = () => {
    switch (step) {
      case 1: return data.childName.trim().length > 0;
      case 2: return data.age >= 8 && data.age <= 16;
      case 4: return data.mainUsage.length > 0;
      case 5: return data.restrictions.length > 0;
      case 7: return data.parent1Name.trim().length > 0;
      default: return true;
    }
  };

  const goNext = () => {
    if (step < TOTAL_STEPS) { setDirection(1); setStep(step + 1); }
    else {
      sessionStorage.setItem('onboardingData', JSON.stringify(data));
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

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 max-w-2xl mx-auto w-full">
        <div className="flex items-center gap-2">
          <Smartphone className="h-5 w-5 text-primary" />
          <span className="font-bold text-foreground">PactoDigital</span>
        </div>
        <LanguageSelector />
      </header>

      {/* Progress */}
      <div className="max-w-md mx-auto w-full px-6 mb-2">
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

      {/* Content */}
      <div className="flex-1 flex items-center justify-center px-6 py-8">
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
              {step === 1 && (
                <StepContainer>
                  <StepLabel>{t('childNameLabel')}</StepLabel>
                  <input
                    autoFocus
                    value={data.childName}
                    onChange={(e) => update('childName', e.target.value)}
                    placeholder={t('childNamePlaceholder')}
                    className="w-full rounded-xl border border-input bg-card px-4 py-3 text-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                  />
                </StepContainer>
              )}

              {step === 2 && (
                <StepContainer>
                  <StepLabel>{t('ageLabel')}</StepLabel>
                  <div className="flex items-center gap-6 justify-center">
                    <button
                      onClick={() => update('age', Math.max(8, data.age - 1))}
                      className="w-12 h-12 rounded-full border border-border bg-card text-foreground text-xl font-bold flex items-center justify-center hover:bg-secondary transition-colors"
                    >
                      −
                    </button>
                    <div className="text-center">
                      <span className="text-5xl font-extrabold text-foreground">{data.age}</span>
                      <p className="text-sm text-muted-foreground mt-1">{t('ageYears')}</p>
                    </div>
                    <button
                      onClick={() => update('age', Math.min(16, data.age + 1))}
                      className="w-12 h-12 rounded-full border border-border bg-card text-foreground text-xl font-bold flex items-center justify-center hover:bg-secondary transition-colors"
                    >
                      +
                    </button>
                  </div>
                </StepContainer>
              )}

              {step === 3 && (
                <StepContainer>
                  <StepLabel>{t('firstPhoneLabel')}</StepLabel>
                  <div className="flex gap-4 justify-center">
                    {[true, false].map((val) => (
                      <button
                        key={String(val)}
                        onClick={() => update('isFirstPhone', val)}
                        className={`px-8 py-3 rounded-xl text-lg font-semibold border transition-all ${
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

              {step === 4 && (
                <StepContainer>
                  <StepLabel>{t('mainUsageLabel')}</StepLabel>
                  <div className="grid grid-cols-1 gap-3">
                    {usageOptions.map((opt) => (
                      <ToggleOption
                        key={opt.key}
                        icon={opt.icon}
                        label={usageLabelMap[opt.key]}
                        selected={data.mainUsage.includes(opt.key)}
                        onClick={() => toggleArray('mainUsage', opt.key)}
                      />
                    ))}
                  </div>
                </StepContainer>
              )}

              {step === 5 && (
                <StepContainer>
                  <StepLabel>{t('restrictionsLabel')}</StepLabel>
                  <div className="grid grid-cols-1 gap-3">
                    {restrictionOptions.map((opt) => (
                      <ToggleOption
                        key={opt.key}
                        icon={opt.icon}
                        label={restrictionLabelMap[opt.key]}
                        selected={data.restrictions.includes(opt.key)}
                        onClick={() => toggleArray('restrictions', opt.key)}
                      />
                    ))}
                  </div>
                </StepContainer>
              )}

              {step === 6 && (
                <StepContainer>
                  <StepLabel>{t('dailyTimeLabel')}</StepLabel>
                  <TimeSlider
                    value={data.dailyMinutes}
                    onChange={(v) => update('dailyMinutes', v)}
                    label={t('minutes')}
                  />
                  <div className="mt-8">
                    <p className="text-sm font-medium text-foreground mb-3">{t('weekendLabel')}</p>
                    <TimeSlider
                      value={data.weekendMinutes}
                      onChange={(v) => update('weekendMinutes', v)}
                      label={t('minutes')}
                    />
                  </div>
                </StepContainer>
              )}

              {step === 7 && (
                <StepContainer>
                  <StepLabel>{t('parentNamesLabel')}</StepLabel>
                  <div className="space-y-4">
                    <input
                      autoFocus
                      value={data.parent1Name}
                      onChange={(e) => update('parent1Name', e.target.value)}
                      placeholder={t('parent1Placeholder')}
                      className="w-full rounded-xl border border-input bg-card px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                    />
                    <input
                      value={data.parent2Name}
                      onChange={(e) => update('parent2Name', e.target.value)}
                      placeholder={t('parent2Placeholder')}
                      className="w-full rounded-xl border border-input bg-card px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                    />
                  </div>
                </StepContainer>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation */}
      <div className="px-6 pb-8 max-w-md mx-auto w-full flex items-center justify-between">
        <button
          onClick={goBack}
          className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors font-medium"
        >
          <ArrowLeft className="h-4 w-4" />
          {t('back')}
        </button>
        <button
          onClick={goNext}
          disabled={!canProceed()}
          className="inline-flex items-center gap-2 gradient-primary text-primary-foreground font-bold px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition-shadow disabled:opacity-40 disabled:shadow-none"
        >
          {step === TOTAL_STEPS ? t('generate') : t('next')}
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

function StepContainer({ children }: { children: React.ReactNode }) {
  return <div className="space-y-6">{children}</div>;
}

function StepLabel({ children }: { children: React.ReactNode }) {
  return <h2 className="text-2xl font-bold text-foreground text-center">{children}</h2>;
}

function ToggleOption({ icon, label, selected, onClick }: { icon: string; label: string; selected: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl border text-left transition-all ${
        selected
          ? 'border-primary bg-primary/10 text-foreground'
          : 'border-border bg-card text-foreground hover:bg-secondary'
      }`}
    >
      <span className="text-xl">{icon}</span>
      <span className="font-medium flex-1">{label}</span>
      {selected && <Check className="h-4 w-4 text-primary" />}
    </button>
  );
}

function TimeSlider({ value, onChange, label }: { value: number; onChange: (v: number) => void; label: string }) {
  return (
    <div>
      <div className="text-center mb-4">
        <span className="text-4xl font-extrabold text-foreground">{value}</span>
        <span className="text-sm text-muted-foreground ml-2">{label}</span>
      </div>
      <input
        type="range"
        min={15}
        max={180}
        step={15}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 bg-secondary rounded-full appearance-none cursor-pointer accent-primary"
      />
      <div className="flex justify-between text-xs text-muted-foreground mt-1">
        <span>15</span>
        <span>60</span>
        <span>120</span>
        <span>180</span>
      </div>
    </div>
  );
}
