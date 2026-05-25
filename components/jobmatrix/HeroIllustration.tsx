/** Flat / soft-isometric hero art: profile card, handshake, cap, leaves */
export function HeroIllustration() {
  return (
    <div
      className="relative mx-auto w-full max-w-[min(100%,420px)] select-none lg:max-w-[480px]"
      aria-hidden
    >
      <svg
        viewBox="0 0 480 400"
        className="h-auto w-full text-slate-900"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="heroSky" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#EFF6FF" />
            <stop offset="100%" stopColor="#FFFFFF" />
          </linearGradient>
          <linearGradient id="heroCardBlue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#2563EB" />
          </linearGradient>
          <linearGradient id="heroDress" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#60A5FA" />
            <stop offset="100%" stopColor="#3B82F6" />
          </linearGradient>
          <filter id="heroSoftShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="12" stdDeviation="16" floodOpacity="0.12" />
          </filter>
        </defs>

        <rect width="480" height="400" fill="url(#heroSky)" />

        {/* Decorative leaves */}
        <g opacity="0.55" fill="#93C5FD">
          <path d="M48 120c28-32 72-28 88 8s-8 64-44 72-68-20-44-80Z" />
          <path d="M400 60c-24-36-76-32-96 4s12 72 52 76 56-40 44-80Z" />
          <ellipse cx="420" cy="300" rx="36" ry="18" transform="rotate(-25 420 300)" />
        </g>

        {/* Ground */}
        <ellipse cx="240" cy="348" rx="168" ry="14" fill="#CBD5E1" opacity="0.35" />

        {/* Large profile / resume card (tilted) */}
        <g filter="url(#heroSoftShadow)" transform="translate(118 36) rotate(-6 122 160)">
          <rect
            x="0"
            y="0"
            width="244"
            height="300"
            rx="22"
            fill="white"
            stroke="#E2E8F0"
            strokeWidth="2"
          />
          <rect x="0" y="0" width="244" height="72" rx="22" fill="url(#heroCardBlue)" />
          <rect x="0" y="52" width="244" height="22" fill="url(#heroCardBlue)" />
          <circle cx="122" cy="130" r="36" fill="#DBEAFE" stroke="#BFDBFE" strokeWidth="2" />
          <circle cx="122" cy="124" r="18" fill="#64748B" />
          <rect x="52" y="186" width="140" height="10" rx="5" fill="#E2E8F0" />
          <rect x="52" y="204" width="100" height="8" rx="4" fill="#F1F5F9" />
          <rect x="52" y="222" width="120" height="8" rx="4" fill="#F1F5F9" />
          <rect x="32" y="246" width="180" height="44" rx="10" fill="#F8FAFC" stroke="#E2E8F0" />
          <rect x="48" y="260" width="72" height="8" rx="4" fill="#BFDBFE" />
          <rect x="48" y="274" width="120" height="6" rx="3" fill="#E2E8F0" />
        </g>

        {/* Graduation cap */}
        <g transform="translate(72 44)">
          <path d="M0 18 40 0 80 18 40 36Z" fill="#1E293B" />
          <rect x="-4" y="18" width="88" height="10" rx="2" fill="#334155" />
          <ellipse cx="40" cy="40" rx="34" ry="8" fill="#0F172A" opacity="0.25" />
        </g>

        {/* Woman (right, blue dress) — slightly behind handshake */}
        <g transform="translate(298 168)">
          <ellipse cx="28" cy="118" rx="36" ry="10" fill="#CBD5E1" opacity="0.4" />
          <path
            d="M28 28c-12 0-22 10-22 22v6c0 8 6 14 14 14h16c8 0 14-6 14-14v-6c0-12-10-22-22-22Z"
            fill="#FECDD3"
          />
          <path d="M8 118 28 52l20 66-14 4-12-40-12 40Z" fill="url(#heroDress)" />
          <path d="M28 52 48 118 34 122 28 88 22 122 8 118Z" fill="#2563EB" />
          {/* arm toward center */}
          <path
            d="M8 70 Q-4 88 18 102"
            fill="none"
            stroke="#FECDD3"
            strokeWidth="10"
            strokeLinecap="round"
          />
        </g>

        {/* Man (left, suit) */}
        <g transform="translate(108 172)">
          <ellipse cx="52" cy="114" rx="38" ry="10" fill="#CBD5E1" opacity="0.4" />
          <circle cx="52" cy="36" r="20" fill="#FECDD3" />
          <path d="M22 118 52 58l30 60H22Z" fill="#1E293B" />
          <path d="M52 58 82 118 68 122 52 82 36 122 22 118Z" fill="#0F172A" />
          <path
            d="M96 72 Q110 90 88 100"
            fill="none"
            stroke="#FECDD3"
            strokeWidth="10"
            strokeLinecap="round"
          />
        </g>

        {/* Handshake focal */}
        <g transform="translate(232 228)">
          <ellipse cx="8" cy="4" rx="22" ry="14" fill="#FDE68A" opacity="0.35" />
          <path
            d="M-8 8c8-12 24-14 32-2s8 20-4 26-20-4-28-24Z"
            fill="#FECDD3"
            stroke="#FBBF24"
            strokeWidth="1"
            opacity="0.9"
          />
          <path
            d="M24 8c-8-12-24-14-32-2s-8 20 4 26 20-4 28-24Z"
            fill="#FECDD3"
            stroke="#FBBF24"
            strokeWidth="1"
            opacity="0.9"
          />
        </g>

        {/* Small accent — “hired” sparkle */}
        <g transform="translate(380 200)" fill="#3B82F6" opacity="0.9">
          <circle cx="0" cy="0" r="4" />
          <circle cx="16" cy="-8" r="3" />
          <circle cx="8" cy="12" r="2.5" />
        </g>
      </svg>
    </div>
  );
}
