"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getCurrentProfile } from "@/lib/auth/session";
import {
  createTalentProfile,
  deleteTalentProfile,
  updateTalentProfile,
} from "@/lib/data/talent-profiles";
import type {
  CreateTalentProfileInput,
} from "@/lib/types/talent-profile";

export type TalentProfileFormState = {
  error?: string;
  success?: boolean;
};

function parseTalentProfileInput(
  formData: FormData,
):
  | { error: string }
  | { input: CreateTalentProfileInput } {
  const profesion = formData.get("profesion");
  const experiencia = formData.get("experiencia");
  const descripcion = formData.get("descripcion");
  const lugarTrabajoAnterior = formData.get("lugarTrabajoAnterior");
  const habilidades = formData.get("habilidades");
  const linkedin = formData.get("linkedin");
  const redesSociales = formData.get("redesSociales");

  if (typeof profesion !== "string" || profesion.trim().length < 2) {
    return { error: "La profesión debe tener al menos 2 caracteres." };
  }

  if (typeof experiencia !== "string" || experiencia.trim().length < 10) {
    return { error: "La experiencia debe tener al menos 10 caracteres." };
  }

  if (typeof descripcion !== "string" || descripcion.trim().length < 20) {
    return { error: "La descripción debe tener al menos 20 caracteres." };
  }

  if (
    typeof lugarTrabajoAnterior !== "string" ||
    lugarTrabajoAnterior.trim().length < 2
  ) {
    return {
      error: "Indica el lugar o empresa donde trabajabas anteriormente.",
    };
  }

  if (typeof habilidades !== "string" || habilidades.trim().length < 3) {
    return { error: "Indica al menos una habilidad." };
  }

  const linkedinValue =
    typeof linkedin === "string" ? linkedin.trim() : "";

  if (
    linkedinValue &&
    !linkedinValue.includes(".") &&
    !linkedinValue.startsWith("http")
  ) {
    return { error: "El enlace de LinkedIn no parece válido." };
  }

  const input: CreateTalentProfileInput = {
    profesion: profesion.trim(),
    experiencia: experiencia.trim(),
    descripcion: descripcion.trim(),
    lugarTrabajoAnterior: lugarTrabajoAnterior.trim(),
    habilidades: habilidades.trim(),
    linkedin: linkedinValue || undefined,
    redesSociales:
      typeof redesSociales === "string" && redesSociales.trim()
        ? redesSociales.trim()
        : undefined,
  };

  return { input };
}

export async function createTalentProfileAction(
  _prevState: TalentProfileFormState,
  formData: FormData,
): Promise<TalentProfileFormState> {
  const profile = await getCurrentProfile();

  if (!profile) {
    redirect("/iniciar-sesion?redirect=/reubicacion-talento");
  }

  const parsed = parseTalentProfileInput(formData);

  if ("error" in parsed) {
    return { error: parsed.error };
  }

  let talentProfile;

  try {
    talentProfile = await createTalentProfile(parsed.input, profile.id);
  } catch {
    return {
      error:
        "No se pudo publicar el perfil. Si ya tienes uno, edítalo desde tu publicación.",
    };
  }

  revalidatePath("/reubicacion-talento");
  redirect(`/reubicacion-talento/${talentProfile.id}`);
}

export async function updateTalentProfileAction(
  _prevState: TalentProfileFormState,
  formData: FormData,
): Promise<TalentProfileFormState> {
  const profile = await getCurrentProfile();

  if (!profile) {
    redirect("/iniciar-sesion?redirect=/reubicacion-talento");
  }

  const profileId = formData.get("profileId");

  if (typeof profileId !== "string" || !profileId) {
    return { error: "Perfil no válido." };
  }

  const parsed = parseTalentProfileInput(formData);

  if ("error" in parsed) {
    return { error: parsed.error };
  }

  try {
    await updateTalentProfile(
      profileId,
      profile.id,
      parsed.input,
    );
    revalidatePath("/reubicacion-talento");
    revalidatePath(`/reubicacion-talento/${profileId}`);
    revalidatePath(`/reubicacion-talento/${profileId}/editar`);
    return { success: true };
  } catch {
    return { error: "No se pudo actualizar el perfil." };
  }
}

export async function deleteTalentProfileAction(formData: FormData) {
  const profile = await getCurrentProfile();

  if (!profile) {
    redirect("/iniciar-sesion?redirect=/reubicacion-talento");
  }

  const profileId = formData.get("profileId");

  if (typeof profileId !== "string" || !profileId) {
    redirect("/reubicacion-talento");
  }

  try {
    await deleteTalentProfile(profileId, profile.id);
  } catch {
    redirect(`/reubicacion-talento/${profileId}/editar?error=delete`);
  }

  revalidatePath("/reubicacion-talento");
  redirect("/reubicacion-talento");
}
