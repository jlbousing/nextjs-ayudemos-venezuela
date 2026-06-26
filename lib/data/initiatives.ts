import type { Voluntario } from "@/lib/types/user";
import type { CreateInitiativeInput, Initiative } from "@/lib/types/initiative";

// Capa de acceso a datos: usada por SSR (Server Components) y Route Handlers.
// Sustituye esto por tu ORM, base de datos o API externa.

const initiatives: Initiative[] = [
  {
    id: "1",
    titulo: "Recolección de medicinas",
    descripcion: "Punto de acopio en Caracas para insumos médicos básicos.",
    status: "process",
    voluntarios: [
      {
        id: "v1",
        nombre: "María González",
        email: "maria@ejemplo.com",
      },
      {
        id: "v2",
        nombre: "Carlos Pérez",
        email: "carlos@ejemplo.com",
      },
    ],
    createdAt: new Date().toISOString(),
  },
];

export async function getInitiatives(): Promise<Initiative[]> {
  return [...initiatives].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
}

export async function getInitiativeById(id: string): Promise<Initiative | null> {
  return initiatives.find((item) => item.id === id) ?? null;
}

export async function createInitiative(
  input: CreateInitiativeInput,
): Promise<Initiative> {
  const initiative: Initiative = {
    id: crypto.randomUUID(),
    titulo: input.titulo.trim(),
    descripcion: input.descripcion.trim(),
    status: input.status ?? "pending",
    voluntarios: input.voluntarios ?? [],
    createdAt: new Date().toISOString(),
  };

  initiatives.unshift(initiative);
  return initiative;
}

export async function joinInitiativeAsVolunteer(
  initiativeId: string,
  voluntario: Voluntario,
): Promise<{ joined: boolean; alreadyJoined: boolean }> {
  const initiative = initiatives.find((item) => item.id === initiativeId);

  if (!initiative) {
    throw new Error("Iniciativa no encontrada.");
  }

  const alreadyJoined = initiative.voluntarios.some(
    (item) => item.id === voluntario.id,
  );

  if (alreadyJoined) {
    return { joined: false, alreadyJoined: true };
  }

  initiative.voluntarios.push(voluntario);
  return { joined: true, alreadyJoined: false };
}
