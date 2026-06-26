import Link from "next/link";
import {
  INITIATIVE_STATUS_LABELS,
  type Initiative,
} from "@/lib/types/initiative";
import { JoinVolunteerButton } from "@/components/initiatives/join-volunteer-button";
import { Badge, Card, Divider } from "@/components/ui/layout";
import { ButtonLink } from "@/components/ui/form";

type InitiativeListProps = {
  initiatives: Initiative[];
  currentUserId?: string;
  isAuthenticated: boolean;
};

export function InitiativeList({
  initiatives,
  currentUserId,
  isAuthenticated,
}: InitiativeListProps) {
  return (
    <ul className="flex flex-col gap-4">
      {initiatives.map((initiative) => {
        const isCreator = initiative.createdBy === currentUserId;
        const isJoined = initiative.voluntarios.some(
          (voluntario) => voluntario.id === currentUserId,
        );

        return (
          <li key={initiative.id}>
            <Card className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-lg font-semibold text-neutral-900">
                    <Link
                      href={`/iniciativas/${initiative.id}`}
                      className="transition-colors hover:text-neutral-600"
                    >
                      {initiative.titulo}
                    </Link>
                  </h2>
                  <Badge>{INITIATIVE_STATUS_LABELS[initiative.status]}</Badge>
                </div>
                <p className="text-sm leading-6 text-neutral-600 line-clamp-3">
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
                    Sin voluntarios inscritos todavía.
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

              <div className="flex flex-wrap items-center gap-3">
                <ButtonLink href={`/iniciativas/${initiative.id}`} variant="ghost">
                  Ver detalle
                </ButtonLink>

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
                    <Link
                      href={`/iniciar-sesion?redirect=${encodeURIComponent(`/iniciativas/${initiative.id}`)}`}
                      className="text-sm text-neutral-600 underline decoration-neutral-300 underline-offset-4 hover:text-neutral-900"
                    >
                      Inicia sesión para unirte
                    </Link>
                  )
                ) : null}
              </div>
            </Card>
          </li>
        );
      })}
    </ul>
  );
}
