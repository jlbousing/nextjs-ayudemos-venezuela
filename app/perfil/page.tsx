import Link from "next/link";
import { redirect } from "next/navigation";
import { ProfileForm } from "@/components/profile/profile-form";
import { getCurrentProfile } from "@/lib/auth/session";

export default async function ProfilePage() {
  const profile = await getCurrentProfile();

  if (!profile) {
    redirect("/iniciar-sesion?redirect=/perfil");
  }

  return (
    <div className="mx-auto flex w-full max-w-lg flex-col gap-8 px-6 py-16">
      <header className="flex flex-col gap-3">
        <Link href="/iniciativas" className="text-sm underline">
          ← Volver a iniciativas
        </Link>
        <h1 className="text-3xl font-semibold">Mi perfil</h1>
        <p className="text-sm">
          Actualiza tu nombre y teléfono. Los organizadores de iniciativas
          usan estos datos para contactarte como voluntario.
        </p>
      </header>

      <ProfileForm profile={profile} />
    </div>
  );
}
