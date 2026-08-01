/* Code snippets and API reference data shown across the docs site.
   Every snippet uses the real `blip-toast` API (v0.1.0). */

import type en from '../i18n/locales/en.json';

type ApiRows = (typeof en)['apiRows'];

export type ApiDescriptionKey =
  | `apiRows.container.${keyof ApiRows['container']}`
  | `apiRows.options.${keyof ApiRows['options']}`
  | `apiRows.methods.${keyof ApiRows['methods']}`;

export const SNIPPETS = {
  setup: {
    language: 'tsx',
    filename: 'App.tsx',
    code: `import { ToastContainer } from 'blip-toast';

export default function App() {
  return (
    <>
      {/* Your app */}
      <MainScreen />

      {/* Mount the container once, anywhere in the tree */}
      <ToastContainer position="top" />
    </>
  );
}`,
  },

  basic: {
    language: 'tsx',
    filename: 'example.tsx',
    code: `import toast from 'blip-toast';

// One-liner
toast('Hello from Blip Toast');

// With options
toast('File uploaded', {
  description: 'Your file is now live.',
  duration: 5000,
  position: 'top-right',
});`,
  },

  variants: {
    language: 'tsx',
    filename: 'variants.tsx',
    code: `toast.success('Saved successfully');
toast.error('Something went wrong');
toast.warning('Heads up — check your input');
toast.info('Heads up — a new version is out');
toast('Just a plain default toast');`,
  },

  promise: {
    language: 'tsx',
    filename: 'promise.tsx',
    code: `toast.promise(saveData(), {
  loading: 'Saving your changes…',
  success: (data) => \`Saved \${data.title}\`,
  error: (err) => \`Couldn't save: \${err.message}\`,
});

// Works with any async work — the toast morphs
// loading → success / error automatically.`,
  },

  action: {
    language: 'tsx',
    filename: 'action.tsx',
    code: `toast('File deleted', {
  description: 'It moved to the trash folder.',
  action: {
    label: 'Undo',
    successLabel: 'Restored',
    onPress: () => restoreFile(),
  },
});`,
  },

  updateDismiss: {
    language: 'tsx',
    filename: 'control.tsx',
    code: `const t = toast('Uploading…');

// Update a live toast
toast.update(t.id, { title: 'Almost there', variant: 'info' });

// Or dismiss it
t.dismiss();
toast.dismiss(t.id);      // by id
toast.dismissAll();       // everything`,
  },

  customIcon: {
    language: 'tsx',
    filename: 'icon.tsx',
    code: `import { Rocket } from 'lucide-react';

toast('Build deployed', {
  icon: <Rocket size={18} color="#38BDF8" />,
});`,
  },

  richColors: {
    language: 'tsx',
    filename: 'rich.tsx',
    code: `toast.success('Payment received', {
  fillColor: '#0F172A',
  borderColor: '#4ADE80',
  borderWidth: 1.5,
  showProgress: true,
});`,
  },

  classNames: {
    language: 'tsx',
    filename: 'custom-styles.tsx',
    code: `toast('Styled toast', {
  classNames: {
    wrapper: 'my-wrapper',
    content: 'rounded-2xl p-4',
    title: 'text-lg font-bold',
    description: 'text-sm opacity-80',
    actionButton: 'bg-violet text-white',
  },
});`,
  },

  presets: {
    language: 'tsx',
    filename: 'presets.tsx',
    code: `import toast from 'blip-toast';

// Pick an entrance feel
toast('Buttery smooth', { preset: 'smooth' });
toast('Boing!', { preset: 'bouncy' });
toast('Quiet', { preset: 'subtle' });
toast('Quick', { preset: 'snappy' });

// Or go fully manual
toast('Custom spring', {
  spring: true,
  bounce: 0.6,
  timing: { displayDuration: 6000 },
});`,
  },

  theme: {
    language: 'tsx',
    filename: 'theme.tsx',
    code: `import { ToastContainer } from 'blip-toast';

// Theme-aware container
<ToastContainer
  theme="system"        // 'light' | 'dark' | 'system'
  position="bottom-right"
  gap={8}
  offset={24}
  maxVisible={3}
/>;`,
  },

  useToasts: {
    language: 'tsx',
    filename: 'headless.tsx',
    code: `import { useToasts } from 'blip-toast';

function ToastList() {
  const toasts = useToasts();

  return (
    <View>
      {toasts.map((toast) => (
        <Text key={toast.id}>{toast.options.title}</Text>
      ))}
    </View>
  );
}`,
  },
} as const;

/* ------------------------------------------------------------------ */
/* API reference data                                                  */
/* ------------------------------------------------------------------ */

export interface ApiRow {
  name: string;
  type: string;
  default: string;
  descriptionKey: ApiDescriptionKey;
}

