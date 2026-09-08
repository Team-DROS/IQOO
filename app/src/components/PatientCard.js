import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import Card from './Card';
import Avatar from './Avatar';
import AppText from './AppText';
import StatusBadge from './StatusBadge';
import { languageColors } from '../constants/theme';
import { colors, spacing, type, radius } from '../constants/theme';

/**
 * Recent-consultation / patient row. Shows avatar, name, meta, and either a
 * language chip + status, or a chevron for navigation.
 */
export default function PatientCard({
  name,
  meta,
  tone = 'jade',
  language,
  status,
  onPress,
  style,
}) {
  const lang = language ? languageColors[language] : null;
  return (
    <Card onPress={onPress} style={[styles.card, style]}>
      <Avatar name={name} tone={tone} size={46} />
      <View style={styles.body}>
        <AppText variant="title" numberOfLines={1}>
          {name}
        </AppText>
        {meta ? (
          <AppText variant="small" color={colors.inkFaint} numberOfLines={1} style={{ marginTop: 2 }}>
            {meta}
          </AppText>
        ) : null}
        {(lang || status) && (
          <View style={styles.tags}>
            {lang ? (
              <View style={[styles.chip, { backgroundColor: lang.bg }]}>
                <AppText style={[type.caption, { color: lang.fg }]}>{lang.label}</AppText>
              </View>
            ) : null}
            {status ? <StatusBadge status={status} /> : null}
          </View>
        )}
      </View>
      <Feather name="chevron-right" size={20} color={colors.inkGhost} />
    </Card>
  );
}

const styles = StyleSheet.create({
  card: { flexDirection: 'row', alignItems: 'center' },
  body: { flex: 1, marginLeft: spacing.md, marginRight: spacing.sm },
  tags: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 8, flexWrap: 'wrap' },
  chip: { paddingHorizontal: spacing.md, paddingVertical: 4, borderRadius: radius.pill },
});
