import { ButtonLink } from "@/components/ui/form";
import { PageShell } from "@/components/ui/layout";

export default function Home() {
  return (
    <PageShell size="narrow">
      <div className="flex flex-col gap-8 py-8 sm:py-16">
        <div className="flex flex-col gap-4">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-neutral-500">
            Plataforma humanitaria
          </p>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Ayudemos Venezuela
          </h1>
          <p className="text-base leading-7 text-neutral-600 sm:text-lg">
            Registra iniciativas de ayuda, coordina voluntarios y mantén el
            contacto con quienes quieren colaborar.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <ButtonLink href="/iniciativas" variant="primary">
            Ver iniciativas
          </ButtonLink>
          <ButtonLink href="/reubicacion-talento" variant="secondary">
            Reubicación de talento
          </ButtonLink>
          <ButtonLink href="/iniciar-sesion" variant="secondary">
            Iniciar sesión
          </ButtonLink>
        </div>
      </div>
    </PageShell>
  );
}
