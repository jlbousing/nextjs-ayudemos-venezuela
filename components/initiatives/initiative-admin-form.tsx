"use client";

import { useActionState } from "react";
import {
  updateInitiativeAction,
  type UpdateInitiativeState,
} from "@/lib/actions/initiatives";
import {
  INITIATIVE_STATUS_LABELS,
  type Initiative,
} from "@/lib/types/initiative";
import {
  Button,
  Field,
  FormMessage,
  Input,
  Select,
  Textarea,
} from "@/components/ui/form";
import { Card } from "@/components/ui/layout";

type InitiativeAdminFormProps = {
  initiative: Initiative;
};

const initialState: UpdateInitiativeState = {};

export function InitiativeAdminForm({ initiative }: InitiativeAdminFormProps) {
  const [state, formAction, isPending] = useActionState(
    updateInitiativeAction,
    initialState,
  );

  return (
    <Card>
      <form action={formAction} className="flex flex-col gap-5">
        <input type="hidden" name="initiativeId" value={initiative.id} />

        <Field label="Título" htmlFor="titulo">
          <Input
            id="titulo"
            name="titulo"
            required
            minLength={3}
            defaultValue={initiative.titulo}
          />
        </Field>

        <Field label="Descripción" htmlFor="descripcion">
          <Textarea
            id="descripcion"
            name="descripcion"
            required
            minLength={10}
            rows={4}
            defaultValue={initiative.descripcion}
          />
        </Field>

        <Field label="Estado" htmlFor="status">
          <Select id="status" name="status" defaultValue={initiative.status}>
            {Object.entries(INITIATIVE_STATUS_LABELS).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </Select>
        </Field>

        {state.error ? <FormMessage tone="error">{state.error}</FormMessage> : null}
        {state.success ? (
          <FormMessage tone="success">Cambios guardados correctamente.</FormMessage>
        ) : null}

        <Button type="submit" disabled={isPending}>
          {isPending ? "Guardando..." : "Guardar cambios"}
        </Button>
      </form>
    </Card>
  );
}
