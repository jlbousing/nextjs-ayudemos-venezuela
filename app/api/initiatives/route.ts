import { createInitiative, getInitiatives } from "@/lib/data/initiatives";
import { errorResponse, jsonResponse } from "@/lib/api/response";

export async function GET() {
  const initiatives = await getInitiatives();
  return jsonResponse({ initiatives });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (
      typeof body.title !== "string" ||
      typeof body.description !== "string"
    ) {
      return errorResponse("title y description son requeridos.");
    }

    const initiative = await createInitiative({
      title: body.title,
      description: body.description,
    });

    return jsonResponse({ initiative }, 201);
  } catch {
    return errorResponse("No se pudo crear la iniciativa.", 500);
  }
}
