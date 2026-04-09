import React from 'react';
import { motion } from 'motion/react';
import { HistoryItem } from '../types';
import { Clock, Trash2, ChevronRight } from 'lucide-react';

interface HistoryProps {
  history: HistoryItem[];
  onClear: () => void;
}

export default function History({ history, onClear }: HistoryProps) {
  return (
    <div className="px-6 max-w-4xl mx-auto pb-12">
      <header className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-headline font-extrabold text-on-surface tracking-tight">
            Activity <span className="text-primary">Log</span>
          </h2>
          <p className="text-on-surface-variant text-sm opacity-60">Your recent calculations and conversions</p>
        </div>
        {history.length > 0 && (
          <button 
            onClick={onClear}
            className="p-3 rounded-2xl bg-surface-container-high text-tertiary hover:bg-surface-container-highest transition-colors flex items-center gap-2"
          >
            <Trash2 size={18} />
            <span className="text-xs font-bold uppercase tracking-widest">Clear</span>
          </button>
        )}
      </header>

      {history.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-on-surface-variant opacity-40">
          <Clock size={64} strokeWidth={1} className="mb-4" />
          <p className="font-headline font-bold text-xl">No History Yet</p>
          <p className="text-sm">Calculations will appear here</p>
        </div>
      ) : (
        <div className="space-y-4">
          {history.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="p-5 rounded-3xl bg-surface-container-low border border-white/5 flex justify-between items-center group hover:bg-surface-container-high transition-all"
            >
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-bold uppercase tracking-[0.2em] px-2 py-0.5 rounded ${
                    item.type === 'basic' ? 'bg-primary/10 text-primary' : 
                    item.type === 'scientific' ? 'bg-secondary/10 text-secondary' : 
                    'bg-tertiary/10 text-tertiary'
                  }`}>
                    {item.type}
                  </span>
                  <span className="text-[10px] text-on-surface-variant/40 font-label">
                    {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <p className="text-on-surface-variant/60 text-sm font-headline">{item.expression}</p>
                <p className="text-xl font-headline font-bold text-on-surface tracking-tight">{item.result}</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right hidden sm:block">
                  <p className="text-[10px] text-on-surface-variant/40 uppercase tracking-widest">
                    {new Date(item.timestamp).toLocaleDateString()}
                  </p>
                </div>
                <ChevronRight size={20} className="text-on-surface-variant/20 group-hover:text-primary transition-colors" />
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
