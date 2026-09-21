'use client';

import { useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { MOCK_BUDGET, type BudgetEvent } from '@/lib/mock-data';
import { formatCurrency, cn } from '@/lib/utils';

const STATUS_STYLES: Record<string, string> = {
  draft: 'bg-gray-100 text-gray-600',
  active: 'bg-emerald-100 text-emerald-700',
  review: 'bg-amber-100 text-amber-700',
  closed: 'bg-blue-100 text-blue-700',
};

const LINE_STATUS_VARIANT: Record<string, 'success' | 'warning' | 'destructive'> = {
  under: 'success',
  'on-track': 'warning',
  over: 'destructive',
};

const PIE_COLORS = ['#f43f5e', '#ec4899', '#fda4af', '#fb7185', '#be123c', '#9f1239'];

export default function BudgetPage() {
  const [selectedEvent, setSelectedEvent] = useState<string | null>(MOCK_BUDGET[0].id);

  const totalBudgetAll = MOCK_BUDGET.reduce((s, e) => s + e.totalBudget, 0);
  const totalSpentAll = MOCK_BUDGET.reduce((s, e) => s + e.totalSpent, 0);
  const totalForecastAll = MOCK_BUDGET.reduce((s, e) => s + e.forecast, 0);

  const activeBudget = MOCK_BUDGET.find((e) => e.id === selectedEvent);

  const categoryData = activeBudget
    ? activeBudget.lineItems.map((li) => ({
        name: li.category,
        allocated: li.allocated / 100,
        spent: li.spent / 100,
        variance: (li.allocated - li.spent) / 100,
      }))
    : [];

  const pieData = activeBudget
    ? activeBudget.lineItems.map((li) => ({ name: li.category, value: li.allocated / 100 }))
    : [];

  const overviewData = MOCK_BUDGET.map((e) => ({
    name: e.eventName.length > 18 ? e.eventName.slice(0, 18) + '…' : e.eventName,
    budget: e.totalBudget / 100,
    spent: e.totalSpent / 100,
    forecast: e.forecast / 100,
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50/60 via-white to-rose-50/30 p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Budget Management</h1>
        <p className="mt-1 text-gray-500">Track allocations, spending, and forecasts across all events.</p>
      </div>

      {/* Summary Cards */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <SummaryCard title="Total Budget" value={formatCurrency(totalBudgetAll)} accent="rose" />
        <SummaryCard title="Total Spent" value={formatCurrency(totalSpentAll)} accent="amber" />
        <SummaryCard
          title="Remaining"
          value={formatCurrency(totalBudgetAll - totalSpentAll)}
          accent={totalBudgetAll - totalSpentAll >= 0 ? 'emerald' : 'red'}
        />
        <SummaryCard title="Forecast" value={formatCurrency(totalForecastAll)} accent="blue" />
      </div>

      {/* Overview Chart */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Budget vs Spent – All Events</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={overviewData} barGap={4}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f1f1" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis tickFormatter={(v) => `$${(v / 1000).toFixed(0)}K`} tick={{ fontSize: 12 }} />
                <Tooltip formatter={(v: number) => `$${v.toLocaleString()}`} />
                <Legend />
                <Bar dataKey="budget" fill="#fda4af" radius={[4, 4, 0, 0]} name="Budget" />
                <Bar dataKey="spent" fill="#f43f5e" radius={[4, 4, 0, 0]} name="Spent" />
                <Bar dataKey="forecast" fill="#ec4899" radius={[4, 4, 0, 0]} name="Forecast" opacity={0.5} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Per-Event Selector + Details */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Event list */}
        <div className="space-y-3 lg:col-span-1">
          <h2 className="mb-2 text-lg font-semibold text-gray-800">Events</h2>
          {MOCK_BUDGET.map((evt) => {
            const pct = Math.round((evt.totalSpent / evt.totalBudget) * 100);
            return (
              <button
                key={evt.id}
                onClick={() => setSelectedEvent(evt.id)}
                className={cn(
                  'w-full rounded-xl border p-4 text-left transition-all',
                  selectedEvent === evt.id
                    ? 'border-rose-300 bg-rose-50 shadow-md ring-1 ring-rose-200'
                    : 'border-gray-200 bg-white hover:border-rose-200 hover:bg-rose-50/40'
                )}
              >
                <div className="mb-1 flex items-center justify-between">
                  <span className="font-medium text-gray-900">{evt.eventName}</span>
                  <span className={cn('rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase', STATUS_STYLES[evt.status])}>
                    {evt.status}
                  </span>
                </div>
                <div className="mb-2 text-xs text-gray-500">{evt.date}</div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
                  <div
                    className={cn('h-full rounded-full transition-all', pct > 100 ? 'bg-red-500' : 'bg-rose-500')}
                    style={{ width: `${Math.min(pct, 100)}%` }}
                  />
                </div>
                <div className="mt-1 flex justify-between text-[11px] text-gray-500">
                  <span>{formatCurrency(evt.totalSpent)} spent</span>
                  <span>{pct}%</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Detail panel */}
        <div className="space-y-6 lg:col-span-2">
          {activeBudget && (
            <>
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>{activeBudget.eventName}</CardTitle>
                    <span className={cn('rounded-full px-2.5 py-0.5 text-xs font-semibold uppercase', STATUS_STYLES[activeBudget.status])}>
                      {activeBudget.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">
                    {activeBudget.date} &middot; {activeBudget.lineItems.length} line items
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="mb-6 grid grid-cols-3 gap-4">
                    <MiniStat label="Budget" value={formatCurrency(activeBudget.totalBudget)} />
                    <MiniStat label="Spent" value={formatCurrency(activeBudget.totalSpent)} />
                    <MiniStat label="Forecast" value={formatCurrency(activeBudget.forecast)} />
                  </div>

                  {/* Allocated vs Spent bars */}
                  <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-700">
                    Allocated vs Spent
                  </h3>
                  <div className="space-y-4">
                    {activeBudget.lineItems.map((li) => {
                      const pct = Math.min(Math.round((li.spent / li.allocated) * 100), 100);
                      const overBudget = li.spent > li.allocated;
                      return (
                        <div key={li.id}>
                          <div className="mb-1 flex items-center justify-between text-sm">
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-gray-800">{li.category}</span>
                              <Badge variant={LINE_STATUS_VARIANT[li.status]} size="sm">
                                {li.status === 'under' ? 'Under' : li.status === 'on-track' ? 'On Track' : 'Over'}
                              </Badge>
                            </div>
                            <span className="text-gray-500">
                              {formatCurrency(li.spent)} / {formatCurrency(li.allocated)}
                            </span>
                          </div>
                          <div className="h-2.5 w-full overflow-hidden rounded-full bg-gray-100">
                            <div
                              className={cn(
                                'h-full rounded-full transition-all',
                                overBudget ? 'bg-red-500' : pct > 85 ? 'bg-amber-400' : 'bg-rose-500'
                              )}
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                          <p className="mt-0.5 text-xs text-gray-400">{li.description}</p>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Charts row */}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {/* Variance chart */}
                <Card>
                  <CardHeader>
                    <CardTitle>Variance by Category</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-56">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={categoryData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#f1f1f1" />
                          <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                          <YAxis tickFormatter={(v) => `$${(v / 1000).toFixed(0)}K`} tick={{ fontSize: 11 }} />
                          <Tooltip formatter={(v: number) => `$${v.toLocaleString()}`} />
                          <Bar dataKey="allocated" fill="#fda4af" radius={[3, 3, 0, 0]} name="Allocated" />
                          <Bar dataKey="spent" fill="#f43f5e" radius={[3, 3, 0, 0]} name="Spent" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                {/* Pie chart */}
                <Card>
                  <CardHeader>
                    <CardTitle>Budget Allocation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-56">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={pieData}
                            cx="50%"
                            cy="50%"
                            innerRadius={45}
                            outerRadius={80}
                            paddingAngle={4}
                            dataKey="value"
                          >
                            {pieData.map((_, i) => (
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
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Helper Components ──────────────────────────────────────────────────

function SummaryCard({ title, value, accent }: { title: string; value: string; accent: string }) {
  const barColors: Record<string, string> = {
    rose: 'bg-rose-500',
    amber: 'bg-amber-500',
    emerald: 'bg-emerald-500',
    red: 'bg-red-500',
    blue: 'bg-blue-500',
  };
  return (
    <Card>
      <CardContent className="pt-6">
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="mt-1 text-2xl font-bold text-gray-900">{value}</p>
        <div className={cn('mt-3 h-1 w-full rounded-full', barColors[accent] || 'bg-rose-500')} />
      </CardContent>
    </Card>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-gray-50 p-3 text-center">
      <p className="text-xs text-gray-500">{label}</p>
      <p className="text-lg font-bold text-gray-900">{value}</p>
    </div>
  );
}
