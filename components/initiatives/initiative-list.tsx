import Link from "next/link";
import {
  INITIATIVE_STATUS_LABELS,
  type Initiative,
} from "@/lib/types/initiative";
import { JoinVolunteerButton } from "@/components/initiatives/join-volunteer-button";

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
  if (initiatives.length === 0) {
    return <p className="text-sm">Aún no hay iniciativas registradas.</p>;
  }

  return (
    <ul className="flex w-full max-w-2xl flex-col gap-4">
      {initiatives.map((initiative) => {
        const isCreator = initiative.createdBy === currentUserId;
        const isJoined = initiative.voluntarios.some(
          (voluntario) => voluntario.id === currentUserId,
        );

        return (
          <li key={initiative.id} className="border border-black p-4">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-lg font-semibold">{initiative.titulo}</h2>
              <span className="border border-black px-2 py-0.5 text-xs">
                {INITIATIVE_STATUS_LABELS[initiative.status]}
              </span>
            </div>

            <p className="mt-2 text-sm">{initiative.descripcion}</p>

            <div className="mt-4">
              <p className="text-xs font-medium uppercase tracking-wide">
                Voluntarios ({initiative.voluntarios.length})
              </p>
              {initiative.voluntarios.length === 0 ? (
                <p className="mt-1 text-sm">Sin voluntarios asignados.</p>
              ) : (
                <ul className="mt-2 flex flex-col gap-1">
                  {initiative.voluntarios.map((voluntario) => (
                    <li key={voluntario.id} className="text-sm">
                      {voluntario.nombre}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-4 border-t border-black pt-4">
              {isCreator ? (
                <Link
                  href={`/iniciativas/${initiative.id}/admin`}
                  className="border border-black px-4 py-1.5 text-sm"
                >
                  Administrar
                </Link>
              ) : null}

              {!isCreator ? (
                isAuthenticated ? (
                  <JoinVolunteerButton
                    initiativeId={initiative.id}
                    isJoined={isJoined}
                  />
                ) : (
                  <Link
                    href="/iniciar-sesion?redirect=/iniciativas"
                    className="text-sm underline"
                  >
                    Inicia sesión para unirte como voluntario
                  </Link>
                )
              ) : null}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
