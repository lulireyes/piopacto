import { Language } from './i18n';

export interface OnboardingData {
  childName: string;
  age: number;
  isFirstPhone: boolean;
  mainUsage: string[];
  restrictions: string[];
  dailyMinutes: number;
  weekendMinutes: number;
  allowedApps: string[];
  supervision: string[];
  parentNames: string[];
  finalMessage: string;
}

export interface AgreementRule {
  id: string;
  text: string;
  category: 'time' | 'behavior' | 'safety' | 'trust';
}

export interface Agreement {
  title: string;
  intro: string;
  rules: AgreementRule[];
  parentCommitments: string[];
  childCommitments: string[];
  closingNote: string;
  reviewNote: string;
}

function generateId() {
  return Math.random().toString(36).substring(2, 9);
}

export function getRecommendedMinutes(age: number): number {
  if (age <= 7) return 30;
  if (age <= 9) return 45;
  if (age <= 11) return 60;
  if (age <= 13) return 90;
  return 120;
}

export function getSuggestedApps(age: number): string[] {
  if (age <= 9) return ['WhatsApp', 'Duolingo', 'Khan Academy Kids', 'Google Maps'];
  if (age <= 12) return ['WhatsApp', 'Spotify', 'Duolingo', 'Google Maps', 'Khan Academy'];
  return ['WhatsApp', 'Spotify', 'Instagram', 'Google Maps', 'Duolingo', 'Notion'];
}

export function generateAgreement(data: OnboardingData, lang: Language): Agreement {
  const isYoung = data.age <= 10;
  const isTeen = data.age >= 13;

  if (lang === 'es') {
    return generateSpanish(data, isYoung, isTeen);
  }
  return generateEnglish(data, isYoung, isTeen);
}

