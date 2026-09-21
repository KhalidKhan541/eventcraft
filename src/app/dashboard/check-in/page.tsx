'use client';

import { useState, useEffect } from 'react';
import Card, { CardTitle } from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { MOCK_EVENTS, MOCK_CHECKINS } from '@/lib/mock-data';
import { formatNumber, cn } from '@/lib/utils';

/* -------------------------------------------------------------------------- */
/* Helpers                                                                     */
/* -------------------------------------------------------------------------- */

const checkinTypeBadge: Record<
  string,
  { label: string; variant: 'success' | 'info' | 'warning' }
> = {
  qr: { label: 'QR Scan', variant: 'success' },
  manual: { label: 'Manual', variant: 'info' },
  'walk-in': { label: 'Walk-in', variant: 'warning' },
};

/* -------------------------------------------------------------------------- */
/* Page                                                                        */
/* -------------------------------------------------------------------------- */

export default function CheckInPage() {
  const [selectedEvent, setSelectedEvent] = useState(MOCK_EVENTS[0].id);
  const [liveCount, setLiveCount] = useState(MOCK_CHECKINS.checkedIn);
  const [recentFeed, setRecentFeed] = useState(MOCK_CHECKINS.recentCheckins);

  const event = MOCK_EVENTS.find((e) => e.id === selectedEvent);
  const checkinRate = ((liveCount / MOCK_CHECKINS.totalRegistered) * 100).toFixed(1);

  /* Simulate live check-ins every 4 s */
  useEffect(() => {
    const names = [
      'Jordan Blake', 'Yuki Tanaka', 'Olivia Peters', 'Raj Mehta',
      'Chloe Dubois', 'Hassan Ali', 'Mia Rodriguez', 'Lucas Fernandes',
    ];
    const types: Array<'qr' | 'manual' | 'walk-in'> = ['qr', 'qr', 'qr', 'manual', 'walk-in'];
    const tickets = ['General', 'VIP', 'Speaker'];

    const interval = setInterval(() => {
      const name = names[Math.floor(Math.random() * names.length)];
      const type = types[Math.floor(Math.random() * types.length)];
      const ticket = tickets[Math.floor(Math.random() * tickets.length)];

      const newCheckin = {
        id: `c-${Date.now()}`,
        name,
        type,
        time: new Date().toISOString(),
        ticketType: ticket,
      };

      setRecentFeed((prev) => [newCheckin, ...prev.slice(0, 19)]);
      setLiveCount((prev) => prev + 1);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50/50 via-white to-pink-50/30">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* ── Header ── */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Check-in Dashboard</h1>
            <p className="mt-1 text-gray-500">
              Real-time attendee registration and check-in monitoring
            </p>
          </div>

          {/* Event Selector */}
          <div className="flex items-center gap-3">
            <label htmlFor="event-select" className="text-sm font-medium text-gray-700">
              Event:
            </label>
            <select
              id="event-select"
              value={selectedEvent}
              onChange={(e) => setSelectedEvent(e.target.value)}
              className="rounded-xl border border-rose-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-900 shadow-sm transition-colors focus:border-rose-400 focus:outline-none focus:ring-2 focus:ring-rose-200"
            >
              {MOCK_EVENTS.map((evt) => (
                <option key={evt.id} value={evt.id}>
                  {evt.name} — {evt.date}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* ── Event Info Banner ── */}
        {event && (
          <div className="mb-6 rounded-2xl border border-rose-100 bg-gradient-to-r from-rose-500 to-pink-500 p-6 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold">{event.name}</h2>
                <p className="mt-1 text-rose-100">
                  {event.venue} • {event.date}
                </p>
              </div>
              <Badge variant="default" className="bg-white/20 text-white border-white/30">
                <span className="mr-1.5 inline-block h-2 w-2 animate-pulse rounded-full bg-white" />
                Live
              </Badge>
            </div>
          </div>
        )}

        {/* ── Stats Grid ── */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* Total Registered */}
          <Card>
            <CardTitle className="text-sm font-medium text-gray-500">Total Registered</CardTitle>
            <p className="mt-2 text-3xl font-bold text-gray-900">
              {formatNumber(MOCK_CHECKINS.totalRegistered)}
            </p>
            <p className="mt-1 text-xs text-gray-400">
              Capacity: {formatNumber(event?.maxCapacity ?? 800)}
            </p>
          </Card>

          {/* Checked In */}
          <Card>
            <CardTitle className="text-sm font-medium text-gray-500">Checked In</CardTitle>
            <div className="mt-2 flex items-baseline gap-2">
              <p className="text-3xl font-bold text-emerald-600">{formatNumber(liveCount)}</p>
              <span className="text-sm font-medium text-emerald-500">{checkinRate}%</span>
            </div>
            <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
              <div
                className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-emerald-500 transition-all duration-500"
                style={{ width: `${Math.min(Number(checkinRate), 100)}%` }}
              />
            </div>
          </Card>

          {/* Walk-ins */}
          <Card>
            <CardTitle className="text-sm font-medium text-gray-500">Walk-ins</CardTitle>
            <p className="mt-2 text-3xl font-bold text-amber-600">
              {formatNumber(MOCK_CHECKINS.walkIns)}
            </p>
            <p className="mt-1 text-xs text-gray-400">
              {((MOCK_CHECKINS.walkIns / MOCK_CHECKINS.totalRegistered) * 100).toFixed(1)}% of
              registered
            </p>
          </Card>

          {/* QR Scans */}
          <Card>
            <CardTitle className="text-sm font-medium text-gray-500">QR Scans</CardTitle>
            <p className="mt-2 text-3xl font-bold text-blue-600">
              {formatNumber(MOCK_CHECKINS.qrScans)}
            </p>
            <p className="mt-1 text-xs text-gray-400">
              {((MOCK_CHECKINS.qrScans / liveCount) * 100).toFixed(0)}% of check-ins
            </p>
          </Card>
        </div>

        {/* ── Chart + Live Feed ── */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
          {/* Check-in Over Time */}
          <Card className="lg:col-span-2">
            <CardTitle>Check-ins by Hour</CardTitle>
            <div className="mt-4 space-y-3">
              {MOCK_CHECKINS.byHour.map((slot) => {
                const maxCount = Math.max(...MOCK_CHECKINS.byHour.map((s) => s.count));
                const pct = (slot.count / maxCount) * 100;
                return (
                  <div key={slot.hour} className="flex items-center gap-3">
                    <span className="w-12 text-xs font-medium text-gray-500">{slot.hour}</span>
                    <div className="flex-1">
                      <div className="h-6 overflow-hidden rounded-lg bg-gray-50">
                        <div
                          className="h-full rounded-lg bg-gradient-to-r from-rose-400 to-rose-500 transition-all duration-700"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                    <span className="w-10 text-right text-xs font-semibold text-gray-700">
                      {slot.count}
                    </span>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Live Check-in Feed */}
          <Card className="lg:col-span-3">
            <div className="flex items-center justify-between">
              <CardTitle>Live Check-in Feed</CardTitle>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
                <span className="text-xs font-medium text-emerald-600">Live</span>
              </div>
            </div>

            <div className="mt-4 space-y-1 overflow-hidden">
              {recentFeed.slice(0, 10).map((checkin, i) => {
                const config = checkinTypeBadge[checkin.type];
                return (
                  <div
                    key={checkin.id}
                    className={cn(
                      'flex items-center justify-between rounded-xl px-4 py-3 transition-colors hover:bg-rose-50/50',
                      i === 0 && 'animate-fade-in',
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-rose-100 text-sm font-bold text-rose-600">
                        {checkin.name
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{checkin.name}</p>
                        <p className="text-xs text-gray-400">
                          {new Date(checkin.time).toLocaleTimeString('en-US', {
                            hour: 'numeric',
                            minute: '2-digit',
                            hour12: true,
                          })}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium text-gray-500">
                        {checkin.ticketType}
                      </span>
                      <Badge variant={config.variant}>{config.label}</Badge>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>

        {/* ── Ticket Type Breakdown ── */}
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
          <Card variant="interactive">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-rose-100">
                <svg className="h-6 w-6 text-rose-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">VIP Passes</p>
                <p className="text-2xl font-bold text-gray-900">156</p>
                <p className="text-xs text-emerald-600">94% checked in</p>
              </div>
            </div>
          </Card>

          <Card variant="interactive">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-pink-100">
                <svg className="h-6 w-6 text-pink-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">General Admission</p>
                <p className="text-2xl font-bold text-gray-900">340</p>
                <p className="text-xs text-emerald-600">71% checked in</p>
              </div>
            </div>
          </Card>

          <Card variant="interactive">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
                <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Speaker Passes</p>
                <p className="text-2xl font-bold text-gray-900">49</p>
                <p className="text-xs text-emerald-600">100% checked in</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
