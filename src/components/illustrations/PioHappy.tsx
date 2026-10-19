type PioHappyProps = {
  size?: number;
  className?: string;
};

export default function PioHappy({ size = 48, className }: PioHappyProps) {
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 48 48" className={className}>
      <circle cx="24" cy="26" r="18" fill="#C8553D" />
      <ellipse cx="24" cy="32" rx="10" ry="8" fill="#F1E3C8" />
      <path
        d="M16 21 q2.5 -3 5 0 M27 21 q2.5 -3 5 0"
        fill="none"
        stroke="#1E1A16"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path d="M21.5 25 L24 29 L26.5 25 Z" fill="#E9A23B" />
    </svg>
  );
}
