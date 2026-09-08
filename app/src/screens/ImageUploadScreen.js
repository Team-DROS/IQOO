import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import Screen from '../components/Screen';
import ScreenHeader from '../components/ScreenHeader';
import Reveal from '../components/Reveal';
import AppText from '../components/AppText';
import Card from '../components/Card';
import PrimaryButton from '../components/PrimaryButton';
import SecondaryButton from '../components/SecondaryButton';
import { colors, spacing, radius, type, shadow, font } from '../constants/theme';

function ChoiceCard({ icon, title, subtitle, onPress }) {
  return (
    <Card onPress={onPress} level={2} style={styles.choice}>
      <View style={styles.choiceIcon}>
        <Feather name={icon} size={22} color={colors.jade} />
      </View>
      <AppText variant="title" style={{ marginTop: spacing.md }}>{title}</AppText>
      <AppText variant="small" color={colors.inkFaint} style={{ marginTop: 2 }}>{subtitle}</AppText>
    </Card>
  );
}

/** A stylised "scanned prescription" stand-in (no real asset needed). */
function PrescriptionPreview() {
  return (
    <View style={styles.paper}>
      <View style={styles.paperHead}>
        <View>
          <AppText style={{ fontFamily: font.displayBold, fontSize: 15, color: colors.pine }}>Sri Meenakshi Clinic</AppText>
          <AppText variant="caption" color={colors.inkFaint}>Madurai · Reg. TN-MC-48213</AppText>
        </View>
        <View style={styles.rx}><AppText style={{ fontFamily: font.displayBlack, fontSize: 20, color: colors.turmericDeep }}>℞</AppText></View>
      </View>
      <View style={styles.rule} />
      {[0.9, 0.6, 0.75, 0.5].map((w, i) => (
        <View key={i} style={styles.scribbleRow}>
          <View style={[styles.ink, { width: `${w * 100}%` }]} />
          {i % 2 === 0 ? <View style={[styles.ink, { width: 40, backgroundColor: colors.turmericSoft }]} /> : null}
        </View>
      ))}
      <View style={styles.stamp}>
        <Feather name="edit-3" size={13} color={colors.inkGhost} />
        <AppText variant="caption" color={colors.inkGhost} style={{ marginLeft: 5 }}>Handwritten · Dr. A. Iyer</AppText>
      </View>
    </View>
  );
}

export default function ImageUploadScreen({ navigation, route }) {
  const { patientId, language } = route.params || {};
  const [source, setSource] = useState(null); // null | 'camera' | 'gallery'

  return (
    <Screen
      header={<ScreenHeader overline="Step 2 of 3" title="Scan Prescription" onBack={() => navigation.goBack()} />}
      footer={
        source ? (
          <Reveal>
            <PrimaryButton
              label="Continue"
              icon="arrow-right"
              onPress={() => navigation.replace('Processing', { patientId, language, sourceType: 'image' })}
            />
          </Reveal>
        ) : null
      }
    >
      {!source ? (
        <>
          <Reveal delay={40}>
            <View style={styles.dropzone}>
              <View style={styles.dropIcon}>
                <Feather name="image" size={28} color={colors.jade} />
              </View>
              <AppText variant="h3" style={{ marginTop: spacing.md, textAlign: 'center' }}>
                Add a prescription photo
              </AppText>
              <AppText variant="small" color={colors.inkFaint} style={{ textAlign: 'center', marginTop: 4 }}>
                We'll read the medicines, dosage and advice from the image
              </AppText>
            </View>
          </Reveal>

          <Reveal delay={160} style={styles.choiceRow}>
            <ChoiceCard icon="camera" title="Camera" subtitle="Take a photo" onPress={() => setSource('camera')} />
            <ChoiceCard icon="folder" title="Gallery" subtitle="Choose a file" onPress={() => setSource('gallery')} />
          </Reveal>

          <Reveal delay={260}>
            <View style={styles.hint}>
              <Feather name="info" size={13} color={colors.inkFaint} />
              <AppText variant="caption" color={colors.inkFaint} style={{ marginLeft: 6, flex: 1 }}>
                Prototype uses a sample image · no camera access or upload is performed
              </AppText>
            </View>
          </Reveal>
        </>
      ) : (
        <>
          <Reveal delay={40}>
            <AppText variant="overline" color={colors.jade} style={{ marginBottom: spacing.md }}>
              PREVIEW · FROM {source === 'camera' ? 'CAMERA' : 'GALLERY'}
            </AppText>
            <PrescriptionPreview />
          </Reveal>
          <Reveal delay={160} style={styles.replaceRow}>
            <SecondaryButton
              label="Retake / Replace"
              icon="refresh-ccw"
              onPress={() => setSource(null)}
              style={{ flex: 1 }}
            />
          </Reveal>
        </>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  dropzone: {
    alignItems: 'center',
    paddingVertical: spacing.xxl,
    backgroundColor: colors.surfaceAlt,
    borderRadius: radius.xl,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: colors.borderStrong,
    marginTop: spacing.sm,
  },
  dropIcon: {
    width: 60,
    height: 60,
    borderRadius: radius.pill,
    backgroundColor: colors.jadeGhost,
    alignItems: 'center',
    justifyContent: 'center',
  },
  choiceRow: { flexDirection: 'row', gap: spacing.md, marginTop: spacing.xl },
  choice: { flex: 1, alignItems: 'flex-start', paddingVertical: spacing.xl },
  choiceIcon: {
    width: 48,
    height: 48,
    borderRadius: radius.md,
    backgroundColor: colors.jadeGhost,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hint: { flexDirection: 'row', alignItems: 'center', marginTop: spacing.xl, paddingHorizontal: spacing.xs },
  paper: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.xl,
    ...shadow(2),
  },
  paperHead: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  rx: {
    width: 40,
    height: 40,
    borderRadius: radius.md,
    backgroundColor: colors.turmericSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rule: { height: 1, backgroundColor: colors.border, marginVertical: spacing.lg },
  scribbleRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginBottom: spacing.lg },
  ink: { height: 9, borderRadius: radius.pill, backgroundColor: colors.boneDeep },
  stamp: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginTop: spacing.md,
  },
  replaceRow: { marginTop: spacing.xl },
});
