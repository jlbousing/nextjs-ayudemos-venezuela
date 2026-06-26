import { getSessionUser } from "@/lib/auth/session";
import { createInitiative, getInitiatives } from "@/lib/data/initiatives";
import { errorResponse, jsonResponse } from "@/lib/api/response";
import type { InitiativeStatus } from "@/lib/types/initiative";

const VALID_STATUSES: InitiativeStatus[] = ["pending", "process", "completed"];

function isValidStatus(value: unknown): value is InitiativeStatus {
  return typeof value === "string" && VALID_STATUSES.includes(value as InitiativeStatus);
}

export async function GET() {
  const initiatives = await getInitiatives();
  return jsonResponse({ initiatives });
}

export async function POST(request: Request) {
  try {
    const user = await getSessionUser();

    if (!user) {
      return errorResponse("Debes iniciar sesión.", 401);
    }

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

    const initiative = await createInitiative(
      {
        titulo: body.titulo,
        descripcion: body.descripcion,
        status: body.status,
      },
      user.id,
    );

    return jsonResponse({ initiative }, 201);
  } catch {
    return errorResponse("No se pudo crear la iniciativa.", 500);
  }
}
