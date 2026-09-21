'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { MOCK_ACCOMMODATION, type AccommodationStatus } from '@/lib/mock-data';
import { formatCurrency, formatNumber, cn } from '@/lib/utils';
import {
  Search,
  Hotel,
  Star,
  MapPin,
  Phone,
  Mail,
  BedDouble,
  TrendingUp,
  AlertTriangle,
  CalendarClock,
} from 'lucide-react';

const STATUS_CONFIG: Record<AccommodationStatus, { label: string; variant: 'success' | 'warning' | 'info' | 'destructive' }> = {
  Active: { label: 'Active', variant: 'success' },
  'Booking Open': { label: 'Booking Open', variant: 'info' },
  'Almost Full': { label: 'Almost Full', variant: 'warning' },
  'Sold Out': { label: 'Sold Out', variant: 'destructive' },
  Expired: { label: 'Expired', variant: 'destructive' },
};

function OccupancyBar({ booked, total }: { booked: number; total: number }) {
  const pct = total > 0 ? Math.round((booked / total) * 100) : 0;
  const barColor =
    pct >= 95
      ? 'bg-red-500'
      : pct >= 75
        ? 'bg-amber-500'
        : 'bg-green-500';
  const textColor =
    pct >= 95 ? 'text-red-600' : pct >= 75 ? 'text-amber-600' : 'text-green-600';

  return (
    <div className="w-full">
      <div className="mb-1 flex items-center justify-between text-xs">
        <span className="text-gray-500">
          {booked}/{total} rooms
        </span>
        <span className={`font-medium ${textColor}`}>{pct}%</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
        <div
          className={`h-full rounded-full transition-all duration-500 ${barColor}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

export default function AccommodationPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filtered = useMemo(() => {
    return MOCK_ACCOMMODATION.filter((h) => {
      const matchesStatus = statusFilter === 'all' || h.status === statusFilter;
      const matchesSearch =
        h.propertyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        h.hotelGroup.toLowerCase().includes(searchQuery.toLowerCase()) ||
        h.event.toLowerCase().includes(searchQuery.toLowerCase()) ||
        h.city.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  }, [searchQuery, statusFilter]);

  const totalRooms = MOCK_ACCOMMODATION.reduce((sum, h) => sum + h.totalRooms, 0);
  const totalBooked = MOCK_ACCOMMODATION.reduce((sum, h) => sum + h.totalBooked, 0);
  const avgRate = MOCK_ACCOMMODATION.reduce((sum, h) => sum + h.blockRate, 0) / MOCK_ACCOMMODATION.length;
  const soldOutCount = MOCK_ACCOMMODATION.filter((h) => h.status === 'Sold Out').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Accommodation Blocks</h1>
        <p className="text-sm text-gray-500">
          Manage hotel room blocks, track bookings, monitor occupancy, and handle cut-off dates.
        </p>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="flex items-center gap-3 p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-100">
              <Hotel className="h-5 w-5 text-rose-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Total Properties</p>
              <p className="text-2xl font-bold text-gray-900">{MOCK_ACCOMMODATION.length}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100">
              <BedDouble className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Rooms Booked</p>
              <p className="text-2xl font-bold text-blue-600">
                {totalBooked}/{formatNumber(totalRooms)}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100">
              <TrendingUp className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Avg. Block Rate</p>
              <p className="text-2xl font-bold text-green-600">{formatCurrency(avgRate * 100)}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-100">
              <AlertTriangle className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Sold Out</p>
              <p className="text-2xl font-bold text-red-600">{soldOutCount}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by property, hotel group, event, or city..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm text-gray-900 placeholder-gray-400 transition focus:border-rose-400 focus:outline-none focus:ring-2 focus:ring-rose-100"
          />
        </div>
        <div className="flex gap-2">
          {['all', 'Active', 'Booking Open', 'Almost Full', 'Sold Out', 'Expired'].map((f) => (
            <button
              key={f}
              onClick={() => setStatusFilter(f)}
              className={cn(
                'rounded-lg px-3 py-2 text-xs font-medium transition',
                statusFilter === f
                  ? 'bg-rose-100 text-rose-700 border border-rose-200'
                  : 'text-gray-500 hover:text-gray-700 border border-transparent hover:border-gray-200'
              )}
            >
              {f === 'all' ? 'All' : f}
            </button>
          ))}
        </div>
      </div>

      {/* Hotel Cards */}
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        {filtered.map((hotel) => {
          const statusCfg = STATUS_CONFIG[hotel.status];

          return (
            <Card key={hotel.id} variant="interactive">
              <CardContent className="p-5">
                {/* Top Row */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-gray-900">{hotel.propertyName}</h3>
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: hotel.starRating }, (_, i) => (
                          <Star key={i} className="h-3 w-3 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">{hotel.hotelGroup}</p>
                  </div>
                  <Badge variant={statusCfg.variant}>{statusCfg.label}</Badge>
                </div>

                {/* Location & Event */}
                <div className="flex flex-wrap items-center gap-3 mb-3 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5 text-rose-400" />
                    {hotel.address}, {hotel.city}
                  </span>
                  <span className="rounded-md bg-rose-50 px-2 py-0.5 text-rose-700 border border-rose-100">
                    {hotel.event}
                  </span>
                </div>

                {/* Occupancy Bar */}
                <div className="mb-4">
                  <OccupancyBar booked={hotel.totalBooked} total={hotel.totalRooms} />
                </div>

                {/* Room Types Table */}
                <div className="mb-4 overflow-hidden rounded-lg border border-gray-200">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b border-gray-100 bg-gray-50">
                        <th className="px-3 py-2 text-left font-medium text-gray-500">Room Type</th>
                        <th className="px-3 py-2 text-center font-medium text-gray-500">Total</th>
                        <th className="px-3 py-2 text-center font-medium text-gray-500">Booked</th>
                        <th className="px-3 py-2 text-right font-medium text-gray-500">Rate</th>
                      </tr>
                    </thead>
                    <tbody>
                      {hotel.roomTypes.map((rt) => (
                        <tr key={rt.type} className="border-b border-gray-50 last:border-b-0">
                          <td className="px-3 py-2 text-gray-700">{rt.type}</td>
                          <td className="px-3 py-2 text-center text-gray-500">{rt.total}</td>
                          <td className="px-3 py-2 text-center">
                            <span className={rt.booked === rt.total ? 'font-semibold text-red-600' : 'text-gray-600'}>
                              {rt.booked}
                            </span>
                          </td>
                          <td className="px-3 py-2 text-right font-medium text-rose-600">
                            {formatCurrency(rt.rate * 100)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Cut-off & Contact */}
                <div className="border-t border-gray-100 pt-3 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="flex items-center gap-1 text-gray-500">
                      <CalendarClock className="h-3.5 w-3.5 text-rose-400" />
                      Cut-off Date
                    </span>
                    <span className="font-medium text-gray-700">{hotel.cutoffDate}</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Phone className="h-3 w-3 text-rose-400" />
                      {hotel.contactPhone}
                    </span>
                    <span className="flex items-center gap-1">
                      <Mail className="h-3 w-3 text-rose-400" />
                      {hotel.contactEmail}
                    </span>
                  </div>
                  {hotel.notes && (
                    <p className="text-xs text-gray-400 italic">{hotel.notes}</p>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Hotel className="mx-auto mb-3 h-10 w-10 text-gray-300" />
            <p className="text-sm text-gray-400">No hotel blocks match your filters.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
