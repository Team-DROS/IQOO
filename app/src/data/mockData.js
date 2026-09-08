/**
 * Frontend mock data for the VaidyaVani prototype.
 * Shapes here mirror the agreed consultation contract so the backend
 * team can later swap consultationService internals without touching screens.
 */

export const doctor = {
  name: 'Dr. Ananya Iyer',
  firstName: 'Ananya',
  specialty: 'General Physician',
  hospital: 'Sri Meenakshi Clinic, Madurai',
  initials: 'AI',
  regNo: 'TN-MC-48213',
};

export const todaySummary = {
  consultations: 8,
  prescriptions: 6,
  pending: 2,
};

// Patients. One (empty-history) drives the timeline empty state.
export const patients = [
  {
    id: 'pat-001',
    name: 'Aarav Mehta',
    age: 34,
    gender: 'Male',
    phone: '+91 98••• ••210',
    bloodGroup: 'O+',
    tone: 'jade',
    allergies: ['Penicillin'],
    chronic: [],
    lastVisit: '12 Jun 2026',
    history: [
      {
        id: 'v-101',
        date: '12 Jun 2026',
        reason: 'Viral fever',
        language: 'english',
        medicines: ['Paracetamol 500mg', 'ORS sachets'],
        note: 'Advised hydration and rest. Follow up if fever persists beyond 3 days.',
      },
      {
        id: 'v-102',
        date: '02 Mar 2026',
        reason: 'Seasonal allergic rhinitis',
        language: 'english',
        medicines: ['Cetirizine 10mg'],
        note: 'Nasal congestion, sneezing. Responded well to antihistamine.',
      },
    ],
  },
  {
    id: 'pat-002',
    name: 'Meena Rajan',
    age: 52,
    gender: 'Female',
    phone: '+91 90••• ••774',
    bloodGroup: 'A+',
    tone: 'turmeric',
    allergies: [],
    chronic: ['Type 2 Diabetes'],
    lastVisit: '20 Jul 2026',
    history: [
      {
        id: 'v-201',
        date: '20 Jul 2026',
        reason: 'Diabetes review',
        language: 'tanglish',
        medicines: ['Metformin 500mg', 'Glimepiride 1mg'],
        note: 'HbA1c 7.1%. Dose maintained. Diet counselling given.',
      },
      {
        id: 'v-202',
        date: '18 Apr 2026',
        reason: 'Throat infection',
        language: 'tanglish',
        medicines: ['Amoxicillin 500mg', 'Pantoprazole 40mg'],
        note: 'Bacterial pharyngitis. 5-day antibiotic course completed.',
      },
      {
        id: 'v-203',
        date: '05 Jan 2026',
        reason: 'Routine check-up',
        language: 'english',
        medicines: [],
        note: 'Vitals stable. Continue lifestyle measures.',
      },
    ],
  },
  {
    id: 'pat-003',
    name: 'Suresh Kumar',
    age: 61,
    gender: 'Male',
    phone: '+91 99••• ••305',
    bloodGroup: 'B+',
    tone: 'pine',
    allergies: ['Sulfa drugs'],
    chronic: ['Hypertension'],
    lastVisit: '28 Jul 2026',
    history: [
      {
        id: 'v-301',
        date: '28 Jul 2026',
        reason: 'Blood pressure review',
        language: 'hinglish',
        medicines: ['Amlodipine 5mg'],
        note: 'BP 138/86. Continue current dose. Reduce salt intake.',
      },
    ],
  },
  {
    id: 'pat-004',
    name: 'Priya Nair',
    age: 27,
    gender: 'Female',
    phone: '+91 97••• ••118',
    bloodGroup: 'AB+',
    tone: 'jade',
    allergies: [],
    chronic: [],
    lastVisit: 'No prior visits',
    history: [], // empty-state patient
  },
];

// Compact list for the dashboard's "recent" section.
export const recentConsultations = [
  {
    id: 'rc-1',
    patientId: 'pat-002',
    patientName: 'Meena Rajan',
    date: 'Today · 10:24 AM',
    diagnosis: 'Diabetes review',
    medicinesSummary: 'Metformin, Glimepiride',
    language: 'tanglish',
    status: 'confirmed',
    tone: 'turmeric',
  },
  {
    id: 'rc-2',
    patientId: 'pat-003',
    patientName: 'Suresh Kumar',
    date: 'Today · 09:05 AM',
    diagnosis: 'Blood pressure review',
    medicinesSummary: 'Amlodipine 5mg',
    language: 'hinglish',
    status: 'confirmed',
    tone: 'pine',
  },
  {
    id: 'rc-3',
    patientId: 'pat-001',
    patientName: 'Aarav Mehta',
    date: 'Yesterday · 4:42 PM',
    diagnosis: 'Viral fever',
    medicinesSummary: 'Paracetamol, ORS',
    language: 'english',
    status: 'needs_review',
    tone: 'jade',
  },
];

