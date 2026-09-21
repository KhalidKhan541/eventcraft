'use client'

import { useState } from 'react'
import Card, { CardHeader, CardTitle } from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import { formatCurrency, cn } from '@/lib/utils'

// ---------------------------------------------------------------------------
// Mock data
// ---------------------------------------------------------------------------
type SponsorTier = 'Platinum' | 'Gold' | 'Silver' | 'Bronze'
type SponsorStatus = 'Active' | 'Pending' | 'Renewed' | 'Expired' | 'In Negotiation'

function seeded(seed: number) {
  const x = Math.sin(seed * 9301 + 49297) * 49297
  return x - Math.floor(seed)
}

function buildSponsors() {
  const sponsors = [
    { name: 'Meridian Technologies', industry: 'Technology' },
    { name: 'Atlas Financial Group', industry: 'Finance' },
    { name: 'Prism Health Systems', industry: 'Healthcare' },
    { name: 'Velocity Motors', industry: 'Automotive' },
    { name: 'Cascade Beverages', industry: 'Food & Beverage' },
    { name: 'Zenith Insurance', industry: 'Insurance' },
    { name: 'NovaCraft Studios', industry: 'Entertainment' },
    { name: 'Sterling Real Estate', industry: 'Real Estate' },
    { name: 'Apex Sporting Goods', industry: 'Retail' },
    { name: 'Helios Solar Energy', industry: 'Energy' },
    { name: 'Nebula Cloud Services', industry: 'Technology' },
    { name: 'Evergreen Logistics', industry: 'Transportation' },
    { name: 'Crystal Clear Media', industry: 'Media' },
    { name: 'Summit Pharmaceuticals', industry: 'Pharma' },
    { name: 'Titan Manufacturing', industry: 'Manufacturing' },
    { name: 'Pioneer Aerospace', industry: 'Aerospace' },
    { name: 'Harmony Wellness Co', industry: 'Wellness' },
    { name: 'Vanguard Digital', industry: 'Technology' },
    { name: 'Compass Travel Agency', industry: 'Travel' },
    { name: 'Ember Restaurant Group', industry: 'Hospitality' },
  ]

  const tiers: SponsorTier[] = ['Platinum', 'Gold', 'Silver', 'Bronze']
  const tierAmounts: Record<SponsorTier, [number, number]> = {
    Platinum: [50000, 100000],
    Gold: [25000, 50000],
    Silver: [10000, 25000],
    Bronze: [5000, 10000],
  }
  const tierColors: Record<SponsorTier, string> = {
    Platinum: 'bg-gradient-to-r from-gray-300 via-gray-100 to-gray-300 text-gray-800',
    Gold: 'bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 text-amber-900',
    Silver: 'bg-gradient-to-r from-gray-400 via-gray-300 to-gray-400 text-gray-700',
    Bronze: 'bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 text-white',
  }
  const tierBadgeClass: Record<SponsorTier, string> = {
    Platinum: 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200',
    Gold: 'bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400',
    Silver: 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300',
    Bronze: 'bg-orange-50 dark:bg-orange-500/10 text-orange-700 dark:text-orange-400',
  }

  const benefitSets: Record<SponsorTier, string[]> = {
    Platinum: ['Logo on main stage', 'Keynote speaking slot', 'VIP booth (10×10)', 'Full-page program ad', 'Social media features', 'Logo on all marketing', 'Private lounge access', '10 VIP passes'],
    Gold: ['Logo on secondary stage', 'Standard booth (8×8)', 'Half-page program ad', 'Social media mentions', 'Logo on website', '5 VIP passes'],
    Silver: ['Logo on event banner', 'Tabletop booth (6×6)', 'Quarter-page ad', 'Website listing', '3 VIP passes'],
    Bronze: ['Logo on event website', 'Small booth (4×4)', 'Program listing', '2 event passes'],
  }

  const statuses: SponsorStatus[] = ['Active', 'Pending', 'Renewed', 'Expired', 'In Negotiation']
  const events = [
    'Summer Music Fest 2026', 'Tech Innovation Summit', 'Annual Charity Gala',
    'International Food Festival', 'Startup Pitch Battle', 'Artisan Night Market',
  ]

  return sponsors.map((s, i) => {
    const r = (n: number) => seeded(i * 47 + n)
    const tier = tiers[Math.floor(r(1) * 4)]
    const [minAmt, maxAmt] = tierAmounts[tier]
    const amount = Math.floor(r(2) * (maxAmt - minAmt)) + minAmt
    const status = statuses[Math.floor(r(3) * 5)]
    const eventIdx = Math.floor(r(4) * events.length)
    const contactFirst = ['James', 'Maria', 'David', 'Sarah', 'Michael', 'Lisa', 'Robert', 'Jennifer'][Math.floor(r(5) * 8)]
    const contactLast = ['Thompson', 'Garcia', 'Kim', 'Chen', 'Wilson', 'Brown', 'Anderson', 'Taylor'][Math.floor(r(6) * 8)]
    const startMonth = Math.floor(r(7) * 6) + 1
    const renewalMonth = Math.min(startMonth + 6, 12)

    return {
      id: `spon_${String(i + 1).padStart(3, '0')}`,
      name: s.name,
      industry: s.industry,
      tier,
      tierColors: tierColors[tier],
      tierBadgeClass: tierBadgeClass[tier],
      amount,
      status,
      event: events[eventIdx],
      contact: {
        name: `${contactFirst} ${contactLast}`,
        email: `${contactFirst.toLowerCase()}.${contactLast.toLowerCase()}@${s.name.toLowerCase().replace(/[\s.]/g, '')}.com`,
        phone: `+1 555-${String(Math.floor(r(7) * 9000) + 1000)}`,
        title: ['VP Marketing', 'CMO', 'Director of Partnerships', 'Head of Sponsorships', 'Marketing Manager'][Math.floor(r(8) * 5)],
      },
      benefits: benefitSets[tier],
      startDate: `2026-${String(startMonth).padStart(2, '0')}-01`,
      renewalDate: `2026-${String(renewalMonth).padStart(2, '0')}-01`,
      logoUrl: `/sponsors/${s.name.toLowerCase().replace(/[\s.]/g, '-')}.svg`,
      totalEvents: Math.floor(r(9) * 4) + 1,
      brandMentions: Math.floor(r(10) * 500) + 50,
      leadGenerated: Math.floor(r(11) * 200) + 10,
    }
  })
}

