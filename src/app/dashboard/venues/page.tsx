'use client';

import { useState, useMemo } from 'react';
import {
  Search,
  MapPin,
  Users,
  Star,
  Wifi,
  DollarSign,
  CalendarDays,
  Check,
  X,
  Minus,
  Building2,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { MOCK_VENUES } from '@/lib/mock-data';
import { formatCurrency } from '@/lib/utils';

const AMENITY_ICONS: Record<string, string> = {
  WiFi: '📶',
  'AV Equipment': '📽️',
  Catering: '🍽️',
  Parking: '🅿️',
  Stage: '🎭',
  'Green Room': '🌿',
  Accessibility: '♿',
  Whiteboard: '📋',
  'Coffee Bar': '☕',
  'Natural Light': '☀️',
  'Outdoor Space': '🌳',
  'VR Stations': '🥽',
  'Co-working Space': '💻',
  'Meeting Rooms': '🚪',
  Fireplace: '🔥',
  Kitchen: '👨‍🍳',
};

// September 2026 calendar grid
const DAYS_IN_MONTH = 30;
const START_DAY_OF_WEEK = 2; // Sept 1 2026 is Tuesday (0=Sun)
const MONTH_LABEL = 'September 2026';
const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function generateCalendarDays(availability: Record<string, string>) {
  const cells: { day: number | null; status?: string }[] = [];

  // Leading blanks
  for (let i = 0; i < START_DAY_OF_WEEK; i++) {
    cells.push({ day: null });
  }

  for (let d = 1; d <= DAYS_IN_MONTH; d++) {
    const dateStr = `2026-09-${String(d).padStart(2, '0')}`;
    cells.push({ day: d, status: availability[dateStr] || 'available' });
  }

  return cells;
}

export default function VenuesPage() {
  const [search, setSearch] = useState('');
  const [selectedVenue, setSelectedVenue] = useState<string | null>(MOCK_VENUES[0].id);
  const [capacityFilter, setCapacityFilter] = useState<'all' | 'small' | 'medium' | 'large'>('all');

  const filtered = useMemo(() => {
    return MOCK_VENUES.filter((v) => {
      const matchSearch =
        v.name.toLowerCase().includes(search.toLowerCase()) ||
        v.city.toLowerCase().includes(search.toLowerCase());
      const matchCap =
        capacityFilter === 'all' ||
        (capacityFilter === 'small' && v.capacity <= 150) ||
        (capacityFilter === 'medium' && v.capacity > 150 && v.capacity <= 800) ||
        (capacityFilter === 'large' && v.capacity > 800);
      return matchSearch && matchCap;
    });
  }, [search, capacityFilter]);

  const activeVenue = MOCK_VENUES.find((v) => v.id === selectedVenue) || MOCK_VENUES[0];
  const calendarDays = generateCalendarDays(activeVenue.availability);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Venues</h1>
        <p className="text-sm text-gray-500 mt-1">Browse and manage event venues</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          {
            label: 'Total Venues',
            value: MOCK_VENUES.length.toString(),
            icon: Building2,
            color: 'text-rose-600 bg-rose-100',
          },
          {
            label: 'Avg. Rating',
            value: (MOCK_VENUES.reduce((s, v) => s + v.rating, 0) / MOCK_VENUES.length).toFixed(1),
            icon: Star,
            color: 'text-amber-600 bg-amber-100',
          },
          {
            label: 'Max Capacity',
            value: Math.max(...MOCK_VENUES.map((v) => v.capacity)).toLocaleString(),
            icon: Users,
            color: 'text-violet-600 bg-violet-100',
          },
        ].map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-5">
              <div className="flex items-center gap-3">
                <div className={`p-2.5 rounded-xl ${stat.color}`}>
                  <stat.icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">{stat.label}</p>
                  <p className="text-xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Search + Capacity Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search venues by name or city..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-rose-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500 bg-white"
          />
        </div>
        <div className="flex items-center gap-1.5">
          {(['all', 'small', 'medium', 'large'] as const).map((cap) => (
            <button
              key={cap}
              onClick={() => setCapacityFilter(cap)}
              className={`px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                capacityFilter === cap
                  ? 'bg-rose-100 text-rose-700'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {cap === 'all' ? 'All Sizes' : cap === 'small' ? '≤150' : cap === 'medium' ? '150–800' : '800+'}
            </button>
          ))}
        </div>
      </div>

      {/* Content: Venue List + Detail */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Venue Cards */}
        <div className="xl:col-span-1 space-y-4">
          {filtered.map((venue) => {
            const isSelected = venue.id === selectedVenue;
            return (
              <Card
                key={venue.id}
                variant="interactive"
                className={`transition-all ${
                  isSelected ? 'border-rose-500 ring-2 ring-rose-200' : ''
                }`}
                onClick={() => setSelectedVenue(venue.id)}
              >
                <CardContent className="p-5">
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-rose-100 to-pink-100 flex items-center justify-center shrink-0">
                      <Building2 className="w-6 h-6 text-rose-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold text-gray-900 truncate">{venue.name}</h3>
                      <div className="flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-gray-400" />
                        <span className="text-xs text-gray-500 truncate">{venue.city}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                      <span className="text-xs font-semibold text-gray-700">{venue.rating}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5" /> {venue.capacity.toLocaleString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <DollarSign className="w-3.5 h-3.5" /> {formatCurrency(venue.costPerDay)}/day
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-1 mt-3">
                    {venue.amenities.slice(0, 4).map((a) => (
                      <span
                        key={a}
                        className="inline-flex items-center gap-1 px-2 py-0.5 bg-gray-50 text-gray-600 rounded-md text-[10px] font-medium border border-gray-100"
                      >
                        <span>{AMENITY_ICONS[a] || '✨'}</span> {a}
                      </span>
                    ))}
                    {venue.amenities.length > 4 && (
                      <span className="px-2 py-0.5 bg-gray-50 text-gray-400 rounded-md text-[10px] font-medium border border-gray-100">
                        +{venue.amenities.length - 4}
                      </span>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}

          {filtered.length === 0 && (
            <div className="text-center py-12">
              <Building2 className="w-10 h-10 text-gray-300 mx-auto mb-2" />
              <p className="text-sm text-gray-500">No venues match your search</p>
            </div>
          )}
        </div>

        {/* Venue Detail Panel */}
        <div className="xl:col-span-2 space-y-5">
          {/* Venue Header */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center shrink-0">
                  <Building2 className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-gray-900">{activeVenue.name}</h2>
                  <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
                    <MapPin className="w-4 h-4" />
                    <span>{activeVenue.address}, {activeVenue.city}</span>
                  </div>
                  <div className="flex items-center gap-4 mt-3">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                      <span className="text-sm font-semibold">{activeVenue.rating}</span>
                      <span className="text-xs text-gray-400">({activeVenue.totalReviews} reviews)</span>
                    </div>
                    <Badge variant="info" size="sm">
                      <Users className="w-3 h-3 mr-1" /> {activeVenue.capacity.toLocaleString()} capacity
                    </Badge>
                    <Badge variant="success" size="sm">
                      <DollarSign className="w-3 h-3 mr-1" /> {formatCurrency(activeVenue.costPerDay)}/day
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Amenities */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Amenities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {activeVenue.amenities.map((amenity) => (
                  <span
                    key={amenity}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-rose-50 text-rose-700 rounded-lg text-xs font-medium border border-rose-100"
                  >
                    <span className="text-sm">{AMENITY_ICONS[amenity] || '✨'}</span>
                    {amenity}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Availability Calendar */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base flex items-center gap-2">
                  <CalendarDays className="w-4 h-4 text-rose-500" />
                  {MONTH_LABEL}
                </CardTitle>
                <div className="flex items-center gap-3 text-[11px]">
                  <span className="flex items-center gap-1">
                    <span className="w-3 h-3 rounded bg-green-200 border border-green-300" /> Available
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-3 h-3 rounded bg-amber-200 border border-amber-300" /> Partial
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-3 h-3 rounded bg-rose-200 border border-rose-300" /> Booked
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Day-of-week headers */}
              <div className="grid grid-cols-7 gap-1.5 mb-2">
                {DAY_NAMES.map((d) => (
                  <div key={d} className="text-center text-[10px] font-semibold text-gray-400 uppercase py-1">
                    {d}
                  </div>
                ))}
              </div>
              {/* Calendar cells */}
              <div className="grid grid-cols-7 gap-1.5">
                {calendarDays.map((cell, i) => {
                  if (cell.day === null) return <div key={`blank-${i}`} />;

                  const bg =
                    cell.status === 'booked'
                      ? 'bg-rose-100 border-rose-200 text-rose-700'
                      : cell.status === 'partial'
                        ? 'bg-amber-100 border-amber-200 text-amber-700'
                        : 'bg-green-50 border-green-200 text-green-700 hover:bg-green-100';

                  return (
                    <div
                      key={cell.day}
                      className={`text-center text-xs font-medium py-2 rounded-lg border cursor-default transition-colors ${bg}`}
                    >
                      {cell.day}
                    </div>
                  );
                })}
              </div>

              {/* Legend summary */}
              <div className="flex items-center gap-4 mt-4 text-xs text-gray-500">
                <span>
                  {Object.values(activeVenue.availability).filter((s) => s === 'available').length} available days
                </span>
                <span>
                  {Object.values(activeVenue.availability).filter((s) => s === 'booked').length} booked days
                </span>
                <span>
                  {Object.values(activeVenue.availability).filter((s) => s === 'partial').length} partial days
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Rating */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Rating Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-gray-900">{activeVenue.rating}</div>
                  <div className="flex items-center gap-0.5 mt-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(activeVenue.rating)
                            ? 'text-amber-400 fill-amber-400'
                            : 'text-gray-200'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-gray-400 mt-1">{activeVenue.totalReviews} reviews</p>
                </div>

                <div className="flex-1 space-y-2">
                  {[
                    { label: '5', pct: 72 },
                    { label: '4', pct: 18 },
                    { label: '3', pct: 6 },
                    { label: '2', pct: 3 },
                    { label: '1', pct: 1 },
                  ].map((row) => (
                    <div key={row.label} className="flex items-center gap-2">
                      <span className="text-xs text-gray-500 w-3 text-right">{row.label}</span>
                      <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-amber-400 rounded-full"
                          style={{ width: `${row.pct}%` }}
                        />
                      </div>
                      <span className="text-[10px] text-gray-400 w-8 text-right">{row.pct}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
