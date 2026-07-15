import React, { useEffect, useRef } from 'react';
import { Animated, Easing, ViewStyle } from 'react-native';

interface MorphAnimationProps {
  expanded: boolean;
  spring?: boolean;
  bounce?: number;
  duration?: number;
  children: React.ReactNode;
  style?: ViewStyle;
  onAnimationComplete?: () => void;
}

export const MorphAnimation: React.FC<MorphAnimationProps> = ({
  expanded,
  spring: _spring,
  bounce = 0.4,
  duration: _duration,
  children,
  style,
  onAnimationComplete,
}) => {
  const scaleYAnim = useRef(new Animated.Value(1)).current;
  const scaleXAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (expanded) {
      // Expand animation: squish down then bounce up
      Animated.sequence([
        // Initial squish
        Animated.timing(scaleYAnim, {
          toValue: 0.85,
          duration: 100,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        // Bounce back
        Animated.spring(scaleYAnim, {
          toValue: 1,
          tension: 200 + bounce * 400,
          friction: 10 + bounce * 5,
          useNativeDriver: true,
        }),
      ]).start(() => {
        onAnimationComplete?.();
      });

      // Horizontal squish
      Animated.sequence([
        Animated.timing(scaleXAnim, {
          toValue: 1.05,
          duration: 100,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.spring(scaleXAnim, {
          toValue: 1,
          tension: 200 + bounce * 400,
          friction: 10 + bounce * 5,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      // Collapse animation
      Animated.parallel([
        Animated.spring(scaleYAnim, {
          toValue: 1,
          tension: 200 + bounce * 400,
          friction: 10 + bounce * 5,
          useNativeDriver: true,
        }),
        Animated.spring(scaleXAnim, {
          toValue: 1,
          tension: 200 + bounce * 400,
          friction: 10 + bounce * 5,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [expanded, bounce, scaleYAnim, scaleXAnim, onAnimationComplete]);

  return (
    <Animated.View
      style={[
        style,
        {
          transform: [{ scaleY: scaleYAnim }, { scaleX: scaleXAnim }],
        },
      ]}
    >
      {children}
    </Animated.View>
  );
};
