"use client";

import Link from "next/link";
import { useActionState } from "react";
import { loginAction, type AuthState } from "@/lib/actions/auth";

type LoginFormProps = {
  redirectTo?: string;
};

const initialState: AuthState = {};

export function LoginForm({ redirectTo = "/iniciativas" }: LoginFormProps) {
  const [state, formAction, isPending] = useActionState(
    loginAction,
    initialState,
  );

  return (
    <form action={formAction} className="flex w-full max-w-md flex-col gap-4">
      <input type="hidden" name="redirectTo" value={redirectTo} />

      <div className="flex flex-col gap-1">
        <label htmlFor="email" className="text-sm font-medium">
          Correo
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className="border border-black bg-white px-3 py-2 text-sm"
          placeholder="tu@correo.com"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="password" className="text-sm font-medium">
          Contraseña
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          minLength={6}
          autoComplete="current-password"
          className="border border-black bg-white px-3 py-2 text-sm"
          placeholder="Mínimo 6 caracteres"
        />
      </div>

      {state.error ? <p className="text-sm">{state.error}</p> : null}
      {state.success ? <p className="text-sm">{state.success}</p> : null}

      <button
        type="submit"
        disabled={isPending}
        className="w-full border border-black px-5 py-2 text-sm font-medium disabled:opacity-50"
      >
        {isPending ? "Procesando..." : "Iniciar sesión"}
      </button>

      <p className="text-sm">
        ¿No tienes cuenta?{" "}
        <Link
          href={`/iniciar-sesion?mode=signup&redirect=${encodeURIComponent(redirectTo)}`}
          className="underline"
        >
          Regístrate
        </Link>
      </p>
    </form>
  );
}
