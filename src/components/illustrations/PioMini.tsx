type PioMiniProps = {
  size?: number;
  bob?: boolean;
  smile?: boolean;
};

export default function PioMini({ size = 34, bob = false, smile = false }: PioMiniProps) {
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 48 48" className={bob ? "a-bob" : undefined}>
      <circle cx="24" cy="26" r="18" fill="#C8553D" />
      <ellipse cx="24" cy="32" rx="10" ry="8" fill="#F1E3C8" />
      {smile ? (
        <path d="M16 21 q2.5 -3 5 0 M27 21 q2.5 -3 5 0" fill="none" stroke="#1E1A16" strokeWidth="2" strokeLinecap="round" />
      ) : (
        <>
          <circle cx="18.5" cy="21" r="2.6" fill="#1E1A16" />
          <circle cx="29.5" cy="21" r="2.6" fill="#1E1A16" />
        </>
      )}
      <path d="M21.5 25 L24 29 L26.5 25 Z" fill="#E9A23B" />
    </svg>
  );
}
