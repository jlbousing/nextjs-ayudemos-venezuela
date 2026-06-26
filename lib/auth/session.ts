import { createClient } from "@/lib/supabase/server";

export async function getSessionUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
}

export async function getCurrentProfile() {
  const user = await getSessionUser();

  if (!user) {
    return null;
  }

  const supabase = await createClient();
  const { data } = await supabase
    .from("profiles")
    .select("id, name, email, phone")
    .eq("id", user.id)
    .single();

  if (data) {
    return data;
  }

  return {
    id: user.id,
    name: (user.user_metadata?.name as string | undefined) ?? user.email ?? "",
    email: user.email ?? "",
    phone: (user.user_metadata?.phone as string | undefined) ?? "",
  };
}
