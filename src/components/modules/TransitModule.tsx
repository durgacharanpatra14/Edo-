import React, { useState } from 'react';
import {
  TrainFront,
  Bus,
  Car,
  Footprints,
  MapPin,
  ArrowRight,
  Clock,
  DollarSign,
  Leaf,
  Navigation,
  ExternalLink,
  Info,
  ArrowUpDown,
  Search,
  CheckCircle2
} from 'lucide-react';
import { TransitOption, TransitMode, AppSettings } from '../../types';
import { SAMPLE_TRANSIT_OPTIONS } from '../../data/mockTransit';
import { searchTransitRoutes, formatDuration, generateExternalMapsUrl, calculateCarbonSavings } from '../../utils/transit';
import { formatPrice } from '../../utils/storage';

interface TransitModuleProps {
  settings: AppSettings;
}

export const TransitModule: React.FC<TransitModuleProps> = ({ settings }) => {
  const [origin, setOrigin] = useState('Narita International Airport (NRT)');
  const [destination, setDestination] = useState('The Glasshouse Aqua Resort, Tokyo');
  const [selectedMode, setSelectedMode] = useState<TransitMode>('all');
  const [selectedRoute, setSelectedRoute] = useState<TransitOption | null>(SAMPLE_TRANSIT_OPTIONS[0]);

  // Quick Preset Routes
  const PRESET_ROUTES = [
    {
      label: 'Tokyo Airport to Hotel',
      from: 'Narita International Airport (NRT)',
      to: 'The Glasshouse Aqua Resort, Tokyo'
    },
    {
      label: 'Paris Gare du Nord to Hotel',
      from: 'Gare du Nord Railway Station',
      to: 'Le Grand Cyan Palace, Paris'
    },
    {
      label: 'Central Plaza Walking Route',
      from: 'Central Station / Landmark Plaza',
      to: 'Local Attraction / Heritage Market'
    }
  ];

  const routes = searchTransitRoutes(origin, destination, selectedMode);

  const handleSwap = () => {
    const temp = origin;
    setOrigin(destination);
    setDestination(temp);
  };

  const getModeIcon = (mode: TransitOption['mode']) => {
    switch (mode) {
      case 'metro':
        return <TrainFront className="w-4 h-4 text-cyan-400" />;
      case 'bus':
        return <Bus className="w-4 h-4 text-emerald-400" />;
      case 'taxi':
        return <Car className="w-4 h-4 text-amber-400" />;
      case 'walking':
        return <Footprints className="w-4 h-4 text-teal-400" />;
      default:
        return <Navigation className="w-4 h-4 text-cyan-400" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Module Title */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-600 dark:text-cyan-400 text-xs font-semibold mb-1">
          <Navigation className="w-3.5 h-3.5" />
          Module 2: Transit and Navigation
        </div>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Arrival & Multi-Modal Navigation
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Step-by-step subway, bus, walking, and taxi arrival instructions with external map routing.
        </p>
      </div>

      {/* Transparent Disclaimer */}
      <div className="flex items-start gap-2.5 p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-700 dark:text-cyan-300 text-xs leading-relaxed">
        <Info className="w-4 h-4 shrink-0 text-cyan-500 mt-0.5" />
        <div>
          <span className="font-semibold">Privacy & Demo Note:</span> EDO never tracks or shares your GPS location without explicit permission. Transit schedules and fares shown below are realistic demonstration estimates. For live satellite turn-by-turn guidance, tap "Open in External Maps".
        </div>
      </div>

      {/* Origin & Destination Card */}
      <div className="p-4 sm:p-5 rounded-2xl glass-card border border-cyan-500/20 shadow-lg space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-[1fr,auto,1fr] items-center gap-3">
          {/* Origin */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-cyan-500" />
              Starting Location (Origin)
            </label>
            <input
              type="text"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              placeholder="e.g. Airport, Station, or Address..."
              className="w-full px-3 py-2 text-xs rounded-xl bg-white dark:bg-slate-800/90 border border-slate-300 dark:border-slate-700 focus:outline-none focus:border-cyan-400 text-slate-900 dark:text-white"
            />
          </div>

          {/* Swap Button */}
          <div className="flex justify-center pt-2 md:pt-4">
            <button
              type="button"
              onClick={handleSwap}
              aria-label="Swap starting location and destination"
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-cyan-500 hover:text-slate-900 transition text-slate-500 dark:text-slate-300 cursor-pointer border border-slate-200 dark:border-slate-700"
            >
              <ArrowUpDown className="w-4 h-4" />
            </button>
          </div>

          {/* Destination */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1">
              <Navigation className="w-3.5 h-3.5 text-teal-500" />
              Destination (Arrival Point)
            </label>
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="e.g. Hotel, Landmark, or District..."
              className="w-full px-3 py-2 text-xs rounded-xl bg-white dark:bg-slate-800/90 border border-slate-300 dark:border-slate-700 focus:outline-none focus:border-cyan-400 text-slate-900 dark:text-white"
            />
          </div>
        </div>

        {/* Quick Presets */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 border-t border-slate-200 dark:border-slate-700/60 pt-2">
          <span className="text-[11px] font-medium text-slate-500 shrink-0">Sample Routes:</span>
          {PRESET_ROUTES.map((preset, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setOrigin(preset.from);
                setDestination(preset.to);
              }}
              className="px-2.5 py-1 rounded-full text-[11px] bg-slate-100 dark:bg-slate-800 hover:bg-cyan-500/20 text-slate-600 dark:text-slate-300 transition shrink-0 cursor-pointer border border-slate-200 dark:border-slate-700"
            >
              {preset.label}
            </button>
          ))}
        </div>

        {/* Mode Selector Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          {[
            { id: 'all' as TransitMode, label: 'All Options', icon: Navigation },
            { id: 'metro' as TransitMode, label: 'Train / Metro', icon: TrainFront },
            { id: 'bus' as TransitMode, label: 'Bus', icon: Bus },
            { id: 'taxi' as TransitMode, label: 'Taxi / Cab', icon: Car },
            { id: 'walking' as TransitMode, label: 'Walking', icon: Footprints }
          ].map((mode) => {
            const Icon = mode.icon;
            const isSelected = selectedMode === mode.id;
            return (
              <button
                key={mode.id}
                type="button"
                onClick={() => setSelectedMode(mode.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer shrink-0 ${
                  isSelected
                    ? 'bg-cyan-500 text-slate-900 shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 hover:border-cyan-400 border border-slate-200 dark:border-slate-700'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{mode.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Available Route Options */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Options List */}
        <div className="lg:col-span-1 space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-medium">
            <span>Found {routes.length} transit routes</span>
          </div>

          {routes.length === 0 ? (
            <div className="p-6 text-center rounded-2xl glass-card border border-cyan-500/20">
              <Navigation className="w-8 h-8 text-cyan-400 mx-auto mb-2 opacity-60" />
              <p className="text-xs text-slate-500 dark:text-slate-400">
                No routes found for this mode. Try selecting "All Options" or a preset route.
              </p>
            </div>
          ) : (
            routes.map((route) => {
              const isSelected = selectedRoute?.id === route.id;
              const eco = calculateCarbonSavings(route.distanceKm, route.mode);

              return (
                <div
                  key={route.id}
                  onClick={() => setSelectedRoute(route)}
                  className={`p-4 rounded-2xl border-2 transition cursor-pointer space-y-2.5 ${
                    isSelected
                      ? 'border-cyan-400 bg-cyan-500/10 shadow-md shadow-cyan-500/10'
                      : 'border-slate-200 dark:border-slate-800 hover:border-cyan-500/40 glass-card'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-lg bg-slate-800 border border-slate-700">
                        {getModeIcon(route.mode)}
                      </div>
                      <span className="font-bold text-xs text-slate-900 dark:text-white capitalize">
                        {route.mode}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 text-xs font-extrabold text-cyan-500">
                      {route.estimatedFare === 0
                        ? 'Free'
                        : formatPrice(route.estimatedFare, settings.currency)}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-bold text-xs text-slate-800 dark:text-slate-100 leading-snug">
                      {route.name}
                    </h3>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                      {route.summary}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 pt-1 border-t border-slate-200 dark:border-slate-800">
                    <span className="flex items-center gap-1 font-semibold text-slate-700 dark:text-slate-300">
                      <Clock className="w-3 h-3 text-cyan-400" />
                      {formatDuration(route.durationMinutes)}
                    </span>
                    <span>{route.departureFrequency}</span>
                    <span className="flex items-center gap-0.5 text-emerald-500 font-bold">
                      <Leaf className="w-3 h-3" />
                      {route.ecoScore}
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Right: Selected Route Detail & Timeline */}
        <div className="lg:col-span-2">
          {selectedRoute ? (
            <div className="p-5 sm:p-6 rounded-2xl glass-card border border-cyan-500/20 shadow-lg space-y-5">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200 dark:border-slate-800">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-cyan-500/20 text-cyan-500 border border-cyan-500/30">
                      {selectedRoute.mode} Route
                    </span>
                    <span className="text-xs text-slate-400">
                      {selectedRoute.distanceKm} km • {selectedRoute.crowdLevel} crowd
                    </span>
                  </div>
                  <h2 className="text-lg font-extrabold text-slate-900 dark:text-white">
                    {selectedRoute.name}
                  </h2>
                </div>

                <div className="text-left sm:text-right">
                  <div className="text-xl font-extrabold text-cyan-500">
                    {selectedRoute.estimatedFare === 0
                      ? 'Free'
                      : formatPrice(selectedRoute.estimatedFare, settings.currency)}
                  </div>
                  <p className="text-xs text-slate-400">
                    Est. Duration: {formatDuration(selectedRoute.durationMinutes)}
                  </p>
                </div>
              </div>

              {/* Station Arrival Tip Pill */}
              {selectedRoute.stationArrivalTip && (
                <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-700 dark:text-cyan-300 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-cyan-500" />
                  <span>
                    <strong>Arrival Tip:</strong> {selectedRoute.stationArrivalTip}
                  </span>
                </div>
              )}

              {/* Step-by-Step Instructions Timeline */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Step-by-Step Navigation Instructions
                </h3>

                <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-cyan-500/30">
                  {selectedRoute.steps.map((step) => (
                    <div key={step.stepNumber} className="relative group">
                      {/* Step Indicator Dot */}
                      <div className="absolute -left-6 top-0.5 w-5 h-5 rounded-full bg-slate-900 border-2 border-cyan-400 text-cyan-400 flex items-center justify-center text-[10px] font-extrabold shadow-sm">
                        {step.stepNumber}
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-xs text-slate-900 dark:text-white">
                            {step.instruction}
                          </span>
                          <span className="text-[11px] font-semibold text-cyan-500">
                            {step.durationMinutes} min
                          </span>
                        </div>

                        {step.stationOrStop && (
                          <p className="text-[11px] text-cyan-600 dark:text-cyan-400 font-medium">
                            📍 {step.stationOrStop}
                          </p>
                        )}

                        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                          {step.detail}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Carbon & Environmental score */}
              <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between text-xs text-emerald-700 dark:text-emerald-300">
                <div className="flex items-center gap-2">
                  <Leaf className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>{calculateCarbonSavings(selectedRoute.distanceKm, selectedRoute.mode).message}</span>
                </div>
                <span className="font-extrabold px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400">
                  Grade {selectedRoute.ecoScore}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                <a
                  href={generateExternalMapsUrl(origin, destination)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-slate-900 font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 transition cursor-pointer"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Open Directions in External Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ) : (
            <div className="p-8 text-center rounded-2xl glass-card border border-cyan-500/20">
              <Navigation className="w-12 h-12 text-cyan-400 mx-auto mb-3 opacity-60" />
              <h3 className="font-bold text-base">Select a route to view details</h3>
              <p className="text-xs text-slate-500 mt-1">
                Pick any of the transit options from the left list to see step-by-step arrivals and station tips.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
