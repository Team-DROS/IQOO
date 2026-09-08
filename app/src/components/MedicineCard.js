import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import Card from './Card';
import AppText from './AppText';
import { colors, spacing, type, radius } from '../constants/theme';

function MetaChip({ icon, label, value }) {
  if (!value) return null;
  return (
    <View style={styles.chip}>
      <Feather name={icon} size={12} color={colors.jade} style={{ marginRight: 5 }} />
      <AppText style={[type.caption, { color: colors.inkSoft }]}>
        {label} · <AppText style={[type.caption, { color: colors.ink, fontFamily: 'BodySemi' }]}>{value}</AppText>
      </AppText>
    </View>
  );
}

/**
 * Display card for one prescribed medicine.
 */
export default function MedicineCard({ medicine, index, style }) {
  const { name, dosage, frequency, duration, instructions } = medicine;
  return (
    <Card level={1} style={[styles.card, style]}>
      <View style={styles.head}>
        <View style={styles.pill}>
          <Feather name="disc" size={16} color={colors.turmericDeep} />
        </View>
        <View style={{ flex: 1 }}>
          <AppText variant="title" numberOfLines={1}>
            {name || 'Unnamed medicine'}
          </AppText>
          {dosage ? (
            <AppText variant="small" color={colors.inkFaint} style={{ marginTop: 1 }}>
              {dosage}
            </AppText>
          ) : null}
        </View>
        {typeof index === 'number' ? (
          <View style={styles.count}>
            <AppText style={[type.caption, { color: colors.inkFaint }]}>{index + 1}</AppText>
          </View>
        ) : null}
      </View>

      <View style={styles.meta}>
        <MetaChip icon="repeat" label="Freq" value={frequency} />
        <MetaChip icon="calendar" label="Days" value={duration} />
      </View>

      {instructions ? (
        <View style={styles.instr}>
          <Feather name="info" size={13} color={colors.inkFaint} style={{ marginRight: 6, marginTop: 1 }} />
          <AppText variant="small" color={colors.inkSoft} style={{ flex: 1 }}>
            {instructions}
          </AppText>
        </View>
      ) : null}
    </Card>
  );
}

const styles = StyleSheet.create({
  card: { gap: spacing.md },
  head: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  pill: {
    width: 38,
    height: 38,
    borderRadius: radius.md,
    backgroundColor: colors.turmericSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  count: {
    width: 24,
    height: 24,
    borderRadius: radius.pill,
    backgroundColor: colors.surfaceAlt,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  meta: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.jadeGhost,
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    borderRadius: radius.pill,
  },
  instr: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: colors.surfaceAlt,
    borderRadius: radius.md,
    padding: spacing.md,
  },
});
