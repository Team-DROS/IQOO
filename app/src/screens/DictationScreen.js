import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Switch, StyleSheet, Animated } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { mockPatients, demoTranscript, demoStructuredResult } from '../data/mockData';

export default function DictationScreen({ navigation }) {
  const [selectedPatient, setSelectedPatient] = useState(mockPatients[0].name);
  const [demoMode, setDemoMode] = useState(true);
  const [recordingStatus, setRecordingStatus] = useState('idle'); // idle, recording, processing
  
  const pulseAnim = React.useRef(new Animated.Value(1)).current;

  const startPulse = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1.2, duration: 500, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1, duration: 500, useNativeDriver: true })
      ])
    ).start();
  };

  const handleRecord = () => {
    setRecordingStatus('recording');
    startPulse();

    setTimeout(() => {
      setRecordingStatus('processing');
      pulseAnim.stopAnimation();
      
      setTimeout(() => {
        setRecordingStatus('idle');
        
        let resultData = {};
        if (demoMode) {
          resultData = { ...demoStructuredResult };
        } else {
          // Fallback if demo mode is off but no real API is hooked up
          resultData = {
            medicine: "Simulated Med",
            dosage: "10mg",
            frequency: "Once a day",
            duration: "5 days"
          };
        }
        
        navigation.navigate('Confirmation', { patientName: selectedPatient, ...resultData });
      }, 1000);
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.label}>Patient:</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedPatient}
            style={styles.picker}
            onValueChange={(val) => setSelectedPatient(val)}
          >
            {mockPatients.map((p, i) => (
              <Picker.Item key={i} label={p.name} value={p.name} />
            ))}
          </Picker>
        </View>
      </View>
      
      <View style={styles.demoRow}>
        <Text style={styles.label}>Demo Mode</Text>
        <Switch value={demoMode} onValueChange={setDemoMode} />
      </View>

      <View style={styles.centerContainer}>
        {recordingStatus === 'recording' && <Text style={styles.statusText}>Recording...</Text>}
        {recordingStatus === 'processing' && <Text style={styles.statusText}>Processing...</Text>}
        
        <TouchableOpacity 
          onPress={handleRecord} 
          disabled={recordingStatus !== 'idle'}
          style={styles.micButtonContainer}
        >
          <Animated.View style={[styles.micButton, { transform: [{ scale: recordingStatus === 'recording' ? pulseAnim : 1 }] }]}>
            <Text style={styles.micText}>🎙️</Text>
          </Animated.View>
        </TouchableOpacity>
        <Text style={styles.hint}>Tap to dictate prescription</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f5f5f5' },
  headerRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  label: { fontSize: 16, fontWeight: 'bold', marginRight: 8 },
  pickerContainer: { flex: 1, backgroundColor: '#fff', borderRadius: 8, overflow: 'hidden' },
  picker: { width: '100%' },
  demoRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', marginBottom: 24 },
  centerContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  statusText: { fontSize: 18, fontWeight: '600', marginBottom: 20, color: '#333' },
  micButtonContainer: { marginVertical: 20 },
  micButton: { width: 120, height: 120, borderRadius: 60, backgroundColor: '#ff4444', justifyContent: 'center', alignItems: 'center', elevation: 5 },
  micText: { fontSize: 48 },
  hint: { fontSize: 14, color: '#666', marginTop: 12 }
});
