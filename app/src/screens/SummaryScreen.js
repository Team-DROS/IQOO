import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';

export default function SummaryScreen({ route }) {
  const { patientName } = route.params;

  const handleSync = () => {
    Alert.alert(
      "Sync Success",
      "Synced to Pharmacy Dashboard ✓\n(simulated — Office Kit integration in 30-hour build)"
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Health Summary: {patientName}</Text>
      
      <View style={styles.section}>
        <Text style={styles.title}>Active Medications</Text>
        <Text style={styles.bullet}>• Current prescribed medications...</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.title}>Allergies</Text>
        <Text style={styles.bullet}>• None recorded</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.title}>Chronic Conditions</Text>
        <Text style={styles.bullet}>• {patientName === "Meena Rajan" ? "Type 2 Diabetes" : patientName === "Suresh Kumar" ? "Hypertension" : "None"}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.title}>Last Visit</Text>
        <Text style={styles.bullet}>• {new Date().toISOString().split('T')[0]}</Text>
      </View>

      <View style={styles.qrPlaceholder}>
        <Text style={styles.qrText}>[ QR Code — scan to view full summary ]</Text>
      </View>

      <TouchableOpacity style={styles.syncButton} onPress={handleSync}>
        <Text style={styles.syncButtonText}>Sync to Pharmacy (Office Kit)</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  section: { marginBottom: 16 },
  title: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  bullet: { fontSize: 14, color: '#555', marginTop: 4, marginLeft: 8 },
  qrPlaceholder: { marginVertical: 30, padding: 40, borderWidth: 2, borderStyle: 'dashed', borderColor: '#ccc', borderRadius: 8, alignItems: 'center' },
  qrText: { color: '#888', fontStyle: 'italic' },
  syncButton: { backgroundColor: '#ff9500', padding: 16, borderRadius: 8, alignItems: 'center' },
  syncButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' }
});
