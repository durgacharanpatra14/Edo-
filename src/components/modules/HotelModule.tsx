import React, { useState, useMemo } from 'react';
import {
  Search,
  Calendar,
  Users,
  Star,
  MapPin,
  Check,
  X,
  SlidersHorizontal,
  Wifi,
  Coffee,
  Sparkles,
  ArrowRight,
  Info,
  Building,
  BookmarkCheck,
  Trash2
} from 'lucide-react';
import { Hotel, HotelBooking, RoomType, AppSettings, UserProfile } from '../../types';
import { INITIAL_HOTELS } from '../../data/mockHotels';
import { formatPrice } from '../../utils/storage';

interface HotelModuleProps {
  settings: AppSettings;
  user: UserProfile;
  bookings: HotelBooking[];
  onBookHotel: (booking: HotelBooking) => void;
  onCancelBooking: (bookingId: string) => void;
}

export const HotelModule: React.FC<HotelModuleProps> = ({
  settings,
  user,
  bookings,
  onBookHotel,
  onCancelBooking
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'explore' | 'bookings'>('explore');
  const [searchDestination, setSearchDestination] = useState('');
  const [checkInDate, setCheckInDate] = useState('2026-11-15');
  const [checkOutDate, setCheckOutDate] = useState('2026-11-18');
  const [guestsCount, setGuestsCount] = useState(2);
  const [roomsCount, setRoomsCount] = useState(1);

  // Filters
  const [showFilters, setShowFilters] = useState(false);
  const [minRating, setMinRating] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(400);
  const [selectedAmenity, setSelectedAmenity] = useState<string>('All');

  // Detail Modal State
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedRoom, setSelectedRoom] = useState<RoomType | null>(null);
  const [specialRequests, setSpecialRequests] = useState('');

  // Booking Confirmation modal
  const [confirmedBooking, setConfirmedBooking] = useState<HotelBooking | null>(null);

  // Quick City Suggestions
  const POPULAR_CITIES = ['Tokyo', 'Paris', 'New York', 'Bali', 'London', 'Dubai'];

  const allAmenities = useMemo(() => {
    const set = new Set<string>();
    INITIAL_HOTELS.forEach((h) => h.facilities.forEach((f) => set.add(f)));
    return ['All', ...Array.from(set)];
  }, []);

  // Filtered Hotels
  const filteredHotels = useMemo(() => {
    return INITIAL_HOTELS.filter((hotel) => {
      if (searchDestination.trim()) {
        const query = searchDestination.toLowerCase().trim();
        const matchCity = hotel.city.toLowerCase().includes(query);
        const matchCountry = hotel.country.toLowerCase().includes(query);
        const matchName = hotel.name.toLowerCase().includes(query);
        if (!matchCity && !matchCountry && !matchName) return false;
      }

      if (hotel.pricePerNight > maxPrice) return false;
      if (hotel.rating < minRating) return false;

      if (selectedAmenity !== 'All') {
        const hasAmenity = hotel.facilities.some((f) =>
          f.toLowerCase().includes(selectedAmenity.toLowerCase())
        );
        if (!hasAmenity) return false;
      }

      return true;
    });
  }, [searchDestination, maxPrice, minRating, selectedAmenity]);

  // Compute number of nights
  const calculateNights = () => {
    try {
      const d1 = new Date(checkInDate);
      const d2 = new Date(checkOutDate);
      const diffTime = d2.getTime() - d1.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays > 0 ? diffDays : 1;
    } catch {
      return 1;
    }
  };

  const handleOpenDetail = (hotel: Hotel) => {
    setSelectedHotel(hotel);
    setActiveImageIndex(0);
    setSelectedRoom(hotel.roomTypes[0] || null);
    setSpecialRequests('');
  };

  const handleConfirmReservation = () => {
    if (!selectedHotel || !selectedRoom) return;

    const nights = calculateNights();
    const totalPrice = selectedRoom.pricePerNight * nights * roomsCount;
    const refCode = `EDO-${selectedHotel.city.slice(0, 3).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const newBooking: HotelBooking = {
      id: `bkg-${Date.now()}`,
      hotelId: selectedHotel.id,
      hotelName: selectedHotel.name,
      hotelImage: selectedHotel.image,
      hotelLocation: `${selectedHotel.city}, ${selectedHotel.country}`,
      checkInDate,
      checkOutDate,
      guests: guestsCount,
      rooms: roomsCount,
      roomTypeName: selectedRoom.name,
      totalPrice,
      currency: settings.currency,
      bookingDate: new Date().toISOString().split('T')[0],
      status: 'confirmed',
      referenceCode: refCode,
      guestName: user.name,
      guestEmail: user.email,
      specialRequests: specialRequests.trim() || undefined
    };

    onBookHotel(newBooking);
    setSelectedHotel(null);
    setConfirmedBooking(newBooking);
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Sub-navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-600 dark:text-cyan-400 text-xs font-semibold mb-1">
            <Building className="w-3.5 h-3.5" />
            Module 1: Hotel Booking
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Find & Reserve Accommodations
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Curated stays with guaranteed transparent arrival and verified amenities.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center rounded-xl bg-slate-200/70 dark:bg-slate-800/80 p-1 self-start sm:self-auto">
          <button
            onClick={() => setActiveSubTab('explore')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
              activeSubTab === 'explore'
                ? 'bg-cyan-500 text-slate-900 shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:text-white'
            }`}
          >
            Explore Hotels
          </button>
          <button
            onClick={() => setActiveSubTab('bookings')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 cursor-pointer ${
              activeSubTab === 'bookings'
                ? 'bg-cyan-500 text-slate-900 shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:text-white'
            }`}
          >
            <BookmarkCheck className="w-3.5 h-3.5" />
            My Bookings
            {bookings.length > 0 && (
              <span className="w-4 h-4 rounded-full bg-slate-900 text-cyan-400 text-[10px] flex items-center justify-center font-bold">
                {bookings.length}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Transparent Sample Data Notice Banner */}
      <div className="flex items-start gap-2.5 p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-700 dark:text-cyan-300 text-xs leading-relaxed">
        <Info className="w-4 h-4 shrink-0 text-cyan-500 mt-0.5" />
        <div>
          <span className="font-semibold">Demonstration Mode:</span> Hotel listings and sample reservations are demonstration data designed for MVP exploration. No real credit card or external booking provider is charged. Real hotel distribution APIs (e.g. Amadeus or Booking) connect seamlessly via backend proxy.
        </div>
      </div>

      {activeSubTab === 'explore' && (
        <>
          {/* Search Card */}
          <div className="p-4 sm:p-5 rounded-2xl glass-card border border-cyan-500/20 shadow-lg space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              {/* Destination */}
              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-cyan-500" />
                  Destination City or Hotel
                </label>
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchDestination}
                    onChange={(e) => setSearchDestination(e.target.value)}
                    placeholder="Where are you traveling? (e.g. Tokyo, Paris...)"
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-white dark:bg-slate-800/90 border border-slate-300 dark:border-slate-700 focus:outline-none focus:border-cyan-400 text-slate-900 dark:text-white"
                  />
                  {searchDestination && (
                    <button
                      onClick={() => setSearchDestination('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Dates */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-cyan-500" />
                  Check-in / Check-out
                </label>
                <div className="grid grid-cols-2 gap-1.5">
                  <input
                    type="date"
                    value={checkInDate}
                    onChange={(e) => setCheckInDate(e.target.value)}
                    className="w-full px-2 py-2 text-[11px] rounded-xl bg-white dark:bg-slate-800/90 border border-slate-300 dark:border-slate-700 focus:outline-none focus:border-cyan-400 text-slate-900 dark:text-white"
                  />
                  <input
                    type="date"
                    value={checkOutDate}
                    onChange={(e) => setCheckOutDate(e.target.value)}
                    className="w-full px-2 py-2 text-[11px] rounded-xl bg-white dark:bg-slate-800/90 border border-slate-300 dark:border-slate-700 focus:outline-none focus:border-cyan-400 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              {/* Guests & Rooms */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1">
                  <Users className="w-3.5 h-3.5 text-cyan-500" />
                  Guests & Rooms
                </label>
                <div className="grid grid-cols-2 gap-1.5">
                  <select
                    value={guestsCount}
                    onChange={(e) => setGuestsCount(Number(e.target.value))}
                    className="w-full px-2 py-2 text-xs rounded-xl bg-white dark:bg-slate-800/90 border border-slate-300 dark:border-slate-700 focus:outline-none focus:border-cyan-400 text-slate-900 dark:text-white"
                  >
                    {[1, 2, 3, 4, 6].map((n) => (
                      <option key={n} value={n}>
                        {n} {n === 1 ? 'Guest' : 'Guests'}
                      </option>
                    ))}
                  </select>
                  <select
                    value={roomsCount}
                    onChange={(e) => setRoomsCount(Number(e.target.value))}
                    className="w-full px-2 py-2 text-xs rounded-xl bg-white dark:bg-slate-800/90 border border-slate-300 dark:border-slate-700 focus:outline-none focus:border-cyan-400 text-slate-900 dark:text-white"
                  >
                    {[1, 2, 3].map((n) => (
                      <option key={n} value={n}>
                        {n} {n === 1 ? 'Room' : 'Rooms'}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Quick City Chips & Filter Trigger */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-slate-200 dark:border-slate-700/60">
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
                <span className="text-[11px] font-medium text-slate-500 shrink-0">Popular:</span>
                {POPULAR_CITIES.map((city) => (
                  <button
                    key={city}
                    type="button"
                    onClick={() => setSearchDestination(city)}
                    className={`px-2.5 py-1 rounded-full text-xs transition cursor-pointer shrink-0 ${
                      searchDestination.toLowerCase() === city.toLowerCase()
                        ? 'bg-cyan-500 text-slate-900 font-bold'
                        : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    {city}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={() => setShowFilters(!showFilters)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer ${
                  showFilters
                    ? 'bg-cyan-500 text-slate-900'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:border-cyan-400 border border-slate-300 dark:border-slate-700'
                }`}
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                Filters {minRating > 0 || maxPrice < 400 || selectedAmenity !== 'All' ? '•' : ''}
              </button>
            </div>

            {/* Expandable Filters Tray */}
            {showFilters && (
              <div className="p-4 rounded-xl bg-slate-100/80 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-4 animate-fadeIn">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Max Price Slider */}
                  <div>
                    <div className="flex items-center justify-between text-xs font-semibold mb-1">
                      <span>Max Price / Night</span>
                      <span className="text-cyan-500 font-bold">{formatPrice(maxPrice, settings.currency)}</span>
                    </div>
                    <input
                      type="range"
                      min={80}
                      max={400}
                      step={20}
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(Number(e.target.value))}
                      className="w-full accent-cyan-500 cursor-pointer"
                    />
                  </div>

                  {/* Min Rating */}
                  <div>
                    <div className="flex items-center justify-between text-xs font-semibold mb-1">
                      <span>Minimum Rating</span>
                      <span className="text-amber-400 font-bold">{minRating > 0 ? `${minRating}+ Stars` : 'Any'}</span>
                    </div>
                    <div className="flex gap-1">
                      {[0, 4.5, 4.7, 4.9].map((rating) => (
                        <button
                          key={rating}
                          type="button"
                          onClick={() => setMinRating(rating)}
                          className={`flex-1 py-1 text-xs rounded-lg font-medium cursor-pointer ${
                            minRating === rating
                              ? 'bg-cyan-500 text-slate-900 font-bold'
                              : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                          }`}
                        >
                          {rating === 0 ? 'All' : `${rating}★`}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Amenity Filter */}
                  <div>
                    <label className="block text-xs font-semibold mb-1">Facility Filter</label>
                    <select
                      value={selectedAmenity}
                      onChange={(e) => setSelectedAmenity(e.target.value)}
                      className="w-full px-2 py-1.5 text-xs rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 focus:outline-none focus:border-cyan-400"
                    >
                      {allAmenities.map((amenity) => (
                        <option key={amenity} value={amenity}>
                          {amenity}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => {
                      setMinRating(0);
                      setMaxPrice(400);
                      setSelectedAmenity('All');
                    }}
                    className="text-xs text-slate-500 dark:text-slate-400 hover:text-cyan-400 underline cursor-pointer"
                  >
                    Reset Filters
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Hotel Results Grid */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-medium">
              <span>Showing {filteredHotels.length} verified stays</span>
              <span>{calculateNights()} night stay</span>
            </div>

            {filteredHotels.length === 0 ? (
              <div className="text-center py-12 rounded-2xl glass-card border border-cyan-500/20 p-8">
                <Building className="w-10 h-10 text-cyan-400 mx-auto mb-2 opacity-60" />
                <h3 className="font-bold text-base text-slate-900 dark:text-white">No hotels match your filters</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Try adjusting the destination city or relaxing the price/amenity filter.
                </p>
                <button
                  onClick={() => {
                    setSearchDestination('');
                    setMinRating(0);
                    setMaxPrice(400);
                    setSelectedAmenity('All');
                  }}
                  className="mt-4 px-4 py-2 rounded-xl bg-cyan-500 text-slate-900 text-xs font-bold"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredHotels.map((hotel) => (
                  <div
                    key={hotel.id}
                    className="group rounded-2xl glass-card border border-cyan-500/20 overflow-hidden hover:border-cyan-400/50 transition-all duration-300 flex flex-col shadow-md hover:shadow-cyan-500/10"
                  >
                    {/* Hotel Image with Badges */}
                    <div className="relative h-48 overflow-hidden bg-slate-800">
                      <img
                        src={hotel.image}
                        alt={hotel.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

                      {/* Top Badges */}
                      <div className="absolute top-3 left-3 flex gap-1.5">
                        {hotel.badge && (
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-cyan-500 text-slate-950 shadow-md">
                            {hotel.badge}
                          </span>
                        )}
                      </div>

                      {/* Rating pill */}
                      <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-amber-300 text-xs font-bold border border-white/10">
                        <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
                        <span>{hotel.rating}</span>
                        <span className="text-[10px] text-slate-300">({hotel.reviewCount})</span>
                      </div>

                      {/* City Name at Bottom */}
                      <div className="absolute bottom-2.5 left-3 flex items-center gap-1 text-white text-xs font-medium">
                        <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                        <span>{hotel.city}, {hotel.country}</span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                      <div>
                        <h3 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-cyan-500 dark:group-hover:text-cyan-400 transition leading-snug">
                          {hotel.name}
                        </h3>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 mt-1">
                          {hotel.description}
                        </p>
                      </div>

                      {/* Amenities Pills */}
                      <div className="flex flex-wrap gap-1">
                        {hotel.facilities.slice(0, 3).map((facility, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 rounded-md text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-medium"
                          >
                            {facility}
                          </span>
                        ))}
                        {hotel.facilities.length > 3 && (
                          <span className="px-1.5 py-0.5 rounded-md text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-400 font-medium">
                            +{hotel.facilities.length - 3}
                          </span>
                        )}
                      </div>

                      {/* Price & Action Button */}
                      <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                        <div>
                          <div className="flex items-baseline gap-1">
                            <span className="text-base font-extrabold text-cyan-600 dark:text-cyan-400">
                              {formatPrice(hotel.pricePerNight, settings.currency)}
                            </span>
                            <span className="text-[10px] text-slate-400">/ night</span>
                          </div>
                          <span className="text-[10px] text-slate-500">
                            Total {formatPrice(hotel.pricePerNight * calculateNights() * roomsCount, settings.currency)} ({calculateNights()}n)
                          </span>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleOpenDetail(hotel)}
                          className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-slate-900 font-bold text-xs flex items-center gap-1 shadow-sm transition transform active:scale-95 cursor-pointer"
                        >
                          <span>View Hotel</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}

      {/* Bookings Tab */}
      {activeSubTab === 'bookings' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              My Demo Bookings ({bookings.length})
            </h2>
            <button
              onClick={() => setActiveSubTab('explore')}
              className="text-xs font-semibold text-cyan-600 dark:text-cyan-400 hover:underline"
            >
              + Book Another Stay
            </button>
          </div>

          {bookings.length === 0 ? (
            <div className="text-center py-12 rounded-2xl glass-card border border-cyan-500/20 p-8">
              <Building className="w-10 h-10 text-cyan-400 mx-auto mb-2 opacity-60" />
              <h3 className="font-bold text-base text-slate-900 dark:text-white">No Bookings Yet</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
                Explore hotels above and make a sample reservation to test booking confirmation and itinerary management.
              </p>
              <button
                onClick={() => setActiveSubTab('explore')}
                className="mt-4 px-4 py-2 rounded-xl bg-cyan-500 text-slate-900 text-xs font-bold"
              >
                Browse Hotels
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {bookings.map((bkg) => (
                <div
                  key={bkg.id}
                  className="rounded-2xl glass-card border border-cyan-500/20 p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="flex items-start sm:items-center gap-4">
                    <img
                      src={bkg.hotelImage}
                      alt={bkg.hotelName}
                      className="w-20 h-20 rounded-xl object-cover ring-1 ring-cyan-500/30 shrink-0"
                    />
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-slate-900 dark:text-white">
                          {bkg.hotelName}
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                            bkg.status === 'confirmed'
                              ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/30'
                              : 'bg-rose-500/10 text-rose-500 border border-rose-500/30'
                          }`}
                        >
                          {bkg.status}
                        </span>
                      </div>

                      <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-cyan-500" />
                        {bkg.hotelLocation} • {bkg.roomTypeName}
                      </p>

                      <div className="text-xs text-slate-600 dark:text-slate-300 flex items-center gap-2">
                        <span>Check-in: <strong>{bkg.checkInDate}</strong></span>
                        <span>•</span>
                        <span>Check-out: <strong>{bkg.checkOutDate}</strong></span>
                      </div>

                      <p className="text-[11px] text-cyan-600 dark:text-cyan-400 font-mono font-medium">
                        Ref: {bkg.referenceCode} • Booked for: {bkg.guestName}
                      </p>
                    </div>
                  </div>

                  <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-200 dark:border-slate-800 gap-2">
                    <div className="text-left sm:text-right">
                      <div className="text-base font-extrabold text-cyan-600 dark:text-cyan-400">
                        {formatPrice(bkg.totalPrice, settings.currency)}
                      </div>
                      <span className="text-[10px] text-slate-400">
                        {bkg.rooms} room, {bkg.guests} guests
                      </span>
                    </div>

                    {bkg.status === 'confirmed' ? (
                      <button
                        onClick={() => onCancelBooking(bkg.id)}
                        className="px-3 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 text-xs font-semibold flex items-center gap-1 border border-rose-500/30 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        Cancel Demo Stay
                      </button>
                    ) : (
                      <span className="text-xs text-slate-400 italic">Reservation Cancelled</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Hotel Detail & Booking Modal */}
      {selectedHotel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="w-full max-w-2xl rounded-2xl p-5 sm:p-6 glass-panel border border-cyan-500/30 shadow-2xl relative text-slate-800 dark:text-slate-100 max-h-[92vh] overflow-y-auto space-y-5">
            <button
              onClick={() => setSelectedHotel(null)}
              aria-label="Close hotel details"
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition text-slate-400 hover:text-white cursor-pointer z-10"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Gallery */}
            <div className="space-y-2">
              <div className="relative h-60 sm:h-72 rounded-2xl overflow-hidden bg-slate-900">
                <img
                  src={selectedHotel.gallery[activeImageIndex] || selectedHotel.image}
                  alt={selectedHotel.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-cyan-500 text-slate-900 text-xs font-bold shadow-md">
                  {selectedHotel.badge || 'Verified Stay'}
                </div>
                <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-white text-xs font-semibold">
                  Photo {activeImageIndex + 1} of {selectedHotel.gallery.length}
                </div>
              </div>

              {/* Thumbnails */}
              <div className="flex gap-2 overflow-x-auto pb-1">
                {selectedHotel.gallery.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-16 h-12 rounded-xl overflow-hidden shrink-0 border-2 transition cursor-pointer ${
                      activeImageIndex === idx ? 'border-cyan-400 scale-102' : 'border-transparent opacity-60'
                    }`}
                  >
                    <img src={img} alt={`Gallery ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Info Header */}
            <div>
              <div className="flex items-center justify-between">
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
                  {selectedHotel.name}
                </h2>
                <div className="flex items-center gap-1 text-amber-400 font-bold text-sm">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <span>{selectedHotel.rating}</span>
                </div>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-1">
                <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                {selectedHotel.address}
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                {selectedHotel.description}
              </p>
            </div>

            {/* Facilities */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400 mb-2">
                Available Hotel Facilities
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedHotel.facilities.map((fac, idx) => (
                  <span
                    key={idx}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-medium border border-slate-200 dark:border-slate-700/60"
                  >
                    <Check className="w-3.5 h-3.5 text-cyan-500" />
                    {fac}
                  </span>
                ))}
              </div>
            </div>

            {/* Room Type Selector */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400 mb-2">
                Select Room Category
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {selectedHotel.roomTypes.map((room) => {
                  const isSelected = selectedRoom?.id === room.id;
                  return (
                    <div
                      key={room.id}
                      onClick={() => setSelectedRoom(room)}
                      className={`p-3.5 rounded-xl border-2 transition cursor-pointer ${
                        isSelected
                          ? 'border-cyan-400 bg-cyan-500/10'
                          : 'border-slate-200 dark:border-slate-800 hover:border-cyan-500/40 bg-slate-100/50 dark:bg-slate-800/40'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-slate-900 dark:text-white">
                          {room.name}
                        </span>
                        <span className="font-extrabold text-xs text-cyan-500">
                          {formatPrice(room.pricePerNight, settings.currency)}/n
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                        {room.bedType} • Up to {room.capacity} guests
                      </p>
                      <div className="mt-2 space-y-1">
                        {room.features.map((feat, i) => (
                          <div key={i} className="text-[10px] text-slate-600 dark:text-slate-300 flex items-center gap-1">
                            <span className="w-1 h-1 rounded-full bg-cyan-400" />
                            {feat}
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Special Requests */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Special Requests (Optional)
              </label>
              <textarea
                value={specialRequests}
                onChange={(e) => setSpecialRequests(e.target.value)}
                placeholder="e.g. Quiet room away from elevator, early luggage drop-off..."
                rows={2}
                className="w-full px-3 py-2 text-xs rounded-xl bg-slate-100 dark:bg-slate-800/90 border border-slate-300 dark:border-slate-700 focus:outline-none focus:border-cyan-400 text-slate-900 dark:text-white resize-none"
              />
            </div>

            {/* Reservation Summary & Booking Action */}
            <div className="p-4 rounded-xl bg-slate-100/80 dark:bg-slate-800/80 border border-cyan-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Total for {calculateNights()} night(s) ({roomsCount} room):
                </p>
                <div className="text-xl font-extrabold text-cyan-500">
                  {formatPrice((selectedRoom?.pricePerNight || selectedHotel.pricePerNight) * calculateNights() * roomsCount, settings.currency)}
                </div>
                <p className="text-[10px] text-slate-400">
                  Includes taxes, city resort fee & free cancellation in demo mode.
                </p>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => setSelectedHotel(null)}
                  className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-xs font-medium cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleConfirmReservation}
                  className="flex-1 sm:flex-initial px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-slate-900 font-bold text-xs shadow-lg shadow-cyan-500/25 transition cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <BookmarkCheck className="w-4 h-4" />
                  Confirm Demo Stay
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Booking Confirmed Modal */}
      {confirmedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="w-full max-w-md rounded-2xl p-6 glass-panel border border-cyan-500/40 shadow-2xl relative text-center text-slate-800 dark:text-slate-100 space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-500 to-teal-400 flex items-center justify-center mx-auto shadow-lg shadow-cyan-500/40">
              <Check className="w-8 h-8 text-slate-950 stroke-[3]" />
            </div>

            <div>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-cyan-500/20 text-cyan-500 border border-cyan-500/30">
                Demo Reservation Confirmed
              </span>
              <h3 className="text-xl font-bold mt-2 text-slate-900 dark:text-white">
                You're Ready for Arrival!
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Your demo stay has been saved to your local offline bookings list.
              </p>
            </div>

            {/* Summary card */}
            <div className="p-3.5 rounded-xl bg-slate-100 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 text-left text-xs space-y-2">
              <div className="flex justify-between items-center pb-2 border-b border-slate-200 dark:border-slate-700">
                <span className="text-slate-500 dark:text-slate-400">Reference:</span>
                <span className="font-mono font-bold text-cyan-500">{confirmedBooking.referenceCode}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-slate-400">Hotel:</span>
                <span className="font-semibold text-slate-900 dark:text-white">{confirmedBooking.hotelName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-slate-400">Dates:</span>
                <span className="font-medium">{confirmedBooking.checkInDate} to {confirmedBooking.checkOutDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-slate-400">Total:</span>
                <span className="font-extrabold text-cyan-500">{formatPrice(confirmedBooking.totalPrice, settings.currency)}</span>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => {
                  setConfirmedBooking(null);
                  setActiveSubTab('bookings');
                }}
                className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 text-slate-900 font-bold text-xs transition cursor-pointer"
              >
                View in My Bookings
              </button>
              <button
                type="button"
                onClick={() => setConfirmedBooking(null)}
                className="px-4 py-2.5 rounded-xl bg-slate-200 dark:bg-slate-700 text-xs font-semibold cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
