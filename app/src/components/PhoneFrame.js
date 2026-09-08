import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { colors, layout } from '../constants/theme';

/**
 * On web, constrains the app to a phone-width column centered on a calm
 * backdrop so the prototype reads as a real mobile app. On native it is a
 * transparent pass-through.
 */
export default function PhoneFrame({ children }) {
  if (Platform.OS !== 'web') return children;
  return (
    <View style={styles.backdrop}>
      <View style={styles.frame}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.pineDeep,
  },
  frame: {
    flex: 1,
    width: '100%',
    maxWidth: layout.maxPhoneWidth,
    backgroundColor: colors.bone,
    overflow: 'hidden',
    ...(Platform.OS === 'web'
      ? { boxShadow: '0 30px 80px rgba(0,0,0,0.45)' }
      : {}),
  },
});
