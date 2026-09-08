import React from 'react';
import { View } from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';
import { colors } from '../constants/theme';

/**
 * VaidyaVani mark — a leaf cradling a pulse line: herbal care + clinical signal.
 */
export default function Logo({ size = 44, leaf = colors.jade, pulse = colors.turmeric, ring }) {
  return (
    <View style={{ width: size, height: size }}>
      <Svg width={size} height={size} viewBox="0 0 48 48" fill="none">
        {ring ? <Circle cx="24" cy="24" r="23" stroke={ring} strokeWidth="1.5" /> : null}
        {/* leaf body */}
        <Path
          d="M24 5C13 9 8 17 8 27c0 8 6 15 16 16 10-1 16-8 16-16 0-10-5-18-16-22Z"
          fill={leaf}
          opacity={0.16}
        />
        <Path
          d="M24 5C13 9 8 17 8 27c0 8 6 15 16 16 10-1 16-8 16-16 0-10-5-18-16-22Z"
          stroke={leaf}
          strokeWidth="2"
          strokeLinejoin="round"
        />
        {/* central vein */}
        <Path d="M24 41C24 30 24 16 24 7" stroke={leaf} strokeWidth="1.6" strokeLinecap="round" opacity={0.5} />
        {/* pulse line */}
        <Path
          d="M12 27h6l3-7 4 14 3-9 2 2h6"
          stroke={pulse}
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </View>
  );
}
