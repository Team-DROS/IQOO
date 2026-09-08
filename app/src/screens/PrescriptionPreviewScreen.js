import React, { useState } from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import Screen from '../components/Screen';
import ScreenHeader from '../components/ScreenHeader';
import Reveal from '../components/Reveal';
import AppText from '../components/AppText';
import Logo from '../components/Logo';
import PrimaryButton from '../components/PrimaryButton';
import SecondaryButton from '../components/SecondaryButton';
import { doctor } from '../data/mockData';
import { colors, spacing, radius, type, shadow, font } from '../constants/theme';

function DocAction({ icon, note, onNote }) {
  return (
    <Pressable onPress={() => onNote(note)} style={styles.docAction} hitSlop={6}>
      <Feather name={icon} size={16} color={colors.pine} />
    </Pressable>
  );
}

function MedRow({ med, index }) {
  return (
    <View style={styles.medRow}>
      <View style={styles.medNum}>
        <AppText style={{ fontFamily: font.bodyBold, fontSize: 12, color: colors.turmericDeep }}>{index + 1}</AppText>
      </View>
      <View style={{ flex: 1 }}>
        <AppText variant="title" style={{ fontSize: 16 }}>
          {med.name} <AppText variant="small" color={colors.inkFaint}>{med.dosage}</AppText>
        </AppText>
        <AppText variant="small" color={colors.inkSoft} style={{ marginTop: 2 }}>
          {[med.frequency, med.duration, med.instructions].filter(Boolean).join('  ·  ')}
        </AppText>
      </View>
    </View>
  );
}

