import { useRef, useEffect } from 'react';
import { Animated } from 'react-native';

export { MorphAnimation } from './MorphAnimation';

export function useSlideIn(duration = 300) {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(-20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration,
        useNativeDriver: true,
      }),
      Animated.spring(translateY, {
        toValue: 0,
        damping: 15,
        stiffness: 150,
        useNativeDriver: true,
      }),
    ]).start();
  }, [duration, opacity, translateY]);

  return {
    opacity,
    transform: [{ translateY }],
  };
}

export function useSlideOut(duration = 200) {
  const opacity = useRef(new Animated.Value(1)).current;
  const translateY = useRef(new Animated.Value(0)).current;

  const animate = (callback?: () => void) => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 0,
        duration,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: -20,
        duration,
        useNativeDriver: true,
      }),
    ]).start(callback);
  };

  return {
    animate,
    style: {
      opacity,
      transform: [{ translateY }],
    },
  };
}
