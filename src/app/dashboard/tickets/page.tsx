'use client'

import { useState } from 'react'
import Card, { CardHeader, CardTitle } from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import { formatCurrency, cn } from '@/lib/utils'

// ---------------------------------------------------------------------------
// Mock data
// ---------------------------------------------------------------------------
type TicketStatus = 'On Sale' | 'Sold Out' | 'Draft' | 'Paused'

function seeded(seed: number) {
  const x = Math.sin(seed * 9301 + 49297) * 49297
  return x - Math.floor(x)
}

function buildTickets() {
  const types = [
    { name: 'General Admission', tier: 'standard' },
    { name: 'Early Bird', tier: 'early' },
    { name: 'VIP Experience', tier: 'vip' },
    { name: 'Premium Lounge', tier: 'premium' },
    { name: 'Student Pass', tier: 'student' },
    { name: 'Group Package (4)', tier: 'group' },
    { name: 'Family Bundle (2+2)', tier: 'family' },
    { name: 'Backstage Pass', tier: 'backstage' },
    { name: 'Weekend Pass', tier: 'weekend' },
    { name: 'Single Day', tier: 'day' },
    { name: 'Standing Room', tier: 'standing' },
    { name: 'Reserved Seating', tier: 'reserved' },
    { name: 'Industry Pass', tier: 'industry' },
    { name: 'Media Credential', tier: 'media' },
    { name: 'Volunteer Pass', tier: 'volunteer' },
  ]

  const events = [
    'Summer Music Fest 2026', 'Tech Innovation Summit', 'Artisan Night Market',
    'International Food Festival', 'Annual Charity Gala', 'Comedy Night Live',
    'Jazz & Wine Evening', 'Startup Pitch Battle', 'Rooftop Cinema Series',
    'Holiday Craft Marketplace',
  ]

  const statuses: TicketStatus[] = ['On Sale', 'Sold Out', 'Draft', 'Paused']

  // Generate sales trend (last 12 weeks)
  function buildTrend(seed: number): number[] {
    const base = Math.floor(seeded(seed) * 20) + 5
    return Array.from({ length: 12 }, (_, i) => {
      const r = seeded(seed + i * 7)
      const growth = 1 + (i * 0.05)
      return Math.floor(base * growth * (0.7 + r * 0.6))
    })
  }

  const tickets = types.map((t, i) => {
    const r = (n: number) => seeded(i * 41 + n)
    const eventIdx = Math.floor(r(1) * events.length)
    const totalQty = [200, 500, 100, 50, 300, 150, 100, 30, 250, 400, 600, 200, 80, 25, 40][i]
    const price = [
      75, 49, 250, 450, 35, 260, 220, 750, 180, 85, 45, 120, 350, 0, 0,
    ][i]
    const sold = Math.floor(r(2) * totalQty * 0.9)
    const status: TicketStatus = sold >= totalQty ? 'Sold Out' : statuses[Math.floor(r(3) * 4)]
    const revenue = sold * price
    const salesTrend = buildTrend(i * 13 + 200)

    return {
      id: `tkt_${String(i + 1).padStart(3, '0')}`,
      name: t.name,
      tier: t.tier,
      event: events[eventIdx],
      price,
      totalQuantity: totalQty,
      sold,
      remaining: Math.max(totalQty - sold, 0),
      revenue,
      status,
      salesTrend,
      avgDailySales: Math.round(sold / 30),
      salesStartDate: `2026-${String(Math.floor(r(4) * 3) + 4).padStart(2, '0')}-01`,
      includes: [
        price > 200 ? 'Premium seating' : null,
        t.tier === 'vip' || t.tier === 'backstage' ? 'Meet & greet' : null,
        t.tier === 'vip' ? 'Complimentary drinks' : null,
        t.tier === 'weekend' ? 'Multi-day access' : null,
        t.tier === 'student' ? 'Valid student ID required' : null,
        'Event access',
      ].filter(Boolean) as string[],
    }
  })

  return tickets
}

const MOCK_TICKETS = buildTickets()

