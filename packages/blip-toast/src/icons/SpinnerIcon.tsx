import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface IconProps {
  size?: number;
  color?: string;
}

export const SpinnerIcon: React.FC<IconProps> = ({ size = 18, color = '#555' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M21 12a9 9 0 1 1-6.219-8.56" />
  </Svg>
);
