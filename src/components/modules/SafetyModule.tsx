import React, { useState } from 'react';
import {
  ShieldAlert,
  PhoneCall,
  UserPlus,
  Heart,
  AlertTriangle,
  Info,
  CheckCircle,
  X,
  Trash2,
  Share2,
  ChevronDown,
  ChevronUp,
  Flame,
  Ambulance,
  Shield,
  FileCheck,
  Moon,
  Train
} from 'lucide-react';
import { EmergencyContact, CountryEmergency, UserProfile } from '../../types';
import { COUNTRY_EMERGENCY_DATA, SAFETY_GUIDES } from '../../data/safetyData';

interface SafetyModuleProps {
  user: UserProfile;
  contacts: EmergencyContact[];
  onAddContact: (contact: EmergencyContact) => void;
  onRemoveContact: (id: string) => void;
}

export const SafetyModule: React.FC<SafetyModuleProps> = ({
  user,
  contacts,
  onAddContact,
  onRemoveContact
}) => {
  const [selectedCountryCode, setSelectedCountryCode] = useState('JP');
  const [sosCountdown, setSosCountdown] = useState<number | null>(null);
  const [sosActive, setSosActive] = useState(false);
  const [countdownTimerId, setCountdownTimerId] = useState<NodeJS.Timeout | null>(null);

  // Add Contact Modal State
  const [showAddContactModal, setShowAddContactModal] = useState(false);
  const [newContactName, setNewContactName] = useState('');
  const [newContactRelation, setNewContactRelation] = useState('');
  const [newContactPhone, setNewContactPhone] = useState('');
  const [newContactEmail, setNewContactEmail] = useState('');
  const [contactError, setContactError] = useState('');

  // Expanded Safety Guide
  const [expandedGuideId, setExpandedGuideId] = useState<string>('sg-1');

  const currentCountry =
    COUNTRY_EMERGENCY_DATA.find((c) => c.code === selectedCountryCode) ||
    COUNTRY_EMERGENCY_DATA[0];

  // SOS activation triggers 5-second countdown
  const handleStartSos = () => {
    setSosCountdown(5);
    const interval = setInterval(() => {
      setSosCountdown((prev) => {
        if (prev === null || prev <= 1) {
          clearInterval(interval);
          setSosCountdown(null);
          setSosActive(true);
          return null;
        }
        return prev - 1;
      });
    }, 1000);
    setCountdownTimerId(interval);
  };

  const handleCancelSos = () => {
    if (countdownTimerId) {
      clearInterval(countdownTimerId);
      setCountdownTimerId(null);
    }
    setSosCountdown(null);
  };

  const handleSaveNewContact = (e: React.FormEvent) => {
    e.preventDefault();
    setContactError('');

    if (!newContactName.trim()) {
      setContactError('Please enter contact name.');
      return;
    }
    if (!newContactPhone.trim()) {
      setContactError('Please enter phone number.');
      return;
    }

    const newContact: EmergencyContact = {
      id: `ct-${Date.now()}`,
      name: newContactName.trim(),
      relationship: newContactRelation.trim() || 'Personal Contact',
      phone: newContactPhone.trim(),
      email: newContactEmail.trim() || undefined,
      isPrimary: contacts.length === 0
    };

    onAddContact(newContact);
    setShowAddContactModal(false);
    setNewContactName('');
    setNewContactRelation('');
    setNewContactPhone('');
    setNewContactEmail('');
  };

  const getGuideIcon = (category: string) => {
    switch (category) {
      case 'Night Safety':
        return <Moon className="w-4 h-4 text-cyan-400" />;
      case 'Public Transit':
        return <Train className="w-4 h-4 text-teal-400" />;
      case 'Scam Prevention':
        return <AlertTriangle className="w-4 h-4 text-amber-400" />;
      case 'Documents':
        return <FileCheck className="w-4 h-4 text-emerald-400" />;
      case 'Medical Emergencies':
      default:
        return <Heart className="w-4 h-4 text-rose-400" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-600 dark:text-cyan-400 text-xs font-semibold mb-1">
          <ShieldAlert className="w-3.5 h-3.5" />
          Module 4: Offline Safety Toolkit
        </div>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Offline Safety & Emergency Dispatcher
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Instant access to local emergency hotlines, medical identity cards, and personal contacts without internet.
        </p>
      </div>

      {/* Transparent Safety Notice */}
      <div className="flex items-start gap-2.5 p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-700 dark:text-cyan-300 text-xs leading-relaxed">
        <Info className="w-4 h-4 shrink-0 text-cyan-500 mt-0.5" />
        <div>
          <span className="font-semibold">Offline Access Guarantee:</span> All emergency phone numbers, medical notes, and safety guidelines stored in EDO are cached locally and work without cellular data or Wi-Fi. Tapping phone numbers directly launches your device's native telephone dialer.
        </div>
      </div>

      {/* Emergency Assistance Button (SOS) Hero Card */}
      <div className="p-5 sm:p-6 rounded-2xl glass-card border border-rose-500/40 shadow-xl bg-gradient-to-br from-rose-950/20 via-slate-900/60 to-cyan-950/20">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-rose-500/20 text-rose-400 border border-rose-500/30">
              Immediate Crisis Response
            </span>
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
              Emergency Assistance Toolkit
            </h2>
            <p className="text-xs text-slate-400 max-w-md">
              Tap to view your verified offline medical summary card, primary contacts, and local emergency dispatch. Includes a 5-second accidental press safety countdown.
            </p>
          </div>

          <div>
            {sosCountdown === null ? (
              <button
                type="button"
                onClick={handleStartSos}
                className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-rose-600 via-rose-500 to-amber-500 hover:from-rose-500 hover:to-amber-400 text-white font-extrabold text-sm shadow-xl shadow-rose-600/30 flex items-center gap-2 transform active:scale-95 transition cursor-pointer"
              >
                <ShieldAlert className="w-5 h-5 text-white animate-pulse" />
                <span>Emergency SOS</span>
              </button>
            ) : (
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-full bg-rose-600 text-white flex items-center justify-center font-black text-xl animate-ping">
                  {sosCountdown}
                </div>
                <button
                  type="button"
                  onClick={handleCancelSos}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-200 text-xs font-bold border border-slate-700 hover:bg-slate-700 cursor-pointer"
                >
                  Cancel ({sosCountdown}s)
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* SOS Active Modal / Card */}
      {sosActive && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="w-full max-w-lg rounded-2xl p-6 glass-panel border border-rose-500/50 shadow-2xl relative text-slate-100 space-y-4 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSosActive(false)}
              aria-label="Close emergency view"
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-slate-800 transition text-slate-400 hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-rose-500/20 text-rose-500 flex items-center justify-center mx-auto mb-2 border border-rose-500/40">
                <ShieldAlert className="w-6 h-6 animate-pulse" />
              </div>
              <h3 className="text-xl font-black text-rose-400">Offline Emergency Medical Card</h3>
              <p className="text-xs text-slate-400">
                Show this screen to paramedics, doctors, or police officials.
              </p>
            </div>

            {/* Medical Info */}
            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3 text-xs">
              <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                <span className="text-slate-400">Traveler Name:</span>
                <span className="font-bold text-white text-sm">{user.name}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 border-b border-slate-800 pb-2">
                <div>
                  <span className="text-slate-400 block text-[11px]">Blood Group:</span>
                  <span className="font-extrabold text-rose-400 text-base">{user.bloodGroup}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Allergies:</span>
                  <span className="font-bold text-amber-300">{user.allergies}</span>
                </div>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Primary Contact:</span>
                <span className="font-semibold text-white">
                  {user.emergencyContactName} ({user.emergencyContactPhone})
                </span>
              </div>
            </div>

            {/* Action hotlines */}
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Call Local Services ({currentCountry.country}):
              </span>
              <div className="grid grid-cols-2 gap-2">
                <a
                  href={`tel:${currentCountry.police}`}
                  className="p-3 rounded-xl bg-rose-600/20 hover:bg-rose-600/30 text-rose-400 border border-rose-500/30 flex items-center justify-between text-xs font-bold transition"
                >
                  <span>Police ({currentCountry.police})</span>
                  <PhoneCall className="w-4 h-4" />
                </a>
                <a
                  href={`tel:${currentCountry.ambulance}`}
                  className="p-3 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/30 flex items-center justify-between text-xs font-bold transition"
                >
                  <span>Ambulance ({currentCountry.ambulance})</span>
                  <Ambulance className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Contact Alert SMS generator */}
            {user.emergencyContactPhone && (
              <a
                href={`sms:${user.emergencyContactPhone}?body=EMERGENCY:%20I%20am%20using%20EDO%20Travel%20App%20and%20require%20immediate%20assistance.%20My%20current%20location%20is%20${encodeURIComponent(currentCountry.country)}.`}
                className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 border border-slate-700 transition"
              >
                <Share2 className="w-4 h-4 text-cyan-400" />
                <span>Send Emergency SMS to {user.emergencyContactName}</span>
              </a>
            )}

            <button
              onClick={() => setSosActive(false)}
              className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs"
            >
              Close Emergency Screen
            </button>
          </div>
        </div>
      )}

      {/* Country Emergency Services Directory */}
      <div className="p-5 rounded-2xl glass-card border border-cyan-500/20 shadow-md space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <PhoneCall className="w-4 h-4 text-cyan-500" />
              Local Emergency Dispatch Directory
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Select your travel destination to view official emergency dialer hotlines.
            </p>
          </div>

          <div className="w-full sm:w-64">
            <select
              value={selectedCountryCode}
              onChange={(e) => setSelectedCountryCode(e.target.value)}
              className="w-full px-3 py-2 text-xs font-semibold rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 focus:outline-none focus:border-cyan-400 text-slate-900 dark:text-white"
            >
              {COUNTRY_EMERGENCY_DATA.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.flag} {c.country}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Numbers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Police */}
          <div className="p-3.5 rounded-xl bg-slate-100/70 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-500 flex items-center justify-center">
                <Shield className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-500 uppercase">Police</span>
                <p className="text-sm font-extrabold text-slate-900 dark:text-white">
                  {currentCountry.police}
                </p>
              </div>
            </div>
            <a
              href={`tel:${currentCountry.police}`}
              className="px-2.5 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold flex items-center gap-1 shadow-sm transition"
            >
              <PhoneCall className="w-3 h-3" />
              <span>Call</span>
            </a>
          </div>

          {/* Ambulance */}
          <div className="p-3.5 rounded-xl bg-slate-100/70 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-rose-500/20 text-rose-500 flex items-center justify-center">
                <Ambulance className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-500 uppercase">Ambulance</span>
                <p className="text-sm font-extrabold text-slate-900 dark:text-white">
                  {currentCountry.ambulance}
                </p>
              </div>
            </div>
            <a
              href={`tel:${currentCountry.ambulance}`}
              className="px-2.5 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold flex items-center gap-1 shadow-sm transition"
            >
              <PhoneCall className="w-3 h-3" />
              <span>Call</span>
            </a>
          </div>

          {/* Fire */}
          <div className="p-3.5 rounded-xl bg-slate-100/70 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-500 flex items-center justify-center">
                <Flame className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-500 uppercase">Fire</span>
                <p className="text-sm font-extrabold text-slate-900 dark:text-white">
                  {currentCountry.fire}
                </p>
              </div>
            </div>
            <a
              href={`tel:${currentCountry.fire}`}
              className="px-2.5 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold flex items-center gap-1 shadow-sm transition"
            >
              <PhoneCall className="w-3 h-3" />
              <span>Call</span>
            </a>
          </div>

          {/* Tourist Police */}
          <div className="p-3.5 rounded-xl bg-slate-100/70 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-teal-500/20 text-teal-500 flex items-center justify-center">
                <ShieldAlert className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-500 uppercase">Tourist Help</span>
                <p className="text-xs font-extrabold text-slate-900 dark:text-white truncate max-w-[90px]">
                  {currentCountry.touristPolice || currentCountry.generalEmergency}
                </p>
              </div>
            </div>
            <a
              href={`tel:${currentCountry.touristPolice || currentCountry.generalEmergency}`}
              className="px-2.5 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold flex items-center gap-1 shadow-sm transition"
            >
              <PhoneCall className="w-3 h-3" />
              <span>Call</span>
            </a>
          </div>
        </div>

        <p className="text-[11px] text-slate-500 dark:text-slate-400 italic">
          💡 {currentCountry.notes}
        </p>
      </div>

      {/* User-Configurable Emergency Contacts */}
      <div className="p-5 rounded-2xl glass-card border border-cyan-500/20 shadow-md space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              My Personal Emergency Contacts ({contacts.length})
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Saved offline for quick 1-tap calling and automated SMS alert dispatch.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowAddContactModal(true)}
            className="px-3 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-900 text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>Add Contact</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {contacts.map((contact) => (
            <div
              key={contact.id}
              className="p-3.5 rounded-xl bg-slate-100/70 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 flex items-center justify-between"
            >
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-xs text-slate-900 dark:text-white">
                    {contact.name}
                  </span>
                  {contact.isPrimary && (
                    <span className="px-1.5 py-0.2 rounded text-[9px] bg-cyan-500/20 text-cyan-400 font-bold">
                      Primary
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-500">{contact.relationship}</p>
                <p className="text-xs font-mono font-medium text-cyan-600 dark:text-cyan-400 mt-0.5">
                  {contact.phone}
                </p>
              </div>

              <div className="flex items-center gap-1.5">
                <a
                  href={`tel:${contact.phone}`}
                  aria-label={`Call ${contact.name}`}
                  className="p-2 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-500 transition"
                >
                  <PhoneCall className="w-4 h-4" />
                </a>

                {contacts.length > 1 && (
                  <button
                    type="button"
                    onClick={() => onRemoveContact(contact.id)}
                    aria-label={`Delete contact ${contact.name}`}
                    className="p-2 rounded-lg hover:bg-rose-500/10 text-slate-400 hover:text-rose-500 transition cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Travel Safety Guidelines */}
      <div className="p-5 rounded-2xl glass-card border border-cyan-500/20 shadow-md space-y-3">
        <h2 className="text-base font-bold text-slate-900 dark:text-white">
          Offline Travel Safety & Protocol Guides
        </h2>
        <div className="space-y-2">
          {SAFETY_GUIDES.map((guide) => {
            const isExpanded = expandedGuideId === guide.id;
            return (
              <div
                key={guide.id}
                className="rounded-xl bg-slate-100/60 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setExpandedGuideId(isExpanded ? '' : guide.id)}
                  className="w-full p-3.5 flex items-center justify-between text-left cursor-pointer hover:bg-slate-200/50 dark:hover:bg-slate-800/60 transition"
                >
                  <div className="flex items-center gap-2.5">
                    {getGuideIcon(guide.category)}
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                        {guide.title}
                      </h4>
                      <p className="text-[11px] text-slate-500">{guide.summary}</p>
                    </div>
                  </div>

                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-slate-400" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                  )}
                </button>

                {isExpanded && (
                  <div className="px-4 pb-4 pt-1 space-y-2 text-xs text-slate-600 dark:text-slate-300 border-t border-slate-200 dark:border-slate-800">
                    <ul className="space-y-1.5 list-disc pl-4 text-[11px] leading-relaxed">
                      {guide.tips.map((tip, idx) => (
                        <li key={idx}>{tip}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Add Contact Modal */}
      {showAddContactModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fadeIn">
          <div className="w-full max-w-sm rounded-2xl p-6 glass-panel border border-cyan-500/30 shadow-2xl relative text-slate-800 dark:text-slate-100">
            <button
              onClick={() => setShowAddContactModal(false)}
              aria-label="Close modal"
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-slate-800 transition text-slate-400 hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-bold text-base mb-1">Add Emergency Contact</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
              Stored locally on your device for one-tap calling.
            </p>

            {contactError && (
              <div className="p-2 mb-3 rounded-lg bg-rose-500/10 text-rose-500 text-xs">
                {contactError}
              </div>
            )}

            <form onSubmit={handleSaveNewContact} className="space-y-3">
              <div>
                <label className="block text-xs font-medium mb-1">Contact Name</label>
                <input
                  type="text"
                  placeholder="e.g. Maria Gonzalez"
                  value={newContactName}
                  onChange={(e) => setNewContactName(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-medium mb-1">Relationship</label>
                <input
                  type="text"
                  placeholder="e.g. Sister, Colleague, Hotel Concierge"
                  value={newContactRelation}
                  onChange={(e) => setNewContactRelation(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-medium mb-1">Telephone Number</label>
                <input
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  value={newContactPhone}
                  onChange={(e) => setNewContactPhone(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-medium mb-1">Email (Optional)</label>
                <input
                  type="email"
                  placeholder="maria@example.com"
                  value={newContactEmail}
                  onChange={(e) => setNewContactEmail(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold text-xs transition cursor-pointer"
                >
                  Save Contact
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddContactModal(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-200 dark:bg-slate-700 text-xs font-semibold"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
