import type { Voluntario } from "@/lib/types/user";
import { EmptyState } from "@/components/ui/form";

type VolunteersContactListProps = {
  voluntarios: Voluntario[];
};

export function VolunteersContactList({
  voluntarios,
}: VolunteersContactListProps) {
  if (voluntarios.length === 0) {
    return (
      <EmptyState>
        Aún no hay voluntarios inscritos. Cuando alguien se una, verás aquí su
        correo y teléfono para contactarlo.
      </EmptyState>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[36rem] text-left text-sm">
          <thead className="border-b border-neutral-200 bg-neutral-50">
            <tr>
              <th className="px-4 py-3 font-medium text-neutral-700">Nombre</th>
              <th className="px-4 py-3 font-medium text-neutral-700">Correo</th>
              <th className="px-4 py-3 font-medium text-neutral-700">Teléfono</th>
              <th className="px-4 py-3 font-medium text-neutral-700">Contactar</th>
            </tr>
          </thead>
          <tbody>
            {voluntarios.map((voluntario) => (
              <tr
                key={voluntario.id}
                className="border-b border-neutral-100 last:border-b-0"
              >
                <td className="px-4 py-3 text-neutral-900">{voluntario.nombre}</td>
                <td className="px-4 py-3 text-neutral-600">{voluntario.email}</td>
                <td className="px-4 py-3 text-neutral-600">
                  {voluntario.telefono || "—"}
                </td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-3">
                    <a
                      href={`mailto:${voluntario.email}`}
                      className="text-neutral-700 underline decoration-neutral-300 underline-offset-4 hover:text-neutral-900"
                    >
                      Correo
                    </a>
                    {voluntario.telefono ? (
                      <a
                        href={`tel:${voluntario.telefono.replace(/\s/g, "")}`}
                        className="text-neutral-700 underline decoration-neutral-300 underline-offset-4 hover:text-neutral-900"
                      >
                        Llamar
                      </a>
                    ) : null}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
