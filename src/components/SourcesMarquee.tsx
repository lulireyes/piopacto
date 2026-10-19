import { cn } from '@/lib/utils';

export type SourceLogo = string | { src: string; alt: string };

export type SourceItem = {
  name: string;
  /** One or more logo URLs. Shown instead of the name (name stays as alt text). */
  logo?: SourceLogo | SourceLogo[];
};

type SourcesMarqueeProps = {
  prefix: string;
  items: SourceItem[];
  className?: string;
};

function SourceLogos({ item }: { item: SourceItem }) {
  const logos = item.logo ? (Array.isArray(item.logo) ? item.logo : [item.logo]) : [];

  if (logos.length === 0) {
    return <strong className="font-semibold text-ink">{item.name}</strong>;
  }

  return (
    <span className="inline-flex items-center gap-3">
      {logos.map((logo) => {
        const src = typeof logo === 'string' ? logo : logo.src;
        const alt = typeof logo === 'string' ? item.name : logo.alt;
        return (
          <img
            key={src}
            src={src}
            alt={alt}
            className="h-8 w-auto max-w-[160px] object-contain object-left"
          />
        );
      })}
    </span>
  );
}

export default function SourcesMarquee({ prefix, items, className }: SourcesMarqueeProps) {
  const row = (
    <span className="inline-flex items-center gap-x-6 whitespace-nowrap px-8">
      <span className="text-muted-foreground">{prefix}</span>
      {items.map((item, i) => (
        <span key={`${item.name}-${i}`} className="inline-flex items-center gap-x-6">
          {i > 0 && (
            <span className="text-ink/30" aria-hidden="true">
              ·
            </span>
          )}
          <SourceLogos item={item} />
        </span>
      ))}
    </span>
  );

  return (
    <div
      className={cn(
        'sources-marquee border-y border-border bg-sheet text-sm text-ink-soft',
        className,
      )}
    >
      {/* Única animación permitida: la cinta de fuentes, lenta, pausable y desactivada con reduced-motion */}
      <div className="sources-marquee-static mx-auto hidden max-w-content flex-wrap items-center justify-center gap-x-4 gap-y-3 px-8 py-6 text-center">
        {row}
      </div>
      <div className="sources-marquee-motion overflow-hidden py-6" tabIndex={0}>
        <div className="sources-marquee-track flex w-max">
          {row}
          <span aria-hidden="true">{row}</span>
        </div>
      </div>
    </div>
  );
}
