/**
 * Edad mínima para registrarse, contrastada con una fuente.
 * Las que aún no se han mirado en las condiciones de uso van con minAge null
 * y un TODO. No inventar la cifra.
 */

export interface AppAgeSource {
  name: string;
  url: string;
  /** Fecha ISO de la fuente, o del día en que se contrastó el estado. */
  reviewedOn: string;
}

export interface AppMinimumAge {
  id: string;
  name: string;
  /** null mientras no esté contrastada con las condiciones de uso. */
  minAge: number | null;
  region: string;
  source: AppAgeSource | null;
  note: string;
}

export const apps: AppMinimumAge[] = [
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    minAge: 13,
    region: 'UE',
    source: {
      name: 'WhatsApp sube la edad mínima a 13 años en la UE y el Reino Unido',
      url: 'https://gigazine.net/gsc_news/en/20240415-whatsapp-eu-uk-minimum-age',
      reviewedOn: '2024-04-15',
    },
    note: 'Edad mínima de 13 años en la UE desde abril de 2024.',
  },
  // TODO: verificar
  {
    id: 'instagram',
    name: 'Instagram',
    minAge: null,
    region: 'UE',
    source: null,
    note: 'Pendiente de verificar en las condiciones de uso.',
  },
  // TODO: verificar
  {
    id: 'tiktok',
    name: 'TikTok',
    minAge: null,
    region: 'UE',
    source: null,
    note: 'Pendiente de verificar en las condiciones de uso.',
  },
  // TODO: verificar
  {
    id: 'youtube',
    name: 'YouTube',
    minAge: null,
    region: 'UE',
    source: null,
    note: 'Pendiente de verificar en las condiciones de uso.',
  },
  // TODO: verificar
  {
    id: 'roblox',
    name: 'Roblox',
    minAge: null,
    region: 'UE',
    source: null,
    note: 'Pendiente de verificar en las condiciones de uso.',
  },
  // TODO: verificar
  {
    id: 'snapchat',
    name: 'Snapchat',
    minAge: null,
    region: 'UE',
    source: null,
    note: 'Pendiente de verificar en las condiciones de uso.',
  },
];

/**
 * Umbral para registrarse en redes en España. No es la edad de una app.
 * Pío lo explica como ley en debate: la subida a 16 no está aprobada.
 */
export const spainSocialSignUp = {
  currentMinAge: 14,
  proposedMinAge: 16,
  status: 'en_tramitacion' as const,
  asOf: '2026-10',
  source: {
    name: 'Ley de protección de menores en entornos digitales, tramitación en el Congreso',
    url: 'https://one-tech.es/noticias/ley-redes-sociales-menores-16-anos-espana-congreso/',
    reviewedOn: '2026-10-14',
  },
  note: 'Hoy el umbral para registrarse es 14 años. La ley propone subirlo a 16 con autorización parental. A octubre de 2026 sigue en tramitación. No darla por aprobada.',
};

export function appById(id: string): AppMinimumAge | undefined {
  return apps.find((app) => app.id === id);
}
