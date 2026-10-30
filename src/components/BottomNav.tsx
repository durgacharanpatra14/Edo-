import React from 'react';
import { Compass, Building2, TrainFront, Languages, ShieldAlert } from 'lucide-react';
import { NavigationTab } from '../types';

interface BottomNavProps {
  activeTab: NavigationTab;
  onSelectTab: (tab: NavigationTab) => void;
  bookingCount?: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onSelectTab,
  bookingCount = 0
}) => {
  const tabs = [
    {
      id: 'home' as NavigationTab,
      label: 'Home',
      icon: Compass,
      badge: null
    },
    {
      id: 'hotels' as NavigationTab,
      label: 'Hotels',
      icon: Building2,
      badge: bookingCount > 0 ? bookingCount : null
    },
    {
      id: 'transit' as NavigationTab,
      label: 'Transit',
      icon: TrainFront,
      badge: null
    },
    {
      id: 'translate' as NavigationTab,
      label: 'Translate',
      icon: Languages,
      badge: null
    },
    {
      id: 'safety' as NavigationTab,
      label: 'Safety',
      icon: ShieldAlert,
      badge: 'SOS'
    }
  ];

  return (
    <nav
      aria-label="Mobile Bottom Navigation"
      className="fixed bottom-0 left-0 right-0 z-40 md:hidden glass-panel border-t border-cyan-500/20 px-2 py-1.5 shadow-2xl safe-area-pb"
    >
      <div className="flex items-center justify-around max-w-lg mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          const isSafety = tab.id === 'safety';

          return (
            <button
              key={tab.id}
              onClick={() => onSelectTab(tab.id)}
              aria-label={`Navigate to ${tab.label}`}
              className={`relative flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all cursor-pointer ${
                isActive
                  ? 'text-cyan-500 dark:text-cyan-400 font-semibold'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <div className="relative">
                <Icon
                  className={`w-5 h-5 transition-transform duration-200 ${
                    isActive ? 'scale-115 text-cyan-500 dark:text-cyan-400' : ''
                  }`}
                />

                {/* Badge Indicator */}
                {tab.badge && (
                  <span
                    className={`absolute -top-1.5 -right-2 text-[9px] font-bold px-1 py-0.2 rounded-full leading-tight ${
                      isSafety
                        ? 'bg-rose-500 text-white'
                        : 'bg-cyan-500 text-slate-900'
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </div>

              <span className="text-[10px] mt-1 tracking-tight font-medium">
                {tab.label}
              </span>

              {isActive && (
                <span className="absolute -bottom-1 w-6 h-0.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
