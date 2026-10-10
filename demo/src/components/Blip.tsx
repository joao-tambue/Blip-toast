import { useEffect, useState } from 'react';
import { BotAvatar } from 'bot-avatars';
import type { BotAvatarState } from 'bot-avatars';
import toast, { useToasts } from 'blip-toast';
import { useTranslation } from 'react-i18next';
import { cn } from '../lib/cn';

/* Blip is the site's courier. Its state is derived from the real toast
 * list: hopping while toasts are on screen, idle when the stack is empty,
 * and asleep after a quiet spell. Any new toast wakes it up. */

const SLEEP_AFTER_MS = 18000;

export type BlipMood = 'waiting' | 'delivering' | 'idle' | 'sleeping';

export function useBlipMood() {
  const toasts = useToasts();
  const [asleep, setAsleep] = useState(false);
  const count = toasts.length;

  useEffect(() => {
    if (count > 0) {
      setAsleep(false);
      return;
    }
    const timer = window.setTimeout(() => setAsleep(true), SLEEP_AFTER_MS);
    return () => window.clearTimeout(timer);
  }, [count]);

  const waiting = toasts.some((t) => t.options.variant === 'loading');
  const mood: BlipMood = waiting
    ? 'waiting'
    : count > 0
      ? 'delivering'
      : asleep
        ? 'sleeping'
        : 'idle';
  const state: BotAvatarState =
    mood === 'sleeping' ? 'sleeping' : mood === 'idle' ? 'default' : 'working';

  return { mood, state, count };
}

export function BlipStatus({
  mood,
  count,
  className,
}: {
  mood: BlipMood;
  count: number;
  className?: string;
}) {
  const { t } = useTranslation();
  const text =
    mood === 'delivering'
      ? t('blip.status.delivering', { count })
      : mood === 'waiting'
        ? t('blip.status.waiting')
        : mood === 'sleeping'
          ? t('blip.status.sleeping')
          : t('blip.status.idle');

  return (
    <p
      className={cn('flex items-center gap-2 font-mono text-[11.5px] text-slate', className)}
      aria-live="polite"
    >
      <span
        aria-hidden
        className={cn(
          'size-1.5 shrink-0 rounded-full',
          mood === 'sleeping' ? 'bg-slate/50' : 'bg-signal',
          (mood === 'delivering' || mood === 'waiting') && 'animate-pulse'
        )}
      />
      {text}
    </p>
  );
}

interface BlipBotProps {
  size: number;
  state: BotAvatarState;
  /** Wear the signal-orange bow tie (the hero gets it; small bots don't). */
  dressed?: boolean;
  /** Clicking Blip sends a hello toast. */
  pokeable?: boolean;
  className?: string;
}

export function BlipBot({ size, state, dressed, pokeable, className }: BlipBotProps) {
  const { t } = useTranslation();
  const bot = (
    <BotAvatar
      type="square"
      state={state}
      size={size}
      face="mouth"
      bowTie={dressed}
      accessoryColor="#FF5A1F"
      aria-hidden
    />
  );

  if (!pokeable) {
    return <div className={className}>{bot}</div>;
  }

  return (
    <button
      type="button"
      aria-label={t('blip.poke')}
      title={t('blip.poke')}
      onClick={() =>
        toast(t('blip.pokeToast'), {
          description: t('blip.pokeToastDesc'),
          preset: 'bouncy',
        })
      }
      className={cn('rounded-[28%] outline-offset-4', className)}
    >
      {bot}
    </button>
  );
}
