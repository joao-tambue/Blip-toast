import React from 'react';
import Svg, { Circle, Line } from 'react-native-svg';

interface IconProps {
  size?: number;
  color?: string;
}

export const InfoIcon: React.FC<IconProps> = ({ size = 18, color = '#1E88E5' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <Circle cx="12" cy="12" r="10" />
    <Line x1="12" y1="16" x2="12" y2="12" />
    <Line x1="12" y1="8" x2="12.01" y2="8" />
  </Svg>
);
