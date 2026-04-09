export interface HistoryItem {
  id: string;
  type: 'basic' | 'scientific' | 'template';
  title: string;
  expression: string;
  result: string;
  timestamp: number;
}

export interface AppSettings {
  precision: number;
  theme: 'dark' | 'light' | 'system';
  vibration: boolean;
  sound: boolean;
  angleUnit: 'deg' | 'rad';
}

export interface CurrencyRate {
  code: string;
  rate: number;
}
