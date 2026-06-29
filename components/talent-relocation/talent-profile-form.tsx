"use client";

import { useActionState } from "react";
import {
  createTalentProfileAction,
  type TalentProfileFormState,
} from "@/lib/actions/talent-profiles";
import {
  Button,
  Field,
  FormMessage,
  Input,
  Textarea,
} from "@/components/ui/form";
import { Card } from "@/components/ui/layout";

const initialState: TalentProfileFormState = {};

export function TalentProfileForm() {
  const [state, formAction, isPending] = useActionState(
    createTalentProfileAction,
    initialState,
  );

  return (
    <Card>
      <form action={formAction} className="flex flex-col gap-5">
        <Field
          label="Profesión"
          htmlFor="profesion"
          hint="Ej. Ingeniero civil, Enfermera, Contador"
        >
          <Input
            id="profesion"
            name="profesion"
            type="text"
            required
            minLength={2}
            placeholder="Tu profesión u oficio"
          />
        </Field>

        <Field
          label="Experiencia"
          htmlFor="experiencia"
          hint="Años de experiencia, roles y logros relevantes."
        >
          <Textarea
            id="experiencia"
            name="experiencia"
            required
            minLength={10}
            rows={4}
            placeholder="Cuéntanos tu trayectoria laboral"
          />
        </Field>

        <Field
          label="Descripción"
          htmlFor="descripcion"
          hint="Qué buscas, en qué puedes ayudar o qué tipo de apoyo necesitas."
        >
          <Textarea
            id="descripcion"
            name="descripcion"
            required
            minLength={20}
            rows={4}
            placeholder="Describe tu situación y qué oportunidad buscas"
          />
        </Field>

        <Field
          label="Lugar donde trabajabas"
          htmlFor="lugarTrabajoAnterior"
        >
          <Input
            id="lugarTrabajoAnterior"
            name="lugarTrabajoAnterior"
            type="text"
            required
            minLength={2}
            placeholder="Empresa, institución o sector"
          />
        </Field>

        <Field
          label="Habilidades"
          htmlFor="habilidades"
          hint="Separa con comas: Excel, atención al cliente, obra civil..."
        >
          <Textarea
            id="habilidades"
            name="habilidades"
            required
            minLength={3}
            rows={3}
            placeholder="Tus principales habilidades"
          />
        </Field>

        <Field
          label="LinkedIn"
          htmlFor="linkedin"
          hint="Opcional. URL completa de tu perfil."
        >
          <Input
            id="linkedin"
            name="linkedin"
            type="url"
            placeholder="https://linkedin.com/in/tu-perfil"
          />
        </Field>

        <Field
          label="Otras redes sociales"
          htmlFor="redesSociales"
          hint="Opcional. Instagram, portafolio, GitHub, etc."
        >
          <Textarea
            id="redesSociales"
            name="redesSociales"
            rows={2}
            placeholder="Enlaces o usuarios de otras redes"
          />
        </Field>

        {state.error ? <FormMessage tone="error">{state.error}</FormMessage> : null}
        {state.success ? (
          <FormMessage tone="success">Perfil actualizado correctamente.</FormMessage>
        ) : null}

        <Button type="submit" fullWidth disabled={isPending}>
          {isPending ? "Publicando..." : "Publicar mi perfil"}
        </Button>
      </form>
    </Card>
  );
}
