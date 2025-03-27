import { type NextRequest, NextResponse } from "next/server";
import { readPatients, writePatients, type Patient } from "@/lib/storage";

// GET /api/patients/[id] - Get a specific patient
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const patients = readPatients();
    const patient = patients.find((p) => p.id === id);

    if (!patient) {
      return NextResponse.json({ error: "Patient not found" }, { status: 404 });
    }

    return NextResponse.json({ patient }, { status: 200 });
  } catch (error) {
    console.error("Error fetching patient:", error);
    return NextResponse.json(
      { error: "Failed to fetch patient" },
      { status: 500 }
    );
  }
}

// PUT /api/patients/[id] - Update a patient
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const patients = readPatients();
    const patientIndex = patients.findIndex((p) => p.id === id);

    if (patientIndex === -1) {
      return NextResponse.json({ error: "Patient not found" }, { status: 404 });
    }

    const body = await request.json();
    const { firstName, lastName, email } = body;

    // Validate required fields
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

    // Check if email already exists with another patient
    const emailExists = patients.some(
      (p, index) => p.email === email && index !== patientIndex
    );

    if (emailExists) {
      return NextResponse.json(
        { error: "A different patient with this email already exists" },
        { status: 409 }
      );
    }

    // Update patient
    const updatedPatient = {
      ...patients[patientIndex],
      firstName,
      lastName,
      email,
    };

    patients[patientIndex] = updatedPatient;
    writePatients(patients);

    return NextResponse.json({ patient: updatedPatient }, { status: 200 });
  } catch (error) {
    console.error("Error updating patient:", error);
    return NextResponse.json(
      { error: "Failed to update patient" },
      { status: 500 }
    );
  }
}

// DELETE /api/patients/[id] - Delete a patient
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const patients = readPatients();
    const patientIndex = patients.findIndex((p) => p.id === id);

    if (patientIndex === -1) {
      return NextResponse.json({ error: "Patient not found" }, { status: 404 });
    }

    // Remove patient from array and save to file
    const updatedPatients = patients.filter((p) => p.id !== id);
    writePatients(updatedPatients);

    return NextResponse.json(
      { message: "Patient deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting patient:", error);
    return NextResponse.json(
      { error: "Failed to delete patient" },
      { status: 500 }
    );
  }
}
