import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { useToasts } from '../hooks/use-toasts';
import { ToastItem } from './ToastItem';
import { toastManager } from '../core/toast-manager';

export interface ToastContainerProps {
  position?: 'top' | 'bottom' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ position = 'bottom' }) => {
  const toasts = useToasts();

  const positionStyles = getPositionStyles(position);

  return (
    <View style={[styles.container, positionStyles]} pointerEvents="box-none">
      {toasts.map((toast) => (
        <ToastItem
          key={toast.id}
          toast={toast}
          onDismiss={(id) => toastManager.dismiss(id)}
        />
      ))}
    </View>
  );
};

function getPositionStyles(position: string) {
  const baseStyle: object = {
    position: 'absolute',
    left: 0,
    right: 0,
  };

  switch (position) {
    case 'top':
      return {
        ...baseStyle,
        top: Platform.OS === 'ios' ? 60 : 40,
        alignItems: 'center',
      };
    case 'bottom':
      return {
        ...baseStyle,
        bottom: Platform.OS === 'ios' ? 40 : 20,
        alignItems: 'center',
      };
    case 'top-left':
      return {
        ...baseStyle,
        top: Platform.OS === 'ios' ? 60 : 40,
        alignItems: 'flex-start',
      };
    case 'top-right':
      return {
        ...baseStyle,
        top: Platform.OS === 'ios' ? 60 : 40,
        alignItems: 'flex-end',
      };
    case 'bottom-left':
      return {
        ...baseStyle,
        bottom: Platform.OS === 'ios' ? 40 : 20,
        alignItems: 'flex-start',
      };
    case 'bottom-right':
      return {
        ...baseStyle,
        bottom: Platform.OS === 'ios' ? 40 : 20,
        alignItems: 'flex-end',
      };
    default:
      return baseStyle;
  }
}

const styles = StyleSheet.create({
  container: {
    zIndex: 9999,
    elevation: 9999,
  },
});
