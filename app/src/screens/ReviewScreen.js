import React, { useState } from 'react';
import { View, Pressable, TextInput, StyleSheet, Platform } from 'react-native';
import { Feather } from '@expo/vector-icons';
import Screen from '../components/Screen';
import ScreenHeader from '../components/ScreenHeader';
import Reveal from '../components/Reveal';
import AppText from '../components/AppText';
import Card from '../components/Card';
import EditableField from '../components/EditableField';
import MedicineCard from '../components/MedicineCard';
import Chip from '../components/Chip';
import AIDisclaimer from '../components/AIDisclaimer';
import PrimaryButton from '../components/PrimaryButton';
import { buildConsultationResult } from '../data/mockData';
import { colors, spacing, radius, type, font } from '../constants/theme';

function SectionLabel({ children, right }) {
  return (
    <View style={styles.sectionLabel}>
      <AppText variant="overline" color={colors.jade}>{children}</AppText>
      {right}
    </View>
  );
}

function ChipEditor({ items, onChange, editing, tone }) {
  const [draft, setDraft] = useState('');
  const add = () => {
    const v = draft.trim();
    if (v) { onChange([...items, v]); setDraft(''); }
  };
  return (
    <View style={styles.chipWrap}>
      {items.map((it, i) => (
        <View key={`${it}-${i}`} style={styles.editChip}>
          <AppText variant="smallMed" color={colors.pine}>{it}</AppText>
          {editing ? (
            <Pressable onPress={() => onChange(items.filter((_, j) => j !== i))} hitSlop={6} style={{ marginLeft: 6 }}>
              <Feather name="x" size={13} color={colors.inkFaint} />
            </Pressable>
          ) : null}
        </View>
      ))}
      {editing ? (
        <View style={styles.addChip}>
          <TextInput
            value={draft}
            onChangeText={setDraft}
            onSubmitEditing={add}
            placeholder="Add…"
            placeholderTextColor={colors.inkGhost}
            style={styles.addInput}
          />
          <Pressable onPress={add} hitSlop={6}>
            <Feather name="plus" size={15} color={colors.jade} />
          </Pressable>
        </View>
      ) : null}
    </View>
  );
}

function MedicineEditor({ med, index, onChange, onRemove }) {
  const set = (k, v) => onChange({ ...med, [k]: v });
  return (
    <Card style={styles.medEdit}>
      <View style={styles.medEditHead}>
        <AppText variant="overline" color={colors.turmericDeep}>MEDICINE {index + 1}</AppText>
        <Pressable onPress={onRemove} hitSlop={6}>
          <Feather name="trash-2" size={15} color={colors.clay} />
        </Pressable>
      </View>
      <EditableField label="Name" value={med.name} onChangeText={(v) => set('name', v)} />
      <View style={styles.medRow}>
        <EditableField label="Dosage" value={med.dosage} onChangeText={(v) => set('dosage', v)} style={{ flex: 1 }} />
        <EditableField label="Frequency" value={med.frequency} onChangeText={(v) => set('frequency', v)} style={{ flex: 1 }} />
      </View>
      <View style={styles.medRow}>
        <EditableField label="Duration" value={med.duration} onChangeText={(v) => set('duration', v)} style={{ flex: 1 }} />
        <EditableField label="Instructions" value={med.instructions} onChangeText={(v) => set('instructions', v)} style={{ flex: 1 }} />
      </View>
    </Card>
  );
}

