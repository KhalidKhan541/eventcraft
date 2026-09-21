'use client';

import { useState } from 'react';
import Card, { CardTitle } from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { MOCK_FEEDBACK } from '@/lib/mock-data';
import { formatNumber, cn } from '@/lib/utils';

/* -------------------------------------------------------------------------- */
/* Constants                                                                   */
/* -------------------------------------------------------------------------- */

type Tab = 'overview' | 'sessions' | 'speakers' | 'venue';

const sentimentBadge: Record<string, { variant: 'success' | 'warning' | 'destructive' }> = {
  positive: { variant: 'success' },
  neutral: { variant: 'warning' },
  negative: { variant: 'destructive' },
};

const sentimentColor: Record<string, string> = {
  positive: 'bg-emerald-500',
  neutral: 'bg-amber-500',
  negative: 'bg-red-500',
};

/* -------------------------------------------------------------------------- */
/* Shared Star icon                                                            */
/* -------------------------------------------------------------------------- */

function StarIcon({ filled, className = 'h-4 w-4' }: { filled: boolean; className?: string }) {
  return (
    <svg
      className={cn(className, filled ? 'text-amber-400' : 'text-gray-200')}
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

function StarRow({ rating, size = 'h-4 w-4' }: { rating: number; size?: string }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <StarIcon key={s} filled={s <= Math.round(rating)} className={size} />
      ))}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Page                                                                        */
/* -------------------------------------------------------------------------- */

