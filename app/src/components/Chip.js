import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import AppText from './AppText';
import { colors, radius, spacing, type } from '../constants/theme';

const TONES = {
  jade: { bg: colors.jadeGhost, fg: colors.pine },
  turmeric: { bg: colors.turmericSoft, fg: colors.turmericDeep },
  sage: { bg: colors.sageSoft, fg: colors.sage },
  neutral: { bg: colors.surfaceAlt, fg: colors.inkSoft },
};

export default function Chip({ label, icon, tone = 'jade', style }) {
  const t = TONES[tone] || TONES.jade;
  return (
    <View style={[styles.chip, { backgroundColor: t.bg }, style]}>
      {icon ? <Feather name={icon} size={12} color={t.fg} style={{ marginRight: 5 }} /> : null}
      <AppText style={[type.smallMed, { color: t.fg }]}>{label}</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.md,
    paddingVertical: 7,
    borderRadius: radius.pill,
  },
});
