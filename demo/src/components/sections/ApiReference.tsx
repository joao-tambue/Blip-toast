import { motion } from 'framer-motion';
import { SectionHeading } from '../ui/SectionHeading';
import { ApiTable } from '../ui/ApiTable';
import { CONTAINER_PROPS, TOAST_OPTIONS, TOAST_METHODS } from '../../lib/toast-examples';

export function ApiReference() {
  return (
    <section id="api" className="relative py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="API reference"
          title={
            <>
              Everything, <span className="text-gradient">documented</span>
            </>
          }
          description="A tiny, predictable surface. If you know sonner, you already know Blip Toast."
        />

        <div className="mt-14 space-y-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="mb-4 font-display text-lg font-bold text-ink">
              <span className="text-gradient font-mono text-base">&lt;ToastContainer /&gt;</span>{' '}
              props
            </h3>
            <ApiTable rows={CONTAINER_PROPS} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="mb-4 font-display text-lg font-bold text-ink">
              <span className="text-gradient font-mono text-base">toast(options)</span> options
            </h3>
            <ApiTable rows={TOAST_OPTIONS} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="mb-4 font-display text-lg font-bold text-ink">
              <span className="text-gradient font-mono text-base">toast.*</span> methods
            </h3>
            <ApiTable rows={TOAST_METHODS} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
