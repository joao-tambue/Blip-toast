import toast from 'blip-toast';
import type { ToastContainerProps, ToastOptions } from 'blip-toast';
import { Rocket } from 'lucide-react';
import i18n from '../i18n';

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
      toast(i18n.t('toast.hello'), optionsFor(config, 'default'));
      break;
    case 'success':
      toast.success(i18n.t('toast.success'), optionsFor(config, 'success'));
      break;
    case 'error':
      toast.error(
        i18n.t('toast.error'),
        optionsFor(config, 'error', {
          description: i18n.t('toast.errorDesc'),
        })
      );
      break;
    case 'warning':
      toast.warning(
        i18n.t('toast.warning'),
        optionsFor(config, 'warning', {
          description: i18n.t('toast.warningDesc'),
        })
      );
      break;
    case 'info':
      toast.info(
        i18n.t('toast.info'),
        optionsFor(config, 'info', {
          description: i18n.t('toast.infoDesc'),
        })
      );
      break;
    case 'description':
      toast(
        i18n.t('toast.welcomeBack'),
        optionsFor(config, 'default', {
          description: i18n.t('toast.welcomeBackDesc'),
          action: {
            label: i18n.t('toast.open'),
            successLabel: i18n.t('toast.opened'),
            onPress: () => toast.success(i18n.t('toast.welcomeBackToast')),
          },
        })
      );
      break;
    case 'action':
      toast(
        i18n.t('toast.fileDeleted'),
        optionsFor(config, 'default', {
          description: i18n.t('toast.fileDeletedDesc'),
          action: {
            label: i18n.t('toast.undo'),
            successLabel: i18n.t('toast.restored'),
            onPress: () => toast.success(i18n.t('toast.fileRestored')),
          },
        })
      );
      break;
    case 'icon':
      toast(
        i18n.t('toast.buildDeployed'),
        optionsFor(config, 'info', {
          icon: <Rocket size={18} color="#38BDF8" />,
        })
      );
      break;
    case 'loading':
      toast.promise(wait(2200), {
        loading: i18n.t('toast.loadingWorkspace'),
        success: i18n.t('toast.workspaceReady'),
        error: i18n.t('toast.failedToLoad'),
        description: {
          loading: i18n.t('toast.loadingDesc'),
          success: i18n.t('toast.readyDesc'),
          error: i18n.t('toast.retryDesc'),
        },
        showTimestamp: config.showTimestamp,
        showProgress: config.showProgress,
        fillColor: config.richColors ? '#0B0C14' : undefined,
        borderColor: config.richColors ? '#38BDF8' : undefined,
        borderWidth: config.richColors ? 1.5 : undefined,
      });
      break;
    case 'custom':
      toast(i18n.t('toast.fullyCustomized'), {
        description: i18n.t('toast.customizedDesc'),
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
      const handle = toast(i18n.t('toast.uploading'), {
        ...optionsFor(config, 'info'),
        duration: 6000,
      });
      setTimeout(() => {
        toast.update(handle.id, {
          title: i18n.t('toast.uploaded'),
          variant: 'success',
          description: i18n.t('toast.uploadedDesc'),
        });
      }, 1400);
      setTimeout(() => handle.dismiss(), 4400);
      break;
    }
  }
}
