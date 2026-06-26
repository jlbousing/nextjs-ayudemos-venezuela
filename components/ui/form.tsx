import Link from "next/link";
import type {
  ButtonHTMLAttributes,
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";

const fieldClassName =
  "w-full rounded-xl border border-neutral-200 bg-white px-3.5 py-2.5 text-sm shadow-sm transition-all placeholder:text-neutral-400 focus:border-neutral-400 focus:outline-none focus:ring-4 focus:ring-neutral-100";

const buttonVariants = {
  primary:
    "inline-flex items-center justify-center rounded-xl bg-neutral-900 px-5 py-2.5 text-sm font-medium !text-white shadow-sm transition-all hover:bg-neutral-800 hover:shadow disabled:opacity-50",
  secondary:
    "inline-flex items-center justify-center rounded-xl border border-neutral-200 bg-white px-5 py-2.5 text-sm font-medium text-neutral-900 shadow-sm transition-all hover:border-neutral-300 hover:shadow disabled:opacity-50",
  ghost:
    "inline-flex items-center justify-center rounded-xl px-5 py-2.5 text-sm font-medium text-neutral-700 underline decoration-neutral-300 underline-offset-4 transition-all hover:text-neutral-900 hover:decoration-neutral-500 disabled:opacity-50",
  danger:
    "inline-flex items-center justify-center rounded-xl border border-neutral-200 bg-white px-5 py-2.5 text-sm font-medium text-neutral-900 shadow-sm transition-all hover:border-red-200 hover:bg-red-50 hover:text-red-900 disabled:opacity-50",
} as const;

type ButtonVariant = keyof typeof buttonVariants;

type FieldProps = {
  label: string;
  hint?: string;
  htmlFor?: string;
  children: ReactNode;
};

export function Field({ label, hint, htmlFor, children }: FieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={htmlFor} className="text-sm font-medium text-neutral-800">
        {label}
      </label>
      {children}
      {hint ? <p className="text-xs text-neutral-500">{hint}</p> : null}
    </div>
  );
}

export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`${fieldClassName} ${props.className ?? ""}`} />;
}

export function Textarea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea {...props} className={`${fieldClassName} ${props.className ?? ""}`} />
  );
}

export function Select(props: SelectHTMLAttributes<HTMLSelectElement>) {
  return <select {...props} className={`${fieldClassName} ${props.className ?? ""}`} />;
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  fullWidth?: boolean;
};

export function Button({
  variant = "primary",
  fullWidth = false,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={`${buttonVariants[variant]} ${fullWidth ? "w-full" : "w-fit"} ${className}`}
    />
  );
}

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
};

export function ButtonLink({
  href,
  children,
  variant = "secondary",
  className = "",
}: ButtonLinkProps) {
  return (
    <Link href={href} className={`${buttonVariants[variant]} ${className}`}>
      {children}
    </Link>
  );
}

export function FormMessage({
  children,
  tone = "default",
}: {
  children: ReactNode;
  tone?: "default" | "error" | "success";
}) {
  if (!children) return null;

  const toneClassName =
    tone === "error"
      ? "border-red-200 bg-red-50 text-red-900"
      : tone === "success"
        ? "border-emerald-200 bg-emerald-50 text-emerald-900"
        : "border-neutral-200 bg-neutral-50 text-neutral-800";

  return (
    <p className={`rounded-xl border px-3.5 py-2.5 text-sm ${toneClassName}`}>
      {children}
    </p>
  );
}

export function EmptyState({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-2xl border border-dashed border-neutral-300 bg-white px-6 py-12 text-center text-sm text-neutral-500 shadow-sm">
      {children}
    </div>
  );
}
