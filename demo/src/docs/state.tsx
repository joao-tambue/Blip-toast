import { createContext, useContext } from 'react';
import type { ToastContainerProps } from 'blip-toast';
import { useTranslation } from 'react-i18next';
import { cn } from '../lib/cn';

export type DocsPosition = NonNullable<ToastContainerProps['position']>;
export type DocsLayout = 'default' | 'custom';

export interface DocsState {
  position: DocsPosition;
  setPosition: (position: DocsPosition) => void;
  layout: DocsLayout;
  setLayout: (layout: DocsLayout) => void;
}

export const DocsContext = createContext<DocsState | null>(null);

export function useDocs(): DocsState {
  const ctx = useContext(DocsContext);
  if (!ctx) throw new Error('useDocs must be used inside <Docs>');
  return ctx;
}

/** Untyped lookup for keys stored as data (reference tables). */
export function useLooseT() {
  const { t } = useTranslation();
  return t as unknown as (key: string, options?: Record<string, unknown>) => string;
}

const SLOTS: { position: DocsPosition; className: string }[] = [
  { position: 'top-left', className: 'left-[9%] top-[9%]' },
  { position: 'top', className: 'left-1/2 top-[9%] -translate-x-1/2' },
  { position: 'top-right', className: 'right-[9%] top-[9%]' },
  { position: 'bottom-left', className: 'bottom-[9%] left-[9%]' },
  { position: 'bottom', className: 'bottom-[9%] left-1/2 -translate-x-1/2' },
  { position: 'bottom-right', className: 'bottom-[9%] right-[9%]' },
];

/** A phone outline with a toast-shaped switch at each anchor. */
export function PositionPicker({
  value,
  onChange,
  size = 'md',
}: {
  value: DocsPosition;
  onChange: (position: DocsPosition) => void;
  size?: 'sm' | 'md';
}) {
  const { t } = useTranslation();
  return (
    <div
      role="radiogroup"
      aria-label={t('docs.preview.position')}
      className={cn(
        'relative shrink-0 rounded-[22px] border-2 border-line bg-chalk',
        size === 'sm' ? 'h-[168px] w-[96px]' : 'h-[232px] w-[132px]'
      )}
    >
      <span aria-hidden className="absolute left-1/2 top-1.5 h-1 w-6 -translate-x-1/2 rounded-full bg-line" />
      {SLOTS.map(({ position, className }) => {
        const active = value === position;
        return (
          <button
            key={position}
            type="button"
            role="radio"
            aria-checked={active}
            aria-label={t(`docs.positions.${position}`)}
            title={t(`docs.positions.${position}`)}
            onClick={() => onChange(position)}
            className={cn(
              'absolute rounded-full transition-colors',
              size === 'sm' ? 'h-2.5 w-6' : 'h-3 w-8',
              active ? 'bg-signal' : 'bg-line hover:bg-slate/50',
              className
            )}
          />
        );
      })}
    </div>
  );
}

export function Segmented<T extends string>({
  value,
  options,
  onChange,
  label,
}: {
  value: T;
  options: { value: T; label: string }[];
  onChange: (value: T) => void;
  label: string;
}) {
  return (
    <div role="radiogroup" aria-label={label} className="flex rounded-full border border-line bg-chalk p-0.5">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          role="radio"
          aria-checked={value === option.value}
          onClick={() => onChange(option.value)}
          className={cn(
            'flex-1 rounded-full px-3 py-1.5 font-mono text-[11.5px] transition-colors',
            value === option.value ? 'bg-ink text-fog' : 'text-slate hover:text-ink'
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
