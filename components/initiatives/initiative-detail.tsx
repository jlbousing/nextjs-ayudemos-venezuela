import Link from "next/link";
import {
  INITIATIVE_STATUS_LABELS,
  type Initiative,
} from "@/lib/types/initiative";
import { JoinVolunteerButton } from "@/components/initiatives/join-volunteer-button";
import { ShareInitiativeButton } from "@/components/initiatives/share-initiative-button";
import { Badge, Card, Divider } from "@/components/ui/layout";
import { ButtonLink } from "@/components/ui/form";

type InitiativeDetailProps = {
  initiative: Initiative;
  shareUrl: string;
  currentUserId?: string;
  isAuthenticated: boolean;
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat("es-VE", {
    dateStyle: "long",
  }).format(new Date(value));
}

export function InitiativeDetail({
  initiative,
  shareUrl,
  currentUserId,
  isAuthenticated,
}: InitiativeDetailProps) {
  const isCreator = initiative.createdBy === currentUserId;
  const isJoined = initiative.voluntarios.some(
    (voluntario) => voluntario.id === currentUserId,
  );

  return (
    <div className="flex flex-col gap-8">
      <Card className="flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <Badge>{INITIATIVE_STATUS_LABELS[initiative.status]}</Badge>
            <span className="text-sm text-neutral-500">
              Publicada el {formatDate(initiative.createdAt)}
            </span>
          </div>
          <p className="text-base leading-7 text-neutral-700 whitespace-pre-wrap">
            {initiative.descripcion}
          </p>
        </div>

        <Divider />

        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-neutral-500">
            Voluntarios ({initiative.voluntarios.length})
          </p>
          {initiative.voluntarios.length === 0 ? (
            <p className="mt-2 text-sm text-neutral-500">
              Aún no hay voluntarios inscritos. Sé el primero en unirte.
            </p>
          ) : (
            <ul className="mt-3 flex flex-wrap gap-2">
              {initiative.voluntarios.map((voluntario) => (
                <li
                  key={voluntario.id}
                  className="rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-xs text-neutral-700"
                >
                  {voluntario.nombre}
                </li>
              ))}
            </ul>
          )}
        </div>

        <Divider />

        <div className="flex flex-wrap items-center gap-3">
          <ShareInitiativeButton url={shareUrl} />

          {isCreator ? (
            <ButtonLink href={`/iniciativas/${initiative.id}/admin`}>
              Administrar
            </ButtonLink>
          ) : null}

          {!isCreator ? (
            isAuthenticated ? (
              <JoinVolunteerButton
                initiativeId={initiative.id}
                isJoined={isJoined}
              />
            ) : (
              <ButtonLink
                href={`/iniciar-sesion?redirect=${encodeURIComponent(`/iniciativas/${initiative.id}`)}`}
              >
                Inicia sesión para unirte
              </ButtonLink>
            )
          ) : null}
        </div>
      </Card>

      <p className="text-center text-sm text-neutral-600">
        ¿Quieres ver más iniciativas?{" "}
        <Link
          href="/iniciativas"
          className="text-neutral-900 underline decoration-neutral-300 underline-offset-4 hover:decoration-neutral-500"
        >
          Explorar todas
        </Link>
      </p>
    </div>
  );
}
