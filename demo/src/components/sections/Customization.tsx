import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { SectionHeading } from '../ui/SectionHeading';
import { CodeBlock } from '../ui/CodeBlock';
import { useToastDemo } from '../demo/ToastDemoProvider';
import { SNIPPETS } from '../../lib/toast-examples';

const pairs = [
  {
    key: 'richColors',
    snippet: SNIPPETS.richColors,
    run: 'custom' as const,
  },
  {
    key: 'presets',
    snippet: SNIPPETS.presets,
    run: 'custom' as const,
  },
  {
    key: 'styleHooks',
    snippet: SNIPPETS.classNames,
    run: 'default' as const,
  },
  {
    key: 'theming',
    snippet: SNIPPETS.theme,
    run: 'default' as const,
  },
] as const;

export function Customization() {
  const { fire } = useToastDemo();
  const { t } = useTranslation();

  return (
    <section id="customization" className="relative py-24">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute right-0 top-1/3 h-96 w-96 rounded-full bg-blue/10 blur-[140px]" />
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={t('customization.eyebrow')}
          title={
            <>
              {t('customization.title')}{' '}
              <span className="text-gradient">{t('customization.titleAccent')}</span>
            </>
          }
          description={t('customization.description')}
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {pairs.map((pair, i) => (
            <motion.div
              key={pair.key}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: (i % 2) * 0.1 }}
            >
              <div className="mb-4 flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-display text-base font-bold text-ink">
                    {t(`customization.items.${pair.key}.title`)}
                  </h3>
                  <p className="mt-1 text-[13px] leading-relaxed text-muted">
                    {t(`customization.items.${pair.key}.description`)}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => fire(pair.run)}
                  className="mt-0.5 shrink-0 rounded-full border border-line bg-surface/60 px-3 py-1.5 text-xs font-semibold text-muted transition-colors hover:border-violet/50 hover:text-violet cursor-pointer"
                >
                  {t('customization.runDemo')}
                </button>
              </div>
              <CodeBlock
                code={pair.snippet.code}
                language={pair.snippet.language}
                filename={pair.snippet.filename}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
