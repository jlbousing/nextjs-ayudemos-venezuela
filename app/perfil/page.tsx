import { redirect } from "next/navigation";
import { ProfileForm } from "@/components/profile/profile-form";
import { PageHeader, PageShell } from "@/components/ui/layout";
import { getCurrentProfile } from "@/lib/auth/session";

export default async function ProfilePage() {
  const profile = await getCurrentProfile();

  if (!profile) {
    redirect("/iniciar-sesion?redirect=/perfil");
  }

  return (
    <PageShell size="narrow">
      <PageHeader
        backHref="/iniciativas"
        backLabel="Volver a iniciativas"
        title="Mi perfil"
        description="Actualiza tu nombre y teléfono. Los organizadores de iniciativas usan estos datos para contactarte como voluntario."
      />

      <ProfileForm profile={profile} />
    </PageShell>
  );
}
