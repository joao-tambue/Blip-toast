import React from 'react';
import { render } from '@testing-library/react-native';
import { ProgressBar } from '../components/ProgressBar';

describe('ProgressBar', () => {
  it('renders without crashing', async () => {
    const { container } = await render(<ProgressBar duration={4000} />);
    expect(container).toBeTruthy();
  });

  it('renders with custom color', async () => {
    const { container } = await render(<ProgressBar duration={4000} color="#4CAF50" />);
    expect(container).toBeTruthy();
  });

  it('renders with paused state', async () => {
    const { container } = await render(<ProgressBar duration={4000} paused />);
    expect(container).toBeTruthy();
  });

  it('renders with onComplete callback', async () => {
    const onComplete = jest.fn();
    const { container } = await render(
      <ProgressBar duration={4000} onComplete={onComplete} />,
    );
    expect(container).toBeTruthy();
  });

  it('renders with style prop', async () => {
    const { container } = await render(
      <ProgressBar duration={4000} style={{ marginTop: 8 }} />,
    );
    expect(container).toBeTruthy();
  });

  it('calls onComplete when duration finishes', async () => {
    const onComplete = jest.fn();
    await render(<ProgressBar duration={100} onComplete={onComplete} />);
    expect(onComplete).toHaveBeenCalled();
  });
});
