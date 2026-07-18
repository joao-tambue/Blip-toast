import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Easing,
} from 'react-native';
import type { Toast, ToastPhase } from '../core/types';
import { animationPresets } from '../core/presets';
import { DefaultIcon, SuccessIcon, ErrorIcon, WarningIcon, InfoIcon, SpinnerIcon } from '../icons';
import { ProgressBar } from './ProgressBar';

export interface ToastItemProps {
  toast: Toast;
  onDismiss: (id: string) => void;
  theme?: 'light' | 'dark';
}

const PHASE_ICON_MAP: Record<Exclude<ToastPhase, 'loading'>, React.FC<{ size?: number; color?: string }>> = {
  default: DefaultIcon,
  success: SuccessIcon,
  error: ErrorIcon,
  warning: WarningIcon,
  info: InfoIcon,
};

const PHASE_COLOR_MAP: Record<ToastPhase, string> = {
  loading: '#555',
  default: '#555',
  success: '#4CAF50',
  error: '#E53935',
  warning: '#C49000',
  info: '#1E88E5',
};

const PHASE_BG_MAP: Record<ToastPhase, string> = {
  loading: '#f5f5f5',
  default: '#f5f5f5',
  success: '#f5f5f5',
  error: '#f5f5f5',
  warning: '#f5f5f5',
  info: '#f5f5f5',
};

const DARK_PHASE_BG_MAP: Record<ToastPhase, string> = {
  loading: '#1a1a1a',
  default: '#1a1a1a',
  success: '#1a1a1a',
  error: '#1a1a1a',
  warning: '#1a1a1a',
  info: '#1a1a1a',
};

const PHASE_PROGRESS_MAP: Record<ToastPhase, string> = {
  loading: '#1E88E5',
  default: '#999',
  success: '#4CAF50',
  error: '#E53935',
  warning: '#C49000',
  info: '#1E88E5',
};

const DEFAULT_DISPLAY_DURATION = 4000;

