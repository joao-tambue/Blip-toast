import { useState } from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { SectionHeading } from '../ui/SectionHeading';
import { CodeBlock } from '../ui/CodeBlock';
import { Tabs } from '../ui/Tabs';
import { Button } from '../ui/Button';
import { useToastDemo } from '../demo/ToastDemoProvider';
import { SNIPPETS } from '../../lib/toast-examples';
import type { ToastKind } from '../../lib/demo-actions';

type ExampleKey = 'basic' | 'variants' | 'promise' | 'action' | 'updateDismiss' | 'customIcon';

const examples: Array<{ key: ExampleKey; kind: ToastKind }> = [
  { key: 'basic', kind: 'default' },
  { key: 'variants', kind: 'success' },
  { key: 'promise', kind: 'loading' },
  { key: 'action', kind: 'action' },
  { key: 'updateDismiss', kind: 'update' },
  { key: 'customIcon', kind: 'icon' },
];

export function QuickStart() {
  const { fire } = useToastDemo();
  const { t } = useTranslation();
  const [activeKey, setActiveKey] = useState(examples[0].key);
  const active = examples.find((e) => e.key === activeKey)!;
  const snippet = SNIPPETS[activeKey];

  return (
    <section id="quickstart" className="relative py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={t('quickstart.eyebrow')}
          title={
            <>
              {t('quickstart.title')}{' '}
              <span className="text-gradient">{t('quickstart.titleAccent')}</span>
            </>
          }
          description={t('quickstart.description')}
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.55 }}
          className="mt-12"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <Tabs
              aria-label={t('quickstart.examplesAria')}
              value={activeKey}
              onChange={setActiveKey}
              tabs={examples.map((e) => ({
                value: e.key,
                label: t(`quickstart.tabs.${e.key}`),
              }))}
            />
            <Button size="sm" onClick={() => fire(active.kind)}>
              <Play className="size-4" />
              {t('quickstart.runThis')}
            </Button>
          </div>

          <motion.div
            key={activeKey}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="mt-5"
          >
            <CodeBlock
              code={snippet.code}
              language={snippet.language}
              filename={snippet.filename}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
