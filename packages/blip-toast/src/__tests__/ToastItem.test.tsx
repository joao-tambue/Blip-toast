import React from 'react';
import { render } from '@testing-library/react-native';
import { ToastItem } from '../components/ToastItem';
import type { Toast } from '../core/types';

const createMockToast = (overrides: Partial<Toast['options']> = {}): Toast => {
  const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;
  return {
    id,
    options: {
      id,
      title: 'Test Toast',
      variant: 'default',
      duration: 4000,
      dismissible: true,
      position: 'bottom',
      swipeToDismiss: true,
      ...overrides,
    },
    dismiss: jest.fn(),
    update: jest.fn(),
  };
};

describe('ToastItem', () => {
  const onDismiss = jest.fn();

  beforeEach(() => {
    onDismiss.mockClear();
  });

  it('renders without crashing', async () => {
    const toast = createMockToast();
    const { container } = await render(<ToastItem toast={toast} onDismiss={onDismiss} />);
    expect(container).toBeTruthy();
  });

  it('renders with default variant', async () => {
    const toast = createMockToast({ variant: 'default', title: 'Default' });
    const { container } = await render(<ToastItem toast={toast} onDismiss={onDismiss} />);
    expect(container).toBeTruthy();
  });

  it('renders with success variant', async () => {
    const toast = createMockToast({ variant: 'success', title: 'Done!' });
    const { container } = await render(<ToastItem toast={toast} onDismiss={onDismiss} />);
    expect(container).toBeTruthy();
  });

  it('renders with error variant', async () => {
    const toast = createMockToast({ variant: 'error', title: 'Error!' });
    const { container } = await render(<ToastItem toast={toast} onDismiss={onDismiss} />);
    expect(container).toBeTruthy();
  });

  it('renders with warning variant', async () => {
    const toast = createMockToast({ variant: 'warning', title: 'Warning!' });
    const { container } = await render(<ToastItem toast={toast} onDismiss={onDismiss} />);
    expect(container).toBeTruthy();
  });

  it('renders with info variant', async () => {
    const toast = createMockToast({ variant: 'info', title: 'Info!' });
    const { container } = await render(<ToastItem toast={toast} onDismiss={onDismiss} />);
    expect(container).toBeTruthy();
  });

  it('renders with loading variant', async () => {
    const toast = createMockToast({ variant: 'loading', title: 'Loading...' });
    const { container } = await render(<ToastItem toast={toast} onDismiss={onDismiss} />);
    expect(container).toBeTruthy();
  });

  it('renders with description', async () => {
    const toast = createMockToast({ title: 'Title', description: 'Description text' });
    const { container } = await render(<ToastItem toast={toast} onDismiss={onDismiss} />);
    expect(container).toBeTruthy();
  });

  it('renders with action button', async () => {
    const onPress = jest.fn();
    const toast = createMockToast({
      title: 'Title',
      action: { label: 'Undo', onPress },
    });
    const { container } = await render(<ToastItem toast={toast} onDismiss={onDismiss} />);
    expect(container).toBeTruthy();
  });

  it('renders with dark theme', async () => {
    const toast = createMockToast({ title: 'Dark Toast' });
    const { container } = await render(<ToastItem toast={toast} onDismiss={onDismiss} theme="dark" />);
    expect(container).toBeTruthy();
  });

  it('renders with light theme', async () => {
    const toast = createMockToast({ title: 'Light Toast' });
    const { container } = await render(<ToastItem toast={toast} onDismiss={onDismiss} theme="light" />);
    expect(container).toBeTruthy();
  });

  it('renders with custom fillColor', async () => {
    const toast = createMockToast({ fillColor: '#FF0000', title: 'Red' });
    const { container } = await render(<ToastItem toast={toast} onDismiss={onDismiss} />);
    expect(container).toBeTruthy();
  });

  it('renders with custom borderColor', async () => {
    const toast = createMockToast({ borderColor: '#000', borderWidth: 2 });
    const { container } = await render(<ToastItem toast={toast} onDismiss={onDismiss} />);
    expect(container).toBeTruthy();
  });

  it('renders with showProgress', async () => {
    const toast = createMockToast({ showProgress: true });
    const { container } = await render(<ToastItem toast={toast} onDismiss={onDismiss} />);
    expect(container).toBeTruthy();
  });

  it('renders with showTimestamp', async () => {
    const toast = createMockToast({ showTimestamp: true });
    const { container } = await render(<ToastItem toast={toast} onDismiss={onDismiss} />);
    expect(container).toBeTruthy();
  });

  it('renders with custom icon', async () => {
    const toast = createMockToast({ icon: <></> });
    const { container } = await render(<ToastItem toast={toast} onDismiss={onDismiss} />);
    expect(container).toBeTruthy();
  });
});
