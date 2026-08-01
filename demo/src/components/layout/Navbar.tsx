import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Menu, Moon, Sun, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../hooks/useTheme';
import { navLinks, site } from '../../lib/site-config';
import { cn } from '../../lib/cn';
import { GithubIcon, NpmIcon } from '../ui/brand-icons';
import { Button } from '../ui/Button';
import { LanguageSwitcher } from './LanguageSwitcher';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { t } = useTranslation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => window.innerWidth >= 768 && setOpen(false);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        scrolled
          ? 'border-b border-line/70 bg-night/70 backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent'
      )}
    >
      <nav
        aria-label={t('nav.mainAria')}
        className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8"
      >
        {/* Logo */}
        <a href="#top" className="group flex items-center gap-2.5" aria-label={t('nav.homeAria')}>
          <span className="relative">
            <img
              src="/blip-icon.png"
              alt=""
              width={34}
              height={34}
              className="size-[34px] rounded-xl object-cover shadow-glow-sm ring-1 ring-white/20 transition-shadow duration-200 group-hover:shadow-glow"
            />
            <span className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-br from-violet/0 to-blue/0" />
          </span>
          <span className="font-display text-lg font-extrabold tracking-tight text-ink">
            Blip
            <span className="text-gradient">Toast</span>
          </span>
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="rounded-full px-3.5 py-2 text-sm font-medium text-muted transition-colors duration-150 hover:text-ink"
              >
                {t(`nav.${link.key}`)}
              </a>
            </li>
          ))}
        </ul>

        {/* Actions */}
        <div className="flex items-center gap-1.5">
          <LanguageSwitcher />
          <a
            href={site.npm}
            target="_blank"
            rel="noreferrer"
            aria-label={t('nav.npmAria')}
            className="flex size-9 items-center justify-center rounded-full text-muted transition-colors duration-150 hover:bg-surface hover:text-ink"
          >
            <NpmIcon size={18} />
          </a>
          <a
            href={site.repository}
            target="_blank"
            rel="noreferrer"
            aria-label={t('nav.githubAria')}
            className="flex size-9 items-center justify-center rounded-full text-muted transition-colors duration-150 hover:bg-surface hover:text-ink"
          >
            <GithubIcon size={19} />
          </a>

          <button
            type="button"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? t('nav.lightAria') : t('nav.darkAria')}
            className="flex size-9 items-center justify-center rounded-full text-muted transition-colors duration-150 hover:bg-surface hover:text-ink cursor-pointer"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={theme}
                initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 90, scale: 0.6 }}
                transition={{ duration: 0.18 }}
                className="flex"
              >
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              </motion.span>
            </AnimatePresence>
          </button>

          <a href="#docs" className="hidden sm:block">
            <Button size="sm" className="ml-1">
              {t('nav.getStarted')}
              <ArrowUpRight className="size-4" />
            </Button>
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? t('nav.closeMenuAria') : t('nav.openMenuAria')}
            aria-expanded={open}
            className="flex size-9 items-center justify-center rounded-full text-ink transition-colors duration-150 hover:bg-surface md:hidden cursor-pointer"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-b border-line/70 bg-night/95 backdrop-blur-xl md:hidden"
          >
            <ul className="space-y-1 px-4 py-4">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
                >
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-xl px-4 py-3 text-base font-medium text-ink transition-colors hover:bg-surface"
                  >
                    {t(`nav.${link.key}`)}
                  </a>
                </motion.li>
              ))}
              <motion.li
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 * navLinks.length }}
                className="pt-2"
              >
                <a href="#docs" onClick={() => setOpen(false)} className="block">
                  <Button className="w-full">{t('nav.getStarted')}</Button>
                </a>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
