import { redirect } from "next/navigation";
import { LoginForm } from "@/components/auth/login-form";
import { SignupForm } from "@/components/auth/signup-form";
import { FormMessage } from "@/components/ui/form";
import { PageHeader, PageShell } from "@/components/ui/layout";
import { getSessionUser } from "@/lib/auth/session";

type LoginPageProps = {
  searchParams: Promise<{
    mode?: string;
    redirect?: string;
    error?: string;
  }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;
  const user = await getSessionUser();
  const redirectTo = params.redirect ?? "/iniciativas";
  const isSignup = params.mode === "signup";

  if (user) {
    redirect(redirectTo);
  }

  return (
    <PageShell size="narrow">
      <PageHeader
        backHref="/"
        backLabel="Volver al inicio"
        title={isSignup ? "Crear cuenta" : "Iniciar sesión"}
        description="Inicia sesión para registrar iniciativas de ayuda o unirte como voluntario a las que ya están activas."
      />

      {params.error === "auth" ? (
        <FormMessage tone="error">
          No se pudo completar la autenticación. Intenta de nuevo.
        </FormMessage>
      ) : null}

      {isSignup ? (
        <SignupForm key="signup" redirectTo={redirectTo} />
      ) : (
        <LoginForm key="login" redirectTo={redirectTo} />
      )}
    </PageShell>
  );
}
