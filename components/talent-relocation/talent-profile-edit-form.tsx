"use client";

import { useActionState } from "react";
import {
  updateTalentProfileAction,
  type TalentProfileFormState,
} from "@/lib/actions/talent-profiles";
import type { TalentProfile } from "@/lib/types/talent-profile";
import {
  Button,
  Field,
  FormMessage,
  Input,
  Textarea,
} from "@/components/ui/form";
import { Card } from "@/components/ui/layout";

type TalentProfileEditFormProps = {
  profile: TalentProfile;
};

const initialState: TalentProfileFormState = {};

export function TalentProfileEditForm({ profile }: TalentProfileEditFormProps) {
  const [state, formAction, isPending] = useActionState(
    updateTalentProfileAction,
    initialState,
  );

  return (
    <Card>
      <form action={formAction} className="flex flex-col gap-5">
        <input type="hidden" name="profileId" value={profile.id} />

        <Field label="Profesión" htmlFor="profesion">
          <Input
            id="profesion"
            name="profesion"
            type="text"
            required
            minLength={2}
            defaultValue={profile.profesion}
          />
        </Field>

        <Field label="Experiencia" htmlFor="experiencia">
          <Textarea
            id="experiencia"
            name="experiencia"
            required
            minLength={10}
            rows={4}
            defaultValue={profile.experiencia}
          />
        </Field>

        <Field label="Descripción" htmlFor="descripcion">
          <Textarea
            id="descripcion"
            name="descripcion"
            required
            minLength={20}
            rows={4}
            defaultValue={profile.descripcion}
          />
        </Field>

        <Field label="Lugar donde trabajabas" htmlFor="lugarTrabajoAnterior">
          <Input
            id="lugarTrabajoAnterior"
            name="lugarTrabajoAnterior"
            type="text"
            required
            minLength={2}
            defaultValue={profile.lugarTrabajoAnterior}
          />
        </Field>

        <Field label="Habilidades" htmlFor="habilidades">
          <Textarea
            id="habilidades"
            name="habilidades"
            required
            minLength={3}
            rows={3}
            defaultValue={profile.habilidades}
          />
        </Field>

        <Field label="LinkedIn" htmlFor="linkedin">
          <Input
            id="linkedin"
            name="linkedin"
            type="url"
            defaultValue={profile.linkedin}
            placeholder="https://linkedin.com/in/tu-perfil"
          />
        </Field>

        <Field label="Otras redes sociales" htmlFor="redesSociales">
          <Textarea
            id="redesSociales"
            name="redesSociales"
            rows={2}
            defaultValue={profile.redesSociales}
          />
        </Field>

        {state.error ? <FormMessage tone="error">{state.error}</FormMessage> : null}
        {state.success ? (
          <FormMessage tone="success">Perfil actualizado correctamente.</FormMessage>
        ) : null}

        <Button type="submit" fullWidth disabled={isPending}>
          {isPending ? "Guardando..." : "Guardar cambios"}
        </Button>
      </form>
    </Card>
  );
}
