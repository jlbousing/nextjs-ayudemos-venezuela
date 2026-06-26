import type { InterestLink } from "@/lib/data/interest-links";
import { Card } from "@/components/ui/layout";

type InterestLinksListProps = {
  links: InterestLink[];
};

export function InterestLinksList({ links }: InterestLinksListProps) {
  return (
    <ul className="flex flex-col gap-4">
      {links.map((link) => (
        <li key={link.id}>
          <Card className="flex flex-col gap-2">
            <h2 className="text-lg font-semibold text-neutral-900">
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-neutral-600"
              >
                {link.titulo}
              </a>
            </h2>
            <p className="text-sm leading-6 text-neutral-600">{link.descripcion}</p>
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-fit text-sm text-neutral-500 underline decoration-neutral-300 underline-offset-4 transition-colors hover:text-neutral-900"
            >
              {link.url.replace(/^https?:\/\//, "").replace(/\/$/, "")}
            </a>
          </Card>
        </li>
      ))}
    </ul>
  );
}
