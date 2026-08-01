import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { LANGUAGES } from '../../i18n';
import { cn } from '../../lib/cn';

const EASE = [0.22, 1, 0.36, 1] as const;

export function LanguageSwitcher() {
  const { i18n, t } = useTranslation();
  const current = i18n.resolvedLanguage ?? i18n.language;
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (event: MouseEvent | TouchEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('touchstart', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('touchstart', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={t('nav.languageAria')}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls="language-menu"
        className="flex size-9 cursor-pointer items-center justify-center rounded-full text-muted transition-colors duration-150 hover:bg-surface hover:text-ink"
      >
        <motion.span
          animate={{ rotate: open ? 90 : 0 }}
          transition={{ duration: 0.2, ease: EASE }}
          className="flex"
        >
          <Globe size={18} />
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            id="language-menu"
            role="menu"
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.18, ease: EASE }}
            className="absolute right-0 top-full z-50 mt-2 w-36 overflow-hidden rounded-xl border border-line/70 bg-surface p-1 shadow-card"
          >
            {LANGUAGES.map(({ code, label }) => {
              const active = current === code;
              return (
                <button
                  key={code}
                  type="button"
                  role="menuitem"
                  aria-current={active}
                  onClick={() => {
                    void i18n.changeLanguage(code);
                    setOpen(false);
                  }}
                  className={cn(
                    'flex w-full cursor-pointer items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-150',
                    active
                      ? 'bg-surface-hover text-ink'
                      : 'text-muted hover:bg-surface-hover hover:text-ink'
                  )}
                >
                  {label}
                  {active && <Check size={15} className="text-sky" aria-hidden />}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
