import { logoutAction } from "@/lib/actions/auth";
import { getCurrentProfile } from "@/lib/auth/session";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/form";

export async function SiteHeader() {
  const profile = await getCurrentProfile();

  return (
    <header className="sticky top-0 z-10 border-b border-neutral-200 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-4xl items-center justify-between gap-4 px-6 py-4">
        <Link
          href="/"
          className="text-sm font-semibold tracking-tight text-neutral-900 transition-opacity hover:opacity-70"
        >
          Ayudemos Venezuela
        </Link>

        <nav className="flex flex-wrap items-center justify-end gap-2 text-sm sm:gap-3">
          <Link
            href="/iniciativas"
            className="rounded-lg px-3 py-2 text-neutral-700 transition-colors hover:bg-neutral-50 hover:text-neutral-900"
          >
            Iniciativas
          </Link>
          <Link
            href="/reubicacion-talento"
            className="rounded-lg px-3 py-2 text-neutral-700 transition-colors hover:bg-neutral-50 hover:text-neutral-900"
          >
            Talento
          </Link>
          <Link
            href="/enlaces-de-interes"
            className="rounded-lg px-3 py-2 text-neutral-700 transition-colors hover:bg-neutral-50 hover:text-neutral-900"
          >
            Enlaces de interés
          </Link>

          {profile ? (
            <>
              <Link
                href="/perfil"
                className="rounded-lg px-3 py-2 text-neutral-700 transition-colors hover:bg-neutral-50 hover:text-neutral-900"
              >
                {profile.name}
              </Link>
              <form action={logoutAction}>
                <button
                  type="submit"
                  className="rounded-lg px-3 py-2 text-neutral-500 transition-colors hover:bg-neutral-50 hover:text-neutral-900"
                >
                  Salir
                </button>
              </form>
            </>
          ) : (
            <ButtonLink href="/iniciar-sesion" variant="primary" className="px-4 py-2">
              Entrar
            </ButtonLink>
          )}
        </nav>
      </div>
    </header>
  );
}
