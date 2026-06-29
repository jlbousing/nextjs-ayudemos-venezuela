import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TalentProfileDetail } from "@/components/talent-relocation/talent-profile-detail";
import { PageHeader, PageShell } from "@/components/ui/layout";
import { getCurrentProfile } from "@/lib/auth/session";
import { getAppUrl } from "@/lib/config/app-url";
import { getTalentProfileById } from "@/lib/data/talent-profiles";

type TalentProfilePageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: TalentProfilePageProps): Promise<Metadata> {
  const { id } = await params;
  const profile = await getTalentProfileById(id);

  if (!profile) {
    return { title: "Perfil no encontrado" };
  }

  const description = `${profile.profesion} · ${profile.descripcion.slice(0, 140)}`;

  return {
    title: `${profile.publicante.nombre} — Reubicación de talento`,
    description,
    openGraph: {
      title: `${profile.publicante.nombre} — ${profile.profesion}`,
      description,
      type: "profile",
    },
  };
}

export default async function TalentProfilePage({
  params,
}: TalentProfilePageProps) {
  const { id } = await params;
  const [talentProfile, currentProfile] = await Promise.all([
    getTalentProfileById(id),
    getCurrentProfile(),
  ]);

  if (!talentProfile) {
    notFound();
  }

  const appUrl = await getAppUrl();
  const shareUrl = `${appUrl}/reubicacion-talento/${talentProfile.id}`;

  return (
    <PageShell>
      <PageHeader
        backHref="/reubicacion-talento"
        backLabel="Volver a perfiles"
        title={talentProfile.publicante.nombre}
        description={talentProfile.profesion}
      />

      <TalentProfileDetail
        profile={talentProfile}
        shareUrl={shareUrl}
        isOwner={talentProfile.createdBy === currentProfile?.id}
      />
    </PageShell>
  );
}
