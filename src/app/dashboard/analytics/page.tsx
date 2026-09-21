"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  DollarSign,
  Users,
  Star,
  Repeat,
  Target,
  TrendingUp,
  Megaphone,
  Eye,
  MousePointerClick,
} from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { MetricCard } from "@/components/ui/MetricCard";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import {
  MOCK_REVENUE_BY_MONTH,
  MOCK_TICKET_SALES_BY_TYPE,
  MOCK_ATTENDEE_DEMOGRAPHICS,
  MOCK_MARKETING_CHANNELS,
  MOCK_EVENT_PERFORMANCE,
  MOCK_REVENUE_BY_EVENT,
  MOCK_TICKET_SALES_TREND,
  MOCK_SATISFACTION,
  MOCK_CONVERSION_FUNNEL,
} from "@/lib/mock-data";
import { formatCurrency, formatNumber } from "@/lib/utils";

// ── Chart colors (rose theme) ──────────────────────────────
const COLORS = ["#e11d48", "#f43f5e", "#fb7185", "#fda4af", "#fecdd3", "#ffe4e6"];

// ── Custom tooltip ──────────────────────────────────────────
function ChartTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-3">
      <p className="text-sm font-semibold text-gray-900 mb-1">{label}</p>
      {payload.map((p: any, i: number) => (
        <p key={i} className="text-sm text-gray-600">
          <span
            className="inline-block w-2 h-2 rounded-full mr-1.5"
            style={{ backgroundColor: p.color }}
          />
          {p.name}:{" "}
          {typeof p.value === "number" && p.value > 1000
            ? formatNumber(p.value)
            : p.value}
        </p>
      ))}
    </div>
  );
}

// ── Tabs ────────────────────────────────────────────────────
const TABS = [
  { id: "overview", label: "Overview" },
  { id: "events", label: "Event Performance" },
  { id: "tickets", label: "Ticket Sales" },
  { id: "demographics", label: "Demographics" },
  { id: "marketing", label: "Marketing" },
] as const;

type TabId = (typeof TABS)[number]["id"];

