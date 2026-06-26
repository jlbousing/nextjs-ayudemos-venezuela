import { InitiativeForm } from "@/components/initiatives/initiative-form";
import { InitiativeList } from "@/components/initiatives/initiative-list";
import { getInitiatives } from "@/lib/data/initiatives";

export default async function IniciativasPage() {
  const initiatives = await getInitiatives();

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-10 px-6 py-16">
      <header className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold text-zinc-900">Iniciativas</h1>
        <p className="text-zinc-600">
          Página renderizada en el servidor (SSR) con datos de{" "}
          <code className="text-sm">lib/data</code>.
        </p>
      </header>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-medium text-zinc-900">Activas</h2>
        <InitiativeList initiatives={initiatives} />
      </section>

      <section className="flex flex-col gap-4 border-t border-zinc-200 pt-10">
        <h2 className="text-xl font-medium text-zinc-900">
          Nueva iniciativa (Server Action)
        </h2>
        <InitiativeForm />
      </section>
    </div>
  );
}
