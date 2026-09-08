import React, { useState, useEffect, useRef } from 'react';
import { View, Animated, Easing, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import Screen from '../components/Screen';
import Reveal from '../components/Reveal';
import AppText from '../components/AppText';
import Logo from '../components/Logo';
import LoadingStep from '../components/LoadingStep';
import PrimaryButton from '../components/PrimaryButton';
import SecondaryButton from '../components/SecondaryButton';
import { processConsultation, processingStages } from '../services/consultationService';
import { colors, spacing, radius, type, shadow } from '../constants/theme';

export default function ProcessingScreen({ navigation, route }) {
  const input = route.params || {};
  const [stage, setStage] = useState(0);
  const [error, setError] = useState(null);
  const [attempt, setAttempt] = useState(0);
  const resultRef = useRef(null);
  const errorRef = useRef(null);
  const spin = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.timing(spin, { toValue: 1, duration: 2600, easing: Easing.linear, useNativeDriver: true })
    );
    loop.start();
    return () => loop.stop();
  }, [spin]);

  useEffect(() => {
    let cancelled = false;
    resultRef.current = null;
    errorRef.current = null;
    setError(null);
    setStage(0);

    processConsultation(input)
      .then((r) => { if (!cancelled) resultRef.current = r; })
      .catch((e) => { if (!cancelled) { errorRef.current = e.message; } });

    const t1 = setTimeout(() => !cancelled && setStage(1), 1050);
    const t2 = setTimeout(() => !cancelled && setStage(2), 2150);
    const t3 = setTimeout(() => {
      if (cancelled) return;
      setStage(3);
      setTimeout(() => {
        if (cancelled) return;
        if (errorRef.current) setError(errorRef.current);
        else navigation.replace('Review', { result: resultRef.current, input });
      }, 500);
    }, 3200);

    return () => {
      cancelled = true;
      [t1, t2, t3].forEach(clearTimeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [attempt]);

  const rotate = spin.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] });

  if (error) {
    return (
      <Screen scroll={false}>
        <View style={styles.center}>
          <Reveal>
            <View style={styles.errIcon}>
              <Feather name="cloud-off" size={34} color={colors.clay} />
            </View>
          </Reveal>
          <Reveal delay={100}>
            <AppText variant="h2" style={{ textAlign: 'center', marginTop: spacing.xl }}>
              Something interrupted us
            </AppText>
            <AppText variant="body" color={colors.inkSoft} style={{ textAlign: 'center', marginTop: spacing.sm, paddingHorizontal: spacing.lg }}>
              {error} Your recording is safe — nothing was lost.
            </AppText>
          </Reveal>
          <Reveal delay={200} style={styles.errActions}>
            <PrimaryButton label="Try Again" icon="refresh-cw" onPress={() => setAttempt((a) => a + 1)} />
            <SecondaryButton label="Go Back" onPress={() => navigation.goBack()} style={{ marginTop: spacing.md }} />
          </Reveal>
        </View>
      </Screen>
    );
  }

  return (
    <Screen scroll={false}>
      <View style={styles.body}>
        <View style={styles.emblemWrap}>
          <Animated.View style={[styles.ring, { transform: [{ rotate }] }]} />
          <View style={styles.emblem}>
            <Logo size={52} />
          </View>
        </View>

        <Reveal delay={60}>
          <AppText variant="h2" style={{ textAlign: 'center' }}>Reading the consultation</AppText>
          <AppText variant="body" color={colors.inkFaint} style={{ textAlign: 'center', marginTop: 4 }}>
            This usually takes a few seconds
          </AppText>
        </Reveal>

        <View style={styles.steps}>
          {processingStages.map((s, i) => (
            <LoadingStep
              key={s.key}
              state={stage > i ? 'done' : stage === i ? 'active' : 'pending'}
              label={s.label}
              detail={s.detail}
              isLast={i === processingStages.length - 1}
            />
          ))}
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  body: { flex: 1, justifyContent: 'center', paddingBottom: spacing.huge },
  emblemWrap: { alignSelf: 'center', width: 128, height: 128, alignItems: 'center', justifyContent: 'center', marginBottom: spacing.xl },
  ring: {
    position: 'absolute',
    width: 128,
    height: 128,
    borderRadius: 64,
    borderWidth: 3,
    borderColor: colors.turmeric,
    borderTopColor: 'transparent',
    borderRightColor: colors.jadeSoft,
  },
  emblem: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadow(2),
  },
  steps: {
    marginTop: spacing.xxxl,
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.xl,
    paddingBottom: spacing.sm,
    ...shadow(1),
  },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  errIcon: {
    width: 84,
    height: 84,
    borderRadius: radius.pill,
    backgroundColor: colors.claySoft,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  errActions: { alignSelf: 'stretch', marginTop: spacing.xxl },
});
