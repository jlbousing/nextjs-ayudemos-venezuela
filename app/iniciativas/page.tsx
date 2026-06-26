import Link from "next/link";
import { InitiativeForm } from "@/components/initiatives/initiative-form";
import { InitiativeList } from "@/components/initiatives/initiative-list";
import { getCurrentProfile } from "@/lib/auth/session";
import { getInitiatives } from "@/lib/data/initiatives";

export default async function IniciativasPage() {
  const [initiatives, profile] = await Promise.all([
    getInitiatives(),
    getCurrentProfile(),
  ]);

  const isAuthenticated = Boolean(profile);

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-10 px-6 py-16">
      <header className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold">Iniciativas</h1>
        <p className="text-sm">
          {isAuthenticated
            ? `Hola, ${profile?.name}. Puedes registrar iniciativas o unirte como voluntario.`
            : "Inicia sesión para registrar iniciativas o unirte como voluntario."}
        </p>
      </header>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-medium">Activas</h2>
        <InitiativeList
          initiatives={initiatives}
          currentUserId={profile?.id}
          isAuthenticated={isAuthenticated}
        />
      </section>

      <section className="flex flex-col gap-4 border-t border-black pt-10">
        <h2 className="text-xl font-medium">Nueva iniciativa</h2>
        {isAuthenticated ? (
          <InitiativeForm />
        ) : (
          <div className="flex flex-col gap-2 text-sm">
            <p>Debes iniciar sesión para registrar una iniciativa.</p>
            <Link
              href="/iniciar-sesion?redirect=/iniciativas"
              className="w-fit border border-black px-5 py-2"
            >
              Iniciar sesión
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}
