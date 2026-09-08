import React, { useRef } from 'react';
import { View, Pressable, Animated, StyleSheet } from 'react-native';
import { colors, radius, spacing, shadow } from '../constants/theme';

/**
 * Base surface card. Pass `onPress` to make it a pressable with a subtle
 * press-scale. Consistent rounded corners, hairline border, soft shadow.
 */
export default function Card({ children, onPress, level = 1, padded = true, style }) {
  const scale = useRef(new Animated.Value(1)).current;
  const press = (to) =>
    Animated.spring(scale, { toValue: to, useNativeDriver: true, speed: 50, bounciness: 6 }).start();

  const body = (
    <View style={[styles.card, shadow(level), padded && styles.padded, style]}>{children}</View>
  );

  if (!onPress) return body;
  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <Pressable onPress={onPress} onPressIn={() => press(0.985)} onPressOut={() => press(1)}>
        {body}
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  padded: { padding: spacing.lg },
});
