import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import AppText from './AppText';
import { colors, spacing, radius, type } from '../constants/theme';

/**
 * One row in the Processing cascade. state: 'done' | 'active' | 'pending'.
 */
export default function LoadingStep({ state, label, detail, isLast }) {
  const pulse = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (state !== 'active') return undefined;
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 1, duration: 850, useNativeDriver: true }),
        Animated.timing(pulse, { toValue: 0, duration: 850, useNativeDriver: true }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [state, pulse]);

  const done = state === 'done';
  const active = state === 'active';

  const dotColor = done ? colors.jade : active ? colors.turmeric : colors.surface;
  const dotBorder = done ? colors.jade : active ? colors.turmeric : colors.borderStrong;
  const labelColor = done || active ? colors.ink : colors.inkGhost;

  return (
    <View style={styles.row}>
      <View style={styles.rail}>
        {active ? (
          <Animated.View
            style={[
              styles.halo,
              {
                opacity: pulse.interpolate({ inputRange: [0, 1], outputRange: [0.15, 0.4] }),
                transform: [{ scale: pulse.interpolate({ inputRange: [0, 1], outputRange: [1, 1.5] }) }],
              },
            ]}
          />
        ) : null}
        <View style={[styles.dot, { backgroundColor: dotColor, borderColor: dotBorder }]}>
          {done ? <Feather name="check" size={14} color={colors.white} /> : null}
          {active ? <View style={styles.innerDot} /> : null}
        </View>
        {!isLast ? <View style={[styles.line, { backgroundColor: done ? colors.jade : colors.border }]} /> : null}
      </View>

      <View style={styles.body}>
        <AppText style={[type.title, { color: labelColor, fontSize: 16 }]}>{label}</AppText>
        {detail ? (
          <AppText variant="small" color={active ? colors.inkSoft : colors.inkGhost} style={{ marginTop: 2 }}>
            {detail}
          </AppText>
        ) : null}
      </View>
    </View>
  );
}

const DOT = 30;
const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: spacing.lg },
  rail: { alignItems: 'center', width: DOT },
  halo: {
    position: 'absolute',
    top: 0,
    width: DOT,
    height: DOT,
    borderRadius: DOT / 2,
    backgroundColor: colors.turmeric,
  },
  dot: {
    width: DOT,
    height: DOT,
    borderRadius: DOT / 2,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.white },
  line: { width: 2, flex: 1, marginVertical: 6, borderRadius: 1, minHeight: 22 },
  body: { flex: 1, paddingBottom: spacing.xl, paddingTop: 3 },
});
