export type Language = 'es' | 'en';

export function detectLanguage(): Language {
  const browserLang = navigator.language.slice(0, 2).toLowerCase();
  return browserLang === 'es' ? 'es' : 'en';
}

type TranslationKey = keyof typeof translations.es;

const translations = {
  es: {
    // Landing
    heroTitle: 'El primer acuerdo digital en familia',
    heroSubtitle: 'Crea un pacto familiar personalizado sobre el uso del smartphone. Claro, empático y firmado por todos.',
    heroCta: 'Crear nuestro acuerdo',
    heroTime: '5 minutos · Gratis · Sin registro',
    featureTitle1: 'Personalizado por edad',
    featureDesc1: 'Recomendaciones adaptadas a la etapa de desarrollo de tu hijo.',
    featureTitle2: 'Lenguaje familiar',
    featureDesc2: 'Sin jerga legal. Un acuerdo que tu hijo pueda entender y aceptar.',
    featureTitle3: 'Listo para firmar',
    featureDesc3: 'Descarga el PDF, imprímelo y firmadlo juntos como familia.',
    howItWorksTitle: 'Cómo funciona',
    step1Title: 'Cuéntanos sobre tu familia',
    step1Desc: 'Unas pocas preguntas para personalizar el acuerdo.',
    step2Title: 'Revisa el acuerdo',
    step2Desc: 'Edita las reglas, tiempos y compromisos a tu gusto.',
    step3Title: 'Descarga y firma',
    step3Desc: 'Un PDF listo para imprimir y firmar en familia.',

    // Onboarding
    onboardingTitle: 'Vamos a crear vuestro acuerdo',
    stepOf: 'de',
    next: 'Siguiente',
    back: 'Atrás',
    generate: 'Generar acuerdo',

    // Step 1 - Child name
    childNameLabel: '¿Cómo se llama tu hijo/a?',
    childNamePlaceholder: 'Nombre del niño/a',

    // Step 2 - Age
    ageLabel: '¿Qué edad tiene?',
    ageYears: 'años',

    // Step 3 - First phone
    firstPhoneLabel: '¿Es su primer smartphone?',
    yes: 'Sí',
    no: 'No',

    // Step 4 - Main usage
    mainUsageLabel: '¿Para qué usará principalmente el teléfono?',
    usageCommunication: 'Comunicarse con la familia',
    usageSchool: 'Tareas escolares',
    usageSocial: 'Redes sociales',
    usageGames: 'Juegos',
    usageEntertainment: 'Entretenimiento (vídeos, música)',

    // Step 5 - Restrictions
    restrictionsLabel: '¿Cuándo no debería usar el teléfono?',
    restrictionMeals: 'Durante las comidas',
    restrictionBedtime: 'Antes de dormir',
    restrictionHomework: 'Mientras hace deberes',
    restrictionFamily: 'Actividades familiares',
    restrictionSchool: 'En el colegio',

    // Step 6 - Daily time
    dailyTimeLabel: '¿Cuánto tiempo diario de pantalla?',
    minutes: 'minutos al día',
    weekendLabel: '¿Y los fines de semana?',

    // Step 7 - Parent names
    parentNamesLabel: 'Nombres de los padres/tutores',
    parent1Placeholder: 'Padre/Madre/Tutor 1',
    parent2Placeholder: 'Padre/Madre/Tutor 2 (opcional)',

    // Agreement
    agreementTitle: 'Vuestro Acuerdo Familiar',
    editAgreement: 'Editar acuerdo',
    downloadPdf: 'Descargar PDF',
    addRule: 'Añadir regla',
    removeRule: 'Quitar',
    newRulePlaceholder: 'Escribe una nueva regla...',
    saveChanges: 'Guardar cambios',
    cancel: 'Cancelar',
    startOver: 'Empezar de nuevo',
    agreementDate: 'Fecha del acuerdo',
    signatures: 'Firmas',
    signatureParent: 'Firma del padre/madre',
    signatureChild: 'Firma de',
    reviewNote: 'Este acuerdo se revisará en familia cada 3 meses para adaptarlo según sea necesario.',
    language: 'Idioma',

    // Footer
    footerText: 'Hecho con cuidado para familias que quieren navegar juntas el mundo digital.',
  },
  en: {
    heroTitle: 'The first family digital agreement',
    heroSubtitle: 'Create a personalized family pact about smartphone use. Clear, empathetic, and signed by everyone.',
    heroCta: 'Create our agreement',
    heroTime: '5 minutes · Free · No sign-up',
    featureTitle1: 'Age-personalized',
    featureDesc1: 'Recommendations adapted to your child\'s developmental stage.',
    featureTitle2: 'Family-friendly language',
    featureDesc2: 'No legal jargon. An agreement your child can understand and accept.',
    featureTitle3: 'Ready to sign',
    featureDesc3: 'Download the PDF, print it, and sign it together as a family.',
    howItWorksTitle: 'How it works',
    step1Title: 'Tell us about your family',
    step1Desc: 'A few questions to personalize the agreement.',
    step2Title: 'Review the agreement',
    step2Desc: 'Edit rules, times, and commitments to your liking.',
    step3Title: 'Download and sign',
    step3Desc: 'A PDF ready to print and sign as a family.',

    onboardingTitle: 'Let\'s create your agreement',
    stepOf: 'of',
    next: 'Next',
    back: 'Back',
    generate: 'Generate agreement',

    childNameLabel: 'What\'s your child\'s name?',
    childNamePlaceholder: 'Child\'s name',

    ageLabel: 'How old are they?',
    ageYears: 'years old',

    firstPhoneLabel: 'Is this their first smartphone?',
    yes: 'Yes',
    no: 'No',

    mainUsageLabel: 'What will they mainly use the phone for?',
    usageCommunication: 'Family communication',
    usageSchool: 'Schoolwork',
    usageSocial: 'Social media',
    usageGames: 'Games',
    usageEntertainment: 'Entertainment (videos, music)',

    restrictionsLabel: 'When should the phone not be used?',
    restrictionMeals: 'During meals',
    restrictionBedtime: 'Before bedtime',
    restrictionHomework: 'During homework',
    restrictionFamily: 'Family activities',
    restrictionSchool: 'At school',

    dailyTimeLabel: 'How much daily screen time?',
    minutes: 'minutes per day',
    weekendLabel: 'And on weekends?',

    parentNamesLabel: 'Parent/guardian names',
    parent1Placeholder: 'Parent/Guardian 1',
    parent2Placeholder: 'Parent/Guardian 2 (optional)',

    agreementTitle: 'Your Family Agreement',
    editAgreement: 'Edit agreement',
    downloadPdf: 'Download PDF',
    addRule: 'Add rule',
    removeRule: 'Remove',
    newRulePlaceholder: 'Write a new rule...',
    saveChanges: 'Save changes',
    cancel: 'Cancel',
    startOver: 'Start over',
    agreementDate: 'Agreement date',
    signatures: 'Signatures',
    signatureParent: 'Parent signature',
    signatureChild: 'Signature of',
    reviewNote: 'This agreement will be reviewed as a family every 3 months to adapt it as needed.',
    language: 'Language',

    footerText: 'Made with care for families navigating the digital world together.',
  },
};

export function t(key: string, lang: Language): string {
  return (translations[lang] as Record<string, string>)[key] || key;
}

export { translations };
