import React from 'react';

// Product Image Components rendered with crisp vector details matching the reference

export const ProductAvatar = ({ className = "w-8 h-8" }) => (
  <div className={`relative rounded-full overflow-hidden border-2 border-emerald-500/20 bg-slate-100 flex-shrink-0 ${className}`}>
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <defs>
        <linearGradient id="avatarSkin" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fcd34d" />
          <stop offset="100%" stopColor="#f59e0b" />
        </linearGradient>
        <linearGradient id="avatarShirt" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1e293b" />
          <stop offset="100%" stopColor="#0f172a" />
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="48" fill="#e2e8f0" />
      {/* Head & neck */}
      <circle cx="50" cy="42" r="22" fill="#fed7aa" />
      {/* Beard & hair */}
      <path d="M30 36 C30 20 70 20 70 36 C70 42 66 40 64 36 C55 30 45 30 36 36 Z" fill="#334155" />
      <path d="M34 44 C34 58 66 58 66 44 C66 52 50 58 34 44 Z" fill="#334155" />
      {/* Eyes */}
      <circle cx="43" cy="40" r="2.5" fill="#1e293b" />
      <circle cx="57" cy="40" r="2.5" fill="#1e293b" />
      {/* Smile */}
      <path d="M46 48 Q50 51 54 48" stroke="#1e293b" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* Shirt */}
      <path d="M20 90 C22 66 78 66 80 90 Z" fill="url(#avatarShirt)" />
      <polygon points="50,68 44,78 56,78" fill="#ffffff" />
    </svg>
  </div>
);

export const IPhone15Image = ({ className = "w-full h-full" }) => (
  <svg viewBox="0 0 200 240" className={className} fill="none">
    <defs>
      <linearGradient id="phoneBody" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#e0f2fe" />
        <stop offset="50%" stopColor="#bae6fd" />
        <stop offset="100%" stopColor="#7dd3fc" />
      </linearGradient>
      <linearGradient id="screenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#0369a1" />
        <stop offset="50%" stopColor="#38bdf8" />
        <stop offset="100%" stopColor="#0284c7" />
      </linearGradient>
      <filter id="shadowPhone" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="2" dy="8" stdDeviation="8" floodColor="#0f172a" floodOpacity="0.12" />
      </filter>
    </defs>
    {/* Phone Body with Rounded Corners */}
    <rect x="52" y="20" width="96" height="195" rx="22" fill="url(#phoneBody)" stroke="#38bdf8" strokeWidth="2.5" filter="url(#shadowPhone)" />
    {/* Bezel / Screen */}
    <rect x="57" y="25" width="86" height="185" rx="18" fill="#0f172a" />
    {/* Screen Wallpaper */}
    <rect x="59" y="27" width="82" height="181" rx="16" fill="url(#screenGrad)" />
    {/* Dynamic Island */}
    <rect x="86" y="32" width="28" height="8" rx="4" fill="#000000" />
    {/* Dual Camera Module (Apple style) */}
    <g transform="translate(62, 32)">
      <rect x="0" y="0" width="34" height="34" rx="10" fill="rgba(255,255,255,0.4)" stroke="#e0f2fe" strokeWidth="1" />
      <circle cx="11" cy="11" r="7" fill="#0284c7" stroke="#ffffff" strokeWidth="1.5" />
      <circle cx="23" cy="23" r="7" fill="#0284c7" stroke="#ffffff" strokeWidth="1.5" />
      <circle cx="11" cy="11" r="3.5" fill="#082f49" />
      <circle cx="23" cy="23" r="3.5" fill="#082f49" />
      <circle cx="23" cy="10" r="2.5" fill="#fef08a" />
    </g>
    {/* Screen UI accents */}
    <circle cx="100" cy="115" r="24" fill="rgba(255,255,255,0.18)" />
    <path d="M75 160 Q100 145 125 160" stroke="rgba(255,255,255,0.4)" strokeWidth="2" fill="none" />
    <rect x="88" y="198" width="24" height="3" rx="1.5" fill="#ffffff" opacity="0.8" />
  </svg>
);

