'use client'

import { useState } from 'react'
import Card, { CardHeader, CardTitle } from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import { formatCurrency, cn } from '@/lib/utils'

// ---------------------------------------------------------------------------
// Mock data
// ---------------------------------------------------------------------------
type PromoStatus = 'Active' | 'Expired' | 'Scheduled' | 'Disabled'

function seeded(seed: number) {
  const x = Math.sin(seed * 9301 + 49297) * 49297
  return x - Math.floor(x)
}

function buildPromotions() {
  const codes = [
    'SUMMER2026', 'EARLYBIRD', 'VIPACCESS', 'GROUP10', 'STUDENT50',
    'FLASHSALE', 'WELCOME20', 'LOYALTY15', 'REFERAFRIEND', 'HOLIDAY30',
    'SPRINGFLING', 'BACKTOSCHOOL', 'WEEKEND10', 'VIP25', 'PARTNER40',
    'NEWYEAR', 'FREEMUSIC', 'FAMILY20', 'SENIOR15', 'MILITARY25',
    'FIRSTTIME', 'COMEBACK', 'BULK20', 'EARLY30', 'SEASON40',
    'PREMIUM50', 'STARTUP10', 'AGENCY20', 'ENTERPRISE', 'SOCIAL15',
  ]

  const descriptions = [
    'Summer festival season discount', 'Early registration incentive',
    'VIP tier exclusive pricing', 'Group booking discount (10+)',
    'Student verification discount', 'Flash sale limited time offer',
    'Welcome discount for new users', 'Loyalty program reward',
    'Referral incentive program', 'Holiday season special',
    'Spring event series promo', 'Back to school pricing',
    'Weekend warrior discount', 'VIP membership exclusive',
    'Partner organization rate', 'New Year celebration deal',
    'Free music event promotion', 'Family bundle pricing',
    'Senior citizen discount', 'Military & first responder',
    'First-time attendee offer', 'Win-back campaign',
    'Bulk ticket discount', 'Early bird extended', 'Season pass discount',
    'Premium experience upgrade', 'Startup community rate',
    'Agency partner pricing', 'Enterprise custom rate', 'Social media exclusive',
  ]

  const statuses: PromoStatus[] = ['Active', 'Expired', 'Scheduled', 'Disabled']

  return codes.map((code, i) => {
    const r = (n: number) => seeded(i * 43 + n)
    const discount = [10, 15, 20, 25, 30, 40, 50][Math.floor(r(1) * 7)]
    const maxUses = [100, 200, 500, 1000, 2000, 5000][Math.floor(r(2) * 6)]
    const uses = Math.floor(r(3) * maxUses)
    const status = statuses[Math.floor(r(4) * 4)]
    const avgOrderValue = Math.floor(r(5) * 300) + 75
    const revenue = uses * avgOrderValue * (discount / 100)
    const expiryMonth = Math.floor(r(6) * 12) + 1
    const expiryDay = Math.floor(r(7) * 28) + 1

    return {
      id: `promo_${String(i + 1).padStart(3, '0')}`,
      code,
      description: descriptions[i],
      discount,
      type: r(8) > 0.5 ? 'percentage' as const : 'fixed' as const,
      fixedAmount: r(8) > 0.5 ? 0 : discount,
      uses,
      maxUses,
      status,
      revenue,
      avgOrderValue,
      expiry: `2026-${String(expiryMonth).padStart(2, '0')}-${String(expiryDay).padStart(2, '0')}`,
      createdBy: ['Alex Morgan', 'Sarah Chen', 'James Wilson'][Math.floor(r(9) * 3)],
      minPurchase: [0, 25, 50, 100][Math.floor(r(10) * 4)],
      events: ['All Events', 'Summer Fest', 'Tech Conference', 'Food Rally', 'Art Market'][Math.floor(r(11) * 5)],
    }
  })
}

const MOCK_PROMOTIONS = buildPromotions()

