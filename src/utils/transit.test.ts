import test from 'node:test';
import assert from 'node:assert/strict';
import {
  searchTransitRoutes,
  formatDuration,
  generateExternalMapsUrl,
  calculateCarbonSavings
} from './transit';

test('transit helper: formats duration accurately in hours and minutes', () => {
  assert.equal(formatDuration(45), '45 min');
  assert.equal(formatDuration(60), '1 hr');
  assert.equal(formatDuration(85), '1 hr 25 min');
  assert.equal(formatDuration(120), '2 hr');
});

test('transit helper: filters routes by transport mode', () => {
  const metroRoutes = searchTransitRoutes('', '', 'metro');
  assert.ok(metroRoutes.length > 0);
  assert.ok(metroRoutes.every(r => r.mode === 'metro'));

  const walkingRoutes = searchTransitRoutes('', '', 'walking');
  assert.ok(walkingRoutes.length > 0);
  assert.ok(walkingRoutes.every(r => r.mode === 'walking'));
});

test('transit helper: searches routes by query text', () => {
  const airportMatches = searchTransitRoutes('Narita', '');
  assert.ok(airportMatches.length >= 1);
  assert.ok(airportMatches[0].from.includes('Narita'));
});

test('transit helper: builds safe external maps url with query encoding', () => {
  const url = generateExternalMapsUrl('Tokyo Station', 'Roppongi Hills');
  assert.ok(url.startsWith('https://www.google.com/maps/dir/?api=1'));
  assert.ok(url.includes('origin=Tokyo%20Station'));
  assert.ok(url.includes('destination=Roppongi%20Hills'));
});

test('transit helper: calculates carbon savings correctly for eco modes', () => {
  const metroEco = calculateCarbonSavings(10, 'metro');
  assert.ok(metroEco.savingsKg > 1.0);
  assert.ok(metroEco.message.includes('CO2'));

  const walkingEco = calculateCarbonSavings(5, 'walking');
  assert.ok(walkingEco.savingsKg > 0.8);
});
