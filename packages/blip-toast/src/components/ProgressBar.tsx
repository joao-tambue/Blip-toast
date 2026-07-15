import React, { useEffect, useRef } from 'react';
import { Animated, Easing, ViewStyle } from 'react-native';

interface ProgressBarProps {
  duration: number;
  color?: string;
  paused?: boolean;
  onComplete?: () => void;
  style?: ViewStyle;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  duration,
  color = '#999',
  paused = false,
  onComplete,
  style,
}) => {
  const progressAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (paused) {
      progressAnim.stopAnimation();
      return;
    }

    progressAnim.setValue(1);
    Animated.timing(progressAnim, {
      toValue: 0,
      duration,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start(() => {
      onComplete?.();
    });
  }, [duration, paused, progressAnim, onComplete]);

  return (
    <Animated.View
      style={[
        style,
        {
          height: 3,
          borderRadius: 2,
          backgroundColor: 'rgba(0, 0, 0, 0.06)',
          overflow: 'hidden',
        },
      ]}
    >
      <Animated.View
        style={{
          height: '100%',
          borderRadius: 2,
          backgroundColor: color,
          transform: [{ scaleX: progressAnim }],
          transformOrigin: 'left',
        }}
      />
    </Animated.View>
  );
};
