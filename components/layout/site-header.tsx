import Link from "next/link";
import { logoutAction } from "@/lib/actions/auth";
import { getCurrentProfile } from "@/lib/auth/session";

export async function SiteHeader() {
  const profile = await getCurrentProfile();

  return (
    <header className="border-b border-black">
      <div className="mx-auto flex w-full max-w-4xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-sm font-medium">
          Ayudemos Venezuela
        </Link>

        <nav className="flex items-center gap-4 text-sm">
          <Link href="/iniciativas" className="underline">
            Iniciativas
          </Link>

          {profile ? (
            <>
              <Link href="/perfil" className="underline">
                {profile.name}
              </Link>
              <form action={logoutAction}>
                <button type="submit" className="underline">
                  Cerrar sesión
                </button>
              </form>
            </>
          ) : (
            <Link href="/iniciar-sesion" className="underline">
              Iniciar sesión
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
