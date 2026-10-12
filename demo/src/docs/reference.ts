/* API reference rows. Types and defaults mirror packages/blip-toast/src —
 * `reserved` marks options that exist in the types but have no runtime
 * effect yet, so the docs never promise behaviour the library lacks. */

export interface RefRow {
  name: string;
  type: string;
  default?: string;
  desc: string;
  reserved?: boolean;
}

const POSITION = `'top' | 'bottom' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'`;

export const METHODS: RefRow[] = [
  { name: 'toast(message, options?)', type: 'Toast', desc: 'docs.api.methods.toast' },
  { name: 'toast.success(message, options?)', type: 'Toast', desc: 'docs.api.methods.success' },
  { name: 'toast.error(message, options?)', type: 'Toast', desc: 'docs.api.methods.error' },
  { name: 'toast.warning(message, options?)', type: 'Toast', desc: 'docs.api.methods.warning' },
  { name: 'toast.info(message, options?)', type: 'Toast', desc: 'docs.api.methods.info' },
  {
    name: 'toast.promise(promise, data)',
    type: 'Toast',
    desc: 'docs.api.methods.promise',
  },
  { name: 'toast.update(id, options)', type: 'void', desc: 'docs.api.methods.update' },
  { name: 'toast.dismiss(id)', type: 'void', desc: 'docs.api.methods.dismiss' },
  { name: 'toast.dismissAll()', type: 'void', desc: 'docs.api.methods.dismissAll' },
];

export const OPTIONS: RefRow[] = [
  { name: 'title', type: 'string', desc: 'docs.api.options.title' },
  { name: 'description', type: 'string', desc: 'docs.api.options.description' },
  {
    name: 'variant',
    type: `'default' | 'success' | 'error' | 'warning' | 'info' | 'loading'`,
    default: `'default'`,
    desc: 'docs.api.options.variant',
  },
  { name: 'duration', type: 'number', default: '4000', desc: 'docs.api.options.duration' },
  { name: 'icon', type: 'ReactNode', desc: 'docs.api.options.icon' },
  {
    name: 'action',
    type: '{ label: string; onPress: () => void; successLabel?: string }',
    desc: 'docs.api.options.action',
  },
  { name: 'onDismiss', type: '() => void', desc: 'docs.api.options.onDismiss' },
  { name: 'fillColor', type: 'string', desc: 'docs.api.options.fillColor' },
  {
    name: 'borderColor, borderWidth',
    type: 'string, number',
    default: `'transparent', 0`,
    desc: 'docs.api.options.border',
  },
  {
    name: 'preset',
    type: `'smooth' | 'bouncy' | 'subtle' | 'snappy'`,
    desc: 'docs.api.options.preset',
  },
  { name: 'spring, bounce', type: 'boolean, number', default: 'true, 0.4', desc: 'docs.api.options.spring' },
  { name: 'timing', type: '{ displayDuration?: number }', desc: 'docs.api.options.timing' },
  { name: 'showTimestamp', type: 'boolean', default: 'true', desc: 'docs.api.options.showTimestamp' },
  { name: 'showProgress', type: 'boolean', default: 'false', desc: 'docs.api.options.showProgress' },
  { name: 'id', type: 'string', default: 'generated', desc: 'docs.api.options.id' },
  { name: 'position', type: POSITION, desc: 'docs.api.options.position', reserved: true },
  { name: 'dismissible', type: 'boolean', desc: 'docs.api.options.dismissible', reserved: true },
  { name: 'swipeToDismiss', type: 'boolean', desc: 'docs.api.options.swipeToDismiss', reserved: true },
  { name: 'onPress', type: '() => void', desc: 'docs.api.options.onPress', reserved: true },
  { name: 'classNames', type: 'ToastClassNames', desc: 'docs.api.options.classNames', reserved: true },
  { name: 'theme', type: `'light' | 'dark'`, desc: 'docs.api.options.theme', reserved: true },
];