export default function FeedbackPage() {
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const fb = MOCK_FEEDBACK;

  const tabs: { id: Tab; label: string }[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'sessions', label: 'Sessions' },
    { id: 'speakers', label: 'Speakers' },
    { id: 'venue', label: 'Venue' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50/50 via-white to-pink-50/30">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* ── Header ── */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Feedback &amp; Surveys</h1>
            <p className="mt-1 text-gray-500">
              {fb.eventName} — Post-event feedback analytics
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="success" className="px-4 py-1.5 text-sm">
              {formatNumber(fb.totalResponses)} responses
            </Badge>
            <span className="rounded-xl bg-rose-100 px-4 py-1.5 text-sm font-semibold text-rose-700">
              {fb.responseRate}% response rate
            </span>
          </div>
        </div>

        {/* ── Tab Navigation ── */}
        <div className="mb-8 flex gap-1 rounded-2xl border border-rose-100 bg-white p-1.5 shadow-sm">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'flex-1 rounded-xl px-4 py-2.5 text-sm font-medium transition-all',
                activeTab === tab.id
                  ? 'bg-rose-500 text-white shadow-sm'
                  : 'text-gray-600 hover:bg-rose-50 hover:text-rose-700',
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ══════════════════════════════════════════════════════════════════════ */}
        {/* OVERVIEW TAB                                                          */}
        {/* ══════════════════════════════════════════════════════════════════════ */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Top Stats */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {/* Overall Rating */}
              <Card>
                <CardTitle className="text-sm font-medium text-gray-500">Overall Rating</CardTitle>
                <div className="mt-3 flex items-baseline gap-2">
                  <p className="text-4xl font-bold text-rose-600">{fb.overallRating}</p>
                  <span className="text-lg text-gray-400">/ 5</span>
                </div>
                <div className="mt-2">
                  <StarRow rating={fb.overallRating} />
                </div>
                <p className="mt-1 text-xs text-gray-400">{formatNumber(fb.totalResponses)} ratings</p>
              </Card>

              {/* NPS Score */}
              <Card>
                <CardTitle className="text-sm font-medium text-gray-500">NPS Score</CardTitle>
                <div className="mt-3 flex items-baseline gap-2">
                  <p className="text-4xl font-bold text-emerald-600">{fb.npsScore}</p>
                  <Badge variant="success" size="sm">Excellent</Badge>
                </div>
                <div className="mt-2 flex gap-1">
                  <div className="flex-1 rounded-full bg-emerald-400 py-0.5 text-center text-[10px] font-bold text-white">
                    {fb.npsBreakdown.promoters}%
                  </div>
                  <div className="flex-1 rounded-full bg-amber-400 py-0.5 text-center text-[10px] font-bold text-white">
                    {fb.npsBreakdown.passives}%
                  </div>
                  <div className="flex-1 rounded-full bg-red-400 py-0.5 text-center text-[10px] font-bold text-white">
                    {fb.npsBreakdown.detractors}%
                  </div>
                </div>
                <p className="mt-1 text-xs text-gray-400">Promoters · Passives · Detractors</p>
              </Card>

              {/* Response Rate */}
              <Card>
                <CardTitle className="text-sm font-medium text-gray-500">Response Rate</CardTitle>
                <div className="mt-3 flex items-baseline gap-2">
                  <p className="text-4xl font-bold text-blue-600">{fb.responseRate}%</p>
                </div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-gray-100">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-blue-400 to-blue-500"
                    style={{ width: `${fb.responseRate}%` }}
                  />
                </div>
                <p className="mt-1 text-xs text-gray-400">
                  {formatNumber(fb.totalResponses)} of {formatNumber(545)} attendees
                </p>
              </Card>

              {/* Venue Rating */}
              <Card>
                <CardTitle className="text-sm font-medium text-gray-500">Venue Rating</CardTitle>
                <div className="mt-3 flex items-baseline gap-2">
                  <p className="text-4xl font-bold text-violet-600">{fb.venueRating.overall}</p>
                  <span className="text-lg text-gray-400">/ 5</span>
                </div>
                <div className="mt-2">
                  <StarRow rating={fb.venueRating.overall} />
                </div>
                <p className="mt-1 text-xs text-gray-400">6 categories rated</p>
              </Card>
            </div>

            {/* Distribution + Sentiment */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              {/* Rating Distribution */}
              <Card>
                <CardTitle>Rating Distribution</CardTitle>
                <div className="mt-4 space-y-3">
                  {fb.ratingDistribution.map((row) => (
                    <div key={row.stars} className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <span className="w-4 text-right text-sm font-medium text-gray-700">
                          {row.stars}
                        </span>
                        <StarIcon filled className="h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <div className="h-5 overflow-hidden rounded-lg bg-gray-50">
                          <div
                            className="h-full rounded-lg bg-gradient-to-r from-rose-400 to-rose-500 transition-all duration-700"
                            style={{ width: `${row.percentage}%` }}
                          />
                        </div>
                      </div>
                      <span className="w-16 text-right text-xs font-medium text-gray-500">
                        {row.count} ({row.percentage}%)
                      </span>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Sentiment Analysis */}
              <Card>
                <CardTitle>Sentiment Analysis</CardTitle>

                <div className="mt-4 h-4 flex overflow-hidden rounded-full bg-gray-100">
                  <div
                    className="bg-emerald-500 transition-all"
                    style={{ width: `${fb.sentiment.positive}%` }}
                  />
                  <div
                    className="bg-amber-400 transition-all"
                    style={{ width: `${fb.sentiment.neutral}%` }}
                  />
                  <div
                    className="bg-red-400 transition-all"
                    style={{ width: `${fb.sentiment.negative}%` }}
                  />
                </div>
                <div className="mt-2 flex justify-between text-xs">
                  <span className="text-emerald-600">👍 {fb.sentiment.positive}% positive</span>
                  <span className="text-amber-600">😐 {fb.sentiment.neutral}% neutral</span>
                  <span className="text-red-600">👎 {fb.sentiment.negative}% negative</span>
                </div>

                <div className="mt-6 space-y-2">
                  <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
                    Topic Sentiment
                  </p>
                  {fb.sentimentTopics.map((topic) => (
                    <div
                      key={topic.topic}
                      className="flex items-center justify-between rounded-xl px-3 py-2.5 transition-colors hover:bg-gray-50"
                    >
                      <div className="flex items-center gap-3">
                        <span className={cn('h-2.5 w-2.5 rounded-full', sentimentColor[topic.sentiment])} />
                        <span className="text-sm text-gray-700">{topic.topic}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-gray-400">{topic.mentions} mentions</span>
                        <Badge variant={sentimentBadge[topic.sentiment].variant} size="sm">
                          {topic.sentiment}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════════════ */}
        {/* SESSIONS TAB                                                          */}
        {/* ══════════════════════════════════════════════════════════════════════ */}
        {activeTab === 'sessions' && (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {fb.sessionRatings.map((session) => (
              <Card key={session.id} variant="interactive">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <h4 className="font-semibold text-gray-900">{session.title}</h4>
                    <p className="mt-0.5 text-sm text-gray-500">{session.speaker}</p>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="text-3xl font-bold text-rose-600">{session.rating}</p>
                    <StarRow rating={session.rating} size="h-3 w-3" />
                  </div>
                </div>

                <div className="mt-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500">{formatNumber(session.responses)} responses</span>
                    <Badge
                      variant={
                        session.rating >= 4.7
                          ? 'success'
                          : session.rating >= 4.0
                            ? 'default'
                            : 'warning'
                      }
                      size="sm"
                    >
                      {session.rating >= 4.7
                        ? 'Outstanding'
                        : session.rating >= 4.0
                          ? 'Very Good'
                          : 'Good'}
                    </Badge>
                  </div>
                </div>

                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-gray-100">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-rose-400 to-rose-500"
                    style={{ width: `${(session.rating / 5) * 100}%` }}
                  />
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════════════ */}
        {/* SPEAKERS TAB                                                          */}
        {/* ══════════════════════════════════════════════════════════════════════ */}
        {activeTab === 'speakers' && (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {fb.speakerRatings.map((speaker, i) => (
              <Card key={speaker.id} variant="interactive">
                <div className="flex items-start gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-rose-400 to-pink-400 text-lg font-bold text-white">
                    {speaker.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-gray-900">{speaker.name}</h4>
                      {i === 0 && <Badge variant="default" size="sm">⭐ Top Rated</Badge>}
                    </div>
                    <p className="text-sm text-gray-500">{speaker.role}</p>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <StarRow rating={speaker.rating} size="h-5 w-5" />
                  <div className="text-right">
                    <p className="text-2xl font-bold text-rose-600">{speaker.rating}</p>
                    <p className="text-xs text-gray-400">{formatNumber(speaker.responses)} ratings</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════════════ */}
        {/* VENUE TAB                                                             */}
        {/* ══════════════════════════════════════════════════════════════════════ */}
        {activeTab === 'venue' && (
          <div className="space-y-6">
            {/* Overall Venue */}
            <Card>
              <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <CardTitle>Venue Overall Rating</CardTitle>
                  <div className="mt-3 flex items-baseline gap-3">
                    <p className="text-5xl font-bold text-violet-600">{fb.venueRating.overall}</p>
                    <span className="text-xl text-gray-400">/ 5</span>
                    <StarRow rating={fb.venueRating.overall} size="h-5 w-5" />
                  </div>
                </div>
                <Badge
                  variant={fb.venueRating.overall >= 4.0 ? 'success' : 'warning'}
                  className="px-4 py-1.5 text-sm"
                >
                  {fb.venueRating.overall >= 4.0 ? 'Venue Feedback Positive' : 'Needs Improvement'}
                </Badge>
              </div>
            </Card>

            {/* Category Breakdown */}
            <Card>
              <CardTitle>Venue Category Ratings</CardTitle>
              <div className="mt-6 space-y-5">
                {Object.entries(fb.venueRating)
                  .filter(([key]) => key !== 'overall')
                  .sort(([, a], [, b]) => (b as number) - (a as number))
                  .map(([category, rating]) => {
                    const displayCategory = category
                      .replace(/([A-Z])/g, ' $1')
                      .replace(/^./, (s) => s.toUpperCase());
                    const pct = ((rating as number) / 5) * 100;
                    return (
                      <div key={category}>
                        <div className="mb-2 flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-700">{displayCategory}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-gray-900">{rating}</span>
                            <Badge
                              variant={
                                (rating as number) >= 4.3
                                  ? 'success'
                                  : (rating as number) >= 3.5
                                    ? 'warning'
                                    : 'destructive'
                              }
                              size="sm"
                            >
                              {(rating as number) >= 4.3
                                ? 'Excellent'
                                : (rating as number) >= 3.5
                                  ? 'Good'
                                  : 'Needs Work'}
                            </Badge>
                          </div>
                        </div>
                        <div className="h-3 overflow-hidden rounded-full bg-gray-100">
                          <div
                            className={cn(
                              'h-full rounded-full transition-all duration-700',
                              (rating as number) >= 4.3
                                ? 'bg-gradient-to-r from-emerald-400 to-emerald-500'
                                : (rating as number) >= 3.5
                                  ? 'bg-gradient-to-r from-amber-400 to-amber-500'
                                  : 'bg-gradient-to-r from-red-400 to-red-500',
                            )}
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
              </div>
            </Card>

            {/* Improvement Areas */}
            <Card>
              <CardTitle>Key Improvement Areas</CardTitle>
              <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                {fb.venueRating.wifi < 4.0 && (
                  <div className="rounded-xl border border-red-100 bg-red-50/50 p-4">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">📶</span>
                      <h4 className="font-semibold text-red-800">Wi-Fi Connectivity</h4>
                    </div>
                    <p className="mt-2 text-sm text-red-600">
                      Rated {fb.venueRating.wifi}/5 — Consider upgrading network infrastructure for
                      future events.
                    </p>
                  </div>
                )}
                {fb.venueRating.signage < 4.0 && (
                  <div className="rounded-xl border border-amber-100 bg-amber-50/50 p-4">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">🪧</span>
                      <h4 className="font-semibold text-amber-800">Venue Signage</h4>
                    </div>
                    <p className="mt-2 text-sm text-amber-600">
                      Rated {fb.venueRating.signage}/5 — Add more directional signs between sessions.
                    </p>
                  </div>
                )}
                {fb.venueRating.foodQuality < 4.0 && (
                  <div className="rounded-xl border border-amber-100 bg-amber-50/50 p-4">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">🍽️</span>
                      <h4 className="font-semibold text-amber-800">Food Quality</h4>
                    </div>
                    <p className="mt-2 text-sm text-amber-600">
                      Rated {fb.venueRating.foodQuality}/5 — Review catering options and dietary
                      inclusivity.
                    </p>
                  </div>
                )}
                <div className="rounded-xl border border-emerald-100 bg-emerald-50/50 p-4">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">✨</span>
                    <h4 className="font-semibold text-emerald-800">Top Rated Areas</h4>
                  </div>
                  <p className="mt-2 text-sm text-emerald-600">
                    Cleanliness ({fb.venueRating.cleanliness}/5) and Comfort ({fb.venueRating.comfort}
                    /5) received excellent ratings.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
