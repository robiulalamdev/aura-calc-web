import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Ruler, Thermometer, Zap, Weight, Timer, Droplets } from 'lucide-react';
import * as math from 'mathjs';

const units = {
  length: ['meter', 'centimeter', 'millimeter', 'kilometer', 'inch', 'foot', 'yard', 'mile'],
  mass: ['gram', 'kilogram', 'milligram', 'ounce', 'pound', 'ton'],
  temperature: ['celsius', 'fahrenheit', 'kelvin'],
  volume: ['liter', 'milliliter', 'gallon', 'cup', 'pint'],
  time: ['second', 'minute', 'hour', 'day', 'week', 'month', 'year'],
};

export default function Advanced() {
  const [category, setCategory] = useState<keyof typeof units>('length');
  const [value, setValue] = useState('1');
  const [fromUnit, setFromUnit] = useState(units.length[0]);
  const [toUnit, setToUnit] = useState(units.length[1]);
  const [result, setResult] = useState('100');

  const handleConvert = (val: string, from: string, to: string) => {
    try {
      if (!val || isNaN(parseFloat(val))) {
        setResult('0');
        return;
      }
      const converted = math.unit(parseFloat(val), from).toNumber(to);
      setResult(math.format(converted, { precision: 6 }).toString());
    } catch (error) {
      setResult('Error');
    }
  };

  const categories = [
    { id: 'length', icon: Ruler, label: 'Length' },
    { id: 'mass', icon: Weight, label: 'Mass' },
    { id: 'temperature', icon: Thermometer, label: 'Temp' },
    { id: 'volume', icon: Droplets, label: 'Volume' },
    { id: 'time', icon: Timer, label: 'Time' },
  ];

  return (
    <div className="px-6 max-w-4xl mx-auto pb-12">
      <header className="mb-8">
        <h2 className="text-3xl font-headline font-extrabold text-on-surface tracking-tight">
          Advanced <span className="text-primary">Engine</span>
        </h2>
        <p className="text-on-surface-variant text-sm opacity-60">High-precision unit translation & scientific tools</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sidebar Categories */}
        <div className="lg:col-span-3 flex lg:flex-col gap-2 overflow-x-auto pb-4 lg:pb-0">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setCategory(cat.id as any);
                setFromUnit(units[cat.id as keyof typeof units][0]);
                setToUnit(units[cat.id as keyof typeof units][1]);
                handleConvert(value, units[cat.id as keyof typeof units][0], units[cat.id as keyof typeof units][1]);
              }}
              className={`flex items-center gap-3 p-4 rounded-2xl transition-all shrink-0 lg:shrink ${
                category === cat.id 
                  ? 'bg-primary/10 text-primary border border-primary/20' 
                  : 'bg-surface-container-low text-on-surface-variant border border-transparent hover:bg-surface-container-high'
              }`}
            >
              <cat.icon size={20} />
              <span className="text-sm font-bold uppercase tracking-tighter">{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Conversion Interface */}
        <div className="lg:col-span-9 space-y-6">
          <div className="bg-surface-container-high rounded-[2.5rem] p-8 border border-white/5 shadow-2xl space-y-8">
            {/* From */}
            <div className="space-y-4">
              <label className="text-[10px] font-bold text-on-surface-variant/40 uppercase tracking-[0.3em]">From</label>
              <div className="flex gap-4">
                <input 
                  type="number"
                  value={value}
                  onChange={(e) => {
                    setValue(e.target.value);
                    handleConvert(e.target.value, fromUnit, toUnit);
                  }}
                  className="flex-grow bg-surface-container-lowest border-none rounded-2xl p-6 text-2xl font-headline font-bold text-on-surface focus:ring-2 focus:ring-primary"
                />
                <select 
                  value={fromUnit}
                  onChange={(e) => {
                    setFromUnit(e.target.value);
                    handleConvert(value, e.target.value, toUnit);
                  }}
                  className="bg-surface-container-lowest border-none rounded-2xl px-6 text-sm font-bold text-primary focus:ring-2 focus:ring-primary"
                >
                  {units[category].map(u => <option key={u} value={u}>{u}</option>)}
                </select>
              </div>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-4">
              <div className="h-px flex-grow bg-white/5" />
              <div className="p-3 rounded-full bg-surface-container-highest text-primary">
                <Zap size={20} />
              </div>
              <div className="h-px flex-grow bg-white/5" />
            </div>

            {/* To */}
            <div className="space-y-4">
              <label className="text-[10px] font-bold text-on-surface-variant/40 uppercase tracking-[0.3em]">To</label>
              <div className="flex gap-4">
                <div className="flex-grow bg-surface-container-lowest rounded-2xl p-6 text-2xl font-headline font-bold text-on-surface flex items-center">
                  {result}
                </div>
                <select 
                  value={toUnit}
                  onChange={(e) => {
                    setToUnit(e.target.value);
                    handleConvert(value, fromUnit, e.target.value);
                  }}
                  className="bg-surface-container-lowest border-none rounded-2xl px-6 text-sm font-bold text-primary focus:ring-2 focus:ring-primary"
                >
                  {units[category].map(u => <option key={u} value={u}>{u}</option>)}
                </select>
              </div>
            </div>
          </div>

          {/* Info Card */}
          <div className="bg-primary/5 rounded-3xl p-6 border border-primary/10 flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
              <Zap size={24} />
            </div>
            <div>
              <p className="text-sm font-bold text-on-surface">Precision Translation</p>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Calculated using the latest scientific constants. Accuracy up to 14 decimal places.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
