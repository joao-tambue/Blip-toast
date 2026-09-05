import React, { useState, useEffect, useRef, useMemo } from 'react';
import { View, Text, TouchableOpacity, Animated, Easing } from 'react-native';
import type {
  Toast,
  ToastPhase,
  ToastRenderProps,
  ToastSlots,
  ToastStyleOverrides,
} from '../core/types';
import { animationPresets } from '../core/presets';
import { ProgressBar } from './ProgressBar';
import { defaultToastStyles } from './toast-styles';
import {
  PHASE_PROGRESS_MAP,
  renderPhaseIcon,
  resolveDisplayDuration,
  resolveToastColors,
} from './toast-presentation';

export interface ToastItemProps {
  toast: Toast;
  onDismiss: (id: string) => void;
  theme?: 'light' | 'dark';
  /** Per-slot style overrides merged over the built-in layout. */
  styles?: ToastStyleOverrides;
  /** Component overrides for individual pieces of the built-in layout. */
  slots?: ToastSlots;
  /** Full control over the inner card. The library still owns animations,
   *  timing, gestures and accessibility. */
  renderToast?: (props: ToastRenderProps) => React.ReactNode;
}

export const ToastItem: React.FC<ToastItemProps> = ({
  toast,
  onDismiss,
  theme = 'light',
  styles: styleOverrides,
  slots,
  renderToast,
}) => {
  const { options } = toast;
  const [phase, setPhase] = useState<ToastPhase>(options.variant || 'default');
  const [title, setTitle] = useState(options.title || '');
  const [description, setDescription] = useState(options.description);
  const [action, setAction] = useState(options.action);
  const [isDismissing, setIsDismissing] = useState(false);

  useEffect(() => {
    setPhase(options.variant || 'default');
  }, [options.variant]);

  useEffect(() => {
    setTitle(options.title || '');
  }, [options.title]);

  useEffect(() => {
    setDescription(options.description);
  }, [options.description]);

  useEffect(() => {
    setAction(options.action);
  }, [options.action]);

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
  const colors = resolveToastColors(phase, options, theme);

  // Timestamp
  const createdAtRef = useRef(new Date());
  const timestampStr = useMemo(
    () =>
      createdAtRef.current.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' }),
    []
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
    const duration = resolveDisplayDuration(options);
    if (duration === Infinity) return;

    const timer = setTimeout(() => {
      handleDismiss();
    }, duration);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const showProgress = options.showProgress === true;
  const progressDuration = resolveDisplayDuration(options);

  const iconNode = useMemo(() => {
    if (options.icon) return options.icon;
    if (slots?.Icon) {
      const SlotIcon = slots.Icon;
      return <SlotIcon phase={phase} color={colors.accent} size={18} />;
    }
    return renderPhaseIcon(phase, colors.accent, 18);
  }, [options.icon, slots, phase, colors.accent]);

  const progressNode = useMemo(() => {
    if (!showProgress) return null;
    if (slots?.Progress) {
      const SlotProgress = slots.Progress;
      return (
        <SlotProgress duration={progressDuration} color={PHASE_PROGRESS_MAP[phase]} phase={phase} />
      );
    }
    return (
      <ProgressBar
        duration={progressDuration}
        color={PHASE_PROGRESS_MAP[phase]}
        style={[defaultToastStyles.progressBar, styleOverrides?.progressBar]}
      />
    );
  }, [showProgress, slots, progressDuration, phase, styleOverrides?.progressBar]);

  const accessibilityRole: 'alert' | 'text' =
    phase === 'error' || phase === 'warning' ? 'alert' : 'text';

  // Headless: caller owns the inner card
  if (renderToast) {
    const renderProps: ToastRenderProps = {
      toast,
      id: toast.id,
      phase,
      title,
      description,
      action,
      theme: isDark ? 'dark' : 'light',
      isDark,
      colors,
      timestamp: timestampStr,
      isExpanded: shouldExpand,
      icon: iconNode,
      progressBar: progressNode,
      dismiss: handleDismiss,
      runAction: handleActionPress,
    };

    return (
      <Animated.View
        style={{
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim }, { translateX: shakeAnim }],
        }}
        accessible={true}
        accessibilityRole={accessibilityRole}
      >
        {renderToast(renderProps)}
      </Animated.View>
    );
  }

  // Built-in layout
  const SlotActionButton = slots?.ActionButton;

  return (
    <Animated.View
      style={[
        defaultToastStyles.wrapper,
        {
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim }, { translateX: shakeAnim }],
          backgroundColor: colors.background,
          borderColor: options.borderColor || 'transparent',
          borderWidth: options.borderWidth || 0,
        },
        styleOverrides?.wrapper,
      ]}
      accessible={true}
      accessibilityRole={accessibilityRole}
    >
      <View
        style={[
          defaultToastStyles.content,
          { backgroundColor: colors.surface, borderRadius: 20 },
          styleOverrides?.content,
        ]}
      >
        <View style={[defaultToastStyles.header, styleOverrides?.header]}>
          <View style={[defaultToastStyles.iconWrapper, styleOverrides?.iconWrapper]}>
            {iconNode}
          </View>
          <Text
            style={[defaultToastStyles.title, { color: colors.accent }, styleOverrides?.title]}
            numberOfLines={1}
          >
            {title}
          </Text>
          {options.showTimestamp !== false && (
            <Text style={[defaultToastStyles.timestamp, styleOverrides?.timestamp]}>
              {timestampStr}
            </Text>
          )}
        </View>

        {shouldExpand && (
          <Animated.View
            style={[defaultToastStyles.body, { opacity: expandAnim }, styleOverrides?.body]}
          >
            {description && (
              <Text style={[defaultToastStyles.description, styleOverrides?.description]}>
                {description}
              </Text>
            )}
            {action &&
              (SlotActionButton ? (
                <SlotActionButton
                  label={action.label}
                  onPress={handleActionPress}
                  color={colors.accent}
                  phase={phase}
                />
              ) : (
                <TouchableOpacity
                  style={[
                    defaultToastStyles.actionButton,
                    { backgroundColor: `${colors.accent}20` },
                    styleOverrides?.actionButton,
                  ]}
                  onPress={handleActionPress}
                >
                  <Text
                    style={[
                      defaultToastStyles.actionText,
                      { color: colors.accent },
                      styleOverrides?.actionText,
                    ]}
                  >
                    {action.label}
                  </Text>
                </TouchableOpacity>
              ))}
          </Animated.View>
        )}

        {progressNode}
      </View>
    </Animated.View>
  );
};
