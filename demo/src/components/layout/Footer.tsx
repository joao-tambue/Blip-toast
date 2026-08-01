import { motion } from 'framer-motion';
import type { ComponentType } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { GithubIcon, NpmIcon, type IconProps } from '../ui/brand-icons';
import { site } from '../../lib/site-config';

type FooterLinkKey = 'github' | 'npm' | 'license' | 'changelog';
type FooterSectionKey = 'features' | 'playground' | 'docs' | 'api';

interface FooterLink {
  key: FooterLinkKey;
  href: string;
  icon?: ComponentType<IconProps>;
}

const footerLinks: FooterLink[] = [
  { key: 'github', href: site.repository, icon: GithubIcon },
  { key: 'npm', href: site.npm, icon: NpmIcon },
  { key: 'license', href: `${site.repository}/blob/main/LICENSE` },
  { key: 'changelog', href: `${site.repository}/blob/main/packages/blip-toast/CHANGELOG.md` },
];

export function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-24 border-t border-line/70">
      <div className="pointer-events-none absolute inset-x-0 -top-px mx-auto h-px w-2/3 bg-gradient-to-r from-transparent via-violet/60 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <a href="#top" className="flex items-center gap-2.5" aria-label={t('nav.homeAria')}>
              <img
                src="/blip-icon.png"
                alt=""
                width={30}
                height={30}
                className="size-[30px] rounded-lg object-cover"
              />
              <span className="font-display text-base font-extrabold tracking-tight text-ink">
                Blip<span className="text-gradient">Toast</span>
              </span>
            </a>
            <p className="mt-4 text-sm leading-relaxed text-muted">{t('meta.description')}</p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-muted">
                {t('footer.resources')}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {footerLinks.map((link) => (
                  <li key={link.key}>
                    <a
                      href={link.href}
                      target={link.href.startsWith('http') ? '_blank' : undefined}
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-muted transition-colors duration-150 hover:text-ink"
                    >
                      {link.icon && <link.icon size={14} />}
                      {t(`footer.${link.key}`)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-muted">
                {t('footer.sections')}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {(
                  [
                    ['features', '#features'],
                    ['playground', '#playground'],
                    ['docs', '#docs'],
                    ['api', '#api'],
                  ] as Array<[FooterSectionKey, string]>
                ).map(([key, href]) => (
                  <li key={href}>
                    <a
                      href={href}
                      className="text-sm text-muted transition-colors duration-150 hover:text-ink"
                    >
                      {t(`nav.${key}`)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-line/70 pt-6 text-xs text-muted sm:flex-row"
        >
          <p>{t('footer.copyright', { year, license: site.license })}</p>
          <p>
            <Trans
              i18nKey="footer.crafted"
              components={{
                heart: <span className="text-gradient font-semibold">&#10084;</span>,
                author: (
                  <a
                    href={site.author.github}
                    target="_blank"
                    rel="noreferrer"
                    className="font-medium text-ink transition-colors hover:text-sky"
                  >
                    {site.author.name}
                  </a>
                ),
              }}
            />
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