function generateSpanish(data: OnboardingData, isYoung: boolean, isTeen: boolean): Agreement {
  const { childName, age, dailyMinutes, weekendMinutes, restrictions, mainUsage, isFirstPhone, allowedApps, supervision, finalMessage } = data;

  const rules: AgreementRule[] = [];

  rules.push({
    id: generateId(),
    text: `${childName} podrá usar el teléfono un máximo de ${dailyMinutes} minutos al día entre semana.`,
    category: 'time',
  });
  rules.push({
    id: generateId(),
    text: `Los fines de semana, el tiempo de uso será de ${weekendMinutes} minutos al día.`,
    category: 'time',
  });

  if (restrictions.includes('meals')) {
    rules.push({ id: generateId(), text: 'Durante las comidas, el teléfono se queda fuera de la mesa.', category: 'behavior' });
  }
  if (restrictions.includes('bedtime')) {
    rules.push({
      id: generateId(),
      text: isYoung
        ? 'El teléfono se apaga 1 hora antes de ir a dormir y se carga fuera de la habitación.'
        : 'El teléfono se deja cargando fuera de la habitación al menos 30 minutos antes de dormir.',
      category: 'behavior',
    });
  }
  if (restrictions.includes('homework')) {
    rules.push({ id: generateId(), text: 'Mientras se hacen deberes o se estudia, el teléfono estará en silencio y fuera de la vista.', category: 'behavior' });
  }
  if (restrictions.includes('family')) {
    rules.push({ id: generateId(), text: 'En actividades familiares, todos (incluidos los padres) dejaremos el teléfono a un lado.', category: 'behavior' });
  }
  if (restrictions.includes('school')) {
    rules.push({ id: generateId(), text: 'En el colegio, el teléfono seguirá las normas del centro.', category: 'behavior' });
  }

  if (allowedApps.length > 0) {
    rules.push({
      id: generateId(),
      text: `Las apps permitidas son: ${allowedApps.join(', ')}. Cualquier app nueva se comentará antes de descargar.`,
      category: 'safety',
    });
  }

  rules.push({
    id: generateId(),
    text: isYoung
      ? `${childName} no descargará apps sin permiso de sus padres.`
      : `Antes de descargar una app nueva, ${childName} comentará con sus padres de qué se trata.`,
    category: 'safety',
  });

  rules.push({
    id: generateId(),
    text: 'No se compartirá información personal (dirección, colegio, fotos privadas) con desconocidos.',
    category: 'safety',
  });

  if (isTeen && mainUsage.includes('social')) {
    rules.push({
      id: generateId(),
      text: 'Las redes sociales se usarán con respeto. Nada que no dirías en persona.',
      category: 'safety',
    });
  }

  if (supervision.includes('location')) {
    rules.push({
      id: generateId(),
      text: `${childName} compartirá su ubicación con sus padres. Esto es para seguridad, no para control.`,
      category: 'trust',
    });
  }

  if (supervision.includes('chat')) {
    rules.push({
      id: generateId(),
      text: isYoung
        ? 'Los padres podrán revisar los chats de forma transparente y acordada.'
        : 'De forma ocasional y transparente, los padres podrán revisar los chats si hay motivo de preocupación.',
      category: 'trust',
    });
  }

  rules.push({
    id: generateId(),
    text: isYoung
      ? `Si algo en el teléfono hace sentir mal o confundido a ${childName}, se lo contará a sus padres sin miedo.`
      : `Si ${childName} se encuentra con algo incómodo o preocupante, podrá hablar con sus padres sin consecuencias.`,
    category: 'trust',
  });

  const parentCommitments = [
    'Respetaremos los tiempos acordados y daremos ejemplo con nuestro propio uso del teléfono.',
    `Escucharemos a ${childName} si quiere hablar sobre algo que vio o vivió en el teléfono.`,
    'No revisaremos el teléfono a escondidas. Si necesitamos verificar algo, lo haremos juntos.',
    'Seremos flexibles si las circunstancias cambian y ajustaremos este acuerdo cuando sea necesario.',
  ];

  const childCommitments = [
    'Respetaré los tiempos y lugares acordados para usar el teléfono.',
    'Cuidaré el teléfono como algo valioso.',
    'Pediré ayuda si algo me preocupa o no entiendo.',
    isFirstPhone
      ? 'Entiendo que tener un teléfono es una responsabilidad y un paso importante.'
      : 'Me comprometo a seguir usando el teléfono de forma responsable.',
  ];

  const closingText = finalMessage || `Firmamos este acuerdo porque nos importamos. No se trata de controlar, sino de acompañarnos en esta aventura digital. ${childName}, confiamos en ti.`;

  return {
    title: 'Acuerdo Familiar sobre el Smartphone',
    intro: isYoung
      ? `Este acuerdo es entre ${childName} (${age} años) y su familia. Tener un teléfono es emocionante, y juntos vamos a aprender a usarlo bien. Este pacto nos ayuda a cuidarnos y confiar los unos en los otros.`
      : `Este acuerdo es entre ${childName} (${age} años) y su familia. Un smartphone es una herramienta poderosa que viene con libertad y responsabilidad. Este pacto refleja la confianza que nos tenemos y nuestro compromiso de cuidarnos mutuamente en el mundo digital.`,
    rules,
    parentCommitments,
    childCommitments,
    closingNote: closingText,
    reviewNote: `Revisaremos este acuerdo juntos cada 3 meses para ajustarlo a medida que ${childName} crece y cambian las necesidades.`,
  };
}

