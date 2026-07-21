import { toastManager } from '../core/toast-manager';

describe('ToastManager', () => {
  beforeEach(() => {
    toastManager.dismissAll();
  });

  describe('create', () => {
    it('creates a toast with default options', () => {
      const toast = toastManager.create('Hello');
      expect(toast.id).toMatch(/^toast-/);
      expect(toast.options.title).toBe('Hello');
      expect(toast.options.variant).toBe('default');
      expect(toast.options.position).toBe('bottom');
      expect(toast.options.duration).toBe(4000);
      expect(toast.options.dismissible).toBe(true);
    });

    it('creates a toast with custom options', () => {
      const toast = toastManager.create('Custom', {
        variant: 'success',
        position: 'top-left',
        duration: 2000,
        dismissible: false,
      });
      expect(toast.options.variant).toBe('success');
      expect(toast.options.position).toBe('top-left');
      expect(toast.options.duration).toBe(2000);
      expect(toast.options.dismissible).toBe(false);
    });

    it('uses provided id', () => {
      const toast = toastManager.create('Test', { id: 'custom-id' });
      expect(toast.id).toBe('custom-id');
    });

    it('adds toast to the list', () => {
      toastManager.create('First');
      expect(toastManager.getToasts()).toHaveLength(1);
    });

    it('returns a toast with dismiss function', () => {
      const toast = toastManager.create('Test');
      expect(typeof toast.dismiss).toBe('function');
    });

    it('returns a toast with update function', () => {
      const toast = toastManager.create('Test');
      expect(typeof toast.update).toBe('function');
    });
  });

  describe('maxToasts', () => {
    it('limits toasts to maxToasts (default 5)', () => {
      for (let i = 0; i < 7; i++) {
        toastManager.create(`Toast ${i}`);
      }
      expect(toastManager.getToasts()).toHaveLength(5);
    });

    it('removes oldest toasts when limit exceeded', () => {
      toastManager.create('First');
      toastManager.create('Second');
      toastManager.create('Third');
      toastManager.create('Fourth');
      toastManager.create('Fifth');
      toastManager.create('Sixth');
      const toasts = toastManager.getToasts();
      expect(toasts[0].options.title).toBe('Second');
      expect(toasts[4].options.title).toBe('Sixth');
    });

    it('respects custom maxToasts', () => {
      toastManager.setMaxToasts(2);
      toastManager.create('A');
      toastManager.create('B');
      toastManager.create('C');
      expect(toastManager.getToasts()).toHaveLength(2);
      toastManager.setMaxToasts(5);
    });
  });

  describe('dismiss', () => {
    it('removes a toast by id', () => {
      const toast = toastManager.create('Test');
      toastManager.dismiss(toast.id);
      expect(toastManager.getToasts()).toHaveLength(0);
    });

    it('calls onDismiss callback', () => {
      const onDismiss = jest.fn();
      const toast = toastManager.create('Test', { onDismiss });
      toastManager.dismiss(toast.id);
      expect(onDismiss).toHaveBeenCalledTimes(1);
    });

    it('does nothing for non-existent id', () => {
      toastManager.create('Test');
      toastManager.dismiss('non-existent');
      expect(toastManager.getToasts()).toHaveLength(1);
    });
  });

  describe('dismissAll', () => {
    it('removes all toasts', () => {
      toastManager.create('A');
      toastManager.create('B');
      toastManager.create('C');
      toastManager.dismissAll();
      expect(toastManager.getToasts()).toHaveLength(0);
    });

    it('calls onDismiss for each toast', () => {
      const onDismiss1 = jest.fn();
      const onDismiss2 = jest.fn();
      toastManager.create('A', { onDismiss: onDismiss1 });
      toastManager.create('B', { onDismiss: onDismiss2 });
      toastManager.dismissAll();
      expect(onDismiss1).toHaveBeenCalledTimes(1);
      expect(onDismiss2).toHaveBeenCalledTimes(1);
    });
  });

  describe('update', () => {
    it('updates toast options', () => {
      const toast = toastManager.create('Original');
      toastManager.update(toast.id, { title: 'Updated' });
      const updated = toastManager.getToasts().find((t) => t.id === toast.id);
      expect(updated?.options.title).toBe('Updated');
    });

    it('does nothing for non-existent id', () => {
      toastManager.create('Test');
      toastManager.update('non-existent', { title: 'Updated' });
      expect(toastManager.getToasts()[0].options.title).toBe('Test');
    });

    it('preserves existing options when partial update', () => {
      const toast = toastManager.create('Test', { variant: 'success' });
      toastManager.update(toast.id, { title: 'New Title' });
      const updated = toastManager.getToasts().find((t) => t.id === toast.id);
      expect(updated?.options.title).toBe('New Title');
      expect(updated?.options.variant).toBe('success');
    });
  });

  describe('subscribe', () => {
    it('notifies listeners on changes', () => {
      const listener = jest.fn();
      const unsubscribe = toastManager.subscribe(listener);
      toastManager.create('Test');
      expect(listener).toHaveBeenCalled();
      unsubscribe();
    });

    it('stops notifying after unsubscribe', () => {
      const listener = jest.fn();
      const unsubscribe = toastManager.subscribe(listener);
      unsubscribe();
      toastManager.create('Test');
      expect(listener).not.toHaveBeenCalled();
    });
  });

  describe('promise', () => {
    it('creates a loading toast', async () => {
      const promise = new Promise<string>((resolve) => {
        setTimeout(() => resolve('done'), 50);
      });

      toastManager.promise(promise, {
        loading: 'Loading...',
        success: 'Done!',
        error: 'Failed!',
      });

      const toasts = toastManager.getToasts();
      expect(toasts).toHaveLength(1);
      expect(toasts[0].options.title).toBe('Loading...');
      expect(toasts[0].options.variant).toBe('loading');
    });

    it('resolves to success toast', async () => {
      const promise = Promise.resolve('result');

      toastManager.promise(promise, {
        loading: 'Loading...',
        success: (data) => `Success: ${data}`,
        error: 'Failed!',
      });

      await new Promise<void>((r) => setTimeout(r, 10));

      const toasts = toastManager.getToasts();
      expect(toasts[0].options.title).toBe('Success: result');
      expect(toasts[0].options.variant).toBe('success');
    });

    it('resolves to error toast', async () => {
      const promise = Promise.reject(new Error('fail'));

      toastManager.promise(promise, {
        loading: 'Loading...',
        success: 'Done!',
        error: (err: any) => `Error: ${err.message}`,
      });

      await new Promise<void>((r) => setTimeout(r, 10));

      const toasts = toastManager.getToasts();
      expect(toasts[0].options.title).toBe('Error: fail');
      expect(toasts[0].options.variant).toBe('error');
    });

    it('supports static success/error strings', async () => {
      const promise = Promise.resolve('data');

      toastManager.promise(promise, {
        loading: 'Loading...',
        success: 'All good!',
        error: 'Oops!',
      });

      await new Promise<void>((r) => setTimeout(r, 10));

      expect(toastManager.getToasts()[0].options.title).toBe('All good!');
    });
  });
});
