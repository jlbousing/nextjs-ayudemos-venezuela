import { createInitiative, getInitiatives } from "@/lib/data/initiatives";
import { errorResponse, jsonResponse } from "@/lib/api/response";
import type { InitiativeStatus } from "@/lib/types/initiative";
import type { Voluntario } from "@/lib/types/user";

const VALID_STATUSES: InitiativeStatus[] = ["pending", "process", "completed"];

function isValidStatus(value: unknown): value is InitiativeStatus {
  return typeof value === "string" && VALID_STATUSES.includes(value as InitiativeStatus);
}

function isValidVoluntarios(value: unknown): value is Voluntario[] {
  if (!Array.isArray(value)) return false;

  return value.every(
    (item) =>
      typeof item === "object" &&
      item !== null &&
      typeof item.id === "string" &&
      typeof item.nombre === "string" &&
      typeof item.email === "string",
  );
}

export async function GET() {
  const initiatives = await getInitiatives();
  return jsonResponse({ initiatives });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (
      typeof body.titulo !== "string" ||
      typeof body.descripcion !== "string"
    ) {
      return errorResponse("titulo y descripcion son requeridos.");
    }

    if (body.status !== undefined && !isValidStatus(body.status)) {
      return errorResponse("status debe ser pending, process o completed.");
    }

    if (body.voluntarios !== undefined && !isValidVoluntarios(body.voluntarios)) {
      return errorResponse("voluntarios debe ser un array de usuarios válidos.");
    }

    const initiative = await createInitiative({
      titulo: body.titulo,
      descripcion: body.descripcion,
      status: body.status,
      voluntarios: body.voluntarios,
    });

    return jsonResponse({ initiative }, 201);
  } catch {
    return errorResponse("No se pudo crear la iniciativa.", 500);
  }
}
