import type { CreateInitiativeInput, Initiative } from "@/lib/types/initiative";

// Capa de acceso a datos: usada por SSR (Server Components) y Route Handlers.
// Sustituye esto por tu ORM, base de datos o API externa.

const initiatives: Initiative[] = [
  {
    id: "1",
    title: "Recolección de medicinas",
    description: "Punto de acopio en Caracas para insumos médicos básicos.",
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
    title: input.title.trim(),
    description: input.description.trim(),
    createdAt: new Date().toISOString(),
  };

  initiatives.unshift(initiative);
  return initiative;
}
