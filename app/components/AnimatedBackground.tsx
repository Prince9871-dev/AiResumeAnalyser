import React from 'react';
import { motion } from 'framer-motion';

const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10 bg-[#020202]">
      {/* Dynamic Base Gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(10,10,20,1)_0%,rgba(2,2,2,1)_100%)]" />

      {/* Primary Aurora Orb */}
      <motion.div
        className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full mix-blend-screen opacity-40 blur-[120px]"
        style={{
          background: 'radial-gradient(circle, rgba(99,102,241,0.8) 0%, rgba(99,102,241,0) 70%)',
        }}
        animate={{
          x: ['0%', '20%', '-10%', '0%'],
          y: ['0%', '10%', '30%', '0%'],
          scale: [1, 1.2, 0.9, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* Secondary Aurora Orb */}
      <motion.div
        className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] rounded-full mix-blend-screen opacity-30 blur-[150px]"
        style={{
          background: 'radial-gradient(circle, rgba(168,85,247,0.8) 0%, rgba(168,85,247,0) 70%)',
        }}
        animate={{
          x: ['0%', '-20%', '10%', '0%'],
          y: ['0%', '-30%', '-10%', '0%'],
          scale: [1, 1.1, 0.8, 1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* Tertiary Accent Orb */}
      <motion.div
        className="absolute top-[20%] right-[10%] w-[40vw] h-[40vw] rounded-full mix-blend-screen opacity-20 blur-[100px]"
        style={{
          background: 'radial-gradient(circle, rgba(56,189,248,0.8) 0%, rgba(56,189,248,0) 70%)',
        }}
        animate={{
          x: ['0%', '-10%', '20%', '0%'],
          y: ['0%', '20%', '-10%', '0%'],
          scale: [1, 0.9, 1.1, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* Central Base Glow for readability */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-indigo-500/5 rounded-full blur-[150px] pointer-events-none" />

      {/* Premium Grain Texture */}
      <div 
        className="absolute inset-0 opacity-[0.04] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Top Edge Highlight / Spotlight */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[40%] h-[200px] bg-gradient-to-b from-white/[0.03] to-transparent pointer-events-none blur-xl" />
    </div>
  );
};

export default AnimatedBackground;
