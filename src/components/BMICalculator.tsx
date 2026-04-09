import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Scale, ArrowLeft, Info } from 'lucide-react';

interface BMICalculatorProps {
  onBack: () => void;
}

export default function BMICalculator({ onBack }: BMICalculatorProps) {
  const [weight, setWeight] = useState(75);
  const [height, setHeight] = useState(175);

  const bmi = weight / Math.pow(height / 100, 2);
  
  const getStatus = (val: number) => {
    if (val < 18.5) return { label: 'Underweight', color: 'text-secondary' };
    if (val < 25) return { label: 'Healthy', color: 'text-primary' };
    if (val < 30) return { label: 'Overweight', color: 'text-tertiary' };
    return { label: 'Obese', color: 'text-red-400' };
  };

  const status = getStatus(bmi);

  return (
    <div className="px-6 max-w-4xl mx-auto pb-12">
      <header className="mb-8">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors mb-4"
        >
          <ArrowLeft size={16} />
          <span className="text-xs font-label uppercase tracking-widest">Back to Library</span>
        </button>
        <h2 className="text-3xl font-headline font-extrabold text-on-surface tracking-tight">
          Body Mass <span className="text-primary">Index</span>
        </h2>
        <p className="text-on-surface-variant text-sm opacity-60">Biometric assessment engine</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-surface-container-high rounded-[2.5rem] p-8 border border-white/5 shadow-2xl space-y-10">
          {/* Weight */}
          <div className="space-y-4">
            <div className="flex justify-between items-baseline">
              <label className="text-xs font-label uppercase tracking-widest text-on-surface-variant">Weight (kg)</label>
              <span className="text-xl font-headline font-bold text-primary">{weight} kg</span>
            </div>
            <input 
              type="range" 
              min="30" 
              max="200" 
              value={weight}
              onChange={(e) => setWeight(Number(e.target.value))}
              className="w-full h-1.5 bg-surface-container-lowest rounded-lg appearance-none cursor-pointer accent-primary"
            />
          </div>

          {/* Height */}
          <div className="space-y-4">
            <div className="flex justify-between items-baseline">
              <label className="text-xs font-label uppercase tracking-widest text-on-surface-variant">Height (cm)</label>
              <span className="text-xl font-headline font-bold text-primary">{height} cm</span>
            </div>
            <input 
              type="range" 
              min="100" 
              max="250" 
              value={height}
              onChange={(e) => setHeight(Number(e.target.value))}
              className="w-full h-1.5 bg-surface-container-lowest rounded-lg appearance-none cursor-pointer accent-primary"
            />
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="bg-surface-container-low rounded-[2.5rem] p-8 border border-white/5 flex flex-col items-center justify-center text-center">
            <p className="text-on-surface-variant font-label text-xs uppercase tracking-widest mb-2">Your BMI Score</p>
            <motion.span 
              key={bmi}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-7xl font-headline font-black text-on-surface mb-2"
            >
              {bmi.toFixed(1)}
            </motion.span>
            <p className={`text-xl font-headline font-bold uppercase tracking-widest ${status.color}`}>
              {status.label}
            </p>
          </div>

          <div className="bg-surface-container-lowest rounded-3xl p-6 border border-white/5 flex items-start gap-4">
            <div className="p-3 rounded-2xl bg-surface-container-high text-primary">
              <Info size={24} />
            </div>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              BMI is a useful measure of overweight and obesity. It is calculated from your height and weight. BMI is an estimate of body fat and a good gauge of your risk for diseases that can occur with more body fat.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
