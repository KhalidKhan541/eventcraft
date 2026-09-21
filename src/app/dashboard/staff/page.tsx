'use client';

import { useState, useMemo } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { MOCK_STAFF, type StaffMember } from '@/lib/mock-data';
import { getInitials, cn } from '@/lib/utils';

type StatusFilter = 'all' | 'active' | 'inactive' | 'on-leave';
type DeptFilter = string;

const DEPARTMENTS = Array.from(new Set(MOCK_STAFF.map((s) => s.department))).sort();

const STATUS_STYLES: Record<string, string> = {
  active: 'bg-emerald-50 text-emerald-700',
  inactive: 'bg-gray-100 text-gray-500',
  'on-leave': 'bg-amber-50 text-amber-700',
};

const DEPT_COLORS: Record<string, string> = {
  Management: 'bg-rose-100 text-rose-700',
  Marketing: 'bg-pink-100 text-pink-700',
  Finance: 'bg-emerald-100 text-emerald-700',
  Operations: 'bg-blue-100 text-blue-700',
  'Business Development': 'bg-violet-100 text-violet-700',
  Technology: 'bg-indigo-100 text-indigo-700',
};

const PERMISSION_LABELS: Record<string, string> = {
  manage_events: 'Manage Events',
  manage_budget: 'Manage Budget',
  manage_staff: 'Manage Staff',
  view_reports: 'View Reports',
  manage_marketing: 'Manage Marketing',
  manage_content: 'Manage Content',
  view_financials: 'View Financials',
  manage_venues: 'Manage Venues',
  view_events: 'View Events',
  manage_vendors: 'Manage Vendors',
  manage_sponsors: 'Manage Sponsors',
  manage_contracts: 'Manage Contracts',
  manage_tech: 'Manage Tech',
  manage_av: 'Manage AV',
  manage_catering: 'Manage Catering',
  manage_security: 'Manage Security',
  manage_emergency: 'Manage Emergency',
  manage_design: 'Manage Design',
  manage_registrations: 'Manage Registrations',
};

