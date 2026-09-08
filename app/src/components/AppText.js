import React from 'react';
import { Text } from 'react-native';
import { type as typeScale, colors } from '../constants/theme';

/**
 * Typographic primitive. `variant` selects from the type scale in theme.js.
 * Defaults to body copy in ink. Keeps fonts/sizes consistent across screens.
 */
export default function AppText({ variant = 'body', color, style, children, ...rest }) {
  const base = typeScale[variant] || typeScale.body;
  return (
    <Text
      allowFontScaling={false}
      style={[base, { color: color || colors.ink }, style]}
      {...rest}
    >
      {children}
    </Text>
  );
}
