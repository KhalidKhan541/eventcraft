'use client';

import { createContext, useContext, useState, HTMLAttributes, ReactNode } from 'react';

/* ─── Context ─── */
interface TabsContextValue {
  activeTab: string;
  setActiveTab: (id: string) => void;
}

const TabsContext = createContext<TabsContextValue>({
  activeTab: '',
  setActiveTab: () => {},
});

/* ─── Tabs Root ─── */
interface TabsProps extends HTMLAttributes<HTMLDivElement> {
  defaultValue: string;
  value?: string;
  onChange?: (value: string) => void;
  children: ReactNode;
}

function Tabs({ defaultValue, value, onChange, children, className = '', ...props }: TabsProps) {
  const [internal, setInternal] = useState(defaultValue);
  const activeTab = value ?? internal;

  const setActiveTab = (id: string) => {
    setInternal(id);
    onChange?.(id);
  };

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className={className} {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  );
}

/* ─── TabsList ─── */
interface TabsListProps extends HTMLAttributes<HTMLDivElement> {}

function TabsList({ className = '', children, ...props }: TabsListProps) {
  return (
    <div
      role="tablist"
      className={`
        inline-flex gap-1 rounded-xl bg-slate-100 p-1
        dark:bg-slate-800
        ${className}
      `.trim()}
      {...props}
    >
      {children}
    </div>
  );
}

/* ─── TabsTrigger ─── */
interface TabsTriggerProps extends HTMLAttributes<HTMLButtonElement> {
  value: string;
  disabled?: boolean;
  icon?: ReactNode;
}

function TabsTrigger({
  value,
  disabled = false,
  icon,
  className = '',
  children,
  ...props
}: TabsTriggerProps) {
  const { activeTab, setActiveTab } = useContext(TabsContext);
  const isActive = activeTab === value;

  return (
    <button
      role="tab"
      aria-selected={isActive}
      disabled={disabled}
      onClick={() => setActiveTab(value)}
      className={`
        inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5
        text-sm font-medium transition-all duration-200
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500
        disabled:pointer-events-none disabled:opacity-50
        ${isActive
          ? 'bg-white text-rose-600 shadow-sm dark:bg-slate-900 dark:text-rose-400'
          : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200'
        }
        ${className}
      `.trim()}
      {...props}
    >
      {icon && <span className="shrink-0 [&>svg]:h-4 [&>svg]:w-4">{icon}</span>}
      {children}
    </button>
  );
}

/* ─── TabsContent ─── */
interface TabsContentProps extends HTMLAttributes<HTMLDivElement> {
  value: string;
}

function TabsContent({ value, className = '', children, ...props }: TabsContentProps) {
  const { activeTab } = useContext(TabsContext);

  if (activeTab !== value) return null;

  return (
    <div
      role="tabpanel"
      className={`mt-4 focus-visible:outline-none ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export { Tabs, TabsList, TabsTrigger, TabsContent, type TabsProps };
