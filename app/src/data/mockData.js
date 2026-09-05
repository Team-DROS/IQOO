export const mockPatients = [
  {
    name: "Meena Rajan",
    age: 52,
    insurance: { provider: "Star Health", policyNo: "SH-2291", sumInsured: "₹5,00,000" },
    records: [
      { date: "2026-06-12", type: "Prescription", summary: "Metformin 500mg, twice daily" },
      { date: "2026-03-02", type: "Lab Report", summary: "HbA1c: 7.1%" },
    ],
  },
  {
    name: "Suresh Kumar",
    age: 61,
    insurance: { provider: "HDFC Ergo", policyNo: "HE-7743", sumInsured: "₹3,00,000" },
    records: [
      { date: "2026-07-20", type: "Prescription", summary: "Amlodipine 5mg, once daily" },
    ],
  },
];

export const demoTranscript = "Amoxicillin 500 milligrams, three times a day, for seven days.";

export const demoStructuredResult = {
  medicine: "Amoxicillin",
  dosage: "500mg",
  frequency: "Three times a day",
  duration: "7 days",
};
