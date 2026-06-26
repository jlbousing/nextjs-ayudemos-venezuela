"use client";

import { useActionState } from "react";
import {
  updateProfileAction,
  type UpdateProfileState,
} from "@/lib/actions/profile";
import type { Profile } from "@/lib/types/profile";

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
    <form action={formAction} className="flex w-full max-w-md flex-col gap-4">
      <div className="flex flex-col gap-1">
        <label htmlFor="name" className="text-sm font-medium">
          Nombre
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          minLength={2}
          autoComplete="name"
          defaultValue={profile.name}
          className="border border-black bg-white px-3 py-2 text-sm"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="email" className="text-sm font-medium">
          Correo
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={profile.email}
          readOnly
          className="border border-black bg-white px-3 py-2 text-sm opacity-70"
        />
        <p className="text-xs">El correo no se puede cambiar desde aquí.</p>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="phone" className="text-sm font-medium">
          Teléfono
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          required
          minLength={10}
          autoComplete="tel"
          defaultValue={profile.phone}
          className="border border-black bg-white px-3 py-2 text-sm"
          placeholder="Ej. 04141234567"
        />
      </div>

      {state.error ? <p className="text-sm">{state.error}</p> : null}
      {state.success ? (
        <p className="text-sm">Perfil actualizado correctamente.</p>
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
