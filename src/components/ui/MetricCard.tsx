import { HTMLAttributes, forwardRef, ReactNode } from 'react';

interface MetricCardProps extends HTMLAttributes<HTMLDivElement> {
  label: string;
  value: string | number;
  change?: number;          // percentage change
  changeLabel?: string;
  icon?: ReactNode;
  iconBg?: string;          // custom icon background class
  suffix?: string;          // e.g. "%" or "k"
  loading?: boolean;
}

const MetricCard = forwardRef<HTMLDivElement, MetricCardProps>(
  (
    {
      label,
      value,
      change,
      changeLabel = 'vs last period',
      icon,
      iconBg = 'bg-rose-100 text-rose-600 dark:bg-rose-950 dark:text-rose-400',
      suffix,
      loading = false,
      className = '',
      ...props
    },
    ref
  ) => {
    const isPositive = (change ?? 0) >= 0;

    return (
      <div
        ref={ref}
        className={`
          flex items-start justify-between gap-4 rounded-2xl border border-slate-200
          bg-white p-5 shadow-sm transition-shadow hover:shadow-md
          dark:border-slate-800 dark:bg-slate-900
          ${className}
        `.trim()}
        {...props}
      >
        {/* Left: label + value */}
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-slate-500 dark:text-slate-400">
            {label}
          </p>

          {loading ? (
            <div className="mt-2 h-8 w-24 animate-pulse rounded-lg bg-slate-100 dark:bg-slate-800" />
          ) : (
            <p className="mt-1 text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
              {value}
              {suffix && (
                <span className="ml-0.5 text-base font-medium text-slate-400">{suffix}</span>
              )}
            </p>
          )}

          {change !== undefined && !loading && (
            <div className="mt-2 flex items-center gap-1.5">
              <span
                className={`
                  inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5
                  text-xs font-semibold
                  ${isPositive
                    ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400'
                    : 'bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-400'
                  }
                `}
              >
                <svg
                  className={`h-3 w-3 ${isPositive ? '' : 'rotate-180'}`}
                  viewBox="0 0 12 12"
                  fill="none"
                >
                  <path
                    d="M6 2.5v7M3 5l3-3 3 3"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {isPositive ? '+' : ''}
                {change}%
              </span>
              <span className="text-xs text-slate-400">{changeLabel}</span>
            </div>
          )}
        </div>

        {/* Right: icon */}
        {icon && (
          <div
            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${iconBg}`}
          >
            {icon}
          </div>
        )}
      </div>
    );
  }
);

MetricCard.displayName = 'MetricCard';

export { MetricCard, type MetricCardProps };
