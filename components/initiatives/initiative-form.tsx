"use client";

import { useActionState } from "react";
import {
  createInitiativeAction,
  type CreateInitiativeState,
} from "@/lib/actions/initiatives";
import { INITIATIVE_STATUS_LABELS } from "@/lib/types/initiative";

const initialState: CreateInitiativeState = {};

export function InitiativeForm() {
  const [state, formAction, isPending] = useActionState(
    createInitiativeAction,
    initialState,
  );

  return (
    <form action={formAction} className="flex w-full max-w-lg flex-col gap-4">
      <div className="flex flex-col gap-1">
        <label htmlFor="titulo" className="text-sm font-medium">
          Título
        </label>
        <input
          id="titulo"
          name="titulo"
          required
          minLength={3}
          className="border border-black bg-white px-3 py-2 text-sm"
          placeholder="Ej. Recolección de alimentos"
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
          className="border border-black bg-white px-3 py-2 text-sm"
          placeholder="Describe la iniciativa y cómo ayudar"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="status" className="text-sm font-medium">
          Estado
        </label>
        <select
          id="status"
          name="status"
          defaultValue="pending"
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
        <p className="text-sm">Iniciativa registrada correctamente.</p>
      ) : null}

      <button
        type="submit"
        disabled={isPending}
        className="w-fit border border-black px-5 py-2 text-sm font-medium disabled:opacity-50"
      >
        {isPending ? "Guardando..." : "Registrar iniciativa"}
      </button>
    </form>
  );
}
