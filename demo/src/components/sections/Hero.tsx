import { motion } from 'framer-motion';
import { ArrowDown, ArrowUpRight, CheckCircle2, Info, Loader2 } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { InstallTabs } from '../ui/InstallTabs';
import { site } from '../../lib/site-config';
import { useToastDemo } from '../demo/ToastDemoProvider';

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

const item = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

function HeroToastCards() {
  const { fire } = useToastDemo();
  const cards = [
    {
      kind: 'success',
      label: 'Success',
      title: 'Payment received',
      description: '$128.00 · Visa ending 4242',
      icon: <CheckCircle2 className="size-5 text-emerald-400" />,
      onClick: () => fire('success'),
    },
    {
      kind: 'info',
      label: 'Info',
      title: 'New version available',
      description: 'Blip Toast 0.1.0 just shipped.',
      icon: <Info className="size-5 text-sky-400" />,
      onClick: () => fire('info'),
    },
    {
      kind: 'loading',
      label: 'Promise',
      title: 'Saving your changes…',
      description: 'Files sync automatically.',
      icon: <Loader2 className="size-5 animate-spin text-sky-400" />,
      onClick: () => fire('loading'),
    },
  ];

  return (
    <div className="relative mx-auto w-full max-w-md">
      <div className="grid-bg mask-fade-y pointer-events-none absolute inset-0 -z-10 opacity-60" />
      {cards.map((card, i) => (
        <motion.button
          key={card.kind}
          type="button"
          onClick={card.onClick}
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            delay: 0.5 + i * 0.18,
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
          }}
          whileHover={{ y: -4, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="group relative block w-full cursor-pointer text-left"
          style={{ marginTop: i === 0 ? 0 : -56, marginLeft: i === 1 ? 28 : 0 }}
        >
          <div
            className="animate-float rounded-2xl border border-white/10 bg-[#0B0C14] p-4 shadow-card backdrop-blur"
            style={{ animationDelay: `${i * 0.7}s` }}
          >
            <div className="flex items-start gap-3">
              <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-full bg-white/5 ring-1 ring-white/10">
                {card.icon}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-semibold text-white">{card.title}</span>
                <span className="mt-0.5 block text-[13px] text-white/60">{card.description}</span>
              </span>
              <span className="flex size-7 items-center justify-center rounded-full text-white/30 transition-colors group-hover:text-white/70">
                <ArrowUpRight className="size-4" />
              </span>
            </div>
            <div className="mt-3 h-0.5 overflow-hidden rounded-full bg-white/10">
              <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-violet to-blue" />
            </div>
            <span className="absolute right-4 top-4 text-[10px] font-semibold uppercase tracking-widest text-white/25">
              {card.label}
            </span>
          </div>
        </motion.button>
      ))}
      <p className="mt-6 text-center text-xs text-muted">
        Click a card to fire a real toast{' '}
        <span className="inline-block animate-bounce text-sky">↓</span>
      </p>
    </div>
  );
}

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-32 pb-20 sm:pt-36 lg:pt-40">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-night" />
        <div className="grid-bg mask-fade-y absolute inset-0 opacity-40" />
        <div className="animate-aurora absolute -top-32 left-1/2 h-[480px] w-[720px] -translate-x-1/2 rounded-full bg-violet/25 blur-[120px]" />
        <div className="animate-aurora absolute right-[8%] top-24 h-80 w-80 rounded-full bg-blue/20 blur-[100px] [animation-delay:3s]" />
        <div className="absolute bottom-0 left-1/2 h-px w-[80%] -translate-x-1/2 bg-gradient-to-r from-transparent via-violet/40 to-transparent" />
      </div>

      <div className="mx-auto grid max-w-7xl items-center gap-16 px-4 sm:px-6 lg:grid-cols-2 lg:gap-8 lg:px-8">
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.div variants={item}>
            <Badge>
              v{site.version} · React Native &nbsp;
              <span className="text-gradient font-semibold">MIT</span>
            </Badge>
          </motion.div>

          <motion.h1
            variants={item}
            className="mt-6 font-display text-4xl font-extrabold leading-[1.08] tracking-tight text-ink sm:text-5xl lg:text-6xl"
          >
            Toasts that don&apos;t <span className="text-gradient-animated">interrupt</span> — they{' '}
            <span className="relative whitespace-nowrap">
              delight.
              <svg
                className="absolute -bottom-2 left-0 w-full"
                viewBox="0 0 120 12"
                fill="none"
                aria-hidden
                preserveAspectRatio="none"
              >
                <path
                  d="M2 9C30 3 70 2 118 7"
                  stroke="url(#hero-underline)"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="hero-underline" x1="0" y1="0" x2="120" y2="0">
                    <stop stopColor="#8B5CF6" />
                    <stop offset="1" stopColor="#3B82F6" />
                  </linearGradient>
                </defs>
              </svg>
            </span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 max-w-lg text-base leading-relaxed text-muted sm:text-lg"
          >
            {site.description}
          </motion.p>

          <motion.div variants={item} className="mt-8 flex flex-wrap items-center gap-3">
            <a href="#docs">
              <Button size="lg">
                Get started
                <ArrowUpRight className="size-5" />
              </Button>
            </a>
            <a href="#playground">
              <Button size="lg" variant="secondary">
                Try the playground
                <ArrowDown className="size-4" />
              </Button>
            </a>
          </motion.div>

          <motion.div variants={item} className="mt-10 max-w-lg">
            <InstallTabs />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="hidden lg:block"
        >
          <HeroToastCards />
        </motion.div>
      </div>
    </section>
  );
}
