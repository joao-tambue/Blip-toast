import type { ReactNode } from 'react';
import { Link2 } from 'lucide-react';
import type { AnimationPresetName } from 'blip-toast';
import { animationPresets } from 'blip-toast';
import { useTranslation } from 'react-i18next';
import { CodeBlock, InstallCommand } from '../components/Code';
import { Md } from '../lib/md';
import { cn } from '../lib/cn';
import { EXAMPLES, runPreset, type Example } from './examples';
import type { SectionId } from './nav';
import {
  CONTAINER,
  EXPORTS,
  METHODS,
  OPTIONS,
  PROMISE_DATA,
  RENDER_PROPS,
  type RefRow,
} from './reference';
import { PositionPicker, Segmented, useDocs, useLooseT } from './state';

function Example({ example, onRun }: { example: Example; onRun?: () => void }) {
  return (
    <CodeBlock
      className="my-6"
      code={example.code}
      filename={example.filename}
      lang={example.lang}
      onRun={onRun ?? example.run}
    />
  );
}

function Note({ children }: { children: ReactNode }) {
  const { t } = useTranslation();
  return (
    <aside className="prose-doc my-6 rounded-2xl border border-line bg-paper px-5 py-4">
      <p className="!mt-0 mb-1 font-mono text-[11px] uppercase tracking-[0.08em] !text-slate">
        {t('docs.goodToKnow')}
      </p>
      {children}
    </aside>
  );
}

