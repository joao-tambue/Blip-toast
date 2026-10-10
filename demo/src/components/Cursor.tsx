import { useEffect, useRef, useState } from 'react';
import { MousePointer2, Pointer } from 'lucide-react';
import { cn } from '../lib/cn';

const INTERACTIVE_SELECTOR =
  "a, button, [role='button'], [role='tab'], [role='radio'], [role='option'], [role='menuitemradio'], input, textarea, select, label, summary, [data-cursor='pointer']";

type CursorState = 'default' | 'pointer' | 'hidden';

const FOLLOW = 0.45;

export function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<CursorState>('hidden');
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;
    const el = cursorRef.current;
    if (!el) return;

    const instant = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    document.documentElement.classList.add('custom-cursor');

    const target = { x: -100, y: -100 };
    const pos = { ...target };
    let frame = 0;

    const render = () => {
      pos.x += (target.x - pos.x) * (instant ? 1 : FOLLOW);
      pos.y += (target.y - pos.y) * (instant ? 1 : FOLLOW);
      el.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
      const settled = Math.abs(target.x - pos.x) < 0.1 && Math.abs(target.y - pos.y) < 0.1;
      frame = settled ? 0 : requestAnimationFrame(render);
    };

    const onMove = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      if (!frame) frame = requestAnimationFrame(render);
      setState((s) => (s === 'hidden' ? 'default' : s));
    };
    const onOver = (e: MouseEvent) => {
      const hit = (e.target as Element | null)?.closest(INTERACTIVE_SELECTOR);
      setState(hit ? 'pointer' : 'default');
    };
    const onLeave = () => setState('hidden');
    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);

    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseover', onOver);
    document.documentElement.addEventListener('mouseleave', onLeave);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);

    return () => {
      cancelAnimationFrame(frame);
      document.documentElement.classList.remove('custom-cursor');
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.documentElement.removeEventListener('mouseleave', onLeave);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
    };
  }, []);

  return (
    <>
      <svg width="0" height="0" className="absolute" aria-hidden>
        <defs>
          <linearGradient id="cursor-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF8A5C" />
            <stop offset="55%" stopColor="#FF5A1F" />
            <stop offset="100%" stopColor="#D9430F" />
          </linearGradient>
        </defs>
      </svg>

      <div
        ref={cursorRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[10000] hidden in-[.custom-cursor]:block"
        style={{ transform: 'translate3d(-100px, -100px, 0)' }}
      >
        <div
          className={cn(
            'transition-transform',
            pressed
              ? 'scale-[0.85] duration-150 ease-out'
              : 'scale-100 duration-300 ease-[cubic-bezier(0.34,1.8,0.64,1)]'
          )}
        >
          <div
            className={cn(
              'absolute transition-all duration-200',
              state === 'default' ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
            )}
          >
            <MousePointer2
              className="size-[28px] text-paper drop-shadow-[0_2px_3px_rgb(16_20_24/0.3)]"
              fill="url(#cursor-gradient)"
              strokeWidth={1.5}
            />
          </div>

          <div
            className={cn(
              'absolute -translate-x-[30%] -translate-y-[15%] transition-all duration-200',
              state === 'pointer'
                ? 'rotate-[-8deg] scale-100 opacity-100'
                : 'rotate-0 scale-50 opacity-0'
            )}
          >
            <Pointer
              className="size-[30px] text-paper drop-shadow-[0_2px_3px_rgb(16_20_24/0.3)]"
              fill="url(#cursor-gradient)"
              strokeWidth={1.5}
            />
          </div>
        </div>
      </div>
    </>
  );
}
