import React, { useLayoutEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { mockPatients } from '../data/mockData';

export default function TimelineScreen({ route, navigation }) {
  const { patientName } = route.params;

  useLayoutEffect(() => {
    navigation.setOptions({ title: `Patient History — ${patientName}` });
  }, [navigation, patientName]);

  const patient = mockPatients.find(p => p.name === patientName) || {
    insurance: { provider: 'Unknown', policyNo: 'N/A', sumInsured: 'N/A' },
    records: []
  };

  const records = [
    { date: new Date().toISOString().split('T')[0], type: 'Prescription', summary: 'Newly confirmed prescription' },
    ...patient.records
  ];

  return (
    <View style={styles.container}>
      <View style={styles.insuranceCard}>
        <Text style={styles.cardTitle}>Insurance Details</Text>
        <Text style={styles.cardText}>Provider: {patient.insurance.provider}</Text>
        <Text style={styles.cardText}>Policy No: {patient.insurance.policyNo}</Text>
        <Text style={styles.cardText}>Sum Insured: {patient.insurance.sumInsured}</Text>
      </View>

      <Text style={styles.sectionTitle}>Records</Text>
      <FlatList
        data={records}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.recordItem}>
            <Text style={styles.recordDate}>{item.date}</Text>
            <View style={styles.badge}><Text style={styles.badgeText}>{item.type}</Text></View>
            <Text style={styles.recordSummary}>{item.summary}</Text>
          </View>
        )}
      />

      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('Dictation')}>
        <Text style={styles.addButtonText}>+ Add Record</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.summaryButton} onPress={() => navigation.navigate('Summary', { patientName })}>
        <Text style={styles.summaryButtonText}>Generate Doctor Summary</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f0f0f5' },
  insuranceCard: { backgroundColor: '#fff', padding: 16, borderRadius: 12, elevation: 3, marginBottom: 20 },
  cardTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 8 },
  cardText: { fontSize: 14, color: '#444', marginBottom: 4 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 12 },
  recordItem: { backgroundColor: '#fff', padding: 12, borderRadius: 8, marginBottom: 10, elevation: 1 },
  recordDate: { fontSize: 12, color: '#888', marginBottom: 4 },
  badge: { alignSelf: 'flex-start', backgroundColor: '#e0e0ff', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4, marginBottom: 4 },
  badgeText: { fontSize: 12, color: '#0000aa', fontWeight: 'bold' },
  recordSummary: { fontSize: 14 },
  addButton: { position: 'absolute', right: 16, bottom: 80, backgroundColor: '#007aff', paddingVertical: 12, paddingHorizontal: 16, borderRadius: 24, elevation: 5 },
  addButtonText: { color: '#fff', fontWeight: 'bold' },
  summaryButton: { backgroundColor: '#34c759', padding: 16, borderRadius: 8, alignItems: 'center', marginTop: 10 },
  summaryButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' }
});
