import React from 'react';
import { motion } from 'motion/react';
import { Leaf, DollarSign, Scale, Home, Utensils, TrendingUp, Ruler, ChevronRight, Cloud } from 'lucide-react';

const templates = [
  { id: 'carbon', title: 'Carbon Footprint', description: 'Advanced ecological impact analysis. Calculate your carbon offset requirements.', icon: Leaf, color: 'text-primary', isNew: true, large: true },
  { id: 'currency', title: 'Currency', description: 'Real-time forex exchange rates with 140+ global currencies.', icon: DollarSign, color: 'text-secondary' },
  { id: 'bmi', title: 'Body Mass Index', description: 'Biometric assessment including BMR and body fat percentage.', icon: Scale, color: 'text-tertiary' },
  { id: 'mortgage', title: 'Mortgage', description: 'Amortization schedules and interest projection models.', icon: Home, color: 'text-primary' },
  { id: 'tip', title: 'Gratuity & Bill Split', description: 'Fast distribution for shared expenses with regional tax toggles.', icon: Utensils, color: 'text-secondary' },
  { id: 'roi', title: 'Investment ROI', description: 'Compound interest engine with inflation-adjusted growth forecasting.', icon: TrendingUp, color: 'text-tertiary' },
  { id: 'unit', title: 'Unit Converter', description: 'Comprehensive translation for engineering and everyday measurements.', icon: Ruler, color: 'text-primary' },
];

interface TemplatesProps {
  onSelect: (id: string) => void;
}

export default function Templates({ onSelect }: TemplatesProps) {
  return (
    <div className="px-6 max-w-7xl mx-auto pb-12">
      <header className="mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-highest/50 mb-4 border border-white/5">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-[10px] font-label font-bold uppercase tracking-widest text-on-surface-variant">Templates Library</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-headline font-extrabold text-on-surface leading-tight tracking-tight mb-4">
          Refractive <span className="text-primary">Calculators</span>
        </h2>
        <p className="text-on-surface-variant max-w-2xl font-body leading-relaxed opacity-80">
          Precision-engineered instrument templates for complex data translation. Submerged in logic, surfaced in clarity.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => (
          <motion.div
            key={template.id}
            whileHover={{ y: -5 }}
            onClick={() => onSelect(template.id)}
            className={`
              group relative p-8 rounded-3xl bg-surface-container-low border border-white/5 overflow-hidden cursor-pointer
              ${template.large ? 'lg:col-span-2' : ''}
              hover:bg-surface-bright transition-all duration-300
            `}
          >
            {template.large && (
              <div className="absolute top-0 right-0 p-12 -mr-12 -mt-12 bg-primary/10 rounded-full blur-3xl opacity-50 group-hover:bg-primary/20 transition-colors" />
            )}
            
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div>
                <div className={`w-14 h-14 rounded-2xl bg-surface-container-high flex items-center justify-center ${template.color} mb-6 shadow-inner`}>
                  <template.icon size={32} strokeWidth={1.5} />
                </div>
                <h3 className={`${template.large ? 'text-2xl' : 'text-lg'} font-headline font-bold mb-2`}>
                  {template.title}
                </h3>
                <p className="text-on-surface-variant text-sm max-w-md leading-relaxed">
                  {template.description}
                </p>
              </div>

              <div className="mt-8 flex items-center justify-between">
                {template.large ? (
                  <div className="flex items-center gap-4">
                    <button className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-primary to-on-primary-container text-on-primary font-bold text-sm tracking-wide shadow-lg shadow-primary/20">
                      Launch Calculator
                    </button>
                    {template.isNew && (
                      <span className="text-[10px] font-bold text-primary px-2 py-1 rounded bg-primary/10 border border-primary/20">NEW MODULE</span>
                    )}
                  </div>
                ) : (
                  <div className="w-full flex justify-end">
                    <ChevronRight size={20} className="text-on-surface-variant group-hover:text-primary transition-colors" />
                  </div>
                )}
              </div>
            </div>

            {template.large && (
              <div className="absolute bottom-4 right-8 opacity-10 pointer-events-none">
                <Cloud size={120} className="scale-150 rotate-12" />
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* System Status Footer */}
      <section className="mt-16 rounded-3xl overflow-hidden aspect-[21/9] relative group border border-white/5">
        <img 
          src="https://picsum.photos/seed/tech/1200/400" 
          alt="Calculative Geometry" 
          className="w-full h-full object-cover grayscale opacity-20 group-hover:grayscale-0 group-hover:opacity-40 transition-all duration-700"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent" />
        <div className="absolute bottom-8 left-8">
          <p className="font-headline font-bold text-2xl tracking-tighter text-white">SYSTEM READY</p>
          <p className="text-xs font-label uppercase tracking-widest text-primary">Core engine operational: v4.2.0</p>
        </div>
      </section>
    </div>
  );
}
