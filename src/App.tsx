/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { OfflineIndicator } from './components/OfflineIndicator';
import { AuthModal } from './components/AuthModal';
import { ProfileModal } from './components/ProfileModal';
import { SettingsModal } from './components/SettingsModal';
import { HomeDashboard } from './components/modules/HomeDashboard';
import { HotelModule } from './components/modules/HotelModule';
import { TransitModule } from './components/modules/TransitModule';
import { TranslateModule } from './components/modules/TranslateModule';
import { SafetyModule } from './components/modules/SafetyModule';
import {
  NavigationTab,
  UserProfile,
  AppSettings,
  HotelBooking,
  EmergencyContact,
  RecentActivity
} from './types';
import {
  getSavedUserProfile,
  saveUserProfile,
  getSavedSettings,
  saveSettings,
  getSavedBookings,
  saveBooking,
  cancelBooking,
  getSavedContacts,
  addEmergencyContact,
  removeEmergencyContact,
  getRecentActivities,
  DEFAULT_SETTINGS,
  DEFAULT_USER,
  INITIAL_BOOKINGS
} from './utils/storage';
import { DEFAULT_EMERGENCY_CONTACTS } from './data/safetyData';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavigationTab>('home');
  const [user, setUser] = useState<UserProfile>(getSavedUserProfile);
  const [settings, setSettings] = useState<AppSettings>(getSavedSettings);
  const [bookings, setBookings] = useState<HotelBooking[]>(getSavedBookings);
  const [contacts, setContacts] = useState<EmergencyContact[]>(getSavedContacts);
  const [recentActivities, setRecentActivities] = useState<RecentActivity[]>(getRecentActivities);

  // Modals
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  // Apply Theme to documentElement
  useEffect(() => {
    if (settings.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [settings.theme]);

  // Register PWA Service Worker
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then((reg) => {
          console.log('EDO Service Worker registered successfully with scope:', reg.scope);
        })
        .catch((err) => {
          console.warn('EDO Service Worker registration failed:', err);
        });
    }
  }, []);

  const handleUpdateSettings = (newSettings: AppSettings) => {
    setSettings(newSettings);
    saveSettings(newSettings);
  };

  const handleToggleTheme = () => {
    const nextTheme = settings.theme === 'dark' ? 'light' : 'dark';
    handleUpdateSettings({ ...settings, theme: nextTheme });
  };

  const handleSaveProfile = (updated: UserProfile) => {
    setUser(updated);
    saveUserProfile(updated);
  };

  const handleLogout = () => {
    const guestUser: UserProfile = {
      ...DEFAULT_USER,
      name: 'Guest Traveler',
      email: 'guest@edo.local',
      isGuest: true
    };
    setUser(guestUser);
    saveUserProfile(guestUser);
    setIsProfileModalOpen(false);
  };

  const handleBookHotel = (newBooking: HotelBooking) => {
    const updated = saveBooking(newBooking);
    setBookings(updated);
    setRecentActivities(getRecentActivities());
  };

  const handleCancelBooking = (bookingId: string) => {
    const updated = cancelBooking(bookingId);
    setBookings(updated);
    setRecentActivities(getRecentActivities());
  };

  const handleAddContact = (contact: EmergencyContact) => {
    const updated = addEmergencyContact(contact);
    setContacts(updated);
  };

  const handleRemoveContact = (id: string) => {
    const updated = removeEmergencyContact(id);
    setContacts(updated);
  };

  const handleResetDemoData = () => {
    setUser(DEFAULT_USER);
    saveUserProfile(DEFAULT_USER);
    setSettings(DEFAULT_SETTINGS);
    saveSettings(DEFAULT_SETTINGS);
    setBookings(INITIAL_BOOKINGS);
    localStorage.setItem('edo_hotel_bookings', JSON.stringify(INITIAL_BOOKINGS));
    setContacts(DEFAULT_EMERGENCY_CONTACTS);
    localStorage.setItem('edo_emergency_contacts', JSON.stringify(DEFAULT_EMERGENCY_CONTACTS));
    setRecentActivities(getRecentActivities());
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      {/* Offline Status Pill */}
      <OfflineIndicator />

      {/* Main Top Header */}
      <Header
        user={user}
        settings={settings}
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        onOpenProfile={() => setIsProfileModalOpen(true)}
        onOpenSettings={() => setIsSettingsModalOpen(true)}
        onToggleTheme={handleToggleTheme}
      />

      {/* Main View Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 pb-24 md:pb-12">
        {activeTab === 'home' && (
          <HomeDashboard
            user={user}
            settings={settings}
            recentActivities={recentActivities}
            onSelectTab={setActiveTab}
            onOpenProfile={() => setIsProfileModalOpen(true)}
          />
        )}

        {activeTab === 'hotels' && (
          <HotelModule
            settings={settings}
            user={user}
            bookings={bookings}
            onBookHotel={handleBookHotel}
            onCancelBooking={handleCancelBooking}
          />
        )}

        {activeTab === 'transit' && (
          <TransitModule settings={settings} />
        )}

        {activeTab === 'translate' && (
          <TranslateModule />
        )}

        {activeTab === 'safety' && (
          <SafetyModule
            user={user}
            contacts={contacts}
            onAddContact={handleAddContact}
            onRemoveContact={handleRemoveContact}
          />
        )}
      </main>

      {/* Mobile-first Bottom Navigation Bar */}
      <BottomNav
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        bookingCount={bookings.filter((b) => b.status === 'confirmed').length}
      />

      {/* Modals */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={(loggedUser) => {
          setUser(loggedUser);
          saveUserProfile(loggedUser);
        }}
      />

      <ProfileModal
        isOpen={isProfileModalOpen}
        user={user}
        onClose={() => setIsProfileModalOpen(false)}
        onSaveProfile={handleSaveProfile}
        onLogout={handleLogout}
      />

      <SettingsModal
        isOpen={isSettingsModalOpen}
        settings={settings}
        onClose={() => setIsSettingsModalOpen(false)}
        onUpdateSettings={handleUpdateSettings}
        onResetDemoData={handleResetDemoData}
      />
    </div>
  );
}
