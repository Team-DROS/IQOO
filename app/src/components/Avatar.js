import React from 'react';
import { View } from 'react-native';
import AppText from './AppText';
import { colors, radius, font } from '../constants/theme';

const TONES = {
  jade: { bg: colors.jadeSoft, fg: colors.pine },
  turmeric: { bg: colors.turmericSoft, fg: colors.turmericDeep },
  pine: { bg: '#DCE7E4', fg: colors.pine },
};

function initials(name = '') {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();
}

export default function Avatar({ name, tone = 'jade', size = 48, style }) {
  const t = TONES[tone] || TONES.jade;
  return (
    <View
      style={[
        {
          width: size,
          height: size,
          borderRadius: radius.pill,
          backgroundColor: t.bg,
          alignItems: 'center',
          justifyContent: 'center',
        },
        style,
      ]}
    >
      <AppText style={{ fontFamily: font.displayBold, fontSize: size * 0.36, color: t.fg }}>
        {initials(name)}
      </AppText>
    </View>
  );
}
