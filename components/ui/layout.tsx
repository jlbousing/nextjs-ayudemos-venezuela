import Link from "next/link";
import type { ReactNode } from "react";

type PageShellProps = {
  children: ReactNode;
  size?: "default" | "narrow";
};

const sizes = {
  default: "max-w-4xl",
  narrow: "max-w-lg",
};

export function PageShell({ children, size = "default" }: PageShellProps) {
  return (
    <main
      className={`mx-auto flex w-full flex-1 flex-col gap-10 px-6 py-12 sm:gap-12 sm:py-16 ${sizes[size]}`}
    >
      {children}
    </main>
  );
}

type PageHeaderProps = {
  backHref?: string;
  backLabel?: string;
  title: string;
  description?: string;
  badge?: ReactNode;
  children?: ReactNode;
};

export function PageHeader({
  backHref,
  backLabel = "Volver",
  title,
  description,
  badge,
  children,
}: PageHeaderProps) {
  return (
    <header className="flex flex-col gap-4 border-b border-neutral-200 pb-8">
      {backHref ? (
        <Link
          href={backHref}
          className="w-fit rounded-lg px-2 py-1 text-sm text-neutral-600 transition-colors hover:bg-white hover:text-neutral-900"
        >
          ← {backLabel}
        </Link>
      ) : null}

      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">
            {title}
          </h1>
          {badge}
        </div>
        {description ? (
          <p className="max-w-2xl text-sm leading-6 text-neutral-600 sm:text-base">
            {description}
          </p>
        ) : null}
        {children}
      </div>
    </header>
  );
}

export function Section({
  title,
  description,
  children,
  bordered = false,
}: {
  title: string;
  description?: string;
  children: ReactNode;
  bordered?: boolean;
}) {
  return (
    <section
      className={`flex flex-col gap-5 ${bordered ? "border-t border-neutral-200 pt-10" : ""}`}
    >
      <div className="flex flex-col gap-1">
        <h2 className="text-xl font-medium tracking-tight text-neutral-900">
          {title}
        </h2>
        {description ? (
          <p className="text-sm text-neutral-600">{description}</p>
        ) : null}
      </div>
      {children}
    </section>
  );
}

export function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm sm:p-6 ${className}`}
    >
      {children}
    </div>
  );
}

export function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-xs font-medium uppercase tracking-wide text-neutral-700">
      {children}
    </span>
  );
}

export function Divider() {
  return <div className="border-t border-neutral-200" />;
}
