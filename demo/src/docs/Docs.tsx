import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { CornerDownLeft, Menu, Search, X } from 'lucide-react';
import { ToastContainer } from 'blip-toast';
import { useTranslation } from 'react-i18next';
import { BlipBot, BlipStatus, useBlipMood } from '../components/Blip';
import { Footer, Header } from '../components/Chrome';
import { Cursor } from '../components/Cursor';
import { DemoCustomToast } from '../lib/custom-toast-layout';
import { cn } from '../lib/cn';
import { site } from '../lib/site-config';
import { useSiteTheme } from '../lib/theme-store';
import { NAV, SEARCH_TERMS, SECTION_IDS, type SectionId } from './nav';
import { DocSection } from './sections';
import {
  DocsContext,
  PositionPicker,
  Segmented,
  useDocs,
  useLooseT,
  type DocsLayout,
  type DocsPosition,
} from './state';

/* ------------------------------------------------------------------ */
/* Scrollspy                                                           */
/* ------------------------------------------------------------------ */

/** One Blip per page: the rail on wide screens, the intro otherwise. */
function useWideScreen(): boolean {
  const query = '(min-width: 80rem)';
  const [wide, setWide] = useState(() => window.matchMedia(query).matches);
  useEffect(() => {
    const media = window.matchMedia(query);
    const onChange = () => setWide(media.matches);
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);
  return wide;
}

function useActiveSection(): SectionId {
  const [active, setActive] = useState<SectionId>(SECTION_IDS[0]);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const sections = document.querySelectorAll<HTMLElement>('[data-section]');
      let current = sections[0]?.id;
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= 140) current = section.id;
        else break;
      }
      // At the very bottom, the last section wins even if it is short.
      if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 4) {
        current = sections[sections.length - 1]?.id;
      }
      if (current) setActive(current as SectionId);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return active;
}

/* ------------------------------------------------------------------ */
/* Sidebar                                                             */
/* ------------------------------------------------------------------ */

