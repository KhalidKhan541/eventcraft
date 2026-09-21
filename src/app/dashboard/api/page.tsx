'use client'
import { useState } from 'react'
import { Card, CardTitle, CardDescription } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { MOCK_API_KEYS, MOCK_WEBHOOKS, MOCK_RATE_LIMITS, MOCK_CODE_SNIPPETS, MOCK_API_ACTIVITY } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

const serviceIcons: Record<string, string> = {
  eventbrite: '🎟️',
  splash: '✨',
  cvent: '🏢',
  stripe: '💳',
  mailchimp: '📧',
  legacy: '🔑',
}

const serviceColors: Record<string, string> = {
  eventbrite: 'from-orange-500 to-red-500',
  splash: 'from-purple-500 to-pink-500',
  cvent: 'from-blue-500 to-cyan-500',
  stripe: 'from-indigo-500 to-violet-500',
  mailchimp: 'from-yellow-500 to-orange-500',
  legacy: 'from-gray-500 to-gray-600',
}

type Tab = 'keys' | 'webhooks' | 'limits' | 'logs'

export default function APIPage() {
  const [activeTab, setActiveTab] = useState<Tab>('keys')
  const [showNew, setShowNew] = useState(false)
  const [newKeyName, setNewKeyName] = useState('')
  const [newKeyService, setNewKeyService] = useState('eventbrite')
  const [activeSnippet, setActiveSnippet] = useState(0)
  const [revealedKeys, setRevealedKeys] = useState<Set<string>>(new Set())
  const [webhookUrl, setWebhookUrl] = useState('')
  const [webhookEvents, setWebhookEvents] = useState('event.created')

  const tabs: { id: Tab; label: string; icon: string; count?: number }[] = [
    { id: 'keys', label: 'Integration Keys', icon: '🔑', count: MOCK_API_KEYS.filter(k => k.status === 'active').length },
    { id: 'webhooks', label: 'Webhooks', icon: '🔗', count: MOCK_WEBHOOKS.filter(w => w.status === 'active').length },
    { id: 'limits', label: 'Rate Limits', icon: '⚡' },
    { id: 'logs', label: 'Request Logs', icon: '📋' },
  ]

  const toggleReveal = (id: string) => {
    setRevealedKeys(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const usagePercent = Math.round((MOCK_RATE_LIMITS.requestsUsedToday / MOCK_RATE_LIMITS.requestsPerDay) * 100)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">API Access</h2>
          <p className="text-gray-500 dark:text-gray-400">Manage integrations, keys, and webhooks for your event platform</p>
        </div>
        <Button onClick={() => setShowNew(!showNew)}>+ New API Key</Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Active Keys', value: MOCK_API_KEYS.filter(k => k.status === 'active').length.toString(), icon: '🔑', color: 'bg-evt-50 dark:bg-evt-500/10 text-evt-600 dark:text-evt-400' },
          { label: 'Total Requests', value: '8.6M', icon: '📊', color: 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400' },
          { label: 'Webhook Endpoints', value: MOCK_WEBHOOKS.filter(w => w.status === 'active').length.toString(), icon: '🔗', color: 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' },
          { label: 'Avg Latency', value: '127ms', icon: '⚡', color: 'bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400' },
        ].map(s => (
          <Card key={s.label}>
            <div className="flex items-center gap-3">
              <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center text-lg', s.color)}>
                {s.icon}
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">{s.label}</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">{s.value}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Code Snippets */}
      <Card>
        <CardTitle>Quick Start</CardTitle>
        <CardDescription>Copy and paste these snippets to get started with the EventCraft API</CardDescription>
        <div className="flex gap-2 mt-4">
          {MOCK_CODE_SNIPPETS.map((s, i) => (
            <button
              key={i}
              onClick={() => setActiveSnippet(i)}
              className={cn(
                'px-3 py-1.5 rounded-lg text-xs font-medium transition-all',
                activeSnippet === i
                  ? 'bg-evt-100 dark:bg-evt-500/20 text-evt-700 dark:text-evt-300'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
              )}
            >
              {s.title}
            </button>
          ))}
        </div>
        <div className="mt-3">
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">{MOCK_CODE_SNIPPETS[activeSnippet].description}</p>
          <div className="bg-gray-900 rounded-xl p-4 font-mono text-sm text-green-400 overflow-x-auto relative group">
            <pre className="whitespace-pre-wrap break-all">{MOCK_CODE_SNIPPETS[activeSnippet].code}</pre>
            <button className="absolute top-3 right-3 px-2 py-1 rounded bg-gray-800 text-gray-400 text-xs opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-700 hover:text-white">
              Copy
            </button>
          </div>
        </div>
      </Card>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 dark:bg-gray-800/50 p-1 rounded-xl">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              'flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all flex-1 justify-center',
              activeTab === tab.id
                ? 'bg-white dark:bg-gray-800 text-evt-600 dark:text-evt-400 shadow-sm'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            )}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
            {tab.count !== undefined && (
              <span className={cn(
                'ml-1 px-1.5 py-0.5 rounded-full text-xs',
                activeTab === tab.id ? 'bg-evt-100 dark:bg-evt-500/20 text-evt-600 dark:text-evt-400' : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
              )}>
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* New Key Form */}
      {showNew && (
        <Card className="border-evt-200 dark:border-evt-800 animate-fade-in">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Generate New API Key</h3>
          <div className="grid grid-cols-3 gap-3 mb-3">
            <div>
              <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Key Name</label>
              <input
                value={newKeyName}
                onChange={e => setNewKeyName(e.target.value)}
                placeholder="e.g. Production Sync"
                className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:ring-2 focus:ring-evt-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Service</label>
              <select
                value={newKeyService}
                onChange={e => setNewKeyService(e.target.value)}
                className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm"
              >
                <option value="eventbrite">Eventbrite</option>
                <option value="splash">Splash</option>
                <option value="cvent">Cvent</option>
                <option value="stripe">Stripe</option>
                <option value="mailchimp">Mailchimp</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Scopes</label>
              <select className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm">
                <option>Read Only</option>
                <option>Read + Write</option>
                <option>Full Access</option>
              </select>
            </div>
          </div>
          <div className="flex gap-2 justify-end">
            <Button variant="ghost" onClick={() => setShowNew(false)}>Cancel</Button>
            <Button>Generate Key</Button>
          </div>
        </Card>
      )}

      {/* Integration Keys Tab */}
      {activeTab === 'keys' && (
        <div className="space-y-3">
          {MOCK_API_KEYS.map(key => (
            <Card key={key.id} hover>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={cn('w-11 h-11 rounded-xl bg-gradient-to-br flex items-center justify-center text-lg text-white shadow-sm', serviceColors[key.service])}>
                    {serviceIcons[key.service]}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">{key.name}</p>
                      <Badge variant={key.status === 'active' ? 'success' : 'default'} dot>{key.status}</Badge>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{key.description}</p>
                    <div className="flex items-center gap-3 mt-1.5">
                      <p className="text-xs font-mono text-gray-400 dark:text-gray-500">
                        {revealedKeys.has(key.id) ? key.prefix.replace('...', 'a3f8b2c9e1d4') : key.prefix}
                      </p>
                      <button onClick={() => toggleReveal(key.id)} className="text-xs text-evt-500 hover:text-evt-600 dark:text-evt-400">
                        {revealedKeys.has(key.id) ? 'Hide' : 'Reveal'}
                      </button>
                    </div>
                    <div className="flex gap-1.5 mt-2">
                      {key.scopes.map(scope => (
                        <span key={scope} className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-[10px] text-gray-500 dark:text-gray-400 font-mono">
                          {scope}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">{key.requests.toLocaleString()}</p>
                    <p className="text-xs text-gray-500">total requests</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">Created</p>
                    <p className="text-xs text-gray-400">{key.created}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">Last used</p>
                    <p className="text-xs text-gray-400">{key.lastUsed}</p>
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="xs">Edit</Button>
                    {key.status === 'active' && (
                      <Button variant="ghost" size="xs" className="text-red-500 hover:text-red-600">Revoke</Button>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Webhooks Tab */}
      {activeTab === 'webhooks' && (
        <div className="space-y-4">
          <Card>
            <CardTitle>Add Webhook</CardTitle>
            <div className="grid grid-cols-2 gap-3 mt-3">
              <div>
                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Endpoint URL</label>
                <input
                  value={webhookUrl}
                  onChange={e => setWebhookUrl(e.target.value)}
                  placeholder="https://your-app.com/webhook"
                  className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:ring-2 focus:ring-evt-500 outline-none font-mono"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Events</label>
                <input
                  value={webhookEvents}
                  onChange={e => setWebhookEvents(e.target.value)}
                  placeholder="event.created, registration.paid"
                  className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:ring-2 focus:ring-evt-500 outline-none"
                />
              </div>
            </div>
            <div className="flex justify-end mt-3">
              <Button>Add Webhook</Button>
            </div>
          </Card>

          <div className="space-y-3">
            {MOCK_WEBHOOKS.map(wh => (
              <Card key={wh.id}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center text-lg">🔗</div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-mono text-gray-900 dark:text-white">{wh.url}</p>
                        <Badge variant={wh.status === 'active' ? 'success' : 'warning'} dot>{wh.status}</Badge>
                      </div>
                      <div className="flex gap-1.5 mt-1.5">
                        {wh.events.map(ev => (
                          <span key={ev} className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-[10px] text-gray-500 dark:text-gray-400 font-mono">
                            {ev}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="text-xs text-gray-500">Success Rate</p>
                      <p className={cn('text-sm font-semibold', wh.successRate >= 99 ? 'text-emerald-600 dark:text-emerald-400' : wh.successRate >= 95 ? 'text-amber-600 dark:text-amber-400' : 'text-red-600 dark:text-red-400')}>
                        {wh.successRate}%
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500">Failures</p>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">{wh.failures}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500">Last fired</p>
                      <p className="text-xs text-gray-400">{wh.lastFired}</p>
                    </div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="xs">Test</Button>
                      <Button variant="ghost" size="xs">{wh.status === 'active' ? 'Pause' : 'Enable'}</Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Rate Limits Tab */}
      {activeTab === 'limits' && (
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <Card>
              <p className="text-sm text-gray-500 dark:text-gray-400">Requests / Minute</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{MOCK_RATE_LIMITS.requestsPerMinute.toLocaleString()}</p>
              <p className="text-xs text-gray-400 mt-1">Burst limit: {MOCK_RATE_LIMITS.burstLimit.toLocaleString()}</p>
            </Card>
            <Card>
              <p className="text-sm text-gray-500 dark:text-gray-400">Requests / Day</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{MOCK_RATE_LIMITS.requestsPerDay.toLocaleString()}</p>
              <div className="mt-2">
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>{MOCK_RATE_LIMITS.requestsUsedToday.toLocaleString()} used</span>
                  <span>{usagePercent}%</span>
                </div>
                <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div className={cn('h-full rounded-full transition-all', usagePercent > 80 ? 'bg-red-500' : usagePercent > 60 ? 'bg-amber-500' : 'bg-evt-500')} style={{ width: `${usagePercent}%` }} />
                </div>
              </div>
            </Card>
            <Card>
              <p className="text-sm text-gray-500 dark:text-gray-400">Concurrent Connections</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{MOCK_RATE_LIMITS.concurrentConnections}</p>
              <p className="text-xs text-gray-400 mt-1">Current plan: {MOCK_RATE_LIMITS.plan}</p>
            </Card>
          </div>

          <Card>
            <CardTitle>Current Usage</CardTitle>
            <CardDescription>Request volume over the last 10 minutes</CardDescription>
            <div className="mt-4 space-y-2">
              {MOCK_RATE_LIMITS.currentUsage.map(u => (
                <div key={u.minute} className="flex items-center gap-3">
                  <span className="text-xs font-mono text-gray-500 w-12">{u.minute}</span>
                  <div className="flex-1 h-6 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
                    <div
                      className={cn('h-full rounded-lg transition-all', u.requests > 4500 ? 'bg-red-400 dark:bg-red-500/50' : u.requests > 3500 ? 'bg-evt-400 dark:bg-evt-500/50' : 'bg-evt-300 dark:bg-evt-500/30')}
                      style={{ width: `${(u.requests / MOCK_RATE_LIMITS.burstLimit) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs font-mono text-gray-500 w-16 text-right">{u.requests.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <CardTitle>Plan Limits Comparison</CardTitle>
            <div className="mt-3 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left py-2 text-gray-500 dark:text-gray-400 font-medium">Plan</th>
                    <th className="text-right py-2 text-gray-500 dark:text-gray-400 font-medium">Requests / Min</th>
                    <th className="text-right py-2 text-gray-500 dark:text-gray-400 font-medium">Requests / Day</th>
                    <th className="text-right py-2 text-gray-500 dark:text-gray-400 font-medium">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {MOCK_RATE_LIMITS.tiers.map(tier => (
                    <tr key={tier.name} className={cn('border-b border-gray-100 dark:border-gray-800', tier.name === MOCK_RATE_LIMITS.plan && 'bg-evt-50/50 dark:bg-evt-500/5')}>
                      <td className="py-3">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-gray-900 dark:text-white">{tier.name}</span>
                          {tier.name === MOCK_RATE_LIMITS.plan && <Badge variant="rose" dot>current</Badge>}
                        </div>
                      </td>
                      <td className="py-3 text-right text-gray-600 dark:text-gray-300">{tier.requestsPerMinute.toLocaleString()}</td>
                      <td className="py-3 text-right text-gray-600 dark:text-gray-300">{tier.requestsPerDay.toLocaleString()}</td>
                      <td className="py-3 text-right font-medium text-gray-900 dark:text-white">{tier.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      )}

      {/* Request Logs Tab */}
      {activeTab === 'logs' && (
        <Card>
          <div className="flex items-center justify-between mb-4">
            <div>
              <CardTitle>Recent API Activity</CardTitle>
              <CardDescription>Last 8 API requests across all keys</CardDescription>
            </div>
            <div className="flex gap-2">
              <select className="px-3 py-1.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-xs">
                <option>All methods</option>
                <option>GET</option>
                <option>POST</option>
                <option>PUT</option>
                <option>DELETE</option>
              </select>
              <select className="px-3 py-1.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-xs">
                <option>All statuses</option>
                <option>2xx</option>
                <option>4xx</option>
                <option>5xx</option>
              </select>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-2 text-gray-500 font-medium">Method + Endpoint</th>
                  <th className="text-left py-2 text-gray-500 font-medium">Key</th>
                  <th className="text-center py-2 text-gray-500 font-medium">Status</th>
                  <th className="text-right py-2 text-gray-500 font-medium">Latency</th>
                  <th className="text-right py-2 text-gray-500 font-medium">Time</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_API_ACTIVITY.map(log => {
                  const method = log.action.split(' ')[0]
                  const methodColor: Record<string, string> = { GET: 'text-emerald-600 dark:text-emerald-400', POST: 'text-blue-600 dark:text-blue-400', PUT: 'text-amber-600 dark:text-amber-400', DELETE: 'text-red-600 dark:text-red-400' }
                  const statusColor = log.status < 300 ? 'text-emerald-600 dark:text-emerald-400' : log.status < 400 ? 'text-amber-600 dark:text-amber-400' : 'text-red-600 dark:text-red-400'
                  return (
                    <tr key={log.id} className="border-b border-gray-50 dark:border-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-800/30">
                      <td className="py-2.5">
                        <span className={cn('font-mono font-semibold text-xs', methodColor[method])}>{method}</span>
                        <span className="font-mono text-gray-700 dark:text-gray-300 ml-2">{log.action.split(' ').slice(1).join(' ')}</span>
                      </td>
                      <td className="py-2.5 font-mono text-xs text-gray-500">{log.key}</td>
                      <td className="py-2.5 text-center"><span className={cn('font-mono text-xs font-semibold', statusColor)}>{log.status}</span></td>
                      <td className="py-2.5 text-right font-mono text-xs text-gray-500">{log.latency}</td>
                      <td className="py-2.5 text-right text-xs text-gray-400">{log.time}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  )
}
