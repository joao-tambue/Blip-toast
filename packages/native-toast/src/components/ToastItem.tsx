import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import type { Toast } from '../core/types';

export interface ToastItemProps {
  toast: Toast;
  onDismiss: (id: string) => void;
}

export const ToastItem: React.FC<ToastItemProps> = ({ toast, onDismiss }) => {
  const { options } = toast;

  const variantStyles = {
    default: styles.default,
    success: styles.success,
    error: styles.error,
    warning: styles.warning,
    info: styles.info,
  };

  return (
    <Animated.View style={[styles.container, variantStyles[options.variant || 'default']]}>
      <TouchableOpacity
        style={styles.content}
        onPress={() => {
          options.onPress?.();
          if (options.dismissible) {
            onDismiss(toast.id);
          }
        }}
        activeOpacity={0.8}
      >
        {options.icon && <View style={styles.icon}>{options.icon}</View>}
        <View style={styles.textContainer}>
          {options.title && <Text style={styles.title}>{options.title}</Text>}
          {options.description && (
            <Text style={styles.description}>{options.description}</Text>
          )}
        </View>
        {options.action && (
          <TouchableOpacity onPress={options.action.onPress} style={styles.actionButton}>
            <Text style={styles.actionText}>{options.action.label}</Text>
          </TouchableOpacity>
        )}
        {options.dismissible && (
          <TouchableOpacity
            onPress={() => onDismiss(toast.id)}
            style={styles.dismissButton}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Text style={styles.dismissText}>✕</Text>
          </TouchableOpacity>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginVertical: 4,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  icon: {
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  description: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    marginTop: 2,
  },
  actionButton: {
    marginLeft: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  actionText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  dismissButton: {
    marginLeft: 8,
    padding: 4,
  },
  dismissText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 16,
  },
  default: {
    backgroundColor: '#333',
  },
  success: {
    backgroundColor: '#10b981',
  },
  error: {
    backgroundColor: '#ef4444',
  },
  warning: {
    backgroundColor: '#f59e0b',
  },
  info: {
    backgroundColor: '#3b82f6',
  },
});
