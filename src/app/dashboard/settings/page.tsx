'use client'
import { useState } from 'react'
import { Card, CardTitle, CardDescription } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { MOCK_BILLING, MOCK_INTEGRATIONS } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

type SettingsTab = 'company' | 'appearance' | 'integrations' | 'notifications' | 'billing' | 'compliance'

const tabs: { id: SettingsTab; label: string; icon: string }[] = [
  { id: 'company', label: 'Company', icon: '🏢' },
  { id: 'appearance', label: 'Appearance', icon: '🎨' },
  { id: 'integrations', label: 'Integrations', icon: '🔗' },
  { id: 'notifications', label: 'Notifications', icon: '🔔' },
  { id: 'billing', label: 'Billing', icon: '💳' },
  { id: 'compliance', label: 'Compliance', icon: '🛡️' },
]

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>('company')
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('dark')
  const [accentColor, setAccentColor] = useState('rose')
  const [notifications, setNotifications] = useState({
    newRegistration: true,
    eventReminder: true,
    paymentReceived: true,
    eventCancelled: true,
    weeklyReport: false,
    marketingEmails: false,
    securityAlerts: true,
    systemUpdates: false,
  })
  const [compliance, setCompliance] = useState({
    gdpr: true,
    ccpa: false,
    dataRetention: '24months',
    twoFactor: true,
    auditLog: true,
    sso: false,
  })

  const toggleNotif = (key: keyof typeof notifications) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const toggleCompliance = (key: keyof typeof compliance) => {
    setCompliance(prev => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h2>
        <p className="text-gray-500 dark:text-gray-400">Configure your EventCraft platform</p>
      </div>

      <div className="flex gap-6">
        {/* Sidebar Tabs */}
        <div className="w-56 shrink-0 space-y-1">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all text-left',
                activeTab === tab.id
                  ? 'bg-evt-50 dark:bg-evt-500/10 text-evt-700 dark:text-evt-300'
                  : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-300'
              )}
            >
              <span className="text-base">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 space-y-6 max-w-3xl">
          {/* Company Info */}
          {activeTab === 'company' && (
            <>
              <Card>
                <CardTitle>Company Information</CardTitle>
                <CardDescription>Basic details about your organization</CardDescription>
                <div className="space-y-4 mt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Company Name</label>
                      <input defaultValue="EventCraft Inc." className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:ring-2 focus:ring-evt-500 outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Website</label>
                      <input defaultValue="https://eventcraft.io" className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:ring-2 focus:ring-evt-500 outline-none" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Contact Email</label>
                      <input defaultValue="khalid@eventcraft.io" className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:ring-2 focus:ring-evt-500 outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone</label>
                      <input defaultValue="+1 (555) 123-4567" className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:ring-2 focus:ring-evt-500 outline-none" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Company Address</label>
                    <input defaultValue="123 Event Lane, San Francisco, CA 94105" className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:ring-2 focus:ring-evt-500 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Timezone</label>
                    <select className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm">
                      <option>Pacific Time (PT) — UTC-8</option>
                      <option>Eastern Time (ET) — UTC-5</option>
                      <option>Central European (CET) — UTC+1</option>
                      <option>UTC</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Currency</label>
                    <select className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm">
                      <option>USD ($)</option>
                      <option>EUR (€)</option>
                      <option>GBP (£)</option>
                      <option>CAD (CA$)</option>
                    </select>
                  </div>
                  <div className="flex justify-end">
                    <Button>Save Changes</Button>
                  </div>
                </div>
              </Card>

              <Card>
                <CardTitle>Logo & Branding</CardTitle>
                <CardDescription>Your brand assets used across EventCraft</CardDescription>
                <div className="flex items-center gap-6 mt-4">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-evt-500 to-pink-500 flex items-center justify-center text-3xl text-white font-bold shadow-lg shadow-evt-500/25">
                    E
                  </div>
                  <div>
                    <Button variant="outline" size="sm">Upload Logo</Button>
                    <p className="text-xs text-gray-400 mt-2">Recommended: 400×400px PNG or SVG</p>
                  </div>
                </div>
              </Card>
            </>
          )}

          {/* Appearance */}
          {activeTab === 'appearance' && (
            <>
              <Card>
                <CardTitle>Theme</CardTitle>
                <CardDescription>Choose your preferred interface theme</CardDescription>
                <div className="grid grid-cols-3 gap-3 mt-4">
                  {(['light', 'dark', 'system'] as const).map(t => (
                    <button
                      key={t}
                      onClick={() => setTheme(t)}
                      className={cn(
                        'p-4 rounded-xl border-2 text-center transition-all',
                        theme === t ? 'border-evt-500 bg-evt-50 dark:bg-evt-500/10' : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                      )}
                    >
                      <span className="text-2xl">{t === 'light' ? '☀️' : t === 'dark' ? '🌙' : '💻'}</span>
                      <p className="text-sm font-medium text-gray-900 dark:text-white mt-2 capitalize">{t}</p>
                    </button>
                  ))}
                </div>
              </Card>

              <Card>
                <CardTitle>Accent Color</CardTitle>
                <CardDescription>Customize the primary color used throughout the dashboard</CardDescription>
                <div className="flex gap-3 mt-4">
                  {[
                    { name: 'rose', color: 'bg-evt-500', ring: 'ring-evt-500' },
                    { name: 'pink', color: 'bg-pink-500', ring: 'ring-pink-500' },
                    { name: 'violet', color: 'bg-violet-500', ring: 'ring-violet-500' },
                    { name: 'blue', color: 'bg-blue-500', ring: 'ring-blue-500' },
                    { name: 'emerald', color: 'bg-emerald-500', ring: 'ring-emerald-500' },
                    { name: 'amber', color: 'bg-amber-500', ring: 'ring-amber-500' },
                  ].map(c => (
                    <button
                      key={c.name}
                      onClick={() => setAccentColor(c.name)}
                      className={cn(
                        'w-10 h-10 rounded-full transition-all ring-offset-2 dark:ring-offset-gray-900',
                        c.color,
                        accentColor === c.name ? cn('ring-2', c.ring) : 'hover:scale-110'
                      )}
                    />
                  ))}
                </div>
              </Card>

              <Card>
                <CardTitle>Event Pages</CardTitle>
                <CardDescription>Default settings for public event pages</CardDescription>
                <div className="space-y-4 mt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Default Layout</label>
                      <select className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm">
                        <option>Modern Grid</option>
                        <option>Classic List</option>
                        <option>Timeline</option>
                        <option>Card Flow</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Font</label>
                      <select className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm">
                        <option>Inter</option>
                        <option>Playfair Display</option>
                        <option>Poppins</option>
                        <option>DM Sans</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">Show Event Countdown</p>
                      <p className="text-xs text-gray-500">Display countdown timer on event pages</p>
                    </div>
                    <button className="w-10 h-6 bg-evt-600 rounded-full relative transition-colors">
                      <span className="absolute right-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">Dark Mode (Public Pages)</p>
                      <p className="text-xs text-gray-500">Enable dark theme for public-facing event pages</p>
                    </div>
                    <button className="w-10 h-6 bg-gray-300 dark:bg-gray-600 rounded-full relative transition-colors">
                      <span className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform" />
                    </button>
                  </div>
                </div>
              </Card>
            </>
          )}

          {/* Integrations */}
          {activeTab === 'integrations' && (
            <>
              <Card>
                <CardTitle>Connected Services</CardTitle>
                <CardDescription>Manage your third-party integrations</CardDescription>
              </Card>
              <div className="grid grid-cols-2 gap-3">
                {MOCK_INTEGRATIONS.map(int => (
                  <Card key={int.id} hover>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{int.icon}</span>
                        <div>
                          <p className="text-sm font-semibold text-gray-900 dark:text-white">{int.name}</p>
                          <p className="text-xs text-gray-500">{int.category}</p>
                        </div>
                      </div>
                      <Badge
                        variant={int.status === 'connected' ? 'success' : 'default'}
                        dot
                      >
                        {int.status}
                      </Badge>
                    </div>
                    {int.status === 'connected' && (
                      <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
                        <div className="text-xs text-gray-500">
                          <span>Last sync: {int.lastSync}</span>
                          {int.eventsSynced > 0 && <span className="ml-3">Events: {int.eventsSynced.toLocaleString()}</span>}
                        </div>
                        <Button variant="ghost" size="xs">Configure</Button>
                      </div>
                    )}
                    {int.status === 'available' && (
                      <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-800">
                        <Button variant="outline" size="xs" className="w-full">Connect</Button>
                      </div>
                    )}
                  </Card>
                ))}
              </div>
            </>
          )}

          {/* Notifications */}
          {activeTab === 'notifications' && (
            <>
              <Card>
                <CardTitle>Event Notifications</CardTitle>
                <CardDescription>Configure alerts for event-related activity</CardDescription>
                <div className="space-y-3 mt-4">
                  {([
                    { key: 'newRegistration' as const, label: 'New Registration', desc: 'When someone registers for an event', icon: '🎟️' },
                    { key: 'eventReminder' as const, label: 'Event Reminders', desc: 'Upcoming event alerts 24h and 1h before', icon: '⏰' },
                    { key: 'eventCancelled' as const, label: 'Event Cancelled', desc: 'Alert when an event is cancelled', icon: '❌' },
                  ]).map(item => (
                    <div key={item.key} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                      <div className="flex items-center gap-3">
                        <span className="text-lg">{item.icon}</span>
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">{item.label}</p>
                          <p className="text-xs text-gray-500">{item.desc}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => toggleNotif(item.key)}
                        className={cn('w-10 h-6 rounded-full relative transition-colors', notifications[item.key] ? 'bg-evt-600' : 'bg-gray-300 dark:bg-gray-600')}
                      >
                        <span className={cn('absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform', notifications[item.key] ? 'right-0.5' : 'left-0.5')} />
                      </button>
                    </div>
                  ))}
                </div>
              </Card>

              <Card>
                <CardTitle>Financial Notifications</CardTitle>
                <CardDescription>Alerts for payments and financial activity</CardDescription>
                <div className="space-y-3 mt-4">
                  {([
                    { key: 'paymentReceived' as const, label: 'Payment Received', desc: 'Confirmation of ticket sale payments', icon: '💰' },
                  ]).map(item => (
                    <div key={item.key} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                      <div className="flex items-center gap-3">
                        <span className="text-lg">{item.icon}</span>
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">{item.label}</p>
                          <p className="text-xs text-gray-500">{item.desc}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => toggleNotif(item.key)}
                        className={cn('w-10 h-6 rounded-full relative transition-colors', notifications[item.key] ? 'bg-evt-600' : 'bg-gray-300 dark:bg-gray-600')}
                      >
                        <span className={cn('absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform', notifications[item.key] ? 'right-0.5' : 'left-0.5')} />
                      </button>
                    </div>
                  ))}
                </div>
              </Card>

              <Card>
                <CardTitle>System Notifications</CardTitle>
                <CardDescription>Platform updates and security alerts</CardDescription>
                <div className="space-y-3 mt-4">
                  {([
                    { key: 'securityAlerts' as const, label: 'Security Alerts', desc: 'Critical security events and login attempts', icon: '🔒' },
                    { key: 'weeklyReport' as const, label: 'Weekly Analytics Report', desc: 'Summary of your event performance', icon: '📊' },
                    { key: 'marketingEmails' as const, label: 'Marketing Emails', desc: 'Product updates and feature announcements', icon: '📣' },
                    { key: 'systemUpdates' as const, label: 'System Updates', desc: 'Maintenance windows and platform changes', icon: '🔧' },
                  ]).map(item => (
                    <div key={item.key} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                      <div className="flex items-center gap-3">
                        <span className="text-lg">{item.icon}</span>
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">{item.label}</p>
                          <p className="text-xs text-gray-500">{item.desc}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => toggleNotif(item.key)}
                        className={cn('w-10 h-6 rounded-full relative transition-colors', notifications[item.key] ? 'bg-evt-600' : 'bg-gray-300 dark:bg-gray-600')}
                      >
                        <span className={cn('absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform', notifications[item.key] ? 'right-0.5' : 'left-0.5')} />
                      </button>
                    </div>
                  ))}
                </div>
              </Card>
            </>
          )}

          {/* Billing */}
          {activeTab === 'billing' && (
            <>
              <Card className="bg-gradient-to-br from-evt-500 via-evt-600 to-pink-600 text-white border-0">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-white/70">Current Plan</p>
                    <p className="text-2xl font-bold mt-1">{MOCK_BILLING.currentPlan.name}</p>
                    <div className="flex gap-2 mt-2">
                      {MOCK_BILLING.currentPlan.features.map(f => (
                        <span key={f} className="px-2 py-0.5 bg-white/20 rounded-lg text-xs">{f}</span>
                      ))}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold">${MOCK_BILLING.currentPlan.price}<span className="text-lg text-white/70">/mo</span></p>
                    <p className="text-sm text-white/70 mt-1">Renews {MOCK_BILLING.currentPlan.renewal}</p>
                  </div>
                </div>
              </Card>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Events Hosted', value: MOCK_BILLING.usage.events, icon: '🎪' },
                  { label: 'Total Registrations', value: MOCK_BILLING.usage.registrations.toLocaleString(), icon: '🎟️' },
                  { label: 'API Calls', value: MOCK_BILLING.usage.apiCalls.toLocaleString(), icon: '📊' },
                  { label: 'Storage Used', value: `${MOCK_BILLING.usage.storage} GB`, icon: '💾' },
                ].map(usage => (
                  <Card key={usage.label}>
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{usage.icon}</span>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{usage.label}</p>
                        <p className="text-lg font-bold text-gray-900 dark:text-white">{usage.value}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              <Card>
                <CardTitle>Billing History</CardTitle>
                <div className="mt-3 overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <th className="text-left py-2 text-gray-500 font-medium">Invoice</th>
                        <th className="text-left py-2 text-gray-500 font-medium">Date</th>
                        <th className="text-right py-2 text-gray-500 font-medium">Amount</th>
                        <th className="text-right py-2 text-gray-500 font-medium">Status</th>
                        <th className="text-right py-2 text-gray-500 font-medium">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {MOCK_BILLING.invoices.map(inv => (
                        <tr key={inv.id} className="border-b border-gray-50 dark:border-gray-800/50">
                          <td className="py-2.5 font-mono text-gray-900 dark:text-white">{inv.id}</td>
                          <td className="py-2.5 text-gray-500">{inv.date}</td>
                          <td className="py-2.5 text-right font-semibold text-gray-900 dark:text-white">${inv.amount}</td>
                          <td className="py-2.5 text-right"><Badge variant="success" dot>paid</Badge></td>
                          <td className="py-2.5 text-right"><Button variant="ghost" size="xs">Download</Button></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </>
          )}

          {/* Compliance */}
          {activeTab === 'compliance' && (
            <>
              <Card>
                <CardTitle>Data Privacy & GDPR</CardTitle>
                <CardDescription>Manage data protection and privacy compliance</CardDescription>
                <div className="space-y-3 mt-4">
                  {[
                    { key: 'gdpr' as const, label: 'GDPR Compliance', desc: 'Enable GDPR data protection features for EU attendees', icon: '🇪🇺', required: true },
                    { key: 'ccpa' as const, label: 'CCPA Compliance', desc: 'California Consumer Privacy Act support for US attendees', icon: '🇺🇸', required: false },
                  ].map(item => (
                    <div key={item.key} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                      <div className="flex items-center gap-3">
                        <span className="text-lg">{item.icon}</span>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-medium text-gray-900 dark:text-white">{item.label}</p>
                            {item.required && <Badge variant="warning" dot>required</Badge>}
                          </div>
                          <p className="text-xs text-gray-500">{item.desc}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => toggleCompliance(item.key)}
                        className={cn('w-10 h-6 rounded-full relative transition-colors', compliance[item.key] ? 'bg-evt-600' : 'bg-gray-300 dark:bg-gray-600')}
                      >
                        <span className={cn('absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform', compliance[item.key] ? 'right-0.5' : 'left-0.5')} />
                      </button>
                    </div>
                  ))}
                </div>
              </Card>

              <Card>
                <CardTitle>Data Retention</CardTitle>
                <CardDescription>How long to retain attendee and event data</CardDescription>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Retention Period</label>
                  <select
                    value={compliance.dataRetention}
                    onChange={e => setCompliance(prev => ({ ...prev, dataRetention: e.target.value }))}
                    className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm"
                  >
                    <option value="6months">6 Months</option>
                    <option value="12months">12 Months</option>
                    <option value="24months">24 Months</option>
                    <option value="indefinite">Indefinite (until deletion request)</option>
                  </select>
                  <p className="text-xs text-gray-400 mt-2">Attendee PII, registration data, and event metadata will be automatically purged after this period.</p>
                </div>
              </Card>

              <Card>
                <CardTitle>Security</CardTitle>
                <CardDescription>Authentication and access controls</CardDescription>
                <div className="space-y-3 mt-4">
                  {[
                    { key: 'twoFactor' as const, label: 'Two-Factor Authentication', desc: 'Require 2FA for all team members', icon: '🔐' },
                    { key: 'auditLog' as const, label: 'Audit Log', desc: 'Track all account and API activity', icon: '📋' },
                    { key: 'sso' as const, label: 'Single Sign-On (SSO)', desc: 'Enable SAML/OIDC for enterprise login', icon: '🔑' },
                  ].map(item => (
                    <div key={item.key} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                      <div className="flex items-center gap-3">
                        <span className="text-lg">{item.icon}</span>
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">{item.label}</p>
                          <p className="text-xs text-gray-500">{item.desc}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => toggleCompliance(item.key)}
                        className={cn('w-10 h-6 rounded-full relative transition-colors', compliance[item.key] ? 'bg-evt-600' : 'bg-gray-300 dark:bg-gray-600')}
                      >
                        <span className={cn('absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform', compliance[item.key] ? 'right-0.5' : 'left-0.5')} />
                      </button>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="border-red-200 dark:border-red-500/30">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-red-600 dark:text-red-400">Delete Account</p>
                    <p className="text-xs text-gray-500 mt-0.5">Permanently delete all data and cancel subscription</p>
                  </div>
                  <Button variant="danger" size="sm">Delete Account</Button>
                </div>
              </Card>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
