import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../constants/theme';

/**
 * Soft radial-ish glow. On web we abuse a large blurred box-shadow to get a
 * genuine glow; native falls back to a translucent circle.
 */
function Glow({ color, size, style }) {
  const web = Platform.OS === 'web';
  return (
    <View
      pointerEvents="none"
      style={[
        {
          position: 'absolute',
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: web ? color : color,
          opacity: web ? 1 : 0.5,
          ...(web ? { boxShadow: `0 0 ${size * 0.9}px ${size * 0.42}px ${color}` } : {}),
        },
        style,
      ]}
    />
  );
}

/**
 * Atmospheric background. `variant`:
 *  - "light": warm bone paper with turmeric + jade glows
 *  - "dark":  deep pine gradient with a turmeric glow (hero / preview)
 */
export default function GradientBackground({ variant = 'light', children, style }) {
  if (variant === 'dark') {
    return (
      <View style={[styles.fill, style]}>
        <LinearGradient
          colors={[colors.pine, colors.pineDeep]}
          start={{ x: 0.1, y: 0 }}
          end={{ x: 0.9, y: 1 }}
          style={StyleSheet.absoluteFill}
        />
        <Glow color={colors.turmericGlow} size={340} style={{ top: -120, right: -90 }} />
        <Glow color={'rgba(23,183,163,0.14)'} size={300} style={{ bottom: -120, left: -100 }} />
        {children}
      </View>
    );
  }
  return (
    <View style={[styles.fill, { backgroundColor: colors.bone }, style]}>
      <Glow color={'rgba(224,164,59,0.16)'} size={300} style={{ top: -110, right: -70 }} />
      <Glow color={'rgba(14,156,139,0.10)'} size={280} style={{ bottom: 40, left: -120 }} />
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  fill: { flex: 1, overflow: 'hidden' },
});
