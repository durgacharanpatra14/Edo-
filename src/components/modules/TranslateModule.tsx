import React, { useState } from 'react';
import {
  Languages,
  ArrowRightLeft,
  Volume2,
  Copy,
  Check,
  Mic,
  MicOff,
  Trash2,
  Sparkles,
  Info,
  BookOpen,
  MessageSquare
} from 'lucide-react';
import { LanguageOption, CommonPhrase } from '../../types';
import { SUPPORTED_LANGUAGES, COMMON_TRAVEL_PHRASES, OFFLINE_DICTIONARY } from '../../utils/translationData';

interface TranslateModuleProps {
  // Can receive optional settings
}

export const TranslateModule: React.FC<TranslateModuleProps> = () => {
  const [sourceLang, setSourceLang] = useState('en');
  const [targetLang, setTargetLang] = useState('ja');
  const [inputText, setInputText] = useState('Where is the hotel?');
  const [translatedText, setTranslatedText] = useState('ホテルはどこですか？');
  const [phonetic, setPhonetic] = useState('Hoteru wa doko desu ka?');
  const [copied, setCopied] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [speechError, setSpeechError] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isTranslating, setIsTranslating] = useState(false);

  const categories = ['All', 'Accommodation', 'Transit & Directions', 'Emergency & Medical', 'Shopping', 'Essentials', 'Food & Dining'];

  // Swap Languages
  const handleSwapLanguages = () => {
    const tempLang = sourceLang;
    setSourceLang(targetLang);
    setTargetLang(tempLang);

    const tempText = inputText;
    setInputText(translatedText);
    setTranslatedText(tempText);
    setPhonetic('');
  };

  // Translate handler
  const handleTranslate = async (textToTranslate = inputText) => {
    const trimmed = textToTranslate.trim();
    if (!trimmed) {
      setTranslatedText('');
      setPhonetic('');
      return;
    }

    setIsTranslating(true);
    setSpeechError('');

    // Check pre-compiled travel phrases first
    const matchPhrase = COMMON_TRAVEL_PHRASES.find(
      (p) => p.english.toLowerCase() === trimmed.toLowerCase()
    );

    if (matchPhrase && matchPhrase.translations[targetLang]) {
      setTimeout(() => {
        setTranslatedText(matchPhrase.translations[targetLang].text);
        setPhonetic(matchPhrase.translations[targetLang].phonetic || '');
        setIsTranslating(false);
      }, 200);
      return;
    }

    // Check offline dictionary words
    const lower = trimmed.toLowerCase();
    if (OFFLINE_DICTIONARY[lower] && OFFLINE_DICTIONARY[lower][targetLang]) {
      setTimeout(() => {
        setTranslatedText(OFFLINE_DICTIONARY[lower][targetLang]);
        setPhonetic('');
        setIsTranslating(false);
      }, 200);
      return;
    }

    // Try backend proxy /api/translate or smart offline fallback
    try {
      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: trimmed,
          sourceLang,
          targetLang
        })
      });

      if (response.ok) {
        const data = await response.json();
        setTranslatedText(data.translation || trimmed);
        setPhonetic(data.phonetic || '');
        setIsTranslating(false);
        return;
      }
    } catch {
      // Fallback gracefully to offline dictionary or simulation
    }

    // Graceful offline simulated translation
    setTimeout(() => {
      // If words are in dictionary, combine them
      const words = lower.split(/\s+/);
      const translatedWords = words.map((w) => {
        const cleanWord = w.replace(/[^\w]/g, '');
        if (OFFLINE_DICTIONARY[cleanWord] && OFFLINE_DICTIONARY[cleanWord][targetLang]) {
          return OFFLINE_DICTIONARY[cleanWord][targetLang];
        }
        return w;
      });

      const result = translatedWords.join(' ');
      setTranslatedText(result !== lower ? result : `[${targetLang.toUpperCase()}] ${trimmed}`);
      setPhonetic('');
      setIsTranslating(false);
    }, 300);
  };

  // Text-to-Speech Aloud
  const handleSpeak = (text: string, langCode: string) => {
    if (!('speechSynthesis' in window)) {
      setSpeechError('Text-to-Speech is not supported by your browser.');
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    const langObj = SUPPORTED_LANGUAGES.find((l) => l.code === langCode);
    if (langObj?.speechVoiceCode) {
      utterance.lang = langObj.speechVoiceCode;
    }
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  };

  // Speech to Text (Voice input)
  const handleToggleSpeech = () => {
    setSpeechError('');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setSpeechError('Speech recognition is not supported in this browser. Please type your phrase.');
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      const langObj = SUPPORTED_LANGUAGES.find((l) => l.code === sourceLang);
      recognition.lang = langObj?.speechVoiceCode || 'en-US';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      recognition.onerror = (event: any) => {
        setIsListening(false);
        setSpeechError(`Microphone notice: ${event.error || 'Check microphone permissions'}`);
      };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        if (transcript) {
          setInputText(transcript);
          handleTranslate(transcript);
        }
      };

      recognition.start();
    } catch {
      setIsListening(false);
      setSpeechError('Could not start speech recognition.');
    }
  };

  const handleCopy = () => {
    if (!translatedText) return;
    navigator.clipboard.writeText(translatedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSelectCommonPhrase = (phrase: CommonPhrase) => {
    setInputText(phrase.english);
    setSourceLang('en');
    const tr = phrase.translations[targetLang];
    if (tr) {
      setTranslatedText(tr.text);
      setPhonetic(tr.phonetic || '');
    } else {
      handleTranslate(phrase.english);
    }
  };

  const filteredPhrases = COMMON_TRAVEL_PHRASES.filter(
    (p) => selectedCategory === 'All' || p.category === selectedCategory
  );

  return (
    <div className="space-y-6">
      {/* Module Title */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-600 dark:text-cyan-400 text-xs font-semibold mb-1">
          <Languages className="w-3.5 h-3.5" />
          Module 3: Translation Tool
        </div>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Travel Translator & Voice Phrasebook
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Translate text and voice with phonetic pronunciation guides and offline emergency phrasebooks.
        </p>
      </div>

      {/* Transparent Integration Notice */}
      <div className="flex items-start gap-2.5 p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-700 dark:text-cyan-300 text-xs leading-relaxed">
        <Info className="w-4 h-4 shrink-0 text-cyan-500 mt-0.5" />
        <div>
          <span className="font-semibold">Offline & API Architecture:</span> Essential travel phrases and emergency terms are stored 100% offline with phonetic pronunciation. For free-form text, EDO connects to a secure backend endpoint (`/api/translate`) without exposing API keys in client JavaScript.
        </div>
      </div>

      {/* Language Selector Bar */}
      <div className="p-3 sm:p-4 rounded-2xl glass-card border border-cyan-500/20 shadow-md flex items-center justify-between gap-2">
        {/* Source Language */}
        <div className="flex-1">
          <label className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase mb-1">
            From
          </label>
          <select
            value={sourceLang}
            onChange={(e) => setSourceLang(e.target.value)}
            className="w-full px-2.5 py-2 text-xs font-semibold rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 focus:outline-none focus:border-cyan-400"
          >
            {SUPPORTED_LANGUAGES.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.flag} {lang.name}
              </option>
            ))}
          </select>
        </div>

        {/* Swap Button */}
        <div className="pt-4">
          <button
            type="button"
            onClick={handleSwapLanguages}
            aria-label="Swap languages"
            className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-cyan-500 hover:text-slate-900 transition text-slate-600 dark:text-slate-300 cursor-pointer border border-slate-200 dark:border-slate-700 shadow-sm"
          >
            <ArrowRightLeft className="w-4 h-4" />
          </button>
        </div>

        {/* Target Language */}
        <div className="flex-1">
          <label className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase mb-1">
            To
          </label>
          <select
            value={targetLang}
            onChange={(e) => {
              setTargetLang(e.target.value);
              // Trigger auto translate on target language switch
              setTimeout(() => handleTranslate(inputText), 50);
            }}
            className="w-full px-2.5 py-2 text-xs font-semibold rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 focus:outline-none focus:border-cyan-400 text-cyan-600 dark:text-cyan-400"
          >
            {SUPPORTED_LANGUAGES.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.flag} {lang.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {speechError && (
        <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-xs">
          {speechError}
        </div>
      )}

      {/* Translation Panels Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Input Panel */}
        <div className="p-4 rounded-2xl glass-card border border-cyan-500/20 shadow-md flex flex-col justify-between space-y-3 min-h-[220px]">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                Enter Text or Speak
              </span>
              <span className="text-[10px] text-slate-400">
                {inputText.length} characters
              </span>
            </div>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type phrase to translate..."
              rows={4}
              className="w-full p-2 text-sm bg-transparent border-none focus:outline-none resize-none text-slate-900 dark:text-white placeholder:text-slate-400 font-medium leading-relaxed"
            />
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={handleToggleSpeech}
                aria-label={isListening ? 'Stop listening' : 'Start speech recognition'}
                className={`p-2 rounded-xl transition cursor-pointer flex items-center gap-1.5 text-xs font-semibold ${
                  isListening
                    ? 'bg-rose-500 text-white animate-pulse'
                    : 'bg-slate-100 dark:bg-slate-800 hover:bg-cyan-500 hover:text-slate-900 text-slate-600 dark:text-slate-300'
                }`}
              >
                {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                <span className="hidden sm:inline">{isListening ? 'Listening...' : 'Voice'}</span>
              </button>

              {inputText && (
                <button
                  type="button"
                  onClick={() => handleSpeak(inputText, sourceLang)}
                  aria-label="Listen to source audio"
                  className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition cursor-pointer"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              )}

              {inputText && (
                <button
                  type="button"
                  onClick={() => {
                    setInputText('');
                    setTranslatedText('');
                    setPhonetic('');
                  }}
                  aria-label="Clear text"
                  className="p-2 rounded-xl hover:bg-rose-500/10 text-slate-400 hover:text-rose-500 transition cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>

            <button
              type="button"
              onClick={() => handleTranslate()}
              disabled={isTranslating}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-slate-900 font-bold text-xs shadow-md shadow-cyan-500/20 transition cursor-pointer flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isTranslating ? 'Translating...' : 'Translate'}</span>
            </button>
          </div>
        </div>

        {/* Translation Output Panel */}
        <div className="p-4 rounded-2xl glass-card border border-cyan-500/30 shadow-md flex flex-col justify-between space-y-3 min-h-[220px] bg-slate-50/50 dark:bg-slate-900/60">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-cyan-600 dark:text-cyan-400 flex items-center gap-1">
                <Check className="w-3.5 h-3.5" />
                Translation Result
              </span>
              <span className="text-[10px] text-slate-400">
                {SUPPORTED_LANGUAGES.find((l) => l.code === targetLang)?.name}
              </span>
            </div>

            <div className="p-2 min-h-[80px]">
              {translatedText ? (
                <div>
                  <p className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-relaxed">
                    {translatedText}
                  </p>
                  {phonetic && (
                    <p className="text-xs text-cyan-600 dark:text-cyan-300 font-medium italic mt-2">
                      🗣 Phonetic: {phonetic}
                    </p>
                  )}
                </div>
              ) : (
                <p className="text-xs text-slate-400 italic">
                  Translation will appear here with pronunciation guide...
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-1.5">
              {translatedText && (
                <button
                  type="button"
                  onClick={() => handleSpeak(translatedText, targetLang)}
                  aria-label="Speak translated text aloud"
                  className="px-3 py-1.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Pronounce</span>
                </button>
              )}
            </div>

            {translatedText && (
              <button
                type="button"
                onClick={handleCopy}
                aria-label="Copy translated text"
                className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Common Travel Phrases Section */}
      <div className="p-5 rounded-2xl glass-card border border-cyan-500/20 shadow-lg space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-cyan-500" />
              Essential Travel Phrasebook (Offline Ready)
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Tap any phrase to instantly translate and hear native pronunciation.
            </p>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-xl text-xs font-semibold transition cursor-pointer shrink-0 ${
                selectedCategory === cat
                  ? 'bg-cyan-500 text-slate-900 shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:border-cyan-400 border border-slate-200 dark:border-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Phrases Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {filteredPhrases.map((phrase) => {
            const tr = phrase.translations[targetLang];
            return (
              <div
                key={phrase.id}
                onClick={() => handleSelectCommonPhrase(phrase)}
                className="p-3 rounded-xl bg-slate-100/70 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 hover:border-cyan-400/60 transition cursor-pointer flex items-center justify-between group"
              >
                <div className="space-y-0.5">
                  <span className="text-[10px] uppercase font-bold text-cyan-500 tracking-wider">
                    {phrase.category}
                  </span>
                  <p className="text-xs font-bold text-slate-800 dark:text-slate-100 group-hover:text-cyan-400 transition">
                    {phrase.english}
                  </p>
                  {tr && (
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      {tr.text} {tr.phonetic ? `• ${tr.phonetic}` : ''}
                    </p>
                  )}
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (tr) handleSpeak(tr.text, targetLang);
                  }}
                  aria-label="Speak phrase"
                  className="p-2 rounded-lg bg-white dark:bg-slate-700 hover:bg-cyan-500 hover:text-slate-900 transition text-slate-400 cursor-pointer shrink-0 shadow-sm"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
