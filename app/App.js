import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  useFonts,
  Fraunces_600SemiBold,
  Fraunces_700Bold,
  Fraunces_900Black,
  Fraunces_500Medium_Italic,
} from '@expo-google-fonts/fraunces';
import {
  HankenGrotesk_400Regular,
  HankenGrotesk_500Medium,
  HankenGrotesk_600SemiBold,
  HankenGrotesk_700Bold,
} from '@expo-google-fonts/hanken-grotesk';

import PhoneFrame from './src/components/PhoneFrame';
import GradientBackground from './src/components/GradientBackground';
import Logo from './src/components/Logo';
import { colors } from './src/constants/theme';

import WelcomeScreen from './src/screens/WelcomeScreen';
import DashboardScreen from './src/screens/DashboardScreen';
import NewConsultationScreen from './src/screens/NewConsultationScreen';
import AudioRecordingScreen from './src/screens/AudioRecordingScreen';
import ImageUploadScreen from './src/screens/ImageUploadScreen';
import ProcessingScreen from './src/screens/ProcessingScreen';
import ReviewScreen from './src/screens/ReviewScreen';
import PrescriptionPreviewScreen from './src/screens/PrescriptionPreviewScreen';
import PatientTimelineScreen from './src/screens/PatientTimelineScreen';

const Stack = createNativeStackNavigator();

const navTheme = {
  ...DefaultTheme,
  colors: { ...DefaultTheme.colors, background: colors.bone },
};

// Web deep links / shareable URLs. Query params map onto route params.
const linking = {
  prefixes: [],
  config: {
    screens: {
      Welcome: '',
      Dashboard: 'dashboard',
      NewConsultation: 'new-consultation',
      AudioRecording: 'record',
      ImageUpload: 'scan',
      Processing: 'processing',
      Review: 'review',
      PrescriptionPreview: 'prescription',
      PatientTimeline: 'timeline',
    },
  },
};

function SplashLoading() {
  return (
    <GradientBackground variant="dark">
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 24 }}>
        <Logo size={72} leaf={colors.jadeBright} pulse={colors.turmeric} />
        <ActivityIndicator color={colors.turmeric} />
      </View>
    </GradientBackground>
  );
}

export default function App() {
  const [fontsLoaded] = useFonts({
    Display: Fraunces_600SemiBold,
    DisplayBold: Fraunces_700Bold,
    DisplayBlack: Fraunces_900Black,
    DisplayItalic: Fraunces_500Medium_Italic,
    Body: HankenGrotesk_400Regular,
    BodyMed: HankenGrotesk_500Medium,
    BodySemi: HankenGrotesk_600SemiBold,
    BodyBold: HankenGrotesk_700Bold,
  });

  return (
    <SafeAreaProvider>
      <PhoneFrame>
        <StatusBar style="dark" />
        {!fontsLoaded ? (
          <SplashLoading />
        ) : (
          <NavigationContainer theme={navTheme} linking={linking}>
            <Stack.Navigator
              initialRouteName="Welcome"
              screenOptions={{
                headerShown: false,
                contentStyle: { backgroundColor: colors.bone },
                animation: 'slide_from_right',
              }}
            >
              <Stack.Screen name="Welcome" component={WelcomeScreen} />
              <Stack.Screen name="Dashboard" component={DashboardScreen} />
              <Stack.Screen name="NewConsultation" component={NewConsultationScreen} />
              <Stack.Screen name="AudioRecording" component={AudioRecordingScreen} />
              <Stack.Screen name="ImageUpload" component={ImageUploadScreen} />
              <Stack.Screen name="Processing" component={ProcessingScreen} options={{ animation: 'fade' }} />
              <Stack.Screen name="Review" component={ReviewScreen} />
              <Stack.Screen name="PrescriptionPreview" component={PrescriptionPreviewScreen} />
              <Stack.Screen name="PatientTimeline" component={PatientTimelineScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        )}
      </PhoneFrame>
    </SafeAreaProvider>
  );
}
