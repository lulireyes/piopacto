import { cn } from '@/lib/utils';

export default function HandUnderline({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span className={cn('hand-underline', className)}>
      {children}
      <svg viewBox="0 0 200 12" aria-hidden="true" preserveAspectRatio="none">
        <path
          d="M2 8.2 C 38 2.4, 72 11.6, 108 6.1 C 138 1.8, 168 9.4, 198 5.2"
          fill="none"
          stroke="hsl(var(--terracotta))"
          strokeWidth="4"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}
