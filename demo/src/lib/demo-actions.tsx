import toast from 'blip-toast';
import type { ToastContainerProps, ToastOptions } from 'blip-toast';
import { Rocket } from 'lucide-react';

export type DemoPosition = NonNullable<ToastContainerProps['position']>;
export type DemoTheme = NonNullable<ToastContainerProps['theme']>;

export interface DemoConfig {
  position: DemoPosition;
  theme: DemoTheme;
  duration: number;
  richColors: boolean;
  showTimestamp: boolean;
  showProgress: boolean;
  maxVisible: number;
}

export const DEFAULT_CONFIG: DemoConfig = {
  position: 'top',
  theme: 'dark',
  duration: 4000,
  richColors: false,
  showTimestamp: true,
  showProgress: false,
  maxVisible: 3,
};

export type ToastKind =
  | 'default'
  | 'success'
  | 'error'
  | 'warning'
  | 'info'
  | 'loading'
  | 'action'
  | 'description'
  | 'icon'
  | 'custom'
  | 'update';

type KindKey = 'default' | 'success' | 'error' | 'warning' | 'info';

const RICH_BORDER: Record<KindKey, string> = {
  default: '#8B5CF6',
  success: '#4ADE80',
  error: '#F87171',
  warning: '#FBBF24',
  info: '#38BDF8',
};

const wait = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

function optionsFor(
  config: DemoConfig,
  kind: KindKey,
  extra: Partial<ToastOptions> = {}
): Partial<ToastOptions> {
  const opts: Partial<ToastOptions> = {
    duration: config.duration,
    showTimestamp: config.showTimestamp,
    showProgress: config.showProgress,
    ...extra,
  };
  if (config.richColors) {
    opts.fillColor = '#0B0C14';
    opts.borderColor = RICH_BORDER[kind];
    opts.borderWidth = 1.5;
  }
  return opts;
}

/** Fire a real blip-toast notification using the current demo controls. */
export function fireToast(kind: ToastKind, config: DemoConfig): void {
  switch (kind) {
    case 'default':
      toast('Hello from Blip Toast', optionsFor(config, 'default'));
      break;
    case 'success':
      toast.success('Saved successfully', optionsFor(config, 'success'));
      break;
    case 'error':
      toast.error(
        'Something went wrong',
        optionsFor(config, 'error', {
          description: 'The request failed with status 500.',
        })
      );
      break;
    case 'warning':
      toast.warning(
        'Heads up',
        optionsFor(config, 'warning', {
          description: 'Your free trial ends in 3 days.',
        })
      );
      break;
    case 'info':
      toast.info(
        'New version available',
        optionsFor(config, 'info', {
          description: 'Blip Toast 0.1.0 just shipped.',
        })
      );
      break;
    case 'description':
      toast(
        'Welcome back',
        optionsFor(config, 'default', {
          description: 'Toasts can carry a description and an action button at once.',
          action: {
            label: 'Open',
            successLabel: 'Opened',
            onPress: () => toast.success('Welcome back!'),
          },
        })
      );
      break;
    case 'action':
      toast(
        'File deleted',
        optionsFor(config, 'default', {
          description: 'You can undo this in the next few seconds.',
          action: {
            label: 'Undo',
            successLabel: 'Restored',
            onPress: () => toast.success('File restored'),
          },
        })
      );
      break;
    case 'icon':
      toast(
        'Build deployed',
        optionsFor(config, 'info', {
          icon: <Rocket size={18} color="#38BDF8" />,
        })
      );
      break;
    case 'loading':
      toast.promise(wait(2200), {
        loading: 'Loading your workspace…',
        success: 'Workspace ready',
        error: 'Failed to load',
        description: {
          loading: 'Fetching projects and tasks.',
          success: 'Everything is up to date.',
          error: 'Check your connection and retry.',
        },
        showTimestamp: config.showTimestamp,
        showProgress: config.showProgress,
        fillColor: config.richColors ? '#0B0C14' : undefined,
        borderColor: config.richColors ? '#38BDF8' : undefined,
        borderWidth: config.richColors ? 1.5 : undefined,
      });
      break;
    case 'custom':
      toast('Fully customized', {
        description: 'Custom fill, border, preset, timestamp and progress.',
        preset: 'bouncy',
        fillColor: '#15162A',
        borderColor: '#8B5CF6',
        borderWidth: 1.5,
        showProgress: true,
        showTimestamp: true,
        duration: config.duration,
      });
      break;
    case 'update': {
      const t = toast('Uploading image…', {
        ...optionsFor(config, 'info'),
        duration: 6000,
      });
      setTimeout(() => {
        toast.update(t.id, {
          title: 'Image uploaded',
          variant: 'success',
          description: 'Ready to share.',
        });
      }, 1400);
      setTimeout(() => t.dismiss(), 4400);
      break;
    }
  }
}
