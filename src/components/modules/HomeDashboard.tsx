import React from 'react';
import {
  Compass,
  Building2,
  TrainFront,
  Languages,
  ShieldAlert,
  ArrowRight,
  Clock,
  MapPin,
  Sparkles,
  PhoneCall,
  BookmarkCheck,
  CheckCircle,
  ExternalLink
} from 'lucide-react';
import { NavigationTab, UserProfile, RecentActivity, AppSettings } from '../../types';

interface HomeDashboardProps {
  user: UserProfile;
  settings: AppSettings;
  recentActivities: RecentActivity[];
  onSelectTab: (tab: NavigationTab) => void;
  onOpenProfile: () => void;
}

export const HomeDashboard: React.FC<HomeDashboardProps> = ({
  user,
  settings,
  recentActivities,
  onSelectTab,
  onOpenProfile
}) => {
  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn">
      {/* Hero Welcome Banner */}
      <div className="relative rounded-3xl overflow-hidden glass-card border border-cyan-500/30 p-6 sm:p-8 shadow-2xl bg-gradient-to-br from-slate-900/90 via-slate-900/70 to-cyan-950/40">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-600 dark:text-cyan-400 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span>All-In-One Travel Ecosystem</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
            Welcome back, <span className="bg-gradient-to-r from-cyan-400 to-teal-300 bg-clip-text text-transparent">{user.name.split(' ')[0]}</span> 👋
          </h1>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            EDO simplifies your entire journey. Explore accommodations, navigate local transit, bridge language barriers, and access offline safety tools—all from one unified platform.
          </p>

          {/* Quick Stats Pill */}
          <div className="flex flex-wrap items-center gap-2 pt-2">
            <span className="px-3 py-1 rounded-xl bg-slate-800/80 border border-slate-700/80 text-[11px] font-medium text-slate-300 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-cyan-400" />
              Tokyo, Japan (Active Destination)
            </span>
            <span className="px-3 py-1 rounded-xl bg-slate-800/80 border border-slate-700/80 text-[11px] font-medium text-slate-300 flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5 text-emerald-400" />
              Offline Safety Toolkit Synced
            </span>
          </div>
        </div>

        {/* Ambient Decorative Glow */}
        <div className="absolute -right-16 -top-16 w-64 h-64 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute right-12 bottom-0 hidden lg:block opacity-25 pointer-events-none">
          <Compass className="w-56 h-56 text-cyan-400/30" />
        </div>
      </div>

      {/* Quick Action Shortcuts Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
        <button
          onClick={() => onSelectTab('safety')}
          className="p-3 rounded-2xl glass-card border border-rose-500/30 hover:border-rose-400 transition text-left cursor-pointer group flex items-center gap-2.5"
        >
          <div className="w-9 h-9 rounded-xl bg-rose-500/20 text-rose-500 flex items-center justify-center shrink-0 group-hover:scale-105 transition">
            <ShieldAlert className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-900 dark:text-white">Emergency SOS</p>
            <p className="text-[10px] text-slate-400">Offline Medical Card</p>
          </div>
        </button>

        <button
          onClick={() => onSelectTab('hotels')}
          className="p-3 rounded-2xl glass-card border border-cyan-500/20 hover:border-cyan-400 transition text-left cursor-pointer group flex items-center gap-2.5"
        >
          <div className="w-9 h-9 rounded-xl bg-cyan-500/20 text-cyan-500 flex items-center justify-center shrink-0 group-hover:scale-105 transition">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-900 dark:text-white">Find Hotels</p>
            <p className="text-[10px] text-slate-400">Curated Stays</p>
          </div>
        </button>

        <button
          onClick={() => onSelectTab('transit')}
          className="p-3 rounded-2xl glass-card border border-cyan-500/20 hover:border-cyan-400 transition text-left cursor-pointer group flex items-center gap-2.5"
        >
          <div className="w-9 h-9 rounded-xl bg-teal-500/20 text-teal-500 flex items-center justify-center shrink-0 group-hover:scale-105 transition">
            <TrainFront className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-900 dark:text-white">Local Transit</p>
            <p className="text-[10px] text-slate-400">Subway & Bus Routes</p>
          </div>
        </button>

        <button
          onClick={() => onSelectTab('translate')}
          className="p-3 rounded-2xl glass-card border border-cyan-500/20 hover:border-cyan-400 transition text-left cursor-pointer group flex items-center gap-2.5"
        >
          <div className="w-9 h-9 rounded-xl bg-cyan-500/20 text-cyan-500 flex items-center justify-center shrink-0 group-hover:scale-105 transition">
            <Languages className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-900 dark:text-white">Phrasebook</p>
            <p className="text-[10px] text-slate-400">Voice & 8 Languages</p>
          </div>
        </button>
      </div>

      {/* 4 Core Application Feature Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-extrabold text-slate-900 dark:text-white tracking-tight">
            The 4 Core Travel Pillars
          </h2>
          <span className="text-xs font-semibold text-cyan-600 dark:text-cyan-400">
            Integrated Ecosystem
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          {/* Module 1: Hotel Booking */}
          <div
            onClick={() => onSelectTab('hotels')}
            className="group p-5 rounded-3xl glass-card border border-cyan-500/20 hover:border-cyan-400/60 shadow-lg transition-all duration-300 cursor-pointer flex flex-col justify-between space-y-4 hover:shadow-cyan-500/10"
          >
            <div className="flex items-start justify-between">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-105 transition">
                <Building2 className="w-6 h-6" />
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 uppercase">
                Module 1
              </span>
            </div>

            <div className="space-y-1">
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white group-hover:text-cyan-400 transition">
                Hotel Booking & Stays
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Search verified destinations, inspect photo galleries, filter by amenities, and confirm demo reservations with instant reference codes.
              </p>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-slate-800 text-xs font-bold text-cyan-600 dark:text-cyan-400">
              <span>Browse 6 Curated Global Stays</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Module 2: Transit & Navigation */}
          <div
            onClick={() => onSelectTab('transit')}
            className="group p-5 rounded-3xl glass-card border border-cyan-500/20 hover:border-cyan-400/60 shadow-lg transition-all duration-300 cursor-pointer flex flex-col justify-between space-y-4 hover:shadow-cyan-500/10"
          >
            <div className="flex items-start justify-between">
              <div className="w-12 h-12 rounded-2xl bg-teal-500/15 border border-teal-500/30 flex items-center justify-center text-teal-400 group-hover:scale-105 transition">
                <TrainFront className="w-6 h-6" />
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-teal-500/10 text-teal-400 border border-teal-500/30 uppercase">
                Module 2
              </span>
            </div>

            <div className="space-y-1">
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white group-hover:text-cyan-400 transition">
                Transit and Arrival Navigation
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Step-by-step subway, bus, walking, and taxi instructions from airport to hotel with fare estimates, carbon scores, and external map routing.
              </p>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-slate-800 text-xs font-bold text-teal-600 dark:text-teal-400">
              <span>View Multi-Modal Transit Routes</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Module 3: Translation Tool */}
          <div
            onClick={() => onSelectTab('translate')}
            className="group p-5 rounded-3xl glass-card border border-cyan-500/20 hover:border-cyan-400/60 shadow-lg transition-all duration-300 cursor-pointer flex flex-col justify-between space-y-4 hover:shadow-cyan-500/10"
          >
            <div className="flex items-start justify-between">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-105 transition">
                <Languages className="w-6 h-6" />
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 uppercase">
                Module 3
              </span>
            </div>

            <div className="space-y-1">
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white group-hover:text-cyan-400 transition">
                Smart Translation & Voice
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Two-way text and speech translation with native audio pronunciations, phonetic travel phrases, and offline emergency dictionaries.
              </p>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-slate-800 text-xs font-bold text-cyan-600 dark:text-cyan-400">
              <span>Open Voice & Text Translator</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Module 4: Offline Safety Toolkit */}
          <div
            onClick={() => onSelectTab('safety')}
            className="group p-5 rounded-3xl glass-card border border-rose-500/20 hover:border-rose-400/60 shadow-lg transition-all duration-300 cursor-pointer flex flex-col justify-between space-y-4 hover:shadow-rose-500/10"
          >
            <div className="flex items-start justify-between">
              <div className="w-12 h-12 rounded-2xl bg-rose-500/15 border border-rose-500/30 flex items-center justify-center text-rose-400 group-hover:scale-105 transition">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/10 text-rose-400 border border-rose-500/30 uppercase">
                Module 4
              </span>
            </div>

            <div className="space-y-1">
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white group-hover:text-rose-400 transition">
                Offline Safety & Emergency Dispatch
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Emergency hotlines for 12+ countries, user-configurable emergency contacts, 5s cancelable SOS button, and travel protocols that work 100% offline.
              </p>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-slate-800 text-xs font-bold text-rose-500 dark:text-rose-400">
              <span>Access Offline Safety Hotline</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity Log */}
      <div className="p-5 rounded-3xl glass-card border border-cyan-500/20 shadow-md space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-cyan-500" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Recent Application Activity
            </h3>
          </div>
          <span className="text-[11px] text-slate-500">Persistent across reloads</span>
        </div>

        <div className="space-y-2.5">
          {recentActivities.map((act) => (
            <div
              key={act.id}
              className="p-3 rounded-2xl bg-slate-100/60 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-cyan-400" />
                <div>
                  <p className="text-xs font-bold text-slate-800 dark:text-slate-100">{act.title}</p>
                  <p className="text-[11px] text-slate-500">{act.subtitle}</p>
                </div>
              </div>
              <span className="text-[10px] text-slate-400 font-medium">{act.timestamp}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
