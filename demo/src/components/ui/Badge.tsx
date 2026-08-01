import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';

interface BadgeProps {
  children: ReactNode;
  className?: string;
  dot?: boolean;
}

export function Badge({ children, className, dot = true }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 rounded-full border border-line/80',
        'bg-surface/70 px-3.5 py-1.5 text-xs font-medium text-muted backdrop-blur',
        className
      )}
    >
      {dot && (
        <span className="relative flex size-1.5">
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-violet/60" />
          <span className="relative inline-flex size-1.5 rounded-full bg-gradient-to-br from-violet to-blue" />
        </span>
      )}
      <span className="flex items-center gap-1.5">{children}</span>
    </span>
  );
}
