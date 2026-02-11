export type Language = 'es' | 'en';

export function detectLanguage(): Language {
  const browserLang = navigator.language.slice(0, 2).toLowerCase();
  return browserLang === 'es' ? 'es' : 'en';
}

type TranslationKey = keyof typeof translations.es;

const translations = {
  es: {
    // Brand
    brandName: 'KidSmartphone',

    // Landing - Hero
    heroTitle1: 'Primero el acuerdo.',
    heroTitle2: 'Después el smartphone.',
    heroSubtitle: 'Cread juntos un pacto claro, justo y editable.\nNo se trata de controlar. Se trata de acompañar.',
    heroCta: 'Crear nuestro acuerdo familiar',
    heroMicrocopy: '✓ Gratis · ✓ Sin registro · ✓ Listo en 5 minutos',

    // Landing - H1 SEO
    seoH1: 'Acuerdo familiar para el uso del smartphone en niños y adolescentes',

    // Landing - Problem
    problemTitle: 'Dar un smartphone no es solo dar un dispositivo',
    problemIntro: 'Es abrir la puerta a nuevas responsabilidades, dudas y conversaciones difíciles.',
    problemQ1: '¿Cuánto tiempo de pantalla es adecuado según la edad?',
    problemQ2: '¿Qué apps son apropiadas para niños?',
    problemQ3: '¿Cómo establecer reglas sin conflictos?',
    problemQ4: '¿Es recomendable hacer un contrato de uso del móvil?',
    problemClosing: 'La mayoría de las familias improvisa estas reglas.\nY luego vienen los conflictos.',

    // Landing - Solution
    solutionTitle: 'Una herramienta para familias que quieren hacerlo bien',
    solutionIntro: 'KidSmartphone te ayuda a crear un acuerdo familiar personalizado entre padres e hijo sobre el uso del smartphone.',
    solutionPoint1: 'Se adapta a la edad del niño',
    solutionPoint2: 'Propone límites desde el diálogo',
    solutionPoint3: 'Se firma juntos, como familia',
    solutionDesc: 'Un documento claro, humano y editable.',

    // Landing - How it works
    howItWorksTitle: 'Cómo funciona',
    step1Title: 'Responde unas pocas preguntas',
    step1Desc: 'Sobre la edad, usos y momentos de restricción.',
    step2Title: 'Recibe un acuerdo recomendado por edad',
    step2Desc: 'Generado automáticamente con lenguaje empático.',
    step3Title: 'Edítalo a tu manera',
    step3Desc: 'Cambia reglas, tiempos y compromisos.',
    step4Title: 'Descárgalo en PDF listo para firmar',
    step4Desc: 'Imprime, firma en familia y colócalo en un lugar visible.',

    // Landing - Differentiators
    diffTitle: 'Qué hace diferente a KidSmartphone',
    diff1: 'Totalmente personalizable',
    diff1Desc: 'Cada familia es única. Adapta cada regla a vuestra realidad.',
    diff2: 'Lenguaje cercano y respetuoso',
    diff2Desc: 'Sin jerga legal. Un acuerdo que tu hijo puede entender.',
    diff3: 'No impone reglas',
    diff3Desc: 'Propone y tú decides. Sin juicios ni rigidez.',
    diff4: 'Incluye al niño en el acuerdo',
    diff4Desc: 'El niño también se compromete. Es un pacto, no una imposición.',
    diff5: 'Crece con la familia',
    diff5Desc: 'Revisable cada 3 meses para adaptarse a su madurez.',

    // Landing - What's included
    includesTitle: 'Qué incluye el acuerdo',
    includes1: 'Título personalizado con el nombre del niño',
    includes2: 'Reglas claras sobre tiempos, momentos y apps',
    includes3: 'Apps permitidas personalizadas',
    includes4: 'Compromisos mutuos (padres e hijo)',
    includes5: 'Mensaje final editable',
    includes6: 'Espacio para firmas',
    includesQuote: '"Firmamos este acuerdo porque nos importamos.\nNo se trata de controlar, sino de acompañarnos en esta aventura digital."',

    // Landing - About
    aboutTitle: 'Por qué creamos KidSmartphone',
    aboutP1: 'Cuando le dimos el primer smartphone a nuestro hijo, no encontramos información clara y práctica.',
    aboutP2: 'Investigamos con psicólogos, educadores y artículos. Creamos nuestro propio contrato.',
    aboutP3: 'Amigos nos pidieron el PDF. Como diseñadora, quise convertirlo en una herramienta digital para todas las familias.',
    aboutP4: 'Este proyecto está creado con ayuda de IA. Tu feedback es bienvenido.',
    aboutSupport: '¿Te gusta el proyecto? Puedes apoyarlo',
    aboutSupportLink: 'Invítanos a un café ☕',

    // Landing - SEO Guide section
    guideTitle: 'Cómo configurar el smartphone de tu hijo paso a paso',
    guideIntro: 'Una guía práctica para preparar el móvil antes de entregárselo.',
    guide1: 'Limitar el tiempo de uso diario',
    guide2: 'Restringir apps no adecuadas para su edad',
    guide3: 'Activar controles parentales (iPhone y Android)',
    guide4: 'Limitar compras dentro de apps',
    guide5: 'Configurar privacidad y ubicación',
    guideDownload: 'Descargar guía práctica (PDF)',
    guideDownloadSoon: 'Próximamente',

    // Landing - FAQ
    faqTitle: 'Preguntas frecuentes',
    faq1Q: '¿Es gratis crear un acuerdo?',
    faq1A: 'Sí, es completamente gratis. No necesitas registrarte ni dar datos personales.',
    faq2Q: '¿Para qué edades está pensado?',
    faq2A: 'Está diseñado para niños y adolescentes de 6 a 17 años, con recomendaciones adaptadas por edad.',
    faq3Q: '¿Puedo editar el acuerdo después de generarlo?',
    faq3A: 'Sí. Puedes modificar cualquier regla, añadir nuevas o eliminar las que no apliquen a tu familia.',
    faq4Q: '¿Es un documento legal?',
    faq4A: 'No. Es un acuerdo familiar basado en la confianza. No tiene validez legal, pero sí un gran valor educativo.',
    faq5Q: '¿Cómo se genera el acuerdo?',
    faq5A: 'A partir de las respuestas que das sobre tu hijo, generamos recomendaciones basadas en buenas prácticas de crianza digital.',

    // Footer
    footerText: 'Hecho con cuidado para familias que quieren navegar juntas el mundo digital.',
    footerSupport: 'Apoyar el proyecto',

    // Onboarding
    onboardingTitle: 'Vamos a crear vuestro acuerdo',
    stepOf: 'de',
    next: 'Siguiente',
    back: 'Atrás',
    generate: 'Generar acuerdo',

    childNameLabel: '¿Cómo se llama tu hijo/a?',
    childNamePlaceholder: 'Nombre del niño/a',

    ageLabel: '¿Qué edad tiene?',
    ageYears: 'años',
    ageRecommendation: 'Recomendación para {age} años: {minutes} min/día',

    firstPhoneLabel: '¿Es su primer smartphone?',
    yes: 'Sí',
    no: 'No',

    mainUsageLabel: '¿Para qué usará principalmente el teléfono?',
    usageCommunication: 'Comunicarse con la familia',
    usageSchool: 'Tareas escolares',
    usageSocial: 'Redes sociales',
    usageGames: 'Juegos',
    usageEntertainment: 'Entretenimiento (vídeos, música)',

    restrictionsLabel: '¿Cuándo no debería usar el teléfono?',
    restrictionMeals: 'Durante las comidas',
    restrictionBedtime: 'Antes de dormir',
    restrictionHomework: 'Mientras hace deberes',
    restrictionFamily: 'Actividades familiares',
    restrictionSchool: 'En el colegio',

    dailyTimeLabel: '¿Cuánto tiempo diario de pantalla?',
    minutes: 'minutos al día',
    weekendLabel: '¿Y los fines de semana?',

    appsLabel: '¿Qué apps podrá usar?',
    appsPlaceholder: 'Escribe el nombre de una app...',
    appsSuggested: 'Sugeridas para {age} años',
    appsAdd: 'Añadir',

    supervisionLabel: '¿Qué nivel de supervisión prefieres?',
    supervisionChat: 'Revisión ocasional de chats',
    supervisionLocation: 'Compartir ubicación',
    supervisionNone: 'Sin supervisión adicional',
    supervisionNote: 'Recuerda: la supervisión funciona mejor cuando es transparente y acordada.',

    parentNamesLabel: 'Nombres de los padres/tutores',
    parent1Placeholder: 'Padre/Madre/Tutor 1',
    parent2Placeholder: 'Padre/Madre/Tutor 2 (opcional)',
    addParent: 'Añadir otro padre/tutor',

    finalMessageLabel: 'Mensaje final del acuerdo',
    finalMessagePlaceholder: 'Escribe un mensaje personal para el acuerdo...',
    finalMessageDefault: 'Firmamos este acuerdo porque nos importamos. No se trata de controlar, sino de acompañarnos en esta aventura digital.',

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
    rulesTitle: 'Nuestras reglas',
    parentCommitmentsTitle: 'Compromisos de los padres',
    childCommitmentsTitle: 'Compromisos de {name}',

    // Post-download
    downloadSuccess: '¡Acuerdo descargado!',
    downloadMessage: 'Imprimidlo, firmadlo juntos y colocadlo en un lugar visible. Revisadlo cada 3 meses.',
    feedbackInvite: '¿Qué te ha parecido? Tu opinión nos ayuda a mejorar.',
    feedbackPlaceholder: 'Cuéntanos tu experiencia...',
    feedbackSend: 'Enviar feedback',
    feedbackThanks: '¡Gracias por tu feedback!',
    supportProject: '¿Te ha resultado útil?',
  },
  en: {
    brandName: 'KidSmartphone',

    heroTitle1: 'First the agreement.',
    heroTitle2: 'Then the smartphone.',
    heroSubtitle: 'Create together a clear, fair and editable pact.\nIt\'s not about controlling. It\'s about guiding.',
    heroCta: 'Create our family agreement',
    heroMicrocopy: '✓ Free · ✓ No sign-up · ✓ Ready in 5 minutes',

    seoH1: 'Family agreement for children and teens smartphone use',

    problemTitle: 'Giving a smartphone isn\'t just giving a device',
    problemIntro: 'It\'s opening the door to new responsibilities, doubts, and difficult conversations.',
    problemQ1: 'How much screen time is appropriate for their age?',
    problemQ2: 'Which apps are suitable for children?',
    problemQ3: 'How to set rules without conflict?',
    problemQ4: 'Should we create a phone use contract?',
    problemClosing: 'Most families improvise these rules.\nThen the conflicts begin.',

    solutionTitle: 'A tool for families who want to do it right',
    solutionIntro: 'KidSmartphone helps you create a personalized family agreement between parents and child about smartphone use.',
    solutionPoint1: 'Adapts to the child\'s age',
    solutionPoint2: 'Proposes limits through dialogue',
    solutionPoint3: 'Signed together, as a family',
    solutionDesc: 'A clear, human and editable document.',

    howItWorksTitle: 'How it works',
    step1Title: 'Answer a few questions',
    step1Desc: 'About age, usage and restriction moments.',
    step2Title: 'Get an age-based recommendation',
    step2Desc: 'Automatically generated with empathetic language.',
    step3Title: 'Edit it your way',
    step3Desc: 'Change rules, times and commitments.',
    step4Title: 'Download a PDF ready to sign',
    step4Desc: 'Print, sign as a family and place it somewhere visible.',

    diffTitle: 'What makes KidSmartphone different',
    diff1: 'Fully customizable',
    diff1Desc: 'Every family is unique. Adapt every rule to your reality.',
    diff2: 'Warm and respectful language',
    diff2Desc: 'No legal jargon. An agreement your child can understand.',
    diff3: 'Doesn\'t impose rules',
    diff3Desc: 'Suggests and you decide. No judgments or rigidity.',
    diff4: 'Includes the child in the agreement',
    diff4Desc: 'The child also commits. It\'s a pact, not an imposition.',
    diff5: 'Grows with the family',
    diff5Desc: 'Reviewable every 3 months to adapt to their maturity.',

    includesTitle: 'What the agreement includes',
    includes1: 'Personalized title with the child\'s name',
    includes2: 'Clear rules about times, moments and apps',
    includes3: 'Customized allowed apps',
    includes4: 'Mutual commitments (parents and child)',
    includes5: 'Editable final message',
    includes6: 'Space for signatures',
    includesQuote: '"We sign this agreement because we care about each other.\nIt\'s not about controlling, but about walking this digital adventure together."',

    aboutTitle: 'Why we created KidSmartphone',
    aboutP1: 'When we gave our child their first smartphone, we couldn\'t find clear, practical information.',
    aboutP2: 'We researched with psychologists, educators and articles. We created our own contract.',
    aboutP3: 'Friends asked us for the PDF. As a designer, I wanted to turn it into a digital tool for all families.',
    aboutP4: 'This project is created with the help of AI. Your feedback is welcome.',
    aboutSupport: 'Do you like the project? You can support it',
    aboutSupportLink: 'Buy us a coffee ☕',

    guideTitle: 'How to set up your child\'s smartphone step by step',
    guideIntro: 'A practical guide to prepare the phone before handing it over.',
    guide1: 'Limit daily screen time',
    guide2: 'Restrict age-inappropriate apps',
    guide3: 'Enable parental controls (iPhone & Android)',
    guide4: 'Limit in-app purchases',
    guide5: 'Configure privacy and location settings',
    guideDownload: 'Download practical guide (PDF)',
    guideDownloadSoon: 'Coming soon',

    faqTitle: 'Frequently asked questions',
    faq1Q: 'Is it free to create an agreement?',
    faq1A: 'Yes, it\'s completely free. No sign-up or personal data required.',
    faq2Q: 'For what ages is it designed?',
    faq2A: 'It\'s designed for children and teens aged 6 to 17, with age-adapted recommendations.',
    faq3Q: 'Can I edit the agreement after generating it?',
    faq3A: 'Yes. You can modify any rule, add new ones or remove those that don\'t apply to your family.',
    faq4Q: 'Is it a legal document?',
    faq4A: 'No. It\'s a family agreement based on trust. It has no legal validity, but great educational value.',
    faq5Q: 'How is the agreement generated?',
    faq5A: 'Based on your answers about your child, we generate recommendations based on best digital parenting practices.',

    footerText: 'Made with care for families navigating the digital world together.',
    footerSupport: 'Support the project',

    onboardingTitle: 'Let\'s create your agreement',
    stepOf: 'of',
    next: 'Next',
    back: 'Back',
    generate: 'Generate agreement',

    childNameLabel: 'What\'s your child\'s name?',
    childNamePlaceholder: 'Child\'s name',

    ageLabel: 'How old are they?',
    ageYears: 'years old',
    ageRecommendation: 'Recommendation for age {age}: {minutes} min/day',

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

    appsLabel: 'Which apps will they be allowed to use?',
    appsPlaceholder: 'Type an app name...',
    appsSuggested: 'Suggested for age {age}',
    appsAdd: 'Add',

    supervisionLabel: 'What level of supervision do you prefer?',
    supervisionChat: 'Occasional chat review',
    supervisionLocation: 'Share location',
    supervisionNone: 'No additional supervision',
    supervisionNote: 'Remember: supervision works best when it\'s transparent and agreed upon.',

    parentNamesLabel: 'Parent/guardian names',
    parent1Placeholder: 'Parent/Guardian 1',
    parent2Placeholder: 'Parent/Guardian 2 (optional)',
    addParent: 'Add another parent/guardian',

    finalMessageLabel: 'Final agreement message',
    finalMessagePlaceholder: 'Write a personal message for the agreement...',
    finalMessageDefault: 'We sign this agreement because we care about each other. It\'s not about control—it\'s about walking this digital adventure together.',

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
    rulesTitle: 'Our rules',
    parentCommitmentsTitle: 'Parent commitments',
    childCommitmentsTitle: '{name}\'s commitments',

    downloadSuccess: 'Agreement downloaded!',
    downloadMessage: 'Print it, sign it together and place it somewhere visible. Review it every 3 months.',
    feedbackInvite: 'What did you think? Your feedback helps us improve.',
    feedbackPlaceholder: 'Tell us about your experience...',
    feedbackSend: 'Send feedback',
    feedbackThanks: 'Thanks for your feedback!',
    supportProject: 'Did you find it useful?',
  },
};

export function t(key: string, lang: Language): string {
  return (translations[lang] as Record<string, string>)[key] || key;
}

export { translations };
