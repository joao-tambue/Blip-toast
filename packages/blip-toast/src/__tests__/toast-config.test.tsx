import React from 'react';
import { render, act } from '@testing-library/react-native';
import { Text } from 'react-native';
import { ToastContainer } from '../components/ToastContainer';
import { ToastConfigProvider } from '../config/toast-config';
import { toastManager } from '../core/toast-manager';
import type { ToastOptions, ToastRenderProps } from '../core/types';

/* ------------------------------------------------------------------ */
/* helpers                                                             */
/* ------------------------------------------------------------------ */

// Persistent toast — no timers, so nothing leaks into the next test.
function mk(title: string, options: Partial<ToastOptions> = {}) {
  return toastManager.create(title, { duration: Infinity, ...options });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function collectNodes(node: any, out: any[] = []): any[] {
  if (!node || typeof node !== 'object') return out;
  if (Array.isArray(node)) {
    node.forEach((n) => collectNodes(n, out));
    return out;
  }
  out.push(node);
  collectNodes(node.children, out);
  return out;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function textContent(node: any): string {
  if (node == null) return '';
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(textContent).join('');
  return textContent(node.children);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function treeHasText(tree: any, needle: string): boolean {
  return collectNodes(tree).some((n) => textContent(n).includes(needle));
}

beforeEach(() => {
  toastManager.dismissAll();
});

afterEach(() => {
  toastManager.dismissAll();
  jest.useRealTimers();
});

/* ------------------------------------------------------------------ */
/* styles — restyle a slot without touching structure                 */
/* ------------------------------------------------------------------ */

describe('styles', () => {
  it('merges a per-slot style override into the built-in layout', async () => {
    mk('Styled');
    const { toJSON } = await render(<ToastContainer styles={{ title: { letterSpacing: 7 } }} />);
    expect(JSON.stringify(toJSON())).toContain('"letterSpacing":7');
  });
});

/* ------------------------------------------------------------------ */
/* slots — swap individual pieces                                      */
/* ------------------------------------------------------------------ */

describe('slots', () => {
  it('Icon override replaces the default icon', async () => {
    const Icon = () => <Text>SLOT_ICON</Text>;
    mk('Slotted');
    const { toJSON } = await render(<ToastContainer slots={{ Icon }} />);
    expect(treeHasText(toJSON(), 'SLOT_ICON')).toBe(true);
  });

  it('per-toast options.icon still wins over slots.Icon', async () => {
    const Icon = () => <Text>SLOT_ICON</Text>;
    mk('Own icon', { icon: <Text>OWN_ICON</Text> });
    const { toJSON } = await render(<ToastContainer slots={{ Icon }} />);
    expect(treeHasText(toJSON(), 'OWN_ICON')).toBe(true);
    expect(treeHasText(toJSON(), 'SLOT_ICON')).toBe(false);
  });

  it('ActionButton override replaces the default button', async () => {
    const ActionButton = ({ label }: { label: string }) => <Text>{`SLOT_BTN:${label}`}</Text>;
    mk('With action', { action: { label: 'Do it', onPress: jest.fn() } });
    const { toJSON } = await render(<ToastContainer slots={{ ActionButton }} />);
    expect(treeHasText(toJSON(), 'SLOT_BTN:Do it')).toBe(true);
  });
});

/* ------------------------------------------------------------------ */
/* ToastConfigProvider                                                 */
/* ------------------------------------------------------------------ */

describe('ToastConfigProvider', () => {
  it('supplies config to a prop-less ToastContainer', async () => {
    mk('From provider');
    const { toJSON } = await render(
      <ToastConfigProvider config={{ renderToast: (p) => <Text>{`ctx:${p.title}`}</Text> }}>
        <ToastContainer />
      </ToastConfigProvider>
    );
    expect(treeHasText(toJSON(), 'ctx:From provider')).toBe(true);
  });

  it('lets a ToastContainer prop override the provider value', async () => {
    mk('Override');
    const { toJSON } = await render(
      <ToastConfigProvider config={{ renderToast: () => <Text>CTX</Text> }}>
        <ToastContainer renderToast={(p) => <Text>{`prop:${p.title}`}</Text>} />
      </ToastConfigProvider>
    );
    expect(treeHasText(toJSON(), 'prop:Override')).toBe(true);
    expect(treeHasText(toJSON(), 'CTX')).toBe(false);
  });
});

/* ------------------------------------------------------------------ */
/* renderToast — full inner layout                                     */
/* ------------------------------------------------------------------ */

describe('renderToast', () => {
  it('is called and its output is rendered', async () => {
    const renderToast = jest.fn((p: ToastRenderProps) => (
      <Text>{`custom:${p.phase}:${p.title}`}</Text>
    ));

    mk('Hello', { variant: 'success' });
    const { toJSON } = await render(<ToastContainer renderToast={renderToast} />);

    expect(renderToast).toHaveBeenCalled();
    expect(treeHasText(toJSON(), 'custom:success:Hello')).toBe(true);
  });

  it('receives resolved presentation props', async () => {
    let received: ToastRenderProps | undefined;
    mk('With body', {
      variant: 'error',
      description: 'boom',
      action: { label: 'Retry', onPress: jest.fn() },
    });
    await render(
      <ToastContainer
        theme="dark"
        renderToast={(p) => {
          received = p;
          return <Text>x</Text>;
        }}
      />
    );

    expect(received).toBeDefined();
    expect(received!.phase).toBe('error');
    expect(received!.title).toBe('With body');
    expect(received!.description).toBe('boom');
    expect(received!.isExpanded).toBe(true);
    expect(received!.isDark).toBe(true);
    expect(received!.theme).toBe('dark');
    expect(typeof received!.colors.accent).toBe('string');
    expect(received!.colors.accent.length).toBeGreaterThan(0);
    expect(received!.timestamp.length).toBeGreaterThan(0);
    expect(typeof received!.dismiss).toBe('function');
    expect(typeof received!.runAction).toBe('function');
  });

  it('runAction() fires the action callback', async () => {
    const onPress = jest.fn();
    let received: ToastRenderProps | undefined;
    mk('Undo me', { action: { label: 'Undo', onPress } });
    await render(
      <ToastContainer
        renderToast={(p) => {
          received = p;
          return <Text>x</Text>;
        }}
      />
    );

    await act(async () => {
      received!.runAction();
    });
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});

/* ------------------------------------------------------------------ */
/* essence preserved — the library still owns lifecycle               */
/* (mutation-heavy tests kept last: they unmount toasts mid-render)   */
/* ------------------------------------------------------------------ */

describe('essence preserved', () => {
  it('dismiss() from render props removes the toast', async () => {
    let received: ToastRenderProps | undefined;
    mk('Bye');
    await render(
      <ToastContainer
        renderToast={(p) => {
          received = p;
          return <Text>x</Text>;
        }}
      />
    );

    expect(toastManager.getToasts()).toHaveLength(1);
    await act(async () => {
      received!.dismiss();
    });
    expect(toastManager.getToasts()).toHaveLength(0);
  });

  it('auto-dismiss timing still applies under a custom layout', async () => {
    jest.useFakeTimers();
    toastManager.create('Auto', { duration: 50 });
    await render(<ToastContainer renderToast={() => <Text>x</Text>} />);

    expect(toastManager.getToasts()).toHaveLength(1);
    await act(async () => {
      jest.advanceTimersByTime(200);
    });
    expect(toastManager.getToasts()).toHaveLength(0);
  });
});
