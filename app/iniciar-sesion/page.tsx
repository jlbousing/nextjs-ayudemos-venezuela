import Link from "next/link";
import { redirect } from "next/navigation";
import { LoginForm } from "@/components/auth/login-form";
import { SignupForm } from "@/components/auth/signup-form";
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
    <div className="mx-auto flex w-full max-w-lg flex-col gap-8 px-6 py-16">
      <header className="flex flex-col gap-3">
        <Link href="/" className="text-sm underline">
          ← Volver al inicio
        </Link>
        <h1 className="text-3xl font-semibold">
          {isSignup ? "Crear cuenta" : "Iniciar sesión"}
        </h1>
        <p className="text-sm leading-6">
          Inicia sesión para registrar iniciativas de ayuda o unirte como
          voluntario a las que ya están activas.
        </p>
        {params.error === "auth" ? (
          <p className="text-sm">
            No se pudo completar la autenticación. Intenta de nuevo.
          </p>
        ) : null}
      </header>

      {isSignup ? (
        <SignupForm key="signup" redirectTo={redirectTo} />
      ) : (
        <LoginForm key="login" redirectTo={redirectTo} />
      )}
    </div>
  );
}
