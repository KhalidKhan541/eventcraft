'use client';

import { useState, useMemo } from 'react';
import {
  Search,
  Star,
  Mic2,
  Tag,
  DollarSign,
  MessageSquare,
  ExternalLink,
  BookOpen,
  Users,
  Award,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { MOCK_SPEAKERS } from '@/lib/mock-data';
import { formatCurrency } from '@/lib/utils';

export default function SpeakersPage() {
  const [search, setSearch] = useState('');
  const [topicFilter, setTopicFilter] = useState<string>('all');

  const allTopics = useMemo(() => {
    const set = new Set<string>();
    MOCK_SPEAKERS.forEach((s) => s.topics.forEach((t) => set.add(t)));
    return ['all', ...Array.from(set).sort()];
  }, []);

  const filtered = useMemo(() => {
    return MOCK_SPEAKERS.filter((s) => {
      const matchTopic =
        topicFilter === 'all' || s.topics.includes(topicFilter);
      const matchSearch =
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.company.toLowerCase().includes(search.toLowerCase()) ||
        s.title.toLowerCase().includes(search.toLowerCase()) ||
        s.topics.some((t) => t.toLowerCase().includes(search.toLowerCase()));
      return matchTopic && matchSearch;
    });
  }, [search, topicFilter]);

  const topRated = [...MOCK_SPEAKERS].sort((a, b) => b.rating - a.rating).slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Speakers</h1>
        <p className="text-sm text-gray-500 mt-1">Speaker profiles, ratings, and session history</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Speakers', value: MOCK_SPEAKERS.length, icon: Mic2, color: 'text-rose-600 bg-rose-100' },
          {
            label: 'Avg. Rating',
            value: (MOCK_SPEAKERS.reduce((s, sp) => s + sp.rating, 0) / MOCK_SPEAKERS.length).toFixed(1),
            icon: Star,
            color: 'text-amber-600 bg-amber-100',
          },
          {
            label: 'Total Sessions',
            value: MOCK_SPEAKERS.reduce((s, sp) => s + sp.sessionsCount, 0),
            icon: BookOpen,
            color: 'text-violet-600 bg-violet-100',
          },
          {
            label: 'Total Reviews',
            value: MOCK_SPEAKERS.reduce((s, sp) => s + sp.totalReviews, 0).toLocaleString(),
            icon: MessageSquare,
            color: 'text-green-600 bg-green-100',
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

      {/* Top Rated */}
      <div>
        <h2 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
          <Award className="w-4 h-4 text-amber-500" /> Top Rated Speakers
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {topRated.map((speaker, idx) => (
            <Card key={speaker.id} variant="elevated">
              <CardContent className="p-5">
                <div className="flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0 ring-2 ring-offset-2"
                    style={{ backgroundColor: speaker.avatarColor, ringColor: speaker.avatarColor }}
                  >
                    {speaker.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 truncate">{speaker.name}</p>
                    <p className="text-xs text-gray-500 truncate">{speaker.company}</p>
                  </div>
                  <Badge variant="warning" size="sm">
                    <Star className="w-3 h-3 mr-0.5 fill-current" /> {speaker.rating}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Search + Topic Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search speakers by name, company, or topic..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-rose-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500 bg-white"
          />
        </div>
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          <Tag className="w-4 h-4 text-gray-400 shrink-0" />
          {allTopics.map((topic) => (
            <button
              key={topic}
              onClick={() => setTopicFilter(topic)}
              className={`px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                topicFilter === topic
                  ? 'bg-rose-100 text-rose-700'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {topic === 'all' ? 'All Topics' : topic}
            </button>
          ))}
        </div>
      </div>

      {/* Speaker Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {filtered.map((speaker) => (
          <Card key={speaker.id} variant="interactive" className="group">
            <CardContent className="p-6">
              {/* Avatar + Name */}
              <div className="flex items-start gap-4 mb-4">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-white font-bold text-lg shrink-0 shadow-lg"
                  style={{ backgroundColor: speaker.avatarColor }}
                >
                  {speaker.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-bold text-gray-900 group-hover:text-rose-600 transition-colors">
                    {speaker.name}
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5">{speaker.title}</p>
                  <p className="text-xs text-rose-600 font-medium mt-0.5">{speaker.company}</p>
                </div>
              </div>

              {/* Bio */}
              <p className="text-xs text-gray-500 leading-relaxed mb-4 line-clamp-3">{speaker.bio}</p>

              {/* Stats Row */}
              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="text-center p-2 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-center gap-1 text-amber-500">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span className="text-sm font-bold text-gray-900">{speaker.rating}</span>
                  </div>
                  <p className="text-[10px] text-gray-400 mt-0.5">{speaker.totalReviews} reviews</p>
                </div>
                <div className="text-center p-2 bg-gray-50 rounded-lg">
                  <div className="text-sm font-bold text-gray-900">{speaker.sessionsCount}</div>
                  <p className="text-[10px] text-gray-400 mt-0.5">Sessions</p>
                </div>
                <div className="text-center p-2 bg-gray-50 rounded-lg">
                  <div className="text-sm font-bold text-gray-900">{formatCurrency(speaker.fee)}</div>
                  <p className="text-[10px] text-gray-400 mt-0.5">Fee</p>
                </div>
              </div>

              {/* Topics */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {speaker.topics.map((topic) => (
                  <span
                    key={topic}
                    className="px-2 py-0.5 bg-rose-50 text-rose-600 rounded-md text-[10px] font-medium border border-rose-100"
                  >
                    {topic}
                  </span>
                ))}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <span className="text-[11px] text-gray-400">{speaker.email}</span>
                <button className="flex items-center gap-1 text-xs font-medium text-rose-600 hover:text-rose-700 transition-colors">
                  View Profile <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <Mic2 className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500 font-medium">No speakers found</p>
          <p className="text-sm text-gray-400 mt-1">Try adjusting your search or topic filter</p>
        </div>
      )}
    </div>
  );
}
