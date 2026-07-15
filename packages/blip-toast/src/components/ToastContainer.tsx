import React from 'react';
import { View, StyleSheet, Platform, useColorScheme } from 'react-native';
import { useToasts } from '../hooks/use-toasts';
import { ToastItem } from './ToastItem';
import { toastManager } from '../core/toast-manager';

export interface ToastContainerProps {
  position?: 'top' | 'bottom' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  theme?: 'light' | 'dark' | 'system';
  gap?: number;
  offset?: number;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({
  position = 'bottom-right',
  theme = 'system',
  gap = 14,
  offset = 24,
}) => {
  const toasts = useToasts();
  const systemColorScheme = useColorScheme();

  const resolvedTheme = theme === 'system'
    ? (systemColorScheme === 'dark' ? 'dark' : 'light')
    : theme;

  const positionStyles = getPositionStyles(position, offset);

  return (
    <View style={[styles.container, positionStyles]} pointerEvents="box-none">
      {toasts.map((toast, index) => (
        <View
          key={toast.id}
          style={{
            marginBottom: index < toasts.length - 1 ? gap : 0,
          }}
        >
          <ToastItem
            toast={toast}
            onDismiss={(id) => toastManager.dismiss(id)}
            theme={resolvedTheme}
          />
        </View>
      ))}
    </View>
  );
};

function getPositionStyles(position: string, offset: number): ViewStyle {
  const baseStyle: ViewStyle = {
    position: 'absolute',
    left: 0,
    right: 0,
  };

  const statusBarHeight = Platform.OS === 'ios' ? 60 : 40;
  const bottomOffset = Platform.OS === 'ios' ? 40 : 20;

  switch (position) {
    case 'top':
      return {
        ...baseStyle,
        top: statusBarHeight + offset,
        alignItems: 'center',
      };
    case 'bottom':
      return {
        ...baseStyle,
        bottom: bottomOffset + offset,
        alignItems: 'center',
      };
    case 'top-left':
      return {
        ...baseStyle,
        top: statusBarHeight + offset,
        alignItems: 'flex-start',
        paddingLeft: offset,
      };
    case 'top-right':
      return {
        ...baseStyle,
        top: statusBarHeight + offset,
        alignItems: 'flex-end',
        paddingRight: offset,
      };
    case 'bottom-left':
      return {
        ...baseStyle,
        bottom: bottomOffset + offset,
        alignItems: 'flex-start',
        paddingLeft: offset,
      };
    case 'bottom-right':
      return {
        ...baseStyle,
        bottom: bottomOffset + offset,
        alignItems: 'flex-end',
        paddingRight: offset,
      };
    default:
      return baseStyle;
  }
}

interface ViewStyle {
  position?: 'absolute';
  left?: number;
  right?: number;
  top?: number;
  bottom?: number;
  alignItems?: 'flex-start' | 'flex-end' | 'center';
  paddingLeft?: number;
  paddingRight?: number;
}

const styles = StyleSheet.create({
  container: {
    zIndex: 9999,
    elevation: 9999,
  },
});
