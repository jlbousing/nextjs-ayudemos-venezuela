"use client";

import { useActionState } from "react";
import {
  createInitiativeAction,
  type CreateInitiativeState,
} from "@/lib/actions/initiatives";

const initialState: CreateInitiativeState = {};

export function InitiativeForm() {
  const [state, formAction, isPending] = useActionState(
    createInitiativeAction,
    initialState,
  );

  return (
    <form action={formAction} className="flex w-full max-w-lg flex-col gap-4">
      <div className="flex flex-col gap-1">
        <label htmlFor="title" className="text-sm font-medium text-zinc-700">
          Título
        </label>
        <input
          id="title"
          name="title"
          required
          minLength={3}
          className="rounded-md border border-zinc-300 px-3 py-2 text-sm"
          placeholder="Ej. Recolección de alimentos"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label
          htmlFor="description"
          className="text-sm font-medium text-zinc-700"
        >
          Descripción
        </label>
        <textarea
          id="description"
          name="description"
          required
          minLength={10}
          rows={4}
          className="rounded-md border border-zinc-300 px-3 py-2 text-sm"
          placeholder="Describe la iniciativa y cómo ayudar"
        />
      </div>

      {state.error ? (
        <p className="text-sm text-red-600">{state.error}</p>
      ) : null}

      {state.success ? (
        <p className="text-sm text-green-700">
          Iniciativa registrada correctamente.
        </p>
      ) : null}

      <button
        type="submit"
        disabled={isPending}
        className="rounded-full bg-zinc-900 px-5 py-2 text-sm font-medium text-white disabled:opacity-60"
      >
        {isPending ? "Guardando..." : "Registrar iniciativa"}
      </button>
    </form>
  );
}
