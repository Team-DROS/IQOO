import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Platform } from 'react-native';
import AppText from './AppText';
import { colors, radius, spacing, type, font } from '../constants/theme';

/**
 * Labelled, editable input for the Review screen. Jade focus ring.
 */
export default function EditableField({
  label,
  value,
  onChangeText,
  placeholder,
  multiline = false,
  keyboardType,
  style,
}) {
  const [focused, setFocused] = useState(false);
  return (
    <View style={style}>
      {label ? (
        <AppText style={[type.overline, { color: colors.inkFaint, marginBottom: 6 }]}>
          {label.toUpperCase()}
        </AppText>
      ) : null}
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.inkGhost}
        multiline={multiline}
        keyboardType={keyboardType}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={[
          styles.input,
          multiline && styles.multiline,
          {
            borderColor: focused ? colors.jade : colors.border,
            backgroundColor: focused ? colors.jadeGhost : colors.surface,
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1.5,
    borderRadius: radius.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    fontFamily: font.bodyMed,
    fontSize: 15,
    color: colors.ink,
    ...(Platform.OS === 'web' ? { outlineStyle: 'none' } : {}),
  },
  multiline: { minHeight: 76, textAlignVertical: 'top', paddingTop: spacing.md },
});
