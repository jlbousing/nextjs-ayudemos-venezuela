import { createClient } from "@/lib/supabase/server";
import { buildVolunteerJoinedEmail, sendEmail } from "@/lib/email/send";
import type { Voluntario } from "@/lib/types/user";

export async function notifyCreatorVolunteerJoined(
  initiativeId: string,
  voluntario: Voluntario,
) {
  const supabase = await createClient();

  const { data: initiative, error: initiativeError } = await supabase
    .from("initiatives")
    .select("title, created_by")
    .eq("id", initiativeId)
    .single();

  if (initiativeError || !initiative?.created_by) {
    throw new Error("No se encontró la iniciativa o su creador.");
  }

  const { data: creator, error: creatorError } = await supabase
    .from("profiles")
    .select("name, email")
    .eq("id", initiative.created_by)
    .single();

  if (creatorError || !creator?.email) {
    throw new Error("No se encontró el correo del creador.");
  }

  const { subject, html } = await buildVolunteerJoinedEmail({
    creatorName: creator.name,
    initiativeTitle: initiative.title,
    volunteerName: voluntario.nombre,
    volunteerEmail: voluntario.email,
    volunteerPhone: voluntario.telefono,
    initiativeId,
  });

  await sendEmail({
    to: creator.email,
    subject,
    html,
  });
}
