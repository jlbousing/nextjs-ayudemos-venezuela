"use client";

import { deleteInitiativeAction } from "@/lib/actions/initiatives";
import { Button } from "@/components/ui/form";

type DeleteInitiativeButtonProps = {
  initiativeId: string;
};

export function DeleteInitiativeButton({
  initiativeId,
}: DeleteInitiativeButtonProps) {
  return (
    <form action={deleteInitiativeAction}>
      <input type="hidden" name="initiativeId" value={initiativeId} />
      <Button
        type="submit"
        variant="danger"
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
      </Button>
    </form>
  );
}
