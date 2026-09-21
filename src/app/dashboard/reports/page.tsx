'use client';

import { useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
  AreaChart, Area,
} from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { MOCK_REVENUE } from '@/lib/mock-data';
import { formatCurrency, formatNumber, cn } from '@/lib/utils';

type ReportTab = 'overview' | 'revenue' | 'attendees' | 'marketing';

const TABS: { key: ReportTab; label: string }[] = [
  { key: 'overview', label: 'Event Reports' },
  { key: 'revenue', label: 'Revenue Reports' },
  { key: 'attendees', label: 'Attendee Reports' },
  { key: 'marketing', label: 'Marketing Reports' },
];

const PIE_COLORS = ['#f43f5e', '#ec4899', '#fda4af', '#fb7185', '#be123c'];

const MARKETING_CHANNELS = [
  { channel: 'Social Media', reach: 48200, conversions: 1840, spend: 1250000 },
  { channel: 'Email', reach: 32600, conversions: 2100, spend: 420000 },
  { channel: 'Google Ads', reach: 61400, conversions: 1520, spend: 1860000 },
  { channel: 'Influencers', reach: 27800, conversions: 980, spend: 940000 },
  { channel: 'PR & Media', reach: 152000, conversions: 620, spend: 780000 },
  { channel: 'Flyers/Print', reach: 8400, conversions: 340, spend: 320000 },
];

const ATTENDEE_DEMOGRAPHICS = [
  { age: '18–24', count: 680 },
  { age: '25–34', count: 1420 },
  { age: '35–44', count: 1180 },
  { age: '45–54', count: 860 },
  { age: '55–64', count: 420 },
  { age: '65+', count: 260 },
];

const ATTENDEE_SOURCES = [
  { source: 'Direct Website', value: 1840 },
  { source: 'Social Media', value: 1260 },
  { source: 'Email Campaign', value: 920 },
  { source: 'Referral', value: 480 },
  { source: 'Partner', value: 320 },
];

const SATISFACTION_DATA = [
  { month: 'Jan', score: 4.2 },
  { month: 'Feb', score: 4.3 },
  { month: 'Mar', score: 4.1 },
  { month: 'Apr', score: 4.5 },
  { month: 'May', score: 4.4 },
  { month: 'Jun', score: 4.6 },
  { month: 'Jul', score: 4.7 },
  { month: 'Aug', score: 4.5 },
  { month: 'Sep', score: 4.3 },
  { month: 'Oct', score: 4.6 },
  { month: 'Nov', score: 4.4 },
  { month: 'Dec', score: 4.8 },
];

// Helper: convert cents → dollars for charts
const c2d = (cents: number) => cents / 100;

export default function ReportsPage() {
  const [activeTab, setActiveTab] = useState<ReportTab>('overview');

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50/60 via-white to-rose-50/30 p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
        <p className="mt-1 text-gray-500">Build and explore reports across events, revenue, attendees, and marketing.</p>
      </div>

      {/* Tab Navigation */}
      <div className="mb-8 flex flex-wrap gap-2">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={cn(
              'rounded-lg px-4 py-2 text-sm font-medium transition-all',
              activeTab === tab.key
                ? 'bg-rose-500 text-white shadow-sm'
                : 'border border-gray-200 bg-white text-gray-600 hover:bg-rose-50 hover:text-rose-600'
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && <EventReportsTab />}
      {activeTab === 'revenue' && <RevenueReportsTab />}
      {activeTab === 'attendees' && <AttendeeReportsTab />}
      {activeTab === 'marketing' && <MarketingReportsTab />}
    </div>
  );
}

// ── Event Reports Tab ──────────────────────────────────────────────────

