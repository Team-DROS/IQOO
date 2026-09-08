import React, { useState } from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import Screen from '../components/Screen';
import ScreenHeader from '../components/ScreenHeader';
import Reveal from '../components/Reveal';
import AppText from '../components/AppText';
import Avatar from '../components/Avatar';
import Card from '../components/Card';
import LanguagePill from '../components/LanguagePill';
import { patients, languages } from '../data/mockData';
import { colors, spacing, radius, type, shadow } from '../constants/theme';

const DEMO_PATIENT = { id: 'demo-new', name: 'New Demo Patient', age: 35, gender: 'Not specified', tone: 'jade' };

function SelectableRow({ patient, selected, onPress, demo }) {
  return (
    <Pressable onPress={onPress} style={[styles.row, selected && styles.rowOn]}>
      {demo ? (
        <View style={styles.demoAvatar}>
          <Feather name="user-plus" size={18} color={colors.jade} />
        </View>
      ) : (
        <Avatar name={patient.name} tone={patient.tone} size={42} />
      )}
      <View style={{ flex: 1, marginLeft: spacing.md }}>
        <AppText variant="title" numberOfLines={1}>{patient.name}</AppText>
        <AppText variant="small" color={colors.inkFaint}>
          {demo ? 'Create a fresh record' : `${patient.age} yrs · ${patient.gender}`}
        </AppText>
      </View>
      <View style={[styles.radio, selected && styles.radioOn]}>
        {selected ? <Feather name="check" size={13} color={colors.white} /> : null}
      </View>
    </Pressable>
  );
}

function MethodCard({ icon, title, subtitle, tone, disabled, onPress }) {
  const tones = {
    jade: { bg: colors.jade, glow: shadow('jade') },
    turmeric: { bg: colors.turmeric, glow: shadow('turmeric') },
  };
  const t = tones[tone];
  return (
    <Card
      onPress={disabled ? undefined : onPress}
      level={disabled ? 0 : 2}
      style={[styles.method, disabled && styles.methodOff]}
    >
      <View style={[styles.methodIcon, { backgroundColor: disabled ? colors.boneDeep : t.bg }]}>
        <Feather name={icon} size={22} color={disabled ? colors.inkGhost : (tone === 'turmeric' ? colors.pineDeep : colors.white)} />
      </View>
      <AppText variant="title" color={disabled ? colors.inkGhost : colors.ink} style={{ marginTop: spacing.md }}>
        {title}
      </AppText>
      <AppText variant="small" color={disabled ? colors.inkGhost : colors.inkFaint} style={{ marginTop: 2 }}>
        {subtitle}
      </AppText>
    </Card>
  );
}

export default function NewConsultationScreen({ navigation }) {
  const [patientId, setPatientId] = useState(null);
  const [language, setLanguage] = useState('english');
  const ready = !!patientId;

  const go = (sourceType) => {
    const target = sourceType === 'audio' ? 'AudioRecording' : 'ImageUpload';
    navigation.navigate(target, { patientId, language, sourceType });
  };

  return (
    <Screen
      header={<ScreenHeader overline="Step 1 of 3" title="New Consultation" onBack={() => navigation.goBack()} />}
    >
      <Reveal delay={40}>
        <AppText variant="overline" color={colors.jade}>PATIENT</AppText>
        <View style={{ height: spacing.md }} />
        {patients.map((p) => (
          <SelectableRow
            key={p.id}
            patient={p}
            selected={patientId === p.id}
            onPress={() => setPatientId(p.id)}
          />
        ))}
        <SelectableRow
          patient={DEMO_PATIENT}
          demo
          selected={patientId === DEMO_PATIENT.id}
          onPress={() => setPatientId(DEMO_PATIENT.id)}
        />
      </Reveal>

      <Reveal delay={160} style={{ marginTop: spacing.xl }}>
        <AppText variant="overline" color={colors.jade}>CONVERSATION LANGUAGE</AppText>
        <View style={styles.langWrap}>
          {languages.map((l) => (
            <LanguagePill
              key={l.id}
              language={l}
              selected={language === l.id}
              onPress={() => setLanguage(l.id)}
            />
          ))}
        </View>
      </Reveal>

      <Reveal delay={280} style={{ marginTop: spacing.xl }}>
        <View style={styles.methodHead}>
          <AppText variant="overline" color={colors.jade}>CAPTURE METHOD</AppText>
          {!ready ? (
            <AppText variant="caption" color={colors.turmericDeep}>Select a patient first</AppText>
          ) : null}
        </View>
        <View style={styles.methodRow}>
          <MethodCard
            icon="mic"
            title="Record"
            subtitle="Voice conversation"
            tone="jade"
            disabled={!ready}
            onPress={() => go('audio')}
          />
          <MethodCard
            icon="camera"
            title="Scan"
            subtitle="Prescription image"
            tone="turmeric"
            disabled={!ready}
            onPress={() => go('image')}
          />
        </View>
      </Reveal>
    </Screen>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1.5,
    borderColor: colors.border,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  rowOn: { borderColor: colors.jade, backgroundColor: colors.jadeGhost },
  demoAvatar: {
    width: 42,
    height: 42,
    borderRadius: radius.pill,
    backgroundColor: colors.jadeGhost,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: colors.jade,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radio: {
    width: 24,
    height: 24,
    borderRadius: radius.pill,
    borderWidth: 2,
    borderColor: colors.borderStrong,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioOn: { backgroundColor: colors.jade, borderColor: colors.jade },
  langWrap: { gap: spacing.sm, marginTop: spacing.md },
  methodHead: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  methodRow: { flexDirection: 'row', gap: spacing.md, marginTop: spacing.md },
  method: { flex: 1, alignItems: 'flex-start', paddingVertical: spacing.xl },
  methodOff: { opacity: 0.7 },
  methodIcon: {
    width: 48,
    height: 48,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
