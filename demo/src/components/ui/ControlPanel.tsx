import { motion } from 'framer-motion';
import { Dices } from 'lucide-react';
import { useToastDemo } from '../demo/ToastDemoProvider';
import type { DemoPosition, DemoTheme } from '../../lib/demo-actions';
import { cn } from '../../lib/cn';

const POSITIONS: DemoPosition[] = [
  'top',
  'top-left',
  'top-right',
  'bottom',
  'bottom-left',
  'bottom-right',
];

const POSITION_LABELS: Record<DemoPosition, string> = {
  top: 'Top',
  'top-left': 'Top left',
  'top-right': 'Top right',
  bottom: 'Bottom',
  'bottom-left': 'Bottom left',
  'bottom-right': 'Bottom right',
};

type ToggleKey = 'richColors' | 'showTimestamp' | 'showProgress';

const TOGGLES: Array<{ key: ToggleKey; label: string; hint?: string }> = [
  { key: 'richColors', label: 'Rich colors', hint: 'Fill + border' },
  { key: 'showTimestamp', label: 'Timestamp' },
  { key: 'showProgress', label: 'Progress bar' },
];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted">{children}</p>
  );
}

export function ControlPanel() {
  const { config, updateConfig, fire } = useToastDemo();

  return (
    <div className="rounded-xl border border-line bg-night/50 p-5 backdrop-blur-sm">
      <div className="mb-5 flex items-center justify-between">
        <h3 className="font-display text-sm font-bold text-ink">Controls</h3>
        <button
          type="button"
          onClick={() => fire('default')}
          className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-3 py-1.5 text-xs font-semibold text-ink transition-colors hover:border-violet/50 hover:text-violet cursor-pointer"
        >
          <Dices className="size-3.5" />
          Random
        </button>
      </div>

      <div className="space-y-6">
        {/* Position */}
        <div>
          <SectionLabel>Position</SectionLabel>
          <div className="grid grid-cols-2 gap-2">
            {POSITIONS.map((pos) => {
              const active = config.position === pos;
              return (
                <button
                  key={pos}
                  type="button"
                  aria-pressed={active}
                  onClick={() => updateConfig({ position: pos })}
                  className={cn(
                    'relative rounded-lg border px-3 py-2 text-left text-xs font-medium transition-colors duration-150 cursor-pointer',
                    active
                      ? 'border-violet/60 bg-violet/10 text-ink'
                      : 'border-line bg-surface/40 text-muted hover:border-line hover:text-ink'
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="position-active"
                      className="absolute inset-y-1 left-1 w-1 rounded-full bg-brand"
                      transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                    />
                  )}
                  <span className="pl-2">{POSITION_LABELS[pos]}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Theme */}
        <div>
          <SectionLabel>Theme</SectionLabel>
          <div className="inline-flex rounded-lg border border-line bg-surface/40 p-1">
            {(['dark', 'light'] as DemoTheme[]).map((t) => {
              const active = config.theme === t;
              return (
                <button
                  key={t}
                  type="button"
                  aria-pressed={active}
                  onClick={() => updateConfig({ theme: t })}
                  className={cn(
                    'relative rounded-md px-4 py-1.5 text-xs font-semibold capitalize transition-colors cursor-pointer',
                    active ? 'text-white' : 'text-muted hover:text-ink'
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="theme-active"
                      className="absolute inset-0 rounded-md bg-brand shadow-glow-sm"
                      transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                    />
                  )}
                  <span className="relative z-10">{t}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Toggles */}
        <div>
          <SectionLabel>Options</SectionLabel>
          <div className="space-y-2.5">
            {TOGGLES.map(({ key, label, hint }) => {
              const checked = config[key];
              return (
                <button
                  key={key}
                  type="button"
                  role="switch"
                  aria-checked={checked}
                  onClick={() => updateConfig({ [key]: !checked })}
                  className="flex w-full items-center justify-between gap-3 rounded-lg border border-line bg-surface/40 px-3.5 py-2.5 text-left transition-colors hover:border-violet/40 cursor-pointer"
                >
                  <span>
                    <span className="block text-[13px] font-medium text-ink">{label}</span>
                    {hint && <span className="block text-[11px] text-muted">{hint}</span>}
                  </span>
                  <span
                    className={cn(
                      'relative h-5 w-9 shrink-0 rounded-full transition-colors duration-200',
                      checked ? 'bg-brand shadow-glow-sm' : 'bg-line'
                    )}
                  >
                    <span
                      className={cn(
                        'absolute top-0.5 size-4 rounded-full bg-white shadow transition-all duration-200',
                        checked ? 'left-[18px]' : 'left-0.5'
                      )}
                    />
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Duration */}
        <div>
          <div className="mb-3 flex items-center justify-between">
            <SectionLabel>Duration</SectionLabel>
            <span className="font-mono text-xs text-sky">{config.duration}ms</span>
          </div>
          <input
            type="range"
            min={1500}
            max={8000}
            step={500}
            value={config.duration}
            onChange={(e) => updateConfig({ duration: Number(e.target.value) })}
            aria-label="Toast duration"
            className="w-full cursor-pointer accent-violet"
          />
          <div className="mt-1 flex justify-between font-mono text-[10px] text-muted">
            <span>1.5s</span>
            <span>8s</span>
          </div>
        </div>

        {/* Max visible */}
        <div>
          <div className="mb-3 flex items-center justify-between">
            <SectionLabel>Max visible</SectionLabel>
            <span className="font-mono text-xs text-sky">{config.maxVisible}</span>
          </div>
          <div className="flex gap-1.5">
            {[1, 2, 3, 4, 5].map((n) => {
              const active = config.maxVisible === n;
              return (
                <button
                  key={n}
                  type="button"
                  aria-pressed={active}
                  onClick={() => updateConfig({ maxVisible: n })}
                  className={cn(
                    'h-9 flex-1 rounded-lg border text-xs font-semibold transition-colors cursor-pointer',
                    active
                      ? 'border-violet/60 bg-violet/10 text-ink'
                      : 'border-line bg-surface/40 text-muted hover:text-ink'
                  )}
                >
                  {n}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
