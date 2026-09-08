/**
 * Mock service layer for the VaidyaVani prototype.
 *
 * Screens depend ONLY on this interface, never on backend files. The backend
 * team can replace the internals of these functions with real Groq / API calls
 * later without changing any screen. Do not rename the returned fields — the
 * backend adapter depends on the consultation contract in mockData.js.
 */

import {
  buildConsultationResult,
  patients,
  recentConsultations,
  getPatientById,
} from '../data/mockData';

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Simulate the full extraction pipeline.
 * @param {{patientId:string, language:string, sourceType:'audio'|'image', simulateError?:boolean}} input
 * @returns {Promise<object>} consultation result (contract shape)
 */
export async function processConsultation(input = {}) {
  await wait(400);
  if (input.simulateError) {
    throw new Error('We could not reach the extraction service. Please retry.');
  }
  return buildConsultationResult({
    patientId: input.patientId,
    language: input.language || 'english',
    sourceType: input.sourceType || 'audio',
  });
}

export async function getPatients() {
  await wait(120);
  return patients;
}

export async function getRecentConsultations() {
  await wait(120);
  return recentConsultations;
}

export async function getPatientTimeline(patientId) {
  await wait(120);
  const patient = getPatientById(patientId);
  return patient ? patient.history : [];
}

// Processing stage labels — exposed so the Processing screen and future
// backend progress events stay in sync.
export const processingStages = [
  { key: 'prepare', label: 'Preparing input', detail: 'Securing the audio and patient context' },
  { key: 'understand', label: 'Understanding conversation', detail: 'Transcribing and detecting language' },
  { key: 'structure', label: 'Structuring clinical details', detail: 'Extracting medicines, dosage and advice' },
];
