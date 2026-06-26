"use client";

import Link from "next/link";
import { useActionState } from "react";
import { signupAction, type AuthState } from "@/lib/actions/auth";
import {
  Button,
  ButtonLink,
  Field,
  FormMessage,
  Input,
} from "@/components/ui/form";
import { Card } from "@/components/ui/layout";

type SignupFormProps = {
  redirectTo?: string;
};

const initialState: AuthState = {};

function SignupConfirmationNotice({
  email,
  redirectTo,
}: {
  email: string;
  redirectTo: string;
}) {
  return (
    <Card className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <p className="text-lg font-semibold text-neutral-900">
          Revisa tu correo para activar tu cuenta
        </p>
        <p className="text-sm text-neutral-600">
          Enviamos un enlace de confirmación a{" "}
          <span className="font-medium text-neutral-900">{email}</span>.
        </p>
      </div>

      <ol className="list-decimal space-y-2 pl-5 text-sm text-neutral-700">
        <li>Abre tu bandeja de entrada y busca un correo de Ayudemos Venezuela.</li>
        <li>Haz clic en el enlace de confirmación del mensaje.</li>
        <li>Cuando se abra la página, ya podrás iniciar sesión con tu correo y contraseña.</li>
      </ol>

      <FormMessage>
        Si no ves el correo en unos minutos, revisa la carpeta de spam o promociones.
      </FormMessage>

      <ButtonLink
        href={`/iniciar-sesion?redirect=${encodeURIComponent(redirectTo)}`}
        className="w-full"
      >
        Ir a iniciar sesión
      </ButtonLink>
    </Card>
  );
}

export function SignupForm({ redirectTo = "/iniciativas" }: SignupFormProps) {
  const [state, formAction, isPending] = useActionState(
    signupAction,
    initialState,
  );

  if (state.pendingEmailConfirmation && state.registeredEmail) {
    return (
      <SignupConfirmationNotice
        email={state.registeredEmail}
        redirectTo={redirectTo}
      />
    );
  }

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
