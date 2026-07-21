import React from 'react';
import { render } from '@testing-library/react-native';
import { ToastContainer } from '../components/ToastContainer';
import { toastManager } from '../core/toast-manager';

beforeEach(() => {
  toastManager.dismissAll();
});

describe('ToastContainer', () => {
  it('renders without toasts', async () => {
    const { container } = await render(<ToastContainer />);
    expect(container).toBeTruthy();
  });

  it('renders with position prop', async () => {
    const { container } = await render(<ToastContainer position="top-left" />);
    expect(container).toBeTruthy();
  });

  it('renders with theme prop', async () => {
    const { container } = await render(<ToastContainer theme="dark" />);
    expect(container).toBeTruthy();
  });

  it('renders with system theme', async () => {
    const { container } = await render(<ToastContainer theme="system" />);
    expect(container).toBeTruthy();
  });

  it('renders with custom gap and offset', async () => {
    const { container } = await render(<ToastContainer gap={16} offset={32} />);
    expect(container).toBeTruthy();
  });

  it('renders with custom maxVisible', async () => {
    const { container } = await render(<ToastContainer maxVisible={5} />);
    expect(container).toBeTruthy();
  });

  it('renders toasts when they exist', async () => {
    toastManager.create('Test Toast');
    const { container } = await render(<ToastContainer />);
    expect(container).toBeTruthy();
  });
});
