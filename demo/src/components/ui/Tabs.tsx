import { useId } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/cn';

export interface TabItem<T extends string> {
  value: T;
  label: string;
}

interface TabsProps<T extends string> {
  tabs: readonly TabItem<T>[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
  'aria-label'?: string;
  variant?: 'default' | 'dark';
}

export function Tabs<T extends string>({
  tabs,
  value,
  onChange,
  className,
  'aria-label': ariaLabel,
  variant = 'default',
}: TabsProps<T>) {
  const baseId = useId();

  const containerClass =
    variant === 'dark' ? 'border-white/10 bg-white/[0.06]' : 'border-line bg-surface/70';

  const idleClass =
    variant === 'dark' ? 'text-slate-400 hover:text-white' : 'text-muted hover:text-ink';

  return (
    <div
      role="tablist"
      aria-label={ariaLabel ?? 'Tabs'}
      className={cn(
        'inline-flex items-center gap-1 rounded-full border p-1 backdrop-blur',
        containerClass,
        className
      )}
    >
      {tabs.map((tab) => {
        const selected = tab.value === value;
        return (
          <button
            key={tab.value}
            role="tab"
            id={`${baseId}-tab-${tab.value}`}
            aria-selected={selected}
            aria-controls={`${baseId}-panel-${tab.value}`}
            onClick={() => onChange(tab.value)}
            className={cn(
              'relative rounded-full px-4 py-1.5 font-mono text-xs font-medium transition-colors duration-150 cursor-pointer',
              selected ? 'text-white' : idleClass
            )}
          >
            {selected && (
              <motion.span
                layoutId={`${baseId}-active`}
                className="absolute inset-0 rounded-full bg-brand shadow-glow-sm"
                transition={{ type: 'spring', stiffness: 400, damping: 32 }}
              />
            )}
            <span className="relative z-10">{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}
