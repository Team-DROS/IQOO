import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import AppText from './AppText';
import { colors, radius, spacing, type } from '../constants/theme';

/**
 * Safety banner — every generated record must be marked AI-generated and
 * requiring clinician confirmation. Never implies autonomous prescribing.
 */
export default function AIDisclaimer({ text, style }) {
  return (
    <View style={[styles.wrap, style]}>
      <View style={styles.icon}>
        <Feather name="zap" size={14} color={colors.turmericDeep} />
      </View>
      <AppText variant="small" color={colors.inkSoft} style={{ flex: 1 }}>
        {text || 'AI-generated draft. Review every field — the doctor confirms before anything is saved.'}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: colors.turmericSoft,
    borderRadius: radius.md,
    padding: spacing.md,
  },
  icon: {
    width: 28,
    height: 28,
    borderRadius: radius.pill,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
