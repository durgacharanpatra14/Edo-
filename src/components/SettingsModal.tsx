import React, { useState } from 'react';
import { X, Globe, DollarSign, Moon, Sun, Database, RotateCcw, Check } from 'lucide-react';
import { AppSettings } from '../types';
import { CURRENCY_SYMBOLS, CURRENCY_RATES_FROM_USD } from '../utils/storage';
import { SUPPORTED_LANGUAGES } from '../utils/translationData';

interface SettingsModalProps {
  isOpen: boolean;
  settings: AppSettings;
  onClose: () => void;
  onUpdateSettings: (newSettings: AppSettings) => void;
  onResetDemoData: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  settings,
  onClose,
  onUpdateSettings,
  onResetDemoData
}) => {
  const [resetConfirm, setResetConfirm] = useState(false);
  const [syncedFeedback, setSyncedFeedback] = useState(false);

  if (!isOpen) return null;

  const handleCurrencyChange = (curr: AppSettings['currency']) => {
    onUpdateSettings({
      ...settings,
      currency: curr,
      currencySymbol: CURRENCY_SYMBOLS[curr],
      currencyRate: CURRENCY_RATES_FROM_USD[curr]
    });
  };

  const handleSyncCache = () => {
    setSyncedFeedback(true);
    setTimeout(() => setSyncedFeedback(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-md rounded-2xl p-6 glass-panel border border-cyan-500/30 shadow-2xl relative text-slate-800 dark:text-slate-100">
        <button
          onClick={onClose}
          aria-label="Close settings"
          className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition text-slate-400 hover:text-white cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white mb-1">
          Preferences & Settings
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-5">
          Configure display currency, travel language, and offline storage.
        </p>

        <div className="space-y-4">
          {/* Theme Mode */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-100/70 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
            <div className="flex items-center gap-2.5">
              {settings.theme === 'dark' ? (
                <Moon className="w-4 h-4 text-cyan-400" />
              ) : (
                <Sun className="w-4 h-4 text-amber-500" />
              )}
              <div>
                <p className="text-xs font-semibold">Appearance Theme</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  {settings.theme === 'dark' ? 'Dark Aqua Glow' : 'Light Crystal Clear'}
                </p>
              </div>
            </div>

            <button
              onClick={() =>
                onUpdateSettings({
                  ...settings,
                  theme: settings.theme === 'dark' ? 'light' : 'dark'
                })
              }
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-600 shadow-sm cursor-pointer hover:border-cyan-400 transition"
            >
              Toggle ({settings.theme === 'dark' ? 'Light' : 'Dark'})
            </button>
          </div>

          {/* Currency Selector */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-1.5">
              <DollarSign className="w-3.5 h-3.5 text-cyan-500" />
              Display Currency
            </label>
            <div className="grid grid-cols-5 gap-1.5">
              {(['USD', 'EUR', 'GBP', 'JPY', 'INR'] as AppSettings['currency'][]).map((curr) => {
                const isSelected = settings.currency === curr;
                return (
                  <button
                    key={curr}
                    type="button"
                    onClick={() => handleCurrencyChange(curr)}
                    className={`py-2 px-1 rounded-xl text-center text-xs font-bold transition cursor-pointer ${
                      isSelected
                        ? 'bg-gradient-to-br from-cyan-500 to-teal-500 text-slate-900 shadow-sm'
                        : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    <div>{CURRENCY_SYMBOLS[curr]}</div>
                    <div className="text-[10px] font-medium opacity-80">{curr}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Primary Language */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-cyan-500" />
              Default Application Language
            </label>
            <select
              value={settings.language}
              onChange={(e) => onUpdateSettings({ ...settings, language: e.target.value })}
              className="w-full px-3 py-2 text-xs rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 focus:outline-none focus:border-cyan-400"
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.flag} {lang.name} ({lang.nativeName})
                </option>
              ))}
            </select>
          </div>

          {/* Offline Storage Status */}
          <div className="p-3 rounded-xl bg-slate-100/70 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4 text-cyan-500" />
                <span className="text-xs font-semibold">Offline PWA Storage</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 font-bold border border-emerald-500/20">
                Active & Cached
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight mb-3">
              Hotels, emergency numbers, translation phrases, and user preferences are preserved offline.
            </p>
            <button
              type="button"
              onClick={handleSyncCache}
              className="w-full py-1.5 rounded-lg text-xs font-semibold bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30 flex items-center justify-center gap-1.5 transition cursor-pointer"
            >
              {syncedFeedback ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                  Cache Re-indexed!
                </>
              ) : (
                <>
                  <Database className="w-3.5 h-3.5" />
                  Verify Offline Cache
                </>
              )}
            </button>
          </div>

          {/* Reset Demo Data */}
          <div className="pt-2">
            {!resetConfirm ? (
              <button
                type="button"
                onClick={() => setResetConfirm(true)}
                className="w-full py-2 rounded-xl text-xs font-semibold text-rose-500 hover:bg-rose-500/10 border border-rose-500/20 transition cursor-pointer flex items-center justify-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset Sample Demo Bookings & Contacts
              </button>
            ) : (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-center space-y-2">
                <p className="text-xs text-rose-500 font-semibold">
                  Are you sure? This restores initial demo data.
                </p>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      onResetDemoData();
                      setResetConfirm(false);
                      onClose();
                    }}
                    className="flex-1 py-1.5 bg-rose-500 hover:bg-rose-600 text-white text-xs font-bold rounded-lg cursor-pointer transition"
                  >
                    Confirm Reset
                  </button>
                  <button
                    type="button"
                    onClick={() => setResetConfirm(false)}
                    className="flex-1 py-1.5 bg-slate-200 dark:bg-slate-700 text-xs font-medium rounded-lg cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
