interface WaveDividerProps {
  topColor?: string;
  bottomColor?: string;
  flip?: boolean;
  className?: string;
}

export default function WaveDivider({ topColor = 'hsl(var(--background))', bottomColor = 'hsl(var(--warm))', flip = false, className = '' }: WaveDividerProps) {
  return (
    <div
      className={`w-full leading-[0] overflow-hidden ${flip ? 'rotate-180' : ''} ${className}`}
      aria-hidden="true"
      style={{ marginTop: '-1px', marginBottom: '-1px' }}
    >
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className="w-full h-[60px] sm:h-[80px] lg:h-[100px] block"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="1440" height="120" fill={topColor} />
        <path
          d="M0,40 C240,100 480,0 720,60 C960,120 1200,20 1440,80 L1440,120 L0,120 Z"
          fill={bottomColor}
        />
      </svg>
    </div>
  );
}
