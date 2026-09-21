'use client';

import { ReactNode } from 'react';
import { Sidebar, useSidebar } from './Sidebar';
import { TopBar, type TopBarProps } from './TopBar';

/* Re-export nav-item types for consumers */
export type { NavItem, EventStat } from './Sidebar';

interface DashboardShellProps {
  /** Sidebar props */
  navItems: TopBarProps extends { navItems: infer T } ? never : never;
  sidebarNavItems: Array<{
    label: string;
    href: string;
    icon: ReactNode;
    badge?: string | number;
    active?: boolean;
  }>;
  eventStats?: Array<{ label: string; value: string | number }>;

  /** TopBar props */
  title?: string;
  subtitle?: string;
  events?: Array<{ id: string; name: string; date?: string }>;
  selectedEventId?: string;
  onEventChange?: (id: string) => void;
  notifications?: Array<{
    id: string;
    title: string;
    message: string;
    time: string;
    read: boolean;
  }>;
  topBarActions?: ReactNode;
  topBarRightSlot?: ReactNode;

  /** Main content */
  children: ReactNode;
}

export function DashboardShell({
  sidebarNavItems,
  eventStats = [],
  title,
  subtitle,
  events,
  selectedEventId,
  onEventChange,
  notifications,
  topBarActions,
  topBarRightSlot,
  children,
}: DashboardShellProps) {
  const { collapsed } = useSidebar();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Sidebar */}
      <Sidebar navItems={sidebarNavItems} eventStats={eventStats} />

      {/* Main content area — offset for sidebar width */}
      <div
        className="flex min-h-screen flex-col transition-all duration-300"
        style={{ marginLeft: collapsed ? 68 : 256 }}
      >
        {/* TopBar */}
        <TopBar
          title={title}
          subtitle={subtitle}
          events={events}
          selectedEventId={selectedEventId}
          onEventChange={onEventChange}
          notifications={notifications}
          actions={topBarActions}
          rightSlot={topBarRightSlot}
        />

        {/* Page content */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
