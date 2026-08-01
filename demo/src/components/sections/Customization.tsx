import { motion } from 'framer-motion';
import { SectionHeading } from '../ui/SectionHeading';
import { CodeBlock } from '../ui/CodeBlock';
import { useToastDemo } from '../demo/ToastDemoProvider';
import { SNIPPETS } from '../../lib/toast-examples';

const pairs = [
  {
    title: 'Rich colors',
    description: 'Fill, border and accent — toasts that pop against any background.',
    snippet: SNIPPETS.richColors,
    run: 'custom' as const,
  },
  {
    title: 'Animation presets',
    description: 'Four entrance feels, or a hand-tuned spring when you need it.',
    snippet: SNIPPETS.presets,
    run: 'custom' as const,
  },
  {
    title: 'Style hooks',
    description: 'Per-part classNames for wrapper, content, title, description and actions.',
    snippet: SNIPPETS.classNames,
    run: 'default' as const,
  },
  {
    title: 'Theming',
    description: 'Light, dark or system — on the container or per toast.',
    snippet: SNIPPETS.theme,
    run: 'default' as const,
  },
];

export function Customization() {
  const { fire } = useToastDemo();

  return (
    <section id="customization" className="relative py-24">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute right-0 top-1/3 h-96 w-96 rounded-full bg-blue/10 blur-[140px]" />
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Customization"
          title={
            <>
              Your brand, <span className="text-gradient">your toasts</span>
            </>
          }
          description="Style every part without fighting the library. Plain options, no abstractions."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {pairs.map((pair, i) => (
            <motion.div
              key={pair.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: (i % 2) * 0.1 }}
            >
              <div className="mb-4 flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-display text-base font-bold text-ink">{pair.title}</h3>
                  <p className="mt-1 text-[13px] leading-relaxed text-muted">{pair.description}</p>
                </div>
                <button
                  type="button"
                  onClick={() => fire(pair.run)}
                  className="mt-0.5 shrink-0 rounded-full border border-line bg-surface/60 px-3 py-1.5 text-xs font-semibold text-muted transition-colors hover:border-violet/50 hover:text-violet cursor-pointer"
                >
                  Run demo
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
