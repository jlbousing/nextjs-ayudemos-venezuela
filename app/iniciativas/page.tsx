import { ButtonLink, EmptyState } from "@/components/ui/form";
import { PageHeader, PageShell, Section } from "@/components/ui/layout";
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
    <PageShell>
      <PageHeader
        title="Iniciativas"
        description={
          isAuthenticated
            ? `Hola, ${profile?.name}. Puedes registrar iniciativas o unirte como voluntario.`
            : "Inicia sesión para registrar iniciativas o unirte como voluntario."
        }
      />

      <Section title="Activas" description="Iniciativas disponibles para apoyar.">
        {initiatives.length === 0 ? (
          <EmptyState>Aún no hay iniciativas registradas.</EmptyState>
        ) : (
          <InitiativeList
            initiatives={initiatives}
            currentUserId={profile?.id}
            isAuthenticated={isAuthenticated}
          />
        )}
      </Section>

      <Section
        title="Nueva iniciativa"
        description="Publica una iniciativa para convocar ayuda y voluntarios."
        bordered
      >
        {isAuthenticated ? (
          <InitiativeForm />
        ) : (
          <div className="flex flex-col gap-4">
            <p className="text-sm text-neutral-600">
              Debes iniciar sesión para registrar una iniciativa.
            </p>
            <ButtonLink href="/iniciar-sesion?redirect=/iniciativas">
              Iniciar sesión
            </ButtonLink>
          </div>
        )}
      </Section>
    </PageShell>
  );
}
