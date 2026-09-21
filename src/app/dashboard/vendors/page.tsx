'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { MOCK_VENDORS, type VendorServiceType, type VendorStatus } from '@/lib/mock-data';
import { formatCurrency, cn } from '@/lib/utils';
import {
  Search,
  Star,
  MapPin,
  Phone,
  Mail,
  Globe,
  Briefcase,
  Calendar,
  Handshake,
  Building2,
} from 'lucide-react';

const STATUS_CONFIG: Record<VendorStatus, { label: string; variant: 'success' | 'warning' | 'info' | 'destructive' }> = {
  Active: { label: 'Active', variant: 'success' },
  Pending: { label: 'Pending', variant: 'warning' },
  'On Hold': { label: 'On Hold', variant: 'info' },
  Inactive: { label: 'Inactive', variant: 'destructive' },
};

const SERVICE_COLORS: Record<VendorServiceType, string> = {
  Photography: 'from-rose-500 to-pink-600',
  Videography: 'from-purple-500 to-indigo-600',
  Florals: 'from-emerald-500 to-green-600',
  Entertainment: 'from-amber-500 to-orange-600',
  Lighting: 'from-yellow-400 to-amber-600',
  'AV Production': 'from-blue-500 to-indigo-600',
  Transportation: 'from-cyan-500 to-teal-600',
  Decor: 'from-pink-500 to-rose-600',
  Security: 'from-slate-500 to-gray-700',
  Printing: 'from-violet-500 to-purple-600',
};

const SERVICE_TYPES: VendorServiceType[] = [
  'Photography', 'Videography', 'Florals', 'Entertainment', 'Lighting',
  'AV Production', 'Transportation', 'Decor', 'Security', 'Printing',
];

function StarRating({ rating }: { rating: number }) {
  const fullStars = Math.floor(rating);
  const hasHalf = rating - fullStars >= 0.3;
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={cn(
            'h-3.5 w-3.5',
            i < fullStars
              ? 'fill-amber-400 text-amber-400'
              : i === fullStars && hasHalf
                ? 'fill-amber-400/50 text-amber-400'
                : 'text-gray-200'
          )}
        />
      ))}
      <span className="ml-1 text-xs font-semibold text-gray-600">{rating.toFixed(1)}</span>
    </div>
  );
}

export default function VendorsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [serviceFilter, setServiceFilter] = useState<string>('all');

  const filtered = useMemo(() => {
    return MOCK_VENDORS.filter((v) => {
      const matchesStatus = statusFilter === 'all' || v.status === statusFilter;
      const matchesService = serviceFilter === 'all' || v.serviceType === serviceFilter;
      const matchesSearch =
        v.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.contactPerson.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.serviceType.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.location.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesStatus && matchesService && matchesSearch;
    });
  }, [searchQuery, statusFilter, serviceFilter]);

  const activeCount = MOCK_VENDORS.filter((v) => v.status === 'Active').length;
  const pendingCount = MOCK_VENDORS.filter((v) => v.status === 'Pending').length;
  const avgRating = MOCK_VENDORS.reduce((sum, v) => sum + v.rating, 0) / MOCK_VENDORS.length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Vendor Directory</h1>
        <p className="text-sm text-gray-500">
          Manage vendor relationships, contracts, service assignments, and ratings.
        </p>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="flex items-center gap-3 p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-100">
              <Handshake className="h-5 w-5 text-rose-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Total Vendors</p>
              <p className="text-2xl font-bold text-gray-900">{MOCK_VENDORS.length}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100">
              <Briefcase className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Active Contracts</p>
              <p className="text-2xl font-bold text-green-600">{activeCount}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100">
              <Calendar className="h-5 w-5 text-amber-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Pending Review</p>
              <p className="text-2xl font-bold text-amber-600">{pendingCount}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-100">
              <Star className="h-5 w-5 text-rose-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Avg Rating</p>
              <p className="text-2xl font-bold text-rose-600">{avgRating.toFixed(1)}</p>
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
            placeholder="Search by name, service, contact, or location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm text-gray-900 placeholder-gray-400 transition focus:border-rose-400 focus:outline-none focus:ring-2 focus:ring-rose-100"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-700 transition focus:border-rose-400 focus:outline-none focus:ring-2 focus:ring-rose-100"
        >
          <option value="all">All Status</option>
          <option value="Active">Active</option>
          <option value="Pending">Pending</option>
          <option value="On Hold">On Hold</option>
          <option value="Inactive">Inactive</option>
        </select>
        <select
          value={serviceFilter}
          onChange={(e) => setServiceFilter(e.target.value)}
          className="rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-700 transition focus:border-rose-400 focus:outline-none focus:ring-2 focus:ring-rose-100"
        >
          <option value="all">All Services</option>
          {SERVICE_TYPES.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      {/* Vendor Cards */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {filtered.map((vendor) => {
          const statusCfg = STATUS_CONFIG[vendor.status];
          const avatarGrad = SERVICE_COLORS[vendor.serviceType];
          const initials = vendor.name
            .split(' ')
            .map((w) => w[0])
            .join('')
            .slice(0, 2);

          return (
            <Card key={vendor.id} variant="interactive">
              <CardContent className="p-5">
                {/* Top Row */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br text-xs font-bold text-white ${avatarGrad}`}
                    >
                      {initials}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{vendor.name}</h3>
                      <p className="text-xs text-gray-500 mt-0.5">{vendor.serviceType}</p>
                    </div>
                  </div>
                  <Badge variant={statusCfg.variant}>{statusCfg.label}</Badge>
                </div>

                {/* Rating & Cost */}
                <div className="flex items-center justify-between mb-3">
                  <StarRating rating={vendor.rating} />
                  <span className="text-sm font-semibold text-rose-600">
                    {formatCurrency(vendor.costPerEvent * 100)}/event
                  </span>
                </div>

                {/* Assigned Events */}
                {vendor.assignedEvents.length > 0 && (
                  <div className="mb-3">
                    <p className="mb-1 text-xs text-gray-400">Assigned Events</p>
                    <div className="flex flex-wrap gap-1.5">
                      {vendor.assignedEvents.map((evt) => (
                        <span
                          key={evt}
                          className="rounded-md bg-rose-50 px-2 py-1 text-xs text-rose-700 border border-rose-100"
                        >
                          {evt}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Contract Dates */}
                <div className="mb-3 flex items-center gap-2 text-xs text-gray-500">
                  <Calendar className="h-3.5 w-3.5 text-rose-400" />
                  <span>
                    Contract: {vendor.contractStart} → {vendor.contractEnd}
                  </span>
                </div>

                {/* Contact & Location */}
                <div className="border-t border-gray-100 pt-3 space-y-2">
                  <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3 text-rose-400" />
                      {vendor.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Phone className="h-3 w-3 text-rose-400" />
                      {vendor.phone}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Mail className="h-3 w-3 text-rose-400" />
                      {vendor.email}
                    </span>
                    <span className="flex items-center gap-1">
                      <Globe className="h-3 w-3 text-rose-400" />
                      {vendor.website.replace('https://', '')}
                    </span>
                  </div>
                  {vendor.notes && (
                    <p className="text-xs text-gray-400 italic mt-1">{vendor.notes}</p>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Building2 className="mx-auto mb-3 h-10 w-10 text-gray-300" />
            <p className="text-sm text-gray-400">No vendors match your filters.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
