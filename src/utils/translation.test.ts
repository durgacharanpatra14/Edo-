import test from 'node:test';
import assert from 'node:assert/strict';
import { COMMON_TRAVEL_PHRASES, OFFLINE_DICTIONARY, SUPPORTED_LANGUAGES } from './translationData';

test('translation data: includes the 5 user-requested essential travel phrases', () => {
  const phrases = COMMON_TRAVEL_PHRASES.map(p => p.english);

  assert.ok(phrases.includes('Where is the hotel?'));
  assert.ok(phrases.includes('How can I reach the railway station?'));
  assert.ok(phrases.includes('Please help me.'));
  assert.ok(phrases.includes('How much does it cost?'));
  assert.ok(phrases.includes('Where is the nearest hospital?'));
});

test('translation data: phrases contain valid translations and phonetics in major languages', () => {
  const hotelPhrase = COMMON_TRAVEL_PHRASES.find(p => p.english === 'Where is the hotel?');
  assert.ok(hotelPhrase);
  
  // Spanish
  assert.equal(hotelPhrase.translations.es.text, '¿Dónde está el hotel?');
  assert.ok(hotelPhrase.translations.es.phonetic.length > 0);

  // French
  assert.equal(hotelPhrase.translations.fr.text, "Où se trouve l'hôtel ?");

  // Japanese
  assert.equal(hotelPhrase.translations.ja.text, 'ホテルはどこですか？');
  assert.equal(hotelPhrase.translations.ja.phonetic, 'Hoteru wa doko desu ka?');
});

test('translation data: offline dictionary maps key travel words across languages', () => {
  assert.equal(OFFLINE_DICTIONARY['hotel']['es'], 'hotel');
  assert.equal(OFFLINE_DICTIONARY['station']['ja'], '駅');
  assert.equal(OFFLINE_DICTIONARY['help']['fr'], 'aide');
  assert.equal(OFFLINE_DICTIONARY['hospital']['de'], 'Krankenhaus');
  assert.equal(OFFLINE_DICTIONARY['police']['it'], 'polizia');
});

test('translation data: supports diverse global travel languages with flags and speech codes', () => {
  assert.ok(SUPPORTED_LANGUAGES.length >= 8);
  const japanese = SUPPORTED_LANGUAGES.find(l => l.code === 'ja');
  assert.ok(japanese);
  assert.equal(japanese.speechVoiceCode, 'ja-JP');
});