const MOCK_SPONSORS = buildSponsors()

const statusVariant: Record<SponsorStatus, 'success' | 'info' | 'warning' | 'danger' | 'default'> = {
  Active: 'success',
  Renewed: 'success',
  Pending: 'info',
  Expired: 'danger',
  'In Negotiation': 'warning',
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export default function SponsorsPage() {
  const [filter, setFilter] = useState<'All' | SponsorTier>('All')

  const filtered = filter === 'All' ? MOCK_SPONSORS : MOCK_SPONSORS.filter(s => s.tier === filter)
  const totalRevenue = MOCK_SPONSORS.reduce((s, sp) => s + sp.amount, 0)
  const activeCount = MOCK_SPONSORS.filter(s => s.status === 'Active' || s.status === 'Renewed').length
  const totalLeads = MOCK_SPONSORS.reduce((s, sp) => s + sp.leadGenerated, 0)
  const totalMentions = MOCK_SPONSORS.reduce((s, sp) => s + sp.brandMentions, 0)

  // Tier breakdown
  const tierBreakdown: Record<SponsorTier, { count: number; revenue: number }> = {
    Platinum: { count: 0, revenue: 0 },
    Gold: { count: 0, revenue: 0 },
    Silver: { count: 0, revenue: 0 },
    Bronze: { count: 0, revenue: 0 },
  }
  MOCK_SPONSORS.forEach(s => {
    tierBreakdown[s.tier].count++
    tierBreakdown[s.tier].revenue += s.amount
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Sponsors</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Manage sponsor partnerships and tier benefits</p>
        </div>
        <button className="px-5 py-2.5 bg-evt-600 hover:bg-evt-700 text-white rounded-xl text-sm font-medium transition-colors">
          + Add Sponsor
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <p className="text-sm text-gray-500 dark:text-gray-400">Total Sponsors</p>
          <p className="text-2xl font-bold text-evt-600 dark:text-evt-400 mt-1">{MOCK_SPONSORS.length}</p>
          <p className="text-xs text-gray-400 mt-1">{activeCount} active</p>
        </Card>
        <Card>
          <p className="text-sm text-gray-500 dark:text-gray-400">Sponsorship Revenue</p>
          <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">{formatCurrency(totalRevenue)}</p>
          <p className="text-xs text-gray-400 mt-1">total commitment</p>
        </Card>
        <Card>
          <p className="text-sm text-gray-500 dark:text-gray-400">Leads Generated</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{totalLeads.toLocaleString()}</p>
          <p className="text-xs text-gray-400 mt-1">from sponsor activations</p>
        </Card>
        <Card>
          <p className="text-sm text-gray-500 dark:text-gray-400">Brand Mentions</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{totalMentions.toLocaleString()}</p>
          <p className="text-xs text-gray-400 mt-1">across all channels</p>
        </Card>
      </div>

      {/* Tier breakdown */}
      <div className="grid grid-cols-4 gap-4">
        {(['Platinum', 'Gold', 'Silver', 'Bronze'] as const).map(tier => (
          <Card key={tier} hover>
            <div className="flex items-center gap-3 mb-3">
              <span className={cn('px-3 py-1 rounded-full text-xs font-bold', tierBreakdown[tier].count > 0 ? tierBadge[tier] : 'bg-gray-100 text-gray-400')}>
                {tier}
              </span>
              <span className="text-lg font-bold text-gray-900 dark:text-white">{tierBreakdown[tier].count}</span>
            </div>
            <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">{formatCurrency(tierBreakdown[tier].revenue)}</p>
            <div className="w-full h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full mt-2 overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${totalRevenue > 0 ? (tierBreakdown[tier].revenue / totalRevenue) * 100 : 0}%`,
                  background: tier === 'Platinum' ? 'linear-gradient(90deg, #9ca3af, #e5e7eb, #9ca3af)'
                    : tier === 'Gold' ? 'linear-gradient(90deg, #f59e0b, #fbbf24, #f59e0b)'
                    : tier === 'Silver' ? 'linear-gradient(90deg, #9ca3af, #d1d5db, #9ca3af)'
                    : 'linear-gradient(90deg, #d97706, #f59e06, #d97706)',
                }}
              />
            </div>
          </Card>
        ))}
      </div>

      {/* Filter */}
      <div className="flex items-center gap-2">
        {(['All', 'Platinum', 'Gold', 'Silver', 'Bronze'] as const).map(f => (
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

      {/* Sponsor cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map(s => (
          <Card key={s.id} hover glow>
            {/* Header with tier ribbon */}
            <div className="relative">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  {/* Logo placeholder */}
                  <div className={cn('w-14 h-14 rounded-xl flex items-center justify-center text-lg font-bold', s.tierColors)}>
                    {s.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-gray-900 dark:text-white">{s.name}</h3>
                    <p className="text-xs text-gray-400">{s.industry}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={cn('px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide', s.tierBadgeClass)}>
                        {s.tier}
                      </span>
                      <Badge variant={statusVariant[s.status]}>{s.status}</Badge>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-gray-900 dark:text-white">{formatCurrency(s.amount)}</p>
                  <p className="text-[10px] text-gray-400 uppercase">{s.event}</p>
                </div>
              </div>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
              <div>
                <p className="text-[10px] text-gray-400 uppercase">Events</p>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">{s.totalEvents}</p>
              </div>
              <div>
                <p className="text-[10px] text-gray-400 uppercase">Mentions</p>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">{s.brandMentions}</p>
              </div>
              <div>
                <p className="text-[10px] text-gray-400 uppercase">Leads</p>
                <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">{s.leadGenerated}</p>
              </div>
            </div>

            {/* Benefits */}
            <div className="mt-4">
              <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-2">Benefits</p>
              <div className="grid grid-cols-2 gap-1">
                {s.benefits.map(b => (
                  <div key={b} className="flex items-center gap-1.5">
                    <span className="text-evt-500 text-[10px]">✓</span>
                    <span className="text-xs text-gray-600 dark:text-gray-400">{b}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-800">
              <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-2">Contact</p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-evt-100 dark:bg-evt-500/10 flex items-center justify-center text-xs font-bold text-evt-600 dark:text-evt-400">
                  {s.contact.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{s.contact.name}</p>
                  <p className="text-[10px] text-gray-400">{s.contact.title}</p>
                </div>
              </div>
              <div className="mt-2 flex items-center gap-4 text-xs text-gray-400">
                <span className="truncate">{s.contact.email}</span>
                <span>{s.contact.phone}</span>
              </div>
            </div>

            {/* Renewal */}
            <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
              <span className="text-xs text-gray-400">Renewal: {new Date(s.renewalDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
              {s.status === 'Active' && (
                <span className={cn(
                  'text-xs font-medium px-2 py-0.5 rounded-full',
                  new Date(s.renewalDate) < new Date('2026-07-01')
                    ? 'bg-amber-50 dark:bg-amber-500/10 text-amber-600'
                    : 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600'
                )}>
                  {new Date(s.renewalDate) < new Date('2026-07-01') ? 'Renewal Soon' : 'On Track'}
                </span>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
