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
    <form action={formAction} className="flex w-full max-w-lg flex-col gap-4">
      <input type="hidden" name="initiativeId" value={initiative.id} />

      <div className="flex flex-col gap-1">
        <label htmlFor="titulo" className="text-sm font-medium">
          Título
        </label>
        <input
          id="titulo"
          name="titulo"
          required
          minLength={3}
          defaultValue={initiative.titulo}
          className="border border-black bg-white px-3 py-2 text-sm"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="descripcion" className="text-sm font-medium">
          Descripción
        </label>
        <textarea
          id="descripcion"
          name="descripcion"
          required
          minLength={10}
          rows={4}
          defaultValue={initiative.descripcion}
          className="border border-black bg-white px-3 py-2 text-sm"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="status" className="text-sm font-medium">
          Estado
        </label>
        <select
          id="status"
          name="status"
          defaultValue={initiative.status}
          className="border border-black bg-white px-3 py-2 text-sm"
        >
          {Object.entries(INITIATIVE_STATUS_LABELS).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>

      {state.error ? <p className="text-sm">{state.error}</p> : null}
      {state.success ? (
        <p className="text-sm">Cambios guardados correctamente.</p>
      ) : null}

      <button
        type="submit"
        disabled={isPending}
        className="w-fit border border-black px-5 py-2 text-sm font-medium disabled:opacity-50"
      >
        {isPending ? "Guardando..." : "Guardar cambios"}
      </button>
    </form>
  );
}
