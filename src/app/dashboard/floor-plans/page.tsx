'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { MOCK_FLOOR_PLANS, type LayoutType, type SetupStatus } from '@/lib/mock-data';
import { formatNumber, cn } from '@/lib/utils';
import {
  Search,
  LayoutGrid,
  Users,
  MapPin,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Layers,
  CalendarDays,
  Construction,
} from 'lucide-react';

const STATUS_CONFIG: Record<SetupStatus, { label: string; variant: 'success' | 'warning' | 'info' | 'destructive'; icon: React.ReactNode }> = {
  Ready: { label: 'Ready', variant: 'success', icon: <CheckCircle2 className="h-3 w-3" /> },
  'In Progress': { label: 'In Progress', variant: 'warning', icon: <Construction className="h-3 w-3" /> },
  'Not Started': { label: 'Not Started', variant: 'info', icon: <Clock className="h-3 w-3" /> },
  'Needs Revision': { label: 'Needs Revision', variant: 'destructive', icon: <AlertTriangle className="h-3 w-3" /> },
};

const LAYOUT_ICONS: Record<LayoutType, string> = {
  Theater: '🎭',
  Classroom: '📚',
  Banquet: '🍽️',
  'U-Shape': '🔗',
  Cocktail: '🥂',
  Boardroom: '👔',
};

const ZONE_BG: Record<string, string> = {
  'Keynotes and panels': 'bg-rose-50 border-rose-100',
  'General seating': 'bg-blue-50 border-blue-100',
  'VIP guests and speakers': 'bg-amber-50 border-amber-100',
  'Sponsor booths and demos': 'bg-emerald-50 border-emerald-100',
  'Center stage dancing': 'bg-purple-50 border-purple-100',
  'Seated dinner': 'bg-rose-50 border-rose-100',
  'Music and lighting control': 'bg-pink-50 border-pink-100',
  'Cocktail service': 'bg-orange-50 border-orange-100',
  'Guest photos': 'bg-violet-50 border-violet-100',
  'Food vendor area': 'bg-amber-50 border-amber-100',
  'Casual seating and networking': 'bg-teal-50 border-teal-100',
  'Live performances': 'bg-violet-50 border-violet-100',
  'Vendor presentations': 'bg-blue-50 border-blue-100',
  'Audience seating': 'bg-sky-50 border-sky-100',
  'Vendor showcase tables': 'bg-emerald-50 border-emerald-100',
  'Coffee and snacks': 'bg-orange-50 border-orange-100',
  'Workshop Zone': 'bg-emerald-50 border-emerald-100',
  'Team coding challenge': 'bg-cyan-50 border-cyan-100',
  'Device charging and refreshments': 'bg-slate-50 border-slate-200',
};

function getZoneBg(purpose: string): string {
  for (const [key, cls] of Object.entries(ZONE_BG)) {
    if (purpose.includes(key)) return cls;
  }
  return 'bg-gray-50 border-gray-100';
}

