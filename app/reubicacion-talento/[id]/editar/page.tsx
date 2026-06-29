import { notFound, redirect } from "next/navigation";
import { DeleteTalentProfileButton } from "@/components/talent-relocation/delete-talent-profile-button";
import { TalentProfileEditForm } from "@/components/talent-relocation/talent-profile-edit-form";
import { FormMessage } from "@/components/ui/form";
import { PageHeader, PageShell, Section } from "@/components/ui/layout";
import { getCurrentProfile } from "@/lib/auth/session";
import { getTalentProfileForOwner } from "@/lib/data/talent-profiles";

type EditTalentProfilePageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string }>;
};

export default async function EditTalentProfilePage({
  params,
  searchParams,
}: EditTalentProfilePageProps) {
  const { id } = await params;
  const { error } = await searchParams;
  const profile = await getCurrentProfile();

  if (!profile) {
    redirect(`/iniciar-sesion?redirect=/reubicacion-talento/${id}/editar`);
  }

  const talentProfile = await getTalentProfileForOwner(id, profile.id);

  if (!talentProfile) {
    notFound();
  }

  return (
    <PageShell>
      <PageHeader
        backHref={`/reubicacion-talento/${id}`}
        backLabel="Volver al perfil"
        title="Editar perfil"
        description="Actualiza tu información para que quienes quieran ayudarte tengan datos recientes."
      />

      <Section title="Tu información">
        <TalentProfileEditForm profile={talentProfile} />
      </Section>

      <Section
        title="Zona de peligro"
        description="Al eliminar tu perfil dejará de aparecer en el listado público."
        bordered
      >
        {error === "delete" ? (
          <FormMessage tone="error">
            No se pudo eliminar el perfil. Intenta de nuevo.
          </FormMessage>
        ) : null}
        <DeleteTalentProfileButton profileId={talentProfile.id} />
      </Section>
    </PageShell>
  );
}