export default function StaffPage() {
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [deptFilter, setDeptFilter] = useState<DeptFilter>('All');
  const [search, setSearch] = useState('');
  const [selectedStaff, setSelectedStaff] = useState<string | null>(MOCK_STAFF[0].id);

  const filtered = useMemo(() => {
    return MOCK_STAFF.filter((s) => {
      if (statusFilter !== 'all' && s.status !== statusFilter) return false;
      if (deptFilter !== 'All' && s.department !== deptFilter) return false;
      if (search) {
        const q = search.toLowerCase();
        return (
          s.name.toLowerCase().includes(q) ||
          s.role.toLowerCase().includes(q) ||
          s.email.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [statusFilter, deptFilter, search]);

  const counts = useMemo(() => ({
    all: MOCK_STAFF.length,
    active: MOCK_STAFF.filter((s) => s.status === 'active').length,
    inactive: MOCK_STAFF.filter((s) => s.status === 'inactive').length,
    'on-leave': MOCK_STAFF.filter((s) => s.status === 'on-leave').length,
  }), []);

  const activeStaff = MOCK_STAFF.find((s) => s.id === selectedStaff);

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50/60 via-white to-rose-50/30 p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Team Management</h1>
        <p className="mt-1 text-gray-500">Manage staff roles, departments, event assignments, and permissions.</p>
      </div>

      {/* Summary Cards */}
      <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <SummaryCount label="Total Staff" count={counts.all} color="rose" />
        <SummaryCount label="Active" count={counts.active} color="emerald" />
        <SummaryCount label="On Leave" count={counts['on-leave']} color="amber" />
        <SummaryCount label="Inactive" count={counts.inactive} color="gray" />
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <input
          type="text"
          placeholder="Search staff…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-56 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:border-rose-300 focus:outline-none focus:ring-1 focus:ring-rose-300"
        />

        <div className="flex gap-1 rounded-lg bg-gray-100 p-1">
          {(['all', 'active', 'inactive', 'on-leave'] as StatusFilter[]).map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={cn(
                'rounded-md px-3 py-1.5 text-xs font-medium capitalize transition-all',
                statusFilter === st ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
              )}
            >
              {st === 'all' ? 'All' : st.replace('-', ' ')}
            </button>
          ))}
        </div>

        <select
          value={deptFilter}
          onChange={(e) => setDeptFilter(e.target.value)}
          className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 focus:border-rose-300 focus:outline-none focus:ring-1 focus:ring-rose-300"
        >
          <option>All</option>
          {DEPARTMENTS.map((d) => (
            <option key={d}>{d}</option>
          ))}
        </select>
      </div>

      {/* Main layout */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Staff List */}
        <div className="space-y-3 lg:col-span-1">
          {filtered.length === 0 && (
            <p className="py-8 text-center text-sm text-gray-400">No staff members match the filters.</p>
          )}
          {filtered.map((member) => (
            <button
              key={member.id}
              onClick={() => setSelectedStaff(member.id)}
              className={cn(
                'w-full rounded-xl border p-4 text-left transition-all',
                selectedStaff === member.id
                  ? 'border-rose-300 bg-rose-50 shadow-md ring-1 ring-rose-200'
                  : 'border-gray-200 bg-white hover:border-rose-200 hover:bg-rose-50/40'
              )}
            >
              <div className="flex items-center gap-3">
                {/* Avatar */}
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-rose-100 text-sm font-bold text-rose-700">
                  {getInitials(member.name)}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="truncate font-medium text-gray-900">{member.name}</span>
                    <span className={cn('ml-2 shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase', STATUS_STYLES[member.status])}>
                      {member.status}
                    </span>
                  </div>
                  <p className="truncate text-xs text-gray-500">{member.role}</p>
                  <div className="mt-1 flex items-center gap-2">
                    <span className={cn('rounded px-1.5 py-0.5 text-[10px] font-medium', DEPT_COLORS[member.department] || 'bg-gray-100 text-gray-600')}>
                      {member.department}
                    </span>
                    <span className="text-[10px] text-gray-400">{member.assignedEvents.length} events</span>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Detail Panel */}
        <div className="lg:col-span-2">
          {activeStaff ? (
            <Card>
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-rose-100 text-xl font-bold text-rose-700">
                    {getInitials(activeStaff.name)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <CardTitle>{activeStaff.name}</CardTitle>
                      <span className={cn('rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase', STATUS_STYLES[activeStaff.status])}>
                        {activeStaff.status}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">{activeStaff.role} &middot; {activeStaff.department}</p>
                    <p className="text-sm text-gray-400">{activeStaff.email}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* Assigned Events */}
                <section className="mb-6">
                  <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-700">Assigned Events</h3>
                  {activeStaff.assignedEvents.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {activeStaff.assignedEvents.map((evt) => (
                        <Badge key={evt} variant="default">{evt}</Badge>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm italic text-gray-400">No events assigned</p>
                  )}
                </section>

                {/* Permissions */}
                <section className="mb-6">
                  <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-700">Permissions</h3>
                  <div className="flex flex-wrap gap-2">
                    {activeStaff.permissions.map((perm) => (
                      <span
                        key={perm}
                        className="inline-flex items-center rounded-md border border-gray-200 bg-gray-50 px-2.5 py-1 text-xs font-medium text-gray-600"
                      >
                        {PERMISSION_LABELS[perm] || perm}
                      </span>
                    ))}
                  </div>
                </section>

                {/* Meta */}
                <section>
                  <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-700">Details</h3>
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                    <MetaItem label="Department" value={activeStaff.department} />
                    <MetaItem label="Role" value={activeStaff.role} />
                    <MetaItem label="Joined" value={activeStaff.joinDate} />
                    <MetaItem label="Email" value={activeStaff.email} />
                    <MetaItem label="Events" value={String(activeStaff.assignedEvents.length)} />
                    <MetaItem label="Permissions" value={String(activeStaff.permissions.length)} />
                  </div>
                </section>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="flex h-64 items-center justify-center">
                <p className="text-gray-400">Select a team member to view details.</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Helper Components ──────────────────────────────────────────────────

function SummaryCount({ label, count, color }: { label: string; count: number; color: string }) {
  const barColors: Record<string, string> = {
    rose: 'bg-rose-500',
    emerald: 'bg-emerald-500',
    amber: 'bg-amber-500',
    gray: 'bg-gray-400',
  };
  return (
    <Card>
      <CardContent className="pt-6">
        <p className="text-sm font-medium text-gray-500">{label}</p>
        <p className="mt-1 text-3xl font-bold text-gray-900">{count}</p>
        <div className={cn('mt-3 h-1 w-full rounded-full', barColors[color] || 'bg-rose-500')} />
      </CardContent>
    </Card>
  );
}

function MetaItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-gray-50 p-3">
      <p className="text-xs text-gray-500">{label}</p>
      <p className="mt-0.5 text-sm font-medium text-gray-800">{value}</p>
    </div>
  );
}