export default function FloorPlansPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [layoutFilter, setLayoutFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filtered = useMemo(() => {
    return MOCK_FLOOR_PLANS.filter((fp) => {
      const matchesLayout = layoutFilter === 'all' || fp.layoutType === layoutFilter;
      const matchesStatus = statusFilter === 'all' || fp.setupStatus === statusFilter;
      const matchesSearch =
        fp.venue.toLowerCase().includes(searchQuery.toLowerCase()) ||
        fp.eventName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        fp.layoutType.toLowerCase().includes(searchQuery.toLowerCase()) ||
        fp.assignedTeam.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesLayout && matchesStatus && matchesSearch;
    });
  }, [searchQuery, layoutFilter, statusFilter]);

  const totalCapacity = MOCK_FLOOR_PLANS.reduce((sum, fp) => sum + fp.capacity, 0);
  const readyCount = MOCK_FLOOR_PLANS.filter((fp) => fp.setupStatus === 'Ready').length;
  const needsRevisionCount = MOCK_FLOOR_PLANS.filter((fp) => fp.setupStatus === 'Needs Revision').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Floor Plan Management</h1>
        <p className="text-sm text-gray-500">
          Design venue layouts, manage zones, and track setup status across all events.
        </p>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="flex items-center gap-3 p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-100">
              <Layers className="h-5 w-5 text-rose-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Total Floor Plans</p>
              <p className="text-2xl font-bold text-gray-900">{MOCK_FLOOR_PLANS.length}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100">
              <Users className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Total Capacity</p>
              <p className="text-2xl font-bold text-blue-600">{formatNumber(totalCapacity)}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Ready</p>
              <p className="text-2xl font-bold text-green-600">{readyCount}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-100">
              <AlertTriangle className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Needs Revision</p>
              <p className="text-2xl font-bold text-red-600">{needsRevisionCount}</p>
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
            placeholder="Search by venue, event, layout type, or team..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm text-gray-900 placeholder-gray-400 transition focus:border-rose-400 focus:outline-none focus:ring-2 focus:ring-rose-100"
          />
        </div>
        <select
          value={layoutFilter}
          onChange={(e) => setLayoutFilter(e.target.value)}
          className="rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-700 transition focus:border-rose-400 focus:outline-none focus:ring-2 focus:ring-rose-100"
        >
          <option value="all">All Layouts</option>
          <option value="Theater">Theater</option>
          <option value="Classroom">Classroom</option>
          <option value="Banquet">Banquet</option>
          <option value="U-Shape">U-Shape</option>
          <option value="Cocktail">Cocktail</option>
          <option value="Boardroom">Boardroom</option>
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-700 transition focus:border-rose-400 focus:outline-none focus:ring-2 focus:ring-rose-100"
        >
          <option value="all">All Status</option>
          <option value="Ready">Ready</option>
          <option value="In Progress">In Progress</option>
          <option value="Not Started">Not Started</option>
          <option value="Needs Revision">Needs Revision</option>
        </select>
      </div>

      {/* Floor Plan Cards */}
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        {filtered.map((fp) => {
          const statusCfg = STATUS_CONFIG[fp.setupStatus];

          return (
            <Card key={fp.id} variant="interactive">
              <CardContent className="p-5">
                {/* Top Row */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{LAYOUT_ICONS[fp.layoutType]}</span>
                      <h3 className="font-semibold text-gray-900">{fp.eventName}</h3>
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">{fp.venue}</p>
                  </div>
                  <Badge variant={statusCfg.variant}>
                    {statusCfg.icon}
                    <span className="ml-1">{statusCfg.label}</span>
                  </Badge>
                </div>

                {/* Key Stats */}
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="rounded-lg bg-gray-50 px-3 py-2 text-center border border-gray-100">
                    <p className="text-xs text-gray-500">Layout</p>
                    <p className="text-sm font-bold text-gray-900">{fp.layoutType}</p>
                  </div>
                  <div className="rounded-lg bg-gray-50 px-3 py-2 text-center border border-gray-100">
                    <p className="text-xs text-gray-500">Capacity</p>
                    <p className="text-sm font-bold text-blue-600">{formatNumber(fp.capacity)}</p>
                  </div>
                  <div className="rounded-lg bg-gray-50 px-3 py-2 text-center border border-gray-100">
                    <p className="text-xs text-gray-500">Area</p>
                    <p className="text-sm font-bold text-rose-600">{formatNumber(fp.sqft)} ft²</p>
                  </div>
                </div>

                {/* Zones */}
                <div className="mb-4">
                  <p className="mb-2 flex items-center gap-1 text-xs text-gray-400">
                    <MapPin className="h-3 w-3" /> Zones ({fp.zones.length})
                  </p>
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {fp.zones.map((zone) => (
                      <div
                        key={zone.name}
                        className={`rounded-lg border px-3 py-2 ${getZoneBg(zone.purpose)}`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-medium text-gray-700">{zone.name}</span>
                          {zone.capacity > 0 && (
                            <span className="text-xs text-gray-500">
                              <Users className="mr-0.5 inline h-3 w-3" />
                              {zone.capacity}
                            </span>
                          )}
                        </div>
                        <p className="mt-0.5 text-[10px] text-gray-400">{zone.purpose}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Setup Date & Team */}
                <div className="border-t border-gray-100 pt-3 space-y-2">
                  <div className="flex flex-wrap items-center justify-between text-xs">
                    <span className="flex items-center gap-1 text-gray-500">
                      <CalendarDays className="h-3.5 w-3.5 text-rose-400" />
                      Setup Date: {fp.setupDate}
                    </span>
                    <span className="flex items-center gap-1 text-gray-500">
                      <Construction className="h-3.5 w-3.5 text-rose-400" />
                      Team: {fp.assignedTeam}
                    </span>
                  </div>
                  {fp.notes && (
                    <p className="text-xs text-gray-400 italic">{fp.notes}</p>
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
            <LayoutGrid className="mx-auto mb-3 h-10 w-10 text-gray-300" />
            <p className="text-sm text-gray-400">No floor plans match your filters.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