export const MacBookImage = ({ className = "w-full h-full" }) => (
  <svg viewBox="0 0 240 200" className={className} fill="none">
    <defs>
      <linearGradient id="macScreen" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#1e1b4b" />
        <stop offset="50%" stopColor="#312e81" />
        <stop offset="100%" stopColor="#4338ca" />
      </linearGradient>
      <linearGradient id="macMetal" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#334155" />
        <stop offset="100%" stopColor="#1e293b" />
      </linearGradient>
    </defs>
    {/* Display Lid */}
    <rect x="42" y="30" width="156" height="106" rx="8" fill="#0f172a" stroke="#475569" strokeWidth="1.5" />
    <rect x="47" y="35" width="146" height="96" rx="4" fill="url(#macScreen)" />
    {/* Notch */}
    <rect x="114" y="35" width="12" height="4" rx="2" fill="#0f172a" />
    {/* Wallpaper graphic */}
    <path d="M60 120 Q120 60 180 110" stroke="#818cf8" strokeWidth="4" fill="none" opacity="0.8" />
    <path d="M70 125 Q130 75 175 125" stroke="#c084fc" strokeWidth="3" fill="none" opacity="0.6" />
    {/* Base Keyboard Deck */}
    <path d="M25 136 L215 136 L226 150 C227 152 225 154 223 154 L17 154 C15 154 13 152 14 150 Z" fill="url(#macMetal)" stroke="#64748b" strokeWidth="1" />
    {/* Trackpad notch */}
    <rect x="105" y="146" width="30" height="3" rx="1.5" fill="#64748b" />
    {/* Shadow */}
    <ellipse cx="120" cy="162" rx="90" ry="8" fill="#0f172a" opacity="0.15" />
  </svg>
);

export const TVImage = ({ className = "w-full h-full" }) => (
  <svg viewBox="0 0 240 200" className={className} fill="none">
    <defs>
      <linearGradient id="tvDisplay" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#082f49" />
        <stop offset="35%" stopColor="#0284c7" />
        <stop offset="70%" stopColor="#f43f5e" />
        <stop offset="100%" stopColor="#fbbf24" />
      </linearGradient>
    </defs>
    {/* TV Panel */}
    <rect x="25" y="32" width="190" height="114" rx="4" fill="#020617" stroke="#334155" strokeWidth="2.5" />
    <rect x="29" y="36" width="182" height="106" rx="2" fill="url(#tvDisplay)" />
    {/* Graphic inside TV (QLED vibrant waves) */}
    <path d="M30 110 Q90 60 140 100 T210 80" stroke="#ffffff" strokeWidth="3" fill="none" opacity="0.7" />
    <path d="M40 130 Q100 80 160 120 T210 105" stroke="#38bdf8" strokeWidth="4" fill="none" opacity="0.8" />
    <text x="36" y="55" fill="#ffffff" fontSize="8" fontWeight="bold" opacity="0.85">SAMSUNG QLED 4K</text>
    {/* Stand */}
    <path d="M96 146 L100 165 L80 172" stroke="#64748b" strokeWidth="3" strokeLinecap="round" />
    <path d="M144 146 L140 165 L160 172" stroke="#64748b" strokeWidth="3" strokeLinecap="round" />
    {/* TV base shadow */}
    <ellipse cx="120" cy="176" rx="75" ry="6" fill="#0f172a" opacity="0.12" />
  </svg>
);

export const HeadphonesImage = ({ className = "w-full h-full" }) => (
  <svg viewBox="0 0 200 220" className={className} fill="none">
    <defs>
      <linearGradient id="metalSilver" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#475569" />
        <stop offset="100%" stopColor="#1e293b" />
      </linearGradient>
    </defs>
    {/* Headband arch */}
    <path d="M45 105 C45 40 155 40 155 105" stroke="#0f172a" strokeWidth="12" strokeLinecap="round" />
    <path d="M55 95 C55 52 145 52 145 95" stroke="#334155" strokeWidth="5" strokeLinecap="round" />
    {/* Sliders */}
    <rect x="40" y="98" width="10" height="20" rx="3" fill="#64748b" />
    <rect x="150" y="98" width="10" height="20" rx="3" fill="#64748b" />
    {/* Earcups */}
    <g transform="translate(30, 105)">
      <rect x="0" y="0" width="30" height="60" rx="14" fill="#1e293b" stroke="#334155" strokeWidth="2" />
      <rect x="18" y="5" width="12" height="50" rx="6" fill="#020617" />
    </g>
    <g transform="translate(140, 105)">
      <rect x="0" y="0" width="30" height="60" rx="14" fill="#1e293b" stroke="#334155" strokeWidth="2" />
      <rect x="0" y="5" width="12" height="50" rx="6" fill="#020617" />
    </g>
    <ellipse cx="100" cy="178" rx="65" ry="8" fill="#0f172a" opacity="0.12" />
  </svg>
);

