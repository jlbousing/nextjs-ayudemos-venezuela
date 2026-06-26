"use server";

import { redirect } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/admin";
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

function isDuplicateUserError(message: string) {
  const normalized = message.toLowerCase();

  return (
    normalized.includes("already") ||
    normalized.includes("registered") ||
    normalized.includes("exists")
  );
}

async function signInAfterSignup(
  email: string,
  password: string,
  formData: FormData,
): Promise<AuthState> {
  const supabase = await createClient();
  const { error: loginError } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (!loginError) {
    redirect(getRedirectPath(formData));
  }

  if (loginError.message.toLowerCase().includes("confirm")) {
    return {
      error:
        "Tu cuenta existe pero aún no está activa. Prueba con otro correo o contacta al administrador.",
    };
  }

  return {
    error: "Ya existe una cuenta con este correo. Prueba iniciar sesión.",
  };
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

  const trimmedEmail = email.trim();
  const metadata = {
    name: name.trim(),
    phone: phone.trim(),
  };

  const admin = createAdminClient();
  const { error: createError } = await admin.auth.admin.createUser({
    email: trimmedEmail,
    password,
    email_confirm: true,
    user_metadata: metadata,
  });

  if (createError) {
    if (!isDuplicateUserError(createError.message)) {
      return { error: createError.message };
    }

    const supabase = await createClient();
    const { data: signUpData } = await supabase.auth.signUp({
      email: trimmedEmail,
      password,
      options: { data: metadata },
    });

    if (signUpData.user?.id) {
      await admin.auth.admin.updateUserById(signUpData.user.id, {
        email_confirm: true,
        user_metadata: metadata,
      });
    }

    return signInAfterSignup(trimmedEmail, password, formData);
  }

  return signInAfterSignup(trimmedEmail, password, formData);
}

export async function logoutAction() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}
