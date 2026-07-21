import { generateId, clamp, sleep } from '../utils';

describe('generateId', () => {
  it('returns a string starting with "toast-"', () => {
    const id = generateId();
    expect(id).toMatch(/^toast-/);
  });

  it('generates unique ids', () => {
    const ids = new Set(Array.from({ length: 100 }, () => generateId()));
    expect(ids.size).toBe(100);
  });
});

describe('clamp', () => {
  it('clamps value below min', () => {
    expect(clamp(-5, 0, 10)).toBe(0);
  });

  it('clamps value above max', () => {
    expect(clamp(15, 0, 10)).toBe(10);
  });

  it('returns value within range', () => {
    expect(clamp(5, 0, 10)).toBe(5);
  });

  it('returns min when value equals min', () => {
    expect(clamp(0, 0, 10)).toBe(0);
  });

  it('returns max when value equals max', () => {
    expect(clamp(10, 0, 10)).toBe(10);
  });
});

describe('sleep', () => {
  it('resolves after the given time', async () => {
    const start = Date.now();
    await sleep(50);
    const elapsed = Date.now() - start;
    expect(elapsed).toBeGreaterThanOrEqual(40);
  });
});