function RefList({ rows }: { rows: RefRow[] }) {
  const t = useLooseT();
  return (
    <div className="my-6 overflow-hidden rounded-2xl border border-line bg-paper">
      <div className="hidden grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] gap-6 border-b border-line px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.08em] text-slate md:grid">
        <span>
          {t('docs.table.name')} · {t('docs.table.type')}
        </span>
        <span>{t('docs.table.description')}</span>
      </div>
      <dl className="divide-y divide-line-soft">
        {rows.map((row) => (
          <div
            key={row.name}
            className={cn(
              'grid gap-2 px-5 py-4 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:gap-6',
              row.reserved && 'bg-chalk/60'
            )}
          >
            <dt className="min-w-0">
              <code className="font-mono text-[13px] font-semibold text-ink [overflow-wrap:anywhere]">
                {row.name}
              </code>
              <code className="mt-1 block font-mono text-[12px] leading-relaxed text-slate [overflow-wrap:anywhere]">
                {row.type}
              </code>
            </dt>
            <dd className="text-[14.5px] leading-relaxed text-ink/85">
              {row.reserved && (
                <span
                  title={t('docs.reservedNote')}
                  className="mr-2 inline-block rounded-full border border-line px-2 py-px align-[1px] font-mono text-[10.5px] text-slate"
                >
                  {t('docs.reserved')}
                </span>
              )}
              {t(row.desc)}
              {row.default && (
                <span className="mt-1.5 block font-mono text-[12px] text-slate">
                  {t('docs.table.default')}: <span className="text-ink">{row.default}</span>
                </span>
              )}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

function ReservedLegend() {
  const { t } = useTranslation();
  return (
    <p className="-mt-3 text-[13px] text-slate">
      <span className="mr-1.5 rounded-full border border-line px-2 py-px font-mono text-[10.5px]">
        {t('docs.reserved')}
      </span>
      {t('docs.reservedNote')}
    </p>
  );
}

const PRESETS = Object.keys(animationPresets) as AnimationPresetName[];

function PresetTable() {
  const { t } = useTranslation();
  return (
    <div className="my-6 overflow-hidden rounded-2xl border border-line bg-paper">
      <ul className="divide-y divide-line-soft">
        {PRESETS.map((name) => (
          <li key={name} className="flex flex-wrap items-center gap-x-4 gap-y-1 px-5 py-3">
            <code className="w-16 font-mono text-[13px] font-semibold">{name}</code>
            <span className="w-12 font-mono text-[12px] text-slate">
              {animationPresets[name].bounce}
            </span>
            <span className="min-w-40 flex-1 text-[14.5px] text-ink/85">
              {t(`docs.presetFeel.${name}`)}
            </span>
            <button
              type="button"
              onClick={() => runPreset(name)}
              className="rounded-full border border-line bg-chalk px-3 py-1 font-mono text-[11.5px] transition-colors hover:border-ink/40"
            >
              {t('docs.presetRun', { name })}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function PositionsDemo() {
  const { t } = useTranslation();
  const { position, setPosition } = useDocs();
  return (
    <div className="my-6 flex items-center gap-6 rounded-2xl border border-line bg-paper p-5">
      <PositionPicker
        value={position}
        onChange={(next) => {
          setPosition(next);
        }}
      />
      <div className="min-w-0">
        <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-slate">position</p>
        <p className="mt-1 font-mono text-lg text-ink">{`'${position}'`}</p>
        <p className="mt-2 text-sm text-slate">{t(`docs.positions.${position}`)}</p>
      </div>
    </div>
  );
}

function CustomLayoutToggle() {
  const { t } = useTranslation();
  const { layout, setLayout } = useDocs();
  return (
    <div className="my-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-line bg-paper px-5 py-4">
      <p className="text-sm font-medium">{t('docs.s.custom-layout.toggle')}</p>
      <div className="w-56">
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

function Exports() {
  const { t } = useTranslation();
  return (
    <div className="my-6 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
      {EXPORTS.map(({ group, names }) => (
        <div key={group} className="bg-paper px-5 py-4">
          <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-slate">
            {t(`docs.exportGroups.${group as 'core'}`)}
          </p>
          <ul className="mt-2 flex flex-wrap gap-1.5">
            {names.map((name) => (
              <li key={name}>
                <code className="inline-block rounded-md bg-chalk px-2 py-0.5 font-mono text-[12.5px]">
                  {name}
                </code>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */

function Prose({ id, part }: { id: SectionId; part: 'body' | 'after' | 'note' }) {
  const t = useLooseT();
  return (
    <div className="prose-doc">
      <Md text={t(`docs.s.${id}.${part}`)} />
    </div>
  );
}

/** What each section renders between its body and closing prose. */
function SectionContent({ id }: { id: SectionId }) {
  const t = useLooseT();
  const { setLayout } = useDocs();
  const body = <Prose id={id} part="body" />;
  const after = <Prose id={id} part="after" />;
  const note = (
    <Note>
      <Md text={t(`docs.s.${id}.note`)} />
    </Note>
  );

  switch (id) {
    case 'introduction':
      return body;
    case 'custom-icons':
      return (
        <>
          {body}
          <Example example={EXAMPLES.icon} />
        </>
      );
    case 'installation':
      return (
        <>
          {body}
          <InstallCommand className="my-6" />
          {after}
        </>
      );
    case 'quick-start':
      return (
        <>
          {body}
          <Example example={EXAMPLES.setup} />
          {after}
          <Example example={EXAMPLES.basic} />
        </>
      );
    case 'variants':
      return (
        <>
          {body}
          <Example example={EXAMPLES.variants} />
          {after}
        </>
      );
    case 'description-and-actions':
      return (
        <>
          {body}
          <Example example={EXAMPLES.action} />
          {after}
        </>
      );
    case 'promise':
      return (
        <>
          {body}
          <Example example={EXAMPLES.promise} />
          {after}
        </>
      );
    case 'update-and-dismiss':
      return (
        <>
          {body}
          <Example example={EXAMPLES.update} />
          {after}
          {note}
        </>
      );
    case 'headless':
      return (
        <>
          {body}
          <Example example={EXAMPLES.headless} />
          {after}
        </>
      );
    case 'positions':
      return (
        <>
          {body}
          <PositionsDemo />
          <Example example={EXAMPLES.positions} />
          {after}
          {note}
        </>
      );
    case 'theming':
      return (
        <>
          {body}
          <Example example={EXAMPLES.theming} />
          {after}
        </>
      );
    case 'stacking':
      return (
        <>
          {body}
          <Example example={EXAMPLES.stacking} />
          {after}
        </>
      );
    case 'rich-colors':
      return (
        <>
          {body}
          <Example example={EXAMPLES.rich} />
        </>
      );
    case 'animation-presets':
      return (
        <>
          {body}
          <PresetTable />
          {after}
          <Example example={EXAMPLES.presets} />
        </>
      );
    case 'style-overrides':
      return (
        <>
          {body}
          <Example example={EXAMPLES.styles} />
          {after}
        </>
      );
    case 'slots':
      return (
        <>
          {body}
          <Example example={EXAMPLES.slots} />
          {after}
        </>
      );
    case 'custom-layout':
      return (
        <>
          {body}
          <CustomLayoutToggle />
          <Example
            example={EXAMPLES.customLayout}
            onRun={() => {
              setLayout('custom');
              // Let the container pick up the new renderToast first.
              setTimeout(EXAMPLES.customLayout.run, 0);
            }}
          />
          {after}
        </>
      );
    case 'config-provider':
      return (
        <>
          {body}
          <Example example={EXAMPLES.provider} />
        </>
      );
    case 'api-toast':
      return (
        <>
          {body}
          <RefList rows={METHODS} />
        </>
      );
    case 'api-options':
      return (
        <>
          {body}
          <RefList rows={OPTIONS} />
          <ReservedLegend />
        </>
      );
    case 'api-promise':
      return (
        <>
          {body}
          <RefList rows={PROMISE_DATA} />
          <ReservedLegend />
        </>
      );
    case 'api-container':
      return (
        <>
          {body}
          <RefList rows={CONTAINER} />
        </>
      );
    case 'api-render-props':
      return (
        <>
          {body}
          <RefList rows={RENDER_PROPS} />
        </>
      );
    case 'api-exports':
      return (
        <>
          {body}
          <Exports />
        </>
      );
  }
}

export function DocSection({ id, groupLabel }: { id: SectionId; groupLabel?: string }) {
  const t = useLooseT();
  const isApi = id.startsWith('api-');
  return (
    <section id={id} data-section aria-labelledby={`${id}-title`} className="scroll-mt-24 pb-14">
      {groupLabel && (
        <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.1em] text-signal-text">
          {groupLabel}
        </p>
      )}
      <h2
        id={`${id}-title`}
        className={cn(
          'group flex items-center gap-2 text-[1.6rem] font-medium tracking-[-0.03em]',
          isApi ? 'font-mono text-[1.45rem] tracking-[-0.02em]' : 'font-display'
        )}
      >
        {t(`docs.s.${id}.title`)}
        <a
          href={`#${id}`}
          aria-label={`#${id}`}
          className="text-slate opacity-0 transition-opacity hover:text-ink focus-visible:opacity-100 group-hover:opacity-100"
        >
          <Link2 size={17} />
        </a>
      </h2>
      <div className="mt-4">
        <SectionContent id={id} />
      </div>
    </section>
  );
}
