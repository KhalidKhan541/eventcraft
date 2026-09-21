'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-rose-100 text-rose-700',
        secondary: 'border-transparent bg-gray-100 text-gray-700',
        destructive: 'border-transparent bg-red-100 text-red-700',
        danger: 'border-transparent bg-red-100 text-red-700',
        outline: 'border-gray-200 text-gray-700',
        success: 'border-transparent bg-green-100 text-green-700',
        warning: 'border-transparent bg-amber-100 text-amber-700',
        info: 'border-transparent bg-blue-100 text-blue-700',
        purple: 'border-transparent bg-violet-100 text-violet-700',
        pink: 'border-transparent bg-pink-100 text-pink-700',
        teal: 'border-transparent bg-teal-100 text-teal-700',
      },
      size: {
        default: '',
        sm: 'px-2 py-0.5 text-[10px]',
        lg: 'px-3 py-1 text-sm',
      },
    },
    defaultVariants: { variant: 'default', size: 'default' },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, size, children, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant, size }), className)} {...props}>
      {children}
    </div>
  );
}

export type BadgeVariant = NonNullable<VariantProps<typeof badgeVariants>['variant']>;

export default Badge;
export { Badge, badgeVariants };