export default function PrescriptionPreviewScreen({ navigation, route }) {
  const result = route.params?.result;
  const [toast, setToast] = useState(null);
  const p = result?.patient || {};
  const c = result?.clinical || {};
  const today = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });

  const showToast = (t) => {
    setToast(t);
    setTimeout(() => setToast(null), 1600);
  };

  return (
    <Screen
      header={
        <ScreenHeader
          title="Prescription"
          onBack={() => navigation.goBack()}
          right={
            <View style={styles.actions}>
              <DocAction icon="share-2" note="Share is visual-only in this prototype" onNote={showToast} />
              <DocAction icon="printer" note="Print is visual-only in this prototype" onNote={showToast} />
              <DocAction icon="download" note="Download is visual-only in this prototype" onNote={showToast} />
            </View>
          }
        />
      }
      footer={
        <Reveal style={styles.footerRow}>
          <SecondaryButton label="Back to Edit" icon="edit-2" onPress={() => navigation.goBack()} style={{ flex: 1 }} />
          <PrimaryButton
            label="Confirm"
            icon="check"
            onPress={() =>
              navigation.navigate('PatientTimeline', {
                patientId: p.id,
                justConfirmed: true,
                newEntry: {
                  id: 'fresh',
                  date: 'Today · just now',
                  reason: c.diagnosis,
                  language: result?.source?.language || 'english',
                  medicines: (c.medicines || []).map((m) => `${m.name} ${m.dosage}`.trim()),
                  note: c.notes,
                  fresh: true,
                },
              })
            }
            style={{ flex: 1 }}
          />
        </Reveal>
      }
    >
      <Reveal delay={40}>
        <View style={styles.doc}>
          {/* letterhead */}
          <View style={styles.head}>
            <Logo size={40} />
            <View style={{ flex: 1, marginLeft: spacing.md }}>
              <AppText style={{ fontFamily: font.displayBold, fontSize: 18, color: colors.pine }}>
                {doctor.hospital.split(',')[0]}
              </AppText>
              <AppText variant="caption" color={colors.inkFaint}>
                {doctor.name} · {doctor.specialty} · {doctor.regNo}
              </AppText>
            </View>
            <AppText style={{ fontFamily: font.displayBlack, fontSize: 26, color: colors.turmericDeep }}>℞</AppText>
          </View>

          <View style={styles.rule} />

          {/* patient meta */}
          <View style={styles.metaRow}>
            <View>
              <AppText variant="caption" color={colors.inkFaint}>PATIENT</AppText>
              <AppText variant="title">{p.name}</AppText>
              <AppText variant="small" color={colors.inkSoft}>{p.age} yrs · {p.gender}</AppText>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <AppText variant="caption" color={colors.inkFaint}>DATE</AppText>
              <AppText variant="title">{today}</AppText>
            </View>
          </View>

          {/* diagnosis */}
          <View style={styles.diag}>
            <AppText variant="caption" color={colors.inkFaint}>DIAGNOSIS</AppText>
            <AppText variant="title" color={colors.pine} style={{ marginTop: 2 }}>{c.diagnosis}</AppText>
            {c.symptoms?.length ? (
              <AppText variant="small" color={colors.inkFaint} style={{ marginTop: 2 }}>
                {c.symptoms.join(', ')}
              </AppText>
            ) : null}
          </View>

          {/* medicines */}
          <AppText variant="overline" color={colors.jade} style={{ marginBottom: spacing.md }}>MEDICATIONS</AppText>
          <View style={{ gap: spacing.md }}>
            {(c.medicines || []).map((m, i) => <MedRow key={i} med={m} index={i} />)}
          </View>

          {/* advice */}
          {c.advice?.length ? (
            <View style={styles.advice}>
              <AppText variant="overline" color={colors.jade} style={{ marginBottom: spacing.sm }}>ADVICE</AppText>
              {c.advice.map((a, i) => (
                <View key={i} style={styles.adviceRow}>
                  <Feather name="check" size={13} color={colors.sage} style={{ marginTop: 3, marginRight: 8 }} />
                  <AppText variant="body" color={colors.inkSoft} style={{ flex: 1 }}>{a}</AppText>
                </View>
              ))}
            </View>
          ) : null}

          {/* signature */}
          <View style={styles.signRow}>
            <View>
              <AppText style={{ fontFamily: font.displayItalic, fontSize: 22, color: colors.pine }}>
                {doctor.firstName} Iyer
              </AppText>
              <View style={styles.signLine} />
              <AppText variant="caption" color={colors.inkFaint}>Attending physician</AppText>
            </View>
          </View>

          <View style={styles.docFoot}>
            <Feather name="shield" size={12} color={colors.inkGhost} />
            <AppText variant="caption" color={colors.inkGhost} style={{ marginLeft: 6, flex: 1 }}>
              Prepared with VaidyaVani and confirmed by the attending physician. Not valid without signature.
            </AppText>
          </View>
        </View>
      </Reveal>

      {toast ? (
        <View style={styles.toast}>
          <Feather name="info" size={14} color={colors.onDark} />
          <AppText variant="smallMed" color={colors.onDark} style={{ marginLeft: 8 }}>{toast}</AppText>
        </View>
      ) : null}
    </Screen>
  );
}

const styles = StyleSheet.create({
  actions: { flexDirection: 'row', gap: 8 },
  docAction: {
    width: 36,
    height: 36,
    borderRadius: radius.pill,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  doc: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.xl,
    ...shadow(2),
  },
  head: { flexDirection: 'row', alignItems: 'center' },
  rule: { height: 1, backgroundColor: colors.border, marginVertical: spacing.lg },
  metaRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: spacing.lg },
  diag: {
    backgroundColor: colors.surfaceAlt,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.xl,
  },
  medRow: { flexDirection: 'row', alignItems: 'flex-start', gap: spacing.md },
  medNum: {
    width: 24,
    height: 24,
    borderRadius: radius.pill,
    backgroundColor: colors.turmericSoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  advice: { marginTop: spacing.xl },
  adviceRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 6 },
  signRow: { alignItems: 'flex-end', marginTop: spacing.xxl },
  signLine: { height: 1, backgroundColor: colors.borderStrong, width: 140, marginTop: 4, marginBottom: 4 },
  docFoot: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.xl,
    paddingTop: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  footerRow: { flexDirection: 'row', gap: spacing.md },
  toast: {
    position: 'absolute',
    bottom: spacing.md,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.pine,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    ...shadow(3),
  },
});
