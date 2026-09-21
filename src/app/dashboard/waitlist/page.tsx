'use client'

import { useState } from 'react'
import Card, { CardHeader, CardTitle } from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import { formatCurrency, cn } from '@/lib/utils'

// ---------------------------------------------------------------------------
// Mock data
// ---------------------------------------------------------------------------
type WaitlistStatus = 'Waiting' | 'Invited' | 'Converted' | 'Expired' | 'Declined'

function seeded(seed: number) {
  const x = Math.sin(seed * 9301 + 49297) * 49297
  return x - Math.floor(x)
}

function buildWaitlist() {
  const events = [
    'Summer Music Fest 2026', 'Tech Innovation Summit', 'Artisan Night Market',
    'International Food Festival', 'Marathon & Half-Marathon', 'Annual Charity Gala',
    'Comedy Night Live', 'Jazz & Wine Evening', 'Photography Masterclass',
    'Startup Pitch Battle', 'Yoga & Wellness Retreat', 'Vintage Car Exhibition',
    'Kids Science Discovery Day', 'Rooftop Cinema Series', 'Poetry Slam Championship',
    'Holiday Craft Marketplace', 'Fitness Bootcamp Weekend', 'Book Author Signing',
    'Dance Showcase Recital', 'Farmers Market Grand Opening',
  ]

  const firstNames = [
    'Emma','Liam','Olivia','Noah','Ava','Ethan','Sophia','Mason','Isabella','Lucas',
    'Mia','Oliver','Charlotte','Aiden','Amelia','Elijah','Harper','James','Evelyn','William',
    'Abigail','Benjamin','Ella','Henry','Scarlett','Alexander','Grace','Michael','Chloe','Daniel',
    'Victoria','Matthew','Riley','Jackson','Aria','Sebastian','Lily','David','Aurora','Carter',
    'Penelope','Wyatt','Layla','John','Nora','Luke','Hazel','Jack','Zoey','Owen',
  ]

  const lastNames = [
    'Smith','Johnson','Williams','Brown','Jones','Garcia','Miller','Davis','Rodriguez','Martinez',
    'Hernandez','Lopez','Gonzalez','Wilson','Anderson','Thomas','Taylor','Moore','Jackson','Martin',
    'Lee','Perez','Thompson','White','Harris','Sanchez','Clark','Ramirez','Lewis','Robinson',
    'Walker','Young','Allen','King','Wright','Scott','Torres','Nguyen','Hill','Flores',
    'Green','Adams','Nelson','Baker','Hall','Rivera','Campbell','Mitchell','Carter','Roberts',
  ]

  const statuses: WaitlistStatus[] = ['Waiting', 'Invited', 'Converted', 'Expired', 'Declined']
  const sources = ['Website', 'Social Media', 'Referral', 'Email', 'Partner', 'Organic Search']

  const entries = Array.from({ length: 60 }, (_, i) => {
    const r = (n: number) => seeded(i * 29 + n)
    const fn = firstNames[Math.floor(r(1) * firstNames.length)]
    const ln = lastNames[Math.floor(r(2) * lastNames.length)]
    const status = statuses[Math.floor(r(3) * 5)]
    const eventIdx = Math.floor(r(4) * events.length)
    const position = i + 1
    const joinedMonth = Math.floor(r(5) * 8) + 1
    const joinedDay = Math.floor(r(6) * 28) + 1
    const invitedMonth = status !== 'Waiting' ? Math.min(joinedMonth + 1, 12) : 0
    const invitedDay = status !== 'Waiting' ? Math.floor(r(7) * 28) + 1 : 0
    const converted = status === 'Converted'
    const ticketValue = converted ? [75, 125, 200, 350, 500][Math.floor(r(8) * 5)] : 0

    return {
      id: `wl_${String(i + 1).padStart(3, '0')}`,
      name: `${fn} ${ln}`,
      email: `${fn.toLowerCase()}.${ln.toLowerCase()}@email.com`,
      phone: `+1 555-${String(Math.floor(r(9) * 9000) + 1000)}`,
      position,
      event: events[eventIdx],
      status,
      source: sources[Math.floor(r(10) * sources.length)],
      joinedDate: `2026-${String(joinedMonth).padStart(2, '0')}-${String(joinedDay).padStart(2, '0')}`,
      invitedDate: invitedMonth > 0 ? `2026-${String(invitedMonth).padStart(2, '0')}-${String(invitedDay).padStart(2, '0')}` : null,
      converted,
      ticketValue,
      notes: r(11) > 0.7 ? 'VIP request' : r(11) > 0.4 ? 'Group of 4' : '',
      groupSize: Math.floor(r(12) * 5) + 1,
      referralCode: r(13) > 0.6 ? `REF${String(Math.floor(r(14) * 9000) + 1000)}` : null,
    }
  })

  return entries
}

