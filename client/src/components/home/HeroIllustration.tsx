/**
 * A line-art perfume bottle with a soft atomizer mist — the hero's
 * decorative anchor. Built as inline SVG (no stock photography) so
 * it inherits the brand palette exactly and stays crisp at any size.
 */
export function HeroIllustration() {
  return (
    <svg
      viewBox="0 0 480 560"
      className="h-full w-full"
      role="img"
      aria-label="Illustration of a Lucid Parfums bottle"
    >
      <defs>
        <radialGradient id="mist" cx="50%" cy="30%" r="60%">
          <stop offset="0%" stopColor="#e3c9a1" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#e3c9a1" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="240" cy="180" r="220" fill="url(#mist)" />

      {/* mist droplets */}
      <g fill="#b08d57" opacity="0.5">
        <circle cx="190" cy="90" r="2.5" />
        <circle cx="220" cy="70" r="1.8" />
        <circle cx="255" cy="85" r="2.1" />
        <circle cx="205" cy="115" r="1.5" />
        <circle cx="270" cy="110" r="1.8" />
        <circle cx="240" cy="60" r="1.4" />
      </g>

      {/* cap */}
      <rect x="205" y="130" width="70" height="46" rx="6" fill="#4a3728" opacity="0.9" />
      <rect x="216" y="176" width="48" height="22" rx="3" fill="#4a3728" opacity="0.65" />

      {/* bottle body */}
      <path
        d="M172 198 h136 a16 16 0 0 1 16 16 v300 a28 28 0 0 1 -28 28 h-112 a28 28 0 0 1 -28 -28 v-300 a16 16 0 0 1 16 -16 z"
        fill="#f7f2ea"
        stroke="#4a3728"
        strokeWidth="2.5"
      />

      {/* label */}
      <rect x="196" y="330" width="88" height="88" rx="2" fill="none" stroke="#b08d57" strokeWidth="1.5" />
      <text x="240" y="368" textAnchor="middle" fontFamily="serif" fontSize="15" letterSpacing="2" fill="#4a3728">
        LUCID
      </text>
      <line x1="212" y1="380" x2="268" y2="380" stroke="#b08d57" strokeWidth="1" />
      <text x="240" y="398" textAnchor="middle" fontFamily="sans-serif" fontSize="8" letterSpacing="3" fill="#9c8b76">
        PARFUMS
      </text>

      {/* base shading */}
      <path d="M172 460 h136 v38 a28 28 0 0 1 -28 28 h-80 a28 28 0 0 1 -28 -28 z" fill="#e8dfd0" opacity="0.6" />
    </svg>
  );
}
