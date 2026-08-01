import { motion } from 'framer-motion';
import { ArrowUpRight, BatteryFull, CheckCircle2, Info, Loader2, Signal, Wifi } from 'lucide-react';
import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { useToastDemo } from '../demo/ToastDemoProvider';

const EASE = [0.22, 1, 0.36, 1] as const;

interface FloatingCard {
  kind: 'success' | 'info' | 'loading';
  label: string;
  title: string;
  description: string;
  icon: ReactNode;
  positionClass: string;
  rotate: number;
  fromX: number;
  fromY: number;
  fromRotate: number;
  zClass: string;
}

const CARDS: FloatingCard[] = [
  {
    kind: 'success',
    label: 'Success',
    title: 'Payment received',
    description: '$128.00 · Visa ending 4242',
    icon: <CheckCircle2 className="size-3 text-emerald-400" />,
    positionClass: '-top-9 -right-[64px]',
    rotate: -5,
    fromX: 44,
    fromY: -36,
    fromRotate: 10,
    zClass: 'z-20',
  },
  {
    kind: 'info',
    label: 'Info',
    title: 'New version available',
    description: 'Blip Toast 0.1.0 just shipped.',
    icon: <Info className="size-3 text-sky-400" />,
    positionClass: 'top-40 -left-[84px]',
    rotate: 4,
    fromX: -52,
    fromY: 0,
    fromRotate: -10,
    zClass: 'z-30',
  },
  {
    kind: 'loading',
    label: 'Promise',
    title: 'Saving changes…',
    description: 'Files sync automatically.',
    icon: <Loader2 className="size-3 animate-spin text-sky-400" />,
    positionClass: 'bottom-0 right-0',
    rotate: -2,
    fromX: 28,
    fromY: 44,
    fromRotate: 9,
    zClass: 'z-20',
  },
];

function FloatingToastCard({
  card,
  index,
  onFire,
}: {
  card: FloatingCard;
  index: number;
  onFire: (kind: FloatingCard['kind']) => void;
}) {
  return (
    <motion.button
      type="button"
      aria-label={`Fire ${card.title} toast`}
      onClick={() => onFire(card.kind)}
      initial={{ opacity: 0, x: card.fromX, y: card.fromY, rotate: card.fromRotate }}
      animate={{ opacity: 1, x: 0, y: 0, rotate: card.rotate }}
      transition={{ delay: 0.65 + index * 0.15, duration: 0.7, ease: EASE }}
      whileHover={{ y: -4, scale: 1.03, rotate: 0 }}
      whileTap={{ scale: 0.97 }}
      className={cn(
        'group absolute block w-[200px] cursor-pointer text-left',
        card.positionClass,
        card.zClass
      )}
    >
      <div
        className="animate-float rounded-2xl border border-white/10 bg-[#0B0C14] p-3.5 shadow-card backdrop-blur"
        style={{ animationDelay: `${index * 0.7 + 0.4}s` }}
      >
        <div className="flex items-start gap-2.5">
          <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-white/5 ring-1 ring-white/10">
            {card.icon}
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-[10px] font-semibold leading-tight text-white">
              {card.title}
            </span>
            <span className="mt-0.5 block text-[10px] text-white/60">{card.description}</span>
          </span>
          <span className="flex size-6 shrink-0 items-center justify-center rounded-full text-white/30 transition-colors group-hover:text-white/70">
            <ArrowUpRight className="size-3.5" />
          </span>
        </div>
        <div className="mt-2.5 h-0.5 overflow-hidden rounded-full bg-white/10">
          <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-violet to-blue" />
        </div>
        <span className="absolute right-3 top-3 text-[7px] font-semibold uppercase tracking-widest text-white/25">
          {card.label}
        </span>
      </div>
    </motion.button>
  );
}

function PhoneFrame() {
  return (
    <div className="relative h-full w-full">
      <div className="absolute inset-0 rounded-[3rem] bg-gradient-to-b from-[#24263c] via-[#15162a] to-[#0b0c14] p-[7px] shadow-phone">
        <div className="relative h-full w-full overflow-hidden rounded-[2.5rem] bg-gradient-to-b from-[#0B0C14] to-[#12132A]">
          <div className="pointer-events-none absolute -top-16 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-violet/20 blur-[60px]" />
          <div className="flex items-center justify-between px-6 pt-3.5 text-white/50">
            <span className="font-mono text-[10px] font-medium">9:41</span>
            <span className="flex items-center gap-1.5" aria-hidden>
              <Signal className="size-3" />
              <Wifi className="size-3" />
              <BatteryFull className="size-3" />
            </span>
          </div>
          <div className="mt-10 flex flex-col items-center">
            <img
              src="/blip-icon.png"
              alt=""
              width={44}
              height={44}
              className="size-[44px] rounded-xl object-cover shadow-glow-sm ring-1 ring-white/20 transition-shadow duration-200 group-hover:shadow-glow"
            />
            <span className="mt-3 font-display text-sm font-semibold text-white/80">
              Blip Toast
            </span>
          </div>
          <div className="mx-auto mt-10 w-[78%] space-y-3">
            <div className="h-2 rounded-full bg-white/10" />
            <div className="h-2 w-3/4 rounded-full bg-white/[0.07]" />
            <div className="h-2 w-5/6 rounded-full bg-white/[0.07]" />
            <div className="mt-5 h-16 rounded-xl border border-white/[0.06] bg-white/[0.03]" />
            <div className="h-2 w-2/3 rounded-full bg-white/10" />
            <div className="h-2 w-1/2 rounded-full bg-white/[0.07]" />
          </div>
        </div>

        <div className="absolute left-1/2 top-2.5 z-20 h-[22px] w-[84px] -translate-x-1/2 rounded-full bg-black/90 shadow-[inset_0_0_4px_rgba(255,255,255,0.06)]" />
        <div className="absolute -left-[3px] top-24 h-7 w-[3px] rounded-l bg-white/20" />
        <div className="absolute -right-[3px] top-16 h-9 w-[3px] rounded-r bg-white/20" />
        <div className="absolute -right-[3px] top-28 h-9 w-[3px] rounded-r bg-white/20" />
        <div className="absolute -right-[3px] top-40 h-9 w-[3px] rounded-r bg-white/20" />
      </div>
    </div>
  );
}

export function PhoneMockup() {
  const { fire } = useToastDemo();

  return (
    <div className="relative mx-auto w-fit scale-90 xl:scale-100">
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet/25 blur-[110px]" />
      <div className="relative h-[512px] w-[248px]">
        <motion.div
          initial={{ opacity: 0, scale: 0.92, rotateY: -3, rotateX: 0, rotate: 0 }}
          animate={{ opacity: 1, scale: 1, rotateY: -10, rotateX: 4, rotate: -2 }}
          transition={{ duration: 1.1, delay: 0.35, ease: EASE }}
          style={{ transformPerspective: 1200 }}
          className="absolute inset-0 z-10"
        >
          <PhoneFrame />
        </motion.div>

        {CARDS.map((card, index) => (
          <FloatingToastCard key={card.kind} card={card} index={index} onFire={fire} />
        ))}
      </div>
      <p className="mt-24 text-center text-xs text-muted">
        Click a card to fire a real toast{' '}
        <span className="inline-block animate-bounce text-sky">↓</span>
      </p>
    </div>
  );
}
