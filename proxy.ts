import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

const PASSTHROUGH_PATHS = new Set(["/api/health", "/ping.txt"]);

export async function proxy(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  if (PASSTHROUGH_PATHS.has(pathname)) {
    return NextResponse.next();
  }

  try {
    const code = searchParams.get("code");

    if (code && pathname !== "/auth/callback") {
      const callbackUrl = request.nextUrl.clone();
      callbackUrl.pathname = "/auth/callback";

      if (!callbackUrl.searchParams.has("next")) {
        callbackUrl.searchParams.set("next", "/iniciativas");
      }

      return NextResponse.redirect(callbackUrl);
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      return NextResponse.next();
    }

    let supabaseResponse = NextResponse.next({ request });

    const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => {
            request.cookies.set(name, value);
          });
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) => {
            supabaseResponse.cookies.set(name, value, options);
          });
        },
      },
    });

    await supabase.auth.getUser();

    return supabaseResponse;
  } catch (error) {
    console.error("[proxy]", error);
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|ping.txt|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
