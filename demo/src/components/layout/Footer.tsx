import { motion } from 'framer-motion';
import type { ComponentType } from 'react';
import { GithubIcon, NpmIcon, type IconProps } from '../ui/brand-icons';
import { site } from '../../lib/site-config';

interface FooterLink {
  label: string;
  href: string;
  icon?: ComponentType<IconProps>;
}

const footerLinks: FooterLink[] = [
  { label: 'GitHub', href: site.repository, icon: GithubIcon },
  { label: 'npm', href: site.npm, icon: NpmIcon },
  { label: 'License (MIT)', href: `${site.repository}/blob/main/LICENSE` },
  { label: 'Changelog', href: `${site.repository}/blob/main/packages/blip-toast/CHANGELOG.md` },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-24 border-t border-line/70">
      <div className="pointer-events-none absolute inset-x-0 -top-px mx-auto h-px w-2/3 bg-gradient-to-r from-transparent via-violet/60 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <a href="#top" className="flex items-center gap-2.5" aria-label="Blip Toast home">
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
            <p className="mt-4 text-sm leading-relaxed text-muted">{site.description}</p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-muted">
                Resources
              </h3>
              <ul className="mt-4 space-y-2.5">
                {footerLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target={link.href.startsWith('http') ? '_blank' : undefined}
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-muted transition-colors duration-150 hover:text-ink"
                    >
                      {link.icon && <link.icon size={14} />}
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-muted">
                Sections
              </h3>
              <ul className="mt-4 space-y-2.5">
                {[
                  ['Features', '#features'],
                  ['Playground', '#playground'],
                  ['Installation', '#docs'],
                  ['API reference', '#api'],
                ].map(([label, href]) => (
                  <li key={href}>
                    <a
                      href={href}
                      className="text-sm text-muted transition-colors duration-150 hover:text-ink"
                    >
                      {label}
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
          <p>
            © {year} Blip Toast · Released under the {site.license} License.
          </p>
          <p>
            Crafted with <span className="text-gradient font-semibold">&#10084;</span> by{' '}
            <a
              href={site.author.github}
              target="_blank"
              rel="noreferrer"
              className="font-medium text-ink transition-colors hover:text-sky"
            >
              {site.author.name}
            </a>
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
