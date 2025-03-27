import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");
const PATIENTS_FILE = path.join(DATA_DIR, "patients.json");

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR);
}

// Initialize patients file if it doesn't exist
if (!fs.existsSync(PATIENTS_FILE)) {
  fs.writeFileSync(PATIENTS_FILE, JSON.stringify([], null, 2));
}

export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: Date;
}

export function readPatients(): Patient[] {
  const data = fs.readFileSync(PATIENTS_FILE, "utf-8");
  const patients = JSON.parse(data);
  // Convert date strings back to Date objects
  return patients.map((patient: any) => ({
    ...patient,
    createdAt: new Date(patient.createdAt),
  }));
}

export function writePatients(patients: Patient[]): void {
  fs.writeFileSync(PATIENTS_FILE, JSON.stringify(patients, null, 2));
}