export const PROMISE_DATA: RefRow[] = [
  { name: 'loading', type: 'string', desc: 'docs.api.promise.loading' },
  { name: 'success', type: 'string | ((data: T) => string)', desc: 'docs.api.promise.success' },
  { name: 'error', type: 'string | ((error: unknown) => string)', desc: 'docs.api.promise.error' },
  {
    name: 'description',
    type: '{ success?, error? }',
    desc: 'docs.api.promise.description',
  },
  { name: 'action', type: '{ success?: ToastAction; error?: ToastAction }', desc: 'docs.api.promise.action' },
  {
    name: 'fillColor, borderColor, borderWidth, timing, preset, spring, bounce, showTimestamp, showProgress',
    type: '—',
    desc: 'docs.api.promise.style',
  },
  { name: 'onDismiss', type: '() => void', desc: 'docs.api.promise.onDismiss', reserved: true },
  { name: 'onAutoClose', type: '() => void', desc: 'docs.api.promise.onAutoClose', reserved: true },
];

export const CONTAINER: RefRow[] = [
  { name: 'position', type: POSITION, default: `'bottom-right'`, desc: 'docs.api.container.position' },
  { name: 'theme', type: `'light' | 'dark' | 'system'`, default: `'system'`, desc: 'docs.api.container.theme' },
  { name: 'gap', type: 'number', default: '8', desc: 'docs.api.container.gap' },
  { name: 'offset', type: 'number', default: '24', desc: 'docs.api.container.offset' },
  { name: 'maxVisible', type: 'number', default: '3', desc: 'docs.api.container.maxVisible' },
  { name: 'styles', type: 'ToastStyleOverrides', desc: 'docs.api.container.styles' },
  { name: 'slots', type: '{ Icon?, ActionButton?, Progress? }', desc: 'docs.api.container.slots' },
  {
    name: 'renderToast',
    type: '(props: ToastRenderProps) => ReactNode',
    desc: 'docs.api.container.renderToast',
  },
];

export const RENDER_PROPS: RefRow[] = [
  { name: 'toast, id', type: 'Toast, string', desc: 'docs.api.render.toast' },
  { name: 'phase', type: 'ToastPhase', desc: 'docs.api.render.phase' },
  { name: 'title, description', type: 'string, string | undefined', desc: 'docs.api.render.title' },
  { name: 'action', type: 'ToastAction | undefined', desc: 'docs.api.render.action' },
  { name: 'theme, isDark', type: `'light' | 'dark', boolean`, desc: 'docs.api.render.theme' },
  { name: 'colors', type: 'ToastLayoutColors', desc: 'docs.api.render.colors' },
  { name: 'timestamp', type: 'string', desc: 'docs.api.render.timestamp' },
  { name: 'isExpanded', type: 'boolean', desc: 'docs.api.render.isExpanded' },
  { name: 'icon', type: 'ReactNode', desc: 'docs.api.render.icon' },
  { name: 'progressBar', type: 'ReactNode | null', desc: 'docs.api.render.progressBar' },
  { name: 'dismiss', type: '() => void', desc: 'docs.api.render.dismiss' },
  { name: 'runAction', type: '() => void', desc: 'docs.api.render.runAction' },
];

export const EXPORTS: { group: string; names: string[] }[] = [
  { group: 'core', names: ['toast (default)', 'toastManager', 'animationPresets'] },
  { group: 'components', names: ['ToastContainer', 'ToastItem', 'ProgressBar', 'defaultToastStyles', 'resolveToastColors'] },
  { group: 'config', names: ['ToastConfigProvider', 'useToastConfig', 'useToasts'] },
  { group: 'motion', names: ['useSlideIn', 'useSlideOut', 'MorphAnimation'] },
  { group: 'icons', names: ['DefaultIcon', 'SuccessIcon', 'ErrorIcon', 'WarningIcon', 'InfoIcon', 'SpinnerIcon'] },
  { group: 'utils', names: ['generateId', 'clamp', 'sleep'] },
];
