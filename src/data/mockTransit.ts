import { TransitOption } from '../types';

export const SAMPLE_TRANSIT_OPTIONS: TransitOption[] = [
  {
    id: 'tr-1',
    from: 'Narita International Airport (NRT)',
    to: 'The Glasshouse Aqua Resort, Tokyo',
    mode: 'metro',
    name: 'Keisei Skyliner Express + Tokyo Metro Ginza Line',
    summary: 'Fastest rail transit from Airport to Omotesando/Aoyama district',
    durationMinutes: 58,
    departureFrequency: 'Every 20 mins',
    estimatedFare: 22,
    currency: 'USD',
    distanceKm: 68.4,
    ecoScore: 'A+',
    crowdLevel: 'Moderate',
    firstDeparture: '05:40 AM',
    lastDeparture: '23:00 PM',
    stationArrivalTip: 'Look for orange "Keisei Line" signs after baggage claim at Terminal 1 or 2.',
    steps: [
      {
        stepNumber: 1,
        mode: 'metro',
        instruction: 'Board Keisei Skyliner towards Keisei-Ueno',
        durationMinutes: 36,
        detail: 'Reserved seat express train with dedicated luggage racks and free high-speed WiFi onboard.',
        stationOrStop: 'Narita Airport Station -> Nippori Station',
        lineName: 'Keisei Skyliner'
      },
      {
        stepNumber: 2,
        mode: 'walking',
        instruction: 'Transfer at Nippori Station to JR Yamanote Line',
        durationMinutes: 4,
        detail: 'Follow signs across the concourse to JR South Gate. Tap IC Card (Suica/Pasmo) or ticket.',
        stationOrStop: 'Nippori Station Platform 10'
      },
      {
        stepNumber: 3,
        mode: 'metro',
        instruction: 'Take JR Yamanote Line to Shibuya Station, transfer to Ginza Line to Omotesando',
        durationMinutes: 14,
        detail: '2 stops to Omotesando Station. Take Exit A4 for escalator access directly to street level.',
        stationOrStop: 'Omotesando Station (Exit A4)',
        lineName: 'Ginza Line'
      },
      {
        stepNumber: 4,
        mode: 'walking',
        instruction: 'Walk 4 minutes along Minami-Aoyama',
        durationMinutes: 4,
        detail: 'Turn right at Prada boutique, hotel entrance is 150m ahead on the left with glowing cyan canopy.',
        stationOrStop: 'The Glasshouse Aqua Resort'
      }
    ]
  },
  {
    id: 'tr-2',
    from: 'Narita International Airport (NRT)',
    to: 'The Glasshouse Aqua Resort, Tokyo',
    mode: 'bus',
    name: 'Airport Limousine Express Coach',
    summary: 'Direct comfortable luggage-friendly coach to Central Tokyo',
    durationMinutes: 85,
    departureFrequency: 'Every 30 mins',
    estimatedFare: 26,
    currency: 'USD',
    distanceKm: 72.0,
    ecoScore: 'B',
    crowdLevel: 'Low',
    firstDeparture: '06:30 AM',
    lastDeparture: '22:45 PM',
    stationArrivalTip: 'Tickets can be purchased at the Limousine Bus counter at arrivals hall.',
    steps: [
      {
        stepNumber: 1,
        mode: 'bus',
        instruction: 'Board Limousine Bus from Bus Stop #11',
        durationMinutes: 75,
        detail: 'Staff will tag your suitcases and load them into underfloor luggage bay.',
        stationOrStop: 'NRT Terminal 1 Stop 11 -> Shinjuku / Shibuya Hub',
        lineName: 'Tokyo Airport Limousine'
      },
      {
        stepNumber: 2,
        mode: 'taxi',
        instruction: 'Take short local taxi to Hotel',
        durationMinutes: 10,
        detail: 'Show the driver the Japanese address in EDO: "港区南青山2-11-3".',
        stationOrStop: 'Minami-Aoyama'
      }
    ]
  },
  {
    id: 'tr-3',
    from: 'Narita International Airport (NRT)',
    to: 'The Glasshouse Aqua Resort, Tokyo',
    mode: 'taxi',
    name: 'Direct Airport Chauffeured Taxi / Rideshare',
    summary: 'Private door-to-door transfer with zero luggage hassle',
    durationMinutes: 65,
    departureFrequency: 'On-demand (24/7)',
    estimatedFare: 160,
    currency: 'USD',
    distanceKm: 68.0,
    ecoScore: 'C',
    crowdLevel: 'Low',
    firstDeparture: '24 Hours',
    lastDeparture: '24 Hours',
    stationArrivalTip: 'Follow Taxi stands on 1F ground transport level or pre-book via app concierge.',
    steps: [
      {
        stepNumber: 1,
        mode: 'taxi',
        instruction: 'Direct highway taxi via Shuto Expressway',
        durationMinutes: 65,
        detail: 'Door-to-door service directly to hotel drop-off canopy. Fixed fare options available.',
        stationOrStop: 'Airport Taxi Stand -> Hotel Main Entrance'
      }
    ]
  },
  {
    id: 'tr-4',
    from: 'Gare du Nord Railway Station',
    to: 'Le Grand Cyan Palace, Paris',
    mode: 'metro',
    name: 'Paris Métro Line 4 + Line 1',
    summary: 'Direct underground transit through central Paris',
    durationMinutes: 18,
    departureFrequency: 'Every 3-5 mins',
    estimatedFare: 2.5,
    currency: 'USD',
    distanceKm: 3.8,
    ecoScore: 'A+',
    crowdLevel: 'Busy',
    firstDeparture: '05:30 AM',
    lastDeparture: '01:15 AM',
    stationArrivalTip: 'Valid with standard Navigo Easy card or single contactless ticket.',
    steps: [
      {
        stepNumber: 1,
        mode: 'metro',
        instruction: 'Board Métro Line 4 heading towards Bagneux-Lucie Aubrac',
        durationMinutes: 9,
        detail: 'Ride 5 stops to Châtelet station.',
        stationOrStop: 'Gare du Nord -> Châtelet',
        lineName: 'Métro 4'
      },
      {
        stepNumber: 2,
        mode: 'metro',
        instruction: 'Transfer to Métro Line 1 towards La Défense',
        durationMinutes: 5,
        detail: 'Ride 2 stops to Palais Royal - Musée du Louvre. Take Exit 1 (Rue de Rivoli).',
        stationOrStop: 'Châtelet -> Palais Royal - Musée du Louvre',
        lineName: 'Métro 1'
      },
      {
        stepNumber: 3,
        mode: 'walking',
        instruction: 'Walk 3 minutes along Rue de Rivoli',
        durationMinutes: 4,
        detail: 'Arrive at hotel entrance opposite the Jardin des Tuileries.',
        stationOrStop: '14 Rue de Rivoli'
      }
    ]
  },
  {
    id: 'tr-5',
    from: 'Central Station / Landmark Plaza',
    to: 'Local Attraction / Heritage Market',
    mode: 'walking',
    name: 'Scenic Pedestrian Boulevard Walk',
    summary: 'Pleasant walk through historic shaded avenues and parks',
    durationMinutes: 22,
    departureFrequency: 'Anytime',
    estimatedFare: 0,
    currency: 'USD',
    distanceKm: 1.6,
    ecoScore: 'A+',
    crowdLevel: 'Low',
    firstDeparture: '24 Hours',
    lastDeparture: '24 Hours',
    stationArrivalTip: 'Well-lit pedestrian sidewalks with pedestrian zebra crossings.',
    steps: [
      {
        stepNumber: 1,
        mode: 'walking',
        instruction: 'Head south on Main Promenade towards Fountain Square',
        durationMinutes: 8,
        detail: 'Wide pedestrian promenade with public benches and water refilling stations.',
        stationOrStop: 'Fountain Square'
      },
      {
        stepNumber: 2,
        mode: 'walking',
        instruction: 'Cross through Heritage Garden path',
        durationMinutes: 10,
        detail: 'Follow paved garden walkway past the historic clock tower.',
        stationOrStop: 'Heritage Garden'
      },
      {
        stepNumber: 3,
        mode: 'walking',
        instruction: 'Arrive at destination plaza entrance',
        durationMinutes: 4,
        detail: 'Destination is directly across from the tourist information office.',
        stationOrStop: 'Arrival Plaza'
      }
    ]
  }
];