export const CONTAINER_PROPS: ApiRow[] = [
  {
    name: 'position',
    type: `'top' | 'bottom' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'`,
    default: `'bottom-right'`,
    descriptionKey: 'apiRows.container.position',
  },
  {
    name: 'theme',
    type: `'light' | 'dark' | 'system'`,
    default: `'system'`,
    descriptionKey: 'apiRows.container.theme',
  },
  {
    name: 'gap',
    type: 'number',
    default: '8',
    descriptionKey: 'apiRows.container.gap',
  },
  {
    name: 'offset',
    type: 'number',
    default: '24',
    descriptionKey: 'apiRows.container.offset',
  },
  {
    name: 'maxVisible',
    type: 'number',
    default: '3',
    descriptionKey: 'apiRows.container.maxVisible',
  },
];

export const TOAST_OPTIONS: ApiRow[] = [
  {
    name: 'title',
    type: 'string',
    default: '—',
    descriptionKey: 'apiRows.options.title',
  },
  {
    name: 'description',
    type: 'string',
    default: '—',
    descriptionKey: 'apiRows.options.description',
  },
  {
    name: 'variant',
    type: `'default' | 'success' | 'error' | 'warning' | 'info' | 'loading'`,
    default: `'default'`,
    descriptionKey: 'apiRows.options.variant',
  },
  {
    name: 'duration',
    type: 'number',
    default: '4000',
    descriptionKey: 'apiRows.options.duration',
  },
  {
    name: 'position',
    type: `'top' | 'bottom' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'`,
    default: `'bottom'`,
    descriptionKey: 'apiRows.options.position',
  },
  {
    name: 'dismissible',
    type: 'boolean',
    default: 'true',
    descriptionKey: 'apiRows.options.dismissible',
  },
  {
    name: 'swipeToDismiss',
    type: 'boolean',
    default: 'true',
    descriptionKey: 'apiRows.options.swipeToDismiss',
  },
  {
    name: 'onDismiss',
    type: '() => void',
    default: '—',
    descriptionKey: 'apiRows.options.onDismiss',
  },
  {
    name: 'onPress',
    type: '() => void',
    default: '—',
    descriptionKey: 'apiRows.options.onPress',
  },
  {
    name: 'icon',
    type: 'ReactNode',
    default: '—',
    descriptionKey: 'apiRows.options.icon',
  },
  {
    name: 'action',
    type: '{ label: string; onPress: () => void; successLabel?: string }',
    default: '—',
    descriptionKey: 'apiRows.options.action',
  },
  {
    name: 'fillColor',
    type: 'string',
    default: '—',
    descriptionKey: 'apiRows.options.fillColor',
  },
  {
    name: 'borderColor / borderWidth',
    type: 'string / number',
    default: '— / 0',
    descriptionKey: 'apiRows.options.border',
  },
  {
    name: 'preset',
    type: `'smooth' | 'bouncy' | 'subtle' | 'snappy'`,
    default: '—',
    descriptionKey: 'apiRows.options.preset',
  },
  {
    name: 'spring / bounce',
    type: 'boolean / number',
    default: 'true / 0.4',
    descriptionKey: 'apiRows.options.spring',
  },
  {
    name: 'showTimestamp',
    type: 'boolean',
    default: 'true',
    descriptionKey: 'apiRows.options.showTimestamp',
  },
  {
    name: 'showProgress',
    type: 'boolean',
    default: 'false',
    descriptionKey: 'apiRows.options.showProgress',
  },
  {
    name: 'classNames',
    type: 'ToastClassNames',
    default: '—',
    descriptionKey: 'apiRows.options.classNames',
  },
  {
    name: 'theme',
    type: `'light' | 'dark'`,
    default: '—',
    descriptionKey: 'apiRows.options.theme',
  },
];

export const TOAST_METHODS: ApiRow[] = [
  {
    name: 'toast(message, options)',
    type: 'Toast',
    default: '—',
    descriptionKey: 'apiRows.methods.toast',
  },
  {
    name: 'toast.success(message, options)',
    type: 'Toast',
    default: '—',
    descriptionKey: 'apiRows.methods.success',
  },
  {
    name: 'toast.error(message, options)',
    type: 'Toast',
    default: '—',
    descriptionKey: 'apiRows.methods.error',
  },
  {
    name: 'toast.warning(message, options)',
    type: 'Toast',
    default: '—',
    descriptionKey: 'apiRows.methods.warning',
  },
  {
    name: 'toast.info(message, options)',
    type: 'Toast',
    default: '—',
    descriptionKey: 'apiRows.methods.info',
  },
  {
    name: 'toast.promise(promise, data)',
    type: 'Toast',
    default: '—',
    descriptionKey: 'apiRows.methods.promise',
  },
  {
    name: 'toast.update(id, options)',
    type: 'void',
    default: '—',
    descriptionKey: 'apiRows.methods.update',
  },
  {
    name: 'toast.dismiss(id?)',
    type: 'void',
    default: '—',
    descriptionKey: 'apiRows.methods.dismiss',
  },
  {
    name: 'toast.dismissAll()',
    type: 'void',
    default: '—',
    descriptionKey: 'apiRows.methods.dismissAll',
  },
];