const statusVariant: Record<PromoStatus, 'success' | 'info' | 'warning' | 'danger'> = {
  Active: 'success',
  Scheduled: 'info',
  Expired: 'danger',
  Disabled: 'warning',
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export default function PromotionsPage() {
  const [filter, setFilter] = useState<'All' | PromoStatus>('All')

  const filtered = filter === 'All' ? MOCK_PROMOTIONS : MOCK_PROMOTIONS.filter(p => p.status === filter)
  const totalRevenue = MOCK_PROMOTIONS.reduce((s, p) => s + p.revenue, 0)
  const totalUses = MOCK_PROMOTIONS.reduce((s, p) => s + p.uses, 0)
  const activeCount = MOCK_PROMOTIONS.filter(p => p.status === 'Active').length
  const avgDiscount = Math.round(MOCK_PROMOTIONS.reduce((s, p) => s + p.discount, 0) / MOCK_PROMOTIONS.length)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Promotions</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Manage promo codes and discount campaigns</p>
        </div>
        <button className="px-5 py-2.5 bg-evt-600 hover:bg-evt-700 text-white rounded-xl text-sm font-medium transition-colors">
          + Create Promo Code
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <p className="text-sm text-gray-500 dark:text-gray-400">Active Codes</p>
          <p className="text-2xl font-bold text-evt-600 dark:text-evt-400 mt-1">{activeCount}</p>
          <p className="text-xs text-gray-400 mt-1">of {MOCK_PROMOTIONS.length} total</p>
        </Card>
        <Card>
          <p className="text-sm text-gray-500 dark:text-gray-400">Total Uses</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{totalUses.toLocaleString()}</p>
          <p className="text-xs text-gray-400 mt-1">across all codes</p>
        </Card>
        <Card>
          <p className="text-sm text-gray-500 dark:text-gray-400">Revenue Generated</p>
          <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">{formatCurrency(totalRevenue)}</p>
          <p className="text-xs text-gray-400 mt-1">from promo redemptions</p>
        </Card>
        <Card>
          <p className="text-sm text-gray-500 dark:text-gray-400">Avg Discount</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{avgDiscount}%</p>
          <p className="text-xs text-gray-400 mt-1">across active codes</p>
        </Card>
      </div>

      {/* Filter bar */}
      <div className="flex items-center gap-2">
        {(['All', 'Active', 'Scheduled', 'Expired', 'Disabled'] as const).map(f => (
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

      {/* Promotions grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map(p => (
          <Card key={p.id} hover glow>
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-evt-50 dark:bg-evt-500/10 text-evt-700 dark:text-evt-400 rounded-lg text-sm font-mono font-bold tracking-wide">
                    {p.code}
                  </span>
                  <Badge variant={statusVariant[p.status]} dot>{p.status}</Badge>
                </div>
                <p className="text-xs text-gray-400 mt-2">{p.description}</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-evt-600 dark:text-evt-400">{p.discount}%</p>
                <p className="text-[10px] text-gray-400 uppercase">off</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
              <div>
                <p className="text-xs text-gray-400">Uses</p>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                  {p.uses.toLocaleString()} <span className="text-gray-400 font-normal">/ {p.maxUses.toLocaleString()}</span>
                </p>
                <div className="w-full h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full mt-1 overflow-hidden">
                  <div
                    className="h-full bg-evt-400 dark:bg-evt-500 rounded-full"
                    style={{ width: `${Math.min((p.uses / p.maxUses) * 100, 100)}%` }}
                  />
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-400">Revenue</p>
                <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">{formatCurrency(p.revenue)}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400">Avg Order</p>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">{formatCurrency(p.avgOrderValue)}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400">Expires</p>
                <p className={cn('text-sm font-semibold', new Date(p.expiry) < new Date() ? 'text-red-500' : 'text-gray-900 dark:text-white')}>
                  {new Date(p.expiry).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100 dark:border-gray-800">
              <span className="text-xs text-gray-400">By {p.createdBy}</span>
              <span className="text-xs text-gray-400">{p.events}</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
