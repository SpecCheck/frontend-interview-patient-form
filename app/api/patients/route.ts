import { type NextRequest, NextResponse } from "next/server";
import { readPatients, writePatients, type Patient } from "@/lib/storage";

// GET /api/patients - Fetch all patients
export async function GET(request: NextRequest) {
  try {
    const patients = readPatients();
    // In a real application, you might want to add pagination, filtering, etc.
    return NextResponse.json({ patients }, { status: 200 });
  } catch (error) {
    console.error("Error fetching patients:", error);
    return NextResponse.json(
      { error: "Failed to fetch patients" },
      { status: 500 }
    );
  }
}

// POST /api/patients - Add a new patient
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    const { firstName, lastName, email } = body;

    if (!firstName || !lastName || !email) {
      return NextResponse.json(
        { error: "First name, last name, and email are required" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    const patients = readPatients();

    // Check if email already exists
    const emailExists = patients.some((patient) => patient.email === email);
    if (emailExists) {
      return NextResponse.json(
        { error: "A patient with this email already exists" },
        { status: 409 }
      );
    }

    // Create new patient
    const newPatient: Patient = {
      id: Date.now().toString(), // Simple ID generation
      firstName,
      lastName,
      email,
      createdAt: new Date(),
    };

    // Add to our "database"
    patients.push(newPatient);
    writePatients(patients);

    return NextResponse.json({ patient: newPatient }, { status: 201 });
  } catch (error) {
    console.error("Error creating patient:", error);
    return NextResponse.json(
      { error: "Failed to create patient" },
      { status: 500 }
    );
  }
}
