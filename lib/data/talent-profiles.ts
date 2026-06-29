import { createClient } from "@/lib/supabase/server";
import type {
  CreateTalentProfileInput,
  TalentProfile,
  UpdateTalentProfileInput,
} from "@/lib/types/talent-profile";

const TALENT_PROFILE_SELECT = `
  id,
  profession,
  experience,
  description,
  previous_workplace,
  skills,
  linkedin_url,
  social_links,
  created_by,
  created_at,
  profiles:created_by (
    id,
    name,
    email,
    phone
  )
`;

type ProfileRow = {
  id: string;
  name: string;
  email: string;
  phone: string;
};

type TalentProfileRow = {
  id: string;
  profession: string;
  experience: string;
  description: string;
  previous_workplace: string;
  skills: string;
  linkedin_url: string | null;
  social_links: string | null;
  created_by: string;
  created_at: string;
  profiles: ProfileRow | ProfileRow[] | null;
};

function normalizeProfile(
  profile: ProfileRow | ProfileRow[] | null | undefined,
): ProfileRow | null {
  if (!profile) {
    return null;
  }

  if (Array.isArray(profile)) {
    return profile[0] ?? null;
  }

  return profile;
}

function mapTalentProfile(
  row: TalentProfileRow,
  includeContact: boolean,
): TalentProfile {
  const profile = normalizeProfile(row.profiles);

  return {
    id: row.id,
    profesion: row.profession,
    experiencia: row.experience,
    descripcion: row.description,
    lugarTrabajoAnterior: row.previous_workplace,
    habilidades: row.skills,
    linkedin: row.linkedin_url ?? "",
    redesSociales: row.social_links ?? "",
    createdBy: row.created_by,
    createdAt: row.created_at,
    publicante: {
      id: profile?.id ?? row.created_by,
      nombre: profile?.name ?? "Sin nombre",
      email: includeContact ? (profile?.email ?? "") : "",
      telefono: includeContact ? (profile?.phone ?? "") : "",
    },
  };
}

function toTalentProfileRow(data: unknown): TalentProfileRow {
  return data as TalentProfileRow;
}

export async function getTalentProfiles(): Promise<TalentProfile[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("talent_profiles")
    .select(TALENT_PROFILE_SELECT)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data.map((row) => mapTalentProfile(toTalentProfileRow(row), false));
}

export async function getTalentProfileById(
  id: string,
  includeContact = true,
): Promise<TalentProfile | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("talent_profiles")
    .select(TALENT_PROFILE_SELECT)
    .eq("id", id)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  if (!data) {
    return null;
  }

  return mapTalentProfile(toTalentProfileRow(data), includeContact);
}

export async function getTalentProfileForOwner(
  id: string,
  ownerId: string,
): Promise<TalentProfile | null> {
  const profile = await getTalentProfileById(id, true);

  if (!profile || profile.createdBy !== ownerId) {
    return null;
  }

  return profile;
}

export async function getTalentProfileByUserId(
  userId: string,
): Promise<TalentProfile | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("talent_profiles")
    .select(TALENT_PROFILE_SELECT)
    .eq("created_by", userId)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  if (!data) {
    return null;
  }

  return mapTalentProfile(toTalentProfileRow(data), true);
}

export async function createTalentProfile(
  input: CreateTalentProfileInput,
  createdBy: string,
): Promise<TalentProfile> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("talent_profiles")
    .insert({
      profession: input.profesion.trim(),
      experience: input.experiencia.trim(),
      description: input.descripcion.trim(),
      previous_workplace: input.lugarTrabajoAnterior.trim(),
      skills: input.habilidades.trim(),
      linkedin_url: input.linkedin?.trim() || null,
      social_links: input.redesSociales?.trim() || null,
      created_by: createdBy,
    })
    .select(TALENT_PROFILE_SELECT)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return mapTalentProfile(toTalentProfileRow(data), true);
}

export async function updateTalentProfile(
  id: string,
  ownerId: string,
  input: UpdateTalentProfileInput,
): Promise<TalentProfile> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("talent_profiles")
    .update({
      profession: input.profesion.trim(),
      experience: input.experiencia.trim(),
      description: input.descripcion.trim(),
      previous_workplace: input.lugarTrabajoAnterior.trim(),
      skills: input.habilidades.trim(),
      linkedin_url: input.linkedin?.trim() || null,
      social_links: input.redesSociales?.trim() || null,
    })
    .eq("id", id)
    .eq("created_by", ownerId)
    .select(TALENT_PROFILE_SELECT)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return mapTalentProfile(toTalentProfileRow(data), true);
}

export async function deleteTalentProfile(
  id: string,
  ownerId: string,
): Promise<void> {
  const supabase = await createClient();
  const { error } = await supabase
    .from("talent_profiles")
    .delete()
    .eq("id", id)
    .eq("created_by", ownerId);

  if (error) {
    throw new Error(error.message);
  }
}
