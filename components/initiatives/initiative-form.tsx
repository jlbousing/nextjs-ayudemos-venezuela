"use client";

import { useActionState } from "react";
import {
  createInitiativeAction,
  type CreateInitiativeState,
} from "@/lib/actions/initiatives";
import { INITIATIVE_STATUS_LABELS } from "@/lib/types/initiative";
import {
  Button,
  Field,
  FormMessage,
  Input,
  Select,
  Textarea,
} from "@/components/ui/form";
import { Card } from "@/components/ui/layout";

const initialState: CreateInitiativeState = {};

export function InitiativeForm() {
  const [state, formAction, isPending] = useActionState(
    createInitiativeAction,
    initialState,
  );

  return (
    <Card>
      <form action={formAction} className="flex flex-col gap-5">
        <Field label="Título" htmlFor="titulo">
          <Input
            id="titulo"
            name="titulo"
            required
            minLength={3}
            placeholder="Ej. Recolección de alimentos"
          />
        </Field>

        <Field label="Descripción" htmlFor="descripcion">
          <Textarea
            id="descripcion"
            name="descripcion"
            required
            minLength={10}
            rows={4}
            placeholder="Describe la iniciativa y cómo ayudar"
          />
        </Field>

        <Field label="Estado" htmlFor="status">
          <Select id="status" name="status" defaultValue="pending">
            {Object.entries(INITIATIVE_STATUS_LABELS).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </Select>
        </Field>

        {state.error ? <FormMessage tone="error">{state.error}</FormMessage> : null}

        <Button type="submit" variant="primary" disabled={isPending}>
          {isPending ? "Guardando..." : "Registrar iniciativa"}
        </Button>
      </form>
    </Card>
  );
}
