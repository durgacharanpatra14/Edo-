import React, { useState, useEffect } from 'react';
import { WifiOff, Wifi, ShieldCheck } from 'lucide-react';

export const OfflineIndicator: React.FC = () => {
  const [isOnline, setIsOnline] = useState(
    typeof navigator !== 'undefined' ? navigator.onLine : true
  );
  const [showReconnected, setShowReconnected] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setShowReconnected(true);
      const timer = setTimeout(() => setShowReconnected(false), 3500);
      return () => clearTimeout(timer);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowReconnected(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (showReconnected) {
    return (
      <div className="fixed top-18 right-4 z-40 flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/90 text-white text-xs font-medium shadow-lg backdrop-blur-md animate-bounce">
        <Wifi className="w-3.5 h-3.5" />
        <span>Connected back online</span>
      </div>
    );
  }

  if (isOnline) return null;

  return (
    <div className="fixed top-18 left-4 right-4 sm:left-auto sm:right-4 z-40 flex items-center justify-between gap-3 px-3.5 py-2 rounded-xl bg-amber-500/95 dark:bg-amber-600/95 text-white text-xs font-medium shadow-xl backdrop-blur-md border border-amber-300/30">
      <div className="flex items-center gap-2">
        <WifiOff className="w-4 h-4 shrink-0 animate-pulse text-amber-100" />
        <span>Offline Mode — Safety Toolkit & Saved Data Active</span>
      </div>
      <div className="flex items-center gap-1 text-[11px] bg-amber-700/50 px-2 py-0.5 rounded-md">
        <ShieldCheck className="w-3 h-3 text-amber-200" />
        <span>Cached</span>
      </div>
    </div>
  );
};