function SidebarNav({ active, onNavigate }: { active: SectionId; onNavigate?: () => void }) {
  const t = useLooseT();
  return (
    <nav aria-label={t('docs.title')} className="space-y-7">
      {NAV.map(({ group, items }) => (
        <div key={group}>
          <p className="mb-2 px-3 text-[13px] font-semibold text-ink">{t(`docs.groups.${group}`)}</p>
          <ul className="space-y-px">
            {items.map((id) => {
              const isActive = id === active;
              return (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    onClick={onNavigate}
                    aria-current={isActive ? 'location' : undefined}
                    className={cn(
                      'flex items-center gap-2.5 rounded-lg px-3 py-[7px] text-[14px] transition-colors',
                      id.startsWith('api-') && 'font-mono text-[13px]',
                      isActive ? 'bg-paper text-ink' : 'text-slate hover:text-ink'
                    )}
                  >
                    <span
                      key={isActive ? `on-${id}` : 'off'}
                      aria-hidden
                      className={cn(
                        'size-1.5 shrink-0 rounded-full transition-colors',
                        isActive ? 'animate-blip bg-signal' : 'bg-transparent'
                      )}
                    />
                    {t(`docs.s.${id}.title`)}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}

function MobileNav({
  open,
  onClose,
  active,
}: {
  open: boolean;
  onClose: () => void;
  active: SectionId;
}) {
  const { t } = useTranslation();
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => event.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label={t('docs.title')}>
      <button
        type="button"
        aria-label={t('nav.closeMenu')}
        onClick={onClose}
        className="absolute inset-0 bg-ink/30"
      />
      <div className="absolute inset-y-0 left-0 flex w-[min(20rem,86vw)] flex-col bg-fog shadow-2xl">
        <div className="flex h-16 items-center justify-between border-b border-line px-4">
          <span className="font-display text-sm font-medium">{t('docs.title')}</span>
          <button
            type="button"
            onClick={onClose}
            aria-label={t('nav.closeMenu')}
            className="flex size-9 items-center justify-center rounded-full text-slate hover:text-ink"
          >
            <X size={18} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-2 py-6">
          <SidebarNav active={active} onNavigate={onClose} />
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Search                                                              */
/* ------------------------------------------------------------------ */

function SearchDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const t = useLooseT();
  const [query, setQuery] = useState('');
  const [cursor, setCursor] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const entries = useMemo(
    () =>
      NAV.flatMap(({ group, items }) =>
        items.map((id) => ({
          id,
          title: t(`docs.s.${id}.title`),
          group: t(`docs.groups.${group}`),
          haystack: `${t(`docs.s.${id}.title`)} ${t(`docs.groups.${group}`)} ${id} ${SEARCH_TERMS[id] ?? ''}`.toLowerCase(),
        }))
      ),
    [t]
  );

  const results = useMemo(() => {
    const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
    if (terms.length === 0) return entries;
    return entries.filter((entry) => terms.every((term) => entry.haystack.includes(term)));
  }, [entries, query]);

  useEffect(() => {
    if (open) {
      setQuery('');
      setCursor(0);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  useEffect(() => setCursor(0), [query]);

  if (!open) return null;

  const go = (id: SectionId) => {
    onClose();
    window.location.hash = id;
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center px-4 pt-[12vh]" role="dialog" aria-modal="true" aria-label={t('docs.search')}>
      <button type="button" aria-label={t('nav.closeMenu')} onClick={onClose} className="absolute inset-0 bg-ink/30" />
      <div className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-line bg-paper shadow-[0_24px_64px_-16px_rgb(0_0_0/0.35)]">
        <div className="flex items-center gap-3 border-b border-line px-4">
          <Search size={17} className="shrink-0 text-slate" aria-hidden />
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Escape') onClose();
              if (event.key === 'ArrowDown') {
                event.preventDefault();
                setCursor((c) => Math.min(c + 1, results.length - 1));
              }
              if (event.key === 'ArrowUp') {
                event.preventDefault();
                setCursor((c) => Math.max(c - 1, 0));
              }
              if (event.key === 'Enter' && results[cursor]) go(results[cursor].id);
            }}
            placeholder={t('docs.searchPlaceholder')}
            aria-label={t('docs.searchPlaceholder')}
            role="combobox"
            aria-expanded="true"
            aria-controls="docs-search-results"
            aria-activedescendant={results[cursor] ? `search-${results[cursor].id}` : undefined}
            className="h-14 flex-1 bg-transparent text-[15px] text-ink outline-none placeholder:text-slate"
          />
          <kbd className="rounded-md border border-line px-1.5 py-0.5 font-mono text-[10.5px] text-slate">esc</kbd>
        </div>
        <ul id="docs-search-results" role="listbox" className="max-h-[50vh] overflow-y-auto p-2">
          {results.length === 0 && (
            <li className="px-3 py-6 text-center text-sm text-slate">
              {t('docs.searchEmpty', { query })}
            </li>
          )}
          {results.map((entry, index) => (
            <li
              key={entry.id}
              id={`search-${entry.id}`}
              role="option"
              aria-selected={index === cursor}
              onMouseEnter={() => setCursor(index)}
              onClick={() => go(entry.id)}
              className={cn(
                'flex cursor-pointer items-center justify-between gap-3 rounded-lg px-3 py-2.5',
                index === cursor ? 'bg-chalk' : ''
              )}
            >
              <span className="min-w-0">
                <span className="block truncate text-[14.5px] text-ink">{entry.title}</span>
                <span className="block text-xs text-slate">{entry.group}</span>
              </span>
              {index === cursor && <CornerDownLeft size={14} className="shrink-0 text-slate" aria-hidden />}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function SearchButton({ onOpen }: { onOpen: () => void }) {
  const { t } = useTranslation();
  const isMac = typeof navigator !== 'undefined' && /Mac|iP(hone|ad)/.test(navigator.platform);
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={t('docs.search')}
      className="mr-1 flex h-9 items-center gap-2 rounded-full border border-line bg-paper px-3 text-sm text-slate transition-colors hover:border-ink/30 hover:text-ink sm:w-56"
    >
      <Search size={15} aria-hidden />
      <span className="hidden sm:inline">{t('docs.search')}</span>
      <kbd className="ml-auto hidden rounded border border-line px-1.5 font-mono text-[10.5px] sm:inline">
        {isMac ? '⌘K' : 'Ctrl K'}
      </kbd>
    </button>
  );
}

/* ------------------------------------------------------------------ */
/* Preview rail                                                        */
/* ------------------------------------------------------------------ */

function PreviewRail() {
  const { t } = useTranslation();
  const { position, setPosition, layout, setLayout } = useDocs();
  const { mood, state, count } = useBlipMood();
  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center rounded-[28px] border border-line-soft bg-paper px-4 pb-5 pt-6">
        <BlipBot size={112} state={state} pokeable />
        <BlipStatus mood={mood} count={count} className="mt-1 text-center" />
      </div>
      <div>
        <p className="text-[13px] font-semibold">{t('docs.previewTitle')}</p>
        <p className="mt-1 text-[13px] leading-relaxed text-slate">{t('docs.previewBody')}</p>
      </div>
      <div>
        <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.08em] text-slate">
          {t('docs.preview.position')}
        </p>
        <div className="flex items-center gap-4">
          <PositionPicker value={position} onChange={setPosition} size="sm" />
          <code className="font-mono text-[12px] text-ink">{`'${position}'`}</code>
        </div>
      </div>
      <div>
        <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.08em] text-slate">
          {t('docs.preview.layout')}
        </p>
        <Segmented
          label={t('docs.preview.layout')}
          value={layout}
          onChange={setLayout}
          options={[
            { value: 'default', label: t('docs.preview.layouts.default') },
            { value: 'custom', label: t('docs.preview.layouts.custom') },
          ]}
        />
      </div>
    </div>
  );
}

/** Below xl, Blip moves into the page intro instead of the rail. */
function InlineBlip() {
  const { mood, state, count } = useBlipMood();
  return (
    <div className="mt-6 flex items-center gap-3">
      <BlipBot size={56} state={state} pokeable />
      <BlipStatus mood={mood} count={count} />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export function Docs() {
  const { t } = useTranslation();
  const tl = useLooseT();
  const theme = useSiteTheme();
  const active = useActiveSection();
  const wide = useWideScreen();
  const [position, setPosition] = useState<DocsPosition>('bottom-right');
  const [layout, setLayout] = useState<DocsLayout>('default');
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const closeSearch = useCallback(() => setSearchOpen(false), []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setSearchOpen(true);
      } else if (
        event.key === '/' &&
        !(event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement)
      ) {
        event.preventDefault();
        setSearchOpen(true);
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  const state = useMemo(
    () => ({ position, setPosition, layout, setLayout }),
    [position, layout]
  );

  const firstOfGroup = useMemo(
    () => new Map(NAV.map(({ group, items }) => [items[0], group])),
    []
  );

  return (
    <DocsContext.Provider value={state}>
      <div className="min-h-screen overflow-x-clip">
        <Header
          page="docs"
          className="sticky top-0 border-b border-line bg-fog"
          start={
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label={t('nav.openMenu')}
              className="-ml-1.5 flex size-9 items-center justify-center rounded-full text-slate hover:text-ink lg:hidden"
            >
              <Menu size={19} />
            </button>
          }
          actions={<SearchButton onOpen={() => setSearchOpen(true)} />}
        />

        <div className="mx-auto max-w-[88rem] px-4 sm:px-6 lg:grid lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-10 lg:px-8 xl:grid-cols-[15rem_minmax(0,1fr)_16rem]">
          <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] overflow-y-auto py-8 pr-2 lg:block">
            <SidebarNav active={active} />
          </aside>

          <main id="content" className="min-w-0 py-10 lg:py-12">
            <div className="mx-auto max-w-[46rem]">
              <header className="mb-14 border-b border-line pb-10">
                <p className="font-mono text-xs text-slate">
                  blip-toast <span className="text-ink">v{site.version}</span>
                </p>
                <h1 className="mt-3 font-display text-[clamp(2rem,4.5vw,3.1rem)] font-medium leading-[1.05] tracking-[-0.04em]">
                  {t('docs.title')}
                </h1>
                {!wide && <InlineBlip />}
              </header>

              {SECTION_IDS.map((id) => {
                const group = firstOfGroup.get(id);
                return (
                  <DocSection
                    key={id}
                    id={id}
                    groupLabel={group ? tl(`docs.groups.${group}`) : undefined}
                  />
                );
              })}
            </div>
          </main>

          {wide && (
            <aside className="sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto py-12">
              <PreviewRail />
            </aside>
          )}
        </div>

        <Footer />
      </div>

      <MobileNav open={menuOpen} onClose={closeMenu} active={active} />
      <SearchDialog open={searchOpen} onClose={closeSearch} />

      <ToastContainer
        position={position}
        theme={theme}
        renderToast={layout === 'custom' ? DemoCustomToast : undefined}
      />
      <Cursor />
    </DocsContext.Provider>
  );
}
