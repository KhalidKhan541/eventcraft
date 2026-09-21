'use client';

import { useState, useRef, useEffect, ReactNode } from 'react';
import { useSidebar } from './Sidebar';

/* ─── Theme Toggle ─── */
function ThemeToggle() {
  const [dark, setDark] = useState(false);

  const toggle = () => {
    setDark((d) => {
      const next = !d;
      document.documentElement.classList.toggle('dark', next);
      return next;
    });
  };

  return (
    <button
      onClick={toggle}
      className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200"
      aria-label="Toggle theme"
    >
      {dark ? (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
        </svg>
      ) : (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
        </svg>
      )}
    </button>
  );
}

/* ─── Notifications ─── */
interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
}

function Notifications({ items = [] }: { items?: Notification[] }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const unread = items.filter((n) => !n.read).length;

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="relative flex h-9 w-9 items-center justify-center rounded-xl text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200"
        aria-label="Notifications"
      >
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
          <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
        </svg>
        {unread > 0 && (
          <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-rose-600 text-[9px] font-bold text-white">
            {unread}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-12 z-50 w-80 rounded-2xl border border-slate-200 bg-white p-1 shadow-xl dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between px-4 py-3">
            <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
              Notifications
            </h4>
            <span className="rounded-full bg-rose-100 px-2 py-0.5 text-[10px] font-bold text-rose-700 dark:bg-rose-950 dark:text-rose-400">
              {unread} new
            </span>
          </div>
          <div className="max-h-72 overflow-y-auto">
            {items.length === 0 ? (
              <p className="py-8 text-center text-sm text-slate-400">No notifications</p>
            ) : (
              items.map((n) => (
                <div
                  key={n.id}
                  className={`flex gap-3 rounded-xl px-4 py-3 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800 ${!n.read ? 'bg-rose-50/50 dark:bg-rose-950/20' : ''}`}
                >
                  <div className={`mt-0.5 h-2 w-2 shrink-0 rounded-full ${n.read ? 'bg-slate-300' : 'bg-rose-500'}`} />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-slate-900 dark:text-slate-100">{n.title}</p>
                    <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400 line-clamp-2">{n.message}</p>
                    <p className="mt-1 text-[10px] text-slate-400">{n.time}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── Event Selector ─── */
interface EventOption {
  id: string;
  name: string;
  date?: string;
}

function EventSelector({
  events = [],
  value,
  onChange,
}: {
  events?: EventOption[];
  value?: string;
  onChange?: (id: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const selected = events.find((e) => e.id === value) ?? events[0];

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:border-rose-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
      >
        <span className="h-2 w-2 rounded-full bg-rose-500" />
        <span className="max-w-[160px] truncate">{selected?.name ?? 'Select event'}</span>
        <svg className={`h-4 w-4 text-slate-400 transition-transform ${open ? 'rotate-180' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {open && events.length > 0 && (
        <div className="absolute right-0 top-full z-50 mt-1 w-64 rounded-xl border border-slate-200 bg-white p-1 shadow-xl dark:border-slate-800 dark:bg-slate-900">
          {events.map((ev) => (
            <button
              key={ev.id}
              onClick={() => {
                onChange?.(ev.id);
                setOpen(false);
              }}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors hover:bg-slate-50 dark:hover:bg-slate-800 ${
                ev.id === value ? 'bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-400' : 'text-slate-700 dark:text-slate-300'
              }`}
            >
              <span className="h-2 w-2 shrink-0 rounded-full bg-rose-500" />
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium">{ev.name}</p>
                {ev.date && <p className="text-xs text-slate-400">{ev.date}</p>}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── TopBar ─── */
interface TopBarProps {
  title?: string;
  subtitle?: string;
  events?: EventOption[];
  selectedEventId?: string;
  onEventChange?: (id: string) => void;
  notifications?: Notification[];
  actions?: ReactNode;
  rightSlot?: ReactNode;
}

export function TopBar({
  title = 'Dashboard',
  subtitle,
  events,
  selectedEventId,
  onEventChange,
  notifications = [],
  actions,
  rightSlot,
}: TopBarProps) {
  const { collapsed, toggle } = useSidebar();

  return (
    <header
      className={`
        sticky top-0 z-20 flex h-16 items-center gap-4
        border-b border-slate-200 bg-white/80 backdrop-blur-md
        px-6
        dark:border-slate-800 dark:bg-slate-950/80
        transition-all duration-300
      `}
      style={{ marginLeft: collapsed ? 68 : 256 }}
    >
      {/* Hamburger (mobile / shortcut) */}
      <button
        onClick={toggle}
        className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700 lg:hidden dark:hover:bg-slate-800"
        aria-label="Toggle sidebar"
      >
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="4" y1="6" x2="20" y2="6" />
          <line x1="4" y1="12" x2="16" y2="12" />
          <line x1="4" y1="18" x2="12" y2="18" />
        </svg>
      </button>

      {/* Title */}
      <div className="min-w-0 flex-1">
        <h1 className="truncate text-lg font-bold text-slate-900 dark:text-white">
          {title}
        </h1>
        {subtitle && (
          <p className="text-xs text-slate-500 dark:text-slate-400">{subtitle}</p>
        )}
      </div>

      {/* Right side */}
      <div className="flex items-center gap-2">
        {events && (
          <div className="hidden md:block">
            <EventSelector
              events={events}
              value={selectedEventId}
              onChange={onEventChange}
            />
          </div>
        )}
        {actions}
        <ThemeToggle />
        <Notifications items={notifications} />
        {rightSlot}
      </div>
    </header>
  );
}
