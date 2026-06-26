import { notFound, redirect } from "next/navigation";
import { InitiativeAdminForm } from "@/components/initiatives/initiative-admin-form";
import { DeleteInitiativeButton } from "@/components/initiatives/delete-initiative-button";
import { VolunteersContactList } from "@/components/initiatives/volunteers-contact-list";
import { FormMessage, ButtonLink } from "@/components/ui/form";
import { Badge, PageHeader, PageShell, Section } from "@/components/ui/layout";
import { getCurrentProfile } from "@/lib/auth/session";
import { getInitiativeForCreator } from "@/lib/data/initiatives";
import { INITIATIVE_STATUS_LABELS } from "@/lib/types/initiative";

type AdminPageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string }>;
};

export default async function InitiativeAdminPage({
  params,
  searchParams,
}: AdminPageProps) {
  const { id } = await params;
  const { error } = await searchParams;
  const profile = await getCurrentProfile();

  if (!profile) {
    redirect(`/iniciar-sesion?redirect=/iniciativas/${id}/admin`);
  }

  const initiative = await getInitiativeForCreator(id, profile.id);

  if (!initiative) {
    notFound();
  }

  return (
    <PageShell>
      <PageHeader
        backHref="/iniciativas"
        backLabel="Volver a iniciativas"
        title={initiative.titulo}
        description="Administra tu iniciativa y contacta a los voluntarios."
        badge={<Badge>{INITIATIVE_STATUS_LABELS[initiative.status]}</Badge>}
      >
        <ButtonLink href={`/iniciativas/${initiative.id}`} variant="secondary">
          Ver página pública
        </ButtonLink>
      </PageHeader>

      <Section title="Editar iniciativa">
        <InitiativeAdminForm initiative={initiative} />
      </Section>

      <Section
        title={`Voluntarios (${initiative.voluntarios.length})`}
        description="Datos de contacto para coordinar la ayuda con tu equipo."
        bordered
      >
        <VolunteersContactList voluntarios={initiative.voluntarios} />
      </Section>

      <Section
        title="Zona de peligro"
        description="Al eliminar la iniciativa se borrarán también los voluntarios inscritos."
        bordered
      >
        {error === "delete" ? (
          <FormMessage tone="error">
            No se pudo eliminar la iniciativa. Intenta de nuevo.
          </FormMessage>
        ) : null}
        <DeleteInitiativeButton initiativeId={initiative.id} />
      </Section>
    </PageShell>
  );
}