export const ToastItem: React.FC<ToastItemProps> = ({ toast, onDismiss, theme = 'light' }) => {
  const { options } = toast;
  const [phase, setPhase] = useState<ToastPhase>(options.variant || 'default');
  const [title, setTitle] = useState(options.title || '');
  const [description, setDescription] = useState(options.description);
  const [action, setAction] = useState(options.action);
  const [isDismissing, setIsDismissing] = useState(false);

  const expandAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current;
  const shakeAnim = useRef(new Animated.Value(0)).current;

  // Resolve preset
  const presetConfig = options.preset ? animationPresets[options.preset] : undefined;
  const useSpring = options.spring ?? presetConfig?.spring ?? true;
  const bounceVal = options.bounce ?? presetConfig?.bounce ?? 0.4;

  // Theme colors
  const isDark = theme === 'dark';
  const fillColor = options.fillColor || (isDark ? '#1a1a1a' : '#ffffff');
  const bgColor = isDark ? DARK_PHASE_BG_MAP[phase] : PHASE_BG_MAP[phase];
  const iconColor = isDark
    ? (phase === 'default' || phase === 'loading' ? '#ccc' : PHASE_COLOR_MAP[phase])
    : PHASE_COLOR_MAP[phase];

  // Timestamp
  const createdAtRef = useRef(new Date());
  const timestampStr = useMemo(
    () => createdAtRef.current.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' }),
    [],
  );

  const hasDescription = Boolean(description);
  const hasAction = Boolean(action);
  const shouldExpand = hasDescription || hasAction;

  // Entry animation
  useEffect(() => {
    Animated.parallel([
      Animated.spring(fadeAnim, {
        toValue: 1,
        tension: 200,
        friction: 20,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 200,
        friction: 20,
        useNativeDriver: true,
      }),
    ]).start();

    // Landing squish animation
    if (useSpring) {
      const squishAnim = new Animated.Value(0);
      Animated.sequence([
        Animated.timing(squishAnim, {
          toValue: 1,
          duration: 100,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.spring(squishAnim, {
          toValue: 0,
          tension: 200 + bounceVal * 400,
          friction: 10 + bounceVal * 5,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [fadeAnim, scaleAnim, useSpring, bounceVal]);

  // Expand animation
  useEffect(() => {
    if (shouldExpand && !isDismissing) {
      Animated.spring(expandAnim, {
        toValue: 1,
        tension: 200 + bounceVal * 400,
        friction: 10 + bounceVal * 5,
        useNativeDriver: true,
      }).start();
    }
  }, [shouldExpand, isDismissing, expandAnim, bounceVal]);

  // Error shake animation
  useEffect(() => {
    if (phase === 'error' && !isDismissing) {
      Animated.sequence([
        Animated.timing(shakeAnim, {
          toValue: 10,
          duration: 50,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnim, {
          toValue: -10,
          duration: 50,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnim, {
          toValue: 6,
          duration: 50,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnim, {
          toValue: -6,
          duration: 50,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnim, {
          toValue: 0,
          duration: 50,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [phase, isDismissing, shakeAnim]);

  // Auto dismiss
  useEffect(() => {
    const duration = options.timing?.displayDuration ?? options.duration ?? DEFAULT_DISPLAY_DURATION;
    if (duration === Infinity) return;

    const timer = setTimeout(() => {
      handleDismiss();
    }, duration);

    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    setIsDismissing(true);
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onDismiss(toast.id);
    });
  };

  const handleActionPress = () => {
    if (action?.successLabel) {
      setPhase('success');
      setTitle(action.successLabel);
      setAction(undefined);
      setDescription(undefined);
    }
    action?.onPress();
  };

  const renderIcon = () => {
    if (options.icon) {
      return options.icon;
    }

    if (phase === 'loading') {
      return <SpinnerIcon size={18} color={iconColor} />;
    }

    const IconComponent = PHASE_ICON_MAP[phase];
    return <IconComponent size={18} color={iconColor} />;
  };

  return (
    <Animated.View
      style={[
        styles.wrapper,
        {
          opacity: fadeAnim,
          transform: [
            { scale: scaleAnim },
            { translateX: shakeAnim },
          ],
          backgroundColor: fillColor,
          borderColor: options.borderColor || 'transparent',
          borderWidth: options.borderWidth || 0,
        },
      ]}
      accessible={true}
      accessibilityRole={phase === 'error' || phase === 'warning' ? 'alert' : 'text'}
    >
      <View style={[styles.content, { backgroundColor: bgColor, borderRadius: 20 }]}>
        <View style={styles.header}>
          <View style={styles.iconWrapper}>
            {renderIcon()}
          </View>
          <Text style={[styles.title, { color: iconColor }]} numberOfLines={1}>
            {title}
          </Text>
          {options.showTimestamp !== false && (
            <Text style={styles.timestamp}>{timestampStr}</Text>
          )}
        </View>

        {shouldExpand && (
          <Animated.View
            style={[
              styles.body,
              {
                opacity: expandAnim,
              },
            ]}
          >
            {description && (
              <Text style={styles.description}>{description}</Text>
            )}
            {action && (
              <TouchableOpacity
                style={[styles.actionButton, { backgroundColor: `${iconColor}20` }]}
                onPress={handleActionPress}
              >
                <Text style={[styles.actionText, { color: iconColor }]}>
                  {action.label}
                </Text>
              </TouchableOpacity>
            )}
          </Animated.View>
        )}

        {options.showProgress === true && (
          <ProgressBar
            duration={options.timing?.displayDuration ?? options.duration ?? DEFAULT_DISPLAY_DURATION}
            color={PHASE_PROGRESS_MAP[phase]}
            style={styles.progressBar}
          />
        )}
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal: 16,
    borderRadius: 24,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },
  content: {
    padding: 12,
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconWrapper: {
    width: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 13,
    fontWeight: '700',
    flex: 1,
  },
  timestamp: {
    fontSize: 11,
    color: '#999',
    marginLeft: 'auto',
  },
  body: {
    marginTop: 8,
  },
  description: {
    fontSize: 13,
    color: '#444',
    lineHeight: 18,
  },
  actionButton: {
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 999,
    alignItems: 'center',
  },
  actionText: {
    fontSize: 13,
    fontWeight: '700',
  },
  progressBar: {
    marginTop: 8,
  },
});
