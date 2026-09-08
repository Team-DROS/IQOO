import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import AppText from './AppText';
import { colors, radius, spacing, type } from '../constants/theme';

const MAP = {
  needs_review: { label: 'Needs review', fg: colors.turmericDeep, bg: colors.turmericSoft, icon: 'alert-circle' },
  confirmed: { label: 'Confirmed', fg: colors.sage, bg: colors.sageSoft, icon: 'check-circle' },
  ai_draft: { label: 'AI draft', fg: colors.jade, bg: colors.jadeGhost, icon: 'zap' },
  error: { label: 'Failed', fg: colors.clay, bg: colors.claySoft, icon: 'x-circle' },
};

export default function StatusBadge({ status = 'needs_review', label, style }) {
  const s = MAP[status] || MAP.needs_review;
  return (
    <View style={[styles.badge, { backgroundColor: s.bg }, style]}>
      <Feather name={s.icon} size={12} color={s.fg} style={{ marginRight: 5 }} />
      <AppText style={[type.caption, { color: s.fg, letterSpacing: 0.2 }]}>{label || s.label}</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.md,
    paddingVertical: 5,
    borderRadius: radius.pill,
  },
});
