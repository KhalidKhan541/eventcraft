'use client';

import { useState, useMemo } from 'react';
import {
  Search,
  CheckCircle,
  XCircle,
  Users,
  Filter,
  Download,
  Mail,
  Utensils,
  CalendarCheck,
  Ticket,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { MOCK_ATTENDEES } from '@/lib/mock-data';
import type { TicketType } from '@/lib/mock-data';

const TICKET_COLORS: Record<TicketType, 'default' | 'purple' | 'info' | 'success' | 'warning'> = {
  General: 'info',
  VIP: 'purple',
  Student: 'success',
  Speaker: 'default',
  Sponsor: 'warning',
};

export default function AttendeesPage() {
  const [search, setSearch] = useState('');
  const [ticketFilter, setTicketFilter] = useState<string>('all');
  const [checkInFilter, setCheckInFilter] = useState<'all' | 'checked-in' | 'not-checked-in'>('all');
  const [sortField, setSortField] = useState<'lastName' | 'registrationDate'>('lastName');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const result = MOCK_ATTENDEES.filter((a) => {
      const matchTicket = ticketFilter === 'all' || a.ticketType === ticketFilter;
      const matchCheckIn =
        checkInFilter === 'all' ||
        (checkInFilter === 'checked-in' && a.checkedIn) ||
        (checkInFilter === 'not-checked-in' && !a.checkedIn);
      const matchSearch =
        `${a.firstName} ${a.lastName}`.toLowerCase().includes(search.toLowerCase()) ||
        a.email.toLowerCase().includes(search.toLowerCase()) ||
        a.company.toLowerCase().includes(search.toLowerCase()) ||
        a.eventName.toLowerCase().includes(search.toLowerCase());
      return matchTicket && matchCheckIn && matchSearch;
    });

    result.sort((a, b) => {
      let cmp = 0;
      if (sortField === 'lastName') {
        cmp = a.lastName.localeCompare(b.lastName);
      } else {
        cmp = new Date(a.registrationDate).getTime() - new Date(b.registrationDate).getTime();
      }
      return sortDir === 'asc' ? cmp : -cmp;
    });

    return result;
  }, [search, ticketFilter, checkInFilter, sortField, sortDir]);

  const toggleSort = (field: typeof sortField) => {
    if (sortField === field) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDir('asc');
    }
  };

  const totalCheckedIn = MOCK_ATTENDEES.filter((a) => a.checkedIn).length;
  const totalVIP = MOCK_ATTENDEES.filter((a) => a.ticketType === 'VIP').length;
  const totalDietary = MOCK_ATTENDEES.filter((a) => a.dietaryRestrictions !== 'None').length;

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  const formatTime = (d: string) =>
    new Date(d).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Attendees</h1>
          <p className="text-sm text-gray-500 mt-1">Track registrations, check-ins, and attendee details</p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-rose-200 text-rose-700 rounded-xl text-sm font-medium hover:bg-rose-50 transition-colors">
          <Download className="w-4 h-4" /> Export CSV
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Attendees', value: MOCK_ATTENDEES.length, icon: Users, color: 'text-rose-600 bg-rose-100' },
          {
            label: 'Checked In',
            value: `${totalCheckedIn}/${MOCK_ATTENDEES.length}`,
            icon: CheckCircle,
            color: 'text-green-600 bg-green-100',
          },
          { label: 'VIP Guests', value: totalVIP, icon: Ticket, color: 'text-violet-600 bg-violet-100' },
          {
            label: 'Dietary Requests',
            value: totalDietary,
            icon: Utensils,
            color: 'text-amber-600 bg-amber-100',
          },
        ].map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-5">
              <div className="flex items-center gap-3">
                <div className={`p-2.5 rounded-xl ${stat.color}`}>
                  <stat.icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">{stat.label}</p>
                  <p className="text-xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Search + Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, email, company, or event..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-rose-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500 bg-white"
          />
        </div>
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          <Filter className="w-4 h-4 text-gray-400 shrink-0" />
          {(['all', 'General', 'VIP', 'Student', 'Speaker', 'Sponsor'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTicketFilter(t)}
              className={`px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                ticketFilter === t
                  ? 'bg-rose-100 text-rose-700'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {t === 'all' ? 'All Tickets' : t}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-1.5">
          {(['all', 'checked-in', 'not-checked-in'] as const).map((c) => (
            <button
              key={c}
              onClick={() => setCheckInFilter(c)}
              className={`px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                checkInFilter === c
                  ? 'bg-green-100 text-green-700'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {c === 'all' ? 'All Status' : c === 'checked-in' ? '✓ Checked In' : '✗ Not In'}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-rose-100">
                <th className="px-4 py-3 text-left">
                  <button
                    onClick={() => toggleSort('lastName')}
                    className="flex items-center gap-1 text-xs font-semibold text-gray-500 hover:text-rose-600 transition-colors"
                  >
                    Attendee
                    {sortField === 'lastName' ? (
                      sortDir === 'asc' ? (
                        <ChevronUp className="w-3 h-3" />
                      ) : (
                        <ChevronDown className="w-3 h-3" />
                      )
                    ) : null}
                  </button>
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500">Ticket</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500">Check-in</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500">Sessions</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500">Dietary</th>
                <th className="px-4 py-3 text-left">
                  <button
                    onClick={() => toggleSort('registrationDate')}
                    className="flex items-center gap-1 text-xs font-semibold text-gray-500 hover:text-rose-600 transition-colors"
                  >
                    Registered
                    {sortField === 'registrationDate' ? (
                      sortDir === 'asc' ? (
                        <ChevronUp className="w-3 h-3" />
                      ) : (
                        <ChevronDown className="w-3 h-3" />
                      )
                    ) : null}
                  </button>
                </th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-rose-50">
              {filtered.map((attendee) => {
                const isExpanded = expandedRow === attendee.id;
                const ticketVariant = TICKET_COLORS[attendee.ticketType];

                return (
                  <tr key={attendee.id} className="hover:bg-rose-50/30 transition-colors">
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
                          {attendee.firstName[0]}{attendee.lastName[0]}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {attendee.firstName} {attendee.lastName}
                          </p>
                          <p className="text-[11px] text-gray-400">{attendee.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      <Badge variant={ticketVariant} size="sm">
                        {attendee.ticketType}
                      </Badge>
                    </td>
                    <td className="px-4 py-3.5">
                      {attendee.checkedIn ? (
                        <div className="flex items-center gap-1.5">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <div>
                            <span className="text-xs font-medium text-green-700">Yes</span>
                            {attendee.checkInTime && (
                              <p className="text-[10px] text-gray-400">{formatTime(attendee.checkInTime)}</p>
                            )}
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5">
                          <XCircle className="w-4 h-4 text-gray-300" />
                          <span className="text-xs text-gray-400">No</span>
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="text-sm font-medium text-gray-700">
                        {attendee.sessionsRegistered.length}
                      </span>
                      <span className="text-xs text-gray-400 ml-1">
                        session{attendee.sessionsRegistered.length !== 1 ? 's' : ''}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      {attendee.dietaryRestrictions === 'None' ? (
                        <span className="text-xs text-gray-400">—</span>
                      ) : (
                        <Badge variant="warning" size="sm">
                          <Utensils className="w-3 h-3 mr-1" />
                          {attendee.dietaryRestrictions}
                        </Badge>
                      )}
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="text-xs text-gray-500">{formatDate(attendee.registrationDate)}</span>
                    </td>
                    <td className="px-4 py-3.5 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => setExpandedRow(isExpanded ? null : attendee.id)}
                          className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                          title="Expand"
                        >
                          {isExpanded ? (
                            <ChevronUp className="w-4 h-4 text-gray-400" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-gray-400" />
                          )}
                        </button>
                        <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors" title="Email">
                          <Mail className="w-4 h-4 text-gray-400" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="px-4 py-3 border-t border-rose-100 flex items-center justify-between">
          <p className="text-xs text-gray-500">
            Showing {filtered.length} of {MOCK_ATTENDEES.length} attendees
          </p>
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-green-500" /> Checked in: {totalCheckedIn}
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-gray-300" /> Not in: {MOCK_ATTENDEES.length - totalCheckedIn}
            </span>
          </div>
        </div>
      </Card>

      {filtered.length === 0 && (
        <div className="text-center py-12">
          <Users className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500 font-medium">No attendees match your search</p>
          <p className="text-sm text-gray-400 mt-1">Try adjusting your filters</p>
        </div>
      )}
    </div>
  );
}
