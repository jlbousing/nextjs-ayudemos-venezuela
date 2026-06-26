import type { Voluntario } from "@/lib/types/user";

export type InitiativeStatus = "pending" | "process" | "completed";

export type Initiative = {
  id: string;
  titulo: string;
  descripcion: string;
  status: InitiativeStatus;
  voluntarios: Voluntario[];
  createdAt: string;
};

export type CreateInitiativeInput = {
  titulo: string;
  descripcion: string;
  status?: InitiativeStatus;
  voluntarios?: Voluntario[];
};

export const INITIATIVE_STATUS_LABELS: Record<InitiativeStatus, string> = {
  pending: "Pendiente",
  process: "En proceso",
  completed: "Completada",
};