// Per-language demo transcripts + clinical scenarios so Review feels real.
export const scenarios = {
  english: {
    transcript:
      'Good morning. I have had fever and body pain since yesterday. Take Paracetamol 500mg, one tablet twice daily after food for three days, and drink plenty of water.',
    clinical: {
      symptoms: ['Fever', 'Body pain', 'Fatigue'],
      diagnosis: 'Viral fever',
      medicines: [
        { name: 'Paracetamol', dosage: '500 mg', frequency: 'Twice daily', duration: '3 days', instructions: 'After food' },
        { name: 'ORS Solution', dosage: '1 sachet', frequency: 'As needed', duration: '3 days', instructions: 'Dissolve in 1L water' },
      ],
      advice: ['Drink plenty of water', 'Rest for 2–3 days', 'Return if fever crosses 102°F'],
      notes: 'Symptomatic viral illness. Follow up if symptoms persist beyond 3 days.',
    },
    confidence: 'high',
    warnings: [],
  },
  hinglish: {
    transcript:
      'Namaste. Mujhe do din se sneezing aur naak mein itching ho rahi hai. Cetirizine 10mg raat ko ek baar, paanch din tak lijiye. Isse neend aa sakti hai.',
    clinical: {
      symptoms: ['Sneezing', 'Nasal itching', 'Watery eyes'],
      diagnosis: 'Allergic rhinitis',
      medicines: [
        { name: 'Cetirizine', dosage: '10 mg', frequency: 'Once at night', duration: '5 days', instructions: 'May cause drowsiness' },
        { name: 'Saline Nasal Spray', dosage: '2 sprays', frequency: 'Twice daily', duration: '5 days', instructions: 'Each nostril' },
      ],
      advice: ['Avoid dust exposure', 'Keep windows closed in early morning'],
      notes: 'Seasonal allergic rhinitis. Antihistamine at night to limit daytime drowsiness.',
    },
    confidence: 'medium',
    warnings: ['Patient first name was unclear in audio — please confirm.'],
  },
  tanglish: {
    transcript:
      'Vணakkam. Moonu naala throat pain iruku, saapida kashtama iruku. Amoxicillin 500mg oru capsule moonu vaati saapitta appuram, 5 naal. Pantoprazole 40mg breakfast-ku munnadi.',
    clinical: {
      symptoms: ['Throat pain', 'Difficulty swallowing', 'Mild fever'],
      diagnosis: 'Bacterial pharyngitis',
      medicines: [
        { name: 'Amoxicillin', dosage: '500 mg', frequency: 'Three times a day', duration: '5 days', instructions: 'After food' },
        { name: 'Pantoprazole', dosage: '40 mg', frequency: 'Once daily', duration: '5 days', instructions: 'Before breakfast' },
      ],
      advice: ['Warm salt-water gargle', 'Complete the full antibiotic course'],
      notes: 'Streptococcal pharyngitis likely. PPI cover for the antibiotic course.',
    },
    confidence: 'medium',
    warnings: ['Two medicine names were auto-corrected — please verify spelling.'],
  },
};

export const languages = [
  { id: 'english', label: 'English', native: 'English', tag: 'EN' },
  { id: 'hinglish', label: 'Hinglish', native: 'हिं + EN', tag: 'हि' },
  { id: 'tanglish', label: 'Tanglish', native: 'த + EN', tag: 'த' },
];

export function getPatientById(id) {
  return patients.find((p) => p.id === id) || null;
}

// Compose a consultation result matching the contract from a scenario + patient.
export function buildConsultationResult({ patientId, language = 'english', sourceType = 'audio' }) {
  const patient = getPatientById(patientId) || patients[0];
  const scenario = scenarios[language] || scenarios.english;
  return {
    patient: {
      id: patient.id,
      name: patient.name,
      age: patient.age,
      gender: patient.gender,
    },
    source: {
      type: sourceType, // "audio" | "image"
      language,
      transcript: sourceType === 'audio' ? scenario.transcript : null,
    },
    clinical: {
      symptoms: [...scenario.clinical.symptoms],
      diagnosis: scenario.clinical.diagnosis,
      medicines: scenario.clinical.medicines.map((m) => ({ ...m })),
      advice: [...scenario.clinical.advice],
      notes: scenario.clinical.notes,
    },
    confidence: scenario.confidence,
    warnings: [...scenario.warnings],
    status: 'needs_review',
  };
}
