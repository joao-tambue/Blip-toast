import { motion } from 'framer-motion';
import {
  BellRing,
  CloudUpload,
  CheckCheck,
  CircleAlert,
  Loader2,
  MousePointerClick,
  Pencil,
  Rocket,
  Sparkle,
  TriangleAlert,
  Undo2,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { SectionHeading } from '../ui/SectionHeading';
import { ControlPanel } from '../ui/ControlPanel';
import { useToastDemo } from '../demo/ToastDemoProvider';
import type { ToastKind } from '../../lib/demo-actions';
import { cn } from '../../lib/cn';

interface Trigger {
  kind: ToastKind;
  icon: React.ComponentType<{ className?: string }>;
}

const triggers: Trigger[] = [
  { kind: 'default', icon: BellRing },
  { kind: 'success', icon: CheckCheck },
  { kind: 'error', icon: CircleAlert },
  { kind: 'warning', icon: TriangleAlert },
  { kind: 'info', icon: Sparkle },
  { kind: 'loading', icon: Loader2 },
  { kind: 'action', icon: Undo2 },
  { kind: 'description', icon: MousePointerClick },
  { kind: 'icon', icon: Rocket },
  { kind: 'custom', icon: CloudUpload },
  { kind: 'update', icon: Pencil },
];

export function Playground() {
  const { fire } = useToastDemo();
  const { t } = useTranslation();

  return (
    <section id="playground" className="relative py-24">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[420px] w-[640px] -translate-x-1/2 rounded-full bg-violet/10 blur-[140px]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={t('playground.eyebrow')}
          title={
            <>
              {t('playground.title')}{' '}
              <span className="text-gradient">{t('playground.titleAccent')}</span>
            </>
          }
          description={t('playground.description')}
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-[1fr_360px]">
          {/* Trigger wall */}
          <div className="rounded-xl border border-line bg-night/50 p-5 backdrop-blur-sm">
            <h3 className="font-display text-sm font-bold text-ink">{t('playground.triggers')}</h3>
            <p className="mt-1 text-xs text-muted">
              {t('playground.triggersHintStart')}{' '}
              <span className="font-semibold text-ink">{t('playground.configuredPosition')}</span>{' '}
              {t('playground.triggersHintEnd')}
            </p>

            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {triggers.map((trigger, i) => (
                <motion.button
                  key={trigger.kind}
                  type="button"
                  onClick={() => fire(trigger.kind)}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.04 }}
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.96 }}
                  className={cn(
                    'group flex flex-col items-center justify-center gap-2 rounded-xl border border-line',
                    'bg-surface/40 px-4 py-5 text-center transition-colors duration-150',
                    'hover:border-violet/50 hover:bg-surface hover:shadow-glow-sm cursor-pointer'
                  )}
                >
                  <span className="flex size-9 items-center justify-center rounded-full bg-night ring-1 ring-line transition-colors group-hover:ring-violet/50">
                    <trigger.icon className="size-4 text-muted transition-colors group-hover:text-violet" />
                  </span>
                  <span className="text-xs font-medium text-muted transition-colors group-hover:text-ink">
                    {t(`playground.triggerLabels.${trigger.kind}`)}
                  </span>
                </motion.button>
              ))}
            </div>
          </div>

          <ControlPanel />
        </div>
      </div>
    </section>
  );
}