export default function ReviewScreen({ navigation, route }) {
  const seed =
    route.params?.result ||
    buildConsultationResult({ patientId: route.params?.input?.patientId, language: 'english', sourceType: 'audio' });

  const [editing, setEditing] = useState(true);
  const [patientName, setPatientName] = useState(seed.patient.name);
  const [symptoms, setSymptoms] = useState(seed.clinical.symptoms);
  const [diagnosis, setDiagnosis] = useState(seed.clinical.diagnosis);
  const [medicines, setMedicines] = useState(seed.clinical.medicines);
  const [advice, setAdvice] = useState(seed.clinical.advice);
  const [notes, setNotes] = useState(seed.clinical.notes);

  const updateMed = (i, m) => setMedicines(medicines.map((x, j) => (j === i ? m : x)));
  const removeMed = (i) => setMedicines(medicines.filter((_, j) => j !== i));
  const addMed = () => setMedicines([...medicines, { name: '', dosage: '', frequency: '', duration: '', instructions: '' }]);

  const confirm = () => {
    const result = {
      ...seed,
      patient: { ...seed.patient, name: patientName },
      clinical: { symptoms, diagnosis, medicines, advice, notes },
      status: 'confirmed',
    };
    navigation.navigate('PrescriptionPreview', { result });
  };

  return (
    <Screen
      header={
        <ScreenHeader
          overline="Step 3 of 3"
          title="Review Details"
          onBack={() => navigation.goBack()}
          right={
            <Pressable onPress={() => setEditing((e) => !e)} style={styles.toggle}>
              <Feather name={editing ? 'eye' : 'edit-2'} size={15} color={colors.jade} />
              <AppText variant="smallMed" color={colors.jade} style={{ marginLeft: 5 }}>
                {editing ? 'Preview' : 'Edit'}
              </AppText>
            </Pressable>
          }
        />
      }
      footer={<Reveal><PrimaryButton label="Confirm & Preview" icon="arrow-right" onPress={confirm} /></Reveal>}
    >
      <Reveal delay={40}><AIDisclaimer /></Reveal>

      {seed.warnings?.length ? (
        <Reveal delay={90}>
          <View style={styles.warn}>
            <Feather name="alert-triangle" size={15} color={colors.clay} style={{ marginTop: 1 }} />
            <View style={{ flex: 1, marginLeft: spacing.sm }}>
              {seed.warnings.map((w, i) => (
                <AppText key={i} variant="small" color={colors.clay}>{w}</AppText>
              ))}
            </View>
          </View>
        </Reveal>
      ) : null}

      <Reveal delay={140} style={styles.block}>
        <SectionLabel>PATIENT</SectionLabel>
        {editing ? (
          <EditableField value={patientName} onChangeText={setPatientName} />
        ) : (
          <AppText variant="h3">{patientName}</AppText>
        )}
      </Reveal>

      <Reveal delay={200} style={styles.block}>
        <SectionLabel>SYMPTOMS</SectionLabel>
        <ChipEditor items={symptoms} onChange={setSymptoms} editing={editing} />
      </Reveal>

      <Reveal delay={260} style={styles.block}>
        <SectionLabel>DIAGNOSIS</SectionLabel>
        {editing ? (
          <EditableField value={diagnosis} onChangeText={setDiagnosis} />
        ) : (
          <AppText variant="title">{diagnosis}</AppText>
        )}
      </Reveal>

      <Reveal delay={320} style={styles.block}>
        <SectionLabel right={editing ? (
          <Pressable onPress={addMed} style={styles.addBtn}>
            <Feather name="plus" size={14} color={colors.jade} />
            <AppText variant="smallMed" color={colors.jade} style={{ marginLeft: 4 }}>Add</AppText>
          </Pressable>
        ) : null}>
          MEDICINES · {medicines.length}
        </SectionLabel>
        <View style={{ gap: spacing.md }}>
          {medicines.map((m, i) =>
            editing ? (
              <MedicineEditor key={i} med={m} index={i} onChange={(mm) => updateMed(i, mm)} onRemove={() => removeMed(i)} />
            ) : (
              <MedicineCard key={i} medicine={m} index={i} />
            )
          )}
        </View>
      </Reveal>

      <Reveal delay={380} style={styles.block}>
        <SectionLabel>ADVICE</SectionLabel>
        <ChipEditor items={advice} onChange={setAdvice} editing={editing} tone="sage" />
      </Reveal>

      <Reveal delay={440} style={styles.block}>
        <SectionLabel>DOCTOR'S NOTES</SectionLabel>
        {editing ? (
          <EditableField value={notes} onChangeText={setNotes} multiline />
        ) : (
          <Card><AppText variant="body" color={colors.inkSoft}>{notes}</AppText></Card>
        )}
      </Reveal>
    </Screen>
  );
}

const styles = StyleSheet.create({
  block: { marginTop: spacing.xl },
  sectionLabel: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: spacing.md },
  toggle: { flexDirection: 'row', alignItems: 'center' },
  warn: {
    flexDirection: 'row',
    backgroundColor: colors.claySoft,
    borderRadius: radius.md,
    padding: spacing.md,
    marginTop: spacing.md,
  },
  chipWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  editChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.jadeGhost,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: 8,
  },
  addChip: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: colors.borderStrong,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    minWidth: 90,
  },
  addInput: {
    fontFamily: font.bodyMed,
    fontSize: 13,
    color: colors.ink,
    minWidth: 54,
    marginRight: 4,
    ...(Platform.OS === 'web' ? { outlineStyle: 'none' } : {}),
  },
  addBtn: { flexDirection: 'row', alignItems: 'center' },
  medEdit: { gap: spacing.md, backgroundColor: colors.surfaceAlt },
  medEditHead: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  medRow: { flexDirection: 'row', gap: spacing.md },
});