function generateEnglish(data: OnboardingData, isYoung: boolean, isTeen: boolean): Agreement {
  const { childName, age, dailyMinutes, weekendMinutes, restrictions, mainUsage, isFirstPhone, allowedApps, supervision, finalMessage } = data;

  const rules: AgreementRule[] = [];

  rules.push({
    id: generateId(),
    text: `${childName} can use the phone for a maximum of ${dailyMinutes} minutes per day on weekdays.`,
    category: 'time',
  });
  rules.push({
    id: generateId(),
    text: `On weekends, screen time will be ${weekendMinutes} minutes per day.`,
    category: 'time',
  });

  if (restrictions.includes('meals')) {
    rules.push({ id: generateId(), text: 'During meals, the phone stays away from the table.', category: 'behavior' });
  }
  if (restrictions.includes('bedtime')) {
    rules.push({
      id: generateId(),
      text: isYoung
        ? 'The phone is turned off 1 hour before bedtime and charges outside the bedroom.'
        : 'The phone is left charging outside the bedroom at least 30 minutes before sleep.',
      category: 'behavior',
    });
  }
  if (restrictions.includes('homework')) {
    rules.push({ id: generateId(), text: 'During homework or study time, the phone will be on silent and out of sight.', category: 'behavior' });
  }
  if (restrictions.includes('family')) {
    rules.push({ id: generateId(), text: 'During family activities, everyone (including parents) will put phones aside.', category: 'behavior' });
  }
  if (restrictions.includes('school')) {
    rules.push({ id: generateId(), text: 'At school, the phone will follow the school\'s rules.', category: 'behavior' });
  }

  if (allowedApps.length > 0) {
    rules.push({
      id: generateId(),
      text: `Allowed apps are: ${allowedApps.join(', ')}. Any new app will be discussed before downloading.`,
      category: 'safety',
    });
  }

  rules.push({
    id: generateId(),
    text: isYoung
      ? `${childName} will not download apps without parental permission.`
      : `Before downloading a new app, ${childName} will discuss it with parents.`,
    category: 'safety',
  });

  rules.push({
    id: generateId(),
    text: 'Personal information (address, school, private photos) will not be shared with strangers.',
    category: 'safety',
  });

  if (isTeen && mainUsage.includes('social')) {
    rules.push({
      id: generateId(),
      text: 'Social media will be used respectfully. Nothing you wouldn\'t say in person.',
      category: 'safety',
    });
  }

  if (supervision.includes('location')) {
    rules.push({
      id: generateId(),
      text: `${childName} will share their location with parents. This is for safety, not control.`,
      category: 'trust',
    });
  }

  if (supervision.includes('chat')) {
    rules.push({
      id: generateId(),
      text: isYoung
        ? 'Parents may review chats transparently and by agreement.'
        : 'Occasionally and transparently, parents may review chats if there is cause for concern.',
      category: 'trust',
    });
  }

  rules.push({
    id: generateId(),
    text: isYoung
      ? `If something on the phone makes ${childName} feel bad or confused, they will tell their parents without fear.`
      : `If ${childName} encounters something uncomfortable or worrying, they can talk to their parents without consequences.`,
    category: 'trust',
  });

  const parentCommitments = [
    'We will respect the agreed times and lead by example with our own phone use.',
    `We will listen to ${childName} if they want to talk about something they saw or experienced on the phone.`,
    'We won\'t check the phone secretly. If we need to verify something, we\'ll do it together.',
    'We will be flexible if circumstances change and adjust this agreement when needed.',
  ];

  const childCommitments = [
    'I will respect the agreed times and places for phone use.',
    'I will take care of the phone as something valuable.',
    'I will ask for help if something worries me or I don\'t understand.',
    isFirstPhone
      ? 'I understand that having a phone is a responsibility and an important step.'
      : 'I commit to continuing to use the phone responsibly.',
  ];

  const closingText = finalMessage || `We sign this agreement because we care about each other. It's not about control—it's about walking this digital adventure together. ${childName}, we trust you.`;

  return {
    title: 'Family Smartphone Agreement',
    intro: isYoung
      ? `This agreement is between ${childName} (age ${age}) and their family. Having a phone is exciting, and together we're going to learn to use it well. This pact helps us care for each other and build trust.`
      : `This agreement is between ${childName} (age ${age}) and their family. A smartphone is a powerful tool that comes with freedom and responsibility. This pact reflects the trust we have in each other and our commitment to looking out for one another in the digital world.`,
    rules,
    parentCommitments,
    childCommitments,
    closingNote: closingText,
    reviewNote: `We will review this agreement together every 3 months to adjust it as ${childName} grows and needs change.`,
  };
}
