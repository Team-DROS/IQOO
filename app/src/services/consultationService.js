/** Frontend boundary for mock and HTTP-backed consultation processing. */

import {
  buildConsultationResult,
  patients,
  recentConsultations,
  getPatientById,
} from '../data/mockData';

const API_URL = (process.env.EXPO_PUBLIC_API_URL || 'http://127.0.0.1:8000').replace(/\/$/, '');
const USE_BACKEND = process.env.EXPO_PUBLIC_USE_BACKEND === 'true';
const ALLOW_MOCK_FALLBACK = process.env.EXPO_PUBLIC_ALLOW_MOCK_FALLBACK === 'true';
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function apiError(response, payload) {
  const detail = payload?.detail || `Extraction service returned ${response.status}.`;
  return new Error(detail);
}

async function requestJson(path, options = {}) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 60000);
  try {
    const response = await fetch(`${API_URL}${path}`, { ...options, signal: controller.signal });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) throw apiError(response, payload);
    return payload;
  } catch (error) {
    if (error.name === 'AbortError') throw new Error('The extraction service took too long. Please retry.');
    if (error instanceof TypeError) throw new Error('Cannot reach the VaidyaVani backend. Check that it is running.');
    throw error;
  } finally {
    clearTimeout(timeout);
  }
}

function cleanValue(value) {
  if (value == null || String(value).trim().toLowerCase() === 'null') return '';
  return value;
}

function normalizeMedicine(medicine) {
  return {
    name: cleanValue(medicine.name), dosage: cleanValue(medicine.dosage),
    frequency: cleanValue(medicine.frequency), duration: cleanValue(medicine.duration),
    instructions: cleanValue(medicine.instructions),
  };
}

/** Convert the backend response into the screen contract without inventing facts. */
export function adaptExtractionResponse(payload, input = {}) {
  const selectedPatient = getPatientById(input.patientId) || patients[0];
  const prescription = payload.prescription || {};
  const warnings = [];
  if (prescription.confidence !== 'high') warnings.push(`Extraction confidence is ${prescription.confidence || 'unknown'} — verify all fields.`);
  const extractedName = cleanValue(prescription.patient_name);
  if (!extractedName) warnings.push('Patient name was not found in the input.');

  return {
    patient: {
      id: selectedPatient.id,
      name: extractedName || selectedPatient.name,
      age: selectedPatient.age,
      gender: selectedPatient.gender,
    },
    source: {
      type: payload.source_type || input.sourceType || 'audio',
      language: input.language || 'english',
      transcript: payload.transcript || null,
    },
    clinical: {
      symptoms: [],
      diagnosis: '',
      medicines: (prescription.medicines || []).map(normalizeMedicine),
      advice: [],
      notes: cleanValue(prescription.notes),
    },
    confidence: prescription.confidence || 'low',
    warnings,
    status: 'needs_review',
  };
}

async function uploadFile(input) {
  const form = new FormData();
  const file = input.file;
  if (typeof File !== 'undefined' && file instanceof File) {
    form.append('file', file);
  } else {
    form.append('file', { uri: file.uri, name: file.name || `consultation.${input.sourceType === 'image' ? 'jpg' : 'm4a'}`, type: file.type || 'application/octet-stream' });
  }
  return requestJson(`/api/v1/extract/${input.sourceType}`, { method: 'POST', body: form });
}

async function processWithBackend(input) {
  const payload = input.file
    ? await uploadFile(input)
    : await requestJson('/api/v1/demo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ source_type: input.sourceType || 'audio', language: input.language || 'english' }),
      });
  return adaptExtractionResponse(payload, input);
}

export async function processConsultation(input = {}) {
  if (input.simulateError) throw new Error('We could not reach the extraction service. Please retry.');
  if (!USE_BACKEND) {
    await wait(400);
    return buildConsultationResult({ patientId: input.patientId, language: input.language || 'english', sourceType: input.sourceType || 'audio' });
  }
  try {
    const [result] = await Promise.all([processWithBackend(input), wait(1400)]);
    return result;
  } catch (error) {
    if (!ALLOW_MOCK_FALLBACK) throw error;
    return buildConsultationResult({ patientId: input.patientId, language: input.language || 'english', sourceType: input.sourceType || 'audio' });
  }
}

export async function checkBackendHealth() {
  return requestJson('/health');
}

export async function getPatients() { await wait(120); return patients; }
export async function getRecentConsultations() { await wait(120); return recentConsultations; }
export async function getPatientTimeline(patientId) { await wait(120); return getPatientById(patientId)?.history || []; }

export const processingStages = [
  { key: 'prepare', label: 'Preparing input', detail: 'Securing the audio and patient context' },
  { key: 'understand', label: 'Understanding conversation', detail: 'Transcribing and detecting language' },
  { key: 'structure', label: 'Structuring clinical details', detail: 'Extracting medicines, dosage and advice' },
];
