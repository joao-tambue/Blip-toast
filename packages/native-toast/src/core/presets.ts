import type { AnimationPreset, AnimationPresetName } from './types';

export const animationPresets: Record<AnimationPresetName, AnimationPreset> = {
  smooth: { bounce: 0.1, spring: true },
  bouncy: { bounce: 0.6, spring: true },
  subtle: { bounce: 0.05, spring: true },
  snappy: { bounce: 0.4, spring: true },
};

export type { AnimationPreset, AnimationPresetName };
