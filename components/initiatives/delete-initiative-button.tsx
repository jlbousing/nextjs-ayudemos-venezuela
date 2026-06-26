"use client";

import { deleteInitiativeAction } from "@/lib/actions/initiatives";

type DeleteInitiativeButtonProps = {
  initiativeId: string;
};

export function DeleteInitiativeButton({
  initiativeId,
}: DeleteInitiativeButtonProps) {
  return (
    <form action={deleteInitiativeAction}>
      <input type="hidden" name="initiativeId" value={initiativeId} />
      <button
        type="submit"
        className="border border-black px-5 py-2 text-sm font-medium"
        onClick={(event) => {
          const confirmed = window.confirm(
            "¿Eliminar esta iniciativa? También se quitarán las inscripciones de voluntarios. Esta acción no se puede deshacer.",
          );

          if (!confirmed) {
            event.preventDefault();
          }
        }}
      >
        Eliminar iniciativa
      </button>
    </form>
  );
}
