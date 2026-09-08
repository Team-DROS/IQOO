import React from 'react';
import { View, ScrollView, StyleSheet, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import GradientBackground from './GradientBackground';
import { spacing, layout } from '../constants/theme';

/**
 * Screen scaffold: atmospheric background + safe area + optional scroll +
 * optional fixed footer action bar. Keeps every screen structurally identical.
 */
export default function Screen({
  variant = 'light',
  scroll = true,
  header = null,
  footer = null,
  contentStyle,
  children,
}) {
  const Body = scroll ? ScrollView : View;
  const bodyProps = scroll
    ? {
        showsVerticalScrollIndicator: false,
        contentContainerStyle: [styles.content, contentStyle],
      }
    : { style: [styles.contentFlex, contentStyle] };

  return (
    <GradientBackground variant={variant}>
      <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
        {header}
        <Body {...bodyProps}>{children}</Body>
        {footer ? <View style={styles.footer}>{footer}</View> : null}
      </SafeAreaView>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  content: {
    paddingHorizontal: layout.screenPadding,
    paddingTop: spacing.sm,
    paddingBottom: spacing.xxxl,
  },
  contentFlex: {
    flex: 1,
    paddingHorizontal: layout.screenPadding,
  },
  footer: {
    paddingHorizontal: layout.screenPadding,
    paddingTop: spacing.md,
    paddingBottom: Platform.OS === 'web' ? spacing.xl : spacing.md,
  },
});
