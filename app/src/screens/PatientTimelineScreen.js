import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import Screen from '../components/Screen';
import ScreenHeader from '../components/ScreenHeader';
import Reveal from '../components/Reveal';
import AppText from '../components/AppText';
import Avatar from '../components/Avatar';
import Card from '../components/Card';
import Chip from '../components/Chip';
import PrimaryButton from '../components/PrimaryButton';
import { getPatientById } from '../data/mockData';
import { languageColors, colors, spacing, radius, type, shadow, font } from '../constants/theme';

function TimelineEntry({ entry, isLast }) {
  const lang = languageColors[entry.language];
  return (
    <View style={styles.entryRow}>
      <View style={styles.rail}>
        <View style={[styles.node, entry.fresh && styles.nodeFresh]}>
          <View style={[styles.nodeDot, entry.fresh && { backgroundColor: colors.turmeric }]} />
        </View>
        {!isLast ? <View style={styles.railLine} /> : null}
      </View>
      <Card style={[styles.entryCard, entry.fresh && styles.entryCardFresh]}>
        <View style={styles.entryHead}>
          <AppText variant="caption" color={colors.inkFaint}>{entry.date}</AppText>
          {lang ? (
            <View style={[styles.langChip, { backgroundColor: lang.bg }]}>
              <AppText style={[type.caption, { color: lang.fg }]}>{lang.label}</AppText>
            </View>
          ) : null}
        </View>
        <AppText variant="title" style={{ marginTop: 4 }}>{entry.reason}</AppText>
        {entry.medicines?.length ? (
          <View style={styles.medChips}>
            {entry.medicines.map((m, i) => (
              <View key={i} style={styles.medChip}>
                <Feather name="disc" size={11} color={colors.turmericDeep} style={{ marginRight: 5 }} />
                <AppText variant="caption" color={colors.inkSoft}>{m}</AppText>
              </View>
            ))}
          </View>
        ) : (
          <AppText variant="small" color={colors.inkFaint} style={{ marginTop: 6 }}>No medication prescribed</AppText>
        )}
        {entry.note ? (
          <AppText variant="small" color={colors.inkFaint} style={{ marginTop: spacing.sm }} numberOfLines={2}>
            {entry.note}
          </AppText>
        ) : null}
      </Card>
    </View>
  );
}

function EmptyState({ onStart }) {
  return (
    <View style={styles.empty}>
      <View style={styles.emptyIcon}>
        <Feather name="clock" size={30} color={colors.jade} />
      </View>
      <AppText variant="h3" style={{ marginTop: spacing.lg, textAlign: 'center' }}>No consultations yet</AppText>
      <AppText variant="body" color={colors.inkFaint} style={{ textAlign: 'center', marginTop: 6, paddingHorizontal: spacing.lg }}>
        When you record or scan a consultation for this patient, it will appear here as a timeline.
      </AppText>
      <PrimaryButton label="Start First Consultation" icon="mic" onPress={onStart} style={{ marginTop: spacing.xl, alignSelf: 'stretch' }} />
    </View>
  );
}

export default function PatientTimelineScreen({ navigation, route }) {
  const { patientId, justConfirmed, newEntry } = route.params || {};
  const patient = getPatientById(patientId) || getPatientById('pat-001');
  const history = [...(newEntry ? [newEntry] : []), ...(patient.history || [])];

  return (
    <Screen header={<ScreenHeader overline="Patient" title={patient.name} onBack={() => navigation.goBack()} />}>
      <Reveal delay={40}>
        <View style={styles.patientCard}>
          <Avatar name={patient.name} tone={patient.tone} size={56} />
          <View style={{ flex: 1, marginLeft: spacing.lg }}>
            <AppText variant="h3">{patient.name}</AppText>
            <AppText variant="small" color={colors.inkFaint} style={{ marginTop: 2 }}>
              {patient.age} yrs · {patient.gender} · {patient.bloodGroup}
            </AppText>
            <View style={styles.tagRow}>
              {patient.chronic?.map((c) => <Chip key={c} label={c} icon="activity" tone="turmeric" />)}
              {patient.allergies?.map((a) => <Chip key={a} label={`Allergy: ${a}`} icon="alert-triangle" tone="neutral" />)}
              {!patient.chronic?.length && !patient.allergies?.length ? (
                <Chip label="No known conditions" icon="check" tone="sage" />
              ) : null}
            </View>
          </View>
        </View>
      </Reveal>

      {justConfirmed ? (
        <Reveal delay={120}>
          <View style={styles.success}>
            <View style={styles.successIcon}>
              <Feather name="check" size={15} color={colors.white} />
            </View>
            <AppText variant="smallMed" color={colors.sage} style={{ flex: 1 }}>
              Prescription confirmed and added to the timeline.
            </AppText>
          </View>
        </Reveal>
      ) : null}

      <Reveal delay={180} style={styles.sectionHead}>
        <AppText variant="h3">Consultation history</AppText>
        {history.length ? <AppText variant="smallMed" color={colors.jade}>{history.length} visits</AppText> : null}
      </Reveal>

      {history.length ? (
        <View style={{ marginTop: spacing.md }}>
          {history.map((e, i) => (
            <Reveal key={e.id || i} delay={240 + i * 80}>
              <TimelineEntry entry={e} isLast={i === history.length - 1} />
            </Reveal>
          ))}
        </View>
      ) : (
        <Reveal delay={240}>
          <EmptyState onStart={() => navigation.navigate('NewConsultation')} />
        </Reveal>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  patientCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    ...shadow(1),
  },
  tagRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: spacing.sm },
  success: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: colors.sageSoft,
    borderRadius: radius.md,
    padding: spacing.md,
    marginTop: spacing.md,
  },
  successIcon: {
    width: 26,
    height: 26,
    borderRadius: radius.pill,
    backgroundColor: colors.sage,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionHead: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    marginTop: spacing.xxl,
  },
  entryRow: { flexDirection: 'row', gap: spacing.lg },
  rail: { alignItems: 'center', width: 24 },
  node: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.surface,
    borderWidth: 2,
    borderColor: colors.jade,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
  },
  nodeFresh: { borderColor: colors.turmeric },
  nodeDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.jade },
  railLine: { width: 2, flex: 1, backgroundColor: colors.border, marginVertical: 4, minHeight: 20 },
  entryCard: { flex: 1, marginBottom: spacing.lg },
  entryCardFresh: { borderColor: colors.turmeric, backgroundColor: colors.surfaceAlt },
  entryHead: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  langChip: { paddingHorizontal: spacing.md, paddingVertical: 3, borderRadius: radius.pill },
  medChips: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: spacing.sm },
  medChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.turmericSoft,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: 5,
  },
  empty: {
    alignItems: 'center',
    marginTop: spacing.xxl,
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.border,
    borderStyle: 'dashed',
    padding: spacing.xxl,
  },
  emptyIcon: {
    width: 64,
    height: 64,
    borderRadius: radius.pill,
    backgroundColor: colors.jadeGhost,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
