import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { DollarSign, ArrowLeft, RefreshCcw, TrendingUp } from 'lucide-react';

interface CurrencyConverterProps {
  onBack: () => void;
}

const mockRates: Record<string, number> = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  JPY: 151.62,
  CAD: 1.36,
  AUD: 1.53,
  BTC: 0.000015,
};

export default function CurrencyConverter({ onBack }: CurrencyConverterProps) {
  const [amount, setAmount] = useState('100');
  const [from, setFrom] = useState('USD');
  const [to, setTo] = useState('EUR');
  const [result, setResult] = useState('92.00');

  useEffect(() => {
    const val = parseFloat(amount);
    if (isNaN(val)) {
      setResult('0.00');
      return;
    }
    const rate = mockRates[to] / mockRates[from];
    setResult((val * rate).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
  }, [amount, from, to]);

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
          Currency <span className="text-primary">Exchange</span>
        </h2>
        <p className="text-on-surface-variant text-sm opacity-60">Real-time forex translation engine</p>
      </header>

      <div className="bg-surface-container-high rounded-[2.5rem] p-8 border border-white/5 shadow-2xl space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* From */}
          <div className="space-y-4">
            <label className="text-[10px] font-bold text-on-surface-variant/40 uppercase tracking-[0.3em]">From</label>
            <div className="flex gap-4">
              <input 
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="flex-grow bg-surface-container-lowest border-none rounded-2xl p-6 text-2xl font-headline font-bold text-on-surface focus:ring-2 focus:ring-primary"
              />
              <select 
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                className="bg-surface-container-lowest border-none rounded-2xl px-6 text-sm font-bold text-primary focus:ring-2 focus:ring-primary"
              >
                {Object.keys(mockRates).map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>

          {/* To */}
          <div className="space-y-4">
            <label className="text-[10px] font-bold text-on-surface-variant/40 uppercase tracking-[0.3em]">To</label>
            <div className="flex gap-4">
              <div className="flex-grow bg-surface-container-lowest rounded-2xl p-6 text-2xl font-headline font-bold text-on-surface flex items-center">
                {result}
              </div>
              <select 
                value={to}
                onChange={(e) => setTo(e.target.value)}
                className="bg-surface-container-lowest border-none rounded-2xl px-6 text-sm font-bold text-primary focus:ring-2 focus:ring-primary"
              >
                {Object.keys(mockRates).map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <button 
            onClick={() => {
              const temp = from;
              setFrom(to);
              setTo(temp);
            }}
            className="p-4 rounded-full bg-surface-container-highest text-primary hover:scale-110 transition-transform"
          >
            <RefreshCcw size={24} />
          </button>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: 'Market Volatility', value: 'Low', icon: TrendingUp, color: 'text-primary' },
          { label: 'Last Update', value: '1 min ago', icon: RefreshCcw, color: 'text-secondary' },
          { label: 'Data Source', value: 'Forex API', icon: DollarSign, color: 'text-tertiary' },
        ].map((item, i) => (
          <div key={i} className="bg-surface-container-low p-6 rounded-3xl border border-white/5 flex items-center gap-4">
            <div className={`p-3 rounded-2xl bg-surface-container-high ${item.color}`}>
              <item.icon size={20} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-on-surface-variant/40 uppercase tracking-widest">{item.label}</p>
              <p className="text-sm font-bold text-on-surface">{item.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
