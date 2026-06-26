export function mapSignupError(message: string) {
  const normalized = message.toLowerCase();

  if (normalized.includes("rate limit") && normalized.includes("email")) {
    return "Por ahora no podemos enviar más correos de confirmación. Espera unos minutos e inténtalo de nuevo. Si ya te registraste, revisa tu bandeja de entrada y la carpeta de spam antes de volver a intentarlo.";
  }

  if (
    normalized.includes("already registered") ||
    normalized.includes("already been registered")
  ) {
    return "Ya existe una cuenta con este correo. Inicia sesión o revisa si tienes un correo de confirmación pendiente.";
  }

  return message;
}
