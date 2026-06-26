import type { Initiative } from "@/lib/types/initiative";

type InitiativeListProps = {
  initiatives: Initiative[];
};

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
          <h2 className="text-lg font-semibold text-zinc-900">
            {initiative.title}
          </h2>
          <p className="mt-2 text-sm text-zinc-600">{initiative.description}</p>
        </li>
      ))}
    </ul>
  );
}
