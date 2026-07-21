import toast, { toastManager, generateId, clamp, sleep, animationPresets } from '../index';

beforeEach(() => {
  toastManager.dismissAll();
});

describe('toast default function', () => {
  it('creates a toast', () => {
    const result = toast('Hello');
    expect(result.id).toBeDefined();
    expect(result.options.title).toBe('Hello');
  });

  it('creates a toast with options', () => {
    const result = toast('Custom', { variant: 'success' });
    expect(result.options.variant).toBe('success');
  });
});

describe('toast.success', () => {
  it('creates a success toast', () => {
    const result = toast.success('Done!');
    expect(result.options.variant).toBe('success');
    expect(result.options.title).toBe('Done!');
  });
});

describe('toast.error', () => {
  it('creates an error toast', () => {
    const result = toast.error('Oops!');
    expect(result.options.variant).toBe('error');
    expect(result.options.title).toBe('Oops!');
  });
});

describe('toast.warning', () => {
  it('creates a warning toast', () => {
    const result = toast.warning('Careful!');
    expect(result.options.variant).toBe('warning');
    expect(result.options.title).toBe('Careful!');
  });
});

describe('toast.info', () => {
  it('creates an info toast', () => {
    const result = toast.info('FYI');
    expect(result.options.variant).toBe('info');
    expect(result.options.title).toBe('FYI');
  });
});

describe('toast.dismiss', () => {
  it('dismisses a toast by id', () => {
    const result = toast('Test');
    toast.dismiss(result.id);
    expect(toastManager.getToasts()).toHaveLength(0);
  });

  it('does nothing without id', () => {
    toast('Test');
    toast.dismiss();
    expect(toastManager.getToasts()).toHaveLength(1);
  });
});

describe('toast.dismissAll', () => {
  it('dismisses all toasts', () => {
    toast('A');
    toast('B');
    toast.dismissAll();
    expect(toastManager.getToasts()).toHaveLength(0);
  });
});

describe('toast.update', () => {
  it('updates a toast', () => {
    const result = toast('Original');
    toast.update(result.id, { title: 'Updated' });
    const updated = toastManager.getToasts().find((t) => t.id === result.id);
    expect(updated?.options.title).toBe('Updated');
  });
});

describe('re-exports', () => {
  it('exports generateId', () => {
    expect(typeof generateId).toBe('function');
  });

  it('exports clamp', () => {
    expect(typeof clamp).toBe('function');
  });

  it('exports sleep', () => {
    expect(typeof sleep).toBe('function');
  });

  it('exports animationPresets', () => {
    expect(animationPresets).toBeDefined();
    expect(animationPresets.smooth).toBeDefined();
    expect(animationPresets.bouncy).toBeDefined();
  });

  it('exports toastManager', () => {
    expect(toastManager).toBeDefined();
    expect(typeof toastManager.create).toBe('function');
  });
});
