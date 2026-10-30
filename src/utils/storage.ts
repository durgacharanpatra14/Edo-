import {
  UserProfile,
  HotelBooking,
  EmergencyContact,
  RecentActivity,
  AppSettings
} from '../types';
import { DEFAULT_EMERGENCY_CONTACTS } from '../data/safetyData';

const KEYS = {
  USER: 'edo_user_profile',
  BOOKINGS: 'edo_hotel_bookings',
  CONTACTS: 'edo_emergency_contacts',
  ACTIVITIES: 'edo_recent_activities',
  SETTINGS: 'edo_app_settings'
};

export const DEFAULT_USER: UserProfile = {
  id: 'usr-101',
  name: 'Alex Rivera',
  email: 'alex.rivera@example.com',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
  phone: '+1 (555) 019-2831',
  bloodGroup: 'O+',
  allergies: 'Penicillin, Shellfish',
  emergencyContactName: 'Sarah Jenkins',
  emergencyContactPhone: '+1 (555) 349-8821',
  isGuest: false,
  memberSince: 'March 2025'
};

export const DEFAULT_SETTINGS: AppSettings = {
  theme: 'dark',
  currency: 'USD',
  currencySymbol: '$',
  currencyRate: 1,
  language: 'en',
  offlineCacheEnabled: true,
  soundEffects: true
};

export const INITIAL_BOOKINGS: HotelBooking[] = [
  {
    id: 'bkg-demo-1',
    hotelId: 'htl-1',
    hotelName: 'The Glasshouse Aqua Resort',
    hotelImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80',
    hotelLocation: 'Tokyo, Japan',
    checkInDate: '2026-11-15',
    checkOutDate: '2026-11-18',
    guests: 2,
    rooms: 1,
    roomTypeName: 'Deluxe Aqua King Suite',
    totalPrice: 495,
    currency: 'USD',
    bookingDate: '2026-10-28',
    status: 'confirmed',
    referenceCode: 'EDO-TYO-8829',
    guestName: 'Alex Rivera',
    guestEmail: 'alex.rivera@example.com',
    specialRequests: 'Quiet high floor requested'
  }
];

export const INITIAL_ACTIVITIES: RecentActivity[] = [
  {
    id: 'act-1',
    type: 'booking',
    title: 'Demo Reservation Confirmed',
    subtitle: 'The Glasshouse Aqua Resort (Tokyo)',
    timestamp: '2 hours ago'
  },
  {
    id: 'act-2',
    type: 'transit',
    title: 'Transit Route Saved',
    subtitle: 'Narita Airport to Omotesando Line',
    timestamp: 'Yesterday'
  },
  {
    id: 'act-3',
    type: 'safety',
    title: 'Offline Safety Checklist Synchronized',
    subtitle: 'Japan Emergency Services (110 / 119)',
    timestamp: '2 days ago'
  }
];

// Helper to safely get from localStorage
function getLocalItem<T>(key: string, fallback: T): T {
  try {
    if (typeof window === 'undefined' || !window.localStorage) {
      return fallback;
    }
    const stored = window.localStorage.getItem(key);
    if (!stored) return fallback;
    return JSON.parse(stored) as T;
  } catch (err) {
    console.warn(`Error reading localStorage key "${key}":`, err);
    return fallback;
  }
}

// Helper to safely set to localStorage
function setLocalItem<T>(key: string, value: T): void {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem(key, JSON.stringify(value));
    }
  } catch (err) {
    console.warn(`Error setting localStorage key "${key}":`, err);
  }
}

// User Profile
export function getSavedUserProfile(): UserProfile {
  return getLocalItem<UserProfile>(KEYS.USER, DEFAULT_USER);
}

export function saveUserProfile(profile: UserProfile): void {
  setLocalItem(KEYS.USER, profile);
}

// Hotel Bookings
export function getSavedBookings(): HotelBooking[] {
  return getLocalItem<HotelBooking[]>(KEYS.BOOKINGS, INITIAL_BOOKINGS);
}

export function saveBooking(booking: HotelBooking): HotelBooking[] {
  const current = getSavedBookings();
  const updated = [booking, ...current];
  setLocalItem(KEYS.BOOKINGS, updated);
  addRecentActivity({
    id: `act-${Date.now()}`,
    type: 'booking',
    title: 'Demo Reservation Made',
    subtitle: `${booking.hotelName} (${booking.referenceCode})`,
    timestamp: 'Just now'
  });
  return updated;
}

export function cancelBooking(bookingId: string): HotelBooking[] {
  const current = getSavedBookings();
  const updated = current.map((b) =>
    b.id === bookingId ? { ...b, status: 'cancelled' as const } : b
  );
  setLocalItem(KEYS.BOOKINGS, updated);
  addRecentActivity({
    id: `act-${Date.now()}`,
    type: 'booking',
    title: 'Demo Booking Cancelled',
    subtitle: `Reference #${bookingId}`,
    timestamp: 'Just now'
  });
  return updated;
}

// Emergency Contacts
export function getSavedContacts(): EmergencyContact[] {
  return getLocalItem<EmergencyContact[]>(KEYS.CONTACTS, DEFAULT_EMERGENCY_CONTACTS);
}

export function saveContacts(contacts: EmergencyContact[]): void {
  setLocalItem(KEYS.CONTACTS, contacts);
}

export function addEmergencyContact(contact: EmergencyContact): EmergencyContact[] {
  const current = getSavedContacts();
  const updated = [...current, contact];
  setLocalItem(KEYS.CONTACTS, updated);
  return updated;
}

export function removeEmergencyContact(contactId: string): EmergencyContact[] {
  const current = getSavedContacts();
  const updated = current.filter((c) => c.id !== contactId);
  setLocalItem(KEYS.CONTACTS, updated);
  return updated;
}

// Recent Activities
export function getRecentActivities(): RecentActivity[] {
  return getLocalItem<RecentActivity[]>(KEYS.ACTIVITIES, INITIAL_ACTIVITIES);
}

export function addRecentActivity(activity: RecentActivity): RecentActivity[] {
  const current = getRecentActivities();
  const updated = [activity, ...current.slice(0, 7)];
  setLocalItem(KEYS.ACTIVITIES, updated);
  return updated;
}

// App Settings
export function getSavedSettings(): AppSettings {
  return getLocalItem<AppSettings>(KEYS.SETTINGS, DEFAULT_SETTINGS);
}

export function saveSettings(settings: AppSettings): void {
  setLocalItem(KEYS.SETTINGS, settings);
}

// Currency converter helper
export const CURRENCY_SYMBOLS: Record<AppSettings['currency'], string> = {
  USD: '$',
  EUR: '€',
  GBP: '£',
  JPY: '¥',
  INR: '₹'
};

export const CURRENCY_RATES_FROM_USD: Record<AppSettings['currency'], number> = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  JPY: 152,
  INR: 85
};

export function formatPrice(amountUsd: number, targetCurrency: AppSettings['currency'] = 'USD'): string {
  const rate = CURRENCY_RATES_FROM_USD[targetCurrency] || 1;
  const symbol = CURRENCY_SYMBOLS[targetCurrency] || '$';
  const converted = Math.round(amountUsd * rate);

  if (targetCurrency === 'JPY') {
    return `${symbol}${converted.toLocaleString()}`;
  }
  return `${symbol}${converted.toLocaleString()}`;
}
