"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getCurrentProfile } from "@/lib/auth/session";
import { createClient } from "@/lib/supabase/server";
import { isValidPhone } from "@/lib/validations/phone";

export type UpdateProfileState = {
  error?: string;
  success?: boolean;
};

export async function updateProfileAction(
  _prevState: UpdateProfileState,
  formData: FormData,
): Promise<UpdateProfileState> {
  const profile = await getCurrentProfile();

  if (!profile) {
    redirect("/iniciar-sesion?redirect=/perfil");
  }

  const name = formData.get("name");
  const phone = formData.get("phone");

  if (typeof name !== "string" || name.trim().length < 2) {
    return { error: "El nombre debe tener al menos 2 caracteres." };
  }

  if (typeof phone !== "string" || !isValidPhone(phone)) {
    return { error: "Ingresa un teléfono válido (mínimo 10 dígitos)." };
  }

  const supabase = await createClient();
  const trimmedName = name.trim();
  const trimmedPhone = phone.trim();

  const { error: profileError } = await supabase
    .from("profiles")
    .update({
      name: trimmedName,
      phone: trimmedPhone,
    })
    .eq("id", profile.id);

  if (profileError) {
    return { error: "No se pudo actualizar el perfil." };
  }

  const { error: authError } = await supabase.auth.updateUser({
    data: {
      name: trimmedName,
      phone: trimmedPhone,
    },
  });

  if (authError) {
    return { error: "No se pudo sincronizar los datos de la cuenta." };
  }

  revalidatePath("/perfil");
  revalidatePath("/", "layout");
  revalidatePath("/iniciativas");

  return { success: true };
}
