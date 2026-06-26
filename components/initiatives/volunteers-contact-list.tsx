import type { Voluntario } from "@/lib/types/user";

type VolunteersContactListProps = {
  voluntarios: Voluntario[];
};

export function VolunteersContactList({
  voluntarios,
}: VolunteersContactListProps) {
  if (voluntarios.length === 0) {
    return (
      <p className="text-sm">
        Aún no hay voluntarios inscritos. Cuando alguien se una, verás aquí su
        correo y teléfono para contactarlo.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto border border-black">
      <table className="w-full min-w-[32rem] text-left text-sm">
        <thead>
          <tr className="border-b border-black">
            <th className="px-4 py-3 font-medium">Nombre</th>
            <th className="px-4 py-3 font-medium">Correo</th>
            <th className="px-4 py-3 font-medium">Teléfono</th>
            <th className="px-4 py-3 font-medium">Contactar</th>
          </tr>
        </thead>
        <tbody>
          {voluntarios.map((voluntario) => (
            <tr key={voluntario.id} className="border-b border-black last:border-b-0">
              <td className="px-4 py-3">{voluntario.nombre}</td>
              <td className="px-4 py-3">{voluntario.email}</td>
              <td className="px-4 py-3">{voluntario.telefono || "—"}</td>
              <td className="px-4 py-3">
                <div className="flex flex-wrap gap-3">
                  <a href={`mailto:${voluntario.email}`} className="underline">
                    Correo
                  </a>
                  {voluntario.telefono ? (
                    <a
                      href={`tel:${voluntario.telefono.replace(/\s/g, "")}`}
                      className="underline"
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
  );
}
