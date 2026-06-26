import { createClient } from "@/lib/supabase/server";
import type { Voluntario } from "@/lib/types/user";
import type {
  CreateInitiativeInput,
  Initiative,
  InitiativeStatus,
  UpdateInitiativeInput,
} from "@/lib/types/initiative";

const INITIATIVE_SELECT = `
  id,
  title,
  description,
  status,
  created_by,
  created_at,
  initiative_volunteers (
    profiles (
      id,
      name,
      email,
      phone
    )
  )
`;

type ProfileRow = {
  id: string;
  name: string;
  email: string;
  phone: string;
};

type InitiativeRow = {
  id: string;
  title: string;
  description: string;
  status: InitiativeStatus;
  created_by: string | null;
  created_at: string;
  initiative_volunteers: Array<{ profiles: ProfileRow | null }> | null;
};

function mapVolunteers(
  rows: InitiativeRow["initiative_volunteers"],
  includeContact: boolean,
): Voluntario[] {
  return (rows ?? [])
    .map((row) => row.profiles)
    .filter((profile): profile is ProfileRow => profile !== null)
    .map((profile) => ({
      id: profile.id,
      nombre: profile.name,
      email: includeContact ? profile.email : "",
      telefono: includeContact ? profile.phone : "",
    }));
}

function mapInitiative(row: InitiativeRow, includeContact: boolean): Initiative {
  return {
    id: row.id,
    titulo: row.title,
    descripcion: row.description,
    status: row.status,
    createdBy: row.created_by,
    createdAt: row.created_at,
    voluntarios: mapVolunteers(row.initiative_volunteers, includeContact),
  };
}

export async function getInitiatives(): Promise<Initiative[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("initiatives")
    .select(INITIATIVE_SELECT)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return (data as InitiativeRow[]).map((row) => mapInitiative(row, false));
}

export async function getInitiativeById(
  id: string,
  includeContact = false,
): Promise<Initiative | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("initiatives")
    .select(INITIATIVE_SELECT)
    .eq("id", id)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  if (!data) {
    return null;
  }

  return mapInitiative(data as InitiativeRow, includeContact);
}

export async function getInitiativeForCreator(
  id: string,
  creatorId: string,
): Promise<Initiative | null> {
  const initiative = await getInitiativeById(id, true);

  if (!initiative || initiative.createdBy !== creatorId) {
    return null;
  }

  return initiative;
}

export async function createInitiative(
  input: CreateInitiativeInput,
  createdBy: string,
): Promise<Initiative> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("initiatives")
    .insert({
      title: input.titulo.trim(),
      description: input.descripcion.trim(),
      status: input.status ?? "pending",
      created_by: createdBy,
    })
    .select(INITIATIVE_SELECT)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return mapInitiative(data as InitiativeRow, true);
}

export async function updateInitiative(
  id: string,
  creatorId: string,
  input: UpdateInitiativeInput,
): Promise<Initiative> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("initiatives")
    .update({
      title: input.titulo.trim(),
      description: input.descripcion.trim(),
      status: input.status,
    })
    .eq("id", id)
    .eq("created_by", creatorId)
    .select(INITIATIVE_SELECT)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return mapInitiative(data as InitiativeRow, true);
}

export async function deleteInitiative(
  id: string,
  creatorId: string,
): Promise<void> {
  const supabase = await createClient();
  const { error } = await supabase
    .from("initiatives")
    .delete()
    .eq("id", id)
    .eq("created_by", creatorId);

  if (error) {
    throw new Error(error.message);
  }
}

export async function joinInitiativeAsVolunteer(
  initiativeId: string,
  voluntario: Voluntario,
): Promise<{ joined: boolean; alreadyJoined: boolean }> {
  const supabase = await createClient();

  const { data: existing } = await supabase
    .from("initiative_volunteers")
    .select("volunteer_id")
    .eq("initiative_id", initiativeId)
    .eq("volunteer_id", voluntario.id)
    .maybeSingle();

  if (existing) {
    return { joined: false, alreadyJoined: true };
  }

  const { error } = await supabase.from("initiative_volunteers").insert({
    initiative_id: initiativeId,
    volunteer_id: voluntario.id,
  });

  if (error) {
    throw new Error(error.message);
  }

  return { joined: true, alreadyJoined: false };
}
