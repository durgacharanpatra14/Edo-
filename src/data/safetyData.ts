import { CountryEmergency, SafetyGuide, EmergencyContact } from '../types';

export const COUNTRY_EMERGENCY_DATA: CountryEmergency[] = [
  {
    country: 'Japan',
    code: 'JP',
    flag: '🇯🇵',
    police: '110',
    ambulance: '119',
    fire: '119',
    touristPolice: '#9110 (Japan Police Help line in English)',
    generalEmergency: '110',
    notes: 'English operators available 24/7 on 110. State your location clearly using nearby station or landmark.'
  },
  {
    country: 'France / European Union',
    code: 'FR',
    flag: '🇫🇷',
    police: '17',
    ambulance: '15',
    fire: '18',
    touristPolice: '112',
    generalEmergency: '112',
    notes: '112 is the EU-wide free emergency number accessible from any mobile, even without a SIM card.'
  },
  {
    country: 'United Kingdom',
    code: 'GB',
    flag: '🇬🇧',
    police: '999',
    ambulance: '999',
    fire: '999',
    touristPolice: '101 (Non-Emergency)',
    generalEmergency: '999',
    notes: 'Dial 999 for genuine emergencies. Dial 101 for non-emergency police reporting or tourist assistance.'
  },
  {
    country: 'United States & Canada',
    code: 'US',
    flag: '🇺🇸',
    police: '911',
    ambulance: '911',
    fire: '911',
    touristPolice: '311 (City info / Non-emergency)',
    generalEmergency: '911',
    notes: 'Dial 911 anywhere in the US and Canada. Dispatcher can connect translation interpreters within 30 seconds.'
  },
  {
    country: 'India',
    code: 'IN',
    flag: '🇮🇳',
    police: '112',
    ambulance: '108',
    fire: '101',
    touristPolice: '1363 (Tourist Helpline)',
    generalEmergency: '112',
    notes: '112 is the unified national emergency number. 1363 is the 24x7 multi-lingual Tourist Helpline.'
  },
  {
    country: 'Thailand',
    code: 'TH',
    flag: '🇹🇭',
    police: '191',
    ambulance: '1669',
    fire: '199',
    touristPolice: '1155 (Tourist Police 24/7 English)',
    generalEmergency: '1155',
    notes: 'Tourist Police (1155) speak fluent English and can mediate taxi disputes, lost items, and medical emergencies.'
  },
  {
    country: 'Italy',
    code: 'IT',
    flag: '🇮🇹',
    police: '113',
    ambulance: '118',
    fire: '115',
    touristPolice: '112',
    generalEmergency: '112',
    notes: '112 connects to Carabinieri and emergency dispatch with multilingual operators in major tourist cities.'
  },
  {
    country: 'United Arab Emirates',
    code: 'AE',
    flag: '🇦🇪',
    police: '999',
    ambulance: '998',
    fire: '997',
    touristPolice: '901 (Non-Emergency / Dubai Police)',
    generalEmergency: '999',
    notes: 'Dubai Police app and 901 provide dedicated tourist assistance, lost item tracing, and cyber protection.'
  },
  {
    country: 'Australia',
    code: 'AU',
    flag: '🇦🇺',
    police: '000',
    ambulance: '000',
    fire: '000',
    touristPolice: '131 444 (Police Assistance)',
    generalEmergency: '000',
    notes: 'Triple Zero (000) is Australia primary emergency number. Works from any mobile carrier without credit.'
  }
];

export const SAFETY_GUIDES: SafetyGuide[] = [
  {
    id: 'sg-1',
    category: 'Night Safety',
    title: 'Safe Navigation After Dark',
    summary: 'Essential protocols for exploring cities safely at night.',
    icon: 'Moon',
    tips: [
      'Stick to illuminated arterial avenues; avoid poorly-lit shortcuts, alleyways, or deserted parks.',
      'Share your live itinerary or hotel address card with a trusted contact before heading out.',
      'Only board licensed metered taxis or rideshares registered in official apps. Check license plate match.',
      'Keep one earbud out if listening to audio so you remain aware of ambient surroundings and traffic.'
    ]
  },
  {
    id: 'sg-2',
    category: 'Public Transit',
    title: 'Metro, Bus & Station Vigilance',
    summary: 'Protect personal belongings and navigate transit terminals with confidence.',
    icon: 'Train',
    tips: [
      'Wear backpacks on your front in crowded train cars, elevators, and station platforms.',
      'Never place phones, wallets, or passports in loose outer pockets or open tote bags.',
      'Stand well behind the yellow tactile safety lines on rail platforms while waiting for trains.',
      'Save your route and station arrival instructions offline in EDO before entering subway tunnels.'
    ]
  },
  {
    id: 'sg-3',
    category: 'Scam Prevention',
    title: 'Recognizing Common Travel Traps',
    summary: 'How to avoid tourist overcharging, fake petitions, and rigged transit meters.',
    icon: 'ShieldAlert',
    tips: [
      'Ignore unsolicited strangers offering "closed attraction" detours to gemstone or tailor shops.',
      'Insist on the taxi meter being turned on before the car moves; or pre-negotiate fixed official airport fares.',
      'Do not sign street petitions, accept "free" friendship bracelets, or touch dropped gold rings.',
      'Always request an itemized bill at dining establishments before paying by card.'
    ]
  },
  {
    id: 'sg-4',
    category: 'Documents',
    title: 'Digital & Physical Document Protection',
    summary: 'Keeping passports, visas, insurance, and cards secure while on the move.',
    icon: 'FileCheck',
    tips: [
      'Keep photos and PDF copies of your passport photo page, visa, and health insurance stored offline in your device.',
      'Carry only one payment card and daily cash when walking; lock primary passport and backup cards in hotel safe.',
      'Save local embassy / consulate phone numbers in EDO emergency contacts before your trip begins.',
      'Note down international card cancellation hotline numbers separately in case of lost wallet.'
    ]
  },
  {
    id: 'sg-5',
    category: 'Medical Emergencies',
    title: 'Immediate First-Response Actions',
    summary: 'Critical steps when experiencing sudden illness or medical distress abroad.',
    icon: 'HeartPulse',
    tips: [
      'Locate the nearest international clinic or 24/7 hospital with English-speaking staff.',
      'Carry an emergency card (like the one generated in EDO) showing blood type, allergies, and chronic conditions.',
      'Call emergency dispatch immediately (112, 911, 119 depending on region) and specify your exact building landmark.',
      'Notify your travel insurance provider within 24 hours of hospital admission to authorize coverage.'
    ]
  }
];

export const DEFAULT_EMERGENCY_CONTACTS: EmergencyContact[] = [
  {
    id: 'ct-1',
    name: 'Local Emergency Dispatch (Unified)',
    relationship: 'Emergency Services',
    phone: '112',
    isPrimary: true
  },
  {
    id: 'ct-2',
    name: 'Sarah Jenkins',
    relationship: 'Family / Spouse',
    phone: '+1 (555) 349-8821',
    email: 'sarah.j@example.com',
    isPrimary: false
  }
];
