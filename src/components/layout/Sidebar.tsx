'use client';

import { useState, createContext, useContext, ReactNode } from 'react';

/* ─── Sidebar context ─── */
interface SidebarContextValue {
  collapsed: boolean;
  toggle: () => void;
}

const SidebarContext = createContext<SidebarContextValue>({
  collapsed: false,
  toggle: () => {},
});

export const useSidebar = () => useContext(SidebarContext);

/* ─── Types ─── */
interface NavItem {
  label: string;
  href: string;
  icon: ReactNode;
  badge?: string | number;
  active?: boolean;
}

interface EventStat {
  label: string;
  value: string | number;
}

interface SidebarProps {
  navItems: NavItem[];
  eventStats?: EventStat[];
  children?: ReactNode;
}

/* ─── Component ─── */
export function Sidebar({ navItems, eventStats = [], children }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const toggle = () => setCollapsed((c) => !c);

  return (
    <SidebarContext.Provider value={{ collapsed, toggle }}>
      <aside
        className={`
          fixed inset-y-0 left-0 z-30 flex flex-col
          border-r border-slate-200 bg-white
          transition-all duration-300
          dark:border-slate-800 dark:bg-slate-950
          ${collapsed ? 'w-[68px]' : 'w-64'}
        `}
      >
        {/* ── Brand ── */}
        <div className="flex h-16 items-center gap-3 border-b border-slate-200 px-4 dark:border-slate-800">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-rose-500 to-pink-600 shadow-sm shadow-rose-200">
            <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M8 2v4M16 2v4" />
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <path d="M3 10h18" />
            </svg>
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <span className="text-sm font-bold tracking-tight text-slate-900 dark:text-white">
                Event<span className="text-rose-600">Craft</span>
              </span>
              <span className="text-[10px] text-slate-400">Event Management</span>
            </div>
          )}
        </div>

        {/* ── Navigation ── */}
        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <ul className="flex flex-col gap-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={`
                    group flex items-center gap-3 rounded-xl px-3 py-2.5
                    text-sm font-medium transition-all duration-150
                    ${item.active
                      ? 'bg-rose-50 text-rose-700 shadow-sm shadow-rose-100 dark:bg-rose-950 dark:text-rose-400'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200'
                    }
                  `}
                  title={collapsed ? item.label : undefined}
                >
                  <span className="shrink-0 [&>svg]:h-5 [&>svg]:w-5">
                    {item.icon}
                  </span>
                  {!collapsed && (
                    <>
                      <span className="flex-1 truncate">{item.label}</span>
                      {item.badge !== undefined && (
                        <span className="rounded-full bg-rose-100 px-2 py-0.5 text-[10px] font-bold text-rose-700 dark:bg-rose-900 dark:text-rose-300">
                          {item.badge}
                        </span>
                      )}
                    </>
                  )}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* ── Event Stats Widget ── */}
        {!collapsed && eventStats.length > 0 && (
          <div className="mx-3 mb-4 rounded-xl border border-rose-100 bg-gradient-to-br from-rose-50 to-pink-50 p-4 dark:border-rose-900 dark:from-rose-950/50 dark:to-pink-950/50">
            <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-rose-500">
              📊 Event Stats
            </p>
            <div className="space-y-1.5">
              {eventStats.map((stat) => (
                <div key={stat.label} className="flex items-center justify-between text-xs">
                  <span className="text-slate-600 dark:text-slate-400">{stat.label}</span>
                  <span className="font-semibold text-slate-900 dark:text-slate-100">
                    {stat.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Collapse toggle + extras ── */}
        <div className="border-t border-slate-200 p-3 dark:border-slate-800">
          {children}
          <button
            onClick={toggle}
            className="mt-2 flex w-full items-center justify-center rounded-xl p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800"
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            <svg
              className={`h-5 w-5 transition-transform duration-300 ${collapsed ? 'rotate-180' : ''}`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
        </div>
      </aside>
    </SidebarContext.Provider>
  );
}
