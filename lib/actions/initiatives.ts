"use server";

import { revalidatePath } from "next/cache";
import { createInitiative } from "@/lib/data/initiatives";
import type {
  CreateInitiativeInput,
  InitiativeStatus,
} from "@/lib/types/initiative";

export type CreateInitiativeState = {
  error?: string;
  success?: boolean;
};

const VALID_STATUSES: InitiativeStatus[] = ["pending", "process", "completed"];

function isValidStatus(value: string): value is InitiativeStatus {
  return VALID_STATUSES.includes(value as InitiativeStatus);
}

export async function createInitiativeAction(
  _prevState: CreateInitiativeState,
  formData: FormData,
): Promise<CreateInitiativeState> {
  const titulo = formData.get("titulo");
  const descripcion = formData.get("descripcion");
  const status = formData.get("status");

  if (typeof titulo !== "string" || titulo.trim().length < 3) {
    return { error: "El título debe tener al menos 3 caracteres." };
  }

  if (typeof descripcion !== "string" || descripcion.trim().length < 10) {
    return { error: "La descripción debe tener al menos 10 caracteres." };
  }

  if (typeof status !== "string" || !isValidStatus(status)) {
    return { error: "El estado seleccionado no es válido." };
  }

  const input: CreateInitiativeInput = {
    titulo: titulo.trim(),
    descripcion: descripcion.trim(),
    status,
    voluntarios: [],
  };

  await createInitiative(input);
  revalidatePath("/iniciativas");

  return { success: true };
}
