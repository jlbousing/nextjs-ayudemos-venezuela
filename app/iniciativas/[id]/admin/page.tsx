import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { InitiativeAdminForm } from "@/components/initiatives/initiative-admin-form";
import { DeleteInitiativeButton } from "@/components/initiatives/delete-initiative-button";
import { VolunteersContactList } from "@/components/initiatives/volunteers-contact-list";
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
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-10 px-6 py-16">
      <header className="flex flex-col gap-3">
        <Link href="/iniciativas" className="text-sm underline">
          ← Volver a iniciativas
        </Link>
        <div className="flex flex-wrap items-center gap-2">
          <h1 className="text-3xl font-semibold">{initiative.titulo}</h1>
          <span className="border border-black px-2 py-0.5 text-xs">
            {INITIATIVE_STATUS_LABELS[initiative.status]}
          </span>
        </div>
        <p className="text-sm">Administra tu iniciativa y contacta a los voluntarios.</p>
      </header>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-medium">Editar iniciativa</h2>
        <InitiativeAdminForm initiative={initiative} />
      </section>

      <section className="flex flex-col gap-4 border-t border-black pt-10">
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-medium">
            Voluntarios ({initiative.voluntarios.length})
          </h2>
          <p className="text-sm">
            Datos de contacto para coordinar la ayuda con tu equipo.
          </p>
        </div>
        <VolunteersContactList voluntarios={initiative.voluntarios} />
      </section>

      <section className="flex flex-col gap-4 border-t border-black pt-10">
        <h2 className="text-xl font-medium">Zona de peligro</h2>
        {error === "delete" ? (
          <p className="text-sm">
            No se pudo eliminar la iniciativa. Intenta de nuevo.
          </p>
        ) : null}
        <p className="text-sm">
          Al eliminar la iniciativa se borrarán también los voluntarios
          inscritos.
        </p>
        <DeleteInitiativeButton initiativeId={initiative.id} />
      </section>
    </div>
  );
}
