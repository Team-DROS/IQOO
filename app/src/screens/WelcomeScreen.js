import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import Screen from '../components/Screen';
import Reveal from '../components/Reveal';
import Logo from '../components/Logo';
import AppText from '../components/AppText';
import PrimaryButton from '../components/PrimaryButton';
import { colors, spacing, radius, type, font } from '../constants/theme';

const LANG_TAGS = [
  { tag: 'EN', label: 'English' },
  { tag: 'हि', label: 'Hinglish' },
  { tag: 'த', label: 'Tanglish' },
];

export default function WelcomeScreen({ navigation }) {
  return (
    <Screen
      variant="dark"
      scroll={false}
      footer={
        <Reveal delay={620}>
          <PrimaryButton
            label="Get Started"
            icon="arrow-right"
            onPress={() => navigation.replace('Dashboard')}
          />
          <AppText
            variant="caption"
            color={colors.onDarkFaint}
            style={{ textAlign: 'center', marginTop: spacing.lg }}
          >
            No sign-in needed · Prototype build
          </AppText>
        </Reveal>
      }
    >
      <View style={styles.hero}>
        <Reveal delay={80}>
          <View style={styles.logoWrap}>
            <Logo size={72} leaf={colors.jadeBright} pulse={colors.turmeric} />
          </View>
        </Reveal>

        <Reveal delay={200}>
          <AppText style={[type.hero, styles.wordmark]}>VaidyaVani</AppText>
        </Reveal>

        <Reveal delay={320}>
          <AppText style={[type.h3, styles.tagline]}>Multilingual Clinical Intelligence</AppText>
        </Reveal>

        <Reveal delay={420}>
          <AppText variant="body" color={colors.onDarkSoft} style={styles.blurb}>
            Speak the prescription. VaidyaVani listens across languages and turns the
            consultation into a clean, structured record — for you to confirm.
          </AppText>
        </Reveal>

        <Reveal delay={520}>
          <View style={styles.langRow}>
            {LANG_TAGS.map((l) => (
              <View key={l.tag} style={styles.langPill}>
                <View style={styles.langTag}>
                  <AppText style={{ fontFamily: font.bodyBold, fontSize: 13, color: colors.pineDeep }}>
                    {l.tag}
                  </AppText>
                </View>
                <AppText style={[type.smallMed, { color: colors.onDark }]}>{l.label}</AppText>
              </View>
            ))}
          </View>
        </Reveal>
      </View>

      <Reveal delay={560} style={styles.footNote}>
        <Feather name="shield" size={13} color={colors.onDarkFaint} />
        <AppText variant="caption" color={colors.onDarkFaint} style={{ marginLeft: 6 }}>
          Doctor-confirmed. AI never prescribes on its own.
        </AppText>
      </Reveal>
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  logoWrap: {
    width: 112,
    height: 112,
    borderRadius: radius.pill,
    backgroundColor: 'rgba(244,241,232,0.06)',
    borderWidth: 1,
    borderColor: 'rgba(244,241,232,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xl,
  },
  wordmark: { color: colors.onDark, textAlign: 'center' },
  tagline: { color: colors.turmeric, textAlign: 'center', marginTop: spacing.sm },
  blurb: { textAlign: 'center', marginTop: spacing.lg, paddingHorizontal: spacing.sm },
  langRow: { flexDirection: 'row', gap: spacing.sm, marginTop: spacing.xxl },
  langPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    backgroundColor: 'rgba(244,241,232,0.08)',
    borderRadius: radius.pill,
    paddingLeft: 5,
    paddingRight: spacing.md,
    paddingVertical: 5,
  },
  langTag: {
    width: 28,
    height: 28,
    borderRadius: radius.pill,
    backgroundColor: colors.turmericSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footNote: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingBottom: spacing.sm },
});
