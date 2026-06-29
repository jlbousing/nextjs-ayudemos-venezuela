import Link from "next/link";
import type { ReactNode } from "react";
import type { TalentProfile } from "@/lib/types/talent-profile";
import { ShareInitiativeButton } from "@/components/initiatives/share-initiative-button";
import { ButtonLink } from "@/components/ui/form";
import { Card, Divider } from "@/components/ui/layout";

type TalentProfileDetailProps = {
  profile: TalentProfile;
  shareUrl: string;
  isOwner: boolean;
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat("es-VE", {
    dateStyle: "long",
  }).format(new Date(value));
}

function ExternalLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  const url = href.startsWith("http") ? href : `https://${href}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="text-neutral-900 underline decoration-neutral-300 underline-offset-4 hover:decoration-neutral-500"
    >
      {children}
    </a>
  );
}

function DetailBlock({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-sm font-medium uppercase tracking-wide text-neutral-500">
        {title}
      </h2>
      <div className="text-sm leading-6 text-neutral-700 whitespace-pre-wrap">
        {children}
      </div>
    </div>
  );
}

export function TalentProfileDetail({
  profile,
  shareUrl,
  isOwner,
}: TalentProfileDetailProps) {
  return (
    <div className="flex flex-col gap-8">
      <Card className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <p className="text-sm text-neutral-500">
            Publicado el {formatDate(profile.createdAt)}
          </p>
          <p className="text-2xl font-semibold text-neutral-900">
            {profile.publicante.nombre}
          </p>
          <p className="text-base text-neutral-600">{profile.profesion}</p>
        </div>

        <Divider />

        <DetailBlock title="Descripción">{profile.descripcion}</DetailBlock>
        <DetailBlock title="Experiencia">{profile.experiencia}</DetailBlock>
        <DetailBlock title="Lugar donde trabajaba">
          {profile.lugarTrabajoAnterior}
        </DetailBlock>
        <DetailBlock title="Habilidades">{profile.habilidades}</DetailBlock>

        {profile.linkedin || profile.redesSociales ? (
          <>
            <Divider />
            <div className="flex flex-col gap-2">
              <h2 className="text-sm font-medium uppercase tracking-wide text-neutral-500">
                Enlaces
              </h2>
              <div className="flex flex-col gap-2 text-sm">
                {profile.linkedin ? (
                  <p>
                    LinkedIn:{" "}
                    <ExternalLink href={profile.linkedin}>
                      {profile.linkedin}
                    </ExternalLink>
                  </p>
                ) : null}
                {profile.redesSociales ? (
                  <p className="whitespace-pre-wrap">{profile.redesSociales}</p>
                ) : null}
              </div>
            </div>
          </>
        ) : null}

        <Divider />

        <div className="flex flex-col gap-3">
          <h2 className="text-sm font-medium uppercase tracking-wide text-neutral-500">
            Contacto
          </h2>
          <div className="flex flex-col gap-2 text-sm text-neutral-700">
            {profile.publicante.email ? (
              <p>
                Correo:{" "}
                <a
                  href={`mailto:${profile.publicante.email}`}
                  className="text-neutral-900 underline decoration-neutral-300 underline-offset-4"
                >
                  {profile.publicante.email}
                </a>
              </p>
            ) : null}
            {profile.publicante.telefono ? (
              <p>
                Teléfono:{" "}
                <a
                  href={`tel:${profile.publicante.telefono}`}
                  className="text-neutral-900 underline decoration-neutral-300 underline-offset-4"
                >
                  {profile.publicante.telefono}
                </a>
              </p>
            ) : null}
          </div>
        </div>

        <Divider />

        <div className="flex flex-wrap items-center gap-3">
          <ShareInitiativeButton url={shareUrl} />
          {isOwner ? (
            <ButtonLink
              href={`/reubicacion-talento/${profile.id}/editar`}
              variant="secondary"
            >
              Editar perfil
            </ButtonLink>
          ) : null}
        </div>
      </Card>

      <p className="text-center text-sm text-neutral-600">
        ¿Conoces a alguien que busca oportunidades?{" "}
        <Link
          href="/reubicacion-talento"
          className="text-neutral-900 underline decoration-neutral-300 underline-offset-4 hover:decoration-neutral-500"
        >
          Ver más perfiles
        </Link>
      </p>
    </div>
  );
}