function EventReportsTab() {
  return (
    <div className="space-y-6">
      {/* KPI Row */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard label="Events Completed" value={String(MOCK_REVENUE.eventsCompleted)} />
        <KpiCard label="Total Attendees" value={formatNumber(MOCK_REVENUE.totalAttendees)} />
        <KpiCard label="Avg Ticket Price" value={formatCurrency(MOCK_REVENUE.avgTicketPrice)} />
        <KpiCard label="Net Profit" value={formatCurrency(MOCK_REVENUE.netProfit)} highlight />
      </div>

      {/* Top Events Table */}
      <Card>
        <CardHeader>
          <CardTitle>Top Events by Revenue</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b text-xs uppercase text-gray-500">
                  <th className="pb-3 pr-4 font-medium">Event</th>
                  <th className="pb-3 pr-4 font-medium">Revenue</th>
                  <th className="pb-3 pr-4 font-medium">Profit</th>
                  <th className="pb-3 font-medium">Margin</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_REVENUE.topEvents.map((evt, i) => {
                  const margin = Math.round((evt.profit / evt.revenue) * 100);
                  return (
                    <tr key={i} className="border-b last:border-0">
                      <td className="py-3 pr-4 font-medium text-gray-900">{evt.name}</td>
                      <td className="py-3 pr-4 text-gray-700">{formatCurrency(evt.revenue)}</td>
                      <td className="py-3 pr-4 text-gray-700">{formatCurrency(evt.profit)}</td>
                      <td className="py-3">
                        <Badge variant={margin > 40 ? 'success' : 'warning'}>
                          {margin}%
                        </Badge>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Revenue breakdown bar */}
      <Card>
        <CardHeader>
          <CardTitle>Revenue by Source</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MOCK_REVENUE.revenueBySource.map((d) => ({ ...d, dollars: c2d(d.value) }))} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f1f1" />
                <XAxis type="number" tickFormatter={(v) => `$${(v / 1000).toFixed(0)}K`} tick={{ fontSize: 12 }} />
                <YAxis type="category" dataKey="source" tick={{ fontSize: 12 }} width={120} />
                <Tooltip formatter={(v: number) => `$${v.toLocaleString()}`} />
                <Bar dataKey="dollars" fill="#f43f5e" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// ── Revenue Reports Tab ────────────────────────────────────────────────

function RevenueReportsTab() {
  const chartMonthly = MOCK_REVENUE.monthlyData.map((d) => ({
    ...d,
    ticketSales: c2d(d.ticketSales),
    sponsorships: c2d(d.sponsorships),
    foodBeverage: c2d(d.foodBeverage),
    merchandise: c2d(d.merchandise),
    other: c2d(d.other),
  }));

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard label="Total Revenue" value={formatCurrency(MOCK_REVENUE.totalRevenue)} />
        <KpiCard label="Total Expenses" value={formatCurrency(MOCK_REVENUE.totalExpenses)} />
        <KpiCard label="Net Profit" value={formatCurrency(MOCK_REVENUE.netProfit)} highlight />
        <KpiCard label="Profit Margin" value={`${Math.round((MOCK_REVENUE.netProfit / MOCK_REVENUE.totalRevenue) * 100)}%`} />
      </div>

      {/* Stacked area chart */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Revenue Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartMonthly}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f1f1" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tickFormatter={(v) => `$${(v / 1000).toFixed(0)}K`} tick={{ fontSize: 12 }} />
                <Tooltip formatter={(v: number) => `$${v.toLocaleString()}`} />
                <Legend />
                <Area type="monotone" dataKey="ticketSales" stackId="1" stroke="#f43f5e" fill="#f43f5e" fillOpacity={0.8} name="Ticket Sales" />
                <Area type="monotone" dataKey="sponsorships" stackId="1" stroke="#ec4899" fill="#ec4899" fillOpacity={0.8} name="Sponsorships" />
                <Area type="monotone" dataKey="foodBeverage" stackId="1" stroke="#fda4af" fill="#fda4af" fillOpacity={0.8} name="Food & Bev" />
                <Area type="monotone" dataKey="merchandise" stackId="1" stroke="#fb7185" fill="#fb7185" fillOpacity={0.8} name="Merchandise" />
                <Area type="monotone" dataKey="other" stackId="1" stroke="#be123c" fill="#be123c" fillOpacity={0.8} name="Other" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Pie + Bar row */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Revenue by Source (Pie)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={MOCK_REVENUE.revenueBySource.map((d) => ({ ...d, dollars: c2d(d.value) }))}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={90}
                    paddingAngle={4}
                    dataKey="dollars"
                  >
                    {MOCK_REVENUE.revenueBySource.map((_, i) => (
                      <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(v: number) => `$${v.toLocaleString()}`} />
                  <Legend iconSize={8} wrapperStyle={{ fontSize: 11 }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Monthly Revenue Bar</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartMonthly}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f1f1" />
                  <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                  <YAxis tickFormatter={(v) => `$${(v / 1000).toFixed(0)}K`} tick={{ fontSize: 11 }} />
                  <Tooltip formatter={(v: number) => `$${v.toLocaleString()}`} />
                  <Bar dataKey="ticketSales" fill="#f43f5e" radius={[3, 3, 0, 0]} name="Ticket Sales" />
                  <Bar dataKey="sponsorships" fill="#ec4899" radius={[3, 3, 0, 0]} name="Sponsorships" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// ── Attendee Reports Tab ───────────────────────────────────────────────

function AttendeeReportsTab() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard label="Total Attendees" value={formatNumber(MOCK_REVENUE.totalAttendees)} />
        <KpiCard label="Avg per Event" value={String(Math.round(MOCK_REVENUE.totalAttendees / MOCK_REVENUE.eventsCompleted))} />
        <KpiCard label="Satisfaction" value="4.5 ★" highlight />
        <KpiCard label="Return Rate" value="34%" />
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Demographics bar */}
        <Card>
          <CardHeader>
            <CardTitle>Age Demographics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={ATTENDEE_DEMOGRAPHICS}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f1f1" />
                  <XAxis dataKey="age" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Bar dataKey="count" fill="#f43f5e" radius={[4, 4, 0, 0]} name="Attendees" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Source pie */}
        <Card>
          <CardHeader>
            <CardTitle>Registration Sources</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={ATTENDEE_SOURCES} cx="50%" cy="50%" innerRadius={45} outerRadius={85} paddingAngle={4} dataKey="value">
                    {ATTENDEE_SOURCES.map((_, i) => (
                      <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend iconSize={8} wrapperStyle={{ fontSize: 11 }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Satisfaction trend */}
      <Card>
        <CardHeader>
          <CardTitle>Satisfaction Score Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={SATISFACTION_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f1f1" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis domain={[3.5, 5]} tick={{ fontSize: 12 }} />
                <Tooltip />
                <Area type="monotone" dataKey="score" stroke="#f43f5e" fill="#f43f5e" fillOpacity={0.2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// ── Marketing Reports Tab ──────────────────────────────────────────────

function MarketingReportsTab() {
  const totalSpend = MARKETING_CHANNELS.reduce((s, c) => s + c.spend, 0);
  const totalConversions = MARKETING_CHANNELS.reduce((s, c) => s + c.conversions, 0);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard label="Total Reach" value={formatNumber(MARKETING_CHANNELS.reduce((s, c) => s + c.reach, 0))} />
        <KpiCard label="Total Conversions" value={formatNumber(totalConversions)} />
        <KpiCard label="Total Ad Spend" value={formatCurrency(totalSpend)} />
        <KpiCard label="Cost per Conversion" value={formatCurrency(Math.round(totalSpend / totalConversions))} />
      </div>

      {/* Channel performance table */}
      <Card>
        <CardHeader>
          <CardTitle>Channel Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b text-xs uppercase text-gray-500">
                  <th className="pb-3 pr-4 font-medium">Channel</th>
                  <th className="pb-3 pr-4 font-medium">Reach</th>
                  <th className="pb-3 pr-4 font-medium">Conversions</th>
                  <th className="pb-3 pr-4 font-medium">Spend</th>
                  <th className="pb-3 font-medium">Cost / Conv</th>
                </tr>
              </thead>
              <tbody>
                {MARKETING_CHANNELS.map((ch, i) => {
                  const cpc = Math.round(ch.spend / ch.conversions);
                  return (
                    <tr key={i} className="border-b last:border-0">
                      <td className="py-3 pr-4 font-medium text-gray-900">{ch.channel}</td>
                      <td className="py-3 pr-4 text-gray-700">{formatNumber(ch.reach)}</td>
                      <td className="py-3 pr-4 text-gray-700">{formatNumber(ch.conversions)}</td>
                      <td className="py-3 pr-4 text-gray-700">{formatCurrency(ch.spend)}</td>
                      <td className="py-3">
                        <Badge variant={cpc < 1000 ? 'success' : cpc < 1500 ? 'warning' : 'destructive'}>
                          {formatCurrency(cpc)}
                        </Badge>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Reach bar */}
        <Card>
          <CardHeader>
            <CardTitle>Reach by Channel</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={MARKETING_CHANNELS} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f1f1" />
                  <XAxis type="number" tickFormatter={(v) => `${(v / 1000).toFixed(0)}K`} tick={{ fontSize: 11 }} />
                  <YAxis type="category" dataKey="channel" tick={{ fontSize: 11 }} width={100} />
                  <Tooltip formatter={(v: number) => formatNumber(v)} />
                  <Bar dataKey="reach" fill="#ec4899" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Spend pie */}
        <Card>
          <CardHeader>
            <CardTitle>Spend Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={MARKETING_CHANNELS.map((c) => ({ ...c, dollars: c2d(c.spend) }))}
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={85}
                    paddingAngle={4}
                    dataKey="dollars"
                    nameKey="channel"
                  >
                    {MARKETING_CHANNELS.map((_, i) => (
                      <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(v: number) => `$${v.toLocaleString()}`} />
                  <Legend iconSize={8} wrapperStyle={{ fontSize: 11 }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// ── Shared Components ──────────────────────────────────────────────────

function KpiCard({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <Card>
      <CardContent className="pt-6">
        <p className="text-sm font-medium text-gray-500">{label}</p>
        <p className={cn('mt-1 text-2xl font-bold', highlight ? 'text-rose-600' : 'text-gray-900')}>
          {value}
        </p>
      </CardContent>
    </Card>
  );
}
