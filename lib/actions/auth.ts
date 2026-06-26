"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { isValidPhone } from "@/lib/validations/phone";

export type AuthState = {
  error?: string;
  success?: string;
};

function getRedirectPath(formData: FormData) {
  const redirectTo = formData.get("redirectTo");

  if (typeof redirectTo === "string" && redirectTo.startsWith("/")) {
    return redirectTo;
  }

  return "/iniciativas";
}

export async function loginAction(
  _prevState: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const email = formData.get("email");
  const password = formData.get("password");

  if (typeof email !== "string" || !email.trim().includes("@")) {
    return { error: "Ingresa un correo válido." };
  }

  if (typeof password !== "string" || password.length < 6) {
    return { error: "La contraseña debe tener al menos 6 caracteres." };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email: email.trim(),
    password,
  });

  if (error) {
    return { error: "Correo o contraseña incorrectos." };
  }

  redirect(getRedirectPath(formData));
}

export async function signupAction(
  _prevState: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const name = formData.get("name");
  const phone = formData.get("phone");
  const email = formData.get("email");
  const password = formData.get("password");

  if (typeof name !== "string" || name.trim().length < 2) {
    return { error: "El nombre debe tener al menos 2 caracteres." };
  }

  if (typeof phone !== "string" || !isValidPhone(phone)) {
    return { error: "Ingresa un teléfono válido (mínimo 10 dígitos)." };
  }

  if (typeof email !== "string" || !email.includes("@")) {
    return { error: "Ingresa un correo válido." };
  }

  if (typeof password !== "string" || password.length < 6) {
    return { error: "La contraseña debe tener al menos 6 caracteres." };
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    email: email.trim(),
    password,
    options: {
      data: {
        name: name.trim(),
        phone: phone.trim(),
      },
    },
  });

  if (error) {
    return { error: error.message };
  }

  if (data.session) {
    redirect(getRedirectPath(formData));
  }

  const { error: loginError } = await supabase.auth.signInWithPassword({
    email: email.trim(),
    password,
  });

  if (!loginError) {
    redirect(getRedirectPath(formData));
  }

  return {
    error: "Cuenta creada, pero no se pudo iniciar sesión. Intenta entrar manualmente.",
  };
}

export async function logoutAction() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}
