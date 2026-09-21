'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { MOCK_CATERING, type CateringStatus, type DietaryOption } from '@/lib/mock-data';
import { formatCurrency, cn } from '@/lib/utils';
import {
  Search,
  Users,
  UtensilsCrossed,
  DollarSign,
  Leaf,
  ChefHat,
  CalendarDays,
} from 'lucide-react';

const STATUS_CONFIG: Record<CateringStatus, { label: string; variant: 'success' | 'warning' | 'info' | 'destructive' }> = {
  Confirmed: { label: 'Confirmed', variant: 'success' },
  Pending: { label: 'Pending', variant: 'warning' },
  'Tasting Scheduled': { label: 'Tasting Scheduled', variant: 'info' },
  Cancelled: { label: 'Cancelled', variant: 'destructive' },
};

const DIETARY_STYLES: Record<DietaryOption, string> = {
  Vegetarian: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  Vegan: 'bg-green-50 text-green-700 border-green-200',
  'Gluten-Free': 'bg-amber-50 text-amber-700 border-amber-200',
  Halal: 'bg-blue-50 text-blue-700 border-blue-200',
  Kosher: 'bg-purple-50 text-purple-700 border-purple-200',
  'Dairy-Free': 'bg-cyan-50 text-cyan-700 border-cyan-200',
  'Nut-Free': 'bg-rose-50 text-rose-700 border-rose-200',
};

const DIETARY_ICONS: Record<DietaryOption, string> = {
  Vegetarian: '🥬',
  Vegan: '🌱',
  'Gluten-Free': '🌾',
  Halal: '🍖',
  Kosher: '✡️',
  'Dairy-Free': '🥛',
  'Nut-Free': '🥜',
};

export default function CateringPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filtered = useMemo(() => {
    return MOCK_CATERING.filter((c) => {
      const matchesStatus = statusFilter === 'all' || c.status === statusFilter;
      const matchesSearch =
        c.menuName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.vendor.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.event.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.cuisine.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  }, [searchQuery, statusFilter]);

  const totalHeadcount = MOCK_CATERING.reduce((sum, c) => sum + c.headcount, 0);
  const totalCost = MOCK_CATERING.reduce((sum, c) => sum + c.totalCost, 0);
  const avgPerHead = MOCK_CATERING.reduce((sum, c) => sum + c.pricePerHead, 0) / MOCK_CATERING.length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Catering Management</h1>
        <p className="text-sm text-gray-500">
          Manage catering menus, dietary accommodations, headcounts, and vendor assignments.
        </p>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="flex items-center gap-3 p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-100">
              <UtensilsCrossed className="h-5 w-5 text-rose-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Total Menus</p>
              <p className="text-2xl font-bold text-gray-900">{MOCK_CATERING.length}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100">
              <Users className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Total Headcount</p>
              <p className="text-2xl font-bold text-blue-600">{totalHeadcount.toLocaleString()}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100">
              <DollarSign className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Total Spend</p>
              <p className="text-2xl font-bold text-green-600">{formatCurrency(totalCost * 100)}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100">
              <ChefHat className="h-5 w-5 text-amber-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Avg. Per Head</p>
              <p className="text-2xl font-bold text-amber-600">{formatCurrency(avgPerHead * 100)}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by menu, vendor, cuisine, or event..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm text-gray-900 placeholder-gray-400 transition focus:border-rose-400 focus:outline-none focus:ring-2 focus:ring-rose-100"
          />
        </div>
        <div className="flex gap-2">
          {['all', 'Confirmed', 'Pending', 'Tasting Scheduled', 'Cancelled'].map((f) => (
            <button
              key={f}
              onClick={() => setStatusFilter(f)}
              className={cn(
                'rounded-lg px-3 py-2 text-xs font-medium transition',
                statusFilter === f
                  ? 'bg-rose-100 text-rose-700 border border-rose-200'
                  : 'text-gray-500 hover:text-gray-700 border border-transparent hover:border-gray-200'
              )}
            >
              {f === 'all' ? 'All' : f}
            </button>
          ))}
        </div>
      </div>

      {/* Catering Cards */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {filtered.map((menu) => {
          const statusCfg = STATUS_CONFIG[menu.status];

          return (
            <Card key={menu.id} variant="interactive">
              <CardContent className="p-5">
                {/* Top Row */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-gray-900">{menu.menuName}</h3>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {menu.vendor} · {menu.cuisine}
                    </p>
                  </div>
                  <Badge variant={statusCfg.variant}>{statusCfg.label}</Badge>
                </div>

                {/* Cost & Headcount */}
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="rounded-lg bg-gray-50 px-3 py-2 text-center border border-gray-100">
                    <p className="text-xs text-gray-500">Price/Head</p>
                    <p className="text-lg font-bold text-rose-600">{formatCurrency(menu.pricePerHead * 100)}</p>
                  </div>
                  <div className="rounded-lg bg-gray-50 px-3 py-2 text-center border border-gray-100">
                    <p className="text-xs text-gray-500">Headcount</p>
                    <p className="text-lg font-bold text-gray-900">{menu.headcount}</p>
                  </div>
                  <div className="rounded-lg bg-gray-50 px-3 py-2 text-center border border-gray-100">
                    <p className="text-xs text-gray-500">Total Cost</p>
                    <p className="text-lg font-bold text-green-600">{formatCurrency(menu.totalCost * 100)}</p>
                  </div>
                </div>

                {/* Dietary Options */}
                <div className="mb-4">
                  <p className="mb-1.5 flex items-center gap-1 text-xs text-gray-400">
                    <Leaf className="h-3 w-3" /> Dietary Options
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {menu.dietaryOptions.map((d) => (
                      <span
                        key={d}
                        className={`inline-flex items-center gap-1 rounded-md border px-2 py-1 text-xs ${DIETARY_STYLES[d]}`}
                      >
                        <span>{DIETARY_ICONS[d]}</span>
                        {d}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Courses */}
                <div className="mb-4">
                  <p className="mb-1.5 text-xs text-gray-400">Courses</p>
                  <div className="flex flex-wrap gap-1.5">
                    {menu.courses.map((c, i) => (
                      <span
                        key={c}
                        className="rounded-md bg-gray-50 px-2 py-1 text-xs text-gray-600 border border-gray-100"
                      >
                        <span className="text-rose-500 font-medium mr-1">{i + 1}.</span>
                        {c}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Event & Date */}
                <div className="border-t border-gray-100 pt-3 flex flex-wrap items-center gap-4 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <CalendarDays className="h-3.5 w-3.5 text-rose-400" />
                    {menu.event} — {menu.eventDate}
                  </span>
                </div>
                {menu.notes && (
                  <p className="mt-2 text-xs text-gray-400 italic">{menu.notes}</p>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <UtensilsCrossed className="mx-auto mb-3 h-10 w-10 text-gray-300" />
            <p className="text-sm text-gray-400">No catering menus match your filters.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
