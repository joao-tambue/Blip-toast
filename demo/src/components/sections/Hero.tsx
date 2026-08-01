import { motion } from 'framer-motion';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { InstallTabs } from '../ui/InstallTabs';
import { site } from '../../lib/site-config';
import { PhoneMockup } from '../hero/PhoneMockup';

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

        <div className="hidden lg:block">
          <PhoneMockup />
        </div>
      </div>
    </section>
  );
}
