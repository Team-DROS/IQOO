import React, { useRef } from 'react';
import { Pressable, Animated, View, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import AppText from './AppText';
import { colors, radius, spacing, type } from '../constants/theme';

/**
 * Quiet, outlined action — pairs with PrimaryButton without competing.
 */
export default function SecondaryButton({
  label,
  onPress,
  icon,
  disabled = false,
  tone = 'pine',
  style,
}) {
  const scale = useRef(new Animated.Value(1)).current;
  const fg = tone === 'clay' ? colors.clay : colors.pine;
  const border = tone === 'clay' ? colors.claySoft : colors.borderStrong;

  const press = (to) =>
    Animated.spring(scale, { toValue: to, useNativeDriver: true, speed: 40, bounciness: 6 }).start();

  return (
    <Animated.View style={[{ transform: [{ scale }] }, style]}>
      <Pressable
        onPress={disabled ? undefined : onPress}
        onPressIn={() => !disabled && press(0.97)}
        onPressOut={() => !disabled && press(1)}
        style={[styles.btn, { borderColor: border }, disabled && { opacity: 0.4 }]}
      >
        <View style={styles.row}>
          {icon ? <Feather name={icon} size={18} color={fg} style={{ marginRight: spacing.sm }} /> : null}
          <AppText style={[type.title, { color: fg }]}>{label}</AppText>
        </View>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  btn: {
    height: 56,
    borderRadius: radius.pill,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
    backgroundColor: 'transparent',
  },
  row: { flexDirection: 'row', alignItems: 'center' },
});
