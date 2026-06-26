import type { Voluntario } from "@/lib/types/user";

export type InitiativeStatus = "pending" | "process" | "completed";

export type Initiative = {
  id: string;
  titulo: string;
  descripcion: string;
  status: InitiativeStatus;
  createdBy: string | null;
  voluntarios: Voluntario[];
  createdAt: string;
};

export type CreateInitiativeInput = {
  titulo: string;
  descripcion: string;
  status?: InitiativeStatus;
};

export type UpdateInitiativeInput = {
  titulo: string;
  descripcion: string;
  status: InitiativeStatus;
};

export const INITIATIVE_STATUS_LABELS: Record<InitiativeStatus, string> = {
  pending: "Pendiente",
  process: "En proceso",
  completed: "Completada",
};
