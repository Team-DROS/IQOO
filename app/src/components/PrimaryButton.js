import React, { useRef } from 'react';
import { Pressable, Animated, ActivityIndicator, View, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import AppText from './AppText';
import { colors, radius, spacing, shadow, type } from '../constants/theme';

/**
 * The one prominent action per screen. Turmeric fill, dark ink label.
 */
export default function PrimaryButton({
  label,
  onPress,
  icon,
  loading = false,
  disabled = false,
  tone = 'turmeric',
  style,
}) {
  const scale = useRef(new Animated.Value(1)).current;
  const isOff = disabled || loading;

  const tones = {
    turmeric: { bg: colors.turmeric, fg: colors.pineDeep, sh: shadow('turmeric') },
    jade: { bg: colors.jade, fg: colors.white, sh: shadow('jade') },
    pine: { bg: colors.pine, fg: colors.onDark, sh: shadow('pine') },
  };
  const t = tones[tone] || tones.turmeric;

  const press = (to) =>
    Animated.spring(scale, { toValue: to, useNativeDriver: true, speed: 40, bounciness: 6 }).start();

  return (
    <Animated.View style={[{ transform: [{ scale }] }, style]}>
      <Pressable
        onPress={isOff ? undefined : onPress}
        onPressIn={() => !isOff && press(0.97)}
        onPressOut={() => !isOff && press(1)}
        style={[
          styles.btn,
          { backgroundColor: t.bg },
          !isOff && t.sh,
          isOff && styles.disabled,
        ]}
      >
        {loading ? (
          <ActivityIndicator color={t.fg} />
        ) : (
          <View style={styles.row}>
            <AppText style={[type.title, { color: t.fg }]}>{label}</AppText>
            {icon ? <Feather name={icon} size={19} color={t.fg} style={{ marginLeft: spacing.sm }} /> : null}
          </View>
        )}
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  btn: {
    height: 56,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
  },
  row: { flexDirection: 'row', alignItems: 'center' },
  disabled: { backgroundColor: colors.boneDeep, opacity: 0.85 },
});
