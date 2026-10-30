import { Hotel } from '../types';

export const INITIAL_HOTELS: Hotel[] = [
  {
    id: 'htl-1',
    name: 'The Glasshouse Aqua Resort',
    city: 'Tokyo',
    country: 'Japan',
    address: '2-11-3 Minami-Aoyama, Minato-ku, Tokyo',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80'
    ],
    pricePerNight: 165,
    currency: 'USD',
    rating: 4.9,
    reviewCount: 428,
    badge: 'Popular',
    facilities: ['High-speed WiFi', 'Infinity Pool', 'Spa & Onsen', 'Airport Shuttle', 'Artisan Breakfast', 'Fitness Center', 'Multilingual Concierge'],
    description: 'An architectural glass sanctuary blending traditional Japanese hospitality with cutting-edge comfort. Located 5 minutes from Omotesando subway station with serene garden views.',
    roomTypes: [
      {
        id: 'rm-101',
        name: 'Deluxe Aqua King Suite',
        pricePerNight: 165,
        capacity: 2,
        bedType: '1 King Bed',
        features: ['Skyline Garden View', 'Deep Soaking Tub', 'Complimentary Nespresso', 'High-speed Fiber']
      },
      {
        id: 'rm-102',
        name: 'Executive Zen Double',
        pricePerNight: 220,
        capacity: 4,
        bedType: '2 Queen Beds',
        features: ['Executive Lounge Access', 'Private Balcony', 'Onsen Pass Included', 'Late 2PM Checkout']
      }
    ],
    checkInTime: '15:00',
    checkOutTime: '11:00'
  },
  {
    id: 'htl-2',
    name: 'Le Grand Cyan Palace',
    city: 'Paris',
    country: 'France',
    address: '14 Rue de Rivoli, 1er Arrondissement, Paris',
    image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=80'
    ],
    pricePerNight: 210,
    currency: 'USD',
    rating: 4.8,
    reviewCount: 312,
    badge: 'Luxury',
    facilities: ['High-speed WiFi', 'Rooftop Bistro', 'Room Service', 'Airport Chauffeur', 'French Breakfast', 'Pet-Friendly', 'Air Conditioning'],
    description: 'Boutique Parisian elegance overlooking the Tuileries Garden and Musée du Louvre. Features historical Haussmann interiors enhanced with contemporary aqua accents.',
    roomTypes: [
      {
        id: 'rm-201',
        name: 'Classic Parisian Queen',
        pricePerNight: 210,
        capacity: 2,
        bedType: '1 Queen Bed',
        features: ['Tuileries Courtyard View', 'Marble Bathroom', 'Dior Amenities', 'Nespresso Machine']
      },
      {
        id: 'rm-202',
        name: 'Eiffel View Prestige Suite',
        pricePerNight: 340,
        capacity: 3,
        bedType: '1 King Bed + 1 Sofa Bed',
        features: ['Direct Eiffel Tower Panorama', 'Complimentary Champagne', 'VIP Museum Fast Track', 'Butler Service']
      }
    ],
    checkInTime: '14:00',
    checkOutTime: '12:00'
  },
  {
    id: 'htl-3',
    name: 'Metropolitan Horizon Hotel',
    city: 'New York',
    country: 'United States',
    address: '450 West 33rd Street, Manhattan, New York',
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1568495248636-6432b97bd949?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=1200&q=80'
    ],
    pricePerNight: 195,
    currency: 'USD',
    rating: 4.7,
    reviewCount: 580,
    badge: 'Near Station',
    facilities: ['High-speed WiFi', '24/7 Gym', 'Subway Access Tunnel', 'Sky Bar', 'Business Hub', 'Valet Parking', 'EV Charging'],
    description: 'Directly adjacent to Hudson Yards and Penn Station. Sleek glass high-rise offering panoramic Manhattan skyline vistas, co-working lounges, and express airport transit connectivity.',
    roomTypes: [
      {
        id: 'rm-301',
        name: 'Skyline Urban King',
        pricePerNight: 195,
        capacity: 2,
        bedType: '1 King Bed',
        features: ['Floor-to-Ceiling Windows', 'Walk-in Rain Shower', 'Ergonomic Work Desk', 'Smart Home Controls']
      },
      {
        id: 'rm-302',
        name: 'Manhattan Double Studio',
        pricePerNight: 260,
        capacity: 4,
        bedType: '2 Double Beds',
        features: ['Hudson River Sunset View', 'Kitchenette & Microwave', 'Smart 65-inch TV', 'Soundproof Acoustic Glass']
      }
    ],
    checkInTime: '16:00',
    checkOutTime: '11:00'
  },
  {
    id: 'htl-4',
    name: 'Sanctuary Bay Eco Villas',
    city: 'Bali',
    country: 'Indonesia',
    address: 'Jalan Pantai Bingin, Uluwatu, Bali',
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80'
    ],
    pricePerNight: 120,
    currency: 'USD',
    rating: 4.95,
    reviewCount: 264,
    badge: 'Eco Friendly',
    facilities: ['High-speed WiFi', 'Private Plunge Pool', 'Ayurvedic Spa', 'Organic Dining', 'Surf Gear Rental', 'Yoga Shala', 'Airport Shuttle'],
    description: 'Sustainable tropical oasis perched on Uluwatu cliffs. Crafted with bamboo, limestone, and open-air pavilion designs overlooking pristine surf breaks.',
    roomTypes: [
      {
        id: 'rm-401',
        name: 'Bamboo Lagoon Villa',
        pricePerNight: 120,
        capacity: 2,
        bedType: '1 King Canopy Bed',
        features: ['Private Infinity Plunge', 'Outdoor Tropical Shower', 'Daily Organic Breakfast', 'Afternoon Tea']
      },
      {
        id: 'rm-402',
        name: 'Ocean Cliff Pavillion',
        pricePerNight: 190,
        capacity: 3,
        bedType: '1 King Bed + 1 Daybed',
        features: ['180-Degree Sunset Ocean Vista', 'Private Butler', 'Complimentary Scooter', 'Daily Yoga Session']
      }
    ],
    checkInTime: '14:00',
    checkOutTime: '12:00'
  },
  {
    id: 'htl-5',
    name: 'Kensington Garden Suites',
    city: 'London',
    country: 'United Kingdom',
    address: '28 Kensington High Street, London',
    image: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=1200&q=80'
    ],
    pricePerNight: 180,
    currency: 'USD',
    rating: 4.75,
    reviewCount: 390,
    badge: 'Best Value',
    facilities: ['High-speed WiFi', 'English Tea Lounge', 'Gym', 'Tube Station 2 Min', 'Complimentary Breakfast', 'Luggage Storage', 'Air Conditioning'],
    description: 'Charming Victorian boutique residence situated moments from Hyde Park, Kensington Palace, and High Street Kensington Underground Station.',
    roomTypes: [
      {
        id: 'rm-501',
        name: 'Classic Hyde Park Queen',
        pricePerNight: 180,
        capacity: 2,
        bedType: '1 Queen Bed',
        features: ['Park Garden View', 'Molton Brown Toiletries', 'Traditional Afternoon Tea', 'Nespresso Coffee']
      }
    ],
    checkInTime: '15:00',
    checkOutTime: '11:00'
  },
  {
    id: 'htl-6',
    name: 'Marina Sky Oasis & Spa',
    city: 'Dubai',
    country: 'United Arab Emirates',
    address: 'Al Marsa Street, Dubai Marina, Dubai',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=80'
    ],
    pricePerNight: 230,
    currency: 'USD',
    rating: 4.88,
    reviewCount: 512,
    badge: 'Luxury',
    facilities: ['High-speed WiFi', 'Infinity Sky Pool', 'Marina Boardwalk Access', 'Luxury Spa', 'Valet Parking', 'Airport Limo Service', 'Fine Dining'],
    description: 'Iconic Marina waterfront hotel featuring dazzling glass architecture, 50th-floor skyline pool, private yacht charters, and direct link to the Marina Mall tram.',
    roomTypes: [
      {
        id: 'rm-601',
        name: 'Marina View Grand King',
        pricePerNight: 230,
        capacity: 2,
        bedType: '1 King Bed',
        features: ['Marina Yacht View', 'Balcony Seating', 'Rain Shower & Jacuzzi', 'Pillow Menu']
      }
    ],
    checkInTime: '15:00',
    checkOutTime: '12:00'
  }
];