export default function AnalyticsPage() {
  const [tab, setTab] = useState<TabId>("overview");

  return (
    <div className="space-y-6 animate-fade-in">
      {/* ── Header ─────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard"
            className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center text-gray-500 hover:text-gray-700 transition-colors"
          >
            <ArrowLeft size={18} />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
            <p className="text-sm text-gray-500 mt-0.5">
              Deep insights into your events and attendees
            </p>
          </div>
        </div>
      </div>

      {/* ── Tab Navigation ─────────────────────────────────── */}
      <div className="flex gap-1 p-1 bg-gray-100 rounded-xl overflow-x-auto">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
              tab === t.id
                ? "bg-white text-rose-600 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* ═══════════════════════════════════════════════════════
          OVERVIEW TAB
          ═══════════════════════════════════════════════════════ */}
      {tab === "overview" && (
        <div className="space-y-6">
          {/* Metric cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard
              label="Total Revenue"
              value={formatCurrency(89240000)}
              change={24.7}
              changeLabel="vs last quarter"
              icon={<DollarSign size={22} />}
            />
            <MetricCard
              label="Total Attendees"
              value={formatNumber(18420)}
              change={18.3}
              changeLabel="vs last quarter"
              icon={<Users size={22} />}
            />
            <MetricCard
              label="Avg Satisfaction"
              value="4.6"
              change={4.7}
              changeLabel="vs last quarter"
              icon={<Star size={22} />}
            />
            <MetricCard
              label="Repeat Attendee Rate"
              value="34.2"
              suffix="%"
              change={5.1}
              changeLabel="vs last quarter"
              icon={<Repeat size={22} />}
            />
          </div>

          {/* Revenue trend + Satisfaction */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={MOCK_REVENUE_BY_MONTH}>
                      <defs>
                        <linearGradient id="overviewRevGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#e11d48" stopOpacity={0.3} />
                          <stop offset="100%" stopColor="#e11d48" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                      <XAxis
                        dataKey="month"
                        tick={{ fontSize: 12, fill: "#9ca3af" }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <YAxis
                        tick={{ fontSize: 12, fill: "#9ca3af" }}
                        axisLine={false}
                        tickLine={false}
                        tickFormatter={(v: number) => `$${v / 1000000}M`}
                      />
                      <Tooltip content={<ChartTooltip />} />
                      <Area
                        type="monotone"
                        dataKey="revenue"
                        stroke="#e11d48"
                        strokeWidth={2.5}
                        fill="url(#overviewRevGrad)"
                        name="Revenue"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Satisfaction Score</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={MOCK_SATISFACTION}>
                      <defs>
                        <linearGradient id="satGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#e11d48" stopOpacity={0.2} />
                          <stop offset="100%" stopColor="#e11d48" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                      <XAxis
                        dataKey="month"
                        tick={{ fontSize: 12, fill: "#9ca3af" }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <YAxis
                        domain={[3.5, 5]}
                        tick={{ fontSize: 12, fill: "#9ca3af" }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <Tooltip content={<ChartTooltip />} />
                      <Area
                        type="monotone"
                        dataKey="score"
                        stroke="#e11d48"
                        strokeWidth={2.5}
                        fill="url(#satGrad)"
                        name="Score"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Conversion funnel */}
          <Card>
            <CardHeader>
              <CardTitle>Conversion Funnel</CardTitle>
              <span className="text-xs text-gray-400">
                From page view to registration
              </span>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {MOCK_CONVERSION_FUNNEL.map((s, i) => {
                  const width =
                    (s.count / MOCK_CONVERSION_FUNNEL[0].count) * 100;
                  return (
                    <div key={s.stage} className="flex items-center gap-4">
                      <span className="w-36 text-sm text-gray-500 text-right flex-shrink-0">
                        {s.stage}
                      </span>
                      <div className="flex-1 h-9 bg-gray-100 rounded-lg overflow-hidden">
                        <div
                          className="h-full rounded-lg flex items-center justify-end pr-3 transition-all duration-700"
                          style={{
                            width: `${width}%`,
                            backgroundColor:
                              COLORS[Math.min(i, COLORS.length - 1)],
                          }}
                        >
                          <span className="text-xs font-bold text-white">
                            {formatNumber(s.count)}
                          </span>
                        </div>
                      </div>
                      <span className="w-12 text-xs text-gray-400 text-right flex-shrink-0">
                        {s.percentage}%
                      </span>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════
          EVENT PERFORMANCE TAB
          ═══════════════════════════════════════════════════════ */}
      {tab === "events" && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Event Performance Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={MOCK_EVENT_PERFORMANCE}
                    layout="vertical"
                    margin={{ left: 20 }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="#e5e7eb"
                      horizontal={false}
                    />
                    <XAxis
                      type="number"
                      tick={{ fontSize: 12, fill: "#9ca3af" }}
                      axisLine={false}
                      tickLine={false}
                      tickFormatter={(v: number) => `$${v / 1000000}M`}
                    />
                    <YAxis
                      dataKey="event"
                      type="category"
                      tick={{ fontSize: 11, fill: "#9ca3af" }}
                      axisLine={false}
                      tickLine={false}
                      width={160}
                    />
                    <Tooltip content={<ChartTooltip />} />
                    <Bar
                      dataKey="revenue"
                      fill="#e11d48"
                      radius={[0, 6, 6, 0]}
                      name="Revenue"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Event Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-500">
                        Event
                      </th>
                      <th className="text-right py-3 px-4 font-medium text-gray-500">
                        Revenue
                      </th>
                      <th className="text-right py-3 px-4 font-medium text-gray-500">
                        Attendees
                      </th>
                      <th className="text-right py-3 px-4 font-medium text-gray-500">
                        Satisfaction
                      </th>
                      <th className="text-right py-3 px-4 font-medium text-gray-500">
                        ROI
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {MOCK_EVENT_PERFORMANCE.map((ev) => (
                      <tr
                        key={ev.event}
                        className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                      >
                        <td className="py-3 px-4 font-medium text-gray-900">
                          {ev.event}
                        </td>
                        <td className="py-3 px-4 text-right text-gray-700">
                          {ev.revenue > 0 ? formatCurrency(ev.revenue) : "—"}
                        </td>
                        <td className="py-3 px-4 text-right text-gray-700">
                          {formatNumber(ev.attendees)}
                        </td>
                        <td className="py-3 px-4 text-right">
                          {ev.satisfaction > 0 ? (
                            <span className="inline-flex items-center gap-1 text-amber-500">
                              <Star size={12} fill="currentColor" />
                              {ev.satisfaction}
                            </span>
                          ) : (
                            <span className="text-gray-400">—</span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-right">
                          <Badge
                            variant={
                              ev.roi >= 8
                                ? "success"
                                : ev.roi >= 4
                                ? "warning"
                                : ev.roi > 0
                                ? "info"
                                : "secondary"
                            }
                            size="sm"
                          >
                            {ev.roi > 0 ? `${ev.roi}x` : "—"}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════
          TICKET SALES TAB
          ═══════════════════════════════════════════════════════ */}
      {tab === "tickets" && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Ticket Sales Trend</CardTitle>
              <span className="text-xs text-gray-400">
                Weekly sales by ticket type
              </span>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={MOCK_TICKET_SALES_TREND}>
                    <defs>
                      <linearGradient id="vipGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#e11d48" stopOpacity={0.2} />
                        <stop offset="100%" stopColor="#e11d48" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="regGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#f43f5e" stopOpacity={0.2} />
                        <stop offset="100%" stopColor="#f43f5e" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="ebGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#fb7185" stopOpacity={0.2} />
                        <stop offset="100%" stopColor="#fb7185" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                    <XAxis
                      dataKey="week"
                      tick={{ fontSize: 11, fill: "#9ca3af" }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      tick={{ fontSize: 12, fill: "#9ca3af" }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip content={<ChartTooltip />} />
                    <Legend
                      iconType="circle"
                      iconSize={8}
                      wrapperStyle={{ fontSize: 12, paddingTop: 8 }}
                    />
                    <Area
                      type="monotone"
                      dataKey="vip"
                      stroke="#e11d48"
                      strokeWidth={2}
                      fill="url(#vipGrad)"
                      name="VIP"
                    />
                    <Area
                      type="monotone"
                      dataKey="regular"
                      stroke="#f43f5e"
                      strokeWidth={2}
                      fill="url(#regGrad)"
                      name="Regular"
                    />
                    <Area
                      type="monotone"
                      dataKey="earlyBird"
                      stroke="#fb7185"
                      strokeWidth={2}
                      fill="url(#ebGrad)"
                      name="Early Bird"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Sales by Ticket Type</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={MOCK_TICKET_SALES_BY_TYPE}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        dataKey="sold"
                        nameKey="type"
                        paddingAngle={3}
                        strokeWidth={0}
                      >
                        {MOCK_TICKET_SALES_BY_TYPE.map((_, i) => (
                          <Cell key={i} fill={COLORS[i]} />
                        ))}
                      </Pie>
                      <Tooltip content={<ChartTooltip />} />
                      <Legend
                        iconType="circle"
                        iconSize={8}
                        wrapperStyle={{ fontSize: 12 }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Ticket Type Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {MOCK_TICKET_SALES_BY_TYPE.map((t, i) => (
                    <div key={t.type} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: COLORS[i] }}
                          />
                          <span className="text-sm font-medium text-gray-900">
                            {t.type}
                          </span>
                        </div>
                        <span className="text-sm text-gray-500">
                          {formatNumber(t.sold)} tickets
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-500"
                            style={{
                              width: `${t.percentage}%`,
                              backgroundColor: COLORS[i],
                            }}
                          />
                        </div>
                        <span className="text-xs font-medium text-gray-500 w-10 text-right">
                          {t.percentage}%
                        </span>
                      </div>
                      {t.revenue > 0 && (
                        <p className="text-xs text-gray-400">
                          Revenue: {formatCurrency(t.revenue)}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════
          DEMOGRAPHICS TAB
          ═══════════════════════════════════════════════════════ */}
      {tab === "demographics" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Age distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Age Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={MOCK_ATTENDEE_DEMOGRAPHICS.byAge}>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="#e5e7eb"
                        vertical={false}
                      />
                      <XAxis
                        dataKey="range"
                        tick={{ fontSize: 12, fill: "#9ca3af" }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <YAxis
                        tick={{ fontSize: 12, fill: "#9ca3af" }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <Tooltip content={<ChartTooltip />} />
                      <Bar
                        dataKey="count"
                        fill="#e11d48"
                        radius={[6, 6, 0, 0]}
                        name="Attendees"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Gender breakdown */}
            <Card>
              <CardHeader>
                <CardTitle>Gender Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center gap-6">
                  <div className="w-48 h-48">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={MOCK_ATTENDEE_DEMOGRAPHICS.byGender}
                          cx="50%"
                          cy="50%"
                          innerRadius={45}
                          outerRadius={80}
                          dataKey="value"
                          nameKey="label"
                          paddingAngle={3}
                          strokeWidth={0}
                        >
                          {MOCK_ATTENDEE_DEMOGRAPHICS.byGender.map((entry, i) => (
                            <Cell key={i} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip content={<ChartTooltip />} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex-1 space-y-3">
                    {MOCK_ATTENDEE_DEMOGRAPHICS.byGender.map((g) => (
                      <div
                        key={g.label}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center gap-2">
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: g.color }}
                          />
                          <span className="text-sm text-gray-700">{g.label}</span>
                        </div>
                        <span className="text-sm font-medium text-gray-900">
                          {formatNumber(g.value)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Top locations */}
            <Card>
              <CardHeader>
                <CardTitle>Top Locations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {MOCK_ATTENDEE_DEMOGRAPHICS.byLocation.map((loc, i) => (
                    <div key={loc.city} className="flex items-center gap-3">
                      <span className="w-5 text-xs font-bold text-gray-400 text-right">
                        {i + 1}
                      </span>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium text-gray-900">
                            {loc.city}
                          </span>
                          <span className="text-xs text-gray-500">
                            {formatNumber(loc.count)}
                          </span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-rose-500 to-pink-400 transition-all duration-500"
                            style={{ width: `${loc.percentage}%` }}
                          />
                        </div>
                      </div>
                      <span className="w-10 text-xs text-gray-400 text-right">
                        {loc.percentage}%
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Registration source */}
            <Card>
              <CardHeader>
                <CardTitle>Registration Source</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {MOCK_ATTENDEE_DEMOGRAPHICS.bySource.map((src) => {
                    const total = MOCK_ATTENDEE_DEMOGRAPHICS.bySource.reduce(
                      (s, x) => s + x.value,
                      0
                    );
                    const pct = ((src.value / total) * 100).toFixed(1);
                    return (
                      <div key={src.label} className="flex items-center gap-3">
                        <div
                          className="w-3 h-3 rounded-full flex-shrink-0"
                          style={{ backgroundColor: src.color }}
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm text-gray-700">
                              {src.label}
                            </span>
                            <span className="text-sm font-medium text-gray-900">
                              {formatNumber(src.value)}
                            </span>
                          </div>
                          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full transition-all duration-500"
                              style={{
                                width: `${pct}%`,
                                backgroundColor: src.color,
                              }}
                            />
                          </div>
                        </div>
                        <span className="w-10 text-xs text-gray-400 text-right">
                          {pct}%
                        </span>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════
          MARKETING TAB
          ═══════════════════════════════════════════════════════ */}
      {tab === "marketing" && (
        <div className="space-y-6">
          {/* Marketing metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard
              label="Total Reach"
              value={formatNumber(305000)}
              icon={<Eye size={22} />}
            />
            <MetricCard
              label="Total Clicks"
              value={formatNumber(34750)}
              icon={<MousePointerClick size={22} />}
            />
            <MetricCard
              label="Total Conversions"
              value={formatNumber(5550)}
              change={12.4}
              changeLabel="vs last quarter"
              icon={<Target size={22} />}
            />
            <MetricCard
              label="Avg ROI"
              value="9.2"
              suffix="x"
              change={2.1}
              changeLabel="vs last quarter"
              icon={<TrendingUp size={22} />}
            />
          </div>

          {/* Revenue by event chart */}
          <Card>
            <CardHeader>
              <CardTitle>Revenue by Event</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={MOCK_REVENUE_BY_EVENT}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="#e5e7eb"
                      vertical={false}
                    />
                    <XAxis
                      dataKey="event"
                      tick={{ fontSize: 10, fill: "#9ca3af" }}
                      axisLine={false}
                      tickLine={false}
                      angle={-20}
                      textAnchor="end"
                      height={60}
                    />
                    <YAxis
                      tick={{ fontSize: 12, fill: "#9ca3af" }}
                      axisLine={false}
                      tickLine={false}
                      tickFormatter={(v: number) => `$${v / 1000000}M`}
                    />
                    <Tooltip content={<ChartTooltip />} />
                    <Bar dataKey="revenue" radius={[6, 6, 0, 0]} name="Revenue">
                      {MOCK_REVENUE_BY_EVENT.map((_, i) => (
                        <Cell key={i} fill={COLORS[i]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Marketing channels table */}
          <Card>
            <CardHeader>
              <CardTitle>Marketing Channel Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-500">
                        Channel
                      </th>
                      <th className="text-right py-3 px-4 font-medium text-gray-500">
                        Reach
                      </th>
                      <th className="text-right py-3 px-4 font-medium text-gray-500">
                        Clicks
                      </th>
                      <th className="text-right py-3 px-4 font-medium text-gray-500">
                        Conversions
                      </th>
                      <th className="text-right py-3 px-4 font-medium text-gray-500">
                        Revenue
                      </th>
                      <th className="text-right py-3 px-4 font-medium text-gray-500">
                        ROI
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {MOCK_MARKETING_CHANNELS.map((ch) => (
                      <tr
                        key={ch.channel}
                        className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                      >
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <Megaphone size={14} className="text-rose-500" />
                            <span className="font-medium text-gray-900">
                              {ch.channel}
                            </span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-right text-gray-700">
                          {formatNumber(ch.sent)}
                        </td>
                        <td className="py-3 px-4 text-right text-gray-700">
                          {formatNumber(ch.clicked)}
                        </td>
                        <td className="py-3 px-4 text-right text-gray-700">
                          {formatNumber(ch.conversions)}
                        </td>
                        <td className="py-3 px-4 text-right font-medium text-gray-900">
                          {formatCurrency(ch.revenue)}
                        </td>
                        <td className="py-3 px-4 text-right">
                          <Badge
                            variant={
                              ch.roi >= 10
                                ? "success"
                                : ch.roi >= 5
                                ? "warning"
                                : "info"
                            }
                            size="sm"
                          >
                            {ch.roi}x
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
