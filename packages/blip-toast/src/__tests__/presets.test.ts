import { animationPresets } from '../core/presets';
import type { AnimationPresetName } from '../core/types';

describe('animationPresets', () => {
  const presetNames: AnimationPresetName[] = ['smooth', 'bouncy', 'subtle', 'snappy'];

  it.each(presetNames)('has a valid preset for "%s"', (name) => {
    const preset = animationPresets[name];
    expect(preset).toBeDefined();
    expect(typeof preset.bounce).toBe('number');
    expect(typeof preset.spring).toBe('boolean');
  });

  it('all presets use spring', () => {
    for (const preset of Object.values(animationPresets)) {
      expect(preset.spring).toBe(true);
    }
  });

  it('smooth has the lowest bounce', () => {
    expect(animationPresets.smooth.bounce).toBeLessThan(animationPresets.bouncy.bounce);
  });

  it('subtle has the lowest bounce overall', () => {
    const allBounces = Object.values(animationPresets).map((p) => p.bounce);
    expect(animationPresets.subtle.bounce).toBe(Math.min(...allBounces));
  });

  it('bouncy has the highest bounce overall', () => {
    const allBounces = Object.values(animationPresets).map((p) => p.bounce);
    expect(animationPresets.bouncy.bounce).toBe(Math.max(...allBounces));
  });
});
