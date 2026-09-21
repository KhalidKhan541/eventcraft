import Card, { CardHeader, CardTitle } from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import { formatCurrency, formatNumber, cn } from '@/lib/utils'

// ---------------------------------------------------------------------------
// Mock data
// ---------------------------------------------------------------------------
const CHANNELS = ['Email', 'Social', 'Ads'] as const
type Channel = (typeof CHANNELS)[number]

const channelBadge: Record<Channel, string> = {
  Email: 'bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400',
  Social: 'bg-purple-50 dark:bg-purple-500/10 text-purple-700 dark:text-purple-400',
  Ads: 'bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400',
}

type CampaignStatus = 'Active' | 'Scheduled' | 'Paused' | 'Completed' | 'Draft'
const statusVariant: Record<CampaignStatus, 'success' | 'info' | 'warning' | 'default'> = {
  Active: 'success',
  Scheduled: 'info',
  Paused: 'warning',
  Completed: 'success',
  Draft: 'default',
}

function seeded(seed: number) {
  const x = Math.sin(seed * 9301 + 49297) * 49297
  return x - Math.floor(x)
}

function buildCampaigns() {
  const names = [
    'Summer Music Fest Launch','Artisan Market Promo','Tech Conference Blast',
    'Food Truck Rally','Marathon Sponsorship Push','Charity Gala Outreach',
    'Holiday Craft Fair','New Year Eve Bash','Spring Garden Show',
    'Comedy Night Series','Photography Workshop','Wine Tasting Weekend',
    'Fitness Bootcamp Drive','Book Fair Blast','Film Festival Push',
    'Kids Science Expo','Vintage Car Show','Jazz in the Park',
    'Yoga Retreat Promo','Farmers Market Kickoff','Dance Recital Invite',
    'Comicon Countdown','TEDx City Push','Startup Week Hype',
    'Poetry Slam Series','Night Market Launch','Rooftop Cinema Ads',
    'BBQ Championship Promo','Flower Festival Push','Autumn Harvest Blast',
  ]

  const channels: Channel[] = ['Email', 'Social', 'Ads']
  const statuses: CampaignStatus[] = ['Active', 'Scheduled', 'Paused', 'Completed', 'Draft']
  const audiences = ['All Attendees', 'Past Visitors', 'VIP Members', 'New Signups', 'Local Community', 'Industry Prospects']

  const campaigns = names.map((name, i) => {
    const r = (n: number) => seeded(i * 37 + n)
    const channel = channels[Math.floor(r(1) * 3)]
    const status = statuses[Math.floor(r(2) * 5)]
    const sent = status === 'Draft' || status === 'Scheduled' ? 0 : Math.floor(r(3) * 45000) + 500
    const openRate = channel === 'Email' ? 0.22 + r(4) * 0.28 : 0
    const opened = Math.floor(sent * openRate)
    const clickRate = sent > 0 ? 0.04 + r(5) * 0.18 : 0
    const clicked = Math.floor(opened * (0.15 + r(6) * 0.35))
    const convRate = clicked > 0 ? 0.03 + r(7) * 0.1 : 0
    const conversions = Math.floor(clicked * convRate)
    const budget = (Math.floor(r(8) * 18) + 1) * 500
    const spent = status === 'Completed' ? Math.floor(budget * (0.85 + r(9) * 0.15)) : Math.floor(budget * r(10))
    const revenue = conversions * (Math.floor(r(11) * 350) + 80)
    const startMonth = Math.floor(r(12) * 9) + 1
    const endMonth = Math.min(startMonth + Math.floor(r(13) * 3) + 1, 12)

    return {
      id: `cpg_${String(i + 1).padStart(3, '0')}`,
      name,
      channel,
      status,
      sent,
      opened,
      clicked,
      conversions,
      budget,
      spent,
      revenue,
      roi: spent > 0 ? Math.round(((revenue - spent) / spent) * 100) : 0,
      audience: audiences[Math.floor(r(14) * audiences.length)],
      startDate: `2026-${String(startMonth).padStart(2, '0')}-01`,
      endDate: `2026-${String(endMonth).padStart(2, '0')}-28`,
    }
  })
  return campaigns
}

