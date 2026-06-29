"use client";

import { deleteTalentProfileAction } from "@/lib/actions/talent-profiles";
import { Button } from "@/components/ui/form";

type DeleteTalentProfileButtonProps = {
  profileId: string;
};

export function DeleteTalentProfileButton({
  profileId,
}: DeleteTalentProfileButtonProps) {
  return (
    <form action={deleteTalentProfileAction}>
      <input type="hidden" name="profileId" value={profileId} />
      <Button
        type="submit"
        variant="danger"
        onClick={(event) => {
          const confirmed = window.confirm(
            "¿Seguro que quieres eliminar tu perfil? Esta acción no se puede deshacer.",
          );

          if (!confirmed) {
            event.preventDefault();
          }
        }}
      >
        Eliminar perfil
      </Button>
    </form>
  );
}
