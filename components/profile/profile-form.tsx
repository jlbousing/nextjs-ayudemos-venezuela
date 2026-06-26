"use client";

import { useActionState } from "react";
import {
  updateProfileAction,
  type UpdateProfileState,
} from "@/lib/actions/profile";
import type { Profile } from "@/lib/types/profile";
import {
  Button,
  Field,
  FormMessage,
  Input,
} from "@/components/ui/form";
import { Card } from "@/components/ui/layout";

type ProfileFormProps = {
  profile: Profile;
};

const initialState: UpdateProfileState = {};

export function ProfileForm({ profile }: ProfileFormProps) {
  const [state, formAction, isPending] = useActionState(
    updateProfileAction,
    initialState,
  );

  return (
    <Card>
      <form action={formAction} className="flex flex-col gap-5">
        <Field label="Nombre" htmlFor="name">
          <Input
            id="name"
            name="name"
            type="text"
            required
            minLength={2}
            autoComplete="name"
            defaultValue={profile.name}
          />
        </Field>

        <Field
          label="Correo"
          htmlFor="email"
          hint="El correo no se puede cambiar desde aquí."
        >
          <Input
            id="email"
            name="email"
            type="email"
            value={profile.email}
            readOnly
            className="opacity-70"
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
            defaultValue={profile.phone}
            placeholder="Ej. 04141234567"
          />
        </Field>

        {state.error ? <FormMessage tone="error">{state.error}</FormMessage> : null}
        {state.success ? (
          <FormMessage tone="success">Perfil actualizado correctamente.</FormMessage>
        ) : null}

        <Button type="submit" disabled={isPending}>
          {isPending ? "Guardando..." : "Guardar cambios"}
        </Button>
      </form>
    </Card>
  );
}
