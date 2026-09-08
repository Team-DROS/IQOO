import React from 'react';
import { View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { radius } from '../constants/theme';

/**
 * An icon inside a soft tinted circle — the repeated visual motif.
 */
export default function IconBadge({ icon, size = 44, iconSize, bg, fg, style }) {
  return (
    <View
      style={[
        {
          width: size,
          height: size,
          borderRadius: radius.pill,
          backgroundColor: bg,
          alignItems: 'center',
          justifyContent: 'center',
        },
        style,
      ]}
    >
      <Feather name={icon} size={iconSize || size * 0.46} color={fg} />
    </View>
  );
}
