export default function StepClock() {
  return (
    <svg aria-hidden="true" width="230" height="160" viewBox="0 0 230 160">
      <ellipse cx="115" cy="150" rx="80" ry="7" fill="#E8DFD1" />
      <g stroke="#5A524A" strokeWidth="2" strokeLinecap="round">
        <circle cx="88" cy="80" r="52" fill="#FFFDF8" />
        <path d="M88 34 v6 M88 120 v6 M42 80 h6 M128 80 h6" fill="none" />
        <path d="M88 28 A 52 52 0 0 1 133 54" fill="none" stroke="#C8553D" strokeWidth="7" />
        <circle cx="88" cy="80" r="4" fill="#5A524A" />
      </g>
      <line className="a-spin" x1="88" y1="80" x2="88" y2="46" stroke="#1E1A16" strokeWidth="3" strokeLinecap="round" />
      <g className="a-bob">
        <circle cx="172" cy="104" r="22" fill="#C8553D" />
        <ellipse cx="172" cy="112" rx="12" ry="10" fill="#F1E3C8" />
        <circle cx="165" cy="98" r="5.5" fill="none" stroke="#1E1A16" strokeWidth="1.4" />
        <circle cx="179" cy="98" r="5.5" fill="none" stroke="#1E1A16" strokeWidth="1.4" />
        <circle cx="165" cy="98" r="2.6" fill="#1E1A16" />
        <circle cx="179" cy="98" r="2.6" fill="#1E1A16" />
        <path d="M169 104 L172 109 L175 104 Z" fill="#E9A23B" />
        <path d="M150 108 C 140 104, 134 100, 134 96 C 140 96, 146 100, 152 102 Z" fill="#A8432D" />
      </g>
    </svg>
  );
}