const statusVariant: Record<TicketStatus, 'success' | 'danger' | 'default' | 'warning'> = {
  'On Sale': 'success',
  'Sold Out': 'danger',
  Draft: 'default',
  Paused: 'warning',
}

const tierBadge: Record<string, string> = {
  standard: 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300',
  early: 'bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400',
  vip: 'bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400',
  premium: 'bg-purple-50 dark:bg-purple-500/10 text-purple-700 dark:text-purple-400',
  student: 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400',
  group: 'bg-pink-50 dark:bg-pink-500/10 text-pink-700 dark:text-pink-400',
  family: 'bg-rose-50 dark:bg-rose-500/10 text-rose-700 dark:text-rose-400',
  backstage: 'bg-evt-50 dark:bg-evt-500/10 text-evt-700 dark:text-evt-400',
  weekend: 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400',
  day: 'bg-teal-50 dark:bg-teal-500/10 text-teal-700 dark:text-teal-400',
  standing: 'bg-orange-50 dark:bg-orange-500/10 text-orange-700 dark:text-orange-400',
  reserved: 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-700 dark:text-cyan-400',
  industry: 'bg-violet-50 dark:bg-violet-500/10 text-violet-700 dark:text-violet-400',
  media: 'bg-sky-50 dark:bg-sky-500/10 text-sky-700 dark:text-sky-400',
  volunteer: 'bg-lime-50 dark:bg-lime-500/10 text-lime-700 dark:text-lime-400',
}

