'use client';

import { useState, useEffect } from 'react';
import Card, { CardTitle } from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { MOCK_LIVE } from '@/lib/mock-data';
import { formatNumber, cn } from '@/lib/utils';

/* -------------------------------------------------------------------------- */
/* Page                                                                        */
/* -------------------------------------------------------------------------- */

export default function LiveEventPage() {
  const [elapsed, setElapsed] = useState('0h 0m');
  const [viewers, setViewers] = useState(MOCK_LIVE.onlineViewers);
  const [attendees, setAttendees] = useState(MOCK_LIVE.totalAttendees);
  const [pollVotes, setPollVotes] = useState(MOCK_LIVE.polls[0].totalVotes);

  /* Elapsed timer */
  useEffect(() => {
    const start = new Date(MOCK_LIVE.startedAt).getTime();
    const tick = () => {
      const diff = Date.now() - start;
      const hours = Math.floor(diff / 3600000);
      const minutes = Math.floor((diff % 3600000) / 60000);
      setElapsed(`${hours}h ${minutes}m`);
    };
    tick();
    const interval = setInterval(tick, 60000);
    return () => clearInterval(interval);
  }, []);

  /* Simulate viewer / vote bumps */
  useEffect(() => {
    const interval = setInterval(() => {
      setViewers((v) => v + Math.floor(Math.random() * 7) - 3);
      setPollVotes((v) => v + Math.floor(Math.random() * 5));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50/50 via-white to-pink-50/30">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* ── Header ── */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Live Event Monitor</h1>
            <p className="mt-1 text-gray-500">
              Real-time event monitoring and engagement tracking
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="destructive" className="px-4 py-1.5 text-sm">
              <span className="mr-1.5 inline-block h-2 w-2 animate-pulse rounded-full bg-white" />
              Live Now
            </Badge>
            <span className="rounded-xl bg-gray-100 px-4 py-1.5 text-sm font-medium text-gray-600">
              ⏱ {elapsed}
            </span>
          </div>
        </div>

        {/* ── Event Banner ── */}
        <div className="mb-6 rounded-2xl border border-rose-100 bg-gradient-to-r from-rose-600 via-rose-500 to-pink-500 p-6 text-white shadow-lg shadow-rose-200/50">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-2xl font-bold">{MOCK_LIVE.event}</h2>
              <p className="mt-1 text-rose-100">
                Currently: {MOCK_LIVE.currentSession}
              </p>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-center">
                <p className="text-3xl font-bold">{formatNumber(attendees)}</p>
                <p className="text-xs text-rose-200">In Person</p>
              </div>
              <div className="h-10 w-px bg-rose-400" />
              <div className="text-center">
                <p className="text-3xl font-bold">{formatNumber(viewers)}</p>
                <p className="text-xs text-rose-200">Online</p>
              </div>
              <div className="h-10 w-px bg-rose-400" />
              <div className="text-center">
                <p className="text-3xl font-bold">{formatNumber(attendees + viewers)}</p>
                <p className="text-xs text-rose-200">Total</p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Stats Row ── */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardTitle className="text-sm font-medium text-gray-500">Engagement Score</CardTitle>
            <div className="mt-3 flex items-baseline gap-2">
              <p className="text-4xl font-bold text-emerald-600">{MOCK_LIVE.engagementScore}</p>
              <span className="text-sm font-medium text-emerald-500">/ 100</span>
            </div>
            <p className="mt-1 text-xs text-gray-400">+5 from session start</p>
          </Card>

          <Card>
            <CardTitle className="text-sm font-medium text-gray-500">Sessions</CardTitle>
            <div className="mt-3 flex items-baseline gap-2">
              <p className="text-4xl font-bold text-rose-600">1</p>
              <span className="text-sm text-gray-400">/ 4 live</span>
            </div>
            <p className="mt-1 text-xs text-gray-400">3 upcoming</p>
          </Card>

          <Card>
            <CardTitle className="text-sm font-medium text-gray-500">Q&A Queue</CardTitle>
            <div className="mt-3 flex items-baseline gap-2">
              <p className="text-4xl font-bold text-amber-600">
                {MOCK_LIVE.qaQueue.filter((q) => q.status === 'pending').length}
              </p>
              <span className="text-sm text-gray-400">pending</span>
            </div>
            <p className="mt-1 text-xs text-gray-400">
              {MOCK_LIVE.qaQueue.filter((q) => q.status === 'answered').length} answered
            </p>
          </Card>

          <Card>
            <CardTitle className="text-sm font-medium text-gray-500">Active Poll</CardTitle>
            <div className="mt-3 flex items-baseline gap-2">
              <p className="text-4xl font-bold text-blue-600">{formatNumber(pollVotes)}</p>
              <span className="text-sm text-gray-400">votes</span>
            </div>
            <p className="mt-1 text-xs text-gray-400">1 active poll</p>
          </Card>
        </div>

        {/* ── Engagement + Q&A ── */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Engagement Trend */}
          <Card className="lg:col-span-2">
            <CardTitle>Engagement Over Time</CardTitle>
            <div className="mt-6">
              <div className="relative h-48">
                <div className="absolute left-0 top-0 flex h-full flex-col justify-between text-xs text-gray-400">
                  <span>100</span>
                  <span>80</span>
                  <span>60</span>
                  <span>40</span>
                  <span>20</span>
                  <span>0</span>
                </div>

                <div className="ml-8 flex h-full items-end gap-1">
                  {MOCK_LIVE.engagementTrend.map((point, i) => {
                    const height = (point.score / 100) * 100;
                    const isLast = i === MOCK_LIVE.engagementTrend.length - 1;
                    return (
                      <div key={point.time} className="group relative flex flex-1 items-end">
                        <div
                          className="w-full rounded-t-lg bg-gradient-to-t from-rose-400 to-rose-300 transition-all duration-500"
                          style={{ height: `${height}%` }}
                        />
                        <div className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-gray-900 px-2 py-1 text-xs text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
                          {point.score}
                        </div>
                        {isLast && (
                          <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                            <span className="inline-block h-3 w-3 rounded-full bg-rose-500 ring-4 ring-rose-200" />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className="ml-8 mt-2 flex justify-between">
                  {MOCK_LIVE.engagementTrend.map((point) => (
                    <span key={point.time} className="flex-1 text-center text-xs text-gray-400">
                      {point.time}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          {/* Q&A Queue */}
          <Card>
            <div className="flex items-center justify-between">
              <CardTitle>Q&A Queue</CardTitle>
              <Badge variant="warning">
                {MOCK_LIVE.qaQueue.filter((q) => q.status === 'pending').length} pending
              </Badge>
            </div>
            <div className="mt-4 space-y-3">
              {MOCK_LIVE.qaQueue.map((qa) => (
                <div
                  key={qa.id}
                  className="rounded-xl border border-gray-100 p-3 transition-colors hover:border-rose-100 hover:bg-rose-50/30"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-gray-900 line-clamp-2">
                        {qa.question}
                      </p>
                      <p className="mt-1 text-xs text-gray-400">— {qa.attendee}</p>
                    </div>
                    <div className="flex shrink-0 flex-col items-center gap-0.5">
                      <span className="text-xs font-bold text-rose-500">▲ {qa.votes}</span>
                      <Badge variant={qa.status === 'answered' ? 'success' : 'secondary'} size="sm">
                        {qa.status}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* ── Sessions + Polls ── */}
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Session List */}
          <Card className="lg:col-span-2">
            <CardTitle>Session Attendance</CardTitle>
            <div className="mt-4 space-y-3">
              {MOCK_LIVE.sessions.map((session) => {
                const pct =
                  session.status === 'live'
                    ? Math.round((session.attendance / session.capacity) * 100)
                    : 0;
                return (
                  <div
                    key={session.id}
                    className={cn(
                      'rounded-xl border p-4 transition-all',
                      session.status === 'live'
                        ? 'border-rose-200 bg-rose-50/50 shadow-sm'
                        : 'border-gray-100 bg-gray-50/50',
                    )}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-semibold text-gray-900">{session.title}</h4>
                          {session.status === 'live' && (
                            <Badge variant="destructive" size="sm">Live</Badge>
                          )}
                          {session.status === 'upcoming' && (
                            <Badge variant="secondary" size="sm">Upcoming</Badge>
                          )}
                        </div>
                        <p className="mt-0.5 text-xs text-gray-500">{session.speaker}</p>
                      </div>
                      {session.status === 'live' && (
                        <div className="text-right">
                          <p className="text-lg font-bold text-rose-600">
                            {formatNumber(session.attendance)}
                          </p>
                          <p className="text-xs text-gray-400">
                            / {formatNumber(session.capacity)}
                          </p>
                        </div>
                      )}
                      {session.status === 'upcoming' && session.scheduledFor && (
                        <div className="text-right">
                          <p className="text-xs font-medium text-gray-500">
                            Starts at{' '}
                            {new Date(session.scheduledFor).toLocaleTimeString('en-US', {
                              hour: 'numeric',
                              minute: '2-digit',
                              hour12: true,
                            })}
                          </p>
                        </div>
                      )}
                    </div>

                    {session.status === 'live' && (
                      <div className="mt-3">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-gray-500">Attendance</span>
                          <span className="font-medium text-rose-600">{pct}%</span>
                        </div>
                        <div className="mt-1 h-2 overflow-hidden rounded-full bg-rose-100">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-rose-400 to-rose-500 transition-all duration-500"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Polling Results */}
          <Card>
            {MOCK_LIVE.polls.map((poll) => (
              <div key={poll.id}>
                <div className="flex items-center justify-between">
                  <CardTitle>Live Poll</CardTitle>
                  <Badge variant="success">Active</Badge>
                </div>
                <p className="mt-3 text-sm font-medium text-gray-700">{poll.question}</p>
                <div className="mt-4 space-y-3">
                  {poll.options.map((option) => (
                    <div key={option.label}>
                      <div className="mb-1 flex items-center justify-between">
                        <span className="text-sm text-gray-700">{option.label}</span>
                        <span className="text-sm font-semibold text-rose-600">
                          {option.percentage}%
                        </span>
                      </div>
                      <div className="h-3 overflow-hidden rounded-full bg-gray-100">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-rose-400 to-pink-400 transition-all duration-700"
                          style={{ width: `${option.percentage}%` }}
                        />
                      </div>
                      <p className="mt-0.5 text-xs text-gray-400">{option.votes} votes</p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 rounded-xl bg-gray-50 px-4 py-2.5 text-center">
                  <p className="text-sm text-gray-500">Total votes</p>
                  <p className="text-xl font-bold text-gray-900">{formatNumber(pollVotes)}</p>
                </div>
              </div>
            ))}
          </Card>
        </div>
      </div>
    </div>
  );
}
