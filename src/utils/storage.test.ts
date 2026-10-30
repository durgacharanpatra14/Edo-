import test from 'node:test';
import assert from 'node:assert/strict';
import { formatPrice, DEFAULT_USER, DEFAULT_SETTINGS, INITIAL_BOOKINGS } from './storage';

test('storage helper: formats currency prices with appropriate symbol and exchange rates', () => {
  const usdPrice = formatPrice(100, 'USD');
  assert.equal(usdPrice, '$100');

  const eurPrice = formatPrice(100, 'EUR');
  assert.equal(eurPrice, '€92');

  const gbpPrice = formatPrice(100, 'GBP');
  assert.equal(gbpPrice, '£79');

  const jpyPrice = formatPrice(100, 'JPY');
  assert.equal(jpyPrice, '¥15,200');
});

test('storage helper: default user profile contains complete safety and emergency fields', () => {
  assert.ok(DEFAULT_USER.name);
  assert.ok(DEFAULT_USER.email);
  assert.ok(DEFAULT_USER.bloodGroup);
  assert.ok(DEFAULT_USER.allergies);
  assert.ok(DEFAULT_USER.emergencyContactName);
  assert.ok(DEFAULT_USER.emergencyContactPhone);
});

test('storage helper: initial bookings contain valid reference codes and confirmed statuses', () => {
  assert.ok(INITIAL_BOOKINGS.length > 0);
  const sample = INITIAL_BOOKINGS[0];
  assert.equal(sample.status, 'confirmed');
  assert.ok(sample.referenceCode.startsWith('EDO-'));
  assert.ok(sample.totalPrice > 0);
});

test('storage helper: default settings initialize dark theme and offline cache enabled', () => {
  assert.equal(DEFAULT_SETTINGS.theme, 'dark');
  assert.equal(DEFAULT_SETTINGS.currency, 'USD');
  assert.equal(DEFAULT_SETTINGS.offlineCacheEnabled, true);
});
