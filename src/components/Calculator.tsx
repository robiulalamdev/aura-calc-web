import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Minus, Plus, Equal, Delete, RotateCcw, Percent, Divide } from 'lucide-react';
import * as math from 'mathjs';
import { HistoryItem } from '../types';

interface CalculatorProps {
  onAddHistory: (item: Omit<HistoryItem, 'id' | 'timestamp'>) => void;
  angleUnit: 'deg' | 'rad';
}

export default function Calculator({ onAddHistory, angleUnit }: CalculatorProps) {
  const [display, setDisplay] = useState('0');
  const [expression, setExpression] = useState('');
  const [mode, setMode] = useState<'basic' | 'scientific'>('basic');
  const [isEvaluated, setIsEvaluated] = useState(false);

  const handleNumber = (num: string) => {
    if (isEvaluated) {
      setDisplay(num);
      setIsEvaluated(false);
    } else {
      setDisplay(prev => (prev === '0' ? num : prev + num));
    }
  };

  const handleOperator = (op: string) => {
    setIsEvaluated(false);
    setExpression(prev => prev + display + ' ' + op + ' ');
    setDisplay('0');
  };

  const handleClear = () => {
    setDisplay('0');
    setExpression('');
    setIsEvaluated(false);
  };

  const handleBackspace = () => {
    if (display.length > 1) {
      setDisplay(prev => prev.slice(0, -1));
    } else {
      setDisplay('0');
    }
  };

  const handleEvaluate = () => {
    try {
      const fullExpression = expression + display;
      // Replace symbols for mathjs
      const sanitizedExpr = fullExpression
        .replace(/×/g, '*')
        .replace(/−/g, '-')
        .replace(/÷/g, '/')
        .replace(/%/g, '/100');
      
      const result = math.evaluate(sanitizedExpr);
      const formattedResult = math.format(result, { precision: 14 });
      
      onAddHistory({
        type: mode,
        title: 'Calculation',
        expression: fullExpression,
        result: formattedResult.toString(),
      });

      setDisplay(formattedResult.toString());
      setExpression('');
      setIsEvaluated(true);
    } catch (error) {
      setDisplay('Error');
      setTimeout(handleClear, 1500);
    }
  };

  const handleScientific = (func: string) => {
    try {
      const val = parseFloat(display);
      let result;
      if (angleUnit === 'deg' && ['sin', 'cos', 'tan'].includes(func)) {
        const rad = (val * Math.PI) / 180;
        result = math.evaluate(`${func}(${rad})`);
      } else {
        result = math.evaluate(`${func}(${val})`);
      }
      
      const formattedResult = math.format(result, { precision: 10 });
      setDisplay(formattedResult.toString());
      setIsEvaluated(true);
    } catch (error) {
      setDisplay('Error');
    }
  };

  const basicButtons = [
    { label: 'AC', action: handleClear, type: 'util', color: 'text-tertiary' },
    { label: 'DEL', action: handleBackspace, type: 'util', icon: Delete },
    { label: '%', action: () => handleOperator('%'), type: 'util', icon: Percent },
    { label: '÷', action: () => handleOperator('÷'), type: 'op', icon: Divide },
    { label: '7', action: () => handleNumber('7'), type: 'num' },
    { label: '8', action: () => handleNumber('8'), type: 'num' },
    { label: '9', action: () => handleNumber('9'), type: 'num' },
    { label: '×', action: () => handleOperator('×'), type: 'op', icon: X },
    { label: '4', action: () => handleNumber('4'), type: 'num' },
    { label: '5', action: () => handleNumber('5'), type: 'num' },
    { label: '6', action: () => handleNumber('6'), type: 'num' },
    { label: '−', action: () => handleOperator('−'), type: 'op', icon: Minus },
    { label: '1', action: () => handleNumber('1'), type: 'num' },
    { label: '2', action: () => handleNumber('2'), type: 'num' },
    { label: '3', action: () => handleNumber('3'), type: 'num' },
    { label: '+', action: () => handleOperator('+'), type: 'op', icon: Plus },
    { label: '0', action: () => handleNumber('0'), type: 'num' },
    { label: '.', action: () => handleNumber('.'), type: 'num' },
    { label: '=', action: handleEvaluate, type: 'equal', span: 2 },
  ];

  const scientificButtons = [
    { label: 'sin', action: () => handleScientific('sin'), type: 'sci' },
    { label: 'cos', action: () => handleScientific('cos'), type: 'sci' },
    { label: 'tan', action: () => handleScientific('tan'), type: 'sci' },
    { label: 'log', action: () => handleScientific('log10'), type: 'sci' },
    { label: 'ln', action: () => handleScientific('log'), type: 'sci' },
    { label: '√', action: () => handleScientific('sqrt'), type: 'sci' },
    { label: 'π', action: () => handleNumber(Math.PI.toString()), type: 'sci' },
    { label: 'e', action: () => handleNumber(Math.E.toString()), type: 'sci' },
  ];

  return (
    <div className="px-4 md:px-8 max-w-4xl mx-auto w-full flex flex-col gap-6">
      {/* Mode Toggle */}
      <div className="flex justify-center mb-2">
        <div className="bg-surface-container-low p-1.5 squircle flex gap-1 border border-white/5">
          <button 
            onClick={() => setMode('basic')}
            className={`px-6 py-2 rounded-xl text-sm font-semibold transition-all ${
              mode === 'basic' ? 'bg-surface-container-high text-primary shadow-sm' : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Basic
          </button>
          <button 
            onClick={() => setMode('scientific')}
            className={`px-6 py-2 rounded-xl text-sm font-semibold transition-all ${
              mode === 'scientific' ? 'bg-surface-container-high text-primary shadow-sm' : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Scientific
          </button>
        </div>
      </div>

      {/* Display Area */}
      <section className="relative w-full aspect-[16/9] md:aspect-[21/9] flex flex-col justify-end items-end p-8 bg-surface-container-lowest squircle border border-white/5 overflow-hidden group">
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="z-10 text-right w-full">
          <span className="block font-label text-sm uppercase tracking-[0.2em] text-on-surface-variant/60 mb-2">
            {mode === 'scientific' ? `Scientific Mode (${angleUnit})` : 'Standard Calculator'}
          </span>
          <div className="h-8 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.span 
                key={expression}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="block font-headline text-2xl text-on-surface-variant/40 tracking-tight"
              >
                {expression}
              </motion.span>
            </AnimatePresence>
          </div>
          <div className="flex items-baseline justify-end gap-2 mt-2">
            <motion.span 
              key={display}
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              className="font-headline text-5xl md:text-7xl font-extrabold text-on-surface tracking-tighter truncate max-w-full"
            >
              {display}
            </motion.span>
            <motion.span 
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="w-1.5 h-12 md:h-16 bg-primary rounded-full shadow-[0_0_20px_rgba(31,226,150,0.6)] shrink-0"
            />
          </div>
        </div>
      </section>

      {/* Keypad */}
      <div className="flex flex-col gap-4">
        {mode === 'scientific' && (
          <div className="grid grid-cols-4 gap-2">
            {scientificButtons.map((btn, i) => (
              <motion.button
                key={i}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.95 }}
                onClick={btn.action}
                className="glass-btn p-4 rounded-2xl flex items-center justify-center font-headline text-sm font-bold text-secondary uppercase tracking-widest"
              >
                {btn.label}
              </motion.button>
            ))}
          </div>
        )}
        
        <div className="grid grid-cols-4 gap-3 md:gap-4">
          {basicButtons.map((btn, i) => (
            <motion.button
              key={i}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
              onClick={btn.action}
              className={`
                ${btn.span === 2 ? 'col-span-2' : ''}
                ${btn.type === 'equal' ? 'action-btn text-on-primary text-3xl font-black' : 
                  btn.type === 'op' || btn.type === 'util' ? 'glass-btn text-primary' : 
                  'navy-btn text-on-surface text-2xl font-bold'}
                p-6 squircle flex items-center justify-center font-headline transition-colors
                ${btn.color || ''}
              `}
            >
              {btn.icon ? <btn.icon size={28} /> : btn.label}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Smart Conversion & History Preview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div className="bg-surface-container-low p-6 squircle flex flex-col gap-3 border border-white/5">
          <h3 className="font-label text-xs uppercase tracking-widest text-primary font-bold">Live Market</h3>
          <div className="flex justify-between items-center">
            <span className="text-on-surface/80">USD to EUR</span>
            <span className="font-headline font-bold text-lg">0.92</span>
          </div>
          <div className="h-[1px] bg-white/5 w-full" />
          <div className="flex justify-between items-center">
            <span className="text-on-surface/80">BTC to USD</span>
            <span className="font-headline font-bold text-lg">64,231.0</span>
          </div>
        </div>
        <div className="bg-surface-container-low p-6 squircle flex flex-col gap-3 border border-white/5">
          <h3 className="font-label text-xs uppercase tracking-widest text-tertiary font-bold">Quick History</h3>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between text-on-surface-variant text-sm">
              <span>Last Result</span>
              <span className="font-mono text-on-surface">{display}</span>
            </div>
            <p className="text-[10px] text-on-surface-variant/40 uppercase tracking-widest">Tap History tab for more</p>
          </div>
        </div>
      </div>
    </div>
  );
}
