/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import Layout from './components/Layout';
import Splash from './components/Splash';
import Calculator from './components/Calculator';
import Templates from './components/Templates';
import MortgageCalculator from './components/MortgageCalculator';
import BMICalculator from './components/BMICalculator';
import CurrencyConverter from './components/CurrencyConverter';
import History from './components/History';
import Advanced from './components/Advanced';
import Settings from './components/Settings';
import { HistoryItem, AppSettings } from './types';

export default function App() {
  const [isSplashComplete, setIsSplashComplete] = useState(false);
  const [activeTab, setActiveTab] = useState('calculator');
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  
  const [history, setHistory] = useState<HistoryItem[]>(() => {
    const saved = localStorage.getItem('aura_history');
    return saved ? JSON.parse(saved) : [];
  });

  const [settings, setSettings] = useState<AppSettings>(() => {
    const saved = localStorage.getItem('aura_settings');
    return saved ? JSON.parse(saved) : {
      precision: 10,
      theme: 'dark',
      vibration: true,
      sound: false,
      angleUnit: 'deg',
    };
  });

  useEffect(() => {
    localStorage.setItem('aura_history', JSON.stringify(history));
  }, [history]);

  useEffect(() => {
    localStorage.setItem('aura_settings', JSON.stringify(settings));
  }, [settings]);

  const addHistory = (item: Omit<HistoryItem, 'id' | 'timestamp'>) => {
    const newItem: HistoryItem = {
      ...item,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: Date.now(),
    };
    setHistory(prev => [newItem, ...prev].slice(0, 50));
  };

  const clearHistory = () => {
    setHistory([]);
  };

  const renderScreen = () => {
    if (selectedTemplate === 'mortgage') {
      return <MortgageCalculator onBack={() => setSelectedTemplate(null)} />;
    }
    if (selectedTemplate === 'bmi') {
      return <BMICalculator onBack={() => setSelectedTemplate(null)} />;
    }
    if (selectedTemplate === 'currency') {
      return <CurrencyConverter onBack={() => setSelectedTemplate(null)} />;
    }

    switch (activeTab) {
      case 'calculator':
        return <Calculator onAddHistory={addHistory} angleUnit={settings.angleUnit} />;
      case 'templates':
        return <Templates onSelect={setSelectedTemplate} />;
      case 'advanced':
        return <Advanced />;
      case 'history':
        return <History history={history} onClear={clearHistory} />;
      default:
        return <Calculator onAddHistory={addHistory} angleUnit={settings.angleUnit} />;
    }
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {!isSplashComplete ? (
          <Splash key="splash" onComplete={() => setIsSplashComplete(true)} />
        ) : (
          <Layout 
            key="layout" 
            activeTab={activeTab} 
            onTabChange={(tab) => {
              setActiveTab(tab);
              setSelectedTemplate(null);
            }}
            onOpenSettings={() => setIsSettingsOpen(true)}
          >
            {renderScreen()}
          </Layout>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isSettingsOpen && (
          <Settings 
            settings={settings} 
            onUpdate={setSettings} 
            onClose={() => setIsSettingsOpen(false)} 
          />
        )}
      </AnimatePresence>
    </>
  );
}
