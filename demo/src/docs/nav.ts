import type en from '../i18n/locales/en.json';

export type SectionId = keyof (typeof en)['docs']['s'];
export type GroupId = keyof (typeof en)['docs']['groups'];

export const NAV: { group: GroupId; items: SectionId[] }[] = [
  { group: 'start', items: ['introduction', 'installation', 'quick-start'] },
  {
    group: 'usage',
    items: [
      'variants',
      'description-and-actions',
      'promise',
      'update-and-dismiss',
      'custom-icons',
      'headless',
    ],
  },
  { group: 'container', items: ['positions', 'theming', 'stacking'] },
  {
    group: 'custom',
    items: [
      'rich-colors',
      'animation-presets',
      'style-overrides',
      'slots',
      'custom-layout',
      'config-provider',
    ],
  },
  {
    group: 'reference',
    items: [
      'api-toast',
      'api-options',
      'api-promise',
      'api-container',
      'api-render-props',
      'api-exports',
    ],
  },
];

export const SECTION_IDS: SectionId[] = NAV.flatMap((g) => g.items);

/** Extra terms the search matches on, beyond each section's title. */
export const SEARCH_TERMS: Partial<Record<SectionId, string>> = {
  installation: 'install npm pnpm yarn bun expo peer dependencies react-native-svg requirements',
  'quick-start': 'setup mount ToastContainer first toast',
  variants: 'success error warning info default loading',
  'description-and-actions': 'description action button undo successLabel onPress',
  promise: 'toast.promise async loading await fetch',
  'update-and-dismiss': 'update dismiss dismissAll handle id close',
  'custom-icons': 'icon svg',
  headless: 'useToasts toastManager subscribe list count',
  positions: 'position top bottom left right corner offset safe area',
  theming: 'theme dark light system color scheme',
  stacking: 'gap maxVisible stack limit',
  'rich-colors': 'fillColor borderColor borderWidth showProgress progress colour color',
  'animation-presets': 'preset smooth bouncy subtle snappy spring bounce timing displayDuration',
  'style-overrides': 'styles wrapper content header title description actionButton style',
  slots: 'slots Icon ActionButton Progress',
  'custom-layout': 'renderToast custom layout headless card',
  'config-provider': 'ToastConfigProvider useToastConfig global config',
  'api-toast': 'methods success error warning info promise update dismiss dismissAll',
  'api-options': 'ToastOptions duration description variant icon action fillColor timestamp',
  'api-promise': 'PromiseToastData loading success error',
  'api-container': 'ToastContainerProps position theme gap offset maxVisible styles slots renderToast',
  'api-render-props': 'ToastRenderProps colors phase dismiss runAction progressBar',
  'api-exports': 'exports ProgressBar ToastItem icons generateId animationPresets MorphAnimation',
};
