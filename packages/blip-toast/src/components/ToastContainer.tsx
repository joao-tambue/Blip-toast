import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, Platform, useColorScheme, Animated } from 'react-native';
import { useToasts } from '../hooks/use-toasts';
import { ToastItem } from './ToastItem';
import { toastManager } from '../core/toast-manager';

export interface ToastContainerProps {
  position?: 'top' | 'bottom' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  theme?: 'light' | 'dark' | 'system';
  gap?: number;
  offset?: number;
  maxVisible?: number;
}

interface StackAnimValues {
  translateY: Animated.Value;
  scale: Animated.Value;
  opacity: Animated.Value;
}

const SPRING_CONFIG = { tension: 180, friction: 22, useNativeDriver: true };

export const ToastContainer: React.FC<ToastContainerProps> = ({
  position = 'bottom-right',
  theme = 'system',
  gap = 8,
  offset = 24,
  maxVisible = 3,
}) => {
  const toasts = useToasts();
  const systemColorScheme = useColorScheme();
  const animMap = useRef(new Map<string, StackAnimValues>());

  const resolvedTheme = theme === 'system'
    ? (systemColorScheme === 'dark' ? 'dark' : 'light')
    : theme;

  const isTop = position.startsWith('top');
  const anchorStyle = buildAnchorStyle(position, offset);

  for (const toast of toasts) {
    if (!animMap.current.has(toast.id)) {
      animMap.current.set(toast.id, {
        translateY: new Animated.Value(isTop ? -300 : 300),
        scale: new Animated.Value(0.9),
        opacity: new Animated.Value(0),
      });
    }
  }

  useEffect(() => {
    const animations: Animated.CompositeAnimation[] = [];

    const reversed = [...toasts].reverse();

    reversed.forEach((toast, stackIndex) => {
      const anims = animMap.current.get(toast.id);
      if (!anims) return;

      const isVisible = stackIndex < maxVisible;
      const targetY = stackIndex * gap;
      const targetScale = isVisible ? Math.max(0.9, 1 - stackIndex * 0.05) : 0.9;
      const targetOpacity = isVisible ? Math.max(0.4, 1 - stackIndex * 0.2) : 0;

      animations.push(
        Animated.spring(anims.translateY, { toValue: targetY, ...SPRING_CONFIG }),
        Animated.spring(anims.scale, { toValue: targetScale, ...SPRING_CONFIG }),
        Animated.spring(anims.opacity, { toValue: targetOpacity, ...SPRING_CONFIG }),
      );
    });

    if (animations.length > 0) {
      Animated.parallel(animations).start();
    }

    const currentIds = new Set(toasts.map((t) => t.id));
    for (const [id] of animMap.current) {
      if (!currentIds.has(id)) {
        animMap.current.delete(id);
      }
    }
  }, [toasts, maxVisible, gap]);

  return (
    <View style={styles.container} pointerEvents="box-none">
      {toasts.map((toast, arrayIndex) => {
        const anims = animMap.current.get(toast.id);
        if (!anims) return null;

        const stackIndex = toasts.length - 1 - arrayIndex;

        return (
          <Animated.View
            key={toast.id}
            style={[
              styles.toastAnchor,
              anchorStyle,
              {
                transform: [
                  { translateY: anims.translateY },
                  { scale: anims.scale },
                ],
                opacity: anims.opacity,
                zIndex: toasts.length - stackIndex,
                elevation: toasts.length - stackIndex,
              },
            ]}
            pointerEvents="box-none"
          >
            <ToastItem
              toast={toast}
              onDismiss={(id) => toastManager.dismiss(id)}
              theme={resolvedTheme}
            />
          </Animated.View>
        );
      })}
    </View>
  );
};

function buildAnchorStyle(position: string, offset: number): AnchorStyle {
  const statusBarHeight = Platform.OS === 'ios' ? 60 : 40;
  const bottomOffset = Platform.OS === 'ios' ? 40 : 20;

  const isTop = position.startsWith('top');
  const isLeft = position.includes('left');
  const isRight = position.includes('right');

  const style: AnchorStyle = {
    left: 0,
    right: 0,
  };

  if (isTop) {
    style.top = statusBarHeight + offset;
  } else {
    style.bottom = bottomOffset + offset;
  }

  if (isLeft) {
    style.alignItems = 'flex-start';
    style.paddingLeft = offset;
  } else if (isRight) {
    style.alignItems = 'flex-end';
    style.paddingRight = offset;
  } else {
    style.alignItems = 'center';
  }

  return style;
}

interface AnchorStyle {
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
  alignItems?: 'flex-start' | 'flex-end' | 'center';
  paddingLeft?: number;
  paddingRight?: number;
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 9999,
    elevation: 9999,
  },
  toastAnchor: {
    position: 'absolute',
  },
});
