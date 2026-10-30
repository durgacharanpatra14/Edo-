export type NavigationTab = 'home' | 'hotels' | 'transit' | 'translate' | 'safety';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  phone: string;
  bloodGroup: string;
  allergies: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  isGuest: boolean;
  memberSince: string;
}

export interface RoomType {
  id: string;
  name: string;
  pricePerNight: number;
  capacity: number;
  bedType: string;
  features: string[];
}

export interface Hotel {
  id: string;
  name: string;
  city: string;
  country: string;
  address: string;
  image: string;
  gallery: string[];
  pricePerNight: number;
  currency: string;
  rating: number;
  reviewCount: number;
  badge?: 'Popular' | 'Best Value' | 'Luxury' | 'Eco Friendly' | 'Near Station';
  facilities: string[];
  description: string;
  roomTypes: RoomType[];
  checkInTime: string;
  checkOutTime: string;
}

export interface HotelBooking {
  id: string;
  hotelId: string;
  hotelName: string;
  hotelImage: string;
  hotelLocation: string;
  checkInDate: string;
  checkOutDate: string;
  guests: number;
  rooms: number;
  roomTypeName: string;
  totalPrice: number;
  currency: string;
  bookingDate: string;
  status: 'confirmed' | 'cancelled' | 'completed';
  referenceCode: string;
  guestName: string;
  guestEmail: string;
  specialRequests?: string;
}

export type TransitMode = 'all' | 'metro' | 'bus' | 'taxi' | 'walking' | 'shuttle';

export interface RouteStep {
  stepNumber: number;
  mode: 'metro' | 'bus' | 'taxi' | 'walking' | 'shuttle' | 'wait';
  instruction: string;
  durationMinutes: number;
  detail: string;
  stationOrStop?: string;
  lineName?: string;
}

export interface TransitOption {
  id: string;
  from: string;
  to: string;
  mode: 'metro' | 'bus' | 'taxi' | 'walking' | 'shuttle';
  name: string;
  summary: string;
  durationMinutes: number;
  departureFrequency: string;
  estimatedFare: number;
  currency: string;
  distanceKm: number;
  ecoScore: 'A+' | 'A' | 'B' | 'C';
  crowdLevel: 'Low' | 'Moderate' | 'Busy';
  firstDeparture: string;
  lastDeparture: string;
  steps: RouteStep[];
  stationArrivalTip: string;
}

export interface LanguageOption {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
  speechVoiceCode?: string;
}

export interface CommonPhrase {
  id: string;
  category: 'Essentials' | 'Accommodation' | 'Transit & Directions' | 'Food & Dining' | 'Emergency & Medical' | 'Shopping';
  english: string;
  translations: Record<string, { text: string; phonetic: string }>;
}

export interface EmergencyContact {
  id: string;
  name: string;
  relationship: string;
  phone: string;
  email?: string;
  isPrimary: boolean;
}

export interface CountryEmergency {
  country: string;
  code: string;
  flag: string;
  police: string;
  ambulance: string;
  fire: string;
  touristPolice?: string;
  generalEmergency: string;
  embassySupportNumber?: string;
  notes: string;
}

export interface SafetyGuide {
  id: string;
  category: 'Night Safety' | 'Public Transit' | 'Scam Prevention' | 'Documents' | 'Medical Emergencies';
  title: string;
  summary: string;
  icon: string;
  tips: string[];
}

export interface RecentActivity {
  id: string;
  type: 'booking' | 'transit' | 'translation' | 'safety';
  title: string;
  subtitle: string;
  timestamp: string;
}

export interface AppSettings {
  theme: 'dark' | 'light';
  currency: 'USD' | 'EUR' | 'GBP' | 'JPY' | 'INR';
  currencySymbol: string;
  currencyRate: number; // multiplier from USD
  language: string;
  offlineCacheEnabled: boolean;
  soundEffects: boolean;
}
