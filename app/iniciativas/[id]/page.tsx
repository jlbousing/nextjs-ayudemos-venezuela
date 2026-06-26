import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { InitiativeDetail } from "@/components/initiatives/initiative-detail";
import { PageHeader, PageShell } from "@/components/ui/layout";
import { getCurrentProfile } from "@/lib/auth/session";
import { getAppUrl } from "@/lib/config/app-url";
import { getInitiativeById } from "@/lib/data/initiatives";
import { INITIATIVE_STATUS_LABELS } from "@/lib/types/initiative";

type InitiativePageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: InitiativePageProps): Promise<Metadata> {
  const { id } = await params;
  const initiative = await getInitiativeById(id);

  if (!initiative) {
    return {
      title: "Iniciativa no encontrada",
    };
  }

  const description = initiative.descripcion.slice(0, 160);

  return {
    title: initiative.titulo,
    description,
    openGraph: {
      title: initiative.titulo,
      description,
      type: "article",
    },
  };
}

export default async function InitiativePage({ params }: InitiativePageProps) {
  const { id } = await params;
  const [initiative, profile] = await Promise.all([
    getInitiativeById(id),
    getCurrentProfile(),
  ]);

  if (!initiative) {
    notFound();
  }

  const appUrl = await getAppUrl();
  const shareUrl = `${appUrl}/iniciativas/${initiative.id}`;

  return (
    <PageShell>
      <PageHeader
        backHref="/iniciativas"
        backLabel="Volver a iniciativas"
        title={initiative.titulo}
        description={`${INITIATIVE_STATUS_LABELS[initiative.status]} · ${initiative.voluntarios.length} voluntario${initiative.voluntarios.length === 1 ? "" : "s"}`}
      />

      <InitiativeDetail
        initiative={initiative}
        shareUrl={shareUrl}
        currentUserId={profile?.id}
        isAuthenticated={Boolean(profile)}
      />
    </PageShell>
  );
}