const MOCK_WAITLIST = buildWaitlist()

const statusVariant: Record<WaitlistStatus, 'success' | 'info' | 'warning' | 'danger' | 'default'> = {
  Waiting: 'info',
  Invited: 'warning',
  Converted: 'success',
  Expired: 'danger',
  Declined: 'default',
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export default function WaitlistPage() {
  const [filter, setFilter] = useState<'All' | WaitlistStatus>('All')
  const [searchQuery, setSearchQuery] = useState('')

  const filtered = MOCK_WAITLIST
    .filter(e => filter === 'All' || e.status === filter)
    .filter(e => searchQuery === '' || e.name.toLowerCase().includes(searchQuery.toLowerCase()) || e.email.toLowerCase().includes(searchQuery.toLowerCase()))

  const totalWaiting = MOCK_WAITLIST.filter(e => e.status === 'Waiting').length
  const totalConverted = MOCK_WAITLIST.filter(e => e.status === 'Converted').length
  const totalRevenue = MOCK_WAITLIST.filter(e => e.converted).reduce((s, e) => s + e.ticketValue, 0)
  const conversionRate = MOCK_WAITLIST.length > 0 ? ((totalConverted / MOCK_WAITLIST.length) * 100).toFixed(1) : '0'
  const uniqueEvents = [...new Set(MOCK_WAITLIST.map(e => e.event))].length

  // Event breakdown for the side stats
  const eventBreakdown = Object.entries(
    MOCK_WAITLIST.reduce((acc, e) => {
      acc[e.event] = (acc[e.event] || 0) + 1
      return acc
    }, {} as Record<string, number>)
  ).sort((a, b) => b[1] - a[1]).slice(0, 6)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Waitlist</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Manage event waitlists and conversion tracking</p>
        </div>
        <button className="px-5 py-2.5 bg-evt-600 hover:bg-evt-700 text-white rounded-xl text-sm font-medium transition-colors">
          + Add to Waitlist
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <Card>
          <p className="text-sm text-gray-500 dark:text-gray-400">Total Entries</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{MOCK_WAITLIST.length}</p>
          <p className="text-xs text-gray-400 mt-1">across {uniqueEvents} events</p>
        </Card>
        <Card>
          <p className="text-sm text-gray-500 dark:text-gray-400">Waiting</p>
          <p className="text-2xl font-bold text-amber-500 mt-1">{totalWaiting}</p>
          <p className="text-xs text-gray-400 mt-1">in queue</p>
        </Card>
        <Card>
          <p className="text-sm text-gray-500 dark:text-gray-400">Converted</p>
          <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">{totalConverted}</p>
          <p className="text-xs text-gray-400 mt-1">{conversionRate}% rate</p>
        </Card>
        <Card>
          <p className="text-sm text-gray-500 dark:text-gray-400">Revenue</p>
          <p className="text-2xl font-bold text-evt-600 dark:text-evt-400 mt-1">{formatCurrency(totalRevenue)}</p>
          <p className="text-xs text-gray-400 mt-1">from conversions</p>
        </Card>
        <Card>
          <p className="text-sm text-gray-500 dark:text-gray-400">Avg Position</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
            {MOCK_WAITLIST.filter(e => e.status === 'Waiting').length > 0
              ? Math.round(MOCK_WAITLIST.filter(e => e.status === 'Waiting').reduce((s, e) => s + e.position, 0) / MOCK_WAITLIST.filter(e => e.status === 'Waiting').length)
              : '—'}
          </p>
          <p className="text-xs text-gray-400 mt-1">waiting entries</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main table area */}
        <div className="lg:col-span-3 space-y-4">
          {/* Search & Filter */}
          <div className="flex items-center gap-3">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2.5 pl-10 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-evt-500/30 focus:border-evt-500"
              />
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <div className="flex items-center gap-1.5">
              {(['All', 'Waiting', 'Invited', 'Converted', 'Expired', 'Declined'] as const).map(f => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={cn(
                    'px-3 py-2 rounded-xl text-xs font-medium transition-colors',
                    filter === f
                      ? 'bg-evt-600 text-white'
                      : 'bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                  )}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Table */}
          <Card padding={false}>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50">
                    <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">#</th>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Name</th>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Event</th>
                    <th className="text-center px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Status</th>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Source</th>
                    <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Joined</th>
                    <th className="text-right px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Value</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(e => (
                    <tr key={e.id} className="border-b border-gray-50 dark:border-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                      <td className="px-5 py-3.5 text-sm font-mono text-gray-400">{e.position}</td>
                      <td className="px-5 py-3.5">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">{e.name}</div>
                        <div className="text-xs text-gray-400">{e.email}</div>
                      </td>
                      <td className="px-5 py-3.5 text-sm text-gray-600 dark:text-gray-400 max-w-[200px] truncate">{e.event}</td>
                      <td className="px-5 py-3.5 text-center"><Badge variant={statusVariant[e.status]}>{e.status}</Badge></td>
                      <td className="px-5 py-3.5 text-sm text-gray-500">{e.source}</td>
                      <td className="px-5 py-3.5 text-sm text-gray-500">
                        {new Date(e.joinedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </td>
                      <td className="px-5 py-3.5 text-right text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                        {e.converted ? formatCurrency(e.ticketValue) : '—'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* Sidebar stats */}
        <div className="space-y-4">
          <Card>
            <CardTitle className="mb-3">By Event</CardTitle>
            <div className="space-y-3">
              {eventBreakdown.map(([event, count]) => (
                <div key={event}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-600 dark:text-gray-400 truncate max-w-[160px]">{event}</span>
                    <span className="text-xs font-semibold text-gray-900 dark:text-white">{count}</span>
                  </div>
                  <div className="w-full h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-evt-400 dark:bg-evt-500 rounded-full"
                      style={{ width: `${(count / MOCK_WAITLIST.length) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <CardTitle className="mb-3">Conversion Funnel</CardTitle>
            <div className="space-y-3">
              {(['Waiting', 'Invited', 'Converted', 'Declined', 'Expired'] as const).map(status => {
                const count = MOCK_WAITLIST.filter(e => e.status === status).length
                const pct = MOCK_WAITLIST.length > 0 ? ((count / MOCK_WAITLIST.length) * 100).toFixed(1) : '0'
                return (
                  <div key={status} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge variant={statusVariant[status]}>{status}</Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">{count}</span>
                      <span className="text-xs text-gray-400 w-12 text-right">{pct}%</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </Card>

          <Card>
            <CardTitle className="mb-3">Source Breakdown</CardTitle>
            <div className="space-y-2">
              {Object.entries(
                MOCK_WAITLIST.reduce((acc, e) => {
                  acc[e.source] = (acc[e.source] || 0) + 1
                  return acc
                }, {} as Record<string, number>)
              ).sort((a, b) => b[1] - a[1]).map(([source, count]) => (
                <div key={source} className="flex items-center justify-between py-1">
                  <span className="text-xs text-gray-500">{source}</span>
                  <span className="text-xs font-medium text-gray-900 dark:text-white">{count}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
