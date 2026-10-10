import { useEffect } from 'react';
import { BotAvatar } from 'bot-avatars';
import { ToastItem } from 'blip-toast';
import type { Toast } from 'blip-toast';
import { mount } from '../boot';
import { site } from '../lib/site-config';

/* The 1200×630 social card. Built from the site's own pieces — fonts,
 * tokens, the real Blip and a real ToastItem — so it never drifts from the
 * page. scripts/generate-og.mjs captures it with a headless browser. */

const card: Toast = {
  id: 'og',
  options: {
    id: 'og',
    title: 'Changes saved',
    description: 'Your profile is up to date.',
    variant: 'success',
    duration: Infinity,
    showTimestamp: false,
  },
  dismiss: () => {},
  update: () => {},
};

function OgCard() {
  useEffect(() => {
    // Signals the capture script that fonts are in and the frame is final.
    void document.fonts.ready.then(() => {
      document.body.dataset.ready = 'true';
    });
  }, []);

  return (
    <div className="relative flex h-[630px] w-[1200px] overflow-hidden bg-fog text-ink">
      <div className="flex w-[660px] flex-col px-[72px] py-[64px]">
        <span className="inline-flex items-baseline font-display text-[34px] font-semibold tracking-tight">
          blip
          <span className="blip-dot ml-[0.08em]" />
        </span>

        <h1 className="mt-auto font-display text-[56px] font-medium leading-[1.06] tracking-[-0.045em]">
          Toasts for React Native, delivered by{' '}
          <span className="whitespace-nowrap">
            Blip
            <span className="blip-dot ml-[0.06em]" />
          </span>
        </h1>

        <p className="mt-9 font-mono text-[19px] text-slate">
          <span className="text-signal-text">$</span> npm install blip-toast
        </p>
      </div>

      <div className="relative flex-1 py-[56px] pr-[56px]">
        <div className="flex h-full flex-col items-center justify-end rounded-[44px] border border-line-soft bg-paper pb-[52px]">
          <BotAvatar
            type="square"
            state="default"
            face="mouth"
            size={300}
            bowTie
            accessoryColor="#FF5A1F"
            paused
            pose={{ yaw: -0.28, pitch: -0.06 }}
          />
          <p className="mt-1 flex items-center gap-2.5 font-mono text-[15px] text-slate">
            <span className="size-2 rounded-full bg-signal" />v{site.version} · MIT
          </p>
        </div>

        {/* A real toast from the library, pinned over the stage. */}
        <div className="absolute left-[-36px] top-[92px] w-[400px] [&>div]:w-full!">
          <ToastItem toast={card} onDismiss={() => {}} theme="light" />
        </div>
      </div>
    </div>
  );
}

mount(<OgCard />);
