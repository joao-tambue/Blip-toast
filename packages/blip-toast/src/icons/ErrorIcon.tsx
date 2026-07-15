import React from 'react';
import Svg, { Path, Circle } from 'react-native-svg';

interface IconProps {
  size?: number;
  color?: string;
}

export const ErrorIcon: React.FC<IconProps> = ({ size = 18, color = '#E53935' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <Circle cx="12" cy="12" r="10" />
    <Path d="M15 9l-6 6" />
    <Path d="M9 9l6 6" />
  </Svg>
);
