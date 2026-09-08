import React, { useRef } from 'react';
import { View, Pressable, Animated, StyleSheet, Platform } from 'react-native';
import { Feather } from '@expo/vector-icons';
import AppText from './AppText';
import { colors, spacing, radius, type } from '../constants/theme';

/**
 * Consistent inner-screen header: back affordance, overline + title, optional
 * right-side node. `onDark` inverts colors for dark screens.
 */
export default function ScreenHeader({ overline, title, onBack, right, onDark = false, style }) {
  const scale = useRef(new Animated.Value(1)).current;
  const titleColor = onDark ? colors.onDark : colors.ink;
  const overlineColor = onDark ? colors.onDarkSoft : colors.jade;
  const backBg = onDark ? 'rgba(244,241,232,0.12)' : colors.surface;
  const backFg = onDark ? colors.onDark : colors.ink;

  const press = (to) =>
    Animated.spring(scale, { toValue: to, useNativeDriver: true, speed: 50, bounciness: 8 }).start();

  return (
    <View style={[styles.wrap, style]}>
      {onBack ? (
        <Animated.View style={{ transform: [{ scale }] }}>
          <Pressable
            onPress={onBack}
            onPressIn={() => press(0.9)}
            onPressOut={() => press(1)}
            style={[styles.back, { backgroundColor: backBg }, !onDark && styles.backShadow]}
            hitSlop={8}
          >
            <Feather name="chevron-left" size={22} color={backFg} />
          </Pressable>
        </Animated.View>
      ) : (
        <View style={{ width: 44 }} />
      )}

      <View style={styles.center}>
        {overline ? (
          <AppText style={[type.overline, { color: overlineColor, textAlign: 'center' }]}>
            {overline.toUpperCase()}
          </AppText>
        ) : null}
        {title ? (
          <AppText style={[type.h3, { color: titleColor, textAlign: 'center' }]} numberOfLines={1}>
            {title}
          </AppText>
        ) : null}
      </View>

      <View style={styles.right}>{right || <View style={{ width: 44 }} />}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.xl,
    paddingTop: Platform.OS === 'web' ? spacing.xl : spacing.sm,
    paddingBottom: spacing.md,
  },
  back: {
    width: 44,
    height: 44,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backShadow: Platform.OS === 'web' ? { boxShadow: '0 2px 8px rgba(20,33,30,0.08)' } : { elevation: 2 },
  center: { flex: 1, alignItems: 'center', gap: 3 },
  right: { minWidth: 44, alignItems: 'flex-end' },
});
