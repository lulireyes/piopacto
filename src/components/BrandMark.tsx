import type { Language } from '@/lib/i18n';
import { cn } from '@/lib/utils';

/** Subtítulos de marca. El neerlandés está en la UI, pero la hoja de marca no trae frase: no se inventa. */
const TAGLINES: Partial<Record<Language, string>> = {
  es: 'el pacto del primer móvil',
  pt: 'o pacto do primeiro telemóvel',
  it: 'il patto del primo smartphone',
  fr: 'le pacte du premier smartphone',
  en: 'the first phone pact',
  de: 'der Handy-Pakt für die ganze Familie',
};

export function brandTagline(lang: Language): string | undefined {
  return TAGLINES[lang];
}

/** Cara de Pío, la misma del onboarding, sin deformar. Cierra la «o» de PioPacto. */
export function PioGlyph({ size = 32 }: { size?: number }) {
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="12 4 40 52">
      <path d="M28 13 q2 -6 6 -2" fill="none" stroke="#1E1A16" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="32" cy="34" r="20" fill="#C8553D" />
      <ellipse cx="32" cy="41" rx="11" ry="9" fill="#F1E3C8" />
      <circle cx="26" cy="28" r="2.8" fill="#1E1A16" />
      <circle cx="38" cy="28" r="2.8" fill="#1E1A16" />
      <circle cx="26.9" cy="27.1" r="0.9" fill="#FFFDF8" />
      <circle cx="38.9" cy="27.1" r="0.9" fill="#FFFDF8" />
      <path d="M29.5 32.5 L32 37 L34.5 32.5 Z" fill="#E9A23B" />
    </svg>
  );
}

interface BrandMarkProps {
  /** Compatibilidad con llamadas antiguas. El wordmark es siempre PioPacto. */
  name?: string;
  className?: string;
  compact?: boolean;
  subtitle?: string;
}

/** Propuesta A: «PioPact» en Fraunces y Pío como la o final. */
export default function BrandMark({ className, compact = false, subtitle }: BrandMarkProps) {
  const fontSize = compact ? 22 : 32;
  const bird = compact ? 26 : 38;
  return (
    <span className={cn('inline-flex flex-col items-start', className)}>
      <span
        className="inline-flex items-end font-display font-semibold leading-none tracking-[-0.03em] text-[#1E1A16]"
        style={{ fontSize, fontVariationSettings: "'SOFT' 100, 'opsz' 72" }}
        aria-label="PioPacto"
      >
        <span aria-hidden="true">PioPact</span>
        <PioGlyph size={bird} />
      </span>
      {subtitle ? (
        <span className="mt-1 font-sans text-[13px] font-medium leading-none text-[#6B635A]">· {subtitle}</span>
      ) : null}
    </span>
  );
}

/** Sello redondo (propuesta C). Complemento del PDF, no el logo de cabecera. */
export function PactSeal({ size = 112, ring = 'PIOPACTO · EL PACTO DEL PRIMER MÓVIL · ', label = 'PioPacto, el pacto del primer móvil' }: { size?: number; ring?: string; label?: string }) {
  return (
    <svg role="img" aria-label={label} width={size} height={size} viewBox="0 0 160 160">
      <circle cx="80" cy="80" r="76" fill="#FFFDF8" stroke="#1E1A16" strokeWidth="1.5" />
      <circle cx="80" cy="80" r="67" fill="none" stroke="#1E1A16" strokeWidth="1" strokeDasharray="1.2 2.8" />
      <defs>
        <path id="piopacto-seal-ring" d="M80,80 m-57,0 a57,57 0 1,1 114,0 a57,57 0 1,1 -114,0" />
      </defs>
      <text fill="#1E1A16" fontFamily="Figtree, sans-serif" fontSize="8.4" fontWeight="700" letterSpacing="1.35">
        <textPath href="#piopacto-seal-ring" startOffset="0%">{ring}</textPath>
      </text>
      <g transform="translate(49,52) scale(0.92)">
        <path d="M28 13 q2 -6 6 -2" fill="none" stroke="#1E1A16" strokeWidth="1.6" strokeLinecap="round" />
        <circle cx="32" cy="34" r="20" fill="#C8553D" />
        <ellipse cx="32" cy="41" rx="11" ry="9" fill="#F1E3C8" />
        <circle cx="26" cy="28" r="2.8" fill="#1E1A16" />
        <circle cx="38" cy="28" r="2.8" fill="#1E1A16" />
        <circle cx="26.9" cy="27.1" r="0.9" fill="#FFFDF8" />
        <circle cx="38.9" cy="27.1" r="0.9" fill="#FFFDF8" />
        <path d="M29.5 32.5 L32 37 L34.5 32.5 Z" fill="#E9A23B" />
      </g>
      <path d="M62 108 q18 8 36 0" fill="none" stroke="#C8553D" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
