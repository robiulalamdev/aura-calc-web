import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Home, Calendar, Sliders, Lock, TrendingUp, ArrowLeft } from 'lucide-react';

interface MortgageCalculatorProps {
  onBack: () => void;
}

export default function MortgageCalculator({ onBack }: MortgageCalculatorProps) {
  const [homeValue, setHomeValue] = useState(550000);
  const [downPayment, setDownPayment] = useState(110000);
  const [interestRate, setInterestRate] = useState(6.45);
  const [loanTerm, setLoanTerm] = useState(30);

  const calculateMonthlyPayment = () => {
    const principal = homeValue - downPayment;
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;
    
    if (monthlyRate === 0) return principal / numberOfPayments;
    
    const x = Math.pow(1 + monthlyRate, numberOfPayments);
    const monthly = (principal * x * monthlyRate) / (x - 1);
    return monthly;
  };

  const monthlyPayment = calculateMonthlyPayment();
  const principalPercent = 65; // Simplified for UI breakdown
  const interestPercent = 25;
  const taxesPercent = 10;

  return (
    <div className="px-4 md:px-8 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 pb-12">
      {/* Hero Section */}
      <section className="lg:col-span-7 flex flex-col gap-6">
        <header>
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors mb-4"
          >
            <ArrowLeft size={16} />
            <span className="text-xs font-label uppercase tracking-widest">Back to Library</span>
          </button>
          <span className="text-primary font-headline font-bold text-xs tracking-[0.3em] uppercase mb-2 block">
            Mortgage Instrument 0.4
          </span>
          <h1 className="text-4xl md:text-5xl font-headline font-extrabold text-on-surface tracking-tight leading-tight">
            Real-time <br /><span className="text-primary">Projection.</span>
          </h1>
        </header>

        {/* Main Display Card */}
        <div className="prismatic-glass rounded-[2.5rem] p-8 relative overflow-hidden group border border-white/5">
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-primary/5 blur-[100px] rounded-full" />
          <div className="relative z-10">
            <p className="text-on-surface-variant font-label text-sm uppercase tracking-widest mb-4">
              Estimated Monthly Payment
            </p>
            <div className="flex items-baseline gap-2">
              <span className="text-6xl md:text-8xl font-headline font-black bg-gradient-to-br from-on-surface to-primary bg-clip-text text-transparent tracking-tighter">
                ${Math.floor(monthlyPayment).toLocaleString()}
              </span>
              <span className="text-2xl font-headline font-bold text-primary">
                .{(monthlyPayment % 1).toFixed(2).split('.')[1]}
              </span>
            </div>

            {/* Progress Breakdown */}
            <div className="mt-10 space-y-4">
              <div className="flex justify-between items-end text-xs font-label uppercase tracking-tighter">
                <span className="text-on-surface-variant">Payment Composition</span>
                <span className="text-primary">Healthy Ratio</span>
              </div>
              <div className="h-3 w-full bg-surface-container-lowest rounded-full overflow-hidden flex">
                <div className="h-full bg-gradient-to-r from-primary to-on-primary-container" style={{ width: '65%' }} />
                <div className="h-full bg-secondary/40" style={{ width: '25%' }} />
                <div className="h-full bg-surface-container-highest" style={{ width: '10%' }} />
              </div>
              <div className="flex gap-4 text-[10px] font-label uppercase tracking-widest">
                <div className="flex items-center gap-1.5 text-primary">
                  <div className="w-2 h-2 rounded-full bg-primary" /> Principal
                </div>
                <div className="flex items-center gap-1.5 text-secondary">
                  <div className="w-2 h-2 rounded-full bg-secondary" /> Interest
                </div>
                <div className="flex items-center gap-1.5 text-on-surface-variant">
                  <div className="w-2 h-2 rounded-full bg-surface-container-highest" /> Taxes
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bento Info Row */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-surface-container-low rounded-3xl p-6 flex flex-col justify-between aspect-video lg:aspect-auto border border-white/5">
            <Home size={24} className="text-secondary" />
            <div>
              <p className="text-on-surface-variant text-[10px] uppercase tracking-widest mb-1">Total Loan Amount</p>
              <p className="text-xl font-headline font-bold">${(homeValue - downPayment).toLocaleString()}</p>
            </div>
          </div>
          <div className="bg-surface-container-low rounded-3xl p-6 flex flex-col justify-between border border-white/5">
            <Calendar size={24} className="text-tertiary" />
            <div>
              <p className="text-on-surface-variant text-[10px] uppercase tracking-widest mb-1">Loan Duration</p>
              <p className="text-xl font-headline font-bold">{loanTerm} Years</p>
            </div>
          </div>
        </div>
      </section>

      {/* Configuration Tray */}
      <section className="lg:col-span-5">
        <div className="bg-surface-container-high rounded-[2.5rem] p-8 border border-white/[0.03] shadow-2xl space-y-10 sticky top-24">
          <h3 className="text-lg font-headline font-bold text-on-surface flex items-center gap-2">
            <Sliders size={20} className="text-primary" />
            Configuration
          </h3>

          {/* Home Value Slider */}
          <div className="space-y-4">
            <div className="flex justify-between items-baseline">
              <label className="text-xs font-label uppercase tracking-widest text-on-surface-variant">Home Value</label>
              <span className="text-xl font-headline font-bold text-primary">${homeValue.toLocaleString()}</span>
            </div>
            <input 
              type="range" 
              min="100000" 
              max="2000000" 
              step="5000"
              value={homeValue}
              onChange={(e) => setHomeValue(Number(e.target.value))}
              className="w-full h-1.5 bg-surface-container-lowest rounded-lg appearance-none cursor-pointer accent-primary"
            />
            <div className="flex justify-between text-[10px] text-on-surface-variant/40 font-label">
              <span>$100K</span>
              <span>$2M</span>
            </div>
          </div>

          {/* Down Payment Slider */}
          <div className="space-y-4">
            <div className="flex justify-between items-baseline">
              <label className="text-xs font-label uppercase tracking-widest text-on-surface-variant">Down Payment</label>
              <div className="text-right">
                <span className="text-xl font-headline font-bold text-on-surface">${downPayment.toLocaleString()}</span>
                <span className="block text-[10px] text-primary/80 font-label">
                  {Math.round((downPayment / homeValue) * 100)}% OF TOTAL
                </span>
              </div>
            </div>
            <input 
              type="range" 
              min="0" 
              max={homeValue * 0.5} 
              step="1000"
              value={downPayment}
              onChange={(e) => setDownPayment(Number(e.target.value))}
              className="w-full h-1.5 bg-surface-container-lowest rounded-lg appearance-none cursor-pointer accent-primary"
            />
          </div>

          {/* Interest Rate Slider */}
          <div className="space-y-4">
            <div className="flex justify-between items-baseline">
              <label className="text-xs font-label uppercase tracking-widest text-on-surface-variant">Interest Rate</label>
              <span className="text-xl font-headline font-bold text-on-surface">{interestRate}%</span>
            </div>
            <input 
              type="range" 
              min="0.1" 
              max="15" 
              step="0.01"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full h-1.5 bg-surface-container-lowest rounded-lg appearance-none cursor-pointer accent-primary"
            />
          </div>

          {/* Action Button */}
          <button className="w-full py-4 rounded-2xl action-btn text-on-primary font-headline font-bold text-sm tracking-widest uppercase flex items-center justify-center gap-2 transition-transform active:scale-[0.98]">
            Lock Scenarios
            <Lock size={16} />
          </button>

          {/* Market Insight */}
          <div className="pt-6 border-t border-white/5">
            <div className="bg-surface-container-lowest rounded-2xl p-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-surface-container-highest flex items-center justify-center">
                <TrendingUp size={24} className="text-secondary" />
              </div>
              <div>
                <p className="text-xs font-bold text-on-surface">Market Insight</p>
                <p className="text-[10px] text-on-surface-variant leading-tight">Rates are 0.2% lower than last week.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
