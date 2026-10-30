import React from 'react';

/**
 * Custom WorkWay Vector SVG Logo Symbol
 */
export function WorkWaySvgLogo({ width = 40, height = 40, className = "" }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 512 512"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect width="512" height="512" rx="112" fill="url(#workway-bg-grad)" />
      <rect width="512" height="512" rx="112" fill="url(#grid-pattern)" opacity="0.05" />
      <g filter="url(#drop-shadow)">
        <circle cx="256" cy="148" r="32" fill="url(#cyan-accent)" />
        <path
          d="M 130 200 C 130 200, 175 330, 200 380 C 210 400, 230 400, 240 370 L 256 320 L 272 370 C 282 400, 302 400, 312 380 C 337 330, 382 200, 382 200 C 382 200, 342 200, 325 250 L 290 340 L 268 280 C 262 265, 250 265, 244 280 L 222 340 L 187 250 C 170 200, 130 200, 130 200 Z"
          fill="url(#workway-brand-grad)"
        />
        <circle cx="360" cy="180" r="14" fill="#10B981" stroke="#0F172A" strokeWidth="4" />
      </g>
      <defs>
        <linearGradient id="workway-bg-grad" x1="0" y1="0" x2="512" y2="512" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0F172A" />
          <stop offset="100%" stopColor="#1E3A8A" />
        </linearGradient>
        <linearGradient id="workway-brand-grad" x1="130" y1="200" x2="382" y2="400" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#38BDF8" />
          <stop offset="50%" stopColor="#2563EB" />
          <stop offset="100%" stopColor="#1D4ED8" />
        </linearGradient>
        <linearGradient id="cyan-accent" x1="224" y1="116" x2="288" y2="180" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#38BDF8" />
          <stop offset="100%" stopColor="#60A5FA" />
        </linearGradient>
        <pattern id="grid-pattern" width="32" height="32" patternUnits="userSpaceOnUse">
          <path d="M 32 0 L 0 0 0 32" fill="none" stroke="#FFFFFF" strokeWidth="1" />
        </pattern>
        <filter id="drop-shadow" x="100" y="100" width="312" height="330" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feDropShadow dx="0" dy="12" stdDeviation="16" floodColor="#000000" floodOpacity="0.4" />
        </filter>
      </defs>
    </svg>
  );
}

export function WorkWayLogo({ 
  variant = 'full', // 'icon', 'full', 'compact', 'glow'
  size = 'md',      // 'sm', 'md', 'lg', 'xl'
  showTagline = true,
  taglineText = "Your Career. Your Journey.",
  className = ""
}) {
  // Size mapping (px dimensions for custom SVG logo)
  const sizeMap = {
    sm: { px: 28, text: 'text-base', tagline: 'text-[9px]' },
    md: { px: 38, text: 'text-xl', tagline: 'text-[10px]' },
    lg: { px: 48, text: 'text-2xl', tagline: 'text-xs' },
    xl: { px: 72, text: 'text-4xl', tagline: 'text-sm' }
  };

  const currentSize = sizeMap[size] || sizeMap.md;

  const LogoIcon = () => (
    <div className="relative flex-shrink-0 group flex items-center justify-center">
      {/* Outer Glow Halo if glowing variant */}
      {variant === 'glow' && (
        <div className="absolute inset-0 rounded-2xl bg-blue-500/30 blur-xl group-hover:bg-cyan-500/50 transition-all duration-500" />
      )}
      
      <div className="transition-transform duration-300 group-hover:scale-105 drop-shadow-md">
        <WorkWaySvgLogo width={currentSize.px} height={currentSize.px} />
      </div>
    </div>
  );

  if (variant === 'icon') {
    return <LogoIcon />;
  }

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <LogoIcon />
      
      <div className="flex flex-col justify-center">
        <div className="flex items-center space-x-1">
          <span className={`font-heading ${currentSize.text} font-black tracking-[0.12em] text-slate-900 dark:text-white uppercase leading-none`}>
            WORKWAY
          </span>
        </div>
        
        {showTagline && (
          <span className={`font-semibold tracking-wider text-sky-600 dark:text-sky-400 uppercase mt-0.5 leading-none ${currentSize.tagline}`}>
            {taglineText}
          </span>
        )}
      </div>
    </div>
  );
}
