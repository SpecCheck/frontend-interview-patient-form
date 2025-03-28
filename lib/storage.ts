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

export interface Order {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  orderType: string;
  orderOptions: string;
  status: "pending" | "processing" | "completed" | "cancelled";
  createdAt: Date;
  updatedAt?: Date;
}

const ORDERS_FILE = "orders.json";

// Ensure orders file exists
if (!fs.existsSync(ORDERS_FILE)) {
  fs.writeFileSync(ORDERS_FILE, JSON.stringify([], null, 2));
}

export function readOrders(): Order[] {
  try {
    const data = fs.readFileSync(ORDERS_FILE, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return [];
    }
    throw error;
  }
}

export function writeOrders(orders: Order[]): void {
  fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2));
}
