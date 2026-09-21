"use client";

import React from "react";
import Link from "next/link";
import {
  CalendarDays,
  Users,
  DollarSign,
  TrendingUp,
  Clock,
  MapPin,
  BarChart3,
  Activity,
  AlertCircle,
  CreditCard,
  Megaphone,
  Settings,
  Ticket,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { MetricCard } from "@/components/ui/MetricCard";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import {
  MOCK_DASHBOARD_METRICS,
  MOCK_REVENUE_BY_MONTH,
  MOCK_EVENTS,
  MOCK_UPCOMING_EVENTS,
  MOCK_ACTIVITY,
} from "@/lib/mock-data";
import { formatCurrency, formatNumber } from "@/lib/utils";

// ── Activity icon helper ────────────────────────────────────
function activityIcon(type: string) {
  const map: Record<string, { icon: React.ReactNode; bg: string }> = {
    ticket: { icon: <Ticket size={16} className="text-rose-600" />, bg: "bg-rose-50" },
    event: { icon: <CalendarDays size={16} className="text-blue-600" />, bg: "bg-blue-50" },
    alert: { icon: <AlertCircle size={16} className="text-amber-600" />, bg: "bg-amber-50" },
    payment: { icon: <CreditCard size={16} className="text-emerald-600" />, bg: "bg-emerald-50" },
    marketing: { icon: <Megaphone size={16} className="text-violet-600" />, bg: "bg-violet-50" },
    refund: { icon: <DollarSign size={16} className="text-orange-600" />, bg: "bg-orange-50" },
    system: { icon: <Settings size={16} className="text-gray-500" />, bg: "bg-gray-50" },
  };
  return map[type] || { icon: <Activity size={16} className="text-gray-500" />, bg: "bg-gray-50" };
}

// ── Custom tooltip ──────────────────────────────────────────
function RevenueTooltip({ active, payload, label }: any) {
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
          {p.name}: {p.name === "revenue" ? formatCurrency(p.value) : formatNumber(p.value)}
        </p>
      ))}
    </div>
  );
}

// ── Status badge variant helper ─────────────────────────────
function statusBadge(status: string): "success" | "warning" | "info" | "default" {
  if (status === "Sold Out" || status === "completed") return "success";
  if (status === "live" || status === "On Sale" || status === "published") return "info";
  if (status === "cancelled") return "destructive" as any;
  return "default";
}

export default function DashboardPage() {
  const m = MOCK_DASHBOARD_METRICS;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* ── Header ─────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">
            Welcome back, Khalid. Here&apos;s your event overview.
          </p>
        </div>
        <Link
          href="/dashboard/analytics"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-600 text-white text-sm font-medium hover:bg-rose-700 transition-colors"
        >
          <BarChart3 size={16} />
          View Analytics
        </Link>
      </div>

      {/* ── Metric Cards ───────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          label="Total Events"
          value={m.totalEvents}
          change={m.totalEventsChange}
          changeLabel="vs last month"
          icon={<CalendarDays size={22} />}
        />
        <MetricCard
          label="Total Attendees"
          value={formatNumber(m.totalAttendees)}
          change={m.totalAttendeesChange}
          changeLabel="vs last month"
          icon={<Users size={22} />}
        />
        <MetricCard
          label="Revenue"
          value={formatCurrency(m.revenue)}
          change={m.revenueChange}
          changeLabel="vs last month"
          icon={<DollarSign size={22} />}
        />
        <MetricCard
          label="Conversion Rate"
          value={m.conversionRate}
          suffix="%"
          change={m.conversionRateChange}
          changeLabel="vs last month"
          icon={<TrendingUp size={22} />}
        />
      </div>

      {/* ── Revenue Chart + Activity Feed ───────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
            <span className="text-xs text-gray-400">Last 9 months</span>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={MOCK_REVENUE_BY_MONTH}>
                  <defs>
                    <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#e11d48" stopOpacity={0.25} />
                      <stop offset="100%" stopColor="#e11d48" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="attGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#f43f5e" stopOpacity={0.15} />
                      <stop offset="100%" stopColor="#f43f5e" stopOpacity={0} />
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
                  <Tooltip content={<RevenueTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#e11d48"
                    strokeWidth={2.5}
                    fill="url(#revGrad)"
                    name="revenue"
                  />
                  <Area
                    type="monotone"
                    dataKey="attendees"
                    stroke="#f43f5e"
                    strokeWidth={1.5}
                    fill="url(#attGrad)"
                    name="attendees"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Activity feed */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <Link
              href="#"
              className="text-xs text-rose-600 hover:text-rose-700 font-medium"
            >
              View all
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-72 overflow-y-auto pr-1">
              {MOCK_ACTIVITY.map((a) => {
                const { icon, bg } = activityIcon(a.type);
                return (
                  <div key={a.id} className="flex items-start gap-3 group">
                    <div
                      className={`mt-0.5 flex-shrink-0 w-8 h-8 rounded-lg ${bg} flex items-center justify-center`}
                    >
                      {icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-700 leading-snug">
                        <span className="font-medium text-gray-900">{a.user}</span>{" "}
                        {a.action}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">{a.time}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ── Recent Events + Upcoming Events ─────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Events with progress bars */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Events</CardTitle>
            <Link
              href="#"
              className="text-xs text-rose-600 hover:text-rose-700 font-medium"
            >
              All events
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-5">
              {MOCK_EVENTS.filter((e) => e.status !== "draft").slice(0, 5).map((ev) => {
                const pct = Math.round((ev.ticketsSold / ev.maxCapacity) * 100);
                return (
                  <div key={ev.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {ev.name}
                          </p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-xs text-gray-400 flex items-center gap-1">
                              <Clock size={11} />
                              {new Date(ev.date).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                              })}
                            </span>
                            <span className="text-xs text-gray-400 flex items-center gap-1">
                              <MapPin size={11} />
                              {ev.venue}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <Badge variant={statusBadge(ev.status)} size="sm">
                          {ev.status}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-rose-500 to-pink-400 transition-all duration-700"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <span className="text-xs font-medium text-gray-500 w-12 text-right">
                        {pct}%
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <span>
                        {formatNumber(ev.ticketsSold)} / {formatNumber(ev.maxCapacity)} tickets
                      </span>
                      <span>{ev.revenue > 0 ? formatCurrency(ev.revenue) : "Free"}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
            <Link
              href="#"
              className="text-xs text-rose-600 hover:text-rose-700 font-medium"
            >
              View calendar
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {MOCK_UPCOMING_EVENTS.map((ev) => {
                const pct = Math.round((ev.ticketsSold / ev.maxCapacity) * 100);
                const daysUntil = Math.ceil(
                  (new Date(ev.date).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
                );
                return (
                  <div
                    key={ev.id}
                    className="flex items-center gap-4 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-white border border-rose-100 flex flex-col items-center justify-center">
                      <span className="text-[10px] font-bold text-rose-600 uppercase leading-none">
                        {new Date(ev.date).toLocaleDateString("en-US", { month: "short" })}
                      </span>
                      <span className="text-lg font-bold text-gray-900 leading-tight">
                        {new Date(ev.date).getDate()}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {ev.name}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">{ev.venue}</p>
                      <div className="flex items-center gap-3 mt-1.5">
                        <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full bg-rose-500 transition-all duration-500"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                        <span className="text-[11px] text-gray-400">{pct}%</span>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-sm font-semibold text-gray-900">
                        {daysUntil > 0 ? `${daysUntil}d` : "Today"}
                      </p>
                      <p className="text-xs text-gray-400">away</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
