import { motion } from 'framer-motion';
import { PackageCheck } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { InstallTabs } from '../ui/InstallTabs';
import { CodeBlock } from '../ui/CodeBlock';

const steps = [
  {
    title: 'Install the package',
    body: (
      <>
        Add <code className="font-mono text-sky">blip-toast</code> to your React Native project with
        your favourite package manager.
      </>
    ),
  },
  {
    title: 'Add peer dependencies',
    body: (
      <>
        The library ships with zero required peers — it only needs{' '}
        <code className="font-mono text-sky">react-native</code> and, if you use built-in icons,{' '}
        <code className="font-mono text-sky">react-native-svg</code>.
      </>
    ),
  },
  {
    title: 'Mount once, toast anywhere',
    body: (
      <>
        Render a single <code className="font-mono text-sky">&lt;ToastContainer /&gt;</code> at the
        root, then call <code className="font-mono text-sky">toast(...)</code> from anywhere. No
        provider, no context.
      </>
    ),
  },
];

export function Installation() {
  return (
    <section id="docs" className="relative py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Installation"
          title={
            <>
              Up and running in <span className="text-gradient">seconds</span>
            </>
          }
          description="One command, zero configuration, TypeScript included."
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
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative rounded-xl border border-line bg-night/40 p-5"
            >
              <span className="flex size-8 items-center justify-center rounded-lg bg-brand font-display text-sm font-bold text-white shadow-glow-sm">
                {i + 1}
              </span>
              <h3 className="mt-3 font-display text-sm font-bold text-ink">{step.title}</h3>
              <p className="mt-1.5 text-[13px] leading-relaxed text-muted">{step.body}</p>
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
            Requires <code className="font-mono">react-native-svg</code> if you import from{' '}
            <code className="font-mono">blip-toast</code> directly.{' '}
            <a href="#api" className="font-semibold text-sky underline-offset-2 hover:underline">
              See the API reference →
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
