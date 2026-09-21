'use client';

import { useState, useMemo } from 'react';
import {
  Calendar,
  MapPin,
  Users,
  DollarSign,
  TrendingUp,
  Search,
  Filter,
  ChevronRight,
  Plus,
  BarChart3,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { MOCK_EVENTS } from '@/lib/mock-data';
import { formatCurrency, formatDate } from '@/lib/utils';

const CATEGORIES = ['All', 'Technology', 'Design', 'Business', 'Education', 'Marketing', 'Arts'] as const;

const statusConfig: Record<string, { label: string; variant: 'success' | 'info' | 'warning' | 'destructive' | 'secondary' }> = {
  live: { label: 'Live', variant: 'destructive' },
  published: { label: 'Published', variant: 'info' },
  draft: { label: 'Draft', variant: 'secondary' },
  completed: { label: 'Completed', variant: 'success' },
  cancelled: { label: 'Cancelled', variant: 'destructive' },
};

export default function EventsPage() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const filtered = useMemo(() => {
    return MOCK_EVENTS.filter((e) => {
      const matchCat = activeCategory === 'All' || e.category === activeCategory;
      const matchSearch =
        e.name.toLowerCase().includes(search.toLowerCase()) ||
        e.venue.toLowerCase().includes(search.toLowerCase()) ||
        e.category.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [search, activeCategory]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Events</h1>
          <p className="text-sm text-gray-500 mt-1">Manage and monitor all your events</p>
        </div>
        <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-rose-600 text-white rounded-xl font-medium hover:bg-rose-700 transition-colors shadow-sm text-sm">
          <Plus className="w-4 h-4" /> Create Event
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Events', value: MOCK_EVENTS.length, icon: Calendar, color: 'text-rose-600 bg-rose-100' },
          {
            label: 'Total Revenue',
            value: formatCurrency(MOCK_EVENTS.reduce((s, e) => s + e.revenue, 0)),
            icon: DollarSign,
            color: 'text-green-600 bg-green-100',
          },
          {
            label: 'Total Attendance',
            value: MOCK_EVENTS.reduce((s, e) => s + e.attendance, 0).toLocaleString(),
            icon: Users,
            color: 'text-violet-600 bg-violet-100',
          },
          {
            label: 'Avg. Fill Rate',
            value: `${Math.round(
              MOCK_EVENTS.filter((e) => e.ticketsSold > 0).reduce(
                (s, e) => s + (e.ticketsSold / e.maxCapacity) * 100,
                0,
              ) / Math.max(MOCK_EVENTS.filter((e) => e.ticketsSold > 0).length, 1),
            )}%`,
            icon: TrendingUp,
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
            placeholder="Search events by name, venue, or category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-rose-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500 bg-white"
          />
        </div>
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          <Filter className="w-4 h-4 text-gray-400 shrink-0" />
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                activeCategory === cat
                  ? 'bg-rose-100 text-rose-700'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Event Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {filtered.map((event) => {
          const fillPct = event.maxCapacity > 0 ? Math.round((event.ticketsSold / event.maxCapacity) * 100) : 0;
          const budgetPct = event.budget > 0 ? Math.min(Math.round((event.revenue / event.budget) * 100), 100) : 0;
          const status = statusConfig[event.status] || statusConfig.draft;

          return (
            <Card key={event.id} variant="interactive" className="group">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-base truncate group-hover:text-rose-600 transition-colors">
                      {event.name}
                    </CardTitle>
                    <div className="flex items-center gap-1.5 mt-1.5">
                      <Calendar className="w-3.5 h-3.5 text-gray-400" />
                      <span className="text-xs text-gray-500">{formatDate(event.date)}</span>
                    </div>
                    <div className="flex items-center gap-1.5 mt-1">
                      <MapPin className="w-3.5 h-3.5 text-gray-400" />
                      <span className="text-xs text-gray-500 truncate">{event.venue}</span>
                    </div>
                  </div>
                  <Badge variant={status.variant} size="sm">
                    {status.label}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Category + Tags */}
                <div className="flex flex-wrap gap-1.5">
                  <Badge variant="pink" size="sm">{event.category}</Badge>
                  {event.tags.slice(0, 2).map((tag) => (
                    <Badge key={tag} variant="secondary" size="sm">{tag}</Badge>
                  ))}
                </div>

                {/* Budget vs Revenue Bar */}
                <div>
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-gray-500 font-medium">Budget vs Revenue</span>
                    <span className="text-gray-700 font-semibold">{budgetPct}%</span>
                  </div>
                  <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        budgetPct >= 100
                          ? 'bg-gradient-to-r from-green-400 to-green-600'
                          : budgetPct >= 60
                            ? 'bg-gradient-to-r from-rose-400 to-rose-600'
                            : 'bg-gradient-to-r from-amber-400 to-amber-600'
                      }`}
                      style={{ width: `${budgetPct}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-[11px] mt-1">
                    <span className="text-gray-400">Budget: {formatCurrency(event.budget)}</span>
                    <span className="text-gray-600 font-medium">Revenue: {formatCurrency(event.revenue)}</span>
                  </div>
                </div>

                {/* Attendance Progress */}
                <div>
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-gray-500 font-medium flex items-center gap-1">
                      <Users className="w-3.5 h-3.5" /> Attendance
                    </span>
                    <span className="text-gray-700 font-semibold">
                      {event.ticketsSold.toLocaleString()} / {event.maxCapacity.toLocaleString()}
                    </span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        fillPct >= 90
                          ? 'bg-green-500'
                          : fillPct >= 60
                            ? 'bg-rose-500'
                            : fillPct >= 30
                              ? 'bg-amber-500'
                              : 'bg-gray-400'
                      }`}
                      style={{ width: `${Math.min(fillPct, 100)}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-[11px] mt-1">
                    <span className="text-gray-400">{fillPct}% filled</span>
                    {event.attendance > 0 && (
                      <span className="text-gray-400">{event.attendance.toLocaleString()} checked in</span>
                    )}
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                  <div className="text-sm font-bold text-gray-900">
                    {formatCurrency(event.revenue)}
                  </div>
                  <button className="flex items-center gap-1 text-xs font-medium text-rose-600 hover:text-rose-700 transition-colors">
                    Details <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <BarChart3 className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500 font-medium">No events found</p>
          <p className="text-sm text-gray-400 mt-1">Try adjusting your search or filter</p>
        </div>
      )}
    </div>
  );
}
