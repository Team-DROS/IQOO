import React, { useRef } from 'react';
import { View, Pressable, Animated, ScrollView, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import Screen from '../components/Screen';
import Reveal from '../components/Reveal';
import AppText from '../components/AppText';
import Avatar from '../components/Avatar';
import Card from '../components/Card';
import PatientCard from '../components/PatientCard';
import Logo from '../components/Logo';
import { doctor, todaySummary, recentConsultations, patients } from '../data/mockData';
import { colors, spacing, radius, type, shadow, font } from '../constants/theme';

function greeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
}

function StatTile({ value, label, icon, tone }) {
  const tones = {
    jade: { fg: colors.jade, bg: colors.jadeGhost },
    turmeric: { fg: colors.turmericDeep, bg: colors.turmericSoft },
    pine: { fg: colors.pine, bg: '#E1EAE7' },
  };
  const t = tones[tone];
  return (
    <Card level={1} padded={false} style={styles.stat}>
      <View style={[styles.statIcon, { backgroundColor: t.bg }]}>
        <Feather name={icon} size={15} color={t.fg} />
      </View>
      <AppText style={{ fontFamily: font.displayBold, fontSize: 26, color: colors.ink }}>{value}</AppText>
      <AppText variant="caption" color={colors.inkFaint}>{label}</AppText>
    </Card>
  );
}

function StartConsultationCard({ onPress }) {
  const scale = useRef(new Animated.Value(1)).current;
  const press = (to) =>
    Animated.spring(scale, { toValue: to, useNativeDriver: true, speed: 45, bounciness: 5 }).start();
  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <Pressable onPress={onPress} onPressIn={() => press(0.98)} onPressOut={() => press(1)}>
        <View style={[styles.cta, shadow('pine')]}>
          <View style={styles.ctaGlow} />
          <View style={styles.ctaMic}>
            <Feather name="mic" size={24} color={colors.pineDeep} />
          </View>
          <View style={{ flex: 1 }}>
            <AppText style={[type.h3, { color: colors.onDark }]}>Start New Consultation</AppText>
            <AppText variant="small" color={colors.onDarkSoft} style={{ marginTop: 3 }}>
              Record a conversation or scan a prescription
            </AppText>
          </View>
          <Feather name="arrow-right" size={20} color={colors.turmeric} />
        </View>
      </Pressable>
    </Animated.View>
  );
}

export default function DashboardScreen({ navigation }) {
  return (
    <Screen>
      <Reveal delay={40} style={styles.topRow}>
        <View style={{ flex: 1 }}>
          <AppText variant="smallMed" color={colors.inkFaint}>{greeting()},</AppText>
          <AppText style={[type.h1, { marginTop: 2 }]}>{doctor.name}</AppText>
          <AppText variant="small" color={colors.inkFaint} style={{ marginTop: 3 }}>
            {doctor.specialty} · {doctor.hospital}
          </AppText>
        </View>
        <View style={styles.logoChip}>
          <Logo size={30} />
        </View>
      </Reveal>

      <Reveal delay={140} style={styles.statRow}>
        <StatTile value={todaySummary.consultations} label="Consults" icon="users" tone="jade" />
        <StatTile value={todaySummary.prescriptions} label="Scripts" icon="file-text" tone="pine" />
        <StatTile value={todaySummary.pending} label="Pending" icon="clock" tone="turmeric" />
      </Reveal>

      <Reveal delay={240} style={{ marginTop: spacing.xl }}>
        <StartConsultationCard onPress={() => navigation.navigate('NewConsultation')} />
      </Reveal>

      <Reveal delay={330} style={styles.sectionHead}>
        <AppText variant="h3">Your patients</AppText>
        <AppText variant="smallMed" color={colors.jade}>{patients.length} total</AppText>
      </Reveal>
      <Reveal delay={370}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.patientRow}
        >
          {patients.map((p) => (
            <Pressable
              key={p.id}
              onPress={() => navigation.navigate('PatientTimeline', { patientId: p.id })}
              style={styles.patientChip}
            >
              <Avatar name={p.name} tone={p.tone} size={54} />
              <AppText variant="caption" color={colors.inkSoft} numberOfLines={1} style={{ marginTop: 6, maxWidth: 64, textAlign: 'center' }}>
                {p.name.split(' ')[0]}
              </AppText>
            </Pressable>
          ))}
        </ScrollView>
      </Reveal>

      <Reveal delay={430} style={styles.sectionHead}>
        <AppText variant="h3">Recent consultations</AppText>
        <AppText variant="smallMed" color={colors.jade}>This week</AppText>
      </Reveal>

      {recentConsultations.map((rc, i) => (
        <Reveal key={rc.id} delay={490 + i * 90} style={{ marginBottom: spacing.md }}>
          <PatientCard
            name={rc.patientName}
            meta={`${rc.date}  ·  ${rc.diagnosis}`}
            tone={rc.tone}
            language={rc.language}
            status={rc.status}
            onPress={() => navigation.navigate('PatientTimeline', { patientId: rc.patientId })}
          />
        </Reveal>
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  topRow: { flexDirection: 'row', alignItems: 'flex-start', marginTop: spacing.sm, marginBottom: spacing.xl },
  logoChip: {
    width: 52,
    height: 52,
    borderRadius: radius.pill,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadow(1),
  },
  statRow: { flexDirection: 'row', gap: spacing.md },
  stat: { flex: 1, alignItems: 'flex-start', paddingVertical: spacing.lg, paddingHorizontal: spacing.md, gap: 6 },
  statIcon: {
    width: 32,
    height: 32,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  cta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.lg,
    backgroundColor: colors.pine,
    borderRadius: radius.xl,
    padding: spacing.xl,
    overflow: 'hidden',
  },
  ctaGlow: {
    position: 'absolute',
    right: -40,
    top: -40,
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: colors.turmericGlow,
  },
  ctaMic: {
    width: 52,
    height: 52,
    borderRadius: radius.pill,
    backgroundColor: colors.turmeric,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionHead: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    marginTop: spacing.xxl,
    marginBottom: spacing.lg,
  },
  patientRow: { gap: spacing.lg, paddingVertical: spacing.xs, paddingRight: spacing.lg },
  patientChip: { alignItems: 'center', width: 64 },
});

