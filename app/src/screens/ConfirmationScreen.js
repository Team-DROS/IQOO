import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

export default function ConfirmationScreen({ route, navigation }) {
  const { patientName, medicine, dosage, frequency, duration, notes } = route.params;

  const [form, setForm] = useState({
    medicine: medicine || '',
    dosage: dosage || '',
    frequency: frequency || '',
    duration: duration || '',
    notes: notes || ''
  });

  const handleChange = (key, value) => setForm({ ...form, [key]: value });

  const handleConfirm = () => {
    navigation.navigate('Timeline', { patientName });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Patient: {patientName}</Text>
      
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Medicine</Text>
        <TextInput style={styles.input} value={form.medicine} onChangeText={(v) => handleChange('medicine', v)} />
      </View>
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Dosage</Text>
        <TextInput style={styles.input} value={form.dosage} onChangeText={(v) => handleChange('dosage', v)} />
      </View>
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Frequency</Text>
        <TextInput style={styles.input} value={form.frequency} onChangeText={(v) => handleChange('frequency', v)} />
      </View>
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Duration</Text>
        <TextInput style={styles.input} value={form.duration} onChangeText={(v) => handleChange('duration', v)} />
      </View>
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Notes</Text>
        <TextInput style={styles.input} value={form.notes} onChangeText={(v) => handleChange('notes', v)} />
      </View>

      <Text style={styles.caption}>Review before saving — voice transcription can make mistakes.</Text>

      <TouchableOpacity style={styles.button} onPress={handleConfirm}>
        <Text style={styles.buttonText}>Confirm & Save</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  header: { fontSize: 20, fontWeight: 'bold', marginBottom: 16 },
  fieldContainer: { marginBottom: 12 },
  label: { fontSize: 14, color: '#555', marginBottom: 4 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10, fontSize: 16 },
  caption: { fontSize: 12, color: '#888', fontStyle: 'italic', textAlign: 'center', marginVertical: 16 },
  button: { backgroundColor: '#007aff', padding: 16, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' }
});