export const WashingMachineImage = ({ className = "w-full h-full" }) => (
  <svg viewBox="0 0 200 220" className={className} fill="none">
    <rect x="42" y="25" width="116" height="155" rx="12" fill="#ffffff" stroke="#cbd5e1" strokeWidth="3" />
    {/* Top control panel */}
    <rect x="42" y="25" width="116" height="35" rx="10" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />
    <circle cx="62" cy="42" r="7" fill="#059669" />
    <circle cx="62" cy="42" r="3" fill="#ffffff" />
    <rect x="78" y="38" width="32" height="9" rx="2" fill="#0f172a" />
    <text x="82" y="45" fill="#34d399" fontSize="6" fontFamily="monospace">40°C 1200</text>
    <circle cx="125" cy="42" r="5" fill="#cbd5e1" />
    <circle cx="140" cy="42" r="5" fill="#cbd5e1" />
    {/* Big front glass door */}
    <circle cx="100" cy="115" r="42" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="3" />
    <circle cx="100" cy="115" r="33" fill="#38bdf8" fillOpacity="0.3" stroke="#64748b" strokeWidth="2" />
    <path d="M85 105 Q100 95 115 105 Q125 120 110 130 Q90 130 85 105 Z" fill="#bae6fd" opacity="0.6" />
    {/* Handle */}
    <path d="M136 102 C140 108 140 122 136 128" stroke="#64748b" strokeWidth="3" strokeLinecap="round" />
    {/* Base */}
    <rect x="52" y="172" width="96" height="5" rx="2" fill="#94a3b8" />
  </svg>
);

export const ClothesImage = ({ className = "w-full h-full" }) => (
  <svg viewBox="0 0 200 220" className={className} fill="none">
    {/* Hoodie / Jacket */}
    <g transform="translate(30, 25)">
      {/* Hood */}
      <path d="M50 8 C30 8 20 28 35 44 C45 32 95 32 105 44 C120 28 110 8 90 8 Z" fill="#1e3a8a" />
      {/* Body & sleeves */}
      <path d="M35 40 L5 80 L22 92 L38 68 L36 145 L104 145 L102 68 L118 92 L135 80 L105 40 Z" fill="#1e40af" stroke="#1d4ed8" strokeWidth="2" />
      {/* Zipper / Drawstrings */}
      <line x1="70" y1="42" x2="70" y2="145" stroke="#93c5fd" strokeWidth="2" />
      <path d="M62 42 C62 60 60 75 60 75" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
      <path d="M78 42 C78 60 80 75 80 75" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
      {/* Pocket */}
      <rect x="50" y="105" width="40" height="25" rx="5" fill="#1d4ed8" opacity="0.8" />
    </g>
    <ellipse cx="100" cy="180" rx="60" ry="7" fill="#0f172a" opacity="0.12" />
  </svg>
);

export const EarbudsImage = ({ className = "w-full h-full" }) => (
  <svg viewBox="0 0 200 220" className={className} fill="none">
    {/* White modern wireless earbuds case & pods */}
    <rect x="55" y="65" width="90" height="70" rx="26" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
    <line x1="55" y1="92" x2="145" y2="92" stroke="#e2e8f0" strokeWidth="1.5" />
    <circle cx="100" cy="105" r="2.5" fill="#10b981" />
    {/* One earbud outside */}
    <g transform="translate(62, 28) rotate(-15)">
      <ellipse cx="20" cy="18" rx="12" ry="10" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />
      <rect x="17" y="24" width="6" height="24" rx="3" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />
      <circle cx="20" cy="16" r="3" fill="#0f172a" />
    </g>
    <ellipse cx="100" cy="155" rx="50" ry="7" fill="#0f172a" opacity="0.1" />
  </svg>
);
