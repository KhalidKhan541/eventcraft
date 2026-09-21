'use client';

import { useState, useMemo, HTMLAttributes, forwardRef } from 'react';

type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  name?: string;
  src?: string | null;
  alt?: string;
  size?: AvatarSize;
  status?: 'online' | 'offline' | 'busy';
}

const sizeMap: Record<AvatarSize, { container: string; text: string; status: string }> = {
  xs: { container: 'h-6 w-6', text: 'text-[9px]', status: 'h-1.5 w-1.5 border' },
  sm: { container: 'h-8 w-8', text: 'text-xs', status: 'h-2 w-2 border-[1.5px]' },
  md: { container: 'h-10 w-10', text: 'text-sm', status: 'h-2.5 w-2.5 border-2' },
  lg: { container: 'h-12 w-12', text: 'text-base', status: 'h-3 w-3 border-2' },
  xl: { container: 'h-16 w-16', text: 'text-xl', status: 'h-3.5 w-3.5 border-2' },
};

const statusColors = {
  online: 'bg-emerald-500',
  offline: 'bg-slate-400',
  busy: 'bg-red-500',
};

const palette = [
  'bg-rose-100 text-rose-700',
  'bg-pink-100 text-pink-700',
  'bg-fuchsia-100 text-fuchsia-700',
  'bg-violet-100 text-violet-700',
  'bg-indigo-100 text-indigo-700',
  'bg-sky-100 text-sky-700',
  'bg-teal-100 text-teal-700',
  'bg-emerald-100 text-emerald-700',
  'bg-amber-100 text-amber-700',
];

function hashName(name: string): number {
  let h = 0;
  for (let i = 0; i < name.length; i++) {
    h = ((h << 5) - h + name.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
}

const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  ({ name = '', src, alt, size = 'md', status, className = '', ...props }, ref) => {
    const [imgError, setImgError] = useState(false);

    const s = sizeMap[size];
    const colorClass = useMemo(
      () => palette[hashName(name || 'evt') % palette.length],
      [name]
    );

    const showImage = src && !imgError;

    return (
      <div ref={ref} className={`relative inline-flex shrink-0 ${className}`} {...props}>
        <div
          className={`
            ${s.container} rounded-full flex items-center justify-center
            font-semibold select-none overflow-hidden
            ${showImage ? '' : colorClass}
          `}
        >
          {showImage ? (
            <img
              src={src!}
              alt={alt || name}
              className="h-full w-full object-cover"
              onError={() => setImgError(true)}
            />
          ) : (
            <span className={s.text}>{name ? getInitials(name) : '?'}</span>
          )}
        </div>

        {status && (
          <span
            className={`
              absolute bottom-0 right-0 rounded-full border-white
              dark:border-slate-900
              ${statusColors[status]}
              ${s.status}
            `}
          />
        )}
      </div>
    );
  }
);

Avatar.displayName = 'Avatar';

export { Avatar, type AvatarProps, type AvatarSize };
