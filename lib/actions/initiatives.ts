"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getCurrentProfile } from "@/lib/auth/session";
import {
  createInitiative,
  joinInitiativeAsVolunteer,
} from "@/lib/data/initiatives";
import type {
  CreateInitiativeInput,
  InitiativeStatus,
} from "@/lib/types/initiative";

export type CreateInitiativeState = {
  error?: string;
  success?: boolean;
};

export type JoinVolunteerState = {
  error?: string;
  success?: boolean;
  alreadyJoined?: boolean;
};

const VALID_STATUSES: InitiativeStatus[] = ["pending", "process", "completed"];

function isValidStatus(value: string): value is InitiativeStatus {
  return VALID_STATUSES.includes(value as InitiativeStatus);
}

export async function createInitiativeAction(
  _prevState: CreateInitiativeState,
  formData: FormData,
): Promise<CreateInitiativeState> {
  const profile = await getCurrentProfile();

  if (!profile) {
    redirect("/iniciar-sesion?redirect=/iniciativas");
  }

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

export async function joinVolunteerAction(
  _prevState: JoinVolunteerState,
  formData: FormData,
): Promise<JoinVolunteerState> {
  const profile = await getCurrentProfile();

  if (!profile) {
    redirect("/iniciar-sesion?redirect=/iniciativas");
  }

  const initiativeId = formData.get("initiativeId");

  if (typeof initiativeId !== "string" || !initiativeId) {
    return { error: "Iniciativa no válida." };
  }

  const result = await joinInitiativeAsVolunteer(initiativeId, {
    id: profile.id,
    nombre: profile.name,
    email: profile.email,
  });

  revalidatePath("/iniciativas");

  if (result.alreadyJoined) {
    return { alreadyJoined: true };
  }

  return { success: true };
}
