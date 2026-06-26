"use client";

import Link from "next/link";
import { useActionState } from "react";
import { loginAction, type AuthState } from "@/lib/actions/auth";
import {
  Button,
  Field,
  FormMessage,
  Input,
} from "@/components/ui/form";
import { Card } from "@/components/ui/layout";

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
    <Card>
      <form action={formAction} className="flex flex-col gap-5">
        <input type="hidden" name="redirectTo" value={redirectTo} />

        <Field label="Correo" htmlFor="email">
          <Input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="tu@correo.com"
          />
        </Field>

        <Field label="Contraseña" htmlFor="password">
          <Input
            id="password"
            name="password"
            type="password"
            required
            minLength={6}
            autoComplete="current-password"
            placeholder="Mínimo 6 caracteres"
          />
        </Field>

        {state.error ? <FormMessage tone="error">{state.error}</FormMessage> : null}
        {state.success ? <FormMessage tone="success">{state.success}</FormMessage> : null}

        <Button type="submit" fullWidth disabled={isPending}>
          {isPending ? "Procesando..." : "Iniciar sesión"}
        </Button>

        <p className="text-center text-sm text-neutral-600">
          ¿No tienes cuenta?{" "}
          <Link
            href={`/iniciar-sesion?mode=signup&redirect=${encodeURIComponent(redirectTo)}`}
            className="text-neutral-900 underline decoration-neutral-300 underline-offset-4 hover:decoration-neutral-500"
          >
            Regístrate
          </Link>
        </p>
      </form>
    </Card>
  );
}
