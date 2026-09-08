import React, { useRef } from 'react';
import { Pressable, Animated, View, StyleSheet } from 'react-native';
import AppText from './AppText';
import { colors, radius, spacing, type, shadow } from '../constants/theme';

/**
 * Selectable language chip. Capsule geometry — the medicine motif.
 */
export default function LanguagePill({ language, selected, onPress, style }) {
  const scale = useRef(new Animated.Value(1)).current;
  const press = (to) =>
    Animated.spring(scale, { toValue: to, useNativeDriver: true, speed: 50, bounciness: 8 }).start();

  return (
    <Animated.View style={[{ transform: [{ scale }] }, style]}>
      <Pressable
        onPress={onPress}
        onPressIn={() => press(0.96)}
        onPressOut={() => press(1)}
        style={[
          styles.pill,
          selected ? [styles.pillOn, shadow('pine')] : styles.pillOff,
        ]}
      >
        <View style={[styles.tag, { backgroundColor: selected ? colors.turmeric : colors.jadeGhost }]}>
          <AppText style={{ fontFamily: 'BodyBold', fontSize: 13, color: selected ? colors.pineDeep : colors.jade }}>
            {language.tag}
          </AppText>
        </View>
        <View>
          <AppText style={[type.title, { color: selected ? colors.onDark : colors.ink, fontSize: 15 }]}>
            {language.label}
          </AppText>
          <AppText style={[type.caption, { color: selected ? colors.onDarkSoft : colors.inkFaint }]}>
            {language.native}
          </AppText>
        </View>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.pill,
    borderWidth: 1.5,
  },
  pillOn: { backgroundColor: colors.pine, borderColor: colors.pine },
  pillOff: { backgroundColor: colors.surface, borderColor: colors.border },
  tag: {
    width: 34,
    height: 34,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
