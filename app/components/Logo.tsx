import React from 'react';

const Logo = ({ className = "w-8 h-8" }: { className?: string }) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-[0_0_15px_rgba(99,102,241,0.5)]"
      >
        <defs>
          <linearGradient id="logoGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#818cf8" />
            <stop offset="100%" stopColor="#c084fc" />
          </linearGradient>
          <linearGradient id="logoGradient2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Outer orbital rings */}
        <circle cx="50" cy="50" r="40" stroke="url(#logoGradient1)" strokeWidth="4" strokeDasharray="60 30" strokeLinecap="round" opacity="0.8" className="origin-center animate-[spin_8s_linear_infinite]" />
        <circle cx="50" cy="50" r="30" stroke="url(#logoGradient2)" strokeWidth="3" strokeDasharray="40 20" strokeLinecap="round" opacity="0.6" className="origin-center animate-[spin_6s_linear_infinite_reverse]" />
        
        {/* Inner lens/eye element */}
        <path
          d="M 25 50 Q 50 20 75 50 Q 50 80 25 50 Z"
          fill="url(#logoGradient1)"
          opacity="0.2"
        />
        <path
          d="M 25 50 Q 50 20 75 50 Q 50 80 25 50 Z"
          stroke="url(#logoGradient1)"
          strokeWidth="3"
        />
        
        {/* Core spark */}
        <circle cx="50" cy="50" r="8" fill="#ffffff" filter="url(#glow)" />
        <circle cx="50" cy="50" r="4" fill="#a5b4fc" />
      </svg>
    </div>
  );
};

export default Logo;
