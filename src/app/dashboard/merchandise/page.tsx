'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { MOCK_MERCHANDISE, type MerchCategory, type MerchStatus } from '@/lib/mock-data';
import { formatCurrency, formatNumber, cn } from '@/lib/utils';
import {
  Search,
  ShoppingBag,
  DollarSign,
  TrendingUp,
  XCircle,
  Tag,
} from 'lucide-react';

const STATUS_CONFIG: Record<MerchStatus, { label: string; variant: 'success' | 'warning' | 'info' | 'destructive' }> = {
  'In Stock': { label: 'In Stock', variant: 'success' },
  'Low Stock': { label: 'Low Stock', variant: 'warning' },
  'Pre-Order': { label: 'Pre-Order', variant: 'info' },
  'Out of Stock': { label: 'Out of Stock', variant: 'destructive' },
};

const CATEGORY_ICONS: Record<MerchCategory, string> = {
  Apparel: '👕',
  Accessories: '✨',
  Tech: '💻',
  Drinkware: '☕',
  Stationery: '📓',
  Bags: '👜',
};

function StockBar({ stock, sold }: { stock: number; sold: number }) {
  const total = stock + sold;
  const soldPct = total > 0 ? Math.round((sold / total) * 100) : 0;

  return (
    <div className="w-full">
      <div className="mb-1 flex items-center justify-between text-[10px]">
        <span className="text-gray-400">{sold} sold</span>
        <span className="text-gray-400">{stock} remaining</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
        <div
          className="h-full rounded-full bg-rose-400 transition-all duration-500"
          style={{ width: `${soldPct}%` }}
        />
      </div>
    </div>
  );
}

