import React, { useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';

/**
 * Staggered entrance animation. Fades and lifts children into place.
 * Use `delay` across siblings for an orchestrated page-load reveal.
 */
export default function Reveal({
  delay = 0,
  distance = 14,
  duration = 520,
  style,
  children,
  ...rest
}) {
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const anim = Animated.timing(progress, {
      toValue: 1,
      duration,
      delay,
      easing: Easing.bezier(0.16, 1, 0.3, 1),
      useNativeDriver: true,
    });
    anim.start();
    return () => anim.stop();
  }, [progress, delay, duration]);

  return (
    <Animated.View
      style={[
        {
          opacity: progress,
          transform: [
            {
              translateY: progress.interpolate({
                inputRange: [0, 1],
                outputRange: [distance, 0],
              }),
            },
          ],
        },
        style,
      ]}
      {...rest}
    >
      {children}
    </Animated.View>
  );
}
