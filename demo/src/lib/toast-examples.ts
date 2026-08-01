/* Code snippets and API reference data shown across the docs site.
   Every snippet uses the real `blip-toast` API (v0.1.0). */

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
  description: string;
}

export const CONTAINER_PROPS: ApiRow[] = [
  {
    name: 'position',
    type: `'top' | 'bottom' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'`,
    default: `'bottom-right'`,
    description: 'Where toasts are anchored on the screen.',
  },
  {
    name: 'theme',
    type: `'light' | 'dark' | 'system'`,
    default: `'system'`,
    description: 'Color scheme of the toast cards. Follows the device when "system".',
  },
  {
    name: 'gap',
    type: 'number',
    default: '8',
    description: 'Vertical spacing between stacked toasts.',
  },
  {
    name: 'offset',
    type: 'number',
    default: '24',
    description: 'Distance from the screen edge (and status bar on iOS).',
  },
  {
    name: 'maxVisible',
    type: 'number',
    default: '3',
    description: 'How many toasts are visible before older ones fade into the stack.',
  },
];

export const TOAST_OPTIONS: ApiRow[] = [
  {
    name: 'title',
    type: 'string',
    default: '—',
    description: 'The toast message. Also passed as the first argument to toast().',
  },
  {
    name: 'description',
    type: 'string',
    default: '—',
    description: 'Secondary line of text below the title.',
  },
  {
    name: 'variant',
    type: `'default' | 'success' | 'error' | 'warning' | 'info' | 'loading'`,
    default: `'default'`,
    description: 'Visual style and icon. "loading" is set automatically by toast.promise().',
  },
  {
    name: 'duration',
    type: 'number',
    default: '4000',
    description: 'Time (ms) before the toast auto-dismisses. Use Infinity to pin it.',
  },
  {
    name: 'position',
    type: `'top' | 'bottom' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'`,
    default: `'bottom'`,
    description: 'Per-toast anchor. Overrides the container position.',
  },
  {
    name: 'dismissible',
    type: 'boolean',
    default: 'true',
    description: 'Whether the toast can be dismissed by the user.',
  },
  {
    name: 'swipeToDismiss',
    type: 'boolean',
    default: 'true',
    description: 'Whether a swipe gesture dismisses the toast.',
  },
  {
    name: 'onDismiss',
    type: '() => void',
    default: '—',
    description: 'Called when the toast is dismissed (any reason).',
  },
  {
    name: 'onPress',
    type: '() => void',
    default: '—',
    description: 'Called when the toast card is pressed.',
  },
  {
    name: 'icon',
    type: 'ReactNode',
    default: '—',
    description: 'Custom icon. Replaces the variant icon.',
  },
  {
    name: 'action',
    type: '{ label: string; onPress: () => void; successLabel?: string }',
    default: '—',
    description: 'Action button inside the toast. successLabel swaps it after a tap.',
  },
  {
    name: 'fillColor',
    type: 'string',
    default: '—',
    description: 'Custom card background color.',
  },
  {
    name: 'borderColor / borderWidth',
    type: 'string / number',
    default: '— / 0',
    description: 'Custom border to make toasts pop (rich colors).',
  },
  {
    name: 'preset',
    type: `'smooth' | 'bouncy' | 'subtle' | 'snappy'`,
    default: '—',
    description: 'Animation preset for the entrance.',
  },
  {
    name: 'spring / bounce',
    type: 'boolean / number',
    default: 'true / 0.4',
    description: 'Manual spring control when you need fine tuning.',
  },
  {
    name: 'showTimestamp',
    type: 'boolean',
    default: 'true',
    description: 'Show the time the toast was created.',
  },
  {
    name: 'showProgress',
    type: 'boolean',
    default: 'false',
    description: 'Show an animated progress bar for the duration.',
  },
  {
    name: 'classNames',
    type: 'ToastClassNames',
    default: '—',
    description: 'Style hooks for wrapper, content, title, description, action…',
  },
  {
    name: 'theme',
    type: `'light' | 'dark'`,
    default: '—',
    description: 'Per-toast color scheme.',
  },
];

export const TOAST_METHODS: ApiRow[] = [
  {
    name: 'toast(message, options)',
    type: 'Toast',
    default: '—',
    description: 'Show a default toast and return a handle with .dismiss() and .update().',
  },
  {
    name: 'toast.success(message, options)',
    type: 'Toast',
    default: '—',
    description: 'Show a success toast.',
  },
  {
    name: 'toast.error(message, options)',
    type: 'Toast',
    default: '—',
    description: 'Show an error toast.',
  },
  {
    name: 'toast.warning(message, options)',
    type: 'Toast',
    default: '—',
    description: 'Show a warning toast.',
  },
  {
    name: 'toast.info(message, options)',
    type: 'Toast',
    default: '—',
    description: 'Show an info toast.',
  },
  {
    name: 'toast.promise(promise, data)',
    type: 'Toast',
    default: '—',
    description: 'Show loading → success/error automatically as the promise settles.',
  },
  {
    name: 'toast.update(id, options)',
    type: 'void',
    default: '—',
    description: 'Update a live toast.',
  },
  {
    name: 'toast.dismiss(id?)',
    type: 'void',
    default: '—',
    description: 'Dismiss a specific toast, or all toasts when called without an id.',
  },
  {
    name: 'toast.dismissAll()',
    type: 'void',
    default: '—',
    description: 'Dismiss every toast at once.',
  },
];
