import { motion } from 'framer-motion';
import {
  Accessibility,
  Atom,
  Clock3,
  Layers,
  Palette,
  Sparkles,
  SwatchBook,
  Timer,
  Zap,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { SectionHeading } from '../ui/SectionHeading';
import { Card } from '../ui/Card';

const features = [
  {
    key: 'variants',
    icon: Sparkles,
    accent: 'text-sky',
    glow: 'group-hover:shadow-sky-500/30',
  },
  {
    key: 'animations',
    icon: Zap,
    accent: 'text-violet',
    glow: 'group-hover:shadow-violet-500/30',
  },
  {
    key: 'promise',
    icon: Timer,
    accent: 'text-blue',
    glow: 'group-hover:shadow-blue-500/30',
  },
  {
    key: 'positions',
    icon: Layers,
    accent: 'text-sky',
    glow: 'group-hover:shadow-sky-500/30',
  },
  {
    key: 'rich',
    icon: Clock3,
    accent: 'text-violet',
    glow: 'group-hover:shadow-violet-500/30',
  },
  {
    key: 'headless',
    icon: Atom,
    accent: 'text-blue',
    glow: 'group-hover:shadow-blue-500/30',
  },
  {
    key: 'customizable',
    icon: SwatchBook,
    accent: 'text-sky',
    glow: 'group-hover:shadow-sky-500/30',
  },
  {
    key: 'themeAware',
    icon: Palette,
    accent: 'text-violet',
    glow: 'group-hover:shadow-violet-500/30',
  },
  {
    key: 'typescript',
    icon: Accessibility,
    accent: 'text-blue',
    glow: 'group-hover:shadow-blue-500/30',
  },
] as const;

export function Features() {
  const { t } = useTranslation();

  return (
    <section id="features" className="relative py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={t('features.eyebrow')}
          title={
            <>
              {t('features.title')}{' '}
              <span className="text-gradient">{t('features.titleAccent')}</span>
            </>
          }
          description={t('features.description')}
        />

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <motion.div
              key={feature.key}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
            >
              <Card className="h-full">
                <div className="flex size-11 items-center justify-center rounded-xl border border-line bg-night/60">
                  <feature.icon className={`size-5 ${feature.accent}`} />
                </div>
                <h3 className="mt-4 font-display text-lg font-bold text-ink">
                  {t(`features.items.${feature.key}.title`)}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {t(`features.items.${feature.key}.description`)}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
