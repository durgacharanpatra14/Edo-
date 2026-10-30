import { SAMPLE_TRANSIT_OPTIONS } from '../data/mockTransit';
import { TransitOption, TransitMode } from '../types';

export function searchTransitRoutes(
  fromQuery: string,
  toQuery: string,
  modeFilter: TransitMode = 'all'
): TransitOption[] {
  const normFrom = fromQuery.trim().toLowerCase();
  const normTo = toQuery.trim().toLowerCase();

  return SAMPLE_TRANSIT_OPTIONS.filter((route) => {
    // Mode match
    if (modeFilter !== 'all' && route.mode !== modeFilter) {
      return false;
    }

    // If no search query provided, return all matching mode
    if (!normFrom && !normTo) {
      return true;
    }

    const fromMatch = !normFrom || route.from.toLowerCase().includes(normFrom);
    const toMatch = !normTo || route.to.toLowerCase().includes(normTo);

    return fromMatch || toMatch;
  });
}

export function formatDuration(minutes: number): string {
  if (minutes < 60) {
    return `${minutes} min`;
  }
  const hours = Math.floor(minutes / 60);
  const remMinutes = minutes % 60;
  if (remMinutes === 0) {
    return `${hours} hr`;
  }
  return `${hours} hr ${remMinutes} min`;
}

export function generateExternalMapsUrl(origin: string, destination: string): string {
  const safeOrigin = encodeURIComponent(origin.trim() || 'Current Location');
  const safeDest = encodeURIComponent(destination.trim() || 'Destination');
  return `https://www.google.com/maps/dir/?api=1&origin=${safeOrigin}&destination=${safeDest}`;
}

export function calculateCarbonSavings(distanceKm: number, mode: TransitOption['mode']): {
  savingsKg: number;
  message: string;
} {
  // Baseline average car: 0.192 kg CO2 per km
  const carEmission = distanceKm * 0.192;
  let modeEmission = 0;

  switch (mode) {
    case 'walking':
      modeEmission = 0;
      break;
    case 'metro':
      modeEmission = distanceKm * 0.035;
      break;
    case 'bus':
      modeEmission = distanceKm * 0.082;
      break;
    case 'shuttle':
      modeEmission = distanceKm * 0.095;
      break;
    case 'taxi':
    default:
      modeEmission = distanceKm * 0.185;
      break;
  }

  const savingsKg = Math.max(0, +(carEmission - modeEmission).toFixed(2));
  return {
    savingsKg,
    message: savingsKg > 0 ? `Saves approx ${savingsKg}kg CO2 vs driving alone` : 'Standard carbon footprint'
  };
}
