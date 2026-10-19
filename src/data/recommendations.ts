/**
 * Recomendaciones de pantalla de la AEP, por edad.
 *
 * El tope de la AEP incluye el tiempo del colegio y los deberes.
 * Los minutos de ocio que pacte la familia tienen que quedar por debajo,
 * no igualar esa cifra.
 *
 * Cada fila lleva su fuente, la URL y la fecha en que se contrastó.
 */

export interface RecommendationSource {
  name: string;
  url: string;
  /** Fecha ISO en que se contrastó esta fuente. */
  reviewedOn: string;
  note?: string;
}

export interface LeisureMinutes {
  min: number;
  max: number;
  /** Valor con el que arranca el contador de ocio. */
  defaultMinutes: number;
}

export interface AgeRecommendation {
  id: '0-6' | '7-12' | '13-16';
  minAge: number;
  maxAge: number;
  /**
   * Tope de pantalla al día, en minutos, con colegio y deberes incluidos.
   * null: la AEP no considera que exista un tiempo seguro.
   */
  maxScreenMinutesPerDay: number | null;
  maxScreenLabel: string;
  otherGuidance: string;
  /** Qué hace la conversación en esta edad. No es un texto para mostrar tal cual. */
  pio: string;
  /** null si no se ofrece pacto. */
  leisure: LeisureMinutes | null;
  sources: RecommendationSource[];
}

const aepPage: RecommendationSource = {
  name: 'AEP — Nuevas recomendaciones sobre pantallas en infancia y adolescencia',
  url: 'https://enfamilia.aeped.es/printpdf/noticias/nuevas-recomendaciones-sobre-pantallas-en-infancia-adolescencia',
  reviewedOn: '2025-09-30',
  note: 'Recomendaciones revisadas a finales de 2024. La página se revisó el 30-9-2025.',
};

const aepInfographic: RecommendationSource = {
  name: 'Infografía del Plan Digital Familiar de la AEP',
  url: 'https://plandigitalfamiliar.aeped.es/downloads/Infografia_Recomendaciones%20por%20edad_AEP_Plan%20Digital%20Familiar_v4.pdf',
  reviewedOn: '2025-09-30',
  note: 'El PDF no publica fecha propia. Se contrastó junto con la página de la AEP revisada el 30-9-2025.',
};

export const ageRecommendations: AgeRecommendation[] = [
  {
    id: '0-6',
    minAge: 0,
    maxAge: 6,
    maxScreenMinutesPerDay: 0,
    maxScreenLabel:
      'Cero pantallas, salvo contacto social breve con un adulto (videollamada, cuento)',
    otherGuidance: 'No existe un tiempo seguro',
    pio: 'No ofrece crear pacto; explica la recomendación y propone volver más adelante',
    leisure: null,
    sources: [aepPage, aepInfographic],
  },
  {
    id: '7-12',
    minAge: 7,
    maxAge: 12,
    maxScreenMinutesPerDay: 60,
    maxScreenLabel: 'Menos de 1 hora, incluyendo cole y deberes',
    otherGuidance:
      'Dispositivo fijo y supervisado, fuera de baño y dormitorio; límites de tiempo y contenido acordados antes',
    pio: 'Recomienda esperar al smartphone propio; si la familia sigue, propone 15–45 min de ocio y móvil sin internet como alternativa',
    leisure: { min: 15, max: 45, defaultMinutes: 30 },
    sources: [aepPage, aepInfographic],
  },
  {
    id: '13-16',
    minAge: 13,
    maxAge: 16,
    maxScreenMinutesPerDay: 120,
    maxScreenLabel: 'Menos de 2 horas, incluyendo cole y deberes',
    otherGuidance:
      'Retrasar el primer smartphone con internet; priorizar móviles sin internet; control parental instalado',
    pio: 'Propone 30–90 min de ocio, control parental y revisar el pacto cada 3 meses',
    // 60 es el centro del rango que propone Pío (30–90). El prototipo arrancaba en 90 o 120.
    leisure: { min: 30, max: 90, defaultMinutes: 60 },
    sources: [aepPage, aepInfographic],
  },
];

/** Fila de la tabla para una edad. A partir de 17 se usa la de 13–16: la tabla publicada llega hasta los 16. */
export function recommendationForAge(age: number): AgeRecommendation | undefined {
  const match = ageRecommendations.find((row) => age >= row.minAge && age <= row.maxAge);
  if (match) return match;
  if (age > 16) return ageRecommendations.find((row) => row.id === '13-16');
  return undefined;
}

/**
 * Minutos de ocio con los que arranca el contador.
 * Devuelve 0 de 0 a 6 años: en esa edad no se ofrece pacto.
 */
export function leisureDefaultMinutes(age: number): number {
  return recommendationForAge(age)?.leisure?.defaultMinutes ?? 0;
}