// ---------------------------------------------------------------------------
// Mini sparkline component
// ---------------------------------------------------------------------------
function Sparkline({ data, color = '#f43f5e' }: { data: number[]; color?: string }) {
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1
  const w = 120
  const h = 32
  const points = data
    .map((v, i) => `${(i / (data.length - 1)) * w},${h - ((v - min) / range) * h}`)
    .join(' ')

  return (
    <svg width={w} height={h} className="inline-block">
      <polyline fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" points={points} />
      <circle cx={(data.length - 1) / (data.length - 1) * w} cy={h - ((data[data.length - 1] - min) / range) * h} r="2" fill={color} />
    </svg>
  )
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export default function TicketsPage() {
  const [filter, setFilter] = useState<'All' | TicketStatus>('All')

  const filtered = filter === 'All' ? MOCK_TICKETS : MOCK_TICKETS.filter(t => t.status === filter)
  const totalSold = MOCK_TICKETS.reduce((s, t) => s + t.sold, 0)
  const totalRevenue = MOCK_TICKETS.reduce((s, t) => s + t.revenue, 0)
  const totalRemaining = MOCK_TICKETS.reduce((s, t) => s + t.remaining, 0)
  const totalCapacity = MOCK_TICKETS.reduce((s, t) => s + t.totalQuantity, 0)
  const avgPrice = MOCK_TICKETS.filter(t => t.price > 0).reduce((s, t) => s + t.price, 0) / MOCK_TICKETS.filter(t => t.price > 0).length || 0

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Tickets</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Manage ticket types, pricing, and inventory</p>
        </div>
        <button className="px-5 py-2.5 bg-evt-600 hover:bg-evt-700 text-white rounded-xl text-sm font-medium transition-colors">
          + Create Ticket Type
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <Card>
          <p className="text-sm text-gray-500 dark:text-gray-400">Total Sold</p>
          <p className="text-2xl font-bold text-evt-600 dark:text-evt-400 mt-1">{totalSold.toLocaleString()}</p>
          <p className="text-xs text-gray-400 mt-1">{MOCK_TICKETS.length} ticket types</p>
        </Card>
        <Card>
          <p className="text-sm text-gray-500 dark:text-gray-400">Revenue</p>
          <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">{formatCurrency(totalRevenue)}</p>
          <p className="text-xs text-gray-400 mt-1">total ticket sales</p>
        </Card>
        <Card>
          <p className="text-sm text-gray-500 dark:text-gray-400">Remaining</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{totalRemaining.toLocaleString()}</p>
          <p className="text-xs text-gray-400 mt-1">of {totalCapacity.toLocaleString()} total</p>
        </Card>
        <Card>
          <p className="text-sm text-gray-500 dark:text-gray-400">Sell-Through</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{totalCapacity > 0 ? ((totalSold / totalCapacity) * 100).toFixed(1) : 0}%</p>
          <div className="w-full h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full mt-2 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-evt-400 to-pink-400 rounded-full"
              style={{ width: `${totalCapacity > 0 ? (totalSold / totalCapacity) * 100 : 0}%` }}
            />
          </div>
        </Card>
        <Card>
          <p className="text-sm text-gray-500 dark:text-gray-400">Avg Price</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{formatCurrency(avgPrice)}</p>
          <p className="text-xs text-gray-400 mt-1">per ticket type</p>
        </Card>
      </div>

      {/* Aggregate sales trend */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <CardTitle>Weekly Sales Trend (All Types)</CardTitle>
          <span className="text-xs text-gray-400">Last 12 weeks</span>
        </div>
        <div className="flex items-end gap-1 h-32">
          {Array.from({ length: 12 }, (_, week) => {
            const weekTotal = MOCK_TICKETS.reduce((s, t) => s + (t.salesTrend[week] || 0), 0)
            const maxWeek = Math.max(...Array.from({ length: 12 }, (_, w) => MOCK_TICKETS.reduce((s, t) => s + (t.salesTrend[w] || 0), 0)))
            const pct = maxWeek > 0 ? (weekTotal / maxWeek) * 100 : 0
            return (
              <div key={week} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-[9px] text-gray-400">{weekTotal}</span>
                <div
                  className="w-full bg-gradient-to-t from-evt-600 to-evt-400 rounded-t-md transition-all"
                  style={{ height: `${Math.max(pct, 3)}%` }}
                />
                <span className="text-[9px] text-gray-400">W{week + 1}</span>
              </div>
            )
          })}
        </div>
      </Card>

      {/* Filter */}
      <div className="flex items-center gap-2">
        {(['All', 'On Sale', 'Sold Out', 'Draft', 'Paused'] as const).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              'px-4 py-2 rounded-xl text-sm font-medium transition-colors',
              filter === f
                ? 'bg-evt-600 text-white'
                : 'bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
            )}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Ticket cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map(t => {
          const sellPct = t.totalQuantity > 0 ? (t.sold / t.totalQuantity) * 100 : 0
          return (
            <Card key={t.id} hover glow>
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-sm font-bold text-gray-900 dark:text-white">{t.name}</h3>
                    <span className={cn('px-2 py-0.5 rounded-full text-[10px] font-medium uppercase', tierBadge[t.tier])}>{t.tier}</span>
                  </div>
                  <p className="text-xs text-gray-400 truncate max-w-[200px]">{t.event}</p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-gray-900 dark:text-white">
                    {t.price > 0 ? formatCurrency(t.price) : 'Free'}
                  </p>
                  <Badge variant={statusVariant[t.status]}>{t.status}</Badge>
                </div>
              </div>

              {/* Inventory bar */}
              <div className="mt-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-gray-500">{t.sold} sold</span>
                  <span className="text-xs text-gray-500">{t.remaining} left</span>
                </div>
                <div className="w-full h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className={cn(
                      'h-full rounded-full transition-all',
                      sellPct >= 90 ? 'bg-red-500' : sellPct >= 70 ? 'bg-amber-500' : 'bg-emerald-500'
                    )}
                    style={{ width: `${sellPct}%` }}
                  />
                </div>
              </div>

              {/* Revenue & trend */}
              <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100 dark:border-gray-800">
                <div>
                  <p className="text-xs text-gray-400">Revenue</p>
                  <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">{formatCurrency(t.revenue)}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-400">Sales trend</p>
                  <Sparkline data={t.salesTrend} />
                </div>
              </div>

              {/* Includes tags */}
              {t.includes.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-3">
                  {t.includes.map(tag => (
                    <span key={tag} className="px-2 py-0.5 bg-gray-50 dark:bg-gray-800 text-[10px] text-gray-500 rounded-full">{tag}</span>
                  ))}
                </div>
              )}
            </Card>
          )
        })}
      </div>
    </div>
  )
}
