import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

export default function Card({ children, className, padding = true, hover = false }: { children: ReactNode; className?: string; padding?: boolean; hover?: boolean }) {
  return <div className={cn('bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm', padding && 'p-6', hover && 'hover:shadow-md transition-all cursor-pointer', className)}>{children}</div>
}

export function CardHeader({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('flex items-center justify-between mb-4', className)}>{children}</div>
}

export function CardTitle({ children, className }: { children: ReactNode; className?: string }) {
  return <h3 className={cn('text-base font-semibold text-gray-900 dark:text-white', className)}>{children}</h3>
}

export function CardDescription({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn('text-sm text-gray-500 dark:text-gray-400', className)}>{children}</p>
}
