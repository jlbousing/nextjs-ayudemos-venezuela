"use client";

import Link from "next/link";
import { useActionState } from "react";
import { signupAction, type AuthState } from "@/lib/actions/auth";
import {
  Button,
  Field,
  FormMessage,
  Input,
} from "@/components/ui/form";
import { Card } from "@/components/ui/layout";

type SignupFormProps = {
  redirectTo?: string;
};

const initialState: AuthState = {};

export function SignupForm({ redirectTo = "/iniciativas" }: SignupFormProps) {
  const [state, formAction, isPending] = useActionState(
    signupAction,
    initialState,
  );

  return (
    <Card>
      <form action={formAction} className="flex flex-col gap-5">
        <input type="hidden" name="redirectTo" value={redirectTo} />

        <Field label="Nombre" htmlFor="name">
          <Input
            id="name"
            name="name"
            type="text"
            required
            minLength={2}
            autoComplete="name"
            placeholder="Tu nombre"
          />
        </Field>

        <Field label="Teléfono" htmlFor="phone">
          <Input
            id="phone"
            name="phone"
            type="tel"
            required
            minLength={10}
            autoComplete="tel"
            placeholder="Ej. 04141234567"
          />
        </Field>

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
            autoComplete="new-password"
            placeholder="Mínimo 6 caracteres"
          />
        </Field>

        {state.error ? <FormMessage tone="error">{state.error}</FormMessage> : null}
        {state.success ? <FormMessage tone="success">{state.success}</FormMessage> : null}

        <Button type="submit" fullWidth disabled={isPending}>
          {isPending ? "Procesando..." : "Crear cuenta"}
        </Button>

        <p className="text-center text-sm text-neutral-600">
          ¿Ya tienes cuenta?{" "}
          <Link
            href={`/iniciar-sesion?redirect=${encodeURIComponent(redirectTo)}`}
            className="text-neutral-900 underline decoration-neutral-300 underline-offset-4 hover:decoration-neutral-500"
          >
            Inicia sesión
          </Link>
        </p>
      </form>
    </Card>
  );
}
