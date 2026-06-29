import { ButtonLink, EmptyState } from "@/components/ui/form";
import { PageHeader, PageShell, Section } from "@/components/ui/layout";
import { TalentProfileForm } from "@/components/talent-relocation/talent-profile-form";
import { TalentProfileList } from "@/components/talent-relocation/talent-profile-list";
import { getCurrentProfile } from "@/lib/auth/session";
import {
  getTalentProfileByUserId,
  getTalentProfiles,
} from "@/lib/data/talent-profiles";

export default async function TalentRelocationPage() {
  const [profiles, profile] = await Promise.all([
    getTalentProfiles(),
    getCurrentProfile(),
  ]);

  const isAuthenticated = Boolean(profile);
  const ownProfile = profile
    ? await getTalentProfileByUserId(profile.id)
    : null;

  return (
    <PageShell>
      <PageHeader
        title="Reubicación de talento"
        description="Personas que quedaron desempleadas y buscan nuevas oportunidades. Si puedes ayudar con empleo, contacto o referidos, aquí encontrarás su talento."
      />

      <Section
        title="Perfiles disponibles"
        description="Profesionales que ofrecen sus servicios y buscan apoyo para reintegrarse laboralmente."
      >
        {profiles.length === 0 ? (
          <EmptyState>
            Aún no hay perfiles publicados. Si buscas oportunidades, puedes ser
            el primero en publicar el tuyo.
          </EmptyState>
        ) : (
          <TalentProfileList
            profiles={profiles}
            currentUserId={profile?.id}
          />
        )}
      </Section>

      <Section
        title="Publicar mi perfil"
        description="Comparte tu experiencia para que empresas, ONGs o personas puedan ayudarte."
        bordered
      >
        {!isAuthenticated ? (
          <div className="flex flex-col gap-4">
            <p className="text-sm text-neutral-600">
              Debes iniciar sesión para publicar tu perfil profesional.
            </p>
            <ButtonLink href="/iniciar-sesion?redirect=/reubicacion-talento">
              Iniciar sesión
            </ButtonLink>
          </div>
        ) : ownProfile ? (
          <div className="flex flex-col gap-4">
            <p className="text-sm text-neutral-600">
              Ya tienes un perfil publicado. Puedes editarlo o compartirlo con
              quienes puedan ayudarte.
            </p>
            <div className="flex flex-wrap gap-3">
              <ButtonLink href={`/reubicacion-talento/${ownProfile.id}`}>
                Ver mi perfil
              </ButtonLink>
              <ButtonLink
                href={`/reubicacion-talento/${ownProfile.id}/editar`}
                variant="secondary"
              >
                Editar perfil
              </ButtonLink>
            </div>
          </div>
        ) : (
          <TalentProfileForm />
        )}
      </Section>
    </PageShell>
  );
}
