import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Calculator } from 'lucide-react';

interface SplashProps {
  onComplete: () => void;
  key?: React.Key;
}

export default function Splash({ onComplete }: SplashProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 30);
    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[100] bg-surface flex flex-col items-center justify-center px-6 overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-primary aurora-glow" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-secondary aurora-glow" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex flex-col items-center space-y-8 max-w-lg relative z-10"
      >
        {/* Prism Icon */}
        <div className="relative group">
          <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full" />
          <div className="relative w-32 h-32 flex items-center justify-center bg-surface-container-high/80 backdrop-blur-xl border border-white/5 rounded-[2.5rem] shadow-2xl">
            <Calculator size={64} className="text-primary" strokeWidth={1} />
          </div>
        </div>

        {/* Typography Cluster */}
        <div className="text-center space-y-2">
          <h1 className="font-headline text-5xl md:text-7xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-on-surface to-on-surface/50">
            AURA CALC
          </h1>
          <div className="inline-flex items-center space-x-3">
            <span className="h-[1px] w-8 bg-primary/30" />
            <p className="font-label text-sm uppercase tracking-[0.3em] text-primary/80 font-semibold">
              Precision Reimagined
            </p>
            <span className="h-[1px] w-8 bg-primary/30" />
          </div>
        </div>
      </motion.div>

      {/* Loading Indicator */}
      <div className="absolute bottom-24 flex flex-col items-center space-y-6 w-full max-w-xs">
        <div className="w-full h-[2px] bg-white/5 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-gradient-to-r from-transparent via-primary to-transparent"
            style={{ width: `${progress}%` }}
            animate={{ x: [-100, 100] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
        <span className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant/40">
          Initializing Engine
        </span>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center space-x-12 opacity-20">
        {['Advanced', 'Realtime', 'Neural'].map((label) => (
          <div key={label} className="flex flex-col items-center">
            <div className="w-1 h-1 rounded-full bg-on-surface mb-1" />
            <span className="text-[8px] font-label uppercase tracking-tighter">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
