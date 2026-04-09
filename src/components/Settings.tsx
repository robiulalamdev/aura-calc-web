import React from 'react';
import { motion } from 'motion/react';
import { AppSettings } from '../types';
import { X, Bell, Vibrate, Hash, Globe, Info, Shield, Moon, Sun, Monitor } from 'lucide-react';

interface SettingsProps {
  settings: AppSettings;
  onUpdate: (settings: AppSettings) => void;
  onClose: () => void;
}

export default function Settings({ settings, onUpdate, onClose }: SettingsProps) {
  const toggleSetting = (key: keyof AppSettings) => {
    if (typeof settings[key] === 'boolean') {
      onUpdate({ ...settings, [key]: !settings[key] });
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-surface/80 backdrop-blur-2xl flex items-center justify-center p-6"
    >
      <motion.div 
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="w-full max-w-lg bg-surface-container-high rounded-[2.5rem] border border-white/10 shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
      >
        <header className="p-8 border-b border-white/5 flex justify-between items-center shrink-0">
          <div>
            <h2 className="text-2xl font-headline font-extrabold text-on-surface tracking-tight">System <span className="text-primary">Settings</span></h2>
            <p className="text-on-surface-variant text-xs opacity-60 uppercase tracking-widest mt-1">Configuration v4.2.0</p>
          </div>
          <button 
            onClick={onClose}
            className="p-3 rounded-2xl bg-surface-container-highest text-on-surface-variant hover:text-on-surface transition-colors"
          >
            <X size={20} />
          </button>
        </header>

        <div className="flex-grow overflow-y-auto p-8 space-y-8">
          {/* Appearance */}
          <section className="space-y-4">
            <h3 className="text-[10px] font-bold text-primary uppercase tracking-[0.3em]">Appearance</h3>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'dark', icon: Moon, label: 'Dark' },
                { id: 'light', icon: Sun, label: 'Light' },
                { id: 'system', icon: Monitor, label: 'System' },
              ].map((mode) => (
                <button
                  key={mode.id}
                  onClick={() => onUpdate({ ...settings, theme: mode.id as any })}
                  className={`flex flex-col items-center gap-2 p-4 rounded-2xl border transition-all ${
                    settings.theme === mode.id 
                      ? 'bg-primary/10 border-primary text-primary' 
                      : 'bg-surface-container-highest border-transparent text-on-surface-variant'
                  }`}
                >
                  <mode.icon size={20} />
                  <span className="text-[10px] font-bold uppercase tracking-tighter">{mode.label}</span>
                </button>
              ))}
            </div>
          </section>

          {/* Preferences */}
          <section className="space-y-4">
            <h3 className="text-[10px] font-bold text-secondary uppercase tracking-[0.3em]">Preferences</h3>
            <div className="space-y-2">
              {[
                { id: 'vibration', icon: Vibrate, label: 'Haptic Feedback' },
                { id: 'sound', icon: Bell, label: 'Sound Effects' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => toggleSetting(item.id as any)}
                  className="w-full flex justify-between items-center p-4 rounded-2xl bg-surface-container-highest transition-all hover:bg-surface-container-highest/80"
                >
                  <div className="flex items-center gap-3">
                    <item.icon size={18} className="text-on-surface-variant" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </div>
                  <div className={`w-10 h-5 rounded-full relative transition-colors ${settings[item.id as keyof AppSettings] ? 'bg-primary' : 'bg-surface-container-low'}`}>
                    <motion.div 
                      animate={{ x: settings[item.id as keyof AppSettings] ? 22 : 2 }}
                      className="absolute top-1 left-0 w-3 h-3 bg-white rounded-full shadow-sm"
                    />
                  </div>
                </button>
              ))}
            </div>
          </section>

          {/* Calculation */}
          <section className="space-y-4">
            <h3 className="text-[10px] font-bold text-tertiary uppercase tracking-[0.3em]">Calculation</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 rounded-2xl bg-surface-container-highest">
                <div className="flex items-center gap-3">
                  <Hash size={18} className="text-on-surface-variant" />
                  <span className="text-sm font-medium">Precision</span>
                </div>
                <select 
                  value={settings.precision}
                  onChange={(e) => onUpdate({ ...settings, precision: Number(e.target.value) })}
                  className="bg-surface-container-low text-on-surface text-xs font-bold p-2 rounded-xl border-none focus:ring-1 focus:ring-primary"
                >
                  {[4, 6, 8, 10, 12, 14].map(p => <option key={p} value={p}>{p} Digits</option>)}
                </select>
              </div>
              <div className="flex justify-between items-center p-4 rounded-2xl bg-surface-container-highest">
                <div className="flex items-center gap-3">
                  <Globe size={18} className="text-on-surface-variant" />
                  <span className="text-sm font-medium">Angle Unit</span>
                </div>
                <div className="flex bg-surface-container-low p-1 rounded-xl">
                  {['deg', 'rad'].map(unit => (
                    <button
                      key={unit}
                      onClick={() => onUpdate({ ...settings, angleUnit: unit as any })}
                      className={`px-4 py-1.5 rounded-lg text-[10px] font-bold uppercase transition-all ${
                        settings.angleUnit === unit ? 'bg-primary text-on-primary shadow-sm' : 'text-on-surface-variant'
                      }`}
                    >
                      {unit}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* About */}
          <section className="space-y-4 pt-4">
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-surface-container-highest/40 text-on-surface-variant/60">
              <Info size={16} />
              <span className="text-[10px] uppercase tracking-widest font-bold">Aura Calc Pro v4.2.0 (Stable)</span>
            </div>
          </section>
        </div>
      </motion.div>
    </motion.div>
  );
}
