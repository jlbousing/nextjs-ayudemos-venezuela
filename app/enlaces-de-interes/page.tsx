import { InterestLinksList } from "@/components/links/interest-links-list";
import { EmptyState } from "@/components/ui/form";
import { PageHeader, PageShell, Section } from "@/components/ui/layout";
import { INTEREST_LINKS } from "@/lib/data/interest-links";

export default function EnlacesDeInteresPage() {
  return (
    <PageShell>
      <PageHeader
        title="Enlaces de interés"
        description="Recursos y plataformas relacionadas con la ayuda humanitaria en Venezuela."
      />

      <Section
        title="Sitios recomendados"
        description="Enlaces externos a iniciativas y herramientas de apoyo."
      >
        {INTEREST_LINKS.length === 0 ? (
          <EmptyState>Aún no hay enlaces registrados.</EmptyState>
        ) : (
          <InterestLinksList links={INTEREST_LINKS} />
        )}
      </Section>
    </PageShell>
  );
}
