'use client';

import { useState, useMemo } from 'react';
import {
  Search,
  Clock,
  Users,
  MapPin,
  Mic2,
  CalendarDays,
  Filter,
  Layers,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { MOCK_SESSIONS } from '@/lib/mock-data';
import type { TrackColor } from '@/lib/mock-data';

const TRACK_STYLES: Record<TrackColor, { bg: string; border: string; text: string; dot: string }> = {
  rose: { bg: 'bg-rose-50', border: 'border-rose-200', text: 'text-rose-700', dot: 'bg-rose-500' },
  violet: { bg: 'bg-violet-50', border: 'border-violet-200', text: 'text-violet-700', dot: 'bg-violet-500' },
  teal: { bg: 'bg-teal-50', border: 'border-teal-200', text: 'text-teal-700', dot: 'bg-teal-500' },
  amber: { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700', dot: 'bg-amber-500' },
  sky: { bg: 'bg-sky-50', border: 'border-sky-200', text: 'text-sky-700', dot: 'bg-sky-500' },
  emerald: { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700', dot: 'bg-emerald-500' },
};

const statusConfig: Record<string, { label: string; variant: 'success' | 'info' | 'warning' | 'secondary' | 'destructive' }> = {
  live: { label: 'Live', variant: 'destructive' },
  scheduled: { label: 'Scheduled', variant: 'info' },
  completed: { label: 'Completed', variant: 'success' },
  draft: { label: 'Draft', variant: 'secondary' },
  cancelled: { label: 'Cancelled', variant: 'destructive' },
};

// Group by date then startTime
function groupByDate(sessions: typeof MOCK_SESSIONS) {
  const map = new Map<string, typeof MOCK_SESSIONS>();
  for (const s of sessions) {
    const key = s.date;
    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push(s);
  }
  // Sort within each group by startTime
  for (const arr of map.values()) {
    arr.sort((a, b) => a.startTime.localeCompare(b.startTime));
  }
  return Array.from(map.entries()).sort(([a], [b]) => a.localeCompare(b));
}

function formatTime(t: string) {
  const [h, m] = t.split(':').map(Number);
  const ampm = h >= 12 ? 'PM' : 'AM';
  const hour = h % 12 || 12;
  return `${hour}:${String(m).padStart(2, '0')} ${ampm}`;
}

export default function SessionsPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [trackFilter, setTrackFilter] = useState<string>('all');

  const allTracks = useMemo(() => {
    const set = new Set(MOCK_SESSIONS.map((s) => s.track));
    return ['all', ...Array.from(set).sort()];
  }, []);

  const filtered = useMemo(() => {
    return MOCK_SESSIONS.filter((s) => {
      const matchStatus = statusFilter === 'all' || s.status === statusFilter;
      const matchTrack = trackFilter === 'all' || s.track === trackFilter;
      const matchSearch =
        s.title.toLowerCase().includes(search.toLowerCase()) ||
        s.speaker.toLowerCase().includes(search.toLowerCase()) ||
        s.room.toLowerCase().includes(search.toLowerCase()) ||
        s.eventName.toLowerCase().includes(search.toLowerCase());
      return matchStatus && matchTrack && matchSearch;
    });
  }, [search, statusFilter, trackFilter]);

  const grouped = useMemo(() => groupByDate(filtered), [filtered]);

  const formatDate = (d: string) => {
    const date = new Date(d + 'T00:00:00');
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Sessions</h1>
        <p className="text-sm text-gray-500 mt-1">Schedule, tracks, and session management</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Sessions', value: MOCK_SESSIONS.length, icon: Layers, color: 'text-rose-600 bg-rose-100' },
          {
            label: 'Unique Speakers',
            value: new Set(MOCK_SESSIONS.map((s) => s.speakerId)).size,
            icon: Mic2,
            color: 'text-violet-600 bg-violet-100',
          },
          {
            label: 'Total Registrations',
            value: MOCK_SESSIONS.reduce((s, sess) => s + sess.attendeeCount, 0).toLocaleString(),
            icon: Users,
            color: 'text-green-600 bg-green-100',
          },
          {
            label: 'Unique Rooms',
            value: new Set(MOCK_SESSIONS.map((s) => s.room)).size,
            icon: MapPin,
            color: 'text-amber-600 bg-amber-100',
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

      {/* Search + Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search sessions, speakers, or rooms..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-rose-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500 bg-white"
          />
        </div>
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          <Filter className="w-4 h-4 text-gray-400 shrink-0" />
          {(['all', 'scheduled', 'live', 'completed', 'draft'] as const).map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                statusFilter === s
                  ? 'bg-rose-100 text-rose-700'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Track Filters */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <CalendarDays className="w-4 h-4 text-gray-400 shrink-0" />
        {allTracks.map((track) => (
          <button
            key={track}
            onClick={() => setTrackFilter(track)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
              trackFilter === track
                ? 'bg-rose-600 text-white'
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            {track === 'all' ? 'All Tracks' : track}
          </button>
        ))}
      </div>

      {/* Schedule */}
      <div className="space-y-8">
        {grouped.map(([date, sessions]) => (
          <div key={date}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-rose-100 flex items-center justify-center shrink-0">
                <CalendarDays className="w-5 h-5 text-rose-600" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-gray-900">{formatDate(date)}</h2>
                <p className="text-xs text-gray-400">{sessions.length} session{sessions.length > 1 ? 's' : ''}</p>
              </div>
            </div>

            <div className="space-y-3 ml-5 border-l-2 border-rose-100 pl-6">
              {sessions.map((session) => {
                const track = TRACK_STYLES[session.trackColor];
                const status = statusConfig[session.status] || statusConfig.draft;
                const fillPct =
                  session.maxAttendees > 0
                    ? Math.round((session.attendeeCount / session.maxAttendees) * 100)
                    : 0;

                return (
                  <Card key={session.id} variant="interactive">
                    <CardContent className="p-5">
                      <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                        {/* Time */}
                        <div className="shrink-0 lg:w-36">
                          <div className="flex items-center gap-1.5 text-sm font-semibold text-gray-900">
                            <Clock className="w-4 h-4 text-rose-500" />
                            {formatTime(session.startTime)}
                          </div>
                          <p className="text-[11px] text-gray-400 mt-0.5 ml-5.5">
                            to {formatTime(session.endTime)}
                          </p>
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <span
                                  className={`w-2 h-2 rounded-full shrink-0 ${track.dot}`}
                                />
                                <Badge variant="outline" size="sm" className={track.text}>
                                  {session.track}
                                </Badge>
                                <Badge variant={status.variant} size="sm">
                                  {status.label}
                                </Badge>
                              </div>
                              <h3 className="text-sm font-semibold text-gray-900 leading-snug">
                                {session.title}
                              </h3>
                              <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                                {session.description}
                              </p>
                            </div>
                          </div>

                          <div className="flex flex-wrap items-center gap-4 mt-3 text-xs text-gray-500">
                            <span className="flex items-center gap-1">
                              <Mic2 className="w-3.5 h-3.5 text-violet-400" />
                              {session.speaker}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3.5 h-3.5 text-rose-400" />
                              {session.room}
                            </span>
                            <span className="flex items-center gap-1">
                              <Users className="w-3.5 h-3.5 text-green-400" />
                              {session.attendeeCount}/{session.maxAttendees}
                            </span>
                          </div>

                          {/* Capacity bar */}
                          {session.maxAttendees > 0 && (
                            <div className="mt-3">
                              <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                <div
                                  className={`h-full rounded-full transition-all duration-500 ${
                                    fillPct >= 90
                                      ? 'bg-green-500'
                                      : fillPct >= 60
                                        ? 'bg-rose-500'
                                        : 'bg-amber-400'
                                  }`}
                                  style={{ width: `${Math.min(fillPct, 100)}%` }}
                                />
                              </div>
                              <p className="text-[10px] text-gray-400 mt-1">{fillPct}% capacity</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {grouped.length === 0 && (
        <div className="text-center py-16">
          <Layers className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500 font-medium">No sessions found</p>
          <p className="text-sm text-gray-400 mt-1">Try adjusting your filters</p>
        </div>
      )}
    </div>
  );
}
