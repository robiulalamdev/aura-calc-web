import React from 'react';
import { motion } from 'motion/react';
import { Calculator, FunctionSquare, LayoutGrid, History, Settings, User, Menu } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
  onOpenSettings: () => void;
  key?: React.Key;
}

export default function Layout({ children, activeTab, onTabChange, onOpenSettings }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-surface overflow-hidden">
      {/* Cinematic Background Elements */}
      <div className="fixed inset-0 overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-primary aurora-glow" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-secondary aurora-glow" />
        <div className="absolute top-[20%] right-[5%] w-[30%] h-[40%] rounded-full bg-on-secondary-fixed-variant aurora-glow" />
        <div 
          className="absolute inset-0 opacity-[0.03]" 
          style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuB2KjqjtMSOnpMtTZS-c501gkNSUAAlWw9Nydrz8cBNaeb_EctXCS0yt9-FoXBsJxpAt65txRCb23lIIn82G6reAfNA5AekNiZvFUYf9alVMmmgajPUO3LlrxKj7wJ4DKaSt9_M5HSMpxTVCyTNJR_drFshvbOXyxU0Y_iDRrUtpMgbSCfi-9UjibhcFaFPjWjR3hwrlCLOb-TJBL4Qs2MJtT-3Q1DAewzSaJydHPGTe_MMNQLuXMBYLPp13M9vARg0yxzNQie1Wom7')" }}
        />
      </div>

      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-xl border-b border-white/5 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="text-primary"
          >
            <Calculator size={24} />
          </motion.div>
          <h1 className="font-headline tracking-widest uppercase font-black text-xl bg-gradient-to-r from-primary to-on-primary-container bg-clip-text text-transparent">
            AURA CALC
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={onOpenSettings}
            className="text-on-surface-variant hover:text-on-surface transition-colors"
          >
            <Settings size={20} />
          </button>
          <div className="w-8 h-8 rounded-full bg-surface-container-high border border-white/10 flex items-center justify-center overflow-hidden">
            <User size={16} className="text-on-surface-variant" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow pt-20 pb-28 overflow-y-auto">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="h-full"
        >
          {children}
        </motion.div>
      </main>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 left-0 w-full z-50 bg-surface-container/90 backdrop-blur-md border-t border-white/10 px-4 py-3 pb-safe flex justify-around items-center rounded-t-3xl shadow-[0_-8px_32px_rgba(31,226,150,0.05)]">
        {[
          { id: 'calculator', icon: Calculator, label: 'Calculator' },
          { id: 'advanced', icon: FunctionSquare, label: 'Advanced' },
          { id: 'templates', icon: LayoutGrid, label: 'Templates' },
          { id: 'history', icon: History, label: 'History' },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={`flex flex-col items-center justify-center gap-1 px-3 py-1 rounded-xl transition-all ${
              activeTab === item.id 
                ? 'text-primary bg-surface-container-high shadow-[inset_0_1px_0_0_rgba(31,226,150,0.2)]' 
                : 'text-on-surface-variant/60 hover:text-on-surface'
            }`}
          >
            <item.icon size={20} />
            <span className="font-label text-[10px] font-semibold uppercase tracking-tighter">
              {item.label}
            </span>
          </button>
        ))}
      </nav>

      {/* Vignette */}
      <div className="fixed inset-0 pointer-events-none shadow-[inset_0_0_150px_rgba(6,14,32,0.8)]" />
    </div>
  );
}
