"use server";

import { revalidatePath } from "next/cache";
import { createInitiative } from "@/lib/data/initiatives";
import type { CreateInitiativeInput } from "@/lib/types/initiative";

export type CreateInitiativeState = {
  error?: string;
  success?: boolean;
};

export async function createInitiativeAction(
  _prevState: CreateInitiativeState,
  formData: FormData,
): Promise<CreateInitiativeState> {
  const title = formData.get("title");
  const description = formData.get("description");

  if (typeof title !== "string" || title.trim().length < 3) {
    return { error: "El título debe tener al menos 3 caracteres." };
  }

  if (typeof description !== "string" || description.trim().length < 10) {
    return { error: "La descripción debe tener al menos 10 caracteres." };
  }

  const input: CreateInitiativeInput = {
    title: title.trim(),
    description: description.trim(),
  };

  await createInitiative(input);
  revalidatePath("/iniciativas");

  return { success: true };
}
