import Link from "next/link";
import type { TalentProfile } from "@/lib/types/talent-profile";
import { Card, Divider } from "@/components/ui/layout";
import { ButtonLink } from "@/components/ui/form";

type TalentProfileListProps = {
  profiles: TalentProfile[];
  currentUserId?: string;
};

function SkillChips({ skills }: { skills: string }) {
  const items = skills
    .split(",")
    .map((skill) => skill.trim())
    .filter(Boolean);

  if (items.length === 0) {
    return <p className="text-sm text-neutral-500">Sin habilidades listadas.</p>;
  }

  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((skill) => (
        <li
          key={skill}
          className="rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-xs text-neutral-700"
        >
          {skill}
        </li>
      ))}
    </ul>
  );
}

export function TalentProfileList({
  profiles,
  currentUserId,
}: TalentProfileListProps) {
  return (
    <ul className="flex flex-col gap-4">
      {profiles.map((profile) => {
        const isOwner = profile.createdBy === currentUserId;

        return (
          <li key={profile.id}>
            <Card className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-lg font-semibold text-neutral-900">
                    <Link
                      href={`/reubicacion-talento/${profile.id}`}
                      className="transition-colors hover:text-neutral-600"
                    >
                      {profile.publicante.nombre}
                    </Link>
                  </h2>
                  <span className="rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-xs font-medium text-neutral-700">
                    {profile.profesion}
                  </span>
                </div>
                <p className="text-sm text-neutral-500">
                  Antes en {profile.lugarTrabajoAnterior}
                </p>
                <p className="text-sm leading-6 text-neutral-600 line-clamp-3">
                  {profile.descripcion}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-neutral-500">
                  Habilidades
                </p>
                <div className="mt-2">
                  <SkillChips skills={profile.habilidades} />
                </div>
              </div>

              <Divider />

              <div className="flex flex-wrap items-center gap-3">
                <ButtonLink href={`/reubicacion-talento/${profile.id}`}>
                  Ver perfil
                </ButtonLink>
                {isOwner ? (
                  <ButtonLink
                    href={`/reubicacion-talento/${profile.id}/editar`}
                    variant="secondary"
                  >
                    Editar
                  </ButtonLink>
                ) : null}
              </div>
            </Card>
          </li>
        );
      })}
    </ul>
  );
}
