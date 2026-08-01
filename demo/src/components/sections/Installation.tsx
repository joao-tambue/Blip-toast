import { motion } from 'framer-motion';
import { PackageCheck } from 'lucide-react';
import { Trans, useTranslation } from 'react-i18next';
import { SectionHeading } from '../ui/SectionHeading';
import { InstallTabs } from '../ui/InstallTabs';
import { CodeBlock } from '../ui/CodeBlock';

const steps = ['install', 'peers', 'mount'] as const;

export function Installation() {
  const { t } = useTranslation();

  return (
    <section id="docs" className="relative py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={t('installation.eyebrow')}
          title={
            <>
              {t('installation.title')}{' '}
              <span className="text-gradient">{t('installation.titleAccent')}</span>
            </>
          }
          description={t('installation.description')}
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.55 }}
          className="mx-auto mt-10 max-w-2xl"
        >
          <InstallTabs />
        </motion.div>

        <div className="mx-auto mt-12 grid max-w-4xl gap-5 sm:grid-cols-3">
          {steps.map((step, i) => (
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative rounded-xl border border-line bg-night/40 p-5"
            >
              <span className="flex size-8 items-center justify-center rounded-lg bg-brand font-display text-sm font-bold text-white shadow-glow-sm">
                {i + 1}
              </span>
              <h3 className="mt-3 font-display text-sm font-bold text-ink">
                {t(`installation.steps.${step}.title`)}
              </h3>
              <p className="mt-1.5 text-[13px] leading-relaxed text-muted">
                <Trans
                  i18nKey={`installation.steps.${step}.body`}
                  components={{
                    0: <code className="font-mono text-sky" />,
                    1: <code className="font-mono text-sky" />,
                  }}
                />
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mx-auto mt-8 flex max-w-4xl items-center justify-center gap-2 rounded-xl border border-line/70 bg-surface/40 px-4 py-3 text-center text-xs text-muted"
        >
          <PackageCheck className="size-4 shrink-0 text-emerald-400" />
          <span>
            {t('installation.noteStart')} <code className="font-mono">react-native-svg</code>{' '}
            {t('installation.noteMid')} <code className="font-mono">blip-toast</code>{' '}
            {t('installation.noteDirect')}{' '}
            <a href="#api" className="font-semibold text-sky underline-offset-2 hover:underline">
              {t('installation.seeApi')} →
            </a>
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mx-auto mt-8 max-w-4xl"
        >
          <CodeBlock
            code={`import { ToastContainer } from 'blip-toast';

export default function App() {
  return (
    <>
      <MainScreen />
      <ToastContainer position="top" />
    </>
  );
}`}
            language="tsx"
            filename="App.tsx"
          />
        </motion.div>
      </div>
    </section>
  );
}
