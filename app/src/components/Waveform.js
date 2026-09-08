import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import { colors, radius } from '../constants/theme';

const BAR_COUNT = 34;
const SEED = Array.from({ length: BAR_COUNT }, (_, i) =>
  0.28 + Math.abs(Math.sin(i * 1.7) * 0.55) + (i % 5 === 0 ? 0.2 : 0)
);

/**
 * Animated recording waveform. `active` drives the motion; paused freezes it.
 */
export default function Waveform({ active, color = colors.jade, height = 64 }) {
  const bars = useRef(SEED.map(() => new Animated.Value(0.3))).current;

  useEffect(() => {
    if (!active) {
      bars.forEach((b) => b.stopAnimation());
      return undefined;
    }
    const loops = bars.map((b, i) => {
      const peak = SEED[i];
      return Animated.loop(
        Animated.sequence([
          Animated.timing(b, { toValue: peak, duration: 320 + (i % 7) * 55, useNativeDriver: false }),
          Animated.timing(b, { toValue: 0.18, duration: 320 + (i % 5) * 65, useNativeDriver: false }),
        ])
      );
    });
    loops.forEach((l, i) => setTimeout(() => l.start(), i * 22));
    return () => loops.forEach((l) => l.stop());
  }, [active, bars]);

  return (
    <View style={[styles.wrap, { height }]}>
      {bars.map((b, i) => (
        <Animated.View
          key={i}
          style={{
            width: 4,
            borderRadius: radius.pill,
            backgroundColor: color,
            opacity: active ? 1 : 0.35,
            height: b.interpolate({ inputRange: [0, 1], outputRange: [4, height] }),
          }}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 3,
  },
});
