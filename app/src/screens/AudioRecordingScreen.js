import React, { useState, useEffect, useRef } from 'react';
import { View, Pressable, Animated, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import Screen from '../components/Screen';
import ScreenHeader from '../components/ScreenHeader';
import Reveal from '../components/Reveal';
import AppText from '../components/AppText';
import Waveform from '../components/Waveform';
import PrimaryButton from '../components/PrimaryButton';
import { languageColors } from '../constants/theme';
import { colors, spacing, radius, type, shadow, font } from '../constants/theme';

function fmt(s) {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${m}:${sec.toString().padStart(2, '0')}`;
}

function ControlButton({ icon, label, onPress, tone = 'neutral' }) {
  const tones = {
    neutral: { bg: colors.surface, fg: colors.ink, border: colors.border },
    stop: { bg: colors.clay, fg: colors.white, border: colors.clay },
  };
  const t = tones[tone];
  return (
    <Pressable onPress={onPress} style={styles.ctrlWrap}>
      <View style={[styles.ctrl, { backgroundColor: t.bg, borderColor: t.border }, shadow(1)]}>
        <Feather name={icon} size={22} color={t.fg} />
      </View>
      <AppText variant="caption" color={colors.inkFaint} style={{ marginTop: 6 }}>{label}</AppText>
    </Pressable>
  );
}

export default function AudioRecordingScreen({ navigation, route }) {
  const { patientId, language = 'english' } = route.params || {};
  const [status, setStatus] = useState('idle'); // idle | recording | paused | completed
  const [seconds, setSeconds] = useState(0);
  const pulse = useRef(new Animated.Value(0)).current;
  const lang = languageColors[language];

  useEffect(() => {
    if (status !== 'recording') return undefined;
    const id = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [status]);

  useEffect(() => {
    if (status === 'recording') {
      const loop = Animated.loop(
        Animated.sequence([
          Animated.timing(pulse, { toValue: 1, duration: 1100, useNativeDriver: true }),
          Animated.timing(pulse, { toValue: 0, duration: 1100, useNativeDriver: true }),
        ])
      );
      loop.start();
      return () => loop.stop();
    }
    pulse.setValue(0);
    return undefined;
  }, [status, pulse]);

  const active = status === 'recording';
  const idle = status === 'idle';
  const completed = status === 'completed';

  return (
    <Screen
      scroll={false}
      header={
        <ScreenHeader
          overline="Step 2 of 3"
          title="Record Conversation"
          onBack={() => navigation.goBack()}
        />
      }
      footer={
        completed ? (
          <Reveal>
            <PrimaryButton
              label="Process Recording"
              icon="arrow-right"
              onPress={() => navigation.replace('Processing', { patientId, language, sourceType: 'audio' })}
            />
            <Pressable onPress={() => { setSeconds(0); setStatus('idle'); }} style={{ paddingVertical: spacing.md }}>
              <AppText variant="smallMed" color={colors.jade} style={{ textAlign: 'center' }}>
                Record again
              </AppText>
            </Pressable>
          </Reveal>
        ) : null
      }
    >
      <View style={styles.body}>
        <Reveal delay={40} style={styles.langBadge}>
          <View style={[styles.langDot, { backgroundColor: lang.bg }]}>
            <AppText style={{ fontFamily: font.bodyBold, fontSize: 13, color: lang.fg }}>{lang.tag}</AppText>
          </View>
          <AppText variant="smallMed" color={colors.inkSoft}>{lang.label} conversation</AppText>
        </Reveal>

        <View style={styles.center}>
          {/* timer / status */}
          <AppText style={[styles.timer, { color: idle ? colors.inkGhost : colors.ink }]}>
            {fmt(seconds)}
          </AppText>
          <AppText
            variant="smallMed"
            color={active ? colors.clay : status === 'paused' ? colors.turmericDeep : colors.inkFaint}
            style={{ marginTop: spacing.sm }}
          >
            {idle ? 'Tap the mic to start' : active ? 'Recording…' : status === 'paused' ? 'Paused' : 'Recording captured'}
          </AppText>

          {/* waveform / mic */}
          <View style={styles.stage}>
            {idle || completed ? (
              <Pressable
                disabled={completed}
                onPress={() => setStatus('recording')}
                style={styles.micTapZone}
              >
                <Animated.View style={styles.micHalo} />
                <View style={[styles.mic, completed && { backgroundColor: colors.sage }, shadow(completed ? 'jade' : 'turmeric')]}>
                  <Feather name={completed ? 'check' : 'mic'} size={44} color={completed ? colors.white : colors.pineDeep} />
                </View>
              </Pressable>
            ) : (
              <View style={styles.wavePanel}>
                <Waveform active={active} height={90} />
              </View>
            )}
          </View>
        </View>

        {/* transport controls */}
        <View style={styles.controls}>
          {active ? (
            <>
              <ControlButton icon="pause" label="Pause" onPress={() => setStatus('paused')} />
              <ControlButton icon="square" label="Stop" tone="stop" onPress={() => setStatus('completed')} />
            </>
          ) : null}
          {status === 'paused' ? (
            <>
              <ControlButton icon="play" label="Resume" onPress={() => setStatus('recording')} />
              <ControlButton icon="square" label="Stop" tone="stop" onPress={() => setStatus('completed')} />
            </>
          ) : null}
          {idle ? (
            <AppText variant="caption" color={colors.inkGhost} style={{ textAlign: 'center' }}>
              Simulated capture · no microphone access in this prototype
            </AppText>
          ) : null}
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  body: { flex: 1, paddingTop: spacing.md },
  langBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    gap: spacing.sm,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.pill,
    paddingLeft: 5,
    paddingRight: spacing.lg,
    paddingVertical: 5,
    ...shadow(1),
  },
  langDot: { width: 28, height: 28, borderRadius: radius.pill, alignItems: 'center', justifyContent: 'center' },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  timer: { fontFamily: font.displayBold, fontSize: 56, lineHeight: 64, letterSpacing: -1, textAlign: 'center' },
  stage: { height: 200, alignItems: 'center', justifyContent: 'center', marginTop: spacing.xl, alignSelf: 'stretch' },
  micTapZone: { width: 140, height: 140, alignItems: 'center', justifyContent: 'center' },
  micHalo: {
    position: 'absolute',
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: colors.turmericGlow,
  },
  mic: {
    width: 108,
    height: 108,
    borderRadius: 54,
    backgroundColor: colors.turmeric,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wavePanel: {
    alignSelf: 'stretch',
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.xxl,
    ...shadow(2),
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xxxl,
    minHeight: 90,
    paddingBottom: spacing.lg,
  },
  ctrlWrap: { alignItems: 'center' },
  ctrl: {
    width: 60,
    height: 60,
    borderRadius: radius.pill,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
