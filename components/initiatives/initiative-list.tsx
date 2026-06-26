import {
  INITIATIVE_STATUS_LABELS,
  type Initiative,
} from "@/lib/types/initiative";

type InitiativeListProps = {
  initiatives: Initiative[];
};

const STATUS_STYLES = {
  pending: "bg-amber-100 text-amber-800",
  process: "bg-blue-100 text-blue-800",
  completed: "bg-green-100 text-green-800",
} as const;

export function InitiativeList({ initiatives }: InitiativeListProps) {
  if (initiatives.length === 0) {
    return (
      <p className="text-sm text-zinc-500">
        Aún no hay iniciativas registradas.
      </p>
    );
  }

  return (
    <ul className="flex w-full max-w-2xl flex-col gap-4">
      {initiatives.map((initiative) => (
        <li
          key={initiative.id}
          className="rounded-lg border border-zinc-200 p-4"
        >
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-lg font-semibold text-zinc-900">
              {initiative.titulo}
            </h2>
            <span
              className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${STATUS_STYLES[initiative.status]}`}
            >
              {INITIATIVE_STATUS_LABELS[initiative.status]}
            </span>
          </div>

          <p className="mt-2 text-sm text-zinc-600">{initiative.descripcion}</p>

          <div className="mt-4">
            <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
              Voluntarios ({initiative.voluntarios.length})
            </p>
            {initiative.voluntarios.length === 0 ? (
              <p className="mt-1 text-sm text-zinc-500">
                Sin voluntarios asignados.
              </p>
            ) : (
              <ul className="mt-2 flex flex-col gap-1">
                {initiative.voluntarios.map((voluntario) => (
                  <li key={voluntario.id} className="text-sm text-zinc-700">
                    {voluntario.nombre}{" "}
                    <span className="text-zinc-400">({voluntario.email})</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}
