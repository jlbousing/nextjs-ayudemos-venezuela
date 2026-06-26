"use client";

import { useState } from "react";
import { Button } from "@/components/ui/form";

type ShareInitiativeButtonProps = {
  url: string;
};

export function ShareInitiativeButton({ url }: ShareInitiativeButtonProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt("Copia este enlace para compartir la iniciativa:", url);
    }
  }

  return (
    <Button type="button" variant="secondary" onClick={handleCopy}>
      {copied ? "Enlace copiado" : "Compartir enlace"}
    </Button>
  );
}