export default function MerchandisePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  const filtered = useMemo(() => {
    return MOCK_MERCHANDISE.filter((m) => {
      const matchesCategory = categoryFilter === 'all' || m.category === categoryFilter;
      const matchesStatus = statusFilter === 'all' || m.status === statusFilter;
      const matchesSearch =
        m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.event.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesStatus && matchesSearch;
    });
  }, [searchQuery, categoryFilter, statusFilter]);

  const totalRevenue = MOCK_MERCHANDISE.reduce((sum, m) => sum + m.revenue, 0);
  const totalSold = MOCK_MERCHANDISE.reduce((sum, m) => sum + m.sold, 0);
  const outOfStockCount = MOCK_MERCHANDISE.filter((m) => m.status === 'Out of Stock').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Merchandise Inventory</h1>
        <p className="text-sm text-gray-500">
          Track merchandise stock, sales revenue, categories, and event assignments.
        </p>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="flex items-center gap-3 p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-100">
              <ShoppingBag className="h-5 w-5 text-rose-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Total Items</p>
              <p className="text-2xl font-bold text-gray-900">{MOCK_MERCHANDISE.length}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100">
              <DollarSign className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Total Revenue</p>
              <p className="text-2xl font-bold text-green-600">{formatCurrency(totalRevenue * 100)}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100">
              <TrendingUp className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Total Sold</p>
              <p className="text-2xl font-bold text-blue-600">{formatNumber(totalSold)}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-100">
              <XCircle className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Out of Stock</p>
              <p className="text-2xl font-bold text-red-600">{outOfStockCount}</p>
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
            placeholder="Search by name, SKU, event, or category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm text-gray-900 placeholder-gray-400 transition focus:border-rose-400 focus:outline-none focus:ring-2 focus:ring-rose-100"
          />
        </div>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-700 transition focus:border-rose-400 focus:outline-none focus:ring-2 focus:ring-rose-100"
        >
          <option value="all">All Categories</option>
          <option value="Apparel">Apparel</option>
          <option value="Accessories">Accessories</option>
          <option value="Tech">Tech</option>
          <option value="Drinkware">Drinkware</option>
          <option value="Stationery">Stationery</option>
          <option value="Bags">Bags</option>
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-700 transition focus:border-rose-400 focus:outline-none focus:ring-2 focus:ring-rose-100"
        >
          <option value="all">All Status</option>
          <option value="In Stock">In Stock</option>
          <option value="Low Stock">Low Stock</option>
          <option value="Pre-Order">Pre-Order</option>
          <option value="Out of Stock">Out of Stock</option>
        </select>
        <div className="flex rounded-lg border border-gray-200 overflow-hidden">
          <button
            onClick={() => setViewMode('grid')}
            className={cn(
              'px-3 py-2 text-xs font-medium transition',
              viewMode === 'grid'
                ? 'bg-rose-100 text-rose-700'
                : 'text-gray-500 hover:text-gray-700 bg-white'
            )}
          >
            Grid
          </button>
          <button
            onClick={() => setViewMode('table')}
            className={cn(
              'px-3 py-2 text-xs font-medium transition',
              viewMode === 'table'
                ? 'bg-rose-100 text-rose-700'
                : 'text-gray-500 hover:text-gray-700 bg-white'
            )}
          >
            Table
          </button>
        </div>
      </div>

      {/* Grid View */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) => {
            const statusCfg = STATUS_CONFIG[item.status];

            return (
              <Card key={item.id} variant="interactive">
                <CardContent className="p-5">
                  {/* Top Row */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{CATEGORY_ICONS[item.category]}</span>
                      <div>
                        <h3 className="text-sm font-semibold text-gray-900 leading-tight">
                          {item.name}
                        </h3>
                        <p className="text-[10px] text-gray-400 mt-0.5">{item.sku}</p>
                      </div>
                    </div>
                    <Badge variant={statusCfg.variant}>{statusCfg.label}</Badge>
                  </div>

                  {/* Price & Category */}
                  <div className="flex items-center gap-3 mb-3 text-xs">
                    <span className="flex items-center gap-1 text-rose-600 font-semibold">
                      <Tag className="h-3 w-3" />
                      {formatCurrency(item.price * 100)}
                    </span>
                    <span className="rounded-md bg-gray-50 px-2 py-0.5 text-gray-500 border border-gray-100">
                      {item.category}
                    </span>
                  </div>

                  {/* Stock Bar */}
                  <div className="mb-3">
                    <StockBar stock={item.stock} sold={item.sold} />
                  </div>

                  {/* Revenue & Sold */}
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    <div className="rounded-lg bg-gray-50 px-3 py-2 text-center border border-gray-100">
                      <p className="text-[10px] text-gray-500">Revenue</p>
                      <p className="text-sm font-bold text-green-600">{formatCurrency(item.revenue * 100)}</p>
                    </div>
                    <div className="rounded-lg bg-gray-50 px-3 py-2 text-center border border-gray-100">
                      <p className="text-[10px] text-gray-500">Sold</p>
                      <p className="text-sm font-bold text-gray-900">{formatNumber(item.sold)}</p>
                    </div>
                  </div>

                  {/* Event & Notes */}
                  <div className="border-t border-gray-100 pt-3">
                    <span className="rounded-md bg-rose-50 px-2 py-1 text-xs text-rose-700 border border-rose-100">
                      {item.event}
                    </span>
                    {item.notes && (
                      <p className="mt-2 text-[11px] text-gray-400 italic leading-relaxed">{item.notes}</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* Table View */}
      {viewMode === 'table' && (
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Item</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Category</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500">Price</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500">Stock</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500">Sold</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500">Revenue</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Event</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map((item) => {
                  const statusCfg = STATUS_CONFIG[item.status];
                  return (
                    <tr key={item.id} className="transition hover:bg-gray-50/50">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <span>{CATEGORY_ICONS[item.category]}</span>
                          <div>
                            <p className="font-medium text-gray-900">{item.name}</p>
                            <p className="text-[10px] text-gray-400">{item.sku}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-xs text-gray-500">{item.category}</td>
                      <td className="px-4 py-3 text-right text-xs font-medium text-rose-600">
                        {formatCurrency(item.price * 100)}
                      </td>
                      <td className="px-4 py-3 text-right text-xs text-gray-600">
                        {item.stock}
                      </td>
                      <td className="px-4 py-3 text-right text-xs font-medium text-gray-900">
                        {formatNumber(item.sold)}
                      </td>
                      <td className="px-4 py-3 text-right text-xs font-medium text-green-600">
                        {formatCurrency(item.revenue * 100)}
                      </td>
                      <td className="px-4 py-3">
                        <span className="rounded-md bg-rose-50 px-2 py-0.5 text-[10px] text-rose-700 border border-rose-100">
                          {item.event}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <Badge variant={statusCfg.variant}>{statusCfg.label}</Badge>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {filtered.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <ShoppingBag className="mx-auto mb-3 h-10 w-10 text-gray-300" />
            <p className="text-sm text-gray-400">No merchandise items match your filters.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
