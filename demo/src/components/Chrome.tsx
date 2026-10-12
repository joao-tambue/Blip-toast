import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Check, Languages, Moon, Sun } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { LANGUAGES } from '../i18n';
import { cn } from '../lib/cn';
import { routes, site } from '../lib/site-config';
import { toggleTheme, useSiteTheme } from '../lib/theme-store';
import { GithubIcon } from './icons';

export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn('inline-flex items-baseline font-display font-semibold tracking-tight', className)}>
      blip
      <span className="blip-dot ml-[0.08em]" aria-hidden />
    </span>
  );
}

const iconButton =
  'flex size-9 items-center justify-center rounded-full text-slate transition-colors hover:bg-ink/[0.06] hover:text-ink';

export function ThemeToggle() {
  const { t } = useTranslation();
  const theme = useSiteTheme();
  const label = theme === 'dark' ? t('nav.toLight') : t('nav.toDark');
  return (
    <button type="button" onClick={toggleTheme} aria-label={label} title={label} className={iconButton}>
      {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
    </button>
  );
}

export function LanguageSwitcher() {
  const { i18n, t } = useTranslation();
  const current = i18n.resolvedLanguage ?? i18n.language;
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (event: PointerEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('pointerdown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={t('nav.language')}
        aria-haspopup="menu"
        aria-expanded={open}
        className={cn(iconButton, 'w-auto gap-1.5 px-2.5 font-mono text-[11px] uppercase')}
      >
        <Languages size={16} />
        {current}
      </button>
      {open && (
        <div
          role="menu"
          className="absolute right-0 top-full z-50 mt-2 w-40 rounded-xl border border-line bg-paper p-1 shadow-[0_12px_32px_-12px_rgb(0_0_0/0.25)]"
        >
          {LANGUAGES.map(({ code, label }) => {
            const active = current === code;
            return (
              <button
                key={code}
                type="button"
                role="menuitemradio"
                aria-checked={active}
                onClick={() => {
                  void i18n.changeLanguage(code);
                  setOpen(false);
                }}
                className={cn(
                  'flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors',
                  active ? 'text-ink' : 'text-slate hover:bg-chalk hover:text-ink'
                )}
              >
                {label}
                {active && <Check size={15} className="text-signal-text" aria-hidden />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

interface HeaderProps {
  page: 'home' | 'docs';
  start?: ReactNode;
  actions?: ReactNode;
  className?: string;
}

export function Header({ page, start, actions, className }: HeaderProps) {
  const { t } = useTranslation();
  return (
    <header className={cn('z-40', className)}>
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-3 focus:z-50 focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-fog"
      >
        {t('nav.skip')}
      </a>
      <div className="mx-auto flex h-16 max-w-[88rem] items-center gap-3 px-4 sm:px-6 lg:px-8">
        {start}
        <a href={routes.home} aria-label={t('nav.homeAria')} className="rounded-md text-[22px]">
          <Wordmark />
        </a>
        <nav aria-label={t('nav.mainAria')} className="ml-auto flex items-center gap-1">
          {actions}
          <a
            href={routes.docs}
            aria-current={page === 'docs' ? 'page' : undefined}
            className={cn(
              'rounded-full px-3 py-1.5 text-sm font-medium transition-colors',
              page === 'docs' ? 'text-ink' : 'text-slate hover:text-ink'
            )}
          >
            {t('nav.docs')}
          </a>
          <a
            href={site.repository}
            target="_blank"
            rel="noreferrer"
            aria-label={t('nav.github')}
            title={t('nav.github')}
            className={iconButton}
          >
            <GithubIcon size={17} />
          </a>
          <LanguageSwitcher />
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}

export function Footer({ className }: { className?: string }) {
  const { t } = useTranslation();
  const links = [
    { href: routes.docs, label: t('nav.docs') },
    { href: site.repository, label: t('nav.github'), external: true },
    { href: site.npm, label: t('nav.npm'), external: true },
    { href: site.changelog, label: t('nav.changelog'), external: true },
  ];
  return (
    <footer className={cn('border-t border-line', className)}>
      <div className="mx-auto flex max-w-[88rem] flex-col gap-5 px-4 py-8 text-sm text-slate sm:px-6 md:flex-row md:items-center lg:px-8">
        <div className="flex items-center gap-3">
          <Wordmark className="text-base text-ink" />
          <span className="font-mono text-xs">{t('footer.version', { version: site.version })}</span>
        </div>
        <ul className="flex flex-wrap gap-x-5 gap-y-2 md:ml-8">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                {...(link.external ? { target: '_blank', rel: 'noreferrer' } : {})}
                className="transition-colors hover:text-ink"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <p className="md:ml-auto">
          {t('footer.license')} ·{' '}
          <a href={site.author.github} target="_blank" rel="noreferrer" className="hover:text-ink">
            {t('footer.madeBy', { name: site.author.name })}
          </a>
        </p>
      </div>
    </footer>
  );
}