const MOCK_CAMPAIGNS = buildCampaigns()

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export default function CampaignsPage() {
  const totalSent = MOCK_CAMPAIGNS.reduce((s, c) => s + c.sent, 0)
  const totalOpened = MOCK_CAMPAIGNS.reduce((s, c) => s + c.opened, 0)
  const totalClicked = MOCK_CAMPAIGNS.reduce((s, c) => s + c.clicked, 0)
  const totalConversions = MOCK_CAMPAIGNS.reduce((s, c) => s + c.conversions, 0)
  const totalRevenue = MOCK_CAMPAIGNS.reduce((s, c) => s + c.revenue, 0)
  const totalSpent = MOCK_CAMPAIGNS.reduce((s, c) => s + c.spent, 0)
  const avgRoi = MOCK_CAMPAIGNS.filter(c => c.roi !== 0).reduce((s, c) => s + c.roi, 0) / MOCK_CAMPAIGNS.filter(c => c.roi !== 0).length || 0

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Campaigns</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Track marketing performance across channels</p>
        </div>
        <button className="px-5 py-2.5 bg-evt-600 hover:bg-evt-700 text-white rounded-xl text-sm font-medium transition-colors">
          + New Campaign
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <p className="text-sm text-gray-500 dark:text-gray-400">Total Sent</p>
          <p className="text-2xl font-bold text-evt-600 dark:text-evt-400 mt-1">{formatNumber(totalSent)}</p>
          <p className="text-xs text-gray-400 mt-1">{MOCK_CAMPAIGNS.length} campaigns</p>
        </Card>
        <Card>
          <p className="text-sm text-gray-500 dark:text-gray-400">Opened</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{formatNumber(totalOpened)}</p>
          <p className="text-xs text-gray-400 mt-1">{totalSent > 0 ? ((totalOpened / totalSent) * 100).toFixed(1) : 0}% open rate</p>
        </Card>
        <Card>
          <p className="text-sm text-gray-500 dark:text-gray-400">Conversions</p>
          <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">{formatNumber(totalConversions)}</p>
          <p className="text-xs text-gray-400 mt-1">{totalClicked > 0 ? ((totalConversions / totalClicked) * 100).toFixed(1) : 0}% conv. rate</p>
        </Card>
        <Card>
          <p className="text-sm text-gray-500 dark:text-gray-400">Revenue / ROI</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{formatCurrency(totalRevenue)}</p>
          <p className="text-xs text-emerald-500 mt-1">+{avgRoi.toFixed(0)}% avg ROI</p>
        </Card>
      </div>

      {/* Budget overview bar */}
      <Card>
        <div className="flex items-center justify-between mb-3">
          <CardTitle>Budget Overview</CardTitle>
          <span className="text-sm text-gray-500">{formatCurrency(totalSpent)} spent of {formatCurrency(MOCK_CAMPAIGNS.reduce((s, c) => s + c.budget, 0))}</span>
        </div>
        <div className="w-full h-3 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-evt-500 to-pink-500 rounded-full transition-all"
            style={{ width: `${MOCK_CAMPAIGNS.reduce((s, c) => s + c.budget, 0) > 0 ? (totalSpent / MOCK_CAMPAIGNS.reduce((s, c) => s + c.budget, 0)) * 100 : 0}%` }}
          />
        </div>
      </Card>

      {/* Channel breakdown mini-cards */}
      <div className="grid grid-cols-3 gap-4">
        {CHANNELS.map(ch => {
          const chCampaigns = MOCK_CAMPAIGNS.filter(c => c.channel === ch)
          const chSent = chCampaigns.reduce((s, c) => s + c.sent, 0)
          const chConv = chCampaigns.reduce((s, c) => s + c.conversions, 0)
          const chRev = chCampaigns.reduce((s, c) => s + c.revenue, 0)
          return (
            <Card key={ch} hover>
              <div className="flex items-center gap-2 mb-3">
                <span className={cn('px-2.5 py-0.5 rounded-full text-xs font-medium', channelBadge[ch])}>{ch}</span>
                <span className="text-xs text-gray-400">{chCampaigns.length} campaigns</span>
              </div>
              <p className="text-lg font-bold text-gray-900 dark:text-white">{formatNumber(chSent)} sent</p>
              <div className="flex items-center gap-4 mt-2">
                <span className="text-xs text-gray-500">{formatNumber(chConv)} conv.</span>
                <span className="text-xs font-medium text-emerald-600">{formatCurrency(chRev)}</span>
              </div>
            </Card>
          )
        })}
      </div>

      {/* Campaigns table */}
      <Card padding={false}>
        <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-800">
          <CardTitle>All Campaigns</CardTitle>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50">
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Campaign</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Channel</th>
                <th className="text-center px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Status</th>
                <th className="text-right px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Sent</th>
                <th className="text-right px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Opened</th>
                <th className="text-right px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Clicked</th>
                <th className="text-right px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Conv.</th>
                <th className="text-right px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Revenue</th>
                <th className="text-right px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Spend</th>
                <th className="text-right px-5 py-3 text-xs font-semibold text-gray-500 uppercase">ROI</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_CAMPAIGNS.map(c => (
                <tr key={c.id} className="border-b border-gray-50 dark:border-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                  <td className="px-5 py-3.5">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">{c.name}</div>
                    <div className="text-xs text-gray-400 mt-0.5">{c.audience}</div>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className={cn('inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium', channelBadge[c.channel])}>{c.channel}</span>
                  </td>
                  <td className="px-5 py-3.5 text-center">
                    <Badge variant={statusVariant[c.status]}>{c.status}</Badge>
                  </td>
                  <td className="px-5 py-3.5 text-right text-sm text-gray-600 dark:text-gray-400">{c.sent > 0 ? formatNumber(c.sent) : '—'}</td>
                  <td className="px-5 py-3.5 text-right text-sm text-gray-600 dark:text-gray-400">{c.opened > 0 ? formatNumber(c.opened) : '—'}</td>
                  <td className="px-5 py-3.5 text-right text-sm text-gray-600 dark:text-gray-400">{c.clicked > 0 ? formatNumber(c.clicked) : '—'}</td>
                  <td className="px-5 py-3.5 text-right text-sm font-semibold text-emerald-600 dark:text-emerald-400">{c.conversions > 0 ? formatNumber(c.conversions) : '—'}</td>
                  <td className="px-5 py-3.5 text-right text-sm font-medium text-gray-900 dark:text-white">{formatCurrency(c.revenue)}</td>
                  <td className="px-5 py-3.5 text-right text-sm text-gray-600 dark:text-gray-400">{formatCurrency(c.spent)}</td>
                  <td className="px-5 py-3.5 text-right">
                    <span className={cn('text-sm font-semibold', c.roi > 0 ? 'text-emerald-600 dark:text-emerald-400' : c.roi < 0 ? 'text-red-500' : 'text-gray-400')}>
                      {c.roi !== 0 ? `${c.roi > 0 ? '+' : ''}${c.roi}%` : '—'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
