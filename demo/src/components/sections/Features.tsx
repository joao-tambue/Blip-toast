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
import { SectionHeading } from '../ui/SectionHeading';
import { Card } from '../ui/Card';

const features = [
  {
    icon: Sparkles,
    title: 'Five variants',
    description:
      'Default, success, error, warning and info — each with its own icon, tint and personality.',
    accent: 'text-sky',
    glow: 'group-hover:shadow-sky-500/30',
  },
  {
    icon: Zap,
    title: 'Springy animations',
    description:
      'Smooth, physics-driven entrances and exits. Pick a preset — smooth, bouncy, subtle, snappy — or tune the spring yourself.',
    accent: 'text-violet',
    glow: 'group-hover:shadow-violet-500/30',
  },
  {
    icon: Timer,
    title: 'Promise support',
    description:
      'toast.promise() morphs a loading toast into success or error the moment your async work settles.',
    accent: 'text-blue',
    glow: 'group-hover:shadow-blue-500/30',
  },
  {
    icon: Layers,
    title: 'Six positions',
    description:
      'Anchored anywhere: top, bottom, or any of the four corners. Even per-toast with position overrides.',
    accent: 'text-sky',
    glow: 'group-hover:shadow-sky-500/30',
  },
  {
    icon: Clock3,
    title: 'Rich by default',
    description:
      'Timestamps and an optional animated progress bar keep toasts informative without stealing focus.',
    accent: 'text-violet',
    glow: 'group-hover:shadow-violet-500/30',
  },
  {
    icon: Atom,
    title: 'Headless API',
    description:
      'Prefer your own UI? useToasts() exposes the live list so you can render everything yourself.',
    accent: 'text-blue',
    glow: 'group-hover:shadow-blue-500/30',
  },
  {
    icon: SwatchBook,
    title: 'Fully customizable',
    description:
      'Class names, custom fills, borders, icons, action buttons — every pixel is yours to style.',
    accent: 'text-sky',
    glow: 'group-hover:shadow-sky-500/30',
  },
  {
    icon: Palette,
    title: 'Theme aware',
    description:
      'Light, dark and system themes, with per-toast overrides. Follows the device, follows you.',
    accent: 'text-violet',
    glow: 'group-hover:shadow-violet-500/30',
  },
  {
    icon: Accessibility,
    title: 'TypeScript first',
    description:
      'Tiny, fully typed API with autocomplete for every option. No config, no providers, no ceremony.',
    accent: 'text-blue',
    glow: 'group-hover:shadow-blue-500/30',
  },
];

export function Features() {
  return (
    <section id="features" className="relative py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Features"
          title={
            <>
              Small API, <span className="text-gradient">big impact</span>
            </>
          }
          description="Everything you need for delightful notifications — and nothing you don't. Zero providers, zero config, just toasts."
        />

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
            >
              <Card className="h-full">
                <div className="flex size-11 items-center justify-center rounded-xl border border-line bg-night/60">
                  <feature.icon className={`size-5 ${feature.accent}`} />
                </div>
                <h3 className="mt-4 font-display text-lg font-bold text-ink">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{feature.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
